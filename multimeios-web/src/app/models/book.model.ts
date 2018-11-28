export interface Book {
    id?: string;
    title: string;
    author: string;
    editor?: string;
    category: string;
    edition?: string;
    year?: number;
    quantity: number;
    available?: number;
}