import { t as e } from "./utils-Bgb-Nm-x.js";
import { n as t } from "./slot-props-Cskv9Ttd.js";
import { t as n } from "./WorkspacePanel---JpIPPo.js";
import { i as r, n as i, r as a, t as o } from "./InspectorRail-C6mxRhT9.js";
import { d as s, l as c, u as l } from "./layout-HtOuA47M.js";
import * as u from "react";
import { jsx as d, jsxs as f } from "react/jsx-runtime";
//#region src/components/patterns/workspace/InspectorPanel.tsx
var p = u.forwardRef(({ children: t, className: n, footer: r, title: i, ...a }, o) => /* @__PURE__ */ f("aside", {
	ref: o,
	className: e("flex h-full flex-col rounded-[var(--sdk-radius-panel)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] shadow-[var(--sdk-shadow-sm)]", n),
	"data-sdk-pattern": "inspector-panel",
	"data-slot": "inspector-panel",
	...a,
	children: [
		i ? /* @__PURE__ */ d("div", {
			className: "border-b border-[var(--sdk-color-border-subtle)] px-5 py-4 text-sm font-semibold",
			"data-slot": "inspector-panel-title",
			children: i
		}) : null,
		/* @__PURE__ */ d("div", {
			className: "min-h-0 flex-1 px-5 py-4",
			"data-slot": "inspector-panel-body",
			children: t
		}),
		r ? /* @__PURE__ */ d("div", {
			className: "border-t border-[var(--sdk-color-border-subtle)] px-5 py-4",
			"data-slot": "inspector-panel-footer",
			children: r
		}) : null
	]
}));
p.displayName = "InspectorPanel";
//#endregion
//#region src/components/patterns/workspace/ListDetailWorkspace.tsx
function m(r, { actions: i, children: a, className: o, collapsedSize: s, collapsible: l, defaultSize: u, description: f, maxSize: p, minSize: m, slotProps: h, title: g, ..._ }, v) {
	return /* @__PURE__ */ d(c, {
		collapsedSize: s,
		collapsible: l,
		defaultSize: u ?? v.defaultSize,
		maxSize: p,
		minSize: m ?? v.minSize,
		...h?.panel,
		children: /* @__PURE__ */ d("div", {
			...t({
				className: "h-full",
				"data-sdk-region": r,
				"data-slot": `list-detail-workspace-${r}`
			}, h?.region),
			children: /* @__PURE__ */ d(n, {
				actions: i,
				className: e("h-full", o),
				description: f,
				slotProps: {
					body: h?.body,
					header: h?.header
				},
				title: g,
				..._,
				children: a
			})
		})
	});
}
function h({ children: n, className: r, collapsedSize: i, collapsible: a, defaultSize: s, footer: l, meta: u, side: f, stickyHeader: p, summary: m, maxSize: h, minSize: g, slotProps: _, title: v, variant: y, ...b }, x) {
	return /* @__PURE__ */ d(c, {
		collapsedSize: i,
		collapsible: a,
		defaultSize: s ?? x.defaultSize,
		maxSize: h,
		minSize: g ?? x.minSize,
		..._?.panel,
		children: /* @__PURE__ */ d("div", {
			...t({
				className: "h-full",
				"data-sdk-region": "detail",
				"data-slot": "list-detail-workspace-detail"
			}, _?.region),
			children: /* @__PURE__ */ d(o, {
				className: e("h-full", r),
				footer: l,
				meta: u,
				side: f,
				slotProps: {
					body: _?.body,
					footer: _?.footer,
					header: _?.header
				},
				stickyHeader: p,
				summary: m,
				title: v,
				variant: y,
				...b,
				children: n
			})
		})
	});
}
var g = u.forwardRef(({ className: n, content: r, detail: i, direction: a = "horizontal", resizeHandleMode: o = "grip", sidebar: c, slotProps: u, ...p }, g) => {
	let _ = o === "grip", v = !!c, y = !!i;
	return /* @__PURE__ */ d("div", {
		ref: g,
		className: e("h-full min-h-0 min-w-0", n),
		"data-sdk-pattern": "list-detail-workspace",
		"data-slot": "list-detail-workspace",
		...p,
		children: /* @__PURE__ */ f(l, {
			direction: a,
			...t({ className: "h-full" }, u?.panelGroup),
			children: [
				v ? m("sidebar", c, {
					defaultSize: 24,
					minSize: 18
				}) : null,
				v ? /* @__PURE__ */ d(s, { withHandle: _ }) : null,
				m("content", r, {
					defaultSize: v && y ? 52 : v || y ? 72 : 100,
					minSize: 28
				}),
				y ? /* @__PURE__ */ d(s, { withHandle: _ }) : null,
				y ? h(i, {
					defaultSize: 24,
					minSize: 18
				}) : null
			]
		})
	});
});
g.displayName = "ListDetailWorkspace";
//#endregion
//#region src/components/patterns/workspace/SectionHeader.tsx
var _ = u.forwardRef(({ actions: t, children: n, className: r, description: i, eyebrow: a, meta: o, sticky: s = !1, title: c, ...l }, u) => /* @__PURE__ */ f("div", {
	ref: u,
	className: e("border-b border-[var(--sdk-color-border-subtle)] bg-[var(--sdk-color-surface-panel)]/95 px-4 py-4 sm:px-6", s ? "sticky top-0 z-20 backdrop-blur-xl" : null, r),
	"data-sdk-pattern": "section-header",
	"data-slot": "section-header",
	...l,
	children: [a || c || i || o || t ? /* @__PURE__ */ f("div", {
		className: "flex flex-wrap items-start justify-between gap-3",
		"data-slot": "section-header-header",
		children: [/* @__PURE__ */ f("div", {
			className: "min-w-0 flex-1",
			children: [
				a ? /* @__PURE__ */ d("div", {
					className: "text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--sdk-color-text-muted)]",
					"data-slot": "section-header-eyebrow",
					children: a
				}) : null,
				c ? /* @__PURE__ */ d("div", {
					className: "mt-1 text-sm font-semibold text-[var(--sdk-color-text-primary)]",
					"data-slot": "section-header-title",
					children: c
				}) : null,
				i ? /* @__PURE__ */ d("div", {
					className: "mt-1 text-sm text-[var(--sdk-color-text-secondary)]",
					"data-slot": "section-header-description",
					children: i
				}) : null,
				o ? /* @__PURE__ */ d("div", {
					className: "mt-2",
					"data-slot": "section-header-meta",
					children: o
				}) : null
			]
		}), t ? /* @__PURE__ */ d("div", {
			className: "flex shrink-0 items-center gap-2",
			"data-slot": "section-header-actions",
			children: t
		}) : null]
	}) : null, n ? /* @__PURE__ */ d("div", {
		className: e(c || i || t ? "mt-4" : null),
		"data-slot": "section-header-content",
		children: n
	}) : null]
}));
_.displayName = "SectionHeader";
//#endregion
//#region src/components/patterns/workspace/WorkspaceScaffold.tsx
function v(r, { actions: i, children: a, className: o, collapsedSize: s, collapsible: l, defaultSize: u, description: f, maxSize: p, minSize: m, slotProps: h, title: g, ..._ }, v) {
	let { panel: y, region: b, ...x } = h ?? {};
	return /* @__PURE__ */ d(c, {
		...y,
		collapsedSize: s,
		collapsible: l,
		defaultSize: u ?? v.defaultSize,
		maxSize: p,
		minSize: m ?? v.minSize,
		children: /* @__PURE__ */ d("div", {
			...t({
				className: "h-full",
				"data-sdk-region": r,
				"data-slot": `workspace-scaffold-${r}`
			}, b),
			children: /* @__PURE__ */ d(n, {
				actions: i,
				className: e("h-full", o),
				description: f,
				slotProps: x,
				title: g,
				..._,
				children: a
			})
		})
	});
}
function y({ actions: n, children: r, className: i, collapsedSize: a, collapsible: s, defaultSize: l, description: u, eyebrow: f, footer: p, maxSize: m, meta: h, minSize: g, side: _, slotProps: v, stickyHeader: y, summary: b, title: x, variant: S }, C) {
	let { panel: w, region: T, ...E } = v ?? {};
	return /* @__PURE__ */ d(c, {
		...w,
		collapsedSize: a,
		collapsible: s,
		defaultSize: l ?? C.defaultSize,
		maxSize: m,
		minSize: g ?? C.minSize,
		children: /* @__PURE__ */ d("div", {
			...t({
				className: "h-full",
				"data-sdk-region": "inspector",
				"data-slot": "workspace-scaffold-inspector"
			}, T),
			children: /* @__PURE__ */ d(o, {
				actions: n,
				className: e("h-full", i),
				description: u,
				eyebrow: f,
				footer: p,
				meta: h,
				side: _,
				slotProps: E,
				stickyHeader: y,
				summary: b,
				title: x,
				variant: S,
				children: r
			})
		})
	});
}
var b = u.forwardRef(({ banner: n, bottomPanel: r, className: i, header: a, inspector: o, main: u, resizeHandleMode: p = "grip", sidebar: m, slotProps: h, statusBar: g, toolbar: _, workspaceDirection: b = "horizontal", ...x }, S) => {
	let C = p === "grip", w = !!m, T = !!o, E = !!r, D = /* @__PURE__ */ f(l, {
		...t({ className: "h-full" }, h?.mainGroup),
		direction: b,
		children: [
			w ? v("sidebar", m, {
				defaultSize: 22,
				minSize: 16
			}) : null,
			w ? /* @__PURE__ */ d(s, { withHandle: C }) : null,
			v("main", u, {
				defaultSize: w && T ? 56 : w || T ? 72 : 100,
				minSize: 32
			}),
			T ? /* @__PURE__ */ d(s, { withHandle: C }) : null,
			T ? y(o, {
				defaultSize: 22,
				minSize: 18
			}) : null
		]
	});
	return /* @__PURE__ */ f("div", {
		ref: S,
		className: e("flex h-full min-h-0 min-w-0 flex-col gap-4", i),
		"data-sdk-pattern": "workspace-scaffold",
		"data-slot": "workspace-scaffold",
		...x,
		children: [
			a ? /* @__PURE__ */ d("div", {
				...t({
					"data-sdk-region": "workspace-header",
					"data-slot": "workspace-scaffold-header"
				}, h?.header),
				children: a
			}) : null,
			n ? /* @__PURE__ */ d("div", {
				...t({
					"data-sdk-region": "workspace-banner",
					"data-slot": "workspace-scaffold-banner"
				}, h?.banner),
				children: n
			}) : null,
			_ ? /* @__PURE__ */ d("div", {
				...t({
					"data-sdk-region": "workspace-toolbar",
					"data-slot": "workspace-scaffold-toolbar"
				}, h?.toolbar),
				children: _
			}) : null,
			/* @__PURE__ */ d("div", {
				className: "min-h-0 min-w-0 flex-1",
				children: E ? /* @__PURE__ */ f(l, {
					...t({ className: "h-full" }, h?.bottomGroup),
					direction: "vertical",
					children: [
						/* @__PURE__ */ d(c, {
							defaultSize: 72,
							minSize: 34,
							children: /* @__PURE__ */ d("div", {
								...t({
									className: "h-full",
									"data-sdk-region": "workspace-main-split",
									"data-slot": "workspace-scaffold-main-split"
								}, h?.mainSplit),
								children: D
							})
						}),
						/* @__PURE__ */ d(s, { withHandle: C }),
						v("bottom", r, {
							defaultSize: 28,
							minSize: 18
						})
					]
				}) : /* @__PURE__ */ d("div", {
					...t({
						className: "h-full",
						"data-sdk-region": "workspace-main-split",
						"data-slot": "workspace-scaffold-main-split"
					}, h?.mainSplit),
					children: D
				})
			}),
			g ? /* @__PURE__ */ d("div", {
				...t({
					"data-sdk-region": "workspace-status-bar",
					"data-slot": "workspace-scaffold-status-bar"
				}, h?.statusBar),
				children: g
			}) : null
		]
	});
});
b.displayName = "WorkspaceScaffold";
//#endregion
export { p as InspectorPanel, o as InspectorRail, i as InspectorRailMetric, a as InspectorRailMetrics, r as InspectorRailSection, g as ListDetailWorkspace, _ as SectionHeader, n as WorkspacePanel, b as WorkspaceScaffold };

//# sourceMappingURL=patterns-workspace.js.map