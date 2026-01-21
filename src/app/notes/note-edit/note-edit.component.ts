import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent implements OnInit {
  title: string = '';
  content: string = '';
  note_id: number = 0;

  constructor(private noteService: NoteService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.note_id = +this.activatedRoute.snapshot.params['id'];
    if (this.note_id) {
      this.noteService.getNotes(this.note_id).subscribe({
        next: (response: any) => {
          this.title = response.title; 
          this.content = response.content; 
        },
        error: (error: any) => {
          console.error('Error fetching note:', error);
          alert('Failed to fetch the note details.');
        }
      });
    }
  }
  
  onSave() {
    if (!this.title.trim() || !this.content.trim()) {
      alert('Please fill in all the blanks.');
      return;
    }
  
    const userId = localStorage.getItem('userId');
  
    if (!userId) {
      alert('User is not logged in. Please log in first.');
      this.router.navigate(['/login']);
      return;
    }
  
    const noteData = {
      title: this.title,
      content: this.content,
      user_id: userId,
    };
  
    if (this.note_id && this.note_id !== 0) {
      this.noteService.updateNote(this.note_id, noteData).subscribe({
        next: () => {
          alert('Note updated successfully!');
          this.router.navigate(['/notes']);
        },
        error: (error) => {
          console.error('Error updating note:', error);
          alert('Failed to update the note. Please try again.');
        },
      });
    } else {
      this.noteService.createNote(noteData).subscribe({
        next: () => {
          alert('Note saved successfully!');
          this.router.navigate(['/notes']);
        },
        error: (error) => {
          console.error('Error saving note:', error);
          alert('Failed to save the note. Please try again.');
        },
      });
    }
  }
  
  
}