import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  template: `
    <mat-toolbar color="primary" class="navbar">
      <button mat-icon-button (click)="toggleSidenav()">
        <mat-icon>menu</mat-icon>
      </button>

      <span class="navbar-brand" routerLink="/dashboard">DeliveryMatch</span>

      <span class="spacer"></span>

      <button mat-icon-button [matMenuTriggerFor]="notificationsMenu" class="notification-btn">
        <mat-icon [matBadge]="notificationCount" matBadgeColor="warn">notifications</mat-icon>
      </button>

      <button mat-icon-button [matMenuTriggerFor]="userMenu">
        <mat-icon>account_circle</mat-icon>
      </button>

      <mat-menu #userMenu="matMenu">
        <button mat-menu-item routerLink="/profile">
          <mat-icon>person</mat-icon>
          <span>Profil</span>
        </button>
        <button mat-menu-item (click)="logout()">
          <mat-icon>exit_to_app</mat-icon>
          <span>Déconnexion</span>
        </button>
      </mat-menu>

      <mat-menu #notificationsMenu="matMenu">
        <div class="notifications-header">
          <h3>Notifications</h3>
          <button mat-button color="primary" (click)="markAllAsRead()">
            Tout marquer comme lu
          </button>
        </div>
        <mat-divider></mat-divider>
        <div class="notifications-list">
          <div *ngFor="let notification of notifications" class="notification-item">
            <mat-icon>{{notification.icon}}</mat-icon>
            <div class="notification-content">
              <p class="notification-text">{{notification.message}}</p>
              <span class="notification-time">{{notification.time}}</span>
            </div>
          </div>
          <div *ngIf="notifications.length === 0" class="no-notifications">
            Aucune notification
          </div>
        </div>
      </mat-menu>
    </mat-toolbar>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }

    .navbar-brand {
      font-size: 1.5rem;
      font-weight: 500;
      margin-left: 1rem;
      cursor: pointer;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .notification-btn {
      margin-right: 1rem;
    }

    .notifications-header {
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .notifications-header h3 {
      margin: 0;
      font-size: 1rem;
    }

    .notifications-list {
      max-height: 300px;
      overflow-y: auto;
    }

    .notification-item {
      display: flex;
      align-items: flex-start;
      padding: 1rem;
      gap: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .notification-item:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    .notification-content {
      flex: 1;
    }

    .notification-text {
      margin: 0;
      font-size: 0.9rem;
    }

    .notification-time {
      font-size: 0.8rem;
      color: rgba(0, 0, 0, 0.54);
    }

    .no-notifications {
      padding: 1rem;
      text-align: center;
      color: rgba(0, 0, 0, 0.54);
    }
  `]
})
export class NavbarComponent {
  notificationCount = 0;
  notifications: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleSidenav(): void {
    // Implement sidenav toggle logic
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  markAllAsRead(): void {
    // Implement mark all as read logic
  }
} 