import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Lista de Livros';
  primary = 'rgba(104, 58, 183, 0.3)';

  changePage(route: string, title: string) {
    this.title = title;
  }
}
