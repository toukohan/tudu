import express from 'express';
import User from '../models/userModel';

const router = express.Router();

router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId).populate({
        path: 'groups',
        populate: { path: 'tasks' }
      });
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;