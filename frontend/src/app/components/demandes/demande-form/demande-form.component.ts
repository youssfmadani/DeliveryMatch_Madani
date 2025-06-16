import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandeService, Demande } from '../../services/demande.service';
import { AnnonceService, Annonce } from '../../services/annonce.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-demande-form',
  template: `
    <div class="demande-form-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Créer une Nouvelle Demande</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="demandeForm" (ngSubmit)="onSubmit()" class="demande-form">
            <mat-form-field appearance="outline">
              <mat-label>Annonce Associée</mat-label>
              <mat-select formControlName="annonceId">
                <mat-option *ngFor="let annonce of annonces" [value]="annonce.id">
                  {{ annonce.depart }} -> {{ annonce.destination }} ({{ annonce.dateDepart | date:'shortDate' }})
                </mat-option>
              </mat-select>
              <mat-error *ngIf="demandeForm.get('annonceId')?.hasError('required')">Veuillez sélectionner une annonce</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Quantité (kg)</mat-label>
              <input matInput type="number" formControlName="quantite">
              <mat-error *ngIf="demandeForm.get('quantite')?.hasError('required')">La quantité est requise</mat-error>
              <mat-error *ngIf="demandeForm.get('quantite')?.hasError('min')">La quantité doit être positive</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Description du Colis</mat-label>
              <textarea matInput formControlName="description" rows="4"></textarea>
              <mat-error *ngIf="demandeForm.get('description')?.hasError('required')">La description est requise</mat-error>
            </mat-form-field>

            <button mat-flat-button color="primary" type="submit" [disabled]="demandeForm.invalid">Soumettre Demande</button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .demande-form-container {
      padding: 20px;
      max-width: 800px;
      margin: 20px auto;
    }

    .demande-form {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
    }

    @media (min-width: 600px) {
      .demande-form {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .demande-form mat-form-field {
      width: 100%;
    }

    button[type="submit"] {
      grid-column: 1 / -1; /* Span across all columns */
      padding: 10px 0;
      font-size: 1.1rem;
    }
  `]
})
export class DemandeFormComponent implements OnInit {
  demandeForm: FormGroup;
  expediteurId: number | null = null;
  annonces: Annonce[] = [];

  constructor(
    private fb: FormBuilder,
    private demandeService: DemandeService,
    private annonceService: AnnonceService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.demandeForm = this.fb.group({
      annonceId: [null, Validators.required],
      quantite: [null, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authService.currentUser$.pipe(take(1)).subscribe(user => {
      if (user) {
        this.expediteurId = user.id;
      }
    });
    this.loadAnnoncesDisponibles();
  }

  loadAnnoncesDisponibles(): void {
    this.annonceService.getAnnoncesFutures().subscribe(annonces => {
      this.annonces = annonces;
    });
  }

  onSubmit(): void {
    if (this.demandeForm.valid && this.expediteurId) {
      const demandeData: Demande = { ...this.demandeForm.value, expediteurId: this.expediteurId, statut: 'EN_ATTENTE' };

      this.demandeService.createDemande(demandeData).subscribe(() => {
        this.snackBar.open('Demande créée avec succès!', 'Fermer', { duration: 3000 });
        this.router.navigate(['/demandes']);
      }, error => {
        this.snackBar.open('Erreur lors de la création de la demande.', 'Fermer', { duration: 3000 });
        console.error('Error creating demande:', error);
      });
    }
  }
} 