import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';   // ✅ ADD THIS
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,        // ✅ REQUIRED
    MatFormFieldModule
  ]
})
export class Login implements OnInit {

  router = inject(Router);

  user = {
    email: '',
    password: '',
    captcha: ''
  };

  storedUser = {
    email: 'test@gmail.com',
    password: '1234'
  };

  loginValid = true;
  captchaText = '';

  ngOnInit() {
    this.generateCaptcha();
  }

generateCaptcha() {
  const chars = '0123456789'; // numeric only (excluding 0 & 1 for clarity)
  this.captchaText = Array.from({ length: 5 }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join('');
  this.user.captcha = '';
}


  login() {
    const isUserValid =
      this.user.email === this.storedUser.email &&
      this.user.password === this.storedUser.password;

    const isCaptchaValid =
      this.user.captcha?.toUpperCase() === this.captchaText;

    if (isUserValid && isCaptchaValid) {
      localStorage.setItem('loggedInUser', this.user.email);
      this.loginValid = true;
      this.router.navigate(['/dashboard']);
    } else {
      this.loginValid = false;
      this.generateCaptcha();
    }
  }
}
