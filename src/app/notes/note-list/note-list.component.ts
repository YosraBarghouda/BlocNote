import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  notes: any[] = [];

  constructor(private noteService: NoteService, private router: Router) {}

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    this.noteService.getNotes().subscribe({
      next: (data) => {
        this.notes = data;
      },
      error: (error) => {
        console.error('Error loading notes', error);
      }
    });
  }

  onCreate() {
    this.router.navigate(['/write-note']);
  }

  onEdit(id: number) {
    this.router.navigate([`/write-note`, { id }]);
  }

  onDelete(id: number) {
    this.noteService.deleteNote(id).subscribe({
      next: () => {
        this.loadNotes();
      },
      error: (error) => {
        console.error('Error deleting note', error);
      }
    });
  }
}
