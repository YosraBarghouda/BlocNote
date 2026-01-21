import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  providers: [DatePipe]
})
export class NotesComponent implements OnInit {
  notes: any[] = [];
  searchQuery: string = '';
  userId: string | null = localStorage.getItem('userId');

  constructor(
    private noteService: NoteService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.fetchNotes();
  }

  fetchNotes() {
    this.noteService.getNotes().subscribe(
      (response) => {
        if (response.notes) {
          this.notes = response.notes;
          console.log(this.notes);
        } else {
          this.notes = [];
        }
      },
      (error) => {
        console.error('Error fetching notes:', error);
        alert('Failed to fetch notes. Please try again.');
      }
    );
  }

  addNote() {
    this.router.navigate(['/note-edit/0', { userId: this.userId }]);
  }

  editNote(noteId: number) {
    this.router.navigate(['/note-edit', noteId]);
  }

  deleteNote(noteId: number) {
    if (confirm('Are you sure you want to delete this note?')) {
      this.noteService.deleteNote(noteId).subscribe(
        () => {
          this.fetchNotes();
          alert('Note deleted successfully');
        },
        (error: any) => {
          console.error('Error deleting note:', error);
          alert('Failed to delete the note. Please try again.');
        }
      );
    }
  }

  filteredNotes() {
    if (!this.searchQuery) {
      return this.notes;
    }

    const query = this.searchQuery.toLowerCase();

    return this.notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
    );
  }
}
