import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDrawer, MatDialog } from '@angular/material';

import { User } from '../../../models/user.model';
import { Subscription } from 'rxjs';
import { UsersService } from '../../../services/users/users.service';
import { ClassesService } from '../../../services/classes/classes.service';
import { NgForm } from '@angular/forms';
import { EditionModal } from '../../../modals/edition-modal/edition-modal';
import { DeletionModal } from '../../../modals/deletion-modal/deletion-modal';

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
  classSubscription: Subscription;

  @ViewChild('sSort') sSort: MatSort;
  @ViewChild('sPaginator') sPaginator: MatPaginator;
  @ViewChild('tSort') tSort: MatSort;
  @ViewChild('tPaginator') tPaginator: MatPaginator;
  @ViewChild('oSort') oSort: MatSort;
  @ViewChild('oPaginator') oPaginator: MatPaginator;
  @ViewChild('sDrawer') sDrawer: MatDrawer;
  @ViewChild('tDrawer') tDrawer: MatDrawer;
  @ViewChild('oDrawer') oDrawer: MatDrawer;

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

  constructor(private cdRef: ChangeDetectorRef, private usersService: UsersService, private classesService: ClassesService,
              private dialog: MatDialog) {}

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
    this.classSubscription = this.classesService.classesChanged.subscribe(classes => {
      classes.forEach(clss => {
        this.classes.push(clss.name);
      })
    })
    this.classesService.getClasses();
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

  closeSidenav(sidenav: number) {
    if(sidenav == 0) {
      this.sDrawer.close();
    } else if (sidenav == 1) {
      this.tDrawer.close();
    } else if (sidenav == 2) {
      this.oDrawer.close();
    }
  }

  editUser(form: NgForm, type: number) {
    let user: User = this.user;

    if(form.value.name != "") {
      user.name = form.value.name;
    }

    if(form.value.email != "") {
      user.email = form.value.email;
    }

    if(type == 0) {
      if(form.value.class != "") {
        user.class = form.value.class;
      }
    } else if (type == 1) {
      if(form.value.subject != "") {
        user.subject = form.value.subject;
      }
    } else if (type == 2) {
      if(form.value.role != "") {
        user.role = form.value.role;
      }
    }

    this.closeSidenav(type);
    this.dialog.open(EditionModal, {
      width: '600px',
      data: {type: 1, user: user}
    });
  }

  deleteUser(type: number) {
    this.closeSidenav(type);
    this.dialog.open(DeletionModal, {
      width: '600px',
      data: {type: 1, user: this.user}
    });
  }
}
