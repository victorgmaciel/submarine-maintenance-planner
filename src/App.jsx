import { useState, useMemo, useCallback } from "react";

// Import components
import LoginScreen from "./components/LoginScreen";
import Header from "./components/Header";
import DailyWatchBill from "./components/DailyWatchBill";
import SubmarineSystemDiagram from "./components/SubmarineSystemDiagram";
import ConflictList from "./components/ConflictList";
import GanttTimeline from "./components/GannttTimeline";
import AddTaskModal from "./components/AddTaskModal";
import DivisionTracker from "./components/DivisionTracker";
import OfficerBriefing from "./components/OfficerBriefing";
import ShipmateChat from "./components/ShipmateChat";
import ShoreServices from "./components/ShoreServices";
import QuickStats from "./components/QuickStats";
import ManningBoard from "./components/ManningBoard";
import MetricsDashboard from "./components/MetricsDashboard";
import PartsTracker from "./components/PartsTracker";
import KanbanBoard from "./components/KanbanBoard";

const DEFAULT_NEW_TASK = {
  name: "",
  startDay: 1,
  duration: 1,
  system: "General",
  division: "A-Div",
  status: "proofed",
  priority: "routine",
  dependsOn: [],
  parts: [],
  requirements: { hydraulics: "none", electrical: "none", air: "none", crew: 1 },
};

// Import data
import { users } from "./data/users";
import { vesselData } from "./data/vesselData";
import { sailorData } from "./data/sailorData";
import {
  divisions,
  resources,
  divisionColors,
  vessels,
  TASK_STATUSES,
  TASK_PRIORITIES,
} from "./data/constants";

// Import utilities
import {
  detectConflicts,
  getTaskConflicts,
  getConflictColor,
  detectBaseWideConflicts,
} from "./utils/conflictDetection";

