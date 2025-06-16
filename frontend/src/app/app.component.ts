import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <app-navbar *ngIf="isAuthenticated"></app-navbar>
      
      <div class="main-content" [class.authenticated]="isAuthenticated">
        <app-sidenav *ngIf="isAuthenticated"></app-sidenav>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .main-content {
      flex: 1;
    }

    .main-content.authenticated {
      margin-top: 64px;
    }

    @media (max-width: 600px) {
      .main-content.authenticated {
        margin-top: 56px;
      }
    }
  `]
})
export class AppComponent {
  isAuthenticated = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user;
      if (!user && !this.router.url.includes('/login') && !this.router.url.includes('/register')) {
        this.router.navigate(['/login']);
      }
    });
  }
}
