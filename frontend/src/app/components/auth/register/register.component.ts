import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  template: `
    <div class="register-container">
      <mat-card class="register-card">
        <mat-card-header>
          <mat-card-title>Inscription</mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            <div class="form-row">
              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Prénom</mat-label>
                <input matInput formControlName="prenom" placeholder="Votre prénom">
                <mat-error *ngIf="registerForm.get('prenom')?.hasError('required')">
                  Prénom requis
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Nom</mat-label>
                <input matInput formControlName="nom" placeholder="Votre nom">
                <mat-error *ngIf="registerForm.get('nom')?.hasError('required')">
                  Nom requis
                </mat-error>
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email" placeholder="Votre email">
              <mat-error *ngIf="registerForm.get('email')?.hasError('required')">
                Email requis
              </mat-error>
              <mat-error *ngIf="registerForm.get('email')?.hasError('email')">
                Format d'email invalide
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Téléphone</mat-label>
              <input matInput formControlName="telephone" placeholder="Votre numéro de téléphone">
              <mat-error *ngIf="registerForm.get('telephone')?.hasError('required')">
                Téléphone requis
              </mat-error>
              <mat-error *ngIf="registerForm.get('telephone')?.hasError('pattern')">
                Format de téléphone invalide
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Mot de passe</mat-label>
              <input matInput formControlName="password" type="password" placeholder="Votre mot de passe">
              <mat-error *ngIf="registerForm.get('password')?.hasError('required')">
                Mot de passe requis
              </mat-error>
              <mat-error *ngIf="registerForm.get('password')?.hasError('minlength')">
                Le mot de passe doit contenir au moins 8 caractères
              </mat-error>
              <mat-error *ngIf="registerForm.get('password')?.hasError('pattern')">
                Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Rôle</mat-label>
              <mat-select formControlName="role">
                <mat-option value="EXPEDITEUR">Expéditeur</mat-option>
                <mat-option value="CONDUCTEUR">Conducteur</mat-option>
              </mat-select>
              <mat-error *ngIf="registerForm.get('role')?.hasError('required')">
                Rôle requis
              </mat-error>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" [disabled]="registerForm.invalid" class="full-width">
              S'inscrire
            </button>
          </form>
        </mat-card-content>

        <mat-card-actions>
          <p class="login-link">
            Déjà un compte ? 
            <a routerLink="/login">Se connecter</a>
          </p>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .register-container {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      padding: 2rem 0;
    }

    .register-card {
      max-width: 600px;
      width: 90%;
      padding: 2rem;
      box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    }

    .form-row {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .half-width {
      width: calc(50% - 0.5rem);
    }

    .full-width {
      width: 100%;
      margin-bottom: 1rem;
    }

    mat-card-header {
      justify-content: center;
      margin-bottom: 2rem;
    }

    mat-card-title {
      font-size: 24px;
      color: #333;
    }

    button[type="submit"] {
      margin-top: 1rem;
      padding: 0.5rem;
      font-size: 16px;
    }

    .login-link {
      text-align: center;
      margin-top: 1rem;
      color: #666;
    }

    .login-link a {
      color: #1976d2;
      text-decoration: none;
      font-weight: 500;
    }

    .login-link a:hover {
      text-decoration: underline;
    }

    @media (max-width: 600px) {
      .form-row {
        flex-direction: column;
        gap: 0;
      }

      .half-width {
        width: 100%;
      }
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{10,15}$')]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$')
      ]],
      role: ['EXPEDITEUR', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
          this.snackBar.open('Inscription réussie', 'Fermer', { duration: 3000 });
        },
        error: (error) => {
          this.snackBar.open(
            error.error?.message || 'Erreur lors de l\'inscription',
            'Fermer',
            { duration: 5000 }
          );
        }
      });
    }
  }
} 