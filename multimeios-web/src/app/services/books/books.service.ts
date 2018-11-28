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
import { Class } from '../../models/class.model';
import scoreSystem from '../../../assets/scoreSystem';
import { EmployeesService } from '../employees/employees.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[];
  book: Book;

  booksChanged = new Subject<Book[]>();
  bookChanged = new Subject<Book>();
  isLoading = new Subject<boolean>();
  didBorrow = new Subject<boolean>();

  employeeSubscription: Subscription; 

  private subs: Subscription[] = [];

  constructor(private db: AngularFirestore, private snackBar: MatSnackBar,
              private employeesService: EmployeesService) {}

  //Create
  addBook(book: Book) {
    this.db
      .collection('books')
      .add(book)
      .then(res => {
        this.openSnackBar('Livro Cadastrado com sucesso!', 'OK')
      });
  }

  //Read
  getBook(id: string) {
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
      })
    );
  }

  //Update
  editBook(id: string, book: Book) {
    this.db
      .collection('books')
      .doc(id)
      .update(book)
  }

  //Delete
  deleteBook(id: string) {
    this.db
      .collection('books')
      .doc(id)
      .delete()
  }

  //Read List
  getBooks() {
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
        })
    );
  }

  cancelSubscriptions() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  borrowBook(user: User, isStudent: boolean, book: Book) {
    this.isLoading.next(true)
    const now = moment();
    const borrowDate = now.locale('pt-br').format('L');
    const returnDate = now.add(15, 'days').locale('pt-br').format('L');
    this.employeeSubscription = this.employeesService.employeeChanged.subscribe(employee => {
      let borrowing: Borrowing = {
        bookId: book.id,
        bookTitle: book.title,
        bookAuthor: book.author,
        employeeId: employee.id,
        employeeName: employee.name,
        startDate: borrowDate,
        endDate: returnDate,
        isStudent: isStudent,
        userId: user.id,
        userName: user.name,
        userEmail: user.email
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
    })
    this.employeesService.getCurrentEmployee();
  }

  addBorrowing(borrowing: Borrowing) {
    this.db
      .collection('borrowings')
      .add(borrowing)
      .catch(err => {
        this.openSnackBar(err, 'OK');
        this.isLoading.next(false);
      });
  }

  addLogItem(logItem: LogItem) {
    this.db
      .collection('logs')
      .add(logItem)
      .catch(err => {
        this.openSnackBar(err, 'OK');
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
      .then(res => {
        this.openSnackBar('Livro alugado com sucesso', 'OK');
        this.isLoading.next(false);
        this.didBorrow.next(true);
      })
      .catch(err => {
        this.openSnackBar(err, 'OK');
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
