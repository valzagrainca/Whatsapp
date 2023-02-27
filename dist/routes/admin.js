"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../UI/controllers/UserController");
const UserService_1 = require("../core/application/services/UserService");
const BaseRespository_1 = require("../infrastructure/repositories/BaseRespository");
const router = express_1.default.Router();
const userRepository = new BaseRespository_1.BaseRespository;
const userService = new UserService_1.UserService(userRepository);
const userController = new UserController_1.UserController(userService);
router.get('/users', userController.getUsers);
router.get('/edit-user/:userId', userController.getUserDetail);
router.post('/edit-user', userController.editUser);
router.post('/delete-user', userController.deleteUser);
exports.default = router;
