"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postEditUser = exports.getEditUser = exports.deleteUser = exports.getUsers = void 0;
const users_1 = __importDefault(require("../models/users"));
const getUsers = (req, res, next) => {
    users_1.default.fetchAll()
        .then((result) => {
        const users = result.rows;
        res.render('admin/users', {
            users: users,
            pageTitle: 'Users',
            path: '/admin/users'
        });
    })
        .catch((err) => {
        console.log(err);
        res.status(500).send('An error occurred while fetching products');
    });
};
exports.getUsers = getUsers;
const deleteUser = (req, res, next) => {
    const userId = req.body.userId;
    users_1.default.deleteById(userId)
        .then(() => {
        res.redirect('/admin/users');
    })
        .catch((err) => console.log(err));
};
exports.deleteUser = deleteUser;
const getEditUser = (req, res, next) => {
    const userId = Number(req.params.userId);
    users_1.default.findById(userId)
        .then((result) => {
        res.render('admin/edit-user', {
            pageTitle: 'Edit User',
            path: '/admin/edit-user',
            user: result.rows[0]
        });
    });
};
exports.getEditUser = getEditUser;
const postEditUser = (req, res, next) => {
    const id = req.body.user_id;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const number = req.body.number;
    const status = req.body.status;
    const profile_picture = req.body.profile_picture;
    console.log(id, first_name, last_name, number, status, profile_picture);
    users_1.default.update(id, first_name, last_name, number, status, profile_picture)
        .then(() => res.redirect('/admin/users'))
        .catch((err) => console.log(err));
};
exports.postEditUser = postEditUser;
