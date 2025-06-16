import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnonceService, Annonce } from '../../services/annonce.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-annonce-form',
  template: `
    <div class="annonce-form-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ isEditMode ? 'Modifier' : 'Créer' }} une Annonce</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="annonceForm" (ngSubmit)="onSubmit()" class="annonce-form">
            <mat-form-field appearance="outline">
              <mat-label>Lieu de Départ</mat-label>
              <input matInput formControlName="depart">
              <mat-error *ngIf="annonceForm.get('depart')?.hasError('required')">Le lieu de départ est requis</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Destination Finale</mat-label>
              <input matInput formControlName="destination">
              <mat-error *ngIf="annonceForm.get('destination')?.hasError('required')">La destination est requise</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Date de Départ</mat-label>
              <input matInput [matDatepicker]="picker" formControlName="dateDepart">
              <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
              <mat-error *ngIf="annonceForm.get('dateDepart')?.hasError('required')">La date de départ est requise</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Type de Marchandise</mat-label>
              <input matInput formControlName="typeMarchandise">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Capacité Disponible (kg)</mat-label>
              <input matInput type="number" formControlName="capacite">
              <mat-error *ngIf="annonceForm.get('capacite')?.hasError('required')">La capacité est requise</mat-error>
              <mat-error *ngIf="annonceForm.get('capacite')?.hasError('min')">La capacité doit être positive</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Prix (€)</mat-label>
              <input matInput type="number" formControlName="prix">
              <mat-error *ngIf="annonceForm.get('prix')?.hasError('required')">Le prix est requis</mat-error>
              <mat-error *ngIf="annonceForm.get('prix')?.hasError('min')">Le prix doit être positif</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Description</mat-label>
              <textarea matInput formControlName="description" rows="3"></textarea>
            </mat-form-field>

            <button mat-flat-button color="primary" type="submit" [disabled]="annonceForm.invalid">{{ isEditMode ? 'Modifier' : 'Créer' }} Annonce</button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .annonce-form-container {
      padding: 20px;
      max-width: 800px;
      margin: 20px auto;
    }

    .annonce-form {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
    }

    @media (min-width: 600px) {
      .annonce-form {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .annonce-form mat-form-field {
      width: 100%;
    }

    button[type="submit"] {
      grid-column: 1 / -1; /* Span across all columns */
      padding: 10px 0;
      font-size: 1.1rem;
    }
  `]
})
export class AnnonceFormComponent implements OnInit {
  annonceForm: FormGroup;
  isEditMode = false;
  annonceId: number | null = null;
  conducteurId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private annonceService: AnnonceService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.annonceForm = this.fb.group({
      depart: ['', Validators.required],
      destination: ['', Validators.required],
      dateDepart: [null, Validators.required],
      typeMarchandise: [''],
      capacite: [null, [Validators.required, Validators.min(1)]],
      prix: [null, [Validators.required, Validators.min(0)]],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => {
        if (id) {
          this.isEditMode = true;
          this.annonceId = +id;
          return this.annonceService.getAnnonceById(this.annonceId);
        } else {
          return of(null);
        }
      })
    ).subscribe(annonce => {
      if (annonce) {
        this.annonceForm.patchValue(annonce);
      }
    });

    this.authService.currentUser$.pipe(take(1)).subscribe(user => {
      if (user) {
        this.conducteurId = user.id;
      }
    });
  }

  onSubmit(): void {
    if (this.annonceForm.valid && this.conducteurId) {
      const annonceData: Annonce = { ...this.annonceForm.value, conducteurId: this.conducteurId };

      if (this.isEditMode && this.annonceId) {
        this.annonceService.updateAnnonce(this.annonceId, annonceData).subscribe(() => {
          this.snackBar.open('Annonce mise à jour avec succès!', 'Fermer', { duration: 3000 });
          this.router.navigate(['/annonces']);
        }, error => {
          this.snackBar.open('Erreur lors de la mise à jour de l\'annonce.', 'Fermer', { duration: 3000 });
          console.error('Error updating annonce:', error);
        });
      } else {
        this.annonceService.createAnnonce(annonceData).subscribe(() => {
          this.snackBar.open('Annonce créée avec succès!', 'Fermer', { duration: 3000 });
          this.router.navigate(['/annonces']);
        }, error => {
          this.snackBar.open('Erreur lors de la création de l\'annonce.', 'Fermer', { duration: 3000 });
          console.error('Error creating annonce:', error);
        });
      }
    }
  }
} 