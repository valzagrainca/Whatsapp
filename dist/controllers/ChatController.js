"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedirectToUsers = exports.getUserChat = void 0;
const users_1 = __importDefault(require("../models/users"));
const chats_1 = __importDefault(require("../models/chats"));
const getUserChat = (req, res, next) => {
    const userId = Number(req.params.userId);
    Promise.all([
        users_1.default.findById(userId),
        chats_1.default.findChatsById(userId)
    ])
        .then(([userResult, chatResult]) => {
        const user = userResult.rows[0];
        const chats = chatResult.rows;
        res.render('chats/userchats', {
            pageTitle: 'User Chat',
            path: '/chats/userchats',
            user: user,
            chats: chats
        });
    });
};
exports.getUserChat = getUserChat;
const RedirectToUsers = (req, res, next) => {
    res.redirect('/admin/users');
};
exports.RedirectToUsers = RedirectToUsers;
