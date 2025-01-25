export interface Commande {
  id: number;
  reference: string;
  client_id: number;
  styliste_id: number;
  modele_id: number;
  adresse_livraison_id: number;
  state: number;
  prix_total: number;
  date_commande: string;
  date_livraison_estimee?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  note?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  client: {
    id: number;
    first_name: string;
    tour_poitrine: number;
    tour_taille: number;
    tour_hanches: number;
    hauteur: number;
  };
  model: {
    id: number;
    name: string;
    image1: string;
  };
  totalPrice?: number;
  expectedDeliveryDate?: string;
}
