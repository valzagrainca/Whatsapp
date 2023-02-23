"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ChatController_1 = require("../controllers/ChatController");
const ChatController_2 = require("../controllers/ChatController");
const router = express_1.default.Router();
router.get('/', ChatController_2.RedirectToUsers);
router.get('/userchats/:userId', ChatController_1.getUserChat);
exports.default = router;
