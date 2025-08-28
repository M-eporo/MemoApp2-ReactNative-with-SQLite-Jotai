
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
`

const MemoQueries = Object.freeze({
    CREATE_TABLE: CreateTableMemos,
    SELECT_MEMOS: SelectMemos,
    INSERT: InsertMemo,
});

export { MemoQueries };