import { Component } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent {
symbol: any;
backgroundColor: any;
language: any;
addSymbol() {
throw new Error('Method not implemented.');
}
  title: string = '';
  content: string = '';

  constructor(private noteService: NoteService, private router: Router) {}

  onSave() {
    this.noteService.createNote(this.title, this.content).subscribe({
      next: () => {
        this.router.navigate(['/notes']);
      },
      error: (error) => {
        console.error('Error saving note', error);
      }
    });
  }
}
