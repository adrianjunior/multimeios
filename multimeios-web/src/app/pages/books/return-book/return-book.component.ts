import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar, MatDialog } from '@angular/material';

import { Borrowing } from '../../../models/borrowing.model';
import { BooksService } from '../../../services/books/books.service';
import { ConfirmReturnModal } from '../../../modals/confirm-return-modal/confirm-return-modal';

@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrls: ['./return-book.component.css']
})
export class ReturnBookComponent implements OnInit {

  ripple: string = 'rgba(104, 58, 183, 0.4)';
  borrowingsSubscription: Subscription;
  borrowings: Borrowing[];

  displayedColumns = ['bookTitle', 'bookAuthor', 'userName', 'userEmail', 'employeeName', 'startDate', 'endDate'];
  dataSource = new MatTableDataSource<Borrowing>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private booksService: BooksService, private snackBar: MatSnackBar, 
              public dialog: MatDialog) {}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.borrowingsSubscription = this.booksService.borrowingsChanged.subscribe(borrowings => {
      this.dataSource.data = borrowings;
    });
    this.booksService.getBorrowings();
  }
W
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openDialog(borrowing: Borrowing): void{
    this.dialog.open(ConfirmReturnModal, {
      width: '600px',
      data: {borrowing: borrowing}
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
