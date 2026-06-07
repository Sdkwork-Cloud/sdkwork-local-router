import {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from "react";
import {
  SdkworkThemeProvider,
  type SdkworkThemeSelection,
} from "./theme-provider";
import type {
  SdkworkColorMode,
  SdkworkThemeColor,
  SdkworkThemeOverrides,
} from "./sdkwork-theme";

export interface SdkworkShellBridgeMessages {
  dateRangePicker: {
    endDate: string;
    placeholder: string;
    presets: string;
    rangeLimitDay: string;
    rangeLimitDays: string;
    rangeLimitExceeded: string;
    rangeLimitHour: string;
    rangeLimitHours: string;
    selectEndDate: string;
    startDate: string;
    to: string;
  };
  windowControls: {
    close: string;
    maximize: string;
    minimize: string;
    restore: string;
  };
}

export type SdkworkShellBridgeMessagesOverrides = {
  [K in keyof SdkworkShellBridgeMessages]?: Partial<SdkworkShellBridgeMessages[K]>;
};

export interface SdkworkShellBridgeFormatters {
  formatDate: (value: Date | number | string | null | undefined, options?: Intl.DateTimeFormatOptions) => string;
  formatDateTime: (value: Date | number | string | null | undefined, options?: Intl.DateTimeFormatOptions) => string;
  locale?: string;
}

export interface SdkworkShellBridgePreferences {
  colorMode?: SdkworkColorMode;
  themeColor?: SdkworkThemeColor;
  themeSelection?: SdkworkThemeSelection;
}

export interface SdkworkShellBridgeActions {
  setThemeSelection?: (next: SdkworkThemeSelection) => unknown;
  [key: string]: unknown;
}

export interface SdkworkShellBridgeValue {
  actions?: SdkworkShellBridgeActions;
  dir?: "auto" | "ltr" | "rtl";
  formatters?: Partial<SdkworkShellBridgeFormatters>;
  locale?: string;
  preferences?: SdkworkShellBridgePreferences;
  session?: Record<string, unknown>;
}

export interface SdkworkShellBridgeContextValue {
  actions: SdkworkShellBridgeActions;
  dir: "auto" | "ltr" | "rtl";
  formatters: SdkworkShellBridgeFormatters;
  locale: string;
  messages: SdkworkShellBridgeMessages;
  preferences: Required<Pick<SdkworkShellBridgePreferences, "themeColor" | "themeSelection">>
    & Pick<SdkworkShellBridgePreferences, "colorMode">;
  session?: Record<string, unknown>;
}

export interface SdkworkShellBridgeProviderProps extends PropsWithChildren {
  className?: string;
  messages?: SdkworkShellBridgeMessagesOverrides;
  overrides?: SdkworkThemeOverrides;
  value?: SdkworkShellBridgeValue | null;
}

const DEFAULT_SDKWORK_SHELL_BRIDGE_MESSAGES: SdkworkShellBridgeMessages = {
  dateRangePicker: {
    endDate: "End date",
    placeholder: "Select date range",
    presets: "Range presets",
    rangeLimitDay: "day",
    rangeLimitDays: "days",
    rangeLimitExceeded: "Range cannot exceed {amount} {unit}",
    rangeLimitHour: "hour",
    rangeLimitHours: "hours",
    selectEndDate: "Select end date",
    startDate: "Start date",
    to: "to",
  },
  windowControls: {
    close: "Close window",
    maximize: "Maximize window",
    minimize: "Minimize window",
    restore: "Restore window",
  },
};

function resolveDateValue(value: Date | number | string | null | undefined): Date | null {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  if (typeof value === "number") {
    const nextDate = new Date(value);
    return Number.isNaN(nextDate.getTime()) ? null : nextDate;
  }

  if (typeof value === "string") {
    const normalized = value.trim();
    if (!normalized) {
      return null;
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
      const [year, month, day] = normalized.split("-").map(Number);
      const nextDate = new Date(year, month - 1, day);
      return Number.isNaN(nextDate.getTime()) ? null : nextDate;
    }

    const nextDate = new Date(normalized);
    return Number.isNaN(nextDate.getTime()) ? null : nextDate;
  }

  return null;
}

function createDefaultShellFormatters(locale: string): SdkworkShellBridgeFormatters {
  return {
    formatDate(value, options) {
      const nextDate = resolveDateValue(value);
      if (!nextDate) {
        return "";
      }

      return new Intl.DateTimeFormat(locale, options).format(nextDate);
    },
    formatDateTime(value, options) {
      const nextDate = resolveDateValue(value);
      if (!nextDate) {
        return "";
      }

      return new Intl.DateTimeFormat(
        locale,
        options ?? {
          dateStyle: "medium",
          timeStyle: "short",
        },
      ).format(nextDate);
    },
    locale,
  };
}

function mergeShellBridgeMessages(
  base: SdkworkShellBridgeMessages,
  overrides?: SdkworkShellBridgeMessagesOverrides,
): SdkworkShellBridgeMessages {
  if (!overrides) {
    return base;
  }

  return {
    dateRangePicker: {
      ...base.dateRangePicker,
      ...overrides.dateRangePicker,
    },
    windowControls: {
      ...base.windowControls,
      ...overrides.windowControls,
    },
  };
}

const DEFAULT_SDKWORK_SHELL_BRIDGE: SdkworkShellBridgeContextValue = {
  actions: {},
  dir: "ltr",
  formatters: createDefaultShellFormatters("en-US"),
  locale: "en-US",
  messages: DEFAULT_SDKWORK_SHELL_BRIDGE_MESSAGES,
  preferences: {
    colorMode: "dark",
    themeColor: "lobster",
    themeSelection: "system",
  },
  session: undefined,
};

const SdkworkShellBridgeContext = createContext<SdkworkShellBridgeContextValue>(
  DEFAULT_SDKWORK_SHELL_BRIDGE,
);

export function SdkworkShellBridgeProvider({
  children,
  className,
  messages,
  overrides,
  value,
}: SdkworkShellBridgeProviderProps) {
  const inheritedBridge = useContext(SdkworkShellBridgeContext);
  const locale = value?.locale ?? inheritedBridge.locale;
  const defaultFormatters = useMemo(
    () => createDefaultShellFormatters(locale),
    [locale],
  );
  const resolvedFormatters = useMemo(
    () => ({
      ...defaultFormatters,
      ...value?.formatters,
      locale: value?.formatters?.locale ?? defaultFormatters.locale,
    }),
    [defaultFormatters, value?.formatters],
  );
  const resolvedMessages = useMemo(
    () => mergeShellBridgeMessages(inheritedBridge.messages, messages),
    [inheritedBridge.messages, messages],
  );
  const resolvedPreferences = useMemo(
    () => ({
      colorMode: value?.preferences?.colorMode ?? inheritedBridge.preferences.colorMode,
      themeColor: value?.preferences?.themeColor ?? inheritedBridge.preferences.themeColor,
      themeSelection: value?.preferences?.themeSelection ?? inheritedBridge.preferences.themeSelection,
    }),
    [
      inheritedBridge.preferences.colorMode,
      inheritedBridge.preferences.themeColor,
      inheritedBridge.preferences.themeSelection,
      value?.preferences?.colorMode,
      value?.preferences?.themeColor,
      value?.preferences?.themeSelection,
    ],
  );
  const resolvedBridge = useMemo(
    () => ({
      actions: value?.actions ?? inheritedBridge.actions,
      dir: value?.dir ?? inheritedBridge.dir,
      formatters: resolvedFormatters,
      locale,
      messages: resolvedMessages,
      preferences: resolvedPreferences,
      session: value?.session ?? inheritedBridge.session,
    }),
    [
      inheritedBridge.actions,
      inheritedBridge.dir,
      inheritedBridge.session,
      locale,
      resolvedFormatters,
      resolvedMessages,
      resolvedPreferences,
      value?.actions,
      value?.dir,
      value?.session,
    ],
  );

  return (
    <SdkworkShellBridgeContext.Provider value={resolvedBridge}>
      <SdkworkThemeProvider
        className={className}
        dir={resolvedBridge.dir}
        locale={resolvedBridge.locale}
        onThemeSelectionChange={resolvedBridge.actions.setThemeSelection}
        overrides={overrides}
        themeColor={resolvedBridge.preferences.themeColor}
        themeSelection={resolvedBridge.preferences.themeSelection}
      >
        {children}
      </SdkworkThemeProvider>
    </SdkworkShellBridgeContext.Provider>
  );
}

export function useSdkworkShellBridge(): SdkworkShellBridgeContextValue {
  return useContext(SdkworkShellBridgeContext);
}
