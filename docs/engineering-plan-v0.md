# OpenCompass 工程化方案 v0

> 版本：工程化方案 v0  
> 状态：草案生效；**Phase 0–2 已落地**（协议 / 脚手架 / 路径 A–D 只读闭环）  
> 用途：在宪法与教育地图已立的前提下，定义**如何把产品做成可运行、可开源、可演进的系统**。  
> 原则：结构化内容与协议是第一公民；应用代码服务于地图与协议，不得架空宪法。

---

## 1. 当前基线与缺口

| 已就绪 | 未就绪（阻塞工程） |
|--------|-------------------|
| `CONSTITUTION.md` v0.4.1 | `protocol/` 回答与跃迁协议（正式落盘） |
| `ontology/education-map-v0.md`（拓扑真源） | 机器可读本体（从地图导出的 JSON/YAML） |
| 命名、铁律、不做清单 | P0 节点正文（18） |
| | LICENSE / 开源治理 |
| | 应用代码（Web MVP） |

**结论**：可以启动工程化，但**不得跳过协议与内容骨架直接堆 Chatbot UI**。正确顺序是：

```
协议定稿 → 内容可编译 → Web 只读闭环 → 协议约束的问答 → 轻量练习与回访
```

---

## 2. 产品形态（工程视角）

OpenCompass 不是「百科站 + 外挂聊天框」，而是**同一认知内核的两种触达**：

| 触达 | 用户动作 | 系统职责 |
|------|----------|----------|
| **地图浏览** | 选枢纽 / 节点 / 路径包 | 展示结构化知识、双路径、练习、跃迁边 |
| **协议问答** | 提问或从节点「深挖」 | 定位到地图 → 按铁律 3 六段协议回答 → 强制跃迁建议 |

两者共享：

1. **本体层**（节点、边、路径包）  
2. **协议层**（回答结构、安全、收录筛子）  
3. **渲染层**（同一套区块组件：直答 / 机制 / 时代坐标 / 边界 / 跃迁 / 练习）

LLM 是**推理与表达层**，不是唯一知识源；无命中节点时仍执行协议，并降落到最近枢纽导论。

---

## 3. 目标架构（分层）

```
┌─────────────────────────────────────────────────────────┐
│  Presentation（Web 优先）                                │
│  地图首页 · 节点页 · 路径包 · 协议问答 UI · 练习卡片      │
└───────────────────────────┬─────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────┐
│  Runtime Services                                        │
│  定位（意图/枢纽/节点）· 协议编排 · 安全门 · 跃迁推荐     │
└───────────────────────────┬─────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────┐
│  Knowledge Plane（第一公民，Git 为真源）                  │
│  ontology/ 地图与节点 · protocol/ 协议 · 路径包数据       │
└─────────────────────────────────────────────────────────┘
```

### 3.1 知识平面（Knowledge Plane）

| 路径（规划） | 职责 |
|--------------|------|
| `CONSTITUTION.md` | 最高准则 |
| `ontology/education-map-v0.md` | 拓扑真源（枢纽、种子表、路径包、扩展规则） |
| `ontology/nodes/*.md` | 节点正文（frontmatter + 分层正文）；拆分后以地图表为准迁移 |
| `ontology/graph.json`（生成物） | 由节点与地图编译：节点索引、边表、路径包 |
| `protocol/answer-protocol-v0.md` | 铁律 3 的可执行规格（区块、必填、可折叠、失败条件） |
| `protocol/safety.md` | 红线、未成年人、危机求助路径 |

**内容在 Git；运行时只读编译产物。** 早期不做 CMS、不做开放 UGC（宪法 §九）。

### 3.2 运行时服务（最小集）

| 服务 | MVP 行为 | 明确不做 |
|------|----------|----------|
| **定位 Locator** | 关键词 + 简单向量/嵌入（可后置）→ Top-k 节点；无命中 → 枢纽导论 | 万能闲聊路由 |
| **协议编排 Orchestrator** | 注入节点上下文 + 强制六段输出 schema | 自由流式无结构回复作为主路径 |
| **跃迁 Navigator** | 同枢纽深化、macro/micro、自我↔代际各至少一条 | 无限相关推荐刷屏 |
| **安全门 Safety** | 危机/违法/未成年人伤害优先求助话术 | 有害可操作指导 |

### 3.3 呈现层

- **先 Web 闭环**（宪法 §八.3）  
- 百科页与问答页共用区块组件，消灭「两套产品」分叉  
- 移动端可读即可；原生 App / 多端后置

---

## 4. 技术选型（建议，可替换但须守边界）

