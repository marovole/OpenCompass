import type { Metadata } from "next";
import { SiteShell, proseStyles } from "@/components/SiteShell";
import { AskClient } from "./AskClient";

export const metadata: Metadata = {
  title: "协议问答 · OpenCompass",
  description: "按铁律 3 六段协议回答：定位到地图，扩展边界，完成练习",
};

export default function AskPage() {
  return (
    <SiteShell title="协议问答">
      <style>{proseStyles}</style>
      <p className="oc-meta">
        每次有效回答包含直答、机制、时代坐标、边界、跃迁与练习。可折叠，不可删除。
        未配置模型密钥时，用地图节点拼装六段——仍然不是自由闲聊。
      </p>
      <AskClient />
    </SiteShell>
  );
}
