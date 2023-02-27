"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ChatService_1 = require("../core/application/services/ChatService");
const ChatController_1 = require("../UI/controllers/ChatController");
const BaseRespository_1 = require("../infrastructure/repositories/BaseRespository");
const router = express_1.default.Router();
const chatRepository = new BaseRespository_1.BaseRespository;
const userRepository = new BaseRespository_1.BaseRespository;
const chatService = new ChatService_1.ChatService(userRepository, chatRepository);
const chatController = new ChatController_1.ChatController(chatService);
router.get('/', chatController.redirectToUsers);
router.get('/userchats/:userId', chatController.getUserChats);
router.get('/messages', chatController.getMessages);
exports.default = router;
