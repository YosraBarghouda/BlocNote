import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit(): void {
    if (this.email && this.password) {
      // Si le formulaire est valide, on navigue vers la page d'accueil
      this.router.navigate(['/notes']);
    } else {
      alert('Please fill in all fields correctly!');
    }
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
