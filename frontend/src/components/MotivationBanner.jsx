import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Quote } from 'lucide-react';

const QUOTES = [
    "The only way to do great work is to love what you do.",
    "Success is the sum of small efforts, repeated day in and day out.",
    "Don't watch the clock; do what it does. Keep going.",
    "Believe you can and you're halfway there.",
    "Your future is created by what you do today, not tomorrow.",
    "The secret of getting ahead is getting started.",
    "It always seems impossible until it is done.",
    "Focus on being productive instead of busy."
];

const MotivationBanner = ({ tasks }) => {
    const [quote, setQuote] = useState(QUOTES[0]);

    // Change quote when task count changes
    useEffect(() => {
        const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
        setQuote(randomQuote);
    }, [tasks.length]);

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-6 text-white shadow-xl mb-8 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Quote size={120} />
            </div>

            <div className="relative z-10 flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                    <Sparkles className="text-yellow-300" size={24} />
                </div>

                <div>
                    <h3 className="text-lg font-bold mb-1">Stay Focused!</h3>
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={quote}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="text-indigo-100 font-medium italic"
                        >
                            "{quote}"
                        </motion.p>
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

export default MotivationBanner;
