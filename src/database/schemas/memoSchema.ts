/**
 * メモのスキーマ
 */

type MemoSchema = {
    id: string;
    title: string;
    content: string | null;
    label_id: number | null;
    createdAt: string;
    updatedAt: string;
}

export type {MemoSchema}
