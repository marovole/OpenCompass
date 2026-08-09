import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenCompass",
  description: "Open education for humans in the age of AI",
};

const links = [
  { href: "/map", label: "教育地图（占位）" },
  { href: "/paths/D", label: "路径 D · 罗盘极简环（占位）" },
  {
    href: "https://github.com/marovole/OpenCompass/blob/main/CONSTITUTION.md",
    label: "产品宪法",
    external: true,
  },
  {
    href: "https://github.com/marovole/OpenCompass/blob/main/protocol/answer-protocol-v0.md",
    label: "回答协议",
    external: true,
  },
];

export default function HomePage() {
  return (
    <main
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "18vh 1.5rem 4rem",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: "0.85rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#3d5a4c",
        }}
      >
        Open education for humans in the age of AI
      </p>
      <h1
        style={{
          margin: "0.6rem 0 0.8rem",
          fontSize: "clamp(2.6rem, 8vw, 4rem)",
          fontWeight: 600,
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
        }}
      >
        OpenCompass
      </h1>
      <p
        style={{
          margin: "0 0 2rem",
          fontSize: "1.15rem",
          lineHeight: 1.55,
          maxWidth: "36em",
          color: "#2c332f",
        }}
      >
        机器会答题之后，人如何教自己、教下一代。开放的认知罗盘与方法地图——不替你走路，帮你不迷路。
      </p>
      <nav style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            {...(link.external
              ? { target: "_blank", rel: "noreferrer" }
              : {})}
            style={{
              color: "#1f4d3a",
              textUnderlineOffset: 4,
              fontSize: "1.05rem",
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <p
        style={{
          marginTop: "3rem",
          fontSize: "0.9rem",
          color: "#5a635e",
          lineHeight: 1.5,
        }}
      >
        Phase 0 脚手架：协议与本体编译已就绪；地图浏览与协议问答将在后续阶段接通。
      </p>
    </main>
  );
}
