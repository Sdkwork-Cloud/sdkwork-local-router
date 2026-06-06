import { IUserService, UserProfileInfo } from './interface';

export * from './interface';

let mockProfile: UserProfileInfo = {
  name: "Dr. Alan Turing",
  email: "user@modelkit.ai",
  twoFactorEnabled: false,
  sessions: [
    { id: 1, device: "MacBook Pro M3", isCurrent: true, location: "Shanghai, China", time: "Active now" },
    { id: 2, device: "iPhone 15 Pro", isCurrent: false, location: "Beijing, China", time: "Last active 2h ago" }
  ],
  notifications: {
    billing: true,
    productUpdates: false
  }
};

export class LocalUserService implements IUserService {
  async fetchProfile(): Promise<UserProfileInfo> {
    return new Promise((resolve) => setTimeout(() => resolve({ ...mockProfile }), 300));
  }

  async updateProfile(data: Partial<UserProfileInfo>): Promise<UserProfileInfo> {
    mockProfile = { ...mockProfile, ...data };
    return new Promise((resolve) => setTimeout(() => resolve({ ...mockProfile }), 300));
  }

  async changePassword(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 500));
  }

  async revokeAllSessions(): Promise<void> {
    mockProfile.sessions = mockProfile.sessions.filter(s => s.isCurrent);
    return new Promise((resolve) => setTimeout(resolve, 400));
  }

  async revokeSession(id: number): Promise<void> {
    mockProfile.sessions = mockProfile.sessions.filter(s => s.id !== id);
    return new Promise((resolve) => setTimeout(resolve, 300));
  }

  async toggle2FA(enabled: boolean): Promise<void> {
    mockProfile.twoFactorEnabled = enabled;
    return new Promise((resolve) => setTimeout(resolve, 300));
  }

  async updateAvatar(file: any): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 600));
  }

  async changeEmail(newEmail: string): Promise<void> {
    mockProfile.email = newEmail;
    return new Promise((resolve) => setTimeout(resolve, 500));
  }
}

export const UserService = new LocalUserService();
