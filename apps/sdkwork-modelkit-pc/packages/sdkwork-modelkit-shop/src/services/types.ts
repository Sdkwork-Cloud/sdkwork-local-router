import { Product, ProductCategory, ProductSku, CartItem, OrderHistoryItem as Order } from '../types';

export interface IShopService {
  getProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | null>;
  getCategories(): Promise<{ id: ProductCategory; name: string }[]>;
  
  getCart(): Promise<CartItem[]>;
  saveCart(cart: CartItem[]): Promise<void>;
  
  getOrders(): Promise<Order[]>;
  saveOrders(orders: Order[]): Promise<void>;
}
