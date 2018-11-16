import { Component, OnInit } from '@angular/core';
import { Book } from '../../../models/book.model';
import { BooksService } from '../../../services/books/books.service';
import { NgForm } from '@angular/forms';

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

  constructor(private bookService: BooksService) { }

  ngOnInit() {
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
    this.bookService.addBook(book);
  }

}
