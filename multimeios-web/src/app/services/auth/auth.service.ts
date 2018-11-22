import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BooksService } from '../books/books.service';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;
  authChange = new Subject<boolean>();
  isLoading = new Subject<boolean>();

  constructor(private router: Router, private afAuth: AngularFireAuth, private booksService: BooksService,
              private snackBar: MatSnackBar) { }

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
    this.isLoading.next(true);
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoading.next(false);
      })
      .catch(err => {
        this.openSnackBar(err, 'Ok');
        this.isLoading.next(false);
      });
  }

  logout() {
    this.afAuth.auth.signOut()
  }

  //SnackBar
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
