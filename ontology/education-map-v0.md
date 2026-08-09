# OpenCompass 教育地图 v0

> 从属：`CONSTITUTION.md`  
> 版本：v0.1  
> 状态：草案生效（种子级）  
> 用途：定义认知拓扑——枢纽、坐标系、节点模式、种子清单、跃迁边。不是文章正文库。

---

## 1. 地图是什么

地图回答三个操作问题：

1. **用户落在哪？**（定位）  
2. **下一步往哪走？**（跃迁）  
3. **这对「教自己 / 教下一代」各意味着什么？**（双路径）

核心问题不变：

> 在 AI 大爆发的时代，人类应该如何教育自己，以及如何教育下一代？

**收录铁律**：节点必须能提升可迁移能力/判断力，或帮助传承，或提供不悬浮的社会时代坐标。否则不进图。

---

## 2. 坐标系（三维）

每个节点带三维标签（可多值，但须有主坐标）。

### 2.1 主轴 · 六大枢纽（Hub）

主脊柱。浏览首页与跃迁优先沿枢纽组织。

| ID | 枢纽 | 一句话 | 罗盘指向 |
|----|------|--------|----------|
| H1 | **人机关系** | 我与 AI：协作、边界、依赖、滥用 | 工具在手，判断在人 |
| H2 | **认知与学习** | 如何学、如何忘、如何迁移、如何提问 | 学习力 > 知识点 |
| H3 | **判断与智慧** | 证据、偏见、决策、伦理困境 | 噪声中仍能选 |
| H4 | **品格与身心** | 注意、情绪、身体、意志、诚实 | 完整的人有肉身与品格 |
| H5 | **社会与制度** | 学校、职业、公民、媒体、权力与资本 | 个人嵌在系统里 |
| H6 | **代际传承** | 父母如何教、孩子如何被教、家庭即教室 | 自我与下一代同一链 |

枢纽之间默认全连通；**高杠杆边**见 §5。

### 2.2 辅轴 · 人生阶段（Stage）

用于过滤路径与语气，不单独成「第二套百科」。

| ID | 阶段 | 典型焦点 |
|----|------|----------|
| S0 | 童年早期（约 0–6） | 安全依恋、身体、语言、游戏、边界感萌芽 |
| S1 | 学龄（约 6–12） | 专注、诚实、基础读写算、友谊、屏幕规则 |
| S2 | 青少年（约 12–18） | 身份、深度工作萌芽、性与关系、公民意识、人机边界 |
| S3 | 青年进入社会 | 职业组合、金钱、亲密关系、自学体系 |
| S4 | 成年中期 | 领导/育儿、复利决策、健康、意义 |
| S5 | 老年与传承 | 智慧外显、遗产（物质与认知）、临终与意义 |
| S* | 跨阶段 | 对所有人成立的元能力 |

MVP 种子以 **S\***、**S2–S4**、**S0–S1（经 H6 表达）** 为主。

### 2.3 层级 · 认知深度（Level）

与宪法 L0–L4 一致。节点正文应按层可展开；索引里标「主打层级」。

| Level | 问题 | 地图上的职责 |
|-------|------|--------------|
| L0 事实 | 这是什么 | 定义、消歧、信源 |
| L1 技能 | 怎么做 | 步骤、清单、可练 |
| L2 模型 | 底层规律 | 可迁移框架 |
| L3 系统 | 如何耦合 | 宏观↔微观链接 |
| L4 元认知 | 如何修正思维 | 会学、会教 |

**种子节点最低要求**：至少写清 L0 定义 + L2 一个模型 + L1 一个练习；L3/L4 用边补强。

---

## 3. 节点模式（Schema）

机器可读时用 frontmatter；本版先用表格约定字段。

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | ✓ | 稳定 ID，如 `H2.question-quality` |
| `title` | ✓ | 中文主标题 |
| `title_en` | | 英文标题（开源国际用） |
| `hub` | ✓ | H1–H6 主枢纽 |
| `hubs_secondary` | | 次要枢纽 |
| `stages` | ✓ | S0–S5 / S* |
| `levels` | ✓ | 主打 L0–L4 |
| `summary` | ✓ | ≤80 字：节点在地图上的位置 |
| `self_path` | ✓ | 成人自我教育：学什么 / 练什么 |
| `next_gen_path` | ✓ | 教育下一代：传什么 / 怎么传（无则写「N/A · 成人元能力」） |
| `ai_era_shift` | ✓ | AI 爆发后，本节点优先级或含义如何变了 |
| `edges` | ✓ | 关联节点 ID + 边类型 |
| `practice` | ✓ | 一个 10–30 分钟练习（自我或亲子） |
| `anti_patterns` | | 常见误用 / 鸡汤 / 极端 |
| `status` | ✓ | `seed` / `draft` / `reviewed` |
| `priority` | ✓ | P0（MVP 必写）/ P1 / P2 |

