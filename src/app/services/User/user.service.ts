import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserInfo {
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone?: string;
  bust?: string;
  waist?: string;
  hips?: string;
  id?: number;
  avatar?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private  baseUrl = 'http://localhost:3000'; // URL de json-server
  private userInfoUrl = this.baseUrl+"/userInfo"; // URL de votre JSON server

  constructor(private http: HttpClient) {}

  getUserInfo(id:number): Observable<UserInfo> {
    return this.http.get<UserInfo>(this.userInfoUrl);
  }

  updateUserInfo(userInfo: UserInfo): Observable<UserInfo> {
    return this.http.put<UserInfo>(`${this.userInfoUrl}`, userInfo); // PUT pour mettre à jour l'objet entier
  }
}
