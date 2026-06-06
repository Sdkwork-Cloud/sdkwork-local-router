import { AgentTool } from '@sdkwork/modelkit-types';
import { ToolConfigService } from './configManager';
import { UNIFIED_TOOLS } from '@sdkwork/modelkit-sdk-typescript';

const iconMap: Record<string, string> = {
  'claude_code': 'TerminalSquare',
  'codex': 'Code2',
  'gemini': 'Sparkles',
  'opencode': 'Terminal',
  'openclaw': 'Globe',
  'hermes': 'Zap'
};

const makeAgentTool = (id: string, name: string, description: string, icon: string, status: any, extraConfig: any = {}, sysReq?: string[]): AgentTool => ({
  id,
  name,
  description,
  icon,
  status,
  config: { ...ToolConfigService.getDefaultConfig(id, name), ...extraConfig },
  systemRequirements: sysReq
});

export const mockAgentTools: AgentTool[] = UNIFIED_TOOLS.map(tool => 
  makeAgentTool(
    tool.id,
    tool.name,
    tool.description,
    iconMap[tool.id] || 'Terminal',
    ['claude_code', 'hermes'].includes(tool.id) ? 'installed' : 'uninstalled',
    tool.id === 'claude_code' ? { autoUpdate: true } : {},
    tool.id === 'claude_code' ? ['Node.js >= 18'] : undefined
  )
);
