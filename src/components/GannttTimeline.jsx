import { useState } from "react";
import {
  Calendar, Filter, X, AlertTriangle, Users, Lock,
  Package, Download, ChevronLeft, ChevronRight,
} from "lucide-react";
import { STATUS_COLORS, PRIORITY_COLORS } from "../data/constants";
import { exportCSMP } from "../utils/csvExport";

// Fixed pixel width per day column — keeps bars readable regardless of range
const DAY_W = { 14: 72, 21: 58, 30: 46, 60: 30 };
const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MAX_DAYS = 60;
const LEFT_W = 264; // px — left task-info panel

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
  selectedVessel,
  allTasks,
}) => {
  const [weekOffset, setWeekOffset] = useState(0);

  const startDayOfWeek = 1; // treat day-1 as Monday
  const getDow   = (day) => (startDayOfWeek + day - 1) % 7;
  const isWeekend = (day) => { const d = getDow(day); return d === 0 || d === 6; };

  const dayW       = DAY_W[viewDays] ?? 46;
  const windowStart = weekOffset * 7 + 1;
  const windowEnd   = Math.min(windowStart + viewDays - 1, MAX_DAYS);
  const visibleDays = windowEnd - windowStart + 1;
  const maxOffset   = Math.max(0, Math.floor((MAX_DAYS - viewDays) / 7));

  // ── helpers ─────────────────────────────────────────────────────────────
  const getBarStyle = (task) => {
    const s = task.status ?? "scheduled";
    if (s === "complete")    return "bg-green-500";
    if (s === "deferred")    return "bg-amber-500";
    if (s === "in-progress") return "bg-blue-500";
    return getConflictColor(task);  // scheduled → division/conflict colour
  };

  const completedIds = new Set(
    (allTasks ?? []).filter((t) => t.status === "complete").map((t) => t.id)
  );
  const hasPendingDeps = (task) =>
    task.dependsOn?.some((id) => !completedIds.has(id)) ?? false;

  const overlapsWindow = (t) =>
    t.startDay <= windowEnd && t.startDay + t.duration - 1 >= windowStart;

  const barMetrics = (t) => {
    const cStart = Math.max(t.startDay, windowStart);
    const cEnd   = Math.min(t.startDay + t.duration - 1, windowEnd);
    return {
      leftPx:  (cStart - windowStart) * dayW,
      widthPx: Math.max((cEnd - cStart + 1) * dayW, 4),
    };
  };

  const weekRangeLabel = () => {
    const wStart = Math.ceil(windowStart / 7);
    const wEnd   = Math.ceil(windowEnd   / 7);
    return wStart === wEnd ? `Week ${wStart}` : `Wks ${wStart}–${wEnd}`;
  };

  // ── render ───────────────────────────────────────────────────────────────
  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 shadow-lg overflow-hidden">

      {/* ── Toolbar ── */}
      <div className="px-4 py-3 border-b border-slate-700 flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-base font-bold text-white flex items-center gap-2 shrink-0">
          <Calendar className="w-4 h-4 text-blue-400" />
          Mission Timeline
        </h2>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Division filter */}
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-gray-500" />
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-1.5 text-sm text-gray-200 outline-none focus:border-blue-500"
            >
              <option>All</option>
              {divisions.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>

          {/* Zoom (day range) */}
          <div className="flex bg-slate-700 border border-slate-600 rounded-lg overflow-hidden">
            {[14, 21, 30, 60].map((d) => (
              <button
                key={d}
                onClick={() => { setViewDays(d); setWeekOffset(0); }}
                className={`px-3 py-1.5 text-xs font-semibold border-r border-slate-600 last:border-0 transition ${
                  viewDays === d
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-slate-600"
                }`}
              >
                {d}d
              </button>
            ))}
          </div>

          {/* Week navigation */}
          <div className="flex items-center bg-slate-700/60 border border-slate-600 rounded-lg overflow-hidden">
            <button
              onClick={() => setWeekOffset((w) => Math.max(0, w - 1))}
              disabled={weekOffset === 0}
              className="px-2 py-1.5 text-gray-400 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold text-gray-300 px-3 whitespace-nowrap">
              {weekRangeLabel()} &nbsp;·&nbsp; Days {windowStart}–{windowEnd}
            </span>
            <button
              onClick={() => setWeekOffset((w) => Math.min(maxOffset, w + 1))}
              disabled={weekOffset >= maxOffset}
              className="px-2 py-1.5 text-gray-400 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* CSMP export */}
          <button
            onClick={() => exportCSMP(filteredTasks, selectedVessel?.name ?? "vessel")}
            className="flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 border border-slate-600 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
          >
            <Download className="w-3.5 h-3.5 text-green-400" />
            CSMP
          </button>
        </div>
      </div>

      {/* ── Scrollable grid ── */}
      <div className="overflow-x-auto">
        <div style={{ width: LEFT_W + visibleDays * dayW, minWidth: "100%" }}>

          {/* Calendar header */}
          <div className="flex border-b border-slate-700 bg-slate-900/50 sticky top-0 z-10">
            {/* Left stub */}
            <div style={{ width: LEFT_W }} className="shrink-0 border-r border-slate-700 px-3 py-2 flex items-end">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                Evolution / Division
              </span>
            </div>

            {/* Week + day labels */}
            <div style={{ width: visibleDays * dayW }}>
              {/* Week row */}
              <div className="flex border-b border-slate-700/50">
                {[...Array(Math.ceil(visibleDays / 7))].map((_, wi) => {
                  const wdStart = wi * 7;
                  const wdEnd   = Math.min(wdStart + 6, visibleDays - 1);
                  const wDays   = wdEnd - wdStart + 1;
                  const absWk   = Math.ceil((windowStart + wdStart) / 7);
                  const d1      = windowStart + wdStart;
                  const d2      = Math.min(d1 + 6, windowEnd);
                  return (
                    <div
                      key={wi}
                      className="border-r border-slate-700 last:border-0 py-1.5 text-center text-[10px] font-bold text-blue-400 uppercase tracking-widest"
                      style={{ width: wDays * dayW }}
                    >
                      WK {absWk} &nbsp;·&nbsp; {d1}–{d2}
                    </div>
                  );
                })}
              </div>

              {/* Day row */}
              <div className="flex">
                {[...Array(visibleDays)].map((_, i) => {
                  const day     = windowStart + i;
                  const weekend = isWeekend(day);
                  const dow     = getDow(day);
                  return (
                    <div
                      key={i}
                      className={`flex flex-col items-center justify-center py-1 border-r border-slate-700/30 last:border-0 ${
                        weekend ? "bg-slate-700/30" : ""
                      }`}
                      style={{ width: dayW }}
                    >
                      <span className={`text-[9px] font-semibold uppercase ${weekend ? "text-slate-500" : "text-slate-600"}`}>
                        {DAY_LABELS[dow]}
                      </span>
                      <span className={`text-[11px] font-bold leading-tight ${weekend ? "text-slate-500" : "text-slate-400"}`}>
                        {day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Task rows ── */}
          <div className="divide-y divide-slate-700/30">
            {filteredTasks.map((task) => {
              const conflicts   = getTaskConflicts(task.id);
              const barClass    = getBarStyle(task);
              const divColors   = divisionColors[task.division] ?? divisionColors["A-Div"];
              const status      = task.status ?? "scheduled";
              const priority    = task.priority ?? "routine";
              const sc          = STATUS_COLORS[status]   ?? STATUS_COLORS["scheduled"];
              const pc          = PRIORITY_COLORS[priority] ?? PRIORITY_COLORS["routine"];
              const pendingDeps = hasPendingDeps(task);
              const inWindow    = overlapsWindow(task);
              const before      = task.startDay + task.duration - 1 < windowStart;
              const after       = task.startDay > windowEnd;
              const { leftPx, widthPx } = inWindow ? barMetrics(task) : { leftPx: 0, widthPx: 0 };

              return (
                <div
                  key={task.id}
                  className="flex items-stretch group hover:bg-white/[0.02] transition-colors"
                >
                  {/* Left info panel */}
                  <div
                    style={{ width: LEFT_W }}
                    className={`shrink-0 border-r border-slate-700/50 border-l-4 ${divColors.border} pl-3 pr-2 py-2.5 flex items-center gap-2`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white leading-tight truncate">{task.name}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className={`text-xs font-bold ${divColors.text}`}>{task.division}</span>
                        <span className="text-slate-600 text-xs">·</span>
                        <span className="text-slate-400 text-xs truncate">{task.system}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${sc.bg} ${sc.text}`}>
                          {status}
                        </span>
                        {priority !== "routine" && (
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${pc.bg} ${pc.text}`}>
                            {priority}
                          </span>
                        )}
                        {task.dependsOn?.length > 0 && (
                          <Lock className={`w-3 h-3 ${pendingDeps ? "text-amber-400" : "text-slate-600"}`} />
                        )}
                        {task.parts?.length > 0 && (
                          <Package className="w-3 h-3 text-slate-600" />
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="opacity-0 group-hover:opacity-100 shrink-0 text-red-400 hover:text-red-300 p-1 rounded transition"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Timeline track */}
                  <div
                    className="relative"
                    style={{ width: visibleDays * dayW, minHeight: 56 }}
                  >
                    {/* Weekend shading */}
                    {[...Array(visibleDays)].map((_, i) => {
                      if (!isWeekend(windowStart + i)) return null;
                      return (
                        <div
                          key={i}
                          className="absolute top-0 bottom-0 bg-slate-700/25"
                          style={{ left: i * dayW, width: dayW }}
                        />
                      );
                    })}

                    {/* Week dividers */}
                    {[...Array(Math.ceil(visibleDays / 7))].map((_, wi) => (
                      <div
                        key={wi}
                        className="absolute top-0 bottom-0 border-l border-slate-700/40"
                        style={{ left: wi * 7 * dayW }}
                      />
                    ))}

                    {/* Out-of-window hint */}
                    {before && (
                      <div className="absolute inset-0 flex items-center px-2">
                        <span className="text-[10px] text-slate-600 flex items-center gap-0.5">
                          <ChevronLeft className="w-3 h-3" /> Day {task.startDay}
                        </span>
                      </div>
                    )}
                    {after && (
                      <div className="absolute inset-0 flex items-center justify-end px-2">
                        <span className="text-[10px] text-slate-600 flex items-center gap-0.5">
                          Day {task.startDay} <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    )}

                    {/* Task bar */}
                    {inWindow && (
                      <div
                        className={`absolute rounded flex items-center gap-1.5 px-2 text-white shadow ${barClass} ${
                          conflicts.length > 0
                            ? "ring-2 ring-red-400/60 ring-offset-1 ring-offset-slate-800"
                            : ""
                        } ${
                          pendingDeps
                            ? "ring-2 ring-amber-400/60 ring-offset-1 ring-offset-slate-800"
                            : ""
                        }`}
                        style={{
                          left:      leftPx + 2,
                          width:     widthPx - 4,
                          top:       "50%",
                          transform: "translateY(-50%)",
                          height:    32,
                          minWidth:  4,
                        }}
                        title={`${task.name} · Days ${task.startDay}–${task.startDay + task.duration - 1} (${task.duration}d) · ${task.requirements?.crew ?? 0} crew · ${status}${conflicts.length ? " ⚠ CONFLICT" : ""}${pendingDeps ? " 🔒 DEPS PENDING" : ""}`}
                      >
                        {conflicts.length > 0 && (
                          <AlertTriangle className="w-3 h-3 shrink-0 opacity-90" />
                        )}
                        {widthPx >= 90 && (
                          <span className="text-[11px] font-semibold truncate flex-1 opacity-95">
                            {task.name}
                          </span>
                        )}
                        {widthPx >= 48 && (
                          <span className="shrink-0 text-[10px] opacity-80 flex items-center gap-0.5 ml-auto">
                            <Users className="w-2.5 h-2.5" />
                            {task.requirements?.crew ?? 0}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTasks.length === 0 && (
            <div className="text-center py-16 text-slate-500">
              <Calendar className="w-10 h-10 mx-auto mb-3 opacity-20" />
              <p className="text-sm">
                No evolutions scheduled
                {selectedDivision !== "All" ? ` for ${selectedDivision}` : ""}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GanttTimeline;
