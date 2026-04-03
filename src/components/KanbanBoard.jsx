import { useState } from "react";
import { Users, Clock, UserCheck } from "lucide-react";

const COLUMNS = [
  { id: "proofed",      label: "Proofed",            checkerLabel: "Proofed By",    color: "text-slate-300",   border: "border-slate-500/60",   headerBg: "bg-slate-700/60" },
  { id: "first-check",  label: "First Check",         checkerLabel: "First Checker", color: "text-cyan-400",    border: "border-cyan-500/40",    headerBg: "bg-cyan-900/30" },
  { id: "second-check", label: "Second Check",        checkerLabel: "Second Checker",color: "text-blue-400",    border: "border-blue-500/40",    headerBg: "bg-blue-900/30" },
  { id: "ready-ood",    label: "Ready for OOD/COD",   checkerLabel: "OOD / COD",     color: "text-purple-400",  border: "border-purple-500/40",  headerBg: "bg-purple-900/30" },
  { id: "in-progress",  label: "In Progress",         checkerLabel: "Authorized By", color: "text-yellow-400",  border: "border-yellow-500/40",  headerBg: "bg-yellow-900/30" },
  { id: "done",         label: "Done",                checkerLabel: "Completed By",  color: "text-green-400",   border: "border-green-500/40",   headerBg: "bg-green-900/30" },
];

const PRIORITY_BADGE = {
  routine:   "bg-slate-600 text-gray-300",
  urgent:    "bg-orange-600 text-white",
  emergency: "bg-red-600 text-white",
};

