import { Plus, X } from "lucide-react";

const AddTaskModal = ({
  showAddTask,
  setShowAddTask,
  newTask,
  setNewTask,
  currentUser,
  divisions,
  resources,
  addTask,
  allTasks,
  TASK_STATUSES,
  TASK_PRIORITIES,
}) => {
  if (!showAddTask) return null;

  const addPart = () => {
    setNewTask({
      ...newTask,
      parts: [...(newTask.parts ?? []), { name: "", nsn: "", qty: 1, unit: "EA" }],
    });
  };

  const updatePart = (idx, field, value) => {
    const parts = [...(newTask.parts ?? [])];
    parts[idx] = { ...parts[idx], [field]: value };
    setNewTask({ ...newTask, parts });
  };

  const removePart = (idx) => {
    const parts = (newTask.parts ?? []).filter((_, i) => i !== idx);
    setNewTask({ ...newTask, parts });
  };

  const toggleDepend = (taskId) => {
    const current = newTask.dependsOn ?? [];
    const updated = current.includes(taskId)
      ? current.filter((id) => id !== taskId)
      : [...current, taskId];
    setNewTask({ ...newTask, dependsOn: updated });
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-lg p-6 max-w-2xl w-full border border-slate-700 shadow-xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Add Maintenance Evolution</h2>
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm mb-2 text-gray-300">Evolution Name</label>
            <input
              type="text"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g., Hydraulic System Overhaul"
            />
          </div>

          {/* Division + System */}
          <div className="grid grid-cols-2 gap-4">
            {currentUser.role === "admin" && (
              <div>
                <label className="block text-sm mb-2 text-gray-300">Division</label>
                <select
                  value={newTask.division}
                  onChange={(e) => setNewTask({ ...newTask, division: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2"
                >
                  {divisions.map((div) => <option key={div}>{div}</option>)}
                </select>
              </div>
            )}
            <div>
              <label className="block text-sm mb-2 text-gray-300">System</label>
              <select
                value={newTask.system}
                onChange={(e) => setNewTask({ ...newTask, system: e.target.value })}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2"
              >
                {["General","Hydraulics","Control Surfaces","Ballast","Electrical","Weapons","Reactor","Sonar"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Status + Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2 text-gray-300">Status</label>
              <select
                value={newTask.status ?? "scheduled"}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2"
              >
                {(TASK_STATUSES ?? []).map((s) => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2 text-gray-300">Priority</label>
              <select
                value={newTask.priority ?? "routine"}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2"
              >
                {(TASK_PRIORITIES ?? []).map((p) => (
                  <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Start / Duration / Crew */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-2 text-gray-300">Start Day</label>
              <input type="number" value={newTask.startDay}
                onChange={(e) => setNewTask({ ...newTask, startDay: parseInt(e.target.value) || 1 })}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2" min="1" />
            </div>
            <div>
              <label className="block text-sm mb-2 text-gray-300">Duration (days)</label>
              <input type="number" value={newTask.duration}
                onChange={(e) => setNewTask({ ...newTask, duration: parseInt(e.target.value) || 1 })}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2" min="1" />
            </div>
            <div>
              <label className="block text-sm mb-2 text-gray-300">Crew Size</label>
              <input type="number" value={newTask.requirements.crew}
                onChange={(e) => setNewTask({ ...newTask, requirements: { ...newTask.requirements, crew: parseInt(e.target.value) || 1 } })}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2" min="1" />
            </div>
          </div>

          {/* Resource Requirements */}
          <div>
            <label className="block text-sm mb-2 text-gray-300">Resource Requirements</label>
            <div className="grid grid-cols-2 gap-3">
              {resources.map((resource) => (
                <div key={resource} className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-sm capitalize">{resource}</span>
                    <select
                      value={newTask.requirements[resource] || "none"}
                      onChange={(e) => setNewTask({ ...newTask, requirements: { ...newTask.requirements, [resource]: e.target.value } })}
                      className="bg-slate-600 border border-slate-500 rounded px-2 py-1 text-sm"
                    >
                      <option value="none">None</option>
                      <option value="available">Available</option>
                      <option value="required">Required</option>
                      <option value="shutdown">Shutdown</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dependencies */}
          {allTasks && allTasks.length > 0 && (
            <div>
              <label className="block text-sm mb-2 text-gray-300">Dependencies (must complete before this task)</label>
              <div className="bg-slate-700/40 rounded-lg border border-slate-600 max-h-36 overflow-y-auto p-2 space-y-1">
                {allTasks.map((t) => (
                  <label key={t.id} className="flex items-center gap-2 cursor-pointer hover:bg-slate-700/60 px-2 py-1 rounded">
                    <input
                      type="checkbox"
                      checked={(newTask.dependsOn ?? []).includes(t.id)}
                      onChange={() => toggleDepend(t.id)}
                      className="accent-blue-500"
                    />
                    <span className="text-xs text-gray-300 truncate">{t.name}</span>
                    <span className="text-xs text-gray-500 shrink-0">
                      Days {t.startDay}–{t.startDay + t.duration - 1}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Parts */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm text-gray-300">Parts / NSNs</label>
              <button
                type="button"
                onClick={addPart}
                className="flex items-center gap-1 text-xs bg-slate-700 hover:bg-slate-600 border border-slate-600 px-2 py-1 rounded transition"
              >
                <Plus className="w-3 h-3" />
                Add Part
              </button>
            </div>
            {(newTask.parts ?? []).length === 0 ? (
              <p className="text-xs text-gray-500 italic">No parts added.</p>
            ) : (
              <div className="space-y-2">
                {(newTask.parts ?? []).map((part, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-slate-700/50 rounded-lg p-2 border border-slate-600">
                    <input
                      type="text"
                      value={part.name}
                      onChange={(e) => updatePart(idx, "name", e.target.value)}
                      placeholder="Part name"
                      className="flex-1 bg-slate-600 border border-slate-500 rounded px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={part.nsn}
                      onChange={(e) => updatePart(idx, "nsn", e.target.value)}
                      placeholder="1234-56-789-0123"
                      className="w-36 bg-slate-600 border border-slate-500 rounded px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      value={part.qty}
                      onChange={(e) => updatePart(idx, "qty", parseInt(e.target.value) || 1)}
                      min="1"
                      className="w-14 bg-slate-600 border border-slate-500 rounded px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={part.unit}
                      onChange={(e) => updatePart(idx, "unit", e.target.value)}
                      placeholder="EA"
                      className="w-12 bg-slate-600 border border-slate-500 rounded px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removePart(idx)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/20 p-1 rounded transition"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={addTask} className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition font-medium">
            Add Evolution
          </button>
          <button onClick={() => setShowAddTask(false)} className="flex-1 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
