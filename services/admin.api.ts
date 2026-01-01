
import { MOCK_PRODUCTS, MOCK_ORDERS } from '../constants';
import { Product, Order, DashboardStats } from '../types';

/**
 * Service for Admin API calls.
 * Centralized logic for dashboard, product management, and orders.
 */
export const adminApi = {
  /**
   * Fetch high-level dashboard metrics.
   */
  getDashboardStats: async (): Promise<DashboardStats> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      revenue: 2450.0,
      revenueChange: 12.5,
      ordersCount: 48,
      ordersChange: 5.2,
      pendingOrders: 3,
      bestSellingProduct: 'شيشة تفاحتين فاخر'
    };
  },

  /**
   * Fetch all orders for management.
   */
  getOrders: async (): Promise<Order[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return MOCK_ORDERS;
  },

  /**
   * Add or update a product.
   */
  saveProduct: async (product: Partial<Product>): Promise<Product> => {
    console.log('Saving product to database...', product);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      ...product,
      id: product.id || Math.random().toString(36).substr(2, 9),
      status: 'available'
    } as Product;
  },

  /**
   * Toggle product availability.
   */
  toggleProductStatus: async (productId: string, status: 'available' | 'unavailable'): Promise<boolean> => {
    console.log(`Toggling product ${productId} to ${status}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  }
};
