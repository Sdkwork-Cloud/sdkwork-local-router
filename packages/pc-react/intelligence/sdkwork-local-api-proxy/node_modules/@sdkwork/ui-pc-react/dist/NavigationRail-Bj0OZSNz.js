import { t as e } from "./utils-Bgb-Nm-x.js";
import { o as t, t as n } from "./sdkwork-theme-BpO7u5Vk.js";
import * as r from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/components/patterns/app-shell/AppShell.tsx
var o = r.forwardRef(({ className: r, content: o, footer: s, header: c, sidebar: l, sidebarWidth: u = 280, style: d, theme: f = n, ...p }, m) => /* @__PURE__ */ a("div", {
	ref: m,
	className: e("flex min-h-screen w-full flex-col bg-[var(--sdk-color-surface-canvas)] text-[var(--sdk-color-text-primary)]", r),
	"data-sdk-color-mode": f.colorMode,
	"data-sdk-pattern": "app-shell",
	"data-sdk-shell": "app",
	"data-slot": "app-shell",
	...p,
	style: {
		...t(f),
		...d
	},
	children: [
		c ? /* @__PURE__ */ i("header", {
			className: "border-b border-[var(--sdk-color-border-subtle)] bg-[var(--sdk-color-surface-panel)]/90 backdrop-blur",
			"data-sdk-region": "header",
			"data-slot": "app-shell-header",
			children: c
		}) : null,
		/* @__PURE__ */ a("div", {
			className: "flex min-h-0 flex-1",
			"data-sdk-region": "body",
			"data-slot": "app-shell-body",
			children: [l ? /* @__PURE__ */ i("aside", {
				className: "min-h-0 shrink-0 border-r border-[var(--sdk-color-border-subtle)] bg-[var(--sdk-color-surface-panel)]",
				"data-sdk-region": "sidebar",
				"data-slot": "app-shell-sidebar",
				style: { width: u },
				children: l
			}) : null, /* @__PURE__ */ i("main", {
				className: "min-h-0 min-w-0 flex-1",
				"data-sdk-region": "content",
				"data-slot": "app-shell-content",
				children: o ?? null
			})]
		}),
		s ? /* @__PURE__ */ i("footer", {
			className: "border-t border-[var(--sdk-color-border-subtle)] bg-[var(--sdk-color-surface-panel)]/80",
			"data-sdk-region": "footer",
			"data-slot": "app-shell-footer",
			children: s
		}) : null
	]
}));
o.displayName = "AppShell";
//#endregion
//#region src/components/patterns/app-shell/NavigationRail.tsx
var s = r.forwardRef(({ children: t, className: n, footer: r, header: o, ...s }, c) => /* @__PURE__ */ a("nav", {
	ref: c,
	className: e("flex h-full flex-col gap-4 px-4 py-5 text-[var(--sdk-color-text-secondary)]", n),
	"data-sdk-pattern": "navigation-rail",
	"data-slot": "navigation-rail",
	...s,
	children: [
		o ? /* @__PURE__ */ i("div", {
			className: "shrink-0",
			"data-slot": "navigation-rail-header",
			children: o
		}) : null,
		/* @__PURE__ */ i("div", {
			className: "flex min-h-0 flex-1 flex-col gap-2",
			"data-slot": "navigation-rail-body",
			children: t
		}),
		r ? /* @__PURE__ */ i("div", {
			className: "shrink-0 pt-2",
			"data-slot": "navigation-rail-footer",
			children: r
		}) : null
	]
}));
s.displayName = "NavigationRail";
//#endregion
export { o as n, s as t };

//# sourceMappingURL=NavigationRail-Bj0OZSNz.js.map