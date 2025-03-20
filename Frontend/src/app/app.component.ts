import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProductInventory';

  constructor(private router: Router, private cdRef: ChangeDetectorRef) {}

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('userToken');
  }

  handleAuth() {
    if (this.isLoggedIn) {
      localStorage.removeItem('userToken');
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login']);
    }
    this.cdRef.detectChanges();
  }
}
