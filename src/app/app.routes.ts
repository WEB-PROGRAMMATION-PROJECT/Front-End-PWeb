import { Routes } from '@angular/router';
import {StylisteProfileComponent} from './styliste-profile/styliste-profile.component';
import {AppComponent} from './app.component';
import {MainHomeComponent} from './Home/main-home/main-home.component';
import {DesignersPageComponent} from './designers-page/designers-page.component';
import {MeasurementGuideComponent} from './measurement-guide/measurement-guide.component';
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige vers une page d'accueil par défaut
  { path: 'home', component: MainHomeComponent }, // Page d'accueil principale
  { path: 'styliste-profile', component: StylisteProfileComponent }, // Page styliste-profile
  { path: 'stylistes', component: DesignersPageComponent }, // Page des stylistes
  { path: 'mensurations', component: MeasurementGuideComponent }, // Page des mensurations


  { path: '**', redirectTo: '/home' }, // Redirige toutes les routes inconnues vers l'accueil
];

