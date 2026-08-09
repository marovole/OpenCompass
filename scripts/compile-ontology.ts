/**
 * 将 ontology/nodes/*.md 编译为 ontology/graph.json
 * - 校验 node frontmatter（JSON Schema）
 * - 展开边表
 * - 写入路径包 A–D 元数据（来自教育地图，节点可尚未落盘）
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const nodesDir = path.join(root, "ontology", "nodes");
const outPath = path.join(root, "ontology", "graph.json");
const nodeSchemaPath = path.join(root, "ontology", "schema", "node.schema.json");
const graphSchemaPath = path.join(root, "ontology", "schema", "graph.schema.json");

const checkOnly = process.argv.includes("--check");

/** 地图 §8 路径包占位（节点正文可后补） */
const PATH_PACKS = [
  {
    id: "A",
    title: "成人自我教育重启",
    role: "self",
    nodeIds: [
      "H4.attention-sleep",
      "H2.question-quality",
      "H1.collaborate-not-replace",
      "H1.verify-outputs",
      "H3.epistemic-hygiene",
      "H2.metacognition",
      "H5.labor-ai-recomposition",
    ],
  },
  {
    id: "B",
    title: "父母：AI 时代怎么教",
    role: "next_gen",
    nodeIds: [
      "H6.parent-as-curriculum",
      "H6.teach-judgment-not-answers",
      "H1.child-and-ai",
      "H6.family-screen-ai-contract",
      "H2.question-quality",
      "H4.honesty-courage",
      "H5.school-vs-learning",
    ],
  },
  {
    id: "C",
    title: "青少年：和 AI 一起长大",
    role: "youth",
    nodeIds: [
      "H1.human-ai-division",
      "H2.question-quality",
      "H1.verify-outputs",
      "H3.cognitive-biases",
      "H2.deep-work-attention",
      "H5.media-attention-economy",
    ],
  },
  {
    id: "D",
    title: "罗盘极简环",
    role: "demo",
    nodeIds: [
      "H2.question-quality",
      "H1.collaborate-not-replace",
      "H3.epistemic-hygiene",
      "H6.teach-judgment-not-answers",
    ],
  },
] as const;

type NodeEdge = { to: string; type: string; planned?: boolean };

type NodeDoc = {
  id: string;
  title: string;
  title_en?: string;
  hub: string;
  hubs_secondary?: string[];
  stages: string[];
  levels: string[];
  summary: string;
  self_path: string;
  next_gen_path: string;
  ai_era_shift: string;
  practice: string;
  anti_patterns?: string[];
  status: string;
  priority: string;
  dao_marks?: string[];
  edges: NodeEdge[];
  sourcePath: string;
  body: string;
};

function loadJson(file: string): object {
  return JSON.parse(fs.readFileSync(file, "utf8")) as object;
}

function listNodeFiles(): string[] {
  if (!fs.existsSync(nodesDir)) return [];
  return fs
    .readdirSync(nodesDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => path.join(nodesDir, f))
    .sort();
}

function parseNode(file: string): NodeDoc {
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    ...(data as Omit<NodeDoc, "sourcePath" | "body" | "edges">),
    edges: (data.edges as NodeEdge[]) ?? [],
    sourcePath: path.relative(root, file),
    body: content.trim(),
  };
}

function main(): void {
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  const validateNode = ajv.compile(loadJson(nodeSchemaPath));
  const validateGraph = ajv.compile(loadJson(graphSchemaPath));

  const files = listNodeFiles();
  const nodes: NodeDoc[] = [];
  const errors: string[] = [];

  for (const file of files) {
    let doc: NodeDoc;
    try {
      doc = parseNode(file);
    } catch (e) {
      errors.push(`${file}: 无法解析 frontmatter — ${(e as Error).message}`);
      continue;
    }

    if (!validateNode(doc)) {
      const detail = (validateNode.errors ?? [])
        .map((err) => `${err.instancePath || "/"} ${err.message}`)
        .join("; ");
      errors.push(`${file}: schema 校验失败 — ${detail}`);
      continue;
    }

    if (doc.status === "reviewed" && doc.body.length === 0) {
      errors.push(`${file}: status=reviewed 但正文为空`);
      continue;
    }

    nodes.push(doc);
  }

  const ids = new Set(nodes.map((n) => n.id));
  const dup = nodes.map((n) => n.id).filter((id, i, arr) => arr.indexOf(id) !== i);
  if (dup.length) {
    errors.push(`重复节点 id: ${[...new Set(dup)].join(", ")}`);
  }

  const edges: { from: string; to: string; type: string; planned?: boolean }[] = [];
  for (const node of nodes) {
    for (const edge of node.edges) {
      const targetKnown = ids.has(edge.to);
      const planned = edge.planned === true || edge.to.startsWith("planned:");
      if (!targetKnown && !planned) {
        // Phase 0/1：目标节点可能尚未落盘，记为 planned 警告而非失败
        console.warn(`警告: ${node.id} → ${edge.to} 目标节点尚未落盘，标记 planned`);
        edges.push({ from: node.id, to: edge.to, type: edge.type, planned: true });
      } else {
        edges.push({
          from: node.id,
          to: edge.to.replace(/^planned:/, ""),
          type: edge.type,
          ...(planned || edge.planned ? { planned: true } : {}),
        });
      }
    }
  }

  const graph = {
    version: "0.0.0",
    generatedAt: new Date().toISOString(),
    nodes: nodes.map(({ body: _body, edges: _edges, ...rest }) => rest),
    edges,
    paths: PATH_PACKS.map((p) => ({ ...p, nodeIds: [...p.nodeIds] })),
  };

  if (!validateGraph(graph)) {
    const detail = (validateGraph.errors ?? [])
      .map((err) => `${err.instancePath || "/"} ${err.message}`)
      .join("; ");
    errors.push(`graph.json schema 校验失败 — ${detail}`);
  }

  if (errors.length) {
    console.error("内容校验失败:\n" + errors.map((e) => `  - ${e}`).join("\n"));
    process.exit(1);
  }

  const json = JSON.stringify(graph, null, 2) + "\n";

  if (checkOnly) {
    if (fs.existsSync(outPath)) {
      const existing = fs.readFileSync(outPath, "utf8");
      // 忽略 generatedAt 差异
      const normalize = (s: string) =>
        s.replace(/"generatedAt": "[^"]*"/, '"generatedAt": "<ts>"');
      if (normalize(existing) !== normalize(json)) {
        console.error("ontology/graph.json 与编译结果不一致，请运行 pnpm compile");
        process.exit(1);
      }
    }
    console.log(`lint:content OK（${nodes.length} 节点，${edges.length} 边）`);
    return;
  }

  fs.writeFileSync(outPath, json, "utf8");
  console.log(`已写入 ${path.relative(root, outPath)}（${nodes.length} 节点，${edges.length} 边，${PATH_PACKS.length} 路径包）`);
}

main();
