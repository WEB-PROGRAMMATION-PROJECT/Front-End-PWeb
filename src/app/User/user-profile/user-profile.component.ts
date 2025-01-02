// profile.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="profile-container">
      <h1>Mon Profil</h1>

      <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="profile-form">
        <div class="profile-header">
          <div class="profile-image">
            <img [src]="profileImage || 'test.jpg'" alt="Photo de profil">
            <button type="button" class="change-photo-btn">Changer la photo</button>
          </div>
        </div>

        <div class="form-group">
          <label for="firstName">Prénom</label>
          <input id="firstName" type="text" formControlName="firstName">
        </div>

        <div class="form-group">
          <label for="lastName">Nom</label>
          <input id="lastName" type="text" formControlName="lastName">
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email">
        </div>

        <div class="form-group">
          <label for="phone">Téléphone</label>
          <input id="phone" type="tel" formControlName="phone">
        </div>

        <div class="measurements-section">
          <h2>Mes Mesures</h2>
          <div class="measurements-grid">
            <div class="form-group">
              <label for="bust">Tour de poitrine (cm)</label>
              <input id="bust" type="number" formControlName="bust">
            </div>
            <div class="form-group">
              <label for="waist">Tour de taille (cm)</label>
              <input id="waist" type="number" formControlName="waist">
            </div>
            <div class="form-group">
              <label for="hips">Tour de hanches (cm)</label>
              <input id="hips" type="number" formControlName="hips">
            </div>
          </div>
        </div>

        <button type="submit" class="submit-btn">Enregistrer les modifications</button>
      </form>
    </div>
  `,
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  profileForm: FormGroup;
  profileImage: string | null = null;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      bust: [''],
      waist: [''],
      hips: ['']
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
      // Implement save logic here
    }
  }
}
