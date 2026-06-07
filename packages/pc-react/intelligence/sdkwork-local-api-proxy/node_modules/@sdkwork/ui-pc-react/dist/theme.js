import { a as e, i as t, n, o as r, r as i, t as a } from "./sdkwork-theme-BpO7u5Vk.js";
import { createContext as o, useContext as s, useEffect as c, useMemo as l, useState as u } from "react";
import { jsx as d } from "react/jsx-runtime";
//#region src/theme/theme-provider.tsx
var f = o(null);
function p() {
	return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}
function m({ children: t, className: n, defaultTheme: r = "system", dir: a, locale: o, onThemeSelectionChange: s, overrides: m, themeColor: h = "lobster", themeSelection: g }) {
	let [_, v] = u(r), [y, b] = u(() => p()), x = g ?? _, S = x === "system" ? y : x, C = l(() => i({
		...m,
		colorMode: S,
		themeColor: h
	}), [
		S,
		m,
		h
	]), w = l(() => e(C, h), [C, h]);
	c(() => {
		if (typeof window > "u" || typeof window.matchMedia != "function") return;
		let e = window.matchMedia("(prefers-color-scheme: light)"), t = (e) => {
			b(e.matches ? "light" : "dark");
		};
		return b(e.matches ? "light" : "dark"), e.addEventListener?.("change", t), e.addListener?.(t), () => {
			e.removeEventListener?.("change", t), e.removeListener?.(t);
		};
	}, []), c(() => {
		if (typeof document > "u") return;
		let e = document.documentElement, t = {
			dir: e.getAttribute("dir"),
			lang: e.getAttribute("lang"),
			theme: e.getAttribute("data-theme"),
			sdkColorMode: e.getAttribute("data-sdk-color-mode")
		}, n = e.classList.contains("dark"), r = Object.keys(w).map((t) => [t, e.style.getPropertyValue(t)]);
		return e.setAttribute("data-theme", h), e.setAttribute("data-sdk-color-mode", S), o ? e.setAttribute("lang", o) : e.removeAttribute("lang"), a ? e.setAttribute("dir", a) : e.removeAttribute("dir"), e.classList.toggle("dark", S === "dark"), Object.entries(w).forEach(([t, n]) => {
			e.style.setProperty(t, String(n));
		}), () => {
			e.classList.toggle("dark", n), t.sdkColorMode ? e.setAttribute("data-sdk-color-mode", t.sdkColorMode) : e.removeAttribute("data-sdk-color-mode"), t.theme ? e.setAttribute("data-theme", t.theme) : e.removeAttribute("data-theme"), t.dir ? e.setAttribute("dir", t.dir) : e.removeAttribute("dir"), t.lang ? e.setAttribute("lang", t.lang) : e.removeAttribute("lang"), r.forEach(([t, n]) => {
				n ? e.style.setProperty(t, n) : e.style.removeProperty(t);
			});
		};
	}, [
		S,
		a,
		w,
		o,
		h
	]);
	let T = (e) => {
		g === void 0 && v(e), s?.(e);
	}, E = l(() => ({
		colorMode: S,
		themeColor: h,
		setThemeSelection: T,
		themeSelection: x
	}), [
		S,
		T,
		h,
		x
	]);
	return /* @__PURE__ */ d(f.Provider, {
		value: E,
		children: /* @__PURE__ */ d("div", {
			className: n,
			dir: a,
			"data-sdk-color-mode": S,
			"data-theme": h,
			"data-sdk-theme-provider": "",
			lang: o,
			style: w,
			children: t
		})
	});
}
function h() {
	return s(f) ?? {
		colorMode: "dark",
		themeColor: "lobster",
		setThemeSelection: () => void 0,
		themeSelection: "system"
	};
}
//#endregion
//#region src/theme/shell-bridge-provider.tsx
var g = {
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
		to: "to"
	},
	windowControls: {
		close: "Close window",
		maximize: "Maximize window",
		minimize: "Minimize window",
		restore: "Restore window"
	}
};
function _(e) {
	if (e instanceof Date) return Number.isNaN(e.getTime()) ? null : e;
	if (typeof e == "number") {
		let t = new Date(e);
		return Number.isNaN(t.getTime()) ? null : t;
	}
	if (typeof e == "string") {
		let t = e.trim();
		if (!t) return null;
		if (/^\d{4}-\d{2}-\d{2}$/.test(t)) {
			let [e, n, r] = t.split("-").map(Number), i = new Date(e, n - 1, r);
			return Number.isNaN(i.getTime()) ? null : i;
		}
		let n = new Date(t);
		return Number.isNaN(n.getTime()) ? null : n;
	}
	return null;
}
function v(e) {
	return {
		formatDate(t, n) {
			let r = _(t);
			return r ? new Intl.DateTimeFormat(e, n).format(r) : "";
		},
		formatDateTime(t, n) {
			let r = _(t);
			return r ? new Intl.DateTimeFormat(e, n ?? {
				dateStyle: "medium",
				timeStyle: "short"
			}).format(r) : "";
		},
		locale: e
	};
}
function y(e, t) {
	return t ? {
		dateRangePicker: {
			...e.dateRangePicker,
			...t.dateRangePicker
		},
		windowControls: {
			...e.windowControls,
			...t.windowControls
		}
	} : e;
}
var b = o({
	actions: {},
	dir: "ltr",
	formatters: v("en-US"),
	locale: "en-US",
	messages: g,
	preferences: {
		colorMode: "dark",
		themeColor: "lobster",
		themeSelection: "system"
	},
	session: void 0
});
function x({ children: e, className: t, messages: n, overrides: r, value: i }) {
	let a = s(b), o = i?.locale ?? a.locale, c = l(() => v(o), [o]), u = l(() => ({
		...c,
		...i?.formatters,
		locale: i?.formatters?.locale ?? c.locale
	}), [c, i?.formatters]), f = l(() => y(a.messages, n), [a.messages, n]), p = l(() => ({
		colorMode: i?.preferences?.colorMode ?? a.preferences.colorMode,
		themeColor: i?.preferences?.themeColor ?? a.preferences.themeColor,
		themeSelection: i?.preferences?.themeSelection ?? a.preferences.themeSelection
	}), [
		a.preferences.colorMode,
		a.preferences.themeColor,
		a.preferences.themeSelection,
		i?.preferences?.colorMode,
		i?.preferences?.themeColor,
		i?.preferences?.themeSelection
	]), h = l(() => ({
		actions: i?.actions ?? a.actions,
		dir: i?.dir ?? a.dir,
		formatters: u,
		locale: o,
		messages: f,
		preferences: p,
		session: i?.session ?? a.session
	}), [
		a.actions,
		a.dir,
		a.session,
		o,
		u,
		f,
		p,
		i?.actions,
		i?.dir,
		i?.session
	]);
	return /* @__PURE__ */ d(b.Provider, {
		value: h,
		children: /* @__PURE__ */ d(m, {
			className: t,
			dir: h.dir,
			locale: h.locale,
			onThemeSelectionChange: h.actions.setThemeSelection,
			overrides: r,
			themeColor: h.preferences.themeColor,
			themeSelection: h.preferences.themeSelection,
			children: e
		})
	});
}
function S() {
	return s(b);
}
//#endregion
//#region src/theme/surface-recipes.ts
function C(e) {
	return e === "accent" ? "var(--sdk-color-brand-accent)" : e === "brand" ? "var(--sdk-color-brand-primary)" : e === "success" ? "var(--sdk-color-state-success)" : e === "warning" ? "var(--sdk-color-state-warning)" : e === "danger" ? "var(--sdk-color-state-danger)" : "var(--sdk-color-text-muted)";
}
function w(e, t = {}) {
	let n = t.backgroundWeight ?? 14, r = t.borderWeight ?? 28, i = C(e);
	return {
		backgroundColor: `color-mix(in srgb, ${i} ${n}%, transparent)`,
		borderColor: `color-mix(in srgb, ${i} ${r}%, transparent)`,
		color: i
	};
}
function T(e, t = {}) {
	let n = t.backgroundWeight ?? 10, r = t.borderWeight ?? 30, i = t.surfaceColor ?? "var(--sdk-color-surface-panel)", a = t.surfaceWeight ?? 96, o = C(e);
	return {
		backgroundImage: `linear-gradient(180deg, color-mix(in srgb, ${o} ${n}%, transparent), color-mix(in srgb, ${i} ${a}%, white))`,
		borderColor: `color-mix(in srgb, ${o} ${r}%, transparent)`
	};
}
function E(e, t = {}) {
	let n = t.backgroundWeight ?? 14, r = t.borderWeight ?? 28, i = t.surfaceColor ?? "var(--sdk-color-surface-panel)", a = t.surfaceWeight ?? 86, o = C(e);
	return {
		backgroundColor: `color-mix(in srgb, ${i} 18%, transparent)`,
		backgroundImage: `linear-gradient(180deg, color-mix(in srgb, ${o} ${n}%, transparent), color-mix(in srgb, ${i} ${a}%, transparent))`,
		borderColor: `color-mix(in srgb, ${o} ${r}%, transparent)`
	};
}
function D() {
	return { backgroundImage: "radial-gradient(circle at top left, color-mix(in srgb, var(--sdk-color-brand-primary) 14%, transparent), transparent 38%), radial-gradient(circle at top right, color-mix(in srgb, var(--sdk-color-brand-accent) 10%, transparent), transparent 42%)" };
}
function O() {
	return { backgroundImage: "radial-gradient(circle at top right, color-mix(in srgb, var(--sdk-color-brand-accent) 18%, transparent), transparent 34%), radial-gradient(circle at bottom left, color-mix(in srgb, var(--sdk-color-brand-primary) 16%, transparent), transparent 38%), linear-gradient(135deg, color-mix(in srgb, var(--sdk-color-surface-canvas) 42%, black), color-mix(in srgb, var(--sdk-color-surface-panel) 44%, black) 48%, color-mix(in srgb, var(--sdk-color-surface-elevated) 56%, black))" };
}
//#endregion
export { a as SDKWORK_DARK_THEME, n as SDKWORK_LIGHT_THEME, x as SdkworkShellBridgeProvider, m as SdkworkThemeProvider, D as createSdkworkBackdropStyle, E as createSdkworkGlassStyle, O as createSdkworkHeroStyle, T as createSdkworkPanelStyle, i as createSdkworkTheme, w as createSdkworkToneStyle, t as createThemeCssVariables, e as createThemeHostCssVariables, r as createThemeStyle, S as useSdkworkShellBridge, h as useSdkworkTheme };

//# sourceMappingURL=theme.js.map