export interface Class {
    id?: string;
    score: number;
    name: string;
    students: {id: string, name: string, score: number}[]
}