import Link from "next/link";
import { SiteShell, proseStyles } from "@/components/SiteShell";
import { PathVisitTracker } from "@/components/PathVisitTracker";
import { getGraph, getPath } from "@/lib/ontology";

type Props = { params: Promise<{ id: string }> };

const ROLE_LABEL: Record<string, string> = {
  self: "自我教育",
  next_gen: "代际 / 父母",
  youth: "青少年",
  demo: "产品演示",
};

export function generateStaticParams() {
  return getGraph().paths.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const pathPack = getPath(id);
  return {
    title: pathPack
      ? `路径 ${pathPack.id} · ${pathPack.title} · OpenCompass`
      : "路径 · OpenCompass",
  };
}

export default async function PathPage({ params }: Props) {
  const { id } = await params;
  const pathPack = getPath(id);
  const graph = getGraph();

  if (!pathPack) {
    return (
      <SiteShell title="路径未找到">
        <p>
          没有路径 <code>{id}</code>。<Link href="/map">返回地图</Link>
        </p>
      </SiteShell>
    );
  }

  const writtenCount = pathPack.nodeIds.filter((nid) =>
    graph.nodes.some((n) => n.id === nid),
  ).length;

  return (
    <SiteShell title={`路径 ${pathPack.id} · ${pathPack.title}`}>
      <style>{proseStyles}</style>
      <p className="oc-meta">
        {ROLE_LABEL[pathPack.role] ?? pathPack.role} · 已写 {writtenCount}/
        {pathPack.nodeIds.length} 节点。按序走完即可，无需一次学完。
      </p>
      <PathVisitTracker pathId={pathPack.id} nodeIds={pathPack.nodeIds} />
      <ol
        className="oc-list"
        style={{ lineHeight: 1.8, paddingLeft: "1.2rem" }}
      >
        {pathPack.nodeIds.map((nodeId, index) => {
          const node = graph.nodes.find((n) => n.id === nodeId);
          const prev = index > 0 ? pathPack.nodeIds[index - 1] : null;
          const next =
            index < pathPack.nodeIds.length - 1
              ? pathPack.nodeIds[index + 1]
              : null;
          return (
            <li key={nodeId} style={{ marginBottom: "1.1rem" }}>
              <span style={{ color: "#5a635e" }}>{index + 1}. </span>
              {node ? (
                <>
                  <Link href={`/nodes/${encodeURIComponent(nodeId)}`}>
                    {node.title}
                  </Link>
                  <div className="oc-meta" style={{ margin: "0.25rem 0 0" }}>
                    {node.summary}
                  </div>
                  <div className="oc-meta" style={{ margin: "0.35rem 0 0" }}>
                    {prev ? (
                      <Link href={`/nodes/${encodeURIComponent(prev)}`}>
                        上一步
                      </Link>
                    ) : (
                      <span>起点</span>
                    )}
                    {" · "}
                    {next ? (
                      <Link href={`/nodes/${encodeURIComponent(next)}`}>
                        下一步
                      </Link>
                    ) : (
                      <span>终点</span>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <code>{nodeId}</code>
                  <div className="oc-meta" style={{ margin: "0.2rem 0 0" }}>
                    正文尚未写入（seed）
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ol>
      <p className="oc-list" style={{ marginTop: "2rem" }}>
        <Link href="/map">← 教育地图</Link>
        {" · "}
        <Link href="/paths/D">路径 D</Link>
        {" · "}
        <Link href="/paths/A">路径 A</Link>
        {" · "}
        <Link href="/paths/B">路径 B</Link>
        {" · "}
        <Link href="/paths/C">路径 C</Link>
      </p>
    </SiteShell>
  );
}
