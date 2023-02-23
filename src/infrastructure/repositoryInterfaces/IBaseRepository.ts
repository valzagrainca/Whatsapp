import { QueryResult } from "pg";

export interface IBaseRepository<T> {
    fetchAll(tableName: string): Promise<T[]>;
    deleteById(id: number, tableName: string): Promise<void>;
    findById(id: number, tableName: string): Promise<T>;
    updateById(tableName: string, values: Record<string, any>, where: Record<string, any>): Promise<void> ;
    callFunction(funcName: string, ...params: any[]): Promise<any[]>;
}