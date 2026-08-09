/** 本地练习与回访进度（非排行榜；仅存本机） */

export const PROGRESS_KEY = "opencompass.progress.v1";

export type ProgressState = {
  /** nodeId → 完成练习的 ISO 时间 */
  practiced: Record<string, string>;
  lastPathId?: string;
  lastNodeId?: string;
  updatedAt: string;
};

export function emptyProgress(): ProgressState {
  return { practiced: {}, updatedAt: new Date().toISOString() };
}

export function loadProgress(): ProgressState {
  if (typeof window === "undefined") return emptyProgress();
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return emptyProgress();
    const parsed = JSON.parse(raw) as ProgressState;
    return {
      practiced: parsed.practiced ?? {},
      lastPathId: parsed.lastPathId,
      lastNodeId: parsed.lastNodeId,
      updatedAt: parsed.updatedAt ?? new Date().toISOString(),
    };
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(state: ProgressState): void {
  if (typeof window === "undefined") return;
  const next = { ...state, updatedAt: new Date().toISOString() };
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("oc-progress", { detail: next }));
}

export function isPracticed(nodeId: string, state?: ProgressState): boolean {
  const s = state ?? loadProgress();
  return Boolean(s.practiced[nodeId]);
}

export function setPracticed(nodeId: string, done: boolean): ProgressState {
  const s = loadProgress();
  if (done) s.practiced[nodeId] = new Date().toISOString();
  else delete s.practiced[nodeId];
  s.lastNodeId = nodeId;
  saveProgress(s);
  return s;
}

export function touchPath(pathId: string, nodeId?: string): ProgressState {
  const s = loadProgress();
  s.lastPathId = pathId;
  if (nodeId) s.lastNodeId = nodeId;
  saveProgress(s);
  return s;
}

export function touchNode(nodeId: string): ProgressState {
  const s = loadProgress();
  s.lastNodeId = nodeId;
  saveProgress(s);
  return s;
}

export function pathStats(
  nodeIds: string[],
  state?: ProgressState,
): { done: number; total: number } {
  const s = state ?? loadProgress();
  const done = nodeIds.filter((id) => Boolean(s.practiced[id])).length;
  return { done, total: nodeIds.length };
}
