import { NextFunction, Request, Response } from 'express';
import NoteModel from '../models/noteModel';
import UserModel from '../models/userModel';

export const create_note = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, page }: { userId: string; page: number } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) throw new Error('user does not exist');

    const existingNote = await NoteModel.findOne({ page: page, userId: user._id });
    if (existingNote) throw new Error('this page has been marked already');

    const note = new NoteModel({
      name: req.body.name,
      page: req.body.page,
      userId: user._id,
    });

    await note.save();

    res.json(note);
  } catch (err) {
    return next(err);
  }
};

export const get_notes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.query;
    const notes = await NoteModel.find({ userId: userId }).exec();
    res.json(notes);
  } catch (e) {
    return next(e);
  }
};

export const updateNoteName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { noteId } = req.params;
    const note = await NoteModel.findByIdAndUpdate(noteId, { name: req.body.name }).exec();
    res.json(note);
  } catch (e) {
    return next(e);
  }
};

export const delete_note = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { noteId } = req.params;
    const note = await NoteModel.findByIdAndDelete(noteId).exec();
    res.json(note);
  } catch (e) {
    return next(e);
  }
};
