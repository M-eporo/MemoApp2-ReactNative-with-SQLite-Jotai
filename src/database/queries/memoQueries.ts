
const CreateTableMemos = `
    CREATE TABLE IF NOT EXISTS memos(
        id          TEXT,
        label_id    INTEGER,
        title       TEXT        NOT NULL,
        content     TEXT        NOT NULL,
        created_at  TEXT        DEFAULT (DATETIME('now', 'localtime')),
        updated_at  TEXT        DEFAULT (DATETIME('now', 'localtime')),
        PRIMARY KEY(id),
        FOREIGN KEY(label_id)    REFERENCES labels(id)
    );
`;

/**
 * すべてのメモ取得
 */
const SelectMemos = `
    SELECT
        m.id,
        m.label_id,
        m.title,
        m.content,
        m.created_at,
        m.updated_at,
        l.name,
        l.color
    FROM
        memos AS m
    LEFT JOIN
        labels AS L
    ON
        m.label_id = l.id
    ORDER BY
        m.updated_at DESC;
`;

const SelectMemoTargetId = `
    SELECT
        id,
        label_id,
        title,
        content,
        created_at,
        updated_at,
    FROM
        memos;
    WHERE 
        id = ?;
`;

/**
 * メモ追加
 * @param id メモID
 * @param title
 * @param content
 */
const InsertMemo = `
    INSERT INTO memos (
        id,
        title,
        content
    ) VALUES (
        ?,
        ?,
        ?
    );
`;

/**
 * メモの更新
 */
const UpdateMemo = `
    UPDATE
        memos
    SET
        title =?,
        content = ?,
        updated_at = (DATETIME('now', 'localtime'))
    WHRERE
        id = ?;
`
/**
 * メモの削除
 * @param id メモID
 */
const DeleteMemo = `
    DELETE FROM
        memos
    WHERE
        id = ?;
`
const MemoQueries = Object.freeze({
    CREATE_TABLE: CreateTableMemos,
    SELECT_MEMOS: SelectMemos,
    SELECT_MEMO_TARGET_ID: SelectMemoTargetId,
    INSERT: InsertMemo,
    UPDATE: UpdateMemo,
    DELETE: DeleteMemo,
});

export { MemoQueries };