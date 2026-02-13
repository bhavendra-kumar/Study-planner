import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { BookOpen, FileText, Calendar, PlusCircle, Clock } from 'lucide-react';

const TaskForm = ({ onTaskAdded }) => {

    const [formData, setFormData] = useState({
        subject: '',
        topic: '',
        duration: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.subject || !formData.topic || !formData.duration)
            return;

        try {
            const res = await axios.post(
                'http://localhost:5000/api/tasks',
                formData
            );

            onTaskAdded(res.data);

            setFormData({
                subject: '',
                topic: '',
                duration: ''
            });

        } catch (err) {
            console.error('Error adding task:', err);
        }
    };

    return (
        <motion.div
            className="bg-gray-800 p-6 rounded-3xl shadow-xl mb-8 border border-gray-700"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <form onSubmit={handleSubmit}>

                {/* Header */}
                <div className="flex items-center gap-3 mb-6">

                    <div className="bg-indigo-900/50 p-2 rounded-xl">
                        <PlusCircle className="text-indigo-400" size={22} />
                    </div>

                    <h2 className="text-xl font-bold text-white">
                        Add Study Task
                    </h2>

                </div>


                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                    {/* Subject */}
                    <div>
                        <label className="text-sm font-medium text-gray-400 flex items-center gap-2 mb-2">
                            <BookOpen size={16} />
                            Subject
                        </label>
                        <input
                            type="text"
                            name="subject"
                            placeholder="e.g. Mathematics"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition"
                        />
                    </div>

                    {/* Topic */}
                    <div>
                        <label className="text-sm font-medium text-gray-400 flex items-center gap-2 mb-2">
                            <FileText size={16} />
                            Topic
                        </label>
                        <input
                            type="text"
                            name="topic"
                            placeholder="e.g. Calculus Integration"
                            value={formData.topic}
                            onChange={handleChange}
                            className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition"
                        />
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="text-sm font-medium text-gray-400 flex items-center gap-2 mb-2">
                            <Clock size={16} />
                            Duration (minutes)
                        </label>

                        <input
                            type="number"
                            name="duration"
                            placeholder="e.g. 45"
                            value={formData.duration}
                            onChange={handleChange}
                            min="1"
                            className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                            style={{ colorScheme: 'dark' }}
                        />
                    </div>

                </div>


                {/* Button OUTSIDE grid */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 flex items-center justify-center gap-2"
                >
                    <PlusCircle size={18} />
                    Add Task
                </motion.button>

            </form>
        </motion.div>
    );
};

export default TaskForm;
