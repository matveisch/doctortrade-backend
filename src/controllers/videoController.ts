import { Request, Response, NextFunction } from 'express';
import Video from '../models/videoModel';
import Section from '../models/sectionModel';
import { getSignedUrl } from '@aws-sdk/cloudfront-signer';

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
    // const video = await Video.findById(req.params.videoid);
    const videoName = 'pexels-mart-production-8471384.mp4';
    const videoPath = `https://d1trlqnyyov9mm.cloudfront.net/${videoName}`;

    const url = getSignedUrl({
      url: videoPath,
      dateLessThan: `${new Date(Date.now() + 1000 * 60 * 60 * 24)}`,
      privateKey: process.env.CLOUDFRONT_PRIVATE_KEY || '',
      keyPairId: process.env.CLOUDFRONT_KEY_PAIR_ID || '',
    });

    res.json(url);
  } catch (e) {
    return next(e);
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