### 边类型（Edge）

| 类型 | 含义 | 跃迁文案倾向 |
|------|------|--------------|
| `is_a` | 属于 / 实例 | 放到更大类别里看 |
| `requires` | 前置 | 先补这块地基 |
| `enables` | 使能 | 练会后解锁 |
| `tensions` | 张力 / 权衡 | 另一端是什么 |
| `macro_of` | 微观→宏观 | 个人动作背后的系统 |
| `micro_of` | 宏观→微观 | 系统如何落到今天 |
| `teaches` | 自我→代际教法 | 如何教孩子/学生 |
| `practiced_as` | 模型→技能 | 落地练法 |
| `see_also` | 弱相关 | 扩展边界 |

**铁律**：重要节点至少有一条 `macro_of` 或 `micro_of`，以及一条指向 H6 或来自 H6 的 `teaches`（纯成人元节点可标 `teaches → H6.xxx` 规划中）。

---

## 4. 六大枢纽详述

### H1 · 人机关系

**枢纽问题**：人如何与 AI 共事，而不把思考外包到萎缩？

**纳入**：能力边界、提示与协作工作流、幻觉与验证、依赖与成瘾、伦理与滥用、儿童与 AI、岗位被重组时的人机分工。  
**不纳入**：具体模型排行榜刷屏、无教育含义的参数竞赛。

### H2 · 认知与学习

**枢纽问题**：信息爆炸后，学习的单位从「记住答案」变成什么？

**纳入**：问题质量、元认知、遗忘与间隔、迁移、深度工作、项目制学习、费曼/输出、课程设计（自学）。  
**不纳入**：应试技巧细则、无迁移的背诵法推销。

### H3 · 判断与智慧

**枢纽问题**：机器会生成流畅文本时，人如何辨别、决策、担责？

**纳入**：认识论基础、信源与证据、认知偏见、概率思维、价值权衡、伦理两难、品味（何谓好）。  
**不纳入**：阴谋论扩音、伪科学清单堆砌（可作反例节点）。

### H4 · 品格与身心

**枢纽问题**：没有注意力、身体与诚实，上面一切都是空中楼阁。

**纳入**：注意力与睡眠、情绪调节、意志与习惯、诚实与勇气、运动与感官、屏幕与多巴胺。  
**不纳入**：极端身材焦虑、医疗诊断替代（健康节点须有边界与就医指引）。

### H5 · 社会与制度

**枢纽问题**：个人学习嵌在哪些系统里？系统如何被 AI 改写？

**纳入**：学校制度与评价、劳动力市场、媒体与注意力经济、公共讨论、权力与激励、公民技能、全球化与本地生活。  
**不纳入**：党派动员文、无坐标的情绪宣泄。

### H6 · 代际传承

**枢纽问题**：如何把可迁移能力变成可教、可示范、可家庭化的实践？

**纳入**：发展关键期、权威与温暖、示范大于说教、家庭屏幕契约、用 AI 伴学的红线、失败与挫折的教法、父母自我教育即教材。  
**不纳入**：鸡娃课表军备竞赛、羞辱式比较。

---

## 5. 枢纽间高杠杆边（骨架）

```
H2 认知与学习 ──requires──▶ H4 品格与身心（注意力/睡眠）
H2 ──enables──▶ H3 判断与智慧
H1 人机关系 ──tensions──▶ H2 / H3（协作 vs 外包思考）
H1 ──macro_of──▶ H5 社会与制度（劳动力/学校）
H3 ──micro_of──▶ H5（公民与媒体素养落地）
H6 代际传承 ──teaches──▶ H1…H5（各能力的教法入口）
H4 ──enables──▶ 全图（身心是底板）
H5 ──macro_of──▶ H6（教育制度约束家庭策略）
```

用户从任意问题进入后，定位到节点 → 沿边做 1–3 步跃迁 → 必问一次：自我路径还是代际路径。

---

## 6. 种子节点清单（36）

状态均为 `seed`。正文未写；本表是建图与写作队列。

