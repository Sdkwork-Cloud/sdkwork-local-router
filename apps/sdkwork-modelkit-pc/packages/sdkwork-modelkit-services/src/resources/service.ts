import { IResourcesService, MCPConfig, PromptConfig, SkillConfig } from './interface';

export * from './interface';

let mockMcp: MCPConfig[] = [
  {
    id: 1, name: 'File System', author: '@modelcontextprotocol', desc: 'Securely interact with local file systems. Provides reading, writing, and listing files with path restriction.',
    type: 'Core', status: 'connected', protocol: 'stdio',
    command: 'npx -y @modelcontextprotocol/server-filesystem /workspace',
    rating: 4.8, downloads: '124k', updated: '2h ago',
    capabilities: ['Read Files', 'Write Files', 'List Directories'],
    resources: 0, prompts: 2, tools: 5
  },
  {
    id: 2, name: 'GitHub', author: '@modelcontextprotocol', desc: 'Interact with GitHub API. Manage issues, pull requests, and repositories directly through MCP.',
    type: 'Dev Tools', status: 'disconnected', protocol: 'stdio',
    command: 'npx -y @modelcontextprotocol/server-github',
    rating: 4.9, downloads: '256k', updated: '1d ago',
    capabilities: ['Read Issues', 'Create PRs', 'Search Repos'],
    resources: 3, prompts: 1, tools: 12
  },
  {
    id: 3, name: 'Brave Search', author: '@modelcontextprotocol', desc: 'Web search using Brave Search API. Allows agents to look up current information and web content.',
    type: 'Search', status: 'error', protocol: 'stdio',
    command: 'npx -y @modelcontextprotocol/server-brave-search',
    rating: 4.5, downloads: '89k', updated: '3d ago',
    capabilities: ['Web Search', 'News Search'],
    resources: 0, prompts: 0, tools: 1
  },
  {
    id: 4, name: 'PostgreSQL', author: '@modelcontextprotocol', desc: 'Connect to PostgreSQL databases. Query data, inspect schemas, and manage database records.',
    type: 'Database', status: 'disconnected', protocol: 'stdio',
    command: 'npx -y @modelcontextprotocol/server-postgres postgresql://user:pass@localhost:5432/db',
    rating: 4.7, downloads: '150k', updated: '5d ago',
    capabilities: ['Query Data', 'Schema Inspection'],
    resources: 10, prompts: 1, tools: 2
  },
  {
    id: 5, name: 'Slack', author: '@modelcontextprotocol', desc: 'Interact with Slack workspace. Send messages, read channels, and manage users via MCP.',
    type: 'Communication', status: 'disconnected', protocol: 'stdio',
    command: 'npx -y @modelcontextprotocol/server-slack',
    rating: 4.3, downloads: '60k', updated: '1w ago',
    capabilities: ['Send Messages', 'Read Channels', 'List Users'],
    resources: 5, prompts: 0, tools: 8
  },
  {
    id: 6, name: 'Remote MCP Hub', author: '@mcp-hub', desc: 'Connect to a remote MCP hub via Server-Sent Events. Provides access to multiple tools hosted remotely.',
    type: 'Remote', status: 'connected', protocol: 'sse',
    url: 'https://hub.mcp.example.com/sse',
    rating: 4.6, downloads: '45k', updated: '12h ago',
    capabilities: ['Remote Execution', 'Tool Forwarding'],
    resources: 100, prompts: 20, tools: 50
  }
];

let mockPrompts: PromptConfig[] = [
  { id: 1, title: 'Code Review Master', category: 'Development', desc: 'Analyzes PR diffs and provides insightful code review comments following best practices.', usage: 1254, version: 'v1.4' },
  { id: 2, title: 'UX Writer Assistant', category: 'Design', desc: 'Crafts microcopy, error messages, and onboarding texts with a friendly tone.', usage: 843, version: 'v2.1' },
  { id: 3, title: 'Security Auditor', category: 'Security', desc: 'Scans infrastructure descriptors and points out potential CVEs or misconfigurations.', usage: 312, version: 'v0.9' }
];

let mockSkills: SkillConfig[] = [
  { id: '1', name: 'search_web', description: 'Search the web using Google Search API', type: 'function', tags: ['Internet'], active: true },
  { id: '2', name: 'read_file', description: 'Read a file from local workspace', type: 'function', tags: ['System'], active: true },
  { id: '3', name: 'get_weather', description: 'Get current weather by city location', type: 'rest', tags: ['API'], active: false },
  { id: '4', name: 'github_graphql', description: 'Query GitHub issues via GraphQL API', type: 'graphql', tags: ['Integration'], active: false }
];

