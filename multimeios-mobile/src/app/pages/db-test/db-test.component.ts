import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books/books.service';
import { Book } from '../../models/book.model';
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
  
  constructor(private bookService: BooksService) {}

  ngOnInit() {
  }

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
}
