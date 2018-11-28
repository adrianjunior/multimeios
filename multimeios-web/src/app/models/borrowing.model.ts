export interface Borrowing {
    id?: string;
    bookId: string;
    bookTitle: string;
    bookAuthor: string;
    bookAvailable: number;
    userId: string;
    userName: string;
    userEmail: string;
    userBorrowing: number;
    employeeId: string;
    employeeName: string;
    startDate: string;
    endDate: string;
}