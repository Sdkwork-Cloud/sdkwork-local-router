import { t as e } from "./utils-Bgb-Nm-x.js";
import { n as t } from "./slot-props-Cskv9Ttd.js";
import * as n from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/components/patterns/workspace/WorkspacePanel.tsx
var a = n.forwardRef(({ actions: n, children: a, className: o, description: s, slotProps: c, title: l, ...u }, d) => /* @__PURE__ */ i("section", {
	ref: d,
	className: e("flex h-full flex-col rounded-[var(--sdk-radius-panel)] bg-[var(--sdk-color-surface-panel)]", o),
	"data-sdk-pattern": "workspace-panel",
	"data-slot": "workspace-panel",
	...u,
	children: [l || s || n ? /* @__PURE__ */ i("div", {
		...t({
			className: "flex flex-wrap items-start justify-between gap-4 border-b border-[var(--sdk-color-border-subtle)] px-6 py-5",
			"data-sdk-region": "workspace-panel-header",
			"data-slot": "workspace-panel-header"
		}, c?.header),
		children: [/* @__PURE__ */ i("div", {
			className: "space-y-1",
			children: [l ? /* @__PURE__ */ r("div", {
				className: "text-base font-semibold",
				"data-slot": "workspace-panel-title",
				children: l
			}) : null, s ? /* @__PURE__ */ r("div", {
				className: "text-sm text-[var(--sdk-color-text-secondary)]",
				"data-slot": "workspace-panel-description",
				children: s
			}) : null]
		}), n ? /* @__PURE__ */ r("div", {
			className: "flex items-center gap-3",
			"data-slot": "workspace-panel-actions",
			children: n
		}) : null]
	}) : null, /* @__PURE__ */ r("div", {
		...t({
			className: "min-h-0 flex-1 px-6 py-5",
			"data-sdk-region": "workspace-panel-body",
			"data-slot": "workspace-panel-body"
		}, c?.body),
		children: a
	})]
}));
a.displayName = "WorkspacePanel";
//#endregion
export { a as t };

//# sourceMappingURL=WorkspacePanel---JpIPPo.js.map