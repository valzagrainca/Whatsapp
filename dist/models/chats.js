"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../util/database"));
class Chat {
    constructor(user_id, chat_id, message_id, chat_name, is_group, group_picture, group_admin) {
        this.user_id = user_id;
        this.chat_id = chat_id;
        this.message_id = message_id;
        this.chat_name = chat_name;
        this.is_group = is_group;
        this.group_picture = group_picture;
        this.group_admin = group_admin;
    }
    static findChatsById(id) {
        return database_1.default.query("select * from get_user_chats($1);", [id]);
    }
}
exports.default = Chat;
