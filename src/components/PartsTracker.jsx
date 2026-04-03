import { useState, useMemo } from "react";
import {
  Package,
  ShoppingCart,
  CheckCircle,
  Search,
  Filter,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ClipboardList,
} from "lucide-react";

const STATUS_CONFIG = {
  needed: {
    label: "Needed",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    dot: "bg-red-500",
  },
  requisitioned: {
    label: "Requisitioned",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    dot: "bg-yellow-500",
  },
  received: {
    label: "Received",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    dot: "bg-cyan-500",
  },
  installed: {
    label: "Installed",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    dot: "bg-green-500",
  },
};

const NEXT_STATUS = {
  needed: "requisitioned",
  requisitioned: "received",
  received: "installed",
  installed: null,
};

const ACTION_LABEL = {
  needed: "Order",
  requisitioned: "Mark Received",
  received: "Mark Installed",
  installed: null,
};

const partKey = (taskId, partIndex) => `${taskId}-${partIndex}`;

const PartsTracker = ({
  tasks,
  partsOrders,
  setPartsOrders,
  divisions,
  divisionColors,
}) => {
  const [divFilter, setDivFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState({});

  const getPartStatus = (taskId, partIndex) =>
    partsOrders[partKey(taskId, partIndex)] ?? "needed";

  const advanceStatus = (taskId, partIndex) => {
    const current = getPartStatus(taskId, partIndex);
    const next = NEXT_STATUS[current];
    if (!next) return;
    setPartsOrders((prev) => ({
      ...prev,
      [partKey(taskId, partIndex)]: next,
    }));
  };

  const orderAllForTask = (task) => {
    const updates = {};
    task.parts.forEach((_, i) => {
      const key = partKey(task.id, i);
      const current = partsOrders[key] ?? "needed";
      if (current === "needed") updates[key] = "requisitioned";
    });
    setPartsOrders((prev) => ({ ...prev, ...updates }));
  };

  // Tasks that have parts and are not complete
  const eligibleTasks = useMemo(
    () =>
      tasks.filter(
        (t) => t.parts?.length > 0 && t.status !== "complete"
      ),
    [tasks]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return eligibleTasks.filter((t) => {
      if (divFilter !== "All" && t.division !== divFilter) return false;
      const partsMatch =
        q === "" ||
        t.name.toLowerCase().includes(q) ||
        t.parts.some(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            (p.nsn ?? "").toLowerCase().includes(q)
        );
      if (!partsMatch) return false;
      if (statusFilter !== "All") {
        const hasStatus = t.parts.some(
          (_, i) => getPartStatus(t.id, i) === statusFilter
        );
        if (!hasStatus) return false;
      }
      return true;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eligibleTasks, divFilter, statusFilter, search, partsOrders]);

  // Summary counts across all eligible tasks
  const summary = useMemo(() => {
    const counts = { needed: 0, requisitioned: 0, received: 0, installed: 0 };
    eligibleTasks.forEach((t) => {
      t.parts.forEach((_, i) => {
        counts[getPartStatus(t.id, i)]++;
      });
    });
    return counts;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eligibleTasks, partsOrders]);

  const totalParts = Object.values(summary).reduce((a, b) => a + b, 0);

  const toggleCollapse = (id) =>
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div>
      {/* Page header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-white">Parts &amp; Supply Tracker</h2>
        <p className="text-sm text-gray-400">
          NSN requisition tracking for active maintenance evolutions
        </p>
      </div>

      {/* Summary bar */}
      <div className="mb-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Object.entries(STATUS_CONFIG).map(([status, cfg]) => (
          <div
            key={status}
            className={`${cfg.bg} border ${cfg.border} rounded-lg px-4 py-3 cursor-pointer transition hover:opacity-80`}
            onClick={() =>
              setStatusFilter((prev) => (prev === status ? "All" : status))
            }
          >
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
              <span className={`text-xs font-bold uppercase tracking-widest ${cfg.color}`}>
                {cfg.label}
              </span>
            </div>
            <p className={`text-2xl font-bold ${cfg.color}`}>{summary[status]}</p>
            <p className="text-xs text-gray-500">
              of {totalParts} line item{totalParts !== 1 ? "s" : ""}
            </p>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search parts, NSN, task…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-800 border border-slate-600 text-sm text-gray-200 placeholder-gray-500 rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={divFilter}
            onChange={(e) => setDivFilter(e.target.value)}
            className="bg-slate-800 border border-slate-600 text-sm text-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Divisions</option>
            {divisions.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-800 border border-slate-600 text-sm text-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Statuses</option>
            {Object.entries(STATUS_CONFIG).map(([s, cfg]) => (
              <option key={s} value={s}>{cfg.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Task cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No parts found matching your filters.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((task) => {
            const isCollapsed = collapsed[task.id];
            const divColors = divisionColors[task.division] ?? divisionColors["A-Div"];
            const taskStatuses = task.parts.map((_, i) => getPartStatus(task.id, i));
            const allInstalled = taskStatuses.every((s) => s === "installed");
            const anyNeeded = taskStatuses.some((s) => s === "needed");
            const needCount = taskStatuses.filter((s) => s === "needed").length;

            return (
              <div
                key={task.id}
                className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden"
              >
                {/* Task header */}
                <div className="px-4 py-3 flex items-center justify-between gap-3">
                  <button
                    className="flex items-center gap-3 min-w-0 flex-1 text-left"
                    onClick={() => toggleCollapse(task.id)}
                  >
                    <div className={`p-1.5 rounded-md ${divColors.bg} ${divColors.border} shrink-0`}>
                      <ClipboardList className={`w-4 h-4 ${divColors.text}`} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-white truncate">{task.name}</p>
                        {allInstalled && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-green-500/20 text-green-400 border border-green-500/30">
                            ALL INSTALLED
                          </span>
                        )}
                        {!allInstalled && anyNeeded && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1">
                            <AlertTriangle className="w-2.5 h-2.5" />
                            {needCount} NOT ORDERED
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className={`text-xs ${divColors.text}`}>{task.division}</span>
                        <span className="text-xs text-gray-500">Day {task.startDay} · {task.duration}d</span>
                        <span className="text-xs text-gray-500">{task.parts.length} line item{task.parts.length !== 1 ? "s" : ""}</span>
                      </div>
                    </div>
                  </button>

                  <div className="flex items-center gap-2 shrink-0">
                    {anyNeeded && (
                      <button
                        onClick={() => orderAllForTask(task)}
                        className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Order All
                      </button>
                    )}
                    {isCollapsed ? (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                </div>

                {/* Parts table */}
                {!isCollapsed && (
                  <div className="border-t border-slate-700">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-slate-700 bg-slate-900/50">
                          <th className="text-left px-4 py-2 text-gray-500 font-semibold uppercase tracking-wider">Nomenclature</th>
                          <th className="text-left px-4 py-2 text-gray-500 font-semibold uppercase tracking-wider">NSN</th>
                          <th className="text-center px-4 py-2 text-gray-500 font-semibold uppercase tracking-wider">Qty</th>
                          <th className="text-center px-4 py-2 text-gray-500 font-semibold uppercase tracking-wider">Unit</th>
                          <th className="text-center px-4 py-2 text-gray-500 font-semibold uppercase tracking-wider">Status</th>
                          <th className="text-right px-4 py-2 text-gray-500 font-semibold uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700/50">
                        {task.parts.map((part, i) => {
                          const status = getPartStatus(task.id, i);
                          const cfg = STATUS_CONFIG[status];
                          const nextAction = ACTION_LABEL[status];

                          return (
                            <tr key={i} className="hover:bg-slate-700/30 transition">
                              <td className="px-4 py-2.5 text-gray-200 font-medium">{part.name}</td>
                              <td className="px-4 py-2.5">
                                {part.nsn ? (
                                  <span className="font-mono text-gray-400 bg-slate-900/60 px-2 py-0.5 rounded text-[11px]">
                                    {part.nsn}
                                  </span>
                                ) : (
                                  <span className="text-gray-600 italic">—</span>
                                )}
                              </td>
                              <td className="px-4 py-2.5 text-center text-gray-300 font-semibold">{part.qty}</td>
                              <td className="px-4 py-2.5 text-center text-gray-400">{part.unit ?? "EA"}</td>
                              <td className="px-4 py-2.5 text-center">
                                <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.border} ${cfg.color}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                                  {cfg.label}
                                </span>
                              </td>
                              <td className="px-4 py-2.5 text-right">
                                {nextAction ? (
                                  <button
                                    onClick={() => advanceStatus(task.id, i)}
                                    className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition ${
                                      status === "needed"
                                        ? "bg-blue-600 hover:bg-blue-700 text-white border-transparent"
                                        : status === "requisitioned"
                                        ? "bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-400 border-cyan-500/40"
                                        : "bg-green-500/15 hover:bg-green-500/25 text-green-400 border-green-500/40"
                                    }`}
                                  >
                                    {nextAction}
                                  </button>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-green-400 text-[11px] font-bold">
                                    <CheckCircle className="w-3.5 h-3.5" />
                                    Done
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PartsTracker;
