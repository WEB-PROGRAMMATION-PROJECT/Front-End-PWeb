import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensurationService {

  private apiUrl = 'http://127.0.0.1:8000/api'; // URL de votre API Laravel

  constructor(private http: HttpClient) {}

  saveMeasurements(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/save-measurements`, data);
  }
}
