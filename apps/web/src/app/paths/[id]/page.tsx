/** 路径包 — Phase 1+ 实现 */
type Props = { params: Promise<{ id: string }> };

export default async function PathPage({ params }: Props) {
  const { id } = await params;
  return (
    <main style={{ padding: "3rem 1.5rem", maxWidth: 640, margin: "0 auto" }}>
      <h1>路径 {id}</h1>
      <p>占位页。路径 A–D 元数据已写入 ontology/graph.json 的 paths 字段。</p>
      <p>
        <a href="/">← OpenCompass</a>
      </p>
    </main>
  );
}
