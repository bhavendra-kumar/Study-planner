import React from 'react';
import { motion } from 'framer-motion';
import {
    Target,
    CheckCircle2,
    BarChart3
} from 'lucide-react';

const ProgressBar = ({ tasks }) => {

    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const percentage = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    const pending = total - completed;

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gray-800/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-gray-700 mb-8"
        >

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5">

                <div className="flex items-center gap-3 mb-4 md:mb-0">

                    <div className="bg-indigo-900/50 p-3 rounded-xl border border-indigo-500/20">
                        <BarChart3 className="text-indigo-400" size={22} />
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white">
                            Study Progress
                        </h2>
                        <p className="text-gray-400 text-sm">
                            Track your productivity and stay consistent
                        </p>
                    </div>

                </div>

                {/* Percentage */}
                <div className="text-right">
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
                    >
                        {percentage}%
                    </motion.div>

                    <p className="text-gray-400 text-sm">
                        {completed} completed • {pending} pending
                    </p>
                </div>

            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden mb-4 border border-gray-600">

                <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{
                        duration: 1,
                        ease: "easeOut"
                    }}
                />

            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-4">

                <div className="bg-gray-700/50 border border-gray-600/50 p-4 rounded-xl flex items-center gap-3">
                    <Target className="text-indigo-400" size={20} />
                    <div>
                        <p className="text-sm text-gray-400">Total Tasks</p>
                        <p className="font-bold text-gray-200">{total}</p>
                    </div>
                </div>

                <div className="bg-gray-700/50 border border-gray-600/50 p-4 rounded-xl flex items-center gap-3">
                    <CheckCircle2 className="text-green-400" size={20} />
                    <div>
                        <p className="text-sm text-gray-400">Completed</p>
                        <p className="font-bold text-gray-200">{completed}</p>
                    </div>
                </div>

            </div>

        </motion.div>
    );
};

export default ProgressBar;
