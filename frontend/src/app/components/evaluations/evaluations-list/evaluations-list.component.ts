import { Component, OnInit } from '@angular/core';
import { EvaluationService, Evaluation } from '../../services/evaluation.service';
import { AuthService } from '../../services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-evaluations-list',
  template: `
    <div class="evaluations-list-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Mes Évaluations</mat-card-title>
          <mat-card-subtitle>Aperçu des évaluations reçues et données</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <mat-tab-group animationDuration="0ms">
            <mat-tab label="Évaluations Reçues">
              <div *ngIf="receivedEvaluationsDataSource.data.length === 0" class="no-data-message">
                Aucune évaluation reçue pour l'instant.
              </div>
              <table mat-table [dataSource]="receivedEvaluationsDataSource" class="full-width-table" *ngIf="receivedEvaluationsDataSource.data.length > 0">
                <ng-container matColumnDef="auteurId">
                  <th mat-header-cell *matHeaderCellDef> Auteur </th>
                  <td mat-cell *matCellDef="let element"> {{element.auteurId}} </td>
                </ng-container>
                <ng-container matColumnDef="note">
                  <th mat-header-cell *matHeaderCellDef> Note </th>
                  <td mat-cell *matCellDef="let element"> {{element.note}} / 5 </td>
                </ng-container>
                <ng-container matColumnDef="commentaire">
                  <th mat-header-cell *matHeaderCellDef> Commentaire </th>
                  <td mat-cell *matCellDef="let element"> {{element.commentaire}} </td>
                </ng-container>
                <ng-container matColumnDef="dateEvaluation">
                  <th mat-header-cell *matHeaderCellDef> Date </th>
                  <td mat-cell *matCellDef="let element"> {{element.dateEvaluation | date:'short'}} </td>
                </ng-container>
                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
              </table>
            </mat-tab>

            <mat-tab label="Évaluations Données">
              <div *ngIf="givenEvaluationsDataSource.data.length === 0" class="no-data-message">
                Aucune évaluation donnée pour l'instant.
              </div>
              <table mat-table [dataSource]="givenEvaluationsDataSource" class="full-width-table" *ngIf="givenEvaluationsDataSource.data.length > 0">
                <ng-container matColumnDef="cibleId">
                  <th mat-header-cell *matHeaderCellDef> Cible </th>
                  <td mat-cell *matCellDef="let element"> {{element.cibleId}} </td>
                </ng-container>
                <ng-container matColumnDef="note">
                  <th mat-header-cell *matHeaderCellDef> Note </th>
                  <td mat-cell *matCellDef="let element"> {{element.note}} / 5 </td>
                </ng-container>
                <ng-container matColumnDef="commentaire">
                  <th mat-header-cell *matHeaderCellDef> Commentaire </th>
                  <td mat-cell *matCellDef="let element"> {{element.commentaire}} </td>
                </ng-container>
                <ng-container matColumnDef="dateEvaluation">
                  <th mat-header-cell *matHeaderCellDef> Date </th>
                  <td mat-cell *matCellDef="let element"> {{element.dateEvaluation | date:'short'}} </td>
                </ng-container>
                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
              </table>
            </mat-tab>
          </mat-tab-group>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .evaluations-list-container {
      padding: 20px;
      max-width: 1200px;
      margin: 20px auto;
    }

    .full-width-table {
      width: 100%;
      margin-top: 20px;
    }

    .no-data-message {
      text-align: center;
      padding: 50px;
      font-size: 1.2rem;
      color: #888;
    }

    mat-tab-group {
      margin-top: 20px;
    }
  `]
})
export class EvaluationsListComponent implements OnInit {
  displayedColumns: string[] = ['note', 'commentaire', 'dateEvaluation'];
  receivedEvaluationsDataSource = new MatTableDataSource<Evaluation>();
  givenEvaluationsDataSource = new MatTableDataSource<Evaluation>();
  currentUser: any;

  constructor(
    private evaluationService: EvaluationService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user && user.id) {
        this.loadReceivedEvaluations(user.id);
        this.loadGivenEvaluations(user.id);
      }
    });
  }

  loadReceivedEvaluations(userId: number): void {
    this.evaluationService.getEvaluationsByCible(userId).subscribe(
      (evals: Evaluation[]) => this.receivedEvaluationsDataSource.data = evals,
      error => {
        this.snackBar.open("Erreur lors du chargement des évaluations reçues.", "Fermer", { duration: 3000 });
        console.error("Error loading received evaluations:", error);
      }
    );
  }

  loadGivenEvaluations(userId: number): void {
    this.evaluationService.getEvaluationsByAuteur(userId).subscribe(
      (evals: Evaluation[]) => this.givenEvaluationsDataSource.data = evals,
      error => {
        this.snackBar.open("Erreur lors du chargement des évaluations données.", "Fermer", { duration: 3000 });
        console.error("Error loading given evaluations:", error);
      }
    );
  }
} 