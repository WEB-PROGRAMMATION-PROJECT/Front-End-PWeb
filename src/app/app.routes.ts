import { Routes } from '@angular/router';
import {StylisteProfileComponent} from './styliste-profile/styliste-profile.component';
import {AppComponent} from './app.component';
import {MainHomeComponent} from './Home/main-home/main-home.component';
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige vers une page d'accueil par défaut
  { path: 'home', component: MainHomeComponent }, // Page d'accueil principale
  { path: 'styliste-profile', component: StylisteProfileComponent }, // Page styliste-profile
  { path: '**', redirectTo: '/home' }, // Redirige toutes les routes inconnues vers l'accueil
];

