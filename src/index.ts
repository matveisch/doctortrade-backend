import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";
import { Request, Response } from "express";
import videoRouter from "./routes/videoRoutes";
import userRouter from "./routes/userRoutes";
import "./passport";

dotenv.config();

const app = express();

const port = process.env.PORT || 8000;

const mongoDB = process.env.MONGODB_URL;
mongoose.set("strictQuery", true);
mongoose.connect(`${mongoDB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.json("hello world");
});

app.use("/videos", videoRouter);
app.use("/user", userRouter);

app.listen(port, function () {
  console.log("Listening on port 8000!");
});
