import { useState } from "react";
import { Utensils, MessageSquare, Anchor, Wind, ChevronDown, ChevronUp } from "lucide-react";
import { mealSchedule, messageOfTheDay, seaConditions } from "../data/dailyBriefing";

const BriefCard = ({ icon: Icon, title, headerCls, iconCls, children }) => (
  <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
    <div className={`${headerCls} px-4 py-2.5 flex items-center gap-2`}>
      <Icon className={`w-4 h-4 ${iconCls}`} />
      <span className={`text-xs font-bold uppercase tracking-widest ${iconCls}`}>{title}</span>
    </div>
    <div className="px-4 py-3">{children}</div>
  </div>
);

const OfficerBriefing = ({ currentDay }) => {
  const [open, setOpen] = useState(false);
  const idx = (currentDay - 1) % 7;
  const meal = mealSchedule[idx];
  const motd = messageOfTheDay[idx];
  const conditions = seaConditions[idx];
  const inPort = conditions.state === "In Port";

  const statusColor = inPort
    ? "bg-green-500/20 text-green-400 border-green-500/40"
    : "bg-blue-500/20 text-blue-400 border-blue-500/40";

  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between bg-slate-800 border border-slate-700 px-4 py-2.5 hover:bg-slate-750 transition text-left ${
          open ? "rounded-t-lg border-b-0" : "rounded-lg"
        }`}
      >
        <div className="flex items-center gap-4 text-sm">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
            Daily Brief — Day {currentDay}
          </span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${statusColor}`}>
            {conditions.state}
          </span>
          {!open && (
            <span className="text-gray-500 hidden sm:inline truncate max-w-xs">{motd}</span>
          )}
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-gray-500 shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
        )}
      </button>

      {open && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 border border-slate-700 border-t-0 rounded-b-lg p-3 bg-slate-800/50">

          <BriefCard icon={Utensils} title={`Meals — Day ${currentDay}`}
            headerCls="bg-orange-500/20 border-b border-orange-500/40" iconCls="text-orange-400">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-700">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">CS on Duty</span>
                <span className="text-xs font-bold text-orange-400 bg-orange-500/20 border border-orange-500/40 px-2 py-0.5 rounded-full">
                  {meal.cs}
                </span>
              </div>
              {[["Breakfast", meal.breakfast], ["Lunch", meal.lunch], ["Dinner", meal.dinner]].map(([label, item]) => (
                <div key={label}>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">{label}</p>
                  <p className="text-sm text-gray-200 leading-tight">{item}</p>
                </div>
              ))}
            </div>
          </BriefCard>

          <BriefCard icon={MessageSquare} title="Message of the Day"
            headerCls="bg-blue-500/20 border-b border-blue-500/40" iconCls="text-blue-400">
            <p className="text-sm text-gray-300 leading-relaxed">{motd}</p>
            <div className="mt-3 pt-3 border-t border-slate-700 flex justify-between">
              <span className="text-[10px] text-gray-500">Day {currentDay} Briefing</span>
              <span className="text-[10px] font-bold text-gray-500 tracking-wider">UNCLASSIFIED</span>
            </div>
          </BriefCard>

          <BriefCard icon={Anchor} title="Op Status"
            headerCls="bg-cyan-500/20 border-b border-cyan-500/40" iconCls="text-cyan-400">
            <div className="mb-3">
              <span className={`text-sm font-bold px-3 py-1 rounded-full border ${statusColor}`}>
                {conditions.state}
              </span>
            </div>
            <div className="space-y-2">
              {[["Depth", conditions.depth], ["Speed", conditions.speed]].map(([label, val]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-xs text-gray-400">{label}</span>
                  <span className="text-sm font-semibold text-gray-200">{val}</span>
                </div>
              ))}
            </div>
          </BriefCard>

          <BriefCard icon={Wind} title="Sea State"
            headerCls="bg-purple-500/20 border-b border-purple-500/40" iconCls="text-purple-400">
            <div className="space-y-2">
              {[["Visibility", conditions.visibility], ["Wind Speed", conditions.windSpeed], ["Wave Height", conditions.waveHeight]].map(([label, val]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-xs text-gray-400">{label}</span>
                  <span className={`text-sm font-semibold ${val === "N/A" ? "text-gray-500" : "text-gray-200"}`}>{val}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-slate-700">
              <span className="text-[10px] text-gray-600 italic">Simulated conditions</span>
            </div>
          </BriefCard>

        </div>
      )}
    </div>
  );
};

export default OfficerBriefing;
