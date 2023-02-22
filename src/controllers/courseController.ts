import { Request, Response, NextFunction } from 'express';
import CourseModel from '../models/courseModel';

export const create_course = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const course = new CourseModel({
      name: req.body.name,
      description: req.body.description,
    });

    await course.save();
    res.json(course);
  } catch (e) {
    return next(e);
  }
};

export const get_courses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courses = await CourseModel.find();
    res.json(courses);
  } catch (e) {
    return next(e);
  }
};

// export const delete_course = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const section = await Section.findById(req.params.sectionid);
//     const sectionVideos = await VideoModel.find({ section: section });
//
//     if (sectionVideos) {
//       for (const video of sectionVideos) {
//         try {
//           await VideoModel.findByIdAndDelete(video._id);
//         } catch (e) {
//           return next(e);
//         }
//       }
//     }
//   } catch (e) {
//     return next(e);
//   }
//
//   try {
//     const section = await Section.findByIdAndDelete(req.params.sectionid);
//     res.json(section);
//   } catch (e) {
//     return next(e);
//   }
// };
