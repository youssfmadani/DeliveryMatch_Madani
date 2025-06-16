import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Annonce {
  id: number;
  depart: string;
  destination: string;
  dateDepart: Date;
  typeMarchandise: string;
  capacite: number;
  prix: number;
  conducteur: {
    id: number;
    nom: string;
    prenom: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {
  private apiUrl = `${environment.apiUrl}/annonces`;

  constructor(private http: HttpClient) { }

  getAllAnnonces(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(this.apiUrl);
  }

  getAnnonceById(id: number): Observable<Annonce> {
    return this.http.get<Annonce>(`${this.apiUrl}/${id}`);
  }

  searchAnnonces(params: any): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(this.apiUrl, { params });
  }

  createAnnonce(annonce: Partial<Annonce>): Observable<Annonce> {
    return this.http.post<Annonce>(this.apiUrl, annonce);
  }

  updateAnnonce(id: number, annonce: Partial<Annonce>): Observable<Annonce> {
    return this.http.put<Annonce>(`${this.apiUrl}/${id}`, annonce);
  }

  deleteAnnonce(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAnnoncesByConducteur(conducteurId: number): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${this.apiUrl}/conducteur/${conducteurId}`);
  }

  getAnnoncesFutures(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${this.apiUrl}/futures`);
  }
} 