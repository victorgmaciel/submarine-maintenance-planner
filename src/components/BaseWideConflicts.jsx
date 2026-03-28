import { AlertTriangle, Globe, CheckCircle } from "lucide-react";

const BaseWideConflicts = ({ crossVesselConflicts }) => {
  const conflicts = crossVesselConflicts ?? [];

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
      <h3 className="font-bold text-base mb-4 flex items-center gap-2">
        <Globe className="w-5 h-5 text-amber-400" />
        Base-Wide Conflicts
      </h3>

      {conflicts.length === 0 ? (
        <div className="flex items-center gap-2 py-4 justify-center">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <p className="text-sm text-green-400">No base-wide conflicts detected</p>
        </div>
      ) : (
        <div className="space-y-2 text-sm max-h-[300px] overflow-y-auto">
          {conflicts.map((c, idx) => {
            const dayStart = c.conflictingDays[0];
            const dayEnd = c.conflictingDays[c.conflictingDays.length - 1];
            const dayRange = dayStart === dayEnd ? `Day ${dayStart}` : `Days ${dayStart}–${dayEnd}`;
            return (
              <div key={idx} className="bg-slate-900/50 rounded-lg p-3 border border-amber-500/30">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                      <span className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                        Shore Shop Conflict
                      </span>
                      <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded">
                        {c.sharedShop}
                      </span>
                      <span className="text-xs text-gray-500">{dayRange}</span>
                    </div>
                    <div className="text-xs text-gray-300 space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-gray-500 shrink-0 w-16 truncate">{c.vesselName1}:</span>
                        <span className="truncate">{c.taskName1}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-gray-500 shrink-0 w-16 truncate">{c.vesselName2}:</span>
                        <span className="truncate">{c.taskName2}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BaseWideConflicts;
