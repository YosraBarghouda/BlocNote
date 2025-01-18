import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private apiUrl = 'http://localhost:3000/comments'; // Assurez-vous que l'URL est correcte

  constructor(private http: HttpClient) {}

  addComment(comment: string): Observable<any> {
    return this.http.post(this.apiUrl, { comment });
  }
}