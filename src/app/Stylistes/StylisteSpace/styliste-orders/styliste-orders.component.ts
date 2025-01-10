// styliste-orders.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Command {
  id: number;
  clientName: string;
  clientImage: string;
  modelName: string;
  modelImage: string;
  status: 'pending' | 'waitingPayment' | 'inProgress' | 'completed' | 'cancelled';
  orderDate: string;
  totalPrice?: number;
  expectedDeliveryDate?: string;
  measures?: {
    bust: number;
    waist: number;
    hips: number;
    height: number;
  };
  clientMessage?: string;
  modelReference: string;
}

@Component({
  selector: 'app-styliste-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './styliste-orders.component.html',
  styleUrls: ['./styliste-orders.component.scss']
})
export class StylisteOrdersComponent implements OnInit {
  orders: Command[] = [
    {
      id: 1,
      clientName: 'Sophie Martin',
      clientImage: 'https://via.placeholder.com/50',
      modelName: 'Robe de Soirée Élégante',
      modelImage: 'https://via.placeholder.com/150',
      status: 'pending',
      orderDate: '2024-01-08',
      modelReference: 'RS-2024-001',
      measures: {
        bust: 90,
        waist: 70,
        hips: 95,
        height: 165
      },
      clientMessage: 'J\'aimerais cette robe pour un mariage dans 2 mois.'
    },
    {
      id: 2,
      clientName: 'Marie Dupont',
      clientImage: 'https://via.placeholder.com/50',
      modelName: 'Tailleur Modern Chic',
      modelImage: 'https://via.placeholder.com/150',
      status: 'waitingPayment',
      orderDate: '2024-01-05',
      totalPrice: 450,
      modelReference: 'TC-2024-002',
      expectedDeliveryDate: '2024-02-05',
      measures: {
        bust: 88,
        waist: 68,
        hips: 92,
        height: 170
      }
    }
  ];

  selectedOrder: Command | null = null;
  priceInput: number | null = null;
  deliveryDateInput: string = '';

  constructor() {}

  ngOnInit() {
    // Ici on pourra plus tard charger les commandes depuis un service
  }

  getStatusLabel(status: Command['status']): string {
    const statusMap = {
      pending: 'En attente de validation',
      waitingPayment: 'En attente de paiement',
      inProgress: 'En cours de confection',
      completed: 'Terminée',
      cancelled: 'Annulée'
    };
    return statusMap[status];
  }

  getStatusClass(status: Command['status']): string {
    const statusClassMap = {
      pending: 'status-pending',
      waitingPayment: 'status-waiting',
      inProgress: 'status-progress',
      completed: 'status-completed',
      cancelled: 'status-cancelled'
    };
    return statusClassMap[status];
  }

  openOrderDetails(order: Command) {
    this.selectedOrder = order;
    this.priceInput = order.totalPrice || null;
    this.deliveryDateInput = order.expectedDeliveryDate || '';
  }

  validateOrder(order: Command) {
    if (!this.priceInput || !this.deliveryDateInput) {
      alert('Veuillez remplir tous les champs requis');
      return;
    }

    order.totalPrice = this.priceInput;
    order.expectedDeliveryDate = this.deliveryDateInput;
    order.status = 'waitingPayment';
    this.selectedOrder = null;
  }

  closeOrderDetails() {
    this.selectedOrder = null;
  }

  markAsCompleted(order: Command) {
    order.status = 'completed';
  }

  contactClient(order: Command) {
    // Implémentation de la fonction de contact (WhatsApp, etc.)
    console.log('Contacter le client:', order.clientName);
  }
}
