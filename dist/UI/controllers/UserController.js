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
exports.UserController = void 0;
class UserController {
    constructor(userService) {
        this.userService = userService;
        this.getUsers = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userService.getUsers();
            res.render('admin/users', {
                users: users,
                pageTitle: 'Users',
            });
        });
        this.getUserDetail = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const userId = Number(req.params.userId);
            const user = yield this.userService.getUserById(userId);
            res.render('admin/edit-user', {
                pageTitle: 'Edit User',
                user: user
            });
        });
        this.deleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.body.userId;
            this.userService.deleteUserById(userId);
            res.redirect('/admin/users');
        });
        this.editUser = (req, res, next) => {
            const id = req.body.user_id;
            const first_name = req.body.first_name;
            const last_name = req.body.last_name;
            const number = req.body.number;
            const status = req.body.status;
            const profile_picture = req.body.profile_picture;
            this.userService.updateUser(id, first_name, last_name, number, status, profile_picture);
            res.redirect('/admin/users');
        };
    }
}
exports.UserController = UserController;
