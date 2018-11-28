import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDrawer } from '@angular/material';

import { Class } from '../../../models/class.model';
import { Subscription } from 'rxjs';
import { ClassesService } from '../../../services/classes/classes.service';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {

  ripple: string = 'rgba(104, 58, 183, 0.4)';
  class: Class = {
    name: ''
  }
  classesSubscription: Subscription;
  classes: Class[];

  displayedColumns = ['name'];
  dataSource = new MatTableDataSource<Class>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatDrawer) drawer: MatDrawer;

  constructor(private classesServices: ClassesService) { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.classesSubscription = this.classesServices.classesChanged.subscribe(clsses => {
      this.classes = clsses;
      this.dataSource.data = this.classes;
    });
    this.classesServices.getClasses();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  toggleSidenav(clss: Class) {
    this.drawer.toggle();
    this.class = clss;
  }

}
