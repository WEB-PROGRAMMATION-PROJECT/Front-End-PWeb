// order-history.component.ts
import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Commande} from '../../../Data/Commande';
import {CommandeStoreService} from '../../../Products/store/commande.store.service';
import {takeUntil} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  private destroy = inject(DestroyRef)
  commandes: Commande[] = [];
  filteredCommandes: Commande[] = [];
  currentFilter: string = 'all';

  constructor(private store: CommandeStoreService) {}

  statusFilters = [
    { label: 'Toutes', value: 'all' },
    { label: 'En attente', value: 'pending' },
    { label: 'En cours', value: 'in_progress' },
    { label: 'Terminées', value: 'completed' },
    { label: 'Annulées', value: 'cancelled' }
  ];

  ngOnInit() {
    this.store.getAllCommandes()
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe(data => {
        this.commandes = data;
        this.filteredCommandes = this.commandes;
        console.log('Commandes récupérées avec succès:', this.commandes);
      });
  }

  filterByStatus(status: string) {
    this.currentFilter = status;
    if (status === 'all') {
      this.filteredCommandes = this.commandes;
    } else {
      this.filteredCommandes = this.commandes.filter(commande => commande.status === status);
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
}
