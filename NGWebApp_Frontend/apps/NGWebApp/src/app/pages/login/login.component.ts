import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router) {}

  handleSubmit() {
    this.authService.login(this.user.value).subscribe((response) => {
      this.user.reset();
      localStorage.setItem('token', response.access_token);
      alert('User logged in successfully');
      this.router.navigate(['/dashboard']);
    });
  }
}
