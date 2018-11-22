import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loading: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.isLoading.subscribe(loading => {
      this.loading = loading;
    })
  }

  login(form: NgForm) {
    const user = {
      email: form.value.email,
      password: form.value.password
    }
    console.log('entrou')
    this.authService.login(user.email, user.password);
  }

}
