require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import authRouter from './routes/authRoutes';
import userRouter from './routes/userRoutes';
import groupRouter from './routes/groupRoutes';
import taskRouter from './routes/taskRoutes';
import errorHandler from './middleware/errorHandler';
import notFound from './middleware/notFound';

const app = express();
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mutudu-new';
const port = process.env.PORT || 4000;
console.log(mongoUri)

mongoose.connect(mongoUri);

app.use(express.json());
app.use(cors({
  origin: '*',
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/groups", groupRouter);
app.use("/tasks", taskRouter);


app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log('Server started on port', port);
});