import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import { HUBS, EDGE_TYPE_LABEL } from "./hubs";

export { HUBS, EDGE_TYPE_LABEL };

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
