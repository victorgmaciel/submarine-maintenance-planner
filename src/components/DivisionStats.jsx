import React from "react";
import { Users } from "lucide-react";

const DivisionStats = ({ divisions, divisionColors, tasks }) => {
  const getDivisionStats = () => {
    const stats = {};
    divisions.forEach((div) => {
      const divTasks = tasks.filter((t) => t.division === div);
      const totalCrew = divTasks.reduce(
        (sum, t) => sum + t.requirements.crew,
        0
      );
      stats[div] = { tasks: divTasks.length, crew: totalCrew };
    });
    return stats;
  };

  const stats = getDivisionStats();

  return (
    <div className="mb-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {divisions.map((div) => {
        const colors = divisionColors[div];
        return (
          <div
            key={div}
            className={`${colors.bg} border ${colors.border} rounded-lg p-3`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Users className={`w-4 h-4 ${colors.text}`} />
              <h3 className={`font-bold text-sm ${colors.text}`}>{div}</h3>
            </div>
            <div className="text-xs text-gray-300">
              <div>{stats[div]?.tasks || 0} evolutions</div>
              <div className="text-gray-400">{stats[div]?.crew || 0} crew</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DivisionStats;
