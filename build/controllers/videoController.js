"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_video = exports.get_video = exports.videos_list = void 0;
var videoModel_1 = __importDefault(require("../models/videoModel"));
var fs_1 = __importDefault(require("fs"));
var videos_list = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var videos, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, videoModel_1.default.find()];
            case 1:
                videos = _a.sent();
                res.json(videos);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                return [2 /*return*/, next(err_1)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.videos_list = videos_list;
var get_video = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var video, range, videoPath, videoSize, CHUNK_SIZE, start, end, contentLength, headers, videoStream, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, videoModel_1.default.findById(req.params.videoid)];
            case 1:
                video = _a.sent();
                range = req.headers.range;
                if (!range) {
                    res.status(400).send("Requires Range header");
                }
                videoPath = video ? video.path : "";
                videoSize = fs_1.default.statSync(videoPath).size;
                CHUNK_SIZE = Math.pow(10, 6);
                start = Number(range === null || range === void 0 ? void 0 : range.replace(/\D/g, ""));
                end = Math.min(start + CHUNK_SIZE, videoSize - 1);
                contentLength = end - start + 1;
                headers = {
                    "Content-Range": "bytes ".concat(start, "-").concat(end, "/").concat(videoSize),
                    "Accept-Ranges": "bytes",
                    "Content-Length": contentLength,
                    "Content-Type": "video/mp4",
                };
                res.writeHead(206, headers);
                videoStream = fs_1.default.createReadStream(videoPath, { start: start, end: end });
                videoStream.pipe(res);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                return [2 /*return*/, next(err_2)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.get_video = get_video;
var create_video = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var video;
    return __generator(this, function (_a) {
        video = new videoModel_1.default({
            name: req.body.name,
            path: req.body.path,
            courseName: req.body.courseName,
        });
        video.save(function (error) {
            if (error)
                return next(error);
            res.json(video);
        });
        return [2 /*return*/];
    });
}); };
exports.create_video = create_video;
