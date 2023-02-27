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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const users_1 = __importDefault(require("../../domain/entities/users"));
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.getUsers = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.fetchAll('Users');
        });
        this.getUserById = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findById(id, 'Users');
        });
        this.deleteUserById = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.deleteById(id, 'Users');
        });
        this.updateUser = (id, first_name, last_name, number, status, profile_picture) => __awaiter(this, void 0, void 0, function* () {
            const user = new users_1.default(id, first_name, last_name, number, status, profile_picture);
            return yield this.userRepository.updateById('Users', user, { id: id });
        });
    }
}
exports.UserService = UserService;
