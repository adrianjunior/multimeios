import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../../models/user.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import { Book } from '../../models/book.model';
import { ValidateUserEmailModal } from '../validate-user-email-modal/validate-user-email-modal';
import { BooksService } from '../../services/books/books.service';

@Component({
  templateUrl: './confirm-borrow-modal.html',
  styleUrls: ['./confirm-borrow-modal.css']
})
export class ConfirmBorrowModal implements OnInit {

  book: Book;
  user: User;

  loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<ConfirmBorrowModal>,
              @Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialog, 
              private booksService: BooksService) { }

  ngOnInit() {
    this.book = this.data.book.book;
    this.user = this.data.user;
    this.booksService.isLoading.subscribe(loading => {
      this.loading = loading;
    })
    this.booksService.didBorrow.subscribe(borrow => {
      if(borrow) {
        this.dialogRef.close();
      }
    })
  }

  previousDialog() {
    this.dialog.open(ValidateUserEmailModal, {
      width: '600px',
      data: {book: this.book}
    });
    this.dialogRef.close();
  }

  confirmBorrow() {
    this.booksService.borrowBook(this.user, this.book);
  }

}
