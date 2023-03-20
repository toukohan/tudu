import express from 'express';
import { createGroup, deleteGroup } from '../controllers/groupController';

const router = express.Router();

router.post("/create", createGroup);

router.delete("/:groupId", deleteGroup);

export default router;