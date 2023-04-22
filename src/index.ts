import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import videoRouter from './routes/videoRoutes';
import userRouter from './routes/userRoutes';
import sectionRoutes from './routes/sectionRoutes';
import courseRoutes from './routes/courseRoutes';
import './passport';
import noteRoutes from './routes/noteRoutes';
import { handleError } from './middleware/middleware';
import bookRoute from './routes/bookRoute';

dotenv.config();
const port = process.env.PORT || 8000;

const app = express();

const mongoDB = process.env.MONGODB_URL;
mongoose.set('strictQuery', true);
mongoose.connect(`${mongoDB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json());
app.use(cors());

app.use('/videos', videoRouter);
app.use('/user', userRouter);
app.use('/section', sectionRoutes);
app.use('/course', courseRoutes);
app.use('/notes', noteRoutes);
app.use('/book', bookRoute);

app.use(handleError);

app.listen(port, function () {
  console.log('Listening on port 8000!');
});
