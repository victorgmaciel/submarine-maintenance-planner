import { Package, CalendarClock } from "lucide-react";

const QuickStats = ({ tasks, currentDay }) => {
  // Parts needed: incomplete tasks that have at least one part listed
  const partsNeeded = tasks.filter(
    (t) => t.status !== "complete" && t.parts?.length > 0
  );
  const totalParts = partsNeeded.reduce((sum, t) => sum + (t.parts?.length ?? 0), 0);

  // Upcoming: tasks starting within the next 7 days from currentDay
  const upcoming = tasks
    .filter((t) => t.startDay >= currentDay && t.startDay <= currentDay + 6)
    .sort((a, b) => a.startDay - b.startDay);

  const totalCrewNeeded = upcoming.reduce(
    (sum, t) => sum + (t.requirements?.crew ?? 0),
    0
  );

  return (
    <div className="flex flex-col gap-3">
      {/* Parts Needed */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden flex-1">
        <div className="bg-orange-500/20 border-b border-orange-500/40 px-4 py-2.5 flex items-center gap-2">
          <Package className="w-4 h-4 text-orange-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-orange-400">
            Parts Needed
          </span>
        </div>
        <div className="px-4 py-3">
          {partsNeeded.length === 0 ? (
            <p className="text-xs text-gray-500 italic">No parts required for pending tasks.</p>
          ) : (
            <>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-bold text-orange-400">{totalParts}</span>
                <span className="text-xs text-gray-500">line items across {partsNeeded.length} task{partsNeeded.length !== 1 ? "s" : ""}</span>
              </div>
              <div className="space-y-2 max-h-36 overflow-y-auto">
                {partsNeeded.map((t) => (
                  <div key={t.id} className="text-xs">
                    <p className="text-gray-300 font-medium truncate">{t.name}</p>
                    <div className="mt-0.5 space-y-0.5">
                      {t.parts.map((p, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-gray-500">
                          <span className="w-1 h-1 rounded-full bg-orange-500/60 shrink-0" />
                          <span className="truncate">{p.name}</span>
                          {p.nsn && (
                            <span className="shrink-0 font-mono text-[10px] text-gray-600">
                              NSN {p.nsn}
                            </span>
                          )}
                          <span className="shrink-0 text-orange-400 font-semibold">×{p.qty}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Upcoming Work */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden flex-1">
        <div className="bg-cyan-500/20 border-b border-cyan-500/40 px-4 py-2.5 flex items-center gap-2">
          <CalendarClock className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
            Upcoming — Next 7 Days
          </span>
        </div>
        <div className="px-4 py-3">
          {upcoming.length === 0 ? (
            <p className="text-xs text-gray-500 italic">No tasks starting in the next 7 days.</p>
          ) : (
            <>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-bold text-cyan-400">{upcoming.length}</span>
                <span className="text-xs text-gray-500">task{upcoming.length !== 1 ? "s" : ""} · {totalCrewNeeded} crew required</span>
              </div>
              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {upcoming.map((t) => (
                  <div key={t.id} className="flex items-center gap-2 text-xs">
                    <span className="shrink-0 w-10 text-center font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 rounded px-1 py-0.5">
                      D{t.startDay}
                    </span>
                    <span className="text-gray-300 truncate flex-1">{t.name}</span>
                    <span className="shrink-0 text-gray-500">{t.requirements?.crew ?? 0}♟</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
