// addresses.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

interface Address {
  id: string;
  label: string;
  fullName: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="addresses-container">
      <div class="addresses-header">
        <h1>Mes Adresses</h1>
        <button class="add-address-btn" (click)="toggleAddressForm()">
          {{ showAddressForm ? 'Annuler' : 'Ajouter une adresse' }}
        </button>
      </div>

      <form *ngIf="showAddressForm" [formGroup]="addressForm" (ngSubmit)="onSubmit()" class="address-form">
        <div class="form-group">
          <label for="label">Nom de l'adresse</label>
          <input id="label" type="text" formControlName="label" placeholder="ex: Domicile, Bureau">
        </div>

        <div class="form-group">
          <label for="fullName">Nom complet</label>
          <input id="fullName" type="text" formControlName="fullName">
        </div>

        <div class="form-group">
          <label for="street">Adresse</label>
          <input id="street" type="text" formControlName="street">
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="city">Ville</label>
            <input id="city" type="text" formControlName="city">
          </div>

          <div class="form-group">
            <label for="postalCode">Code postal</label>
            <input id="postalCode" type="text" formControlName="postalCode">
          </div>
        </div>

        <div class="form-group">
          <label for="country">Pays</label>
          <input id="country" type="text" formControlName="country">
        </div>

        <div class="form-group">
          <label for="phone">Téléphone</label>
          <input id="phone" type="tel" formControlName="phone">
        </div>

        <div class="form-group checkbox">
          <label>
            <input type="checkbox" formControlName="isDefault">
            Définir comme adresse par défaut
          </label>
        </div>

        <button type="submit" class="submit-btn">Enregistrer l'adresse</button>
      </form>

      <div class="addresses-list">
        <div *ngFor="let address of addresses" class="address-card">
          <div class="address-content">
            <h3>{{ address.label }}</h3>
            <p>{{ address.fullName }}</p>
            <p>{{ address.street }}</p>
            <p>{{ address.postalCode }} {{ address.city }}</p>
            <p>{{ address.country }}</p>
            <p>{{ address.phone }}</p>
            <span *ngIf="address.isDefault" class="default-badge">Par défaut</span>
          </div>

          <div class="address-actions">
            <button class="edit-btn" (click)="editAddress(address)">Modifier</button>
            <button class="delete-btn" (click)="deleteAddress(address.id)">Supprimer</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {
  addresses: Address[] = [];
  showAddressForm = false;
  addressForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addressForm = this.fb.group({
      label: ['', Validators.required],
      fullName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', Validators.required],
      isDefault: [false]
    });
  }

  ngOnInit() {
    // Simuler des données d'adresses
    this.addresses = this.getMockAddresses();
  }

  toggleAddressForm() {
    this.showAddressForm = !this.showAddressForm;
    if (!this.showAddressForm) {
      this.addressForm.reset();
    }
  }

  onSubmit() {
    if (this.addressForm.valid) {
      console.log(this.addressForm.value);
      // Implement save logic here
      this.toggleAddressForm();
    }
  }

  editAddress(address: Address) {
    this.addressForm.patchValue(address);
    this.showAddressForm = true;
  }

  deleteAddress(id: string) {
    // Implement delete logic here
    console.log('Delete address', id);
  }

  private getMockAddresses(): Address[] {
    return [
      {
        id: '1',
        label: 'Domicile',
        fullName: 'Jean Dupont',
        street: '123 rue de Paris',
        city: 'Paris',
        postalCode: '75001',
        country: 'France',
        phone: '0123456789',
        isDefault: true
      }
      // Ajoutez plus d'adresses mock ici
    ];
  }
}
