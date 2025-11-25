import React from "react";
import { Wrench, Plus, LogOut } from "lucide-react";

const Header = ({ currentUser, setShowAddTask, handleLogout }) => {
  return (
    <div className="mb-6 bg-slate-800 rounded-lg p-4 border border-slate-700 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500/20 p-2 rounded-lg border border-blue-500/30">
            <Wrench className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">
              Submarine Maintenance Planner
            </h1>
            <p className="text-gray-400 text-sm">
              Logged in as {currentUser.name} • {currentUser.division}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddTask(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition font-medium text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Evolution
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition text-sm"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
