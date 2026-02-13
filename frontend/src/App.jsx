import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import ProgressBar from './components/ProgressBar';

import MotivationBanner from './components/MotivationBanner';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks');
      setTasks(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setLoading(false);
    }
  };

  const addTask = (newTask) => {
    setTasks([...tasks, newTask].sort((a, b) => new Date(a.deadline) - new Date(b.deadline)));
  };

  const toggleTask = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.map(task => task._id === id ? res.data : task));
    } catch (err) {
      console.error('Error toggling task:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans pb-12 selection:bg-indigo-500/30">

      {/* Motivational Header */}
      <header className="bg-gray-900/40 backdrop-blur-xl shadow-2xl sticky top-0 z-20 border-b border-gray-800/50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">

          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="bg-gradient-to-tr from-indigo-500 to-purple-600 p-2.5 rounded-xl shadow-lg shadow-indigo-500/30 ring-1 ring-white/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </motion.div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                Study Warrior
              </h1>
              <p className="text-xs text-indigo-400 font-medium tracking-wide uppercase">
                Conquer Your Goals
              </p>
            </div>
          </div>

          <div className="bg-gray-800/80 px-4 py-2 rounded-full border border-gray-700/50 flex items-center gap-3 shadow-inner">
            <div className="text-xs font-medium text-gray-400">
              {new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
            </div>
            <div className="h-4 w-px bg-gray-700"></div>
            <div className="text-xs font-bold text-white flex items-center gap-1">
              <span>🔥</span>
              <span>Ready to win?</span>
            </div>
          </div>

        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-10">

        {/* Hero Section */}
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-4"
          >
            Unleash Your Potential
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            "Discipline is choosing between what you want now and what you want most."
          </motion.p>
        </div>

        <ProgressBar tasks={tasks} />
        <TaskForm onTaskAdded={addTask} />

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 relative z-10"></div>
            </div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <TaskList
              title="Active Missions & Challenges" // Renamed heavily
              tasks={pendingTasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />

            <TaskList
              title="Victories & Achievements" // Renamed heavily
              tasks={completedTasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />

            {tasks.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 bg-gradient-to-b from-gray-800/30 to-transparent rounded-3xl border border-gray-800/50 backdrop-blur-sm"
              >
                <div className="inline-block p-5 rounded-full bg-gray-800/80 mb-6 border border-gray-700 shadow-xl shadow-indigo-500/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Initialize Your Mission</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  Every big journey starts with a small step. Add your first task and start building momentum!
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
}

export default App;