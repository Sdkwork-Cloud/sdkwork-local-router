export interface AppConfig {
  language: 'zh' | 'en';
  themeMode: 'light' | 'dark' | 'system';
  themeColor: string;
}

export interface IConfigService {
  getConfig(): Promise<AppConfig>;
  saveConfig(config: AppConfig): Promise<void>;
  getLanguage(): 'zh' | 'en';
  setLanguage(lang: 'zh' | 'en'): void;
  getThemeMode(): 'light' | 'dark' | 'system';
  setThemeMode(mode: 'light' | 'dark' | 'system'): void;
  getThemeColor(): string;
  setThemeColor(color: string): void;
}

export class LocalConfigService implements IConfigService {
  async getConfig(): Promise<AppConfig> {
    return Promise.resolve({
      language: this.getLanguage(),
      themeMode: this.getThemeMode(),
      themeColor: this.getThemeColor()
    });
  }

  async saveConfig(config: AppConfig): Promise<void> {
    this.setLanguage(config.language);
    this.setThemeMode(config.themeMode);
    this.setThemeColor(config.themeColor);
    return Promise.resolve();
  }

  getLanguage(): 'zh' | 'en' {
    if (typeof localStorage === 'undefined') return 'en';
    const saved = localStorage.getItem('modelkit_language');
    if (saved === 'zh' || saved === 'en') return saved;
    const navLang = navigator.language?.toLowerCase() || '';
    return navLang.includes('zh') ? 'zh' : 'en';
  }

  setLanguage(lang: 'zh' | 'en') {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('modelkit_language', lang);
    }
  }

  getThemeMode(): 'light' | 'dark' | 'system' {
    if (typeof localStorage === 'undefined') return 'system';
    const saved = localStorage.getItem('modelkit_theme_mode');
    if (saved === 'light' || saved === 'dark' || saved === 'system') return saved;
    const oldSaved = localStorage.getItem('modelkit_dark_mode');
    if (oldSaved === 'false') return 'light';
    if (oldSaved === 'true') return 'dark';
    return 'system';
  }

  setThemeMode(mode: 'light' | 'dark' | 'system') {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('modelkit_theme_mode', mode);
      localStorage.removeItem('modelkit_dark_mode');
    }
  }

  getThemeColor(): string {
    if (typeof localStorage === 'undefined') return 'blue';
    return localStorage.getItem('modelkit_theme_color') || 'blue';
  }

  setThemeColor(color: string) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('modelkit_theme_color', color);
    }
  }
}

export const configService = new LocalConfigService();
