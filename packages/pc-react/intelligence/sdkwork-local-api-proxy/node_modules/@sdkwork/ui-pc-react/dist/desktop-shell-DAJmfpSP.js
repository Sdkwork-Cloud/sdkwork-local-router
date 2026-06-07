import { t as e } from "./utils-Bgb-Nm-x.js";
import { n as t } from "./slot-props-Cskv9Ttd.js";
import { t as n } from "./createLucideIcon-DYUOEYxe.js";
import { t as r } from "./x-8IarCZxo.js";
import { n as i, t as a } from "./NavigationRail-Bj0OZSNz.js";
import { useSdkworkShellBridge as o } from "./theme.js";
import * as s from "react";
import { Fragment as c, jsx as l, jsxs as u } from "react/jsx-runtime";
var d = n("minus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}]]), f = n("square", [["rect", {
	width: "18",
	height: "18",
	x: "3",
	y: "3",
	rx: "2",
	key: "afitv7"
}]]), p = {
	close: "Close window",
	maximize: "Maximize window",
	minimize: "Minimize window",
	restore: "Restore window"
};
function m({ isMaximized: e }) {
	return e ? /* @__PURE__ */ u("svg", {
		"aria-hidden": "true",
		className: "h-3.5 w-3.5",
		fill: "none",
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: "1.8",
		viewBox: "0 0 16 16",
		children: [/* @__PURE__ */ l("path", { d: "M5 3.5h7.5V11" }), /* @__PURE__ */ l("path", { d: "M3.5 5H11v7.5H3.5z" })]
	}) : /* @__PURE__ */ l(f, { className: "h-3.5 w-3.5 stroke-[2.1]" });
}
function h(e, t) {
	let [n, r] = s.useState(!1);
	return s.useEffect(() => {
		if (!e || !t) {
			r(!1);
			return;
		}
		let n = !0, i = () => void 0;
		return e.isWindowMaximized().then((e) => {
			n && r(e);
		}), Promise.resolve(e.subscribeWindowMaximized((e) => {
			n && r(e);
		})).then((e) => {
			i = e;
		}), () => {
			n = !1, i();
		};
	}, [e, t]), n;
}
function g(t, n) {
	return e("flex items-stretch", t === "header" ? "h-full" : "overflow-hidden rounded-[var(--sdk-radius-panel)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] shadow-[var(--sdk-shadow-md)] backdrop-blur-xl", n);
}
function _(t) {
	let { intent: n = "default", variant: r, withDivider: i = !1 } = t;
	return e("flex items-center justify-center transition-colors", r === "header" ? "h-full w-11 text-[var(--sdk-color-text-secondary)]" : "h-10 w-10 text-[var(--sdk-color-text-secondary)]", n === "danger" ? "hover:bg-rose-500 hover:text-white" : "hover:bg-[var(--sdk-color-brand-primary-soft)] hover:text-[var(--sdk-color-text-primary)]", i && r === "floating" ? "border-r border-[var(--sdk-color-border-subtle)]" : null);
}
var v = s.forwardRef(({ className: e, controller: t, labels: n, variant: i = "header", ...a }, c) => {
	let f = o(), v = s.useMemo(() => ({
		...p,
		...f.messages.windowControls,
		...n
	}), [n, f.messages.windowControls]), y = t?.getPlatform() === "desktop", b = h(t, y);
	return !t || !y ? null : /* @__PURE__ */ u("div", {
		ref: c,
		className: g(i, e),
		"data-sdk-pattern": "desktop-window-controls",
		"data-slot": "desktop-window-controls",
		"data-tauri-drag-region": "false",
		...a,
		children: [
			/* @__PURE__ */ l("button", {
				"aria-label": v.minimize,
				className: _({
					variant: i,
					withDivider: !0
				}),
				"data-slot": "desktop-window-controls-minimize",
				"data-tauri-drag-region": "false",
				onClick: () => {
					t.minimizeWindow();
				},
				title: v.minimize,
				type: "button",
				children: /* @__PURE__ */ l(d, { className: "h-3.5 w-3.5 stroke-[2.4]" })
			}),
			/* @__PURE__ */ l("button", {
				"aria-label": b ? v.restore : v.maximize,
				className: _({
					variant: i,
					withDivider: !0
				}),
				"data-slot": "desktop-window-controls-maximize",
				"data-tauri-drag-region": "false",
				onClick: () => {
					b ? t.restoreWindow() : t.maximizeWindow();
				},
				title: b ? v.restore : v.maximize,
				type: "button",
				children: /* @__PURE__ */ l(m, { isMaximized: b })
			}),
			/* @__PURE__ */ l("button", {
				"aria-label": v.close,
				className: _({
					intent: "danger",
					variant: i
				}),
				"data-slot": "desktop-window-controls-close",
				"data-tauri-drag-region": "false",
				onClick: () => {
					t.closeWindow();
				},
				title: v.close,
				type: "button",
				children: /* @__PURE__ */ l(r, { className: "h-3.5 w-3.5 stroke-[2.2]" })
			})
		]
	});
});
v.displayName = "DesktopWindowControls";
//#endregion
//#region src/components/patterns/desktop-shell/DesktopTitleBar.tsx
var y = {
	comfortable: "h-14 px-4 sm:px-5",
	compact: "h-11 px-3 sm:px-4",
	default: "h-12 px-3 sm:px-4"
}, b = s.forwardRef(({ bordered: n = !0, center: r, centerInteractive: i = !0, centerMaxWidth: a = "36rem", className: o, leading: s, size: c = "default", slotProps: d, style: f, trailing: p, translucent: m = !0, windowController: h, windowControlLabels: g, windowControls: _, ...b }, x) => {
	let S = _ ?? (h ? /* @__PURE__ */ l(v, {
		controller: h,
		labels: g
	}) : null), C = !!(p || S);
	return /* @__PURE__ */ u("header", {
		ref: x,
		className: e("relative flex items-center", y[c], n ? "border-b border-[var(--sdk-color-border-subtle)]" : null, m ? "bg-[var(--sdk-color-surface-panel)]/90 backdrop-blur-xl" : "bg-[var(--sdk-color-surface-panel)]", o),
		"data-sdk-pattern": "desktop-title-bar",
		"data-slot": "desktop-title-bar",
		style: f,
		...b,
		children: [
			s ? /* @__PURE__ */ l("div", {
				...t({
					className: "flex min-w-0 flex-1 items-center gap-3",
					"data-sdk-region": "desktop-title-bar-leading",
					"data-sdk-slot": "leading",
					"data-slot": "desktop-title-bar-leading",
					"data-tauri-drag-region": !0
				}, d?.leading),
				children: s
			}) : /* @__PURE__ */ l("div", {
				className: "flex min-w-0 flex-1",
				"data-sdk-region": "desktop-title-bar-leading-spacer",
				"data-sdk-slot": "leading-spacer",
				"data-slot": "desktop-title-bar-leading-spacer",
				"data-tauri-drag-region": !0
			}),
			r ? /* @__PURE__ */ l("div", {
				...t({
					className: "pointer-events-none absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center px-24 lg:px-32",
					"data-sdk-region": "desktop-title-bar-center-shell",
					"data-sdk-slot": "center-shell",
					"data-slot": "desktop-title-bar-center-shell",
					style: { maxWidth: a }
				}, d?.centerShell),
				children: /* @__PURE__ */ l("div", {
					...t({
						className: e("w-full", i ? "pointer-events-auto" : null),
						"data-sdk-region": "desktop-title-bar-center",
						"data-sdk-slot": "center",
						"data-slot": "desktop-title-bar-center",
						"data-tauri-drag-region": i ? "false" : !0
					}, d?.center),
					children: r
				})
			}) : null,
			C ? /* @__PURE__ */ u("div", {
				...t({
					className: "ml-auto flex h-full shrink-0 items-center justify-end gap-2",
					"data-sdk-region": "desktop-title-bar-trailing",
					"data-sdk-slot": "trailing",
					"data-slot": "desktop-title-bar-trailing",
					"data-tauri-drag-region": "false"
				}, d?.trailing),
				children: [p, S]
			}) : null
		]
	});
});
b.displayName = "DesktopTitleBar";
//#endregion
//#region src/components/patterns/desktop-shell/DesktopAppHeader.tsx
var x = s.forwardRef(({ actions: e, badge: n, bordered: r, brand: i, brandMark: a, center: o, centerInteractive: s, centerMaxWidth: d, className: f, id: p, leading: m, size: h, slotProps: g, style: _, subtitle: v, title: y, translucent: x, windowController: S, windowControlLabels: C, windowControls: w, ...T }, E) => {
	let { bar: D, brand: O, center: k, centerShell: A, leading: j, subtitle: M, title: N, trailing: P } = g ?? {}, F = i ?? (y || v || a || n ? /* @__PURE__ */ u("div", {
		...t({
			className: "flex min-w-0 items-center gap-3",
			"data-sdk-region": "desktop-app-header-brand",
			"data-slot": "desktop-app-header-brand"
		}, O),
		children: [a ? /* @__PURE__ */ l("div", {
			className: "shrink-0",
			children: a
		}) : null, y || v || n ? /* @__PURE__ */ u("div", {
			className: "min-w-0",
			children: [y || n ? /* @__PURE__ */ u("div", {
				className: "flex min-w-0 items-center gap-2",
				children: [y ? /* @__PURE__ */ l("span", {
					...t({
						className: "truncate text-sm font-semibold leading-none text-[var(--sdk-color-text-primary)]",
						"data-sdk-region": "desktop-app-header-title",
						"data-slot": "desktop-app-header-title"
					}, N),
					children: y
				}) : null, n]
			}) : null, v ? /* @__PURE__ */ l("div", {
				...t({
					className: "mt-1 truncate text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--sdk-color-text-muted)]",
					"data-sdk-region": "desktop-app-header-subtitle",
					"data-slot": "desktop-app-header-subtitle"
				}, M),
				children: v
			}) : null]
		}) : null]
	}) : null);
	return /* @__PURE__ */ l("div", {
		ref: E,
		...t({
			className: "relative z-30",
			"data-sdk-pattern": "desktop-app-header",
			"data-slot": "desktop-app-header"
		}, {
			className: f,
			id: p,
			style: _,
			...T
		}),
		children: /* @__PURE__ */ l(b, {
			"data-slot": "desktop-app-header-bar",
			bordered: r,
			center: o,
			centerInteractive: s,
			centerMaxWidth: d,
			leading: F || m ? /* @__PURE__ */ u(c, { children: [F, m] }) : void 0,
			size: h,
			slotProps: {
				center: k,
				centerShell: A,
				leading: j,
				trailing: P
			},
			trailing: e,
			translucent: x,
			windowController: S,
			windowControlLabels: C,
			windowControls: w,
			...D
		})
	});
});
x.displayName = "DesktopAppHeader";
//#endregion
//#region src/components/patterns/desktop-shell/DesktopShellFrame.tsx
var S = s.forwardRef(({ actions: e, badge: n, bordered: r, brand: o, brandMark: s, center: c, centerInteractive: u, centerMaxWidth: d, className: f, content: p, id: m, leading: h, navigation: g, navigationFooter: _, navigationHeader: v, sidebar: y, sidebarWidth: b = 280, size: S, slotProps: C, statusBar: w, style: T, subtitle: E, theme: D, title: O, translucent: k, windowControlLabels: A, windowController: j, windowControls: M, ...N }, P) => {
	let F = o !== void 0 || s !== void 0 || O !== void 0 || E !== void 0 || n !== void 0 || h !== void 0 || c !== void 0 || e !== void 0 || j !== void 0 || M !== void 0, { bar: I, brand: L, center: R, centerShell: z, content: B, header: V, leading: H, navigation: U, shell: W, subtitle: G, title: K, trailing: q } = C ?? {}, J = y ?? (g || v || _ ? /* @__PURE__ */ l(a, {
		"data-slot": "desktop-shell-frame-navigation",
		footer: _,
		header: v,
		...U,
		children: g
	}) : void 0);
	return /* @__PURE__ */ l("div", {
		ref: P,
		...t({
			"data-sdk-pattern": "desktop-shell-frame",
			"data-slot": "desktop-shell-frame"
		}, {
			className: f,
			id: m,
			style: T,
			...N
		}),
		children: /* @__PURE__ */ l(i, {
			"data-slot": "desktop-shell-frame-shell",
			...W,
			content: /* @__PURE__ */ l("div", {
				...t({
					className: "h-full min-h-0 min-w-0",
					"data-sdk-region": "desktop-shell-content",
					"data-slot": "desktop-shell-frame-content"
				}, B),
				children: p
			}),
			footer: w,
			header: F ? /* @__PURE__ */ l(x, {
				"data-slot": "desktop-shell-frame-header",
				actions: e,
				badge: n,
				bordered: r,
				brand: o,
				brandMark: s,
				center: c,
				centerInteractive: u,
				centerMaxWidth: d,
				leading: h,
				size: S,
				slotProps: {
					bar: I,
					brand: L,
					center: R,
					centerShell: z,
					leading: H,
					subtitle: G,
					title: K,
					trailing: q
				},
				subtitle: E,
				title: O,
				translucent: k,
				windowControlLabels: A,
				windowController: j,
				windowControls: M,
				...V
			}) : void 0,
			sidebar: J,
			sidebarWidth: b,
			theme: D
		})
	});
});
S.displayName = "DesktopShellFrame";
//#endregion
export { v as i, x as n, b as r, S as t };

//# sourceMappingURL=desktop-shell-DAJmfpSP.js.map