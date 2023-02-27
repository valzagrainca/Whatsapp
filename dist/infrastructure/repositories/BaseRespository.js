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
exports.BaseRespository = void 0;
const database_1 = __importDefault(require("../dbConnection/database"));
const UpdateFailedError_1 = require("../errors/UpdateFailedError");
const DeleteFailedError_1 = require("../errors/DeleteFailedError");
const SelectFailedError_1 = require("../errors/SelectFailedError");
class BaseRespository {
    constructor() { }
    fetchAll(tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryResult = yield database_1.default.query(`SELECT * FROM ${tableName}`);
                const users = Array.from(queryResult.rows);
                return users;
            }
            catch (_a) {
                throw new SelectFailedError_1.SelectFailedError(`Select all from ${tableName} failed`);
            }
        });
    }
    findById(id, tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryResult = yield database_1.default.query(`SELECT * FROM ${tableName} WHERE id = $1`, [id]);
                const filteredById = queryResult.rows[0];
                return filteredById;
            }
            catch (_a) {
                throw new SelectFailedError_1.SelectFailedError(`Select from ${tableName} were id=${id} failed`);
            }
        });
    }
    ;
    deleteById(id, tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query(`DELETE FROM ${tableName} WHERE id = $1`, [id]);
            }
            catch (_a) {
                throw new DeleteFailedError_1.DeleteFailedError(`Delete from ${tableName} where id=${id} failed`);
            }
        });
    }
    ;
    updateById(tableName, values, where) {
        return __awaiter(this, void 0, void 0, function* () {
            const columns = Object.keys(values);
            const whereColumns = Object.keys(where);
            const updateQuery = `
          UPDATE ${tableName}
          SET ${columns.map((c, i) => `"${c}"=$${i + 1}`).join(', ')}
          WHERE ${whereColumns.map((c, i) => `"${c}"=$${i + columns.length + 1}`).join(' AND ')}
        `;
            const updateValues = [...Object.values(values), ...Object.values(where)];
            try {
                yield database_1.default.query(updateQuery, updateValues);
            }
            catch (_a) {
                throw new UpdateFailedError_1.UpdateFailedError(`Update of entity ${tableName} failed`);
            }
        });
    }
    ;
    callFunction(funcName, ...params) {
        return __awaiter(this, void 0, void 0, function* () {
            const placeholders = params.map((_, i) => `$${i + 1}`).join(',');
            const query = `SELECT * FROM ${funcName}(${placeholders});`;
            const result = yield database_1.default.query(query, params);
            return result.rows;
        });
    }
}
exports.BaseRespository = BaseRespository;