### P0 · MVP 必写（18）

先打穿「能演示完整罗盘」的最小闭环。

| id | title | hub | stages | levels | summary |
|----|-------|-----|--------|--------|---------|
| `H1.human-ai-division` | 人机分工：什么留给人 | H1 | S* | L2 L3 | 可自动化与不可让渡的边界 |
| `H1.collaborate-not-replace` | 与 AI 协作而不被替代思考 | H1 | S2–S4 | L1 L4 | 工作流：人定问题与验收，机做草稿与检索 |
| `H1.verify-outputs` | 验证 AI 输出 | H1 | S* | L1 L2 | 幻觉、引用、交叉检验 |
| `H1.child-and-ai` | 孩子与 AI：伴学红线 | H1 | S0–S2 | L1 L3 | 何时用、何时禁用、谁负责判断 |
| `H2.question-quality` | 问题质量 | H2 | S* | L1 L4 | 好问题的结构；稀缺的是提问 |
| `H2.metacognition` | 元认知：觉察自己怎么想 | H2 | S1–S4 | L4 | 计划–监控–修正 |
| `H2.transfer-learning` | 迁移：从学会到会学 | H2 | S* | L2 | 跨情境搬运用法 |
| `H2.deep-work-attention` | 深度工作与注意力 | H2 | S2–S4 | L1 L2 | 与 H4 注意力节点互链 |
| `H3.epistemic-hygiene` | 认知卫生：信源与证据 | H3 | S* | L1 L2 | 在生成式文本时代如何相信 |
| `H3.cognitive-biases` | 认知偏见入门 | H3 | S2–S4 | L0 L2 | 常见偏见与对治；非道德指责 |
| `H3.decision-under-uncertainty` | 不确定下的决策 | H3 | S3–S4 | L2 L3 | 概率、可逆性、机会成本 |
| `H4.attention-sleep` | 注意力与睡眠 | H4 | S* | L0 L1 | 底板能力；无此则学习空转 |
| `H4.honesty-courage` | 诚实与勇气 | H4 | S0–S4 | L2 L4 | 品格核心；与承认「我不会」相连 |
| `H5.school-vs-learning` | 学校与学习：重叠与裂隙 | H5 | S1–S3 | L3 | 制度目标 vs 个人 paideia |
| `H5.labor-ai-recomposition` | AI 与工作重组 | H5 | S3–S4 | L3 | 技能组合、不可替代性叙事的边界 |
| `H6.parent-as-curriculum` | 父母即教材 | H6 | S3–S4 | L4 | 成人自我教育如何变成孩子的环境 |
| `H6.teach-judgment-not-answers` | 教判断，不教标准答案 | H6 | S1–S3 | L1 L2 | 代际侧的核心教法 |
| `H6.family-screen-ai-contract` | 家庭屏幕与 AI 契约 | H6 | S0–S2 | L1 | 可执行的家庭协议模板 |

### P1 · 第一扩环（12）

| id | title | hub | stages | levels | summary |
|----|-------|-----|--------|--------|---------|
| `H1.prompt-as-thinking` | 提示即思维外化 | H1 | S2–S4 | L1 L4 | 提示词训练的是问题分解 |
| `H1.ai-dependency` | AI 依赖与能力萎缩 | H1 | S2–S4 | L2 L4 | 识别外包过度的信号 |
| `H2.spaced-retrieval` | 间隔提取与遗忘 | H2 | S1–S4 | L1 L2 | 记忆科学最小可用 |
| `H2.project-based-learning` | 项目制学习 | H2 | S2–S4 | L1 L2 | 以作品驱动能力 |
| `H2.feynman-output` | 输出与费曼 | H2 | S* | L1 | 教是最好的学 |
| `H3.values-and-tradeoffs` | 价值与权衡 | H3 | S2–S5 | L2 L4 | 无唯一解时的选择框架 |
| `H3.taste-what-is-good` | 品味：何谓好 | H3 | S* | L2 L4 | AI 可模仿风格时人的审美责任 |
| `H4.emotion-regulation` | 情绪调节 | H4 | S0–S4 | L1 L2 | 可教的情绪技能 |
| `H4.habit-willpower` | 习惯与意志 | H4 | S1–S4 | L1 L2 | 环境设计 > 硬扛 |
| `H5.media-attention-economy` | 媒体与注意力经济 | H5 | S2–S4 | L2 L3 | 宏观：为何难专注 |
| `H5.civic-literacy` | 公民素养入门 | H5 | S2–S5 | L1 L3 | 公共议题的读写与参与 |
| `H6.warmth-and-authority` | 温暖与权威 | H6 | S0–S2 | L1 L2 | 教养风格的可操作平衡 |

