import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SidenavComponent } from './components/shared/sidenav/sidenav.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    NavbarComponent,
    SidenavComponent
  ],
  template: `
    <app-navbar *ngIf="isAuthenticated"></app-navbar>
    
    <mat-sidenav-container class="main-sidenav-container" [class.auth-container]="!isAuthenticated">
      <mat-sidenav #sidenav mode="side" [opened]="isAuthenticated" class="app-sidenav">
        <app-sidenav></app-sidenav>
      </mat-sidenav>
      
      <mat-sidenav-content class="app-sidenav-content">
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .main-sidenav-container {
      height: 100vh;
    }

    .auth-container {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f5f5f5;
    }

    .app-sidenav {
      width: 250px;
      background-color: #fff;
      border-right: 1px solid rgba(0, 0, 0, 0.12);
    }

    .app-sidenav-content {
      padding: 20px;
      background-color: #fafafa;
    }
  `]
})
export class AppComponent {
  isAuthenticated = false;

  constructor(private authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }
}
