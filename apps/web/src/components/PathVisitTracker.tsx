"use client";

import { useEffect } from "react";
import { touchPath } from "@/lib/progress";
import { PathProgressBar } from "./PathProgressBar";

export function PathVisitTracker({
  pathId,
  nodeIds,
}: {
  pathId: string;
  nodeIds: string[];
}) {
  useEffect(() => {
    touchPath(pathId, nodeIds[0]);
  }, [pathId, nodeIds]);

  return <PathProgressBar pathId={pathId} nodeIds={nodeIds} />;
}
