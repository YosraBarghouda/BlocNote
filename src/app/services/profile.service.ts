import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root', 
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  getProfile(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}`);
}

getNotesCount(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}/notes/count`);
}

updateProfile(userId: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}`, formData);
}
  
}