### P2 · 第二扩环（6）

| id | title | hub | stages | levels | summary |
|----|-------|-----|--------|--------|---------|
| `H1.ai-ethics-abuse` | AI 伦理与滥用边界 | H1 | S2–S4 | L0 L3 | 欺骗、深度伪造、学术不端 |
| `H2.curriculum-design-self` | 自学课程设计 | H2 | S3–S4 | L1 L2 | 给自己排学期 |
| `H3.ethics-dilemmas` | 伦理两难练习 | H3 | S2–S4 | L2 L4 | 结构化两难，非说教 |
| `H4.embodiment-sport` | 身体：运动与感官 | H4 | S* | L1 L2 | 具身认知最小集 |
| `H5.money-agency` | 金钱与能动性 | H5 | S3–S4 | L1 L3 | 经济坐标下的选择空间 |
| `H6.failure-frustration` | 教挫折与失败 | H6 | S0–S3 | L1 L2 | 韧性的可设计练习 |

---

## 7. 种子节点的双路径与练习（P0 摘要）

写作正文时展开；此处约束「不能只有空标题」。

| id | self_path（自我） | next_gen_path（代际） | practice（示例） | 关键 edges |
|----|-------------------|----------------------|------------------|------------|
| `H1.human-ai-division` | 列出本职中「判断/关系/责任」不可外包清单 | 和青少年一起画「人做/机做」表 | 30 分钟：拆解本周 5 个任务的人机边界 | → H5.labor…, H3.decision… |
| `H1.collaborate-not-replace` | 固定「我先写意图与验收标准」再调用 AI | 演示：先口述思路再让 AI 整理 | 一次真实任务走完人机协作环 | → H2.question-quality, H1.verify… |
| `H1.verify-outputs` | 建立默认验证清单 | 让孩子指出 AI 一处错误并说明依据 | 对 AI 答做 3 点交叉验证 | → H3.epistemic-hygiene |
| `H1.child-and-ai` | 家长先自检自己的 AI 依赖 | 年龄分级使用规则 | 家庭会议制定 5 条 AI 使用规则 | → H6.family-screen…, H6.teach-judgment… |
| `H2.question-quality` | 提问前写「已知/未知/成功标准」 | 孩子提问后只追问不急答 | 把一个糊问题改写成 3 个好问题 | → H1.prompt…, H2.metacognition |
| `H2.metacognition` | 学习日志：计划/卡点/修正 | 共读后问「你怎么想到的」 | 一次学习会话三阶段笔记 | → H2.transfer…, H4.honesty… |
| `H2.transfer-learning` | 每学一概念找 2 个外域例子 | 让孩子把课内概念用到家务/游戏 | 迁移卡片一张 | → H2.project…, H3.values… |
| `H2.deep-work-attention` | 每日 50 分钟无通知块 | 家庭「安静钟」仪式 | 今日一次深度块 + 复盘干扰源 | → H4.attention-sleep, H5.media… |
| `H3.epistemic-hygiene` | 信息分级：证据/观点/情绪 | 一起拆一条短视频的证据链 | 为一条新闻标证据等级 | → H1.verify…, H5.media… |
| `H3.cognitive-biases` | 识别自己高频偏见 2 个 | 用故事而非指责介绍偏见 | 决策复盘：我可能踩了哪类偏见 | → H3.decision…, H4.honesty… |
| `H3.decision-under-uncertainty` | 可逆/不可逆分类再决策 | 用「小实验」代替一次赌对 | 为一个真实两难写决策树 | → H5.labor…, H3.values… |
| `H4.attention-sleep` | 睡眠与晨间第一小时保护 | 儿童作息与屏幕时间联动 | 一周睡眠/专注简记 | → H2.deep-work…, H5.media… |
| `H4.honesty-courage` | 练习说「我不知道」 | 奖励诚实过程而非完美答案 | 今日一次公开承认未知 | → H2.metacognition, H6.teach-judgment… |
| `H5.school-vs-learning` | 分清「应试必做」与「真正要学」 | 不把分数当唯一镜子 | 一张双栏表：学校目标 vs 我的 paideia | → H6.parent-as…, H2.curriculum… |
| `H5.labor-ai-recomposition` | 技能组合审计：互补 AI 而非与之竞速 | 和青少年谈「可迁移能力」而非单一热门岗 | 一页纸个人技能组合图 | → H1.human-ai…, H2.transfer… |
| `H6.parent-as-curriculum` | 选一个自己正在学的东西让孩子旁观过程 | 展示「成人也会卡住」 | 亲子共学 20 分钟并复盘 | → H2.metacognition, 全 H 教法边 |
| `H6.teach-judgment-not-answers` | 改掉代搜代答习惯 | 四步：你怎么想→证据→选项→你的决定 | 一次只做引导、不给最终答案的对话 | → H2.question…, H3.epistemic… |
| `H6.family-screen-ai-contract` | 家长先守约 | 孩子参与制定条款 | 签一版家庭契约（可修订） | → H1.child-and-ai, H4.attention… |

