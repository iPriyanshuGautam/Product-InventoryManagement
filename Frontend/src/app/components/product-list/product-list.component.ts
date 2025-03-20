import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatSelectModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  categories: string[] = ['All'];
  selectedCategory: string = 'All';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.http.get<any[]>('http://localhost:8083/api/products').subscribe(response => {
      this.products = response;
      this.extractCategories();
    });
  }

  extractCategories() {
    const uniqueCategories = new Set(this.products.map(p => p.category));
    this.categories = ['All', ...Array.from(uniqueCategories)];
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.http.delete(`http://localhost:8083/api/products/${id}`).subscribe(() => {
        this.products = this.products.filter(product => product.id !== id);
        alert('Product deleted successfully!');
      });
    }
  }

  get filteredProducts() {
    return this.selectedCategory === 'All'
      ? this.products
      : this.products.filter(p => p.category === this.selectedCategory);
  }
}
