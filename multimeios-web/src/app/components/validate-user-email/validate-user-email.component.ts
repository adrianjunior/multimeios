import { Component, OnInit, Inject } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { MatSnackBar, MatDialog } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Book } from '../../models/book.model';
import { BorrowBookDialogComponent } from '../borrow-book/borrow-book.component';

@Component({
  selector: 'app-validate-user-email',
  templateUrl: './validate-user-email.component.html',
  styleUrls: ['./validate-user-email.component.css']
})
export class ValidateUserEmailComponent implements OnInit {

  userSubscription: Subscription;
  user: User;

  constructor(private usersService: UsersService, private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ValidateUserEmailComponent>,
              @Inject(MAT_DIALOG_DATA) public book: Book, public dialog: MatDialog) { }

  ngOnInit() {
  }

  checkEmail(form: NgForm) {
    this.userSubscription = this.usersService.userByEmailChanged.subscribe(user => {
      this.user = user;
      if(this.user != null) {
        this.openDialog(form.value.email);
        this.userSubscription.unsubscribe();
      } else {
        this.openSnackBar('Não há usuário cadastrado com este email', 'OK');
        this.userSubscription.unsubscribe();
      }
    });
    this.usersService.getUserByEmail(form.value.email);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  openDialog(email: string) {
    const dialogRef = this.dialog.open(BorrowBookDialogComponent, {
      width: '600px',
      data: {book: this.book, email: email}
    });
    this.closeDialog();
  }

  //SnackBar
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 6000,
    });
  }
}
