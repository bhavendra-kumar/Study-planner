const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Models
const Task = require('./models/Task');

// Routes

// GET all tasks
app.get('/api/tasks', async (req, res) => {
    try {
        console.log('GET /api/tasks request received');
        const tasks = await Task.find().sort({ deadline: 1 }); // Sort by deadline ascending
        console.log(`Found ${tasks.length} tasks`);
        res.json(tasks);
    } catch (err) {
        console.error('Error in GET /api/tasks:', err);
        res.status(500).json({ message: err.message });
    }
});

// POST new task
app.post('/api/tasks', async (req, res) => {
    console.log('POST /api/tasks request received:', req.body);
    const { subject, topic, duration } = req.body;

    // Calculate deadline: Now + duration (in minutes)
    const deadline = new Date(Date.now() + duration * 60000);

    const task = new Task({
        subject,
        topic,
        duration,
        deadline,
        status: 'active'
    });

    try {
        const newTask = await task.save();
        console.log('Task saved:', newTask);
        res.status(201).json(newTask);
    } catch (err) {
        console.error('Error in POST /api/tasks:', err);
        res.status(400).json({ message: err.message });
    }
});

// PUT toggle completion
app.put('/api/tasks/:id', async (req, res) => {
    console.log(`PUT /api/tasks/${req.params.id} request received`);
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        if (!task.completed) {
            // Check if failed (deadline passed)
            if (new Date() > new Date(task.deadline)) {
                return res.status(400).json({ message: "Cannot complete a failed task." });
            }
            task.completed = true;
            task.status = 'completed';
        } else {
            task.completed = false;
            task.status = 'active';
            // If re-activating an overdue task, it might instantly fail again on frontend check, 
            // but let's allow it for correction.
        }
        const updatedTask = await task.save();
        console.log('Task updated:', updatedTask);
        res.json(updatedTask);
    } catch (err) {
        console.error('Error in PUT /api/tasks/:id:', err);
        res.status(400).json({ message: err.message });
    }
});

// DELETE task
app.delete('/api/tasks/:id', async (req, res) => {
    console.log(`DELETE /api/tasks/${req.params.id} request received`);
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        await task.deleteOne();
        console.log('Task deleted');
        res.json({ message: 'Task deleted' });
    } catch (err) {
        console.error('Error in DELETE /api/tasks/:id:', err);
        res.status(500).json({ message: err.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
