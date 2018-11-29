import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';

import { User } from '../../../models/user.model';
import { UsersService } from '../../../services/users/users.service';
import { ClassesService } from '../../../services/classes/classes.service';
import { Subscription } from 'rxjs';

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

  @ViewChild(NgForm) form1: NgForm;

  constructor(private usersService: UsersService, private classesService: ClassesService) { }

  ngOnInit() {
    this.classSubscription = this.classesService.classesChanged.subscribe(classes => {
      classes.forEach(clss => {
        this.classes.push(clss.name);
      })
    })
    this.classesService.getClasses();
    this.userSubscription = this.usersService.userAdded.subscribe(added => {
      this.form1.reset();
    })
  }

  onSubmitStudent(form: NgForm) {
    this.user = {
      name: form.value.name,
      class: form.value.class,
      email: form.value.email,
      type: 0,
      borrowing: 0
    };
    this.usersService.addUser(this.user);
  }

  onSubmitTeacher(form: NgForm) {
    this.user = {
      name: form.value.name,
      role: `Professor de ${form.value.subject}`,
      email: form.value.email,
      type: 1,
      borrowing: 0
    };
    this.usersService.addUser(this.user);
  }

  onSubmitOther(form: NgForm) {
    this.user = {
      name: form.value.name,
      role: form.value.role,
      email: form.value.email,
      type: 0,
      borrowing: 0
    };
    this.usersService.addUser(this.user);
  }

}
