import { IShopService } from './types';
import { INITIAL_PRODUCTS } from '../components/ShopData';
import { Product, ProductCategory, CartItem, OrderHistoryItem as Order } from '../types';

export interface SidebarRecommendations {
  newArrivals: { icon: string; title: string; desc: string }[];
  hottest: { icon: string; title: string; desc: string }[];
  recommended: { icon: string; title: string; desc: string }[];
}

export class LocalShopService implements IShopService {
  async getProducts(): Promise<Product[]> {
    return Promise.resolve([...INITIAL_PRODUCTS]);
  }

  async getSidebarRecommendations(): Promise<SidebarRecommendations> {
    return Promise.resolve({
      newArrivals: [
        { icon: '📱', title: 'iPhone 15 Pro Max', desc: 'Titanium Frame New' },
        { icon: '🎧', title: 'Sony WH-1000XM5', desc: 'Flagship ANC Headphone' },
        { icon: '📱', title: 'Samsung Z Fold 5', desc: 'New Foldable Era' },
        { icon: '👓', title: 'Apple Vision Pro', desc: 'Spatial Computing' },
        { icon: '🎧', title: 'Bose QC Ultra Earbuds', desc: 'Immersive Spatial Audio' },
        { icon: '📱', title: 'Xiaomi 14 Pro', desc: 'Leica Optics' },
        { icon: '🎧', title: 'Sennheiser Momentum 4', desc: 'Audiophile grade' }
      ],
      hottest: [
        { icon: '📱', title: 'Huawei Mate 60 Pro', desc: 'Innovative & Hot' },
        { icon: '🎧', title: 'AirPods Pro 2', desc: 'Best Seller ANC' },
        { icon: '📱', title: 'iPhone 15', desc: 'Dynamic Island' },
        { icon: '📱', title: 'Redmi K70', desc: 'Performance King' },
        { icon: '🎧', title: 'Beats Studio Pro', desc: 'Trendy Hardware' },
        { icon: '📱', title: 'OnePlus 12', desc: '10th Anniversary' },
        { icon: '🎧', title: 'Sony WF-1000XM5', desc: 'Earbud Flagship' }
      ],
      recommended: [
        { icon: '📱', title: 'Samsung Galaxy S24 Ultra', desc: 'AI Phone Flagship' },
        { icon: '🎧', title: 'Bose QC Ultra', desc: 'Ultimate Comfort' },
        { icon: '📱', title: 'Google Pixel 8 Pro', desc: 'Android & AI' },
        { icon: '🎧', title: 'AirPods Max', desc: 'Hi-Fi Audio' },
        { icon: '📱', title: 'Vivo X100 Pro', desc: 'Zeiss optics' },
        { icon: '🎧', title: 'Nothing Ear (2)', desc: 'Transparent Design' },
        { icon: '📱', title: 'Oppo Find X7 Ultra', desc: 'Dual Periscope' }
      ]
    });
  }

  async getProductById(id: string): Promise<Product | null> {
    const p = INITIAL_PRODUCTS.find(p => p.id === id);
    return Promise.resolve(p || null);
  }

  async getCategories(): Promise<{ id: ProductCategory; name: string }[]> {
    return Promise.resolve([
      { id: 'all', name: 'All Products' },
      { id: 'api-credits', name: 'Digital Assets / API' },
      { id: 'keys', name: 'Licenses / Keys' },
      { id: 'hardware', name: 'Hardware / Gadgets' },
      { id: 'merchandise', name: 'Merchandise / Peripherals' },
    ]);
  }

  async getCart(): Promise<CartItem[]> {
    const saved = localStorage.getItem('modelkit_shop_cart');
    if (saved) {
      try { return Promise.resolve(JSON.parse(saved)); } catch (e) {}
    }
    return Promise.resolve([]);
  }

  async saveCart(cart: CartItem[]): Promise<void> {
    localStorage.setItem('modelkit_shop_cart', JSON.stringify(cart));
    return Promise.resolve();
  }

  async getOrders(): Promise<Order[]> {
    const saved = localStorage.getItem('modelkit_shop_orders');
    if (saved) {
      try { return Promise.resolve(JSON.parse(saved)); } catch (e) {}
    }
    return Promise.resolve([]);
  }

  async saveOrders(orders: Order[]): Promise<void> {
    localStorage.setItem('modelkit_shop_orders', JSON.stringify(orders));
    return Promise.resolve();
  }
}

export const shopService = new LocalShopService();
