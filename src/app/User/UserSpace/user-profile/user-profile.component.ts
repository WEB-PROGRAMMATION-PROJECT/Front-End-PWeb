import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {UserInfo, UserService} from '../../../services/User/user.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  profileImage: string | null = null;
  isStylist: boolean = false;
  user: any = null; // Contient les données de l'utilisateur connecté

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.profileForm = this.fb.group({
      firstName: [''],
      lastName: [''],
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
    this.loadUserInfo();
  }
  userId=1;

  loadUserInfo(): void {
    this.userService.getUserInfo(this.userId).subscribe({
      next: (userInfo: UserInfo) => {
        // Préremplir les champs du formulaire avec les données de userInfo
        this.profileForm.patchValue({
          firstName: userInfo.firstName || '',
          lastName: userInfo.lastName || '',
          email: userInfo.email || '',
          phone: userInfo.phone || '',
          bust: userInfo.bust || '',
          waist: userInfo.waist || '',
          hips: userInfo.hips || ''
        });
      },
      error: (err) => {
        console.error('Erreur lors du chargement des données utilisateur :', err);
      }
    });
  }
  onSubmit(): void {
    if (this.profileForm.valid) {
      const updatedUserInfo = this.profileForm.value;
      console.log("valeurs du formulaire", updatedUserInfo);

      // Enregistrer les modifications via le service
      this.userService.updateUserInfo(updatedUserInfo).subscribe({
        next: () => {
          console.log('Les modifications ont été enregistrées avec succès !');
          alert('Profil mis à jour avec succès.');
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du profil :', err);
          alert('Une erreur est survenue. Veuillez réessayer.');
        }
      });
    } else {
      alert('Veuillez remplir tous les champs requis correctement.');
    }
  }

  // uploadProfilePicture(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     const file = input.files[0];
  //     const formData = new FormData();
  //     formData.append('profile_picture', file);

  //     this.userService.uploadProfilePicture(formData).subscribe(
  //       (response) => {
  //         // Mettre à jour l'image de profil après l'upload réussi
  //         console.log(response.profile_picture_url);
  //         this.profileImage = `http://127.0.0.1:8000/storage/profile_pictures/${response.profile_picture_url}`;
  //       },
  //       (error) => {
  //         console.error('Erreur lors du téléchargement de l\'image :', error);
  //       }
  //     );
  //   }
  // }
}
