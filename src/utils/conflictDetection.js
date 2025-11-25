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
