import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDrawer } from '@angular/material';

import { Book } from '../../../models/book.model';
import { Subscription } from 'rxjs';
import { BooksService } from '../../../services/books/books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, AfterViewInit {

  ripple: string = 'rgba(104, 58, 183, 0.4)';
  book: Book = {
    title: '',
    author: '',
    category: '',
    quantity: 0,
  };
  booksSubscription: Subscription;
  books: Book[];

  displayedColumns = ['title', 'author', 'category', 'available'];
  dataSource = new MatTableDataSource<Book>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatDrawer) drawer: MatDrawer;

  constructor(private bookService: BooksService) {}

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
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  toggleSidenav(book: Book) {
    this.drawer.toggle();
    this.book = book;
  }

}
