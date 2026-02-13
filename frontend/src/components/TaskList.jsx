import React from 'react';
import TaskCard from './TaskCard';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Clock, Trophy, Target } from 'lucide-react';

const TaskList = ({ tasks, onToggle, onDelete, title }) => {

    if (tasks.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-10 text-center py-10 bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 border-dashed"
            >
                <p className="text-gray-500 font-medium">
                    No tasks in "{title}"
                </p>
            </motion.div>
        );
    }

    const isCompleted = title.toLowerCase().includes("completed");

    return (
        <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">

                <div className="flex items-center gap-3">

                    <div className={`p-3 rounded-2xl shadow-inner ${isCompleted
                        ? "bg-gradient-to-br from-green-500/20 to-teal-500/20 text-green-400 ring-1 ring-green-500/30"
                        : "bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-400 ring-1 ring-indigo-500/30"
                        }`}>
                        {isCompleted
                            ? <Trophy size={24} className="drop-shadow-lg" />
                            : <Target size={24} className="drop-shadow-lg" />
                        }
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-gray-200">
                            {title}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {tasks.length} task{tasks.length > 1 ? "s" : ""}
                        </p>
                    </div>

                </div>

                {/* Task count badge */}
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${isCompleted
                    ? "bg-green-900/30 text-green-400 border border-green-500/20"
                    : "bg-indigo-900/30 text-indigo-400 border border-indigo-500/20"
                    }`}>
                    {tasks.length}
                </div>

            </div>

            {/* Task grid */}
            <motion.div
                layout
                className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            >
                <AnimatePresence mode="popLayout">
                    {tasks.map((task) => (
                        <motion.div
                            key={task._id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                        >
                            <TaskCard
                                task={task}
                                onToggle={onToggle}
                                onDelete={onDelete}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

        </motion.div>
    );
};

export default TaskList;
