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
        <div class="form-group">
          <label for="height">Hauteur totale (cm)</label>
          <input id="height" type="number" formControlName="height">
        </div>
        <div class="form-group">
          <label for="armLength">Longueur de bras (cm)</label>
          <input id="armLength" type="number" formControlName="armLength">
        </div>
        <div class="form-group">
          <label for="neckCircumference">Tour de cou (cm)</label>
          <input id="neckCircumference" type="number" formControlName="neckCircumference">
        </div>
        <div class="form-group">
          <label for="backWidth">Largeur du dos (cm)</label>
          <input id="backWidth" type="number" formControlName="backWidth">
        </div>
        <div class="form-group">
          <label for="legLength">Longueur des jambes (cm)</label>
          <input id="legLength" type="number" formControlName="legLength">
        </div>
        <div class="form-group">
          <label for="thighCircumference">Tour de cuisse (cm)</label>
          <input id="thighCircumference" type="number" formControlName="thighCircumference">
        </div>
        <div class="form-group">
          <label for="ankleCircumference">Tour de cheville (cm)</label>
          <input id="ankleCircumference" type="number" formControlName="ankleCircumference">
        </div>
        <div class="form-group">
          <label for="wristCircumference">Tour de poignet (cm)</label>
          <input id="wristCircumference" type="number" formControlName="wristCircumference">
        </div>
        <div class="form-group">
          <label for="chestWidth">Largeur de poitrine (cm)</label>
          <input id="chestWidth" type="number" formControlName="chestWidth">
        </div>
        <div class="form-group">
          <label for="clavicleLength">Longueur de la clavicule (cm)</label>
          <input id="clavicleLength" type="number" formControlName="clavicleLength">
        </div>
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
      bust: [''],   // Tour de poitrine
      waist: [''],   // Tour de taille
      hips: [''],   // Tour de hanches
      height: [''],   // Hauteur totale
      armLength: [''],  // Longueur de bras
      neckCircumference: [''],  // Tour de cou
      backWidth: [''],  // Largeur du dos
      legLength: [''],  // Longueur des jambes
      thighCircumference: [''],  // Tour de cuisse
      ankleCircumference: [''],  // Tour de cheville
      wristCircumference: [''],  // Tour de poignet
      chestWidth: [''],  // Largeur de poitrine
      clavicleLength: [''],  // Longueur de la clavicule
      portfolio: [''],   // Portfolio pour le styliste
    });
  }
  getUserId(): number {
    // Cette fonction récupère l'ID du styliste depuis le stockage local (ajustez si nécessaire)
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.id || 0;  // Retourne un ID ou 0 si aucun utilisateur n'est trouvé
  }
  ngOnInit(): void {
    const id = this.getUserId();
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
    this.userService.getClientDetails(id).subscribe(
      (data) => {
        this.user = data.data;
        this.isStylist = this.user.user_type === 'stylist';

        this.profileForm.patchValue({
          bust: data.tour_poitrine,
          waist: data.tour_taille,
          hips: data.tour_hanches,
          height: data.hauteur_totale,
          armLength: data.longueur_bras,
          neckCircumference: data.tour_cou,
          backWidth: data.largeur_dos,
          legLength: data.longueur_jambe,
          thighCircumference: data.tour_cuisse,
          ankleCircumference: data.tour_cheville,
          wristCircumference: data.tour_poignet,
          chestWidth: data.largeur_poitrine,
          clavicleLength: data.longueur_clavicule,
        });
      },
      (error) => {
        console.error('Erreur lors du chargement des données du client :', error);
      }
    );


    
  }

  onSubmit() {
    if (this.profileForm.valid) {
      // Récupérer les données du formulaire
      const updatedData = this.profileForm.value;
  
      // Appeler le service BackendService pour envoyer les données au serveur
      /*this.userService.updateClientDetails(this.getUserId(), updatedData).subscribe(
        (response) => {
          // Si la mise à jour réussie, on met à jour le localStorage
          console.log('Données du client mises à jour avec succès :', response);
  
          // Mettre à jour les données du client dans le localStorage
          const updatedUser = { ...this.user, ...updatedData };
          localStorage.setItem('user', JSON.stringify(updatedUser));
  
          // Vous pouvez aussi rafraîchir le formulaire avec les nouvelles données
          this.profileForm.patchValue(updatedData);
  
          // Optionnel : afficher un message de succès ou rediriger l'utilisateur
          alert('Profil mis à jour avec succès');
        },
        (error) => {
          // En cas d'erreur
          console.error('Erreur lors de la mise à jour des données du client :', error);
          alert('Erreur lors de la mise à jour du profil');
        }
      );*/
    } else {
      // Si le formulaire est invalide
      alert('Veuillez vérifier les informations du formulaire.');
    }
  }
  
 
}
