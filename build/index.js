"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var mongoose_1 = __importDefault(require("mongoose"));
var videoRoutes_1 = __importDefault(require("./routes/videoRoutes"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
require("./passport");
dotenv_1.default.config();
var app = (0, express_1.default)();
var mongoDB = process.env.MONGODB_URL;
mongoose_1.default.set("strictQuery", true);
mongoose_1.default.connect("".concat(mongoDB), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
var db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", function (req, res) {
    res.json("hello world");
});
app.use("/videos", videoRoutes_1.default);
app.use("/user", userRoutes_1.default);
app.listen(8000, function () {
    console.log("Listening on port 8000!");
});
