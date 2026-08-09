# OpenCompass

AI 时代的自我教育与代际教育系统（开源）。

> 我们不追可过期的术，只守不可外包的道。  
> 罗盘给出方向；道与 *paideia* 定义何为完整的人——求知、品格、社会与代际一体。

## 核心问题

在 AI 大爆发的时代，人类应该如何教育自己，以及如何教育下一代？

## 命名

| 项 | 值 |
|----|-----|
| 正式名 | **OpenCompass** |
| 隐喻 | 认知罗盘：不替你走路，帮你不迷路 |
| 哲学内核 | **道** × *paideia* × 经典元框架；五大不变者（肉身、意图、判断、品味、代际）为道之刻度 |
| 真北 | 不追可过期的术，只守不可外包的道 |
| 副标 | Open education for humans in the age of AI |
| 历史别名 | OpenPaideia（哲学别称）、LifeWiki（早期代号） |
| 仓库 | https://github.com/marovole/OpenCompass |
| 最高准则 | `CONSTITUTION.md` |

## 架构（当前）

```
opencompass/
├── README.md
├── CONSTITUTION.md
├── CLAUDE.md
├── LICENSE / LICENSE-CONTENT
├── docs/
│   └── engineering-plan-v0.md
├── protocol/
│   ├── answer-protocol-v0.md   # 回答与跃迁协议
│   └── safety.md               # 安全红线
├── ontology/
│   ├── education-map-v0.md     # 拓扑真源
│   ├── schema/                 # node / graph JSON Schema
│   ├── nodes/                  # 节点正文（Phase 1 起写入）
│   └── graph.json              # 编译产物
├── scripts/
│   └── compile-ontology.ts
└── apps/
    └── web/                    # Next.js 空壳（Phase 0）
```

## 文件职责

| 文件 | 本质 |
|------|------|
| `CONSTITUTION.md` | 产品之魂与命名法源。功能、内容、模型行为均不得与之冲突。 |
| `CLAUDE.md` | 架构与协作说明；目录变更时同步更新。 |
| `docs/engineering-plan-v0.md` | 工程化真源：知识平面 / 协议 / Web MVP 的分层与交付顺序。 |
| `protocol/answer-protocol-v0.md` | 铁律 3 可执行规格：`AnswerPayload`、定位、失败降级。 |
| `protocol/safety.md` | 红线、危机路径、禁止代做人生决策。 |
| `ontology/education-map-v0.md` | 认知拓扑真源：六枢纽、三维坐标、节点 schema、36 种子、路径包。 |
| `ontology/schema/*.json` | 节点与编译图的机器契约。 |
| `scripts/compile-ontology.ts` | 节点 MD → `graph.json` 校验与编译。 |
| `apps/web` | Web 呈现；Phase 0 为空壳与路由占位。 |

## 教育地图速览

| 枢纽 | 含义 |
|------|------|
| H1 人机关系 | 协作、边界、验证、儿童与 AI |
| H2 认知与学习 | 提问、元认知、迁移、深度工作 |
| H3 判断与智慧 | 证据、偏见、决策、品味 |
| H4 品格与身心 | 注意、睡眠、诚实、习惯 |
| H5 社会与制度 | 学校、劳动、媒体、公民 |
| H6 代际传承 | 父母即教材、教判断、家庭契约 |

MVP 写作优先：地图内 **P0 共 18 节点**。

## 阶段状态

| 阶段 | 状态 |
|------|------|
| Phase 0 协议与脚手架 | **已落地** |
| Phase 1 内容可编译 / 路径 D 正文 | **已落地**（四节点 `draft` + 只读地图） |
| Phase 2 Web 认知闭环加厚 | 下一步（路径 A/B/C、枢纽导论） |
| Phase 3 协议约束问答 | 排队 |
| Phase 4 练习与回访 | 排队 |

## 协作原则

1. 先读 `CONSTITUTION.md`，再读 `ontology/education-map-v0.md`；动工程时再读 `docs/engineering-plan-v0.md` 与 `protocol/`。  
2. 对外称呼使用 **OpenCompass**；道 / *paideia* / 经典元框架作深度解释，不作主推品牌。  
3. 新增知识节点须能追溯到道之刻度（五大不变者），并遵守地图 §10 扩展规则；可过期之术不进图。  
4. 架构级变更必须更新本文件。  
5. 中文交互；代码注释中文 + 清晰分块。  
6. 简单优先；默认开源思维。  
7. 工程顺序服从方案：协议 → 可编译内容 → Web 只读 → 协议问答；禁止先堆无协议 Chatbot。
