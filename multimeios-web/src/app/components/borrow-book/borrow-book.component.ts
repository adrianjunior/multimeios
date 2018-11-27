import { Component, OnInit, Inject } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { MatSnackBar, MatDialog } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Book } from '../../models/book.model';
import { ValidateUserEmailComponent } from '../validate-user-email/validate-user-email.component';

@Component({
  selector: 'app-borrow-book',
  templateUrl: './borrow-book.component.html',
  styleUrls: ['./borrow-book.component.css']
})
export class BorrowBookDialogComponent implements OnInit {

  book: Book;
  email: string;

  constructor(public dialogRef: MatDialogRef<BorrowBookDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialog) { }

  ngOnInit() {
    this.book = this.data.book.book;
    this.email = this.data.email;
    console.log(this.email);
  }

  previousDialog() {
    this.dialog.open(ValidateUserEmailComponent, {
      width: '600px'
    });
    this.dialogRef.close();
  }

}
