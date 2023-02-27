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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
        this.getUserChats = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const userId = Number(req.params.userId);
            const result = yield this.chatService.getChats(userId, 'get_user_chats');
            res.render('chats/userchats', {
                pageTitle: 'User Chat',
                user: result.user,
                chats: result.chats
            });
        });
        this.getMessages = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const chatId = Number(req.params.chatId);
            const messages = yield this.chatService.getChats(1, 'v_view_chat');
            res.json(messages);
        });
        this.redirectToUsers = (req, res, next) => {
            res.redirect('/admin/users');
        };
    }
}
exports.ChatController = ChatController;
