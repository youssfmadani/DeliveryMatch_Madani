import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Demande {
  id: number;
  expediteurId: number;
  annonceId: number;
  quantite: number;
  description: string;
  statut: string;
  dateCreation: Date;
}

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private apiUrl = `${environment.apiUrl}/demandes`;

  constructor(private http: HttpClient) {}

  createDemande(demande: Partial<Demande>): Observable<Demande> {
    return this.http.post<Demande>(this.apiUrl, demande);
  }

  updateStatutDemande(id: number, nouveauStatut: string): Observable<Demande> {
    return this.http.put<Demande>(`${this.apiUrl}/${id}/statut`, { statut: nouveauStatut });
  }

  deleteDemande(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getDemandeById(id: number): Observable<Demande> {
    return this.http.get<Demande>(`${this.apiUrl}/${id}`);
  }

  getDemandesByExpediteur(expediteurId: number): Observable<Demande[]> {
    return this.http.get<Demande[]>(`${this.apiUrl}/expediteur/${expediteurId}`);
  }

  getDemandesByAnnonce(annonceId: number): Observable<Demande[]> {
    return this.http.get<Demande[]>(`${this.apiUrl}/annonce/${annonceId}`);
  }

  getDemandesByStatut(statut: string): Observable<Demande[]> {
    return this.http.get<Demande[]>(`${this.apiUrl}/statut/${statut}`);
  }
} 