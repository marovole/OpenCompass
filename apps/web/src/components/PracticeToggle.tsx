"use client";

import { useEffect, useState } from "react";
import {
  isPracticed,
  loadProgress,
  setPracticed,
  touchNode,
  type ProgressState,
} from "@/lib/progress";

export function PracticeToggle({
  nodeId,
  practiceText,
}: {
  nodeId: string;
  practiceText: string;
}) {
  const [state, setState] = useState<ProgressState | null>(null);

  useEffect(() => {
    touchNode(nodeId);
    setState(loadProgress());
    const onChange = () => setState(loadProgress());
    window.addEventListener("oc-progress", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("oc-progress", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, [nodeId]);

  const done = state ? isPracticed(nodeId, state) : false;

  return (
    <section className="oc-block">
      <h2>练习</h2>
      <p style={{ lineHeight: 1.65, whiteSpace: "pre-wrap" }}>{practiceText}</p>
      <label
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "0.6rem",
          marginTop: "0.85rem",
          cursor: "pointer",
          color: "#2c332f",
          lineHeight: 1.45,
        }}
      >
        <input
          type="checkbox"
          checked={done}
          onChange={(e) => setState(setPracticed(nodeId, e.target.checked))}
          style={{ marginTop: "0.2rem" }}
        />
        <span>
          我完成了这个练习
          <span style={{ display: "block", color: "#5a635e", fontSize: "0.9rem" }}>
            仅保存在本机，无排行榜、无账号
          </span>
        </span>
      </label>
    </section>
  );
}
