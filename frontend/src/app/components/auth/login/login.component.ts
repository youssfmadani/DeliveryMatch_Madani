import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-card-title>Connexion</mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email" placeholder="Votre email">
              <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
                Email requis
              </mat-error>
              <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
                Format d'email invalide
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Mot de passe</mat-label>
              <input matInput formControlName="password" type="password" placeholder="Votre mot de passe">
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                Mot de passe requis
              </mat-error>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid" class="full-width">
              Se connecter
            </button>
          </form>
        </mat-card-content>

        <mat-card-actions>
          <p class="register-link">
            Pas encore de compte ? 
            <a routerLink="/register">S'inscrire</a>
          </p>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }

    .login-card {
      max-width: 400px;
      width: 90%;
      padding: 2rem;
      box-shadow: 0 8px 16px rgba(0,0,0,0.1);
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

    .register-link {
      text-align: center;
      margin-top: 1rem;
      color: #666;
    }

    .register-link a {
      color: #1976d2;
      text-decoration: none;
      font-weight: 500;
    }

    .register-link a:hover {
      text-decoration: underline;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
          this.snackBar.open('Connexion réussie', 'Fermer', { duration: 3000 });
        },
        error: (error) => {
          this.snackBar.open(
            error.error?.message || 'Erreur lors de la connexion',
            'Fermer',
            { duration: 5000 }
          );
        }
      });
    }
  }
} 