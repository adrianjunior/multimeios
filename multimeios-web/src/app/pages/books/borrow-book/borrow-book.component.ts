import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator, MatDrawer, MatStepper, MatSnackBar, MatDialog } from '@angular/material';

import { Book } from '../../../models/book.model';
import { BooksService } from '../../../services/books/books.service';
import { User } from 'src/app/models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeesService } from '../../../services/employees/employees.service';
import { UsersService } from '../../../services/users/users.service';
import { ValidateUserEmailComponent } from '../../../components/validate-user-email/validate-user-email.component';

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
    genders: [],
    quantity: 0,
  };
  booksSubscription: Subscription;
  books: Book[];

  displayedColumns = ['title', 'author', 'gender', 'available'];
  dataSource = new MatTableDataSource<Book>();

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatDrawer) drawer: MatDrawer;

  constructor(private bookService: BooksService, private employeesService: EmployeesService,
              private _formBuilder: FormBuilder, private snackBar: MatSnackBar, 
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
    this.firstFormGroup = this._formBuilder.group({
      userEmail: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openDialog(book: Book): void{
    this.book = book;
    this.dialog.open(ValidateUserEmailComponent, {
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
