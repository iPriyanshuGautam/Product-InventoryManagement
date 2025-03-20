import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatButtonModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router, private http: HttpClient, private snackBar: MatSnackBar) {}

  login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields!';
      return;
    }

    const loginData = { email: this.email, password: this.password };

    this.http.post('http://localhost:8081/auth/login', loginData, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          localStorage.setItem('userToken', response); // Save token
          this.snackBar.open('✅ Login successful!', 'Close', { duration: 3000 });
          this.router.navigate(['/products']);
        },
        error: () => {
          this.errorMessage = 'Invalid email or password!';
        }
      });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
