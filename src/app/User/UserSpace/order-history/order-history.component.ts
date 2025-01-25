import { Order } from './../../../services/Order/order.service';
// order-history.component.ts
import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { OrderService } from '../../../services/Order/order.service';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  private destroy = inject(DestroyRef)
  commandes: Order[] = [];
  filteredCommandes: Order[] = [];
  currentFilter: string = 'all';


  statusFilters = [
    { label: 'Toutes', value: 'all' },
    { label: 'En attente', value: 'pending' },
    { label: 'En cours', value: 'in_progress' },
    { label: 'Terminées', value: 'completed' },
    { label: 'Annulées', value: 'cancelled' }
  ];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    const user = localStorage.getItem('user');

    if(user){
      const userData = JSON.parse(user);
      const userId = userData.id;

      this.orderService.getUserOrders(userId)
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe(data => {
        this.commandes = data;
        this.filteredCommandes = this.commandes;
        console.log('Commandes récupérées avec succès:', this.commandes);
      });
    } else {
      console.error('Veuillez vous connecter pour accéder à vos commandes.');
    }
  }

  filterByStatus(status: string) {
    this.currentFilter = status;
    if (status === 'all') {
      this.filteredCommandes = this.commandes;
    } else {
      this.filteredCommandes = this.commandes.filter(commande => commande.status === status);
    }
  }


  getStatusLabel(status: string | undefined): string { // status can be undefined
    const statusMap: { [key: string]: string } = {
      'pending': 'En attente',
      'in_progress': 'En cours',
      'completed': 'Terminée',
      'cancelled': 'Annulée'
    };
    return statusMap[status] || status;
  }
}
