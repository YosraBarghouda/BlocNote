import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private http: HttpClient) {}
  

  onLogin() {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      alert('Please fill in all fields correctly!');
      return;
    }

    this.http.post('http://localhost:3000/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response: any) => {
        // Stocker le token et l'userId dans le localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId); // Stocker l'ID utilisateur
    
        alert(response.message);
    
        if (response.hasNotes) {
          this.router.navigate(['/notes']); // Redirige vers les notes
        } else if (response.hasNotes === false) {
          this.router.navigate(['/note-list']); // Pas de notes
        } else if (response.message === 'unregistered user please register first') {
          this.router.navigate(['/register']); // Utilisateur non enregistré
        } else {
          this.router.navigate(['/login']); 
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Login error:', error);
        if (error.status === 400) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }    

  goToRegister() {
    this.errorMessage = '';
    this.router.navigate(['/register']);
  }

  onForgotPassword() {
    const userProvidedEmail = prompt("Please enter your registered email address:");

    if (!userProvidedEmail) {
      alert("Email address is required for password reset.");
      return;
    }

    if (!this.validateEmail(userProvidedEmail)) {
      alert("Please provide a valid email address.");
      return;
    }

    this.http.post('http://localhost:3000/forgot-password', { 
      email: userProvidedEmail 
    })
    .subscribe({
      next: (response: any) => {
        alert(response.message || "If the email exists, a reset link will be sent.");
      },
      error: (error: any) => {
        this.errorMessage = error.error?.message || 'An error occurred. Please try again later.';
        alert(this.errorMessage);
      }
    });
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
