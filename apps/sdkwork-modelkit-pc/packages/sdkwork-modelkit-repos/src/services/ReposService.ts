import { IReposService, RepoItem, RecommendedRepoInput } from './types';

let mockReposList: RepoItem[] = [
  { id: 1, org: 'microsoft', name: 'autogen', desc: 'A programming framework for agentic AI. It enables the development of LLM applications using multiple agents that can converse with each other to solve tasks. AutoGen agents are customizable, conversable, and seamlessly allow human participation.', lang: 'Python', stars: '27.4k', forks: '4.1k', category: 'Agents', trending: true, banner: 'from-blue-600 to-indigo-800', gitUrl: 'https://github.com/microsoft/autogen.git' },
  { id: 2, org: 'langchain-ai', name: 'langchain', desc: 'Building applications with LLMs through composability', lang: 'Python', stars: '85.2k', forks: '12.8k', category: 'LLM Tools', trending: true, banner: 'from-emerald-600 to-teal-800', gitUrl: 'https://github.com/langchain-ai/langchain.git' },
  { id: 3, org: 'vercel', name: 'ai', desc: 'Build AI-powered applications with React, Svelte, Vue, and Solid', lang: 'TypeScript', stars: '14.5k', forks: '1.2k', category: 'Frontend', trending: false, banner: 'from-zinc-100 to-zinc-400 text-text-main', gitUrl: 'https://github.com/vercel/ai.git' },
  { id: 4, org: 'hwchase17', name: 'langchainjs', desc: 'JS/TS version of LangChain', lang: 'TypeScript', stars: '11.3k', forks: '1.5k', category: 'LLM Tools', trending: false, banner: 'from-orange-500 to-red-700', gitUrl: 'https://github.com/hwchase17/langchainjs.git' },
  { id: 5, org: 'jmorganca', name: 'ollama', desc: 'Get up and running with Llama 2 and other large language models.', lang: 'Go', stars: '65.1k', forks: '4.7k', category: 'Developer Tools', trending: true, banner: 'from-cyan-500 to-blue-700', gitUrl: 'https://github.com/jmorganca/ollama.git' },
  { id: 6, org: 'Significant-Gravitas', name: 'AutoGPT', desc: 'An experimental open-source attempt to make GPT-4 fully autonomous.', lang: 'Python', stars: '161k', forks: '38k', category: 'Agents', trending: false, banner: 'from-purple-600 to-fuchsia-800', gitUrl: 'https://github.com/Significant-Gravitas/AutoGPT.git' },
];

const categories = ["LLM Tools", "Agents", "Frontend", "Developer Tools"];

export class LocalReposService implements IReposService {
  async getRepos(): Promise<RepoItem[]> {
    return Promise.resolve([...mockReposList]);
  }

  async getCategories(): Promise<string[]> {
    return Promise.resolve([...categories]);
  }

  async getFeatured(): Promise<RepoItem | null> {
    return Promise.resolve(mockReposList.length > 0 ? mockReposList[0] : null);
  }

  async getTrending(): Promise<RepoItem[]> {
    return Promise.resolve(mockReposList.slice(1, 4));
  }

  async getNewReleases(): Promise<RepoItem[]> {
    return Promise.resolve(mockReposList.slice(4, 6));
  }

  async submitRecommendRepo(input: RecommendedRepoInput): Promise<RepoItem> {
    const newItem: RepoItem = {
      id: Date.now(),
      org: input.org,
      name: input.name,
      desc: input.desc,
      lang: input.lang,
      category: input.category,
      stars: '1.2k',
      forks: '85',
      trending: false,
      banner: 'from-indigo-600 to-primary-dark',
      gitUrl: input.gitUrl,
      recommendReason: input.recommendReason,
      contactEmail: input.contactEmail
    };
    mockReposList = [newItem, ...mockReposList];
    return Promise.resolve(newItem);
  }
}

export const reposService = new LocalReposService();
