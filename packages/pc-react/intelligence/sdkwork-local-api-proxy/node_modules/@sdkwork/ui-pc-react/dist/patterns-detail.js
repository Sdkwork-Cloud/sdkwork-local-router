import { t as e } from "./utils-Bgb-Nm-x.js";
import { n as t } from "./slot-props-Cskv9Ttd.js";
import { S as n, T as r, _ as i, b as a, g as o, x as s, y as c } from "./overlays-Bdc2fkCy.js";
import * as l from "react";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/components/patterns/detail/DetailDrawer.tsx
var f = {
	default: "text-[var(--sdk-color-text-primary)]",
	success: "text-[var(--sdk-color-state-success)]",
	warning: "text-[var(--sdk-color-state-warning)]",
	danger: "text-[var(--sdk-color-state-danger)]"
}, p = {
	1: "grid-cols-1",
	2: "grid-cols-1 sm:grid-cols-2",
	3: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
}, m = l.forwardRef(({ actions: l, children: f, className: p, description: m, eyebrow: h, footer: g, size: _ = "lg", side: v = "right", slotProps: y, summary: b, title: x, ...S }, C) => /* @__PURE__ */ u(o, {
	...S,
	children: /* @__PURE__ */ u(c, {
		...m ? {} : { "aria-describedby": void 0 },
		...t({
			className: e("gap-0 overflow-hidden", p),
			"data-sdk-region": "detail-drawer-content",
			"data-slot": "detail-drawer-content"
		}, y?.content),
		size: _,
		side: v,
		children: /* @__PURE__ */ d("div", {
			ref: C,
			className: "flex h-full min-h-0 flex-col overflow-hidden",
			"data-sdk-pattern": "detail-drawer",
			"data-slot": "detail-drawer",
			children: [
				/* @__PURE__ */ d(n, {
					...t({
						"data-sdk-region": "detail-drawer-header",
						"data-slot": "detail-drawer-header"
					}, y?.header),
					children: [/* @__PURE__ */ d("div", {
						className: "flex flex-wrap items-start justify-between gap-3",
						children: [/* @__PURE__ */ d("div", {
							className: "min-w-0 flex-1",
							children: [
								h ? /* @__PURE__ */ u("div", {
									className: "text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--sdk-color-text-muted)]",
									"data-slot": "detail-drawer-eyebrow",
									children: h
								}) : null,
								/* @__PURE__ */ u(r, {
									className: e(h ? "mt-1" : null),
									"data-slot": "detail-drawer-title",
									children: x
								}),
								m ? /* @__PURE__ */ u(a, {
									className: "mt-1.5",
									"data-slot": "detail-drawer-description",
									children: m
								}) : null
							]
						}), l ? /* @__PURE__ */ u("div", {
							className: "flex shrink-0 items-center gap-2 pr-8",
							"data-slot": "detail-drawer-actions",
							children: l
						}) : null]
					}), b ? /* @__PURE__ */ u("div", {
						className: "rounded-[var(--sdk-radius-panel)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel-muted)] px-4 py-3 text-sm text-[var(--sdk-color-text-secondary)]",
						"data-slot": "detail-drawer-summary",
						children: b
					}) : null]
				}),
				/* @__PURE__ */ u(i, {
					...t({
						className: "space-y-4",
						"data-sdk-region": "detail-drawer-body",
						"data-slot": "detail-drawer-body"
					}, y?.body),
					children: f
				}),
				g ? /* @__PURE__ */ u(s, {
					...t({
						"data-sdk-region": "detail-drawer-footer",
						"data-slot": "detail-drawer-footer"
					}, y?.footer),
					children: g
				}) : null
			]
		})
	})
})), h = l.forwardRef(({ actions: t, children: n, className: r, description: i, title: a, ...o }, s) => /* @__PURE__ */ d("section", {
	ref: s,
	className: e("space-y-3 rounded-[var(--sdk-radius-panel)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] px-4 py-4 shadow-[var(--sdk-shadow-soft)]", r),
	"data-sdk-pattern": "detail-drawer-section",
	"data-slot": "detail-drawer-section",
	...o,
	children: [a || i || t ? /* @__PURE__ */ d("div", {
		className: "flex flex-wrap items-start justify-between gap-3",
		"data-slot": "detail-drawer-section-header",
		children: [/* @__PURE__ */ d("div", {
			className: "min-w-0 flex-1",
			children: [a ? /* @__PURE__ */ u("div", {
				className: "text-sm font-semibold text-[var(--sdk-color-text-primary)]",
				"data-slot": "detail-drawer-section-title",
				children: a
			}) : null, i ? /* @__PURE__ */ u("div", {
				className: "mt-1 text-sm text-[var(--sdk-color-text-secondary)]",
				"data-slot": "detail-drawer-section-description",
				children: i
			}) : null]
		}), t ? /* @__PURE__ */ u("div", {
			className: "flex shrink-0 items-center gap-2",
			"data-slot": "detail-drawer-section-actions",
			children: t
		}) : null]
	}) : null, n]
})), g = l.forwardRef(({ children: t, className: n, columns: r = 2, ...i }, a) => /* @__PURE__ */ u("div", {
	ref: a,
	className: e("grid gap-3", p[r], n),
	"data-sdk-pattern": "detail-drawer-metrics",
	"data-slot": "detail-drawer-metrics",
	...i,
	children: t
})), _ = l.forwardRef(({ className: t, helper: n, label: r, tone: i = "default", value: a, ...o }, s) => /* @__PURE__ */ d("div", {
	ref: s,
	className: e("rounded-[var(--sdk-radius-control)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] px-4 py-3 shadow-[var(--sdk-shadow-soft)]", t),
	"data-sdk-pattern": "detail-drawer-metric",
	"data-slot": "detail-drawer-metric",
	"data-tone": i,
	...o,
	children: [
		/* @__PURE__ */ u("div", {
			className: "text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sdk-color-text-muted)]",
			"data-slot": "detail-drawer-metric-label",
			children: r
		}),
		/* @__PURE__ */ u("div", {
			className: e("mt-2 text-lg font-semibold", f[i]),
			"data-slot": "detail-drawer-metric-value",
			children: a
		}),
		n ? /* @__PURE__ */ u("div", {
			className: "mt-1 text-xs text-[var(--sdk-color-text-secondary)]",
			"data-slot": "detail-drawer-metric-helper",
			children: n
		}) : null
	]
}));
m.displayName = "DetailDrawer", _.displayName = "DetailDrawerMetric", g.displayName = "DetailDrawerMetrics", h.displayName = "DetailDrawerSection";
//#endregion
//#region src/components/patterns/detail/OperationDrawer.tsx
var v = l.forwardRef(({ actions: l, badge: f, children: p, className: m, description: h, eyebrow: g, footer: _, side: v = "right", sidebar: y, size: b = "xl", slotProps: x, title: S, ...C }, w) => /* @__PURE__ */ u(o, {
	...C,
	children: /* @__PURE__ */ u(c, {
		...h ? {} : { "aria-describedby": void 0 },
		...t({
			className: "gap-0 overflow-hidden border-[color-mix(in_srgb,var(--sdk-color-border-default)_88%,transparent)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--sdk-color-surface-panel)_98%,white_2%)_0%,color-mix(in_srgb,var(--sdk-color-surface-panel-muted)_90%,transparent)_100%)]",
			"data-sdk-region": "operation-drawer-content",
			"data-slot": "operation-drawer-content"
		}, x?.content),
		side: v,
		size: b,
		children: /* @__PURE__ */ u("div", {
			...t({
				className: "h-full min-h-0 min-w-0",
				"data-sdk-region": "operation-drawer-surface",
				"data-slot": "operation-drawer-surface"
			}, x?.surface),
			children: /* @__PURE__ */ d("div", {
				ref: w,
				className: e("relative flex h-full min-h-0 min-w-0 flex-col overflow-hidden", m),
				"data-sdk-pattern": "operation-drawer",
				"data-slot": "operation-drawer",
				children: [
					/* @__PURE__ */ u("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,color-mix(in_srgb,var(--sdk-color-brand-primary)_18%,transparent),transparent_62%)]" }),
					/* @__PURE__ */ u(n, {
						...t({
							className: "relative border-b-[color-mix(in_srgb,var(--sdk-color-border-default)_78%,transparent)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--sdk-color-surface-panel)_96%,white_4%)_0%,color-mix(in_srgb,var(--sdk-color-surface-panel-muted)_88%,transparent)_100%)] px-5 py-4 xl:px-6",
							"data-sdk-region": "operation-drawer-header",
							"data-slot": "operation-drawer-header"
						}, x?.header),
						children: /* @__PURE__ */ d("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ d("div", {
								className: "min-w-0 flex-1",
								children: [
									g ? /* @__PURE__ */ u("div", {
										className: "text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--sdk-color-text-muted)]",
										"data-slot": "operation-drawer-eyebrow",
										children: g
									}) : null,
									/* @__PURE__ */ d("div", {
										className: e("flex flex-wrap items-center gap-3", g ? "mt-2" : null),
										children: [/* @__PURE__ */ u(r, {
											className: "text-[1.45rem] tracking-tight",
											"data-slot": "operation-drawer-title",
											children: S
										}), f ? /* @__PURE__ */ u("div", {
											className: "shrink-0",
											children: f
										}) : null]
									}),
									h ? /* @__PURE__ */ u(a, {
										className: "mt-2 max-w-4xl text-sm leading-6",
										"data-slot": "operation-drawer-description",
										children: h
									}) : null
								]
							}), l ? /* @__PURE__ */ u("div", {
								className: "flex shrink-0 items-center gap-2 pr-8",
								"data-slot": "operation-drawer-actions",
								children: l
							}) : null]
						})
					}),
					/* @__PURE__ */ d("div", {
						className: "relative flex min-h-0 flex-1 overflow-hidden",
						children: [/* @__PURE__ */ u(i, {
							...t({
								className: e("min-h-0 flex-1 px-4 py-4 xl:px-5", y ? "xl:border-r xl:border-[color-mix(in_srgb,var(--sdk-color-border-default)_72%,transparent)]" : null),
								"data-sdk-region": "operation-drawer-body",
								"data-slot": "operation-drawer-body"
							}, x?.body),
							children: p
						}), y ? /* @__PURE__ */ u("aside", {
							...t({
								className: "hidden w-[320px] shrink-0 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--sdk-color-surface-panel-muted)_92%,transparent)_0%,color-mix(in_srgb,var(--sdk-color-surface-canvas)_86%,transparent)_100%)] xl:flex xl:min-h-0 xl:flex-col",
								"data-sdk-region": "operation-drawer-sidebar",
								"data-slot": "operation-drawer-sidebar"
							}, x?.sidebar),
							children: /* @__PURE__ */ u("div", {
								className: "min-h-0 flex-1 overflow-y-auto p-5",
								children: y
							})
						}) : null]
					}),
					_ ? /* @__PURE__ */ u(s, {
						...t({
							className: "border-t-[color-mix(in_srgb,var(--sdk-color-border-default)_78%,transparent)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--sdk-color-surface-panel)_94%,white_4%)_0%,color-mix(in_srgb,var(--sdk-color-surface-panel-muted)_88%,transparent)_100%)] px-5 py-3.5 xl:px-6",
							"data-sdk-region": "operation-drawer-footer",
							"data-slot": "operation-drawer-footer"
						}, x?.footer),
						children: _
					}) : null
				]
			})
		})
	})
}));
v.displayName = "OperationDrawer";
//#endregion
export { m as DetailDrawer, _ as DetailDrawerMetric, g as DetailDrawerMetrics, h as DetailDrawerSection, v as OperationDrawer };

//# sourceMappingURL=patterns-detail.js.map