import { a as e, c as t, f as n, g as r, l as i, m as a, n as o, r as s, t as c, u as l } from "./use-controllable-state-C-6H1OII.js";
import { t as u } from "./utils-Bgb-Nm-x.js";
import { n as d } from "./slot-props-Cskv9Ttd.js";
import { i as f, r as p, t as m } from "./button-DW2aECbt.js";
import { t as h } from "./createLucideIcon-DYUOEYxe.js";
import { i as g, n as ee, t as te } from "./states-BNaQCp-9.js";
import { a as ne, i as re, p as _, r as ie, v } from "./Combination-DHpOS5dI.js";
import { i as y, n as ae, r as b, t as oe } from "./pagination-D9cH4t10.js";
import { t as se } from "./chevron-right-C2amLX5H.js";
import { t as x } from "./circle-check-BkTcTpgo.js";
import { t as S } from "./triangle-alert-BO2W8DLJ.js";
import { c as C, d as ce, i as w, n as T, r as le, t as E, u as ue } from "./dist-Dedo1J3L.js";
import { t as D } from "./dist-z6084cel.js";
import { BulkActionBar as de } from "./ui-actions.js";
import { a as fe, n as pe, o as me, r as O, t as k } from "./card-Ba2Qymui.js";
import * as A from "react";
import { createElement as j } from "react";
import { Fragment as M, jsx as N, jsxs as P } from "react/jsx-runtime";
var F = h("arrow-down", [["path", {
	d: "M12 5v14",
	key: "s699le"
}], ["path", {
	d: "m19 12-7 7-7-7",
	key: "1idqje"
}]]), I = h("arrow-up-down", [
	["path", {
		d: "m21 16-4 4-4-4",
		key: "f6ql7i"
	}],
	["path", {
		d: "M17 20V4",
		key: "1ejh1v"
	}],
	["path", {
		d: "m3 8 4-4 4 4",
		key: "11wl7u"
	}],
	["path", {
		d: "M7 4v16",
		key: "1glfcx"
	}]
]), he = h("arrow-up", [["path", {
	d: "m5 12 7-7 7 7",
	key: "hav0vg"
}], ["path", {
	d: "M12 19V5",
	key: "x0mq9r"
}]]), L = h("circle-pause", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["line", {
		x1: "10",
		x2: "10",
		y1: "15",
		y2: "9",
		key: "c1nkhi"
	}],
	["line", {
		x1: "14",
		x2: "14",
		y1: "15",
		y2: "9",
		key: "h65svq"
	}]
]), R = h("circle-x", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "m15 9-6 6",
		key: "1uzhvr"
	}],
	["path", {
		d: "m9 9 6 6",
		key: "z0biqf"
	}]
]), ge = h("folder-open", [["path", {
	d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
	key: "usdka0"
}]]), _e = h("folder", [["path", {
	d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
	key: "1kt360"
}]]);
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-context@1.1_ad587f600d77d45b1232b9653f2db8cc/node_modules/@radix-ui/react-context/dist/index.mjs
function ve(e, t = []) {
	let n = [];
	function r(t, r) {
		let i = A.createContext(r);
		i.displayName = t + "Context";
		let a = n.length;
		n = [...n, r];
		let o = (t) => {
			let { scope: n, children: r, ...o } = t, s = n?.[e]?.[a] || i, c = A.useMemo(() => o, Object.values(o));
			return /* @__PURE__ */ N(s.Provider, {
				value: c,
				children: r
			});
		};
		o.displayName = t + "Provider";
		function s(n, o) {
			let s = o?.[e]?.[a] || i, c = A.useContext(s);
			if (c) return c;
			if (r !== void 0) return r;
			throw Error(`\`${n}\` must be used within \`${t}\``);
		}
		return [o, s];
	}
	let i = () => {
		let t = n.map((e) => A.createContext(e));
		return function(n) {
			let r = n?.[e] || t;
			return A.useMemo(() => ({ [`__scope${e}`]: {
				...n,
				[e]: r
			} }), [n, r]);
		};
	};
	return i.scopeName = e, [r, ye(i, ...t)];
}
function ye(...e) {
	let t = e[0];
	if (e.length === 1) return t;
	let n = () => {
		let n = e.map((e) => ({
			useScope: e(),
			scopeName: e.scopeName
		}));
		return function(e) {
			let r = n.reduce((t, { useScope: n, scopeName: r }) => {
				let i = n(e)[`__scope${r}`];
				return {
					...t,
					...i
				};
			}, {});
			return A.useMemo(() => ({ [`__scope${t.scopeName}`]: r }), [r]);
		};
	};
	return n.scopeName = t.scopeName, n;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/use-sync-external-store@1.6.0_react@19.2.4/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js
var be = /* @__PURE__ */ a(((e) => {
	var t = r("react");
	function n(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var i = typeof Object.is == "function" ? Object.is : n, a = t.useState, o = t.useEffect, s = t.useLayoutEffect, c = t.useDebugValue;
	function l(e, t) {
		var n = t(), r = a({ inst: {
			value: n,
			getSnapshot: t
		} }), i = r[0].inst, l = r[1];
		return s(function() {
			i.value = n, i.getSnapshot = t, u(i) && l({ inst: i });
		}, [
			e,
			n,
			t
		]), o(function() {
			return u(i) && l({ inst: i }), e(function() {
				u(i) && l({ inst: i });
			});
		}, [e]), c(n), n;
	}
	function u(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !i(e, n);
		} catch {
			return !0;
		}
	}
	function d(e, t) {
		return t();
	}
	var f = typeof window > "u" || window.document === void 0 || window.document.createElement === void 0 ? d : l;
	e.useSyncExternalStore = t.useSyncExternalStore === void 0 ? f : t.useSyncExternalStore;
})), z = /* @__PURE__ */ a(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e, t) {
			return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
		}
		function n(e, t) {
			f || o.startTransition === void 0 || (f = !0, console.error("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
			var n = t();
			if (!p) {
				var r = t();
				s(n, r) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), p = !0);
			}
			r = c({ inst: {
				value: n,
				getSnapshot: t
			} });
			var a = r[0].inst, m = r[1];
			return u(function() {
				a.value = n, a.getSnapshot = t, i(a) && m({ inst: a });
			}, [
				e,
				n,
				t
			]), l(function() {
				return i(a) && m({ inst: a }), e(function() {
					i(a) && m({ inst: a });
				});
			}, [e]), d(n), n;
		}
		function i(e) {
			var t = e.getSnapshot;
			e = e.value;
			try {
				var n = t();
				return !s(e, n);
			} catch {
				return !0;
			}
		}
		function a(e, t) {
			return t();
		}
		typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var o = r("react"), s = typeof Object.is == "function" ? Object.is : t, c = o.useState, l = o.useEffect, u = o.useLayoutEffect, d = o.useDebugValue, f = !1, p = !1, m = typeof window > "u" || window.document === void 0 || window.document.createElement === void 0 ? a : n;
		e.useSyncExternalStore = o.useSyncExternalStore === void 0 ? m : o.useSyncExternalStore, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
})), xe = (/* @__PURE__ */ a(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = be() : t.exports = z();
})))();
function B() {
	return (0, xe.useSyncExternalStore)(V, () => !0, () => !1);
}
function V() {
	return () => {};
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-avatar@1.1._5e99ccf265cbb36ef8e7150da8f5489e/node_modules/@radix-ui/react-avatar/dist/index.mjs
var H = "Avatar", [U, Se] = ve(H), [W, Ce] = U(H), we = A.forwardRef((e, t) => {
	let { __scopeAvatar: n, ...r } = e, [i, a] = A.useState("idle");
	return /* @__PURE__ */ N(W, {
		scope: n,
		imageLoadingStatus: i,
		onImageLoadingStatusChange: a,
		children: /* @__PURE__ */ N(D.span, {
			...r,
			ref: t
		})
	});
});
we.displayName = H;
var Te = "AvatarImage", Ee = A.forwardRef((e, t) => {
	let { __scopeAvatar: n, src: r, onLoadingStatusChange: i = () => {}, ...a } = e, o = Ce(Te, n), s = ke(r, a), c = T((e) => {
		i(e), o.onImageLoadingStatusChange(e);
	});
	return C(() => {
		s !== "idle" && c(s);
	}, [s, c]), s === "loaded" ? /* @__PURE__ */ N(D.img, {
		...a,
		ref: t,
		src: r
	}) : null;
});
Ee.displayName = Te;
var G = "AvatarFallback", De = A.forwardRef((e, t) => {
	let { __scopeAvatar: n, delayMs: r, ...i } = e, a = Ce(G, n), [o, s] = A.useState(r === void 0);
	return A.useEffect(() => {
		if (r !== void 0) {
			let e = window.setTimeout(() => s(!0), r);
			return () => window.clearTimeout(e);
		}
	}, [r]), o && a.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ N(D.span, {
		...i,
		ref: t
	}) : null;
});
De.displayName = G;
function Oe(e, t) {
	return e ? t ? (e.src !== t && (e.src = t), e.complete && e.naturalWidth > 0 ? "loaded" : "loading") : "error" : "idle";
}
function ke(e, { referrerPolicy: t, crossOrigin: n }) {
	let r = B(), i = A.useRef(null), a = r ? (i.current ||= new window.Image(), i.current) : null, [o, s] = A.useState(() => Oe(a, e));
	return C(() => {
		s(Oe(a, e));
	}, [a, e]), C(() => {
		let e = (e) => () => {
			s(e);
		};
		if (!a) return;
		let r = e("loaded"), i = e("error");
		return a.addEventListener("load", r), a.addEventListener("error", i), t && (a.referrerPolicy = t), typeof n == "string" && (a.crossOrigin = n), () => {
			a.removeEventListener("load", r), a.removeEventListener("error", i);
		};
	}, [
		a,
		n,
		t
	]), o;
}
var Ae = we, je = Ee, Me = De, Ne = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ N(Ae, {
	ref: n,
	className: u("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[var(--sdk-color-border-subtle)] bg-[var(--sdk-color-surface-panel-muted)] text-[var(--sdk-color-text-primary)]", e),
	"data-sdk-ui": "avatar",
	"data-slot": "avatar",
	...t
}));
Ne.displayName = "Avatar";
var Pe = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ N(je, {
	ref: n,
	className: u("aspect-square h-full w-full object-cover", e),
	"data-sdk-ui": "avatar-image",
	"data-slot": "avatar-image",
	...t
}));
Pe.displayName = "AvatarImage";
var Fe = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ N(Me, {
	ref: n,
	className: u("flex h-full w-full items-center justify-center rounded-full bg-[var(--sdk-color-brand-primary-soft)] text-xs font-semibold uppercase tracking-[0.08em] text-[var(--sdk-color-text-primary)]", e),
	"data-sdk-ui": "avatar-fallback",
	"data-slot": "avatar-fallback",
	...t
}));
Fe.displayName = "AvatarFallback";
//#endregion
//#region src/components/ui/badge.tsx
var Ie = f("inline-flex items-center rounded-[var(--sdk-radius-pill)] px-2.5 py-1 text-xs font-medium transition-colors", {
	variants: { variant: {
		default: "bg-[var(--sdk-color-brand-primary-soft)] text-[var(--sdk-color-brand-primary)]",
		secondary: "bg-[var(--sdk-color-surface-panel-muted)] text-[var(--sdk-color-text-secondary)]",
		success: "bg-[color-mix(in_srgb,var(--sdk-color-state-success)_16%,transparent)] text-[var(--sdk-color-state-success)]",
		warning: "bg-[color-mix(in_srgb,var(--sdk-color-state-warning)_16%,transparent)] text-[var(--sdk-color-state-warning)]",
		danger: "bg-[color-mix(in_srgb,var(--sdk-color-state-danger)_16%,transparent)] text-[var(--sdk-color-state-danger)]",
		outline: "border border-[var(--sdk-color-border-default)] text-[var(--sdk-color-text-secondary)]"
	} },
	defaultVariants: { variant: "default" }
}), Le = A.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ N("div", {
	ref: r,
	className: u(Ie({ variant: t }), e),
	"data-sdk-ui": "badge",
	"data-slot": "badge",
	...n
}));
Le.displayName = "Badge";
//#endregion
//#region src/components/ui/stat-card.tsx
var Re = {
	default: "text-[var(--sdk-color-text-secondary)]",
	success: "text-[var(--sdk-color-state-success)]",
	warning: "text-[var(--sdk-color-state-warning)]",
	danger: "text-[var(--sdk-color-state-danger)]"
};
function ze({ change: e, changeTone: t = "default", className: n, description: r, icon: i, label: a, value: o, ...s }) {
	return /* @__PURE__ */ P(k, {
		className: u("h-full", n),
		"data-sdk-ui": "stat-card",
		"data-slot": "stat-card",
		...s,
		children: [/* @__PURE__ */ P(fe, {
			className: "flex flex-row items-start justify-between gap-4 space-y-0",
			"data-slot": "stat-card-header",
			children: [/* @__PURE__ */ P("div", {
				className: "space-y-1",
				children: [/* @__PURE__ */ N(O, {
					"data-slot": "stat-card-label",
					children: a
				}), /* @__PURE__ */ N(me, {
					className: "text-3xl",
					"data-slot": "stat-card-value",
					children: o
				})]
			}), i ? /* @__PURE__ */ N("div", {
				className: "text-[var(--sdk-color-text-secondary)]",
				"data-slot": "stat-card-icon",
				children: i
			}) : null]
		}), r || e ? /* @__PURE__ */ P(pe, {
			className: "flex items-center gap-4",
			"data-slot": "stat-card-body",
			children: [r ? /* @__PURE__ */ N("p", {
				className: "flex-1 text-sm text-[var(--sdk-color-text-secondary)]",
				"data-slot": "stat-card-description",
				children: r
			}) : null, e ? /* @__PURE__ */ N("span", {
				className: u("ml-auto text-sm font-medium", Re[t]),
				"data-slot": "stat-card-change",
				children: e
			}) : null]
		}) : null]
	});
}
ze.displayName = "StatCard";
//#endregion
//#region src/components/ui/status-badge.tsx
var Be = {
	active: "success",
	completed: "success",
	connected: "success",
	enabled: "success",
	healthy: "success",
	live: "success",
	online: "success",
	success: "success",
	paused: "warning",
	pending: "warning",
	processing: "warning",
	queued: "warning",
	syncing: "warning",
	warning: "warning",
	archived: "secondary",
	disabled: "secondary",
	draft: "secondary",
	idle: "secondary",
	inactive: "secondary",
	rejected: "danger",
	error: "danger",
	failed: "danger",
	offline: "danger"
}, Ve = {
	success: x,
	warning: S,
	danger: R,
	default: g,
	secondary: L
};
function He(e, t) {
	return t || (Be[e.trim().toLowerCase()] ?? "default");
}
function Ue({ className: e, label: t, showIcon: n = !1, status: r, variant: i, ...a }) {
	let o = He(r, i), s = Ve[o];
	return /* @__PURE__ */ P(Le, {
		className: u("gap-1.5 capitalize", e),
		"data-sdk-ui": "status-badge",
		"data-slot": "status-badge",
		"data-variant": o,
		variant: o,
		...a,
		children: [n ? /* @__PURE__ */ N("span", {
			className: "inline-flex",
			"data-slot": "status-badge-icon",
			children: /* @__PURE__ */ N(s, { className: "h-3.5 w-3.5" })
		}) : null, /* @__PURE__ */ N("span", {
			"data-slot": "status-badge-label",
			children: t ?? r
		})]
	});
}
Ue.displayName = "StatusBadge";
//#endregion
//#region src/components/ui/table.tsx
var We = "relative w-full overflow-auto", Ge = "w-full caption-bottom text-sm", Ke = "[&_tr]:border-b [&_tr]:border-[var(--sdk-color-border-default)]", qe = "[&_tr:last-child]:border-0", Je = "border-t border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel-muted)] font-medium [&>tr]:last:border-b-0", Ye = "border-b border-[var(--sdk-color-border-subtle)] transition-colors data-[state=selected]:bg-[var(--sdk-color-brand-primary-soft)]", Xe = "h-11 px-4 text-left align-middle text-sm font-medium text-[var(--sdk-color-text-secondary)]", Ze = "p-4 align-middle text-[var(--sdk-color-text-primary)]", Qe = "mt-4 text-sm text-[var(--sdk-color-text-secondary)]", $e = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ N("div", {
	className: We,
	"data-slot": "table-viewport",
	children: /* @__PURE__ */ N("table", {
		ref: n,
		className: u(Ge, e),
		"data-sdk-ui": "table",
		"data-slot": "table",
		...t
	})
}));
$e.displayName = "Table";
var et = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ N("thead", {
	ref: n,
	className: u(Ke, e),
	"data-sdk-ui": "table-header",
	"data-slot": "table-header",
	...t
}));
et.displayName = "TableHeader";
var tt = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ N("tbody", {
	ref: n,
	className: u(qe, e),
	"data-sdk-ui": "table-body",
	"data-slot": "table-body",
	...t
}));
tt.displayName = "TableBody";
var nt = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ N("tfoot", {
	ref: n,
	className: u(Je, e),
	"data-sdk-ui": "table-footer",
	"data-slot": "table-footer",
	...t
}));
nt.displayName = "TableFooter";
var rt = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ N("tr", {
	ref: n,
	className: u(Ye, e),
	"data-sdk-ui": "table-row",
	"data-slot": "table-row",
	...t
}));
rt.displayName = "TableRow";
var it = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ N("th", {
	ref: n,
	className: u(Xe, e),
	"data-sdk-ui": "table-head",
	"data-slot": "table-head",
	...t
}));
it.displayName = "TableHead";
var at = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ N("td", {
	ref: n,
	className: u(Ze, e),
	"data-sdk-ui": "table-cell",
	"data-slot": "table-cell",
	...t
}));
at.displayName = "TableCell";
var ot = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ N("caption", {
	ref: n,
	className: u(Qe, e),
	"data-sdk-ui": "table-caption",
	"data-slot": "table-caption",
	...t
}));
ot.displayName = "TableCaption";
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-tabs@1.1.13_2ad0945e3cb98dc5bbfaaf29c105e977/node_modules/@radix-ui/react-tabs/dist/index.mjs
var st = "Tabs", [ct, lt] = ue(st, [ne]), ut = ne(), [dt, ft] = ct(st), pt = A.forwardRef((e, t) => {
	let { __scopeTabs: n, value: r, onValueChange: i, defaultValue: a, orientation: o = "horizontal", dir: s, activationMode: c = "automatic", ...l } = e, u = le(s), [d, f] = v({
		prop: r,
		onChange: i,
		defaultProp: a ?? "",
		caller: st
	});
	return /* @__PURE__ */ N(dt, {
		scope: n,
		baseId: _(),
		value: d,
		onValueChange: f,
		orientation: o,
		dir: u,
		activationMode: c,
		children: /* @__PURE__ */ N(w.div, {
			dir: u,
			"data-orientation": o,
			...l,
			ref: t
		})
	});
});
pt.displayName = st;
var mt = "TabsList", ht = A.forwardRef((e, t) => {
	let { __scopeTabs: n, loop: r = !0, ...i } = e, a = ft(mt, n);
	return /* @__PURE__ */ N(re, {
		asChild: !0,
		...ut(n),
		orientation: a.orientation,
		dir: a.dir,
		loop: r,
		children: /* @__PURE__ */ N(w.div, {
			role: "tablist",
			"aria-orientation": a.orientation,
			...i,
			ref: t
		})
	});
});
ht.displayName = mt;
var gt = "TabsTrigger", _t = A.forwardRef((e, t) => {
	let { __scopeTabs: n, value: r, disabled: i = !1, ...a } = e, o = ft(gt, n), s = ut(n), c = bt(o.baseId, r), l = xt(o.baseId, r), u = r === o.value;
	return /* @__PURE__ */ N(ie, {
		asChild: !0,
		...s,
		focusable: !i,
		active: u,
		children: /* @__PURE__ */ N(w.button, {
			type: "button",
			role: "tab",
			"aria-selected": u,
			"aria-controls": l,
			"data-state": u ? "active" : "inactive",
			"data-disabled": i ? "" : void 0,
			disabled: i,
			id: c,
			...a,
			ref: t,
			onMouseDown: ce(e.onMouseDown, (e) => {
				!i && e.button === 0 && e.ctrlKey === !1 ? o.onValueChange(r) : e.preventDefault();
			}),
			onKeyDown: ce(e.onKeyDown, (e) => {
				[" ", "Enter"].includes(e.key) && o.onValueChange(r);
			}),
			onFocus: ce(e.onFocus, () => {
				let e = o.activationMode !== "manual";
				!u && !i && e && o.onValueChange(r);
			})
		})
	});
});
_t.displayName = gt;
var vt = "TabsContent", yt = A.forwardRef((e, t) => {
	let { __scopeTabs: n, value: r, forceMount: i, children: a, ...o } = e, s = ft(vt, n), c = bt(s.baseId, r), l = xt(s.baseId, r), u = r === s.value, d = A.useRef(u);
	return A.useEffect(() => {
		let e = requestAnimationFrame(() => d.current = !1);
		return () => cancelAnimationFrame(e);
	}, []), /* @__PURE__ */ N(E, {
		present: i || u,
		children: ({ present: n }) => /* @__PURE__ */ N(w.div, {
			"data-state": u ? "active" : "inactive",
			"data-orientation": s.orientation,
			role: "tabpanel",
			"aria-labelledby": c,
			hidden: !n,
			id: l,
			tabIndex: 0,
			...o,
			ref: t,
			style: {
				...e.style,
				animationDuration: d.current ? "0s" : void 0
			},
			children: n && a
		})
	});
});
yt.displayName = vt;
function bt(e, t) {
	return `${e}-trigger-${t}`;
}
function xt(e, t) {
	return `${e}-content-${t}`;
}
var St = pt, Ct = ht, wt = _t, Tt = yt, Et = A.forwardRef(({ ...e }, t) => /* @__PURE__ */ N(St, {
	ref: t,
	"data-sdk-ui": "tabs",
	"data-slot": "tabs",
	...e
})), Dt = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ N(Ct, {
	ref: n,
	className: u("inline-flex h-10 items-center gap-1 rounded-[var(--sdk-radius-control)] bg-[var(--sdk-color-surface-panel-muted)] p-1 text-[var(--sdk-color-text-secondary)]", e),
	"data-sdk-ui": "tabs-list",
	"data-slot": "tabs-list",
	...t
}));
Dt.displayName = "TabsList";
var Ot = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ N(wt, {
	ref: n,
	className: u("inline-flex min-w-[6rem] items-center justify-center rounded-[var(--sdk-radius-control)] px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sdk-color-border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sdk-color-surface-canvas)] data-[state=active]:bg-[var(--sdk-color-surface-panel)] data-[state=active]:text-[var(--sdk-color-text-primary)] data-[state=active]:shadow-[var(--sdk-shadow-sm)]", e),
	"data-sdk-ui": "tabs-trigger",
	"data-slot": "tabs-trigger",
	...t
}));
Ot.displayName = "TabsTrigger";
var kt = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ N(Tt, {
	ref: n,
	className: u("mt-4 rounded-[var(--sdk-radius-panel)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] p-5 text-[var(--sdk-color-text-primary)] shadow-[var(--sdk-shadow-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sdk-color-border-focus)]", e),
	"data-sdk-ui": "tabs-content",
	"data-slot": "tabs-content",
	...t
}));
kt.displayName = "TabsContent", Et.displayName = "Tabs";
//#endregion
//#region src/components/ui/data-display/collection-grid.tsx
var At = A.forwardRef(({ className: e, emptyActions: t, emptyDescription: n, emptyTitle: r = "No items", getItemKey: i, items: a, loading: o = !1, loadingLabel: s, pagination: c, renderItem: l, slotProps: f, ...p }, m) => /* @__PURE__ */ N("div", {
	ref: m,
	className: u("flex flex-col gap-6", e),
	"data-sdk-ui": "collection-grid",
	"data-slot": "collection-grid",
	...p,
	children: o ? /* @__PURE__ */ N(ee, { label: s }) : a.length === 0 ? /* @__PURE__ */ N(te, {
		actions: t,
		description: n,
		title: r
	}) : /* @__PURE__ */ P(M, { children: [/* @__PURE__ */ N("div", {
		...d({ className: "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3" }, f?.grid),
		"data-sdk-region": "collection-grid-grid",
		children: a.map((e, t) => /* @__PURE__ */ N(A.Fragment, { children: l(e, t) }, i?.(e, t) ?? e.id ?? t))
	}), c ? /* @__PURE__ */ N("div", {
		...d({}, f?.pagination),
		"data-sdk-region": "collection-grid-pagination",
		children: c
	}) : null] })
}));
At.displayName = "CollectionGrid";
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@tanstack+table-core@8.21.3/node_modules/@tanstack/table-core/build/lib/index.mjs
function K(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function q(e, t) {
	return (n) => {
		t.setState((t) => ({
			...t,
			[e]: K(n, t[e])
		}));
	};
}
function jt(e) {
	return e instanceof Function;
}
function Mt(e) {
	return Array.isArray(e) && e.every((e) => typeof e == "number");
}
function Nt(e, t) {
	let n = [], r = (e) => {
		e.forEach((e) => {
			n.push(e);
			let i = t(e);
			i != null && i.length && r(i);
		});
	};
	return r(e), n;
}
function J(e, t, n) {
	let r = [], i;
	return (a) => {
		let o;
		n.key && n.debug && (o = Date.now());
		let s = e(a);
		if (!(s.length !== r.length || s.some((e, t) => r[t] !== e))) return i;
		r = s;
		let c;
		if (n.key && n.debug && (c = Date.now()), i = t(...s), n == null || n.onChange == null || n.onChange(i), n.key && n.debug && n != null && n.debug()) {
			let e = Math.round((Date.now() - o) * 100) / 100, t = Math.round((Date.now() - c) * 100) / 100, r = t / 16, i = (e, t) => {
				for (e = String(e); e.length < t;) e = " " + e;
				return e;
			};
			console.info(`%c⏱ ${i(t, 5)} /${i(e, 5)} ms`, `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * r, 120))}deg 100% 31%);`, n?.key);
		}
		return i;
	};
}
function Y(e, t, n, r) {
	return {
		debug: () => e?.debugAll ?? e[t],
		key: process.env.NODE_ENV === "development" && n,
		onChange: r
	};
}
function Pt(e, t, n, r) {
	let i = {
		id: `${t.id}_${n.id}`,
		row: t,
		column: n,
		getValue: () => t.getValue(r),
		renderValue: () => i.getValue() ?? e.options.renderFallbackValue,
		getContext: J(() => [
			e,
			n,
			t,
			i
		], (e, t, n, r) => ({
			table: e,
			column: t,
			row: n,
			cell: r,
			getValue: r.getValue,
			renderValue: r.renderValue
		}), Y(e.options, "debugCells", "cell.getContext"))
	};
	return e._features.forEach((r) => {
		r.createCell == null || r.createCell(i, n, t, e);
	}, {}), i;
}
function Ft(e, t, n, r) {
	let i = {
		...e._getDefaultColumnDef(),
		...t
	}, a = i.accessorKey, o = i.id ?? (a ? typeof String.prototype.replaceAll == "function" ? a.replaceAll(".", "_") : a.replace(/\./g, "_") : void 0) ?? (typeof i.header == "string" ? i.header : void 0), s;
	if (i.accessorFn ? s = i.accessorFn : a && (s = a.includes(".") ? (e) => {
		let t = e;
		for (let e of a.split(".")) t = t?.[e], process.env.NODE_ENV !== "production" && t === void 0 && console.warn(`"${e}" in deeply nested key "${a}" returned undefined.`);
		return t;
	} : (e) => e[i.accessorKey]), !o) throw process.env.NODE_ENV === "production" ? Error() : Error(i.accessorFn ? "Columns require an id when using an accessorFn" : "Columns require an id when using a non-string header");
	let c = {
		id: `${String(o)}`,
		accessorFn: s,
		parent: r,
		depth: n,
		columnDef: i,
		columns: [],
		getFlatColumns: J(() => [!0], () => [c, ...c.columns?.flatMap((e) => e.getFlatColumns())], Y(e.options, "debugColumns", "column.getFlatColumns")),
		getLeafColumns: J(() => [e._getOrderColumnsFn()], (e) => {
			var t;
			return (t = c.columns) != null && t.length ? e(c.columns.flatMap((e) => e.getLeafColumns())) : [c];
		}, Y(e.options, "debugColumns", "column.getLeafColumns"))
	};
	for (let t of e._features) t.createColumn == null || t.createColumn(c, e);
	return c;
}
var X = "debugHeaders";
function It(e, t, n) {
	let r = {
		id: n.id ?? t.id,
		column: t,
		index: n.index,
		isPlaceholder: !!n.isPlaceholder,
		placeholderId: n.placeholderId,
		depth: n.depth,
		subHeaders: [],
		colSpan: 0,
		rowSpan: 0,
		headerGroup: null,
		getLeafHeaders: () => {
			let e = [], t = (n) => {
				n.subHeaders && n.subHeaders.length && n.subHeaders.map(t), e.push(n);
			};
			return t(r), e;
		},
		getContext: () => ({
			table: e,
			header: r,
			column: t
		})
	};
	return e._features.forEach((t) => {
		t.createHeader == null || t.createHeader(r, e);
	}), r;
}
var Lt = { createTable: (e) => {
	e.getHeaderGroups = J(() => [
		e.getAllColumns(),
		e.getVisibleLeafColumns(),
		e.getState().columnPinning.left,
		e.getState().columnPinning.right
	], (t, n, r, i) => {
		let a = r?.map((e) => n.find((t) => t.id === e)).filter(Boolean) ?? [], o = i?.map((e) => n.find((t) => t.id === e)).filter(Boolean) ?? [], s = n.filter((e) => !(r != null && r.includes(e.id)) && !(i != null && i.includes(e.id)));
		return Rt(t, [
			...a,
			...s,
			...o
		], e);
	}, Y(e.options, X, "getHeaderGroups")), e.getCenterHeaderGroups = J(() => [
		e.getAllColumns(),
		e.getVisibleLeafColumns(),
		e.getState().columnPinning.left,
		e.getState().columnPinning.right
	], (t, n, r, i) => (n = n.filter((e) => !(r != null && r.includes(e.id)) && !(i != null && i.includes(e.id))), Rt(t, n, e, "center")), Y(e.options, X, "getCenterHeaderGroups")), e.getLeftHeaderGroups = J(() => [
		e.getAllColumns(),
		e.getVisibleLeafColumns(),
		e.getState().columnPinning.left
	], (t, n, r) => Rt(t, r?.map((e) => n.find((t) => t.id === e)).filter(Boolean) ?? [], e, "left"), Y(e.options, X, "getLeftHeaderGroups")), e.getRightHeaderGroups = J(() => [
		e.getAllColumns(),
		e.getVisibleLeafColumns(),
		e.getState().columnPinning.right
	], (t, n, r) => Rt(t, r?.map((e) => n.find((t) => t.id === e)).filter(Boolean) ?? [], e, "right"), Y(e.options, X, "getRightHeaderGroups")), e.getFooterGroups = J(() => [e.getHeaderGroups()], (e) => [...e].reverse(), Y(e.options, X, "getFooterGroups")), e.getLeftFooterGroups = J(() => [e.getLeftHeaderGroups()], (e) => [...e].reverse(), Y(e.options, X, "getLeftFooterGroups")), e.getCenterFooterGroups = J(() => [e.getCenterHeaderGroups()], (e) => [...e].reverse(), Y(e.options, X, "getCenterFooterGroups")), e.getRightFooterGroups = J(() => [e.getRightHeaderGroups()], (e) => [...e].reverse(), Y(e.options, X, "getRightFooterGroups")), e.getFlatHeaders = J(() => [e.getHeaderGroups()], (e) => e.map((e) => e.headers).flat(), Y(e.options, X, "getFlatHeaders")), e.getLeftFlatHeaders = J(() => [e.getLeftHeaderGroups()], (e) => e.map((e) => e.headers).flat(), Y(e.options, X, "getLeftFlatHeaders")), e.getCenterFlatHeaders = J(() => [e.getCenterHeaderGroups()], (e) => e.map((e) => e.headers).flat(), Y(e.options, X, "getCenterFlatHeaders")), e.getRightFlatHeaders = J(() => [e.getRightHeaderGroups()], (e) => e.map((e) => e.headers).flat(), Y(e.options, X, "getRightFlatHeaders")), e.getCenterLeafHeaders = J(() => [e.getCenterFlatHeaders()], (e) => e.filter((e) => {
		var t;
		return !((t = e.subHeaders) != null && t.length);
	}), Y(e.options, X, "getCenterLeafHeaders")), e.getLeftLeafHeaders = J(() => [e.getLeftFlatHeaders()], (e) => e.filter((e) => {
		var t;
		return !((t = e.subHeaders) != null && t.length);
	}), Y(e.options, X, "getLeftLeafHeaders")), e.getRightLeafHeaders = J(() => [e.getRightFlatHeaders()], (e) => e.filter((e) => {
		var t;
		return !((t = e.subHeaders) != null && t.length);
	}), Y(e.options, X, "getRightLeafHeaders")), e.getLeafHeaders = J(() => [
		e.getLeftHeaderGroups(),
		e.getCenterHeaderGroups(),
		e.getRightHeaderGroups()
	], (e, t, n) => [
		...e[0]?.headers ?? [],
		...t[0]?.headers ?? [],
		...n[0]?.headers ?? []
	].map((e) => e.getLeafHeaders()).flat(), Y(e.options, X, "getLeafHeaders"));
} };
function Rt(e, t, n, r) {
	let i = 0, a = function(e, t) {
		t === void 0 && (t = 1), i = Math.max(i, t), e.filter((e) => e.getIsVisible()).forEach((e) => {
			var n;
			(n = e.columns) != null && n.length && a(e.columns, t + 1);
		}, 0);
	};
	a(e);
	let o = [], s = (e, t) => {
		let i = {
			depth: t,
			id: [r, `${t}`].filter(Boolean).join("_"),
			headers: []
		}, a = [];
		e.forEach((e) => {
			let o = [...a].reverse()[0], s = e.column.depth === i.depth, c, l = !1;
			if (s && e.column.parent ? c = e.column.parent : (c = e.column, l = !0), o && o?.column === c) o.subHeaders.push(e);
			else {
				let i = It(n, c, {
					id: [
						r,
						t,
						c.id,
						e?.id
					].filter(Boolean).join("_"),
					isPlaceholder: l,
					placeholderId: l ? `${a.filter((e) => e.column === c).length}` : void 0,
					depth: t,
					index: a.length
				});
				i.subHeaders.push(e), a.push(i);
			}
			i.headers.push(e), e.headerGroup = i;
		}), o.push(i), t > 0 && s(a, t - 1);
	};
	s(t.map((e, t) => It(n, e, {
		depth: i,
		index: t
	})), i - 1), o.reverse();
	let c = (e) => e.filter((e) => e.column.getIsVisible()).map((e) => {
		let t = 0, n = 0, r = [0];
		e.subHeaders && e.subHeaders.length ? (r = [], c(e.subHeaders).forEach((e) => {
			let { colSpan: n, rowSpan: i } = e;
			t += n, r.push(i);
		})) : t = 1;
		let i = Math.min(...r);
		return n += i, e.colSpan = t, e.rowSpan = n, {
			colSpan: t,
			rowSpan: n
		};
	});
	return c(o[0]?.headers ?? []), o;
}
var zt = (e, t, n, r, i, a, o) => {
	let s = {
		id: t,
		index: r,
		original: n,
		depth: i,
		parentId: o,
		_valuesCache: {},
		_uniqueValuesCache: {},
		getValue: (t) => {
			if (s._valuesCache.hasOwnProperty(t)) return s._valuesCache[t];
			let n = e.getColumn(t);
			if (n != null && n.accessorFn) return s._valuesCache[t] = n.accessorFn(s.original, r), s._valuesCache[t];
		},
		getUniqueValues: (t) => {
			if (s._uniqueValuesCache.hasOwnProperty(t)) return s._uniqueValuesCache[t];
			let n = e.getColumn(t);
			if (n != null && n.accessorFn) return n.columnDef.getUniqueValues ? (s._uniqueValuesCache[t] = n.columnDef.getUniqueValues(s.original, r), s._uniqueValuesCache[t]) : (s._uniqueValuesCache[t] = [s.getValue(t)], s._uniqueValuesCache[t]);
		},
		renderValue: (t) => s.getValue(t) ?? e.options.renderFallbackValue,
		subRows: a ?? [],
		getLeafRows: () => Nt(s.subRows, (e) => e.subRows),
		getParentRow: () => s.parentId ? e.getRow(s.parentId, !0) : void 0,
		getParentRows: () => {
			let e = [], t = s;
			for (;;) {
				let n = t.getParentRow();
				if (!n) break;
				e.push(n), t = n;
			}
			return e.reverse();
		},
		getAllCells: J(() => [e.getAllLeafColumns()], (t) => t.map((t) => Pt(e, s, t, t.id)), Y(e.options, "debugRows", "getAllCells")),
		_getAllCellsByColumnId: J(() => [s.getAllCells()], (e) => e.reduce((e, t) => (e[t.column.id] = t, e), {}), Y(e.options, "debugRows", "getAllCellsByColumnId"))
	};
	for (let t = 0; t < e._features.length; t++) {
		let n = e._features[t];
		n == null || n.createRow == null || n.createRow(s, e);
	}
	return s;
}, Bt = { createColumn: (e, t) => {
	e._getFacetedRowModel = t.options.getFacetedRowModel && t.options.getFacetedRowModel(t, e.id), e.getFacetedRowModel = () => e._getFacetedRowModel ? e._getFacetedRowModel() : t.getPreFilteredRowModel(), e._getFacetedUniqueValues = t.options.getFacetedUniqueValues && t.options.getFacetedUniqueValues(t, e.id), e.getFacetedUniqueValues = () => e._getFacetedUniqueValues ? e._getFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getFacetedMinMaxValues = t.options.getFacetedMinMaxValues && t.options.getFacetedMinMaxValues(t, e.id), e.getFacetedMinMaxValues = () => {
		if (e._getFacetedMinMaxValues) return e._getFacetedMinMaxValues();
	};
} }, Vt = (e, t, n) => {
	var r, i;
	let a = n == null || (r = n.toString()) == null ? void 0 : r.toLowerCase();
	return !!(!((i = e.getValue(t)) == null || (i = i.toString()) == null || (i = i.toLowerCase()) == null) && i.includes(a));
};
Vt.autoRemove = (e) => Q(e);
var Ht = (e, t, n) => {
	var r;
	return !!(!((r = e.getValue(t)) == null || (r = r.toString()) == null) && r.includes(n));
};
Ht.autoRemove = (e) => Q(e);
var Ut = (e, t, n) => {
	var r;
	return ((r = e.getValue(t)) == null || (r = r.toString()) == null ? void 0 : r.toLowerCase()) === n?.toLowerCase();
};
Ut.autoRemove = (e) => Q(e);
var Wt = (e, t, n) => e.getValue(t)?.includes(n);
Wt.autoRemove = (e) => Q(e);
var Gt = (e, t, n) => !n.some((n) => {
	var r;
	return !((r = e.getValue(t)) != null && r.includes(n));
});
Gt.autoRemove = (e) => Q(e) || !(e != null && e.length);
var Kt = (e, t, n) => n.some((n) => e.getValue(t)?.includes(n));
Kt.autoRemove = (e) => Q(e) || !(e != null && e.length);
var qt = (e, t, n) => e.getValue(t) === n;
qt.autoRemove = (e) => Q(e);
var Jt = (e, t, n) => e.getValue(t) == n;
Jt.autoRemove = (e) => Q(e);
var Yt = (e, t, n) => {
	let [r, i] = n, a = e.getValue(t);
	return a >= r && a <= i;
};
Yt.resolveFilterValue = (e) => {
	let [t, n] = e, r = typeof t == "number" ? t : parseFloat(t), i = typeof n == "number" ? n : parseFloat(n), a = t === null || Number.isNaN(r) ? -Infinity : r, o = n === null || Number.isNaN(i) ? Infinity : i;
	if (a > o) {
		let e = a;
		a = o, o = e;
	}
	return [a, o];
}, Yt.autoRemove = (e) => Q(e) || Q(e[0]) && Q(e[1]);
var Z = {
	includesString: Vt,
	includesStringSensitive: Ht,
	equalsString: Ut,
	arrIncludes: Wt,
	arrIncludesAll: Gt,
	arrIncludesSome: Kt,
	equals: qt,
	weakEquals: Jt,
	inNumberRange: Yt
};
function Q(e) {
	return e == null || e === "";
}
var Xt = {
	getDefaultColumnDef: () => ({ filterFn: "auto" }),
	getInitialState: (e) => ({
		columnFilters: [],
		...e
	}),
	getDefaultOptions: (e) => ({
		onColumnFiltersChange: q("columnFilters", e),
		filterFromLeafRows: !1,
		maxLeafRowFilterDepth: 100
	}),
	createColumn: (e, t) => {
		e.getAutoFilterFn = () => {
			let n = t.getCoreRowModel().flatRows[0]?.getValue(e.id);
			return typeof n == "string" ? Z.includesString : typeof n == "number" ? Z.inNumberRange : typeof n == "boolean" || typeof n == "object" && n ? Z.equals : Array.isArray(n) ? Z.arrIncludes : Z.weakEquals;
		}, e.getFilterFn = () => jt(e.columnDef.filterFn) ? e.columnDef.filterFn : e.columnDef.filterFn === "auto" ? e.getAutoFilterFn() : t.options.filterFns?.[e.columnDef.filterFn] ?? Z[e.columnDef.filterFn], e.getCanFilter = () => (e.columnDef.enableColumnFilter ?? !0) && (t.options.enableColumnFilters ?? !0) && (t.options.enableFilters ?? !0) && !!e.accessorFn, e.getIsFiltered = () => e.getFilterIndex() > -1, e.getFilterValue = () => {
			var n;
			return (n = t.getState().columnFilters) == null || (n = n.find((t) => t.id === e.id)) == null ? void 0 : n.value;
		}, e.getFilterIndex = () => t.getState().columnFilters?.findIndex((t) => t.id === e.id) ?? -1, e.setFilterValue = (n) => {
			t.setColumnFilters((t) => {
				let r = e.getFilterFn(), i = t?.find((t) => t.id === e.id), a = K(n, i ? i.value : void 0);
				if (Zt(r, a, e)) return t?.filter((t) => t.id !== e.id) ?? [];
				let o = {
					id: e.id,
					value: a
				};
				return i ? t?.map((t) => t.id === e.id ? o : t) ?? [] : t != null && t.length ? [...t, o] : [o];
			});
		};
	},
	createRow: (e, t) => {
		e.columnFilters = {}, e.columnFiltersMeta = {};
	},
	createTable: (e) => {
		e.setColumnFilters = (t) => {
			let n = e.getAllLeafColumns();
			e.options.onColumnFiltersChange == null || e.options.onColumnFiltersChange((e) => K(t, e)?.filter((e) => {
				let t = n.find((t) => t.id === e.id);
				return !(t && Zt(t.getFilterFn(), e.value, t));
			}));
		}, e.resetColumnFilters = (t) => {
			e.setColumnFilters(t ? [] : e.initialState?.columnFilters ?? []);
		}, e.getPreFilteredRowModel = () => e.getCoreRowModel(), e.getFilteredRowModel = () => (!e._getFilteredRowModel && e.options.getFilteredRowModel && (e._getFilteredRowModel = e.options.getFilteredRowModel(e)), e.options.manualFiltering || !e._getFilteredRowModel ? e.getPreFilteredRowModel() : e._getFilteredRowModel());
	}
};
function Zt(e, t, n) {
	return (e && e.autoRemove ? e.autoRemove(t, n) : !1) || t === void 0 || typeof t == "string" && !t;
}
var Qt = {
	sum: (e, t, n) => n.reduce((t, n) => {
		let r = n.getValue(e);
		return t + (typeof r == "number" ? r : 0);
	}, 0),
	min: (e, t, n) => {
		let r;
		return n.forEach((t) => {
			let n = t.getValue(e);
			n != null && (r > n || r === void 0 && n >= n) && (r = n);
		}), r;
	},
	max: (e, t, n) => {
		let r;
		return n.forEach((t) => {
			let n = t.getValue(e);
			n != null && (r < n || r === void 0 && n >= n) && (r = n);
		}), r;
	},
	extent: (e, t, n) => {
		let r, i;
		return n.forEach((t) => {
			let n = t.getValue(e);
			n != null && (r === void 0 ? n >= n && (r = i = n) : (r > n && (r = n), i < n && (i = n)));
		}), [r, i];
	},
	mean: (e, t) => {
		let n = 0, r = 0;
		if (t.forEach((t) => {
			let i = t.getValue(e);
			i != null && (i = +i) >= i && (++n, r += i);
		}), n) return r / n;
	},
	median: (e, t) => {
		if (!t.length) return;
		let n = t.map((t) => t.getValue(e));
		if (!Mt(n)) return;
		if (n.length === 1) return n[0];
		let r = Math.floor(n.length / 2), i = n.sort((e, t) => e - t);
		return n.length % 2 == 0 ? (i[r - 1] + i[r]) / 2 : i[r];
	},
	unique: (e, t) => Array.from(new Set(t.map((t) => t.getValue(e))).values()),
	uniqueCount: (e, t) => new Set(t.map((t) => t.getValue(e))).size,
	count: (e, t) => t.length
}, $t = {
	getDefaultColumnDef: () => ({
		aggregatedCell: (e) => {
			var t;
			return ((t = e.getValue()) == null || t.toString == null ? void 0 : t.toString()) ?? null;
		},
		aggregationFn: "auto"
	}),
	getInitialState: (e) => ({
		grouping: [],
		...e
	}),
	getDefaultOptions: (e) => ({
		onGroupingChange: q("grouping", e),
		groupedColumnMode: "reorder"
	}),
	createColumn: (e, t) => {
		e.toggleGrouping = () => {
			t.setGrouping((t) => t != null && t.includes(e.id) ? t.filter((t) => t !== e.id) : [...t ?? [], e.id]);
		}, e.getCanGroup = () => (e.columnDef.enableGrouping ?? !0) && (t.options.enableGrouping ?? !0) && (!!e.accessorFn || !!e.columnDef.getGroupingValue), e.getIsGrouped = () => t.getState().grouping?.includes(e.id), e.getGroupedIndex = () => t.getState().grouping?.indexOf(e.id), e.getToggleGroupingHandler = () => {
			let t = e.getCanGroup();
			return () => {
				t && e.toggleGrouping();
			};
		}, e.getAutoAggregationFn = () => {
			let n = t.getCoreRowModel().flatRows[0]?.getValue(e.id);
			if (typeof n == "number") return Qt.sum;
			if (Object.prototype.toString.call(n) === "[object Date]") return Qt.extent;
		}, e.getAggregationFn = () => {
			if (!e) throw Error();
			return jt(e.columnDef.aggregationFn) ? e.columnDef.aggregationFn : e.columnDef.aggregationFn === "auto" ? e.getAutoAggregationFn() : t.options.aggregationFns?.[e.columnDef.aggregationFn] ?? Qt[e.columnDef.aggregationFn];
		};
	},
	createTable: (e) => {
		e.setGrouping = (t) => e.options.onGroupingChange == null ? void 0 : e.options.onGroupingChange(t), e.resetGrouping = (t) => {
			e.setGrouping(t ? [] : e.initialState?.grouping ?? []);
		}, e.getPreGroupedRowModel = () => e.getFilteredRowModel(), e.getGroupedRowModel = () => (!e._getGroupedRowModel && e.options.getGroupedRowModel && (e._getGroupedRowModel = e.options.getGroupedRowModel(e)), e.options.manualGrouping || !e._getGroupedRowModel ? e.getPreGroupedRowModel() : e._getGroupedRowModel());
	},
	createRow: (e, t) => {
		e.getIsGrouped = () => !!e.groupingColumnId, e.getGroupingValue = (n) => {
			if (e._groupingValuesCache.hasOwnProperty(n)) return e._groupingValuesCache[n];
			let r = t.getColumn(n);
			return r != null && r.columnDef.getGroupingValue ? (e._groupingValuesCache[n] = r.columnDef.getGroupingValue(e.original), e._groupingValuesCache[n]) : e.getValue(n);
		}, e._groupingValuesCache = {};
	},
	createCell: (e, t, n, r) => {
		e.getIsGrouped = () => t.getIsGrouped() && t.id === n.groupingColumnId, e.getIsPlaceholder = () => !e.getIsGrouped() && t.getIsGrouped(), e.getIsAggregated = () => {
			var t;
			return !e.getIsGrouped() && !e.getIsPlaceholder() && !!((t = n.subRows) != null && t.length);
		};
	}
};
function en(e, t, n) {
	if (!(t != null && t.length) || !n) return e;
	let r = e.filter((e) => !t.includes(e.id));
	return n === "remove" ? r : [...t.map((t) => e.find((e) => e.id === t)).filter(Boolean), ...r];
}
var tn = {
	getInitialState: (e) => ({
		columnOrder: [],
		...e
	}),
	getDefaultOptions: (e) => ({ onColumnOrderChange: q("columnOrder", e) }),
	createColumn: (e, t) => {
		e.getIndex = J((e) => [pn(t, e)], (t) => t.findIndex((t) => t.id === e.id), Y(t.options, "debugColumns", "getIndex")), e.getIsFirstColumn = (n) => pn(t, n)[0]?.id === e.id, e.getIsLastColumn = (n) => {
			let r = pn(t, n);
			return r[r.length - 1]?.id === e.id;
		};
	},
	createTable: (e) => {
		e.setColumnOrder = (t) => e.options.onColumnOrderChange == null ? void 0 : e.options.onColumnOrderChange(t), e.resetColumnOrder = (t) => {
			e.setColumnOrder(t ? [] : e.initialState.columnOrder ?? []);
		}, e._getOrderColumnsFn = J(() => [
			e.getState().columnOrder,
			e.getState().grouping,
			e.options.groupedColumnMode
		], (e, t, n) => (r) => {
			let i = [];
			if (!(e != null && e.length)) i = r;
			else {
				let t = [...e], n = [...r];
				for (; n.length && t.length;) {
					let e = t.shift(), r = n.findIndex((t) => t.id === e);
					r > -1 && i.push(n.splice(r, 1)[0]);
				}
				i = [...i, ...n];
			}
			return en(i, t, n);
		}, Y(e.options, "debugTable", "_getOrderColumnsFn"));
	}
}, nn = () => ({
	left: [],
	right: []
}), rn = {
	getInitialState: (e) => ({
		columnPinning: nn(),
		...e
	}),
	getDefaultOptions: (e) => ({ onColumnPinningChange: q("columnPinning", e) }),
	createColumn: (e, t) => {
		e.pin = (n) => {
			let r = e.getLeafColumns().map((e) => e.id).filter(Boolean);
			t.setColumnPinning((e) => n === "right" ? {
				left: (e?.left ?? []).filter((e) => !(r != null && r.includes(e))),
				right: [...(e?.right ?? []).filter((e) => !(r != null && r.includes(e))), ...r]
			} : n === "left" ? {
				left: [...(e?.left ?? []).filter((e) => !(r != null && r.includes(e))), ...r],
				right: (e?.right ?? []).filter((e) => !(r != null && r.includes(e)))
			} : {
				left: (e?.left ?? []).filter((e) => !(r != null && r.includes(e))),
				right: (e?.right ?? []).filter((e) => !(r != null && r.includes(e)))
			});
		}, e.getCanPin = () => e.getLeafColumns().some((e) => (e.columnDef.enablePinning ?? !0) && (t.options.enableColumnPinning ?? t.options.enablePinning ?? !0)), e.getIsPinned = () => {
			let n = e.getLeafColumns().map((e) => e.id), { left: r, right: i } = t.getState().columnPinning, a = n.some((e) => r?.includes(e)), o = n.some((e) => i?.includes(e));
			return a ? "left" : o ? "right" : !1;
		}, e.getPinnedIndex = () => {
			var n;
			let r = e.getIsPinned();
			return r ? ((n = t.getState().columnPinning) == null || (n = n[r]) == null ? void 0 : n.indexOf(e.id)) ?? -1 : 0;
		};
	},
	createRow: (e, t) => {
		e.getCenterVisibleCells = J(() => [
			e._getAllVisibleCells(),
			t.getState().columnPinning.left,
			t.getState().columnPinning.right
		], (e, t, n) => {
			let r = [...t ?? [], ...n ?? []];
			return e.filter((e) => !r.includes(e.column.id));
		}, Y(t.options, "debugRows", "getCenterVisibleCells")), e.getLeftVisibleCells = J(() => [e._getAllVisibleCells(), t.getState().columnPinning.left], (e, t) => (t ?? []).map((t) => e.find((e) => e.column.id === t)).filter(Boolean).map((e) => ({
			...e,
			position: "left"
		})), Y(t.options, "debugRows", "getLeftVisibleCells")), e.getRightVisibleCells = J(() => [e._getAllVisibleCells(), t.getState().columnPinning.right], (e, t) => (t ?? []).map((t) => e.find((e) => e.column.id === t)).filter(Boolean).map((e) => ({
			...e,
			position: "right"
		})), Y(t.options, "debugRows", "getRightVisibleCells"));
	},
	createTable: (e) => {
		e.setColumnPinning = (t) => e.options.onColumnPinningChange == null ? void 0 : e.options.onColumnPinningChange(t), e.resetColumnPinning = (t) => e.setColumnPinning(t ? nn() : e.initialState?.columnPinning ?? nn()), e.getIsSomeColumnsPinned = (t) => {
			let n = e.getState().columnPinning;
			return t ? !!n[t]?.length : !!(n.left?.length || n.right?.length);
		}, e.getLeftLeafColumns = J(() => [e.getAllLeafColumns(), e.getState().columnPinning.left], (e, t) => (t ?? []).map((t) => e.find((e) => e.id === t)).filter(Boolean), Y(e.options, "debugColumns", "getLeftLeafColumns")), e.getRightLeafColumns = J(() => [e.getAllLeafColumns(), e.getState().columnPinning.right], (e, t) => (t ?? []).map((t) => e.find((e) => e.id === t)).filter(Boolean), Y(e.options, "debugColumns", "getRightLeafColumns")), e.getCenterLeafColumns = J(() => [
			e.getAllLeafColumns(),
			e.getState().columnPinning.left,
			e.getState().columnPinning.right
		], (e, t, n) => {
			let r = [...t ?? [], ...n ?? []];
			return e.filter((e) => !r.includes(e.id));
		}, Y(e.options, "debugColumns", "getCenterLeafColumns"));
	}
};
function an(e) {
	return e || (typeof document < "u" ? document : null);
}
var on = {
	size: 150,
	minSize: 20,
	maxSize: 2 ** 53 - 1
}, sn = () => ({
	startOffset: null,
	startSize: null,
	deltaOffset: null,
	deltaPercentage: null,
	isResizingColumn: !1,
	columnSizingStart: []
}), cn = {
	getDefaultColumnDef: () => on,
	getInitialState: (e) => ({
		columnSizing: {},
		columnSizingInfo: sn(),
		...e
	}),
	getDefaultOptions: (e) => ({
		columnResizeMode: "onEnd",
		columnResizeDirection: "ltr",
		onColumnSizingChange: q("columnSizing", e),
		onColumnSizingInfoChange: q("columnSizingInfo", e)
	}),
	createColumn: (e, t) => {
		e.getSize = () => {
			let n = t.getState().columnSizing[e.id];
			return Math.min(Math.max(e.columnDef.minSize ?? on.minSize, n ?? e.columnDef.size ?? on.size), e.columnDef.maxSize ?? on.maxSize);
		}, e.getStart = J((e) => [
			e,
			pn(t, e),
			t.getState().columnSizing
		], (t, n) => n.slice(0, e.getIndex(t)).reduce((e, t) => e + t.getSize(), 0), Y(t.options, "debugColumns", "getStart")), e.getAfter = J((e) => [
			e,
			pn(t, e),
			t.getState().columnSizing
		], (t, n) => n.slice(e.getIndex(t) + 1).reduce((e, t) => e + t.getSize(), 0), Y(t.options, "debugColumns", "getAfter")), e.resetSize = () => {
			t.setColumnSizing((t) => {
				let { [e.id]: n, ...r } = t;
				return r;
			});
		}, e.getCanResize = () => (e.columnDef.enableResizing ?? !0) && (t.options.enableColumnResizing ?? !0), e.getIsResizing = () => t.getState().columnSizingInfo.isResizingColumn === e.id;
	},
	createHeader: (e, t) => {
		e.getSize = () => {
			let t = 0, n = (e) => {
				e.subHeaders.length ? e.subHeaders.forEach(n) : t += e.column.getSize() ?? 0;
			};
			return n(e), t;
		}, e.getStart = () => {
			if (e.index > 0) {
				let t = e.headerGroup.headers[e.index - 1];
				return t.getStart() + t.getSize();
			}
			return 0;
		}, e.getResizeHandler = (n) => {
			let r = t.getColumn(e.column.id), i = r?.getCanResize();
			return (a) => {
				if (!r || !i || (a.persist == null || a.persist(), dn(a) && a.touches && a.touches.length > 1)) return;
				let o = e.getSize(), s = e ? e.getLeafHeaders().map((e) => [e.column.id, e.column.getSize()]) : [[r.id, r.getSize()]], c = dn(a) ? Math.round(a.touches[0].clientX) : a.clientX, l = {}, u = (e, n) => {
					typeof n == "number" && (t.setColumnSizingInfo((e) => {
						let r = t.options.columnResizeDirection === "rtl" ? -1 : 1, i = (n - (e?.startOffset ?? 0)) * r, a = Math.max(i / (e?.startSize ?? 0), -.999999);
						return e.columnSizingStart.forEach((e) => {
							let [t, n] = e;
							l[t] = Math.round(Math.max(n + n * a, 0) * 100) / 100;
						}), {
							...e,
							deltaOffset: i,
							deltaPercentage: a
						};
					}), (t.options.columnResizeMode === "onChange" || e === "end") && t.setColumnSizing((e) => ({
						...e,
						...l
					})));
				}, d = (e) => u("move", e), f = (e) => {
					u("end", e), t.setColumnSizingInfo((e) => ({
						...e,
						isResizingColumn: !1,
						startOffset: null,
						startSize: null,
						deltaOffset: null,
						deltaPercentage: null,
						columnSizingStart: []
					}));
				}, p = an(n), m = {
					moveHandler: (e) => d(e.clientX),
					upHandler: (e) => {
						p?.removeEventListener("mousemove", m.moveHandler), p?.removeEventListener("mouseup", m.upHandler), f(e.clientX);
					}
				}, h = {
					moveHandler: (e) => (e.cancelable && (e.preventDefault(), e.stopPropagation()), d(e.touches[0].clientX), !1),
					upHandler: (e) => {
						p?.removeEventListener("touchmove", h.moveHandler), p?.removeEventListener("touchend", h.upHandler), e.cancelable && (e.preventDefault(), e.stopPropagation()), f(e.touches[0]?.clientX);
					}
				}, g = un() ? { passive: !1 } : !1;
				dn(a) ? (p?.addEventListener("touchmove", h.moveHandler, g), p?.addEventListener("touchend", h.upHandler, g)) : (p?.addEventListener("mousemove", m.moveHandler, g), p?.addEventListener("mouseup", m.upHandler, g)), t.setColumnSizingInfo((e) => ({
					...e,
					startOffset: c,
					startSize: o,
					deltaOffset: 0,
					deltaPercentage: 0,
					columnSizingStart: s,
					isResizingColumn: r.id
				}));
			};
		};
	},
	createTable: (e) => {
		e.setColumnSizing = (t) => e.options.onColumnSizingChange == null ? void 0 : e.options.onColumnSizingChange(t), e.setColumnSizingInfo = (t) => e.options.onColumnSizingInfoChange == null ? void 0 : e.options.onColumnSizingInfoChange(t), e.resetColumnSizing = (t) => {
			e.setColumnSizing(t ? {} : e.initialState.columnSizing ?? {});
		}, e.resetHeaderSizeInfo = (t) => {
			e.setColumnSizingInfo(t ? sn() : e.initialState.columnSizingInfo ?? sn());
		}, e.getTotalSize = () => e.getHeaderGroups()[0]?.headers.reduce((e, t) => e + t.getSize(), 0) ?? 0, e.getLeftTotalSize = () => e.getLeftHeaderGroups()[0]?.headers.reduce((e, t) => e + t.getSize(), 0) ?? 0, e.getCenterTotalSize = () => e.getCenterHeaderGroups()[0]?.headers.reduce((e, t) => e + t.getSize(), 0) ?? 0, e.getRightTotalSize = () => e.getRightHeaderGroups()[0]?.headers.reduce((e, t) => e + t.getSize(), 0) ?? 0;
	}
}, ln = null;
function un() {
	if (typeof ln == "boolean") return ln;
	let e = !1;
	try {
		let t = { get passive() {
			return e = !0, !1;
		} }, n = () => {};
		window.addEventListener("test", n, t), window.removeEventListener("test", n);
	} catch {
		e = !1;
	}
	return ln = e, ln;
}
function dn(e) {
	return e.type === "touchstart";
}
var fn = {
	getInitialState: (e) => ({
		columnVisibility: {},
		...e
	}),
	getDefaultOptions: (e) => ({ onColumnVisibilityChange: q("columnVisibility", e) }),
	createColumn: (e, t) => {
		e.toggleVisibility = (n) => {
			e.getCanHide() && t.setColumnVisibility((t) => ({
				...t,
				[e.id]: n ?? !e.getIsVisible()
			}));
		}, e.getIsVisible = () => {
			let n = e.columns;
			return (n.length ? n.some((e) => e.getIsVisible()) : t.getState().columnVisibility?.[e.id]) ?? !0;
		}, e.getCanHide = () => (e.columnDef.enableHiding ?? !0) && (t.options.enableHiding ?? !0), e.getToggleVisibilityHandler = () => (t) => {
			e.toggleVisibility == null || e.toggleVisibility(t.target.checked);
		};
	},
	createRow: (e, t) => {
		e._getAllVisibleCells = J(() => [e.getAllCells(), t.getState().columnVisibility], (e) => e.filter((e) => e.column.getIsVisible()), Y(t.options, "debugRows", "_getAllVisibleCells")), e.getVisibleCells = J(() => [
			e.getLeftVisibleCells(),
			e.getCenterVisibleCells(),
			e.getRightVisibleCells()
		], (e, t, n) => [
			...e,
			...t,
			...n
		], Y(t.options, "debugRows", "getVisibleCells"));
	},
	createTable: (e) => {
		let t = (t, n) => J(() => [n(), n().filter((e) => e.getIsVisible()).map((e) => e.id).join("_")], (e) => e.filter((e) => e.getIsVisible == null ? void 0 : e.getIsVisible()), Y(e.options, "debugColumns", t));
		e.getVisibleFlatColumns = t("getVisibleFlatColumns", () => e.getAllFlatColumns()), e.getVisibleLeafColumns = t("getVisibleLeafColumns", () => e.getAllLeafColumns()), e.getLeftVisibleLeafColumns = t("getLeftVisibleLeafColumns", () => e.getLeftLeafColumns()), e.getRightVisibleLeafColumns = t("getRightVisibleLeafColumns", () => e.getRightLeafColumns()), e.getCenterVisibleLeafColumns = t("getCenterVisibleLeafColumns", () => e.getCenterLeafColumns()), e.setColumnVisibility = (t) => e.options.onColumnVisibilityChange == null ? void 0 : e.options.onColumnVisibilityChange(t), e.resetColumnVisibility = (t) => {
			e.setColumnVisibility(t ? {} : e.initialState.columnVisibility ?? {});
		}, e.toggleAllColumnsVisible = (t) => {
			t ??= !e.getIsAllColumnsVisible(), e.setColumnVisibility(e.getAllLeafColumns().reduce((e, n) => ({
				...e,
				[n.id]: t || !(n.getCanHide != null && n.getCanHide())
			}), {}));
		}, e.getIsAllColumnsVisible = () => !e.getAllLeafColumns().some((e) => !(e.getIsVisible != null && e.getIsVisible())), e.getIsSomeColumnsVisible = () => e.getAllLeafColumns().some((e) => e.getIsVisible == null ? void 0 : e.getIsVisible()), e.getToggleAllColumnsVisibilityHandler = () => (t) => {
			e.toggleAllColumnsVisible(t.target?.checked);
		};
	}
};
function pn(e, t) {
	return t ? t === "center" ? e.getCenterVisibleLeafColumns() : t === "left" ? e.getLeftVisibleLeafColumns() : e.getRightVisibleLeafColumns() : e.getVisibleLeafColumns();
}
var mn = { createTable: (e) => {
	e._getGlobalFacetedRowModel = e.options.getFacetedRowModel && e.options.getFacetedRowModel(e, "__global__"), e.getGlobalFacetedRowModel = () => e.options.manualFiltering || !e._getGlobalFacetedRowModel ? e.getPreFilteredRowModel() : e._getGlobalFacetedRowModel(), e._getGlobalFacetedUniqueValues = e.options.getFacetedUniqueValues && e.options.getFacetedUniqueValues(e, "__global__"), e.getGlobalFacetedUniqueValues = () => e._getGlobalFacetedUniqueValues ? e._getGlobalFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getGlobalFacetedMinMaxValues = e.options.getFacetedMinMaxValues && e.options.getFacetedMinMaxValues(e, "__global__"), e.getGlobalFacetedMinMaxValues = () => {
		if (e._getGlobalFacetedMinMaxValues) return e._getGlobalFacetedMinMaxValues();
	};
} }, hn = {
	getInitialState: (e) => ({
		globalFilter: void 0,
		...e
	}),
	getDefaultOptions: (e) => ({
		onGlobalFilterChange: q("globalFilter", e),
		globalFilterFn: "auto",
		getColumnCanGlobalFilter: (t) => {
			var n;
			let r = (n = e.getCoreRowModel().flatRows[0]) == null || (n = n._getAllCellsByColumnId()[t.id]) == null ? void 0 : n.getValue();
			return typeof r == "string" || typeof r == "number";
		}
	}),
	createColumn: (e, t) => {
		e.getCanGlobalFilter = () => (e.columnDef.enableGlobalFilter ?? !0) && (t.options.enableGlobalFilter ?? !0) && (t.options.enableFilters ?? !0) && ((t.options.getColumnCanGlobalFilter == null ? void 0 : t.options.getColumnCanGlobalFilter(e)) ?? !0) && !!e.accessorFn;
	},
	createTable: (e) => {
		e.getGlobalAutoFilterFn = () => Z.includesString, e.getGlobalFilterFn = () => {
			let { globalFilterFn: t } = e.options;
			return jt(t) ? t : t === "auto" ? e.getGlobalAutoFilterFn() : e.options.filterFns?.[t] ?? Z[t];
		}, e.setGlobalFilter = (t) => {
			e.options.onGlobalFilterChange == null || e.options.onGlobalFilterChange(t);
		}, e.resetGlobalFilter = (t) => {
			e.setGlobalFilter(t ? void 0 : e.initialState.globalFilter);
		};
	}
}, gn = {
	getInitialState: (e) => ({
		expanded: {},
		...e
	}),
	getDefaultOptions: (e) => ({
		onExpandedChange: q("expanded", e),
		paginateExpandedRows: !0
	}),
	createTable: (e) => {
		let t = !1, n = !1;
		e._autoResetExpanded = () => {
			if (!t) {
				e._queue(() => {
					t = !0;
				});
				return;
			}
			if (e.options.autoResetAll ?? e.options.autoResetExpanded ?? !e.options.manualExpanding) {
				if (n) return;
				n = !0, e._queue(() => {
					e.resetExpanded(), n = !1;
				});
			}
		}, e.setExpanded = (t) => e.options.onExpandedChange == null ? void 0 : e.options.onExpandedChange(t), e.toggleAllRowsExpanded = (t) => {
			t ?? !e.getIsAllRowsExpanded() ? e.setExpanded(!0) : e.setExpanded({});
		}, e.resetExpanded = (t) => {
			e.setExpanded(t ? {} : e.initialState?.expanded ?? {});
		}, e.getCanSomeRowsExpand = () => e.getPrePaginationRowModel().flatRows.some((e) => e.getCanExpand()), e.getToggleAllRowsExpandedHandler = () => (t) => {
			t.persist == null || t.persist(), e.toggleAllRowsExpanded();
		}, e.getIsSomeRowsExpanded = () => {
			let t = e.getState().expanded;
			return t === !0 || Object.values(t).some(Boolean);
		}, e.getIsAllRowsExpanded = () => {
			let t = e.getState().expanded;
			return typeof t == "boolean" ? t === !0 : !(!Object.keys(t).length || e.getRowModel().flatRows.some((e) => !e.getIsExpanded()));
		}, e.getExpandedDepth = () => {
			let t = 0;
			return (e.getState().expanded === !0 ? Object.keys(e.getRowModel().rowsById) : Object.keys(e.getState().expanded)).forEach((e) => {
				let n = e.split(".");
				t = Math.max(t, n.length);
			}), t;
		}, e.getPreExpandedRowModel = () => e.getSortedRowModel(), e.getExpandedRowModel = () => (!e._getExpandedRowModel && e.options.getExpandedRowModel && (e._getExpandedRowModel = e.options.getExpandedRowModel(e)), e.options.manualExpanding || !e._getExpandedRowModel ? e.getPreExpandedRowModel() : e._getExpandedRowModel());
	},
	createRow: (e, t) => {
		e.toggleExpanded = (n) => {
			t.setExpanded((r) => {
				let i = r === !0 ? !0 : !!(r != null && r[e.id]), a = {};
				if (r === !0 ? Object.keys(t.getRowModel().rowsById).forEach((e) => {
					a[e] = !0;
				}) : a = r, n ??= !i, !i && n) return {
					...a,
					[e.id]: !0
				};
				if (i && !n) {
					let { [e.id]: t, ...n } = a;
					return n;
				}
				return r;
			});
		}, e.getIsExpanded = () => {
			let n = t.getState().expanded;
			return !!((t.options.getIsRowExpanded == null ? void 0 : t.options.getIsRowExpanded(e)) ?? (n === !0 || n?.[e.id]));
		}, e.getCanExpand = () => {
			var n;
			return (t.options.getRowCanExpand == null ? void 0 : t.options.getRowCanExpand(e)) ?? ((t.options.enableExpanding ?? !0) && !!((n = e.subRows) != null && n.length));
		}, e.getIsAllParentsExpanded = () => {
			let n = !0, r = e;
			for (; n && r.parentId;) r = t.getRow(r.parentId, !0), n = r.getIsExpanded();
			return n;
		}, e.getToggleExpandedHandler = () => {
			let t = e.getCanExpand();
			return () => {
				t && e.toggleExpanded();
			};
		};
	}
}, _n = 0, vn = 10, yn = () => ({
	pageIndex: _n,
	pageSize: vn
}), bn = {
	getInitialState: (e) => ({
		...e,
		pagination: {
			...yn(),
			...e?.pagination
		}
	}),
	getDefaultOptions: (e) => ({ onPaginationChange: q("pagination", e) }),
	createTable: (e) => {
		let t = !1, n = !1;
		e._autoResetPageIndex = () => {
			if (!t) {
				e._queue(() => {
					t = !0;
				});
				return;
			}
			if (e.options.autoResetAll ?? e.options.autoResetPageIndex ?? !e.options.manualPagination) {
				if (n) return;
				n = !0, e._queue(() => {
					e.resetPageIndex(), n = !1;
				});
			}
		}, e.setPagination = (t) => e.options.onPaginationChange == null ? void 0 : e.options.onPaginationChange((e) => K(t, e)), e.resetPagination = (t) => {
			e.setPagination(t ? yn() : e.initialState.pagination ?? yn());
		}, e.setPageIndex = (t) => {
			e.setPagination((n) => {
				let r = K(t, n.pageIndex), i = e.options.pageCount === void 0 || e.options.pageCount === -1 ? 2 ** 53 - 1 : e.options.pageCount - 1;
				return r = Math.max(0, Math.min(r, i)), {
					...n,
					pageIndex: r
				};
			});
		}, e.resetPageIndex = (t) => {
			var n;
			e.setPageIndex(t ? _n : ((n = e.initialState) == null || (n = n.pagination) == null ? void 0 : n.pageIndex) ?? _n);
		}, e.resetPageSize = (t) => {
			var n;
			e.setPageSize(t ? vn : ((n = e.initialState) == null || (n = n.pagination) == null ? void 0 : n.pageSize) ?? vn);
		}, e.setPageSize = (t) => {
			e.setPagination((e) => {
				let n = Math.max(1, K(t, e.pageSize)), r = e.pageSize * e.pageIndex, i = Math.floor(r / n);
				return {
					...e,
					pageIndex: i,
					pageSize: n
				};
			});
		}, e.setPageCount = (t) => e.setPagination((n) => {
			let r = K(t, e.options.pageCount ?? -1);
			return typeof r == "number" && (r = Math.max(-1, r)), {
				...n,
				pageCount: r
			};
		}), e.getPageOptions = J(() => [e.getPageCount()], (e) => {
			let t = [];
			return e && e > 0 && (t = [...Array(e)].fill(null).map((e, t) => t)), t;
		}, Y(e.options, "debugTable", "getPageOptions")), e.getCanPreviousPage = () => e.getState().pagination.pageIndex > 0, e.getCanNextPage = () => {
			let { pageIndex: t } = e.getState().pagination, n = e.getPageCount();
			return n === -1 ? !0 : n === 0 ? !1 : t < n - 1;
		}, e.previousPage = () => e.setPageIndex((e) => e - 1), e.nextPage = () => e.setPageIndex((e) => e + 1), e.firstPage = () => e.setPageIndex(0), e.lastPage = () => e.setPageIndex(e.getPageCount() - 1), e.getPrePaginationRowModel = () => e.getExpandedRowModel(), e.getPaginationRowModel = () => (!e._getPaginationRowModel && e.options.getPaginationRowModel && (e._getPaginationRowModel = e.options.getPaginationRowModel(e)), e.options.manualPagination || !e._getPaginationRowModel ? e.getPrePaginationRowModel() : e._getPaginationRowModel()), e.getPageCount = () => e.options.pageCount ?? Math.ceil(e.getRowCount() / e.getState().pagination.pageSize), e.getRowCount = () => e.options.rowCount ?? e.getPrePaginationRowModel().rows.length;
	}
}, xn = () => ({
	top: [],
	bottom: []
}), Sn = {
	getInitialState: (e) => ({
		rowPinning: xn(),
		...e
	}),
	getDefaultOptions: (e) => ({ onRowPinningChange: q("rowPinning", e) }),
	createRow: (e, t) => {
		e.pin = (n, r, i) => {
			let a = r ? e.getLeafRows().map((e) => {
				let { id: t } = e;
				return t;
			}) : [], o = i ? e.getParentRows().map((e) => {
				let { id: t } = e;
				return t;
			}) : [], s = new Set([
				...o,
				e.id,
				...a
			]);
			t.setRowPinning((e) => n === "bottom" ? {
				top: (e?.top ?? []).filter((e) => !(s != null && s.has(e))),
				bottom: [...(e?.bottom ?? []).filter((e) => !(s != null && s.has(e))), ...Array.from(s)]
			} : n === "top" ? {
				top: [...(e?.top ?? []).filter((e) => !(s != null && s.has(e))), ...Array.from(s)],
				bottom: (e?.bottom ?? []).filter((e) => !(s != null && s.has(e)))
			} : {
				top: (e?.top ?? []).filter((e) => !(s != null && s.has(e))),
				bottom: (e?.bottom ?? []).filter((e) => !(s != null && s.has(e)))
			});
		}, e.getCanPin = () => {
			let { enableRowPinning: n, enablePinning: r } = t.options;
			return typeof n == "function" ? n(e) : n ?? r ?? !0;
		}, e.getIsPinned = () => {
			let n = [e.id], { top: r, bottom: i } = t.getState().rowPinning, a = n.some((e) => r?.includes(e)), o = n.some((e) => i?.includes(e));
			return a ? "top" : o ? "bottom" : !1;
		}, e.getPinnedIndex = () => {
			let n = e.getIsPinned();
			return n ? ((n === "top" ? t.getTopRows() : t.getBottomRows())?.map((e) => {
				let { id: t } = e;
				return t;
			}))?.indexOf(e.id) ?? -1 : -1;
		};
	},
	createTable: (e) => {
		e.setRowPinning = (t) => e.options.onRowPinningChange == null ? void 0 : e.options.onRowPinningChange(t), e.resetRowPinning = (t) => e.setRowPinning(t ? xn() : e.initialState?.rowPinning ?? xn()), e.getIsSomeRowsPinned = (t) => {
			let n = e.getState().rowPinning;
			return t ? !!n[t]?.length : !!(n.top?.length || n.bottom?.length);
		}, e._getPinnedRows = (t, n, r) => (e.options.keepPinnedRows ?? !0 ? (n ?? []).map((t) => {
			let n = e.getRow(t, !0);
			return n.getIsAllParentsExpanded() ? n : null;
		}) : (n ?? []).map((e) => t.find((t) => t.id === e))).filter(Boolean).map((e) => ({
			...e,
			position: r
		})), e.getTopRows = J(() => [e.getRowModel().rows, e.getState().rowPinning.top], (t, n) => e._getPinnedRows(t, n, "top"), Y(e.options, "debugRows", "getTopRows")), e.getBottomRows = J(() => [e.getRowModel().rows, e.getState().rowPinning.bottom], (t, n) => e._getPinnedRows(t, n, "bottom"), Y(e.options, "debugRows", "getBottomRows")), e.getCenterRows = J(() => [
			e.getRowModel().rows,
			e.getState().rowPinning.top,
			e.getState().rowPinning.bottom
		], (e, t, n) => {
			let r = new Set([...t ?? [], ...n ?? []]);
			return e.filter((e) => !r.has(e.id));
		}, Y(e.options, "debugRows", "getCenterRows"));
	}
}, Cn = {
	getInitialState: (e) => ({
		rowSelection: {},
		...e
	}),
	getDefaultOptions: (e) => ({
		onRowSelectionChange: q("rowSelection", e),
		enableRowSelection: !0,
		enableMultiRowSelection: !0,
		enableSubRowSelection: !0
	}),
	createTable: (e) => {
		e.setRowSelection = (t) => e.options.onRowSelectionChange == null ? void 0 : e.options.onRowSelectionChange(t), e.resetRowSelection = (t) => e.setRowSelection(t ? {} : e.initialState.rowSelection ?? {}), e.toggleAllRowsSelected = (t) => {
			e.setRowSelection((n) => {
				t = t === void 0 ? !e.getIsAllRowsSelected() : t;
				let r = { ...n }, i = e.getPreGroupedRowModel().flatRows;
				return t ? i.forEach((e) => {
					e.getCanSelect() && (r[e.id] = !0);
				}) : i.forEach((e) => {
					delete r[e.id];
				}), r;
			});
		}, e.toggleAllPageRowsSelected = (t) => e.setRowSelection((n) => {
			let r = t === void 0 ? !e.getIsAllPageRowsSelected() : t, i = { ...n };
			return e.getRowModel().rows.forEach((t) => {
				wn(i, t.id, r, !0, e);
			}), i;
		}), e.getPreSelectedRowModel = () => e.getCoreRowModel(), e.getSelectedRowModel = J(() => [e.getState().rowSelection, e.getCoreRowModel()], (t, n) => Object.keys(t).length ? Tn(e, n) : {
			rows: [],
			flatRows: [],
			rowsById: {}
		}, Y(e.options, "debugTable", "getSelectedRowModel")), e.getFilteredSelectedRowModel = J(() => [e.getState().rowSelection, e.getFilteredRowModel()], (t, n) => Object.keys(t).length ? Tn(e, n) : {
			rows: [],
			flatRows: [],
			rowsById: {}
		}, Y(e.options, "debugTable", "getFilteredSelectedRowModel")), e.getGroupedSelectedRowModel = J(() => [e.getState().rowSelection, e.getSortedRowModel()], (t, n) => Object.keys(t).length ? Tn(e, n) : {
			rows: [],
			flatRows: [],
			rowsById: {}
		}, Y(e.options, "debugTable", "getGroupedSelectedRowModel")), e.getIsAllRowsSelected = () => {
			let t = e.getFilteredRowModel().flatRows, { rowSelection: n } = e.getState(), r = !!(t.length && Object.keys(n).length);
			return r && t.some((e) => e.getCanSelect() && !n[e.id]) && (r = !1), r;
		}, e.getIsAllPageRowsSelected = () => {
			let t = e.getPaginationRowModel().flatRows.filter((e) => e.getCanSelect()), { rowSelection: n } = e.getState(), r = !!t.length;
			return r && t.some((e) => !n[e.id]) && (r = !1), r;
		}, e.getIsSomeRowsSelected = () => {
			let t = Object.keys(e.getState().rowSelection ?? {}).length;
			return t > 0 && t < e.getFilteredRowModel().flatRows.length;
		}, e.getIsSomePageRowsSelected = () => {
			let t = e.getPaginationRowModel().flatRows;
			return e.getIsAllPageRowsSelected() ? !1 : t.filter((e) => e.getCanSelect()).some((e) => e.getIsSelected() || e.getIsSomeSelected());
		}, e.getToggleAllRowsSelectedHandler = () => (t) => {
			e.toggleAllRowsSelected(t.target.checked);
		}, e.getToggleAllPageRowsSelectedHandler = () => (t) => {
			e.toggleAllPageRowsSelected(t.target.checked);
		};
	},
	createRow: (e, t) => {
		e.toggleSelected = (n, r) => {
			let i = e.getIsSelected();
			t.setRowSelection((a) => {
				if (n = n === void 0 ? !i : n, e.getCanSelect() && i === n) return a;
				let o = { ...a };
				return wn(o, e.id, n, r?.selectChildren ?? !0, t), o;
			});
		}, e.getIsSelected = () => {
			let { rowSelection: n } = t.getState();
			return En(e, n);
		}, e.getIsSomeSelected = () => {
			let { rowSelection: n } = t.getState();
			return Dn(e, n) === "some";
		}, e.getIsAllSubRowsSelected = () => {
			let { rowSelection: n } = t.getState();
			return Dn(e, n) === "all";
		}, e.getCanSelect = () => typeof t.options.enableRowSelection == "function" ? t.options.enableRowSelection(e) : t.options.enableRowSelection ?? !0, e.getCanSelectSubRows = () => typeof t.options.enableSubRowSelection == "function" ? t.options.enableSubRowSelection(e) : t.options.enableSubRowSelection ?? !0, e.getCanMultiSelect = () => typeof t.options.enableMultiRowSelection == "function" ? t.options.enableMultiRowSelection(e) : t.options.enableMultiRowSelection ?? !0, e.getToggleSelectedHandler = () => {
			let t = e.getCanSelect();
			return (n) => {
				t && e.toggleSelected(n.target?.checked);
			};
		};
	}
}, wn = (e, t, n, r, i) => {
	var a;
	let o = i.getRow(t, !0);
	n ? (o.getCanMultiSelect() || Object.keys(e).forEach((t) => delete e[t]), o.getCanSelect() && (e[t] = !0)) : delete e[t], r && (a = o.subRows) != null && a.length && o.getCanSelectSubRows() && o.subRows.forEach((t) => wn(e, t.id, n, r, i));
};
function Tn(e, t) {
	let n = e.getState().rowSelection, r = [], i = {}, a = function(e, t) {
		return e.map((e) => {
			var t;
			let o = En(e, n);
			if (o && (r.push(e), i[e.id] = e), (t = e.subRows) != null && t.length && (e = {
				...e,
				subRows: a(e.subRows)
			}), o) return e;
		}).filter(Boolean);
	};
	return {
		rows: a(t.rows),
		flatRows: r,
		rowsById: i
	};
}
function En(e, t) {
	return t[e.id] ?? !1;
}
function Dn(e, t, n) {
	var r;
	if (!((r = e.subRows) != null && r.length)) return !1;
	let i = !0, a = !1;
	return e.subRows.forEach((e) => {
		if (!(a && !i) && (e.getCanSelect() && (En(e, t) ? a = !0 : i = !1), e.subRows && e.subRows.length)) {
			let n = Dn(e, t);
			n === "all" ? a = !0 : (n === "some" && (a = !0), i = !1);
		}
	}), i ? "all" : a ? "some" : !1;
}
var On = /([0-9]+)/gm, kn = (e, t, n) => In($(e.getValue(n)).toLowerCase(), $(t.getValue(n)).toLowerCase()), An = (e, t, n) => In($(e.getValue(n)), $(t.getValue(n))), jn = (e, t, n) => Fn($(e.getValue(n)).toLowerCase(), $(t.getValue(n)).toLowerCase()), Mn = (e, t, n) => Fn($(e.getValue(n)), $(t.getValue(n))), Nn = (e, t, n) => {
	let r = e.getValue(n), i = t.getValue(n);
	return r > i ? 1 : r < i ? -1 : 0;
}, Pn = (e, t, n) => Fn(e.getValue(n), t.getValue(n));
function Fn(e, t) {
	return e === t ? 0 : e > t ? 1 : -1;
}
function $(e) {
	return typeof e == "number" ? isNaN(e) || e === Infinity || e === -Infinity ? "" : String(e) : typeof e == "string" ? e : "";
}
function In(e, t) {
	let n = e.split(On).filter(Boolean), r = t.split(On).filter(Boolean);
	for (; n.length && r.length;) {
		let e = n.shift(), t = r.shift(), i = parseInt(e, 10), a = parseInt(t, 10), o = [i, a].sort();
		if (isNaN(o[0])) {
			if (e > t) return 1;
			if (t > e) return -1;
			continue;
		}
		if (isNaN(o[1])) return isNaN(i) ? -1 : 1;
		if (i > a) return 1;
		if (a > i) return -1;
	}
	return n.length - r.length;
}
var Ln = {
	alphanumeric: kn,
	alphanumericCaseSensitive: An,
	text: jn,
	textCaseSensitive: Mn,
	datetime: Nn,
	basic: Pn
}, Rn = [
	Lt,
	fn,
	tn,
	rn,
	Bt,
	Xt,
	mn,
	hn,
	{
		getInitialState: (e) => ({
			sorting: [],
			...e
		}),
		getDefaultColumnDef: () => ({
			sortingFn: "auto",
			sortUndefined: 1
		}),
		getDefaultOptions: (e) => ({
			onSortingChange: q("sorting", e),
			isMultiSortEvent: (e) => e.shiftKey
		}),
		createColumn: (e, t) => {
			e.getAutoSortingFn = () => {
				let n = t.getFilteredRowModel().flatRows.slice(10), r = !1;
				for (let t of n) {
					let n = t?.getValue(e.id);
					if (Object.prototype.toString.call(n) === "[object Date]") return Ln.datetime;
					if (typeof n == "string" && (r = !0, n.split(On).length > 1)) return Ln.alphanumeric;
				}
				return r ? Ln.text : Ln.basic;
			}, e.getAutoSortDir = () => typeof t.getFilteredRowModel().flatRows[0]?.getValue(e.id) == "string" ? "asc" : "desc", e.getSortingFn = () => {
				if (!e) throw Error();
				return jt(e.columnDef.sortingFn) ? e.columnDef.sortingFn : e.columnDef.sortingFn === "auto" ? e.getAutoSortingFn() : t.options.sortingFns?.[e.columnDef.sortingFn] ?? Ln[e.columnDef.sortingFn];
			}, e.toggleSorting = (n, r) => {
				let i = e.getNextSortingOrder(), a = n != null;
				t.setSorting((o) => {
					let s = o?.find((t) => t.id === e.id), c = o?.findIndex((t) => t.id === e.id), l = [], u, d = a ? n : i === "desc";
					return u = o != null && o.length && e.getCanMultiSort() && r ? s ? "toggle" : "add" : o != null && o.length && c !== o.length - 1 ? "replace" : s ? "toggle" : "replace", u === "toggle" && (a || i || (u = "remove")), u === "add" ? (l = [...o, {
						id: e.id,
						desc: d
					}], l.splice(0, l.length - (t.options.maxMultiSortColCount ?? 2 ** 53 - 1))) : l = u === "toggle" ? o.map((t) => t.id === e.id ? {
						...t,
						desc: d
					} : t) : u === "remove" ? o.filter((t) => t.id !== e.id) : [{
						id: e.id,
						desc: d
					}], l;
				});
			}, e.getFirstSortDir = () => e.columnDef.sortDescFirst ?? t.options.sortDescFirst ?? e.getAutoSortDir() === "desc" ? "desc" : "asc", e.getNextSortingOrder = (n) => {
				let r = e.getFirstSortDir(), i = e.getIsSorted();
				return i ? i !== r && (t.options.enableSortingRemoval ?? !0) && (!n || (t.options.enableMultiRemove ?? !0)) ? !1 : i === "desc" ? "asc" : "desc" : r;
			}, e.getCanSort = () => (e.columnDef.enableSorting ?? !0) && (t.options.enableSorting ?? !0) && !!e.accessorFn, e.getCanMultiSort = () => e.columnDef.enableMultiSort ?? t.options.enableMultiSort ?? !!e.accessorFn, e.getIsSorted = () => {
				let n = t.getState().sorting?.find((t) => t.id === e.id);
				return n ? n.desc ? "desc" : "asc" : !1;
			}, e.getSortIndex = () => t.getState().sorting?.findIndex((t) => t.id === e.id) ?? -1, e.clearSorting = () => {
				t.setSorting((t) => t != null && t.length ? t.filter((t) => t.id !== e.id) : []);
			}, e.getToggleSortingHandler = () => {
				let n = e.getCanSort();
				return (r) => {
					n && (r.persist == null || r.persist(), e.toggleSorting == null || e.toggleSorting(void 0, e.getCanMultiSort() ? t.options.isMultiSortEvent == null ? void 0 : t.options.isMultiSortEvent(r) : !1));
				};
			};
		},
		createTable: (e) => {
			e.setSorting = (t) => e.options.onSortingChange == null ? void 0 : e.options.onSortingChange(t), e.resetSorting = (t) => {
				e.setSorting(t ? [] : e.initialState?.sorting ?? []);
			}, e.getPreSortedRowModel = () => e.getGroupedRowModel(), e.getSortedRowModel = () => (!e._getSortedRowModel && e.options.getSortedRowModel && (e._getSortedRowModel = e.options.getSortedRowModel(e)), e.options.manualSorting || !e._getSortedRowModel ? e.getPreSortedRowModel() : e._getSortedRowModel());
		}
	},
	$t,
	gn,
	bn,
	Sn,
	Cn,
	cn
];
function zn(e) {
	process.env.NODE_ENV !== "production" && (e.debugAll || e.debugTable) && console.info("Creating Table Instance...");
	let t = [...Rn, ...e._features ?? []], n = { _features: t }, r = n._features.reduce((e, t) => Object.assign(e, t.getDefaultOptions == null ? void 0 : t.getDefaultOptions(n)), {}), i = (e) => n.options.mergeOptions ? n.options.mergeOptions(r, e) : {
		...r,
		...e
	}, a = { ...e.initialState ?? {} };
	n._features.forEach((e) => {
		a = (e.getInitialState == null ? void 0 : e.getInitialState(a)) ?? a;
	});
	let o = [], s = !1, c = {
		_features: t,
		options: {
			...r,
			...e
		},
		initialState: a,
		_queue: (e) => {
			o.push(e), s || (s = !0, Promise.resolve().then(() => {
				for (; o.length;) o.shift()();
				s = !1;
			}).catch((e) => setTimeout(() => {
				throw e;
			})));
		},
		reset: () => {
			n.setState(n.initialState);
		},
		setOptions: (e) => {
			n.options = i(K(e, n.options));
		},
		getState: () => n.options.state,
		setState: (e) => {
			n.options.onStateChange == null || n.options.onStateChange(e);
		},
		_getRowId: (e, t, r) => (n.options.getRowId == null ? void 0 : n.options.getRowId(e, t, r)) ?? `${r ? [r.id, t].join(".") : t}`,
		getCoreRowModel: () => (n._getCoreRowModel ||= n.options.getCoreRowModel(n), n._getCoreRowModel()),
		getRowModel: () => n.getPaginationRowModel(),
		getRow: (e, t) => {
			let r = (t ? n.getPrePaginationRowModel() : n.getRowModel()).rowsById[e];
			if (!r && (r = n.getCoreRowModel().rowsById[e], !r)) throw process.env.NODE_ENV === "production" ? Error() : Error(`getRow could not find row with ID: ${e}`);
			return r;
		},
		_getDefaultColumnDef: J(() => [n.options.defaultColumn], (e) => (e ??= {}, {
			header: (e) => {
				let t = e.header.column.columnDef;
				return t.accessorKey ? t.accessorKey : t.accessorFn ? t.id : null;
			},
			cell: (e) => {
				var t;
				return ((t = e.renderValue()) == null || t.toString == null ? void 0 : t.toString()) ?? null;
			},
			...n._features.reduce((e, t) => Object.assign(e, t.getDefaultColumnDef == null ? void 0 : t.getDefaultColumnDef()), {}),
			...e
		}), Y(e, "debugColumns", "_getDefaultColumnDef")),
		_getColumnDefs: () => n.options.columns,
		getAllColumns: J(() => [n._getColumnDefs()], (e) => {
			let t = function(e, r, i) {
				return i === void 0 && (i = 0), e.map((e) => {
					let a = Ft(n, e, i, r), o = e;
					return a.columns = o.columns ? t(o.columns, a, i + 1) : [], a;
				});
			};
			return t(e);
		}, Y(e, "debugColumns", "getAllColumns")),
		getAllFlatColumns: J(() => [n.getAllColumns()], (e) => e.flatMap((e) => e.getFlatColumns()), Y(e, "debugColumns", "getAllFlatColumns")),
		_getAllFlatColumnsById: J(() => [n.getAllFlatColumns()], (e) => e.reduce((e, t) => (e[t.id] = t, e), {}), Y(e, "debugColumns", "getAllFlatColumnsById")),
		getAllLeafColumns: J(() => [n.getAllColumns(), n._getOrderColumnsFn()], (e, t) => t(e.flatMap((e) => e.getLeafColumns())), Y(e, "debugColumns", "getAllLeafColumns")),
		getColumn: (e) => {
			let t = n._getAllFlatColumnsById()[e];
			return process.env.NODE_ENV !== "production" && !t && console.error(`[Table] Column with id '${e}' does not exist.`), t;
		}
	};
	Object.assign(n, c);
	for (let e = 0; e < n._features.length; e++) {
		let t = n._features[e];
		t == null || t.createTable == null || t.createTable(n);
	}
	return n;
}
function Bn() {
	return (e) => J(() => [e.options.data], (t) => {
		let n = {
			rows: [],
			flatRows: [],
			rowsById: {}
		}, r = function(t, i, a) {
			i === void 0 && (i = 0);
			let o = [];
			for (let c = 0; c < t.length; c++) {
				let l = zt(e, e._getRowId(t[c], c, a), t[c], c, i, void 0, a?.id);
				if (n.flatRows.push(l), n.rowsById[l.id] = l, o.push(l), e.options.getSubRows) {
					var s;
					l.originalSubRows = e.options.getSubRows(t[c], c), (s = l.originalSubRows) != null && s.length && (l.subRows = r(l.originalSubRows, i + 1, l));
				}
			}
			return o;
		};
		return n.rows = r(t), n;
	}, Y(e.options, "debugTable", "getRowModel", () => e._autoResetPageIndex()));
}
function Vn(e) {
	let t = [], n = (e) => {
		var r;
		t.push(e), (r = e.subRows) != null && r.length && e.getIsExpanded() && e.subRows.forEach(n);
	};
	return e.rows.forEach(n), {
		rows: t,
		flatRows: e.flatRows,
		rowsById: e.rowsById
	};
}
function Hn(e) {
	return (e) => J(() => [
		e.getState().pagination,
		e.getPrePaginationRowModel(),
		e.options.paginateExpandedRows ? void 0 : e.getState().expanded
	], (t, n) => {
		if (!n.rows.length) return n;
		let { pageSize: r, pageIndex: i } = t, { rows: a, flatRows: o, rowsById: s } = n, c = r * i, l = c + r;
		a = a.slice(c, l);
		let u;
		u = e.options.paginateExpandedRows ? {
			rows: a,
			flatRows: o,
			rowsById: s
		} : Vn({
			rows: a,
			flatRows: o,
			rowsById: s
		}), u.flatRows = [];
		let d = (e) => {
			u.flatRows.push(e), e.subRows.length && e.subRows.forEach(d);
		};
		return u.rows.forEach(d), u;
	}, Y(e.options, "debugTable", "getPaginationRowModel"));
}
function Un() {
	return (e) => J(() => [e.getState().sorting, e.getPreSortedRowModel()], (t, n) => {
		if (!n.rows.length || !(t != null && t.length)) return n;
		let r = e.getState().sorting, i = [], a = r.filter((t) => e.getColumn(t.id)?.getCanSort()), o = {};
		a.forEach((t) => {
			let n = e.getColumn(t.id);
			n && (o[t.id] = {
				sortUndefined: n.columnDef.sortUndefined,
				invertSorting: n.columnDef.invertSorting,
				sortingFn: n.getSortingFn()
			});
		});
		let s = (e) => {
			let t = e.map((e) => ({ ...e }));
			return t.sort((e, t) => {
				for (let n = 0; n < a.length; n += 1) {
					let r = a[n], i = o[r.id], s = i.sortUndefined, c = r?.desc ?? !1, l = 0;
					if (s) {
						let n = e.getValue(r.id), i = t.getValue(r.id), a = n === void 0, o = i === void 0;
						if (a || o) {
							if (s === "first") return a ? -1 : 1;
							if (s === "last") return a ? 1 : -1;
							l = a && o ? 0 : a ? s : -s;
						}
					}
					if (l === 0 && (l = i.sortingFn(e, t, r.id)), l !== 0) return c && (l *= -1), i.invertSorting && (l *= -1), l;
				}
				return e.index - t.index;
			}), t.forEach((e) => {
				var t;
				i.push(e), (t = e.subRows) != null && t.length && (e.subRows = s(e.subRows));
			}), t;
		};
		return {
			rows: s(n.rows),
			flatRows: i,
			rowsById: n.rowsById
		};
	}, Y(e.options, "debugTable", "getSortedRowModel", () => e._autoResetPageIndex()));
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@tanstack+react-table@8.21._87e93dde7311c9ac233092aa7b957df5/node_modules/@tanstack/react-table/build/lib/index.mjs
function Wn(e) {
	let t = {
		state: {},
		onStateChange: () => {},
		renderFallbackValue: null,
		...e
	}, [n] = A.useState(() => ({ current: zn(t) })), [r, i] = A.useState(() => n.current.initialState);
	return n.current.setOptions((t) => ({
		...t,
		...e,
		state: {
			...r,
			...e.state
		},
		onStateChange: (t) => {
			i(t), e.onStateChange == null || e.onStateChange(t);
		}
	})), n.current;
}
//#endregion
//#region src/components/ui/data-display/data-table/styles.ts
var Gn = "overflow-hidden rounded-[var(--sdk-radius-field)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] shadow-[var(--sdk-shadow-sm)]", Kn = "flex flex-col gap-3 border-t border-[var(--sdk-color-border-default)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between", qn = "flex min-w-0 flex-1 flex-wrap items-center gap-3 text-sm text-[var(--sdk-color-text-secondary)]", Jn = "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end", Yn = "flex items-center gap-2 text-sm text-[var(--sdk-color-text-secondary)]", Xn = "h-9 rounded-[var(--sdk-radius-field)] px-3", Zn = "group -mx-2 inline-flex w-[calc(100%+1rem)] items-center justify-between gap-2 rounded-[var(--sdk-radius-field)] px-2 py-1.5 text-left text-[inherit] outline-none transition-colors hover:bg-[var(--sdk-color-surface-panel-muted)] focus-visible:ring-2 focus-visible:ring-[var(--sdk-color-border-focus)]", Qn = "h-4 w-4 shrink-0 text-[var(--sdk-color-text-muted)]";
//#endregion
//#region src/components/ui/data-display/data-table/header-cell.tsx
function $n(e) {
	if (e !== void 0) return typeof e == "number" ? `${e}px` : e;
}
function er(e) {
	return e.sortLabel ? e.sortLabel : typeof e.header == "string" ? `Sort by ${e.header}` : `Sort by ${e.id}`;
}
function tr(e) {
	return e === "asc" ? "ascending" : e === "desc" ? "descending" : "none";
}
function nr({ sortState: e }) {
	return N(e === "asc" ? he : e === "desc" ? F : I, { className: Qn });
}
function rr({ column: e, sortColumn: t, stickyHeader: n = !1 }) {
	let r = t?.getIsSorted() ?? !1, i = !!t?.getCanSort();
	return /* @__PURE__ */ N(it, {
		...d({
			"aria-sort": i ? tr(r) : void 0,
			className: u(e.align === "center" ? "text-center" : e.align === "right" ? "text-right" : "text-left", n ? "sticky top-0 z-10 bg-[var(--sdk-color-surface-panel)]" : null),
			"data-sdk-region": "data-table-header-cell",
			"data-slot": "data-table-header-cell",
			style: { width: $n(e.width) }
		}, e.headerProps),
		children: i ? /* @__PURE__ */ P("button", {
			"aria-label": er(e),
			className: u(Zn, e.align === "center" ? "justify-center" : e.align === "right" ? "justify-end" : "justify-between"),
			"data-sdk-region": "data-table-sort-trigger",
			"data-slot": "data-table-sort-trigger",
			onClick: () => t?.toggleSorting(r === "asc"),
			type: "button",
			children: [/* @__PURE__ */ N("span", {
				className: "truncate",
				children: e.header
			}), /* @__PURE__ */ N(nr, { sortState: r })]
		}) : e.header
	});
}
//#endregion
//#region src/components/ui/data-display/data-table/pagination-controls.tsx
function ir({ currentPage: n, hasPageSizeSelector: r, onPageChange: a, onPageSizeChange: c, pageCount: l, paginationItems: u, pageSizeOptions: d, resolvedPageSize: f }) {
	return /* @__PURE__ */ P("div", {
		className: Jn,
		"data-sdk-region": "data-table-pagination-controls",
		"data-slot": "data-table-pagination-controls",
		children: [r ? /* @__PURE__ */ P("div", {
			className: Yn,
			"data-sdk-region": "data-table-page-size",
			"data-slot": "data-table-page-size",
			children: [/* @__PURE__ */ N("span", {
				className: "whitespace-nowrap",
				children: "Rows per page"
			}), /* @__PURE__ */ P(o, {
				value: String(f),
				onValueChange: c,
				children: [/* @__PURE__ */ N(t, {
					"aria-label": "Rows per page",
					className: "h-9 w-[5.5rem] bg-[var(--sdk-color-surface-panel-muted)] shadow-none",
					children: /* @__PURE__ */ N(i, {})
				}), /* @__PURE__ */ N(s, {
					className: "min-w-[5.5rem]",
					children: d.map((t) => /* @__PURE__ */ N(e, {
						value: String(t),
						children: t
					}, t))
				})]
			})]
		}) : null, /* @__PURE__ */ N(oe, {
			className: "justify-start sm:justify-end",
			children: /* @__PURE__ */ P(ae, { children: [
				/* @__PURE__ */ N(y, { children: /* @__PURE__ */ N(m, {
					"aria-label": "Previous page",
					className: Xn,
					disabled: n <= 1,
					onClick: () => a(n - 1),
					size: "sm",
					type: "button",
					variant: "outline",
					children: "Previous"
				}) }),
				u.map((e, t) => /* @__PURE__ */ N(y, { children: typeof e == "number" ? /* @__PURE__ */ N(m, {
					"aria-current": e === n ? "page" : void 0,
					"aria-label": `Page ${e}`,
					className: Xn,
					onClick: () => a(e),
					size: "sm",
					type: "button",
					variant: e === n ? "secondary" : "ghost",
					children: e
				}) : /* @__PURE__ */ N(b, {}) }, `${e}-${t}`)),
				/* @__PURE__ */ N(y, { children: /* @__PURE__ */ N(m, {
					"aria-label": "Next page",
					className: Xn,
					disabled: n >= l,
					onClick: () => a(n + 1),
					size: "sm",
					type: "button",
					variant: "outline",
					children: "Next"
				}) })
			] })
		})]
	});
}
//#endregion
//#region src/components/ui/data-display/data-table/state.ts
function ar(e, t) {
	return Math.min(Math.max(e, 1), t);
}
function or(e) {
	return Math.max(1, Math.trunc(e) || 1);
}
function sr(e, t) {
	return e?.length === 0 ? [] : Array.from(new Set([...e ?? [
		10,
		20,
		50
	], t])).map(or).sort((e, t) => e - t);
}
function cr(e, t) {
	return t <= 7 ? Array.from({ length: t }, (e, t) => t + 1) : e <= 4 ? [
		1,
		2,
		3,
		4,
		5,
		"end-ellipsis",
		t
	] : e >= t - 3 ? [
		1,
		"start-ellipsis",
		t - 4,
		t - 3,
		t - 2,
		t - 1,
		t
	] : [
		1,
		"start-ellipsis",
		e - 1,
		e,
		e + 1,
		"end-ellipsis",
		t
	];
}
function lr(e) {
	return e?.length ? e.filter((e) => e.id).map((e) => ({
		desc: !!e.desc,
		id: e.id
	})) : [];
}
function ur(e) {
	return e.map((e) => ({
		desc: !!e.desc,
		id: e.id
	}));
}
function dr(e, t) {
	return e.length === t.length ? e.every((e, n) => e.id === t[n]?.id && e.desc === t[n]?.desc) : !1;
}
//#endregion
//#region src/components/ui/data-display/data-table.tsx
var fr = {
	comfortable: "p-4",
	compact: "px-4 py-2.5"
}, pr = {
	center: "text-center",
	left: "text-left",
	right: "text-right"
};
function mr(e, t) {
	return e.id ?? t;
}
function hr(e) {
	return e.accessorFn ? e.accessorFn : e.accessorKey ? (t) => t[e.accessorKey] : (t) => t[e.id];
}
function gr(e) {
	return Object.fromEntries(Object.entries(e ?? {}).filter((e) => e[1] !== void 0));
}
function _r(e, t) {
	let n = new Set(e.map((e) => String(e))), r = [...e];
	return t.forEach((e) => {
		let t = String(e);
		n.has(t) || (n.add(t), r.push(e));
	}), r;
}
var vr = A.forwardRef(({ className: e, columnVisibility: t, columns: n, defaultSorting: r, density: i = "comfortable", description: a, emptyDescription: o, emptyState: s, emptyTitle: c = "No rows", footer: f, getRowId: p = mr, getRowProps: m, getRowSelectionLabel: h, loading: g = !1, loadingLabel: ne, onRowClick: re, onSelectedRowIdsChange: _, onSortingChange: ie, pagination: v, rowActions: y, rowActionsLabel: ae = "Actions", rows: b, selectable: oe = !1, selectedRowIds: se = [], selectionBar: x, slotProps: S, sorting: C, sortingMode: ce = "client", stickyHeader: w = !1, title: T, toolbar: le, ...E }, ue) => {
	let [D, fe] = A.useState(v?.defaultPage ?? 1), [pe, me] = A.useState(or(v?.defaultPageSize ?? 10)), [O, k] = A.useState(() => lr(r)), M = or(v?.pageSize ?? pe), F = v?.mode === "server" ? v.rowCount ?? b.length : b.length, I = v ? Math.max(1, Math.ceil(Math.max(F, 1) / M)) : 1, he = v ? v.page ?? D : 1, L = v ? ar(he, I) : 1, R = v ? sr(v.pageSizeOptions, M) : [], ge = A.useMemo(() => gr(t), [t]), _e = C === void 0 ? O : lr(C), ve = A.useMemo(() => n.some((e) => e.sortable), [n]), ye = A.useMemo(() => new Map(n.map((e) => [e.id, e])), [n]), be = A.useMemo(() => n.map((e) => ({
		accessorFn: hr(e),
		enableHiding: !0,
		enableSorting: !!e.sortable,
		id: e.id
	})), [n]);
	function z(e) {
		if (!v) return;
		let t = ar(e, I);
		v.page === void 0 && fe(t), v.onPageChange?.(t);
	}
	function xe(e) {
		let t = typeof e == "function" ? e(_e) : e;
		C === void 0 && !dr(O, t) && k(t), ie?.(ur(t)), v && L !== 1 && z(1);
	}
	function B(e) {
		if (!v) return;
		let t = or(Number(e));
		t === M && L === 1 || (v.pageSize === void 0 && me(t), v.page === void 0 && fe(1), v.onPageSizeChange?.(t), L !== 1 && v.onPageChange?.(1));
	}
	let V = Wn({
		columns: be,
		data: b,
		getCoreRowModel: Bn(),
		...v && v.mode !== "server" ? { getPaginationRowModel: Hn() } : {},
		...ve && ce !== "server" ? { getSortedRowModel: Un() } : {},
		getRowId: (e, t) => String(p(e, t)),
		manualPagination: v?.mode === "server",
		manualSorting: ce === "server",
		onSortingChange: xe,
		rowCount: F,
		state: {
			...v ? { pagination: {
				pageIndex: L - 1,
				pageSize: M
			} } : {},
			columnVisibility: ge,
			sorting: _e
		}
	}), H = V.getRowModel().rows, U = new Set(se.map((e) => String(e))), Se = b.map((e, t) => p(e, t)), W = H.map((e) => p(e.original, e.index)), Ce = Se.filter((e) => U.has(String(e))).length, we = W.length > 0 && W.every((e) => U.has(String(e))), Te = !we && W.some((e) => U.has(String(e))), Ee = H.length > 0 ? `Showing ${(L - 1) * M + 1}-${(L - 1) * M + H.length} of ${F}` : `Showing 0-0 of ${F}`;
	A.useEffect(() => {
		!v || v.page !== void 0 || D !== L && fe(L);
	}, [
		L,
		v,
		D
	]), A.useEffect(() => {
		!v || v.pageSize !== void 0 || pe !== M && me(M);
	}, [
		v,
		M,
		pe
	]);
	function G(e) {
		_?.(e);
	}
	function De(e) {
		if (e) {
			G(_r(se, W));
			return;
		}
		let t = new Set(W.map((e) => String(e)));
		G(se.filter((e) => !t.has(String(e))));
	}
	function Oe(e, t) {
		if (t) {
			G(_r(se, [e]));
			return;
		}
		G(se.filter((t) => String(t) !== String(e)));
	}
	let ke = !!v && F > 0, Ae = !!f || ke, je = ke && R.length > 1, Me = ke ? cr(L, I) : [], Ne = V.getHeaderGroups()[0];
	return /* @__PURE__ */ P("div", {
		ref: ue,
		className: u("flex flex-col gap-4", e),
		"data-sdk-ui": "data-table",
		"data-slot": "data-table",
		...E,
		children: [
			T || a || le ? /* @__PURE__ */ P("div", {
				"data-sdk-region": "data-table-header",
				...d({
					className: "flex flex-wrap items-start justify-between gap-3",
					"data-slot": "data-table-header"
				}, S?.header),
				children: [/* @__PURE__ */ P("div", {
					className: "min-w-0",
					children: [T ? /* @__PURE__ */ N("div", {
						className: "text-base font-semibold text-[var(--sdk-color-text-primary)]",
						"data-slot": "data-table-title",
						children: T
					}) : null, a ? /* @__PURE__ */ N("div", {
						className: "mt-1 text-sm text-[var(--sdk-color-text-secondary)]",
						"data-slot": "data-table-description",
						children: a
					}) : null]
				}), le ? /* @__PURE__ */ N("div", {
					"data-sdk-region": "data-table-toolbar",
					...d({ "data-slot": "data-table-toolbar" }, S?.toolbar),
					children: le
				}) : null]
			}) : null,
			Ce > 0 ? /* @__PURE__ */ N(de, {
				actions: x?.actions,
				clearLabel: x?.clearLabel,
				count: Ce,
				description: x?.description,
				meta: x?.meta,
				onClear: _ ? () => G([]) : void 0,
				sticky: x?.sticky,
				title: x?.title ?? "Selected rows",
				tone: x?.tone
			}) : null,
			/* @__PURE__ */ P("div", {
				"data-sdk-region": "data-table-surface",
				...d({
					className: Gn,
					"data-slot": "data-table-surface"
				}, S?.surface),
				children: [g ? /* @__PURE__ */ N("div", {
					className: "px-4 py-6",
					children: /* @__PURE__ */ N(ee, { label: ne })
				}) : b.length === 0 ? /* @__PURE__ */ N("div", {
					className: "px-4 py-6",
					children: s ?? /* @__PURE__ */ N(te, {
						description: o,
						title: c
					})
				}) : /* @__PURE__ */ P($e, {
					...d({}, S?.table),
					children: [/* @__PURE__ */ N(et, { children: /* @__PURE__ */ P(rt, { children: [
						oe ? /* @__PURE__ */ N(it, {
							className: "w-12",
							children: /* @__PURE__ */ N(l, {
								"aria-label": "Select all rows",
								checked: we ? !0 : Te ? "indeterminate" : !1,
								onCheckedChange: De
							})
						}) : null,
						Ne?.headers.filter((e) => !e.isPlaceholder).map((e) => {
							let t = ye.get(e.column.id);
							return t ? /* @__PURE__ */ N(rr, {
								column: t,
								sortColumn: e.column,
								stickyHeader: w
							}, e.id) : null;
						}),
						y ? /* @__PURE__ */ N(it, {
							className: u("w-1 whitespace-nowrap text-right", w ? "sticky top-0 z-10 bg-[var(--sdk-color-surface-panel)]" : null),
							children: ae
						}) : null
					] }) }), /* @__PURE__ */ N(tt, { children: H.map((e) => {
						let t = e.original, n = e.index, r = p(t, n), a = U.has(String(r)), o = h?.(t, n) ?? String(r), s = m?.(t, n);
						return /* @__PURE__ */ j(rt, {
							...d({
								className: u("hover:bg-[var(--sdk-color-brand-primary-soft)]", re ? "cursor-pointer" : null),
								"data-sdk-row-id": String(r),
								"data-state": a ? "selected" : "unselected"
							}, s),
							key: String(r),
							onClick: re ? () => re(t, n) : void 0
						}, oe ? /* @__PURE__ */ N(at, {
							className: fr[i],
							children: /* @__PURE__ */ N(l, {
								"aria-label": `Select row ${o}`,
								checked: a,
								onCheckedChange: (e) => Oe(r, e),
								onClick: (e) => e.stopPropagation()
							})
						}) : null, e.getVisibleCells().map((e) => {
							let r = ye.get(e.column.id);
							if (!r) return null;
							let a = typeof r.cellProps == "function" ? r.cellProps(t, n) : r.cellProps;
							return /* @__PURE__ */ j(at, {
								...d({ className: u(fr[i], pr[r.align ?? "left"]) }, a),
								key: e.id
							}, r.cell(t, n));
						}), y ? /* @__PURE__ */ N(at, {
							className: u(fr[i], "text-right"),
							children: /* @__PURE__ */ N("div", {
								className: "flex justify-end",
								onClick: (e) => e.stopPropagation(),
								children: y(t, n)
							})
						}) : null);
					}) })]
				}), Ae ? /* @__PURE__ */ P("div", {
					"data-sdk-region": "data-table-footer",
					...d({
						className: Kn,
						"data-slot": "data-table-footer"
					}, S?.footer),
					children: [/* @__PURE__ */ P("div", {
						className: qn,
						children: [f, ke ? /* @__PURE__ */ N("span", { children: Ee }) : null]
					}), ke ? /* @__PURE__ */ N("div", {
						"data-sdk-region": "data-table-pagination",
						...d({ "data-slot": "data-table-pagination" }, S?.pagination),
						children: /* @__PURE__ */ N(ir, {
							currentPage: L,
							hasPageSizeSelector: je,
							onPageChange: z,
							onPageSizeChange: B,
							pageCount: I,
							pageSizeOptions: R,
							paginationItems: Me,
							resolvedPageSize: M
						})
					}) : null]
				}) : null]
			})
		]
	});
});
vr.displayName = "DataTable";
//#endregion
//#region src/components/ui/data-display/description-list.tsx
var yr = {
	1: "grid-cols-1",
	2: "grid-cols-1 xl:grid-cols-2",
	3: "grid-cols-1 xl:grid-cols-3"
}, br = A.forwardRef(({ className: e, columns: t = 1, ...n }, r) => /* @__PURE__ */ N("dl", {
	ref: r,
	className: u("grid gap-3", yr[t], e),
	"data-sdk-ui": "description-list",
	"data-slot": "description-list",
	...n
}));
br.displayName = "DescriptionList";
var xr = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ N("div", {
	ref: n,
	className: u("space-y-1.5 rounded-[var(--sdk-radius-control)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel-muted)] px-3 py-3", e),
	"data-sdk-ui": "description-item",
	"data-slot": "description-item",
	...t
}));
xr.displayName = "DescriptionItem";
var Sr = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ N("dt", {
	ref: n,
	className: u("text-xs font-medium uppercase tracking-[0.12em] text-[var(--sdk-color-text-muted)]", e),
	"data-sdk-ui": "description-term",
	"data-slot": "description-term",
	...t
}));
Sr.displayName = "DescriptionTerm";
var Cr = A.forwardRef(({ className: e, mono: t = !1, ...n }, r) => /* @__PURE__ */ N("dd", {
	ref: r,
	className: u("m-0 text-sm text-[var(--sdk-color-text-primary)]", t ? "font-mono" : void 0, e),
	"data-sdk-ui": "description-details",
	"data-slot": "description-details",
	...n
}));
Cr.displayName = "DescriptionDetails";
//#endregion
//#region src/components/ui/data-display/key-value-table.tsx
var wr = A.createContext(!1), Tr = {
	default: "text-[var(--sdk-color-text-primary)]",
	success: "text-[var(--sdk-color-state-success)]",
	warning: "text-[var(--sdk-color-state-warning)]",
	danger: "text-[var(--sdk-color-state-danger)]"
}, Er = {
	default: "font-normal",
	strong: "font-semibold"
}, Dr = A.forwardRef(({ className: e, dense: t = !1, rows: n, children: r, ...i }, a) => /* @__PURE__ */ N(wr.Provider, {
	value: t,
	children: /* @__PURE__ */ N("table", {
		ref: a,
		className: u("w-full table-fixed border-collapse", e),
		"data-density": t ? "dense" : "default",
		"data-sdk-ui": "key-value-table",
		"data-slot": "key-value-table",
		...i,
		children: /* @__PURE__ */ P("tbody", { children: [n?.map((e, t) => /* @__PURE__ */ P(Or, {
			emphasis: e.emphasis,
			tone: e.tone,
			children: [/* @__PURE__ */ N(kr, { children: e.label }), /* @__PURE__ */ N(Ar, {
				emphasis: e.emphasis,
				mono: e.mono,
				tone: e.tone,
				children: e.value
			})]
		}, e.id ?? t)), r] })
	})
}));
Dr.displayName = "KeyValueTable";
var Or = A.forwardRef(({ className: e, tone: t = "default", emphasis: n = "default", ...r }, i) => /* @__PURE__ */ N("tr", {
	ref: i,
	className: u("border-b border-[var(--sdk-color-border-default)] last:border-b-0", e),
	"data-emphasis": n,
	"data-sdk-ui": "key-value-table-row",
	"data-slot": "key-value-table-row",
	"data-tone": t,
	...r
}));
Or.displayName = "KeyValueTableRow";
var kr = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ N("th", {
	ref: n,
	className: u("w-56 pr-6 text-left align-top text-xs font-medium uppercase tracking-[0.12em] text-[var(--sdk-color-text-muted)]", A.useContext(wr) ? "py-1.5" : "py-2.5", e),
	"data-sdk-ui": "key-value-table-label",
	"data-slot": "key-value-table-label",
	scope: "row",
	...t
}));
kr.displayName = "KeyValueTableLabel";
var Ar = A.forwardRef(({ className: e, mono: t = !1, tone: n = "default", emphasis: r = "default", ...i }, a) => {
	let o = A.useContext(wr);
	return /* @__PURE__ */ N("td", {
		ref: a,
		className: u("align-top text-sm break-words", Tr[n], Er[r], t ? "font-mono" : void 0, o ? "py-1.5" : "py-2.5", e),
		"data-sdk-ui": "key-value-table-value",
		"data-slot": "key-value-table-value",
		...i
	});
});
Ar.displayName = "KeyValueTableValue";
//#endregion
//#region src/components/ui/data-display/markdown-viewer.tsx
var jr = A.forwardRef(({ children: e = "No markdown content", className: t, ...n }, r) => /* @__PURE__ */ N("div", {
	ref: r,
	className: u("text-sm text-[var(--sdk-color-text-muted)]", t),
	"data-sdk-ui": "markdown-viewer-empty",
	"data-slot": "markdown-viewer-empty",
	...n,
	children: e
}));
jr.displayName = "MarkdownViewerEmpty";
function Mr(e) {
	let t = e.replace(/\r\n/g, "\n").split("\n"), n = [], r = 0;
	for (; r < t.length;) {
		let e = t[r].trim();
		if (!e) {
			r += 1;
			continue;
		}
		if (e.startsWith("```")) {
			let i = e.slice(3).trim() || null, a = [];
			for (r += 1; r < t.length && !t[r].trim().startsWith("```");) a.push(t[r]), r += 1;
			r < t.length && t[r].trim().startsWith("```") && (r += 1), n.push({
				type: "code",
				language: i,
				content: a.join("\n")
			});
			continue;
		}
		let i = /^(#{1,6})\s+(.+)$/.exec(e);
		if (i) {
			n.push({
				type: "heading",
				level: i[1].length,
				content: i[2].trim()
			}), r += 1;
			continue;
		}
		if (/^\s{0,3}([-*_])(\s*\1){2,}\s*$/.test(e)) {
			n.push({ type: "divider" }), r += 1;
			continue;
		}
		if (/^>\s?/.test(e)) {
			let e = [];
			for (; r < t.length && /^>\s?/.test(t[r].trim());) e.push(t[r].trim().replace(/^>\s?/, "")), r += 1;
			n.push({
				type: "quote",
				content: e.join(" ")
			});
			continue;
		}
		if (/^[-*+]\s+/.test(e)) {
			let e = [];
			for (; r < t.length && /^[-*+]\s+/.test(t[r].trim());) e.push(t[r].trim().replace(/^[-*+]\s+/, "")), r += 1;
			n.push({
				type: "unordered-list",
				items: e
			});
			continue;
		}
		if (/^\d+\.\s+/.test(e)) {
			let e = [];
			for (; r < t.length && /^\d+\.\s+/.test(t[r].trim());) e.push(t[r].trim().replace(/^\d+\.\s+/, "")), r += 1;
			n.push({
				type: "ordered-list",
				items: e
			});
			continue;
		}
		let a = [];
		for (; r < t.length && t[r].trim() && !t[r].trim().startsWith("```") && !/^(#{1,6})\s+/.test(t[r].trim()) && !/^[-*+]\s+/.test(t[r].trim()) && !/^\d+\.\s+/.test(t[r].trim()) && !/^>\s?/.test(t[r].trim()) && !/^\s{0,3}([-*_])(\s*\1){2,}\s*$/.test(t[r].trim());) a.push(t[r].trim()), r += 1;
		n.push({
			type: "paragraph",
			content: a.join(" ")
		});
	}
	return n;
}
function Nr(e, t) {
	return e.type === "heading" ? /* @__PURE__ */ N(`h${e.level}`, {
		className: u("font-semibold text-[var(--sdk-color-text-primary)]", {
			1: "text-2xl",
			2: "text-xl",
			3: "text-lg",
			4: "text-base",
			5: "text-sm",
			6: "text-sm"
		}[e.level], e.level >= 5 && "uppercase tracking-wide text-[var(--sdk-color-text-secondary)]"),
		children: e.content
	}, t) : e.type === "paragraph" ? /* @__PURE__ */ N("p", {
		className: "text-sm leading-6 text-[var(--sdk-color-text-secondary)]",
		children: e.content
	}, t) : e.type === "unordered-list" || e.type === "ordered-list" ? /* @__PURE__ */ N(e.type === "ordered-list" ? "ol" : "ul", {
		className: u("ml-5 space-y-1 text-sm leading-6 text-[var(--sdk-color-text-secondary)]", e.type === "ordered-list" ? "list-decimal" : "list-disc"),
		children: e.items.map((e, n) => /* @__PURE__ */ N("li", { children: e }, `${t}-item-${n}`))
	}, t) : e.type === "quote" ? /* @__PURE__ */ N("blockquote", {
		className: "border-l-2 border-[var(--sdk-color-border-default)] pl-3 text-sm italic leading-6 text-[var(--sdk-color-text-secondary)]",
		children: e.content
	}, t) : e.type === "divider" ? /* @__PURE__ */ N("hr", { className: "border-[var(--sdk-color-border-default)]" }, t) : e.type === "code" ? /* @__PURE__ */ P("div", {
		className: "overflow-hidden rounded-[var(--sdk-radius-panel)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel-muted)]",
		"data-sdk-ui": "markdown-viewer-code-block",
		"data-slot": "markdown-viewer-code-block",
		children: [e.language ? /* @__PURE__ */ N("div", {
			className: "border-b border-[var(--sdk-color-border-default)] px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-[var(--sdk-color-text-muted)]",
			children: e.language
		}) : null, /* @__PURE__ */ N("pre", {
			className: "overflow-x-auto px-3 py-2 text-xs leading-5 text-[var(--sdk-color-text-primary)]",
			children: /* @__PURE__ */ N("code", { children: e.content })
		})]
	}, t) : null;
}
var Pr = A.forwardRef(({ className: e, content: t, emptyContent: n, ...r }, i) => {
	let a = t?.trim() ?? "", o = a ? Mr(a) : [];
	return /* @__PURE__ */ N("div", {
		ref: i,
		className: u("rounded-[var(--sdk-radius-panel)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] p-4 shadow-[var(--sdk-shadow-soft)]", e),
		"data-sdk-ui": "markdown-viewer",
		"data-slot": "markdown-viewer",
		...r,
		children: o.length > 0 ? /* @__PURE__ */ N("div", {
			className: "space-y-3",
			children: o.map((e, t) => Nr(e, `markdown-block-${t}`))
		}) : /* @__PURE__ */ N(jr, { children: n })
	});
});
Pr.displayName = "MarkdownViewer";
//#endregion
//#region src/components/ui/data-display/timeline.tsx
var Fr = {
	current: "warning",
	done: "success",
	error: "danger"
}, Ir = {
	default: "border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel-muted)] text-[var(--sdk-color-text-muted)]",
	success: "border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel-muted)] text-[var(--sdk-color-state-success)]",
	warning: "border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel-muted)] text-[var(--sdk-color-state-warning)]",
	danger: "border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel-muted)] text-[var(--sdk-color-state-danger)]",
	pending: "border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel-muted)] text-[var(--sdk-color-brand-primary)]"
}, Lr = {
	default: "bg-[var(--sdk-color-text-muted)]",
	success: "bg-[var(--sdk-color-state-success)]",
	warning: "bg-[var(--sdk-color-state-warning)]",
	danger: "bg-[var(--sdk-color-state-danger)]",
	pending: "bg-[var(--sdk-color-brand-primary)]"
};
function Rr(e) {
	return Object.prototype.hasOwnProperty.call(Fr, e);
}
function zr(e) {
	return e ? Rr(e) ? Fr[e] : e : "default";
}
var Br = A.forwardRef(({ className: e, getItemProps: t, getItemSlotProps: n, items: r, ...i }, a) => /* @__PURE__ */ N("ol", {
	ref: a,
	className: u("space-y-0", e),
	"data-sdk-ui": "timeline",
	"data-slot": "timeline",
	...i,
	children: r.map((e, i) => {
		let a = zr(e.status), o = t?.(e, i), s = n?.(e, i);
		return /* @__PURE__ */ j("li", {
			...d({
				className: "grid grid-cols-[auto_minmax(0,1fr)] gap-4 pb-5 last:pb-0",
				"data-sdk-ui": "timeline-item",
				"data-slot": "timeline-item",
				"data-status": a
			}, o),
			key: e.id ?? i
		}, /* @__PURE__ */ P("div", {
			className: "flex flex-col items-center",
			children: [/* @__PURE__ */ N("span", {
				...d({
					className: u("flex h-8 w-8 shrink-0 items-center justify-center rounded-full border", Ir[a]),
					"data-sdk-region": "timeline-item-indicator",
					"data-slot": "timeline-item-indicator"
				}, s?.indicator),
				children: e.icon ? e.icon : /* @__PURE__ */ N("span", {
					"aria-hidden": "true",
					className: u("h-2.5 w-2.5 rounded-full", Lr[a])
				})
			}), i < r.length - 1 ? /* @__PURE__ */ N("span", { ...d({
				"aria-hidden": "true",
				className: "mt-2 w-px flex-1 rounded-full bg-[var(--sdk-color-border-default)]",
				"data-sdk-region": "timeline-item-connector",
				"data-slot": "timeline-item-connector"
			}, s?.connector) }) : null]
		}), /* @__PURE__ */ P("div", {
			...d({
				className: "min-w-0 rounded-[var(--sdk-radius-panel)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] px-4 py-3 shadow-[var(--sdk-shadow-soft)]",
				"data-sdk-region": "timeline-item-content",
				"data-slot": "timeline-item-content"
			}, s?.content),
			children: [
				/* @__PURE__ */ P("div", {
					className: "flex flex-wrap items-start justify-between gap-2",
					children: [/* @__PURE__ */ N("div", {
						className: "text-sm font-semibold text-[var(--sdk-color-text-primary)]",
						"data-slot": "timeline-item-title",
						children: e.title
					}), e.timestamp ? /* @__PURE__ */ N("div", {
						className: "text-xs font-medium text-[var(--sdk-color-text-muted)]",
						"data-slot": "timeline-item-timestamp",
						children: e.timestamp
					}) : null]
				}),
				e.description ? /* @__PURE__ */ N("div", {
					className: "mt-1.5 text-sm text-[var(--sdk-color-text-secondary)]",
					"data-slot": "timeline-item-description",
					children: e.description
				}) : null,
				e.content ? /* @__PURE__ */ N("div", {
					className: "mt-3",
					"data-slot": "timeline-item-body",
					children: e.content
				}) : null
			]
		}));
	})
}));
Br.displayName = "Timeline";
//#endregion
//#region src/components/ui/data-display/tree.tsx
function Vr(e) {
	return Array.from(new Set(e.filter(Boolean)));
}
function Hr(e) {
	let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
	function r(e, i) {
		e.forEach((e) => {
			n.set(e.id, i), t.set(e.id, (e.children ?? []).map((e) => e.id)), e.children?.length && r(e.children, e.id);
		});
	}
	return r(e, null), {
		childrenById: t,
		parentById: n
	};
}
function Ur(e, t, n = 1, r = null, i = []) {
	return e.forEach((e) => {
		i.push({
			depth: n,
			id: e.id,
			parentId: r
		}), e.children?.length && t.has(e.id) && Ur(e.children, t, n + 1, e.id, i);
	}), i;
}
function Wr(e, t) {
	let n = t.get(e) ?? [];
	return n.length === 0 ? [e] : n.flatMap((e) => Wr(e, t));
}
function Gr(e) {
	return typeof e.label == "string" || typeof e.label == "number" ? String(e.label) : e.id;
}
function Kr(e, t, n, r, i) {
	let a = i.get(e);
	if (a) return a;
	let o = n.get(e) ?? [];
	if (!r || o.length === 0) {
		let n = {
			checked: t.has(e),
			indeterminate: !1
		};
		return i.set(e, n), n;
	}
	let s = o.length > 0, c = !1;
	o.forEach((e) => {
		let a = Kr(e, t, n, r, i);
		(a.checked || a.indeterminate) && (c = !0), (!a.checked || a.indeterminate) && (s = !1);
	});
	let l = {
		checked: s,
		indeterminate: !s && c
	};
	return i.set(e, l), l;
}
function qr(e) {
	return /* @__PURE__ */ P("div", {
		className: "min-w-0 flex-1",
		children: [/* @__PURE__ */ P("div", {
			className: "flex min-w-0 items-center gap-2",
			children: [/* @__PURE__ */ N("span", {
				className: "truncate",
				children: e.label
			}), e.badge ? /* @__PURE__ */ N("span", {
				className: "shrink-0",
				children: e.badge
			}) : null]
		}), e.description ? /* @__PURE__ */ N("div", {
			className: "truncate text-xs text-[var(--sdk-color-text-muted)]",
			children: e.description
		}) : null]
	});
}
var Jr = A.forwardRef(({ cascadeCheck: e = !0, checkable: t = !1, checkedIds: r, className: i, defaultCheckedIds: a = [], defaultExpandedIds: o = [], defaultSelectedIds: s = [], emptyDescription: f, emptyState: m, emptyTitle: h = "No items", expandOnSelect: g = !1, expandedIds: ee, getItemProps: ne, getItemSlotProps: re, items: _, loadChildren: ie, onCheckedIdsChange: v, onExpandedIdsChange: y, onSelectedIdsChange: ae, renderActions: b, renderLabel: oe, selectedIds: x, selectionMode: S = "single", slotProps: C, ...ce }, w) => {
	let [T, le] = c({
		defaultValue: Vr(s),
		onChange: ae,
		value: x
	}), [E, ue] = c({
		defaultValue: Vr(o),
		onChange: y,
		value: ee
	}), [D, de] = c({
		defaultValue: Vr(a),
		onChange: v,
		value: r
	}), [fe, pe] = A.useState([]), [me, O] = A.useState(null), k = A.useMemo(() => new Set(E), [E]), j = A.useMemo(() => new Set(T), [T]), M = A.useMemo(() => new Set(D), [D]), F = A.useMemo(() => new Set(fe), [fe]), { childrenById: I, parentById: he } = A.useMemo(() => Hr(_), [_]), L = A.useMemo(() => Ur(_, k), [k, _]), R = A.useMemo(() => new Map(L.map((e, t) => [e.id, t])), [L]), ve = A.useMemo(() => /* @__PURE__ */ new Map(), [D, _]), ye = A.useRef(/* @__PURE__ */ new Map());
	A.useEffect(() => {
		if (L.length === 0) {
			O(null);
			return;
		}
		O((e) => e && R.has(e) ? e : T[0] ?? L[0]?.id ?? null);
	}, [
		T,
		R,
		L
	]);
	let be = A.useCallback((e, t) => {
		if (!t) {
			ye.current.delete(e);
			return;
		}
		ye.current.set(e, t);
	}, []), z = A.useCallback((e) => {
		if (!e) return;
		let t = ye.current.get(e);
		t && (t.focus(), O(e));
	}, []), xe = A.useCallback(async (e) => {
		let t = I.get(e.id) ?? [];
		if (!(!ie || e.loading || !e.hasChildren || t.length > 0 || F.has(e.id))) {
			pe((t) => t.includes(e.id) ? t : [...t, e.id]);
			try {
				await ie(e);
			} finally {
				pe((t) => t.filter((t) => t !== e.id));
			}
		}
	}, [
		I,
		ie,
		F
	]), B = A.useCallback((e, t) => {
		ue(t ? Vr([...E, e.id]) : E.filter((t) => t !== e.id)), t && xe(e);
	}, [
		E,
		ue,
		xe
	]), V = A.useCallback((e) => {
		((I.get(e.id) ?? []).length > 0 || e.hasChildren) && B(e, !k.has(e.id));
	}, [
		I,
		k,
		B
	]), H = A.useCallback((e) => {
		if (e.disabled) return;
		let t = (I.get(e.id) ?? []).length > 0 || e.hasChildren, n = j.has(e.id);
		le(Vr(S === "multiple" ? n ? T.filter((t) => t !== e.id) : [...T, e.id] : [e.id])), g && t && V(e);
	}, [
		I,
		g,
		j,
		T,
		S,
		le,
		V
	]), U = A.useCallback((t, n) => {
		if (t.disabled) return;
		let r = n === !0, i = e ? Wr(t.id, I) : [t.id], a = new Set(M);
		i.forEach((e) => {
			if (r) {
				a.add(e);
				return;
			}
			a.delete(e);
		}), de(Vr([...a]));
	}, [
		e,
		I,
		M,
		de
	]), Se = A.useCallback((e, t) => {
		let n = R.get(t.id) ?? -1, r = I.get(t.id) ?? [], i = r.length > 0 || t.hasChildren, a = k.has(t.id);
		switch (e.key) {
			case "ArrowDown": {
				e.preventDefault();
				let t = L[n + 1];
				z(t?.id ?? null);
				return;
			}
			case "ArrowUp": {
				e.preventDefault();
				let t = L[n - 1];
				z(t?.id ?? null);
				return;
			}
			case "ArrowRight":
				if (e.preventDefault(), i && !a) {
					B(t, !0);
					return;
				}
				i && a && r.length > 0 && z(r[0]);
				return;
			case "ArrowLeft":
				if (e.preventDefault(), i && a) {
					B(t, !1);
					return;
				}
				z(he.get(t.id) ?? null);
				return;
			case "Home":
				e.preventDefault(), z(L[0]?.id ?? null);
				return;
			case "End":
				e.preventDefault(), z(L[L.length - 1]?.id ?? null);
				return;
			case "Enter":
			case " ":
				e.preventDefault(), H(t);
				return;
			default: return;
		}
	}, [
		I,
		k,
		z,
		H,
		he,
		B,
		R,
		L
	]), W = A.useCallback((r, i) => /* @__PURE__ */ N("ul", {
		className: "space-y-1",
		"data-slot": i === 1 ? "rich-tree-tree" : "rich-tree-group",
		role: i === 1 ? "tree" : "group",
		children: r.map((r) => {
			let a = (I.get(r.id) ?? []).length > 0 || !!r.hasChildren, o = a ? k.has(r.id) : !1, s = Kr(r.id, M, I, e, ve), c = {
				checked: s.checked,
				depth: i,
				disabled: !!r.disabled,
				expanded: o,
				indeterminate: s.indeterminate,
				isBranch: a,
				isLeaf: !a,
				loading: !!r.loading || F.has(r.id),
				selected: j.has(r.id)
			}, f = c.loading ? /* @__PURE__ */ N(p, { className: "h-4 w-4 animate-spin" }) : N(a ? o ? ge : _e : n, { className: "h-4 w-4" }), m = b?.(r, c), h = ne?.(r, c), g = re?.(r, c);
			return /* @__PURE__ */ P("li", {
				className: "space-y-1",
				role: "none",
				children: [/* @__PURE__ */ P("div", {
					...d({
						"aria-checked": t ? c.indeterminate ? "mixed" : c.checked : void 0,
						"aria-disabled": r.disabled ? "true" : void 0,
						"aria-expanded": a ? o : void 0,
						"aria-level": i,
						"aria-selected": c.selected,
						className: u("group flex min-h-10 items-center gap-2 rounded-[var(--sdk-radius-field)] px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--sdk-color-border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sdk-color-surface-panel)]", c.selected ? "bg-[var(--sdk-color-brand-primary-soft)] text-[var(--sdk-color-text-primary)]" : "text-[var(--sdk-color-text-secondary)] hover:bg-[var(--sdk-color-surface-panel-muted)] hover:text-[var(--sdk-color-text-primary)]", c.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"),
						"data-depth": i,
						"data-expanded": c.expanded ? "true" : "false",
						"data-selected": c.selected ? "true" : "false",
						"data-slot": "rich-tree-item",
						onClick: () => H(r),
						onFocus: () => O(r.id),
						onKeyDown: (e) => Se(e, r),
						role: "treeitem",
						style: { paddingLeft: `${i * .75}rem` },
						tabIndex: me === r.id ? 0 : -1
					}, h),
					ref: (e) => be(r.id, e),
					children: [
						a ? /* @__PURE__ */ N("button", {
							...d({
								"aria-label": o ? `Collapse ${Gr(r)}` : `Expand ${Gr(r)}`,
								className: "flex h-5 w-5 shrink-0 items-center justify-center rounded-sm text-[var(--sdk-color-text-muted)] transition-colors hover:bg-[var(--sdk-color-surface-panel-muted)]",
								"data-sdk-region": "rich-tree-item-toggle",
								"data-slot": "rich-tree-item-toggle",
								onClick: (e) => {
									e.stopPropagation(), V(r);
								},
								type: "button"
							}, g?.toggle),
							children: /* @__PURE__ */ N(se, { className: u("h-4 w-4 transition-transform", o && "rotate-90") })
						}) : /* @__PURE__ */ N("span", { className: "h-5 w-5 shrink-0" }),
						t ? /* @__PURE__ */ N(l, { ...d({
							"aria-label": `Check item ${Gr(r)}`,
							checked: c.indeterminate ? "indeterminate" : c.checked,
							className: "shrink-0",
							"data-sdk-region": "rich-tree-item-checkbox",
							"data-slot": "rich-tree-item-checkbox",
							onCheckedChange: (e) => U(r, e),
							onClick: (e) => e.stopPropagation()
						}, g?.checkbox) }) : null,
						/* @__PURE__ */ N("span", {
							...d({
								className: "shrink-0 text-[var(--sdk-color-text-muted)]",
								"data-sdk-region": "rich-tree-item-icon",
								"data-slot": "rich-tree-item-icon"
							}, g?.icon),
							children: r.icon ?? f
						}),
						/* @__PURE__ */ N("div", {
							...d({
								className: "min-w-0 flex-1",
								"data-sdk-region": "rich-tree-item-content",
								"data-slot": "rich-tree-item-content"
							}, g?.content),
							children: oe ? oe(r, c) : qr(r)
						}),
						r.endContent ? /* @__PURE__ */ N("div", {
							...d({
								className: "shrink-0 text-[var(--sdk-color-text-muted)]",
								"data-sdk-region": "rich-tree-item-end-content"
							}, g?.endContent),
							children: r.endContent
						}) : null,
						m ? /* @__PURE__ */ N("div", {
							...d({
								className: "shrink-0",
								"data-sdk-region": "rich-tree-item-actions",
								onClick: (e) => e.stopPropagation()
							}, g?.actions),
							children: m
						}) : null
					]
				}), a && o && r.children?.length ? W(r.children, i + 1) : null]
			}, r.id);
		})
	}), [
		e,
		ve,
		t,
		I,
		M,
		k,
		me,
		ne,
		re,
		U,
		Se,
		H,
		F,
		be,
		b,
		oe,
		j,
		V
	]);
	return _.length === 0 ? /* @__PURE__ */ N("div", {
		ref: w,
		className: u("rounded-[var(--sdk-radius-panel)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] p-2", i),
		"data-sdk-ui": "rich-tree",
		"data-slot": "rich-tree",
		...ce,
		children: /* @__PURE__ */ N("div", {
			...d({
				"data-sdk-region": "rich-tree-empty",
				"data-slot": "rich-tree-empty"
			}, C?.empty),
			children: m ?? /* @__PURE__ */ N(te, {
				description: f,
				title: h
			})
		})
	}) : /* @__PURE__ */ N("div", {
		ref: w,
		className: u("rounded-[var(--sdk-radius-panel)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] p-2", i),
		"data-sdk-ui": "rich-tree",
		"data-slot": "rich-tree",
		...ce,
		children: /* @__PURE__ */ N("div", {
			...d({
				"aria-multiselectable": S === "multiple" ? "true" : void 0,
				"data-sdk-region": "rich-tree-tree",
				"data-slot": "rich-tree-tree"
			}, C?.tree),
			children: W(_, 1)
		})
	});
});
function Yr({ data: e, defaultSelectedId: t = null, onSelectedIdChange: n, onSelectedIdsChange: r, selectedId: i, selectedIds: a, ...o }) {
	let s = a ?? (i === void 0 ? void 0 : i ? [i] : []), c = o.defaultSelectedIds ?? (t ? [t] : []), l = A.useCallback((e) => {
		r?.(e);
		let t = e[0];
		t && n?.(t);
	}, [n, r]);
	return /* @__PURE__ */ N(Jr, {
		...o,
		"data-sdk-ui": "tree",
		"data-slot": "tree",
		defaultSelectedIds: c,
		expandOnSelect: o.expandOnSelect ?? !0,
		items: e,
		onSelectedIdsChange: l,
		selectedIds: s
	});
}
Jr.displayName = "RichTree", Yr.displayName = "Tree";
//#endregion
export { Qe as A, Ie as B, at as C, rt as D, et as E, Ye as F, Fe as H, We as I, Ue as L, Je as M, Xe as N, Ge as O, Ke as P, ze as R, ot as S, it as T, Pe as U, Ne as V, kt as _, jr as a, $e as b, Or as c, xr as d, br as f, Et as g, At as h, Pr as i, Ze as j, qe as k, Ar as l, vr as m, Yr as n, Dr as o, Sr as p, Br as r, kr as s, Jr as t, Cr as u, Dt as v, nt as w, tt as x, Ot as y, Le as z };

//# sourceMappingURL=data-display-CdBs3QSo.js.map