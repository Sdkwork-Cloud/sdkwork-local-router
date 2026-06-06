import { AgentTool } from '@sdkwork/modelkit-types';
import { IAgentService, AgentConfig } from './interface';
import { mockAgentTools } from './mock';

let mockAgents: AgentConfig[] = [
  { id: 1, name: 'Frontend Architect', task: 'Reviews TS code and generates Next.js boilerplate.', model: 'claude-3-5-sonnet', type: 'Assistant', skills: ['WebSearch', 'FileEdit'], mcp: ['postgres-db'] },
  { id: 2, name: 'Data Analyst Bot', task: 'Connects to BigQuery to answer natural language queries.', model: 'gpt-4o', type: 'Agentic', skills: ['DataViz'], mcp: ['bigquery', 'github'] },
  { id: 3, name: 'Support Router', task: 'Classifies incoming user tickets and routes them.', model: 'gemini-1.5-flash', type: 'Workflow', skills: [], mcp: ['zendesk'] }
];

export class LocalAgentService implements IAgentService {
  async fetchAgents(): Promise<AgentConfig[]> {
    return new Promise((resolve) => setTimeout(() => resolve([...mockAgents]), 300));
  }

  async createAgent(config?: Partial<AgentConfig>): Promise<AgentConfig> {
    const newAgent = { id: Date.now(), name: config?.name || 'New Agent', task: config?.task || 'A new empty agent.', model: config?.model || 'gpt-4o', type: config?.type || 'Assistant', skills: config?.skills || [], mcp: config?.mcp || [], ...config };
    mockAgents.push(newAgent);
    return new Promise((resolve) => setTimeout(() => resolve(newAgent), 300));
  }

  async updateAgent(id: number, config: Partial<AgentConfig>): Promise<AgentConfig> {
    return new Promise((resolve, reject) => setTimeout(() => {
      const index = mockAgents.findIndex(a => a.id === id);
      if (index !== -1) {
        mockAgents[index] = { ...mockAgents[index], ...config };
        resolve(mockAgents[index]);
      } else {
        reject(new Error('Agent not found'));
      }
    }, 300));
  }

  async deleteAgent(id: number): Promise<void> {
    mockAgents = mockAgents.filter(a => a.id !== id);
    return new Promise((resolve) => setTimeout(resolve, 300));
  }

  async fetchAgentTools(): Promise<AgentTool[]> {
    return new Promise((resolve) => setTimeout(() => resolve(mockAgentTools), 600));
  }

  async toggleAgentStatus(id: string, newStatus: AgentTool['status']): Promise<void> {
    const tool = mockAgentTools.find(t => t.id === id);
    if (tool) {
      tool.status = newStatus;
    }
  }

  async updateAgentConfig(id: string, config: any): Promise<void> {
    const tool = mockAgentTools.find(t => t.id === id);
    if (tool) {
      tool.config = { ...tool.config, ...config };
    }
  }
}

// Temporary fallback proxy export for backward compatibility during migration
const singleton = new LocalAgentService();
export const fetchAgents = singleton.fetchAgents.bind(singleton);
export const createAgent = singleton.createAgent.bind(singleton);
export const deleteAgent = singleton.deleteAgent.bind(singleton);
export const fetchAgentTools = singleton.fetchAgentTools.bind(singleton);
export const toggleAgentStatus = singleton.toggleAgentStatus.bind(singleton);
export const updateAgentConfig = singleton.updateAgentConfig.bind(singleton);
