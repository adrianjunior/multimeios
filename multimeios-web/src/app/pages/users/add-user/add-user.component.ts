import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../../models/user.model';
import { UsersService } from '../../../services/users/users.service';
import { ClassesService } from '../../../services/classes/classes.service';
import { Subscription } from 'rxjs';
import { EmployeesService } from '../../../services/employees/employees.service';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  classes: string[] = [];
  subjects: string[] = [
    'Português',
    'Literatura',
    'Redação',
    'Filosofia',
    'Sociologia',
    'Física',
    'Química',
    'Biologia',
    'Matemática',
    'Educação Física'
  ];

  private user: User;
  private classSubscription: Subscription;
  private userSubscription: Subscription
  employee: Employee;
  loading: boolean = false;

  @ViewChild('form1') form1: NgForm;
  @ViewChild('form2') form2: NgForm;
  @ViewChild('form3') form3: NgForm;

  constructor(private usersService: UsersService, private classesService: ClassesService, private employeesService: EmployeesService) { }

  ngOnInit() {
    this.usersService.isLoading.subscribe(loading => {
      this.loading = loading;
    })
    this.classSubscription = this.classesService.classesChanged.subscribe(classes => {
      classes.forEach(clss => {
        this.classes.push(clss.name);
      })
    })
    this.classesService.getClasses();
    this.userSubscription = this.usersService.userAdded.subscribe(added => {
      this.form1.reset();
      this.form2.reset();
      this.form3.reset();
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

}
