import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
import passportJWT from "passport-jwt";
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
import dotenv from "dotenv";
import User from "./models/userModel";

dotenv.config();

passport.use(
  new LocalStrategy.Strategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    function (username, password, cb) {
      return User.findOne({ username })
        .then((user) => {
          if (!user) return cb(null, false, { message: "Incorrect username." });

          bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
              return cb(null, user, { message: "Logged In Successfully" });
            } else {
              return cb(null, false, { message: "Incorrect password" });
            }
          });
        })
        .catch((err) => cb(err));
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    function (jwtPayload, cb) {
      return User.findById(jwtPayload.user._id)
        .then((user) => {
          if (user) return cb(null, user);
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);
