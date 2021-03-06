import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDrawer, MatStepper, MatSnackBar, MatDialog } from '@angular/material';

import { Book } from '../../../models/book.model';
import { BooksService } from '../../../services/books/books.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeesService } from '../../../services/employees/employees.service';
import { ValidateUserEmailModal } from '../../../modals/validate-user-email-modal/validate-user-email-modal';

@Component({
  selector: 'app-borrow-book',
  templateUrl: './borrow-book.component.html',
  styleUrls: ['./borrow-book.component.css']
})
export class BorrowBookComponent implements OnInit {

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

  constructor(private bookService: BooksService, private snackBar: MatSnackBar, 
              public dialog: MatDialog) {}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
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

  openDialog(book: Book): void{
    this.book = book;
    this.dialog.open(ValidateUserEmailModal, {
      width: '600px',
      data: {book: this.book}
    });

    /*dialogRef.afterClosed().subscribe(result => {
      
    });*/
  }

  //SnackBar
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 6000,
    });
  }

}
