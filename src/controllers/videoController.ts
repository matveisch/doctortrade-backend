import { Request, Response, NextFunction } from "express";
import Video, { VideoType } from "../models/videoModel";
const fs = require("fs");

exports.videos_list = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    return next(err);
  }
};

exports.get_video = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const video = await Video.findById(req.params.videoid);

    const range = req.headers.range;
    if (!range) {
      res.status(400).send("Requires Range header");
    }

    const videoPath = video?.path;
    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = 10 ** 6;

    const start = Number(range?.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;

    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
  } catch (err) {
    if (err) return next(err);
  }
};
