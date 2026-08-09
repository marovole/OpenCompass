"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getGraphClient } from "@/lib/graph-client";
import {
  isPracticed,
  loadProgress,
  pathStats,
  type ProgressState,
} from "@/lib/progress";

type Snapshot = {
  paths: { id: string; title: string; nodeIds: string[] }[];
  nodes: { id: string; title: string }[];
};

export function HomeContinue() {
  const [state, setState] = useState<ProgressState | null>(null);
  const [snap, setSnap] = useState<Snapshot | null>(null);

  useEffect(() => {
    setState(loadProgress());
    getGraphClient().then(setSnap).catch(() => setSnap(null));
    const onChange = () => setState(loadProgress());
    window.addEventListener("oc-progress", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("oc-progress", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  if (!state || !snap) return null;

  const lastPath = snap.paths.find((p) => p.id === state.lastPathId);
  const lastNode = snap.nodes.find((n) => n.id === state.lastNodeId);
  const unfinished = snap.nodes
    .filter((n) => !n.id.includes("._hub") && !isPracticed(n.id, state))
    .slice(0, 3);

  const pathDone = lastPath
    ? pathStats(lastPath.nodeIds, state)
    : null;

  const hasSignal =
    Boolean(lastPath) || Boolean(lastNode) || Object.keys(state.practiced).length > 0;

  if (!hasSignal) {
    return (
      <section style={{ marginBottom: "2rem" }}>
        <p style={{ margin: "0 0 0.5rem", color: "#3d5a4c", fontWeight: 600 }}>
          从这里开始
        </p>
        <p style={{ margin: 0, color: "#5a635e", lineHeight: 1.55 }}>
          还没有本机练习记录。可先走{" "}
          <Link href="/paths/D" style={{ color: "#1f4d3a" }}>
            路径 D · 罗盘极简环
          </Link>
          ，或直接{" "}
          <Link href="/ask" style={{ color: "#1f4d3a" }}>
            协议问答
          </Link>
          。
        </p>
      </section>
    );
  }

  return (
    <section style={{ marginBottom: "2rem" }}>
      <p style={{ margin: "0 0 0.65rem", color: "#3d5a4c", fontWeight: 600 }}>
        继续你的地图
      </p>
      <ul
        style={{
          margin: 0,
          paddingLeft: "1.1rem",
          lineHeight: 1.7,
          color: "#2c332f",
        }}
      >
        {lastPath ? (
          <li>
            <Link href={`/paths/${lastPath.id}`} style={{ color: "#1f4d3a" }}>
              继续路径 {lastPath.id} · {lastPath.title}
            </Link>
            {pathDone ? (
              <span style={{ color: "#5a635e" }}>
                {" "}
                （练习 {pathDone.done}/{pathDone.total}）
              </span>
            ) : null}
          </li>
        ) : null}
        {lastNode ? (
          <li>
            <Link
              href={`/nodes/${encodeURIComponent(lastNode.id)}`}
              style={{ color: "#1f4d3a" }}
            >
              回到节点：{lastNode.title}
            </Link>
          </li>
        ) : null}
        {unfinished.length > 0 ? (
          <li>
            未做练习：
            {unfinished.map((n, i) => (
              <span key={n.id}>
                {i > 0 ? "、" : ""}
                <Link
                  href={`/nodes/${encodeURIComponent(n.id)}`}
                  style={{ color: "#1f4d3a" }}
                >
                  {n.title}
                </Link>
              </span>
            ))}
          </li>
        ) : (
          <li style={{ color: "#5a635e" }}>当前已写节点的练习都勾过了——可开 P1 或再走一遍路径。</li>
        )}
      </ul>
    </section>
  );
}
