import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order, OrderService } from '../../../services/Order/order.service';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] | undefined; // Make orders optional
  filteredOrders: Order[] | undefined; // Make filteredOrders optional
  currentFilter: string = 'all';
  ordersLoading = true; // Add loading flag
  ordersError: string | null = null; // for error messages

  statusFilters = [
    { label: 'Toutes', value: 'all' },
    { label: 'En attente', value: 'pending' },
    { label: 'En cours', value: 'in_progress' },
    { label: 'Terminées', value: 'completed' },
    { label: 'Annulées', value: 'cancelled' }
  ];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.ordersLoading = true;
    this.ordersError = null; // Clear any previous errors
    this.orderService.getUserOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.filterOrders(this.currentFilter); // Filter after loading
      },
      error: (error) => {
        console.error("Error loading orders:", error);
        this.ordersError = "Une erreur s'est produite lors du chargement des commandes."; // Set error message
      },
      complete: () => {
        this.ordersLoading = false;
      }
    });
  }

  filterOrders(status: string) {
    this.currentFilter = status;
    if (this.orders) { // Check if orders is defined
      if (status === 'all') {
        this.filteredOrders = this.orders;
      } else {
        this.filteredOrders = this.orders.filter(order => order.status === status);
      }
    } else {
      this.filteredOrders = []; // Or undefined if you prefer
    }
  }


  getStatusLabel(status: string | undefined): string { // status can be undefined
    const statusMap: { [key: string]: string } = {
      'pending': 'En attente',
      'in_progress': 'En cours',
      'completed': 'Terminée',
      'cancelled': 'Annulée'
    };
    return status ? statusMap[status] || status : ""; // Handle undefined status
  }
}