const CheckerModal = ({ columnLabel, checkerLabel, onConfirm, onCancel }) => {
  const [rank, setRank] = useState("");
  const [name, setName] = useState("");

  const handleConfirm = () => {
    if (!rank.trim() || !name.trim()) return;
    onConfirm({ rank: rank.trim(), name: name.trim() });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleConfirm();
    if (e.key === "Escape") onCancel();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={onCancel}>
      <div
        className="bg-slate-800 border border-slate-600 rounded-xl p-6 w-80 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 mb-1">
          <UserCheck className="w-5 h-5 text-cyan-400" />
          <h3 className="text-white font-semibold text-base">{columnLabel}</h3>
        </div>
        <p className="text-gray-400 text-xs mb-5">{checkerLabel} — enter rank and name to proceed</p>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-400 mb-1 block uppercase tracking-wide">Rank</label>
            <input
              autoFocus
              type="text"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. ET2, ETC, LT"
              className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block uppercase tracking-wide">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Last name"
              className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="flex gap-2 mt-5">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 rounded-md border border-slate-600 text-gray-400 text-sm hover:text-white hover:border-slate-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!rank.trim() || !name.trim()}
            className="flex-1 px-4 py-2 rounded-md bg-cyan-600 text-white text-sm font-medium hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const TaskCard = ({ task, divisionColors, onDragStart }) => {
  const dc = divisionColors[task.division] || {};
  const checker = task.checkers?.[task.status];
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className="bg-slate-700/80 rounded-md p-3 border border-slate-600 hover:border-slate-400 cursor-grab active:cursor-grabbing transition select-none"
    >
      <p className="text-sm text-white font-medium leading-snug mb-2">{task.name}</p>
      <div className="flex flex-wrap gap-1 mb-2">
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${dc.bg || "bg-slate-600"} ${dc.text || "text-gray-300"}`}>
          {task.division}
        </span>
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${PRIORITY_BADGE[task.priority] || PRIORITY_BADGE.routine}`}>
          {task.priority}
        </span>
      </div>
      <div className="flex items-center gap-3 text-xs text-gray-500">
        <span className="flex items-center gap-1"><Users className="w-3 h-3" />{task.requirements?.crew || 0}</span>
        <span>{task.system}</span>
        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{task.duration}d</span>
      </div>
      {task.checkers && Object.keys(task.checkers).length > 0 && (
        <div className="mt-2 pt-2 border-t border-slate-600 space-y-0.5">
          {Object.entries(task.checkers).map(([colId, c]) => {
            const col = COLUMNS.find((col) => col.id === colId);
            return (
              <div key={colId} className="flex items-center gap-1 text-[10px] text-cyan-400/70">
                <UserCheck className="w-3 h-3 shrink-0" />
                <span className="text-gray-500">{col?.checkerLabel ?? colId}:</span>
                <span>{c.rank} {c.name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const KanbanColumn = ({ column, tasks, divisionColors, onDragStart, onDrop }) => {
  const [over, setOver] = useState(false);
  return (
    <div
      className={`flex flex-col min-w-[220px] flex-1 rounded-lg border ${column.border} bg-slate-800 overflow-hidden`}
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => { setOver(false); onDrop(e, column.id); }}
    >
      <div className={`${column.headerBg} px-3 py-2.5 border-b ${column.border} flex items-center justify-between shrink-0`}>
        <span className={`font-semibold text-sm ${column.color}`}>{column.label}</span>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${column.border} ${column.color}`}>
          {tasks.length}
        </span>
      </div>
      <div className={`flex-1 p-2 space-y-2 min-h-[100px] transition-colors ${over ? "bg-blue-500/10" : ""}`}>
        {tasks.map((t) => (
          <TaskCard key={t.id} task={t} divisionColors={divisionColors} onDragStart={onDragStart} />
        ))}
        {tasks.length === 0 && (
          <div className="h-16 flex items-center justify-center">
            <p className="text-xs text-gray-600 italic">Drop here</p>
          </div>
        )}
      </div>
    </div>
  );
};

const DeferredSection = ({ tasks, divisionColors, onDragStart, onDrop }) => {
  const [over, setOver] = useState(false);
  if (tasks.length === 0) return null;
  return (
    <div
      className={`mt-4 rounded-lg border border-amber-500/30 bg-slate-800 overflow-hidden transition-colors ${over ? "bg-amber-500/10" : ""}`}
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => { setOver(false); onDrop(e, "deferred"); }}
    >
      <div className="bg-amber-900/20 px-3 py-2.5 border-b border-amber-500/30 flex items-center gap-2">
        <span className="text-amber-400 font-semibold text-sm">Deferred</span>
        <span className="text-xs font-bold text-amber-400 border border-amber-500/40 px-2 py-0.5 rounded-full">{tasks.length}</span>
      </div>
      <div className="p-3 flex flex-wrap gap-2">
        {tasks.map((t) => (
          <div key={t.id} className="w-64">
            <TaskCard task={t} divisionColors={divisionColors} onDragStart={onDragStart} />
          </div>
        ))}
      </div>
    </div>
  );
};

const KanbanBoard = ({ tasks, updateTaskStatus, divisionColors, divisions, currentUser }) => {
  const [draggedId, setDraggedId] = useState(null);
  const [filterDiv, setFilterDiv] = useState("All");
  const [pendingDrop, setPendingDrop] = useState(null); // { taskId, newStatus, column }

  const visibleDivisions = currentUser?.role === "admin"
    ? divisions
    : divisions.filter((d) => d === currentUser?.division);

  const visible = tasks.filter((t) =>
    visibleDivisions.includes(t.division) &&
    (filterDiv === "All" || t.division === filterDiv)
  );

  const deferred = visible.filter((t) => t.status === "deferred");
  const active   = visible.filter((t) => t.status !== "deferred");

  const handleDragStart = (e, taskId) => {
    setDraggedId(taskId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    if (draggedId === null) return;

    const column = COLUMNS.find((c) => c.id === newStatus);
    setPendingDrop({ taskId: draggedId, newStatus, column });
    setDraggedId(null);
  };

  const handleCheckerConfirm = ({ rank, name }) => {
    const { taskId, newStatus } = pendingDrop;
    const existing = tasks.find((t) => t.id === taskId)?.checkers || {};
    updateTaskStatus(taskId, newStatus, {
      checkers: { ...existing, [newStatus]: { rank, name } },
    });
    setPendingDrop(null);
  };

  const handleCheckerCancel = () => {
    setPendingDrop(null);
  };

  return (
    <div>
      {pendingDrop?.column && (
        <CheckerModal
          columnLabel={pendingDrop.column.label}
          checkerLabel={pendingDrop.column.checkerLabel}
          onConfirm={handleCheckerConfirm}
          onCancel={handleCheckerCancel}
        />
      )}

      {/* Division filter */}
      <div className="mb-4 flex items-center gap-2 flex-wrap">
        {["All", ...visibleDivisions].map((div) => (
          <button
            key={div}
            onClick={() => setFilterDiv(div)}
            className={`text-xs px-3 py-1.5 rounded-full border font-medium transition ${
              filterDiv === div
                ? "bg-blue-600 border-blue-500 text-white"
                : "bg-slate-800 border-slate-600 text-gray-400 hover:text-white"
            }`}
          >
            {div}
          </button>
        ))}
      </div>

      {/* Columns */}
      <div className="flex gap-3 overflow-x-auto pb-4">
        {COLUMNS.map((col) => (
          <KanbanColumn
            key={col.id}
            column={col}
            tasks={active.filter((t) => t.status === col.id)}
            divisionColors={divisionColors}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
          />
        ))}
      </div>

      <DeferredSection
        tasks={deferred}
        divisionColors={divisionColors}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
      />
    </div>
  );
};

export default KanbanBoard;
