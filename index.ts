const express = require("express");
require("dotenv").config();
import cors from "cors";
import { Request, Response } from "express";

const videoRouter = require("./src/routes/videoRoutes");

const app = express();

const mongoose = require("mongoose");
const mongoDB = process.env.MONGODB_URL;
mongoose.set("strictQuery", true);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.json("hello world");
});

app.use("/videos", videoRouter);

app.listen(8000, function () {
  console.log("Listening on port 8000!");
});
