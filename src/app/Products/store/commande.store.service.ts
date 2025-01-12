import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Commande} from '../../Data/Commande';

@Injectable({
  providedIn: 'root'
})
export class CommandeStoreService {

  private readonly baseUrl = 'http://127.0.0.1:8000/api/commandes'

  constructor(private http: HttpClient) { }

  getAllCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.baseUrl}/`)
  }

  getCommandeById(id: number): Observable<Commande> {
    return this.http.get<Commande>(`${this.baseUrl}/${id}`);
  }

  createCommande(data: {client_id?: number, styliste_id?: number, modele_id?: number}): Observable<any> {
    if (!data.modele_id && !data.client_id && !data.styliste_id) {
      data.modele_id = 1
      data.client_id = 1
      data.styliste_id = 1
    }
    return this.http.post<any>(`${this.baseUrl}/create`, data);
  }

  updateCommande(id: number, updatedData: Commande): Observable<Commande> {
    return this.http.put<Commande>(`${this.baseUrl}/update/${id}`, updatedData);
  }

  deleteCommande(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
