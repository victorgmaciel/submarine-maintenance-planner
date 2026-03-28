import { Utensils, MessageSquare, Anchor, Wind } from "lucide-react";
import { mealSchedule, messageOfTheDay, seaConditions } from "../data/dailyBriefing";

const OfficerBriefing = ({ currentDay }) => {
  const idx = (currentDay - 1) % 7;
  const meal = mealSchedule[idx];
  const motd = messageOfTheDay[idx];
  const conditions = seaConditions[idx];
  const inPort = conditions.state === "In Port";

  return (
    <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
      {/* Meal of the Day */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
        <div className="bg-orange-500/20 border-b border-orange-500/40 px-4 py-2.5 flex items-center gap-2">
          <Utensils className="w-4 h-4 text-orange-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-orange-400">
            Meals — Day {currentDay}
          </span>
        </div>
        <div className="px-4 py-3 space-y-2.5">
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
      </div>

      {/* Message of the Day */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
        <div className="bg-blue-500/20 border-b border-blue-500/40 px-4 py-2.5 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Message of the Day</span>
        </div>
        <div className="px-4 py-3">
          <p className="text-sm text-gray-300 leading-relaxed">{motd}</p>
          <div className="mt-3 pt-3 border-t border-slate-700 flex justify-between">
            <span className="text-[10px] text-gray-500">Day {currentDay} Briefing</span>
            <span className="text-[10px] font-bold text-gray-500 tracking-wider">UNCLASSIFIED</span>
          </div>
        </div>
      </div>

      {/* Operational Status */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
        <div className="bg-cyan-500/20 border-b border-cyan-500/40 px-4 py-2.5 flex items-center gap-2">
          <Anchor className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Op Status</span>
        </div>
        <div className="px-4 py-3">
          <div className="mb-3">
            <span className={`text-sm font-bold px-3 py-1 rounded-full border ${
              inPort
                ? "bg-green-500/20 text-green-400 border-green-500/40"
                : "bg-blue-500/20 text-blue-400 border-blue-500/40"
            }`}>
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
        </div>
      </div>

      {/* Sea Conditions */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
        <div className="bg-purple-500/20 border-b border-purple-500/40 px-4 py-2.5 flex items-center gap-2">
          <Wind className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Sea State</span>
        </div>
        <div className="px-4 py-3">
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
        </div>
      </div>
    </div>
  );
};

export default OfficerBriefing;
