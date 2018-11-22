import { Component, OnInit } from '@angular/core';
import { Router, RouteConfigLoadEnd } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Lista de Livros';
  primary = 'rgba(104, 58, 183, 0.3)';

  isAuth: boolean = false;

  constructor(private router: Router, private authService: AuthService){};

  ngOnInit() {
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