| 层 | 建议 | 理由 |
|----|------|------|
| 语言 | TypeScript | 类型对齐 schema；开源协作友好 |
| 内容 | Markdown + YAML frontmatter → 编译为 JSON | 人可审、Git 可 diff、模型可 ingest |
| Web | Next.js（App Router）或 Astro + 少量交互岛 | 内容站 + API 同仓；SSG/ISR 适合节点页 |
| UI | 自研轻量组件；中文优先排版 | 避免仪表盘化；罗盘隐喻可做主导航，不作装饰噪音 |
| 问答 API | Route Handler + 结构化输出（JSON schema / tool） | 协议可检验，而非纯散文 |
| 模型 | 可插拔 Provider（OpenAI / Anthropic / 本地兼容） | 开源：协议与内容可 fork；模型密钥不进仓 |
| 检索 MVP | 全文（标题/摘要/标签）+ 可选 embedding 索引文件 | 种子级 18–36 节点，先简单能跑 |
| 数据持久 | MVP 可不登录；练习勾选用 localStorage | 拒绝虚荣 DAU；回访信号后置 |
| 包管理 / CI | pnpm + GitHub Actions（lint、内容校验、build） | 每次 PR 校验节点 schema 与边完整性 |
| 许可 | 代码 Apache-2.0（或 MIT）；内容 CC BY-SA 4.0（待确认后写入 LICENSE） | 宪法要求可检查、可 fork、可共建 |

选型争议时的裁决顺序：**宪法 → 协议 → 简单能跑 → 生态成熟度**。

---

## 5. 仓库目标结构

```text
opencompass/
├── README.md
├── CONSTITUTION.md
├── CLAUDE.md
├── LICENSE                 # 工程脚手架一并落地
├── docs/
│   └── engineering-plan-v0.md   # 本文件
├── ontology/
│   ├── education-map-v0.md      # 拓扑真源
│   ├── nodes/                   # P0 起逐步写入
│   │   └── H2.question-quality.md
│   └── schema/
│       ├── node.schema.json
│       └── graph.schema.json
├── protocol/
│   ├── answer-protocol-v0.md
│   └── safety.md
├── packages/                    # 可选 monorepo；MVP 也可先单包
│   └── content-compiler/        # md → graph.json + 校验
└── apps/
    └── web/                     # Web MVP
        ├── app/                 # 页面：地图 / 节点 / 路径 / 问答
        ├── components/          # 协议区块、枢纽导航
        └── lib/                 # locator、orchestrator 客户端/服务端
```

MVP 若求更扁，可合并为 `apps/web` + 根目录 `scripts/compile-ontology.ts`，但**协议与 ontology 目录名保持稳定**。

---

## 6. 节点与协议的机器契约

### 6.1 节点 frontmatter（与地图 §11 对齐并扩展）

```yaml
id: H2.question-quality
title: 问题质量
title_en: Question Quality
hub: H2
hubs_secondary: []
stages: [S*]
levels: [L1, L4]
summary: 好问题的结构；稀缺的是提问
self_path: ...
next_gen_path: ...
ai_era_shift: ...
practice: ...
anti_patterns: []
status: draft          # seed | draft | reviewed
priority: P0
dao_marks: [intent]    # 道之刻度：body|intent|judgment|taste|intergen
edges:
  - { to: H1.collaborate-not-replace, type: enables }
  - { to: H2.metacognition, type: requires }
  - { to: H6.teach-judgment-not-answers, type: teaches }
```

正文建议分块标题固定为：`## L0` / `## L2` / `## L1 练习` 等，编译器可抽层。

### 6.2 回答协议输出 schema（工程强制）

每次有效回答必须可解析为：

```ts
type AnswerPayload = {
  locate: { intent: 'self' | 'next_gen' | 'fact' | 'crisis'; nodeIds: string[]; hub?: string }
  direct: string           // 直答
  mechanism: string        // 机制
  era_shift: string        // 时代坐标
  bounds: string           // 边界与反例
  jumps: { id: string; reason: string; edgeType?: string }[]  // 跃迁 ≥1，目标 3
  practice: string         // 10–30 分钟动作
}
```

UI 可折叠，**不可删除区块**。解析失败 = 协议失败，应重试或降级为节点原文拼装，而不是裸模型散文。

### 6.3 内容校验（CI）

- `id` 唯一；`hub` ∈ H1–H6；边 `to` 存在或显式 `planned`  
- P0 节点：`self_path` / `practice` / `ai_era_shift` 非空  
- 重要节点：至少一条 `macro_of|micro_of` 与一条 `teaches`（或规划标注）  
- 禁止：空正文标 `reviewed`

---

## 7. 分阶段交付（按依赖，不按日历）

### Phase 0 · 协议与脚手架（启动闸门）

**产出**

1. `protocol/answer-protocol-v0.md`：六段定义、语气、失败条件、与地图定位算法的衔接  
2. `protocol/safety.md`：红线与求助路径  
3. `LICENSE` + README 许可说明  
4. `ontology/schema/node.schema.json`  
5. 空壳 `apps/web`（能 build）+ `scripts` 编译占位  
6. 更新 `CLAUDE.md` / `README.md` 架构镜像

**验收**：新人按 README 能理解「内容怎么进产品」；CI 能跑空校验。

