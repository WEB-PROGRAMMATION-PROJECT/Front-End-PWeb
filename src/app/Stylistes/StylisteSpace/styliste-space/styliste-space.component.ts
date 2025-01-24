import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router'; 
import { BackendService } from '../../../services/backend.service'; // Assurez-vous que le service est importé

interface StylisteInfo {
  id: number;
  nom: string;
  email: string;
  avatar: string;
  role: string;
  location: string;
  experience: number;
  collections: number;
  awards: number;
  rating: number;
  completedOrders: number;
}

@Component({
  selector: 'app-styliste-space',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './styliste-space.component.html',
  styleUrls: ['./styliste-space.component.css']
})
export class StylisteSpaceComponent implements OnInit {
  stylisteInfo: StylisteInfo = {
    id: 0,
    nom: '',
    email: '',
    avatar: '',
    role: '',
    location: '',
    experience: 0,
    collections: 0,
    awards: 0,
    rating: 0,
    completedOrders: 0
  };

  constructor(private router: Router,private backendService: BackendService) {}
  user: any;

  ngOnInit(): void {
    const stylistId = this.getUserId();  // Récupérer l'ID du styliste, par exemple, depuis le stockage local
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    this.user = userData;

    this.backendService.getStylistProfile(stylistId).subscribe(
      (data) => {
        this.stylisteInfo = {
          id: data.id,
          nom: `${this.user.first_name} ${this.user.last_name}`,
          email: this.user.email,
          avatar: `http://127.0.0.1:8000/storage/${data.profile_picture_url}`, // Assurez-vous de formater l'URL de l'image
          role: data.titre || 'Non spécifié',
          location: this.user.address || 'Non spécifiée',
          experience: data.experience || 0,
          collections: data.collections || 0,
          awards: data.awards || 0,
          rating: data.rating || 0,
          completedOrders: data.completed_orders || 0
        };
      },
      (error) => {
        console.error('Erreur lors de la récupération des données du styliste:', error);
      }
    );
  }

  getUserId(): number {
    // Cette fonction récupère l'ID du styliste depuis le stockage local (ajustez si nécessaire)
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.id || 0;  // Retourne un ID ou 0 si aucun utilisateur n'est trouvé
  }

  onLogout() {
    this.backendService.logout().subscribe(
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
