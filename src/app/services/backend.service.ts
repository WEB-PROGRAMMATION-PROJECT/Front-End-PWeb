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
  getStylistProfile(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/stylist-profile/${id}`);
  }
  // Méthode pour récupérer le token d'authentification
  getAuthHeaders() {
    const token = localStorage.getItem('auth_token');
    return {
      Authorization: `Bearer ${token}`
    };
  }
   // Récupérer les détails du client connecté
   getClientDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/client/${id}`);
  }
  // Méthode pour mettre à jour le profil du styliste
  updateStylistProfile(stylistId: number, updatedProfile: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/stylist/${stylistId}`, updatedProfile);
  }
  updateClientDetails(userId: number, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/client/${userId}/update`, updatedData);
  }

  // Méthode pour mettre à jour la photo de profil
  updateProfilePhoto(stylistId: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/Modif_stylist/${stylistId}/update-profile-photo`, formData);
  }

  // Méthode pour mettre à jour la photo de couverture
  updateCoverPhoto(stylistId: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/stylist/${stylistId}/update-cover-photo`, formData);
  }
}
