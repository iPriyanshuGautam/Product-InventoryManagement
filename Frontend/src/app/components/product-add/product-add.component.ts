import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatSnackBarModule, FormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent {
  private http = inject(HttpClient);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  product = { name: '', description: '', manufacturer: '', price: 0, quantity: 0, category: '' };

  addProduct() {
    this.http.post('http://localhost:8083/api/products', this.product).subscribe({
      next: () => {
        this.snackBar.open('✅ Product added successfully!', 'Close', { duration: 3000, panelClass: 'success-snackbar' });
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Error adding product:', err);
        this.snackBar.open('❌ Failed to add product', 'Close', { duration: 3000, panelClass: 'error-snackbar' });
      }
    });
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}
