import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';

import { User } from '../../../models/user.model';
import { UsersService } from '../../../services/users/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

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

  constructor(private usersService: UsersService) { }

  ngOnInit() {
  }

  onSubmitStudent(form: NgForm) {
    this.user = {
      name: form.value.name,
      class: form.value.class,
      email: form.value.email,
      type: 2
    };
    this.usersService.addUser(this.user, form.value.password, true);
  }

}
