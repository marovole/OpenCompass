import Link from "next/link";
import type { ReactNode } from "react";

const pageStyle: React.CSSProperties = {
  maxWidth: 720,
  margin: "0 auto",
  padding: "2.5rem 1.5rem 4rem",
};

const navStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "1rem",
  marginBottom: "2rem",
  fontSize: "0.95rem",
};

const linkStyle: React.CSSProperties = {
  color: "#1f4d3a",
  textUnderlineOffset: 3,
};

export function SiteShell({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <main style={pageStyle}>
      <nav style={navStyle} aria-label="主导航">
        <Link href="/" style={linkStyle}>
          OpenCompass
        </Link>
        <Link href="/map" style={linkStyle}>
          教育地图
        </Link>
        <Link href="/paths/A" style={linkStyle}>
          路径 A
        </Link>
        <Link href="/paths/B" style={linkStyle}>
          路径 B
        </Link>
        <Link href="/paths/C" style={linkStyle}>
          路径 C
        </Link>
        <Link href="/paths/D" style={linkStyle}>
          路径 D
        </Link>
      </nav>
      {title ? (
        <h1
          style={{
            margin: "0 0 1rem",
            fontSize: "clamp(1.8rem, 5vw, 2.4rem)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          {title}
        </h1>
      ) : null}
      {children}
    </main>
  );
}

export const proseStyles = `
  .oc-prose h2 { margin: 2rem 0 0.75rem; font-size: 1.25rem; }
  .oc-prose p { margin: 0.65rem 0; line-height: 1.65; color: #2c332f; }
  .oc-prose ul, .oc-prose ol { margin: 0.5rem 0 0.5rem 1.2rem; line-height: 1.6; }
  .oc-prose li { margin: 0.25rem 0; }
  .oc-prose code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.9em; }
  .oc-prose table { width: 100%; border-collapse: collapse; margin: 1rem 0; font-size: 0.95rem; }
  .oc-prose th, .oc-prose td { text-align: left; padding: 0.45rem 0.5rem; border-bottom: 1px solid #c5d0c9; vertical-align: top; }
  .oc-prose th { color: #3d5a4c; font-weight: 600; }
  .oc-meta { margin: 0 0 1.25rem; color: #5a635e; line-height: 1.55; font-size: 0.98rem; }
  .oc-block { margin: 1.5rem 0; padding-top: 1rem; border-top: 1px solid #c5d0c9; }
  .oc-block h2 { margin: 0 0 0.5rem; font-size: 1.05rem; letter-spacing: 0.04em; color: #3d5a4c; font-weight: 600; }
  .oc-list a { color: #1f4d3a; text-underline-offset: 3px; }
`;
