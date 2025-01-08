import { Routes } from '@angular/router';
import {StylisteProfileComponent} from './Stylistes/styliste-profile/styliste-profile.component';
import {AppComponent} from './app.component';
import {MainHomeComponent} from './Home/main-home/main-home.component';
import {DesignersPageComponent} from './Stylistes/designers-page/designers-page.component';
import {MeasurementGuideComponent} from './User/measurement-guide/measurement-guide.component';
import {UserSpaceComponent} from './User/UserSpace/user-space/user-space.component';
import {UserProfileComponent} from './User/UserSpace/user-profile/user-profile.component';
import {OrderHistoryComponent} from './User/UserSpace/order-history/order-history.component';
import {AddressesComponent} from './User/UserSpace/addresses/addresses.component';
import {ClothingModelsPageComponent} from './Products/clothing-models-page/clothing-models-page.component';
import {RegistrationComponent} from './Auth/registration/registration.component';
import {LoginComponent} from './Auth/login/login.component';
import {ModelDetailComponent} from './Products/model-detail/model-detail.component';
import {CheckoutComponent} from './Products/checkout/checkout.component';
import {AddModelComponentComponent} from './Stylistes/add-model-component/add-model-component.component';
import {PaymentReturnComponent} from './Products/payment-return/payment-return.component';
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige vers une page d'accueil par défaut
  { path: 'home', component: MainHomeComponent }, // Page d'accueil principale
  { path: 'styliste-profile', component: StylisteProfileComponent }, // Page styliste-profile
  { path: 'stylistes', component: DesignersPageComponent }, // Page des stylistes
  { path: 'mensurations', component: MeasurementGuideComponent }, // Page des mensurations
  { path: 'models', component: ClothingModelsPageComponent }, // Page des mensurations
  { path: 'register', component: RegistrationComponent }, // Page des inscriptions
  { path: 'login', component: LoginComponent }, // Page des inscriptions
  { path: 'detail', component: ModelDetailComponent }, // Page des inscriptions
  { path: 'checkout', component: CheckoutComponent }, // Page des inscriptions
  { path: 'add-model', component: AddModelComponentComponent}, // Page des inscriptions




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
  {
    path: 'payment/return',
    component: PaymentReturnComponent
  }
];

