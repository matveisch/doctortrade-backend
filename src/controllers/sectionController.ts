import { Request, Response, NextFunction } from 'express';
import Section from '../models/sectionModel';
import VideoModel from '../models/videoModel';

export const create_section = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const section = new Section({
      name: req.body.name,
      description: req.body.description,
    });

    await section.save();
    res.json(section);
  } catch (e) {
    return next(e);
  }
};

export const get_sections = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sections = await Section.find();
    res.json(sections);
  } catch (e) {
    return next(e);
  }
};

export const delete_section = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const section = await Section.findById(req.params.sectionid);
    const sectionVideos = await VideoModel.find({ section: section });

    if (sectionVideos) {
      for (const video of sectionVideos) {
        try {
          await VideoModel.findByIdAndDelete(video._id);
        } catch (e) {
          return next(e);
        }
      }
    }
  } catch (e) {
    return next(e);
  }

  try {
    const section = await Section.findByIdAndDelete(req.params.sectionid);
    res.json(section);
  } catch (e) {
    return next(e);
  }
};
