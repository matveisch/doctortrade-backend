"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log_in = exports.create_user = void 0;
var userModel_1 = __importDefault(require("../models/userModel"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var passport_1 = __importDefault(require("passport"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// user user – username and password
var create_user = function (req, res, next) {
    // create user only if unique email, phone and username provided
    userModel_1.default.findOne({
        $or: [
            { username: req.body.username },
            { email: req.body.email },
            { phone: req.body.phone },
        ],
    }, function (err, user) {
        if (err)
            return next(err);
        if (!user) {
            bcrypt_1.default.hash(req.body.password, 10, function (err, hashedPass) {
                if (err)
                    return next(err);
                var user = new userModel_1.default({
                    firstName: req.body.firstName,
                    secondName: req.body.secondName,
                    username: req.body.username,
                    password: hashedPass,
                    phone: req.body.phone,
                    email: req.body.email,
                });
                user.save(function (error) {
                    if (error)
                        return next(error);
                    res.json(user);
                });
            });
        }
        else {
            return res.status(400).json({
                message: "either username, or email, or phone already exists",
            });
        }
    });
};
exports.create_user = create_user;
var log_in = function (req, res) {
    passport_1.default.authenticate("local", { session: false }, function (err, user) {
        if (err || !user) {
            return res.status(400).json({
                message: "Something is not right",
                user: user,
            });
        }
        req.login(user, { session: false }, function (err) {
            if (err)
                res.send(err);
            // generate a signed son web token with the contents of user object and return it in the response
            var token = jsonwebtoken_1.default.sign({ user: user }, process.env.JWT_SECRET ? process.env.JWT_SECRET : "");
            return res.json({ user: user, token: token });
        });
    })(req, res);
};
exports.log_in = log_in;
