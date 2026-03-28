import { useState } from "react";
import { Users, Clock, AlertTriangle, CheckCircle, Activity, ChevronDown, ChevronUp } from "lucide-react";

const statusConfig = {
  heavy:   { label: "Heavy Workload", color: "text-red-400",    bg: "bg-red-500/20",    border: "border-red-500/40",    icon: AlertTriangle },
  active:  { label: "Active",         color: "text-yellow-400", bg: "bg-yellow-500/20", border: "border-yellow-500/40", icon: Activity },
  standby: { label: "Standby",        color: "text-green-400",  bg: "bg-green-500/20",  border: "border-green-500/40",  icon: CheckCircle },
};

const getDivisionStatus = (activeTasks, totalCrew) => {
  if (activeTasks.length === 0) return "standby";
  if (activeTasks.length >= 3 || totalCrew >= 8) return "heavy";
  return "active";
};

const DivisionCard = ({ division, tasks, divisionColors, currentDay }) => {
  const [expanded, setExpanded] = useState(false);
  const colors = divisionColors[division];

  const activeTasks = tasks.filter(
    (t) => t.division === division && currentDay >= t.startDay && currentDay < t.startDay + t.duration
  );
  const upcomingTasks = tasks.filter(
    (t) => t.division === division && t.startDay > currentDay && t.startDay <= currentDay + 5
  );
  const completedTasks = tasks.filter(
    (t) => t.division === division && currentDay >= t.startDay + t.duration
  );

  const totalCrew = activeTasks.reduce((sum, t) => sum + (t.requirements?.crew || 0), 0);
  const statusKey = getDivisionStatus(activeTasks, totalCrew);
  const status = statusConfig[statusKey];
  const StatusIcon = status.icon;

  return (
    <div className={`rounded-lg border ${colors.border} bg-slate-800 overflow-hidden`}>
      {/* Card Header */}
      <div className={`${colors.bg} px-4 py-3 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <span className={`font-bold text-lg ${colors.text}`}>{division}</span>
          <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${status.bg} ${status.border} ${status.color}`}>
            <StatusIcon className="w-3 h-3" />
            {status.label}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />{totalCrew} crew
          </span>
          <span className="flex items-center gap-1">
            <Activity className="w-3.5 h-3.5" />{activeTasks.length} active
          </span>
          <button onClick={() => setExpanded(!expanded)} className="text-gray-500 hover:text-gray-300 transition">
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Active Tasks */}
      <div className="px-4 py-3 space-y-2">
        {activeTasks.length === 0 ? (
          <p className="text-gray-500 text-sm italic">No active evolutions</p>
        ) : (
          activeTasks.map((task) => {
            const daysLeft = task.startDay + task.duration - currentDay;
            const progress = Math.round(((currentDay - task.startDay) / task.duration) * 100);
            return (
              <div key={task.id} className="bg-slate-700/50 rounded-md p-2.5">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="text-sm text-white font-medium leading-tight">{task.name}</span>
                  <span className="text-xs text-gray-400 whitespace-nowrap flex items-center gap-1 shrink-0">
                    <Clock className="w-3 h-3" />{daysLeft}d left
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs text-gray-500">{task.system}</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-xs text-gray-500">{task.requirements?.crew || 0} crew</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-xs text-gray-500">by {task.createdBy}</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-1">
                  <div className={`h-1 rounded-full ${colors.bar}`} style={{ width: `${Math.min(progress, 100)}%` }} />
                </div>
                <div className="flex justify-between mt-0.5">
                  <span className="text-xs text-gray-600">Progress</span>
                  <span className="text-xs text-gray-500">{progress}%</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Expanded: Upcoming + Completed */}
      {expanded && (
        <div className="border-t border-slate-700 px-4 py-3 space-y-3">
          {upcomingTasks.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Upcoming (next 5 days)</p>
              <div className="space-y-1">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between text-sm text-gray-400">
                    <span>{task.name}</span>
                    <span className="text-xs text-gray-500">Day {task.startDay} — {task.duration}d</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {completedTasks.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Completed</p>
              <div className="space-y-1">
                {completedTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between text-sm text-gray-600">
                    <span className="line-through">{task.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                  </div>
                ))}
              </div>
            </div>
          )}
          {upcomingTasks.length === 0 && completedTasks.length === 0 && (
            <p className="text-gray-600 text-sm italic">No upcoming or completed evolutions</p>
          )}
        </div>
      )}
    </div>
  );
};

const DivisionTracker = ({ divisions, tasks, divisionColors, currentDay, setCurrentDay, viewDays }) => {
  const totalActiveTasks = tasks.filter(
    (t) => currentDay >= t.startDay && currentDay < t.startDay + t.duration
  ).length;
  const totalCrew = tasks
    .filter((t) => currentDay >= t.startDay && currentDay < t.startDay + t.duration)
    .reduce((sum, t) => sum + (t.requirements?.crew || 0), 0);
  const heavyDivisions = divisions.filter((div) => {
    const active = tasks.filter(
      (t) => t.division === div && currentDay >= t.startDay && currentDay < t.startDay + t.duration
    );
    const crew = active.reduce((s, t) => s + (t.requirements?.crew || 0), 0);
    return getDivisionStatus(active, crew) === "heavy";
  });

  return (
    <div>
      {/* Summary Bar */}
      <div className="mb-4 bg-slate-800 rounded-lg p-4 border border-slate-700 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider">Current Day</p>
          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
              className="text-gray-400 hover:text-white bg-slate-700 hover:bg-slate-600 w-6 h-6 rounded flex items-center justify-center text-sm transition"
            >‹</button>
            <span className="text-xl font-bold text-white">Day {currentDay}</span>
            <button
              onClick={() => setCurrentDay(Math.min(viewDays, currentDay + 1))}
              className="text-gray-400 hover:text-white bg-slate-700 hover:bg-slate-600 w-6 h-6 rounded flex items-center justify-center text-sm transition"
            >›</button>
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider">Active Evolutions</p>
          <p className="text-xl font-bold text-white mt-1">{totalActiveTasks}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider">Crew Assigned</p>
          <p className="text-xl font-bold text-white mt-1">{totalCrew}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider">Heavy Workload Divs</p>
          <p className="text-xl font-bold mt-1">
            {heavyDivisions.length > 0
              ? <span className="text-red-400">{heavyDivisions.join(", ")}</span>
              : <span className="text-green-400">None</span>
            }
          </p>
        </div>
      </div>

      {/* Division Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {divisions.map((div) => (
          <DivisionCard
            key={div}
            division={div}
            tasks={tasks}
            divisionColors={divisionColors}
            currentDay={currentDay}
          />
        ))}
      </div>
    </div>
  );
};

export default DivisionTracker;
