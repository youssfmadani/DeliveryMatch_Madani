import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Demande {
  id: number;
  annonceId: number;
  expediteurId: number;
  statut: 'EN_ATTENTE' | 'ACCEPTEE' | 'REFUSEE';
  message: string;
  dateCreation: Date;
  annonce: {
    id: number;
    depart: string;
    destination: string;
    dateDepart: Date;
  };
  expediteur: {
    id: number;
    nom: string;
    prenom: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private apiUrl = `${environment.apiUrl}/demandes`;

  constructor(private http: HttpClient) { }

  getAllDemandes(): Observable<Demande[]> {
    return this.http.get<Demande[]>(this.apiUrl);
  }

  getDemandeById(id: number): Observable<Demande> {
    return this.http.get<Demande>(`${this.apiUrl}/${id}`);
  }

  createDemande(demande: Partial<Demande>): Observable<Demande> {
    return this.http.post<Demande>(this.apiUrl, demande);
  }

  updateDemande(id: number, demande: Partial<Demande>): Observable<Demande> {
    return this.http.put<Demande>(`${this.apiUrl}/${id}`, demande);
  }

  deleteDemande(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getDemandesByExpediteur(expediteurId: number): Observable<Demande[]> {
    return this.http.get<Demande[]>(`${this.apiUrl}/expediteur/${expediteurId}`);
  }

  getDemandesByAnnonce(annonceId: number): Observable<Demande[]> {
    return this.http.get<Demande[]>(`${this.apiUrl}/annonce/${annonceId}`);
  }
} 