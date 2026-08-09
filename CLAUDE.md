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
├── README.md                   # 仓库入口
├── CONSTITUTION.md             # 产品宪法（最高准则）
├── CLAUDE.md                   # 本文件：架构镜像
├── docs/
│   └── engineering-plan-v0.md  # 工程化方案：分层、选型、分阶段交付
└── ontology/
    └── education-map-v0.md     # 教育地图：枢纽、坐标系、种子节点、路径
```

## 文件职责

| 文件 | 本质 |
|------|------|
| `CONSTITUTION.md` | 产品之魂与命名法源。功能、内容、模型行为均不得与之冲突。 |
| `CLAUDE.md` | 架构与协作说明；目录变更时同步更新。 |
| `docs/engineering-plan-v0.md` | 工程化真源：知识平面 / 协议 / Web MVP 的分层与交付顺序。 |
| `ontology/education-map-v0.md` | 认知拓扑真源：六枢纽、三维坐标、节点 schema、36 种子、路径包。 |

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

## 规划中（未落盘）

按 `docs/engineering-plan-v0.md` 执行队列：

- `protocol/` — 回答与跃迁协议、安全红线（Phase 0 闸门）  
- `ontology/schema/` + 编译脚本 — 节点 schema 与 `graph.json`  
- `ontology/nodes/` — 节点正文（先路径 D，再长厚 P0）  
- `LICENSE` / 开源治理 — 与脚手架一并落地  
- `apps/web` — 只读地图闭环 → 协议约束问答  

## 协作原则

1. 先读 `CONSTITUTION.md`，再读 `ontology/education-map-v0.md`；动工程时再读 `docs/engineering-plan-v0.md`。  
2. 对外称呼使用 **OpenCompass**；道 / *paideia* / 经典元框架作深度解释，不作主推品牌。  
3. 新增知识节点须能追溯到道之刻度（五大不变者），并遵守地图 §10 扩展规则；可过期之术不进图。  
4. 架构级变更必须更新本文件。  
5. 中文交互；代码注释中文 + 清晰分块。  
6. 简单优先；默认开源思维。  
7. 工程顺序服从方案：协议 → 可编译内容 → Web 只读 → 协议问答；禁止先堆无协议 Chatbot。
