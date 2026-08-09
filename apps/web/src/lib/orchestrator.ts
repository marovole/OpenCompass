import { getGraph, type GraphNode, HUBS } from "./ontology";
import { locate, hubBlurb } from "./locator";
import {
  validateAnswerPayload,
  type AnswerPayload,
  type AskMode,
  type AskResponse,
  type Intent,
} from "./protocol";

function pickJumps(primary: GraphNode, all: GraphNode[]): AnswerPayload["jumps"] {
  const byId = new Map(all.map((n) => [n.id, n]));
  const jumps: AnswerPayload["jumps"] = [];

  const push = (id: string, reason: string, edgeType?: string) => {
    if (jumps.some((j) => j.id === id)) return;
    jumps.push({ id, reason, ...(edgeType ? { edgeType } : {}) });
  };

  // 同枢纽深化
  for (const e of primary.edges) {
    if (["requires", "enables", "see_also", "practiced_as"].includes(e.type)) {
      const t = byId.get(e.to);
      push(
        e.to,
        t ? `同枢纽深化：${t.title}` : `继续沿 ${e.type} 走到 ${e.to}`,
        e.type,
      );
    }
    if (jumps.length >= 1) break;
  }

  // macro/micro
  for (const e of primary.edges) {
    if (e.type === "macro_of" || e.type === "micro_of") {
      const t = byId.get(e.to);
      push(
        e.to,
        t ? `系统视角：${t.title}` : `跨层看看 ${e.to}`,
        e.type,
      );
    }
  }

  // 自我↔代际
  for (const e of primary.edges) {
    if (e.type === "teaches") {
      const t = byId.get(e.to);
      push(
        e.to,
        t ? `代际切换：${t.title}` : `转向代际教法 ${e.to}`,
        e.type,
      );
    }
  }

  // 补足到至少 1、目标 3：从同枢纽其他节点填
  if (jumps.length < 3) {
    for (const n of all) {
      if (n.id === primary.id) continue;
      if (n.hub === primary.hub || n.hub === "H6") {
        push(n.id, `地图上相邻：${n.title}`, "see_also");
      }
      if (jumps.length >= 3) break;
    }
  }

  if (jumps.length === 0) {
    push("H2.question-quality", "从问题质量重新定位", "see_also");
  }

  return jumps.slice(0, 3);
}

function composeFromNodes(
  intent: Intent,
  nodes: GraphNode[],
  hub: AnswerPayload["locate"]["hub"],
  all: GraphNode[],
): AnswerPayload {
  if (nodes.length === 0) {
    const hubMeta = HUBS.find((h) => h.id === hub);
    return {
      locate: { intent, nodeIds: [], hub },
      direct: `你的问题暂时没有精确命中已写节点。建议从枢纽「${hubBlurb(hub)}」进入，或走路径 D 体验最小罗盘环。`,
      mechanism:
        "OpenCompass 以结构化地图为第一公民：先定位坐标，再扩展边界。无命中时降落到最近枢纽，避免无协议闲聊。",
      era_shift:
        "在 AI 可即时作答的时代，产品成功标准是「更会教自己/教下一代」，而不是多轮陪聊。",
      bounds:
        "本回答不是人生决策代答；若涉及危机与伤害，请优先寻求现实中的紧急援助（见安全协议）。",
      jumps: [
        {
          id: "H2.question-quality",
          reason: "先把问题问清楚",
          edgeType: "see_also",
        },
        {
          id: "H1.collaborate-not-replace",
          reason: "建立人机协作纪律",
          edgeType: "see_also",
        },
        {
          id: "H6.teach-judgment-not-answers",
          reason: "转向代际：教判断",
          edgeType: "teaches",
        },
      ],
      practice: `打开路径 D，用 20 分钟走完四节点，并写下你原来问题的「已知/未知/成功标准」。${hubMeta ? `（枢纽提示：${hubMeta.title}）` : ""}`,
    };
  }

  const primary = nodes[0];
  const secondary = nodes.slice(1);
  const pathText =
    intent === "next_gen" ? primary.next_gen_path : primary.self_path;

  const anti =
    primary.anti_patterns && primary.anti_patterns.length
      ? primary.anti_patterns.map((x) => `· ${x}`).join("\n")
      : "· 把流畅生成当成已经想清楚\n· 只收藏节点、不完成练习";

  const extra = secondary
    .map((n) => `（相关：${n.title} — ${n.summary}）`)
    .join(" ");

  return {
    locate: {
      intent,
      nodeIds: nodes.map((n) => n.id),
      hub: (hub ?? primary.hub) as AnswerPayload["locate"]["hub"],
    },
    direct: `建议先落在「${primary.title}」：${primary.summary}。对你此刻更直接的路径是：${pathText}${extra ? ` ${extra}` : ""}`,
    mechanism: extractMechanism(primary),
    era_shift: primary.ai_era_shift,
    bounds: `何时要小心：\n${anti}`,
    jumps: pickJumps(primary, all),
    practice: primary.practice,
  };
}

