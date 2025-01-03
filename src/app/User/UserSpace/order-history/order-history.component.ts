// order-history.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Order {
  id: string;
  date: Date;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  items: Array<{
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  total: number;
  styliste: string;
}

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="orders-container">
      <h1>Mes Commandes</h1>

      <div class="orders-filter">
        <button
          *ngFor="let filter of statusFilters"
          [class.active]="currentFilter === filter.value"
          (click)="filterOrders(filter.value)"
          class="filter-btn">
          {{ filter.label }}
        </button>
      </div>

      <div class="orders-list">
        <div *ngFor="let order of filteredOrders" class="order-card">
          <div class="order-header">
            <div class="order-info">
              <h3>Commande #{{ order.id }}</h3>
              <span class="order-date">{{ order.date | date:'dd/MM/yyyy' }}</span>
            </div>
            <span class="order-status" [class]="order.status">
              {{ getStatusLabel(order.status) }}
            </span>
          </div>

          <div class="order-items">
            <div *ngFor="let item of order.items" class="order-item">
              <img [src]="item.image" [alt]="item.name">
              <div class="item-details">
                <h4>{{ item.name }}</h4>
                <p>Quantité: {{ item.quantity }}</p>
                <p class="item-price">{{ item.price | currency:'EUR' }}</p>
              </div>
            </div>
          </div>

          <div class="order-footer">
            <div class="styliste-info">
              <p>Styliste: {{ order.styliste }}</p>
            </div>
            <div class="order-total">
              <p>Total: <strong>{{ order.total | currency:'EUR' }}</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  currentFilter: string = 'all';

  statusFilters = [
    { label: 'Toutes', value: 'all' },
    { label: 'En attente', value: 'pending' },
    { label: 'En cours', value: 'in_progress' },
    { label: 'Terminées', value: 'completed' },
    { label: 'Annulées', value: 'cancelled' }
  ];

  ngOnInit() {
    // Simuler des données de commande
    this.orders = this.getMockOrders();
    this.filteredOrders = this.orders;
  }

  filterOrders(status: string) {
    this.currentFilter = status;
    if (status === 'all') {
      this.filteredOrders = this.orders;
    } else {
      this.filteredOrders = this.orders.filter(order => order.status === status);
    }
  }

  getStatusLabel(status: string): string {
    const statusMap: { [key: string]: string } = {
      'pending': 'En attente',
      'in_progress': 'En cours',
      'completed': 'Terminée',
      'cancelled': 'Annulée'
    };
    return statusMap[status] || status;
  }

  private getMockOrders(): Order[] {
    return [
      {
        id: 'CMD001',
        date: new Date(),
        status: 'in_progress',
        items: [
          {
            name: 'Robe sur mesure',
            price: 150,
            quantity: 1,
            image: 'test.jpg'
          }
        ],
        total: 150,
        styliste: 'Marie Dubois'
      },
      // Ajoutez plus de commandes mock ici
    ];
  }
}
