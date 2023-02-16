import { Request, Response, NextFunction } from 'express';
import User, { UserType } from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import dotenv from 'dotenv';

dotenv.config();

// user user – username and password
// email@mail.com user
export const create_user = (req: Request, res: Response, next: NextFunction) => {
  // create user only if unique email, phone and username provided
  User.findOne({ email: req.body.email }, (err: Error | undefined, user: UserType) => {
    if (err) return next(err);

    if (!user) {
      bcrypt.hash(req.body.password, 10, (err: Error | undefined, hashedPass: string) => {
        if (err) return next(err);

        const user = new User({
          firstName: req.body.firstName,
          email: req.body.email,
          password: hashedPass,
          isAdmin: req.body.isAdmin,
          hasPaid: req.body.hasPaid,
        });

        user.save(error => {
          if (error) return next(error);

          res.json(user);
        });
      });
    } else {
      return res.status(400).json({
        message: 'email exists',
      });
    }
  });
};

export const log_in = function (req: Request, res: Response) {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user: user,
      });
    }

    req.login(user, { session: false }, err => {
      if (err) res.send(err);

      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign({ user }, process.env.JWT_SECRET ? process.env.JWT_SECRET : '');
      return res.json({ user, token });
    });
  })(req, res);
};

export const get_users = async function (req: Request, res: Response, next: NextFunction) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (e) {
    return next(e);
  }
};

export const get_user = async function (req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.findById(req.params.userid).select('firstName secondName email facebook telegram linkedin');
    res.json(user);
  } catch (e) {
    return next(e);
  }
};

export const update_user = async function (req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userid,
      {
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        facebook: req.body.facebook,
        telegram: req.body.telegram,
        linkedin: req.body.telegram,
      },
      { new: true },
    ).select('firstName secondName email facebook telegram linkedin');
    res.json(user);
  } catch (e) {
    return next(e);
  }
};