function extractMechanism(node: GraphNode): string {
  const m = node.body.match(/## L2[^\n]*\n([\s\S]*?)(?=\n## |\n*$)/);
  if (m) {
    const text = m[1].trim().replace(/\n+/g, " ").slice(0, 420);
    if (text) return text;
  }
  return `${node.title}的关键模型：先分清意图与验收，再调用工具；判断与责任留在人一侧。`;
}

function crisisAnswer(): AnswerPayload {
  return {
    locate: { intent: "crisis", nodeIds: [], hub: "H4" },
    direct:
      "听到你可能正处于非常艰难的时刻。请马上联系身边可信任的人，或拨打你所在地的紧急救助电话。OpenCompass 不能提供危机干预或有害操作指导。",
    mechanism:
      "安全协议优先于完整六段扩写：当出现自伤/伤害风险时，产品应转向求助，而不是继续地图讲解。",
    era_shift:
      "即使 AI 随时可聊，危机支持仍应落在真实世界的专业与人际网络；模型不是治疗者。",
    bounds:
      "我们不会讨论自伤或伤害他人的方法细节。若你愿意，稍晚可以回到教育地图，从身心与求助相关节点温和起步——但请先保证当下安全。",
    jumps: [
      {
        id: "H4.attention-sleep",
        reason: "安全之后，可从身心底板温和回看",
        edgeType: "see_also",
      },
    ],
    practice:
      "若你此刻安全：把手机拿到手边，联系一位现实中的人，或查找当地官方心理援助 / 紧急服务入口（以当地公布信息为准）。",
  };
}

async function tryLlmCompose(
  question: string,
  base: AnswerPayload,
  nodes: GraphNode[],
): Promise<AnswerPayload | null> {
  const apiKey = process.env.OPENAI_API_KEY ?? process.env.OPENCOMPASS_API_KEY;
  if (!apiKey) return null;

  const baseUrl = (
    process.env.OPENCOMPASS_LLM_BASE_URL ?? "https://api.openai.com/v1"
  ).replace(/\/$/, "");
  const model = process.env.OPENCOMPASS_LLM_MODEL ?? "gpt-4o-mini";

  const context = nodes
    .map(
      (n) =>
        `# ${n.id} ${n.title}\nsummary: ${n.summary}\nself: ${n.self_path}\nnext_gen: ${n.next_gen_path}\nera: ${n.ai_era_shift}\npractice: ${n.practice}\nanti: ${(n.anti_patterns ?? []).join("；")}\nedges: ${n.edges.map((e) => `${e.type}->${e.to}`).join(", ")}`,
    )
    .join("\n\n");

  const system = `你是 OpenCompass 协议编排器。只输出 JSON（AnswerPayload），字段：locate{intent,nodeIds,hub}, direct, mechanism, era_shift, bounds, jumps[{id,reason,edgeType}], practice。
规则：不可删字段；jumps 至少 1 条目标 3 条且 id 尽量用给定节点；不代用户做重大人生决策；AI 是同学与工具；中文。`;

  const user = `用户问题：${question}\n\n已定位节点上下文：\n${context}\n\n可用骨架（可改写但须更贴问题）：\n${JSON.stringify(base)}`;

  try {
    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.3,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content;
    if (!content) return null;
    const parsed = JSON.parse(content) as unknown;
    const checked = validateAnswerPayload(parsed);
    if (!checked.ok) return null;
    // 保留 locate 的节点定位，防止模型跑飞
    return {
      ...checked.value,
      locate: {
        ...checked.value.locate,
        nodeIds: base.locate.nodeIds,
        hub: base.locate.hub,
        intent: base.locate.intent,
      },
    };
  } catch {
    return null;
  }
}

export async function orchestrateAsk(question: string): Promise<AskResponse> {
  const q = question.trim();
  if (!q) {
    throw new Error("问题不能为空");
  }
  if (q.length > 2000) {
    throw new Error("问题过长");
  }

  const graph = getGraph();
  const located = locate(graph, q);

  if (located.intent === "crisis") {
    return {
      ok: true,
      mode: "crisis",
      answer: crisisAnswer(),
      notice: "已触发安全协议：优先求助，缩短地图扩写。",
    };
  }

  const composed = composeFromNodes(
    located.intent,
    located.nodes,
    located.hub,
    graph.nodes,
  );

  const llm = await tryLlmCompose(q, composed, located.nodes);
  if (llm) {
    const checked = validateAnswerPayload(llm);
    if (checked.ok) {
      return {
        ok: true,
        mode: "llm",
        answer: checked.value,
        notice: "已用模型在协议约束下改写；结构仍强制六段。",
      };
    }
  }

  return {
    ok: true,
    mode: "compose" as AskMode,
    answer: composed,
    notice:
      "当前为地图拼装模式（未配置或未成功调用 LLM）。仍输出完整协议六段，可直接练习与跃迁。",
  };
}
