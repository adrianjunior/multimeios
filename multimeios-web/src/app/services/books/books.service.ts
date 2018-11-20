import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Book } from '../../models/book.model';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map'
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[];
  book: Book;

  booksChanged = new Subject<Book[]>();
  bookChanged = new Subject<Book>();

  private subs: Subscription[] = [];

  constructor(private db: AngularFirestore, private snackBar: MatSnackBar) {}

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

  //SnackBar
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
