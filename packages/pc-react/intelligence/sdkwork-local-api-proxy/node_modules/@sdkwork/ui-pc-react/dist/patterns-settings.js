import { t as e } from "./utils-Bgb-Nm-x.js";
import { s as t } from "./feedback-B1nca0uN.js";
import { t as n } from "./inline-alert-BVD8XoaS.js";
import { t as r } from "./search-BmX5RsbM.js";
import { t as i } from "./input-D5wmD3Oa.js";
import { t as a } from "./WorkspacePanel---JpIPPo.js";
import * as o from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/components/patterns/settings/SettingsCenter.tsx
function l(e) {
	return e == null || typeof e == "boolean" ? "" : typeof e == "string" || typeof e == "number" ? String(e) : Array.isArray(e) ? e.map(l).join(" ") : o.isValidElement(e) ? l(e.props.children) : "";
}
function u(e, t) {
	return t ? [
		l(e.label),
		l(e.description),
		...e.keywords ?? []
	].join(" ").toLowerCase().includes(t) : !0;
}
var d = o.forwardRef(({ actions: n, activeItem: o, children: d, className: f, description: p, emptyState: m, navFooter: h, navHeader: g, onActiveItemChange: _, onSearchChange: v, searchPlaceholder: y = "Search settings", searchValue: b = "", sections: x, title: S, ...C }, w) => {
	let T = b.trim().toLowerCase(), E = x.map((e) => ({
		...e,
		items: e.items.filter((e) => u(e, T))
	})).filter((e) => e.items.length > 0), D = b.length > 0 || !!v, O = E.length > 0;
	return /* @__PURE__ */ c("div", {
		ref: w,
		className: e("grid h-full min-h-0 min-w-0 gap-4 lg:grid-cols-[18rem_minmax(0,1fr)]", f),
		"data-sdk-pattern": "settings-center",
		...C,
		children: [/* @__PURE__ */ c("aside", {
			className: "flex min-h-0 flex-col rounded-[var(--sdk-radius-panel)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] shadow-[var(--sdk-shadow-sm)]",
			"data-sdk-region": "settings-nav",
			children: [
				g ? /* @__PURE__ */ s("div", {
					className: "border-b border-[var(--sdk-color-border-subtle)] px-4 py-4",
					children: g
				}) : null,
				D ? /* @__PURE__ */ s("div", {
					className: "border-b border-[var(--sdk-color-border-subtle)] px-4 py-4",
					children: /* @__PURE__ */ c("label", {
						className: "block",
						children: [/* @__PURE__ */ s("span", {
							className: "sr-only",
							children: y
						}), /* @__PURE__ */ c("div", {
							className: "relative",
							children: [/* @__PURE__ */ s(r, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--sdk-color-text-muted)]" }), /* @__PURE__ */ s(i, {
								className: "pl-9",
								onChange: (e) => v?.(e.target.value),
								placeholder: y,
								value: b
							})]
						})]
					})
				}) : null,
				/* @__PURE__ */ s("div", {
					className: "min-h-0 flex-1 space-y-4 overflow-y-auto px-3 py-4",
					children: O ? E.map((t) => /* @__PURE__ */ c("div", {
						className: "space-y-2",
						children: [t.title ? /* @__PURE__ */ s("div", {
							className: "px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--sdk-color-text-muted)]",
							children: t.title
						}) : null, /* @__PURE__ */ s("div", {
							className: "space-y-1",
							children: t.items.map((t) => {
								let n = t.id === o;
								return /* @__PURE__ */ c("button", {
									"aria-label": l(t.label),
									className: e("flex w-full items-start gap-3 rounded-[var(--sdk-radius-field)] border px-3 py-3 text-left transition-colors", n ? "border-[var(--sdk-color-brand-primary)] bg-[var(--sdk-color-brand-primary-soft)]" : "border-transparent hover:border-[var(--sdk-color-border-default)] hover:bg-[var(--sdk-color-surface-panel-muted)]", t.disabled ? "cursor-not-allowed opacity-60" : null),
									"data-sdk-pattern": "settings-nav-item",
									"data-slot": "settings-center-nav-item",
									"data-state": n ? "active" : "inactive",
									disabled: t.disabled,
									onClick: () => _?.(t.id),
									type: "button",
									children: [t.icon ? /* @__PURE__ */ s("span", {
										className: "mt-0.5 shrink-0",
										children: t.icon
									}) : null, /* @__PURE__ */ c("span", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ c("span", {
											className: "flex items-center gap-2 text-sm font-medium text-[var(--sdk-color-text-primary)]",
											children: [/* @__PURE__ */ s("span", { children: t.label }), t.badge ? /* @__PURE__ */ s("span", {
												className: "shrink-0",
												children: t.badge
											}) : null]
										}), t.description ? /* @__PURE__ */ s("span", {
											className: "mt-1 block text-sm text-[var(--sdk-color-text-secondary)]",
											children: t.description
										}) : null]
									})]
								}, t.id);
							})
						})]
					}, l(t.title) || t.items[0]?.id)) : m ?? /* @__PURE__ */ s(t, {
						description: "Try a different keyword or browse the navigation without a search term.",
						keyword: b,
						title: "No settings match your search"
					})
				}),
				h ? /* @__PURE__ */ s("div", {
					className: "border-t border-[var(--sdk-color-border-subtle)] px-4 py-4",
					children: h
				}) : null
			]
		}), /* @__PURE__ */ s(a, {
			actions: n,
			className: "h-full",
			description: p,
			title: S,
			children: d
		})]
	});
});
function f({ className: t, sticky: r = !0, ...i }) {
	return /* @__PURE__ */ s(n, {
		className: e(r ? "sticky bottom-0 z-10" : null, t),
		"data-sdk-pattern": "dirty-state-bar",
		showIcon: !0,
		tone: "warning",
		...i
	});
}
d.displayName = "SettingsCenter", f.displayName = "DirtyStateBar";
//#endregion
export { f as DirtyStateBar, d as SettingsCenter };

//# sourceMappingURL=patterns-settings.js.map