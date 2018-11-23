import { Component, OnInit } from '@angular/core';
import { Router, RouteConfigLoadEnd } from '@angular/router';

import { AuthService } from './services/auth/auth.service';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Lista de Livros';
  primary = 'rgba(104, 58, 183, 0.3)';

  isAuth: boolean = false;
  userId: string;
  userSubscription: Subscription;
  currentUser: User;

  constructor(private router: Router, private authService: AuthService, private userService: UsersService){};

  ngOnInit() {
    this.userId = this.userService.getCurrentUser().uid;
    this.userSubscription = this.userService.userChanged.subscribe(user => (this.currentUser = user));
    this.userService.getUser(this.userId);
    this.authService.initAuthListener();
    this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  //CHANGE PAGE

  logout() {
    this.authService.logout()
  }
}
