import { IWorkspaceService, LocalApiKey, LocalRelay, ProviderData, RequestLog, VipStatus } from './types';

const DEFAULT_API_KEYS: LocalApiKey[] = [
  { id: 'k-1', name: 'lishu.luo Primary Key', key: 'sk-proj-q9m8...z8aP', baseUrl: 'https://geekspace.cloud/v1', enabled: true, timeAdded: '2026-05-18 14:24' },
  { id: 'k-2', name: 'charlesluo Backup Key', key: 'sk-ant-api03-Lkd...99s2', baseUrl: '', enabled: true, timeAdded: '2026-05-19 09:12' },
  { id: 'k-3', name: 'yuzapi Prod Relay', key: 'sk-3f82a9d...ffe4', baseUrl: 'https://yuzapi.fun/v1', enabled: true, timeAdded: '2026-05-20 02:45' }
];

const DEFAULT_PROVIDERS: ProviderData[] = [
  { id: '0', name: 'lishu.luo', url: 'https://geekspace.cloud', initial: 'L', openaiUrl: 'https://geekspace.cloud/v1', anthropicUrl: '', modelId: 'gpt-4o', apiKey: 'sk-...' },
  { id: '1', name: 'charlesluo', url: 'https://geekspace.cloud', initial: 'C', openaiUrl: 'https://geekspace.cloud/v1', anthropicUrl: '', modelId: 'gpt-4o', apiKey: 'sk-...' },
  { id: '2', name: 'yuzapi.fun668', url: 'https://yuzapi.fun', initial: 'Y', openaiUrl: 'https://yuzapi.fun/v1', anthropicUrl: '', modelId: 'claude-3-5-sonnet', apiKey: 'sk-...' },
  { id: '3', name: 'yuzapi.fun-charlesluo', url: 'https://yuzapi.fun', initial: 'Y', openaiUrl: 'https://yuzapi.fun/v1', anthropicUrl: '', modelId: 'claude-3-5-sonnet', apiKey: 'sk-...' },
  { id: '4', name: 'yuzapi.fun-manager@sdkwork.com', url: 'https://yuzapi.fun', initial: 'Y', openaiUrl: 'https://yuzapi.fun/v1', anthropicUrl: '', modelId: 'claude-3-5-sonnet', apiKey: 'sk-...' }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class LocalWorkspaceService implements IWorkspaceService {
  async getApiKeys(): Promise<LocalApiKey[]> {
    await delay(300);
    const saved = localStorage.getItem('modelkit_api_keys');
    if (saved) {
      try {
        let parsed = []; try { parsed = JSON.parse(saved); } catch (e) {}
        return parsed.map((item: any) => ({
          id: item.id,
          name: item.name,
          key: item.key,
          baseUrl: item.baseUrl,
          enabled: item.enabled,
          timeAdded: item.timeAdded || new Date().toISOString().replace('T', ' ').substr(0, 16)
        }));
      } catch (e) {
        console.error(e);
      }
    }
    return [...DEFAULT_API_KEYS];
  }

  async saveApiKeys(keys: LocalApiKey[]): Promise<void> {
    await delay(300);
    localStorage.setItem('modelkit_api_keys', JSON.stringify(keys));
  }

  async getRelays(): Promise<LocalRelay[]> {
    await delay(300);
    const saved = localStorage.getItem('modelkit_relays');
    if (saved) {
      try {
        try { return JSON.parse(saved); } catch (e) { return []; }
      } catch (e) {
        console.error(e);
      }
    }
    return [
      { id: 'relay-1', name: 'OpenAI Proxy', port: 11434, status: 'running', providers: ['0'], protocols: ['codex', 'opencode'] },
      { id: 'relay-2', name: 'Claude Hub', port: 11435, status: 'stopped', providers: ['2', '3'], protocols: ['claude'] },
    ];
  }

  async saveRelays(relays: LocalRelay[]): Promise<void> {
    await delay(300);
    localStorage.setItem('modelkit_relays', JSON.stringify(relays));
  }

  async getProviders(): Promise<ProviderData[]> {
    await delay(300);
    const saved = localStorage.getItem('modelkit_providers');
    if (saved) {
      try {
        try { return JSON.parse(saved); } catch (e) { return []; }
      } catch (e) {
        console.error(e);
      }
    }
    return [...DEFAULT_PROVIDERS];
  }

  async saveProviders(providers: ProviderData[]): Promise<void> {
    await delay(300);
    localStorage.setItem('modelkit_providers', JSON.stringify(providers));
  }

  async getRequestLogs(): Promise<RequestLog[]> {
    await delay(200);
    const saved = localStorage.getItem('modelkit_request_logs_v2');
    if (saved) {
      try {
        try { return JSON.parse(saved); } catch (e) { return []; }
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  }

  async saveRequestLogs(logs: RequestLog[]): Promise<void> {
    localStorage.setItem('modelkit_request_logs_v2', JSON.stringify(logs));
  }

  async clearRequestLogs(): Promise<void> {
    await delay(200);
    localStorage.removeItem('modelkit_request_logs_v2');
  }

  async addRequestLog(log: Omit<RequestLog, 'id'>): Promise<RequestLog> {
    const logs = await this.getRequestLogs();
    const newLog: RequestLog = {
      ...log,
      id: Math.random().toString(36).substring(7)
    };
    logs.unshift(newLog);
    if (logs.length > 500) logs.pop();
    await this.saveRequestLogs(logs);
    return newLog;
  }

  async getVipStatus(): Promise<VipStatus> {
    await delay(300);
    const isActive = localStorage.getItem('modelkit_vip_status') === 'active';
    const plan = localStorage.getItem('modelkit_vip_plan') || 'Pro';
    const cycle = localStorage.getItem('modelkit_vip_cycle') || 'monthly';
    const date = localStorage.getItem('modelkit_vip_date') || '';
    return { isActive, plan, cycle, date };
  }

  async setVipStatus(status: VipStatus | null): Promise<void> {
    await delay(300);
    if (status) {
      localStorage.setItem('modelkit_vip_status', status.isActive ? 'active' : 'inactive');
      localStorage.setItem('modelkit_vip_plan', status.plan);
      localStorage.setItem('modelkit_vip_cycle', status.cycle);
      localStorage.setItem('modelkit_vip_date', status.date);
    } else {
      localStorage.removeItem('modelkit_vip_status');
      localStorage.removeItem('modelkit_vip_plan');
      localStorage.removeItem('modelkit_vip_cycle');
      localStorage.removeItem('modelkit_vip_date');
    }
  }
}

export const workspaceService = new LocalWorkspaceService();
