import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Designer {
  id: number;
  name: string;
  role: string;
  location: string;
  image: string;
  specialties: string[];
  collections: number;
  awards: number;
  rating: number;
  experience: number;
}

@Injectable({
  providedIn: 'root'
})
export class DesignerService {
  baseUrl = 'http://localhost:3000'; // URL de json-server
  private TopDesignersUrl = `${this.baseUrl}/TopDesigners`;
  private designersUrl = `${this.baseUrl}/designers`;

  private locationsUrl = `${this.baseUrl}/locations`;
  private specialtiesUrl = `${this.baseUrl}/specialties`;

  constructor(private http: HttpClient) {}

  getDesigners(): Observable<Designer[]> {
    return this.http.get<Designer[]>(this.designersUrl);
  }

  getLocations(): Observable<string[]> {
    return this.http.get<string[]>(this.locationsUrl);
  }

  getSpecialties(): Observable<string[]> {
    return this.http.get<string[]>(this.specialtiesUrl);
  }
  // Récupérer les designers
  getTopDesigners(): Observable<Designer[]> {
    return this.http.get<Designer[]>(this.TopDesignersUrl);
  }
}
