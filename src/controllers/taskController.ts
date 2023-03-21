import { Request, Response } from 'express';

import Task from '../models/taskModel';
import Group from '../models/groupModel';

export const createTask = async (req: Request, res: Response) => {
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
}

export const updateTask = async (req: Request, res: Response) => {
    const { title, description, done } = req.body;
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        if (title) task.title = title;
        if (description) task.description = description;
        if (done) task.done = done;
        const updatedTask = await task.save();
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        
        res.status(204).json({ message: 'Task deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}