import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDrawer, MatDialog } from '@angular/material';

import { Subscription } from 'rxjs';
import { NoticesService } from '../../../services/notices/notices.service';
import { Notice } from '../../../models/notice.model';
import { NgForm } from '@angular/forms';
import { EditionModal } from '../../../modals/edition-modal/edition-modal';
import { DeletionModal } from '../../../modals/deletion-modal/deletion-modal';

@Component({
  selector: 'app-notice-list',
  templateUrl: './notice-list.component.html',
  styleUrls: ['./notice-list.component.css']
})
export class NoticeListComponent implements OnInit {

  ripple: string = 'rgba(104, 58, 183, 0.4)';
  notice: Notice = {
    title: '',
    employeeId: '',
    employeeName: '',
    body: '',
    dateTime: '',
    edited: false
  }
  noticesSubscription: Subscription;
  notices: Notice[];

  displayedColumns = ['title', 'author', 'dateTime', 'edited'];
  dataSource = new MatTableDataSource<Notice>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatDrawer) drawer: MatDrawer;

  constructor(private noticesServices: NoticesService, private dialog: MatDialog) { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.noticesSubscription = this.noticesServices.noticesChanged.subscribe(notices => {
      this.notices = notices;
      this.dataSource.data = this.notices;
    });
    this.noticesServices.getNotices();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  toggleSidenav(notice: Notice) {
    this.drawer.toggle();
    this.notice = notice;
  }

  closeSidenav() {
    this.drawer.close();
  }

  editNotice(form: NgForm) {
    let notice: Notice = this.notice;
    if(form.value.title != "") {
      notice.title = form.value.title;
    }
    if(form.value.body != "") {
      notice.body = form.value.body;
    }
    this.closeSidenav();
    this.dialog.open(EditionModal, {
      width: '600px',
      data: {type: 2, notice: notice}
    });
  }

  deleteNotice() {
    this.closeSidenav();
    this.dialog.open(DeletionModal, {
      width: '600px',
      data: {type: 2, notice: this.notice}
    });
  }

}
