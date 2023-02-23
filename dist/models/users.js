"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../util/database"));
class User {
    constructor(id, first_name, last_name, number, status, profile_picture) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.number = number;
        this.status = status;
        this.profile_picture = profile_picture;
    }
    static update(id, first_name, last_name, number, status, profile_picture) {
        return database_1.default.query('UPDATE users SET first_name=$1, last_name=$2, number=$3, status=$4, profile_picture=$5 WHERE id=$6', [first_name, last_name, number, status, profile_picture, id]);
    }
    static deleteById(id) {
        return database_1.default.query("Delete from Users where id= $1", [id]);
    }
    static fetchAll() {
        return database_1.default.query("SELECT * FROM users");
    }
    static findById(id) {
        return database_1.default.query("Select * from Users WHERE id = $1", [id]);
    }
}
exports.default = User;
