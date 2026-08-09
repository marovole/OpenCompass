import Link from "next/link";
import { SiteShell, proseStyles } from "@/components/SiteShell";
import { EDGE_TYPE_LABEL, getGraph, getNode, HUBS } from "@/lib/ontology";
import { renderSimpleMarkdown } from "@/lib/markdown";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return getGraph().nodes.map((n) => ({ id: n.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const node = getNode(id);
  return {
    title: node ? `${node.title} · OpenCompass` : "节点 · OpenCompass",
  };
}

export default async function NodePage({ params }: Props) {
  const { id } = await params;
  const node = getNode(id);
  const graph = getGraph();

  if (!node) {
    return (
      <SiteShell title="节点未找到">
        <p>
          尚无 id 为 <code>{id}</code> 的节点正文。可从{" "}
          <Link href="/map">教育地图</Link> 查看已编译节点。
        </p>
      </SiteShell>
    );
  }

  const hub = HUBS.find((h) => h.id === node.hub);
  const bodyHtml = renderSimpleMarkdown(node.body);

  return (
    <SiteShell title={node.title}>
      <style>{proseStyles}</style>
      <p className="oc-meta">
        {hub ? `${node.hub} · ${hub.title}` : node.hub}
        {" · "}
        {node.status}
        {" · "}
        {node.levels.join(" ")}
      </p>
      <p className="oc-meta">{node.summary}</p>

      <section className="oc-block">
        <h2>自我路径</h2>
        <p>{node.self_path}</p>
      </section>
      <section className="oc-block">
        <h2>代际路径</h2>
        <p>{node.next_gen_path}</p>
      </section>
      <section className="oc-block">
        <h2>时代坐标</h2>
        <p>{node.ai_era_shift}</p>
      </section>
      <section className="oc-block">
        <h2>练习</h2>
        <p>{node.practice}</p>
      </section>
      {node.anti_patterns && node.anti_patterns.length > 0 ? (
        <section className="oc-block">
          <h2>边界与反例</h2>
          <ul>
            {node.anti_patterns.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="oc-block oc-prose">
        <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      </section>

      <section className="oc-block oc-list">
        <h2>跃迁</h2>
        <ul>
          {node.edges.map((edge) => {
            const target = graph.nodes.find((n) => n.id === edge.to);
            const label = EDGE_TYPE_LABEL[edge.type] ?? edge.type;
            const planned =
              edge.planned || !target
                ? "（规划中）"
                : "";
            return (
              <li key={`${edge.type}-${edge.to}`}>
                <span>{label} → </span>
                {target ? (
                  <Link href={`/nodes/${encodeURIComponent(edge.to)}`}>
                    {target.title}
                  </Link>
                ) : (
                  <span>
                    <code>{edge.to}</code>
                  </span>
                )}
                {planned ? <span> {planned}</span> : null}
              </li>
            );
          })}
        </ul>
      </section>
    </SiteShell>
  );
}
