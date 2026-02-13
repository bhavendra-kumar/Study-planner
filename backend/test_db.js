const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Task = require('./models/Task');

dotenv.config();

const run = async () => {
    try {
        console.log('Connecting to MongoDB...', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected!');

        console.log('Testing Task Creation...');
        const newTask = new Task({
            subject: 'Math',
            topic: 'Algebra',
            deadline: new Date()
        });
        const savedTask = await newTask.save();
        console.log('Task Saved:', savedTask);

        console.log('Testing Task Retrieval...');
        const tasks = await Task.find();
        console.log(`Found ${tasks.length} tasks`);
        console.log(tasks);

        console.log('Cleaning up...');
        await Task.deleteOne({ _id: savedTask._id });
        console.log('Test Task Deleted');

        mongoose.disconnect();
    } catch (err) {
        console.error('TEST FAILED:', err);
    }
};

run();