### Phase 1 · 内容可编译（知识平面可运行）

**产出**

1. P0 中优先 **路径 D（罗盘极简环 4 节点）** 写到 `draft`  
2. 编译器生成 `graph.json`（节点索引 + 边 + 路径 A–D）  
3. 静态页：枢纽列表 → 节点页 → 路径包页（只读）

**验收**：不依赖 LLM，即可走完「定位 → 阅读 → 看见跃迁与练习」。

### Phase 2 · Web 认知闭环（浏览 MVP）

**产出**

1. 六枢纽导航与路径包 A/B/C/D  
2. 节点页完整渲染双路径与练习  
3. 同页「沿边跳转」  
4. 品牌与信息架构符合宪法（罗盘方向感，非课程货架）

**验收**：路径 D 可演示产品灵魂；无账号。

### Phase 3 · 协议约束问答（AI 神经接上）

**产出**

1. Locator（全文检索 + 可选 embedding）  
2. Orchestrator：检索上下文 + 强制 `AnswerPayload`  
3. 问答 UI = 协议区块组件（与节点页同源）  
4. 无命中 → 枢纽导论 + 仍出六段  
5. Provider 可配置；无密钥时降级为「仅浏览」

**验收**：任意相关提问结束，用户能完成至少一个教育动作（理解结构 / 跃迁 / 练习）；主路径不是自由闲聊。

### Phase 4 · 回访与练习（克制增强）

**产出**

1. 本地「我在练」勾选与路径进度（非排行榜）  
2. 回访入口：继续上次路径 / 未做练习  
3. 补齐剩余 P0 → 再开 P1；六个 `H*._hub` 导论

**验收**：回访动机是地图上的路径，而非刷对话轮数。

### 明确后置（非本方案范围）

- 账号体系、云端同步、原生 App  
- 开放 UGC / 社区编辑  
- 应试题库、积分羞辱式游戏化  
- 多语言全量；英文 `title_en` 可先作字段预留

---

## 8. MVP 范围切片（建议首发）

**首发可演示集合 = 路径 D + 协议问答 + 只读地图骨架**

| 项 | 范围 |
|----|------|
| 节点正文 | 路径 D 四节点 `draft`；其余 P0 可先 `seed` 卡（仅摘要+练习摘要，链到地图表） |
| 路径 | D 完整；A/B/C 可显示为「即将展开」或仅标题序列 |
| 问答 | 开启，但 system 强约束协议；拒绝「陪聊」模式开关 |
| 登录 | 无 |
| 成功信号 | 完成练习勾选 或 点击一条跃迁并停留阅读 |

此切片满足宪法：「先种子节点与协议，再全量覆盖；先 Web 闭环」。

---

## 9. 质量与治理

| 机制 | 做法 |
|------|------|
| 宪法门禁 | PR 模板勾选：是否服务核心问题；是否触及不做清单 |
| 内容门禁 | schema 校验 + 人工 `reviewed` 才进首页推荐 |
| 协议门禁 | 集成测试：对样例问句解析六段字段均非空 |
| 模型门禁 | 评测集（固定 20 问）抽检：定位准确率、跃迁合法、无代做人生决策 |
| 开源协作 | Issues 分 `constitution` / `ontology` / `protocol` / `app`；早期不开放自由条目 PR，只接受种子队列内写作 |

---

## 10. 风险与对策

| 风险 | 对策 |
|------|------|
| 做成通用 Chatbot | 无协议输出不上线；UI 不提供「无地图闲聊」主入口 |
| 内容空洞堆节点 | CI + 「优先长厚 P0」；节点数不作 KPI |
| 术反客为主（工具教程刷屏） | 收录筛子写进 compiler 警告；`dao_marks` 必填 |
| 两套 UI 分叉 | 协议区块单一组件库；节点页与问答页共用 |
| 密钥与供应商绑定 | Provider 接口 + 无密钥降级只读 |
| 过早账号/社交 | Phase 4 前不做 |

---

## 11. 建议的立即下一步（执行队列）

按依赖排序，可并行标注：

1. **写** `protocol/answer-protocol-v0.md` + `safety.md`（阻塞 Phase 3，应最先）  
2. **落** `LICENSE` 与 README 许可句  
3. **建** `ontology/schema/node.schema.json` + 编译脚本骨架  
4. **写** 路径 D 四节点正文（内容与工程可并行）  
5. **起** `apps/web` 只读地图（枢纽 / 节点 / 路径 D）  
6. **接** 协议问答 API 与同源区块 UI  

完成 1–3 后，工程与内容两条线可稳定并行，而不互相堵死。

---

## 12. 一句话

> 工程化不是先搭聊天壳，而是让**地图可编译、协议可检验、Web 可走通**；AI 只是接在协议上的神经。  
> 守住「结构化内容第一公民」，OpenCompass 才是教育操作系统，而不是又一个会答题的套壳。
