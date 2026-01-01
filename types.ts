
export enum CategoryType {
  ALL = 'all',
  JUICES = 'juices',
  FRESH = 'fresh',
  SHISHA = 'shisha',
  HOT = 'hot',
  SOFT = 'soft'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: CategoryType;
  rating?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  status: 'available' | 'unavailable';
  metadata?: {
    calories?: number;
    prepTime?: string;
    origin?: string;
  };
}

export interface Order {
  id: string;
  customerName: string;
  total: number;
  status: 'pending' | 'preparing' | 'completed' | 'cancelled';
  time: string;
}

export interface DashboardStats {
  revenue: number;
  revenueChange: number;
  ordersCount: number;
  ordersChange: number;
  pendingOrders: number;
  bestSellingProduct: string;
}
