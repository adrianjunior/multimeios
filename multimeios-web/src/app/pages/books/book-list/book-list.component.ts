import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator, MatDrawer } from '@angular/material';

import { Book } from '../../../models/book.model';
import books from '../../../models/books';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, AfterViewInit {

  ripple: string = 'rgba(104, 58, 183, 0.4)';
  book: Book = {
    title: '',
    author: '',
    category: '',
    genders: [],
    quantity: 0,
  };

  displayedColumns = ['title', 'author', 'gender', 'available'];
  dataSource = new MatTableDataSource<Book>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatDrawer) drawer: MatDrawer;

  constructor(private router: Router) {}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.dataSource.data = books;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  toggleSidenav(book: Book) {
    this.drawer.toggle();
    this.book = book;
  }

}
