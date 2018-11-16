import { Component } from '@angular/core';
import { Router, RouteConfigLoadEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Lista de Livros';
  primary = 'rgba(104, 58, 183, 0.3)';

  constructor(private router: Router){};

  changePage(route: string, title: string) {
    this.title = title;
    this.router.navigateByUrl(route);
  }
}
