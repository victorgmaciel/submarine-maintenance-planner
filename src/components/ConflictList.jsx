import React from "react";
import { AlertTriangle } from "lucide-react";

const ConflictList = ({ conflicts, tasks }) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-red-400" />
        Active Conflicts
      </h3>
      {conflicts.length > 0 ? (
        <div className="space-y-2 text-sm max-h-[300px] overflow-y-auto">
          {conflicts.map((conflict, idx) => {
            const t1 = tasks.find((t) => t.id === conflict.task1);
            const t2 = tasks.find((t) => t.id === conflict.task2);
            return (
              <div
                key={idx}
                className="bg-slate-900/50 rounded-lg p-3 border border-red-500/30"
              >
                <div className="flex items-start gap-2">
                  <div
                    className={`mt-0.5 ${
                      conflict.severity === "critical"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {conflict.severity === "critical" ? "⛔" : "⚠️"}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-red-300 uppercase text-xs mb-1">
                      {conflict.severity === "critical"
                        ? "CRITICAL"
                        : "WARNING"}
                    </div>
                    <div className="text-gray-300 text-xs leading-relaxed">
                      <div className="mb-1">
                        {t1?.name} ({t1?.division})
                      </div>
                      <div className="text-gray-500">conflicts with</div>
                      <div className="mt-1">
                        {t2?.name} ({t2?.division})
                      </div>
                    </div>
                    <div className="mt-2 px-2 py-1 bg-slate-800 rounded text-xs text-gray-400">
                      System:{" "}
                      <span className="text-orange-400 font-semibold capitalize">
                        {conflict.resource}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <div className="w-12 h-12 mx-auto mb-3 bg-green-500/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">✓</span>
          </div>
          <p className="text-sm">No conflicts detected</p>
          <p className="text-xs text-gray-600 mt-1">All systems clear</p>
        </div>
      )}
    </div>
  );
};

export default ConflictList;
