import { Calendar, Filter, X, AlertTriangle, Users } from "lucide-react";

const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const GanttTimeline = ({
  filteredTasks,
  selectedDivision,
  setSelectedDivision,
  divisions,
  viewDays,
  setViewDays,
  divisionColors,
  getTaskConflicts,
  getConflictColor,
  deleteTask,
}) => {
  const startDayOfWeek = 1;
  const getDayOfWeek = (day) => (startDayOfWeek + day - 1) % 7;
  const isWeekend = (day) => { const d = getDayOfWeek(day); return d === 0 || d === 6; };
  const weeks = Math.ceil(viewDays / 7);

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 shadow-lg overflow-hidden">
      {/* Header Controls */}
      <div className="px-4 py-3 border-b border-slate-700 flex items-center justify-between gap-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2 shrink-0">
          <Calendar className="w-4 h-4 text-blue-400" />
          Mission Timeline
        </h2>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-1.5 text-sm text-gray-200 outline-none"
            >
              <option>All</option>
              {divisions.map((div) => <option key={div}>{div}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-1 bg-slate-700 border border-slate-600 rounded-lg overflow-hidden">
            {[14, 21, 30, 60].map((d) => (
              <button
                key={d}
                onClick={() => setViewDays(d)}
                className={`px-3 py-1.5 text-xs font-medium transition border-r border-slate-600 last:border-0 ${
                  viewDays === d
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-gray-200 hover:bg-slate-600"
                }`}
              >
                {d}d
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div style={{ minWidth: `${Math.max(900, viewDays * 28 + 280)}px` }}>
          {/* Calendar Header */}
          <div className="flex border-b border-slate-700 bg-slate-900/30">
            <div className="w-72 shrink-0 px-3 py-2 border-r border-slate-700">
              <span className="text-xs text-gray-500 uppercase tracking-wider">Evolution / Division</span>
            </div>
            <div className="flex-1 flex flex-col">
              {/* Week row */}
              <div className="flex border-b border-slate-700/60">
                {[...Array(weeks)].map((_, wi) => {
                  const weekStart = wi * 7 + 1;
                  const weekEnd = Math.min(weekStart + 6, viewDays);
                  const width = ((weekEnd - weekStart + 1) / viewDays) * 100;
                  return (
                    <div
                      key={wi}
                      className="border-r border-slate-700 text-center py-1 text-xs font-bold text-blue-400 uppercase tracking-widest"
                      style={{ width: `${width}%` }}
                    >
                      WK {wi + 1}
                    </div>
                  );
                })}
              </div>
              {/* Day row */}
              <div className="flex">
                {[...Array(viewDays)].map((_, i) => {
                  const day = i + 1;
                  const dow = getDayOfWeek(day);
                  const weekend = isWeekend(day);
                  return (
                    <div
                      key={i}
                      className={`flex-1 text-center py-1 border-r border-slate-700/30 last:border-0 flex flex-col items-center gap-0.5 ${weekend ? "bg-slate-700/20" : ""}`}
                    >
                      <span className={`text-[9px] font-medium ${weekend ? "text-gray-500" : "text-gray-600"}`}>
                        {DAY_LABELS[dow]}
                      </span>
                      <span className={`text-[10px] font-bold ${weekend ? "text-yellow-500/60" : "text-gray-500"}`}>
                        {day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Task rows */}
          <div className="divide-y divide-slate-700/40">
            {filteredTasks.map((task) => {
              const conflicts = getTaskConflicts(task.id);
              const barColor = getConflictColor(task);
              const divColors = divisionColors[task.division];
              const leftPct = ((task.startDay - 1) / viewDays) * 100;
              const widthPct = Math.max((task.duration / viewDays) * 100, 0.5);
              const isLong = task.duration >= 5;

              return (
                <div key={task.id} className="flex items-stretch group hover:bg-slate-700/30 transition">
                  <div className={`w-72 shrink-0 border-r border-slate-700/50 ${divColors.bg} border-l-4 ${divColors.border} pl-3 pr-3 py-2.5 flex items-center justify-between gap-2`}>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white truncate">{task.name}</div>
                      <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                        <span className={`text-xs font-bold ${divColors.text}`}>{task.division}</span>
                        <span className="text-gray-500 text-xs">·</span>
                        <span className="text-gray-400 text-xs">{task.system}</span>
                      </div>
                      <div className="text-gray-500 text-xs mt-0.5 truncate">{task.createdBy}</div>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="opacity-0 group-hover:opacity-100 shrink-0 text-red-400 hover:text-red-300 hover:bg-red-500/20 p-1 rounded transition"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex-1 relative py-2" style={{ minHeight: "52px" }}>
                    {/* Weekend shading */}
                    {[...Array(viewDays)].map((_, i) => {
                      if (!isWeekend(i + 1)) return null;
                      return (
                        <div
                          key={i}
                          className="absolute top-0 bottom-0 bg-slate-700/20"
                          style={{ left: `${(i / viewDays) * 100}%`, width: `${(1 / viewDays) * 100}%` }}
                        />
                      );
                    })}
                    {/* Week dividers */}
                    {[...Array(weeks)].map((_, wi) => (
                      <div
                        key={wi}
                        className="absolute top-0 bottom-0 border-l border-slate-700/40"
                        style={{ left: `${((wi * 7) / viewDays) * 100}%` }}
                      />
                    ))}
                    {/* Task bar */}
                    <div
                      className={`absolute rounded flex items-center justify-between px-2 text-xs font-bold cursor-default shadow-sm ${barColor} ${
                        conflicts.length > 0 ? "ring-1 ring-red-400/60" : ""
                      }`}
                      style={{
                        left: `${leftPct}%`,
                        width: `${widthPct}%`,
                        top: "50%",
                        transform: "translateY(-50%)",
                        height: "65%",
                        minWidth: "4px",
                      }}
                      title={`${task.name}\nDays ${task.startDay}–${task.startDay + task.duration - 1} (${task.duration}d)\n${task.requirements.crew} crew${conflicts.length > 0 ? "\n⚠ HAS CONFLICTS" : ""}`}
                    >
                      {isLong && (
                        <>
                          <div className="flex items-center gap-1 overflow-hidden">
                            {conflicts.length > 0 && <AlertTriangle className="w-3 h-3 shrink-0" />}
                            <span className="truncate opacity-90">{task.duration}d</span>
                          </div>
                          <div className="flex items-center gap-0.5 shrink-0">
                            <Users className="w-2.5 h-2.5" />
                            <span>{task.requirements.crew}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTasks.length === 0 && (
            <div className="text-center py-14 text-gray-500">
              <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm text-gray-400">No evolutions scheduled{selectedDivision !== "All" ? ` for ${selectedDivision}` : ""}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GanttTimeline;
