import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';  
import { BackendService } from '../../../services/backend.service';

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string; // Remplacer avatar par profileImage
}

@Component({
  selector: 'app-user-space',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="user-space-container">
      <!-- Sidebar -->
      <aside class="sidebar">
        <!-- User Profile Summary -->
        <div class="user-summary">
          <div class="avatar-container">
            <img [src]="userInfo.profileImage || 'test.jpg'" [alt]="userInfo.firstName" class="user-avatar">
            <div class="online-status"></div>
          </div>
          <div class="user-info">
            <h3 class="user-name">{{ userInfo.firstName }} {{ userInfo.lastName }}</h3>
            <p class="user-email">{{ userInfo.email }}</p>
          </div>
        </div>
<!-- Navigation -->
        <nav class="navigation">
          <ul class="nav-links">
            <li>
              <a routerLink="./profile" routerLinkActive="active" class="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>Mon Profil</span>
              </a>
            </li>
            <li>
              <a routerLink="./orders" routerLinkActive="active" class="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <span>Mes Commandes</span>
              </a>
            </li>
            <li>
              <a routerLink="./addresses" routerLinkActive="active" class="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>Mes Adresses</span>
              </a>
            </li>
          </ul>
        </nav>

        <!-- Quick Actions -->
        <div class="quick-actions">
          <button class="action-button support-button">
            <svg xmlns="http://www.w3.org/2000/svg" class="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            Support
          </button>
          <button class="action-button logout-button" (click)="onLogout()">
            <svg xmlns="http://www.w3.org/2000/svg" class="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Déconnexion
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="content">
        <!-- Breadcrumb -->
        <div class="breadcrumb">
          <span class="breadcrumb-item">Mon Espace</span>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-item active">Profil</span>
        </div>

        <!-- Content Area -->
        <div class="content-area">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styleUrls: ['./user-space.component.scss']
})
export class UserSpaceComponent implements OnInit {
  userInfo: UserInfo = {
    firstName: '',
    lastName: '',
    email: '',
    profileImage: ''  // Remplacer avatar par profileImage
  };

  user: any;
  isStylist: boolean = false;

  constructor(private router: Router, private userService: BackendService) {}

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
    this.userInfo = {
      firstName: this.user.first_name,
      lastName: this.user.last_name,
      email: this.user.email,
      profileImage: '' // Par défaut, aucune image de profil
    };

    if (this.isStylist) {
      // Charger les données spécifiques au styliste
      this.userService.getStylistDetails(this.user.id).subscribe(
        (data) => {
          // Assurez-vous que l'URL de l'image est correcte
          console.log(data.profile_picture_url);
          this.userInfo.profileImage = data.profile_picture_url
            ? `http://127.0.0.1:8000/storage/${data.profile_picture_url}`
            : `test.jpg` ;
        
        },
        (error) => {
          console.error('Erreur lors du chargement des données stylistes :', error);
        }
      );
    } else {
     
      
    }
  }
  onLogout() {
    this.userService.logout().subscribe(
      () => {
        // Rediriger l'utilisateur après la déconnexion
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Erreur lors de la déconnexion :', error);
      }
    );
  }
  
}
