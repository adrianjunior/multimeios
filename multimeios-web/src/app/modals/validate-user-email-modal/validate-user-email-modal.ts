import { Component, OnInit, Inject } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { MatSnackBar, MatDialog } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Book } from '../../models/book.model';
import { ConfirmBorrowModal } from '../confirm-borrow-modal/confirm-borrow-modal';
import { AddUserModal } from '../add-user-modal/add-user-modal';

@Component({
  selector: 'app-validate-email',
  templateUrl: './validate-user-email-modal.html',
  styleUrls: ['./validate-user-email-modal.css']
})
export class ValidateUserEmailModal implements OnInit {

  userSubscription: Subscription;
  user: User;

  loading: boolean = false;

  constructor(private usersService: UsersService, private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ValidateUserEmailModal>,
              @Inject(MAT_DIALOG_DATA) public book: Book, public dialog: MatDialog) { }

  ngOnInit() {
    this.usersService.isLoading.subscribe(loading => {
      this.loading = loading;
    })
  }

  checkEmail(form: NgForm) {
    this.userSubscription = this.usersService.userByEmailChanged.subscribe(user => {
      this.user = user;
      if(this.user != null) {
        if (this.user.type == 1) {
          if(this.user.borrowing > 2) {
            this.openSnackBar('Este usuário já possui três livros alugado no momento', 'OK');
          } else {
            this.openDialog(this.user);
            this.userSubscription.unsubscribe();
          }
        } else {
          if(this.user.borrowing > 0) {
            this.openSnackBar('Este usuário já possui um livro alugado no momento', 'OK');
          } else {
            this.openDialog(this.user);
            this.userSubscription.unsubscribe();
          } 
        }
      } else {
        this.openSnackBar('Não há usuário cadastrado com este email', 'OK');
        this.userSubscription.unsubscribe();
      }
    });
    this.usersService.getUserByEmail(form.value.email);
  }

  addNewUser() {
    this.dialog.open(AddUserModal, {
      width: '700px',
      data: {book: this.book}
    });
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  openDialog(user: User) {
    this.dialog.open(ConfirmBorrowModal, {
      width: '600px',
      data: {book: this.book, user: user}
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
