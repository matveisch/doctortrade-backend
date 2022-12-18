import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";

export const create_user = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  bcrypt.hash(req.body.password, 10, (err: any, hashedPass: any) => {
    if (err) return next(err);

    const user = new User({
      firstName: req.body.firstName,
      secondName: req.body.secondName,
      username: req.body.username,
      password: hashedPass,
      phone: req.body.phone,
      email: req.body.email,
    });

    user.save((error) => {
      if (error) return next(error);

      res.json(user);
    });
  });
};
