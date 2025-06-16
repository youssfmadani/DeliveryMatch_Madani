import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Notification {
  id: number;
  utilisateurId: number;
  message: string;
  date: Date;
  lue: boolean;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = `${environment.apiUrl}/notifications`;

  constructor(private http: HttpClient) {}

  getNotificationsByUtilisateur(utilisateurId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/utilisateur/${utilisateurId}`);
  }

  getNotificationsNonLues(utilisateurId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/utilisateur/${utilisateurId}/non-lues`);
  }

  marquerCommeLue(id: number): Observable<Notification> {
    return this.http.put<Notification>(`${this.apiUrl}/${id}/lue`, {});
  }

  marquerToutesCommeLues(utilisateurId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/utilisateur/${utilisateurId}/toutes-lues`, {});
  }

  countNotificationsNonLues(utilisateurId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/utilisateur/${utilisateurId}/count-non-lues`);
  }

  supprimerNotificationsLues(utilisateurId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/utilisateur/${utilisateurId}/lues`);
  }
} 