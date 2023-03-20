import express from 'express';
import { createGroup, deleteGroup } from '../controllers/groupController';

const router = express.Router();

router.post("/create", createGroup);

router.delete("/delete/:groupId", deleteGroup);

export default router;