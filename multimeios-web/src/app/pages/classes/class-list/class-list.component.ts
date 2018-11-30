import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDrawer, MatDialog } from '@angular/material';

import { Class } from '../../../models/class.model';
import { Subscription } from 'rxjs';
import { ClassesService } from '../../../services/classes/classes.service';
import { NgForm } from '@angular/forms';
import { EditionModal } from '../../../modals/edition-modal/edition-modal';
import { DeletionModal } from '../../../modals/deletion-modal/deletion-modal';

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

  constructor(private classesServices: ClassesService, private dialog: MatDialog) { }

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

  closeSidenav() {
    this.drawer.close();
  }

  editClass(form: NgForm) {
    let clss: Class = this.class;
    if(form.value.name != "") {
      clss.name = form.value.name;
    }
    this.closeSidenav();
    this.dialog.open(EditionModal, {
      width: '600px',
      data: {type: 3, class: clss}
    });
  }

  deleteClass() {
    this.closeSidenav();
    this.dialog.open(DeletionModal, {
      width: '600px',
      data: {type: 3, class: this.class}
    });
  }

}
