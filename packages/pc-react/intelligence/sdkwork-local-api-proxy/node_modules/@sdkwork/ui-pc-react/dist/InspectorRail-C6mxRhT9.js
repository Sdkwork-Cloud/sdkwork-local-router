import { t as e } from "./utils-Bgb-Nm-x.js";
import { n as t } from "./slot-props-Cskv9Ttd.js";
import * as n from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/components/patterns/workspace/InspectorRail.tsx
var a = {
	docked: "border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] shadow-[var(--sdk-shadow-sm)]",
	sticky: "border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] shadow-[var(--sdk-shadow-md)]",
	drawer: "border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] shadow-[var(--sdk-shadow-lg)]"
}, o = {
	default: "text-[var(--sdk-color-text-primary)]",
	success: "text-[var(--sdk-color-state-success)]",
	warning: "text-[var(--sdk-color-state-warning)]",
	danger: "text-[var(--sdk-color-state-danger)]"
}, s = {
	1: "grid-cols-1",
	2: "grid-cols-1 sm:grid-cols-2",
	3: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
}, c = n.forwardRef(({ actions: n, children: o, className: s, description: c, eyebrow: l, footer: u, meta: d, side: f = "right", slotProps: p, stickyHeader: m = !1, summary: h, title: g, variant: _ = "docked", ...v }, y) => {
	let b = l || g || c || d || n || h;
	return /* @__PURE__ */ i("aside", {
		ref: y,
		className: e("flex h-full min-h-0 flex-col overflow-hidden rounded-[var(--sdk-radius-panel)]", a[_], s),
		"data-sdk-pattern": "inspector-rail",
		"data-side": f,
		"data-slot": "inspector-rail",
		"data-variant": _,
		...v,
		children: [
			b ? /* @__PURE__ */ i("div", {
				...t({
					className: e("border-b border-[var(--sdk-color-border-subtle)] bg-[var(--sdk-color-surface-panel)]/95 px-5 py-4", m ? "sticky top-0 z-10 backdrop-blur-xl" : null),
					"data-sdk-region": "inspector-rail-header",
					"data-slot": "inspector-rail-header"
				}, p?.header),
				children: [/* @__PURE__ */ i("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ i("div", {
						className: "min-w-0 flex-1",
						children: [
							l ? /* @__PURE__ */ r("div", {
								className: "text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--sdk-color-text-muted)]",
								"data-slot": "inspector-rail-eyebrow",
								children: l
							}) : null,
							g ? /* @__PURE__ */ r("div", {
								className: "mt-1 text-sm font-semibold text-[var(--sdk-color-text-primary)]",
								"data-slot": "inspector-rail-title",
								children: g
							}) : null,
							c ? /* @__PURE__ */ r("div", {
								className: "mt-1 text-sm text-[var(--sdk-color-text-secondary)]",
								"data-slot": "inspector-rail-description",
								children: c
							}) : null,
							d ? /* @__PURE__ */ r("div", {
								className: "mt-3",
								"data-slot": "inspector-rail-meta",
								children: d
							}) : null
						]
					}), n ? /* @__PURE__ */ r("div", {
						className: "flex shrink-0 items-center gap-2",
						"data-slot": "inspector-rail-actions",
						children: n
					}) : null]
				}), h ? /* @__PURE__ */ r("div", {
					className: "mt-4 rounded-[var(--sdk-radius-control)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel-muted)] px-4 py-3 text-sm text-[var(--sdk-color-text-secondary)]",
					"data-slot": "inspector-rail-summary",
					children: h
				}) : null]
			}) : null,
			/* @__PURE__ */ r("div", {
				className: "min-h-0 flex-1 overflow-y-auto",
				children: /* @__PURE__ */ r("div", {
					...t({
						className: "space-y-4 px-5 py-4",
						"data-sdk-region": "inspector-rail-body",
						"data-slot": "inspector-rail-body"
					}, p?.body),
					children: o
				})
			}),
			u ? /* @__PURE__ */ r("div", {
				...t({
					className: "border-t border-[var(--sdk-color-border-subtle)] px-5 py-4",
					"data-sdk-region": "inspector-rail-footer",
					"data-slot": "inspector-rail-footer"
				}, p?.footer),
				children: u
			}) : null
		]
	});
}), l = n.forwardRef(({ actions: t, children: n, className: a, description: o, title: s, ...c }, l) => /* @__PURE__ */ i("section", {
	ref: l,
	className: e("space-y-3 rounded-[var(--sdk-radius-panel)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] px-4 py-4 shadow-[var(--sdk-shadow-soft)]", a),
	"data-sdk-pattern": "inspector-rail-section",
	"data-slot": "inspector-rail-section",
	...c,
	children: [s || o || t ? /* @__PURE__ */ i("div", {
		className: "flex flex-wrap items-start justify-between gap-3",
		"data-slot": "inspector-rail-section-header",
		children: [/* @__PURE__ */ i("div", {
			className: "min-w-0 flex-1",
			children: [s ? /* @__PURE__ */ r("div", {
				className: "text-sm font-semibold text-[var(--sdk-color-text-primary)]",
				"data-slot": "inspector-rail-section-title",
				children: s
			}) : null, o ? /* @__PURE__ */ r("div", {
				className: "mt-1 text-sm text-[var(--sdk-color-text-secondary)]",
				"data-slot": "inspector-rail-section-description",
				children: o
			}) : null]
		}), t ? /* @__PURE__ */ r("div", {
			className: "flex shrink-0 items-center gap-2",
			"data-slot": "inspector-rail-section-actions",
			children: t
		}) : null]
	}) : null, n]
})), u = n.forwardRef(({ children: t, className: n, columns: i = 2, ...a }, o) => /* @__PURE__ */ r("div", {
	ref: o,
	className: e("grid gap-3", s[i], n),
	"data-sdk-pattern": "inspector-rail-metrics",
	"data-slot": "inspector-rail-metrics",
	...a,
	children: t
})), d = n.forwardRef(({ className: t, helper: n, label: a, tone: s = "default", value: c, ...l }, u) => /* @__PURE__ */ i("div", {
	ref: u,
	className: e("rounded-[var(--sdk-radius-control)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] px-4 py-3 shadow-[var(--sdk-shadow-soft)]", t),
	"data-sdk-pattern": "inspector-rail-metric",
	"data-slot": "inspector-rail-metric",
	"data-tone": s,
	...l,
	children: [
		/* @__PURE__ */ r("div", {
			className: "text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sdk-color-text-muted)]",
			"data-slot": "inspector-rail-metric-label",
			children: a
		}),
		/* @__PURE__ */ r("div", {
			className: e("mt-2 text-lg font-semibold", o[s]),
			"data-slot": "inspector-rail-metric-value",
			children: c
		}),
		n ? /* @__PURE__ */ r("div", {
			className: "mt-1 text-xs text-[var(--sdk-color-text-secondary)]",
			"data-slot": "inspector-rail-metric-helper",
			children: n
		}) : null
	]
}));
c.displayName = "InspectorRail", l.displayName = "InspectorRailSection", u.displayName = "InspectorRailMetrics", d.displayName = "InspectorRailMetric";
//#endregion
export { l as i, d as n, u as r, c as t };

//# sourceMappingURL=InspectorRail-C6mxRhT9.js.map