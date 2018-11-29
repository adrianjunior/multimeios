import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { LogItem } from '../../../models/logitem.model';
import { BooksService } from '../../../services/books/books.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeesService } from '../../../services/employees/employees.service';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css']
})
export class LogListComponent implements OnInit {

  logSubscription: Subscription;
  logItems: LogItem[];

  displayedColumns = ['type', 'employeeName', 'userName', 'userEmail', 'bookTitle', 'bookAuthor', 'dateTime'];
  dataSource = new MatTableDataSource<LogItem>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private booksService: BooksService) {}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.logSubscription = this.booksService.logItemsChanged.subscribe(logItems => {
      this.dataSource.data = logItems;
    });
    this.booksService.getLogItems();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
