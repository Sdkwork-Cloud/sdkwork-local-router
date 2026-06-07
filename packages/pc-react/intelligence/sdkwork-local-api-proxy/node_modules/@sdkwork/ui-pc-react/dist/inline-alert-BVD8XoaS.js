import { t as e } from "./utils-Bgb-Nm-x.js";
import { t } from "./createLucideIcon-DYUOEYxe.js";
import { t as n } from "./circle-alert-DLMwBG2c.js";
import { t as r } from "./circle-check-BkTcTpgo.js";
import { t as i } from "./triangle-alert-BO2W8DLJ.js";
import * as a from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
var c = t("info", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M12 16v-4",
		key: "1dtifu"
	}],
	["path", {
		d: "M12 8h.01",
		key: "e9boi3"
	}]
]);
//#endregion
//#region src/components/ui/progress.tsx
function l(e) {
	return typeof e != "number" || Number.isNaN(e) ? 0 : Math.min(100, Math.max(0, e));
}
var u = a.forwardRef(({ className: t, value: n = 0, ...r }, i) => {
	let a = l(n);
	return /* @__PURE__ */ o("div", {
		ref: i,
		"aria-valuemax": 100,
		"aria-valuemin": 0,
		"aria-valuenow": a,
		className: e("relative h-2.5 w-full overflow-hidden rounded-[var(--sdk-radius-pill)] bg-[var(--sdk-color-surface-panel-muted)]", t),
		"data-sdk-ui": "progress",
		"data-slot": "progress",
		role: "progressbar",
		...r,
		children: /* @__PURE__ */ o("div", {
			className: "h-full rounded-[var(--sdk-radius-pill)] bg-[var(--sdk-color-brand-primary)] transition-[width] duration-200",
			"data-sdk-ui": "progress-indicator",
			"data-slot": "progress-indicator",
			"data-testid": "sdk-progress-indicator",
			style: { width: `${a}%` }
		})
	});
});
u.displayName = "Progress";
//#endregion
//#region src/components/ui/feedback/inline-alert.tsx
var d = {
	default: "border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel-muted)] text-[var(--sdk-color-text-primary)]",
	info: "border-[color-mix(in_srgb,var(--sdk-color-state-info)_32%,transparent)] bg-[color-mix(in_srgb,var(--sdk-color-state-info)_14%,transparent)] text-[var(--sdk-color-text-primary)]",
	success: "border-[color-mix(in_srgb,var(--sdk-color-state-success)_32%,transparent)] bg-[color-mix(in_srgb,var(--sdk-color-state-success)_14%,transparent)] text-[var(--sdk-color-text-primary)]",
	warning: "border-[color-mix(in_srgb,var(--sdk-color-state-warning)_32%,transparent)] bg-[color-mix(in_srgb,var(--sdk-color-state-warning)_14%,transparent)] text-[var(--sdk-color-text-primary)]",
	danger: "border-[color-mix(in_srgb,var(--sdk-color-state-danger)_32%,transparent)] bg-[color-mix(in_srgb,var(--sdk-color-state-danger)_14%,transparent)] text-[var(--sdk-color-text-primary)]"
}, f = {
	default: c,
	info: c,
	success: r,
	warning: i,
	danger: n
}, p = a.forwardRef(({ actions: t, className: n, description: r, showIcon: i = !0, title: a, tone: c = "default", ...l }, u) => {
	let p = f[c];
	return /* @__PURE__ */ s("div", {
		ref: u,
		className: e("flex items-start gap-3 rounded-[var(--sdk-radius-control)] border px-4 py-3 shadow-[var(--sdk-shadow-sm)]", d[c], n),
		"data-sdk-ui": "inline-alert",
		"data-slot": "inline-alert",
		role: "alert",
		...l,
		children: [
			i ? /* @__PURE__ */ o(p, {
				className: "mt-0.5 h-4 w-4 shrink-0",
				"data-slot": "inline-alert-icon"
			}) : null,
			/* @__PURE__ */ s("div", {
				className: "min-w-0 flex-1",
				"data-slot": "inline-alert-body",
				children: [a ? /* @__PURE__ */ o("div", {
					className: "text-sm font-semibold",
					"data-slot": "inline-alert-title",
					children: a
				}) : null, r ? /* @__PURE__ */ o("div", {
					className: e("text-sm text-[var(--sdk-color-text-secondary)]", a ? "mt-1" : void 0),
					"data-slot": "inline-alert-description",
					children: r
				}) : null]
			}),
			t ? /* @__PURE__ */ o("div", {
				className: "flex shrink-0 items-center gap-2",
				"data-slot": "inline-alert-actions",
				children: t
			}) : null
		]
	});
});
p.displayName = "InlineAlert";
//#endregion
export { u as n, c as r, p as t };

//# sourceMappingURL=inline-alert-BVD8XoaS.js.map