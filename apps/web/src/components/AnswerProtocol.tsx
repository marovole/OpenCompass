import Link from "next/link";
import {
  PROTOCOL_SECTION_LABELS,
  type AnswerPayload,
  type AskMode,
} from "@/lib/protocol";
import { EDGE_TYPE_LABEL, HUBS } from "@/lib/hubs";
import { proseStyles } from "@/components/SiteShell";

const INTENT_LABEL: Record<string, string> = {
  self: "自我教育",
  next_gen: "代际教育",
  fact: "事实澄清",
  crisis: "安全优先",
};

const MODE_LABEL: Record<AskMode, string> = {
  compose: "地图拼装",
  llm: "协议约束生成",
  crisis: "安全协议",
};

export function AnswerProtocolView({
  answer,
  mode,
  notice,
}: {
  answer: AnswerPayload;
  mode?: AskMode;
  notice?: string;
}) {
  const hub = HUBS.find((h) => h.id === answer.locate.hub);

  return (
    <div>
      <style>{proseStyles}</style>
      <section className="oc-block">
        <h2>定位</h2>
        <p className="oc-meta">
          意图：{INTENT_LABEL[answer.locate.intent] ?? answer.locate.intent}
          {hub ? ` · 枢纽：${hub.id} ${hub.title}` : ""}
          {mode ? ` · 模式：${MODE_LABEL[mode]}` : ""}
        </p>
        {answer.locate.nodeIds.length > 0 ? (
          <ul className="oc-list">
            {answer.locate.nodeIds.map((id) => (
              <li key={id}>
                <Link href={`/nodes/${encodeURIComponent(id)}`}>{id}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="oc-meta">未精确命中节点，已按枢纽/路径降落。</p>
        )}
        {notice ? <p className="oc-meta">{notice}</p> : null}
      </section>

      {(
        [
          ["direct", answer.direct],
          ["mechanism", answer.mechanism],
          ["era_shift", answer.era_shift],
          ["bounds", answer.bounds],
        ] as const
      ).map(([key, text]) => (
        <details key={key} className="oc-block" open>
          <summary
            style={{
              cursor: "pointer",
              fontWeight: 600,
              color: "#3d5a4c",
              letterSpacing: "0.04em",
            }}
          >
            {PROTOCOL_SECTION_LABELS[key]}
          </summary>
          <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.65, marginTop: "0.75rem" }}>
            {text}
          </p>
        </details>
      ))}

      <details className="oc-block oc-list" open>
        <summary
          style={{
            cursor: "pointer",
            fontWeight: 600,
            color: "#3d5a4c",
            letterSpacing: "0.04em",
          }}
        >
          {PROTOCOL_SECTION_LABELS.jumps}
        </summary>
        <ul style={{ marginTop: "0.75rem" }}>
          {answer.jumps.map((j) => (
            <li key={`${j.id}-${j.reason}`}>
              <Link href={`/nodes/${encodeURIComponent(j.id)}`}>{j.id}</Link>
              {j.edgeType ? (
                <span className="oc-meta">
                  {" "}
                  · {EDGE_TYPE_LABEL[j.edgeType] ?? j.edgeType}
                </span>
              ) : null}
              <div className="oc-meta">{j.reason}</div>
            </li>
          ))}
        </ul>
      </details>

      <details className="oc-block" open>
        <summary
          style={{
            cursor: "pointer",
            fontWeight: 600,
            color: "#3d5a4c",
            letterSpacing: "0.04em",
          }}
        >
          {PROTOCOL_SECTION_LABELS.practice}
        </summary>
        <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.65, marginTop: "0.75rem" }}>
          {answer.practice}
        </p>
      </details>
    </div>
  );
}
