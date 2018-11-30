import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../../models/user.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import { Book } from '../../models/book.model';
import { BooksService } from '../../services/books/books.service';
import { EmployeesService } from '../../services/employees/employees.service';
import { Employee } from '../../models/employee.model';
import { NoticesService } from '../../services/notices/notices.service';
import { ClassesService } from '../../services/classes/classes.service';
import { UsersService } from '../../services/users/users.service';
import { Class } from '../../models/class.model';
import { Notice } from '../../models/notice.model';

@Component({
  selector: 'app-edition-modal',
  templateUrl: './edition-modal.html',
  styleUrls: ['./edition-modal.css']
})
export class EditionModal implements OnInit {

  book: Book;
  user: User;
  class: Class;
  notice: Notice;
  employee: Employee;

  loading: boolean = false;
  type: number;

  constructor(public dialogRef: MatDialogRef<EditionModal>,
              @Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialog, 
              private booksService: BooksService, private employeesService: EmployeesService,
              private noticesService: NoticesService, private classesService: ClassesService,
              private usersService: UsersService) { }

  ngOnInit() {
    if(this.data.type == 0) {
      this.type = 0;
      this.booksService.isLoading.subscribe(loading => {
        this.loading = loading;
      })
      this.booksService.didEdit.subscribe(edit => {
        if(edit) {
          this.dialogRef.close();
        }
      })
      this.book = this.data.book;
    } 
    
    else if (this.data.type == 1) {
      this.type = 1;
      this.usersService.isLoading.subscribe(loading => {
        this.loading = loading;
      })
      this.usersService.didEdit.subscribe(edit => {
        if(edit) {
          this.dialogRef.close();
        }
      })
      this.user = this.data.user;
    } 
    
    else if (this.data.type == 2) {
      this.type = 2;
      this.noticesService.isLoading.subscribe(loading => {
        this.loading = loading;
      })
      this.noticesService.didEdit.subscribe(edit => {
        if(edit) {
          this.dialogRef.close();
        }
      })
      this.notice = this.data.notice;
    } 
    
    else if (this.data.type == 3) {
      this.type = 3;
      this.classesService.isLoading.subscribe(loading => {
        this.loading = loading;
      })
      this.classesService.didEdit.subscribe(edit => {
        if(edit) {
          this.dialogRef.close();
        }
      })
      this.class = this.data.class;
    }
    
    this.employeesService.employeeChanged.subscribe(employee => {
      this.employee = employee;
    })
    this.employeesService.getCurrentEmployee();
  }

  edit() {
    if(this.type == 0) {
      this.booksService.editBook(this.book, this.employee);
    }

    else if(this.type == 1) {
      this.usersService.editUser(this.user, this.employee);
    }

    else if(this.type == 2) {
      this.noticesService.editNotice(this.notice, this.employee);
    }

    else if(this.type == 3) {
      this.classesService.editClass(this.class, this.employee);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
