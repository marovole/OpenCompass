/** 回答协议 AnswerPayload — 对齐 protocol/answer-protocol-v0.md */

export type Intent = "self" | "next_gen" | "fact" | "crisis";

export type HubId = "H1" | "H2" | "H3" | "H4" | "H5" | "H6";

export type AnswerJump = {
  id: string;
  reason: string;
  edgeType?: string;
};

export type AnswerPayload = {
  locate: {
    intent: Intent;
    nodeIds: string[];
    hub?: HubId;
  };
  direct: string;
  mechanism: string;
  era_shift: string;
  bounds: string;
  jumps: AnswerJump[];
  practice: string;
};

export type AskMode = "compose" | "llm" | "crisis";

export type AskResponse = {
  ok: true;
  mode: AskMode;
  answer: AnswerPayload;
  notice?: string;
};

export type AskError = {
  ok: false;
  error: string;
};

const PLACEHOLDERS = /^(略|todo|n\/a|待补充|待节点补全)?$/i;

export function validateAnswerPayload(
  raw: unknown,
): { ok: true; value: AnswerPayload } | { ok: false; error: string } {
  if (!raw || typeof raw !== "object") {
    return { ok: false, error: "输出不是对象" };
  }
  const a = raw as Partial<AnswerPayload>;
  if (!a.locate || typeof a.locate !== "object") {
    return { ok: false, error: "缺少 locate" };
  }
  const intent = a.locate.intent;
  if (!["self", "next_gen", "fact", "crisis"].includes(intent as string)) {
    return { ok: false, error: "locate.intent 非法" };
  }
  if (!Array.isArray(a.locate.nodeIds)) {
    return { ok: false, error: "locate.nodeIds 必须是数组" };
  }

  const fields: (keyof AnswerPayload)[] = [
    "direct",
    "mechanism",
    "era_shift",
    "bounds",
    "practice",
  ];
  for (const key of fields) {
    const v = a[key];
    if (typeof v !== "string" || !v.trim() || PLACEHOLDERS.test(v.trim())) {
      return { ok: false, error: `字段 ${key} 为空或占位符` };
    }
  }
  if (!Array.isArray(a.jumps) || a.jumps.length < 1) {
    return { ok: false, error: "jumps 至少 1 条" };
  }
  for (const j of a.jumps) {
    if (!j || typeof j.id !== "string" || !j.id.trim()) {
      return { ok: false, error: "jumps[].id 无效" };
    }
    if (typeof j.reason !== "string" || !j.reason.trim()) {
      return { ok: false, error: "jumps[].reason 无效" };
    }
  }

  return {
    ok: true,
    value: {
      locate: {
        intent: intent as Intent,
        nodeIds: a.locate.nodeIds.map(String),
        hub: a.locate.hub as HubId | undefined,
      },
      direct: (a.direct as string).trim(),
      mechanism: (a.mechanism as string).trim(),
      era_shift: (a.era_shift as string).trim(),
      bounds: (a.bounds as string).trim(),
      jumps: a.jumps.map((j) => ({
        id: j.id.trim(),
        reason: j.reason.trim(),
        ...(j.edgeType ? { edgeType: j.edgeType } : {}),
      })),
      practice: (a.practice as string).trim(),
    },
  };
}

export const PROTOCOL_SECTION_LABELS = {
  direct: "直答",
  mechanism: "机制",
  era_shift: "时代坐标",
  bounds: "边界与反例",
  jumps: "跃迁",
  practice: "练习",
} as const;
