import express from 'express';
import User from '../models/userModel';

import { acceptInvitation, declineInvitation, getInvitations, inviteUser } from '../controllers/userController';

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

router.get("/:userId/invitations", getInvitations);

router.post("/invite", inviteUser);

router.post("/accept-invitation", acceptInvitation);

router.post("/decline-invitation", declineInvitation);

export default router;