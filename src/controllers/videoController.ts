import { Request, Response, NextFunction } from 'express';
import Video from '../models/videoModel';
import Section from '../models/sectionModel';
import fs, { PathLike } from 'fs';
import CourseModel from '../models/courseModel';

export const videos_list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const videos = await Video.find().populate('section').populate('course');
    res.json(videos);
  } catch (err) {
    return next(err);
  }
};

export const get_video_data = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const video = await Video.findById(req.params.videoid).populate('section').populate('course');
    res.json(video);
  } catch (e) {
    return next(e);
  }
};

export const set_video_watch_status = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Video.findByIdAndUpdate(req.params.videoid, { watched: req.body.watched }, { new: true });
    const videos = await Video.find().populate('section');
    res.json(videos);
  } catch (e) {
    return next(e);
  }
};

export const get_video = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const video = await Video.findById(req.params.videoid);
    const videoPath: PathLike = video ? video.path : '';
    const options: { start: number | undefined; end: number | undefined } = { start: undefined, end: undefined };
    let start: number | undefined;
    let end: number | undefined;
    const range = req.headers.range;

    if (!range) {
      res.status(400).send('Requires Range header');
    }

    if (range) {
      const bytesPrefix = 'bytes=';

      if (range.startsWith(bytesPrefix)) {
        const bytesRange = range.substring(bytesPrefix.length);
        const parts = bytesRange.split('-');

        if (parts.length === 2) {
          const rangeStart = parts[0] && parts[0].trim();
          if (rangeStart && rangeStart.length > 0) {
            options.start = start = parseInt(rangeStart);
          }
          const rangeEnd = parts[1] && parts[1].trim();
          if (rangeEnd && rangeEnd.length > 0) {
            options.end = end = parseInt(rangeEnd);
          }
        }
      }
    }

    res.setHeader('content-type', 'video/mp4');

    fs.stat(videoPath, (err, stat) => {
      if (err) {
        console.error(`File stat error for ${videoPath}.`);
        console.error(err);
        res.sendStatus(500);
        return;
      }

      const contentLength = stat.size;

      if (req.method === 'HEAD') {
        res.statusCode = 200;
        res.setHeader('accept-ranges', 'bytes');
        res.setHeader('content-length', contentLength);
        res.end();
      } else {
        let retrievedLength;
        if (start !== undefined && end !== undefined) {
          retrievedLength = end + 1 - start;
        } else if (start !== undefined) {
          retrievedLength = contentLength - start;
        } else if (end !== undefined) {
          retrievedLength = end + 1;
        } else {
          retrievedLength = contentLength;
        }

        res.statusCode = start !== undefined || end !== undefined ? 206 : 200;

        res.setHeader('content-length', retrievedLength);

        if (range !== undefined) {
          res.setHeader('content-range', `bytes ${start || 0}-${end || contentLength - 1}/${contentLength}`);
          res.setHeader('accept-ranges', 'bytes');
        }

        const fileStream = fs.createReadStream(videoPath, options);
        fileStream.on('error', error => {
          console.log(`Error reading file ${videoPath}.`);
          console.log(error);
          res.sendStatus(500);
        });

        fileStream.pipe(res);
      }
    });
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
      course: section?.course,
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

export const update_video = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const section = await Section.findById(req.body.sectionID);

    const video = await Video.findByIdAndUpdate(
      req.params.videoid,
      {
        name: req.body.name,
        path: req.body.path,
        course: section?.course,
        watched: req.body.watched,
        description: req.body.description,
        section: section,
      },
      { new: true },
    )
      .populate('section')
      .populate('course');

    res.json(video);
  } catch (e) {
    return next(e);
  }
};
