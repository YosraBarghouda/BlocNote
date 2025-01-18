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
  }

}
