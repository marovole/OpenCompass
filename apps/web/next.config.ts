import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // 让 Server Component 能读到仓库根目录的 ontology/graph.json
  outputFileTracingRoot: path.join(__dirname, "../.."),
  outputFileTracingIncludes: {
    "/**/*": ["../../ontology/graph.json"],
  },
};

export default nextConfig;
