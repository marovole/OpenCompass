export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          fontFamily:
            '"Source Serif 4", "Noto Serif SC", "Songti SC", Georgia, serif',
          color: "#1a1f1c",
          background:
            "radial-gradient(1200px 600px at 10% -10%, #d8e6df 0%, transparent 55%), radial-gradient(900px 500px at 100% 0%, #e7ddd0 0%, transparent 50%), linear-gradient(165deg, #f3efe6 0%, #e8eee9 48%, #dfe8e3 100%)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
