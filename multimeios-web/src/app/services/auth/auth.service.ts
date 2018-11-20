import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BooksService } from '../books/books.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;
  authChange = new Subject<boolean>();

  constructor(private router: Router, private afAuth: AngularFireAuth, private booksService: BooksService) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/alugar-livro']);
      } else {
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.booksService.cancelSubscriptions();
        this.router.navigate(['/login']);
      }
    });
  }

  isAuth() {
    return this.isAuthenticated;
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.afAuth.auth.signOut()
  }
}
