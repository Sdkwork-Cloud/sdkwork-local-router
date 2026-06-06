import { IAccountService, BillingInfo, PaymentMethod, ApiKey } from './interface';

export * from './interface';

let mockBilling: BillingInfo = {
  balance: 142.50,
  methods: [
    { id: 1, type: 'Visa', last4: '4242', expiry: '12/2026' }
  ]
};

let mockKeys: ApiKey[] = [
  { id: 1, name: 'Production App', prefix: 'sk-live-', last4: '8f92', created: 'Oct 2, 2024', lastUsed: '5 mins ago' },
  { id: 2, name: 'Local Dev Testing', prefix: 'sk-test-', last4: '3a1b', created: 'Nov 14, 2024', lastUsed: 'Yesterday' }
];

export class LocalAccountService implements IAccountService {
  async fetchBilling(): Promise<BillingInfo> {
    return new Promise((resolve) => setTimeout(() => resolve({ ...mockBilling }), 300));
  }

  async addFunds(amount: number): Promise<void> {
    mockBilling.balance += amount;
    return new Promise((resolve) => setTimeout(resolve, 500));
  }

  async redeemCode(code: string): Promise<boolean> {
    return new Promise((resolve) => setTimeout(() => {
      if (code === 'PROMO') {
        mockBilling.balance += 50;
        resolve(true);
      } else {
        resolve(false);
      }
    }, 400));
  }

  async addMethod(): Promise<void> {
    return new Promise((resolve) => setTimeout(() => {
      mockBilling.methods.push({ id: Date.now(), type: 'Mastercard', last4: '1234', expiry: '10/2028' });
      resolve();
    }, 500));
  }

  async removeMethod(id: number): Promise<void> {
    mockBilling.methods = mockBilling.methods.filter(m => m.id !== id);
    return new Promise((resolve) => setTimeout(resolve, 300));
  }

  async fetchKeys(): Promise<ApiKey[]> {
    return new Promise((resolve) => setTimeout(() => resolve([...mockKeys]), 300));
  }

  async createKey(name: string): Promise<ApiKey> {
    return new Promise((resolve) => setTimeout(() => {
      const newKey = {
         id: Date.now(),
         name,
         prefix: 'sk-test-',
         last4: Math.random().toString(36).substring(2, 6),
         created: 'Just now',
         lastUsed: 'Never'
      };
      mockKeys.push(newKey);
      resolve(newKey);
    }, 500));
  }

  async revokeKey(id: number): Promise<void> {
    mockKeys = mockKeys.filter(k => k.id !== id);
    return new Promise((resolve) => setTimeout(resolve, 300));
  }
}

export const BillingService = new LocalAccountService();
export const ApiKeyService = BillingService;

