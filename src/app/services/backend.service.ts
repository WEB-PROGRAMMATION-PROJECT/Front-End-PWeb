import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private apiUrl = 'http://127.0.0.1:8000/api';  // Base URL pour l'API Laravel

  constructor(private http: HttpClient) { }

  // Méthode pour l'inscription
  registration(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    console.log('Appel au backend avec les informations suivantes :', credentials);
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
  

  // Méthode pour la déconnexion
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers: this.getAuthHeaders() });
  }


  // Récupérer les informations d'un styliste par ID
  getStylistDetails(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/stylist/${userId}`);
  }

  // Méthode pour récupérer le token d'authentification
  getAuthHeaders() {
    const token = localStorage.getItem('auth_token');
    return {
      Authorization: `Bearer ${token}`
    };
  }
  uploadProfilePicture(formData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    return this.http.post(`${this.apiUrl}/update-profile-picture`, formData, { headers });
  }
}
