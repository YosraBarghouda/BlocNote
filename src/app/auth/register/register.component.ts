import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Importer Router
import { AuthService } from '../../services/auth.service';  // Importer AuthService

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

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    // Vérification si tous les champs sont vides
    if (!this.email || !this.password || !this.confirmPassword || !this.cin) {
      alert('Please fill in all fields correctly!');
      return;
    }

    // Vérification de l'email
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.email)) {
      alert('Please enter a valid email address!');
      return;
    }

    // Vérification du mot de passe
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(this.password)) {
      alert('Password must be at least 8 characters long, include letters, numbers, and symbols!');
      return;
    }

    // Vérification des mots de passe correspondants
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Vérification du CIN
    if (!/^\d{8}$/.test(this.cin)) {
      alert('CIN must contain exactly 8 digits!');
      return;
    }

    // Si tout est valide, enregistrer l'utilisateur
    this.authService.register(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/login']);  // Rediriger vers la page de connexion
      },
      error: (error) => {
        alert('Error registering user, please try again.');
      }
    });
  }
}
