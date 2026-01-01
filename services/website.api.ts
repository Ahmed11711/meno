
import { MOCK_PRODUCTS } from '../constants';
import { Product, CategoryType } from '../types';

/**
 * Service for Website API calls.
 * Organized for easy replacement with actual fetch/axios calls in the future.
 */
export const websiteApi = {
  /**
   * Fetches all available products.
   */
  getProducts: async (category: CategoryType = CategoryType.ALL): Promise<Product[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (category === CategoryType.ALL) {
      return MOCK_PRODUCTS;
    }
    return MOCK_PRODUCTS.filter(p => p.category === category);
  },

  /**
   * Fetch specific product details.
   */
  getProductById: async (id: string): Promise<Product | undefined> => {
    return MOCK_PRODUCTS.find(p => p.id === id);
  },

  /**
   * Submit an order (Mock).
   */
  submitOrder: async (cartItems: any[]): Promise<{ success: boolean; orderId: string }> => {
    console.log('Submitting order with items:', cartItems);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, orderId: Math.floor(Math.random() * 9000 + 1000).toString() };
  }
};
