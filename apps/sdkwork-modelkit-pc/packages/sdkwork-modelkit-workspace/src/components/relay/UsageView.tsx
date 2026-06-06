import { useAppContext } from "@sdkwork/modelkit-core";
import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import { UsageFilters } from "./usage/UsageFilters";
import { UsageStatsCards } from "./usage/UsageStatsCards";
import { UsageTrafficChart } from "./usage/UsageTrafficChart";
import { UsageModelDistribution } from "./usage/UsageModelDistribution";
import { UsageEndpointsList } from "./usage/UsageEndpointsList";
import {
  MOCK_ENDPOINT_STATS,
  MOCK_HOURLY_DATA,
  MOCK_DAILY_DATA,
  MOCK_WEEKLY_DATA,
  MOCK_MONTHLY_DATA,
} from "./usage/types";

interface UsageViewProps {
  onNavigate?: (viewId: "user-profile" | "system-settings") => void;
}

export function UsageView({ onNavigate }: UsageViewProps) {
  const { t } = useAppContext();
  const [timeRange, setTimeRange] = useState<
    "today" | "yesterday" | "7days" | "30days"
  >("today");
  const [selectedGateway, setSelectedGateway] = useState<string>("all");
  const [chartMode, setChartMode] = useState<"hour" | "day" | "week" | "month">(
    "hour",
  );

  // Math totals based on timeframe scale
  const totalRequests = useMemo(() => {
    const scale =
      timeRange === "today"
        ? 1
        : timeRange === "yesterday"
          ? 0.95
          : timeRange === "7days"
            ? 6.8
            : 28.5;
    const base = MOCK_ENDPOINT_STATS.reduce(
      (acc, curr) => acc + curr.requests,
      0,
    );
    return Math.floor(base * scale);
  }, [timeRange]);

  const totalTokens = useMemo(() => {
    const scale =
      timeRange === "today"
        ? 1
        : timeRange === "yesterday"
          ? 0.92
          : timeRange === "7days"
            ? 6.5
            : 27.2;
    const base = MOCK_ENDPOINT_STATS.reduce(
      (acc, curr) => acc + curr.tokensIn + curr.tokensOut,
      0,
    );
    return Math.floor(base * scale);
  }, [timeRange]);

  const totalTokensIn = useMemo(() => {
    const scale =
      timeRange === "today"
        ? 1
        : timeRange === "yesterday"
          ? 0.92
          : timeRange === "7days"
            ? 6.5
            : 27.2;
    const base = MOCK_ENDPOINT_STATS.reduce(
      (acc, curr) => acc + curr.tokensIn,
      0,
    );
    return Math.floor(base * scale);
  }, [timeRange]);

  const totalTokensOut = useMemo(() => {
    const scale =
      timeRange === "today"
        ? 1
        : timeRange === "yesterday"
          ? 0.92
          : timeRange === "7days"
            ? 6.5
            : 27.2;
    const base = MOCK_ENDPOINT_STATS.reduce(
      (acc, curr) => acc + curr.tokensOut,
      0,
    );
    return Math.floor(base * scale);
  }, [timeRange]);

  const totalSpend = useMemo(() => {
    // Standard blended rate: ¥12 per 1M inputs, ¥28 per 1M outputs
    const cost =
      (totalTokensIn / 1000000) * 12 + (totalTokensOut / 1000000) * 28;
    return Number(isNaN(cost) ? 0 : cost.toFixed(2));
  }, [totalTokensIn, totalTokensOut]);

  const avgLatency = useMemo(() => {
    const weightSum = MOCK_ENDPOINT_STATS.reduce(
      (acc, curr) => acc + curr.latency * curr.requests,
      0,
    );
    const reqSum = MOCK_ENDPOINT_STATS.reduce(
      (acc, curr) => acc + curr.requests,
      0,
    );
    return Math.floor(weightSum / reqSum);
  }, []);

  const overallSuccessRate = useMemo(() => {
    const weightSum = MOCK_ENDPOINT_STATS.reduce(
      (acc, curr) => acc + curr.successRate * curr.requests,
      0,
    );
    const reqSum = MOCK_ENDPOINT_STATS.reduce(
      (acc, curr) => acc + curr.requests,
      0,
    );
    return (weightSum / reqSum).toFixed(2);
  }, []);

  const currentChartData = useMemo(() => {
    switch (chartMode) {
      case "day":
        return MOCK_DAILY_DATA;
      case "week":
        return MOCK_WEEKLY_DATA;
      case "month":
        return MOCK_MONTHLY_DATA;
      case "hour":
      default:
        return MOCK_HOURLY_DATA;
    }
  }, [chartMode]);

  const maxRequestsGraph = useMemo(
    () => Math.max(...currentChartData.map((d) => d.requests), 1),
    [currentChartData],
  );
  const maxTokensGraph = useMemo(
    () => Math.max(...currentChartData.map((d) => d.tokens), 1),
    [currentChartData],
  );

  const uniqueGateways = useMemo(() => {
    return Array.from(new Set(MOCK_ENDPOINT_STATS.map((s) => s.gateway)));
  }, []);

  const handleExportData = () => {
    toast.success(t("workspace:export_success_toast", "Dashboard usage analysis report has been generated and exported (.csv)"));
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto bg-panel text-text-main custom-scrollbar">
      {/* Main Content Area */}
      <main className="px-8 py-6 space-y-6 w-full max-w-none">
        {/* Row 1: Time range selectors & Gateway filters */}
        <UsageFilters
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          selectedGateway={selectedGateway}
          setSelectedGateway={setSelectedGateway}
          uniqueGateways={uniqueGateways}
          onExport={handleExportData}
        />

        {/* Row 2: Bento Grid for Key-Metrics Overview */}
        <UsageStatsCards
          totalRequests={totalRequests}
          totalTokens={totalTokens}
          totalTokensIn={totalTokensIn}
          totalTokensOut={totalTokensOut}
          avgLatency={avgLatency}
          overallSuccessRate={overallSuccessRate}
          totalSpend={totalSpend}
          baseRequests={MOCK_ENDPOINT_STATS.reduce(
            (acc, curr) => acc + curr.requests,
            0,
          )}
          baseTokensIn={MOCK_ENDPOINT_STATS.reduce(
            (acc, curr) => acc + curr.tokensIn,
            0,
          )}
          baseTokensOut={MOCK_ENDPOINT_STATS.reduce(
            (acc, curr) => acc + curr.tokensOut,
            0,
          )}
        />

        {/* Row 3: Visual Analytics Grid (Hourly Chart & Donut Distribution) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <UsageTrafficChart
            chartMode={chartMode}
            setChartMode={setChartMode}
            currentChartData={currentChartData}
            maxRequestsGraph={maxRequestsGraph}
            maxTokensGraph={maxTokensGraph}
          />
          <UsageModelDistribution />
        </div>

        {/* Row 4: Detailed Endpoint Usage and Gateway Ledger */}
        <UsageEndpointsList selectedGateway={selectedGateway} />
      </main>
    </div>
  );
}
