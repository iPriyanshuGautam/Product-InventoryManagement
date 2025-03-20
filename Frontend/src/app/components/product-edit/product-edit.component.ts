import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatButtonModule, FormsModule, MatIconModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit {
  productId!: number;
  product: any = {
    name: '',
    manufacturer: '',
    price: 0,
    quantity: 0,
    description: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchProductDetails();
  }

  fetchProductDetails() {
    this.http.get(`http://localhost:8083/api/products/${this.productId}`).subscribe({
      next: (response) => {
        this.product = response;
      },
      error: (error) => {
        console.error('Error fetching product:', error);
        this.snackBar.open('❌ Error fetching product details!', 'Close', {
          duration: 3000,
          panelClass: 'error-snackbar'
        });
      }
    });
  }

  updateProduct() {
    this.http.put(`http://localhost:8083/api/products/${this.productId}`, this.product).subscribe({
      next: () => {
        this.snackBar.open('✅ Product updated successfully!', 'Close', {
          duration: 3000,
          panelClass: 'success-snackbar'
        });
        this.router.navigate(['/products']);
      },
      error: (error) => {
        console.error('Error updating product:', error);
        this.snackBar.open('❌ Failed to update product. Please try again!', 'Close', {
          duration: 3000,
          panelClass: 'error-snackbar'
        });
      }
    });
  }

  cancelEdit() {
    this.router.navigate(['/products']);
  }
}
