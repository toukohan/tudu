import User, { IUser } from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response } from 'express';

export const findUserByEmail = async (email: string) => {
    try {
        const user = await User.findOne({ email });
        if(!user) return null;
        return user;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

export const findUserById = async (id: string) => {
    try {
        const user = await User.findById(id);
        if(!user) return null;
        return user;

    }
    catch (error) {
        console.error(error);
        return null;
    }
}

export const inviteUser = async (req: Request, res: Response) => {
    const { email, groupId } = req.body;
    try {
        const user = await findUserByEmail(email);
        if(!user) return res.status(404).json({ message: 'User not found' });
        if(user.groups.includes(groupId)) return res.status(400).json({ message: 'User already in group' });
        user.invitations.push(groupId);
        await user.save();
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const acceptInvitation = async (req: Request, res: Response) => {
    const { userId, groupId } = req.body;
    try {
        const user = await findUserById(userId);
        if(!user) return res.status(404).json({ message: 'User not found' });
        if(!user.invitations.includes(groupId)) return res.status(400).json({ message: 'User not invited to group' });
        user.invitations = user.invitations.filter(invitation => invitation != groupId);
        user.groups.push(groupId);
        await user.save();
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getInvitations = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).populate('invitations');
        if(!user) return res.status(404).json({ message: 'User not found' });
        res.json(user.invitations);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


