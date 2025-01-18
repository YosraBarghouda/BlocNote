import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  cin: string = '';
  errorMessage: string = ''; 

  constructor(private router: Router, private http: HttpClient) {}

  onRegister() {
    this.errorMessage = ''; 

    if (!this.email || !this.password || !this.confirmPassword || !this.cin) {
      alert('Please fill in all fields correctly!'); 
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.email)) {
      alert('Please enter a valid email address!'); 
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(this.password)) {
      alert('Password must be at least 8 characters long, include letters, numbers, and symbols!'); 
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!'); 
      return;
    }

    const cinRegex = /^\d{8}$/;
    if (!cinRegex.test(this.cin)) {
      alert('CIN must contain exactly 8 digits!'); 
      return;
    }

    this.http.post('http://localhost:3000/register', { 
      email: this.email,
      password: this.password,
      cin: this.cin
    })
      .subscribe({
        next: (response: any) => {
          alert(response.message);
          this.router.navigate(['/login']); 
        },
        error: (error: HttpErrorResponse) => { 
          console.error('Registration error:', error);
          this.errorMessage = 'An unexpected error occurred(cin used). Please try again later.'; 

          if (error.status === 400 && error.error.errors) {
            this.errorMessage = error.error.errors.map((err: { msg: any; }) => err.msg).join(', ');
          } else if (error.status === 400 && error.error.message) {
            this.errorMessage = error.error.message;
          }
          
        }
      });
  }
  }
