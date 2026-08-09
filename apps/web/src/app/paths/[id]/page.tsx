import Link from "next/link";
import { SiteShell, proseStyles } from "@/components/SiteShell";
import { getGraph, getPath } from "@/lib/ontology";

type Props = { params: Promise<{ id: string }> };

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

  return (
    <SiteShell title={`路径 ${pathPack.id} · ${pathPack.title}`}>
      <style>{proseStyles}</style>
      <p className="oc-meta">
        角色：{pathPack.role}。路径是「从这里走进地图」的有序序列，不是课程绑架。
      </p>
      <ol className="oc-list" style={{ lineHeight: 1.8, paddingLeft: "1.2rem" }}>
        {pathPack.nodeIds.map((nodeId, index) => {
          const node = graph.nodes.find((n) => n.id === nodeId);
          return (
            <li key={nodeId} style={{ marginBottom: "0.75rem" }}>
              <span style={{ color: "#5a635e" }}>{index + 1}. </span>
              {node ? (
                <>
                  <Link href={`/nodes/${encodeURIComponent(nodeId)}`}>
                    {node.title}
                  </Link>
                  <div className="oc-meta" style={{ margin: "0.2rem 0 0" }}>
                    {node.summary}
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
      </p>
    </SiteShell>
  );
}
