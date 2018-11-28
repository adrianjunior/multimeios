import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users/users.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmBorrowModal } from '../confirm-borrow-modal/confirm-borrow-modal';

@Component({
  templateUrl: './add-user-modal.html',
  styleUrls: ['./add-user-modal.css']
})
export class AddUserModal implements OnInit {

  loading: boolean = false;

  classes: string[] = [
    'Primeiro A',
    'Primeiro B',
    'Primeiro C',
    'Segundo A',
    'Segundo B',
    'Segundo C',
    'Terceiro A',
    'Terceiro B',
    'Terceiro C'
  ];

  private user: User;

  constructor(private usersService: UsersService,
              public dialogRef: MatDialogRef<AddUserModal>,
              public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public book) { }

  ngOnInit() {
    this.usersService.isLoading.subscribe(loading => {
      this.loading = loading;
    })
    this.usersService.userAdded.subscribe(added => {
      this.openDialog(this.user);
    })
  }

  onSubmitStudent(form: NgForm) {
    this.user = {
      name: form.value.name,
      class: form.value.class,
      email: form.value.email,
      type: 2,
      borrowing: 0
    };
    this.usersService.addUser(this.user);
  }

  openDialog(user: User) {
    this.dialog.open(ConfirmBorrowModal, {
      width: '600px',
      data: {book: this.book.book, user: user}
    });
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
