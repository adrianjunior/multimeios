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

  constructor(private router: Router, private authService: AuthService){};

  ngOnInit() {
    this.authService.initAuthListener();
  }

  changePage(route: string, title: string) {
    this.title = title;
    this.router.navigateByUrl(route);
  }
}
