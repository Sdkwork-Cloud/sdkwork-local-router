import { d as e, f as t, h as n, p as r, t as i } from "./use-controllable-state-C-6H1OII.js";
import { t as a } from "./utils-Bgb-Nm-x.js";
import { n as o } from "./slot-props-Cskv9Ttd.js";
import { i as s } from "./dist-CJMju1B6.js";
import { n as c, t as l } from "./button-DW2aECbt.js";
import { t as u } from "./createLucideIcon-DYUOEYxe.js";
import { _ as d, a as f, b as p, f as m, i as h, r as g, v as _, y as v } from "./Combination-DHpOS5dI.js";
import { t as y } from "./chevron-down-COFRXzK7.js";
import { n as b, t as x } from "./inline-alert-BVD8XoaS.js";
import { n as S, t as C } from "./label-1Kh2RD8a.js";
import { t as w } from "./x-8IarCZxo.js";
import { d as T, i as E, r as D, t as ee, u as O } from "./dist-Dedo1J3L.js";
import { a as te, i as k, o as A, r as j, s as M, t as N } from "./command-D6lVPN-3.js";
import { useSdkworkShellBridge as P } from "./theme.js";
import { i as F, r as ne, t as I } from "./popover-CJHbP2uA.js";
import { n as re } from "./input-D5wmD3Oa.js";
import { t as L } from "./dist-Cqg1besQ.js";
import * as R from "react";
import z, { createContext as B, createElement as ie, useCallback as V, useContext as ae, useEffect as oe, useLayoutEffect as se, useMemo as ce, useRef as le, useState as ue } from "react";
import { jsx as H, jsxs as U } from "react/jsx-runtime";
var de = u("calendar-days", [
	["path", {
		d: "M8 2v4",
		key: "1cmpym"
	}],
	["path", {
		d: "M16 2v4",
		key: "4m81vk"
	}],
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "4",
		rx: "2",
		key: "1hopcy"
	}],
	["path", {
		d: "M3 10h18",
		key: "8toen8"
	}],
	["path", {
		d: "M8 14h.01",
		key: "6423bh"
	}],
	["path", {
		d: "M12 14h.01",
		key: "1etili"
	}],
	["path", {
		d: "M16 14h.01",
		key: "1gbofw"
	}],
	["path", {
		d: "M8 18h.01",
		key: "lrp35t"
	}],
	["path", {
		d: "M12 18h.01",
		key: "mhygvu"
	}],
	["path", {
		d: "M16 18h.01",
		key: "kzsmim"
	}]
]), fe = u("calendar-range", [
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "4",
		rx: "2",
		key: "1hopcy"
	}],
	["path", {
		d: "M16 2v4",
		key: "4m81vk"
	}],
	["path", {
		d: "M3 10h18",
		key: "8toen8"
	}],
	["path", {
		d: "M8 2v4",
		key: "1cmpym"
	}],
	["path", {
		d: "M17 14h-6",
		key: "bkmgh3"
	}],
	["path", {
		d: "M13 18H7",
		key: "bb0bb7"
	}],
	["path", {
		d: "M7 14h.01",
		key: "1qa3f1"
	}],
	["path", {
		d: "M17 18h.01",
		key: "1bdyru"
	}]
]), pe = u("chevrons-up-down", [["path", {
	d: "m7 15 5 5 5-5",
	key: "1hf1tw"
}], ["path", {
	d: "m7 9 5-5 5 5",
	key: "sgt6xg"
}]]), me = u("cloud-upload", [
	["path", {
		d: "M12 13v8",
		key: "1l5pq0"
	}],
	["path", {
		d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",
		key: "1pljnt"
	}],
	["path", {
		d: "m8 17 4-4 4 4",
		key: "1quai1"
	}]
]), he = u("download", [
	["path", {
		d: "M12 15V3",
		key: "m9g1x1"
	}],
	["path", {
		d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
		key: "ih7n3h"
	}],
	["path", {
		d: "m7 10 5 5 5-5",
		key: "brsn70"
	}]
]), ge = u("eye", [["path", {
	d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
	key: "1nclc0"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "3",
	key: "1v7zrd"
}]]), _e = u("file-archive", [
	["path", {
		d: "M13.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v11.5",
		key: "4pqfef"
	}],
	["path", {
		d: "M14 2v5a1 1 0 0 0 1 1h5",
		key: "wfsgrz"
	}],
	["path", {
		d: "M8 12v-1",
		key: "1ej8lb"
	}],
	["path", {
		d: "M8 18v-2",
		key: "qcmpov"
	}],
	["path", {
		d: "M8 7V6",
		key: "1nbb54"
	}],
	["circle", {
		cx: "8",
		cy: "20",
		r: "2",
		key: "ckkr5m"
	}]
]), ve = u("file-braces", [
	["path", {
		d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
		key: "1oefj6"
	}],
	["path", {
		d: "M14 2v5a1 1 0 0 0 1 1h5",
		key: "wfsgrz"
	}],
	["path", {
		d: "M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1",
		key: "1oajmo"
	}],
	["path", {
		d: "M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1",
		key: "mpwhp6"
	}]
]), ye = u("file-code-corner", [
	["path", {
		d: "M4 12.15V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3.35",
		key: "1wthlu"
	}],
	["path", {
		d: "M14 2v5a1 1 0 0 0 1 1h5",
		key: "wfsgrz"
	}],
	["path", {
		d: "m5 16-3 3 3 3",
		key: "331omg"
	}],
	["path", {
		d: "m9 22 3-3-3-3",
		key: "lsp7cz"
	}]
]), be = u("file-headphone", [
	["path", {
		d: "M4 6.835V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-.343",
		key: "1vfytu"
	}],
	["path", {
		d: "M14 2v5a1 1 0 0 0 1 1h5",
		key: "wfsgrz"
	}],
	["path", {
		d: "M2 19a2 2 0 0 1 4 0v1a2 2 0 0 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 0 1-4 0v-1a2 2 0 0 1 4 0",
		key: "1etmh7"
	}]
]), xe = u("file-image", [
	["path", {
		d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
		key: "1oefj6"
	}],
	["path", {
		d: "M14 2v5a1 1 0 0 0 1 1h5",
		key: "wfsgrz"
	}],
	["circle", {
		cx: "10",
		cy: "12",
		r: "2",
		key: "737tya"
	}],
	["path", {
		d: "m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22",
		key: "wt3hpn"
	}]
]), Se = u("file-play", [
	["path", {
		d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
		key: "1oefj6"
	}],
	["path", {
		d: "M14 2v5a1 1 0 0 0 1 1h5",
		key: "wfsgrz"
	}],
	["path", {
		d: "M15.033 13.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56v-4.704a.645.645 0 0 1 .967-.56z",
		key: "1tzo1f"
	}]
]), Ce = u("file-spreadsheet", [
	["path", {
		d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
		key: "1oefj6"
	}],
	["path", {
		d: "M14 2v5a1 1 0 0 0 1 1h5",
		key: "wfsgrz"
	}],
	["path", {
		d: "M8 13h2",
		key: "yr2amv"
	}],
	["path", {
		d: "M14 13h2",
		key: "un5t4a"
	}],
	["path", {
		d: "M8 17h2",
		key: "2yhykz"
	}],
	["path", {
		d: "M14 17h2",
		key: "10kma7"
	}]
]), we = u("hash", [
	["line", {
		x1: "4",
		x2: "20",
		y1: "9",
		y2: "9",
		key: "4lhtct"
	}],
	["line", {
		x1: "4",
		x2: "20",
		y1: "15",
		y2: "15",
		key: "vyu0kd"
	}],
	["line", {
		x1: "10",
		x2: "8",
		y1: "3",
		y2: "21",
		key: "1ggp8o"
	}],
	["line", {
		x1: "16",
		x2: "14",
		y1: "3",
		y2: "21",
		key: "weycgp"
	}]
]), Te = u("image-plus", [
	["path", {
		d: "M16 5h6",
		key: "1vod17"
	}],
	["path", {
		d: "M19 2v6",
		key: "4bpg5p"
	}],
	["path", {
		d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5",
		key: "1ue2ih"
	}],
	["path", {
		d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",
		key: "1xmnt7"
	}],
	["circle", {
		cx: "9",
		cy: "9",
		r: "2",
		key: "af1f0g"
	}]
]), Ee = u("music-4", [
	["path", {
		d: "M9 18V5l12-2v13",
		key: "1jmyc2"
	}],
	["path", {
		d: "m9 9 12-2",
		key: "1e64n2"
	}],
	["circle", {
		cx: "6",
		cy: "18",
		r: "3",
		key: "fqmcym"
	}],
	["circle", {
		cx: "18",
		cy: "16",
		r: "3",
		key: "1hluhg"
	}]
]), De = u("video", [["path", {
	d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
	key: "ftymec"
}], ["rect", {
	x: "2",
	y: "6",
	width: "14",
	height: "12",
	rx: "2",
	key: "158x01"
}]]);
//#endregion
//#region src/lib/core/compose-refs.ts
function Oe(e, t) {
	if (typeof e == "function") {
		e(t);
		return;
	}
	e && (e.current = t);
}
function ke(...e) {
	return (t) => {
		e.forEach((e) => Oe(e, t));
	};
}
//#endregion
//#region src/components/ui/input-group.tsx
var Ae = R.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ H("div", {
	ref: n,
	className: a("group/input-group flex w-full items-stretch overflow-hidden rounded-[var(--sdk-radius-field)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] shadow-[var(--sdk-shadow-sm)] [&>[data-slot=input]]:rounded-none [&>[data-slot=input]]:border-0 [&>[data-slot=input]]:shadow-none [&>[data-slot=input]]:focus-visible:ring-0", e),
	"data-sdk-ui": "input-group",
	"data-slot": "input-group",
	...t
})), je = R.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ H("div", {
	ref: n,
	className: a("inline-flex items-center border-r border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel-muted)] px-3 text-sm text-[var(--sdk-color-text-secondary)]", e),
	"data-sdk-ui": "input-group-addon",
	"data-slot": "input-group-addon",
	...t
}));
Ae.displayName = "InputGroup", je.displayName = "InputGroupAddon";
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-radio-group_cc2a70da647cefa06e7f90fd9b481f08/node_modules/@radix-ui/react-radio-group/dist/index.mjs
var Me = "Radio", [Ne, Pe] = O(Me), [Fe, Ie] = Ne(Me), Le = R.forwardRef((e, t) => {
	let { __scopeRadio: n, name: r, checked: i = !1, required: a, disabled: o, value: c = "on", onCheck: l, form: u, ...d } = e, [f, p] = R.useState(null), m = s(t, (e) => p(e)), h = R.useRef(!1), g = f ? u || !!f.closest("form") : !0;
	return /* @__PURE__ */ U(Fe, {
		scope: n,
		checked: i,
		disabled: o,
		children: [/* @__PURE__ */ H(E.button, {
			type: "button",
			role: "radio",
			"aria-checked": i,
			"data-state": He(i),
			"data-disabled": o ? "" : void 0,
			disabled: o,
			value: c,
			...d,
			ref: m,
			onClick: T(e.onClick, (e) => {
				i || l?.(), g && (h.current = e.isPropagationStopped(), h.current || e.stopPropagation());
			})
		}), g && /* @__PURE__ */ H(Ve, {
			control: f,
			bubbles: !h.current,
			name: r,
			value: c,
			checked: i,
			required: a,
			disabled: o,
			form: u,
			style: { transform: "translateX(-100%)" }
		})]
	});
});
Le.displayName = Me;
var Re = "RadioIndicator", ze = R.forwardRef((e, t) => {
	let { __scopeRadio: n, forceMount: r, ...i } = e, a = Ie(Re, n);
	return /* @__PURE__ */ H(ee, {
		present: r || a.checked,
		children: /* @__PURE__ */ H(E.span, {
			"data-state": He(a.checked),
			"data-disabled": a.disabled ? "" : void 0,
			...i,
			ref: t
		})
	});
});
ze.displayName = Re;
var Be = "RadioBubbleInput", Ve = R.forwardRef(({ __scopeRadio: t, control: n, checked: r, bubbles: i = !0, ...a }, o) => {
	let c = R.useRef(null), l = s(c, o), u = e(r), d = m(n);
	return R.useEffect(() => {
		let e = c.current;
		if (!e) return;
		let t = window.HTMLInputElement.prototype, n = Object.getOwnPropertyDescriptor(t, "checked").set;
		if (u !== r && n) {
			let t = new Event("click", { bubbles: i });
			n.call(e, r), e.dispatchEvent(t);
		}
	}, [
		u,
		r,
		i
	]), /* @__PURE__ */ H(E.input, {
		type: "radio",
		"aria-hidden": !0,
		defaultChecked: r,
		...a,
		tabIndex: -1,
		ref: l,
		style: {
			...a.style,
			...d,
			position: "absolute",
			pointerEvents: "none",
			opacity: 0,
			margin: 0
		}
	});
});
Ve.displayName = Be;
function He(e) {
	return e ? "checked" : "unchecked";
}
var Ue = [
	"ArrowUp",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight"
], We = "RadioGroup", [Ge, Ke] = O(We, [f, Pe]), qe = f(), Je = Pe(), [Ye, Xe] = Ge(We), Ze = R.forwardRef((e, t) => {
	let { __scopeRadioGroup: n, name: r, defaultValue: i, value: a, required: o = !1, disabled: s = !1, orientation: c, dir: l, loop: u = !0, onValueChange: d, ...f } = e, p = qe(n), m = D(l), [g, v] = _({
		prop: a,
		defaultProp: i ?? null,
		onChange: d,
		caller: We
	});
	return /* @__PURE__ */ H(Ye, {
		scope: n,
		name: r,
		required: o,
		disabled: s,
		value: g,
		onValueChange: v,
		children: /* @__PURE__ */ H(h, {
			asChild: !0,
			...p,
			orientation: c,
			dir: m,
			loop: u,
			children: /* @__PURE__ */ H(E.div, {
				role: "radiogroup",
				"aria-required": o,
				"aria-orientation": c,
				"data-disabled": s ? "" : void 0,
				dir: m,
				...f,
				ref: t
			})
		})
	});
});
Ze.displayName = We;
var Qe = "RadioGroupItem", $e = R.forwardRef((e, t) => {
	let { __scopeRadioGroup: n, disabled: r, ...i } = e, a = Xe(Qe, n), o = a.disabled || r, c = qe(n), l = Je(n), u = R.useRef(null), d = s(t, u), f = a.value === i.value, p = R.useRef(!1);
	return R.useEffect(() => {
		let e = (e) => {
			Ue.includes(e.key) && (p.current = !0);
		}, t = () => p.current = !1;
		return document.addEventListener("keydown", e), document.addEventListener("keyup", t), () => {
			document.removeEventListener("keydown", e), document.removeEventListener("keyup", t);
		};
	}, []), /* @__PURE__ */ H(g, {
		asChild: !0,
		...c,
		focusable: !o,
		active: f,
		children: /* @__PURE__ */ H(Le, {
			disabled: o,
			required: a.required,
			checked: f,
			...l,
			...i,
			name: a.name,
			ref: d,
			onCheck: () => a.onValueChange(i.value),
			onKeyDown: T((e) => {
				e.key === "Enter" && e.preventDefault();
			}),
			onFocus: T(i.onFocus, () => {
				p.current && u.current?.click();
			})
		})
	});
});
$e.displayName = Qe;
var et = "RadioGroupIndicator", tt = R.forwardRef((e, t) => {
	let { __scopeRadioGroup: n, ...r } = e;
	return /* @__PURE__ */ H(ze, {
		...Je(n),
		...r,
		ref: t
	});
});
tt.displayName = et;
var nt = Ze, rt = $e, it = tt, at = R.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ H(nt, {
	ref: n,
	className: a("grid gap-3", e),
	"data-sdk-ui": "radio-group",
	"data-slot": "radio-group",
	...t
}));
at.displayName = "RadioGroup";
var ot = R.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ H(rt, {
	ref: n,
	className: a("aspect-square h-4 w-4 rounded-full border border-[var(--sdk-color-border-strong)] bg-[var(--sdk-color-surface-panel)] text-[var(--sdk-color-brand-primary)] shadow-[var(--sdk-shadow-sm)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sdk-color-border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sdk-color-surface-canvas)] disabled:cursor-not-allowed disabled:opacity-50", e),
	"data-sdk-ui": "radio-group-item",
	"data-slot": "radio-group-item",
	...t,
	children: /* @__PURE__ */ H(it, {
		className: "flex items-center justify-center",
		"data-slot": "radio-group-indicator",
		children: /* @__PURE__ */ H(v, { className: "h-2.5 w-2.5 fill-current text-current" })
	})
}));
ot.displayName = "RadioGroupItem";
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-slider@1.3._c6a3fae91eb6750caf661d179680cb4a/node_modules/@radix-ui/react-slider/dist/index.mjs
var st = ["PageUp", "PageDown"], ct = [
	"ArrowUp",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight"
], lt = {
	"from-left": [
		"Home",
		"PageDown",
		"ArrowDown",
		"ArrowLeft"
	],
	"from-right": [
		"Home",
		"PageDown",
		"ArrowDown",
		"ArrowRight"
	],
	"from-bottom": [
		"Home",
		"PageDown",
		"ArrowDown",
		"ArrowLeft"
	],
	"from-top": [
		"Home",
		"PageDown",
		"ArrowUp",
		"ArrowLeft"
	]
}, ut = "Slider", [dt, ft, pt] = d(ut), [mt, ht] = O(ut, [pt]), [gt, _t] = mt(ut), vt = R.forwardRef((e, t) => {
	let { name: n, min: r = 0, max: i = 100, step: a = 1, orientation: o = "horizontal", disabled: s = !1, minStepsBetweenThumbs: c = 0, defaultValue: l = [r], value: u, onValueChange: d = () => {}, onValueCommit: f = () => {}, inverted: p = !1, form: m, ...h } = e, g = R.useRef(/* @__PURE__ */ new Set()), v = R.useRef(0), y = o === "horizontal" ? xt : St, [b = [], x] = _({
		prop: u,
		defaultProp: l,
		onChange: (e) => {
			[...g.current][v.current]?.focus(), d(e);
		}
	}), S = R.useRef(b);
	function C(e) {
		D(e, It(b, e));
	}
	function w(e) {
		D(e, v.current);
	}
	function E() {
		let e = S.current[v.current];
		b[v.current] !== e && f(b);
	}
	function D(e, t, { commit: n } = { commit: !1 }) {
		let o = Vt(a), s = L(Ht(Math.round((e - r) / a) * a + r, o), [r, i]);
		x((e = []) => {
			let r = Nt(e, s, t);
			if (zt(r, c * a)) {
				v.current = r.indexOf(s);
				let t = String(r) !== String(e);
				return t && n && f(r), t ? r : e;
			} else return e;
		});
	}
	return /* @__PURE__ */ H(gt, {
		scope: e.__scopeSlider,
		name: n,
		disabled: s,
		min: r,
		max: i,
		valueIndexToChangeRef: v,
		thumbs: g.current,
		values: b,
		orientation: o,
		form: m,
		children: /* @__PURE__ */ H(dt.Provider, {
			scope: e.__scopeSlider,
			children: /* @__PURE__ */ H(dt.Slot, {
				scope: e.__scopeSlider,
				children: /* @__PURE__ */ H(y, {
					"aria-disabled": s,
					"data-disabled": s ? "" : void 0,
					...h,
					ref: t,
					onPointerDown: T(h.onPointerDown, () => {
						s || (S.current = b);
					}),
					min: r,
					max: i,
					inverted: p,
					onSlideStart: s ? void 0 : C,
					onSlideMove: s ? void 0 : w,
					onSlideEnd: s ? void 0 : E,
					onHomeKeyDown: () => !s && D(r, 0, { commit: !0 }),
					onEndKeyDown: () => !s && D(i, b.length - 1, { commit: !0 }),
					onStepKeyDown: ({ event: e, direction: t }) => {
						if (!s) {
							let n = st.includes(e.key) || e.shiftKey && ct.includes(e.key) ? 10 : 1, r = v.current, i = b[r];
							D(i + a * n * t, r, { commit: !0 });
						}
					}
				})
			})
		})
	});
});
vt.displayName = ut;
var [yt, bt] = mt(ut, {
	startEdge: "left",
	endEdge: "right",
	size: "width",
	direction: 1
}), xt = R.forwardRef((e, t) => {
	let { min: n, max: r, dir: i, inverted: a, onSlideStart: o, onSlideMove: c, onSlideEnd: l, onStepKeyDown: u, ...d } = e, [f, p] = R.useState(null), m = s(t, (e) => p(e)), h = R.useRef(void 0), g = D(i), _ = g === "ltr", v = _ && !a || !_ && a;
	function y(e) {
		let t = h.current || f.getBoundingClientRect(), i = Bt([0, t.width], v ? [n, r] : [r, n]);
		return h.current = t, i(e - t.left);
	}
	return /* @__PURE__ */ H(yt, {
		scope: e.__scopeSlider,
		startEdge: v ? "left" : "right",
		endEdge: v ? "right" : "left",
		direction: v ? 1 : -1,
		size: "width",
		children: /* @__PURE__ */ H(Ct, {
			dir: g,
			"data-orientation": "horizontal",
			...d,
			ref: m,
			style: {
				...d.style,
				"--radix-slider-thumb-transform": "translateX(-50%)"
			},
			onSlideStart: (e) => {
				let t = y(e.clientX);
				o?.(t);
			},
			onSlideMove: (e) => {
				let t = y(e.clientX);
				c?.(t);
			},
			onSlideEnd: () => {
				h.current = void 0, l?.();
			},
			onStepKeyDown: (e) => {
				let t = lt[v ? "from-left" : "from-right"].includes(e.key);
				u?.({
					event: e,
					direction: t ? -1 : 1
				});
			}
		})
	});
}), St = R.forwardRef((e, t) => {
	let { min: n, max: r, inverted: i, onSlideStart: a, onSlideMove: o, onSlideEnd: c, onStepKeyDown: l, ...u } = e, d = R.useRef(null), f = s(t, d), p = R.useRef(void 0), m = !i;
	function h(e) {
		let t = p.current || d.current.getBoundingClientRect(), i = Bt([0, t.height], m ? [r, n] : [n, r]);
		return p.current = t, i(e - t.top);
	}
	return /* @__PURE__ */ H(yt, {
		scope: e.__scopeSlider,
		startEdge: m ? "bottom" : "top",
		endEdge: m ? "top" : "bottom",
		size: "height",
		direction: m ? 1 : -1,
		children: /* @__PURE__ */ H(Ct, {
			"data-orientation": "vertical",
			...u,
			ref: f,
			style: {
				...u.style,
				"--radix-slider-thumb-transform": "translateY(50%)"
			},
			onSlideStart: (e) => {
				let t = h(e.clientY);
				a?.(t);
			},
			onSlideMove: (e) => {
				let t = h(e.clientY);
				o?.(t);
			},
			onSlideEnd: () => {
				p.current = void 0, c?.();
			},
			onStepKeyDown: (e) => {
				let t = lt[m ? "from-bottom" : "from-top"].includes(e.key);
				l?.({
					event: e,
					direction: t ? -1 : 1
				});
			}
		})
	});
}), Ct = R.forwardRef((e, t) => {
	let { __scopeSlider: n, onSlideStart: r, onSlideMove: i, onSlideEnd: a, onHomeKeyDown: o, onEndKeyDown: s, onStepKeyDown: c, ...l } = e, u = _t(ut, n);
	return /* @__PURE__ */ H(E.span, {
		...l,
		ref: t,
		onKeyDown: T(e.onKeyDown, (e) => {
			e.key === "Home" ? (o(e), e.preventDefault()) : e.key === "End" ? (s(e), e.preventDefault()) : st.concat(ct).includes(e.key) && (c(e), e.preventDefault());
		}),
		onPointerDown: T(e.onPointerDown, (e) => {
			let t = e.target;
			t.setPointerCapture(e.pointerId), e.preventDefault(), u.thumbs.has(t) ? t.focus() : r(e);
		}),
		onPointerMove: T(e.onPointerMove, (e) => {
			e.target.hasPointerCapture(e.pointerId) && i(e);
		}),
		onPointerUp: T(e.onPointerUp, (e) => {
			let t = e.target;
			t.hasPointerCapture(e.pointerId) && (t.releasePointerCapture(e.pointerId), a(e));
		})
	});
}), wt = "SliderTrack", Tt = R.forwardRef((e, t) => {
	let { __scopeSlider: n, ...r } = e, i = _t(wt, n);
	return /* @__PURE__ */ H(E.span, {
		"data-disabled": i.disabled ? "" : void 0,
		"data-orientation": i.orientation,
		...r,
		ref: t
	});
});
Tt.displayName = wt;
var Et = "SliderRange", Dt = R.forwardRef((e, t) => {
	let { __scopeSlider: n, ...r } = e, i = _t(Et, n), a = bt(Et, n), o = s(t, R.useRef(null)), c = i.values.length, l = i.values.map((e) => Pt(e, i.min, i.max)), u = c > 1 ? Math.min(...l) : 0, d = 100 - Math.max(...l);
	return /* @__PURE__ */ H(E.span, {
		"data-orientation": i.orientation,
		"data-disabled": i.disabled ? "" : void 0,
		...r,
		ref: o,
		style: {
			...e.style,
			[a.startEdge]: u + "%",
			[a.endEdge]: d + "%"
		}
	});
});
Dt.displayName = Et;
var Ot = "SliderThumb", kt = R.forwardRef((e, t) => {
	let n = ft(e.__scopeSlider), [r, i] = R.useState(null), a = s(t, (e) => i(e)), o = R.useMemo(() => r ? n().findIndex((e) => e.ref.current === r) : -1, [n, r]);
	return /* @__PURE__ */ H(At, {
		...e,
		ref: a,
		index: o
	});
}), At = R.forwardRef((e, t) => {
	let { __scopeSlider: n, index: r, name: i, ...a } = e, o = _t(Ot, n), c = bt(Ot, n), [l, u] = R.useState(null), d = s(t, (e) => u(e)), f = l ? o.form || !!l.closest("form") : !0, p = m(l), h = o.values[r], g = h === void 0 ? 0 : Pt(h, o.min, o.max), _ = Ft(r, o.values.length), v = p?.[c.size], y = v ? Lt(v, g, c.direction) : 0;
	return R.useEffect(() => {
		if (l) return o.thumbs.add(l), () => {
			o.thumbs.delete(l);
		};
	}, [l, o.thumbs]), /* @__PURE__ */ U("span", {
		style: {
			transform: "var(--radix-slider-thumb-transform)",
			position: "absolute",
			[c.startEdge]: `calc(${g}% + ${y}px)`
		},
		children: [/* @__PURE__ */ H(dt.ItemSlot, {
			scope: e.__scopeSlider,
			children: /* @__PURE__ */ H(E.span, {
				role: "slider",
				"aria-label": e["aria-label"] || _,
				"aria-valuemin": o.min,
				"aria-valuenow": h,
				"aria-valuemax": o.max,
				"aria-orientation": o.orientation,
				"data-orientation": o.orientation,
				"data-disabled": o.disabled ? "" : void 0,
				tabIndex: o.disabled ? void 0 : 0,
				...a,
				ref: d,
				style: h === void 0 ? { display: "none" } : e.style,
				onFocus: T(e.onFocus, () => {
					o.valueIndexToChangeRef.current = r;
				})
			})
		}), f && /* @__PURE__ */ H(Mt, {
			name: i ?? (o.name ? o.name + (o.values.length > 1 ? "[]" : "") : void 0),
			form: o.form,
			value: h
		}, r)]
	});
});
kt.displayName = Ot;
var jt = "RadioBubbleInput", Mt = R.forwardRef(({ __scopeSlider: t, value: n, ...r }, i) => {
	let a = R.useRef(null), o = s(a, i), c = e(n);
	return R.useEffect(() => {
		let e = a.current;
		if (!e) return;
		let t = window.HTMLInputElement.prototype, r = Object.getOwnPropertyDescriptor(t, "value").set;
		if (c !== n && r) {
			let t = new Event("input", { bubbles: !0 });
			r.call(e, n), e.dispatchEvent(t);
		}
	}, [c, n]), /* @__PURE__ */ H(E.input, {
		style: { display: "none" },
		...r,
		ref: o,
		defaultValue: n
	});
});
Mt.displayName = jt;
function Nt(e = [], t, n) {
	let r = [...e];
	return r[n] = t, r.sort((e, t) => e - t);
}
function Pt(e, t, n) {
	return L(100 / (n - t) * (e - t), [0, 100]);
}
function Ft(e, t) {
	if (t > 2) return `Value ${e + 1} of ${t}`;
	if (t === 2) return ["Minimum", "Maximum"][e];
}
function It(e, t) {
	if (e.length === 1) return 0;
	let n = e.map((e) => Math.abs(e - t)), r = Math.min(...n);
	return n.indexOf(r);
}
function Lt(e, t, n) {
	let r = e / 2;
	return (r - Bt([0, 50], [0, r])(t) * n) * n;
}
function Rt(e) {
	return e.slice(0, -1).map((t, n) => e[n + 1] - t);
}
function zt(e, t) {
	if (t > 0) {
		let n = Rt(e);
		return Math.min(...n) >= t;
	}
	return !0;
}
function Bt(e, t) {
	return (n) => {
		if (e[0] === e[1] || t[0] === t[1]) return t[0];
		let r = (t[1] - t[0]) / (e[1] - e[0]);
		return t[0] + r * (n - e[0]);
	};
}
function Vt(e) {
	return (String(e).split(".")[1] || "").length;
}
function Ht(e, t) {
	let n = 10 ** t;
	return Math.round(e * n) / n;
}
var Ut = vt, Wt = Tt, Gt = Dt, Kt = kt, qt = R.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ U(Ut, {
	ref: n,
	className: a("relative flex w-full touch-none select-none items-center", e),
	"data-sdk-ui": "slider",
	"data-slot": "slider",
	...t,
	children: [/* @__PURE__ */ H(Wt, {
		className: "relative h-2 w-full grow overflow-hidden rounded-full bg-[var(--sdk-color-surface-panel-muted)]",
		"data-slot": "slider-track",
		children: /* @__PURE__ */ H(Gt, {
			className: "absolute h-full bg-[var(--sdk-color-brand-primary)]",
			"data-slot": "slider-range"
		})
	}), /* @__PURE__ */ H(Kt, {
		className: "block h-4 w-4 rounded-full border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] shadow-[var(--sdk-shadow-sm)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sdk-color-border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sdk-color-surface-canvas)] disabled:pointer-events-none disabled:opacity-50",
		"data-slot": "slider-thumb"
	})]
}));
qt.displayName = "Slider";
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-switch@1.2._e3738c514c10df2ef7e24af5ee461853/node_modules/@radix-ui/react-switch/dist/index.mjs
var Jt = "Switch", [Yt, Xt] = O(Jt), [Zt, Qt] = Yt(Jt), $t = R.forwardRef((e, t) => {
	let { __scopeSwitch: n, name: r, checked: i, defaultChecked: a, required: o, disabled: c, value: l = "on", onCheckedChange: u, form: d, ...f } = e, [p, m] = R.useState(null), h = s(t, (e) => m(e)), g = R.useRef(!1), v = p ? d || !!p.closest("form") : !0, [y, b] = _({
		prop: i,
		defaultProp: a ?? !1,
		onChange: u,
		caller: Jt
	});
	return /* @__PURE__ */ U(Zt, {
		scope: n,
		checked: y,
		disabled: c,
		children: [/* @__PURE__ */ H(E.button, {
			type: "button",
			role: "switch",
			"aria-checked": y,
			"aria-required": o,
			"data-state": an(y),
			"data-disabled": c ? "" : void 0,
			disabled: c,
			value: l,
			...f,
			ref: h,
			onClick: T(e.onClick, (e) => {
				b((e) => !e), v && (g.current = e.isPropagationStopped(), g.current || e.stopPropagation());
			})
		}), v && /* @__PURE__ */ H(rn, {
			control: p,
			bubbles: !g.current,
			name: r,
			value: l,
			checked: y,
			required: o,
			disabled: c,
			form: d,
			style: { transform: "translateX(-100%)" }
		})]
	});
});
$t.displayName = Jt;
var en = "SwitchThumb", tn = R.forwardRef((e, t) => {
	let { __scopeSwitch: n, ...r } = e, i = Qt(en, n);
	return /* @__PURE__ */ H(E.span, {
		"data-state": an(i.checked),
		"data-disabled": i.disabled ? "" : void 0,
		...r,
		ref: t
	});
});
tn.displayName = en;
var nn = "SwitchBubbleInput", rn = R.forwardRef(({ __scopeSwitch: t, control: n, checked: r, bubbles: i = !0, ...a }, o) => {
	let c = R.useRef(null), l = s(c, o), u = e(r), d = m(n);
	return R.useEffect(() => {
		let e = c.current;
		if (!e) return;
		let t = window.HTMLInputElement.prototype, n = Object.getOwnPropertyDescriptor(t, "checked").set;
		if (u !== r && n) {
			let t = new Event("click", { bubbles: i });
			n.call(e, r), e.dispatchEvent(t);
		}
	}, [
		u,
		r,
		i
	]), /* @__PURE__ */ H("input", {
		type: "checkbox",
		"aria-hidden": !0,
		defaultChecked: r,
		...a,
		tabIndex: -1,
		ref: l,
		style: {
			...a.style,
			...d,
			position: "absolute",
			pointerEvents: "none",
			opacity: 0,
			margin: 0
		}
	});
});
rn.displayName = nn;
function an(e) {
	return e ? "checked" : "unchecked";
}
var on = $t, sn = tn, cn = R.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ H(on, {
	ref: n,
	className: a("peer inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-transparent bg-[var(--sdk-color-border-strong)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sdk-color-border-focus)] data-[state=checked]:bg-[var(--sdk-color-brand-primary)] disabled:cursor-not-allowed disabled:opacity-60", e),
	"data-sdk-ui": "switch",
	"data-slot": "switch",
	...t,
	children: /* @__PURE__ */ H(sn, {
		className: "pointer-events-none block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow-lg transition-transform data-[state=checked]:translate-x-5",
		"data-slot": "switch-thumb"
	})
}));
cn.displayName = "Switch";
//#endregion
//#region src/components/ui/textarea.tsx
var ln = R.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ H("textarea", {
	ref: n,
	className: a("flex min-h-24 w-full rounded-[var(--sdk-radius-field)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] px-3 py-2 text-sm text-[var(--sdk-color-text-primary)] shadow-[var(--sdk-shadow-sm)] outline-none ring-offset-[var(--sdk-color-surface-canvas)] placeholder:text-[var(--sdk-color-text-muted)] focus-visible:ring-2 focus-visible:ring-[var(--sdk-color-border-focus)] disabled:cursor-not-allowed disabled:opacity-60", e),
	"data-sdk-ui": "textarea",
	"data-slot": "textarea",
	...t
}));
ln.displayName = "Textarea";
//#endregion
//#region src/components/ui/data-entry/combobox.tsx
var un = R.forwardRef(({ className: e, clearable: t = !1, defaultValue: n, disabled: r, emptyText: s = "No options found.", onValueChange: c, options: l, placeholder: u = "Select option", searchPlaceholder: d = "Search option...", slotProps: f, value: m, ...h }, g) => {
	let [_, v] = R.useState(!1), [y, b] = i({
		defaultValue: n ?? "",
		onChange: c,
		value: m
	}), x = l.find((e) => e.value === y);
	function S(e) {
		b(e);
	}
	function C(e) {
		e.preventDefault(), e.stopPropagation(), S(""), v(!1);
	}
	return /* @__PURE__ */ U(I, {
		modal: !0,
		open: _,
		onOpenChange: v,
		children: [/* @__PURE__ */ U("div", {
			...o({
				className: "relative",
				"data-sdk-ui": "combobox",
				"data-slot": "combobox"
			}, f?.root),
			children: [
				/* @__PURE__ */ H(F, {
					asChild: !0,
					children: /* @__PURE__ */ H("button", {
						ref: g,
						"aria-expanded": _,
						"aria-label": x?.label ?? u,
						className: a(re, t && y ? "pr-18" : "pr-10", "justify-between gap-2 text-left", e),
						"data-sdk-ui": "combobox-trigger",
						"data-slot": "combobox-trigger",
						disabled: r,
						role: "combobox",
						type: "button",
						...h,
						children: /* @__PURE__ */ H("span", {
							className: a("truncate", !x && "text-[var(--sdk-color-text-muted)]"),
							"data-slot": "combobox-value",
							children: x?.label ?? u
						})
					})
				}),
				t && y ? /* @__PURE__ */ H("button", {
					"aria-label": "Clear selection",
					...o({
						className: "absolute right-8 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-[var(--sdk-radius-control)] text-[var(--sdk-color-text-muted)] transition-colors hover:bg-[var(--sdk-color-brand-primary-soft)] hover:text-[var(--sdk-color-text-primary)]",
						"data-sdk-ui": "combobox-clear-button",
						"data-slot": "combobox-clear-button"
					}, f?.clearButton),
					disabled: r,
					onClick: (e) => {
						f?.clearButton?.onClick?.(e), e.defaultPrevented || C(e);
					},
					type: "button",
					children: /* @__PURE__ */ H(w, { className: "h-4 w-4" })
				}) : null,
				/* @__PURE__ */ H("span", {
					"aria-hidden": "true",
					className: "pointer-events-none absolute right-3 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center text-[var(--sdk-color-text-muted)]",
					"data-slot": "combobox-indicator",
					children: /* @__PURE__ */ H(pe, { className: "h-4 w-4" })
				})
			]
		}), /* @__PURE__ */ H(ne, {
			align: "start",
			...o({
				className: "w-[var(--radix-popover-trigger-width)] p-0",
				"data-sdk-ui": "combobox-content",
				"data-slot": "combobox-content",
				sideOffset: 6
			}, f?.content),
			children: /* @__PURE__ */ U(N, { children: [/* @__PURE__ */ H(te, { ...o({
				"data-sdk-ui": "combobox-input",
				"data-slot": "combobox-input",
				placeholder: d
			}, f?.input) }), /* @__PURE__ */ U(M, {
				...o({
					"data-sdk-ui": "combobox-list",
					"data-slot": "combobox-list"
				}, f?.list),
				children: [/* @__PURE__ */ H(j, {
					...o({
						"data-sdk-ui": "combobox-empty",
						"data-slot": "combobox-empty"
					}, f?.empty),
					children: s
				}), /* @__PURE__ */ H(k, {
					...o({
						"data-sdk-ui": "combobox-group",
						"data-slot": "combobox-group"
					}, f?.group),
					children: l.map((e) => /* @__PURE__ */ U(A, {
						disabled: e.disabled,
						keywords: e.keywords,
						onSelect: () => {
							S(e.value), v(!1);
						},
						value: e.value,
						children: [/* @__PURE__ */ H(p, { className: a("h-4 w-4", y === e.value ? "opacity-100" : "opacity-0") }), /* @__PURE__ */ U("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ H("div", {
								className: "truncate",
								children: e.label
							}), e.description ? /* @__PURE__ */ H("div", {
								className: "truncate text-xs text-[var(--sdk-color-text-muted)]",
								children: e.description
							}) : null]
						})]
					}, e.value))
				})]
			})] })
		})]
	});
});
un.displayName = "Combobox";
//#endregion
//#region src/components/ui/data-entry/date-input-interaction.ts
var dn = new Set(["date", "datetime-local"]);
function fn(e) {
	return !!(e && dn.has(e.type ?? "") && !e.disabled && !e.readOnly && typeof e.showPicker == "function");
}
function pn(e) {
	if (!fn(e)) return !1;
	try {
		return e.showPicker(), !0;
	} catch {
		return !1;
	}
}
function mn(e) {
	return e === "Enter" || e === " " || e === "ArrowDown";
}
//#endregion
//#region src/components/ui/data-entry/date-input.tsx
var hn = R.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ H("button", {
	className: a("absolute right-1.5 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-[var(--sdk-radius-control)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel-muted)] text-[var(--sdk-color-text-muted)] transition-colors hover:bg-[var(--sdk-color-brand-primary-soft)] hover:text-[var(--sdk-color-text-primary)]", e),
	"data-sdk-ui": "date-input-calendar-button",
	ref: n,
	type: "button",
	...t,
	children: /* @__PURE__ */ H(de, { className: "h-4 w-4" })
}));
hn.displayName = "DateInputCalendarButton";
var gn = R.forwardRef(({ calendarLabel: e, className: t, onClick: n, onKeyDown: r, onPointerDown: i, slotProps: s, type: c, ...l }, u) => {
	let d = R.useRef(null), f = R.useRef(!1);
	R.useImperativeHandle(u, () => d.current, []);
	function p(e) {
		if (d.current = e, typeof u == "function") {
			u(e);
			return;
		}
		u && (u.current = e);
	}
	function m(e) {
		i?.(e), f.current = !1, !(e.defaultPrevented || e.button !== 0) && (f.current = pn(e.currentTarget));
	}
	function h(e) {
		n?.(e), !e.defaultPrevented && !f.current && pn(e.currentTarget), f.current = !1;
	}
	function g(e) {
		r?.(e), !(e.defaultPrevented || !mn(e.key)) && pn(e.currentTarget) && e.preventDefault();
	}
	function _(e) {
		e.preventDefault();
	}
	function v() {
		let e = d.current;
		!e || e.disabled || e.readOnly || (e.focus({ preventScroll: !0 }), pn(e) || e.click());
	}
	return /* @__PURE__ */ U("div", {
		...o({
			className: "group relative",
			"data-sdk-ui": c === "datetime-local" ? "date-time-input" : "date-input",
			"data-slot": "date-input"
		}, s?.root),
		children: [/* @__PURE__ */ H("input", {
			...l,
			className: a(re, "rounded-[var(--sdk-radius-field)]", "cursor-pointer pr-14 [appearance:none] [color-scheme:light] [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-14 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 dark:[color-scheme:dark]", t),
			"data-sdk-ui": c === "datetime-local" ? "date-time-input-field" : "date-input-field",
			onClick: h,
			onKeyDown: g,
			onPointerDown: m,
			ref: p,
			type: c
		}), /* @__PURE__ */ H(hn, {
			...o({}, s?.calendarButton),
			"aria-label": e ?? (c === "datetime-local" ? "Open date and time picker" : "Open calendar"),
			onClick: (e) => {
				s?.calendarButton?.onClick?.(e), e.defaultPrevented || v();
			},
			onPointerDown: (e) => {
				s?.calendarButton?.onPointerDown?.(e), e.defaultPrevented || _(e);
			}
		})]
	});
});
gn.displayName = "TemporalInput";
var _n = R.forwardRef((e, t) => /* @__PURE__ */ H(gn, {
	...e,
	ref: t,
	type: "date"
}));
_n.displayName = "DateInput";
var vn = R.forwardRef((e, t) => /* @__PURE__ */ H(gn, {
	...e,
	ref: t,
	type: "datetime-local"
}));
vn.displayName = "DateTimeInput";
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@date-fns+tz@1.4.1/node_modules/@date-fns/tz/tzName/index.js
function yn(e, t, n = "long") {
	return new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		timeZone: e,
		timeZoneName: n
	}).format(t).split(/\s/g).slice(2).join(" ");
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@date-fns+tz@1.4.1/node_modules/@date-fns/tz/tzOffset/index.js
var bn = {}, xn = {};
function Sn(e, t) {
	try {
		let n = (bn[e] ||= new Intl.DateTimeFormat("en-US", {
			timeZone: e,
			timeZoneName: "longOffset"
		}).format)(t).split("GMT")[1];
		return n in xn ? xn[n] : wn(n, n.split(":"));
	} catch {
		if (e in xn) return xn[e];
		let t = e?.match(Cn);
		return t ? wn(e, t.slice(1)) : NaN;
	}
}
var Cn = /([+-]\d\d):?(\d\d)?/;
function wn(e, t) {
	let n = +(t[0] || 0), r = +(t[1] || 0), i = (t[2] || 0) / 60;
	return xn[e] = n * 60 + r > 0 ? n * 60 + r + i : n * 60 - r - i;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@date-fns+tz@1.4.1/node_modules/@date-fns/tz/date/mini.js
var Tn = class e extends Date {
	constructor(...e) {
		super(), e.length > 1 && typeof e[e.length - 1] == "string" && (this.timeZone = e.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(Sn(this.timeZone, this)) ? this.setTime(NaN) : e.length ? typeof e[0] == "number" && (e.length === 1 || e.length === 2 && typeof e[1] != "number") ? this.setTime(e[0]) : typeof e[0] == "string" ? this.setTime(+new Date(e[0])) : e[0] instanceof Date ? this.setTime(+e[0]) : (this.setTime(+new Date(...e)), kn(this, NaN), Dn(this)) : this.setTime(Date.now());
	}
	static tz(t, ...n) {
		return n.length ? new e(...n, t) : new e(Date.now(), t);
	}
	withTimeZone(t) {
		return new e(+this, t);
	}
	getTimezoneOffset() {
		let e = -Sn(this.timeZone, this);
		return e > 0 ? Math.floor(e) : Math.ceil(e);
	}
	setTime(e) {
		return Date.prototype.setTime.apply(this, arguments), Dn(this), +this;
	}
	[Symbol.for("constructDateFrom")](t) {
		return new e(+new Date(t), this.timeZone);
	}
}, En = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
	if (!En.test(e)) return;
	let t = e.replace(En, "$1UTC");
	Tn.prototype[t] && (e.startsWith("get") ? Tn.prototype[e] = function() {
		return this.internal[t]();
	} : (Tn.prototype[e] = function() {
		return Date.prototype[t].apply(this.internal, arguments), On(this), +this;
	}, Tn.prototype[t] = function() {
		return Date.prototype[t].apply(this, arguments), Dn(this), +this;
	}));
});
function Dn(e) {
	e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-Sn(e.timeZone, e) * 60));
}
function On(e) {
	Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), kn(e);
}
function kn(e) {
	let t = Sn(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
	r.setUTCHours(r.getUTCHours() - 1);
	let i = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), a = i - -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), o = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
	a && o && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + a);
	let s = i - n;
	s && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + s);
	let c = /* @__PURE__ */ new Date(+e);
	c.setUTCSeconds(0);
	let l = i > 0 ? c.getSeconds() : (c.getSeconds() - 60) % 60, u = Math.round(-(Sn(e.timeZone, e) * 60)) % 60;
	(u || l) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + u), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + u + l));
	let d = Sn(e.timeZone, e), f = d > 0 ? Math.floor(d) : Math.ceil(d), p = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - f, m = f !== n, h = p - s;
	if (m && h) {
		Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + h);
		let t = Sn(e.timeZone, e), n = f - (t > 0 ? Math.floor(t) : Math.ceil(t));
		n && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + n), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + n));
	}
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@date-fns+tz@1.4.1/node_modules/@date-fns/tz/date/index.js
var W = class e extends Tn {
	static tz(t, ...n) {
		return n.length ? new e(...n, t) : new e(Date.now(), t);
	}
	toISOString() {
		let [e, t, n] = this.tzComponents(), r = `${e}${t}:${n}`;
		return this.internal.toISOString().slice(0, -1) + r;
	}
	toString() {
		return `${this.toDateString()} ${this.toTimeString()}`;
	}
	toDateString() {
		let [e, t, n, r] = this.internal.toUTCString().split(" ");
		return `${e?.slice(0, -1)} ${n} ${t} ${r}`;
	}
	toTimeString() {
		let e = this.internal.toUTCString().split(" ")[4], [t, n, r] = this.tzComponents();
		return `${e} GMT${t}${n}${r} (${yn(this.timeZone, this)})`;
	}
	toLocaleString(e, t) {
		return Date.prototype.toLocaleString.call(this, e, {
			...t,
			timeZone: t?.timeZone || this.timeZone
		});
	}
	toLocaleDateString(e, t) {
		return Date.prototype.toLocaleDateString.call(this, e, {
			...t,
			timeZone: t?.timeZone || this.timeZone
		});
	}
	toLocaleTimeString(e, t) {
		return Date.prototype.toLocaleTimeString.call(this, e, {
			...t,
			timeZone: t?.timeZone || this.timeZone
		});
	}
	tzComponents() {
		let e = this.getTimezoneOffset();
		return [
			e > 0 ? "-" : "+",
			String(Math.floor(Math.abs(e) / 60)).padStart(2, "0"),
			String(Math.abs(e) % 60).padStart(2, "0")
		];
	}
	withTimeZone(t) {
		return new e(+this, t);
	}
	[Symbol.for("constructDateFrom")](t) {
		return new e(+new Date(t), this.timeZone);
	}
}, An = 365.2425, jn = 6048e5, Mn = 864e5, Nn = 3600 * 24;
Nn * 7, Nn * An / 12 * 3;
var Pn = Symbol.for("constructDateFrom");
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/constructFrom.js
function G(e, t) {
	return typeof e == "function" ? e(t) : e && typeof e == "object" && Pn in e ? e[Pn](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/toDate.js
function K(e, t) {
	return G(t || e, e);
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addDays.js
function Fn(e, t, n) {
	let r = K(e, n?.in);
	return isNaN(t) ? G(n?.in || e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addMonths.js
function In(e, t, n) {
	let r = K(e, n?.in);
	if (isNaN(t)) return G(n?.in || e, NaN);
	if (!t) return r;
	let i = r.getDate(), a = G(n?.in || e, r.getTime());
	return a.setMonth(r.getMonth() + t + 1, 0), i >= a.getDate() ? a : (r.setFullYear(a.getFullYear(), a.getMonth(), i), r);
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/defaultOptions.js
var Ln = {};
function Rn() {
	return Ln;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfWeek.js
function zn(e, t) {
	let n = Rn(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, i = K(e, t?.in), a = i.getDay(), o = (a < r ? 7 : 0) + a - r;
	return i.setDate(i.getDate() - o), i.setHours(0, 0, 0, 0), i;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfISOWeek.js
function Bn(e, t) {
	return zn(e, {
		...t,
		weekStartsOn: 1
	});
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getISOWeekYear.js
function Vn(e, t) {
	let n = K(e, t?.in), r = n.getFullYear(), i = G(n, 0);
	i.setFullYear(r + 1, 0, 4), i.setHours(0, 0, 0, 0);
	let a = Bn(i), o = G(n, 0);
	o.setFullYear(r, 0, 4), o.setHours(0, 0, 0, 0);
	let s = Bn(o);
	return n.getTime() >= a.getTime() ? r + 1 : n.getTime() >= s.getTime() ? r : r - 1;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js
function Hn(e) {
	let t = K(e), n = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()));
	return n.setUTCFullYear(t.getFullYear()), e - +n;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/normalizeDates.js
function Un(e, ...t) {
	let n = G.bind(null, e || t.find((e) => typeof e == "object"));
	return t.map(n);
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfDay.js
function Wn(e, t) {
	let n = K(e, t?.in);
	return n.setHours(0, 0, 0, 0), n;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/differenceInCalendarDays.js
function Gn(e, t, n) {
	let [r, i] = Un(n?.in, e, t), a = Wn(r), o = Wn(i), s = +a - Hn(a), c = +o - Hn(o);
	return Math.round((s - c) / Mn);
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfISOWeekYear.js
function Kn(e, t) {
	let n = Vn(e, t), r = G(t?.in || e, 0);
	return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), Bn(r);
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addWeeks.js
function qn(e, t, n) {
	return Fn(e, t * 7, n);
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addYears.js
function Jn(e, t, n) {
	return In(e, t * 12, n);
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/max.js
function Yn(e, t) {
	let n, r = t?.in;
	return e.forEach((e) => {
		!r && typeof e == "object" && (r = G.bind(null, e));
		let t = K(e, r);
		(!n || n < t || isNaN(+t)) && (n = t);
	}), G(r, n || NaN);
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/min.js
function Xn(e, t) {
	let n, r = t?.in;
	return e.forEach((e) => {
		!r && typeof e == "object" && (r = G.bind(null, e));
		let t = K(e, r);
		(!n || n > t || isNaN(+t)) && (n = t);
	}), G(r, n || NaN);
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isSameDay.js
function Zn(e, t, n) {
	let [r, i] = Un(n?.in, e, t);
	return +Wn(r) == +Wn(i);
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isDate.js
function Qn(e) {
	return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isValid.js
function $n(e) {
	return !(!Qn(e) && typeof e != "number" || isNaN(+K(e)));
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/differenceInCalendarMonths.js
function er(e, t, n) {
	let [r, i] = Un(n?.in, e, t), a = r.getFullYear() - i.getFullYear(), o = r.getMonth() - i.getMonth();
	return a * 12 + o;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/endOfMonth.js
function tr(e, t) {
	let n = K(e, t?.in), r = n.getMonth();
	return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/normalizeInterval.js
function nr(e, t) {
	let [n, r] = Un(e, t.start, t.end);
	return {
		start: n,
		end: r
	};
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/eachMonthOfInterval.js
function rr(e, t) {
	let { start: n, end: r } = nr(t?.in, e), i = +n > +r, a = i ? +n : +r, o = i ? r : n;
	o.setHours(0, 0, 0, 0), o.setDate(1);
	let s = t?.step ?? 1;
	if (!s) return [];
	s < 0 && (s = -s, i = !i);
	let c = [];
	for (; +o <= a;) c.push(G(n, o)), o.setMonth(o.getMonth() + s);
	return i ? c.reverse() : c;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfMonth.js
function ir(e, t) {
	let n = K(e, t?.in);
	return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/endOfYear.js
function ar(e, t) {
	let n = K(e, t?.in), r = n.getFullYear();
	return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfYear.js
function or(e, t) {
	let n = K(e, t?.in);
	return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/eachYearOfInterval.js
function sr(e, t) {
	let { start: n, end: r } = nr(t?.in, e), i = +n > +r, a = i ? +n : +r, o = i ? r : n;
	o.setHours(0, 0, 0, 0), o.setMonth(0, 1);
	let s = t?.step ?? 1;
	if (!s) return [];
	s < 0 && (s = -s, i = !i);
	let c = [];
	for (; +o <= a;) c.push(G(n, o)), o.setFullYear(o.getFullYear() + s);
	return i ? c.reverse() : c;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/endOfWeek.js
function cr(e, t) {
	let n = Rn(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, i = K(e, t?.in), a = i.getDay(), o = (a < r ? -7 : 0) + 6 - (a - r);
	return i.setDate(i.getDate() + o), i.setHours(23, 59, 59, 999), i;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/endOfISOWeek.js
function lr(e, t) {
	return cr(e, {
		...t,
		weekStartsOn: 1
	});
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/en-US/_lib/formatDistance.js
var ur = {
	lessThanXSeconds: {
		one: "less than a second",
		other: "less than {{count}} seconds"
	},
	xSeconds: {
		one: "1 second",
		other: "{{count}} seconds"
	},
	halfAMinute: "half a minute",
	lessThanXMinutes: {
		one: "less than a minute",
		other: "less than {{count}} minutes"
	},
	xMinutes: {
		one: "1 minute",
		other: "{{count}} minutes"
	},
	aboutXHours: {
		one: "about 1 hour",
		other: "about {{count}} hours"
	},
	xHours: {
		one: "1 hour",
		other: "{{count}} hours"
	},
	xDays: {
		one: "1 day",
		other: "{{count}} days"
	},
	aboutXWeeks: {
		one: "about 1 week",
		other: "about {{count}} weeks"
	},
	xWeeks: {
		one: "1 week",
		other: "{{count}} weeks"
	},
	aboutXMonths: {
		one: "about 1 month",
		other: "about {{count}} months"
	},
	xMonths: {
		one: "1 month",
		other: "{{count}} months"
	},
	aboutXYears: {
		one: "about 1 year",
		other: "about {{count}} years"
	},
	xYears: {
		one: "1 year",
		other: "{{count}} years"
	},
	overXYears: {
		one: "over 1 year",
		other: "over {{count}} years"
	},
	almostXYears: {
		one: "almost 1 year",
		other: "almost {{count}} years"
	}
}, dr = (e, t, n) => {
	let r, i = ur[e];
	return r = typeof i == "string" ? i : t === 1 ? i.one : i.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildFormatLongFn.js
function fr(e) {
	return (t = {}) => {
		let n = t.width ? String(t.width) : e.defaultWidth;
		return e.formats[n] || e.formats[e.defaultWidth];
	};
}
var pr = {
	date: fr({
		formats: {
			full: "EEEE, MMMM do, y",
			long: "MMMM do, y",
			medium: "MMM d, y",
			short: "MM/dd/yyyy"
		},
		defaultWidth: "full"
	}),
	time: fr({
		formats: {
			full: "h:mm:ss a zzzz",
			long: "h:mm:ss a z",
			medium: "h:mm:ss a",
			short: "h:mm a"
		},
		defaultWidth: "full"
	}),
	dateTime: fr({
		formats: {
			full: "{{date}} 'at' {{time}}",
			long: "{{date}} 'at' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, mr = {
	lastWeek: "'last' eeee 'at' p",
	yesterday: "'yesterday at' p",
	today: "'today at' p",
	tomorrow: "'tomorrow at' p",
	nextWeek: "eeee 'at' p",
	other: "P"
}, hr = (e, t, n, r) => mr[e];
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildLocalizeFn.js
function gr(e) {
	return (t, n) => {
		let r = n?.context ? String(n.context) : "standalone", i;
		if (r === "formatting" && e.formattingValues) {
			let t = e.defaultFormattingWidth || e.defaultWidth, r = n?.width ? String(n.width) : t;
			i = e.formattingValues[r] || e.formattingValues[t];
		} else {
			let t = e.defaultWidth, r = n?.width ? String(n.width) : e.defaultWidth;
			i = e.values[r] || e.values[t];
		}
		let a = e.argumentCallback ? e.argumentCallback(t) : t;
		return i[a];
	};
}
var _r = {
	ordinalNumber: (e, t) => {
		let n = Number(e), r = n % 100;
		if (r > 20 || r < 10) switch (r % 10) {
			case 1: return n + "st";
			case 2: return n + "nd";
			case 3: return n + "rd";
		}
		return n + "th";
	},
	era: gr({
		values: {
			narrow: ["B", "A"],
			abbreviated: ["BC", "AD"],
			wide: ["Before Christ", "Anno Domini"]
		},
		defaultWidth: "wide"
	}),
	quarter: gr({
		values: {
			narrow: [
				"1",
				"2",
				"3",
				"4"
			],
			abbreviated: [
				"Q1",
				"Q2",
				"Q3",
				"Q4"
			],
			wide: [
				"1st quarter",
				"2nd quarter",
				"3rd quarter",
				"4th quarter"
			]
		},
		defaultWidth: "wide",
		argumentCallback: (e) => e - 1
	}),
	month: gr({
		values: {
			narrow: [
				"J",
				"F",
				"M",
				"A",
				"M",
				"J",
				"J",
				"A",
				"S",
				"O",
				"N",
				"D"
			],
			abbreviated: [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
				"Nov",
				"Dec"
			],
			wide: [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December"
			]
		},
		defaultWidth: "wide"
	}),
	day: gr({
		values: {
			narrow: [
				"S",
				"M",
				"T",
				"W",
				"T",
				"F",
				"S"
			],
			short: [
				"Su",
				"Mo",
				"Tu",
				"We",
				"Th",
				"Fr",
				"Sa"
			],
			abbreviated: [
				"Sun",
				"Mon",
				"Tue",
				"Wed",
				"Thu",
				"Fri",
				"Sat"
			],
			wide: [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday"
			]
		},
		defaultWidth: "wide"
	}),
	dayPeriod: gr({
		values: {
			narrow: {
				am: "a",
				pm: "p",
				midnight: "mi",
				noon: "n",
				morning: "morning",
				afternoon: "afternoon",
				evening: "evening",
				night: "night"
			},
			abbreviated: {
				am: "AM",
				pm: "PM",
				midnight: "midnight",
				noon: "noon",
				morning: "morning",
				afternoon: "afternoon",
				evening: "evening",
				night: "night"
			},
			wide: {
				am: "a.m.",
				pm: "p.m.",
				midnight: "midnight",
				noon: "noon",
				morning: "morning",
				afternoon: "afternoon",
				evening: "evening",
				night: "night"
			}
		},
		defaultWidth: "wide",
		formattingValues: {
			narrow: {
				am: "a",
				pm: "p",
				midnight: "mi",
				noon: "n",
				morning: "in the morning",
				afternoon: "in the afternoon",
				evening: "in the evening",
				night: "at night"
			},
			abbreviated: {
				am: "AM",
				pm: "PM",
				midnight: "midnight",
				noon: "noon",
				morning: "in the morning",
				afternoon: "in the afternoon",
				evening: "in the evening",
				night: "at night"
			},
			wide: {
				am: "a.m.",
				pm: "p.m.",
				midnight: "midnight",
				noon: "noon",
				morning: "in the morning",
				afternoon: "in the afternoon",
				evening: "in the evening",
				night: "at night"
			}
		},
		defaultFormattingWidth: "wide"
	})
};
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildMatchFn.js
function vr(e) {
	return (t, n = {}) => {
		let r = n.width, i = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], a = t.match(i);
		if (!a) return null;
		let o = a[0], s = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(s) ? br(s, (e) => e.test(o)) : yr(s, (e) => e.test(o)), l;
		l = e.valueCallback ? e.valueCallback(c) : c, l = n.valueCallback ? n.valueCallback(l) : l;
		let u = t.slice(o.length);
		return {
			value: l,
			rest: u
		};
	};
}
function yr(e, t) {
	for (let n in e) if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n])) return n;
}
function br(e, t) {
	for (let n = 0; n < e.length; n++) if (t(e[n])) return n;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildMatchPatternFn.js
function xr(e) {
	return (t, n = {}) => {
		let r = t.match(e.matchPattern);
		if (!r) return null;
		let i = r[0], a = t.match(e.parsePattern);
		if (!a) return null;
		let o = e.valueCallback ? e.valueCallback(a[0]) : a[0];
		o = n.valueCallback ? n.valueCallback(o) : o;
		let s = t.slice(i.length);
		return {
			value: o,
			rest: s
		};
	};
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/en-US.js
var Sr = {
	code: "en-US",
	formatDistance: dr,
	formatLong: pr,
	formatRelative: hr,
	localize: _r,
	match: {
		ordinalNumber: xr({
			matchPattern: /^(\d+)(th|st|nd|rd)?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: vr({
			matchPatterns: {
				narrow: /^(b|a)/i,
				abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
				wide: /^(before christ|before common era|anno domini|common era)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^b/i, /^(a|c)/i] },
			defaultParseWidth: "any"
		}),
		quarter: vr({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^q[1234]/i,
				wide: /^[1234](th|st|nd|rd)? quarter/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/1/i,
				/2/i,
				/3/i,
				/4/i
			] },
			defaultParseWidth: "any",
			valueCallback: (e) => e + 1
		}),
		month: vr({
			matchPatterns: {
				narrow: /^[jfmasond]/i,
				abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
				wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^j/i,
					/^f/i,
					/^m/i,
					/^a/i,
					/^m/i,
					/^j/i,
					/^j/i,
					/^a/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				],
				any: [
					/^ja/i,
					/^f/i,
					/^mar/i,
					/^ap/i,
					/^may/i,
					/^jun/i,
					/^jul/i,
					/^au/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: vr({
			matchPatterns: {
				narrow: /^[smtwf]/i,
				short: /^(su|mo|tu|we|th|fr|sa)/i,
				abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
				wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^s/i,
					/^m/i,
					/^t/i,
					/^w/i,
					/^t/i,
					/^f/i,
					/^s/i
				],
				any: [
					/^su/i,
					/^m/i,
					/^tu/i,
					/^w/i,
					/^th/i,
					/^f/i,
					/^sa/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: vr({
			matchPatterns: {
				narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
				any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
			},
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^a/i,
				pm: /^p/i,
				midnight: /^mi/i,
				noon: /^no/i,
				morning: /morning/i,
				afternoon: /afternoon/i,
				evening: /evening/i,
				night: /night/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 0,
		firstWeekContainsDate: 1
	}
};
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getDayOfYear.js
function Cr(e, t) {
	let n = K(e, t?.in);
	return Gn(n, or(n)) + 1;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getISOWeek.js
function wr(e, t) {
	let n = K(e, t?.in), r = Bn(n) - +Kn(n);
	return Math.round(r / jn) + 1;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getWeekYear.js
function Tr(e, t) {
	let n = K(e, t?.in), r = n.getFullYear(), i = Rn(), a = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? i.firstWeekContainsDate ?? i.locale?.options?.firstWeekContainsDate ?? 1, o = G(t?.in || e, 0);
	o.setFullYear(r + 1, 0, a), o.setHours(0, 0, 0, 0);
	let s = zn(o, t), c = G(t?.in || e, 0);
	c.setFullYear(r, 0, a), c.setHours(0, 0, 0, 0);
	let l = zn(c, t);
	return +n >= +s ? r + 1 : +n >= +l ? r : r - 1;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfWeekYear.js
function Er(e, t) {
	let n = Rn(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, i = Tr(e, t), a = G(t?.in || e, 0);
	return a.setFullYear(i, 0, r), a.setHours(0, 0, 0, 0), zn(a, t);
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getWeek.js
function Dr(e, t) {
	let n = K(e, t?.in), r = zn(n, t) - +Er(n, t);
	return Math.round(r / jn) + 1;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/addLeadingZeros.js
function q(e, t) {
	return (e < 0 ? "-" : "") + Math.abs(e).toString().padStart(t, "0");
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/format/lightFormatters.js
var Or = {
	y(e, t) {
		let n = e.getFullYear(), r = n > 0 ? n : 1 - n;
		return q(t === "yy" ? r % 100 : r, t.length);
	},
	M(e, t) {
		let n = e.getMonth();
		return t === "M" ? String(n + 1) : q(n + 1, 2);
	},
	d(e, t) {
		return q(e.getDate(), t.length);
	},
	a(e, t) {
		let n = e.getHours() / 12 >= 1 ? "pm" : "am";
		switch (t) {
			case "a":
			case "aa": return n.toUpperCase();
			case "aaa": return n;
			case "aaaaa": return n[0];
			default: return n === "am" ? "a.m." : "p.m.";
		}
	},
	h(e, t) {
		return q(e.getHours() % 12 || 12, t.length);
	},
	H(e, t) {
		return q(e.getHours(), t.length);
	},
	m(e, t) {
		return q(e.getMinutes(), t.length);
	},
	s(e, t) {
		return q(e.getSeconds(), t.length);
	},
	S(e, t) {
		let n = t.length, r = e.getMilliseconds();
		return q(Math.trunc(r * 10 ** (n - 3)), t.length);
	}
}, kr = {
	am: "am",
	pm: "pm",
	midnight: "midnight",
	noon: "noon",
	morning: "morning",
	afternoon: "afternoon",
	evening: "evening",
	night: "night"
}, Ar = {
	G: function(e, t, n) {
		let r = e.getFullYear() > 0 ? 1 : 0;
		switch (t) {
			case "G":
			case "GG":
			case "GGG": return n.era(r, { width: "abbreviated" });
			case "GGGGG": return n.era(r, { width: "narrow" });
			default: return n.era(r, { width: "wide" });
		}
	},
	y: function(e, t, n) {
		if (t === "yo") {
			let t = e.getFullYear(), r = t > 0 ? t : 1 - t;
			return n.ordinalNumber(r, { unit: "year" });
		}
		return Or.y(e, t);
	},
	Y: function(e, t, n, r) {
		let i = Tr(e, r), a = i > 0 ? i : 1 - i;
		return t === "YY" ? q(a % 100, 2) : t === "Yo" ? n.ordinalNumber(a, { unit: "year" }) : q(a, t.length);
	},
	R: function(e, t) {
		return q(Vn(e), t.length);
	},
	u: function(e, t) {
		return q(e.getFullYear(), t.length);
	},
	Q: function(e, t, n) {
		let r = Math.ceil((e.getMonth() + 1) / 3);
		switch (t) {
			case "Q": return String(r);
			case "QQ": return q(r, 2);
			case "Qo": return n.ordinalNumber(r, { unit: "quarter" });
			case "QQQ": return n.quarter(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "QQQQQ": return n.quarter(r, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.quarter(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	q: function(e, t, n) {
		let r = Math.ceil((e.getMonth() + 1) / 3);
		switch (t) {
			case "q": return String(r);
			case "qq": return q(r, 2);
			case "qo": return n.ordinalNumber(r, { unit: "quarter" });
			case "qqq": return n.quarter(r, {
				width: "abbreviated",
				context: "standalone"
			});
			case "qqqqq": return n.quarter(r, {
				width: "narrow",
				context: "standalone"
			});
			default: return n.quarter(r, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	M: function(e, t, n) {
		let r = e.getMonth();
		switch (t) {
			case "M":
			case "MM": return Or.M(e, t);
			case "Mo": return n.ordinalNumber(r + 1, { unit: "month" });
			case "MMM": return n.month(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "MMMMM": return n.month(r, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.month(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	L: function(e, t, n) {
		let r = e.getMonth();
		switch (t) {
			case "L": return String(r + 1);
			case "LL": return q(r + 1, 2);
			case "Lo": return n.ordinalNumber(r + 1, { unit: "month" });
			case "LLL": return n.month(r, {
				width: "abbreviated",
				context: "standalone"
			});
			case "LLLLL": return n.month(r, {
				width: "narrow",
				context: "standalone"
			});
			default: return n.month(r, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	w: function(e, t, n, r) {
		let i = Dr(e, r);
		return t === "wo" ? n.ordinalNumber(i, { unit: "week" }) : q(i, t.length);
	},
	I: function(e, t, n) {
		let r = wr(e);
		return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : q(r, t.length);
	},
	d: function(e, t, n) {
		return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Or.d(e, t);
	},
	D: function(e, t, n) {
		let r = Cr(e);
		return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : q(r, t.length);
	},
	E: function(e, t, n) {
		let r = e.getDay();
		switch (t) {
			case "E":
			case "EE":
			case "EEE": return n.day(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "EEEEE": return n.day(r, {
				width: "narrow",
				context: "formatting"
			});
			case "EEEEEE": return n.day(r, {
				width: "short",
				context: "formatting"
			});
			default: return n.day(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	e: function(e, t, n, r) {
		let i = e.getDay(), a = (i - r.weekStartsOn + 8) % 7 || 7;
		switch (t) {
			case "e": return String(a);
			case "ee": return q(a, 2);
			case "eo": return n.ordinalNumber(a, { unit: "day" });
			case "eee": return n.day(i, {
				width: "abbreviated",
				context: "formatting"
			});
			case "eeeee": return n.day(i, {
				width: "narrow",
				context: "formatting"
			});
			case "eeeeee": return n.day(i, {
				width: "short",
				context: "formatting"
			});
			default: return n.day(i, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	c: function(e, t, n, r) {
		let i = e.getDay(), a = (i - r.weekStartsOn + 8) % 7 || 7;
		switch (t) {
			case "c": return String(a);
			case "cc": return q(a, t.length);
			case "co": return n.ordinalNumber(a, { unit: "day" });
			case "ccc": return n.day(i, {
				width: "abbreviated",
				context: "standalone"
			});
			case "ccccc": return n.day(i, {
				width: "narrow",
				context: "standalone"
			});
			case "cccccc": return n.day(i, {
				width: "short",
				context: "standalone"
			});
			default: return n.day(i, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	i: function(e, t, n) {
		let r = e.getDay(), i = r === 0 ? 7 : r;
		switch (t) {
			case "i": return String(i);
			case "ii": return q(i, t.length);
			case "io": return n.ordinalNumber(i, { unit: "day" });
			case "iii": return n.day(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "iiiii": return n.day(r, {
				width: "narrow",
				context: "formatting"
			});
			case "iiiiii": return n.day(r, {
				width: "short",
				context: "formatting"
			});
			default: return n.day(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	a: function(e, t, n) {
		let r = e.getHours() / 12 >= 1 ? "pm" : "am";
		switch (t) {
			case "a":
			case "aa": return n.dayPeriod(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "aaa": return n.dayPeriod(r, {
				width: "abbreviated",
				context: "formatting"
			}).toLowerCase();
			case "aaaaa": return n.dayPeriod(r, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.dayPeriod(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	b: function(e, t, n) {
		let r = e.getHours(), i;
		switch (i = r === 12 ? kr.noon : r === 0 ? kr.midnight : r / 12 >= 1 ? "pm" : "am", t) {
			case "b":
			case "bb": return n.dayPeriod(i, {
				width: "abbreviated",
				context: "formatting"
			});
			case "bbb": return n.dayPeriod(i, {
				width: "abbreviated",
				context: "formatting"
			}).toLowerCase();
			case "bbbbb": return n.dayPeriod(i, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.dayPeriod(i, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	B: function(e, t, n) {
		let r = e.getHours(), i;
		switch (i = r >= 17 ? kr.evening : r >= 12 ? kr.afternoon : r >= 4 ? kr.morning : kr.night, t) {
			case "B":
			case "BB":
			case "BBB": return n.dayPeriod(i, {
				width: "abbreviated",
				context: "formatting"
			});
			case "BBBBB": return n.dayPeriod(i, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.dayPeriod(i, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	h: function(e, t, n) {
		if (t === "ho") {
			let t = e.getHours() % 12;
			return t === 0 && (t = 12), n.ordinalNumber(t, { unit: "hour" });
		}
		return Or.h(e, t);
	},
	H: function(e, t, n) {
		return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : Or.H(e, t);
	},
	K: function(e, t, n) {
		let r = e.getHours() % 12;
		return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : q(r, t.length);
	},
	k: function(e, t, n) {
		let r = e.getHours();
		return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : q(r, t.length);
	},
	m: function(e, t, n) {
		return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : Or.m(e, t);
	},
	s: function(e, t, n) {
		return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : Or.s(e, t);
	},
	S: function(e, t) {
		return Or.S(e, t);
	},
	X: function(e, t, n) {
		let r = e.getTimezoneOffset();
		if (r === 0) return "Z";
		switch (t) {
			case "X": return Mr(r);
			case "XXXX":
			case "XX": return Nr(r);
			default: return Nr(r, ":");
		}
	},
	x: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "x": return Mr(r);
			case "xxxx":
			case "xx": return Nr(r);
			default: return Nr(r, ":");
		}
	},
	O: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "O":
			case "OO":
			case "OOO": return "GMT" + jr(r, ":");
			default: return "GMT" + Nr(r, ":");
		}
	},
	z: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "z":
			case "zz":
			case "zzz": return "GMT" + jr(r, ":");
			default: return "GMT" + Nr(r, ":");
		}
	},
	t: function(e, t, n) {
		return q(Math.trunc(e / 1e3), t.length);
	},
	T: function(e, t, n) {
		return q(+e, t.length);
	}
};
function jr(e, t = "") {
	let n = e > 0 ? "-" : "+", r = Math.abs(e), i = Math.trunc(r / 60), a = r % 60;
	return a === 0 ? n + String(i) : n + String(i) + t + q(a, 2);
}
function Mr(e, t) {
	return e % 60 == 0 ? (e > 0 ? "-" : "+") + q(Math.abs(e) / 60, 2) : Nr(e, t);
}
function Nr(e, t = "") {
	let n = e > 0 ? "-" : "+", r = Math.abs(e), i = q(Math.trunc(r / 60), 2), a = q(r % 60, 2);
	return n + i + t + a;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/format/longFormatters.js
var Pr = (e, t) => {
	switch (e) {
		case "P": return t.date({ width: "short" });
		case "PP": return t.date({ width: "medium" });
		case "PPP": return t.date({ width: "long" });
		default: return t.date({ width: "full" });
	}
}, Fr = (e, t) => {
	switch (e) {
		case "p": return t.time({ width: "short" });
		case "pp": return t.time({ width: "medium" });
		case "ppp": return t.time({ width: "long" });
		default: return t.time({ width: "full" });
	}
}, Ir = {
	p: Fr,
	P: (e, t) => {
		let n = e.match(/(P+)(p+)?/) || [], r = n[1], i = n[2];
		if (!i) return Pr(e, t);
		let a;
		switch (r) {
			case "P":
				a = t.dateTime({ width: "short" });
				break;
			case "PP":
				a = t.dateTime({ width: "medium" });
				break;
			case "PPP":
				a = t.dateTime({ width: "long" });
				break;
			default:
				a = t.dateTime({ width: "full" });
				break;
		}
		return a.replace("{{date}}", Pr(r, t)).replace("{{time}}", Fr(i, t));
	}
}, Lr = /^D+$/, Rr = /^Y+$/, zr = [
	"D",
	"DD",
	"YY",
	"YYYY"
];
function Br(e) {
	return Lr.test(e);
}
function Vr(e) {
	return Rr.test(e);
}
function Hr(e, t, n) {
	let r = Ur(e, t, n);
	if (console.warn(r), zr.includes(e)) throw RangeError(r);
}
function Ur(e, t, n) {
	let r = e[0] === "Y" ? "years" : "days of the month";
	return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/format.js
var Wr = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Gr = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Kr = /^'([^]*?)'?$/, qr = /''/g, Jr = /[a-zA-Z]/;
function Yr(e, t, n) {
	let r = Rn(), i = n?.locale ?? r.locale ?? Sr, a = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, o = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, s = K(e, n?.in);
	if (!$n(s)) throw RangeError("Invalid time value");
	let c = t.match(Gr).map((e) => {
		let t = e[0];
		if (t === "p" || t === "P") {
			let n = Ir[t];
			return n(e, i.formatLong);
		}
		return e;
	}).join("").match(Wr).map((e) => {
		if (e === "''") return {
			isToken: !1,
			value: "'"
		};
		let t = e[0];
		if (t === "'") return {
			isToken: !1,
			value: Xr(e)
		};
		if (Ar[t]) return {
			isToken: !0,
			value: e
		};
		if (t.match(Jr)) throw RangeError("Format string contains an unescaped latin alphabet character `" + t + "`");
		return {
			isToken: !1,
			value: e
		};
	});
	i.localize.preprocessor && (c = i.localize.preprocessor(s, c));
	let l = {
		firstWeekContainsDate: a,
		weekStartsOn: o,
		locale: i
	};
	return c.map((r) => {
		if (!r.isToken) return r.value;
		let a = r.value;
		(!n?.useAdditionalWeekYearTokens && Vr(a) || !n?.useAdditionalDayOfYearTokens && Br(a)) && Hr(a, t, String(e));
		let o = Ar[a[0]];
		return o(s, a, i.localize, l);
	}).join("");
}
function Xr(e) {
	let t = e.match(Kr);
	return t ? t[1].replace(qr, "'") : e;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getDaysInMonth.js
function Zr(e, t) {
	let n = K(e, t?.in), r = n.getFullYear(), i = n.getMonth(), a = G(n, 0);
	return a.setFullYear(r, i + 1, 0), a.setHours(0, 0, 0, 0), a.getDate();
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getMonth.js
function Qr(e, t) {
	return K(e, t?.in).getMonth();
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getYear.js
function $r(e, t) {
	return K(e, t?.in).getFullYear();
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isAfter.js
function ei(e, t) {
	return +K(e) > +K(t);
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isBefore.js
function ti(e, t) {
	return +K(e) < +K(t);
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isSameMonth.js
function ni(e, t, n) {
	let [r, i] = Un(n?.in, e, t);
	return r.getFullYear() === i.getFullYear() && r.getMonth() === i.getMonth();
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isSameYear.js
function ri(e, t, n) {
	let [r, i] = Un(n?.in, e, t);
	return r.getFullYear() === i.getFullYear();
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/setMonth.js
function ii(e, t, n) {
	let r = K(e, n?.in), i = r.getFullYear(), a = r.getDate(), o = G(n?.in || e, 0);
	o.setFullYear(i, t, 15), o.setHours(0, 0, 0, 0);
	let s = Zr(o);
	return r.setMonth(t, Math.min(a, s)), r;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/setYear.js
function ai(e, t, n) {
	let r = K(e, n?.in);
	return isNaN(+r) ? G(n?.in || e, NaN) : (r.setFullYear(t), r);
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/helpers/getBroadcastWeeksInMonth.js
var oi = 5, si = 4;
function ci(e, t) {
	let n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, i = t.addDays(e, -r + 1), a = t.addDays(i, oi * 7 - 1);
	return t.getMonth(e) === t.getMonth(a) ? oi : si;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/helpers/startOfBroadcastWeek.js
function li(e, t) {
	let n = t.startOfMonth(e), r = n.getDay();
	return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/helpers/endOfBroadcastWeek.js
function ui(e, t) {
	let n = li(e, t), r = ci(e, t);
	return t.addDays(n, r * 7 - 1);
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/locale/en-US.js
var di = {
	...Sr,
	labels: {
		labelDayButton: (e, t, n, r) => {
			let i;
			i = r && typeof r.format == "function" ? r.format.bind(r) : (e, t) => Yr(e, t, {
				locale: Sr,
				...n
			});
			let a = i(e, "PPPP");
			return t.today && (a = `Today, ${a}`), t.selected && (a = `${a}, selected`), a;
		},
		labelMonthDropdown: "Choose the Month",
		labelNext: "Go to the Next Month",
		labelPrevious: "Go to the Previous Month",
		labelWeekNumber: (e) => `Week ${e}`,
		labelYearDropdown: "Choose the Year",
		labelGrid: (e, t, n) => {
			let r;
			return r = n && typeof n.format == "function" ? n.format.bind(n) : (e, n) => Yr(e, n, {
				locale: Sr,
				...t
			}), r(e, "LLLL yyyy");
		},
		labelGridcell: (e, t, n, r) => {
			let i;
			i = r && typeof r.format == "function" ? r.format.bind(r) : (e, t) => Yr(e, t, {
				locale: Sr,
				...n
			});
			let a = i(e, "PPPP");
			return t?.today && (a = `Today, ${a}`), a;
		},
		labelNav: "Navigation bar",
		labelWeekNumberHeader: "Week Number",
		labelWeekday: (e, t, n) => {
			let r;
			return r = n && typeof n.format == "function" ? n.format.bind(n) : (e, n) => Yr(e, n, {
				locale: Sr,
				...t
			}), r(e, "cccc");
		}
	}
}, fi = class e {
	constructor(e, t) {
		this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? W.tz(this.options.timeZone) : new this.Date(), this.newDate = (e, t, n) => this.overrides?.newDate ? this.overrides.newDate(e, t, n) : this.options.timeZone ? new W(e, t, n, this.options.timeZone) : new Date(e, t, n), this.addDays = (e, t) => this.overrides?.addDays ? this.overrides.addDays(e, t) : Fn(e, t), this.addMonths = (e, t) => this.overrides?.addMonths ? this.overrides.addMonths(e, t) : In(e, t), this.addWeeks = (e, t) => this.overrides?.addWeeks ? this.overrides.addWeeks(e, t) : qn(e, t), this.addYears = (e, t) => this.overrides?.addYears ? this.overrides.addYears(e, t) : Jn(e, t), this.differenceInCalendarDays = (e, t) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(e, t) : Gn(e, t), this.differenceInCalendarMonths = (e, t) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(e, t) : er(e, t), this.eachMonthOfInterval = (e) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(e) : rr(e), this.eachYearOfInterval = (e) => {
			let t = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(e) : sr(e), n = new Set(t.map((e) => this.getYear(e)));
			if (n.size === t.length) return t;
			let r = [];
			return n.forEach((e) => {
				r.push(new Date(e, 0, 1));
			}), r;
		}, this.endOfBroadcastWeek = (e) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(e) : ui(e, this), this.endOfISOWeek = (e) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(e) : lr(e), this.endOfMonth = (e) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(e) : tr(e), this.endOfWeek = (e, t) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(e, t) : cr(e, this.options), this.endOfYear = (e) => this.overrides?.endOfYear ? this.overrides.endOfYear(e) : ar(e), this.format = (e, t, n) => {
			let r = this.overrides?.format ? this.overrides.format(e, t, this.options) : Yr(e, t, this.options);
			return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(r) : r;
		}, this.getISOWeek = (e) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(e) : wr(e), this.getMonth = (e, t) => this.overrides?.getMonth ? this.overrides.getMonth(e, this.options) : Qr(e, this.options), this.getYear = (e, t) => this.overrides?.getYear ? this.overrides.getYear(e, this.options) : $r(e, this.options), this.getWeek = (e, t) => this.overrides?.getWeek ? this.overrides.getWeek(e, this.options) : Dr(e, this.options), this.isAfter = (e, t) => this.overrides?.isAfter ? this.overrides.isAfter(e, t) : ei(e, t), this.isBefore = (e, t) => this.overrides?.isBefore ? this.overrides.isBefore(e, t) : ti(e, t), this.isDate = (e) => this.overrides?.isDate ? this.overrides.isDate(e) : Qn(e), this.isSameDay = (e, t) => this.overrides?.isSameDay ? this.overrides.isSameDay(e, t) : Zn(e, t), this.isSameMonth = (e, t) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(e, t) : ni(e, t), this.isSameYear = (e, t) => this.overrides?.isSameYear ? this.overrides.isSameYear(e, t) : ri(e, t), this.max = (e) => this.overrides?.max ? this.overrides.max(e) : Yn(e), this.min = (e) => this.overrides?.min ? this.overrides.min(e) : Xn(e), this.setMonth = (e, t) => this.overrides?.setMonth ? this.overrides.setMonth(e, t) : ii(e, t), this.setYear = (e, t) => this.overrides?.setYear ? this.overrides.setYear(e, t) : ai(e, t), this.startOfBroadcastWeek = (e, t) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(e, this) : li(e, this), this.startOfDay = (e) => this.overrides?.startOfDay ? this.overrides.startOfDay(e) : Wn(e), this.startOfISOWeek = (e) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(e) : Bn(e), this.startOfMonth = (e) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(e) : ir(e), this.startOfWeek = (e, t) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(e, this.options) : zn(e, this.options), this.startOfYear = (e) => this.overrides?.startOfYear ? this.overrides.startOfYear(e) : or(e), this.options = {
			locale: di,
			...e
		}, this.overrides = t;
	}
	getDigitMap() {
		let { numerals: e = "latn" } = this.options, t = new Intl.NumberFormat("en-US", { numberingSystem: e }), n = {};
		for (let e = 0; e < 10; e++) n[e.toString()] = t.format(e);
		return n;
	}
	replaceDigits(e) {
		let t = this.getDigitMap();
		return e.replace(/\d/g, (e) => t[e] || e);
	}
	formatNumber(e) {
		return this.replaceDigits(e.toString());
	}
	getMonthYearOrder() {
		let t = this.options.locale?.code;
		return t && e.yearFirstLocales.has(t) ? "year-first" : "month-first";
	}
	formatMonthYear(t) {
		let { locale: n, timeZone: r, numerals: i } = this.options, a = n?.code;
		if (a && e.yearFirstLocales.has(a)) try {
			return new Intl.DateTimeFormat(a, {
				month: "long",
				year: "numeric",
				timeZone: r,
				numberingSystem: i
			}).format(t);
		} catch {}
		let o = this.getMonthYearOrder() === "year-first" ? "y LLLL" : "LLLL y";
		return this.format(t, o);
	}
};
fi.yearFirstLocales = new Set([
	"eu",
	"hu",
	"ja",
	"ja-Hira",
	"ja-JP",
	"ko",
	"ko-KR",
	"lt",
	"lt-LT",
	"lv",
	"lv-LV",
	"mn",
	"mn-MN",
	"zh",
	"zh-CN",
	"zh-HK",
	"zh-TW"
]);
var pi = new fi(), mi = class {
	constructor(e, t, n = pi) {
		this.date = e, this.displayMonth = t, this.outside = !!(t && !n.isSameMonth(e, t)), this.dateLib = n, this.isoDate = n.format(e, "yyyy-MM-dd"), this.displayMonthId = n.format(t, "yyyy-MM"), this.dateMonthId = n.format(e, "yyyy-MM");
	}
	isEqualTo(e) {
		return this.dateLib.isSameDay(e.date, this.date) && this.dateLib.isSameMonth(e.displayMonth, this.displayMonth);
	}
}, hi = class {
	constructor(e, t) {
		this.date = e, this.weeks = t;
	}
}, gi = class {
	constructor(e, t) {
		this.days = t, this.weekNumber = e;
	}
};
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/components/Button.js
function _i(e) {
	return z.createElement("button", { ...e });
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/components/CaptionLabel.js
function vi(e) {
	return z.createElement("span", { ...e });
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/components/Chevron.js
function yi(e) {
	let { size: t = 24, orientation: n = "left", className: r } = e;
	return z.createElement("svg", {
		className: r,
		width: t,
		height: t,
		viewBox: "0 0 24 24"
	}, n === "up" && z.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }), n === "down" && z.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }), n === "left" && z.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }), n === "right" && z.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" }));
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/components/Day.js
function bi(e) {
	let { day: t, modifiers: n, ...r } = e;
	return z.createElement("td", { ...r });
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/components/DayButton.js
function xi(e) {
	let { day: t, modifiers: n, ...r } = e, i = z.useRef(null);
	return z.useEffect(() => {
		n.focused && i.current?.focus();
	}, [n.focused]), z.createElement("button", {
		ref: i,
		...r
	});
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/UI.js
var J;
(function(e) {
	e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(J ||= {});
var Y;
(function(e) {
	e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(Y ||= {});
var X;
(function(e) {
	e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(X ||= {});
var Z;
(function(e) {
	e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(Z ||= {});
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/components/Dropdown.js
function Si(e) {
	let { options: t, className: n, components: r, classNames: i, ...a } = e, o = [i[J.Dropdown], n].join(" "), s = t?.find(({ value: e }) => e === a.value);
	return z.createElement("span", {
		"data-disabled": a.disabled,
		className: i[J.DropdownRoot]
	}, z.createElement(r.Select, {
		className: o,
		...a
	}, t?.map(({ value: e, label: t, disabled: n }) => z.createElement(r.Option, {
		key: e,
		value: e,
		disabled: n
	}, t))), z.createElement("span", {
		className: i[J.CaptionLabel],
		"aria-hidden": !0
	}, s?.label, z.createElement(r.Chevron, {
		orientation: "down",
		size: 18,
		className: i[J.Chevron]
	})));
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/components/DropdownNav.js
function Ci(e) {
	return z.createElement("div", { ...e });
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/components/Footer.js
function wi(e) {
	return z.createElement("div", { ...e });
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/components/Month.js
function Ti(e) {
	let { calendarMonth: t, displayIndex: n, ...r } = e;
	return z.createElement("div", { ...r }, e.children);
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/components/MonthCaption.js
function Ei(e) {
	let { calendarMonth: t, displayIndex: n, ...r } = e;
	return z.createElement("div", { ...r });
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/components/MonthGrid.js
function Di(e) {
	return z.createElement("table", { ...e });
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/components/Months.js
function Oi(e) {
	return z.createElement("div", { ...e });
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/useDayPicker.js
var ki = B(void 0);
function Ai() {
	let e = ae(ki);
	if (e === void 0) throw Error("useDayPicker() must be used within a custom component.");
	return e;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/components/MonthsDropdown.js
function ji(e) {
	let { components: t } = Ai();
	return z.createElement(t.Dropdown, { ...e });
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/components/Nav.js
function Mi(e) {
	let { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: i, ...a } = e, { components: o, classNames: s, labels: { labelPrevious: c, labelNext: l } } = Ai(), u = V((e) => {
		i && n?.(e);
	}, [i, n]), d = V((e) => {
		r && t?.(e);
	}, [r, t]);
	return z.createElement("nav", { ...a }, z.createElement(o.PreviousMonthButton, {
		type: "button",
		className: s[J.PreviousMonthButton],
		tabIndex: r ? void 0 : -1,
		"aria-disabled": r ? void 0 : !0,
		"aria-label": c(r),
		onClick: d
	}, z.createElement(o.Chevron, {
		disabled: r ? void 0 : !0,
		className: s[J.Chevron],
		orientation: "left"
	})), z.createElement(o.NextMonthButton, {
		type: "button",
		className: s[J.NextMonthButton],
		tabIndex: i ? void 0 : -1,
		"aria-disabled": i ? void 0 : !0,
		"aria-label": l(i),
		onClick: u
	}, z.createElement(o.Chevron, {
		disabled: i ? void 0 : !0,
		orientation: "right",
		className: s[J.Chevron]
	})));
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/components/NextMonthButton.js
function Ni(e) {
	let { components: t } = Ai();
	return z.createElement(t.Button, { ...e });
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/components/Option.js
function Pi(e) {
	return z.createElement("option", { ...e });
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/components/PreviousMonthButton.js
function Fi(e) {
	let { components: t } = Ai();
	return z.createElement(t.Button, { ...e });
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/components/Root.js
function Ii(e) {
	let { rootRef: t, ...n } = e;
	return z.createElement("div", {
		...n,
		ref: t
	});
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/components/Select.js
function Li(e) {
	return z.createElement("select", { ...e });
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/components/Week.js
function Ri(e) {
	let { week: t, ...n } = e;
	return z.createElement("tr", { ...n });
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/components/Weekday.js
function zi(e) {
	return z.createElement("th", { ...e });
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/components/Weekdays.js
function Bi(e) {
	return z.createElement("thead", { "aria-hidden": !0 }, z.createElement("tr", { ...e }));
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/components/WeekNumber.js
function Vi(e) {
	let { week: t, ...n } = e;
	return z.createElement("th", { ...n });
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/components/WeekNumberHeader.js
function Hi(e) {
	return z.createElement("th", { ...e });
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/components/Weeks.js
function Ui(e) {
	return z.createElement("tbody", { ...e });
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/components/YearsDropdown.js
function Wi(e) {
	let { components: t } = Ai();
	return z.createElement(t.Dropdown, { ...e });
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/components/custom-components.js
var Gi = /* @__PURE__ */ n({
	Button: () => _i,
	CaptionLabel: () => vi,
	Chevron: () => yi,
	Day: () => bi,
	DayButton: () => xi,
	Dropdown: () => Si,
	DropdownNav: () => Ci,
	Footer: () => wi,
	Month: () => Ti,
	MonthCaption: () => Ei,
	MonthGrid: () => Di,
	Months: () => Oi,
	MonthsDropdown: () => ji,
	Nav: () => Mi,
	NextMonthButton: () => Ni,
	Option: () => Pi,
	PreviousMonthButton: () => Fi,
	Root: () => Ii,
	Select: () => Li,
	Week: () => Ri,
	WeekNumber: () => Vi,
	WeekNumberHeader: () => Hi,
	Weekday: () => zi,
	Weekdays: () => Bi,
	Weeks: () => Ui,
	YearsDropdown: () => Wi
});
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/utils/rangeIncludesDate.js
function Ki(e, t, n = !1, r = pi) {
	let { from: i, to: a } = e, { differenceInCalendarDays: o, isSameDay: s } = r;
	return i && a ? (o(a, i) < 0 && ([i, a] = [a, i]), o(t, i) >= (n ? 1 : 0) && o(a, t) >= (n ? 1 : 0)) : !n && a ? s(a, t) : !n && i ? s(i, t) : !1;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/utils/typeguards.js
function qi(e) {
	return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function Ji(e) {
	return !!(e && typeof e == "object" && "from" in e);
}
function Yi(e) {
	return !!(e && typeof e == "object" && "after" in e);
}
function Xi(e) {
	return !!(e && typeof e == "object" && "before" in e);
}
function Zi(e) {
	return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function Qi(e, t) {
	return Array.isArray(e) && e.every(t.isDate);
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/utils/dateMatchModifiers.js
function $i(e, t, n = pi) {
	let r = Array.isArray(t) ? t : [t], { isSameDay: i, differenceInCalendarDays: a, isAfter: o } = n;
	return r.some((t) => {
		if (typeof t == "boolean") return t;
		if (n.isDate(t)) return i(e, t);
		if (Qi(t, n)) return t.some((t) => i(e, t));
		if (Ji(t)) return Ki(t, e, !1, n);
		if (Zi(t)) return Array.isArray(t.dayOfWeek) ? t.dayOfWeek.includes(e.getDay()) : t.dayOfWeek === e.getDay();
		if (qi(t)) {
			let n = a(t.before, e), r = a(t.after, e), i = n > 0, s = r < 0;
			return o(t.before, t.after) ? s && i : i || s;
		}
		return Yi(t) ? a(e, t.after) > 0 : Xi(t) ? a(t.before, e) > 0 : typeof t == "function" ? t(e) : !1;
	});
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/helpers/createGetModifiers.js
function ea(e, t, n, r, i) {
	let { disabled: a, hidden: o, modifiers: s, showOutsideDays: c, broadcastCalendar: l, today: u = i.today() } = t, { isSameDay: d, isSameMonth: f, startOfMonth: p, isBefore: m, endOfMonth: h, isAfter: g } = i, _ = n && p(n), v = r && h(r), y = {
		[Y.focused]: [],
		[Y.outside]: [],
		[Y.disabled]: [],
		[Y.hidden]: [],
		[Y.today]: []
	}, b = {};
	for (let t of e) {
		let { date: e, displayMonth: n } = t, r = !!(n && !f(e, n)), p = !!(_ && m(e, _)), h = !!(v && g(e, v)), x = !!(a && $i(e, a, i)), S = !!(o && $i(e, o, i)) || p || h || !l && !c && r || l && c === !1 && r, C = d(e, u);
		r && y.outside.push(t), x && y.disabled.push(t), S && y.hidden.push(t), C && y.today.push(t), s && Object.keys(s).forEach((n) => {
			let r = s?.[n];
			r && $i(e, r, i) && (b[n] ? b[n].push(t) : b[n] = [t]);
		});
	}
	return (e) => {
		let t = {
			[Y.focused]: !1,
			[Y.disabled]: !1,
			[Y.hidden]: !1,
			[Y.outside]: !1,
			[Y.today]: !1
		}, n = {};
		for (let n in y) t[n] = y[n].some((t) => t === e);
		for (let t in b) n[t] = b[t].some((t) => t === e);
		return {
			...t,
			...n
		};
	};
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/helpers/getClassNamesForModifiers.js
function ta(e, t, n = {}) {
	return Object.entries(e).filter(([, e]) => e === !0).reduce((e, [r]) => (n[r] ? e.push(n[r]) : t[Y[r]] ? e.push(t[Y[r]]) : t[X[r]] && e.push(t[X[r]]), e), [t[J.Day]]);
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/helpers/getComponents.js
function na(e) {
	return {
		...Gi,
		...e
	};
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/helpers/getDataAttributes.js
function ra(e) {
	let t = {
		"data-mode": e.mode ?? void 0,
		"data-required": "required" in e ? e.required : void 0,
		"data-multiple-months": e.numberOfMonths && e.numberOfMonths > 1 || void 0,
		"data-week-numbers": e.showWeekNumber || void 0,
		"data-broadcast-calendar": e.broadcastCalendar || void 0,
		"data-nav-layout": e.navLayout || void 0
	};
	return Object.entries(e).forEach(([e, n]) => {
		e.startsWith("data-") && (t[e] = n);
	}), t;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/helpers/getDefaultClassNames.js
function ia() {
	let e = {};
	for (let t in J) e[J[t]] = `rdp-${J[t]}`;
	for (let t in Y) e[Y[t]] = `rdp-${Y[t]}`;
	for (let t in X) e[X[t]] = `rdp-${X[t]}`;
	for (let t in Z) e[Z[t]] = `rdp-${Z[t]}`;
	return e;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/formatters/formatCaption.js
function aa(e, t, n) {
	return (n ?? new fi(t)).formatMonthYear(e);
}
var oa = aa;
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/formatters/formatDay.js
function sa(e, t, n) {
	return (n ?? new fi(t)).format(e, "d");
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/formatters/formatMonthDropdown.js
function ca(e, t = pi) {
	return t.format(e, "LLLL");
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/formatters/formatWeekdayName.js
function la(e, t, n) {
	return (n ?? new fi(t)).format(e, "cccccc");
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/formatters/formatWeekNumber.js
function ua(e, t = pi) {
	return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/formatters/formatWeekNumberHeader.js
function da() {
	return "";
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/formatters/formatYearDropdown.js
function fa(e, t = pi) {
	return t.format(e, "yyyy");
}
var pa = fa, ma = /* @__PURE__ */ n({
	formatCaption: () => aa,
	formatDay: () => sa,
	formatMonthCaption: () => oa,
	formatMonthDropdown: () => ca,
	formatWeekNumber: () => ua,
	formatWeekNumberHeader: () => da,
	formatWeekdayName: () => la,
	formatYearCaption: () => pa,
	formatYearDropdown: () => fa
});
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/helpers/getFormatters.js
function ha(e) {
	return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
		...ma,
		...e
	};
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/labels/labelDayButton.js
function ga(e, t, n, r) {
	let i = (r ?? new fi(n)).format(e, "PPPP");
	return t.today && (i = `Today, ${i}`), t.selected && (i = `${i}, selected`), i;
}
var _a = ga;
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/labels/labelGrid.js
function va(e, t, n) {
	return (n ?? new fi(t)).formatMonthYear(e);
}
var ya = va;
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/labels/labelGridcell.js
function ba(e, t, n, r) {
	let i = (r ?? new fi(n)).format(e, "PPPP");
	return t?.today && (i = `Today, ${i}`), i;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/labels/labelMonthDropdown.js
function xa(e) {
	return "Choose the Month";
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/labels/labelNav.js
function Sa() {
	return "";
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/labels/labelNext.js
var Ca = "Go to the Next Month";
function wa(e, t) {
	return Ca;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/labels/labelPrevious.js
function Ta(e) {
	return "Go to the Previous Month";
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/labels/labelWeekday.js
function Ea(e, t, n) {
	return (n ?? new fi(t)).format(e, "cccc");
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/labels/labelWeekNumber.js
function Da(e, t) {
	return `Week ${e}`;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/labels/labelWeekNumberHeader.js
function Oa(e) {
	return "Week Number";
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/labels/labelYearDropdown.js
function ka(e) {
	return "Choose the Year";
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/labels/index.js
var Aa = /* @__PURE__ */ n({
	labelCaption: () => ya,
	labelDay: () => _a,
	labelDayButton: () => ga,
	labelGrid: () => va,
	labelGridcell: () => ba,
	labelMonthDropdown: () => xa,
	labelNav: () => Sa,
	labelNext: () => wa,
	labelPrevious: () => Ta,
	labelWeekNumber: () => Da,
	labelWeekNumberHeader: () => Oa,
	labelWeekday: () => Ea,
	labelYearDropdown: () => ka
}), Q = (e, t, n) => t || (n ? typeof n == "function" ? n : (...e) => n : e);
function ja(e, t) {
	let n = t.locale?.labels ?? {};
	return {
		...Aa,
		...e ?? {},
		labelDayButton: Q(ga, e?.labelDayButton, n.labelDayButton),
		labelMonthDropdown: Q(xa, e?.labelMonthDropdown, n.labelMonthDropdown),
		labelNext: Q(wa, e?.labelNext, n.labelNext),
		labelPrevious: Q(Ta, e?.labelPrevious, n.labelPrevious),
		labelWeekNumber: Q(Da, e?.labelWeekNumber, n.labelWeekNumber),
		labelYearDropdown: Q(ka, e?.labelYearDropdown, n.labelYearDropdown),
		labelGrid: Q(va, e?.labelGrid, n.labelGrid),
		labelGridcell: Q(ba, e?.labelGridcell, n.labelGridcell),
		labelNav: Q(Sa, e?.labelNav, n.labelNav),
		labelWeekNumberHeader: Q(Oa, e?.labelWeekNumberHeader, n.labelWeekNumberHeader),
		labelWeekday: Q(Ea, e?.labelWeekday, n.labelWeekday)
	};
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/helpers/getMonthOptions.js
function Ma(e, t, n, r, i) {
	let { startOfMonth: a, startOfYear: o, endOfYear: s, eachMonthOfInterval: c, getMonth: l } = i;
	return c({
		start: o(e),
		end: s(e)
	}).map((e) => {
		let o = r.formatMonthDropdown(e, i);
		return {
			value: l(e),
			label: o,
			disabled: t && e < a(t) || n && e > a(n) || !1
		};
	});
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/helpers/getStyleForModifiers.js
function Na(e, t = {}, n = {}) {
	let r = { ...t?.[J.Day] };
	return Object.entries(e).filter(([, e]) => e === !0).forEach(([e]) => {
		r = {
			...r,
			...n?.[e]
		};
	}), r;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/helpers/getWeekdays.js
function Pa(e, t, n, r) {
	let i = r ?? e.today(), a = n ? e.startOfBroadcastWeek(i, e) : t ? e.startOfISOWeek(i) : e.startOfWeek(i), o = [];
	for (let t = 0; t < 7; t++) {
		let n = e.addDays(a, t);
		o.push(n);
	}
	return o;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/helpers/getYearOptions.js
function Fa(e, t, n, r, i = !1) {
	if (!e || !t) return;
	let { startOfYear: a, endOfYear: o, eachYearOfInterval: s, getYear: c } = r, l = s({
		start: a(e),
		end: o(t)
	});
	return i && l.reverse(), l.map((e) => {
		let t = n.formatYearDropdown(e, r);
		return {
			value: c(e),
			label: t,
			disabled: !1
		};
	});
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/noonDateLib.js
function Ia(e, t = {}) {
	let { weekStartsOn: n, locale: r } = t, i = n ?? r?.options?.weekStartsOn ?? 0, a = (t) => {
		let n = typeof t == "number" || typeof t == "string" ? new Date(t) : t;
		return new W(n.getFullYear(), n.getMonth(), n.getDate(), 12, 0, 0, e);
	}, o = (e) => {
		let t = a(e);
		return new Date(t.getFullYear(), t.getMonth(), t.getDate(), 0, 0, 0, 0);
	};
	return {
		today: () => a(W.tz(e)),
		newDate: (t, n, r) => new W(t, n, r, 12, 0, 0, e),
		startOfDay: (e) => a(e),
		startOfWeek: (e, t) => {
			let n = a(e), r = t?.weekStartsOn ?? i, o = (n.getDay() - r + 7) % 7;
			return n.setDate(n.getDate() - o), n;
		},
		startOfISOWeek: (e) => {
			let t = a(e), n = (t.getDay() - 1 + 7) % 7;
			return t.setDate(t.getDate() - n), t;
		},
		startOfMonth: (e) => {
			let t = a(e);
			return t.setDate(1), t;
		},
		startOfYear: (e) => {
			let t = a(e);
			return t.setMonth(0, 1), t;
		},
		endOfWeek: (e, t) => {
			let n = a(e), r = (((t?.weekStartsOn ?? i) + 6) % 7 - n.getDay() + 7) % 7;
			return n.setDate(n.getDate() + r), n;
		},
		endOfISOWeek: (e) => {
			let t = a(e), n = (7 - t.getDay()) % 7;
			return t.setDate(t.getDate() + n), t;
		},
		endOfMonth: (e) => {
			let t = a(e);
			return t.setMonth(t.getMonth() + 1, 0), t;
		},
		endOfYear: (e) => {
			let t = a(e);
			return t.setMonth(11, 31), t;
		},
		eachMonthOfInterval: (t) => {
			let n = a(t.start), r = a(t.end), i = [], o = new W(n.getFullYear(), n.getMonth(), 1, 12, 0, 0, e), s = r.getFullYear() * 12 + r.getMonth();
			for (; o.getFullYear() * 12 + o.getMonth() <= s;) i.push(new W(o, e)), o.setMonth(o.getMonth() + 1, 1);
			return i;
		},
		addDays: (e, t) => {
			let n = a(e);
			return n.setDate(n.getDate() + t), n;
		},
		addWeeks: (e, t) => {
			let n = a(e);
			return n.setDate(n.getDate() + t * 7), n;
		},
		addMonths: (e, t) => {
			let n = a(e);
			return n.setMonth(n.getMonth() + t), n;
		},
		addYears: (e, t) => {
			let n = a(e);
			return n.setFullYear(n.getFullYear() + t), n;
		},
		eachYearOfInterval: (t) => {
			let n = a(t.start), r = a(t.end), i = [], o = new W(n.getFullYear(), 0, 1, 12, 0, 0, e);
			for (; o.getFullYear() <= r.getFullYear();) i.push(new W(o, e)), o.setFullYear(o.getFullYear() + 1, 0, 1);
			return i;
		},
		getWeek: (e, t) => Dr(o(e), {
			weekStartsOn: t?.weekStartsOn ?? i,
			firstWeekContainsDate: t?.firstWeekContainsDate ?? r?.options?.firstWeekContainsDate ?? 1
		}),
		getISOWeek: (e) => wr(o(e)),
		differenceInCalendarDays: (e, t) => Gn(o(e), o(t)),
		differenceInCalendarMonths: (e, t) => er(o(e), o(t))
	};
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/useAnimation.js
var La = (e) => e instanceof HTMLElement ? e : null, Ra = (e) => [...e.querySelectorAll("[data-animated-month]") ?? []], za = (e) => La(e.querySelector("[data-animated-month]")), Ba = (e) => La(e.querySelector("[data-animated-caption]")), Va = (e) => La(e.querySelector("[data-animated-weeks]")), Ha = (e) => La(e.querySelector("[data-animated-nav]")), Ua = (e) => La(e.querySelector("[data-animated-weekdays]"));
function Wa(e, t, { classNames: n, months: r, focused: i, dateLib: a }) {
	let o = le(null), s = le(r), c = le(!1);
	se(() => {
		let l = s.current;
		if (s.current = r, !t || !e.current || !(e.current instanceof HTMLElement) || r.length === 0 || l.length === 0 || r.length !== l.length) return;
		let u = a.isSameMonth(r[0].date, l[0].date), d = a.isAfter(r[0].date, l[0].date), f = d ? n[Z.caption_after_enter] : n[Z.caption_before_enter], p = d ? n[Z.weeks_after_enter] : n[Z.weeks_before_enter], m = o.current, h = e.current.cloneNode(!0);
		if (h instanceof HTMLElement ? (Ra(h).forEach((e) => {
			if (!(e instanceof HTMLElement)) return;
			let t = za(e);
			t && e.contains(t) && e.removeChild(t);
			let n = Ba(e);
			n && n.classList.remove(f);
			let r = Va(e);
			r && r.classList.remove(p);
		}), o.current = h) : o.current = null, c.current || u || i) return;
		let g = m instanceof HTMLElement ? Ra(m) : [], _ = Ra(e.current);
		if (_?.every((e) => e instanceof HTMLElement) && g && g.every((e) => e instanceof HTMLElement)) {
			c.current = !0;
			let t = [];
			e.current.style.isolation = "isolate";
			let r = Ha(e.current);
			r && (r.style.zIndex = "1"), _.forEach((i, a) => {
				let o = g[a];
				if (!o) return;
				i.style.position = "relative", i.style.overflow = "hidden";
				let s = Ba(i);
				s && s.classList.add(f);
				let l = Va(i);
				l && l.classList.add(p);
				let u = () => {
					c.current = !1, e.current && (e.current.style.isolation = ""), r && (r.style.zIndex = ""), s && s.classList.remove(f), l && l.classList.remove(p), i.style.position = "", i.style.overflow = "", i.contains(o) && i.removeChild(o);
				};
				t.push(u), o.style.pointerEvents = "none", o.style.position = "absolute", o.style.overflow = "hidden", o.setAttribute("aria-hidden", "true");
				let m = Ua(o);
				m && (m.style.opacity = "0");
				let h = Ba(o);
				h && (h.classList.add(d ? n[Z.caption_before_exit] : n[Z.caption_after_exit]), h.addEventListener("animationend", u));
				let _ = Va(o);
				_ && _.classList.add(d ? n[Z.weeks_before_exit] : n[Z.weeks_after_exit]), i.insertBefore(o, i.firstChild);
			});
		}
	});
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/helpers/getDates.js
function Ga(e, t, n, r) {
	let i = e[0], a = e[e.length - 1], { ISOWeek: o, fixedWeeks: s, broadcastCalendar: c } = n ?? {}, { addDays: l, differenceInCalendarDays: u, differenceInCalendarMonths: d, endOfBroadcastWeek: f, endOfISOWeek: p, endOfMonth: m, endOfWeek: h, isAfter: g, startOfBroadcastWeek: _, startOfISOWeek: v, startOfWeek: y } = r, b = c ? _(i, r) : o ? v(i) : y(i), x = c ? f(a) : o ? p(m(a)) : h(m(a)), S = t && (c ? f(t) : o ? p(t) : h(t)), C = u(S && g(x, S) ? S : x, b), w = d(a, i) + 1, T = [];
	for (let e = 0; e <= C; e++) {
		let t = l(b, e);
		T.push(t);
	}
	let E = (c ? 35 : 42) * w;
	if (s && T.length < E) {
		let e = E - T.length;
		for (let t = 0; t < e; t++) {
			let e = l(T[T.length - 1], 1);
			T.push(e);
		}
	}
	return T;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/helpers/getDays.js
function Ka(e) {
	let t = [];
	return e.reduce((e, n) => {
		let r = n.weeks.reduce((e, t) => e.concat(t.days.slice()), t.slice());
		return e.concat(r.slice());
	}, t.slice());
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/helpers/getDisplayMonths.js
function qa(e, t, n, r) {
	let { numberOfMonths: i = 1 } = n, a = [];
	for (let n = 0; n < i; n++) {
		let i = r.addMonths(e, n);
		if (t && i > t) break;
		a.push(i);
	}
	return a;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/helpers/getInitialMonth.js
function Ja(e, t, n, r) {
	let { month: i, defaultMonth: a, today: o = r.today(), numberOfMonths: s = 1 } = e, c = i || a || o, { differenceInCalendarMonths: l, addMonths: u, startOfMonth: d } = r;
	return n && l(n, c) < s - 1 && (c = u(n, -1 * (s - 1))), t && l(c, t) < 0 && (c = t), d(c);
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/helpers/getMonths.js
function Ya(e, t, n, r) {
	let { addDays: i, endOfBroadcastWeek: a, endOfISOWeek: o, endOfMonth: s, endOfWeek: c, getISOWeek: l, getWeek: u, startOfBroadcastWeek: d, startOfISOWeek: f, startOfWeek: p } = r, m = e.reduce((e, m) => {
		let h = n.broadcastCalendar ? d(m, r) : n.ISOWeek ? f(m) : p(m), g = n.broadcastCalendar ? a(m) : n.ISOWeek ? o(s(m)) : c(s(m)), _ = t.filter((e) => e >= h && e <= g), v = n.broadcastCalendar ? 35 : 42;
		if (n.fixedWeeks && _.length < v) {
			let e = t.filter((e) => {
				let t = v - _.length;
				return e > g && e <= i(g, t);
			});
			_.push(...e);
		}
		let y = new hi(m, _.reduce((e, t) => {
			let i = n.ISOWeek ? l(t) : u(t), a = e.find((e) => e.weekNumber === i), o = new mi(t, m, r);
			return a ? a.days.push(o) : e.push(new gi(i, [o])), e;
		}, []));
		return e.push(y), e;
	}, []);
	return n.reverseMonths ? m.reverse() : m;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/helpers/getNavMonth.js
function Xa(e, t) {
	let { startMonth: n, endMonth: r } = e, { startOfYear: i, startOfDay: a, startOfMonth: o, endOfMonth: s, addYears: c, endOfYear: l, newDate: u, today: d } = t, { fromYear: f, toYear: p, fromMonth: m, toMonth: h } = e;
	!n && m && (n = m), !n && f && (n = t.newDate(f, 0, 1)), !r && h && (r = h), !r && p && (r = u(p, 11, 31));
	let g = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
	return n ? n = o(n) : f ? n = u(f, 0, 1) : !n && g && (n = i(c(e.today ?? d(), -100))), r ? r = s(r) : p ? r = u(p, 11, 31) : !r && g && (r = l(e.today ?? d())), [n && a(n), r && a(r)];
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/helpers/getNextMonth.js
function Za(e, t, n, r) {
	if (n.disableNavigation) return;
	let { pagedNavigation: i, numberOfMonths: a = 1 } = n, { startOfMonth: o, addMonths: s, differenceInCalendarMonths: c } = r, l = i ? a : 1, u = o(e);
	if (!t || !(c(t, e) < a)) return s(u, l);
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/helpers/getPreviousMonth.js
function Qa(e, t, n, r) {
	if (n.disableNavigation) return;
	let { pagedNavigation: i, numberOfMonths: a } = n, { startOfMonth: o, addMonths: s, differenceInCalendarMonths: c } = r, l = i ? a ?? 1 : 1, u = o(e);
	if (!t || !(c(u, t) <= 0)) return s(u, -l);
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/helpers/getWeeks.js
function $a(e) {
	return e.reduce((e, t) => e.concat(t.weeks.slice()), [].slice());
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/helpers/useControlledValue.js
function eo(e, t) {
	let [n, r] = ue(e);
	return [t === void 0 ? n : t, r];
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/useCalendar.js
function to(e, t) {
	let [n, r] = Xa(e, t), { startOfMonth: i, endOfMonth: a } = t, o = Ja(e, n, r, t), [s, c] = eo(o, e.month ? o : void 0);
	oe(() => {
		c(Ja(e, n, r, t));
	}, [e.timeZone]);
	let { months: l, weeks: u, days: d, previousMonth: f, nextMonth: p } = ce(() => {
		let i = qa(s, r, { numberOfMonths: e.numberOfMonths }, t), o = Ya(i, Ga(i, e.endMonth ? a(e.endMonth) : void 0, {
			ISOWeek: e.ISOWeek,
			fixedWeeks: e.fixedWeeks,
			broadcastCalendar: e.broadcastCalendar
		}, t), {
			broadcastCalendar: e.broadcastCalendar,
			fixedWeeks: e.fixedWeeks,
			ISOWeek: e.ISOWeek,
			reverseMonths: e.reverseMonths
		}, t);
		return {
			months: o,
			weeks: $a(o),
			days: Ka(o),
			previousMonth: Qa(s, n, e, t),
			nextMonth: Za(s, r, e, t)
		};
	}, [
		t,
		s.getTime(),
		r?.getTime(),
		n?.getTime(),
		e.disableNavigation,
		e.broadcastCalendar,
		e.endMonth?.getTime(),
		e.fixedWeeks,
		e.ISOWeek,
		e.numberOfMonths,
		e.pagedNavigation,
		e.reverseMonths
	]), { disableNavigation: m, onMonthChange: h } = e, g = (e) => u.some((t) => t.days.some((t) => t.isEqualTo(e))), _ = (e) => {
		if (m) return;
		let t = i(e);
		n && t < i(n) && (t = i(n)), r && t > i(r) && (t = i(r)), c(t), h?.(t);
	};
	return {
		months: l,
		weeks: u,
		days: d,
		navStart: n,
		navEnd: r,
		previousMonth: f,
		nextMonth: p,
		goToMonth: _,
		goToDay: (e) => {
			g(e) || _(e.date);
		}
	};
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/helpers/calculateFocusTarget.js
var no;
(function(e) {
	e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(no ||= {});
function ro(e) {
	return !e[Y.disabled] && !e[Y.hidden] && !e[Y.outside];
}
function io(e, t, n, r) {
	let i, a = -1;
	for (let o of e) {
		let e = t(o);
		ro(e) && (e[Y.focused] && a < no.FocusedModifier ? (i = o, a = no.FocusedModifier) : r?.isEqualTo(o) && a < no.LastFocused ? (i = o, a = no.LastFocused) : n(o.date) && a < no.Selected ? (i = o, a = no.Selected) : e[Y.today] && a < no.Today && (i = o, a = no.Today));
	}
	return i ||= e.find((e) => ro(t(e))), i;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/helpers/getFocusableDate.js
function ao(e, t, n, r, i, a, o) {
	let { ISOWeek: s, broadcastCalendar: c } = a, { addDays: l, addMonths: u, addWeeks: d, addYears: f, endOfBroadcastWeek: p, endOfISOWeek: m, endOfWeek: h, max: g, min: _, startOfBroadcastWeek: v, startOfISOWeek: y, startOfWeek: b } = o, x = {
		day: l,
		week: d,
		month: u,
		year: f,
		startOfWeek: (e) => c ? v(e, o) : s ? y(e) : b(e),
		endOfWeek: (e) => c ? p(e) : s ? m(e) : h(e)
	}[e](n, t === "after" ? 1 : -1);
	return t === "before" && r ? x = g([r, x]) : t === "after" && i && (x = _([i, x])), x;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/helpers/getNextFocus.js
function oo(e, t, n, r, i, a, o, s = 0) {
	if (s > 365) return;
	let c = ao(e, t, n.date, r, i, a, o), l = !!(a.disabled && $i(c, a.disabled, o)), u = !!(a.hidden && $i(c, a.hidden, o)), d = new mi(c, c, o);
	return !l && !u ? d : oo(e, t, d, r, i, a, o, s + 1);
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/useFocus.js
function so(e, t, n, r, i) {
	let { autoFocus: a } = e, [o, s] = ue(), c = io(t.days, n, r || (() => !1), o), [l, u] = ue(a ? c : void 0);
	return {
		isFocusTarget: (e) => !!c?.isEqualTo(e),
		setFocused: u,
		focused: l,
		blur: () => {
			s(l), u(void 0);
		},
		moveFocus: (n, r) => {
			if (!l) return;
			let a = oo(n, r, l, t.navStart, t.navEnd, e, i);
			a && (e.disableNavigation && !t.days.some((e) => e.isEqualTo(a)) || (t.goToDay(a), u(a)));
		}
	};
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/selection/useMulti.js
function co(e, t) {
	let { selected: n, required: r, onSelect: i } = e, [a, o] = eo(n, i ? n : void 0), s = i ? n : a, { isSameDay: c } = t, l = (e) => s?.some((t) => c(t, e)) ?? !1, { min: u, max: d } = e;
	return {
		selected: s,
		select: (e, t, n) => {
			let a = [...s ?? []];
			if (l(e)) {
				if (s?.length === u || r && s?.length === 1) return;
				a = s?.filter((t) => !c(t, e));
			} else a = s?.length === d ? [e] : [...a, e];
			return i || o(a), i?.(a, e, t, n), a;
		},
		isSelected: l
	};
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/utils/addToRange.js
function lo(e, t, n = 0, r = 0, i = !1, a = pi) {
	let { from: o, to: s } = t || {}, { isSameDay: c, isAfter: l, isBefore: u } = a, d;
	if (!o && !s) d = {
		from: e,
		to: n > 0 ? void 0 : e
	};
	else if (o && !s) d = c(o, e) ? n === 0 ? {
		from: o,
		to: e
	} : i ? {
		from: o,
		to: void 0
	} : void 0 : u(e, o) ? {
		from: e,
		to: o
	} : {
		from: o,
		to: e
	};
	else if (o && s) if (c(o, e) && c(s, e)) d = i ? {
		from: o,
		to: s
	} : void 0;
	else if (c(o, e)) d = {
		from: o,
		to: n > 0 ? void 0 : e
	};
	else if (c(s, e)) d = {
		from: e,
		to: n > 0 ? void 0 : e
	};
	else if (u(e, o)) d = {
		from: e,
		to: s
	};
	else if (l(e, o)) d = {
		from: o,
		to: e
	};
	else if (l(e, s)) d = {
		from: o,
		to: e
	};
	else throw Error("Invalid range");
	if (d?.from && d?.to) {
		let t = a.differenceInCalendarDays(d.to, d.from);
		(r > 0 && t > r || n > 1 && t < n) && (d = {
			from: e,
			to: void 0
		});
	}
	return d;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/utils/rangeContainsDayOfWeek.js
function uo(e, t, n = pi) {
	let r = Array.isArray(t) ? t : [t], i = e.from, a = n.differenceInCalendarDays(e.to, e.from), o = Math.min(a, 6);
	for (let e = 0; e <= o; e++) {
		if (r.includes(i.getDay())) return !0;
		i = n.addDays(i, 1);
	}
	return !1;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/utils/rangeOverlaps.js
function fo(e, t, n = pi) {
	return Ki(e, t.from, !1, n) || Ki(e, t.to, !1, n) || Ki(t, e.from, !1, n) || Ki(t, e.to, !1, n);
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/utils/rangeContainsModifiers.js
function po(e, t, n = pi) {
	let r = Array.isArray(t) ? t : [t];
	if (r.filter((e) => typeof e != "function").some((t) => typeof t == "boolean" ? t : n.isDate(t) ? Ki(e, t, !1, n) : Qi(t, n) ? t.some((t) => Ki(e, t, !1, n)) : Ji(t) ? t.from && t.to ? fo(e, {
		from: t.from,
		to: t.to
	}, n) : !1 : Zi(t) ? uo(e, t.dayOfWeek, n) : qi(t) ? n.isAfter(t.before, t.after) ? fo(e, {
		from: n.addDays(t.after, 1),
		to: n.addDays(t.before, -1)
	}, n) : $i(e.from, t, n) || $i(e.to, t, n) : Yi(t) || Xi(t) ? $i(e.from, t, n) || $i(e.to, t, n) : !1)) return !0;
	let i = r.filter((e) => typeof e == "function");
	if (i.length) {
		let t = e.from, r = n.differenceInCalendarDays(e.to, e.from);
		for (let e = 0; e <= r; e++) {
			if (i.some((e) => e(t))) return !0;
			t = n.addDays(t, 1);
		}
	}
	return !1;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/selection/useRange.js
function mo(e, t) {
	let { disabled: n, excludeDisabled: r, resetOnSelect: i, selected: a, required: o, onSelect: s } = e, [c, l] = eo(a, s ? a : void 0), u = s ? a : c;
	return {
		selected: u,
		select: (a, c, d) => {
			let { min: f, max: p } = e, m;
			if (a) {
				let e = u?.from, n = u?.to, r = !!e && !!n, s = !!e && !!n && t.isSameDay(e, n) && t.isSameDay(a, e);
				m = i && (r || !u?.from) ? !o && s ? void 0 : {
					from: a,
					to: void 0
				} : lo(a, u, f, p, o, t);
			}
			return r && n && m?.from && m.to && po({
				from: m.from,
				to: m.to
			}, n, t) && (m.from = a, m.to = void 0), s || l(m), s?.(m, a, c, d), m;
		},
		isSelected: (e) => u && Ki(u, e, !1, t)
	};
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/selection/useSingle.js
function ho(e, t) {
	let { selected: n, required: r, onSelect: i } = e, [a, o] = eo(n, i ? n : void 0), s = i ? n : a, { isSameDay: c } = t;
	return {
		selected: s,
		select: (e, t, n) => {
			let a = e;
			return !r && s && s && c(e, s) && (a = void 0), i || o(a), i?.(a, e, t, n), a;
		},
		isSelected: (e) => s ? c(s, e) : !1
	};
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/useSelection.js
function go(e, t) {
	let n = ho(e, t), r = co(e, t), i = mo(e, t);
	switch (e.mode) {
		case "single": return n;
		case "multiple": return r;
		case "range": return i;
		default: return;
	}
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/utils/toTimeZone.js
function $(e, t) {
	return e instanceof W && e.timeZone === t ? e : new W(e, t);
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/utils/convertMatchersToTimeZone.js
function _o(e, t, n) {
	if (!n) return $(e, t);
	let r = $(e, t), i = new W(r.getFullYear(), r.getMonth(), r.getDate(), 12, 0, 0, t);
	return new Date(i.getTime());
}
function vo(e, t, n) {
	return typeof e == "boolean" || typeof e == "function" ? e : e instanceof Date ? _o(e, t, n) : Array.isArray(e) ? e.map((e) => e instanceof Date ? _o(e, t, n) : e) : Ji(e) ? {
		...e,
		from: e.from ? $(e.from, t) : e.from,
		to: e.to ? $(e.to, t) : e.to
	} : qi(e) ? {
		before: _o(e.before, t, n),
		after: _o(e.after, t, n)
	} : Yi(e) ? { after: _o(e.after, t, n) } : Xi(e) ? { before: _o(e.before, t, n) } : e;
}
function yo(e, t, n) {
	return e && (Array.isArray(e) ? e.map((e) => vo(e, t, n)) : vo(e, t, n));
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.4/node_modules/react-day-picker/dist/esm/DayPicker.js
function bo(e) {
	let t = e, n = t.timeZone;
	if (n && (t = {
		...e,
		timeZone: n
	}, t.today &&= $(t.today, n), t.month &&= $(t.month, n), t.defaultMonth &&= $(t.defaultMonth, n), t.startMonth &&= $(t.startMonth, n), t.endMonth &&= $(t.endMonth, n), t.mode === "single" && t.selected ? t.selected = $(t.selected, n) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((e) => $(e, n)) : t.mode === "range" && t.selected && (t.selected = {
		from: t.selected.from ? $(t.selected.from, n) : t.selected.from,
		to: t.selected.to ? $(t.selected.to, n) : t.selected.to
	}), t.disabled !== void 0 && (t.disabled = yo(t.disabled, n)), t.hidden !== void 0 && (t.hidden = yo(t.hidden, n)), t.modifiers)) {
		let e = {};
		Object.keys(t.modifiers).forEach((r) => {
			e[r] = yo(t.modifiers?.[r], n);
		}), t.modifiers = e;
	}
	let { components: r, formatters: i, labels: a, dateLib: o, locale: s, classNames: c } = ce(() => {
		let e = {
			...di,
			...t.locale
		}, n = t.broadcastCalendar ? 1 : t.weekStartsOn, r = t.noonSafe && t.timeZone ? Ia(t.timeZone, {
			weekStartsOn: n,
			locale: e
		}) : void 0, i = t.dateLib && r ? {
			...r,
			...t.dateLib
		} : t.dateLib ?? r, a = new fi({
			locale: e,
			weekStartsOn: n,
			firstWeekContainsDate: t.firstWeekContainsDate,
			useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
			useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
			timeZone: t.timeZone,
			numerals: t.numerals
		}, i);
		return {
			dateLib: a,
			components: na(t.components),
			formatters: ha(t.formatters),
			labels: ja(t.labels, a.options),
			locale: e,
			classNames: {
				...ia(),
				...t.classNames
			}
		};
	}, [
		t.locale,
		t.broadcastCalendar,
		t.weekStartsOn,
		t.firstWeekContainsDate,
		t.useAdditionalWeekYearTokens,
		t.useAdditionalDayOfYearTokens,
		t.timeZone,
		t.numerals,
		t.dateLib,
		t.noonSafe,
		t.components,
		t.formatters,
		t.labels,
		t.classNames
	]);
	t.today || (t = {
		...t,
		today: o.today()
	});
	let { captionLayout: l, mode: u, navLayout: d, numberOfMonths: f = 1, onDayBlur: p, onDayClick: m, onDayFocus: h, onDayKeyDown: g, onDayMouseEnter: _, onDayMouseLeave: v, onNextClick: y, onPrevClick: b, showWeekNumber: x, styles: S } = t, { formatCaption: C, formatDay: w, formatMonthDropdown: T, formatWeekNumber: E, formatWeekNumberHeader: D, formatWeekdayName: ee, formatYearDropdown: O } = i, te = to(t, o), { days: k, months: A, navStart: j, navEnd: M, previousMonth: N, nextMonth: P, goToMonth: F } = te, ne = ea(k, t, j, M, o), { isSelected: I, select: re, selected: L } = go(t, o) ?? {}, { blur: R, focused: B, isFocusTarget: ie, moveFocus: ae, setFocused: oe } = so(t, te, ne, I ?? (() => !1), o), { labelDayButton: se, labelGridcell: ue, labelGrid: H, labelMonthDropdown: U, labelNav: de, labelPrevious: fe, labelNext: pe, labelWeekday: me, labelWeekNumber: he, labelWeekNumberHeader: ge, labelYearDropdown: _e } = a, ve = ce(() => Pa(o, t.ISOWeek, t.broadcastCalendar, t.today), [
		o,
		t.ISOWeek,
		t.broadcastCalendar,
		t.today
	]), ye = u !== void 0 || m !== void 0, be = V(() => {
		N && (F(N), b?.(N));
	}, [
		N,
		F,
		b
	]), xe = V(() => {
		P && (F(P), y?.(P));
	}, [
		F,
		P,
		y
	]), Se = V((e, t) => (n) => {
		n.preventDefault(), n.stopPropagation(), oe(e), !t.disabled && (re?.(e.date, t, n), m?.(e.date, t, n));
	}, [
		re,
		m,
		oe
	]), Ce = V((e, t) => (n) => {
		oe(e), h?.(e.date, t, n);
	}, [h, oe]), we = V((e, t) => (n) => {
		R(), p?.(e.date, t, n);
	}, [R, p]), Te = V((e, n) => (r) => {
		let i = {
			ArrowLeft: [r.shiftKey ? "month" : "day", t.dir === "rtl" ? "after" : "before"],
			ArrowRight: [r.shiftKey ? "month" : "day", t.dir === "rtl" ? "before" : "after"],
			ArrowDown: [r.shiftKey ? "year" : "week", "after"],
			ArrowUp: [r.shiftKey ? "year" : "week", "before"],
			PageUp: [r.shiftKey ? "year" : "month", "before"],
			PageDown: [r.shiftKey ? "year" : "month", "after"],
			Home: ["startOfWeek", "before"],
			End: ["endOfWeek", "after"]
		};
		if (i[r.key]) {
			r.preventDefault(), r.stopPropagation();
			let [e, t] = i[r.key];
			ae(e, t);
		}
		g?.(e.date, n, r);
	}, [
		ae,
		g,
		t.dir
	]), Ee = V((e, t) => (n) => {
		_?.(e.date, t, n);
	}, [_]), De = V((e, t) => (n) => {
		v?.(e.date, t, n);
	}, [v]), Oe = V((e) => (t) => {
		let n = Number(t.target.value);
		F(o.setMonth(o.startOfMonth(e), n));
	}, [o, F]), ke = V((e) => (t) => {
		let n = Number(t.target.value);
		F(o.setYear(o.startOfMonth(e), n));
	}, [o, F]), { className: Ae, style: je } = ce(() => ({
		className: [c[J.Root], t.className].filter(Boolean).join(" "),
		style: {
			...S?.[J.Root],
			...t.style
		}
	}), [
		c,
		t.className,
		t.style,
		S
	]), Me = ra(t), Ne = le(null);
	Wa(Ne, !!t.animate, {
		classNames: c,
		months: A,
		focused: B,
		dateLib: o
	});
	let Pe = {
		dayPickerProps: t,
		selected: L,
		select: re,
		isSelected: I,
		months: A,
		nextMonth: P,
		previousMonth: N,
		goToMonth: F,
		getModifiers: ne,
		components: r,
		classNames: c,
		styles: S,
		labels: a,
		formatters: i
	};
	return z.createElement(ki.Provider, { value: Pe }, z.createElement(r.Root, {
		rootRef: t.animate ? Ne : void 0,
		className: Ae,
		style: je,
		dir: t.dir,
		id: t.id,
		lang: t.lang ?? s.code,
		nonce: t.nonce,
		title: t.title,
		role: t.role,
		"aria-label": t["aria-label"],
		"aria-labelledby": t["aria-labelledby"],
		...Me
	}, z.createElement(r.Months, {
		className: c[J.Months],
		style: S?.[J.Months]
	}, !t.hideNavigation && !d && z.createElement(r.Nav, {
		"data-animated-nav": t.animate ? "true" : void 0,
		className: c[J.Nav],
		style: S?.[J.Nav],
		"aria-label": de(),
		onPreviousClick: be,
		onNextClick: xe,
		previousMonth: N,
		nextMonth: P
	}), A.map((e, n) => z.createElement(r.Month, {
		"data-animated-month": t.animate ? "true" : void 0,
		className: c[J.Month],
		style: S?.[J.Month],
		key: n,
		displayIndex: n,
		calendarMonth: e
	}, d === "around" && !t.hideNavigation && n === 0 && z.createElement(r.PreviousMonthButton, {
		type: "button",
		className: c[J.PreviousMonthButton],
		tabIndex: N ? void 0 : -1,
		"aria-disabled": N ? void 0 : !0,
		"aria-label": fe(N),
		onClick: be,
		"data-animated-button": t.animate ? "true" : void 0
	}, z.createElement(r.Chevron, {
		disabled: N ? void 0 : !0,
		className: c[J.Chevron],
		orientation: t.dir === "rtl" ? "right" : "left"
	})), z.createElement(r.MonthCaption, {
		"data-animated-caption": t.animate ? "true" : void 0,
		className: c[J.MonthCaption],
		style: S?.[J.MonthCaption],
		calendarMonth: e,
		displayIndex: n
	}, l?.startsWith("dropdown") ? z.createElement(r.DropdownNav, {
		className: c[J.Dropdowns],
		style: S?.[J.Dropdowns]
	}, (() => {
		let n = l === "dropdown" || l === "dropdown-months" ? z.createElement(r.MonthsDropdown, {
			key: "month",
			className: c[J.MonthsDropdown],
			"aria-label": U(),
			classNames: c,
			components: r,
			disabled: !!t.disableNavigation,
			onChange: Oe(e.date),
			options: Ma(e.date, j, M, i, o),
			style: S?.[J.Dropdown],
			value: o.getMonth(e.date)
		}) : z.createElement("span", { key: "month" }, T(e.date, o)), a = l === "dropdown" || l === "dropdown-years" ? z.createElement(r.YearsDropdown, {
			key: "year",
			className: c[J.YearsDropdown],
			"aria-label": _e(o.options),
			classNames: c,
			components: r,
			disabled: !!t.disableNavigation,
			onChange: ke(e.date),
			options: Fa(j, M, i, o, !!t.reverseYears),
			style: S?.[J.Dropdown],
			value: o.getYear(e.date)
		}) : z.createElement("span", { key: "year" }, O(e.date, o));
		return o.getMonthYearOrder() === "year-first" ? [a, n] : [n, a];
	})(), z.createElement("span", {
		role: "status",
		"aria-live": "polite",
		style: {
			border: 0,
			clip: "rect(0 0 0 0)",
			height: "1px",
			margin: "-1px",
			overflow: "hidden",
			padding: 0,
			position: "absolute",
			width: "1px",
			whiteSpace: "nowrap",
			wordWrap: "normal"
		}
	}, C(e.date, o.options, o))) : z.createElement(r.CaptionLabel, {
		className: c[J.CaptionLabel],
		role: "status",
		"aria-live": "polite"
	}, C(e.date, o.options, o))), d === "around" && !t.hideNavigation && n === f - 1 && z.createElement(r.NextMonthButton, {
		type: "button",
		className: c[J.NextMonthButton],
		tabIndex: P ? void 0 : -1,
		"aria-disabled": P ? void 0 : !0,
		"aria-label": pe(P),
		onClick: xe,
		"data-animated-button": t.animate ? "true" : void 0
	}, z.createElement(r.Chevron, {
		disabled: P ? void 0 : !0,
		className: c[J.Chevron],
		orientation: t.dir === "rtl" ? "left" : "right"
	})), n === f - 1 && d === "after" && !t.hideNavigation && z.createElement(r.Nav, {
		"data-animated-nav": t.animate ? "true" : void 0,
		className: c[J.Nav],
		style: S?.[J.Nav],
		"aria-label": de(),
		onPreviousClick: be,
		onNextClick: xe,
		previousMonth: N,
		nextMonth: P
	}), z.createElement(r.MonthGrid, {
		role: "grid",
		"aria-multiselectable": u === "multiple" || u === "range",
		"aria-label": H(e.date, o.options, o) || void 0,
		className: c[J.MonthGrid],
		style: S?.[J.MonthGrid]
	}, !t.hideWeekdays && z.createElement(r.Weekdays, {
		"data-animated-weekdays": t.animate ? "true" : void 0,
		className: c[J.Weekdays],
		style: S?.[J.Weekdays]
	}, x && z.createElement(r.WeekNumberHeader, {
		"aria-label": ge(o.options),
		className: c[J.WeekNumberHeader],
		style: S?.[J.WeekNumberHeader],
		scope: "col"
	}, D()), ve.map((e) => z.createElement(r.Weekday, {
		"aria-label": me(e, o.options, o),
		className: c[J.Weekday],
		key: String(e),
		style: S?.[J.Weekday],
		scope: "col"
	}, ee(e, o.options, o)))), z.createElement(r.Weeks, {
		"data-animated-weeks": t.animate ? "true" : void 0,
		className: c[J.Weeks],
		style: S?.[J.Weeks]
	}, e.weeks.map((e) => z.createElement(r.Week, {
		className: c[J.Week],
		key: e.weekNumber,
		style: S?.[J.Week],
		week: e
	}, x && z.createElement(r.WeekNumber, {
		week: e,
		style: S?.[J.WeekNumber],
		"aria-label": he(e.weekNumber, { locale: s }),
		className: c[J.WeekNumber],
		scope: "row",
		role: "rowheader"
	}, E(e.weekNumber, o)), e.days.map((e) => {
		let { date: n } = e, i = ne(e);
		if (i[Y.focused] = !i.hidden && !!B?.isEqualTo(e), i[X.selected] = I?.(n) || i.selected, Ji(L)) {
			let { from: e, to: t } = L;
			i[X.range_start] = !!(e && t && o.isSameDay(n, e)), i[X.range_end] = !!(e && t && o.isSameDay(n, t)), i[X.range_middle] = Ki(L, n, !0, o);
		}
		let a = Na(i, S, t.modifiersStyles), s = ta(i, c, t.modifiersClassNames), l = !ye && !i.hidden ? ue(n, i, o.options, o) : void 0;
		return z.createElement(r.Day, {
			key: `${e.isoDate}_${e.displayMonthId}`,
			day: e,
			modifiers: i,
			className: s.join(" "),
			style: a,
			role: "gridcell",
			"aria-selected": i.selected || void 0,
			"aria-label": l,
			"data-day": e.isoDate,
			"data-month": e.outside ? e.dateMonthId : void 0,
			"data-selected": i.selected || void 0,
			"data-disabled": i.disabled || void 0,
			"data-hidden": i.hidden || void 0,
			"data-outside": e.outside || void 0,
			"data-focused": i.focused || void 0,
			"data-today": i.today || void 0
		}, !i.hidden && ye ? z.createElement(r.DayButton, {
			className: c[J.DayButton],
			style: S?.[J.DayButton],
			type: "button",
			day: e,
			modifiers: i,
			disabled: !i.focused && i.disabled || void 0,
			"aria-disabled": i.focused && i.disabled || void 0,
			tabIndex: ie(e) ? 0 : -1,
			"aria-label": se(n, i, o.options, o),
			onClick: Se(e, i),
			onBlur: we(e, i),
			onFocus: Ce(e, i),
			onKeyDown: Te(e, i),
			onMouseEnter: Ee(e, i),
			onMouseLeave: De(e, i)
		}, w(n, o.options, o)) : !i.hidden && w(e.date, o.options, o));
	})))))))), t.footer && z.createElement(r.Footer, {
		className: c[J.Footer],
		style: S?.[J.Footer],
		role: "status",
		"aria-live": "polite"
	}, t.footer)));
}
//#endregion
//#region src/components/ui/data-entry/segmented-control.tsx
var xo = {
	default: "min-h-9 px-3 text-sm",
	sm: "min-h-8 px-2.5 text-xs"
}, So = R.forwardRef(({ className: e, fullWidth: t = !0, onValueChange: n, options: r, orientation: i = "horizontal", size: o = "default", value: s, ...c }, l) => /* @__PURE__ */ H("div", {
	ref: l,
	className: a("inline-flex rounded-[var(--sdk-radius-control)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel-muted)] p-1", i === "horizontal" ? "flex-row items-center" : "flex-col items-stretch", t ? "w-full" : "w-auto", e),
	"data-orientation": i,
	"data-sdk-ui": "segmented-control",
	"data-slot": "segmented-control",
	role: "group",
	...c,
	children: r.map((e) => {
		let r = e.value === s;
		return /* @__PURE__ */ U("button", {
			"aria-pressed": r,
			className: a("inline-flex items-center justify-center gap-2 rounded-[var(--sdk-radius-field)] font-medium transition-colors disabled:pointer-events-none disabled:opacity-50", xo[o], i === "horizontal" && t ? "flex-1" : null, r ? "bg-[var(--sdk-color-surface-elevated)] text-[var(--sdk-color-text-primary)] shadow-[var(--sdk-shadow-sm)]" : "text-[var(--sdk-color-text-secondary)] hover:bg-[var(--sdk-color-brand-primary-soft)] hover:text-[var(--sdk-color-text-primary)]"),
			disabled: e.disabled,
			onClick: () => n(e.value),
			"data-slot": "segmented-control-option",
			type: "button",
			children: [e.icon ? /* @__PURE__ */ H("span", {
				className: "shrink-0",
				children: e.icon
			}) : null, /* @__PURE__ */ H("span", {
				className: "truncate",
				children: e.label
			})]
		}, e.value);
	})
}));
So.displayName = "SegmentedControl";
//#endregion
//#region src/components/ui/data-entry/date-range-picker.tsx
function Co(e) {
	return {
		end: e?.end ?? "",
		start: e?.start ?? ""
	};
}
function wo(e, t) {
	return e.start === t.start && e.end === t.end;
}
function To(e, t) {
	return e?.find((e) => wo(Co(e.range), t))?.value ?? null;
}
function Eo(e, t) {
	if (!e) return null;
	let n = t === "date" ? `${e}T00:00` : e, r = new Date(n).getTime();
	return Number.isNaN(r) ? null : r;
}
function Do(e) {
	if (!e) return;
	let [t, n, r] = e.split("-").map(Number);
	if (!(!t || !n || !r)) return new Date(t, n - 1, r);
}
function Oo(e) {
	return `${e.getFullYear()}-${`${e.getMonth() + 1}`.padStart(2, "0")}-${`${e.getDate()}`.padStart(2, "0")}`;
}
function ko(e) {
	let t = Do(e.start), n = Do(e.end);
	if (!(!t && !n)) return {
		from: t,
		to: n
	};
}
function Ao(e) {
	return {
		end: e?.to ? Oo(e.to) : "",
		start: e?.from ? Oo(e.from) : ""
	};
}
function jo(e, t) {
	return Object.entries(t).reduce((e, [t, n]) => e.replaceAll(`{${t}}`, n), e);
}
function Mo(e, t) {
	return Do(e) ? t(e, {
		day: "numeric",
		month: "short",
		year: "numeric"
	}) : "";
}
function No(e, t, n, r) {
	return !e.start && !e.end ? t : e.start && e.end ? `${Mo(e.start, n)} - ${Mo(e.end, n)}` : e.start ? `${Mo(e.start, n)} - ${r}` : t;
}
function Po(e, t, n, r) {
	return Do(e.start) ?? t ?? Do(n ?? "") ?? Do(r ?? "") ?? /* @__PURE__ */ new Date();
}
function Fo(e, t, n, r, i) {
	if (n && e.start && e.end) {
		let i = Eo(e.start, t), a = Eo(e.end, t);
		if (i !== null && a !== null) {
			let e = n.amount * (n.unit === "day" ? 1440 * 60 * 1e3 : 3600 * 1e3);
			if (Math.abs(a - i) > e) {
				let e = n.unit === "day" ? n.amount === 1 ? r.rangeLimitDay : r.rangeLimitDays : n.amount === 1 ? r.rangeLimitHour : r.rangeLimitHours;
				return jo(r.rangeLimitExceeded, {
					amount: String(n.amount),
					unit: e
				});
			}
		}
	}
	return i?.(e) ?? null;
}
function Io(e, t, n, r) {
	let i = {
		...e,
		[t]: n
	};
	return r === "swap" && i.start && i.end && i.start > i.end ? {
		end: i.start,
		start: i.end
	} : i;
}
function Lo({ defaultPresetValue: e, defaultValue: t, onPresetValueChange: n, onValueChange: r, presetValue: a, presets: o, value: s }) {
	let c = R.useMemo(() => Co(t), [t]), l = s === void 0 ? void 0 : Co(s), u = R.useRef(!1), [d, f] = i({
		defaultValue: c,
		onChange: r,
		value: l
	}), [p, m] = i({
		defaultValue: e ?? To(o, c),
		onChange: (e) => {
			u.current || n?.(e);
		},
		value: a
	});
	return R.useEffect(() => {
		if (a !== void 0 || s === void 0) return;
		let e = To(o, d);
		u.current = !0, m(e), u.current = !1;
	}, [
		d,
		a,
		o,
		m,
		s
	]), {
		commitValue: R.useCallback((e, t) => {
			f(e), m(t);
		}, [m, f]),
		currentPresetValue: p,
		currentValue: d
	};
}
function Ro({ actions: e, className: t, defaultPresetValue: n, defaultValue: r, disabled: i = !1, endInputProps: o, endLabel: s, forwardedRef: c, invalidBehavior: l = "preserve", max: u, maxSpan: d, min: f, mode: p = "date", onPresetValueChange: m, onValidationChange: h, onValueChange: g, presetLabel: _, presetValue: v, presets: y, startInputProps: b, startLabel: x, validate: S, value: w, ...T }) {
	let E = P().messages.dateRangePicker, D = s ?? E.endDate, ee = _ ?? E.presets, O = x ?? E.startDate, { commitValue: te, currentPresetValue: k, currentValue: A } = Lo({
		defaultPresetValue: n,
		defaultValue: r,
		onPresetValueChange: m,
		onValueChange: g,
		presetValue: v,
		presets: y,
		value: w
	}), j = Fo(A, p, d, E, S), M = R.useId(), N = R.useId(), F = b?.id ?? M, ne = o?.id ?? N, I = p === "datetime-local" ? vn : _n;
	R.useEffect(() => {
		h?.(j);
	}, [h, j]);
	function re(e) {
		let t = y?.find((t) => t.value === e);
		t && te(Co(t.range), t.value);
	}
	function L(e, t) {
		let n = Io(A, e, t, l);
		te(n, To(y, n));
	}
	return /* @__PURE__ */ U("div", {
		ref: c,
		className: a("space-y-3", t),
		"data-sdk-ui": "date-range-field",
		"data-slot": "date-range-field",
		...T,
		children: [
			y?.length ? /* @__PURE__ */ U("div", {
				className: "space-y-2",
				"data-slot": "date-range-field-presets",
				children: [/* @__PURE__ */ H("div", {
					className: "text-xs font-medium uppercase tracking-[0.18em] text-[var(--sdk-color-text-muted)]",
					children: ee
				}), /* @__PURE__ */ H(So, {
					fullWidth: !1,
					onValueChange: re,
					options: y.map((e) => ({
						disabled: i || e.disabled,
						label: e.label,
						value: e.value
					})),
					size: "sm",
					value: k ?? ""
				})]
			}) : null,
			/* @__PURE__ */ U("div", {
				className: "grid gap-3 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-end",
				"data-slot": "date-range-field-inputs",
				children: [
					/* @__PURE__ */ U("div", {
						className: "space-y-2",
						"data-slot": "date-range-field-start",
						children: [/* @__PURE__ */ H(C, {
							htmlFor: F,
							children: O
						}), /* @__PURE__ */ H(I, {
							...b,
							"aria-invalid": j ? "true" : void 0,
							disabled: i || b?.disabled,
							id: F,
							max: u,
							min: f,
							value: A.start,
							onChange: (e) => L("start", e.target.value)
						})]
					}),
					/* @__PURE__ */ H("div", {
						className: "hidden pb-2 text-sm text-[var(--sdk-color-text-muted)] md:block",
						children: E.to
					}),
					/* @__PURE__ */ U("div", {
						className: "space-y-2",
						"data-slot": "date-range-field-end",
						children: [/* @__PURE__ */ H(C, {
							htmlFor: ne,
							children: D
						}), /* @__PURE__ */ H(I, {
							...o,
							"aria-invalid": j ? "true" : void 0,
							disabled: i || o?.disabled,
							id: ne,
							max: u,
							min: f,
							value: A.end,
							onChange: (e) => L("end", e.target.value)
						})]
					})
				]
			}),
			e ? /* @__PURE__ */ H("div", {
				className: "flex flex-wrap items-center justify-end gap-2",
				"data-slot": "date-range-field-actions",
				children: e
			}) : null,
			j ? /* @__PURE__ */ H("p", {
				className: "text-sm text-[var(--sdk-color-state-danger)]",
				"data-slot": "date-range-field-error",
				role: "alert",
				children: j
			}) : null
		]
	});
}
var zo = {
	[Y.disabled]: "text-[var(--sdk-color-text-muted)] opacity-40",
	[Y.outside]: "text-[var(--sdk-color-text-muted)] opacity-35",
	[Y.today]: "text-[var(--sdk-color-brand-primary)]",
	[X.range_end]: "rounded-[var(--sdk-radius-control)] bg-[var(--sdk-color-brand-primary)] text-[var(--sdk-color-text-inverse)]",
	[X.range_middle]: "bg-[var(--sdk-color-brand-primary-soft)] text-[var(--sdk-color-text-primary)]",
	[X.range_start]: "rounded-[var(--sdk-radius-control)] bg-[var(--sdk-color-brand-primary)] text-[var(--sdk-color-text-inverse)]",
	[X.selected]: "bg-[var(--sdk-color-brand-primary-soft)] text-[var(--sdk-color-text-primary)]",
	[J.CaptionLabel]: "text-sm font-semibold text-[var(--sdk-color-text-primary)]",
	[J.Day]: "flex h-10 w-10 items-center justify-center text-sm [&:has([aria-selected=true])]:bg-[var(--sdk-color-brand-primary-soft)] [&:has([aria-selected=true])]:text-[var(--sdk-color-text-primary)]",
	[J.DayButton]: a(c({
		size: "sm",
		variant: "ghost"
	}), "h-10 w-10 rounded-[var(--sdk-radius-control)] p-0 font-normal aria-selected:opacity-100"),
	[J.Month]: "space-y-3 rounded-[var(--sdk-radius-field)] border border-[var(--sdk-color-border-subtle)] bg-[var(--sdk-color-surface-panel)] p-3",
	[J.MonthCaption]: "relative flex items-center justify-center pt-1",
	[J.MonthGrid]: "w-full border-collapse",
	[J.Months]: "flex flex-col gap-3 md:flex-row",
	[J.Nav]: "absolute inset-x-0 top-1 flex items-center justify-between",
	[J.NextMonthButton]: a(c({
		size: "sm",
		variant: "ghost"
	}), "h-8 w-8 rounded-[var(--sdk-radius-control)] p-0"),
	[J.PreviousMonthButton]: a(c({
		size: "sm",
		variant: "ghost"
	}), "h-8 w-8 rounded-[var(--sdk-radius-control)] p-0"),
	[J.Week]: "mt-1 flex w-full",
	[J.Weekday]: "w-10 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--sdk-color-text-muted)]",
	[J.Weekdays]: "mb-1 flex",
	[J.Weeks]: "space-y-1"
}, Bo = R.forwardRef((e, t) => /* @__PURE__ */ H(Ro, {
	...e,
	forwardedRef: t,
	mode: "date"
}));
Bo.displayName = "DateRangeField";
var Vo = R.forwardRef((e, t) => /* @__PURE__ */ H(Ro, {
	...e,
	"data-sdk-ui": "date-time-range-field",
	forwardedRef: t,
	mode: "datetime-local"
}));
Vo.displayName = "DateTimeRangeField";
var Ho = R.forwardRef(({ actions: e, className: t, defaultMonth: n, defaultPresetValue: r, defaultValue: i, disabled: s = !1, max: c, maxSpan: l, min: u, numberOfMonths: d = 2, onPresetValueChange: f, onValidationChange: p, onValueChange: m, placeholder: h, presetLabel: g, presetValue: _, presets: v, slotProps: b, validate: x, value: S, ...C }, w) => {
	let T = P(), E = T.messages.dateRangePicker, D = h ?? E.placeholder, ee = g ?? E.presets, { commitValue: O, currentPresetValue: te, currentValue: k } = Lo({
		defaultPresetValue: r,
		defaultValue: i,
		onPresetValueChange: f,
		onValueChange: m,
		presetValue: _,
		presets: v,
		value: S
	}), [A, j] = R.useState(!1), M = Fo(k, "date", l, E, x), N = ko(k), L = R.useMemo(() => Po(k, n, u, c), [
		k,
		n,
		c,
		u
	]), [z, B] = R.useState(L), ie = R.useMemo(() => {
		let e = [], t = Do(u ?? ""), n = Do(c ?? "");
		return t && e.push({ before: t }), n && e.push({ after: n }), e.length > 0 ? e : void 0;
	}, [c, u]);
	R.useEffect(() => {
		B(L);
	}, [L]), R.useEffect(() => {
		p?.(M);
	}, [p, M]);
	function V(e) {
		let t = v?.find((t) => t.value === e);
		if (!t) return;
		let r = Co(t.range);
		O(r, t.value), B(Po(r, n, u, c)), j(!1);
	}
	function ae(e) {
		let t = Ao(e);
		O(t, To(v, t)), B(e?.from ?? Po(t, n, u, c)), e?.from && e?.to && j(!1);
	}
	return /* @__PURE__ */ H("div", {
		ref: w,
		className: a("space-y-2", t),
		"data-sdk-ui": "date-range-picker",
		"data-slot": "date-range-picker",
		...C,
		children: /* @__PURE__ */ U(I, {
			open: A,
			onOpenChange: j,
			children: [/* @__PURE__ */ H(F, {
				asChild: !0,
				children: /* @__PURE__ */ U("button", {
					"aria-expanded": A,
					"aria-invalid": M ? "true" : void 0,
					...o({
						className: a(re, "justify-between gap-3 text-left", M ? "border-[var(--sdk-color-state-danger)]" : void 0),
						"data-sdk-ui": "date-range-picker-trigger",
						"data-slot": "date-range-picker-trigger",
						type: "button"
					}, b?.trigger),
					disabled: s,
					children: [/* @__PURE__ */ U("span", {
						className: "flex min-w-0 items-center gap-3",
						"data-slot": "date-range-picker-trigger-value",
						children: [/* @__PURE__ */ H(fe, { className: "h-4 w-4 shrink-0 text-[var(--sdk-color-text-muted)]" }), /* @__PURE__ */ H("span", {
							className: a("truncate", !k.start && !k.end ? "text-[var(--sdk-color-text-muted)]" : void 0),
							children: No(k, D, T.formatters.formatDate, E.selectEndDate)
						})]
					}), /* @__PURE__ */ H(y, { className: "h-4 w-4 shrink-0 text-[var(--sdk-color-text-muted)]" })]
				})
			}), /* @__PURE__ */ U(ne, {
				align: "start",
				...o({
					className: "w-auto min-w-[22rem] space-y-4 p-4",
					"data-sdk-ui": "date-range-picker-content",
					"data-slot": "date-range-picker-content",
					sideOffset: 8
				}, b?.content),
				children: [
					v?.length ? /* @__PURE__ */ U("div", {
						...o({
							className: "space-y-2",
							"data-slot": "date-range-picker-presets"
						}, b?.presets),
						children: [/* @__PURE__ */ H("div", {
							className: "text-xs font-medium uppercase tracking-[0.18em] text-[var(--sdk-color-text-muted)]",
							children: ee
						}), /* @__PURE__ */ H(So, {
							fullWidth: !1,
							onValueChange: V,
							options: v.map((e) => ({
								disabled: s || e.disabled,
								label: e.label,
								value: e.value
							})),
							size: "sm",
							value: te ?? ""
						})]
					}) : null,
					/* @__PURE__ */ H("div", {
						...o({
							className: "rounded-[var(--sdk-radius-field)] border border-[var(--sdk-color-border-subtle)] bg-[var(--sdk-color-surface-panel-muted)] p-3",
							"data-sdk-ui": "date-range-picker-calendar",
							"data-slot": "date-range-picker-calendar"
						}, b?.calendar),
						children: /* @__PURE__ */ H(bo, {
							animate: !0,
							autoFocus: A,
							classNames: zo,
							disabled: ie,
							mode: "range",
							month: z,
							numberOfMonths: d,
							onMonthChange: B,
							onSelect: ae,
							selected: N,
							showOutsideDays: !1
						})
					}),
					(e || M) && /* @__PURE__ */ U("div", {
						...o({
							className: "flex flex-wrap items-center justify-between gap-3",
							"data-slot": "date-range-picker-footer"
						}, b?.footer),
						children: [M ? /* @__PURE__ */ H("p", {
							...o({
								className: "text-sm text-[var(--sdk-color-state-danger)]",
								"data-slot": "date-range-picker-error",
								role: "alert"
							}, b?.error),
							children: M
						}) : /* @__PURE__ */ H("span", {}), e ? /* @__PURE__ */ H("div", {
							className: "flex flex-wrap items-center gap-2",
							children: e
						}) : null]
					})
				]
			})]
		})
	});
});
Ho.displayName = "DateRangePicker";
//#endregion
//#region src/components/ui/data-entry/number-input.tsx
function Uo(e, t, n) {
	return typeof t == "number" && e < t ? t : typeof n == "number" && e > n ? n : e;
}
function Wo(e) {
	if (typeof e == "number" && Number.isFinite(e)) return e;
	if (typeof e == "string") {
		let t = Number(e);
		if (Number.isFinite(t)) return t;
	}
}
var Go = R.forwardRef(({ className: e, defaultValue: t, max: n, min: s, onChange: c, onValueChange: l, slotProps: u, step: d = 1, value: f, ...p }, m) => {
	let h = R.useRef(null), g = Wo(s), _ = Wo(n), [v, b] = i({
		defaultValue: t ?? null,
		onChange: l,
		value: f === void 0 ? void 0 : f
	}), x = R.useCallback((e) => {
		let t = e.target.value.trim();
		if (c?.(e), t === "") {
			b(null);
			return;
		}
		let n = Number(t);
		Number.isNaN(n) || b(n);
	}, [c, b]), S = R.useCallback((e) => {
		let n = Wo(d) ?? 1;
		b(Uo((typeof v == "number" ? v : typeof t == "number" ? t : 0) + n * e, g, _));
	}, [
		v,
		t,
		_,
		g,
		b,
		d
	]);
	return /* @__PURE__ */ U("div", {
		...o({
			className: "relative",
			"data-sdk-ui": "number-input",
			"data-slot": "number-input"
		}, u?.root),
		children: [/* @__PURE__ */ H("input", {
			ref: ke(m, h),
			className: a(re, "rounded-[var(--sdk-radius-field)] pr-11 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none", e),
			"data-sdk-ui": "number-input-field",
			"data-slot": "number-input-input",
			inputMode: "decimal",
			max: n,
			min: s,
			onChange: x,
			step: d,
			type: "number",
			value: v ?? "",
			...p
		}), /* @__PURE__ */ U("div", {
			...o({
				className: "absolute inset-y-1 right-1 flex w-8 flex-col overflow-hidden rounded-[var(--sdk-radius-control)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel-muted)]",
				"data-sdk-ui": "number-input-stepper",
				"data-slot": "number-input-stepper"
			}, u?.stepper),
			children: [/* @__PURE__ */ H("button", {
				"aria-label": "Increase value",
				...o({
					className: "flex flex-1 items-center justify-center text-[var(--sdk-color-text-secondary)] transition-colors hover:bg-[var(--sdk-color-surface-elevated)] hover:text-[var(--sdk-color-text-primary)]",
					"data-slot": "number-input-increment"
				}, u?.incrementButton),
				onClick: (e) => {
					u?.incrementButton?.onClick?.(e), e.defaultPrevented || S(1);
				},
				type: "button",
				children: /* @__PURE__ */ H(r, { className: "h-3.5 w-3.5" })
			}), /* @__PURE__ */ H("button", {
				"aria-label": "Decrease value",
				...o({
					className: "flex flex-1 items-center justify-center border-t border-[var(--sdk-color-border-default)] text-[var(--sdk-color-text-secondary)] transition-colors hover:bg-[var(--sdk-color-surface-elevated)] hover:text-[var(--sdk-color-text-primary)]",
					"data-slot": "number-input-decrement"
				}, u?.decrementButton),
				onClick: (e) => {
					u?.decrementButton?.onClick?.(e), e.defaultPrevented || S(-1);
				},
				type: "button",
				children: /* @__PURE__ */ H(y, { className: "h-3.5 w-3.5" })
			})]
		})]
	});
});
Go.displayName = "NumberInput";
//#endregion
//#region src/components/ui/data-entry/tag-input.tsx
var Ko = [
	"Enter",
	"Tab",
	","
];
function qo(e) {
	return e.trim().replace(/^#+/, "");
}
var Jo = R.forwardRef(({ allowDuplicates: e = !1, className: t, defaultValue: n, maxTags: r, onValueChange: s, placeholder: c = "Add tag", slotProps: l, value: u, ...d }, f) => {
	let [p, m] = R.useState(""), [h, g] = i({
		defaultValue: n ?? [],
		onChange: s,
		value: u
	}), _ = r === void 0 || h.length < r, { "aria-label": v, onChange: y, onKeyDown: b, ...x } = d, S = !!x.disabled;
	function C(e) {
		g(e);
	}
	function T(t) {
		let n = qo(t);
		!n || !_ || !e && h.some((e) => e.toLowerCase() === n.toLowerCase()) || (C([...h, n]), m(""));
	}
	function E(e) {
		C(h.filter((t) => t !== e));
	}
	return /* @__PURE__ */ U("div", {
		...o({
			className: a(re, "h-auto min-h-10 flex-wrap items-center gap-2 px-2 py-2", S ? "opacity-60" : void 0, t),
			"data-disabled": S ? "true" : "false",
			"data-sdk-ui": "tag-input",
			"data-slot": "tag-input"
		}, l?.root),
		children: [h.map((e) => /* @__PURE__ */ ie("span", {
			...o({
				className: "inline-flex items-center gap-1 rounded-[var(--sdk-radius-pill)] border border-[var(--sdk-color-border-subtle)] bg-[var(--sdk-color-surface-panel-muted)] px-2.5 py-1 text-xs font-medium text-[var(--sdk-color-text-secondary)]",
				"data-sdk-ui": "tag-input-tag",
				"data-slot": "tag-input-tag"
			}, l?.tag),
			key: e
		}, /* @__PURE__ */ H(we, { className: "h-3 w-3" }), /* @__PURE__ */ H("span", { children: e }), /* @__PURE__ */ H("button", {
			"aria-label": `Remove ${e}`,
			...o({
				className: "rounded-[var(--sdk-radius-pill)] p-0.5 text-[var(--sdk-color-text-muted)] transition-colors hover:bg-[var(--sdk-color-surface-elevated)] hover:text-[var(--sdk-color-text-primary)]",
				"data-sdk-ui": "tag-input-remove-button",
				"data-slot": "tag-input-remove"
			}, l?.removeButton),
			onClick: (t) => {
				l?.removeButton?.onClick?.(t), !t.defaultPrevented && !S && E(e);
			},
			disabled: S,
			type: "button",
			children: /* @__PURE__ */ H(w, { className: "h-3 w-3" })
		}))), _ ? /* @__PURE__ */ H("input", {
			"aria-label": v,
			className: "min-w-[8rem] flex-1 bg-transparent text-sm text-[var(--sdk-color-text-primary)] outline-none placeholder:text-[var(--sdk-color-text-muted)]",
			"data-sdk-ui": "tag-input-input",
			"data-slot": "tag-input-input",
			onChange: (e) => {
				if (y?.(e), e.defaultPrevented) return;
				let t = e.target.value;
				if (t.includes(",")) {
					let e = t.split(","), n = e.shift();
					n && T(n), m(e.join(","));
					return;
				}
				m(t);
			},
			onKeyDown: (e) => {
				if (b?.(e), !e.defaultPrevented) {
					if (Ko.includes(e.key)) {
						p.trim() && (e.preventDefault(), T(p));
						return;
					}
					e.key === "Backspace" && !p && h.length > 0 && (e.preventDefault(), E(h[h.length - 1]));
				}
			},
			placeholder: c,
			ref: f,
			type: "text",
			value: p,
			...x
		}) : null]
	});
});
Jo.displayName = "TagInput";
//#endregion
//#region src/components/ui/data-entry/upload/upload-dropzone.tsx
function Yo(e) {
	return e === "image" ? Te : e === "video" ? De : e === "audio" ? Ee : e === "document" ? t : me;
}
function Xo({ caption: e, description: t, disabled: n = !1, isDragging: r, onBrowse: i, onDragLeave: o, onDragOver: s, onDrop: c, onPaste: l, title: u, variant: d }) {
	let f = Yo(d);
	return /* @__PURE__ */ H("div", {
		"aria-disabled": n,
		className: a("rounded-[var(--sdk-radius-control)] border border-dashed px-5 py-6 transition-colors", r ? "border-[var(--sdk-color-brand-primary)] bg-[var(--sdk-color-brand-primary-soft)]" : "border-[var(--sdk-color-border-strong)] bg-[var(--sdk-color-surface-panel)]", n && "cursor-not-allowed opacity-60"),
		"data-sdk-ui": "upload-dropzone",
		"data-slot": "upload-dropzone",
		onClick: () => {
			n || i();
		},
		onDragLeave: o,
		onDragOver: s,
		onDrop: c,
		onPaste: l,
		onKeyDown: (e) => {
			n || (e.key === "Enter" || e.key === " ") && (e.preventDefault(), i());
		},
		role: "button",
		tabIndex: n ? -1 : 0,
		children: /* @__PURE__ */ U("div", {
			className: "flex items-start gap-4",
			children: [/* @__PURE__ */ H("div", {
				className: "rounded-[var(--sdk-radius-control)] bg-[var(--sdk-color-brand-primary-soft)] p-3 text-[var(--sdk-color-brand-primary)]",
				"data-slot": "upload-dropzone-icon",
				children: /* @__PURE__ */ H(f, { className: "h-5 w-5" })
			}), /* @__PURE__ */ U("div", {
				className: "space-y-1",
				children: [
					/* @__PURE__ */ H("p", {
						className: "text-sm font-medium text-[var(--sdk-color-text-primary)]",
						"data-slot": "upload-dropzone-title",
						children: u
					}),
					/* @__PURE__ */ H("p", {
						className: "text-sm text-[var(--sdk-color-text-secondary)]",
						"data-slot": "upload-dropzone-description",
						children: t
					}),
					e ? /* @__PURE__ */ H("p", {
						className: "text-xs text-[var(--sdk-color-text-muted)]",
						"data-slot": "upload-dropzone-caption",
						children: e
					}) : null
				]
			})]
		})
	});
}
Xo.displayName = "UploadDropzone";
//#endregion
//#region src/components/ui/data-entry/upload/upload-utils.ts
var Zo = /* @__PURE__ */ ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.csv,.txt,.md,.json,.zip,.rar,.7z,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,text/plain,text/markdown,text/csv,application/json,application/zip,application/x-rar-compressed,application/x-7z-compressed".split(","), Qo = {
	file: {
		accept: "*",
		label: "Upload files",
		listType: "list",
		emptyStateTitle: "Click to upload or drag files here",
		helperText: "All file types are supported."
	},
	image: {
		accept: "image/*",
		label: "Upload images",
		listType: "grid",
		emptyStateTitle: "Click to upload or drag images here",
		helperText: "Image formats such as PNG, JPG, GIF, WEBP, and SVG are supported."
	},
	video: {
		accept: "video/*",
		label: "Upload videos",
		listType: "list",
		emptyStateTitle: "Click to upload or drag videos here",
		helperText: "MP4, MOV, WEBM, and other browser-supported video formats are supported."
	},
	audio: {
		accept: "audio/*",
		label: "Upload audio",
		listType: "list",
		emptyStateTitle: "Click to upload or drag audio files here",
		helperText: "MP3, WAV, AAC, FLAC, and other browser-supported audio formats are supported."
	},
	document: {
		accept: Zo,
		label: "Upload documents",
		listType: "list",
		emptyStateTitle: "Click to upload or drag documents here",
		helperText: "PDF, Office files, markdown, text, JSON, and archive attachments are supported."
	}
};
function $o(e) {
	let t = e.toLowerCase(), n = t.lastIndexOf(".");
	return n === -1 ? "" : t.slice(n);
}
function es() {
	return typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `sdk-file-${Math.random().toString(36).slice(2, 10)}`;
}
function ts(e) {
	return e < 1024 ? `${e} B` : e < 1024 * 1024 ? `${(e / 1024).toFixed(1)} KB` : e < 1024 * 1024 * 1024 ? `${(e / (1024 * 1024)).toFixed(1)} MB` : `${(e / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}
function ns(e) {
	return e ? Array.isArray(e) ? e.join(",") : e : "*";
}
function rs(e, t) {
	let n = ns(t);
	return !n || n === "*" ? !0 : n.split(",").map((e) => e.trim()).filter(Boolean).some((t) => t.startsWith(".") ? e.name.toLowerCase().endsWith(t.toLowerCase()) : t.endsWith("/*") ? e.type.startsWith(t.slice(0, -1)) : e.type === t);
}
function is(e) {
	return Qo[e];
}
function as(e, t) {
	return "kind" in e && e.kind ? e.kind : e.type.startsWith("image/") ? "image" : e.type.startsWith("video/") ? "video" : e.type.startsWith("audio/") ? "audio" : Zo.includes($o(e.name)) ? "document" : t;
}
function os(e) {
	return e === "image" || e === "video" || e === "audio";
}
function ss(e, t) {
	return e === "uploading" ? typeof t == "number" ? `Uploading ${Math.round(t)}%` : "Uploading" : e === "success" ? "Uploaded" : e === "error" ? "Failed" : "Ready";
}
function cs(e, t) {
	let n = [];
	return Number.isFinite(e) && n.push(`Up to ${e} file${e === 1 ? "" : "s"}`), Number.isFinite(t) && n.push(`Max ${ts(t)} each`), n.join(" / ");
}
function ls(e) {
	let t = $o(e);
	return t ? t.replace(".", "").toUpperCase() : "FILE";
}
function us(e) {
	return e ? e.files?.length ? Array.from(e.files) : e.items?.length ? Array.from(e.items).map((e) => e.getAsFile()).filter((e) => e instanceof File) : [] : [];
}
//#endregion
//#region src/components/ui/data-entry/upload/use-upload-previews.ts
function ds(e) {
	typeof URL < "u" && typeof URL.revokeObjectURL == "function" && URL.revokeObjectURL(e);
}
function fs(e, t) {
	let n = R.useRef({}), [r, i] = R.useState({});
	return R.useEffect(() => {
		let r = { ...n.current }, a = !1, o = new Set(e.map((e) => e.id));
		e.forEach((e) => {
			let n = e.previewUrl ?? e.url, i = as(e, t);
			if (n || !e.file || !os(i)) {
				r[e.id] && (ds(r[e.id]), delete r[e.id], a = !0);
				return;
			}
			r[e.id] || typeof URL > "u" || typeof URL.createObjectURL != "function" || (r[e.id] = URL.createObjectURL(e.file), a = !0);
		}), Object.entries(r).forEach(([e, t]) => {
			o.has(e) || (ds(t), delete r[e], a = !0);
		}), a && (n.current = r, i(r));
	}, [t, e]), R.useEffect(() => () => {
		Object.values(n.current).forEach((e) => ds(e)), n.current = {};
	}, []), { getPreviewUrl(e) {
		return e.previewUrl ?? e.url ?? r[e.id];
	} };
}
//#endregion
//#region src/components/ui/data-entry/upload/upload-item.tsx
function ps(e) {
	return e.filter(Boolean).join(" / ");
}
function ms(e) {
	typeof window > "u" || typeof window.open != "function" || window.open(e, "_blank", "noopener,noreferrer");
}
function hs(e, t) {
	if (typeof document > "u") return;
	let n = document.createElement("a");
	n.href = e, n.download = t, n.rel = "noopener noreferrer", n.target = "_blank", n.click();
}
function gs(e) {
	let n = e.toLowerCase();
	return n.endsWith(".zip") || n.endsWith(".rar") || n.endsWith(".7z") ? _e : n.endsWith(".xls") || n.endsWith(".xlsx") || n.endsWith(".csv") ? Ce : n.endsWith(".json") ? ve : n.endsWith(".md") ? ye : t;
}
function _s(e, t) {
	return t === "image" ? xe : t === "video" ? Se : t === "audio" ? be : gs(e.name);
}
function vs(e, t, n, r = !1) {
	return t === "image" && n ? /* @__PURE__ */ H("img", {
		alt: `Preview ${e.name}`,
		className: "h-full w-full object-cover",
		src: n
	}) : t === "video" && n ? /* @__PURE__ */ H("video", {
		"aria-label": `Preview ${e.name}`,
		className: "h-full w-full object-cover",
		controls: !r,
		muted: !0,
		playsInline: !0,
		preload: "metadata",
		src: n
	}) : null;
}
function ys({ disabled: e = !1, fallbackVariant: t, item: n, listType: r, onDownload: i, onRemove: o, onPreview: s, onRetry: c, previewUrl: u }) {
	let d = as(n, t), f = _s(n, d), p = n.status === "uploading" && typeof n.progress == "number", m = n.status === "error" && n.error ? n.error : ss(n.status, n.progress), h = vs(n, d, u, r === "grid"), g = r === "grid", _ = u ?? n.previewUrl ?? n.url, v = n.url ?? u ?? n.previewUrl, y = !!(n.previewUrl || n.url), x = !!(n.url || n.previewUrl), C = !!(s || y), T = !!(i || x), E = !!(c && n.status === "error" && !e), D = h || d === "audio" && u ? `Open preview ${n.name}` : `Preview ${n.name}`, ee = C || T || E ? /* @__PURE__ */ U("div", {
		className: "flex flex-wrap items-center gap-2",
		children: [
			C ? /* @__PURE__ */ U(l, {
				"aria-label": D,
				onClick: () => {
					if (s) {
						s(n);
						return;
					}
					_ && ms(_);
				},
				size: "sm",
				type: "button",
				variant: "ghost",
				children: [/* @__PURE__ */ H(ge, { className: "h-4 w-4" }), /* @__PURE__ */ H("span", { children: "Preview" })]
			}) : null,
			T ? /* @__PURE__ */ U(l, {
				"aria-label": `Download ${n.name}`,
				onClick: () => {
					if (i) {
						i(n);
						return;
					}
					v && hs(v, n.name);
				},
				size: "sm",
				type: "button",
				variant: "ghost",
				children: [/* @__PURE__ */ H(he, { className: "h-4 w-4" }), /* @__PURE__ */ H("span", { children: "Download" })]
			}) : null,
			E ? /* @__PURE__ */ U(l, {
				"aria-label": `Retry ${n.name}`,
				onClick: () => c?.(n),
				size: "sm",
				type: "button",
				variant: "outline",
				children: [/* @__PURE__ */ H(S, { className: "h-4 w-4" }), /* @__PURE__ */ H("span", { children: "Retry" })]
			}) : null
		]
	}) : null;
	return g ? /* @__PURE__ */ U("div", {
		className: "rounded-[var(--sdk-radius-control)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] shadow-[var(--sdk-shadow-sm)]",
		"data-sdk-ui": "upload-item",
		"data-sdk-variant": "grid",
		"data-slot": "upload-item",
		children: [/* @__PURE__ */ U("div", {
			className: "relative aspect-square overflow-hidden rounded-t-[var(--sdk-radius-control)] bg-[var(--sdk-color-surface-panel-muted)]",
			"data-slot": "upload-item-preview",
			children: [h || /* @__PURE__ */ H("div", {
				className: "flex h-full w-full items-center justify-center text-[var(--sdk-color-text-secondary)]",
				children: /* @__PURE__ */ H(f, { className: "h-10 w-10" })
			}), e ? null : /* @__PURE__ */ U("button", {
				className: "absolute right-2 top-2 rounded-full bg-[var(--sdk-color-surface-panel)]/90 p-2 text-[var(--sdk-color-text-secondary)] shadow-[var(--sdk-shadow-sm)] transition-colors hover:text-[var(--sdk-color-text-primary)]",
				onClick: () => o(n.id),
				"data-slot": "upload-item-remove-button",
				type: "button",
				children: [/* @__PURE__ */ H(w, { className: "h-4 w-4" }), /* @__PURE__ */ U("span", {
					className: "sr-only",
					children: ["Remove ", n.name]
				})]
			})]
		}), /* @__PURE__ */ U("div", {
			className: "space-y-2 px-4 py-3",
			children: [
				/* @__PURE__ */ U("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ H("p", {
						className: "truncate text-sm font-medium text-[var(--sdk-color-text-primary)]",
						"data-slot": "upload-item-name",
						children: n.name
					}), /* @__PURE__ */ H("p", {
						className: "text-xs text-[var(--sdk-color-text-secondary)]",
						"data-slot": "upload-item-metadata",
						children: ps([ts(n.size), m])
					})]
				}),
				d === "audio" && u ? /* @__PURE__ */ H("audio", {
					"aria-label": `Preview ${n.name}`,
					className: "w-full",
					controls: !0,
					preload: "metadata",
					src: u
				}) : null,
				p ? /* @__PURE__ */ H(b, { value: n.progress }) : null,
				ee
			]
		})]
	}) : /* @__PURE__ */ H("div", {
		className: "rounded-[var(--sdk-radius-control)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] px-4 py-3",
		"data-sdk-ui": "upload-item",
		"data-sdk-variant": "list",
		"data-slot": "upload-item",
		children: /* @__PURE__ */ U("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ H("div", {
				className: a("overflow-hidden rounded-[var(--sdk-radius-control)] bg-[var(--sdk-color-surface-panel-muted)] text-[var(--sdk-color-text-secondary)]", d === "video" ? "aspect-video w-28 shrink-0" : "flex h-12 w-12 shrink-0 items-center justify-center"),
				"data-slot": "upload-item-preview",
				children: h || /* @__PURE__ */ H(f, { className: "h-5 w-5" })
			}), /* @__PURE__ */ U("div", {
				className: "min-w-0 flex-1 space-y-2",
				children: [
					/* @__PURE__ */ U("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ U("div", {
							className: "min-w-0 space-y-1",
							children: [/* @__PURE__ */ H("p", {
								className: "truncate text-sm font-medium text-[var(--sdk-color-text-primary)]",
								"data-slot": "upload-item-name",
								children: n.name
							}), /* @__PURE__ */ H("p", {
								className: "text-xs text-[var(--sdk-color-text-secondary)]",
								"data-slot": "upload-item-metadata",
								children: ps([
									ts(n.size),
									ls(n.name),
									m
								])
							})]
						}), e ? null : /* @__PURE__ */ U("button", {
							className: "rounded-full p-2 text-[var(--sdk-color-text-muted)] transition-colors hover:bg-[var(--sdk-color-brand-primary-soft)] hover:text-[var(--sdk-color-text-primary)]",
							onClick: () => o(n.id),
							"data-slot": "upload-item-remove-button",
							type: "button",
							children: [/* @__PURE__ */ H(w, { className: "h-4 w-4" }), /* @__PURE__ */ U("span", {
								className: "sr-only",
								children: ["Remove ", n.name]
							})]
						})]
					}),
					d === "audio" && u ? /* @__PURE__ */ H("audio", {
						"aria-label": `Preview ${n.name}`,
						className: "w-full",
						controls: !0,
						preload: "metadata",
						src: u
					}) : null,
					p ? /* @__PURE__ */ H(b, { value: n.progress }) : null,
					ee
				]
			})]
		})
	});
}
ys.displayName = "UploadItem";
//#endregion
//#region src/components/ui/data-entry/upload/file-upload.tsx
function bs(e, t, n) {
	let [r, i] = R.useState(t), a = e !== void 0;
	return [a ? e : r, R.useCallback((e) => {
		a || i(e), n?.(e);
	}, [a, n])];
}
var xs = R.forwardRef(({ accept: e, allowPaste: t = !1, className: n, clearable: r = !1, defaultValue: i = [], description: o, directory: s = !1, disabled: c = !1, emptyStateDescription: u, emptyStateTitle: d, label: f, listType: p, maxFiles: m = Infinity, maxSize: h = Infinity, multiple: g = !0, onClear: _, onDownloadItem: v, onPreviewItem: y, onReject: b, onRetryItem: S, onValueChange: w, rejectionTitle: T = "Some files could not be added.", replaceOnMax: E, showRejections: D = !0, value: ee, variant: O = "file", ...te }, k) => {
	let A = is(O), j = e ?? A.accept, M = ns(j), N = p ?? A.listType, P = f ?? A.label, F = d ?? A.emptyStateTitle, ne = u ?? (M === ns(A.accept) ? A.helperText : `Accepted: ${M}`), I = E ?? m === 1, re = cs(m, h), L = R.useId(), [z, B] = bs(ee, i, w), [ie, V] = R.useState(!1), [ae, oe] = R.useState([]), se = R.useRef(null), { getPreviewUrl: ce } = fs(z, O), le = c || z.length >= m && !(I && m === 1), ue = s ? {
		directory: "",
		webkitdirectory: ""
	} : {}, de = R.useCallback((e) => {
		if (!e || Array.isArray(e) && !e.length || "length" in e && !e.length) return;
		let t = Array.isArray(e) ? e : Array.from(e), n = I && m === 1 ? [] : [...z], r = [];
		t.slice(0, g ? void 0 : 1).forEach((e) => {
			if (n.length >= m) {
				r.push({
					file: e,
					message: `Maximum ${m} file${m === 1 ? "" : "s"} allowed.`,
					reason: "max-files"
				});
				return;
			}
			if (e.size > h) {
				r.push({
					file: e,
					message: `${e.name} exceeds the ${ts(h)} limit.`,
					reason: "file-too-large"
				});
				return;
			}
			if (!rs(e, j)) {
				r.push({
					file: e,
					message: `${e.name} is not an accepted file type.`,
					reason: "invalid-type"
				});
				return;
			}
			n.push({
				file: e,
				id: es(),
				kind: as(e, O),
				name: e.name,
				size: e.size,
				status: "idle",
				type: e.type
			});
		}), B(n), oe(r), r.length && b?.(r), se.current && (se.current.value = "");
	}, [
		z,
		m,
		h,
		g,
		b,
		j,
		I,
		B,
		O
	]), fe = R.useCallback((e) => {
		B(z.filter((t) => t.id !== e));
	}, [z, B]), pe = R.useCallback(() => {
		B([]), oe([]), _?.(), se.current && (se.current.value = "");
	}, [_, B]);
	return /* @__PURE__ */ U("div", {
		ref: k,
		className: a("space-y-3", n),
		"data-sdk-ui": "file-upload",
		"data-slot": "file-upload",
		...te,
		children: [
			/* @__PURE__ */ U("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ U("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ H(C, {
						"data-slot": "file-upload-label",
						htmlFor: L,
						children: P
					}), o ? /* @__PURE__ */ H("p", {
						className: "text-sm text-[var(--sdk-color-text-secondary)]",
						"data-slot": "file-upload-description",
						children: o
					}) : null]
				}), r && z.length ? /* @__PURE__ */ H(l, {
					"data-slot": "file-upload-clear-button",
					onClick: pe,
					size: "sm",
					type: "button",
					variant: "ghost",
					children: "Clear all files"
				}) : null]
			}),
			/* @__PURE__ */ H("input", {
				...ue,
				accept: M === "*" ? void 0 : M,
				"aria-label": P,
				className: "sr-only",
				disabled: le,
				id: L,
				multiple: g,
				onChange: (e) => de(e.target.files),
				ref: se,
				type: "file"
			}),
			/* @__PURE__ */ H(Xo, {
				caption: z.length >= m && Number.isFinite(m) ? `Maximum ${m} file${m === 1 ? "" : "s"} selected. Remove one to add another.` : re,
				description: ne,
				disabled: le,
				isDragging: ie,
				onBrowse: () => se.current?.click(),
				onDragLeave: () => V(!1),
				onDragOver: (e) => {
					e.preventDefault(), le || V(!0);
				},
				onDrop: (e) => {
					e.preventDefault(), V(!1), le || de(e.dataTransfer.files);
				},
				onPaste: (e) => {
					if (!t || le) return;
					let n = us(e.clipboardData);
					n.length && (e.preventDefault(), de(n));
				},
				title: z.length >= m && Number.isFinite(m) ? I && m === 1 ? "Select a new file to replace the current one" : `Maximum ${m} file${m === 1 ? "" : "s"} selected` : F,
				variant: O
			}),
			D && ae.length ? /* @__PURE__ */ H(x, {
				description: /* @__PURE__ */ H("ul", {
					className: "space-y-1",
					children: ae.map((e) => /* @__PURE__ */ H("li", { children: e.message }, `${e.file.name}-${e.reason}`))
				}),
				title: T,
				tone: "warning"
			}) : null,
			z.length ? /* @__PURE__ */ H("div", {
				className: a(N === "grid" ? "grid gap-3 sm:grid-cols-2 xl:grid-cols-3" : "space-y-2"),
				"data-sdk-region": "file-upload-list",
				"data-slot": "file-upload-list",
				children: z.map((e) => /* @__PURE__ */ H(ys, {
					disabled: c,
					fallbackVariant: O,
					item: e,
					listType: N,
					onDownload: v,
					onRemove: fe,
					onPreview: y,
					onRetry: S,
					previewUrl: ce(e)
				}, e.id))
			}) : null
		]
	});
});
xs.displayName = "FileUpload";
//#endregion
//#region src/components/ui/data-entry/upload/upload-presets.tsx
function Ss({ accept: e, listType: t, ...n }) {
	let r = is("image");
	return /* @__PURE__ */ H(xs, {
		accept: e ?? r.accept,
		"data-sdk-ui": "image-upload",
		"data-slot": "image-upload",
		listType: t ?? r.listType,
		variant: "image",
		...n
	});
}
function Cs({ accept: e, listType: t, ...n }) {
	let r = is("video");
	return /* @__PURE__ */ H(xs, {
		accept: e ?? r.accept,
		"data-sdk-ui": "video-upload",
		"data-slot": "video-upload",
		listType: t ?? r.listType,
		variant: "video",
		...n
	});
}
function ws({ accept: e, listType: t, ...n }) {
	let r = is("audio");
	return /* @__PURE__ */ H(xs, {
		accept: e ?? r.accept,
		"data-sdk-ui": "audio-upload",
		"data-slot": "audio-upload",
		listType: t ?? r.listType,
		variant: "audio",
		...n
	});
}
function Ts({ accept: e, listType: t, ...n }) {
	let r = is("document");
	return /* @__PURE__ */ H(xs, {
		accept: e ?? r.accept,
		"data-sdk-ui": "document-upload",
		"data-slot": "document-upload",
		listType: t ?? r.listType,
		variant: "document",
		...n
	});
}
Ss.displayName = "ImageUpload", Cs.displayName = "VideoUpload", ws.displayName = "AudioUpload", Ts.displayName = "DocumentUpload";
//#endregion
export { je as S, cn as _, xs as a, ot as b, Bo as c, So as d, _n as f, ln as g, un as h, Cs as i, Ho as l, vn as m, Ts as n, Jo as o, hn as p, Ss as r, Go as s, ws as t, Vo as u, qt as v, Ae as x, at as y };

//# sourceMappingURL=data-entry-CT09Vu-Y.js.map