---

## 8. 推荐路径包（MVP 可演示）

路径 = 有序节点序列 + 适用角色。不是课程绑架，是「从这里走进地图」。

### 路径 A · 成人自我教育重启（约 7 节点）

```
H4.attention-sleep
  → H2.question-quality
  → H1.collaborate-not-replace
  → H1.verify-outputs
  → H3.epistemic-hygiene
  → H2.metacognition
  → H5.labor-ai-recomposition
```

### 路径 B · 父母：AI 时代怎么教（约 7 节点）

```
H6.parent-as-curriculum
  → H6.teach-judgment-not-answers
  → H1.child-and-ai
  → H6.family-screen-ai-contract
  → H2.question-quality
  → H4.honesty-courage
  → H5.school-vs-learning
```

### 路径 C · 青少年：和 AI 一起长大（约 6 节点）

```
H1.human-ai-division
  → H2.question-quality
  → H1.verify-outputs
  → H3.cognitive-biases
  → H2.deep-work-attention
  → H5.media-attention-economy
```

### 路径 D · 罗盘极简环（演示产品灵魂，4 节点）

```
H2.question-quality
  → H1.collaborate-not-replace
  → H3.epistemic-hygiene
  → H6.teach-judgment-not-answers
```

任意问答结束时，优先推荐：同枢纽下一节点、一条 `macro/micro` 边、一条自我↔代际切换。

---

## 9. 定位算法（产品实现备忘）

对话/搜索命中地图时，最小逻辑：

1. **意图**：自我教育 | 代际教育 | 纯事实 | 危机安全（安全优先退出地图话术）  
2. **枢纽**：关键词 + 向量召回 → H1–H6  
3. **节点**：Top-k 种子/正文；无命中则挂最近枢纽的「枢纽导论」（待建）+ 仍执行回答协议  
4. **路径角色**：按用户角色加权 `self_path` / `next_gen_path`  
5. **跃迁**：强制 3 条——同枢纽深化、跨枢纽系统、自我↔代际切换  

本文件只定拓扑；检索实现归工程。

---

## 10. 扩展规则（反垃圾）

**允许新增节点，当且仅当：**

1. 能指出它服务核心问题的哪一条；  
2. 挂上主枢纽 + 至少 2 条边到现有节点；  
3. 同时草拟 `self_path` 与 `next_gen_path`（或显式 N/A）；  
4. 有一个可执行 `practice`；  
5. 不是情绪宣泄、不是单一产品软广、不是无迁移的碎片技巧。

**优先长厚 P0，再开 P1。** 禁止用「节点数量」当进度。

**枢纽导论节点**（每个 H 一篇）：`H1._hub` … `H6._hub`，P1 补齐，作迷航时的降落点。

---

## 11. 与工程的交接形状（预告）

未来每个节点可落为：

```text
ontology/nodes/H2.question-quality.md
```

建议 frontmatter：

```yaml
id: H2.question-quality
title: 问题质量
hub: H2
stages: [S*]
levels: [L1, L4]
status: seed
priority: P0
edges:
  - { to: H1.collaborate-not-replace, type: enables }
  - { to: H2.metacognition, type: requires }
  - { to: H6.teach-judgment-not-answers, type: teaches }
```

v0 阶段**不强制拆文件**；本总表即唯一真源，拆分时以本表为准迁移。

---

## 12. 一句话

> 六枢纽是罗盘面，L0–L4 是刻度，边是磁针偏转，种子节点是第一批可走的路。  
> 地图不求全——求每一步都让人更会教自己，或更会教下一代。
