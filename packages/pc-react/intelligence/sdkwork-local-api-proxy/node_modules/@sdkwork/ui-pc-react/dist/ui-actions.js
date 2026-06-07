import { t as e } from "./utils-Bgb-Nm-x.js";
import { n as t } from "./slot-props-Cskv9Ttd.js";
import { i as n, n as r, t as i } from "./button-DW2aECbt.js";
import { t as a } from "./chevron-down-COFRXzK7.js";
import { t as o } from "./x-8IarCZxo.js";
import { a as s, d as c, h as l, o as u, r as d, t as f, u as p } from "./dropdown-menu-v68Y_70D.js";
import { a as m, c as h, i as g, l as _, n as v, o as y, r as b, s as x, t as S } from "./command-D6lVPN-3.js";
import * as C from "react";
import { jsx as w, jsxs as T } from "react/jsx-runtime";
//#region src/components/ui/actions/action-menu-button.tsx
var E = {
	default: "",
	danger: "text-[var(--sdk-color-state-danger)] focus:text-[var(--sdk-color-state-danger)] focus:bg-[color-mix(in_srgb,var(--sdk-color-state-danger)_12%,transparent)]"
};
function D(e) {
	return e.type === "separator";
}
function O(e) {
	return e.type === "label";
}
var k = C.forwardRef(({ children: n, className: r, defaultMenuOpen: o, items: m, menuAlign: h = "end", menuLabel: g = "Open actions menu", menuModal: _ = !1, menuOpen: v, onMenuOpenChange: y, showChevron: b = !0, slotProps: x, ...S }, C) => /* @__PURE__ */ T(f, {
	defaultOpen: o,
	modal: _,
	onOpenChange: y,
	open: v,
	children: [/* @__PURE__ */ w(l, {
		asChild: !0,
		"data-slot": "action-menu-button",
		children: /* @__PURE__ */ T(i, {
			ref: C,
			className: e("justify-between", r),
			"data-sdk-ui": "action-menu-button",
			"data-slot": "action-menu-button",
			type: "button",
			...S,
			children: [/* @__PURE__ */ w("span", {
				className: "inline-flex min-w-0 items-center gap-2",
				"data-slot": "action-menu-button-label",
				children: n
			}), b ? /* @__PURE__ */ w(a, {
				className: "h-4 w-4 shrink-0",
				"data-slot": "action-menu-button-chevron"
			}) : null]
		})
	}), /* @__PURE__ */ w(d, {
		...t({
			align: h,
			"data-slot": "action-menu-button-content"
		}, x?.content),
		children: m.map((e) => D(e) ? /* @__PURE__ */ w(p, {}, e.key) : O(e) ? /* @__PURE__ */ w(u, {
			inset: e.inset,
			children: e.label
		}, e.key) : /* @__PURE__ */ T(s, {
			className: E[e.tone ?? "default"],
			"data-tone": e.tone ?? "default",
			disabled: e.disabled,
			onSelect: () => {
				e.onSelect?.();
			},
			children: [
				e.icon,
				e.description ? /* @__PURE__ */ T("span", {
					className: "grid gap-0.5",
					children: [/* @__PURE__ */ w("span", { children: e.label }), /* @__PURE__ */ w("span", {
						className: "text-xs text-[var(--sdk-color-text-muted)]",
						children: e.description
					})]
				}) : /* @__PURE__ */ w("span", { children: e.label }),
				e.shortcut ? /* @__PURE__ */ w(c, { children: e.shortcut }) : null
			]
		}, e.key))
	})]
}));
k.displayName = "ActionMenuButton";
//#endregion
//#region src/components/ui/actions/bulk-action-bar.tsx
var A = {
	default: "border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)]",
	info: "border-[color-mix(in_srgb,var(--sdk-color-state-info)_28%,transparent)] bg-[color-mix(in_srgb,var(--sdk-color-state-info)_10%,transparent)]",
	success: "border-[color-mix(in_srgb,var(--sdk-color-state-success)_28%,transparent)] bg-[color-mix(in_srgb,var(--sdk-color-state-success)_10%,transparent)]",
	warning: "border-[color-mix(in_srgb,var(--sdk-color-state-warning)_28%,transparent)] bg-[color-mix(in_srgb,var(--sdk-color-state-warning)_10%,transparent)]",
	danger: "border-[color-mix(in_srgb,var(--sdk-color-state-danger)_28%,transparent)] bg-[color-mix(in_srgb,var(--sdk-color-state-danger)_10%,transparent)]"
}, j = C.forwardRef(({ actions: t, className: n, clearLabel: r = "Clear", count: a, description: s, meta: c, onClear: l, sticky: u = !1, title: d, tone: f = "default", ...p }, m) => /* @__PURE__ */ T("div", {
	ref: m,
	className: e("flex flex-wrap items-center justify-between gap-3 rounded-[var(--sdk-radius-panel)] border px-4 py-3 shadow-[var(--sdk-shadow-sm)]", A[f], u ? "sticky top-0 z-20 backdrop-blur-xl" : null, n),
	"data-sdk-ui": "bulk-action-bar",
	"data-slot": "bulk-action-bar",
	"data-tone": f,
	...p,
	children: [/* @__PURE__ */ T("div", {
		className: "flex min-w-0 flex-wrap items-center gap-3",
		children: [
			a ? /* @__PURE__ */ w("span", {
				className: "inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-[var(--sdk-color-surface-panel-muted)] px-2.5 text-xs font-semibold text-[var(--sdk-color-text-primary)]",
				"data-slot": "bulk-action-bar-count",
				children: a
			}) : null,
			/* @__PURE__ */ T("div", {
				className: "min-w-0",
				children: [d ? /* @__PURE__ */ w("div", {
					className: "text-sm font-semibold text-[var(--sdk-color-text-primary)]",
					"data-slot": "bulk-action-bar-title",
					children: d
				}) : null, s ? /* @__PURE__ */ w("div", {
					className: "text-sm text-[var(--sdk-color-text-secondary)]",
					"data-slot": "bulk-action-bar-description",
					children: s
				}) : null]
			}),
			c ? /* @__PURE__ */ w("div", {
				className: "text-xs text-[var(--sdk-color-text-muted)]",
				"data-slot": "bulk-action-bar-meta",
				children: c
			}) : null
		]
	}), /* @__PURE__ */ T("div", {
		className: "flex flex-wrap items-center gap-2",
		"data-slot": "bulk-action-bar-actions",
		children: [t, l ? /* @__PURE__ */ T(i, {
			"data-slot": "bulk-action-bar-clear-button",
			onClick: l,
			size: "sm",
			type: "button",
			variant: "ghost",
			children: [/* @__PURE__ */ w(o, { className: "h-4 w-4" }), r]
		}) : null]
	})]
}));
j.displayName = "BulkActionBar";
//#endregion
//#region src/components/ui/actions/icon-button.tsx
var M = C.forwardRef(({ className: t, type: n = "button", ...r }, a) => /* @__PURE__ */ w(i, {
	ref: a,
	className: e("shrink-0", t),
	"data-sdk-ui": "icon-button",
	"data-slot": "icon-button",
	size: "icon",
	type: n,
	...r
}));
M.displayName = "IconButton";
//#endregion
//#region src/components/ui/actions/split-button.tsx
var N = C.forwardRef(({ children: n, className: r, defaultMenuOpen: o, disabled: u, items: p, loading: m, menuAlign: h = "end", menuLabel: g = "Open more actions", menuModal: _ = !1, menuOpen: v, onMenuOpenChange: y, size: b, slotProps: x, variant: S, ...C }, E) => /* @__PURE__ */ T(f, {
	defaultOpen: o,
	modal: _,
	onOpenChange: y,
	open: v,
	children: [/* @__PURE__ */ T("div", {
		...t({
			className: e("inline-flex items-stretch", r),
			"data-slot": "split-button"
		}, x?.group),
		"data-sdk-ui": "split-button",
		children: [/* @__PURE__ */ w(i, {
			ref: E,
			...t({
				className: "rounded-r-none",
				disabled: u,
				loading: m,
				size: b,
				variant: S,
				...C
			}, x?.primaryAction),
			"data-slot": "split-button-primary-action",
			children: n
		}), /* @__PURE__ */ w(l, {
			asChild: !0,
			"data-slot": "split-button-menu-trigger",
			children: /* @__PURE__ */ w(i, {
				...t({
					"aria-label": g,
					className: "w-10 rounded-l-none border-l border-[var(--sdk-color-border-default)] px-0",
					disabled: u || p.length === 0,
					size: b,
					variant: S
				}, x?.menuTrigger),
				"data-slot": "split-button-menu-trigger",
				children: /* @__PURE__ */ w(a, { className: "h-4 w-4" })
			})
		})]
	}), /* @__PURE__ */ w(d, {
		...t({
			align: h,
			"data-slot": "split-button-content"
		}, x?.content),
		children: p.map((e) => /* @__PURE__ */ T(s, {
			disabled: e.disabled,
			onSelect: () => {
				e.onSelect?.();
			},
			children: [
				e.icon,
				/* @__PURE__ */ w("span", { children: e.label }),
				e.shortcut ? /* @__PURE__ */ w(c, { children: e.shortcut }) : null
			]
		}, e.key))
	})]
}));
N.displayName = "SplitButton";
//#endregion
//#region src/components/ui/actions/toolbar-button.tsx
var P = n("inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-[var(--sdk-radius-control)] border border-transparent bg-transparent font-medium text-[var(--sdk-color-text-secondary)] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--sdk-color-border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sdk-color-surface-canvas)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0", {
	variants: {
		size: {
			compact: "h-8 min-w-8 px-2 text-xs",
			default: "h-9 min-w-9 px-2.5 text-sm"
		},
		pressed: {
			false: "hover:border-[var(--sdk-color-border-default)] hover:bg-[var(--sdk-color-surface-panel-muted)] hover:text-[var(--sdk-color-text-primary)]",
			true: "border-[var(--sdk-color-border-strong)] bg-[var(--sdk-color-brand-primary-soft)] text-[var(--sdk-color-brand-primary)] shadow-[var(--sdk-shadow-sm)]"
		}
	},
	defaultVariants: {
		size: "default",
		pressed: !1
	}
});
function F(e) {
	let { ariaLabel: t, shortcut: n, title: r } = e;
	if (!n) return r;
	let i = r ?? t;
	return i ? `${i} (${n})` : n;
}
var I = C.forwardRef(({ active: t, "aria-label": n, className: r, onMouseDown: i, pressed: a, preserveFocusOnMouseDown: o = !1, shortcut: s, size: c, title: l, type: u = "button", ...d }, f) => {
	let p = a ?? t ?? !1, m = a !== void 0 || t !== void 0, h = F({
		ariaLabel: n,
		shortcut: s,
		title: l
	}), g = C.useCallback((e) => {
		o && !d.disabled && e.preventDefault(), i?.(e);
	}, [
		i,
		o,
		d.disabled
	]);
	return /* @__PURE__ */ w("button", {
		ref: f,
		"aria-label": n,
		"aria-pressed": m ? p : void 0,
		className: e(P({
			pressed: p,
			size: c
		}), r),
		"data-sdk-ui": "toolbar-button",
		"data-slot": "toolbar-button",
		onMouseDown: g,
		title: h,
		type: u,
		...d
	});
});
I.displayName = "ToolbarButton";
//#endregion
export { k as ActionMenuButton, j as BulkActionBar, i as Button, S as Command, v as CommandDialog, b as CommandEmpty, g as CommandGroup, m as CommandInput, y as CommandItem, x as CommandList, h as CommandSeparator, _ as CommandShortcut, M as IconButton, N as SplitButton, I as ToolbarButton, r as buttonVariants, P as toolbarButtonVariants };

//# sourceMappingURL=ui-actions.js.map