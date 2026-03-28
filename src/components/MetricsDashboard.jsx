import { AlertTriangle } from "lucide-react";
import { STATUS_COLORS, PRIORITY_COLORS } from "../data/constants";

const MetricsDashboard = ({
  allVesselTasks,
  vessels,
  divisions,
  divisionColors,
  selectedVessel,
}) => {
  const vesselId = selectedVessel?.id;
  const tasks = allVesselTasks?.[vesselId] ?? [];

  // 1. Task Completion
  const totalTasks     = tasks.length;
  const completedTasks = tasks.filter((t) => (t.status ?? "scheduled") === "complete").length;
  const completePct    = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // 2. Workload by Division (sum of durations)
  const divWorkload = divisions.map((div) => ({
    div,
    total: tasks.filter((t) => t.division === div).reduce((s, t) => s + t.duration, 0),
  }));
  const maxWorkload = Math.max(...divWorkload.map((d) => d.total), 1);

  // 3. Status breakdown
  const statusCounts = ["scheduled", "in-progress", "complete", "deferred"].map((s) => ({
    status: s,
    count: tasks.filter((t) => (t.status ?? "scheduled") === s).length,
  }));

  // 4. Priority breakdown
  const priorityCounts = ["routine", "urgent", "emergency"].map((p) => ({
    priority: p,
    count: tasks.filter((t) => (t.priority ?? "routine") === p).length,
  }));

  // 5. Cross-vessel load heatmap (30 days)
  const HEAT_DAYS = 30;
  const heatVessels = vessels ?? [];
  const getCellClass = (load) => {
    if (load === 0)  return "bg-slate-800";
    if (load <= 3)   return "bg-blue-900/60";
    if (load <= 7)   return "bg-blue-600/60";
    return "bg-blue-400/60";
  };
  const heatData = heatVessels.map((v) => {
    const vTasks = allVesselTasks?.[v.id] ?? [];
    const days = Array.from({ length: HEAT_DAYS }, (_, i) => {
      const day = i + 1;
      return vTasks
        .filter((t) => t.startDay <= day && t.startDay + t.duration - 1 >= day)
        .reduce((sum, t) => sum + (t.requirements?.crew ?? 0), 0);
    });
    return { vessel: v, days };
  });

  // 6. Deferred tasks
  const deferredTasks = tasks.filter((t) => (t.status ?? "scheduled") === "deferred");

  return (
    <div className="space-y-4">
      {/* Row 1: Completion + Status + Priority */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Task Completion */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <h3 className="text-sm font-bold text-white mb-3">Task Completion</h3>
          <p className="text-3xl font-bold text-green-400 mb-1">{completePct}%</p>
          <p className="text-xs text-gray-500 mb-3">{completedTasks} of {totalTasks} tasks complete</p>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all"
              style={{ width: `${completePct}%` }}
            />
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <h3 className="text-sm font-bold text-white mb-3">Status Breakdown</h3>
          <div className="grid grid-cols-2 gap-2">
            {statusCounts.map(({ status, count }) => {
              const sc = STATUS_COLORS[status] ?? STATUS_COLORS["scheduled"];
              return (
                <div key={status} className={`rounded-lg p-2 text-center ${sc.bg}`}>
                  <p className={`text-xl font-bold ${sc.text}`}>{count}</p>
                  <p className={`text-[10px] capitalize ${sc.text} opacity-80`}>{status}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Priority Breakdown */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <h3 className="text-sm font-bold text-white mb-3">Priority Breakdown</h3>
          <div className="space-y-2">
            {priorityCounts.map(({ priority, count }) => {
              const pc = PRIORITY_COLORS[priority] ?? PRIORITY_COLORS["routine"];
              return (
                <div key={priority} className={`rounded-lg p-2 flex items-center justify-between ${pc.bg}`}>
                  <span className={`text-xs capitalize font-semibold ${pc.text}`}>{priority}</span>
                  <span className={`text-lg font-bold ${pc.text}`}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Row 2: Workload by Division */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
        <h3 className="text-sm font-bold text-white mb-3">Workload by Division (total task-days)</h3>
        <div className="flex items-end gap-3 h-32">
          {divWorkload.map(({ div, total }) => {
            const divColors = divisionColors[div] ?? divisionColors["A-Div"];
            const heightPct = maxWorkload > 0 ? (total / maxWorkload) * 100 : 0;
            return (
              <div key={div} className="flex flex-col items-center flex-1 h-full justify-end">
                <span className="text-[10px] text-gray-400 mb-1">{total}d</span>
                <div
                  className={`w-full rounded-t ${divColors.bar} min-h-[2px]`}
                  style={{ height: `${heightPct}%` }}
                  title={`${div}: ${total} task-days`}
                />
                <span className={`text-[9px] font-bold mt-1 ${divColors.text} truncate w-full text-center`}>{div}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 3: Cross-Vessel Load Heatmap */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
        <h3 className="text-sm font-bold text-white mb-1">Cross-Vessel Load Heatmap</h3>
        <p className="text-[10px] text-gray-500 mb-3">Crew load per vessel per day (Days 1–30). Darker = heavier load.</p>
        <div className="overflow-x-auto">
          <div className="inline-flex gap-1">
            {heatData.map(({ vessel, days }) => (
              <div key={vessel.id} className="flex flex-col items-center gap-0.5">
                <span className="text-[9px] text-gray-400 font-bold mb-0.5">{vessel.hull.replace(/[^\d]/g, "")}</span>
                {days.map((load, i) => (
                  <div
                    key={i}
                    className={`w-5 h-3 rounded-sm ${getCellClass(load)}`}
                    title={`${vessel.name} Day ${i + 1}: ${load} crew`}
                  />
                ))}
              </div>
            ))}
          </div>
          <p className="text-[9px] text-gray-600 mt-2">Days →  (rotate to read vertically per vessel)</p>
        </div>
      </div>

      {/* Deferred Tasks Alert */}
      {deferredTasks.length > 0 && (
        <div className="bg-slate-800 border border-red-500/30 rounded-lg p-4">
          <h3 className="text-sm font-bold text-red-400 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Deferred Tasks ({deferredTasks.length})
          </h3>
          <div className="space-y-1">
            {deferredTasks.map((t) => (
              <div key={t.id} className="flex items-center justify-between bg-red-500/10 border border-red-500/20 rounded px-3 py-1.5">
                <span className="text-xs text-gray-300">{t.name}</span>
                <span className="text-xs text-gray-500">{t.division} · Days {t.startDay}–{t.startDay + t.duration - 1}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MetricsDashboard;
