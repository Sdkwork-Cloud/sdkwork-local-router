export interface EndpointStat {
  endpoint: string;
  gateway: string;
  model: string;
  requests: number;
  tokensIn: number;
  tokensOut: number;
  latency: number;
  successRate: number;
}

export interface ChartDataPoint {
  hour: string;
  label: string;
  requests: number;
  tokens: number;
  latency: number;
}

export interface ModelDistributionPoint {
  model: string;
  tokens: number;
  percent: number; // Token percent
  color: string;
  spend: number;
  spendPercent: number;
}

// Dummy statistics for mock analysis (realistic metrics)
export const MOCK_ENDPOINT_STATS: EndpointStat[] = [
  { endpoint: '/v1/chat/completions', gateway: 'OpenAI Proxy (11434)', model: 'gpt-4o', requests: 5840, tokensIn: 2451000, tokensOut: 1820400, latency: 198, successRate: 99.4 },
  { endpoint: '/v1/chat/completions', gateway: 'Claude Hub (11435)', model: 'claude-3-5-sonnet', requests: 4120, tokensIn: 3820900, tokensOut: 4982100, latency: 295, successRate: 98.8 },
  { endpoint: '/v1/models', gateway: 'Claude Hub (11435)', model: 'claude-3-5-sonnet', requests: 1250, tokensIn: 0, tokensOut: 24800, latency: 45, successRate: 100.0 },
  { endpoint: '/v1/embeddings', gateway: 'OpenAI Proxy (11434)', model: 'text-embedding-3-small', requests: 2840, tokensIn: 980400, tokensOut: 0, latency: 68, successRate: 99.1 },
  { endpoint: '/v1/chat/completions', gateway: 'Custom Gateway (11436)', model: 'deepseek-coder', requests: 620, tokensIn: 1850400, tokensOut: 3950200, latency: 412, successRate: 92.4 },
  { endpoint: '/v1/images/generations', gateway: 'OpenAI Proxy (11434)', model: 'dall-e-3', requests: 150, tokensIn: 12000, tokensOut: 0, latency: 1850, successRate: 96.0 },
];

export const MOCK_HOURLY_DATA: ChartDataPoint[] = [
  { hour: '00:00', label: '00:00', requests: 240, tokens: 450000, latency: 180 },
  { hour: '02:00', label: '02:00', requests: 180, tokens: 320000, latency: 175 },
  { hour: '04:00', label: '04:00', requests: 110, tokens: 210000, latency: 185 },
  { hour: '06:00', label: '06:00', requests: 90,  tokens: 150000, latency: 190 },
  { hour: '08:00', label: '08:00', requests: 450, tokens: 890000, latency: 210 },
  { hour: '10:00', label: '10:00', requests: 980, tokens: 2100000, latency: 245 },
  { hour: '12:00', label: '12:00', requests: 1250, tokens: 3100000, latency: 250 },
  { hour: '14:00', label: '14:00', requests: 1410, tokens: 3850000, latency: 235 },
  { hour: '16:00', label: '16:00', requests: 1150, tokens: 2900000, latency: 220 },
  { hour: '18:00', label: '18:00', requests: 840, tokens: 1850000, latency: 205 },
  { hour: '20:00', label: '20:00', requests: 1120, tokens: 2600000, latency: 215 },
  { hour: '22:00', label: '22:00', requests: 650, tokens: 1450000, latency: 195 },
];

export const MOCK_DAILY_DATA: ChartDataPoint[] = [
  { hour: '05-14', label: '05-14', requests: 4200, tokens: 9800000, latency: 195 },
  { hour: '05-15', label: '05-15', requests: 5800, tokens: 12400000, latency: 210 },
  { hour: '05-16', label: '05-16', requests: 6300, tokens: 14500000, latency: 202 },
  { hour: '05-17', label: '05-17', requests: 3100, tokens: 6200000, latency: 180 },
  { hour: '05-18', label: '05-18', requests: 2800, tokens: 5900000, latency: 185 },
  { hour: '05-19', label: '05-19', requests: 7900, tokens: 18200000, latency: 225 },
  { hour: '05-20', label: '05-20', requests: 9400, tokens: 21400000, latency: 212 },
];

export const MOCK_WEEKLY_DATA: ChartDataPoint[] = [
  { hour: 'Wk17', label: 'Wk17', requests: 38400, tokens: 88500000, latency: 205 },
  { hour: 'Wk18', label: 'Wk18', requests: 42500, tokens: 98000000, latency: 198 },
  { hour: 'Wk19', label: 'Wk19', requests: 49800, tokens: 115000000, latency: 204 },
  { hour: 'Wk20', label: 'Wk20', requests: 54100, tokens: 126000500, latency: 210 },
];

export const MOCK_MONTHLY_DATA: ChartDataPoint[] = [
  { hour: 'Dec', label: 'Dec', requests: 124000, tokens: 284040000, latency: 215 },
  { hour: 'Jan', label: 'Jan', requests: 148000, tokens: 342000000, latency: 210 },
  { hour: 'Feb', label: 'Feb', requests: 135000, tokens: 310000000, latency: 198 },
  { hour: 'Mar', label: 'Mar', requests: 189000, tokens: 435000000, latency: 208 },
  { hour: 'Apr', label: 'Apr', requests: 224000, tokens: 512000000, latency: 204 },
  { hour: 'May', label: 'May', requests: 265000, tokens: 614000000, latency: 212 },
];

export const MOCK_MODEL_DISTRIBUTION: ModelDistributionPoint[] = [
  { model: 'Claude 3.5 Sonnet', tokens: 8827824, percent: 44.5, spend: 247.1, spendPercent: 55.4, color: '#3B82F6' },
  { model: 'GPT-4o / GPT-4', tokens: 4434220, percent: 22.4, spend: 133.0, spendPercent: 29.8, color: '#10A37F' },
  { model: 'DeepSeek Coder', tokens: 5812600, percent: 29.3, spend: 58.1, spendPercent: 13.0, color: '#D13BF6' },
  { model: 'Text Embeddings', tokens: 994245, percent: 5.0, spend: 8.0, spendPercent: 1.8, color: '#8B5CF6' },
];
