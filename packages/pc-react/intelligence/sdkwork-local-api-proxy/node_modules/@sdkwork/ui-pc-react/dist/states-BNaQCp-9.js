import { t as e } from "./utils-Bgb-Nm-x.js";
import { r as t } from "./button-DW2aECbt.js";
import { t as n } from "./createLucideIcon-DYUOEYxe.js";
import * as r from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
var o = n("activity", [["path", {
	d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
	key: "169zse"
}]]), s = r.forwardRef(({ actions: t, className: n, description: r, title: o, ...s }, c) => /* @__PURE__ */ a("div", {
	ref: c,
	className: e("flex flex-col items-center justify-center gap-3 rounded-[var(--sdk-radius-panel)] border border-dashed border-[var(--sdk-color-border-strong)] bg-[var(--sdk-color-surface-panel)] px-6 py-12 text-center", n),
	"data-sdk-ui": "empty-state",
	"data-slot": "empty-state",
	...s,
	children: [
		o ? /* @__PURE__ */ i("div", {
			className: "text-lg font-semibold",
			"data-slot": "empty-state-title",
			children: o
		}) : null,
		r ? /* @__PURE__ */ i("div", {
			className: "max-w-xl text-sm text-[var(--sdk-color-text-secondary)]",
			"data-slot": "empty-state-description",
			children: r
		}) : null,
		t ? /* @__PURE__ */ i("div", {
			className: "mt-2 flex items-center gap-3",
			"data-slot": "empty-state-actions",
			children: t
		}) : null
	]
})), c = r.forwardRef(({ className: n, label: r = "Loading...", ...o }, s) => /* @__PURE__ */ a("div", {
	ref: s,
	className: e("flex items-center justify-center gap-3 rounded-[var(--sdk-radius-panel)] border border-[var(--sdk-color-border-subtle)] bg-[var(--sdk-color-surface-panel)] px-6 py-8 text-sm text-[var(--sdk-color-text-secondary)]", n),
	"data-sdk-ui": "loading-block",
	"data-slot": "loading-block",
	...o,
	children: [/* @__PURE__ */ i(t, {
		className: "h-4 w-4 animate-spin",
		"data-slot": "loading-block-indicator"
	}), /* @__PURE__ */ i("span", {
		"data-slot": "loading-block-label",
		children: r
	})]
})), l = {
	default: "border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-brand-primary-soft)] text-[var(--sdk-color-text-primary)]",
	success: "border-[color-mix(in_srgb,var(--sdk-color-state-success)_32%,transparent)] bg-[color-mix(in_srgb,var(--sdk-color-state-success)_14%,transparent)] text-[var(--sdk-color-text-primary)]",
	warning: "border-[color-mix(in_srgb,var(--sdk-color-state-warning)_32%,transparent)] bg-[color-mix(in_srgb,var(--sdk-color-state-warning)_14%,transparent)] text-[var(--sdk-color-text-primary)]",
	danger: "border-[color-mix(in_srgb,var(--sdk-color-state-danger)_32%,transparent)] bg-[color-mix(in_srgb,var(--sdk-color-state-danger)_14%,transparent)] text-[var(--sdk-color-text-primary)]"
}, u = r.forwardRef(({ children: t, className: n, title: r, tone: o = "default", ...s }, c) => /* @__PURE__ */ a("div", {
	ref: c,
	className: e("rounded-[var(--sdk-radius-panel)] border px-4 py-3 shadow-[var(--sdk-shadow-sm)]", l[o], n),
	"data-sdk-ui": "status-notice",
	"data-slot": "status-notice",
	...s,
	children: [r ? /* @__PURE__ */ i("div", {
		className: "text-sm font-semibold",
		"data-slot": "status-notice-title",
		children: r
	}) : null, t ? /* @__PURE__ */ i("div", {
		className: e(r ? "mt-1 text-sm" : "text-sm"),
		"data-slot": "status-notice-body",
		children: t
	}) : null]
}));
s.displayName = "EmptyState", c.displayName = "LoadingBlock", u.displayName = "StatusNotice";
//#endregion
export { o as i, c as n, u as r, s as t };

//# sourceMappingURL=states-BNaQCp-9.js.map