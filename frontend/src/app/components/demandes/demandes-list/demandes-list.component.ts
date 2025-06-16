import { Component, OnInit } from '@angular/core';
import { DemandeService, Demande } from '../../services/demande.service';
import { AuthService } from '../../services/auth.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-demandes-list',
  template: `
    <div class="demandes-list-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Mes Demandes</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div *ngIf="dataSource.data.length === 0" class="no-data-message">
            Aucune demande trouvée pour l'instant.
          </div>
          <table mat-table [dataSource]="dataSource" class="full-width-table" *ngIf="dataSource.data.length > 0">

            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef> ID </th>
              <td mat-cell *matCellDef="let element"> {{element.id}} </td>
            </ng-container>

            <ng-container matColumnDef="annonceId">
              <th mat-header-cell *matHeaderCellDef> Annonce ID </th>
              <td mat-cell *matCellDef="let element"> {{element.annonceId}} </td>
            </ng-container>

            <ng-container matColumnDef="quantite">
              <th mat-header-cell *matHeaderCellDef> Quantité </th>
              <td mat-cell *matCellDef="let element"> {{element.quantite}} kg </td>
            </ng-container>

            <ng-container matColumnDef="description">
              <th mat-header-cell *matHeaderCellDef> Description </th>
              <td mat-cell *matCellDef="let element"> {{element.description}} </td>
            </ng-container>

            <ng-container matColumnDef="statut">
              <th mat-header-cell *matHeaderCellDef> Statut </th>
              <td mat-cell *matCellDef="let element"> {{element.statut}} </td>
            </ng-container>

            <ng-container matColumnDef="dateCreation">
              <th mat-header-cell *matHeaderCellDef> Date de Création </th>
              <td mat-cell *matCellDef="let element"> {{element.dateCreation | date:'short'}} </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .demandes-list-container {
      padding: 20px;
      max-width: 1200px;
      margin: 20px auto;
    }

    .full-width-table {
      width: 100%;
    }

    .no-data-message {
      text-align: center;
      padding: 50px;
      font-size: 1.2rem;
      color: #888;
    }
  `]
})
export class DemandesListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'annonceId', 'quantite', 'description', 'statut', 'dateCreation'];
  dataSource = new MatTableDataSource<Demande>();

  constructor(private demandeService: DemandeService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadDemandes();
  }

  loadDemandes(): void {
    const currentUser = this.authService.currentUserSubject.value;
    if (currentUser && currentUser.id) {
      if (currentUser.role === 'EXPEDITEUR') {
        this.demandeService.getDemandesByExpediteur(currentUser.id).subscribe(
          (demandes: Demande[]) => this.dataSource.data = demandes
        );
      } else if (currentUser.role === 'CONDUCTEUR') {
        // Pour les conducteurs, nous devrons peut-être filtrer par leurs annonces
        // Cela nécessiterait un service d'annonce pour récupérer les annonces du conducteur
        // et ensuite récupérer les demandes associées à ces annonces.
        // Pour l'instant, nous laissons vide ou affichons un message approprié.
        // Ou si nous avons un endpoint pour toutes les demandes pour un conducteur
        this.demandeService.getDemandesByAnnonce(currentUser.id).subscribe(
          (demandes: Demande[]) => this.dataSource.data = demandes
        ); // Ceci est un exemple, l'ID de l'annonce est nécessaire ici, pas l'ID du conducteur.
      }
    } else {
      // Gérer le cas où l'utilisateur n'est pas connecté ou n'a pas d'ID
      this.dataSource.data = [];
    }
  }
} 