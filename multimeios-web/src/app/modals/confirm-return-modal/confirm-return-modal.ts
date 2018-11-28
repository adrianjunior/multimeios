import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../../models/user.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import { Borrowing } from '../../models/borrowing.model';
import { BooksService } from '../../services/books/books.service';

@Component({
  selector: 'app-confirm-return-modal',
  templateUrl: './confirm-return-modal.html',
  styleUrls: ['./confirm-return-modal.css']
})
export class ConfirmReturnModal implements OnInit {

  borrowing: Borrowing;
  loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<ConfirmReturnModal>,
              @Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialog, 
              private booksService: BooksService) { }

  ngOnInit() {
    this.borrowing = this.data.borrowing;
    this.booksService.isLoading.subscribe(loading => {
      this.loading = loading;
    })
    this.booksService.didReturn.subscribe(rturn => {
      if(rturn) {
        this.dialogRef.close();
      }
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  confirmReturn() {
    this.booksService.returnBook(this.borrowing);
  }

}
