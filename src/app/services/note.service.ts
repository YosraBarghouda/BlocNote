import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private apiUrl = 'http://localhost:5000/api/notes';

  constructor(private http: HttpClient) {}

  getNotes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createNote(title: string, content: string): Observable<any> {
    return this.http.post(this.apiUrl, { title, content });
  }

  updateNote(id: number, title: string, content: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { title, content });
  }

  deleteNote(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
