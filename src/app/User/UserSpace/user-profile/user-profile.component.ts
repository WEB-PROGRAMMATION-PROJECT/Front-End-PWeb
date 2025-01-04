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

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.profileForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      bust: [''],
      waist: [''],
      hips: ['']
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
}
