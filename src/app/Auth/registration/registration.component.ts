import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { TagInputModule } from 'ngx-chips';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxDropzoneModule, TagInputModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  userType: 'client' | 'stylist' = 'client';
  isPasswordVisible = false;
  files: File[] = [];
  specializations: string[] = ['Costumes', 'Robes de soirée', 'Tenues traditionnelles', 'Haute couture'];
  countries: string[] = ['France', 'Belgique', 'Suisse', 'Canada', 'Sénégal', 'Côte d\'Ivoire', 'Cameroun'];
  cities: { [key: string]: string[] } = {
    'France': ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Lille'],
    'Belgique': ['Bruxelles', 'Anvers', 'Liège', 'Gand'],
    // Ajoutez d'autres villes pour chaque pays
  };

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.createForm();
  }

  ngOnInit() {
    // Écouter les changements de pays pour mettre à jour les villes
    this.registrationForm.get('country')?.valueChanges.subscribe(country => {
      this.registrationForm.patchValue({
        city: ''
      });
    });

    // Validation du mot de passe en temps réel
    this.registrationForm.get('password')?.valueChanges.subscribe(password => {
      this.checkPasswordStrength(password);
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
      ]],
      confirmPassword: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s-]{8,}$/)]],
      specializations: [[]],
      description: [''],
      profilePhoto: [null],
      terms: [false, Validators.requiredTrue]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  checkPasswordStrength(password: string): { strength: number, feedback: string } {
    let strength = 0;
    const feedback = [];

    if (password.length >= 8) {
      strength += 1;
      feedback.push('Longueur suffisante');
    }
    if (/[A-Z]/.test(password)) {
      strength += 1;
      feedback.push('Contient une majuscule');
    }
    if (/[a-z]/.test(password)) {
      strength += 1;
      feedback.push('Contient une minuscule');
    }
    if (/[0-9]/.test(password)) {
      strength += 1;
      feedback.push('Contient un chiffre');
    }
    if (/[^A-Za-z0-9]/.test(password)) {
      strength += 1;
      feedback.push('Contient un caractère spécial');
    }

    return {
      strength: strength,
      feedback: feedback.join(', ')
    };
  }

  onSelect(event: any) {
    if (this.files.length === 0) {
      this.files.push(...event.addedFiles);
      const file = this.files[0];
      this.registrationForm.patchValue({
        profilePhoto: file
      });
    }
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.registrationForm.patchValue({
      profilePhoto: null
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      // Logique d'inscription
    }
  }

  getCities(): string[] {
    const country = this.registrationForm.get('country')?.value;
    return this.cities[country] || [];
  }
}
