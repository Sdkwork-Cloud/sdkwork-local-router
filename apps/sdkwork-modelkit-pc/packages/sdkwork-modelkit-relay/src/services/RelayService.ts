import { IRelayService, RelayNode, PublishRelayInput } from './types';

let mockRelayList: RelayNode[] = [
  { id: 1, name: 'DeepSeek Official', category: 'Official', url: 'https://api.deepseek.com', desc: 'DeepSeek V3/R1 official fast API, supports powerful reasoning.', latency: '45ms', free: true, banner: 'from-blue-600 to-indigo-800', screenshots: [] },
  { id: 2, name: 'SiliconFlow', category: 'Official', url: 'https://siliconflow.cn', desc: 'SiliconFlow. High performance inference service for open source models.', latency: '30ms', free: true, banner: 'from-emerald-500 to-teal-700', screenshots: [] },
  { id: 3, name: 'Anthropic', category: 'Official', url: 'https://api.anthropic.com', desc: 'Claude 3.5 family official endpoint, smart and fast.', latency: '120ms', free: false, banner: 'from-orange-500 to-red-700', screenshots: [] },
  { id: 4, name: 'GeekSpace', category: 'LLM', url: 'https://geekspace.cloud', desc: 'Stable and high-availability multi-model aggregation API proxy service.', latency: '85ms', free: false, banner: 'from-purple-500 to-fuchsia-700', screenshots: [] },
  { id: 5, name: 'Midjourney Proxy', category: 'Image', url: 'https://mj.proxy.dev', desc: 'Extremely stable MJ proxy offering fast and reliable generation.', latency: '200ms', free: false, banner: 'from-zinc-400 to-zinc-600 text-text-main', screenshots: [] },
  { id: 6, name: 'Sora API Hub', category: 'Video', url: 'https://video.ai.com', desc: 'Top video generation platform aggregation, supports text-to-video.', latency: '350ms', free: false, banner: 'from-sky-500 to-blue-700', screenshots: [] }
];

const mockCategories = [
  { id: 'LLM', label: 'LLM Proxy APIs' },
  { id: 'Official', label: 'Official Endpoints' },
  { id: 'Image', label: 'Image Generation' },
  { id: 'Video', label: 'Video Generation' }
];

export class LocalRelayService implements IRelayService {
  async getRelayNodes(): Promise<RelayNode[]> {
    return Promise.resolve([...mockRelayList]);
  }

  async getCategories(): Promise<{id: string; label: string}[]> {
    return Promise.resolve([...mockCategories]);
  }

  async publishNode(input: PublishRelayInput): Promise<RelayNode> {
    const newNode: RelayNode = {
      id: Date.now(),
      name: input.name,
      category: input.category,
      url: input.url,
      desc: input.desc,
      latency: '35ms',
      free: true,
      banner: 'from-blue-600 to-indigo-800',
      screenshots: input.screenshots
    };
    mockRelayList = [newNode, ...mockRelayList];
    return Promise.resolve(newNode);
  }
}

export const relayService = new LocalRelayService();
