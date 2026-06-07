import { t as e } from "./utils-Bgb-Nm-x.js";
import * as t from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/patterns/app-shell/PageHeader.tsx
var i = t.forwardRef(({ actions: t, className: i, description: a, eyebrow: o, title: s, ...c }, l) => /* @__PURE__ */ r("div", {
	ref: l,
	className: e("flex flex-col gap-4 border-b border-[var(--sdk-color-border-subtle)] px-6 py-5 md:flex-row md:items-end md:justify-between", i),
	"data-sdk-pattern": "page-header",
	"data-slot": "page-header",
	...c,
	children: [/* @__PURE__ */ r("div", {
		className: "space-y-2",
		children: [
			o ? /* @__PURE__ */ n("div", {
				className: "text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sdk-color-text-muted)]",
				"data-slot": "page-header-eyebrow",
				children: o
			}) : null,
			/* @__PURE__ */ n("div", {
				className: "text-2xl font-semibold tracking-tight",
				"data-slot": "page-header-title",
				children: s
			}),
			a ? /* @__PURE__ */ n("div", {
				className: "max-w-3xl text-sm text-[var(--sdk-color-text-secondary)]",
				"data-slot": "page-header-description",
				children: a
			}) : null
		]
	}), t ? /* @__PURE__ */ n("div", {
		className: "flex items-center gap-3",
		"data-slot": "page-header-actions",
		children: t
	}) : null]
}));
i.displayName = "PageHeader";
//#endregion
export { i as t };

//# sourceMappingURL=PageHeader-D4ImqJpt.js.map