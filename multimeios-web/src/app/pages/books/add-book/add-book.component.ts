import { Component, OnInit } from '@angular/core';
import { Book } from '../../../models/book.model';
import { BooksService } from '../../../services/books/books.service';
import { NgForm } from '@angular/forms';
import { EmployeesService } from '../../../services/employees/employees.service';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  categories: string[] = [
    'Conto',
    'Novela',
    'Quadrinhos'
  ];

  loading: boolean = false;
  employee: Employee;

  constructor(private bookService: BooksService, private employeesService: EmployeesService) { }

  ngOnInit() {
    this.bookService.isLoading.subscribe(loading => {
      this.loading = loading;
    })
    this.employeesService.employeeChanged.subscribe(employee => {
      this.employee = employee;
    })
    this.employeesService.getCurrentEmployee();
  }

  addBook(form: NgForm) {
    const book: Book = {
      title: form.value.title,
      author: form.value.author,
      quantity: form.value.quantity,
      available: form.value.quantity,
      editor: form.value.editor,
      category: form.value.category,
      edition: form.value.edition,
      year: form.value.year
    }
    console.log(book);
    this.bookService.addBook(book, this.employee);
  }

}
