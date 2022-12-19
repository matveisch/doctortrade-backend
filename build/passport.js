"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var passport_local_1 = __importDefault(require("passport-local"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var passport_jwt_1 = __importDefault(require("passport-jwt"));
var JWTStrategy = passport_jwt_1.default.Strategy;
var ExtractJWT = passport_jwt_1.default.ExtractJwt;
var dotenv_1 = __importDefault(require("dotenv"));
var userModel_1 = __importDefault(require("./models/userModel"));
dotenv_1.default.config();
passport_1.default.use(new passport_local_1.default.Strategy({
    usernameField: "username",
    passwordField: "password",
}, function (username, password, cb) {
    return userModel_1.default.findOne({ username: username })
        .then(function (user) {
        if (!user)
            return cb(null, false, { message: "Incorrect username." });
        bcrypt_1.default.compare(password, user.password, function (err, res) {
            if (res) {
                return cb(null, user, { message: "Logged In Successfully" });
            }
            else {
                return cb(null, false, { message: "Incorrect password" });
            }
        });
    })
        .catch(function (err) { return cb(err); });
}));
passport_1.default.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
}, function (jwtPayload, cb) {
    return userModel_1.default.findById(jwtPayload.user._id)
        .then(function (user) {
        if (user)
            return cb(null, user);
    })
        .catch(function (err) {
        return cb(err);
    });
}));
