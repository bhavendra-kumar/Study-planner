import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Calendar,
    CheckCircle2,
    Circle,
    Trash2,
    AlertTriangle,
    BookOpen,
    Clock,
    Trophy,
    Target
} from 'lucide-react';

const TaskCard = ({ task, onToggle, onDelete }) => {

    // Status Logic
    const isCompleted = task.completed;
    const isFailed = !task.completed && new Date(task.deadline) < new Date();
    const isActive = !isCompleted && !isFailed;

    const calculateTimeLeft = () => {
        const difference = new Date(task.deadline) - new Date();
        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        return null;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [status, setStatus] = useState(isCompleted ? 'completed' : isFailed ? 'failed' : 'active');

    useEffect(() => {
        if (status !== 'active') return;

        const timer = setInterval(() => {
            const left = calculateTimeLeft();
            if (!left) {
                setStatus('failed');
                clearInterval(timer);
            } else {
                setTimeLeft(left);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [task.deadline, status]);

    useEffect(() => {
        if (task.completed) setStatus('completed');
        else if (new Date(task.deadline) < new Date()) setStatus('failed');
        else setStatus('active');
    }, [task.completed, task.deadline]);


    const formatTimeLeft = () => {
        if (status === 'failed') return "00:00:00";
        if (status === 'completed') return "Done!";
        if (!timeLeft) return "00:00:00";

        // Format with leading zeros
        const h = String(timeLeft.hours).padStart(2, '0');
        const m = String(timeLeft.minutes).padStart(2, '0');
        const s = String(timeLeft.seconds).padStart(2, '0');

        if (timeLeft.days > 0) return `${timeLeft.days}d ${h}:${m}:${s}`;
        return `${h}:${m}:${s}`;
    };

    // Dynamic Styles based on Status
    const getStatusStyles = () => {
        switch (status) {
            case 'completed':
                return {
                    border: "border-green-500/50",
                    bg: "bg-green-900/10", // Lighter bg for better contrast
                    badge: "bg-green-500 text-white shadow-lg shadow-green-500/40",
                    text: "text-green-400",
                    shadow: "shadow-green-500/20",
                    message: "🏆 Outstanding! You crushed this goal.",
                    icon: <CheckCircle2 size={16} />
                };
            case 'failed':
                return {
                    border: "border-red-500/50",
                    bg: "bg-red-900/10",
                    badge: "bg-red-500 text-white shadow-lg shadow-red-500/40",
                    text: "text-red-400",
                    shadow: "shadow-red-500/20",
                    message: "💪 Don't give up! Consistency beats perfection.",
                    icon: <AlertTriangle size={16} />
                };
            default: // active
                return {
                    border: "border-indigo-500/50",
                    bg: "bg-gray-800/80",
                    badge: "bg-indigo-500 text-white shadow-lg shadow-indigo-500/40 animate-pulse",
                    text: "text-indigo-400",
                    shadow: "shadow-indigo-500/20",
                    message: "🔥 Keep pushing! Focus is your superpower.",
                    icon: <Clock size={16} />
                };
        }
    };

    const styles = getStatusStyles();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.4, type: "spring" }}
            whileHover={{ y: -8, scale: 1.02 }}
            className={`
                relative group p-6 rounded-3xl border backdrop-blur-xl
                transition-all duration-500 shadow-xl ${styles.shadow}
                ${styles.bg} ${styles.border}
                hover:shadow-2xl
            `}
        >
            {/* Header: Subject & Status Badge */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                    <div className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${styles.badge}`}>
                        {styles.icon}
                        {task.subject}
                    </div>
                </div>

                {/* Countdown Timer Display */}
                <div className={`text-2xl font-mono font-bold tracking-tight ${styles.text}`}>
                    {formatTimeLeft()}
                </div>
            </div>

            {/* Topic */}
            <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                {task.topic}
            </h3>

            {/* Message */}
            <div className="flex items-center gap-2 mb-6">
                <div className={`h-8 w-1 rounded-full ${status === 'completed' ? 'bg-green-500' : status === 'failed' ? 'bg-red-500' : 'bg-indigo-500'}`}></div>
                <p className="text-sm font-medium text-gray-400 italic">
                    {styles.message}
                </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock size={14} />
                    <span>{task.duration} min session</span>
                </div>

                <div className="flex items-center gap-3">
                    {/* Delete button */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onDelete(task._id)}
                        className="p-2 rounded-full text-gray-500 hover:bg-gray-700/50 hover:text-red-400 transition"
                        title="Delete Task"
                    >
                        <Trash2 size={18} />
                    </motion.button>

                    {/* Complete button (Only if active) */}
                    {status === 'active' && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onToggle(task._id)}
                            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/30 flex items-center gap-2 transition"
                        >
                            <CheckCircle2 size={16} />
                            Completed
                        </motion.button>
                    )}

                    {status === 'completed' && (
                        <div className="flex items-center gap-1 text-green-500 font-semibold text-sm">
                            <CheckCircle2 size={18} />
                            Done
                        </div>
                    )}

                    {status === 'failed' && (
                        <div className="flex items-center gap-1 text-red-500 font-semibold text-sm">
                            <AlertTriangle size={18} />
                            Failed
                        </div>
                    )}
                </div>
            </div>

            {/* Progress Bar (Visual Timer) */}
            {status === 'active' && timeLeft && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700 rounded-b-2xl overflow-hidden">
                    <motion.div
                        className="h-full bg-indigo-500"
                        initial={{ width: "100%" }}
                        animate={{ width: "0%" }}
                        transition={{ duration: task.duration * 60, ease: "linear" }}
                        // Note: Framer motion duration transition might desync slightly from JS timer on long tasks, 
                        // but it serves as a good visual indicator. 
                        // For perfect sync, we'd drive width by timeLeft state.
                        style={{
                            width: `${((timeLeft.days * 24 * 60 + timeLeft.hours * 60 + timeLeft.minutes + timeLeft.seconds / 60) / task.duration) * 100}%`
                        }}
                    />
                </div>
            )}

        </motion.div>
    );
};

export default TaskCard;
