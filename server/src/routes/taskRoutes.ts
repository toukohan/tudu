import express from 'express';

import Group from '../models/groupModel';
import User from '../models/userModel';
import Task from '../models/taskModel';

const router = express.Router();

router.post("/create", async (req, res) => {
    console.log(req.body)
    const { title, description, user: userId, group: groupId } = req.body;
    try {
        const newTask = new Task({
            title,
            group: groupId,
            creator: userId,
            description,
        });
        const savedTask = await newTask.save();
        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: 'Group not found' });
        group.tasks.push(savedTask._id);
        await group.save();
        res.status(201).json(savedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


export default router;