const Triton = () => {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });

  // Task management state — keyed by vessel ID
  const [allVesselTasks, setAllVesselTasks] = useState(
    () => Object.fromEntries(Object.entries(vesselData).map(([k, v]) => [k, v.tasks]))
  );
  const [showAddTask, setShowAddTask] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState("All");
  const [newTask, setNewTask] = useState(DEFAULT_NEW_TASK);

  // View state
  const [currentDay, setCurrentDay] = useState(1);
  const [viewDays, setViewDays] = useState(30);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedVessel, setSelectedVessel] = useState(vessels[0]);
  const [shipmateOpen, setShipmateOpen] = useState(false);
  const [allVesselPartsOrders, setAllVesselPartsOrders] = useState({});

  // Derived per-vessel data (must come after selectedVessel is declared)
  const vesselId = selectedVessel?.id;
  const tasks = allVesselTasks[vesselId] ?? [];
  const watchInfo = vesselData[vesselId]?.watchInfo ?? {};
  const sailors = sailorData[vesselId] ?? [];

  // Parts order status — keyed by vesselId, then "taskId-partIndex"
  const partsOrders = allVesselPartsOrders[vesselId] ?? {};
  const setPartsOrders = (updater) => {
    setAllVesselPartsOrders((prev) => ({
      ...prev,
      [vesselId]: typeof updater === "function" ? updater(prev[vesselId] ?? {}) : updater,
    }));
  };

  // Authentication handlers
  const handleLogin = () => {
    const user = users[loginForm.username.toLowerCase().trim()];
    if (user && user.password === loginForm.password) {
      setCurrentUser({ ...user, username: loginForm.username });
      setIsLoggedIn(true);
      setLoginForm({ username: "", password: "" });
    } else {
      alert("Invalid credentials. Try demo/demo");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  // Task management handlers
  const setVesselTasks = (updater) => {
    setAllVesselTasks((prev) => ({
      ...prev,
      [vesselId]: typeof updater === "function" ? updater(prev[vesselId] ?? []) : updater,
    }));
  };

  const addTask = () => {
    if (newTask.name.trim()) {
      setVesselTasks((prev) => [
        ...prev,
        {
          ...newTask,
          id: Date.now(),
          createdBy: currentUser.name,
          division:
            currentUser.role === "admin"
              ? newTask.division
              : currentUser.division,
        },
      ]);
      setNewTask({ ...DEFAULT_NEW_TASK, division: currentUser.division });
      setShowAddTask(false);
    }
  };

  const updateTaskStatus = (taskId, newStatus, extraData = {}) => {
    setVesselTasks((prev) =>
      prev.map((t) => t.id === taskId ? { ...t, status: newStatus, ...extraData } : t)
    );
  };

  const deleteTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (currentUser.role === "admin" || task.createdBy === currentUser.name) {
      setVesselTasks((prev) => prev.filter((t) => t.id !== id));
    } else {
      alert("You can only delete your own tasks");
    }
  };

  // Computed values
  const conflicts = useMemo(() => detectConflicts(tasks), [tasks]);

  const filteredTasks = useMemo(() => {
    if (selectedDivision === "All") return tasks;
    return tasks.filter((t) => t.division === selectedDivision);
  }, [tasks, selectedDivision]);

  const crossVesselConflicts = useMemo(
    () => detectBaseWideConflicts(allVesselTasks, vessels),
    [allVesselTasks]
  );

  const getTaskConflictsWrapper = useCallback(
    (taskId) => getTaskConflicts(taskId, conflicts),
    [conflicts]
  );
  const getConflictColorWrapper = useCallback(
    (task) => getConflictColor(task, conflicts, divisionColors),
    [conflicts]
  );

  // Show login screen if not logged in
  if (!isLoggedIn) {
    return (
      <LoginScreen
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        handleLogin={handleLogin}
      />
    );
  }

  // Main application
  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 p-4">
      <div className="max-w-[1600px] mx-auto">
        <Header
          currentUser={currentUser}
          setShowAddTask={setShowAddTask}
          handleLogout={handleLogout}
          onOpenShipmate={() => setShipmateOpen(true)}
          vessels={vessels}
          selectedVessel={selectedVessel}
          setSelectedVessel={setSelectedVessel}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {activeTab === "dashboard" && (
          <>
            <OfficerBriefing currentDay={currentDay} />

            <DailyWatchBill
              currentDay={currentDay}
              setCurrentDay={setCurrentDay}
              viewDays={viewDays}
              dailyInfo={watchInfo}
              tasks={tasks}
              divisionColors={divisionColors}
              getTaskConflicts={getTaskConflictsWrapper}
            />

            {/* System Status and Conflicts */}
            <div className="mb-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
              <SubmarineSystemDiagram tasks={tasks} viewDays={viewDays} selectedVessel={selectedVessel} />
              <ConflictList conflicts={conflicts} tasks={tasks} />
            </div>

            {/* Parts Needed + Upcoming — full width, side by side */}
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <QuickStats tasks={tasks} currentDay={currentDay} />
            </div>

            <GanttTimeline
              filteredTasks={filteredTasks}
              selectedDivision={selectedDivision}
              setSelectedDivision={setSelectedDivision}
              divisions={divisions}
              viewDays={viewDays}
              setViewDays={setViewDays}
              divisionColors={divisionColors}
              getTaskConflicts={getTaskConflictsWrapper}
              getConflictColor={getConflictColorWrapper}
              deleteTask={deleteTask}
              selectedVessel={selectedVessel}
              allTasks={tasks}
            />
          </>
        )}

        {activeTab === "divisions" && (
          <DivisionTracker
            divisions={divisions}
            tasks={tasks}
            divisionColors={divisionColors}
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            viewDays={viewDays}
            currentUser={currentUser}
          />
        )}

        {activeTab === "parts" && (
          <PartsTracker
            tasks={tasks}
            partsOrders={partsOrders}
            setPartsOrders={setPartsOrders}
            divisions={divisions}
            divisionColors={divisionColors}
          />
        )}

        {activeTab === "contacts" && (
          <ShoreServices crossVesselConflicts={crossVesselConflicts} />
        )}

        {activeTab === "manning" && (
          <ManningBoard
            sailors={sailors}
            tasks={tasks}
            divisions={divisions}
            divisionColors={divisionColors}
            currentDay={currentDay}
          />
        )}

        {activeTab === "kanban" && (
          <KanbanBoard
            tasks={tasks}
            updateTaskStatus={updateTaskStatus}
            divisionColors={divisionColors}
            divisions={divisions}
            currentUser={currentUser}
          />
        )}

        {activeTab === "metrics" && (
          <MetricsDashboard
            allVesselTasks={allVesselTasks}
            vessels={vessels}
            divisions={divisions}
            divisionColors={divisionColors}
            selectedVessel={selectedVessel}
          />
        )}

        <AddTaskModal
          showAddTask={showAddTask}
          setShowAddTask={setShowAddTask}
          newTask={newTask}
          setNewTask={setNewTask}
          currentUser={currentUser}
          divisions={divisions}
          resources={resources}
          addTask={addTask}
          allTasks={tasks}
          TASK_STATUSES={TASK_STATUSES}
          TASK_PRIORITIES={TASK_PRIORITIES}
        />

        {shipmateOpen && (
          <ShipmateChat
            onClose={() => setShipmateOpen(false)}
            selectedVessel={selectedVessel}
            tasks={tasks}
          />
        )}

        <footer className="mt-8 pt-4 border-t border-slate-700/50 flex items-center justify-between text-xs text-gray-600">
          <span>TRITON &mdash; Naval Maintenance Management System</span>
          <span>NAVSUBBASE Bangor WA&bull; {selectedVessel.name} ({selectedVessel.hull})</span>
          <span>UNCLASSIFIED // FOR OFFICIAL USE ONLY &bull; Built by Victr Labs</span>
        </footer>
      </div>
    </div>
  );
};

export default Triton;
