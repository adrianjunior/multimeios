import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDrawer, MatSnackBar, MatDialog } from '@angular/material';

import { Book } from '../../../models/book.model';
import { Subscription } from 'rxjs';
import { BooksService } from '../../../services/books/books.service';
import { NgForm } from '@angular/forms';
import { DeletionModal } from '../../../modals/deletion-modal/deletion-modal';
import { EditionModal } from '../../../modals/edition-modal/edition-modal';
import categories from '../../../../assets/categories';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, AfterViewInit {

  categories: string[] = categories;
  ripple: string = 'rgba(104, 58, 183, 0.4)';
  book: Book = {
    title: '',
    author: '',
    category: '',
    quantity: 0,
  };
  booksSubscription: Subscription;
  books: Book[];
  bookAlt: Book;
  bookEditSubscription: Subscription;
  displayedColumns = ['title', 'author', 'category', 'available'];
  dataSource = new MatTableDataSource<Book>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatDrawer) drawer: MatDrawer;

  constructor(private bookService: BooksService, private snackBar: MatSnackBar, private dialog: MatDialog) {}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.booksSubscription = this.bookService.booksChanged.subscribe(books => {
      this.books = books;
      this.dataSource.data = this.books;
    });
    this.bookService.getBooks();
    this.bookEditSubscription = this.bookService.didEdit.subscribe(edited => {
      if(edited) {
        this.drawer.close();
      }
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  toggleSidenav(book: Book) {
    this.drawer.toggle();
    this.book = book;
  }

  closeSidenav() {
    this.drawer.toggle();
  }

  editBook(form: NgForm) {
    let book: Book = this.book;
    if(form.value.title != "") {
      book.title = form.value.title;
    }
    if(form.value.author != "") {
      book.author = form.value.author;
    }
    if(form.value.editor != "") {
      book.editor = form.value.editor;
    }
    if(form.value.category != "") {
      book.category = form.value.category;
    }
    if(form.value.edition != "") {
      book.edition = form.value.edition;
    }
    if(form.value.year != "") {
      book.year = form.value.year;
    }
    this.closeSidenav();
    this.dialog.open(EditionModal, {
      width: '600px',
      data: {type: 0, book: book}
    });
  }

  deleteBook() {
    this.closeSidenav();
    this.dialog.open(DeletionModal, {
      width: '600px',
      data: {type: 0, book: this.book}
    });
  }
}
