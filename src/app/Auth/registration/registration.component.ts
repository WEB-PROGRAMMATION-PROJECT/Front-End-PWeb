import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { TagInputModule } from 'ngx-chips';
import { BackendService } from '../../services/backend.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


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
  countries: string[] = ['France', 'Belgique', 'Suisse', 'Canada', 'Sénégal', 'Côte d\'Ivoire', 'Cameroun', 'États-Unis', 'Royaume-Uni', 'Allemagne', 'Espagne', 'Italie', 'Portugal', 'Maroc', 'Afrique du Sud', 'Brésil', 'Australie'];

  cities: { [key: string]: string[] } = {
    'France': ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Lille', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier'],
    'Belgique': ['Bruxelles', 'Anvers', 'Liège', 'Gand', 'Charleroi', 'Bruges', 'Namur', 'Louvain'],
    'Suisse': ['Genève', 'Zurich', 'Lausanne', 'Berne', 'Bâle', 'Lucerne', 'Lugano'],
    'Canada': ['Montréal', 'Toronto', 'Vancouver', 'Québec', 'Ottawa', 'Calgary', 'Edmonton', 'Winnipeg'],
    'Sénégal': ['Dakar', 'Saint-Louis', 'Thiès', 'Ziguinchor', 'Touba', 'Kaolack', 'Mbour', 'Kolda'],
    'Côte d\'Ivoire': ['Abidjan', 'Yamoussoukro', 'Bouaké', 'Daloa', 'San Pedro', 'Korhogo', 'Man', 'Gagnoa'],
    'Cameroun': ['Douala', 'Yaoundé', 'Garoua', 'Maroua', 'Bafoussam', 'Bamenda', 'Ngaoundéré'],
    'États-Unis': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego'],
    'Royaume-Uni': ['Londres', 'Manchester', 'Birmingham', 'Glasgow', 'Liverpool', 'Bristol', 'Edimbourg', 'Leeds'],
    'Allemagne': ['Berlin', 'Munich', 'Francfort', 'Hambourg', 'Cologne', 'Stuttgart', 'Düsseldorf', 'Dresde'],
    'Espagne': ['Madrid', 'Barcelone', 'Valence', 'Séville', 'Bilbao', 'Saragosse', 'Malaga', 'Grenade'],
    'Italie': ['Rome', 'Milan', 'Naples', 'Turin', 'Florence', 'Bologne', 'Venise', 'Palerme'],
    'Portugal': ['Lisbonne', 'Porto', 'Braga', 'Coimbra', 'Faro', 'Funchal', 'Aveiro'],
    'Maroc': ['Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Meknès', 'Oujda'],
    'Afrique du Sud': ['Johannesburg', 'Le Cap', 'Durban', 'Pretoria', 'Port Elizabeth', 'Bloemfontein', 'East London'],
    'Brésil': ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza', 'Belo Horizonte', 'Manaus'],
    'Australie': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adélaïde', 'Canberra', 'Hobart', 'Darwin']
  };

  successMessage: string | null = null;
  errorMessage: string | null = null;
  error: string[] = [];

  constructor(private backend: BackendService, private fb: FormBuilder, private router: Router ) {
    this.registrationForm = this.createForm();
  }

  ngOnInit() {
    this.registrationForm.get('userType')?.valueChanges.subscribe((type) => {
      this.toggleStylistFields(type === 'stylist');
    });

    this.registrationForm.get('country')?.valueChanges.subscribe(() => {
      this.registrationForm.patchValue({ city: '' });
    });

    this.registrationForm.get('password')?.valueChanges.subscribe(password => {
      this.checkPasswordStrength(password);
    });
  }

  onUserTypeChange(type: 'client' | 'stylist') {
    this.userType = type;
    this.registrationForm.patchValue({ userType: type });
    this.toggleStylistFields(type === 'stylist');
  }

  createForm(): FormGroup {
    return this.fb.group({
      userType: [this.userType],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      phone_number: [''],
      specializations: [[]],
      description: [''],
      profile_picture_url: [null],
      terms: [false, Validators.requiredTrue],
      // Champs pour le client
      tourPoitrine: [''],
      tourTaille: [''],
      tourHanches: [''],
      hauteurTotale: [''],
      longueurBras: [''],
      tourCou: [''],
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
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
      this.registrationForm.patchValue({ profile_picture_url: file });
    }
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.registrationForm.patchValue({ profile_picture_url: null });
  }

  toggleStylistFields(enable: boolean) {
    const controls = ['phone_number', 'specializations', 'description', 'profile_picture_url'];
    controls.forEach(controlName => {
      const control = this.registrationForm.get(controlName);
      if (enable) {
        control?.setValidators(Validators.required);
        control?.enable();
      } else {
        control?.clearValidators();
        control?.disable();
      }
      control?.updateValueAndValidity();
    });
  }

  getCities(): string[] {
    const country = this.registrationForm.get('country')?.value;
    return this.cities[country] || [];
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = new FormData();
  
      // Ajouter les champs du formulaire
      formData.append('first_name', this.registrationForm.get('firstName')?.value);
      formData.append('last_name', this.registrationForm.get('lastName')?.value);
      formData.append('email', this.registrationForm.get('email')?.value);
      formData.append('password', this.registrationForm.get('password')?.value);
      formData.append('password_confirmation', this.registrationForm.get('confirmPassword')?.value);
      formData.append('country', this.registrationForm.get('country')?.value);
      formData.append('city', this.registrationForm.get('city')?.value);
      formData.append('address', this.registrationForm.get('address')?.value);
      formData.append('user_type', this.registrationForm.get('userType')?.value);
      const termsAccepted = this.registrationForm.get('terms')?.value ? 1 : 0;
      formData.append('terms_accepted', termsAccepted.toString());

  
      // Si l'utilisateur est un styliste, ajouter des champs supplémentaires
      if (this.userType === 'stylist') {
        formData.append('phone_number', this.registrationForm.get('phone_number')?.value);
        const specializations = JSON.stringify(this.registrationForm.get('specializations')?.value);
        formData.append('specializations', specializations);
        
        formData.append('description', this.registrationForm.get('description')?.value);
        // Ajouter le fichier profile_picture_url si disponible
        if (this.files.length > 0) {
          formData.append('profile_picture_url', this.files[0], this.files[0].name);
        }
      }
  
      // Afficher les données dans la console avant d'envoyer la requête
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });
  
      // Envoi des données via le backend
      this.backend.registration(formData).subscribe(
        data => {
          console.log('Inscription réussie', data);
          if (this.userType === 'stylist') {
            this.router.navigate(['/login']);
          } else {
            this.router.navigate(['/login']);
          }
        },
        error => this.handleErrors(error)
      );
    } else {
      console.log('Le formulaire est invalide');
    }
  }
  
  
  handleErrors(error: HttpErrorResponse) {
    if (error.status === 400) {
      this.errorMessage = 'Erreur de validation : ' + (error.error.message || 'Veuillez vérifier vos données.');
    } else if (error.status === 500) {
      this.errorMessage = 'Erreur serveur. Veuillez réessayer plus tard.';
    } else if (error.status === 422 && error.error?.errors) {
      const errorMessages = Object.values(error.error.errors).flat(); // Conversion des erreurs en tableau
      this.errorMessage = 'Erreurs de validation : ' + errorMessages.join(', ');
    } else {
      this.errorMessage = 'Une erreur inconnue est survenue.';
    }
    console.error('Erreur:', error);
  }
  
}
