import React, { useState, useMemo } from "react";

// Import components
import LoginScreen from "./components/LoginScreen";
import Header from "./components/Header";
import DailyWatchBill from "./components/DailyWatchBill";
import DivisionStats from "./components/DivisionStats";
import SubmarineSystemDiagram from "./components/SubmarineSystemDiagram";
import ConflictList from "./components/ConflictList";
import GanttTimeline from "./components/GannttTimeline";
import AddTaskModal from "./components/AddTaskModal";

// Import data
import { users } from "./data/users";
import { initialTasks } from "./data/initialTasks";
import {
  divisions,
  resources,
  divisionColors,
  dailyWatchInfo,
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

  // Task management state
  const [tasks, setTasks] = useState(initialTasks);
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
  const addTask = () => {
    if (newTask.name.trim()) {
      setTasks([
        ...tasks,
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
      setTasks(tasks.filter((t) => t.id !== id));
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
        />

        <DailyWatchBill
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
          viewDays={viewDays}
          dailyInfo={dailyWatchInfo}
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
      </div>
    </div>
  );
};

export default SubmarineMaintenancePlanner;
