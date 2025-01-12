import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BackendService } from '../../services/backend.service'; // Import du service AuthService
import { Router } from '@angular/router';  // Pour la redirection après connexion
import * as bcrypt from 'bcryptjs'; // Import de bcryptjs

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isPasswordVisible = false;
  userType: 'client' | 'stylist' = 'client';

  constructor(
    private fb: FormBuilder,
    private authService: BackendService,  // Injection du service d'authentification
    private router: Router            // Injection du service Router pour la redirection
  ) {
    this.loginForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onUserTypeChange(type: 'client' | 'stylist') {
    this.userType = type;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
  
      // Afficher l'objet email et mot de passe dans la console
      console.log('Objet envoyé au backend :', { email, password });
    
      // Appel au service pour envoyer les informations au backend
      this.authService.login({ email, password }).subscribe(
        (response) => {
          console.log(response);
          // Si la connexion est réussie, enregistrez le token ou d'autres informations si nécessaire
          localStorage.setItem('auth_token', response.token);
          console.log('Connexion réussie', response);
          // Redirection en fonction du type d'utilisateur
          localStorage.setItem('user', JSON.stringify(response.user));

          this.redirectUser(response.user);
        },
        (error) => {
          // En cas d'erreur, afficher un message d'erreur
          console.error('Erreur de connexion', error);
          alert('Email ou mot de passe incorrect.');
        }
      );
    }
  }
  

  redirectUser(user: any) {
    // Vérifiez que vous utilisez la bonne propriété
    if (user.user_type === 'stylist') {
      this.router.navigate(['/user']);
    } else {
      this.router.navigate(['/user']);
    }
  }
  
}
