import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { NoteEditComponent } from './notes/note-edit/note-edit.component';
import { NoteListComponent } from './notes/note-list/note-list.component';
import { NotesComponent } from './notes/notes.component';
import { AuthService } from './services/auth.service';
import { NoteService } from './services/note.service';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NoteEditComponent,
    NoteListComponent,
    HomeComponent,
    AboutUsComponent,
    NotesComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  providers: [AuthService, NoteService],
  bootstrap: [AppComponent],
})
export class AppModule {}
