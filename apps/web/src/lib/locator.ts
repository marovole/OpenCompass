import { HUBS, type GraphNode, type OntologyGraph } from "./ontology";
import type { HubId, Intent } from "./protocol";

export type LocateResult = {
  intent: Intent;
  hub?: HubId;
  nodes: GraphNode[];
  queryTokens: string[];
};

const CRISIS_RE =
  /自杀|自残|结束生命|不想活|割腕|轻生|杀死|杀人|炸弹制作|如何伤害/;

const NEXT_GEN_RE =
  /孩子|子女|父母|家长|亲子|家庭|教孩子|下一代|学生|育儿|陪伴成长/;

const SELF_RE = /自学|自我|我该如何|怎么学|工作|职业|成人|重启/;

function tokenize(q: string): string[] {
  return q
    .toLowerCase()
    .split(/[\s,，。！？、；：:/.\\-]+/)
    .map((t) => t.trim())
    .filter((t) => t.length >= 1);
}

function detectIntent(q: string): Intent {
  if (CRISIS_RE.test(q)) return "crisis";
  if (NEXT_GEN_RE.test(q)) return "next_gen";
  if (SELF_RE.test(q)) return "self";
  // 默认偏自我教育，但仍可用事实向阅读
  if (/是什么|定义|含义/.test(q)) return "fact";
  return "self";
}

function hubBonus(q: string): Partial<Record<HubId, number>> {
  const rules: [RegExp, HubId][] = [
    [/ai|人工智能|人机|幻觉|验证|提示|协作|替代思考|外包思考/, "H1"],
    [/提问|问题质量|学习|元认知|迁移|深度工作|专注/, "H2"],
    [/证据|信源|偏见|判断|决策|品味|认知卫生/, "H3"],
    [/睡眠|注意力|诚实|勇气|习惯|情绪/, "H4"],
    [/学校|工作|职业|媒体|公民|制度/, "H5"],
    [/父母|孩子|家庭|代际|教养|契约|教判断/, "H6"],
  ];
  const scores: Partial<Record<HubId, number>> = {};
  const lower = q.toLowerCase();
  for (const [re, hub] of rules) {
    if (re.test(lower) || re.test(q)) {
      scores[hub] = (scores[hub] ?? 0) + 2;
    }
  }
  return scores;
}

/** 节点专属加分：避免泛词把不相关节点顶上来 */
const NODE_BOOSTS: [RegExp, string, number][] = [
  [/替代思考|不被替代|人定问题|验收标准|协作/, "H1.collaborate-not-replace", 12],
  [/验证|幻觉|交叉核验/, "H1.verify-outputs", 10],
  [/人机分工|留给人|不可外包|不可让渡/, "H1.human-ai-division", 10],
  [/孩子与?\s*AI|伴学红线/, "H1.child-and-ai", 10],
  [/提问|问题质量|好问题|糊问题/, "H2.question-quality", 12],
  [/元认知|计划.?监控|怎么想/, "H2.metacognition", 10],
  [/深度工作|专注块|安静钟/, "H2.deep-work-attention", 10],
  [/认知卫生|信源|证据等级/, "H3.epistemic-hygiene", 10],
  [/偏见|确认偏误/, "H3.cognitive-biases", 10],
  [/睡眠|注意力与睡眠/, "H4.attention-sleep", 8],
  [/诚实|我不知道|勇气/, "H4.honesty-courage", 8],
  [/工作重组|技能组合|失业/, "H5.labor-ai-recomposition", 8],
  [/注意力经济|短视频|推荐流/, "H5.media-attention-economy", 10],
  [/学校与学习|分数|应试/, "H5.school-vs-learning", 8],
  [/父母即教材|旁观过程/, "H6.parent-as-curriculum", 8],
  [/教判断|不教标准答案|代搜代答/, "H6.teach-judgment-not-answers", 12],
  [/家庭契约|屏幕契约/, "H6.family-screen-ai-contract", 10],
];

function scoreNode(
  node: GraphNode,
  tokens: string[],
  intent: Intent,
  hubScores: Partial<Record<HubId, number>>,
  question: string,
): number {
  const hay = [
    node.id,
    node.title,
    node.summary,
    node.self_path,
    node.next_gen_path,
    node.ai_era_shift,
    node.practice,
    ...(node.anti_patterns ?? []),
    node.body,
  ]
    .join("\n")
    .toLowerCase();

  let score = hubScores[node.hub as HubId] ?? 0;
  for (const t of tokens) {
    if (t.length < 2) continue;
    if (node.title.toLowerCase().includes(t.toLowerCase())) score += 6;
    else if (hay.includes(t.toLowerCase())) score += 2;
  }
  for (const [re, id, bonus] of NODE_BOOSTS) {
    if (node.id === id && re.test(question)) score += bonus;
  }
  // 泛词「孩子」不应压过明确的协作/提问意图
  if (/孩子|父母|亲子/.test(question) && node.hub === "H6") score += 2;
  if (intent === "next_gen" && (node.hub === "H6" || node.id.includes("child"))) {
    score += 2;
  }
  return score;
}

export function locate(graph: OntologyGraph, question: string, topK = 3): LocateResult {
  const intent = detectIntent(question);
  const tokens = tokenize(question);
  const hubScores = hubBonus(question);

  const ranked = graph.nodes
    .map((node) => ({
      node,
      score: scoreNode(node, tokens, intent, hubScores, question),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  let nodes = ranked.slice(0, topK).map((x) => x.node);

  // 无命中：按枢纽偏好降落到该枢纽已有节点，否则取路径 D 首节点所在枢纽的任意节点
  let hub: HubId | undefined;
  if (nodes.length === 0) {
    const preferred =
      (Object.entries(hubScores).sort((a, b) => b[1] - a[1])[0]?.[0] as HubId) ||
      "H2";
    hub = preferred;
    nodes = graph.nodes.filter((n) => n.hub === preferred).slice(0, topK);
    if (nodes.length === 0) {
      nodes = graph.nodes.slice(0, Math.min(topK, graph.nodes.length));
    }
  } else {
    hub = nodes[0].hub as HubId;
  }

  return { intent, hub, nodes, queryTokens: tokens };
}

export function hubBlurb(hub?: HubId): string {
  const found = HUBS.find((h) => h.id === hub);
  return found ? `${found.id} · ${found.title}：${found.blurb}` : "教育地图总览";
}
