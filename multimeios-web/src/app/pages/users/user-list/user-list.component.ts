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
  tDisplayedColumns = ['name', 'subject', 'email'];
  tDataSource = new MatTableDataSource<User>();
  oDisplayedColumns = ['name', 'role', 'email'];
  oDataSource = new MatTableDataSource<User>();

  ripple: string = 'rgba(104, 58, 183, 0.4)';
  user: User = {
    name: '',
    class: '',
    email: '',
    type: -1,
    borrowing: -1
  };
  usersSubscription: Subscription;

  @ViewChild('sSort') sSort: MatSort;
  @ViewChild('sPaginator') sPaginator: MatPaginator;
  @ViewChild('tSort') tSort: MatSort;
  @ViewChild('tPaginator') tPaginator: MatPaginator;
  @ViewChild('oSort') oSort: MatSort;
  @ViewChild('oPaginator') oPaginator: MatPaginator;
  @ViewChild('sDrawer') sDrawer: MatDrawer;
  @ViewChild('tDrawer') tDrawer: MatDrawer;
  @ViewChild('oDrawer') oDrawer: MatDrawer;

  constructor(private router: Router, private cdRef: ChangeDetectorRef, private usersService: UsersService) {}

  sApplyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.sDataSource.filter = filterValue;
    this.tDataSource.filter = filterValue;
    this.oDataSource.filter = filterValue;
  }

  ngOnInit() {
    this.usersSubscription = this.usersService.usersChanged.subscribe(users => {
      this.sDataSource.data = users.filter(user => {
        return user.type == 0;
      });
      this.tDataSource.data = users.filter(user => {
        return user.type == 1;
      });
      this.oDataSource.data = users.filter(user => {
        return user.type == 2;
      });
    });
    this.usersService.getUsers();
  }

  ngAfterViewInit() {
    this.sDataSource.sort = this.sSort;
    this.sDataSource.paginator = this.sPaginator;
    this.tDataSource.sort = this.tSort;
    this.tDataSource.paginator = this.tPaginator;
    this.oDataSource.sort = this.oSort;
    this.oDataSource.paginator = this.oPaginator;
    this.cdRef.detectChanges();
  }

  toggleSidenav(sidenav: number, user: User) {
    if(sidenav == 0) {
      this.sDrawer.toggle();
    } else if (sidenav == 1) {
      this.tDrawer.toggle();
    } else if (sidenav == 2) {
      this.oDrawer.toggle();
    }
    this.user = user;
  }
}
