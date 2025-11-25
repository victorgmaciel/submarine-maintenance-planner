import React from "react";
import { Calendar, Filter, X, AlertTriangle, Users } from "lucide-react";

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
  return (
    <div className="bg-slate-800 rounded-lg shadow-lg border border-slate-700">
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            Timeline View
          </h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={selectedDivision}
                onChange={(e) => setSelectedDivision(e.target.value)}
                className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm"
              >
                <option>All</option>
                {divisions.map((div) => (
                  <option key={div}>{div}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-400">Days:</label>
              <input
                type="number"
                value={viewDays}
                onChange={(e) =>
                  setViewDays(Math.max(10, parseInt(e.target.value) || 30))
                }
                className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 w-20 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 overflow-x-auto">
        {/* Timeline Header */}
        <div className="flex border-b-2 border-slate-600 pb-3 mb-4">
          <div className="w-80 font-semibold text-sm text-gray-300 flex items-end">
            Evolution Details
          </div>
          <div className="flex-1 flex flex-col">
            {/* Week markers */}
            <div className="flex mb-1">
              {[...Array(Math.ceil(viewDays / 7))]
                .map((_, i) => (
                  <div
                    key={i}
                    className="text-center text-xs font-bold text-blue-400 border-l-2 border-slate-600 px-2"
                  >
                    Week {i + 1}
                  </div>
                ))
                .concat(<div key="remaining" className="flex-1"></div>)}
            </div>
            {/* Day numbers */}
            <div className="flex">
              {[...Array(viewDays)].map((_, i) => {
                const isWeekStart = i % 7 === 0;
                const isWeekend = i % 7 === 5 || i % 7 === 6;
                return (
                  <div
                    key={i}
                    className={`flex-1 text-center text-xs border-l ${
                      isWeekStart
                        ? "border-slate-600 border-l-2"
                        : "border-slate-700/30"
                    } ${
                      isWeekend ? "text-yellow-400" : "text-gray-400"
                    } font-medium`}
                  >
                    {i + 1}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Timeline Rows */}
        <div className="space-y-2">
          {filteredTasks.map((task) => {
            const conflicts = getTaskConflicts(task.id);
            const barColor = getConflictColor(task);
            const divColors = divisionColors[task.division];
            const leftPercent = ((task.startDay - 1) / viewDays) * 100;
            const widthPercent = (task.duration / viewDays) * 100;

            return (
              <div
                key={task.id}
                className="flex items-center group hover:bg-slate-700/40 rounded-lg transition px-2 py-1"
              >
                <div
                  className={`w-80 pr-4 ${divColors.bg} border-l-4 ${divColors.border} pl-3 py-3 rounded-lg shadow-sm`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate text-white">
                        {task.name}
                      </div>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span
                          className={`${divColors.text} font-bold text-xs px-2 py-0.5 rounded ${divColors.bg} border ${divColors.border}`}
                        >
                          {task.division}
                        </span>
                        <span className="text-xs text-gray-400">
                          {task.system}
                        </span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-400">
                          Day {task.startDay}-
                          {task.startDay + task.duration - 1}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {task.createdBy}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 hover:bg-red-500/20 p-1.5 rounded transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex-1 relative h-16 bg-slate-900/50 rounded-lg border border-slate-700/50">
                  {/* Week dividers */}
                  {[...Array(Math.ceil(viewDays / 7))].map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-0 bottom-0 border-l border-slate-600/50"
                      style={{ left: `${((i * 7) / viewDays) * 100}%` }}
                    />
                  ))}
                  {/* Task bar */}
                  <div
                    className={`absolute h-full ${barColor} rounded-lg flex items-center justify-between px-3 text-xs font-bold cursor-pointer hover:opacity-90 transition shadow-lg border-2 ${
                      conflicts.length > 0
                        ? "border-white/30 animate-pulse"
                        : "border-white/10"
                    }`}
                    style={{
                      left: `${leftPercent}%`,
                      width: `${widthPercent}%`,
                      top: "50%",
                      transform: "translateY(-50%)",
                      height: "75%",
                    }}
                    title={`${task.name}\nDays ${task.startDay} - ${
                      task.startDay + task.duration - 1
                    }\n${task.requirements.crew} crew\n${
                      conflicts.length > 0 ? "HAS CONFLICTS!" : "No conflicts"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      {conflicts.length > 0 && (
                        <AlertTriangle className="w-4 h-4 animate-pulse" />
                      )}
                      <span className="truncate">{task.duration} days</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{task.requirements.crew}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-lg">
              No evolutions scheduled for {selectedDivision}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GanttTimeline;
