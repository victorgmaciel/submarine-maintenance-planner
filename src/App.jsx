import { useState, useMemo } from "react";

// Import components
import LoginScreen from "./components/LoginScreen";
import Header from "./components/Header";
import DailyWatchBill from "./components/DailyWatchBill";
import DivisionStats from "./components/DivisionStats";
import SubmarineSystemDiagram from "./components/SubmarineSystemDiagram";
import ConflictList from "./components/ConflictList";
import GanttTimeline from "./components/GannttTimeline";
import AddTaskModal from "./components/AddTaskModal";
import DivisionTracker from "./components/DivisionTracker";
import OfficerBriefing from "./components/OfficerBriefing";
import ShipmateChat from "./components/ShipmateChat";
import ShoreServices from "./components/ShoreServices";

// Import data
import { users } from "./data/users";
import { vesselData } from "./data/vesselData";
import {
  divisions,
  resources,
  divisionColors,
  vessels,
} from "./data/constants";

// Import utilities
import {
  detectConflicts,
  getTaskConflicts,
  getConflictColor,
} from "./utils/conflictDetection";

const SubmarineMaintenancePlanner = () => {
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
  const [newTask, setNewTask] = useState({
    name: "",
    startDay: 1,
    duration: 1,
    system: "General",
    division: "A-Div",
    requirements: {
      hydraulics: "none",
      electrical: "none",
      air: "none",
      crew: 1,
    },
  });

  // View state
  const [currentDay, setCurrentDay] = useState(1);
  const [viewDays, setViewDays] = useState(30);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedVessel, setSelectedVessel] = useState(vessels[0]);
  const [shipmateOpen, setShipmateOpen] = useState(false);

  // Derived per-vessel data (must come after selectedVessel is declared)
  const vesselId = selectedVessel?.id;
  const tasks = allVesselTasks[vesselId] ?? [];
  const watchInfo = vesselData[vesselId]?.watchInfo ?? {};

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
      setNewTask({
        name: "",
        startDay: 1,
        duration: 1,
        system: "General",
        division: currentUser.division,
        requirements: {
          hydraulics: "none",
          electrical: "none",
          air: "none",
          crew: 1,
        },
      });
      setShowAddTask(false);
    }
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

  // Wrapper functions for conflict utilities
  const getTaskConflictsWrapper = (taskId) =>
    getTaskConflicts(taskId, conflicts);
  const getConflictColorWrapper = (task) =>
    getConflictColor(task, conflicts, divisionColors);

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

            <DivisionStats
              divisions={divisions}
              divisionColors={divisionColors}
              tasks={tasks}
            />

            {/* System Status and Conflicts */}
            <div className="mb-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
              <SubmarineSystemDiagram tasks={tasks} viewDays={viewDays} />
              <ConflictList conflicts={conflicts} tasks={tasks} />
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
          />
        )}

        {activeTab === "contacts" && <ShoreServices />}

        <AddTaskModal
          showAddTask={showAddTask}
          setShowAddTask={setShowAddTask}
          newTask={newTask}
          setNewTask={setNewTask}
          currentUser={currentUser}
          divisions={divisions}
          resources={resources}
          addTask={addTask}
        />

        {shipmateOpen && (
          <ShipmateChat
            onClose={() => setShipmateOpen(false)}
            selectedVessel={selectedVessel}
            tasks={tasks}
          />
        )}
      </div>
    </div>
  );
};

export default SubmarineMaintenancePlanner;
