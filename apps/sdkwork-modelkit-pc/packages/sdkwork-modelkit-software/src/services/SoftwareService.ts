import { ISoftwareService, SoftwareItem, SoftwareSubmitInput } from './types';

let mockSoftwareList: SoftwareItem[] = [
  { id: 1, name: 'Cursor', icon: 'C', version: '0.40.1', publisher: 'Anysphere', type: 'Development (IDE)', os: ['macOS', 'Windows', 'Linux'], size: '150 MB', desc: 'The AI-first code editor built to make you extraordinarily productive.', tags: ['Editor', 'AI', 'Copilot'], installed: false, rating: 4.9, banner: 'from-blue-600 to-indigo-800', website: 'https://cursor.sh', screenshots: [] },
  { id: 2, name: 'Windsurf', icon: 'W', version: '1.2.0', publisher: 'Codeium', type: 'Development (IDE)', os: ['macOS', 'Windows', 'Linux'], size: '135 MB', desc: 'The intelligent code editor designed for deep codebase context.', tags: ['Editor', 'AI'], installed: true, rating: 4.7, banner: 'from-emerald-500 to-teal-700', website: 'https://codeium.com/windsurf', screenshots: [] },
  { id: 3, name: 'Docker Desktop', icon: 'D', version: '4.30.0', publisher: 'Docker Inc.', type: 'Environment', os: ['macOS', 'Windows', 'Linux'], size: '600 MB', desc: 'Securely build, share and run any application, anywhere.', tags: ['Container', 'DevOps'], installed: true, rating: 4.8, banner: 'from-sky-500 to-blue-700', website: 'https://docker.com', screenshots: [] },
  { id: 4, name: 'Cline', icon: 'C', version: '2.1.4', publisher: 'Cline Team', type: 'Productivity Apps', os: ['Cross-platform'], size: '12 MB', desc: 'Cline is an AI assistant that can write code, run commands, and read files.', tags: ['VSCode Plugin', 'Agent'], installed: false, rating: 4.9, banner: 'from-purple-500 to-fuchsia-700', website: 'https://github.com/cline/cline', screenshots: [] },
  { id: 5, name: 'RooCode', icon: 'R', version: '1.0.5', publisher: 'Community', type: 'Productivity Apps', os: ['macOS', 'Windows'], size: '45 MB', desc: 'Local AI runner designed specifically for integration with ModelKit environments.', tags: ['Runner', 'Local inference'], installed: false, rating: 4.5, banner: 'from-orange-500 to-red-700', website: 'https://github.com/roocode/roocode', screenshots: [] },
  { id: 6, name: 'Ollama', icon: 'O', version: '0.1.30', publisher: 'Ollama', type: 'Local Inference', os: ['macOS', 'Windows', 'Linux'], size: '85 MB', desc: 'Get up and running with large language models locally.', tags: ['LLM', 'Local'], installed: true, rating: 4.9, banner: 'from-zinc-100 to-zinc-400 text-text-main', website: 'https://ollama.com', screenshots: [] },
  { id: 7, name: 'LM Studio', icon: 'L', version: '0.2.19', publisher: 'LM Studio', type: 'Local Inference', os: ['macOS', 'Windows', 'Linux'], size: '210 MB', desc: 'Discover, download, and run local LLMs.', tags: ['LLM', 'UI'], installed: false, rating: 4.8, banner: 'from-indigo-500 to-primary-dark', website: 'https://lmstudio.ai', screenshots: [] },
  { id: 8, name: 'Postman', icon: 'P', version: '10.20.3', publisher: 'Postman, Inc.', type: 'System Tools', os: ['macOS', 'Windows', 'Linux'], size: '180 MB', desc: 'Simplifies each step of the API lifecycle and streamlines collaboration.', tags: ['API', 'Testing'], installed: false, rating: 4.6, banner: 'from-orange-400 to-orange-600', website: 'https://postman.com', screenshots: [] }
];

const mockCategories = ["Development (IDE)", "Environment", "Productivity Apps", "Local Inference", "System Tools"];

export class LocalSoftwareService implements ISoftwareService {
  async getSoftwareList(): Promise<SoftwareItem[]> {
    return Promise.resolve([...mockSoftwareList]);
  }

  async getCategories(): Promise<string[]> {
    return Promise.resolve([...mockCategories]);
  }

  async submitSoftware(input: SoftwareSubmitInput): Promise<SoftwareItem> {
    const newApp: SoftwareItem = {
      id: Date.now(),
      name: input.name,
      icon: input.name.charAt(0).toUpperCase(),
      publisher: input.publisher,
      type: input.category,
      version: input.version,
      os: input.os,
      size: input.size,
      desc: input.desc,
      website: input.website,
      installed: false,
      rating: 0,
      banner: 'from-indigo-600 to-primary-dark',
      tags: ['New'],
      screenshots: []
    };
    mockSoftwareList = [newApp, ...mockSoftwareList];
    return Promise.resolve(newApp);
  }

  async installSoftware(id: number): Promise<void> {
    const item = mockSoftwareList.find(s => s.id === id);
    if(item) item.installed = true;
    return Promise.resolve();
  }

  async uninstallSoftware(id: number): Promise<void> {
    const item = mockSoftwareList.find(s => s.id === id);
    if(item) item.installed = false;
    return Promise.resolve();
  }
}

export const softwareService = new LocalSoftwareService();
