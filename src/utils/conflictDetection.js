import { SHORE_SHOP_MAP } from "../data/constants";

export const detectConflicts = (tasks) => {
  const conflicts = [];

  for (let i = 0; i < tasks.length; i++) {
    for (let j = i + 1; j < tasks.length; j++) {
      const task1 = tasks[i];
      const task2 = tasks[j];

      // Check if tasks overlap in time
      const task1End = task1.startDay + task1.duration - 1;
      const task2End = task2.startDay + task2.duration - 1;

      const overlaps = !(
        task1End < task2.startDay || task2End < task1.startDay
      );

      if (overlaps) {
        // Check for resource conflicts
        Object.keys(task1.requirements).forEach((resource) => {
          if (resource === "crew") return; // Skip crew for conflict detection

          const req1 = task1.requirements[resource];
          const req2 = task2.requirements[resource];

          // Critical conflict: one requires and other shuts down
          if (
            (req1 === "required" && req2 === "shutdown") ||
            (req1 === "shutdown" && req2 === "required")
          ) {
            conflicts.push({
              task1: task1.id,
              task2: task2.id,
              resource: resource,
              type: "incompatible",
              severity: "critical",
            });
          }

          // Warning: both require shutdown (coordination needed)
          if (req1 === "shutdown" && req2 === "shutdown") {
            conflicts.push({
              task1: task1.id,
              task2: task2.id,
              resource: resource,
              type: "coordination",
              severity: "warning",
            });
          }
        });
      }
    }
  }

  return conflicts;
};

export const getTaskConflicts = (taskId, conflicts) => {
  return conflicts.filter((c) => c.task1 === taskId || c.task2 === taskId);
};

export const getConflictColor = (task, conflicts, divisionColors) => {
  const taskConflicts = getTaskConflicts(task.id, conflicts);
  const divColors = divisionColors[task.division];

  if (taskConflicts.some((c) => c.severity === "critical")) return "bg-red-500";
  if (taskConflicts.some((c) => c.severity === "warning"))
    return "bg-yellow-500";
  return divColors.bar;
};

export const detectBaseWideConflicts = (allVesselTasks, vessels) => {
  const conflicts = [];
  const vesselList = vessels ?? [];

  for (let i = 0; i < vesselList.length; i++) {
    for (let j = i + 1; j < vesselList.length; j++) {
      const v1 = vesselList[i];
      const v2 = vesselList[j];
      const tasks1 = allVesselTasks[v1.id] ?? [];
      const tasks2 = allVesselTasks[v2.id] ?? [];

      for (const t1 of tasks1) {
        for (const t2 of tasks2) {
          const t1End = t1.startDay + t1.duration - 1;
          const t2End = t2.startDay + t2.duration - 1;
          const overlaps = !(t1End < t2.startDay || t2End < t1.startDay);
          if (!overlaps) continue;

          for (const [key, shopName] of Object.entries(SHORE_SHOP_MAP)) {
            const r1 = t1.requirements?.[key];
            const r2 = t2.requirements?.[key];
            if (
              (r1 === "required" || r1 === "shutdown") &&
              (r2 === "required" || r2 === "shutdown")
            ) {
              const overlapStart = Math.max(t1.startDay, t2.startDay);
              const overlapEnd = Math.min(t1End, t2End);
              const conflictingDays = [];
              for (let d = overlapStart; d <= overlapEnd; d++) conflictingDays.push(d);

              conflicts.push({
                vesselId1: v1.id,
                vesselName1: v1.name,
                taskId1: t1.id,
                taskName1: t1.name,
                vesselId2: v2.id,
                vesselName2: v2.name,
                taskId2: t2.id,
                taskName2: t2.name,
                sharedShop: shopName,
                conflictingDays,
              });
              break; // one conflict entry per task pair is enough
            }
          }
        }
      }
    }
  }

  return conflicts;
};
