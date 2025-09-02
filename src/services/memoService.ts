import { execute, fetch } from "../database/dbService";
import { MemoQueries } from "../database/queries/memoQueries";
import * as Crypto from "expo-crypto";
import { Memo } from "../types/memo";
import { MemoSchema } from "../database/schemas/memoSchema";

/**
 * メモテーブル作成
 */
const createTable = async () => {
    await execute({ sql: MemoQueries.CREATE_TABLE});
};

/**
 * 
 * @returns メモ一覧取得
 */
const getMemos = async (): Promise<Memo[]> => {
    //DBから取得したメモは、MemoSchema型の配列
    const rows = await fetch<MemoSchema>({ sql: MemoQueries.SELECT_MEMOS })

    //MemoSchema型の、DBから取得したメモ情報を、アプリで使用するMemo型に変換
    const memos  = rows.map( (row): Memo => {
        return {
            id: row.id,
            title: row.title,
            content: row.content || "",
            labelId: row.label_id || undefined,
        }
    });

    return memos;
}

/**
 * 指定IDのメモ取得
 * @param memoId 
 * @returns 
 */
const getMemo = async (memoId: string): Promise<Memo | undefined> => {
    const rows = await fetch<MemoSchema>({ sql: MemoQueries.SELECT_MEMO_TARGET_ID, params: [memoId] });

    if(rows.length === 0) {
        return undefined;
    }

    const row = rows[0];
    return {
        id: row.id,
        title: row.title,
        content: row.content || "",
        labelId: row.label_id || undefined,
    }
};

/**
 * メモ追加
 * @param title
 * @param content 
 */
const addMemo = async (title: string, content: string) => {
    const memoId = Crypto.randomUUID();
    await execute({
        sql:MemoQueries.INSERT,
        params: [memoId,title,content]
    })
};

/**
 * メモ修正
 * @params memoId 修正対象のID
 */

const editMemo = async (memoId: string, title: string, content: string) => {
    await execute({ sql: MemoQueries.UPDATE, params: [title, content, memoId]})
};

/**
 * メモの削除
 * @param memoId 削除対象のメモのID
 */
const deleteMemo = async (memoId: string) => {
    await execute({ sql: MemoQueries.DELETE, params: [memoId]});
};

export { createTable, addMemo, getMemos, getMemo, editMemo, deleteMemo };