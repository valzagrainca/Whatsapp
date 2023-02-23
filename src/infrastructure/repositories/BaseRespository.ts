
import { IBaseRepository } from "../repositoryInterfaces/IBaseRepository";
import db from "../dbConnection/database";
import { UpdateFailedError } from "../errors/UpdateFailedError";
import { QueryResult } from "pg";
import { DeleteFailedError } from "../errors/DeleteFailedError";

export class BaseRespository<T>  implements IBaseRepository<T> {
    constructor(){}

    async fetchAll(tableName: string): Promise<T[]> {
        const queryResult = await db.query(`SELECT * FROM ${tableName}`);
        const users = Array.from(queryResult.rows);
        return users;
      }

    async findById(id: number, tableName: string): Promise<T>{
        const queryResult=await db.query(`SELECT * FROM ${tableName} WHERE id = $1`, [id]);
        const filteredById=queryResult.rows[0];
        return filteredById;
    }; 

    async deleteById(id: number, tableName: string): Promise<void>{
      try{
        await db.query(`DELETE FROM ${tableName} WHERE id = $1`, [id]);
      }
      catch{
        throw new DeleteFailedError(`Delete from ${tableName} where id=${id} failed`)
      }

    };
    
    async updateById(tableName: string, values: Record<string, any>, where: Record<string, any>): Promise<void> {
        const columns = Object.keys(values);
        const whereColumns = Object.keys(where);
      
        const updateQuery = `
          UPDATE ${tableName}
          SET ${columns.map((c, i) => `"${c}"=$${i + 1}`).join(', ')}
          WHERE ${whereColumns.map((c, i) => `"${c}"=$${i + columns.length + 1}`).join(' AND ')}
        `;
      
        const updateValues = [...Object.values(values), ...Object.values(where)];
      
        try{
          await db.query(updateQuery, updateValues);
        }
        catch{
          throw new UpdateFailedError(`Update of entity ${tableName} failed`)
        }
    };

    async  callFunction(funcName: string, ...params: any[]): Promise<any[]>{
      const placeholders = params.map((_, i) => `$${i+1}`).join(',');
      const query = `SELECT * FROM ${funcName}(${placeholders});`;
      const result = await db.query(query, params);
      return result.rows;
    }

}