import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnonceService, Annonce } from '../../services/annonce.service';
import { DemandeService } from '../../services/demande.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-annonce-details',
  template: `
    <div class="annonce-details-container">
      <mat-card *ngIf="annonce" class="details-card">
        <mat-card-header>
          <mat-card-title>{{ annonce.depart }} <mat-icon>arrow_right_alt</mat-icon> {{ annonce.destination }}</mat-card-title>
          <mat-card-subtitle>{{ annonce.dateDepart | date:'fullDate' }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p><strong>Type de Marchandise:</strong> {{ annonce.typeMarchandise }}</p>
          <p><strong>Capacité:</strong> {{ annonce.capacite }} kg</p>
          <p><strong>Prix:</strong> {{ annonce.prix }} €</p>
          <p><strong>Statut:</strong> {{ annonce.statut }}</p>
          <p *ngIf="annonce.description"><strong>Description:</strong> {{ annonce.description }}</p>

          <div class="actions" *ngIf="currentUser && currentUser.role === 'EXPEDITEUR'">
            <button mat-flat-button color="primary" (click)="createDemande()">Faire une Demande</button>
          </div>
          <div class="actions" *ngIf="currentUser && currentUser.role === 'CONDUCTEUR' && currentUser.id === annonce.conducteurId">
            <button mat-flat-button color="accent" [routerLink]="['/annonces', annonce.id, 'edit']">Modifier l'Annonce</button>
            <button mat-flat-button color="warn" (click)="deleteAnnonce()">Supprimer l'Annonce</button>
          </div>
        </mat-card-content>
      </mat-card>

      <mat-card *ngIf="!annonce" class="not-found-card">
        <mat-card-content>
          <p>Annonce non trouvée.</p>
          <button mat-button routerLink="/annonces">Retour à la liste des annonces</button>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .annonce-details-container {
      padding: 20px;
      max-width: 800px;
      margin: 20px auto;
    }

    .details-card {
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    .details-card mat-card-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 1.5rem;
      font-weight: 700;
      color: #3f51b5;
    }

    .details-card mat-card-subtitle {
      color: #777;
      margin-top: 5px;
    }

    .details-card mat-card-content p {
      margin: 10px 0;
      font-size: 1.1rem;
      line-height: 1.6;
    }

    .details-card .actions {
      margin-top: 20px;
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }

    .not-found-card {
      text-align: center;
      padding: 50px;
      font-size: 1.2rem;
      color: #888;
    }
  `]
})
export class AnnonceDetailsComponent implements OnInit {
  annonce: Annonce | null = null;
  currentUser: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private annonceService: AnnonceService,
    private demandeService: DemandeService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.annonceService.getAnnonceById(+id).subscribe(annonce => {
          this.annonce = annonce;
        }, () => {
          this.snackBar.open("Annonce introuvable.", "Fermer", { duration: 3000 });
          this.router.navigate(['/annonces']);
        });
      }
    });

    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  createDemande(): void {
    if (this.annonce && this.currentUser) {
      // Navigate to demande form with annonceId pre-filled
      this.router.navigate(['/demandes/new', { annonceId: this.annonce.id }]);
    } else {
      this.snackBar.open("Veuillez vous connecter pour faire une demande.", "Fermer", { duration: 3000 });
    }
  }

  deleteAnnonce(): void {
    if (this.annonce && confirm("Êtes-vous sûr de vouloir supprimer cette annonce ?")) {
      this.annonceService.deleteAnnonce(this.annonce.id).subscribe(() => {
        this.snackBar.open("Annonce supprimée avec succès!", "Fermer", { duration: 3000 });
        this.router.navigate(['/annonces']);
      }, error => {
        this.snackBar.open("Erreur lors de la suppression de l'annonce.", "Fermer", { duration: 3000 });
        console.error("Erreur de suppression:", error);
      });
    }
  }
} 