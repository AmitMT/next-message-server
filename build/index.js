"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var socket_io_1 = require("socket.io");
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
var message_1 = __importDefault(require("./routes/message"));
var message_2 = __importDefault(require("./socketHandlers/message"));
require("firebase/firestore");
// App setup
var PORT = process.env.PORT || 4000;
var app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(message_1.default);
app.use(cors_1.default({ origin: ['http://localhost:3000'].concat([process.env.CORS_ORIGIN]) }));
var server = app.listen(PORT, function () {
    console.log("Listening on http://localhost:" + PORT);
});
// Socket setup
var io = new socket_io_1.Server(server, {
    cors: { origin: [''].concat([process.env.CORS_ORIGIN]) },
});
io.on('connection', function (socket) {
    message_2.default(io, socket);
});
