import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NoteService {
  private apiUrl = 'http://localhost:3000/notes'; 

  constructor(private http: HttpClient) {}

  createNote(noteData: any): Observable<any> {
    const userId = localStorage.getItem('userId'); // Retrieve the user ID from local storage
  
    if (!userId) {
      return of({ error: 'User ID not found. Please log in again.' }); // Handle missing user ID
    }
  
    const requestData = {
      ...noteData,
      user_id: parseInt(userId, 10), // Ensure user ID is sent as a number
    };
  
    return this.http.post(`${this.apiUrl}`, requestData);
  }

  getNotes(note_id?: number): Observable<any> {
    if (note_id) {
      return this.http.get(`${this.apiUrl}/${note_id}`); // Fetch a specific note
    } else {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        return of({ error: 'User ID not found. Please log in again.' });
      }
      return this.http.get(`${this.apiUrl}?userId=${userId}`); // Fetch all notes for the user
    }
  }
  
  updateNote(noteId: number, noteData: any) {
    return this.http.put(`${this.apiUrl}/${noteId}`, noteData);
  }

  deleteNote(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`); 
  }
}
