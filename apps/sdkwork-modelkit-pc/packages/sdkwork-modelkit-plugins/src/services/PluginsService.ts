import React from 'react';
import { IPluginsService, PluginItem, PublishPluginInput } from './types';

function getIcon(name: string) {
  return name; // We will handle rendering in UI
}

let mockPlugins: PluginItem[] = [
  { 
    id: 1, name: 'Self-Improving Agent', author: '@pskoett', downloads: '432k', rating: 3.6, type: 'Automation', updated: '1d ago',
    desc: 'Captures learnings, errors, and corrections to enable continuous improvement. Use when: (1) A command or operation fails unexpectedly, (2) User corrects Clau...', 
    installedAgents: [], icon: 'Box',
    schemaType: 'REST API', authType: 'None',
    permissions: ['Memory Access', 'Self Reflection'],
    endpoints: [
      { method: 'POST', path: '/v1/memory/learn', desc: 'Store a learning or correction' }
    ]
  },
  { 
    id: 2, name: 'Plugin Vetter', author: '@spclaudehome', downloads: '237k', rating: 1.1, type: 'Security', updated: '1d ago',
    desc: 'Security-first plugin vetting for AI agents. Use before installing any plugin from CloudHub, GitHub, or other sources. Checks for red flags, permission scope, and suspicious patterns.', 
    installedAgents: [], icon: 'Shield',
    schemaType: 'GraphQL', authType: 'OAuth 2.0',
    permissions: ['Read Repositories'],
    endpoints: [
      { method: 'POST', path: '/graphql', desc: 'Execute Git operations' }
    ]
  },
  { 
    id: 3, name: 'Self-Improving + Proactive Agent', author: '@ivangdavila', downloads: '185k', rating: 1.1, type: 'Automation', updated: '1d ago',
    desc: 'Self-reflection + Self-criticism + Self-learning + Self-organizing memory. Agent evaluates its own work, catches mistakes, and improves permanently. Use when...', 
    installedAgents: ['Frontend Architect'], icon: 'Zap',
    schemaType: 'JSON Schema', authType: 'None',
    permissions: ['File System (Read)'],
    endpoints: [
      { method: 'POST', path: '/v1/render/chart', desc: 'Generate chart from JSON data' }
    ]
  },
  { 
    id: 4, name: 'ontology', author: '@oswalpalash', downloads: '179k', rating: 596, type: 'Data & APIs', updated: '1d ago',
    desc: 'Typed knowledge graph for structured agent memory and composable plugins. Use when creating/querying entities (Person, Project, Task, Event, Document), linkin...', 
    installedAgents: [], icon: 'Database',
    schemaType: 'OpenAPI 3.0', authType: 'API Key',
    permissions: ['Databases Access'],
    endpoints: [
      { method: 'POST', path: '/v1/entities', desc: 'Graph operations' }
    ]
  },
  { 
    id: 5, name: 'Polymarket', author: '@joelchance', downloads: '176k', rating: 116, type: 'Workflows', updated: '22h ago',
    desc: 'Query Polymarket prediction markets. Check odds, find trending markets, search events, track price movements.', 
    installedAgents: [], icon: 'Globe',
    schemaType: 'REST API', authType: 'Bearer token',
    permissions: ['Internet Access'],
    endpoints: [
      { method: 'GET', path: '/v1/markets', desc: 'Query markets' }
    ]
  },
  { 
    id: 6, name: 'GitHub', author: '@steipete', downloads: '176k', rating: 588, type: 'Dev Tools', updated: '1d ago',
    desc: 'Interact with GitHub using the `gh` CLI. Use `gh issue`, `gh pr`, `gh run`, and `gh api` for issues, PRs, CI runs, and advanced queries.', 
    installedAgents: ['Frontend Architect', 'Support Router'], icon: 'Terminal',
    schemaType: 'CLI', authType: 'GitHub Token',
    permissions: ['Execute Commands'],
    endpoints: [
      { method: 'POST', path: '/rpc/github', desc: 'Execute gh cli commands' }
    ]
  },
  { 
    id: 7, name: 'Gog', author: '@steipete', downloads: '172k', rating: 889, type: 'Automation', updated: '1d ago',
    desc: 'Google Workspace CLI for Gmail, Calendar, Drive, Contacts, Sheets, and Docs.', 
    installedAgents: [], icon: 'Blocks',
    schemaType: 'REST API', authType: 'OAuth 2.0',
    permissions: ['Workspace Access'],
    endpoints: [
      { method: 'POST', path: '/v1/workspace/query', desc: 'Query workspace data' }
    ]
  }
];

const mockCategories = ['All', 'Installed', 'MCP Tools', 'Prompts', 'Workflows', 'Dev Tools', 'Data & APIs', 'Security', 'Automation', 'Other'];

export class LocalPluginsService implements IPluginsService {
  async getPlugins(): Promise<PluginItem[]> {
    return Promise.resolve([...mockPlugins]);
  }

  async getCategories(): Promise<string[]> {
    return Promise.resolve([...mockCategories]);
  }

  async publishPlugin(input: PublishPluginInput): Promise<PluginItem> {
    const newPlugin: PluginItem = {
      id: Date.now(),
      name: input.name,
      author: input.author,
      downloads: '0k',
      rating: 0,
      type: input.category,
      updated: 'Just now',
      desc: input.desc,
      installedAgents: [],
      icon: 'Box',
      schemaType: input.schemaType,
      authType: input.authType,
      permissions: input.permissions,
      endpoints: [
        { method: 'POST', path: '/v1/execute', desc: 'Execute action' }
      ]
    };
    mockPlugins = [newPlugin, ...mockPlugins];
    return Promise.resolve(newPlugin);
  }

  async installPluginToAgents(pluginId: number, agents: string[]): Promise<void> {
    const item = mockPlugins.find(s => s.id === pluginId);
    if(item) {
      item.installedAgents = Array.from(new Set([...item.installedAgents, ...agents]));
    }
    return Promise.resolve();
  }
}

export const pluginsService = new LocalPluginsService();
