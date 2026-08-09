import Link from "next/link";
import { SiteShell, proseStyles } from "@/components/SiteShell";
import { getGraph, HUBS, nodesByHub } from "@/lib/ontology";

export const metadata = {
  title: "教育地图 · OpenCompass",
};

const PATH_BLURB: Record<string, string> = {
  A: "适合想重启自学体系的成人",
  B: "适合父母与教育者：AI 时代怎么教",
  C: "适合青少年：和 AI 一起长大",
  D: "四步走完产品灵魂的最小闭环",
};

export default function MapPage() {
  const graph = getGraph();
  const written = new Set(graph.nodes.map((n) => n.id));

  return (
    <SiteShell title="教育地图">
      <style>{proseStyles}</style>
      <p className="oc-meta">
        六枢纽是罗盘面，路径包是入口。当前已编译 {graph.nodes.length}{" "}
        个节点；路径 A–D 均可完整走通。
      </p>

      <section className="oc-block oc-list">
        <h2>从一条路径走进地图</h2>
        <ul style={{ lineHeight: 1.85 }}>
          {graph.paths.map((p) => {
            const ready = p.nodeIds.filter((id) => written.has(id)).length;
            return (
              <li key={p.id}>
                <Link href={`/paths/${p.id}`}>
                  路径 {p.id} · {p.title}
                </Link>
                <span className="oc-meta">
                  {" "}
                  — {PATH_BLURB[p.id] ?? p.role}（{ready}/{p.nodeIds.length}）
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      {HUBS.map((hub) => {
        const nodes = nodesByHub(hub.id);
        return (
          <section key={hub.id} className="oc-block oc-list">
            <h2>
              {hub.id} · {hub.title}
            </h2>
            <p className="oc-meta" style={{ marginTop: 0 }}>
              {hub.blurb}
              {nodes.length ? ` · ${nodes.length} 个已写节点` : ""}
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
    </SiteShell>
  );
}
