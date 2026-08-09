"use client";

import { useState, useTransition } from "react";
import { AnswerProtocolView } from "@/components/AnswerProtocol";
import type { AskResponse } from "@/lib/protocol";

const EXAMPLES = [
  "怎样向 AI 提问才不被替代思考？",
  "如何教孩子判断，而不是直接给答案？",
  "刷短视频后很难专注，该从哪开始？",
];

export function AskClient() {
  const [question, setQuestion] = useState(EXAMPLES[0]);
  const [result, setResult] = useState<AskResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function submit(q: string) {
    setError(null);
    startTransition(async () => {
      try {
        const res = await fetch("/api/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: q }),
        });
        const data = (await res.json()) as AskResponse | { ok: false; error: string };
        if (!data.ok) {
          setResult(null);
          setError("error" in data ? data.error : "请求失败");
          return;
        }
        setResult(data);
      } catch {
        setError("网络错误");
        setResult(null);
      }
    });
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(question);
        }}
        style={{ marginBottom: "1.5rem" }}
      >
        <label
          htmlFor="q"
          style={{
            display: "block",
            marginBottom: "0.5rem",
            color: "#3d5a4c",
            fontWeight: 600,
          }}
        >
          你的问题
        </label>
        <textarea
          id="q"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={4}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "0.85rem 1rem",
            fontSize: "1.05rem",
            lineHeight: 1.5,
            border: "1px solid #b7c6bd",
            borderRadius: 2,
            background: "rgba(255,255,255,0.55)",
            fontFamily: "inherit",
            resize: "vertical",
          }}
          placeholder="例如：如何和孩子一起制定 AI 使用规则？"
        />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            marginTop: "0.85rem",
            alignItems: "center",
          }}
        >
          <button
            type="submit"
            disabled={pending || !question.trim()}
            style={{
              padding: "0.65rem 1.2rem",
              fontSize: "1rem",
              border: "1px solid #1f4d3a",
              background: pending ? "#9bb5a8" : "#1f4d3a",
              color: "#f4f7f5",
              cursor: pending ? "wait" : "pointer",
              fontFamily: "inherit",
            }}
          >
            {pending ? "定位中…" : "按协议回答"}
          </button>
          <span style={{ color: "#5a635e", fontSize: "0.9rem" }}>
            无自由闲聊模式；输出固定六段
          </span>
        </div>
      </form>

      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ margin: "0 0 0.5rem", color: "#5a635e", fontSize: "0.9rem" }}>
          试一试：
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => {
                setQuestion(ex);
                submit(ex);
              }}
              style={{
                textAlign: "left",
                background: "transparent",
                border: "none",
                padding: 0,
                color: "#1f4d3a",
                textDecoration: "underline",
                textUnderlineOffset: 3,
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "0.98rem",
              }}
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <p style={{ color: "#8b2e2e" }} role="alert">
          {error}
        </p>
      ) : null}

      {result?.ok ? (
        <AnswerProtocolView
          answer={result.answer}
          mode={result.mode}
          notice={result.notice}
        />
      ) : null}
    </div>
  );
}
