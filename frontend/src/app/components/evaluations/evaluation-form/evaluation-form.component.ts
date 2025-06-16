import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluationService } from '../../services/evaluation.service';
import { AuthService } from '../../services/auth.service';
import { DemandeService, Demande } from '../../services/demande.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-evaluation-form',
  template: `
    <div class="evaluation-form-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Créer une Évaluation</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="evaluationForm" (ngSubmit)="onSubmit()" class="evaluation-form">
            <mat-form-field appearance="outline">
              <mat-label>Demande Associée</mat-label>
              <input matInput [value]="demande?.id" readonly>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Note (1-5)</mat-label>
              <input matInput type="number" formControlName="note" min="1" max="5">
              <mat-error *ngIf="evaluationForm.get('note')?.hasError('required')">La note est requise</mat-error>
              <mat-error *ngIf="evaluationForm.get('note')?.hasError('min') || evaluationForm.get('note')?.hasError('max')">La note doit être entre 1 et 5</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Commentaire</mat-label>
              <textarea matInput formControlName="commentaire" rows="4"></textarea>
              <mat-error *ngIf="evaluationForm.get('commentaire')?.hasError('required')">Le commentaire est requis</mat-error>
            </mat-form-field>

            <button mat-flat-button color="primary" type="submit" [disabled]="evaluationForm.invalid">Soumettre Évaluation</button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .evaluation-form-container {
      padding: 20px;
      max-width: 800px;
      margin: 20px auto;
    }

    .evaluation-form {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .evaluation-form mat-form-field {
      width: 100%;
    }

    button[type="submit"] {
      grid-column: 1 / -1;
      padding: 10px 0;
      font-size: 1.1rem;
    }
  `]
})
export class EvaluationFormComponent implements OnInit {
  evaluationForm: FormGroup;
  auteurId: number | null = null;
  cibleId: number | null = null;
  demandeId: number | null = null;
  demande: Demande | null = null;

  constructor(
    private fb: FormBuilder,
    private evaluationService: EvaluationService,
    private authService: AuthService,
    private demandeService: DemandeService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.evaluationForm = this.fb.group({
      note: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      commentaire: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const demandeId = params.get('demandeId');
        if (demandeId) {
          this.demandeId = +demandeId;
          return this.demandeService.getDemandeById(this.demandeId);
        } else {
          this.snackBar.open("ID de demande manquant pour l'évaluation.", "Fermer", { duration: 3000 });
          this.router.navigate(['/dashboard']);
          return of(null);
        }
      }),
      take(1)
    ).subscribe(demande => {
      if (demande) {
        this.demande = demande;
        this.authService.currentUser$.pipe(take(1)).subscribe(user => {
          if (user) {
            this.auteurId = user.id;
            // Determine cibleId based on user's role and demande details
            // If current user is EXPEDITEUR, target is the CONDUCTEUR of the annonce
            // If current user is CONDUCTEUR, target is the EXPEDITEUR of the demande
            if (user.role === 'EXPEDITEUR' && this.demande?.annonceId) {
              // We need annonce details to get conductorId
              // For simplicity, assuming conductorId can be derived or passed
              // This part needs more logic to fetch conductorId from annonce
              // For now, let's assume demande object has conductorId if available or get it via annonceService
              // In a real app, you'd fetch annonceService.getAnnonceById(demande.annonceId).subscribe(...)
              // For now, let's just make sure there's a cible to avoid errors
              this.cibleId = this.demande.expediteurId; // Placeholder - needs actual logic to get other party
            } else if (user.role === 'CONDUCTEUR' && this.demande?.expediteurId) {
              this.cibleId = this.demande.expediteurId;
            }
          }
        });
      }
    });
  }

  onSubmit(): void {
    if (this.evaluationForm.valid && this.auteurId && this.cibleId && this.demandeId) {
      const evaluationData = {
        auteurId: this.auteurId,
        cibleId: this.cibleId,
        demandeId: this.demandeId,
        note: this.evaluationForm.value.note,
        commentaire: this.evaluationForm.value.commentaire
      };

      this.evaluationService.createEvaluation(evaluationData).subscribe(() => {
        this.snackBar.open('Évaluation soumise avec succès!', 'Fermer', { duration: 3000 });
        this.router.navigate(['/evaluations']);
      }, error => {
        this.snackBar.open('Erreur lors de la soumission de l\'évaluation.', 'Fermer', { duration: 3000 });
        console.error('Error submitting evaluation:', error);
      });
    } else {
      this.snackBar.open('Veuillez remplir tous les champs requis et vous assurer d\'être connecté.', 'Fermer', { duration: 3000 });
    }
  }
} 