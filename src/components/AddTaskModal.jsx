
const AddTaskModal = ({
  showAddTask,
  setShowAddTask,
  newTask,
  setNewTask,
  currentUser,
  divisions,
  resources,
  addTask,
}) => {
  if (!showAddTask) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-lg p-6 max-w-2xl w-full border border-slate-700 shadow-xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Add Maintenance Evolution</h2>
        <div className="space-y-4">
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
