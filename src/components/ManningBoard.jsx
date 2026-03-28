import { Users, AlertTriangle, CheckCircle } from "lucide-react";

const AVAIL_STYLES = {
  present: { bg: "bg-green-500/20",  text: "text-green-400",  border: "border-green-500/30",  label: "Present" },
  watch:   { bg: "bg-blue-500/20",   text: "text-blue-400",   border: "border-blue-500/30",   label: "Watch"   },
  TAD:     { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/30", label: "TAD"     },
  leave:   { bg: "bg-slate-600/40",  text: "text-gray-400",   border: "border-slate-600",     label: "Leave"   },
};

const ManningBoard = ({ sailors, tasks, divisions, divisionColors, currentDay }) => {
  const roster = sailors ?? [];

  const total    = roster.length;
  const present  = roster.filter((s) => s.availability === "present").length;
  const watch    = roster.filter((s) => s.availability === "watch").length;
  const tadLeave = roster.filter((s) => s.availability === "TAD" || s.availability === "leave").length;

  // Divisions that have at least one sailor
  const activeDivisions = divisions.filter((div) => roster.some((s) => s.division === div));

  // Active tasks for a given division on currentDay
  const activeDivisionTasks = (div) =>
    (tasks ?? []).filter(
      (t) =>
        t.division === div &&
        t.startDay <= currentDay &&
        t.startDay + t.duration - 1 >= currentDay &&
        t.status !== "complete" &&
        t.status !== "deferred"
    );

  return (
    <div className="space-y-4">
      {/* Summary bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Crew",    value: total,    color: "text-white"        },
          { label: "Present",       value: present,  color: "text-green-400"    },
          { label: "Watch",         value: watch,    color: "text-blue-400"     },
          { label: "TAD / Leave",   value: tadLeave, color: "text-yellow-400"   },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-center">
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Division sections */}
      {activeDivisions.map((div) => {
        const divSailors = roster.filter((s) => s.division === div);
        const divColors  = divisionColors[div] ?? divisionColors["A-Div"];
        const activeTasks = activeDivisionTasks(div);
        const crewRequired = activeTasks.reduce((sum, t) => sum + (t.requirements?.crew ?? 0), 0);
        const presentCount = divSailors.filter((s) => s.availability === "present").length;
        const isUnder = crewRequired > 0 && presentCount < crewRequired;

        return (
          <div key={div} className={`bg-slate-800 border ${divColors.border} rounded-lg overflow-hidden`}>
            {/* Division header */}
            <div className={`px-4 py-2 ${divColors.bg} flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-bold ${divColors.text}`}>{div}</span>
                <span className="text-xs text-gray-400">{divSailors.length} sailors</span>
              </div>
              {crewRequired > 0 && (
                <div className="flex items-center gap-1.5">
                  {isUnder ? (
                    <>
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                      <span className="text-xs text-red-400 font-semibold">
                        Undermanned by {crewRequired - presentCount}
                      </span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-xs text-green-400 font-semibold">Manning OK</span>
                    </>
                  )}
                  <span className="text-xs text-gray-500">({presentCount}/{crewRequired} present/req)</span>
                </div>
              )}
            </div>

            <div className="p-3 space-y-3">
              {/* Sailor cards grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {divSailors.map((sailor) => {
                  const avail = AVAIL_STYLES[sailor.availability] ?? AVAIL_STYLES.leave;
                  return (
                    <div
                      key={sailor.id}
                      className={`rounded-lg p-2 border ${avail.border} ${avail.bg} flex flex-col gap-0.5`}
                    >
                      <span className="text-xs font-semibold text-white truncate">{sailor.name}</span>
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] text-gray-500">{sailor.rate}</span>
                        <span className={`text-[10px] font-bold ${avail.text}`}>{avail.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Active tasks for this division */}
              {activeTasks.length > 0 && (
                <div className="border-t border-slate-700/60 pt-2">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1.5">Active tasks — Day {currentDay}</p>
                  <div className="space-y-1">
                    {activeTasks.map((t) => (
                      <div key={t.id} className="flex items-center justify-between bg-slate-700/40 rounded px-2 py-1">
                        <span className="text-xs text-gray-300 truncate">{t.name}</span>
                        <span className="text-xs text-gray-500 shrink-0 ml-2 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {t.requirements?.crew ?? 0}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {activeDivisions.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No sailors rostered for this vessel.</p>
        </div>
      )}
    </div>
  );
};

export default ManningBoard;
