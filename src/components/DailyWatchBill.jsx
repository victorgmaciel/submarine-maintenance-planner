import { Users, Wrench, AlertTriangle } from "lucide-react";

const DailyWatchBill = ({
  currentDay,
  setCurrentDay,
  viewDays,
  dailyInfo,
  tasks,
  divisionColors,
  getTaskConflicts,
}) => {
  const activeTasks = tasks.filter(
    (t) => currentDay >= t.startDay && currentDay < t.startDay + t.duration
  );

  return (
    <div className="mb-6 bg-gradient-to-r from-slate-800 to-slate-700 border-2 border-yellow-500/50 rounded-lg p-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-2xl flex items-center gap-3 text-yellow-400">
          <Users className="w-8 h-8" />
          Daily Watch Bill - Day {currentDay}
        </h3>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
            className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg transition font-semibold disabled:opacity-40"
            disabled={currentDay === 1}
          >
            ← Previous Day
          </button>
          <div className="bg-slate-900 border-2 border-yellow-500 rounded-lg px-5 py-2 text-center">
            <div className="text-gray-400 text-xs mb-1">Current Day</div>
            <input
              type="number"
              value={currentDay}
              onChange={(e) =>
                setCurrentDay(Math.max(1, Math.min(viewDays, parseInt(e.target.value) || 1)))
              }
              className="bg-transparent border-none text-center text-3xl font-bold text-yellow-400 w-20 outline-none"
              min="1"
              max={viewDays}
            />
          </div>
          <button
            onClick={() => setCurrentDay(Math.min(viewDays, currentDay + 1))}
            className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg transition font-semibold disabled:opacity-40"
            disabled={currentDay === viewDays}
          >
            Next Day →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Watch Personnel */}
        <div className="space-y-4">
          <h4 className="text-lg font-bold text-gray-300 mb-3">Watch Assignments</h4>

          <div className="bg-slate-900/60 border-2 border-blue-500/50 rounded-lg p-4 hover:border-blue-500 transition">
            <div className="text-blue-400 text-sm font-bold mb-2 uppercase tracking-wider">Officer of the Day</div>
            <div className="text-white text-xl font-bold">{dailyInfo[currentDay]?.ood || "Not Assigned"}</div>
            <div className="mt-2 text-gray-400 text-xs">OOD</div>
          </div>

          <div className="bg-slate-900/60 border-2 border-green-500/50 rounded-lg p-4 hover:border-green-500 transition">
            <div className="text-green-400 text-sm font-bold mb-2 uppercase tracking-wider">Chief of the Boat</div>
            <div className="text-white text-xl font-bold">{dailyInfo[currentDay]?.cob || "Not Assigned"}</div>
            <div className="mt-2 text-gray-400 text-xs">COB</div>
          </div>

          <div className="bg-slate-900/60 border-2 border-yellow-500/50 rounded-lg p-4 hover:border-yellow-500 transition">
            <div className="text-yellow-400 text-sm font-bold mb-2 uppercase tracking-wider">Duty Section</div>
            <div className="text-white text-5xl font-bold text-center py-2">{dailyInfo[currentDay]?.section || "N/A"}</div>
            <div className="mt-2 text-gray-400 text-xs text-center">Section on Watch</div>
          </div>
        </div>

        {/* Operations */}
        <div className="lg:col-span-2 bg-slate-900/60 border-2 border-orange-500/50 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold text-orange-400 flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              Operations of the Day
            </h4>
            <div className="text-sm text-gray-400">{activeTasks.length} Active</div>
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {activeTasks.length > 0 ? (
              activeTasks.map((task) => {
                const divColors = divisionColors[task.division];
                const conflicts = getTaskConflicts(task.id);
                const dayProgress = currentDay - task.startDay + 1;
                const progressPercent = (dayProgress / task.duration) * 100;

                return (
                  <div key={task.id} className={`${divColors.bg} border-2 ${divColors.border} rounded-lg p-4 hover:shadow-lg transition`}>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1">
                        <div className="font-bold text-white text-base mb-1">{task.name}</div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`${divColors.text} text-xs font-bold px-2 py-1 rounded border ${divColors.border} bg-black/20`}>
                            {task.division}
                          </span>
                          <span className="text-xs text-gray-400 bg-slate-900/50 px-2 py-1 rounded">{task.system}</span>
                          <span className="text-xs text-gray-400 bg-slate-900/50 px-2 py-1 rounded">{task.createdBy}</span>
                        </div>
                      </div>
                      {conflicts.length > 0 && (
                        <div className="flex items-center gap-1 bg-red-900/50 px-2 py-1 rounded">
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                          <span className="text-xs text-red-400 font-bold">{conflicts.length}</span>
                        </div>
                      )}
                    </div>

                    <div className="mb-2">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Day {dayProgress} of {task.duration}</span>
                        <span>{Math.round(progressPercent)}%</span>
                      </div>
                      <div className="w-full bg-slate-900/50 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${conflicts.length > 0 ? "bg-red-500" : "bg-green-500"}`}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap mt-3 pt-3 border-t border-slate-700">
                      <span className="text-xs text-gray-400">Resources:</span>
                      {Object.entries(task.requirements).map(([resource, state]) => {
                        if (resource === "crew") {
                          return (
                            <span key={resource} className="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded border border-blue-700">
                              <Users className="w-3 h-3 inline mr-1" />{state} crew
                            </span>
                          );
                        }
                        if (state !== "none") {
                          const cls =
                            state === "shutdown"
                              ? "bg-red-900/50 text-red-300 border-red-700"
                              : state === "required"
                              ? "bg-yellow-900/50 text-yellow-300 border-yellow-700"
                              : "bg-gray-900/50 text-gray-300 border-gray-700";
                          return (
                            <span key={resource} className={`text-xs px-2 py-1 rounded border capitalize ${cls}`}>
                              {resource}: {state}
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>

                    {conflicts.length > 0 && (
                      <div className="mt-3 bg-red-900/30 border border-red-500/50 rounded p-2">
                        <div className="text-xs text-red-300 font-semibold">
                          ⚠️ {conflicts.length} conflict{conflicts.length > 1 ? "s" : ""} detected
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16 text-gray-500">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-4xl">✓</span>
                </div>
                <p className="text-lg font-semibold">No Operations Scheduled</p>
                <p className="text-sm mt-1">All systems nominal for Day {currentDay}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyWatchBill;
