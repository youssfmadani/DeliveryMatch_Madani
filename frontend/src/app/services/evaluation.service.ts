import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Evaluation {
  id?: number;
  auteurId: number;
  cibleId: number;
  demandeId: number;
  note: number;
  commentaire: string;
  dateEvaluation: Date;
}

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  private apiUrl = `${environment.apiUrl}/evaluations`;

  constructor(private http: HttpClient) { }

  createEvaluation(evaluation: Omit<Evaluation, 'id' | 'dateEvaluation'>): Observable<Evaluation> {
    return this.http.post<Evaluation>(this.apiUrl, evaluation);
  }

  getEvaluationsByCible(cibleId: number): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(`${this.apiUrl}/cible/${cibleId}`);
  }

  getEvaluationsByAuteur(auteurId: number): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(`${this.apiUrl}/auteur/${auteurId}`);
  }

  getMoyenneNotesByUtilisateur(utilisateurId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/moyenne/${utilisateurId}`);
  }

  getDernieresEvaluations(utilisateurId: number): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(`${this.apiUrl}/dernieres/${utilisateurId}`);
  }
} 