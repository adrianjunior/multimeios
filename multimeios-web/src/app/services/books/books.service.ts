import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Book } from '../../models/book.model';
import { Subject } from 'rxjs/Subject';
import * as moment from 'moment';
import 'rxjs/add/operator/map'
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { Borrowing } from '../../models/borrowing.model';
import { LogItem } from '../../models/logitem.model';
import { Employee } from '../../models/employee.model';
import scoreSystem from '../../../assets/scoreSystem';
import { EmployeesService } from '../employees/employees.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[];
  book: Book;
  borrowings: Borrowing[];

  booksChanged = new Subject<Book[]>();
  bookChanged = new Subject<Book>();
  isLoading = new Subject<boolean>();
  didBorrow = new Subject<boolean>();
  borrowingsChanged = new Subject<Borrowing[]>();
  didReturn = new Subject<boolean>();

  employeeSubscription: Subscription; 

  private subs: Subscription[] = [];

  constructor(private db: AngularFirestore, private snackBar: MatSnackBar,
              private employeesService: EmployeesService) {}

  //Create
  addBook(book: Book) {
    this.isLoading.next(true);
    this.db
      .collection('books')
      .add(book)
      .then(res => {
        this.isLoading.next(false);
        this.openSnackBar('Livro cadastrado com sucesso!', 'OK');
      })
      .catch(err => {
        this.isLoading.next(false);
        this.openSnackBar('Ocorreu um erro. Verifique sua conexão.', 'OK');
      })
  }

  //Read
  getBook(id: string) {
    this.isLoading.next(true);
    this.subs.push(this.db
      .collection('books')
      .doc(id)
      .snapshotChanges()
      .map(doc => {
        return {
          id: doc.payload.id,
          ...doc.payload.data()
        } as Book;
      })
      .subscribe((book: Book) => {
        this.book = book;
        this.bookChanged.next(this.book)
        this.isLoading.next(false);
      })
    );
  }

  //Update
  editBook(id: string, book: Book) {
    this.isLoading.next(true);
    this.db
      .collection('books')
      .doc(id)
      .update(book)
      .then(res => {
        this.isLoading.next(false);
        this.openSnackBar('Livro editado com sucesso!', 'OK');
      })
      .catch(err => {
        this.isLoading.next(false);
        this.openSnackBar('Ocorreu um erro. Verifique sua conexão.', 'OK');
      })
  }

  //Delete
  deleteBook(id: string) {
    this.isLoading.next(true);
    this.db
      .collection('books')
      .doc(id)
      .delete()
      .then(res => {
        this.isLoading.next(false);
        this.openSnackBar('Livro excluido com sucesso!', 'OK');
      })
      .catch(err => {
        this.isLoading.next(false);
        this.openSnackBar('Ocorreu um erro. Verifique sua conexão.', 'OK');
      })
  }

  //Read List
  getBooks() {
    this.isLoading.next(true);
    this.subs.push(
      this.db
        .collection('books')
        .snapshotChanges()
        .map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              ...doc.payload.doc.data()
            } as Book;
          });
        })
        .subscribe((books: Book[]) => {
          this.books = books;
          this.booksChanged.next([...this.books])
          this.isLoading.next(false);
        })
    );
  }

  cancelSubscriptions() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  getBorrowings() {
    this.isLoading.next(true);
    this.subs.push(
      this.db
        .collection('borrowings')
        .snapshotChanges()
        .map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              ...doc.payload.doc.data()
            } as Borrowing;
          });
        })
        .subscribe((borrowings: Borrowing[]) => {
          this.borrowings = borrowings;
          this.borrowingsChanged.next([...this.borrowings])
          this.isLoading.next(false);
        })
    );
  }

  borrowBook(user: User, book: Book) {
    this.isLoading.next(true)
    const now = moment();
    const borrowDate = now.locale('pt-br').format('L');
    const returnDate = now.add(15, 'days').locale('pt-br').format('L');
    this.employeeSubscription = this.employeesService.employeeChanged.subscribe(employee => {
      let borrowing: Borrowing = {
        bookId: book.id,
        bookTitle: book.title,
        bookAuthor: book.author,
        bookAvailable: book.available-1,
        employeeId: employee.id,
        employeeName: employee.name,
        startDate: borrowDate,
        endDate: returnDate,
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        userBorrowing: user.borrowing+1
      };
      console.log(borrowing)
      this.addBorrowing(borrowing);
      let logItem: LogItem = {
        type: 'Aluguel de Livro',
        date: borrowDate,
        hour: now.locale('pt-br').format('LT'),
        employeeName: employee.name,
        bookTitle: book.title,
        bookAuthor: book.author,
        userName: user.name,
        userEmail: user.email
      }
      console.log(logItem)
      this.addLogItem(logItem);
      this.subtractBook(book.id, book.available);
      this.addBorrowingToUser(user.id, user.borrowing);
    })
    this.employeesService.getCurrentEmployee();
  }

  addBorrowing(borrowing: Borrowing) {
    this.db
      .collection('borrowings')
      .add(borrowing)
      .catch(err => {
        this.openSnackBar('Ocorreu um erro. Verifique sua conexão.', 'OK');
        this.isLoading.next(false);
      });
  }

  addLogItem(logItem: LogItem) {
    this.db
      .collection('logs')
      .add(logItem)
      .catch(err => {
        this.openSnackBar('Ocorreu um erro. Verifique sua conexão.', 'OK');
        this.isLoading.next(false);
      });
  }

  subtractBook(bookId: string, bookAvailable: number) {
    this.db
      .collection('books')
      .doc(bookId)
      .update({
        'available': bookAvailable-1
      })
      .catch(err => {
        this.openSnackBar('Ocorreu um erro. Verifique sua conexão.', 'OK');
        this.isLoading.next(false);
      })
  }

  addBorrowingToUser(userId: string, userBorrowing: number) {
    this.db
      .collection('users')
      .doc(userId)
      .update({
        'borrowing': userBorrowing+1
      })
      .then(res => {
        this.openSnackBar('Livro alugado com sucesso', 'OK');
        this.isLoading.next(false);
        this.didBorrow.next(true);
      })
      .catch(err => {
        this.openSnackBar('Ocorreu um erro. Verifique sua conexão.', 'OK');
        this.isLoading.next(false);
      })
  }

  returnBook(borrowing: Borrowing) {
    this.isLoading.next(true)
    const now = moment();
    const returnDate = now.locale('pt-br').format('L');
    this.employeeSubscription = this.employeesService.employeeChanged.subscribe(employee => {
      console.log(borrowing)
      this.removeBorrowing(borrowing);
      let logItem: LogItem = {
        type: 'Devolução de Livro',
        date: returnDate,
        hour: now.locale('pt-br').format('LT'),
        employeeName: employee.name,
        bookTitle: borrowing.bookTitle,
        bookAuthor: borrowing.bookAuthor,
        userName: borrowing.userName,
        userEmail: borrowing.userEmail
      }
      console.log(logItem)
      this.addLogItem(logItem);
      this.addBookAvailable(borrowing.bookId, borrowing.bookAvailable);
      this.subtractBorrowingToUser(borrowing.userId, borrowing.userBorrowing);
    })
    this.employeesService.getCurrentEmployee();
  }

  removeBorrowing(borrowing: Borrowing) {
    this.db
      .collection('borrowings')
      .doc(borrowing.id)
      .delete()
      .catch(err => {
        this.openSnackBar('Ocorreu um erro. Verifique sua conexão.', 'OK');
        this.isLoading.next(false);
      });
  }

  addBookAvailable(bookId: string, bookAvailable: number) {
    this.db
      .collection('books')
      .doc(bookId)
      .update({
        'available': bookAvailable+1
      })
      .catch(err => {
        this.openSnackBar('Ocorreu um erro. Verifique sua conexão.', 'OK');
        this.isLoading.next(false);
      })
  }

  subtractBorrowingToUser(userId: string, userBorrowing: number) {
    this.db
      .collection('users')
      .doc(userId)
      .update({
        'borrowing': userBorrowing-1
      })
      .then(res => {
        this.openSnackBar('Livro devolvido com sucesso', 'OK');
        this.isLoading.next(false);
        this.didReturn.next(true);
      })
      .catch(err => {
        this.openSnackBar('Ocorreu um erro. Verifique sua conexão.', 'OK');
        this.isLoading.next(false);
      })
  }

  //SnackBar
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
