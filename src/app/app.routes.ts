import { Routes } from '@angular/router';
import {StylisteProfileComponent} from './styliste-profile/styliste-profile.component';
import {AppComponent} from './app.component';
import {MainHomeComponent} from './Home/main-home/main-home.component';
import {DesignersPageComponent} from './designers-page/designers-page.component';
import {MeasurementGuideComponent} from './measurement-guide/measurement-guide.component';
import {UserSpaceComponent} from './User/user-space/user-space.component';
import {UserProfileComponent} from './User/user-profile/user-profile.component';
import {OrderHistoryComponent} from './User/order-history/order-history.component';
import {AddressesComponent} from './User/addresses/addresses.component';
import {ClothingModelsPageComponent} from './clothing-models-page/clothing-models-page.component';
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige vers une page d'accueil par défaut
  { path: 'home', component: MainHomeComponent }, // Page d'accueil principale
  { path: 'styliste-profile', component: StylisteProfileComponent }, // Page styliste-profile
  { path: 'stylistes', component: DesignersPageComponent }, // Page des stylistes
  { path: 'mensurations', component: MeasurementGuideComponent }, // Page des mensurations
  { path: 'models', component: ClothingModelsPageComponent }, // Page des mensurations

  {
    path: 'user',
    component: UserSpaceComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
      {
        path: 'profile',
        component: UserProfileComponent,
        title: 'Mon Profil'
      },
      {
        path: 'orders',
        component: OrderHistoryComponent,
        title: 'Mes Commandes'
      },
      {
        path: 'addresses',
        component: AddressesComponent,
        title: 'Mes Adresses'
      }
    ]
  },

  { path: '**', redirectTo: '/home' }, // Redirige toutes les routes inconnues vers l'accueil
];

