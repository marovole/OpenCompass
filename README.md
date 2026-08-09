# OpenCompass

**Open education for humans in the age of AI**  
AI 时代的自我教育与代际教育系统（开源）

> 机器会答题之后，人如何教自己、教下一代？  
> OpenCompass 是开放的认知罗盘与方法地图。

## 核心问题

在 AI 大爆发的时代，人类应该如何教育自己，以及如何教育下一代？

## 文档

| 文件 | 说明 |
|------|------|
| [CONSTITUTION.md](./CONSTITUTION.md) | 产品宪法：使命、铁律、边界、成功定义 |
| [ontology/education-map-v0.md](./ontology/education-map-v0.md) | 教育地图：六大枢纽、种子节点、学习路径 |
| [protocol/answer-protocol-v0.md](./protocol/answer-protocol-v0.md) | 回答与跃迁协议（铁律 3） |
| [protocol/safety.md](./protocol/safety.md) | 安全红线与危机路径 |
| [docs/engineering-plan-v0.md](./docs/engineering-plan-v0.md) | 工程化方案：架构分层、分阶段交付 |
| [CLAUDE.md](./CLAUDE.md) | 架构与协作说明 |

## 哲学内核与底层承诺

主品牌 **OpenCompass**（罗盘：在信息过载与 AI 噪声中给出方向——不是替你走路，是让你不迷路）。  
精神内核：**道**（常理与分寸）× 希腊 *paideia*（完整的人 / 完整的公民）× 中国经典元框架（君子不器、己立立人、知行合一、格致修齐）。

> **我们不追可过期的术，只守不可外包的道。**  
> 术随工具而变；道是肉身、意图、判断、品味与代际责任中，人必须亲自完成的常理与分寸。

## 状态

**Phase 0–1 已落地**：协议与脚手架就绪；路径 D 四节点可编译、可浏览（地图 / 节点 / 路径包）。  
下一步（Phase 2）：六枢纽导航体验完善与路径 A/B/C 内容加厚；其后接 Phase 3 协议问答。

## 本地开发

需要 Node.js 22+ 与 [pnpm](https://pnpm.io/)。

```bash
pnpm install
pnpm compile          # ontology/nodes → ontology/graph.json
pnpm lint:content     # 仅校验，不写文件（若 graph 已存在则比对）
pnpm dev              # 启动 apps/web
pnpm build            # 编译本体 + 构建 Web
```

## 许可

- **代码**（`apps/`、`scripts/` 及工程配置）：[Apache License 2.0](./LICENSE)  
- **内容**（`ontology/`、`protocol/`、`docs/` 及教育节点正文）：[CC BY-SA 4.0](./LICENSE-CONTENT)
