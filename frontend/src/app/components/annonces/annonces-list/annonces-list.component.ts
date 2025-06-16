import { Component, OnInit } from '@angular/core';
import { AnnonceService, Annonce } from '../../../services/annonce.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-annonces-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <div class="annonces-list-container">
      <mat-card class="search-card">
        <mat-card-header>
          <mat-card-title>Rechercher des Annonces</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="searchForm" class="search-form">
            <mat-form-field appearance="outline">
              <mat-label>Destination</mat-label>
              <input matInput formControlName="destination">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Type de Marchandise</mat-label>
              <input matInput formControlName="typeMarchandise">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Capacité Minimale (kg)</mat-label>
              <input matInput type="number" formControlName="capaciteMin">
            </mat-form-field>
          </form>
        </mat-card-content>
      </mat-card>

      <div class="annonces-grid">
        <mat-card *ngFor="let annonce of annonces" class="annonce-card">
          <mat-card-header>
            <mat-card-title>{{ annonce.depart }} <mat-icon>arrow_right_alt</mat-icon> {{ annonce.destination }}</mat-card-title>
            <mat-card-subtitle>{{ annonce.dateDepart | date:'mediumDate' }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>Type de marchandise: {{ annonce.typeMarchandise }}</p>
            <p>Capacité: {{ annonce.capacite }} kg</p>
            <p>Prix: {{ annonce.prix }} €</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-flat-button color="primary" [routerLink]="['/annonces', annonce.id, 'details']">Voir Détails</button>
          </mat-card-actions>
        </mat-card>
        <div *ngIf="annonces.length === 0" class="no-annonces-message">
          Aucune annonce trouvée pour l'instant.
        </div>
      </div>
    </div>
  `,
  styles: [`
    .annonces-list-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .search-card {
      margin-bottom: 30px;
      background-color: #f5f5f5;
    }

    .search-form {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .search-form mat-form-field {
      flex: 1 1 auto;
      min-width: 200px;
    }

    .annonces-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 25px;
    }

    .annonce-card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      transition: transform 0.2s ease-in-out;
    }

    .annonce-card:hover {
      transform: translateY(-5px);
    }

    .annonce-card mat-card-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 1.25rem;
      font-weight: 600;
      color: #3f51b5;
    }

    .annonce-card mat-card-subtitle {
      color: #777;
    }

    .annonce-card mat-card-content p {
      margin: 5px 0;
      color: #444;
    }

    .annonce-card mat-card-actions {
      padding: 16px;
      display: flex;
      justify-content: flex-end;
    }

    .no-annonces-message {
      text-align: center;
      grid-column: 1 / -1;
      padding: 50px;
      font-size: 1.2rem;
      color: #888;
    }

    @media (max-width: 768px) {
      .search-form {
        flex-direction: column;
        align-items: stretch;
      }
    }
  `]
})
export class AnnoncesListComponent implements OnInit {
  annonces: Annonce[] = [];
  searchForm: FormGroup;

  constructor(private annonceService: AnnonceService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      destination: [''],
      typeMarchandise: [''],
      capaciteMin: [null]
    });
  }

  ngOnInit(): void {
    this.loadAllAnnonces();
    this.searchForm.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(params => {
      this.searchAnnonces(params);
    });
  }

  loadAllAnnonces(): void {
    this.annonceService.getAllAnnonces().subscribe(data => {
      this.annonces = data;
    });
  }

  searchAnnonces(params: any): void {
    this.annonceService.searchAnnonces(params).subscribe(data => {
      this.annonces = data;
    });
  }
}