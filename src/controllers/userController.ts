import { Request, Response, NextFunction } from 'express';
import User, { UserType } from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import dotenv from 'dotenv';
import { sendToken } from '../tokenSender';
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
          confirmed: false,
        });

        user.save(error => {
          if (error) return next(error);
        });

        sendToken(user._id, user.email);

        res.json(user);
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

    if (!user.confirmed) {
      sendToken(user._id, user.email);
      return res.status(400).json({
        message: 'Please verify your email',
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
    ).select('firstName secondName email facebook telegram linkedin isAdmin hasPaid');
    res.json(user);
  } catch (e) {
    return next(e);
  }
};

export const update_user_email = async function (req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.findById(req.params.userid);
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, response) => {
        if (response) {
          User.findByIdAndUpdate(req.params.userid, { email: req.body.email }, { new: true })
            .select('firstName secondName email facebook telegram linkedin isAdmin hasPaid')
            .then(user => {
              return res.json(user);
            });
        } else {
          return res.status(400).json({
            message: 'incorrect password',
          });
        }
      });
    }
  } catch (error) {
    return next(error);
  }
};

export const change_password = async function (req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.findById(req.params.userid);
    if (user) {
      bcrypt.compare(req.body.oldPassword, user.password, (err, response) => {
        if (response) {
          bcrypt.hash(req.body.newPassword, 10, (err: Error | undefined, hashedPass: string) => {
            if (err) return next(err);

            User.findByIdAndUpdate(req.params.userid, { password: hashedPass }, { new: true })
              .select('firstName secondName email facebook telegram linkedin isAdmin hasPaid')
              .then(() => {
                return res.json({ message: 'password changed' });
              });
          });
        } else {
          return res.status(400).json({
            message: 'incorrect password',
          });
        }
      });
    }
  } catch (error) {
    return next(error);
  }
};

export const verify = async function (req: Request, res: Response, next: NextFunction) {
  const { token } = req.params;

  // Verifying the JWT token
  jwt.verify(token, process.env.JWT_SECRET ? process.env.JWT_SECRET : '', function (err, decoded) {
    if (err) {
      console.log(err);
      res.send('Email verification failed, possibly the link is invalid or expired');
    } else {
      const { userId } = decoded as { userId: string };
      User.findByIdAndUpdate(userId, { confirmed: true }, { new: true }, function (err, user) {
        if (err) return next(err);
        res.json({
          message: 'Email verified successfully',
          user,
        });
      });
    }
  });
};
