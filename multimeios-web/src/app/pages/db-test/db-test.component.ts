import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books/books.service';
import { Book } from '../../models/book.model';
import { NoticesService } from '../../services/notices/notices.service';
import { Notice } from '../../models/notice.model';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../models/user.model';
import { EmployeesService } from '../../services/employees/employees.service';
import { Employee } from '../../models/employee.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-db-test',
  templateUrl: './db-test.component.html',
  styleUrls: ['./db-test.component.css']
})
export class DbTestComponent implements OnInit {

  booksSubscription: Subscription;
  books: Book[];
  bookSubscription: Subscription;
  currentBook: Book;
  bookNumber = 0;
  
  noticesSubscription: Subscription;
  notices: Notice[];
  noticeSubscription: Subscription;
  currentNotice: Notice;
  noticeNumber = 0;

  usersSubscription: Subscription;
  users: User[];
  userSubscription: Subscription;
  currentUser: User;
  userNumber = 0;

  employeesSubscription: Subscription;
  employees: Employee[];
  employeeSubscription: Subscription;
  currentEmployee: Employee;
  employeeNumber = 0;
  
  constructor(
    private bookService: BooksService, 
    private noticeService: NoticesService, 
    private userService: UsersService, 
    private employeeService: EmployeesService
  ) {}

  ngOnInit() {
  }

  //Books
  addBook(num: number) {
    this.bookNumber += 1;
    const book: Book = {
      title: 'Título do Livro ' + num,
      author: 'Autor do Livro ' + num,
      editor: 'Editor do Livro ' + num,
      category: 'Categoria do Livro ' + num,
      genders: ['Gênero do Livro ' + num],
      edition: 'Edição do Livro ' + num,
      year: num,
      quantity: num,
      available: num,
    }
    this.bookService.addBook(book);
  }

  getBook(id: string) {
    this.bookSubscription = this.bookService.bookChanged.subscribe(book => (this.currentBook = book));
    this.bookService.getBook(id);
  }

  editBook(id: string) {
    let newBook: Book = this.currentBook;
    newBook.title = 'Titulo Editado';
    newBook.author = 'Autor Editado';
    this.bookService.editBook(id, newBook);
  }

  deleteBook(id: string) {
    this.bookService.deleteBook(id);
  }

  getBooks() {
    this.booksSubscription = this.bookService.booksChanged.subscribe(books => (this.books = books));
    this.bookService.getBooks();
  }

  //Notices
  addNotice(num: number) {
    this.noticeNumber += 1;
    const notice: Notice = {
      title: 'Título da Notícia ' + num,
      description: 'Descrição da Notícia ' + num,
      date: 'Data da Notícia ' + num,
      categories: ['Categoria ' + num],
      
    }
    this.noticeService.addNotice(notice);
  }

  getNotice(id: string) {
    this.noticeSubscription = this.noticeService.noticeChanged.subscribe(notice => (this.currentNotice = notice));
    this.noticeService.getNotice(id);
  }

  editNotice(id: string) {
    let newNotice: Notice = this.currentNotice;
    newNotice.title = 'Titulo Editado';
    newNotice.description = 'Conteúdo Editado';
    this.noticeService.editNotice(id, newNotice);
  }

  deleteNotice(id: string) {
    this.noticeService.deleteNotice(id);
  }

  getNotices() {
    this.noticesSubscription = this.noticeService.noticesChanged.subscribe(notices => (this.notices = notices));
    this.noticeService.getNotices();
  }

  //Users
  addUser(num: number) {
    let isStudent;
    this.userNumber += 1;
    const user: User = {
      name: 'Nome do Usuário ' + num,
      class: 'Nome da Classe ' + num,
      email: `aluno${num}@email.com`,
    }
    if(num%2 == 0) {
      isStudent = true;
    } else {
      isStudent = false;
    }
    this.userService.addUser(user, `password${num}`, isStudent);
  }

  getUser(id: string) {
    this.userSubscription = this.userService.userChanged.subscribe(user => (this.currentUser = user));
    this.userService.getUser(id);
  }

  editUser(id: string) {
    let newUser: User = this.currentUser;
    newUser.name = 'Titulo Editado';
    this.userService.editUser(id, newUser);
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id);
  }

  getUsers() {
    this.usersSubscription = this.userService.usersChanged.subscribe(users => (this.users = users));
    this.userService.getUsers();
  }

  //Employees
  addEmployee(num: number) {
    this.employeeNumber += 1;
    const employee: Employee = {
      name: 'Nome do Funcionário ' + num,
      email: `funcionario${num}@email.com`,
      phone: 'Telefone do Funcionário ' + num
    }
    this.employeeService.addEmployee(employee, `password${num}`);
  }

  getEmployee(id: string) {
    this.employeeSubscription = this.employeeService.employeeChanged.subscribe(employee => (this.currentEmployee = employee));
    this.employeeService.getEmployee(id);
  }

  editEmployee(id: string) {
    let newEmployee: Employee = this.currentEmployee;
    newEmployee.name = 'Titulo Editado';
    newEmployee.phone = 'Número de telefone editado';
    this.employeeService.editEmployee(id, newEmployee);
  }

  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id);
  }

  getEmployees() {
    this.employeesSubscription = this.employeeService.employeesChanged.subscribe(employees => (this.employees = employees));
    this.employeeService.getEmployees();
  }
}
