import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilisateurService, Utilisateur } from '../../services/utilisateur.service';

@Component({
  selector: 'app-profile',
  template: `
    <div class="profile-container">
      <mat-card class="profile-card">
        <mat-card-header>
          <mat-card-title>Mon Profil</mat-card-title>
          <mat-card-subtitle>Gérez vos informations personnelles</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="profile-form">
            <mat-form-field appearance="outline">
              <mat-label>Nom</mat-label>
              <input matInput formControlName="nom">
              <mat-error *ngIf="profileForm.get('nom')?.hasError('required')">Le nom est requis</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Prénom</mat-label>
              <input matInput formControlName="prenom">
              <mat-error *ngIf="profileForm.get('prenom')?.hasError('required')">Le prénom est requis</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email">
              <mat-error *ngIf="profileForm.get('email')?.hasError('required')">L'email est requis</mat-error>
              <mat-error *ngIf="profileForm.get('email')?.hasError('email')">Email invalide</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Téléphone</mat-label>
              <input matInput formControlName="telephone">
              <mat-error *ngIf="profileForm.get('telephone')?.hasError('required')">Le téléphone est requis</mat-error>
            </mat-form-field>

            <button mat-flat-button color="primary" type="submit" [disabled]="profileForm.invalid">Mettre à jour le profil</button>
          </form>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button color="warn" (click)="logout()">Se Déconnecter</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .profile-container {
      padding: 20px;
      max-width: 800px;
      margin: 20px auto;
    }

    .profile-card {
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    .profile-form {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
      margin-top: 20px;
    }

    @media (min-width: 600px) {
      .profile-form {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .profile-form mat-form-field {
      width: 100%;
    }

    button[type="submit"] {
      grid-column: 1 / -1;
      padding: 10px 0;
      font-size: 1.1rem;
    }

    mat-card-actions {
      display: flex;
      justify-content: flex-end;
      padding: 16px;
    }
  `]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  currentUser: Utilisateur | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private utilisateurService: UtilisateurService,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        // Assuming UtilisateurService has a getUtilisateurById method
        this.utilisateurService.getUtilisateurById(user.id).subscribe(fullUser => {
          this.currentUser = fullUser;
          this.profileForm.patchValue(fullUser);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid && this.currentUser) {
      const updatedUser: Utilisateur = { ...this.currentUser, ...this.profileForm.value };
      this.utilisateurService.updateUtilisateur(updatedUser.id, updatedUser).subscribe(() => {
        this.snackBar.open('Profil mis à jour avec succès!', 'Fermer', { duration: 3000 });
        // Optionally, refresh user data in auth service if it changes
        // For simplicity, we'll just show success message for now.
      }, error => {
        this.snackBar.open('Erreur lors de la mise à jour du profil.', 'Fermer', { duration: 3000 });
        console.error('Error updating profile:', error);
      });
    }
  }

  logout(): void {
    this.authService.logout();
  }
} 