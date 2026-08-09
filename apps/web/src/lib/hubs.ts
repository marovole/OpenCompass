/** 可在客户端安全引用的地图常量（无 fs） */

export const HUBS: { id: string; title: string; blurb: string }[] = [
  { id: "H1", title: "人机关系", blurb: "协作、边界、依赖、滥用" },
  { id: "H2", title: "认知与学习", blurb: "提问、元认知、迁移、深度工作" },
  { id: "H3", title: "判断与智慧", blurb: "证据、偏见、决策、品味" },
  { id: "H4", title: "品格与身心", blurb: "注意、睡眠、诚实、习惯" },
  { id: "H5", title: "社会与制度", blurb: "学校、劳动、媒体、公民" },
  { id: "H6", title: "代际传承", blurb: "父母即教材、教判断、家庭契约" },
];

export const EDGE_TYPE_LABEL: Record<string, string> = {
  is_a: "属于",
  requires: "前置",
  enables: "使能",
  tensions: "张力",
  macro_of: "微观→宏观",
  micro_of: "宏观→微观",
  teaches: "代际教法",
  practiced_as: "落地练法",
  see_also: "参见",
};
