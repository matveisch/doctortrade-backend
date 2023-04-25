import { Request, Response, NextFunction } from 'express';
import Section from '../models/sectionModel';
import VideoModel from '../models/videoModel';
import CourseModel from '../models/courseModel';

export const create_section = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const course = await CourseModel.findById(req.body.courseID);

    const section = new Section({
      name: req.body.name,
      description: req.body.description,
      course: course,
    });

    await section.save();
    return res.json(section);
  } catch (e) {
    return next(e);
  }
};

export const get_sections = async (req: Request, res: Response, next: NextFunction) => {
  const { courseId } = req.query;
  try {
    const sections = await Section.find({ course: courseId });
    return res.json(sections);
  } catch (e) {
    return next(e);
  }
};

export const update_section = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const course = await CourseModel.findById(req.body.courseID);
    const section = await Section.findByIdAndUpdate(
      req.params.sectionid,
      {
        name: req.body.name,
        description: req.body.description,
        course: course,
      },
      { new: true },
    ).populate('course');
    return res.json(section);
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
    return res.json(section);
  } catch (e) {
    return next(e);
  }
};
