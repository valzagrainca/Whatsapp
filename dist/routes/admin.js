"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const router = express_1.default.Router();
router.get('/users', UserController_1.getUsers);
router.get('/edit-user/:userId', UserController_1.getEditUser);
router.post('/edit-user', UserController_1.postEditUser);
router.post('/delete-user', UserController_1.deleteUser);
exports.default = router;
