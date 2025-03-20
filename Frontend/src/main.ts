import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http'; // ✅ Use provideHttpClient instead of HttpClientModule
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Declare appConfig properly
export const appConfig = {
  providers: [
    provideHttpClient(), // ✅ Correct way to provide HttpClient
    provideRouter(routes),
    importProvidersFrom(FormsModule) // Optional: Provide FormsModule if needed globally
  ]
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
