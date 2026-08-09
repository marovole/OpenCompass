import fs from "node:fs";
import path from "node:path";
import { cache } from "react";

export type GraphEdge = {
  from: string;
  to: string;
  type: string;
  planned?: boolean;
};

export type GraphNodeEdge = {
  to: string;
  type: string;
  planned?: boolean;
};

export type GraphNode = {
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
  sourcePath?: string;
  body: string;
  edges: GraphNodeEdge[];
};

export type GraphPath = {
  id: string;
  title: string;
  role: string;
  nodeIds: string[];
};

export type OntologyGraph = {
  version: string;
  generatedAt: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  paths: GraphPath[];
};

export const HUBS: { id: string; title: string; blurb: string }[] = [
  { id: "H1", title: "人机关系", blurb: "协作、边界、依赖、滥用" },
  { id: "H2", title: "认知与学习", blurb: "提问、元认知、迁移、深度工作" },
  { id: "H3", title: "判断与智慧", blurb: "证据、偏见、决策、品味" },
  { id: "H4", title: "品格与身心", blurb: "注意、睡眠、诚实、习惯" },
  { id: "H5", title: "社会与制度", blurb: "学校、劳动、媒体、公民" },
  { id: "H6", title: "代际传承", blurb: "父母即教材、教判断、家庭契约" },
];

export const EDGE_TYPE_LABEL: Record<string, string> = {
  is_a: "属于",
  requires: "前置",
  enables: "使能",
  tensions: "张力",
  macro_of: "微观→宏观",
  micro_of: "宏观→微观",
  teaches: "代际教法",
  practiced_as: "落地练法",
  see_also: "参见",
};

function resolveGraphPath(): string {
  const candidates = [
    path.join(process.cwd(), "ontology", "graph.json"),
    path.join(process.cwd(), "..", "..", "ontology", "graph.json"),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  throw new Error("找不到 ontology/graph.json，请先运行 pnpm compile");
}

export const getGraph = cache((): OntologyGraph => {
  const raw = fs.readFileSync(resolveGraphPath(), "utf8");
  return JSON.parse(raw) as OntologyGraph;
});

export function getNode(id: string): GraphNode | undefined {
  return getGraph().nodes.find((n) => n.id === id);
}

export function getPath(id: string): GraphPath | undefined {
  return getGraph().paths.find((p) => p.id === id);
}

export function nodesByHub(hub: string): GraphNode[] {
  return getGraph().nodes.filter((n) => n.hub === hub);
}
