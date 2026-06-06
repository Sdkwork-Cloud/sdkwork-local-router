import { RequestLog } from "../../services/types";

export function getLogPricingInfo(log: RequestLog) {
  // Let's seed based on the log id or properties to be deterministic
  let seed = 0;
  for (let i = 0; i < log.id.length; i++) {
    seed += log.id.charCodeAt(i) * (i + 1);
  }

  // 1. Request ID (realistic long ID)
  const timeClean = log.time.replace(/:/g, "");
  const requestId =
    `20260520${timeClean}${(seed * 11).toString().padEnd(6, "0")}2608268d9d611EzWlfx6`.substring(
      0,
      38,
    );

  // 2. 缓存 Tokens
  const cacheTokens = ((seed * 853) % 200000) + 40000;

  // 3. Inputs/Outputs depending on log characteristics
  const inputTokens = ((seed * 113) % 15000) + 2500;
  const outputTokens = ((seed * 79) % 3000) + 400;

  // 4. Default prices (or model-specific prices)
  let pin = 5.0; // / 1M tokens
  let pout = 30.0;
  let pcache = 3.0;
  let multiplier = 2;
  let reasoningEffort = "xhigh";

  const m = (log.model || "").toLowerCase();
  if (m.includes("gemini")) {
    pin = 1.25;
    pout = 5.0;
    pcache = 0.75;
    multiplier = 1;
    reasoningEffort = "medium";
  } else if (m.includes("gpt-4o-mini")) {
    pin = 0.15;
    pout = 0.6;
    pcache = 0.075;
    multiplier = 1;
    reasoningEffort = "low";
  } else if (m.includes("claude-3-5-sonnet")) {
    pin = 3.0;
    pout = 15.0;
    pcache = 1.5;
    multiplier = 2;
    reasoningEffort = "high";
  }

  // 5. Cost calculation:
  // (Input * Pin + Cache * Pcache + Output * Pout) / 1000000 * multiplier
  const inputCost = (inputTokens / 1000000) * pin;
  const cacheCost = (cacheTokens / 1000000) * pcache;
  const outputCost = (outputTokens / 1000000) * pout;
  const totalCost = ((inputCost + cacheCost + outputCost) * multiplier).toFixed(
    6,
  );

  return {
    requestId,
    cacheTokens,
    inputTokens,
    outputTokens,
    pin,
    pout,
    pcache,
    multiplier,
    reasoningEffort,
    totalCost,
  };
}

export const INITIAL_LOGS: RequestLog[] = [
  {
    id: "req-8902a",
    time: "05:21:02",
    tool: "Web Search Tool",
    method: "POST",
    path: "/v1/chat/completions",
    relay: "OpenAI Proxy (Port 11434)",
    status: 200,
    duration: 342,
    size: "1.2 KB",
    payload: JSON.stringify(
      {
        model: "gpt-4",
        messages: [{ role: "user", content: "Design index.css elements" }],
        temperature: 0.7,
      },
      null,
      2,
    ),
    response: JSON.stringify(
      {
        choices: [
          {
            message: {
              role: "assistant",
              content:
                "Success. Loaded Inter and Fira fonts with high contrast.",
            },
          },
        ],
        usage: { total_tokens: 148 },
      },
      null,
      2,
    ),
    ip: "127.0.0.1",
    provider: "lishu.luo",
    model: "gpt-4",
  },
  {
    id: "req-8902b",
    time: "05:20:45",
    tool: "Claude 3.5 Sonnet Engine",
    method: "GET",
    path: "/v1/models",
    relay: "Claude Hub (Port 11435)",
    status: 200,
    duration: 86,
    size: "524 B",
    payload: "{}",
    response: JSON.stringify(
      { data: [{ id: "claude-3-opus" }, { id: "claude-3-sonnet" }] },
      null,
      2,
    ),
    ip: "192.168.1.144",
    provider: "charlesluo",
    model: "claude-3-5-sonnet",
  },
  {
    id: "req-8902c",
    time: "05:20:12",
    tool: "Database Sync Connector",
    method: "POST",
    path: "/v1/chat/completions",
    relay: "OpenAI Proxy (Port 11434)",
    status: 500,
    duration: 1205,
    size: "189 B",
    payload: JSON.stringify(
      {
        model: "gpt-4o",
        messages: [{ role: "user", content: "Compile target dependencies" }],
      },
      null,
      2,
    ),
    response: JSON.stringify(
      {
        error: {
          message:
            "Upstream gateway timeout. Charlesluo provider credentials invalid.",
          code: "auth_error",
        },
      },
      null,
      2,
    ),
    ip: "127.0.0.1",
    provider: "charlesluo",
    model: "gpt-4o",
  },
  {
    id: "req-8902d",
    time: "05:19:50",
    tool: "File System Reader",
    method: "POST",
    path: "/v1/embeddings",
    relay: "OpenAI Proxy (Port 11434)",
    status: 200,
    duration: 194,
    size: "4.8 KB",
    payload: JSON.stringify(
      { input: "Core daemon IPC communication port 3000" },
      null,
      2,
    ),
    response: JSON.stringify(
      {
        data: [
          { object: "embedding", embedding: [0.0023, -0.0154, 0.3411, 0.9852] },
        ],
        usage: { total_tokens: 8 },
      },
      null,
      2,
    ),
    ip: "127.0.0.1",
    provider: "yuzapi.fun668",
    model: "text-embedding-3-small",
  },
  {
    id: "req-8902e",
    time: "05:18:15",
    tool: "Gemini 1.5 Pro Brain",
    method: "POST",
    path: "/v1/chat/completions",
    relay: "System Gateway Local",
    status: 200,
    duration: 410,
    size: "2.1 KB",
    payload: JSON.stringify(
      {
        model: "gemini-1.5-pro",
        messages: [{ role: "user", content: "Synthesize audio waves" }],
      },
      null,
      2,
    ),
    response: JSON.stringify(
      {
        choices: [
          {
            message: {
              role: "assistant",
              content: "Generating wave loops on port 3000.",
            },
          },
        ],
      },
      null,
      2,
    ),
    ip: "127.0.0.1",
    provider: "Google Gemini",
    model: "gemini-1.5-pro",
  },
];

