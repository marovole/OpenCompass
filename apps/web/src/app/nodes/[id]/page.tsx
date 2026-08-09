/** 节点详情 — Phase 1+ 实现 */
type Props = { params: Promise<{ id: string }> };

export default async function NodePage({ params }: Props) {
  const { id } = await params;
  return (
    <main style={{ padding: "3rem 1.5rem", maxWidth: 640, margin: "0 auto" }}>
      <h1>节点</h1>
      <p>
        占位页。目标 id：<code>{id}</code>
      </p>
      <p>
        <a href="/map">← 地图</a>
      </p>
    </main>
  );
}
