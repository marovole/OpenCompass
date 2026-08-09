import { NextResponse } from "next/server";
import { getGraph } from "@/lib/ontology";

export const runtime = "nodejs";

/** 供客户端回访组件使用的精简图谱 */
export async function GET() {
  const graph = getGraph();
  return NextResponse.json({
    paths: graph.paths.map((p) => ({
      id: p.id,
      title: p.title,
      nodeIds: p.nodeIds,
    })),
    nodes: graph.nodes.map((n) => ({
      id: n.id,
      title: n.title,
    })),
  });
}
