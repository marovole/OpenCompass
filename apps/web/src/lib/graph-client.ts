/** 客户端拉取精简图谱（供回访组件，避免把 fs 打进 client bundle） */

export type GraphClientSnapshot = {
  paths: { id: string; title: string; nodeIds: string[] }[];
  nodes: { id: string; title: string }[];
};

let cache: GraphClientSnapshot | null = null;

export async function getGraphClient(): Promise<GraphClientSnapshot> {
  if (cache) return cache;
  const res = await fetch("/api/graph", { cache: "force-cache" });
  if (!res.ok) throw new Error("无法加载图谱");
  cache = (await res.json()) as GraphClientSnapshot;
  return cache;
}
