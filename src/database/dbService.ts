import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';

type SqlArg = {
    sql: string;
    params?: (string | number)[];
}

//DB名
const DB_NAME = "MemoAPP.db";

const getDbFilePath = () => {
    const path = FileSystem.documentDirectory + "SQLite" + "/" + DB_NAME;
    return path;
}

/**
 * 取得系SQL
 * @param sqlArg SQL引数
 * @returns 取得結果
 */
const fetch = async<T>(sqlArg: SqlArg): Promise<T[]> => {
    //DBオープン
    const db = await SQLite.openDatabaseAsync(DB_NAME);
    const {sql, params} = sqlArg;

    try {
        //SQL実行
        const allRows = await db.getAllAsync<T>(sql, ...(params || []));
        return allRows;
    } catch(error) {
        console.error("DBエラー：", error);
        throw error;
    }
};

/**
 * 更新系、実行系SQL
 * @param sqlArgs 
 * @returns 処理結果
 */
const execute = async (...sqlArgs: SqlArg[]): Promise<void> => {
    const db = await SQLite.openDatabaseAsync(DB_NAME);
    
    //トランザクションでSQL実行
    //withTransactionAsyncは、複数の runAsync や getAllAsync などを 1つのトランザクション にまとめて実行する
    await db.withTransactionAsync(async () => {
        for(const arg of sqlArgs) {
            const { sql, params } = arg;

            try {
                //SQL実行
                //runAsyncは単一の SQL 文を実行するメソッド
                await db.runAsync(sql, ...(params || []));
            }catch(error) {
                console.error("DBエラー：", error);
                throw error;
            }
        }
    })
};

export { execute, fetch, getDbFilePath };
