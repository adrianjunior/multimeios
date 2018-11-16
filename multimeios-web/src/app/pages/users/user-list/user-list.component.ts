import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator, MatDrawer } from '@angular/material';

import { User } from '../../../models/user.model';
import { Subscription } from 'rxjs';
import { UsersService } from '../../../services/users/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  sDisplayedColumns = ['name', 'class', 'email'];
  sDataSource = new MatTableDataSource<User>();

  ripple: string = 'rgba(104, 58, 183, 0.4)';
  user: User = {
    name: '',
    class: '',
    email: ''
  };
  usersSubscription: Subscription;
  users: User[];

  @ViewChild('sSort') sSort: MatSort;
  @ViewChild('sPaginator') sPaginator: MatPaginator;
  @ViewChild(MatDrawer) drawer: MatDrawer;

  constructor(private router: Router, private cdRef: ChangeDetectorRef, private usersService: UsersService) {}

  sApplyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.sDataSource.filter = filterValue;
  }

  ngOnInit() {
    this.usersSubscription = this.usersService.usersChanged.subscribe(users => {
      this.users = users;
      this.sDataSource.data = this.users;
    });
    this.usersService.getUsers();
  }

  ngAfterViewInit() {
    this.sDataSource.sort = this.sSort;
    this.sDataSource.paginator = this.sPaginator;
    this.cdRef.detectChanges();
  }

  toggleSidenav(user: User) {
    this.drawer.toggle();
    this.user = user;
  }
}
