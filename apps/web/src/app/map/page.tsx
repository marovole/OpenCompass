import Link from "next/link";
import { SiteShell, proseStyles } from "@/components/SiteShell";
import { getGraph, HUBS, nodesByHub } from "@/lib/ontology";

export const metadata = {
  title: "教育地图 · OpenCompass",
};

export default function MapPage() {
  const graph = getGraph();
  const written = new Set(graph.nodes.map((n) => n.id));

  return (
    <SiteShell title="教育地图">
      <style>{proseStyles}</style>
      <p className="oc-meta">
        六枢纽是罗盘面。当前已编译 {graph.nodes.length}{" "}
        个节点正文；可先走路径 D 体验最小闭环。
      </p>
      <p className="oc-list" style={{ marginBottom: "2rem" }}>
        <Link href="/paths/D">开始路径 D · 罗盘极简环 →</Link>
      </p>

      {HUBS.map((hub) => {
        const nodes = nodesByHub(hub.id);
        return (
          <section key={hub.id} className="oc-block oc-list">
            <h2>
              {hub.id} · {hub.title}
            </h2>
            <p className="oc-meta" style={{ marginTop: 0 }}>
              {hub.blurb}
            </p>
            {nodes.length === 0 ? (
              <p className="oc-meta">本枢纽节点正文尚未写入（seed）。</p>
            ) : (
              <ul>
                {nodes.map((node) => (
                  <li key={node.id}>
                    <Link href={`/nodes/${encodeURIComponent(node.id)}`}>
                      {node.title}
                    </Link>
                    <span className="oc-meta"> — {node.summary}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}

      <section className="oc-block oc-list">
        <h2>路径包</h2>
        <ul>
          {graph.paths.map((p) => {
            const ready = p.nodeIds.filter((id) => written.has(id)).length;
            return (
              <li key={p.id}>
                <Link href={`/paths/${p.id}`}>
                  路径 {p.id} · {p.title}
                </Link>
                <span className="oc-meta">
                  {" "}
                  — {ready}/{p.nodeIds.length} 节点已写
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </SiteShell>
  );
}
