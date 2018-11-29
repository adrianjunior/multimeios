import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services/auth/auth.service';
import { Subscription } from 'rxjs';
import { EmployeesService } from './services/employees/employees.service';
import { Employee } from './models/employee.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Lista de Livros';
  primary = 'rgba(104, 58, 183, 0.3)';

  isAuth: boolean = false;
  employeeId: string;
  employeeSubscription: Subscription;
  currentEmployee: Employee = {
    name: '',
    email: '',
    isRuler: false
  };

  constructor(private router: Router, private authService: AuthService, private employeesService: EmployeesService){};

  ngOnInit() {
    console.log('onInit')
    this.authService.initAuthListener();
    this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  changePage(link: string) {
    this.router.navigateByUrl(link);
  }

  logout() {
    this.authService.logout()
  }
}
