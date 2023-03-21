import Group from '../models/groupModel';
import User from '../models/userModel';
import { Request, Response } from 'express';

export const createGroup = async (req: Request, res: Response) => {
    const { name, user: userId } = req.body;
    try {
        const newGroup = new Group({
            name,
            owner: userId,
            users: [userId],
        });
        const savedGroup = await newGroup.save();
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        user.groups.push(savedGroup._id);
        await user.save();
        res.status(201).json(savedGroup);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const editGroup = async (req: Request, res: Response) => {
    const { groupId } = req.params;
    try {
        const group = await Group.findByIdAndUpdate(groupId, req.body, { new: true });
        if (!group) return res.status(404).json({ message: 'Group not found' });
        res.status(200).json(group);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteGroup = async (req: Request, res: Response) => {
    const { groupId } = req.params;
    try {
        const group = await Group.findByIdAndDelete(groupId);
        if (!group) return res.status(404).json({ message: 'Group not found' });
        res.status(204).json({ message: 'Group deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


