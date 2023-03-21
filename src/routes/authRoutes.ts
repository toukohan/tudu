import express from 'express';
import bcrypt from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';
import User from '../models/userModel';

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET as Secret;

router.get('/', (req, res) => {
  res.json({ message: 'Hello from auth' });
});

router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      password: hashedPassword,
      email: req.body.email,
    });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) return res.status(401).json({ message: 'Invalid email or password' });
    
    const token = jwt.sign({ sub: user._id }, jwtSecret, {expiresIn: '1h'});
    res.status(200).json({ token, id: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;