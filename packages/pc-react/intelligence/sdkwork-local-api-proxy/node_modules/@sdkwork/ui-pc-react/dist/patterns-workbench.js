import { t as e } from "./utils-Bgb-Nm-x.js";
import { n as t } from "./slot-props-Cskv9Ttd.js";
import { m as n } from "./data-display-CdBs3QSo.js";
import { t as r } from "./PageHeader-D4ImqJpt.js";
import { t as i } from "./WorkspacePanel---JpIPPo.js";
import { t as a } from "./InspectorRail-C6mxRhT9.js";
import * as o from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/components/patterns/workbench/ManagementWorkbench.tsx
function l(e) {
	return typeof e == "number" ? `${e}px` : e;
}
var u = o.forwardRef(({ actions: n, className: o, description: u, detail: d, detailWidth: f = 320, eyebrow: p, filters: m, footer: h, main: g, selectionBar: _, slotProps: v, title: y, ...b }, x) => {
	let { actions: S, children: C, className: w, description: T, slotProps: E, title: D, ...O } = g, k = t({
		className: e("h-full", w),
		...O
	}, v?.main), A = d ? { gridTemplateColumns: `minmax(0, 1fr) ${l(f)}` } : void 0;
	return /* @__PURE__ */ c("div", {
		ref: x,
		className: e("flex h-full min-h-0 min-w-0 flex-col gap-4", o),
		"data-sdk-pattern": "management-workbench",
		"data-slot": "management-workbench",
		...b,
		children: [
			/* @__PURE__ */ s(r, {
				actions: n,
				"data-slot": "management-workbench-header",
				description: u,
				eyebrow: p,
				...v?.header,
				title: y
			}),
			m ? /* @__PURE__ */ s("div", {
				...t({
					"data-sdk-region": "management-workbench-filters",
					"data-slot": "management-workbench-filters"
				}, v?.filters),
				children: m
			}) : null,
			_ ? /* @__PURE__ */ s("div", {
				...t({
					"data-sdk-region": "management-workbench-selection-bar",
					"data-slot": "management-workbench-selection-bar"
				}, v?.selectionBar),
				children: _
			}) : null,
			/* @__PURE__ */ c("div", {
				...t({
					className: e("min-h-0 min-w-0", d ? "grid gap-4 xl:grid" : null),
					"data-sdk-region": "management-workbench-content",
					"data-slot": "management-workbench-content",
					style: A
				}, v?.content),
				children: [/* @__PURE__ */ s(i, {
					actions: S,
					"data-slot": "management-workbench-main",
					description: T,
					...k,
					slotProps: E,
					title: D,
					children: C
				}), d ? /* @__PURE__ */ s(a, {
					...d,
					className: e("h-full", d.className),
					"data-slot": "management-workbench-detail"
				}) : null]
			}),
			h ? /* @__PURE__ */ s("div", {
				...t({
					"data-sdk-region": "management-workbench-footer",
					"data-slot": "management-workbench-footer"
				}, v?.footer),
				children: h
			}) : null
		]
	});
});
u.displayName = "ManagementWorkbench";
//#endregion
//#region src/components/patterns/workbench/CrudWorkbench.tsx
function d({ detail: r, editor: a, slotProps: o, table: l, ...d }) {
	let { className: f, description: p, title: m, ...h } = l;
	return /* @__PURE__ */ s(u, {
		...d,
		"data-slot": "crud-workbench",
		"data-sdk-pattern": "crud-workbench",
		detail: r,
		main: {
			...o?.main,
			description: p,
			title: m,
			children: /* @__PURE__ */ c("div", {
				...t({
					className: "flex h-full min-h-0 flex-col gap-4",
					"data-sdk-region": "crud-workbench-stack",
					"data-slot": "crud-workbench-stack"
				}, o?.stack),
				children: [/* @__PURE__ */ s(n, {
					...h,
					className: e("min-h-0", f)
				}), a ? /* @__PURE__ */ s(i, {
					...a,
					className: e("shrink-0", a.className),
					"data-slot": "crud-workbench-editor"
				}) : null]
			})
		}
	});
}
d.displayName = "CrudWorkbench";
//#endregion
export { d as CrudWorkbench, u as ManagementWorkbench };

//# sourceMappingURL=patterns-workbench.js.map