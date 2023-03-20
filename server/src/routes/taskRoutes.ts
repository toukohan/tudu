import express from 'express';

import Group from '../models/groupModel';
import User from '../models/userModel';
import Task from '../models/taskModel';
import { createTask, updateTask, deleteTask } from '../controllers/taskController';

const router = express.Router();

router.post("/create", createTask);

router.patch("/update/:id", updateTask);

router.delete("/delete/:id", deleteTask);

export default router;