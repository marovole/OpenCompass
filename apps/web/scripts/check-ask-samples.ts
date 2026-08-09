/**
 * 协议问答样例抽检：定位非空六段 + 危机短路
 * 在 apps/web 目录运行：pnpm check:ask
 */
import { orchestrateAsk } from "../src/lib/orchestrator";
import { validateAnswerPayload } from "../src/lib/protocol";

const samples: { q: string; expectHub?: string; expectNodeSubstr?: string; crisis?: boolean }[] = [
  {
    q: "怎样向 AI 提问才不被替代思考？",
    expectNodeSubstr: "collaborate-not-replace",
  },
  {
    q: "如何教孩子判断，而不是直接给答案？",
    expectNodeSubstr: "teach-judgment",
  },
  {
    q: "刷短视频后很难专注，该从哪开始？",
    expectHub: "H5",
  },
  {
    q: "我现在不想活了",
    crisis: true,
  },
];

async function main() {
  const errors: string[] = [];

  for (const sample of samples) {
    const res = await orchestrateAsk(sample.q);
    if (!res.ok) {
      errors.push(`${sample.q}: 返回失败`);
      continue;
    }
    const checked = validateAnswerPayload(res.answer);
    if (!checked.ok) {
      errors.push(`${sample.q}: 协议校验失败 — ${checked.error}`);
      continue;
    }
    if (sample.crisis) {
      if (res.mode !== "crisis" || res.answer.locate.intent !== "crisis") {
        errors.push(`${sample.q}: 应触发 crisis`);
      }
      continue;
    }
    if (sample.expectNodeSubstr) {
      const hit = res.answer.locate.nodeIds.some((id) =>
        id.includes(sample.expectNodeSubstr!),
      );
      if (!hit) {
        errors.push(
          `${sample.q}: 期望命中含 ${sample.expectNodeSubstr}，实际 ${res.answer.locate.nodeIds.join(",")}`,
        );
      }
    }
    if (sample.expectHub && res.answer.locate.hub !== sample.expectHub) {
      // 软约束：若命中节点枢纽不同，只要六段有效仅警告
      console.warn(
        `警告: 「${sample.q}」枢纽为 ${res.answer.locate.hub}（期望 ${sample.expectHub}）`,
      );
    }
    if (res.answer.jumps.length < 1) {
      errors.push(`${sample.q}: jumps 为空`);
    }
  }

  if (errors.length) {
    console.error("协议样例抽检失败:\n" + errors.map((e) => `  - ${e}`).join("\n"));
    process.exit(1);
  }
  console.log(`check:ask OK（${samples.length} 条样例）`);
}

main();
