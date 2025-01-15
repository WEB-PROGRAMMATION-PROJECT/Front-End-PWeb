import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../services/backend.service'; // Assurez-vous que ce service est bien importé
import { CommonModule } from '@angular/common';  // Ajout de CommonModule pour la directive *ngIf
import { ReactiveFormsModule } from '@angular/forms';  // Pour les formulaires réactifs

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],  // Ajout de CommonModule ici
  template: `
    <div class="profile-container">
      <h1>Mon Profil</h1>

      <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="profile-form">
        <!-- En-tête du profil -->
        <div class="profile-header">
          <div class="profile-image">
            <!-- Affichage de la photo de profil -->
            <img [src]="profileImage || 'test.jpg'" alt="Photo de profil">
            <button type="button" class="change-photo-btn" (click)="fileInput.click()">Changer la photo</button>
            <input #fileInput type="file" (change)="uploadProfilePicture($event)" hidden>
          </div>
        </div>

        <!-- Informations personnelles -->
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

        <!-- Section Mesures (uniquement pour les clients) -->
        <div class="measurements-section" *ngIf="!isStylist">
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

        <!-- Section Portfolio (uniquement pour les stylistes) -->
        <div class="portfolio-section" *ngIf="isStylist">
          <h2>Mon Portfolio</h2>
          <div class="form-group">
            <label for="portfolio">Lien du portfolio</label>
            <input id="portfolio" type="text" formControlName="portfolio">
          </div>
        </div>

        <button type="submit" class="submit-btn">Enregistrer les modifications</button>
      </form>
    </div>
  `,
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  profileImage: string | null = null;
  isStylist: boolean = false;
  user: any = null; // Contient les données de l'utilisateur connecté

  constructor(private fb: FormBuilder, private userService: BackendService) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      country: [''],
      city: [''],
      address: [''],
      bust: [''],   // Mesure du tour de poitrine
      waist: [''],   // Mesure du tour de taille
      hips: [''],   // Mesure du tour de hanches
      portfolio: [''],   // Portfolio pour le styliste
    });
  }

  ngOnInit(): void {
    // Charger les données depuis le localStorage
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (!userData || !userData.id) {
      // Rediriger vers la page de connexion si aucun utilisateur n'est trouvé
      window.location.href = '/login';
      return;
    }

    this.user = userData;
    this.isStylist = this.user.user_type === 'stylist';

    // Préremplir les données de base
    this.profileForm.patchValue({
      firstName: this.user.first_name,
      lastName: this.user.last_name,
      email: this.user.email,
      country: this.user.country,
      city: this.user.city,
      address: this.user.address,
    });

    if (this.isStylist) {
      // Charger les données spécifiques au styliste
      this.userService.getStylistDetails(this.user.id).subscribe(
        (data) => {
          // Assurez-vous que l'URL de l'image est correcte
          console.log(data.profile_picture_url);
          this.profileImage = data.profile_picture_url
            ? `http://127.0.0.1:8000/storage/${data.profile_picture_url}`
            : 'test.jpg';
          this.profileForm.patchValue({
            phone: data.phone_number,
            portfolio: data.portfolio_link,  // Lien du portfolio
          });
        },
        (error) => {
          console.error('Erreur lors du chargement des données stylistes :', error);
        }
      );
    } else {
      // Charger les données spécifiques aux clients (mesures)
      this.profileForm.patchValue({
        bust: this.user.bust,
        waist: this.user.waist,
        hips: this.user.hips,
      });
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
      // Logique pour enregistrer les modifications
    }
  }

  uploadProfilePicture(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('profile_picture', file);

      this.userService.uploadProfilePicture(formData).subscribe(
        (response) => {
          // Mettre à jour l'image de profil après l'upload réussi
          console.log(response.profile_picture_url);
          this.profileImage = `http://127.0.0.1:8000/storage/profile_pictures/${response.profile_picture_url}`;
        },
        (error) => {
          console.error('Erreur lors du téléchargement de l\'image :', error);
        }
      );
    }
  }
}