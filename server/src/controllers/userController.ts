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

