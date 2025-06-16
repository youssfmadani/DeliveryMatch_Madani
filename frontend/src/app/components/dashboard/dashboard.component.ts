import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AnnonceService, Annonce } from '../../services/annonce.service';
import { DemandeService, Demande } from '../../services/demande.service';
import { NotificationService, Notification } from '../../services/notification.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard-container">
      <mat-card class="welcome-card">
        <mat-card-header>
          <mat-card-title>Bienvenue, {{ currentUser?.nom }} !</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>Voici un aperçu de votre activité sur DeliveryMatch</p>
        </mat-card-content>
      </mat-card>

      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-card-header>
            <mat-card-title>Mes Annonces</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-value">{{ annoncesCount }}</div>
            <div class="stat-label">annonces actives</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-header>
            <mat-card-title>Mes Demandes</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-value">{{ demandesCount }}</div>
            <div class="stat-label">demandes en cours</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-header>
            <mat-card-title>Notifications</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-value">{{ notificationsCount }}</div>
            <div class="stat-label">non lues</div>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="recent-activity">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Activité Récente</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-list>
              <mat-list-item *ngFor="let notification of recentNotifications">
                <mat-icon matListItemIcon>notifications</mat-icon>
                <div matListItemTitle>{{ notification.message }}</div>
                <div matListItemLine>{{ notification.date | date:'short' }}</div>
              </mat-list-item>
            </mat-list>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .welcome-card {
      margin-bottom: 20px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }

    .stat-card {
      text-align: center;
    }

    .stat-value {
      font-size: 2.5rem;
      font-weight: bold;
      color: #3f51b5;
      margin: 10px 0;
    }

    .stat-label {
      color: #666;
      font-size: 0.9rem;
    }

    .recent-activity {
      margin-top: 20px;
    }

    mat-list-item {
      height: auto !important;
      margin: 10px 0;
    }

    @media (max-width: 600px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  currentUser: any;
  annoncesCount = 0;
  demandesCount = 0;
  notificationsCount = 0;
  recentNotifications: Notification[] = [];

  constructor(
    private authService: AuthService,
    private annonceService: AnnonceService,
    private demandeService: DemandeService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadDashboardData();
      }
    });
  }

  private loadDashboardData() {
    // Charger les statistiques
    if (this.currentUser.role === 'CONDUCTEUR') {
      this.annonceService.getAnnoncesByConducteur(this.currentUser.id).subscribe(
        (annonces: Annonce[]) => this.annoncesCount = annonces.length
      );
    }

    if (this.currentUser.role === 'EXPEDITEUR') {
      this.demandeService.getDemandesByExpediteur(this.currentUser.id).subscribe(
        (demandes: Demande[]) => this.demandesCount = demandes.length
      );
    }

    // Charger les notifications
    this.notificationService.getNotificationsNonLues(this.currentUser.id).subscribe(
      (notifications: Notification[]) => {
        this.notificationsCount = notifications.length;
        this.recentNotifications = notifications.slice(0, 5);
      }
    );
  }
} 