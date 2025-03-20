import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, FormsModule]
})
export class RegisterComponent {
  user = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {}

  registerUser() {
    this.http.post('http://localhost:8081/auth/register', this.user, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          this.snackBar.open('✅ ' + response, 'Close', { duration: 3000, panelClass: 'success-snackbar' });
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: (error) => {
          this.snackBar.open('❌ Registration failed: ' + error.error, 'Close', { duration: 3000, panelClass: 'error-snackbar' });
        }
      });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
