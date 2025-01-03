// model.interface.ts
export interface ModelImage {
  url: string;
  alt: string;
  isCover: boolean;
}

export interface PriceRange {
  min: number;
  max: number;
  currency: string;
}

export interface TimeEstimate {
  min: number;
  max: number;
  unit: 'jours' | 'semaines';
}

export interface Material {
  name: string;
  description: string;
  quantity?: string;
}

export interface Designer {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  completedOrders: number;
  experience: number;
  responseTime: string;
  whatsapp: string;
  bio: string;
  specialties: string[];
}

export interface FashionModel {
  id: string;
  name: string;
  description: string;
  story: string;
  images: ModelImage[];
  approximatePrice: PriceRange;
  estimatedTime: TimeEstimate;
  materials: Material[];
  designer: Designer;
  styles: string[];
  category: string;
  createdAt: string;
  status: 'available' | 'in_progress' | 'sold';
}

export const SAMPLE_MODEL: FashionModel = {
  id: 'model-001',
  name: 'Robe de Soirée Élégante',
  description: 'Une création unique alliant modernité et élégance traditionnelle',
  story: 'Inspirée des motifs traditionnels africains et réinventée avec une touche contemporaine, cette robe représente la fusion parfaite entre héritage et modernité.',
  images: [
    { url: 'modelLarge.jpg', alt: 'Vue frontale de la robe', isCover: true },
    { url: 'modelLarge.jpg', alt: 'Vue de dos', isCover: false },
    { url: 'model2.jpg', alt: 'Détails des finitions', isCover: false }
  ],
  approximatePrice: {
    min: 75000,
    max: 150000,
    currency: 'XAF'
  },
  estimatedTime: {
    min: 2,
    max: 3,
    unit: 'semaines'
  },
  materials: [
    {
      name: 'Soie Naturelle',
      description: 'Tissu principal, doux et élégant'
    },
    {
      name: 'Dentelle',
      description: 'Pour les finitions et détails'
    }
  ],
  designer: {
    id: 'designer-001',
    name: 'Marie Kouam',
    avatar: 'testMini.jpg',
    rating: 4.8,
    completedOrders: 127,
    experience: 8,
    responseTime: '< 24h',
    whatsapp: '+237600000000',
    bio: 'Passionnée de mode depuis plus de 8 ans',
    specialties: ['Robes de soirée', 'Tenues traditionnelles']
  },
  styles: ['Moderne', 'Élégant', 'Traditionnel'],
  category: 'Robes de soirée',
  createdAt: '2024-01-02',
  status: 'available'
};
