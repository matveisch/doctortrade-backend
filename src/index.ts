import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import { Request, Response } from 'express';
import videoRouter from './routes/videoRoutes';
import userRouter from './routes/userRoutes';
import sectionRoutes from './routes/sectionRoutes';
import courseRoutes from './routes/courseRoutes';
import './passport';
import { S3Client } from '@aws-sdk/client-s3';

dotenv.config();
const port = process.env.PORT || 8000;

const app = express();

const mongoDB = process.env.MONGODB_URL;
mongoose.set('strictQuery', true);
mongoose.connect(`${mongoDB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.get('/', (req: Request, res: Response) => {
  res.json('hello world');
});

app.use('/videos', videoRouter);
app.use('/user', userRouter);
app.use('/section', sectionRoutes);
app.use('/course', courseRoutes);

app.listen(port, function () {
  console.log('Listening on port 8000!');
});
