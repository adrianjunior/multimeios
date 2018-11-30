import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users/users.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmBorrowModal } from '../confirm-borrow-modal/confirm-borrow-modal';
import { ClassesService } from '../../services/classes/classes.service';
import { EmployeesService } from '../../services/employees/employees.service';
import { Employee } from '../../models/employee.model';

@Component({
  templateUrl: './add-user-modal.html',
  styleUrls: ['./add-user-modal.css']
})
export class AddUserModal implements OnInit {

  loading: boolean = false;

  classes: string[] = [];

  private user: User;
  private employee: Employee;

  constructor(private usersService: UsersService,
              public dialogRef: MatDialogRef<AddUserModal>,
              public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public book,
              private employeesService: EmployeesService,  private classesService: ClassesService) { }

  ngOnInit() {
    this.usersService.isLoading.subscribe(loading => {
      this.loading = loading;
    })
    this.classesService.classesChanged.subscribe(classes => {
      classes.forEach(clss => {
        this.classes.push(clss.name);
      })
    })
    this.classesService.getClasses();
    this.usersService.userAdded.subscribe(userId => {
      this.user.id = userId;
      this.openDialog(this.user);
    })
    this.employeesService.employeeChanged.subscribe(employee => {
      this.employee = employee;
    })
    this.employeesService.getCurrentEmployee();
  }

  addUser(form: NgForm, type: number) {
    this.user = {
      name: form.value.name,
      email: form.value.email,
      type: type,
      borrowing: 0
    };
    if(type == 0) {
      this.user.class = form.value.class;
    } else if (type == 1) {
      this.user.subject = form.value.subject;
    } else if (type == 2) {
      this.user.role = form.value.role;
    }
    this.usersService.addUser(this.user, this.employee);
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
