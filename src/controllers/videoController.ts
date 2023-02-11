import { Request, Response, NextFunction } from 'express';
import Video from '../models/videoModel';
import Section from '../models/sectionModel';
import fs, { PathLike } from 'fs';

export const videos_list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const videos = await Video.find().populate('section');
    res.json(videos);
  } catch (err) {
    return next(err);
  }
};

export const get_video_data = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const video = await Video.findById(req.params.videoid).populate('section');
    res.json(video);
  } catch (e) {
    return next(e);
  }
};

export const set_video_watch_status = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.videoid, { watched: req.body.watched }, { new: true });
    res.json(video);
  } catch (e) {
    return next(e);
  }
};

export const get_video = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const video = await Video.findById(req.params.videoid);

    const range = req.headers.range;
    if (!range) {
      res.status(400).send('Requires Range header');
    }

    const videoPath: PathLike = video ? video.path : '';
    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = 10 ** 6;

    const start = Number(range?.replace(/\D/g, ''));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;

    const headers = {
      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
  } catch (err) {
    return next(err);
  }
};

export const create_video = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const section = await Section.findById(req.body.sectionID);

    const video = new Video({
      name: req.body.name,
      path: req.body.path,
      course: req.body.course,
      watched: req.body.watched,
      description: req.body.description,
      section: section,
    });

    await video.save();

    res.json(video);
  } catch (e) {
    return next(e);
  }
};
