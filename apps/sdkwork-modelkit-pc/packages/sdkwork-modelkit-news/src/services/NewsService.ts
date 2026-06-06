import { Article, BannerInfo, HotArticle, INewsService, NewsCategory, SeebugPaper } from './types';

const mockCategories: NewsCategory[] = [
  { id: 'home', name: 'Home' },
  { id: 'international', name: 'International' },
  { id: 'hacker', name: 'Hacker Events' },
  { id: 'vulnerability', name: 'Vulnerabilities' },
  { id: 'recommended', name: 'Recommended' },
  { id: 'leak', name: 'Data Leaks' },
  { id: 'daily', name: 'Daily Push' }
];

const mockArticles: Article[] = [
  {
    id: 1,
    title: "Hackers Exploit Burst Statistics WordPress Plugin Authentication Bypass Vulnerability",
    excerpt: "Hackers are exploiting a critical authentication bypass vulnerability in the WordPress Burst Statistics plugin to gain admin-level access. Burst Statistics is a privacy-focused analytics plugin used on 200,000 WordPress sites, promoted as a lightweight Google Analytics alternative. Tracked as CVE-2026-...",
    content: "In this recently disclosed incident, attackers bypassed the system's frontend detection rules through sophisticated cloaking, directly reaching the backend's core vulnerable services. The extent of the affected networks is still under evaluation... Extremely dangerous and highly stealthy.",
    author: "hackernews",
    date: "2026-05-15",
    category: "Vulnerabilities",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 2,
    title: "OpenAI Confirms Security Breach in TanStack Supply Chain Attack",
    excerpt: "OpenAI stated that in the recent TanStack supply chain attack affecting hundreds of npm and PyPI packages, two employees' devices were compromised. As a precaution, the company has rotated its application code signing certificates...",
    content: "In response to a series of high-risk supply chain security incidents recently, major tech giants have strengthened internal audits and access control measures. This confirmed vulnerability highlights the fragility of dependency management in modern software development...",
    author: "hackernews",
    date: "2026-05-15",
    category: "Vulnerabilities",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 3,
    title: "Ghostwriter Uses Geofenced PDF Phishing and Blue Drill to Target Ukrainian Government",
    excerpt: "The Belarus-linked threat group Ghostwriter has been accused of launching a new series of attacks against Ukrainian government organizations. Ghostwriter has been active since at least 2016 and is linked to cyber espionage and influence operations targeting neighboring countries...",
    author: "hackernews",
    date: "2026-05-15",
    category: "International, Hacker Events",
    image: "https://images.unsplash.com/photo-1510511459012-9d392094c965?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 4,
    title: "Cisco Catalyst SD-WAN Controller Auth Bypass Vulnerability Actively Exploited for Admin Privileges",
    excerpt: "Cisco released an update to fix a maximum-severity authentication bypass vulnerability in the Catalyst SD-WAN controller, stating the exploit has been used in limited attacks. The vulnerability, CVE-2026-20182, has a CVSS score of 10.0...",
    author: "hackernews",
    date: "2026-05-15",
    category: "Vulnerabilities",
    image: "https://images.unsplash.com/photo-1614064641913-6b1a2083db1a?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 5,
    title: "New Fragnesia Vulnerability: Linux Kernel LPE via Page Cache Corruption Affords Root",
    excerpt: "Security researchers disclosed a new Linux kernel exploit methodology dubbed Fragnesia. It allows a local attacker to bypass existing security mechanisms via crafted memory fragmentation and page cache collisions, ultimately gaining root on most distributions...",
    author: "hackernews",
    date: "2026-05-14",
    category: "Vulnerabilities",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=400"
  }
];

const mockHotArticles: HotArticle[] = [
  { id: 1, title: "Hackers Exploit Burst Statistics WordPress Plugin Authentication Bypass Vulnerability", views: 877 },
  { id: 2, title: "OpenAI Confirms Security Breach in TanStack Supply Chain Attack", views: 885 },
  { id: 3, title: "Ghostwriter Uses Geofenced PDF Phishing and Blue Drill to Target Ukrainian Government", views: 859 },
  { id: 4, title: "Cisco Catalyst SD-WAN Controller Auth Bypass Vulnerability Actively Exploited for Admin Privileges", views: 852 },
  { id: 5, title: "New Fragnesia Vulnerability: Linux Kernel LPE via Page Cache Corruption Affords Root", views: 836 },
];

const mockSeebugPapers: SeebugPaper[] = [
  { id: 101, title: "GLIGuard: A Schema-Conditioned Classification Approach for LLM Security", date: "05-11" },
  { id: 102, title: "A Systematic Survey on LLM Agent Security Threats and Defenses: Tiered Attack Surface Framework", date: "05-09" },
  { id: 103, title: "ReTokSync: Self-Synchronizing Token Disambiguation for Generative LM Continuation", date: "05-08" },
  { id: 104, title: "Prime Field PINI: Machine-Verified Composition Theorems for Post-Quantum NTT Masking", date: "05-06" },
  { id: 105, title: "Google DeepMind: The AI Agent Trap", date: "04-24" },
];

export class LocalNewsService implements INewsService {
  async getCategories(): Promise<NewsCategory[]> {
    return Promise.resolve(mockCategories);
  }

  async getArticles(categoryName: string): Promise<Article[]> {
    // In a real app, filter by categoryName. Here we just return mockArticles,
    // or maybe filter if the category isn't 'Home'.
    if (categoryName === 'Home') {
      return Promise.resolve([...mockArticles]); // Return all for home
    }
    const filtered = mockArticles.filter(a => a.category.includes(categoryName));
    return Promise.resolve(filtered.length > 0 ? filtered : mockArticles);
  }

  async getArticleById(id: number): Promise<Article | null> {
    const article = mockArticles.find(a => a.id === id);
    return Promise.resolve(article || null);
  }

  async getHotArticles(): Promise<HotArticle[]> {
    // Sort by views descending
    const sorted = [...mockHotArticles].sort((a, b) => b.views - a.views);
    return Promise.resolve(sorted);
  }

  async getSeebugPapers(): Promise<SeebugPaper[]> {
    return Promise.resolve(mockSeebugPapers);
  }

  async getBannerInfo(): Promise<BannerInfo> {
    return Promise.resolve({
      tag: "Open Source Security Tools Collection Plan",
      title: "404 Labs Starlink Strategy",
      description: "View Details >"
    });
  }
}

export const newsService = new LocalNewsService();