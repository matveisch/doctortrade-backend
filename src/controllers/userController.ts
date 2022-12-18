import { Request, Response, NextFunction } from "express";
import User, { UserType } from "../models/userModel";
import bcrypt from "bcrypt";

// user user – username and password
export const create_user = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // create user only if unique email, phone and username provided
  User.findOne(
    {
      $or: [
        { username: req.body.username },
        { email: req.body.email },
        { phone: req.body.phone },
      ],
    },
    (err: Error | undefined, user: UserType) => {
      if (err) return next(err);

      if (!user) {
        bcrypt.hash(
          req.body.password,
          10,
          (err: Error | undefined, hashedPass: string) => {
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
          }
        );
      } else {
        return res.status(400).json({
          message: "either username, or email, or phone already exists",
        });
      }
    }
  );
};
