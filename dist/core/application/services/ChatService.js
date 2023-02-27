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
exports.ChatService = void 0;
class ChatService {
    constructor(userRepository, chatRepository) {
        this.userRepository = userRepository;
        this.chatRepository = chatRepository;
        this.getChats = (id, funcName) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findById(id, 'Users');
            const chats = yield this.chatRepository.callFunction(funcName, id);
            return { user, chats };
        });
        this.getMessages = (chat_id, funcName) => __awaiter(this, void 0, void 0, function* () {
            const messages = yield this.chatRepository.callFunction(funcName, chat_id);
            return messages;
        });
    }
}
exports.ChatService = ChatService;