export class LocalResourcesService implements IResourcesService {
  // MCP
  async fetchMCPs(): Promise<MCPConfig[]> {
    return new Promise((resolve) => setTimeout(() => resolve([...mockMcp]), 300));
  }
  async toggleMCPStatus(id: number, currentStatus: string): Promise<void> {
    const item = mockMcp.find(m => m.id === id);
    if(item) {
      item.status = currentStatus === 'connected' ? 'disconnected' : 'connected';
    }
    return new Promise((resolve) => setTimeout(resolve, 800));
  }
  async addMCP(config: Partial<MCPConfig>): Promise<MCPConfig> {
    return new Promise((resolve) => setTimeout(() => {
      const newMcp = { 
        id: Date.now(), 
        name: 'New MCP Server', 
        author: '@local',
        desc: 'Custom server',
        type: 'Core', 
        status: 'disconnected' as const, 
        protocol: 'stdio' as const,
        rating: 5,
        downloads: '0',
        updated: 'just now',
        capabilities: ['Custom'],
        resources: 0, prompts: 0, tools: 1,
        ...config 
      };
      mockMcp.push(newMcp);
      resolve(newMcp);
    }, 500));
  }
  
  async editMCP(id: number, config: Partial<MCPConfig>): Promise<MCPConfig> {
    return new Promise((resolve, reject) => setTimeout(() => {
      const index = mockMcp.findIndex(m => m.id === id);
      if (index !== -1) {
        mockMcp[index] = { ...mockMcp[index], ...config };
        resolve(mockMcp[index]);
      } else {
        reject(new Error("MCP Server not found"));
      }
    }, 500));
  }
  
  async deleteMCP(id: number): Promise<void> {
    mockMcp = mockMcp.filter(m => m.id !== id);
    return new Promise((resolve) => setTimeout(resolve, 300));
  }

  // Prompts
  async fetchPrompts(): Promise<PromptConfig[]> {
    return new Promise((resolve) => setTimeout(() => resolve([...mockPrompts]), 300));
  }
  async createPrompt(config: Partial<PromptConfig>): Promise<PromptConfig> {
    return new Promise((resolve) => setTimeout(() => {
      const newPrompt = { id: Date.now(), title: 'New Prompt', category: 'Uncategorized', desc: 'Empty prompt template', usage: 0, version: 'v1.0', ...config };
      mockPrompts.push(newPrompt);
      resolve(newPrompt);
    }, 500));
  }
  async deletePrompt(id: number): Promise<void> {
    mockPrompts = mockPrompts.filter(p => p.id !== id);
    return new Promise((resolve) => setTimeout(resolve, 300));
  }

  // Skills
  async fetchSkills(): Promise<SkillConfig[]> {
    return new Promise((resolve) => setTimeout(() => resolve([...mockSkills]), 300));
  }
  async toggleSkill(id: string, active: boolean): Promise<void> {
    const item = mockSkills.find(s => s.id === id);
    if(item) item.active = active;
    return new Promise((resolve) => setTimeout(resolve, 300));
  }
  async createSkill(config: Partial<SkillConfig>): Promise<SkillConfig> {
    return new Promise((resolve) => setTimeout(() => {
      const newSkill: SkillConfig = { 
        id: Date.now().toString(), 
        name: config.name || 'New Skill', 
        description: config.description || 'Empty skill template', 
        type: config.type || 'function',
        tags: config.tags || ['Custom'], 
        active: config.active || false
      };
      mockSkills.push(newSkill);
      resolve(newSkill);
    }, 500));
  }
  async updateSkill(id: string, config: Partial<SkillConfig>): Promise<SkillConfig> {
    return new Promise((resolve, reject) => setTimeout(() => {
      const index = mockSkills.findIndex(s => s.id === id);
      if (index !== -1) {
        mockSkills[index] = { ...mockSkills[index], ...config };
        resolve(mockSkills[index]);
      } else {
        reject(new Error('Skill not found'));
      }
    }, 500));
  }
  async deleteSkill(id: string): Promise<void> {
    mockSkills = mockSkills.filter(s => s.id !== id);
    return new Promise((resolve) => setTimeout(resolve, 300));
  }
}

// Fallback proxy
export const ResourcesService = new LocalResourcesService();
