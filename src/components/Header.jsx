import { useState } from "react";
import { Wrench, Plus, LogOut, ChevronDown, Ship, LayoutDashboard, Users, Anchor, Phone, MessageCircle } from "lucide-react";

// Inline SVG icon for attack submarines
const SubIcon = ({ className }) => (
  <svg viewBox="0 0 24 14" className={className} fill="currentColor">
    <ellipse cx="10" cy="7" rx="9" ry="4.5" />
    <path d="M19 7 Q22 7 22 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M8 2.5 L10 0 L12 2.5" />
    <path d="M6 11 L4 14 L8 11" />
  </svg>
);

const VesselIcon = ({ vessel, className }) =>
  vessel.type === "Submarine Tender"
    ? <Ship className={className} />
    : <SubIcon className={className} />;

const Header = ({
  currentUser,
  setShowAddTask,
  handleLogout,
  onOpenShipmate,
  vessels,
  selectedVessel,
  setSelectedVessel,
  activeTab,
  setActiveTab,
}) => {
  const [vesselOpen, setVesselOpen] = useState(false);

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "divisions", label: "Division Tracker", icon: Users },
    { id: "contacts", label: "Shore Services", icon: Phone },
  ];

  return (
    <div className="mb-6 bg-slate-800 rounded-lg border border-slate-700 shadow-lg">
      {/* Top bar */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500/20 p-2 rounded-lg border border-blue-500/30">
            <Wrench className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Submarine Maintenance Planner</h1>
            <p className="text-gray-400 text-sm">
              Logged in as {currentUser.name} &bull; {currentUser.division}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Vessel Selector */}
          <div className="relative z-50">
            <button
              onClick={() => setVesselOpen(!vesselOpen)}
              className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 px-3 py-2 rounded-lg transition text-sm min-w-[220px] justify-between"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <VesselIcon vessel={selectedVessel} className="w-4 h-4 text-blue-400 shrink-0" />
                <div className="text-left overflow-hidden">
                  <p className="text-white font-medium leading-tight truncate">{selectedVessel.name} <span className="text-gray-400 font-normal">({selectedVessel.hull})</span></p>
                  <p className="text-gray-400 text-xs leading-tight truncate">{selectedVessel.pier}</p>
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${vesselOpen ? "rotate-180" : ""}`} />
            </button>

            {vesselOpen && (
              <div className="absolute right-0 top-full mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-2xl z-50" style={{ width: "300px" }}>
                <div className="px-3 py-2 border-b border-slate-700 flex items-center gap-2">
                  <Anchor className="w-3.5 h-3.5 text-gray-500" />
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                    NAVSUBBASE New London
                  </p>
                </div>
                <div className="py-1 max-h-72 overflow-y-auto">
                  {vessels.map((vessel) => {
                    const isActive = selectedVessel.id === vessel.id;
                    const isUnderway = vessel.status === "Underway";
                    return (
                      <button
                        key={vessel.id}
                        onClick={() => { setSelectedVessel(vessel); setVesselOpen(false); }}
                        className={`w-full text-left px-3 py-2.5 hover:bg-slate-700 transition flex items-center gap-3 ${isActive ? "bg-blue-500/10" : ""}`}
                      >
                        <VesselIcon vessel={vessel} className={`w-4 h-4 shrink-0 ${isActive ? "text-blue-400" : isUnderway ? "text-gray-600" : "text-gray-400"}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className={`text-sm font-semibold truncate ${isActive ? "text-blue-300" : isUnderway ? "text-gray-500" : "text-white"}`}>
                              {vessel.name}
                            </p>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                              isUnderway
                                ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40"
                                : "bg-green-500/20 text-green-400 border border-green-500/40"
                            }`}>
                              {vessel.status}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">{vessel.hull} &mdash; {vessel.pier}</p>
                        </div>
                        {isActive && <span className="text-blue-400 text-xs shrink-0">Active</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={onOpenShipmate}
            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 px-4 py-2 rounded-lg transition font-medium text-sm"
          >
            <MessageCircle className="w-4 h-4 text-blue-400" />
            Shipmate
          </button>

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

      {/* Tab navigation */}
      <div className="flex border-t border-slate-700 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition border-b-2 ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Click-away overlay */}
      {vesselOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setVesselOpen(false)} />
      )}
    </div>
  );
};

export default Header;
