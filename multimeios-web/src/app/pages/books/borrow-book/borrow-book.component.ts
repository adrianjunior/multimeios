import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator, MatDrawer } from '@angular/material';

import { Book } from '../../../models/book.model';
import books from '../../../models/books';
import { BooksService } from '../../../services/books/books.service';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-borrow-book',
  templateUrl: './borrow-book.component.html',
  styleUrls: ['./borrow-book.component.css']
})
export class BorrowBookComponent implements OnInit {

  userId: string;
  userSubscription: Subscription;
  currentUser: User;

  ripple: string = 'rgba(104, 58, 183, 0.4)';
  book: Book = {
    title: '',
    author: '',
    category: '',
    genders: [],
    quantity: 0,
  };
  booksSubscription: Subscription;
  books: Book[];

  displayedColumns = ['title', 'author', 'gender', 'available'];
  dataSource = new MatTableDataSource<Book>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatDrawer) drawer: MatDrawer;

  constructor(private router: Router, private bookService: BooksService, private userService: UsersService) {}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.userId = this.userService.getCurrentUser().uid;
    this.userSubscription = this.userService.userChanged.subscribe(user => (this.currentUser = user));
    this.userService.getUser(this.userId);
    this.booksSubscription = this.bookService.booksChanged.subscribe(books => {
      this.books = books;
      this.dataSource.data = this.books.filter(book => {
        return book.available > 0;
      });
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
