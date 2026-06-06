import { useAppContext } from "@sdkwork/modelkit-core";
import { RequestLogsTable } from "./RequestLogsTable";
import { RequestLogsDrawer } from "./RequestLogsDrawer";
import {
  getLogPricingInfo,
  INITIAL_LOGS,
  detectProviderAndModel,
  getProviderBadgeStyle,
  getModelBadgeStyle,
} from "./RequestLogsData";
import React, { useState, useEffect, useRef } from "react";
import {
  Activity,
  Terminal,
  Search,
  Clock,
  Database,
  Play,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Trash2,
  ArrowRight,
  ShieldAlert,
  SlidersHorizontal,
  FileCode,
  X,
  FileJson,
  Layers,
  ArrowUpDown,
  Filter,
  Cpu,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { workspaceService } from "../../services/WorkspaceService";
import { RequestLog } from "../../services/types";

interface RequestLogsViewProps {
  onNavigate?: (view: "user-profile" | "system-settings") => void;
}

export function RequestLogsView({ onNavigate }: RequestLogsViewProps) {
  const { t } = useAppContext();
  const [logs, setLogs] = useState<RequestLog[]>([]);

  useEffect(() => {
    workspaceService.getRequestLogs().then((savedLogs) => {
      if (savedLogs && savedLogs.length > 0) {
        setLogs(
          savedLogs.map((log) => {
            if (!log.provider || !log.model) {
              const extra = detectProviderAndModel(log);
              return {
                ...log,
                provider: log.provider || extra.provider,
                model: log.model || extra.model,
              };
            }
            return log;
          }),
        );
      } else {
        setLogs(INITIAL_LOGS);
      }
    });
  }, []);

  const [selectedLogId, setSelectedLogId] = useState<string>("");
  const [expandedRowIds, setExpandedRowIds] = useState<string[]>([]);

  const toggleRowExpand = (id: string) => {
    setExpandedRowIds((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    );
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMethod, setFilterMethod] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [filterTool, setFilterTool] = useState<string>("ALL");
  const [filterProvider, setFilterProvider] = useState<string>("ALL");
  const [filterModel, setFilterModel] = useState<string>("ALL");
  const [autoSimulate, setAutoSimulate] = useState(true);
  const [sortField, setSortField] = useState<"time" | "duration" | "size">(
    "time",
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const selectedLog = logs.find((l) => l.id === selectedLogId);

  // Sync to localstorage
  useEffect(() => {
    if (logs.length > 0) {
      workspaceService.saveRequestLogs(logs);
    }
  }, [logs]);

  // Simulate incoming real-time traffic
  useEffect(() => {
    if (!autoSimulate) return;

    const interval = setInterval(() => {
      const paths = [
        {
          path: "/v1/chat/completions",
          method: "POST" as const,
          size: "2.4 KB",
        },
        { path: "/v1/models", method: "GET" as const, size: "410 B" },
        { path: "/v1/embeddings", method: "POST" as const, size: "8.1 KB" },
        {
          path: "/v1/audio/transcriptions",
          method: "POST" as const,
          size: "1.2 MB",
        },
      ];

      const toolsList = [
        "Web Search Tool",
        "Database Sync Connector",
        "Gemini 1.5 Pro Brain",
        "Claude 3.5 Sonnet Engine",
        "File System Reader",
        "Docker Hub Hub",
      ];

      const relaysList = [
        "OpenAI Proxy (Port 11434)",
        "Claude Hub (Port 11435)",
        "System Gateway Local (Port 3000)",
      ];

      const chosenPath = paths[Math.floor(Math.random() * paths.length)];
      const chosenTool =
        toolsList[Math.floor(Math.random() * toolsList.length)];
      const isOk = Math.random() > 0.15;
      const statusCode = isOk ? 200 : Math.random() > 0.5 ? 401 : 500;
      const chosenRelay =
        relaysList[Math.floor(Math.random() * relaysList.length)];
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0];

      // Smart selection of provider and model based on the chosen tool
      let chosenProvider = "";
      let chosenModel = "";

      if (chosenTool.includes("Gemini")) {
        chosenProvider = "Google Gemini";
        chosenModel = "gemini-1.5-pro";
      } else if (chosenTool.includes("Claude")) {
        chosenProvider = "Anthropic";
        chosenModel = "claude-3-5-sonnet";
      } else if (chosenTool.includes("Search")) {
        chosenProvider = "lishu.luo";
        chosenModel = "gpt-4";
      } else if (chosenTool.includes("Database")) {
        chosenProvider = "charlesluo";
        chosenModel = "gpt-4o";
      } else {
        const activeProviders = [
          "yuzapi.fun668",
          "yuzapi.fun-charlesluo",
          "lishu.luo",
        ];
        chosenProvider =
          activeProviders[Math.floor(Math.random() * activeProviders.length)];
        const modelMapping: { [key: string]: string[] } = {
          "lishu.luo": ["gpt-4o", "gpt-4o-mini", "gpt-4"],
          charlesluo: ["claude-3-5-sonnet", "gpt-4o"],
          "yuzapi.fun668": [
            "gpt-4o",
            "claude-3-5-sonnet",
            "text-embedding-3-small",
          ],
          "yuzapi.fun-charlesluo": ["claude-3-5-sonnet"],
        };
        const models = modelMapping[chosenProvider] || ["gpt-4o-mini"];
        chosenModel = models[Math.floor(Math.random() * models.length)];
      }

      // If it's embedding or audio, let's adjust model
      if (chosenPath.path.includes("embeddings")) {
        chosenModel = "text-embedding-3-small";
      } else if (chosenPath.path.includes("audio")) {
        chosenModel = "whisper-1";
      }

      const newLog: RequestLog = {
        id: `req-${Math.random().toString(36).substr(2, 5)}`,
        time: timeStr,
        tool: chosenTool,
        method: chosenPath.method,
        path: chosenPath.path,
        relay: chosenRelay,
        status: statusCode,
        duration: Math.floor(Math.random() * 800) + 40,
        size: chosenPath.size,
        provider: chosenProvider,
        model: chosenModel,
        payload: JSON.stringify(
          {
            stream: true,
            timestamp: Date.now(),
            request_source: "local-playground-daemon",
            target_adapter: chosenModel,
          },
          null,
          2,
        ),
        response: isOk
          ? JSON.stringify(
              {
                id: `chatcmpl-${Math.random().toString(36).substr(2, 10)}`,
                object: "chat.completion",
                created: Math.floor(Date.now() / 1000),
                choices: [
                  {
                    index: 0,
                    delta: {
                      content:
                        "Dynamic micro-frontend update verified. Listening on local port 3000.",
                    },
                  },
                ],
              },
              null,
              2,
            )
          : JSON.stringify(
              {
                error: {
                  message:
                    statusCode === 401
                      ? "Invalid Provider Bearer security token"
                      : "IPC socket read timeout from core router",
                  type: "gateway_error",
                  status: statusCode,
                },
              },
              null,
              2,
            ),
        ip: Math.random() > 0.7 ? "192.168.1.144" : "127.0.0.1",
      };

      setLogs((prev) => {
        const next = [newLog, ...prev].slice(0, 50); // Cap at 50 logs of history
        return next;
      });

      // Show small quiet success toast occasionally
      if (Math.random() > 0.85) {
        toast(`【${chosenTool}】 ${t("workspace:trigger_gateway_req", "triggered a gateway request")}`, {
          description: `${newLog.method} ${newLog.path} -> ${newLog.status} (${t("workspace:tab_providers", "Provider")}: ${chosenProvider}, ${t("workspace:model_mappings_active_title_suffix", "Model")}: ${chosenModel})`,
          duration: 1500,
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [autoSimulate]);

  const handleSimulateRequest = () => {
    const now = new Date();
    const timeStr = now.toTimeString().split(" ")[0];
    const toolsList = [
      "Web Search Tool",
      "Gemini 1.5 Pro Brain",
      "Claude 3.5 Sonnet Engine",
    ];
    const chosenTool = toolsList[Math.floor(Math.random() * toolsList.length)];

    let chosenProvider = "lishu.luo";
    let chosenModel = "gpt-4o";

    if (chosenTool.includes("Gemini")) {
      chosenProvider = "Google Gemini";
      chosenModel = "gemini-1.5-pro";
    } else if (chosenTool.includes("Claude")) {
      chosenProvider = "Anthropic";
      chosenModel = "claude-3-5-sonnet";
    }

    const newLog: RequestLog = {
      id: `req-man-${Math.random().toString(36).substr(2, 4)}`,
      time: timeStr,
      tool: chosenTool,
      method: "POST",
      path: "/v1/chat/completions",
      relay: "OpenAI Proxy (Port 11434)",
      status: 200,
      duration: 110,
      size: "1.4 KB",
      provider: chosenProvider,
      model: chosenModel,
      payload: JSON.stringify(
        {
          model: chosenModel,
          messages: [
            { role: "user", content: "Force manual diagnostics request." },
          ],
          stream: false,
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
                  "Manual relay path verification successful. All local nodes active.",
              },
            },
          ],
          speed_stats: "110ms latency, full handshake TLS enforced",
        },
        null,
        2,
      ),
      ip: "127.0.0.1",
    };

    setLogs((prev) => [newLog, ...prev]);
    setSelectedLogId(newLog.id);
    toast.success(
      t(
        "workspace:simulate_success_msg",
        "Tool [{{tool}}] request simulated successfully! (Provider: {{provider}}, Model: {{model}})",
        { tool: chosenTool, provider: chosenProvider, model: chosenModel }
      )
        .replace("{{tool}}", chosenTool)
        .replace("{{provider}}", chosenProvider)
        .replace("{{model}}", chosenModel)
    );
  };

  const handleClearLogs = () => {
    setLogs([]);
    setSelectedLogId("");
    toast.info(t("workspace:logs_emptied", "Gateway communication logs cleared!"));
  };

  const toggleSort = (field: "time" | "duration" | "size") => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  // Extract unique tools, providers, and models for filtering
  const allTools = Array.from(new Set(logs.map((l) => l.tool)));
  const allProviders = Array.from(
    new Set(logs.map((l) => l.provider).filter(Boolean)),
  ) as string[];
  const allModels = Array.from(
    new Set(logs.map((l) => l.model).filter(Boolean)),
  ) as string[];

  // Filter & Sort logs logic
  const filteredLogs = logs
    .filter((log) => {
      const matchesSearch =
        log.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.tool.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.relay.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (log.provider &&
          log.provider.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (log.model &&
          log.model.toLowerCase().includes(searchQuery.toLowerCase())) ||
        log.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesMethod =
        filterMethod === "ALL" || log.method === filterMethod;
      const matchesTool = filterTool === "ALL" || log.tool === filterTool;
      const matchesProvider =
        filterProvider === "ALL" || log.provider === filterProvider;
      const matchesModel = filterModel === "ALL" || log.model === filterModel;

      let matchesStatus = true;
      if (filterStatus === "200") matchesStatus = log.status === 200;
      if (filterStatus === "ERR") matchesStatus = log.status !== 200;

      return (
        matchesSearch &&
        matchesMethod &&
        matchesStatus &&
        matchesTool &&
        matchesProvider &&
        matchesModel
      );
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortField === "time") {
        comparison = a.time.localeCompare(b.time);
      } else if (sortField === "duration") {
        comparison = a.duration - b.duration;
      } else if (sortField === "size") {
        const sizeA = parseFloat(a.size) * (a.size.includes("MB") ? 1024 : 1);
        const sizeB = parseFloat(b.size) * (b.size.includes("MB") ? 1024 : 1);
        comparison = sizeA - sizeB;
      }
      return sortOrder === "desc" ? -comparison : comparison;
    });

  return (
    <div className="flex-1 flex flex-col h-full bg-panel text-text-muted font-sans overflow-hidden">
      {/* Workspace Content Grid */}
      <div className="flex-1 flex flex-col min-h-0 bg-surface">
        {/* Unified Search & Filters Desk */}
        <div className="px-5 py-3 border-b border-divider bg-surface flex flex-col xl:flex-row xl:items-center justify-between gap-4 shrink-0 shadow-sm z-10 relative">
          <div className="flex flex-1 flex-wrap gap-3 2xl:gap-4 items-center min-w-0">
            {/* Search Input Box */}
            <div className="relative w-full sm:w-[280px] shrink-0">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <input
                type="text"
                placeholder={t("workspace:txt_1295", "Search local node communications...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-panel border border-divider hover:border-divider-strong rounded-lg pl-9 pr-8 py-2 text-[13px] text-text-main placeholder:text-text-muted/50 focus:outline-none focus:ring-1 focus:ring-primary-main/50 focus:border-primary-main/50 transition-all font-mono shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-text-main hover:bg-surface-hover rounded-md transition-all"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Filters Group */}
            <div className="flex flex-wrap items-center gap-2.5 sm:border-l sm:border-divider sm:pl-3">
              {/* Method Select */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-text-muted font-bold uppercase tracking-wider hidden sm:block">
                  {t("workspace:filter_method_label", "Method")}
                </span>
                <select
                  value={filterMethod}
                  onChange={(e) => setFilterMethod(e.target.value)}
                  className="bg-panel border border-divider text-text-main hover:border-text-muted/40 rounded-lg text-[12px] px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary-main/50 cursor-pointer shadow-sm transition-all"
                >
                  <option value="ALL">{t("workspace:opt_all", "All")}</option>
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                </select>
              </div>

              {/* Status Select */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-text-muted font-bold uppercase tracking-wider hidden sm:block">
                  {t("workspace:filter_status_label", "Status")}
                </span>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-panel border border-divider text-text-main hover:border-text-muted/40 rounded-lg text-[12px] px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary-main/50 cursor-pointer shadow-sm transition-all"
                >
                  <option value="ALL">{t("workspace:opt_all", "All")}</option>
                  <option value="200">200 OK</option>
                  <option value="ERR">{t("workspace:opt_errors", "Errors")}</option>
                </select>
              </div>

              {/* Tool Filter Select */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-text-muted font-bold uppercase tracking-wider hidden sm:block">
                  {t("workspace:filter_tool_label", "Tool")}
                </span>
                <select
                  value={filterTool}
                  onChange={(e) => setFilterTool(e.target.value)}
                  className="bg-panel border border-divider text-text-main hover:border-text-muted/40 rounded-lg text-[12px] px-2.5 py-1.5 max-w-[140px] focus:outline-none focus:ring-1 focus:ring-primary-main/50 cursor-pointer shadow-sm transition-all"
                >
                  <option value="ALL">{t("workspace:opt_all_tools", "All Tools")}</option>
                  {allTools.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Provider Filter Select */}
              <div className="flex items-center gap-2 hidden md:flex">
                <span className="text-[11px] text-text-muted font-bold uppercase tracking-wider hidden lg:block">
                  {t("workspace:filter_provider_label", "Provider")}
                </span>
                <select
                  value={filterProvider}
                  onChange={(e) => setFilterProvider(e.target.value)}
                  className="bg-panel border border-divider text-text-main hover:border-text-muted/40 rounded-lg text-[12px] px-2.5 py-1.5 max-w-[140px] focus:outline-none focus:ring-1 focus:ring-primary-main/50 cursor-pointer shadow-sm transition-all"
                >
                  <option value="ALL">{t("workspace:opt_all_providers", "All Providers")}</option>
                  {allProviders.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 ml-auto xl:ml-0">
            {/* Quick simulation controls */}
            <div className="flex items-center bg-panel border border-divider rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setAutoSimulate(!autoSimulate)}
                className={`px-3 py-1.5 rounded-md text-[12px] font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  autoSimulate
                    ? "bg-surface shadow-sm border border-divider/50 text-primary-main"
                    : "text-text-muted hover:text-text-main hover:bg-surface-hover/50"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${autoSimulate ? "bg-primary-hover animate-pulse" : "bg-text-muted/40"}`}
                />
                {t("workspace:txt_1293")}
              </button>

              <button
                onClick={handleSimulateRequest}
                className="px-3 py-1.5 bg-transparent hover:bg-surface-hover hover:text-text-main text-[12px] font-bold rounded-md text-text-muted flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Play size={12} className={autoSimulate ? "text-text-muted" : "text-emerald-500"} />
                {t("workspace:txt_1294")}
              </button>
            </div>

            <div className="w-px h-6 bg-divider"></div>

            <button
              onClick={handleClearLogs}
              className="px-3 py-2 bg-panel border border-divider shadow-sm hover:border-red-500/30 hover:bg-red-50/10 dark:hover:bg-red-900/10 text-text-muted hover:text-red-500 text-[12px] font-bold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
              title={t("workspace:txt_1296")}
            >
              <Trash2 size={14} />
              <span className="hidden sm:inline">{t("workspace:txt_1296")}</span>
            </button>

            <div className="text-[12px] font-mono font-medium text-text-muted pl-4 border-l border-divider ml-1">
              <span className="text-text-main font-bold">
                {filteredLogs.length}
              </span>{" "}
              / {logs.length}
            </div>
          </div>
        </div>

        {/* Structured Grid Table Component */}
        <RequestLogsTable
          filteredLogs={filteredLogs}
          expandedRowIds={expandedRowIds}
          toggleRowExpand={toggleRowExpand}
          toggleSort={toggleSort}
          setSelectedLogId={setSelectedLogId}
        />
      </div>

      {/* Side-Over Diagnostic Details Panel Drawer */}
      <RequestLogsDrawer
        log={selectedLog}
        onClose={() => setSelectedLogId("")}
      />
    </div>
  );
}
