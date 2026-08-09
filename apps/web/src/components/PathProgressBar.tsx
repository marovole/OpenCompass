"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  isPracticed,
  loadProgress,
  pathStats,
  type ProgressState,
} from "@/lib/progress";

export function PathProgressBar({
  pathId,
  nodeIds,
}: {
  pathId: string;
  nodeIds: string[];
}) {
  const [state, setState] = useState<ProgressState | null>(null);

  useEffect(() => {
    setState(loadProgress());
    const onChange = () => setState(loadProgress());
    window.addEventListener("oc-progress", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("oc-progress", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, [pathId]);

  const stats = pathStats(nodeIds, state ?? undefined);
  const nextId =
    state &&
    nodeIds.find((id) => !isPracticed(id, state));

  return (
    <div className="oc-block" style={{ marginTop: 0 }}>
      <h2>本机进度</h2>
      <p className="oc-meta">
        已完成练习 {stats.done}/{stats.total}
        {stats.done === stats.total && stats.total > 0
          ? " · 本路径练习已走完"
          : ""}
      </p>
      <div
        aria-hidden
        style={{
          height: 6,
          background: "#d5ddd7",
          marginTop: "0.5rem",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${stats.total ? (stats.done / stats.total) * 100 : 0}%`,
            background: "#1f4d3a",
            transition: "width 0.25s ease",
          }}
        />
      </div>
      {nextId ? (
        <p className="oc-list" style={{ marginTop: "0.75rem" }}>
          <Link href={`/nodes/${encodeURIComponent(nextId)}`}>
            继续下一个未练节点 →
          </Link>
        </p>
      ) : null}
    </div>
  );
}
