import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor() {
    this.username = '';
    this.password = '';
  }

  public username: string;
  public password: string;

  onSubmit() {
    // aqui você pode adicionar a lógica de autenticação e navegação para a página principal
  }

  ngOnInit(): void {}
}
