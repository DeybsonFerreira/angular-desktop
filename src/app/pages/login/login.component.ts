import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public username: string;
  public password: string;
  public hide = true;

  constructor(private router: Router) {
    this.username = '';
    this.password = '';
  }

  login() {
    if (this.username === 'admin' && this.password === 'admin') {
      this.router.navigate(['/profile']);
    } else {
      alert('Usuário ou senha inválidos.');
    }
  }
}