export function detectProviderAndModel(log: Partial<RequestLog>): {
  provider: string;
  model: string;
} {
  const toolLower = (log.tool || "").toLowerCase();
  const pathLower = (log.path || "").toLowerCase();
  let payloadObj: any = {};
  try {
    payloadObj = JSON.parse(log.payload || "{}");
  } catch (e) {}

  let model = payloadObj.model || payloadObj.target_adapter || "";
  if (!model && pathLower.includes("embeddings")) {
    model = "text-embedding-3-small";
  } else if (!model && pathLower.includes("audio")) {
    model = "whisper-1";
  }

  let provider = "";

  if (toolLower.includes("gemini") || model.includes("gemini")) {
    provider = "Google Gemini";
    if (!model) model = "gemini-1.5-pro";
  } else if (toolLower.includes("claude") || model.includes("claude")) {
    provider = "charlesluo";
    if (!model) model = "claude-3-5-sonnet";
  } else if (toolLower.includes("search")) {
    provider = "lishu.luo";
    if (!model) model = "gpt-4";
  } else if (toolLower.includes("database")) {
    provider = "charlesluo";
    if (!model) model = "gpt-4o";
  } else if (toolLower.includes("system") || toolLower.includes("file")) {
    provider = "yuzapi.fun668";
    if (!model) model = "text-embedding-3-small";
  } else {
    provider = "lishu.luo";
    if (!model) model = "gpt-4o-mini";
  }

  return { provider, model };
}

export function getProviderBadgeStyle(provider: string = ""): string {
  const p = provider.toLowerCase();
  if (p.includes("lishu.luo")) {
    return "bg-primary-main/10 border-primary-main/15 text-primary-light";
  }
  if (p.includes("charlesluo")) {
    return "bg-emerald-500/10 border-emerald-500/15 text-emerald-400";
  }
  if (p.includes("yuzapi")) {
    return "bg-amber-500/10 border-amber-500/15 text-amber-400";
  }
  if (p.includes("gemini") || p.includes("google")) {
    return "bg-primary-main/10 border-[var(--color-primary-alpha)] text-primary-light";
  }
  if (p.includes("anthropic") || p.includes("claude")) {
    return "bg-orange-500/10 border-orange-500/15 text-orange-400";
  }
  return "bg-zinc-500/10 border-zinc-500/15 text-zinc-450";
}

export function getModelBadgeStyle(model: string = ""): string {
  const m = model.toLowerCase();
  if (m.includes("gpt-4o-mini")) {
    return "bg-teal-500/10 border-teal-500/15 text-teal-400";
  }
  if (m.includes("gpt-4o") || m.includes("gpt-4")) {
    return "bg-emerald-500/10 border-emerald-500/15 text-emerald-400";
  }
  if (m.includes("claude")) {
    return "bg-orange-500/10 border-orange-500/15 text-orange-400";
  }
  if (m.includes("gemini")) {
    return "bg-primary-main/10 border-[var(--color-primary-alpha)] text-primary-light";
  }
  return "bg-slate-500/10 border-slate-500/15 text-slate-400";
}
