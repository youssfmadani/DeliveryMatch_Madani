import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sidenav',
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #sidenav mode="side" [opened]="isOpen" class="sidenav">
        <div class="sidenav-header">
          <img src="assets/logo.png" alt="DeliveryMatch Logo" class="logo">
          <h2>DeliveryMatch</h2>
        </div>

        <mat-nav-list>
          <a mat-list-item routerLink="/dashboard" routerLinkActive="active">
            <mat-icon>dashboard</mat-icon>
            <span>Tableau de bord</span>
          </a>

          <a mat-list-item routerLink="/annonces" routerLinkActive="active">
            <mat-icon>local_shipping</mat-icon>
            <span>Annonces</span>
          </a>

          <a mat-list-item routerLink="/demandes" routerLinkActive="active">
            <mat-icon>assignment</mat-icon>
            <span>Demandes</span>
          </a>

          <a mat-list-item routerLink="/evaluations" routerLinkActive="active">
            <mat-icon>star</mat-icon>
            <span>Évaluations</span>
          </a>

          <a mat-list-item routerLink="/messages" routerLinkActive="active">
            <mat-icon>message</mat-icon>
            <span>Messages</span>
          </a>

          <a mat-list-item routerLink="/profile" routerLinkActive="active">
            <mat-icon>person</mat-icon>
            <span>Profil</span>
          </a>

          <ng-container *ngIf="isAdmin">
            <mat-divider></mat-divider>
            <div class="admin-section">
              <h3>Administration</h3>
              <a mat-list-item routerLink="/admin/users" routerLinkActive="active">
                <mat-icon>people</mat-icon>
                <span>Utilisateurs</span>
              </a>
              <a mat-list-item routerLink="/admin/reports" routerLinkActive="active">
                <mat-icon>assessment</mat-icon>
                <span>Rapports</span>
              </a>
            </div>
          </ng-container>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <div class="content">
          <ng-content></ng-content>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: 100vh;
    }

    .sidenav {
      width: 250px;
      background-color: #fff;
      border-right: 1px solid rgba(0, 0, 0, 0.12);
    }

    .sidenav-header {
      padding: 1rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }

    .logo {
      width: 40px;
      height: 40px;
    }

    .sidenav-header h2 {
      margin: 0;
      font-size: 1.2rem;
      color: #333;
    }

    mat-nav-list {
      padding-top: 1rem;
    }

    mat-nav-list a {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.5rem 1rem;
      color: #666;
      transition: background-color 0.2s;
    }

    mat-nav-list a:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    mat-nav-list a.active {
      background-color: rgba(25, 118, 210, 0.12);
      color: #1976d2;
    }

    mat-nav-list mat-icon {
      color: inherit;
    }

    .admin-section {
      padding: 1rem;
    }

    .admin-section h3 {
      margin: 0 0 0.5rem 0;
      font-size: 0.9rem;
      color: #666;
      text-transform: uppercase;
    }

    .content {
      padding: 1rem;
      height: 100%;
      overflow-y: auto;
    }

    @media (max-width: 768px) {
      .sidenav {
        width: 200px;
      }
    }
  `]
})
export class SidenavComponent {
  @Input() isOpen = true;
  isAdmin = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.isAdmin = this.authService.getUserRole() === 'ADMIN';
  }
} 