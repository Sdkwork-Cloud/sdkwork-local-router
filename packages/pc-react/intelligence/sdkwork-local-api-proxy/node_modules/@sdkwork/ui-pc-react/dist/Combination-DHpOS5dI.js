import { i as e } from "./dist-CJMju1B6.js";
import { t } from "./createLucideIcon-DYUOEYxe.js";
import { a as n, c as r, d as i, i as a, n as o, o as s, r as c, u as l } from "./dist-Dedo1J3L.js";
import * as u from "react";
import d, { useLayoutEffect as f, useState as p } from "react";
import { jsx as m } from "react/jsx-runtime";
import * as h from "react-dom";
import g from "react-dom";
var _ = t("check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]), v = t("circle", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}]]), y = u.useInsertionEffect || r;
function b({ prop: e, defaultProp: t, onChange: n = () => {}, caller: r }) {
	let [i, a, o] = x({
		defaultProp: t,
		onChange: n
	}), s = e !== void 0, c = s ? e : i;
	{
		let t = u.useRef(e !== void 0);
		u.useEffect(() => {
			let e = t.current;
			e !== s && console.warn(`${r} is changing from ${e ? "controlled" : "uncontrolled"} to ${s ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`), t.current = s;
		}, [s, r]);
	}
	return [c, u.useCallback((t) => {
		if (s) {
			let n = S(t) ? t(e) : t;
			n !== e && o.current?.(n);
		} else a(t);
	}, [
		s,
		e,
		a,
		o
	])];
}
function x({ defaultProp: e, onChange: t }) {
	let [n, r] = u.useState(e), i = u.useRef(n), a = u.useRef(t);
	return y(() => {
		a.current = t;
	}, [t]), u.useEffect(() => {
		i.current !== n && (a.current?.(n), i.current = n);
	}, [n, i]), [
		n,
		r,
		a
	];
}
function S(e) {
	return typeof e == "function";
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-collection@_161926fa2509d0b7370b60b8bb4eb8b0/node_modules/@radix-ui/react-collection/dist/index.mjs
function C(t) {
	let n = t + "CollectionProvider", [r, i] = l(n), [a, o] = r(n, {
		collectionRef: { current: null },
		itemMap: /* @__PURE__ */ new Map()
	}), c = (e) => {
		let { scope: t, children: n } = e, r = d.useRef(null), i = d.useRef(/* @__PURE__ */ new Map()).current;
		return /* @__PURE__ */ m(a, {
			scope: t,
			itemMap: i,
			collectionRef: r,
			children: n
		});
	};
	c.displayName = n;
	let u = t + "CollectionSlot", f = s(u), p = d.forwardRef((t, n) => {
		let { scope: r, children: i } = t;
		return /* @__PURE__ */ m(f, {
			ref: e(n, o(u, r).collectionRef),
			children: i
		});
	});
	p.displayName = u;
	let h = t + "CollectionItemSlot", g = "data-radix-collection-item", _ = s(h), v = d.forwardRef((t, n) => {
		let { scope: r, children: i, ...a } = t, s = d.useRef(null), c = e(n, s), l = o(h, r);
		return d.useEffect(() => (l.itemMap.set(s, {
			ref: s,
			...a
		}), () => void l.itemMap.delete(s))), /* @__PURE__ */ m(_, {
			[g]: "",
			ref: c,
			children: i
		});
	});
	v.displayName = h;
	function y(e) {
		let n = o(t + "CollectionConsumer", e);
		return d.useCallback(() => {
			let e = n.collectionRef.current;
			if (!e) return [];
			let t = Array.from(e.querySelectorAll(`[${g}]`));
			return Array.from(n.itemMap.values()).sort((e, n) => t.indexOf(e.ref.current) - t.indexOf(n.ref.current));
		}, [n.collectionRef, n.itemMap]);
	}
	return [
		{
			Provider: c,
			Slot: p,
			ItemSlot: v
		},
		y,
		i
	];
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-use-escape-_8ace045c7dc8a9f26af4a8dddd419f24/node_modules/@radix-ui/react-use-escape-keydown/dist/index.mjs
function w(e, t = globalThis?.document) {
	let n = o(e);
	u.useEffect(() => {
		let e = (e) => {
			e.key === "Escape" && n(e);
		};
		return t.addEventListener("keydown", e, { capture: !0 }), () => t.removeEventListener("keydown", e, { capture: !0 });
	}, [n, t]);
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-dismissable_3d3960154a4c07d09bb90cb341135fc5/node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
var T = "DismissableLayer", E = "dismissableLayer.update", D = "dismissableLayer.pointerDownOutside", O = "dismissableLayer.focusOutside", k, A = u.createContext({
	layers: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	branches: /* @__PURE__ */ new Set()
}), j = u.forwardRef((t, n) => {
	let { disableOutsidePointerEvents: r = !1, onEscapeKeyDown: o, onPointerDownOutside: s, onFocusOutside: c, onInteractOutside: l, onDismiss: d, ...f } = t, p = u.useContext(A), [h, g] = u.useState(null), _ = h?.ownerDocument ?? globalThis?.document, [, v] = u.useState({}), y = e(n, (e) => g(e)), b = Array.from(p.layers), [x] = [...p.layersWithOutsidePointerEventsDisabled].slice(-1), S = b.indexOf(x), C = h ? b.indexOf(h) : -1, T = p.layersWithOutsidePointerEventsDisabled.size > 0, D = C >= S, O = P((e) => {
		let t = e.target, n = [...p.branches].some((e) => e.contains(t));
		!D || n || (s?.(e), l?.(e), e.defaultPrevented || d?.());
	}, _), j = F((e) => {
		let t = e.target;
		[...p.branches].some((e) => e.contains(t)) || (c?.(e), l?.(e), e.defaultPrevented || d?.());
	}, _);
	return w((e) => {
		C === p.layers.size - 1 && (o?.(e), !e.defaultPrevented && d && (e.preventDefault(), d()));
	}, _), u.useEffect(() => {
		if (h) return r && (p.layersWithOutsidePointerEventsDisabled.size === 0 && (k = _.body.style.pointerEvents, _.body.style.pointerEvents = "none"), p.layersWithOutsidePointerEventsDisabled.add(h)), p.layers.add(h), ee(), () => {
			r && p.layersWithOutsidePointerEventsDisabled.size === 1 && (_.body.style.pointerEvents = k);
		};
	}, [
		h,
		_,
		r,
		p
	]), u.useEffect(() => () => {
		h && (p.layers.delete(h), p.layersWithOutsidePointerEventsDisabled.delete(h), ee());
	}, [h, p]), u.useEffect(() => {
		let e = () => v({});
		return document.addEventListener(E, e), () => document.removeEventListener(E, e);
	}, []), /* @__PURE__ */ m(a.div, {
		...f,
		ref: y,
		style: {
			pointerEvents: T ? D ? "auto" : "none" : void 0,
			...t.style
		},
		onFocusCapture: i(t.onFocusCapture, j.onFocusCapture),
		onBlurCapture: i(t.onBlurCapture, j.onBlurCapture),
		onPointerDownCapture: i(t.onPointerDownCapture, O.onPointerDownCapture)
	});
});
j.displayName = T;
var M = "DismissableLayerBranch", N = u.forwardRef((t, n) => {
	let r = u.useContext(A), i = u.useRef(null), o = e(n, i);
	return u.useEffect(() => {
		let e = i.current;
		if (e) return r.branches.add(e), () => {
			r.branches.delete(e);
		};
	}, [r.branches]), /* @__PURE__ */ m(a.div, {
		...t,
		ref: o
	});
});
N.displayName = M;
function P(e, t = globalThis?.document) {
	let n = o(e), r = u.useRef(!1), i = u.useRef(() => {});
	return u.useEffect(() => {
		let e = (e) => {
			if (e.target && !r.current) {
				let r = function() {
					te(D, n, a, { discrete: !0 });
				}, a = { originalEvent: e };
				e.pointerType === "touch" ? (t.removeEventListener("click", i.current), i.current = r, t.addEventListener("click", i.current, { once: !0 })) : r();
			} else t.removeEventListener("click", i.current);
			r.current = !1;
		}, a = window.setTimeout(() => {
			t.addEventListener("pointerdown", e);
		}, 0);
		return () => {
			window.clearTimeout(a), t.removeEventListener("pointerdown", e), t.removeEventListener("click", i.current);
		};
	}, [t, n]), { onPointerDownCapture: () => r.current = !0 };
}
function F(e, t = globalThis?.document) {
	let n = o(e), r = u.useRef(!1);
	return u.useEffect(() => {
		let e = (e) => {
			e.target && !r.current && te(O, n, { originalEvent: e }, { discrete: !1 });
		};
		return t.addEventListener("focusin", e), () => t.removeEventListener("focusin", e);
	}, [t, n]), {
		onFocusCapture: () => r.current = !0,
		onBlurCapture: () => r.current = !1
	};
}
function ee() {
	let e = new CustomEvent(E);
	document.dispatchEvent(e);
}
function te(e, t, r, { discrete: i }) {
	let a = r.originalEvent.target, o = new CustomEvent(e, {
		bubbles: !1,
		cancelable: !0,
		detail: r
	});
	t && a.addEventListener(e, t, { once: !0 }), i ? n(a, o) : a.dispatchEvent(o);
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-focus-guard_06de8a97fcda1ffdfc846fc5bee008b8/node_modules/@radix-ui/react-focus-guards/dist/index.mjs
var ne = 0;
function re() {
	u.useEffect(() => {
		let e = document.querySelectorAll("[data-radix-focus-guard]");
		return document.body.insertAdjacentElement("afterbegin", e[0] ?? I()), document.body.insertAdjacentElement("beforeend", e[1] ?? I()), ne++, () => {
			ne === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((e) => e.remove()), ne--;
		};
	}, []);
}
function I() {
	let e = document.createElement("span");
	return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-focus-scope_f62f3af4ca2ba305a7aecf04c8534604/node_modules/@radix-ui/react-focus-scope/dist/index.mjs
var ie = "focusScope.autoFocusOnMount", ae = "focusScope.autoFocusOnUnmount", oe = {
	bubbles: !1,
	cancelable: !0
}, se = "FocusScope", ce = u.forwardRef((t, n) => {
	let { loop: r = !1, trapped: i = !1, onMountAutoFocus: s, onUnmountAutoFocus: c, ...l } = t, [d, f] = u.useState(null), p = o(s), h = o(c), g = u.useRef(null), _ = e(n, (e) => f(e)), v = u.useRef({
		paused: !1,
		pause() {
			this.paused = !0;
		},
		resume() {
			this.paused = !1;
		}
	}).current;
	u.useEffect(() => {
		if (i) {
			let e = function(e) {
				if (v.paused || !d) return;
				let t = e.target;
				d.contains(t) ? g.current = t : L(g.current, { select: !0 });
			}, t = function(e) {
				if (v.paused || !d) return;
				let t = e.relatedTarget;
				t !== null && (d.contains(t) || L(g.current, { select: !0 }));
			}, n = function(e) {
				if (document.activeElement === document.body) for (let t of e) t.removedNodes.length > 0 && L(d);
			};
			document.addEventListener("focusin", e), document.addEventListener("focusout", t);
			let r = new MutationObserver(n);
			return d && r.observe(d, {
				childList: !0,
				subtree: !0
			}), () => {
				document.removeEventListener("focusin", e), document.removeEventListener("focusout", t), r.disconnect();
			};
		}
	}, [
		i,
		d,
		v.paused
	]), u.useEffect(() => {
		if (d) {
			he.add(v);
			let e = document.activeElement;
			if (!d.contains(e)) {
				let t = new CustomEvent(ie, oe);
				d.addEventListener(ie, p), d.dispatchEvent(t), t.defaultPrevented || (le(ve(de(d)), { select: !0 }), document.activeElement === e && L(d));
			}
			return () => {
				d.removeEventListener(ie, p), setTimeout(() => {
					let t = new CustomEvent(ae, oe);
					d.addEventListener(ae, h), d.dispatchEvent(t), t.defaultPrevented || L(e ?? document.body, { select: !0 }), d.removeEventListener(ae, h), he.remove(v);
				}, 0);
			};
		}
	}, [
		d,
		p,
		h,
		v
	]);
	let y = u.useCallback((e) => {
		if (!r && !i || v.paused) return;
		let t = e.key === "Tab" && !e.altKey && !e.ctrlKey && !e.metaKey, n = document.activeElement;
		if (t && n) {
			let t = e.currentTarget, [i, a] = ue(t);
			i && a ? !e.shiftKey && n === a ? (e.preventDefault(), r && L(i, { select: !0 })) : e.shiftKey && n === i && (e.preventDefault(), r && L(a, { select: !0 })) : n === t && e.preventDefault();
		}
	}, [
		r,
		i,
		v.paused
	]);
	return /* @__PURE__ */ m(a.div, {
		tabIndex: -1,
		...l,
		ref: _,
		onKeyDown: y
	});
});
ce.displayName = se;
function le(e, { select: t = !1 } = {}) {
	let n = document.activeElement;
	for (let r of e) if (L(r, { select: t }), document.activeElement !== n) return;
}
function ue(e) {
	let t = de(e);
	return [fe(t, e), fe(t.reverse(), e)];
}
function de(e) {
	let t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: (e) => {
		let t = e.tagName === "INPUT" && e.type === "hidden";
		return e.disabled || e.hidden || t ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	for (; n.nextNode();) t.push(n.currentNode);
	return t;
}
function fe(e, t) {
	for (let n of e) if (!pe(n, { upTo: t })) return n;
}
function pe(e, { upTo: t }) {
	if (getComputedStyle(e).visibility === "hidden") return !0;
	for (; e;) {
		if (t !== void 0 && e === t) return !1;
		if (getComputedStyle(e).display === "none") return !0;
		e = e.parentElement;
	}
	return !1;
}
function me(e) {
	return e instanceof HTMLInputElement && "select" in e;
}
function L(e, { select: t = !1 } = {}) {
	if (e && e.focus) {
		let n = document.activeElement;
		e.focus({ preventScroll: !0 }), e !== n && me(e) && t && e.select();
	}
}
var he = ge();
function ge() {
	let e = [];
	return {
		add(t) {
			let n = e[0];
			t !== n && n?.pause(), e = _e(e, t), e.unshift(t);
		},
		remove(t) {
			e = _e(e, t), e[0]?.resume();
		}
	};
}
function _e(e, t) {
	let n = [...e], r = n.indexOf(t);
	return r !== -1 && n.splice(r, 1), n;
}
function ve(e) {
	return e.filter((e) => e.tagName !== "A");
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-id@1.1.1_@types+react@19.2.14_react@19.2.4/node_modules/@radix-ui/react-id/dist/index.mjs
var ye = u.useId || (() => void 0), be = 0;
function xe(e) {
	let [t, n] = u.useState(ye());
	return r(() => {
		e || n((e) => e ?? String(be++));
	}, [e]), e || (t ? `radix-${t}` : "");
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var Se = [
	"top",
	"right",
	"bottom",
	"left"
], R = Math.min, z = Math.max, Ce = Math.round, we = Math.floor, B = (e) => ({
	x: e,
	y: e
}), Te = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function Ee(e, t, n) {
	return z(e, R(t, n));
}
function V(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function H(e) {
	return e.split("-")[0];
}
function U(e) {
	return e.split("-")[1];
}
function De(e) {
	return e === "x" ? "y" : "x";
}
function Oe(e) {
	return e === "y" ? "height" : "width";
}
function W(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function ke(e) {
	return De(W(e));
}
function Ae(e, t, n) {
	n === void 0 && (n = !1);
	let r = U(e), i = ke(e), a = Oe(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = ze(o)), [o, ze(o)];
}
function je(e) {
	let t = ze(e);
	return [
		Me(e),
		t,
		Me(t)
	];
}
function Me(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var Ne = ["left", "right"], Pe = ["right", "left"], Fe = ["top", "bottom"], Ie = ["bottom", "top"];
function Le(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? Pe : Ne : t ? Ne : Pe;
		case "left":
		case "right": return t ? Fe : Ie;
		default: return [];
	}
}
function Re(e, t, n, r) {
	let i = U(e), a = Le(H(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(Me)))), a;
}
function ze(e) {
	let t = H(e);
	return Te[t] + e.slice(t.length);
}
function Be(e) {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...e
	};
}
function Ve(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : Be(e);
}
function He(e) {
	let { x: t, y: n, width: r, height: i } = e;
	return {
		width: r,
		height: i,
		top: n,
		left: t,
		right: t + r,
		bottom: n + i,
		x: t,
		y: n
	};
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@floating-ui+core@1.7.5/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function Ue(e, t, n) {
	let { reference: r, floating: i } = e, a = W(t), o = ke(t), s = Oe(o), c = H(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
	switch (c) {
		case "top":
			p = {
				x: u,
				y: r.y - i.height
			};
			break;
		case "bottom":
			p = {
				x: u,
				y: r.y + r.height
			};
			break;
		case "right":
			p = {
				x: r.x + r.width,
				y: d
			};
			break;
		case "left":
			p = {
				x: r.x - i.width,
				y: d
			};
			break;
		default: p = {
			x: r.x,
			y: r.y
		};
	}
	switch (U(t)) {
		case "start":
			p[o] -= f * (n && l ? -1 : 1);
			break;
		case "end":
			p[o] += f * (n && l ? -1 : 1);
			break;
	}
	return p;
}
async function We(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = V(t, e), p = Ve(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = He(await i.getClippingRect({
		element: await (i.isElement == null ? void 0 : i.isElement(m)) ?? !0 ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
		boundary: c,
		rootBoundary: l,
		strategy: s
	})), g = u === "floating" ? {
		x: n,
		y: r,
		width: a.floating.width,
		height: a.floating.height
	} : a.reference, _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), v = await (i.isElement == null ? void 0 : i.isElement(_)) && await (i.getScale == null ? void 0 : i.getScale(_)) || {
		x: 1,
		y: 1
	}, y = He(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: o,
		rect: g,
		offsetParent: _,
		strategy: s
	}) : g);
	return {
		top: (h.top - y.top + p.top) / v.y,
		bottom: (y.bottom - h.bottom + p.bottom) / v.y,
		left: (h.left - y.left + p.left) / v.x,
		right: (y.right - h.right + p.right) / v.x
	};
}
var Ge = 50, Ke = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: We
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = Ue(l, r, c), f = r, p = 0, m = {};
	for (let n = 0; n < a.length; n++) {
		let h = a[n];
		if (!h) continue;
		let { name: g, fn: _ } = h, { x: v, y, data: b, reset: x } = await _({
			x: u,
			y: d,
			initialPlacement: r,
			placement: f,
			strategy: i,
			middlewareData: m,
			rects: l,
			platform: s,
			elements: {
				reference: e,
				floating: t
			}
		});
		u = v ?? u, d = y ?? d, m[g] = {
			...m[g],
			...b
		}, x && p < Ge && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = Ue(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, qe = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = V(e, t) || {};
		if (l == null) return {};
		let d = Ve(u), f = {
			x: n,
			y: r
		}, p = ke(i), m = Oe(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		(!C || !await (o.isElement == null ? void 0 : o.isElement(S))) && (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = R(d[_], T), D = R(d[v], T), O = E, k = C - h[m] - D, A = C / 2 - h[m] / 2 + w, j = Ee(O, A, k), M = !c.arrow && U(i) != null && A !== j && a.reference[m] / 2 - (A < O ? E : D) - h[m] / 2 < 0, N = M ? A < O ? A - O : A - k : 0;
		return {
			[p]: f[p] + N,
			data: {
				[p]: j,
				centerOffset: A - j - N,
				...M && { alignmentOffset: N }
			},
			reset: M
		};
	}
}), Je = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = V(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = H(r), _ = W(o), v = H(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [ze(o)] : je(o)), x = p !== "none";
			!d && x && b.push(...Re(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = Ae(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (!(u === "alignment" && _ !== W(t)) || T.every((e) => W(e.placement) === _ ? e.overflows[0] > 0 : !0))) return {
					data: {
						index: e,
						overflows: T
					},
					reset: { placement: t }
				};
				let n = T.filter((e) => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]?.placement;
				if (!n) switch (f) {
					case "bestFit": {
						let e = T.filter((e) => {
							if (x) {
								let t = W(e.placement);
								return t === _ || t === "y";
							}
							return !0;
						}).map((e) => [e.placement, e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]?.[0];
						e && (n = e);
						break;
					}
					case "initialPlacement":
						n = o;
						break;
				}
				if (r !== n) return { reset: { placement: n } };
			}
			return {};
		}
	};
};
function Ye(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function Xe(e) {
	return Se.some((t) => e[t] >= 0);
}
var Ze = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = V(e, t);
			switch (i) {
				case "referenceHidden": {
					let e = Ye(await r.detectOverflow(t, {
						...a,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: Xe(e)
					} };
				}
				case "escaped": {
					let e = Ye(await r.detectOverflow(t, {
						...a,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: Xe(e)
					} };
				}
				default: return {};
			}
		}
	};
}, Qe = /* @__PURE__ */ new Set(["left", "top"]);
async function $e(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = H(n), s = U(n), c = W(n) === "y", l = Qe.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = V(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
		mainAxis: d,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: d.mainAxis || 0,
		crossAxis: d.crossAxis || 0,
		alignmentAxis: d.alignmentAxis
	};
	return s && typeof m == "number" && (p = s === "end" ? m * -1 : m), c ? {
		x: p * u,
		y: f * l
	} : {
		x: f * l,
		y: p * u
	};
}
var et = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await $e(t, e);
			return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset ? {} : {
				x: r + s.x,
				y: i + s.y,
				data: {
					...s,
					placement: a
				}
			};
		}
	};
}, tt = function(e) {
	return e === void 0 && (e = {}), {
		name: "shift",
		options: e,
		async fn(t) {
			let { x: n, y: r, placement: i, platform: a } = t, { mainAxis: o = !0, crossAxis: s = !1, limiter: c = { fn: (e) => {
				let { x: t, y: n } = e;
				return {
					x: t,
					y: n
				};
			} }, ...l } = V(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = W(H(i)), p = De(f), m = u[p], h = u[f];
			if (o) {
				let e = p === "y" ? "top" : "left", t = p === "y" ? "bottom" : "right", n = m + d[e], r = m - d[t];
				m = Ee(n, m, r);
			}
			if (s) {
				let e = f === "y" ? "top" : "left", t = f === "y" ? "bottom" : "right", n = h + d[e], r = h - d[t];
				h = Ee(n, h, r);
			}
			let g = c.fn({
				...t,
				[p]: m,
				[f]: h
			});
			return {
				...g,
				data: {
					x: g.x - n,
					y: g.y - r,
					enabled: {
						[p]: o,
						[f]: s
					}
				}
			};
		}
	};
}, nt = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = V(e, t), u = {
				x: n,
				y: r
			}, d = W(i), f = De(d), p = u[f], m = u[d], h = V(s, t), g = typeof h == "number" ? {
				mainAxis: h,
				crossAxis: 0
			} : {
				mainAxis: 0,
				crossAxis: 0,
				...h
			};
			if (c) {
				let e = f === "y" ? "height" : "width", t = a.reference[f] - a.floating[e] + g.mainAxis, n = a.reference[f] + a.reference[e] - g.mainAxis;
				p < t ? p = t : p > n && (p = n);
			}
			if (l) {
				let e = f === "y" ? "width" : "height", t = Qe.has(H(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, rt = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			var n, r;
			let { placement: i, rects: a, platform: o, elements: s } = t, { apply: c = () => {}, ...l } = V(e, t), u = await o.detectOverflow(t, l), d = H(i), f = U(i), p = W(i) === "y", { width: m, height: h } = a.floating, g, _;
			d === "top" || d === "bottom" ? (g = d, _ = f === (await (o.isRTL == null ? void 0 : o.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (_ = d, g = f === "end" ? "top" : "bottom");
			let v = h - u.top - u.bottom, y = m - u.left - u.right, b = R(h - u[g], v), x = R(m - u[_], y), S = !t.middlewareData.shift, C = b, w = x;
			if ((n = t.middlewareData.shift) != null && n.enabled.x && (w = y), (r = t.middlewareData.shift) != null && r.enabled.y && (C = v), S && !f) {
				let e = z(u.left, 0), t = z(u.right, 0), n = z(u.top, 0), r = z(u.bottom, 0);
				p ? w = m - 2 * (e !== 0 || t !== 0 ? e + t : z(u.left, u.right)) : C = h - 2 * (n !== 0 || r !== 0 ? n + r : z(u.top, u.bottom));
			}
			await c({
				...t,
				availableWidth: w,
				availableHeight: C
			});
			let T = await o.getDimensions(s.floating);
			return m !== T.width || h !== T.height ? { reset: { rects: !0 } } : {};
		}
	};
};
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function it() {
	return typeof window < "u";
}
function at(e) {
	return ot(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function G(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function K(e) {
	return ((ot(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function ot(e) {
	return it() ? e instanceof Node || e instanceof G(e).Node : !1;
}
function q(e) {
	return it() ? e instanceof Element || e instanceof G(e).Element : !1;
}
function J(e) {
	return it() ? e instanceof HTMLElement || e instanceof G(e).HTMLElement : !1;
}
function st(e) {
	return !it() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof G(e).ShadowRoot;
}
function ct(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = X(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function lt(e) {
	return /^(table|td|th)$/.test(at(e));
}
function ut(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var dt = /transform|translate|scale|rotate|perspective|filter/, ft = /paint|layout|strict|content/, Y = (e) => !!e && e !== "none", pt;
function mt(e) {
	let t = q(e) ? X(e) : e;
	return Y(t.transform) || Y(t.translate) || Y(t.scale) || Y(t.rotate) || Y(t.perspective) || !gt() && (Y(t.backdropFilter) || Y(t.filter)) || dt.test(t.willChange || "") || ft.test(t.contain || "");
}
function ht(e) {
	let t = Z(e);
	for (; J(t) && !_t(t);) {
		if (mt(t)) return t;
		if (ut(t)) return null;
		t = Z(t);
	}
	return null;
}
function gt() {
	return pt ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), pt;
}
function _t(e) {
	return /^(html|body|#document)$/.test(at(e));
}
function X(e) {
	return G(e).getComputedStyle(e);
}
function vt(e) {
	return q(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function Z(e) {
	if (at(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || st(e) && e.host || K(e);
	return st(t) ? t.host : t;
}
function yt(e) {
	let t = Z(e);
	return _t(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : J(t) && ct(t) ? t : yt(t);
}
function bt(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = yt(e), i = r === e.ownerDocument?.body, a = G(r);
	if (i) {
		let e = xt(a);
		return t.concat(a, a.visualViewport || [], ct(r) ? r : [], e && n ? bt(e) : []);
	} else return t.concat(r, bt(r, [], n));
}
function xt(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@floating-ui+dom@1.7.6/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function St(e) {
	let t = X(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = J(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = Ce(n) !== a || Ce(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function Ct(e) {
	return q(e) ? e : e.contextElement;
}
function wt(e) {
	let t = Ct(e);
	if (!J(t)) return B(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = St(t), o = (a ? Ce(n.width) : n.width) / r, s = (a ? Ce(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var Tt = /* @__PURE__ */ B(0);
function Et(e) {
	let t = G(e);
	return !gt() || !t.visualViewport ? Tt : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function Dt(e, t, n) {
	return t === void 0 && (t = !1), !n || t && n !== G(e) ? !1 : t;
}
function Q(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = Ct(e), o = B(1);
	t && (r ? q(r) && (o = wt(r)) : o = wt(e));
	let s = Dt(a, n, r) ? Et(a) : B(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a) {
		let e = G(a), t = r && q(r) ? G(r) : r, n = e, i = xt(n);
		for (; i && r && t !== n;) {
			let e = wt(i), t = i.getBoundingClientRect(), r = X(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = G(i), i = xt(n);
		}
	}
	return He({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function Ot(e, t) {
	let n = vt(e).scrollLeft;
	return t ? t.left + n : Q(K(e)).left + n;
}
function kt(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - Ot(e, n),
		y: n.top + t.scrollTop
	};
}
function At(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = K(r), s = t ? ut(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = B(1), u = B(0), d = J(r);
	if ((d || !d && !a) && ((at(r) !== "body" || ct(o)) && (c = vt(r)), d)) {
		let e = Q(r);
		l = wt(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? kt(o, c) : B(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function jt(e) {
	return Array.from(e.getClientRects());
}
function Mt(e) {
	let t = K(e), n = vt(e), r = e.ownerDocument.body, i = z(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = z(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight), o = -n.scrollLeft + Ot(e), s = -n.scrollTop;
	return X(r).direction === "rtl" && (o += z(t.clientWidth, r.clientWidth) - i), {
		width: i,
		height: a,
		x: o,
		y: s
	};
}
var Nt = 25;
function Pt(e, t) {
	let n = G(e), r = K(e), i = n.visualViewport, a = r.clientWidth, o = r.clientHeight, s = 0, c = 0;
	if (i) {
		a = i.width, o = i.height;
		let e = gt();
		(!e || e && t === "fixed") && (s = i.offsetLeft, c = i.offsetTop);
	}
	let l = Ot(r);
	if (l <= 0) {
		let e = r.ownerDocument, t = e.body, n = getComputedStyle(t), i = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, o = Math.abs(r.clientWidth - t.clientWidth - i);
		o <= Nt && (a -= o);
	} else l <= Nt && (a += l);
	return {
		width: a,
		height: o,
		x: s,
		y: c
	};
}
function Ft(e, t) {
	let n = Q(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = J(e) ? wt(e) : B(1);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function It(e, t, n) {
	let r;
	if (t === "viewport") r = Pt(e, n);
	else if (t === "document") r = Mt(K(e));
	else if (q(t)) r = Ft(t, n);
	else {
		let n = Et(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return He(r);
}
function Lt(e, t) {
	let n = Z(e);
	return n === t || !q(n) || _t(n) ? !1 : X(n).position === "fixed" || Lt(n, t);
}
function Rt(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = bt(e, [], !1).filter((e) => q(e) && at(e) !== "body"), i = null, a = X(e).position === "fixed", o = a ? Z(e) : e;
	for (; q(o) && !_t(o);) {
		let t = X(o), n = mt(o);
		!n && t.position === "fixed" && (i = null), (a ? !n && !i : !n && t.position === "static" && i && (i.position === "absolute" || i.position === "fixed") || ct(o) && !n && Lt(e, o)) ? r = r.filter((e) => e !== o) : i = t, o = Z(o);
	}
	return t.set(e, r), r;
}
function zt(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? ut(t) ? [] : Rt(t, this._c) : [].concat(n), r], o = It(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = It(t, a[e], i);
		s = z(n.top, s), c = R(n.right, c), l = R(n.bottom, l), u = z(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function Bt(e) {
	let { width: t, height: n } = St(e);
	return {
		width: t,
		height: n
	};
}
function Vt(e, t, n) {
	let r = J(t), i = K(t), a = n === "fixed", o = Q(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = B(0);
	function l() {
		c.x = Ot(i);
	}
	if (r || !r && !a) if ((at(t) !== "body" || ct(i)) && (s = vt(t)), r) {
		let e = Q(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	} else i && l();
	a && !r && i && l();
	let u = i && !r && !a ? kt(i, s) : B(0);
	return {
		x: o.left + s.scrollLeft - c.x - u.x,
		y: o.top + s.scrollTop - c.y - u.y,
		width: o.width,
		height: o.height
	};
}
function Ht(e) {
	return X(e).position === "static";
}
function Ut(e, t) {
	if (!J(e) || X(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return K(e) === n && (n = n.ownerDocument.body), n;
}
function Wt(e, t) {
	let n = G(e);
	if (ut(e)) return n;
	if (!J(e)) {
		let t = Z(e);
		for (; t && !_t(t);) {
			if (q(t) && !Ht(t)) return t;
			t = Z(t);
		}
		return n;
	}
	let r = Ut(e, t);
	for (; r && lt(r) && Ht(r);) r = Ut(r, t);
	return r && _t(r) && Ht(r) && !mt(r) ? n : r || ht(e) || n;
}
var Gt = async function(e) {
	let t = this.getOffsetParent || Wt, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: Vt(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function Kt(e) {
	return X(e).direction === "rtl";
}
var qt = {
	convertOffsetParentRelativeRectToViewportRelativeRect: At,
	getDocumentElement: K,
	getClippingRect: zt,
	getOffsetParent: Wt,
	getElementRects: Gt,
	getClientRects: jt,
	getDimensions: Bt,
	getScale: wt,
	isElement: q,
	isRTL: Kt
};
function Jt(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Yt(e, t) {
	let n = null, r, i = K(e);
	function a() {
		var e;
		clearTimeout(r), (e = n) == null || e.disconnect(), n = null;
	}
	function o(s, c) {
		s === void 0 && (s = !1), c === void 0 && (c = 1), a();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (s || t(), !f || !p) return;
		let m = we(d), h = we(i.clientWidth - (u + f)), g = we(i.clientHeight - (d + p)), _ = we(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: z(0, R(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (n !== c) {
				if (!y) return o();
				n ? o(!1, n) : r = setTimeout(() => {
					o(!1, 1e-7);
				}, 1e3);
			}
			n === 1 && !Jt(l, e.getBoundingClientRect()) && o(), y = !1;
		}
		try {
			n = new IntersectionObserver(b, {
				...v,
				root: i.ownerDocument
			});
		} catch {
			n = new IntersectionObserver(b, v);
		}
		n.observe(e);
	}
	return o(!0), a;
}
function Xt(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = Ct(e), u = i || a ? [...l ? bt(l) : [], ...t ? bt(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n, { passive: !0 }), a && e.addEventListener("resize", n);
	});
	let d = l && s ? Yt(l, n) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? Q(e) : null;
	c && g();
	function g() {
		let t = Q(e);
		h && !Jt(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var Zt = et, Qt = tt, $t = Je, en = rt, tn = Ze, nn = qe, rn = nt, an = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = {
		platform: qt,
		...n
	}, a = {
		...i.platform,
		_c: r
	};
	return Ke(e, t, {
		...i,
		platform: a
	});
}, on = typeof document < "u" ? f : function() {};
function sn(e, t) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (typeof e == "function" && e.toString() === t.toString()) return !0;
	let n, r, i;
	if (e && t && typeof e == "object") {
		if (Array.isArray(e)) {
			if (n = e.length, n !== t.length) return !1;
			for (r = n; r-- !== 0;) if (!sn(e[r], t[r])) return !1;
			return !0;
		}
		if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length) return !1;
		for (r = n; r-- !== 0;) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
		for (r = n; r-- !== 0;) {
			let n = i[r];
			if (!(n === "_owner" && e.$$typeof) && !sn(e[n], t[n])) return !1;
		}
		return !0;
	}
	return e !== e && t !== t;
}
function cn(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function ln(e, t) {
	let n = cn(e);
	return Math.round(t * n) / n;
}
function un(e) {
	let t = u.useRef(e);
	return on(() => {
		t.current = e;
	}), t;
}
function dn(e) {
	e === void 0 && (e = {});
	let { placement: t = "bottom", strategy: n = "absolute", middleware: r = [], platform: i, elements: { reference: a, floating: o } = {}, transform: s = !0, whileElementsMounted: c, open: l } = e, [d, f] = u.useState({
		x: 0,
		y: 0,
		strategy: n,
		placement: t,
		middlewareData: {},
		isPositioned: !1
	}), [p, m] = u.useState(r);
	sn(p, r) || m(r);
	let [g, _] = u.useState(null), [v, y] = u.useState(null), b = u.useCallback((e) => {
		e !== w.current && (w.current = e, _(e));
	}, []), x = u.useCallback((e) => {
		e !== T.current && (T.current = e, y(e));
	}, []), S = a || g, C = o || v, w = u.useRef(null), T = u.useRef(null), E = u.useRef(d), D = c != null, O = un(c), k = un(i), A = un(l), j = u.useCallback(() => {
		if (!w.current || !T.current) return;
		let e = {
			placement: t,
			strategy: n,
			middleware: p
		};
		k.current && (e.platform = k.current), an(w.current, T.current, e).then((e) => {
			let t = {
				...e,
				isPositioned: A.current !== !1
			};
			M.current && !sn(E.current, t) && (E.current = t, h.flushSync(() => {
				f(t);
			}));
		});
	}, [
		p,
		t,
		n,
		k,
		A
	]);
	on(() => {
		l === !1 && E.current.isPositioned && (E.current.isPositioned = !1, f((e) => ({
			...e,
			isPositioned: !1
		})));
	}, [l]);
	let M = u.useRef(!1);
	on(() => (M.current = !0, () => {
		M.current = !1;
	}), []), on(() => {
		if (S && (w.current = S), C && (T.current = C), S && C) {
			if (O.current) return O.current(S, C, j);
			j();
		}
	}, [
		S,
		C,
		j,
		O,
		D
	]);
	let N = u.useMemo(() => ({
		reference: w,
		floating: T,
		setReference: b,
		setFloating: x
	}), [b, x]), P = u.useMemo(() => ({
		reference: S,
		floating: C
	}), [S, C]), F = u.useMemo(() => {
		let e = {
			position: n,
			left: 0,
			top: 0
		};
		if (!P.floating) return e;
		let t = ln(P.floating, d.x), r = ln(P.floating, d.y);
		return s ? {
			...e,
			transform: "translate(" + t + "px, " + r + "px)",
			...cn(P.floating) >= 1.5 && { willChange: "transform" }
		} : {
			position: n,
			left: t,
			top: r
		};
	}, [
		n,
		s,
		P.floating,
		d.x,
		d.y
	]);
	return u.useMemo(() => ({
		...d,
		update: j,
		refs: N,
		elements: P,
		floatingStyles: F
	}), [
		d,
		j,
		N,
		P,
		F
	]);
}
var fn = (e) => {
	function t(e) {
		return {}.hasOwnProperty.call(e, "current");
	}
	return {
		name: "arrow",
		options: e,
		fn(n) {
			let { element: r, padding: i } = typeof e == "function" ? e(n) : e;
			return r && t(r) ? r.current == null ? {} : nn({
				element: r.current,
				padding: i
			}).fn(n) : r ? nn({
				element: r,
				padding: i
			}).fn(n) : {};
		}
	};
}, pn = (e, t) => {
	let n = Zt(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, mn = (e, t) => {
	let n = Qt(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, hn = (e, t) => ({
	fn: rn(e).fn,
	options: [e, t]
}), gn = (e, t) => {
	let n = $t(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, _n = (e, t) => {
	let n = en(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, vn = (e, t) => {
	let n = tn(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, yn = (e, t) => {
	let n = fn(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, bn = "Arrow", xn = u.forwardRef((e, t) => {
	let { children: n, width: r = 10, height: i = 5, ...o } = e;
	return /* @__PURE__ */ m(a.svg, {
		...o,
		ref: t,
		width: r,
		height: i,
		viewBox: "0 0 30 10",
		preserveAspectRatio: "none",
		children: e.asChild ? n : /* @__PURE__ */ m("polygon", { points: "0,0 30,0 15,10" })
	});
});
xn.displayName = bn;
var Sn = xn;
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-use-size@1._7011a3fcd66eab5a6c24d3ed044ddf5b/node_modules/@radix-ui/react-use-size/dist/index.mjs
function Cn(e) {
	let [t, n] = u.useState(void 0);
	return r(() => {
		if (e) {
			n({
				width: e.offsetWidth,
				height: e.offsetHeight
			});
			let t = new ResizeObserver((t) => {
				if (!Array.isArray(t) || !t.length) return;
				let r = t[0], i, a;
				if ("borderBoxSize" in r) {
					let e = r.borderBoxSize, t = Array.isArray(e) ? e[0] : e;
					i = t.inlineSize, a = t.blockSize;
				} else i = e.offsetWidth, a = e.offsetHeight;
				n({
					width: i,
					height: a
				});
			});
			return t.observe(e, { box: "border-box" }), () => t.unobserve(e);
		} else n(void 0);
	}, [e]), t;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-popper@1.2._13e0521d8aea7ebfbfb8bee1fb615c05/node_modules/@radix-ui/react-popper/dist/index.mjs
var wn = "Popper", [Tn, En] = l(wn), [Dn, On] = Tn(wn), kn = (e) => {
	let { __scopePopper: t, children: n } = e, [r, i] = u.useState(null);
	return /* @__PURE__ */ m(Dn, {
		scope: t,
		anchor: r,
		onAnchorChange: i,
		children: n
	});
};
kn.displayName = wn;
var An = "PopperAnchor", jn = u.forwardRef((t, n) => {
	let { __scopePopper: r, virtualRef: i, ...o } = t, s = On(An, r), c = u.useRef(null), l = e(n, c), d = u.useRef(null);
	return u.useEffect(() => {
		let e = d.current;
		d.current = i?.current || c.current, e !== d.current && s.onAnchorChange(d.current);
	}), i ? null : /* @__PURE__ */ m(a.div, {
		...o,
		ref: l
	});
});
jn.displayName = An;
var Mn = "PopperContent", [Nn, Pn] = Tn(Mn), Fn = u.forwardRef((t, n) => {
	let { __scopePopper: i, side: s = "bottom", sideOffset: c = 0, align: l = "center", alignOffset: d = 0, arrowPadding: f = 0, avoidCollisions: p = !0, collisionBoundary: h = [], collisionPadding: g = 0, sticky: _ = "partial", hideWhenDetached: v = !1, updatePositionStrategy: y = "optimized", onPlaced: b, ...x } = t, S = On(Mn, i), [C, w] = u.useState(null), T = e(n, (e) => w(e)), [E, D] = u.useState(null), O = Cn(E), k = O?.width ?? 0, A = O?.height ?? 0, j = s + (l === "center" ? "" : "-" + l), M = typeof g == "number" ? g : {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...g
	}, N = Array.isArray(h) ? h : [h], P = N.length > 0, F = {
		padding: M,
		boundary: N.filter(zn),
		altBoundary: P
	}, { refs: ee, floatingStyles: te, placement: ne, isPositioned: re, middlewareData: I } = dn({
		strategy: "fixed",
		placement: j,
		whileElementsMounted: (...e) => Xt(...e, { animationFrame: y === "always" }),
		elements: { reference: S.anchor },
		middleware: [
			pn({
				mainAxis: c + A,
				alignmentAxis: d
			}),
			p && mn({
				mainAxis: !0,
				crossAxis: !1,
				limiter: _ === "partial" ? hn() : void 0,
				...F
			}),
			p && gn({ ...F }),
			_n({
				...F,
				apply: ({ elements: e, rects: t, availableWidth: n, availableHeight: r }) => {
					let { width: i, height: a } = t.reference, o = e.floating.style;
					o.setProperty("--radix-popper-available-width", `${n}px`), o.setProperty("--radix-popper-available-height", `${r}px`), o.setProperty("--radix-popper-anchor-width", `${i}px`), o.setProperty("--radix-popper-anchor-height", `${a}px`);
				}
			}),
			E && yn({
				element: E,
				padding: f
			}),
			Bn({
				arrowWidth: k,
				arrowHeight: A
			}),
			v && vn({
				strategy: "referenceHidden",
				...F
			})
		]
	}), [ie, ae] = Vn(ne), oe = o(b);
	r(() => {
		re && oe?.();
	}, [re, oe]);
	let se = I.arrow?.x, ce = I.arrow?.y, le = I.arrow?.centerOffset !== 0, [ue, de] = u.useState();
	return r(() => {
		C && de(window.getComputedStyle(C).zIndex);
	}, [C]), /* @__PURE__ */ m("div", {
		ref: ee.setFloating,
		"data-radix-popper-content-wrapper": "",
		style: {
			...te,
			transform: re ? te.transform : "translate(0, -200%)",
			minWidth: "max-content",
			zIndex: ue,
			"--radix-popper-transform-origin": [I.transformOrigin?.x, I.transformOrigin?.y].join(" "),
			...I.hide?.referenceHidden && {
				visibility: "hidden",
				pointerEvents: "none"
			}
		},
		dir: t.dir,
		children: /* @__PURE__ */ m(Nn, {
			scope: i,
			placedSide: ie,
			onArrowChange: D,
			arrowX: se,
			arrowY: ce,
			shouldHideArrow: le,
			children: /* @__PURE__ */ m(a.div, {
				"data-side": ie,
				"data-align": ae,
				...x,
				ref: T,
				style: {
					...x.style,
					animation: re ? void 0 : "none"
				}
			})
		})
	});
});
Fn.displayName = Mn;
var In = "PopperArrow", Ln = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
}, Rn = u.forwardRef(function(e, t) {
	let { __scopePopper: n, ...r } = e, i = Pn(In, n), a = Ln[i.placedSide];
	return /* @__PURE__ */ m("span", {
		ref: i.onArrowChange,
		style: {
			position: "absolute",
			left: i.arrowX,
			top: i.arrowY,
			[a]: 0,
			transformOrigin: {
				top: "",
				right: "0 0",
				bottom: "center 0",
				left: "100% 0"
			}[i.placedSide],
			transform: {
				top: "translateY(100%)",
				right: "translateY(50%) rotate(90deg) translateX(-50%)",
				bottom: "rotate(180deg)",
				left: "translateY(50%) rotate(-90deg) translateX(50%)"
			}[i.placedSide],
			visibility: i.shouldHideArrow ? "hidden" : void 0
		},
		children: /* @__PURE__ */ m(Sn, {
			...r,
			ref: t,
			style: {
				...r.style,
				display: "block"
			}
		})
	});
});
Rn.displayName = In;
function zn(e) {
	return e !== null;
}
var Bn = (e) => ({
	name: "transformOrigin",
	options: e,
	fn(t) {
		let { placement: n, rects: r, middlewareData: i } = t, a = i.arrow?.centerOffset !== 0, o = a ? 0 : e.arrowWidth, s = a ? 0 : e.arrowHeight, [c, l] = Vn(n), u = {
			start: "0%",
			center: "50%",
			end: "100%"
		}[l], d = (i.arrow?.x ?? 0) + o / 2, f = (i.arrow?.y ?? 0) + s / 2, p = "", m = "";
		return c === "bottom" ? (p = a ? u : `${d}px`, m = `${-s}px`) : c === "top" ? (p = a ? u : `${d}px`, m = `${r.floating.height + s}px`) : c === "right" ? (p = `${-s}px`, m = a ? u : `${f}px`) : c === "left" && (p = `${r.floating.width + s}px`, m = a ? u : `${f}px`), { data: {
			x: p,
			y: m
		} };
	}
});
function Vn(e) {
	let [t, n = "center"] = e.split("-");
	return [t, n];
}
var Hn = kn, Un = jn, Wn = Fn, Gn = Rn, Kn = "Portal", qn = u.forwardRef((e, t) => {
	let { container: n, ...i } = e, [o, s] = u.useState(!1);
	r(() => s(!0), []);
	let c = n || o && globalThis?.document?.body;
	return c ? g.createPortal(/* @__PURE__ */ m(a.div, {
		...i,
		ref: t
	}), c) : null;
});
qn.displayName = Kn;
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-roving-focu_4eeb29c998b846c35358e2f929e7490e/node_modules/@radix-ui/react-roving-focus/dist/index.mjs
var Jn = "rovingFocusGroup.onEntryFocus", Yn = {
	bubbles: !1,
	cancelable: !0
}, Xn = "RovingFocusGroup", [Zn, Qn, $n] = C(Xn), [er, tr] = l(Xn, [$n]), [nr, rr] = er(Xn), ir = u.forwardRef((e, t) => /* @__PURE__ */ m(Zn.Provider, {
	scope: e.__scopeRovingFocusGroup,
	children: /* @__PURE__ */ m(Zn.Slot, {
		scope: e.__scopeRovingFocusGroup,
		children: /* @__PURE__ */ m(ar, {
			...e,
			ref: t
		})
	})
}));
ir.displayName = Xn;
var ar = u.forwardRef((t, n) => {
	let { __scopeRovingFocusGroup: r, orientation: s, loop: l = !1, dir: d, currentTabStopId: f, defaultCurrentTabStopId: p, onCurrentTabStopIdChange: h, onEntryFocus: g, preventScrollOnEntryFocus: _ = !1, ...v } = t, y = u.useRef(null), x = e(n, y), S = c(d), [C, w] = b({
		prop: f,
		defaultProp: p ?? null,
		onChange: h,
		caller: Xn
	}), [T, E] = u.useState(!1), D = o(g), O = Qn(r), k = u.useRef(!1), [A, j] = u.useState(0);
	return u.useEffect(() => {
		let e = y.current;
		if (e) return e.addEventListener(Jn, D), () => e.removeEventListener(Jn, D);
	}, [D]), /* @__PURE__ */ m(nr, {
		scope: r,
		orientation: s,
		dir: S,
		loop: l,
		currentTabStopId: C,
		onItemFocus: u.useCallback((e) => w(e), [w]),
		onItemShiftTab: u.useCallback(() => E(!0), []),
		onFocusableItemAdd: u.useCallback(() => j((e) => e + 1), []),
		onFocusableItemRemove: u.useCallback(() => j((e) => e - 1), []),
		children: /* @__PURE__ */ m(a.div, {
			tabIndex: T || A === 0 ? -1 : 0,
			"data-orientation": s,
			...v,
			ref: x,
			style: {
				outline: "none",
				...t.style
			},
			onMouseDown: i(t.onMouseDown, () => {
				k.current = !0;
			}),
			onFocus: i(t.onFocus, (e) => {
				let t = !k.current;
				if (e.target === e.currentTarget && t && !T) {
					let t = new CustomEvent(Jn, Yn);
					if (e.currentTarget.dispatchEvent(t), !t.defaultPrevented) {
						let e = O().filter((e) => e.focusable);
						dr([
							e.find((e) => e.active),
							e.find((e) => e.id === C),
							...e
						].filter(Boolean).map((e) => e.ref.current), _);
					}
				}
				k.current = !1;
			}),
			onBlur: i(t.onBlur, () => E(!1))
		})
	});
}), or = "RovingFocusGroupItem", sr = u.forwardRef((e, t) => {
	let { __scopeRovingFocusGroup: n, focusable: r = !0, active: o = !1, tabStopId: s, children: c, ...l } = e, d = xe(), f = s || d, p = rr(or, n), h = p.currentTabStopId === f, g = Qn(n), { onFocusableItemAdd: _, onFocusableItemRemove: v, currentTabStopId: y } = p;
	return u.useEffect(() => {
		if (r) return _(), () => v();
	}, [
		r,
		_,
		v
	]), /* @__PURE__ */ m(Zn.ItemSlot, {
		scope: n,
		id: f,
		focusable: r,
		active: o,
		children: /* @__PURE__ */ m(a.span, {
			tabIndex: h ? 0 : -1,
			"data-orientation": p.orientation,
			...l,
			ref: t,
			onMouseDown: i(e.onMouseDown, (e) => {
				r ? p.onItemFocus(f) : e.preventDefault();
			}),
			onFocus: i(e.onFocus, () => p.onItemFocus(f)),
			onKeyDown: i(e.onKeyDown, (e) => {
				if (e.key === "Tab" && e.shiftKey) {
					p.onItemShiftTab();
					return;
				}
				if (e.target !== e.currentTarget) return;
				let t = ur(e, p.orientation, p.dir);
				if (t !== void 0) {
					if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
					e.preventDefault();
					let n = g().filter((e) => e.focusable).map((e) => e.ref.current);
					if (t === "last") n.reverse();
					else if (t === "prev" || t === "next") {
						t === "prev" && n.reverse();
						let r = n.indexOf(e.currentTarget);
						n = p.loop ? fr(n, r + 1) : n.slice(r + 1);
					}
					setTimeout(() => dr(n));
				}
			}),
			children: typeof c == "function" ? c({
				isCurrentTabStop: h,
				hasTabStop: y != null
			}) : c
		})
	});
});
sr.displayName = or;
var cr = {
	ArrowLeft: "prev",
	ArrowUp: "prev",
	ArrowRight: "next",
	ArrowDown: "next",
	PageUp: "first",
	Home: "first",
	PageDown: "last",
	End: "last"
};
function lr(e, t) {
	return t === "rtl" ? e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e : e;
}
function ur(e, t, n) {
	let r = lr(e.key, n);
	if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r))) return cr[r];
}
function dr(e, t = !1) {
	let n = document.activeElement;
	for (let r of e) if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function fr(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
var pr = ir, mr = sr, hr = function(e) {
	return typeof document > "u" ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
}, gr = /* @__PURE__ */ new WeakMap(), _r = /* @__PURE__ */ new WeakMap(), vr = {}, yr = 0, br = function(e) {
	return e && (e.host || br(e.parentNode));
}, xr = function(e, t) {
	return t.map(function(t) {
		if (e.contains(t)) return t;
		var n = br(t);
		return n && e.contains(n) ? n : (console.error("aria-hidden", t, "in not contained inside", e, ". Doing nothing"), null);
	}).filter(function(e) {
		return !!e;
	});
}, Sr = function(e, t, n, r) {
	var i = xr(t, Array.isArray(e) ? e : [e]);
	vr[n] || (vr[n] = /* @__PURE__ */ new WeakMap());
	var a = vr[n], o = [], s = /* @__PURE__ */ new Set(), c = new Set(i), l = function(e) {
		!e || s.has(e) || (s.add(e), l(e.parentNode));
	};
	i.forEach(l);
	var u = function(e) {
		!e || c.has(e) || Array.prototype.forEach.call(e.children, function(e) {
			if (s.has(e)) u(e);
			else try {
				var t = e.getAttribute(r), i = t !== null && t !== "false", c = (gr.get(e) || 0) + 1, l = (a.get(e) || 0) + 1;
				gr.set(e, c), a.set(e, l), o.push(e), c === 1 && i && _r.set(e, !0), l === 1 && e.setAttribute(n, "true"), i || e.setAttribute(r, "true");
			} catch (t) {
				console.error("aria-hidden: cannot operate on ", e, t);
			}
		});
	};
	return u(t), s.clear(), yr++, function() {
		o.forEach(function(e) {
			var t = gr.get(e) - 1, i = a.get(e) - 1;
			gr.set(e, t), a.set(e, i), t || (_r.has(e) || e.removeAttribute(r), _r.delete(e)), i || e.removeAttribute(n);
		}), yr--, yr || (gr = /* @__PURE__ */ new WeakMap(), gr = /* @__PURE__ */ new WeakMap(), _r = /* @__PURE__ */ new WeakMap(), vr = {});
	};
}, Cr = function(e, t, n) {
	n === void 0 && (n = "data-aria-hidden");
	var r = Array.from(Array.isArray(e) ? e : [e]), i = t || hr(e);
	return i ? (r.push.apply(r, Array.from(i.querySelectorAll("[aria-live], script"))), Sr(r, i, n, "aria-hidden")) : function() {
		return null;
	};
}, $ = function() {
	return $ = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, $.apply(this, arguments);
};
function wr(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
function Tr(e, t, n) {
	if (n || arguments.length === 2) for (var r = 0, i = t.length, a; r < i; r++) (a || !(r in t)) && (a ||= Array.prototype.slice.call(t, 0, r), a[r] = t[r]);
	return e.concat(a || Array.prototype.slice.call(t));
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-remove-scroll-bar@2.3_25ad6fb9fe75be4391ed3c9752b30d68/node_modules/react-remove-scroll-bar/dist/es2015/constants.js
var Er = "right-scroll-bar-position", Dr = "width-before-scroll-bar", Or = "with-scroll-bars-hidden", kr = "--removed-body-scroll-bar-size";
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/use-callback-ref@1.3.3_@types+react@19.2.14_react@19.2.4/node_modules/use-callback-ref/dist/es2015/assignRef.js
function Ar(e, t) {
	return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/use-callback-ref@1.3.3_@types+react@19.2.14_react@19.2.4/node_modules/use-callback-ref/dist/es2015/useRef.js
function jr(e, t) {
	var n = p(function() {
		return {
			value: e,
			callback: t,
			facade: {
				get current() {
					return n.value;
				},
				set current(e) {
					var t = n.value;
					t !== e && (n.value = e, n.callback(e, t));
				}
			}
		};
	})[0];
	return n.callback = t, n.facade;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/use-callback-ref@1.3.3_@types+react@19.2.14_react@19.2.4/node_modules/use-callback-ref/dist/es2015/useMergeRef.js
var Mr = typeof window < "u" ? u.useLayoutEffect : u.useEffect, Nr = /* @__PURE__ */ new WeakMap();
function Pr(e, t) {
	var n = jr(t || null, function(t) {
		return e.forEach(function(e) {
			return Ar(e, t);
		});
	});
	return Mr(function() {
		var t = Nr.get(n);
		if (t) {
			var r = new Set(t), i = new Set(e), a = n.current;
			r.forEach(function(e) {
				i.has(e) || Ar(e, null);
			}), i.forEach(function(e) {
				r.has(e) || Ar(e, a);
			});
		}
		Nr.set(n, e);
	}, [e]), n;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/use-sidecar@1.1.3_@types+react@19.2.14_react@19.2.4/node_modules/use-sidecar/dist/es2015/medium.js
function Fr(e) {
	return e;
}
function Ir(e, t) {
	t === void 0 && (t = Fr);
	var n = [], r = !1;
	return {
		read: function() {
			if (r) throw Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
			return n.length ? n[n.length - 1] : e;
		},
		useMedium: function(e) {
			var i = t(e, r);
			return n.push(i), function() {
				n = n.filter(function(e) {
					return e !== i;
				});
			};
		},
		assignSyncMedium: function(e) {
			for (r = !0; n.length;) {
				var t = n;
				n = [], t.forEach(e);
			}
			n = {
				push: function(t) {
					return e(t);
				},
				filter: function() {
					return n;
				}
			};
		},
		assignMedium: function(e) {
			r = !0;
			var t = [];
			if (n.length) {
				var i = n;
				n = [], i.forEach(e), t = n;
			}
			var a = function() {
				var n = t;
				t = [], n.forEach(e);
			}, o = function() {
				return Promise.resolve().then(a);
			};
			o(), n = {
				push: function(e) {
					t.push(e), o();
				},
				filter: function(e) {
					return t = t.filter(e), n;
				}
			};
		}
	};
}
function Lr(e) {
	e === void 0 && (e = {});
	var t = Ir(null);
	return t.options = $({
		async: !0,
		ssr: !1
	}, e), t;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/use-sidecar@1.1.3_@types+react@19.2.14_react@19.2.4/node_modules/use-sidecar/dist/es2015/exports.js
var Rr = function(e) {
	var t = e.sideCar, n = wr(e, ["sideCar"]);
	if (!t) throw Error("Sidecar: please provide `sideCar` property to import the right car");
	var r = t.read();
	if (!r) throw Error("Sidecar medium not found");
	return u.createElement(r, $({}, n));
};
Rr.isSideCarExport = !0;
function zr(e, t) {
	return e.useMedium(t), Rr;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-remove-scroll@2.7.2_@types+react@19.2.14_react@19.2.4/node_modules/react-remove-scroll/dist/es2015/medium.js
var Br = Lr(), Vr = function() {}, Hr = u.forwardRef(function(e, t) {
	var n = u.useRef(null), r = u.useState({
		onScrollCapture: Vr,
		onWheelCapture: Vr,
		onTouchMoveCapture: Vr
	}), i = r[0], a = r[1], o = e.forwardProps, s = e.children, c = e.className, l = e.removeScrollBar, d = e.enabled, f = e.shards, p = e.sideCar, m = e.noRelative, h = e.noIsolation, g = e.inert, _ = e.allowPinchZoom, v = e.as, y = v === void 0 ? "div" : v, b = e.gapMode, x = wr(e, [
		"forwardProps",
		"children",
		"className",
		"removeScrollBar",
		"enabled",
		"shards",
		"sideCar",
		"noRelative",
		"noIsolation",
		"inert",
		"allowPinchZoom",
		"as",
		"gapMode"
	]), S = p, C = Pr([n, t]), w = $($({}, x), i);
	return u.createElement(u.Fragment, null, d && u.createElement(S, {
		sideCar: Br,
		removeScrollBar: l,
		shards: f,
		noRelative: m,
		noIsolation: h,
		inert: g,
		setCallbacks: a,
		allowPinchZoom: !!_,
		lockRef: n,
		gapMode: b
	}), o ? u.cloneElement(u.Children.only(s), $($({}, w), { ref: C })) : u.createElement(y, $({}, w, {
		className: c,
		ref: C
	}), s));
});
Hr.defaultProps = {
	enabled: !0,
	removeScrollBar: !0,
	inert: !1
}, Hr.classNames = {
	fullWidth: Dr,
	zeroRight: Er
};
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/get-nonce@1.0.1/node_modules/get-nonce/dist/es2015/index.js
var Ur, Wr = function() {
	if (Ur) return Ur;
	if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-style-singleton@2.2.3_19dd01ab2b695c353a9afad65534024e/node_modules/react-style-singleton/dist/es2015/singleton.js
function Gr() {
	if (!document) return null;
	var e = document.createElement("style");
	e.type = "text/css";
	var t = Wr();
	return t && e.setAttribute("nonce", t), e;
}
function Kr(e, t) {
	e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function qr(e) {
	(document.head || document.getElementsByTagName("head")[0]).appendChild(e);
}
var Jr = function() {
	var e = 0, t = null;
	return {
		add: function(n) {
			e == 0 && (t = Gr()) && (Kr(t, n), qr(t)), e++;
		},
		remove: function() {
			e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
		}
	};
}, Yr = function() {
	var e = Jr();
	return function(t, n) {
		u.useEffect(function() {
			return e.add(t), function() {
				e.remove();
			};
		}, [t && n]);
	};
}, Xr = function() {
	var e = Yr();
	return function(t) {
		var n = t.styles, r = t.dynamic;
		return e(n, r), null;
	};
}, Zr = {
	left: 0,
	top: 0,
	right: 0,
	gap: 0
}, Qr = function(e) {
	return parseInt(e || "", 10) || 0;
}, $r = function(e) {
	var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], i = t[e === "padding" ? "paddingRight" : "marginRight"];
	return [
		Qr(n),
		Qr(r),
		Qr(i)
	];
}, ei = function(e) {
	if (e === void 0 && (e = "margin"), typeof window > "u") return Zr;
	var t = $r(e), n = document.documentElement.clientWidth, r = window.innerWidth;
	return {
		left: t[0],
		top: t[1],
		right: t[2],
		gap: Math.max(0, r - n + t[2] - t[0])
	};
}, ti = Xr(), ni = "data-scroll-locked", ri = function(e, t, n, r) {
	var i = e.left, a = e.top, o = e.right, s = e.gap;
	return n === void 0 && (n = "margin"), `
  .${Or} {
   overflow: hidden ${r};
   padding-right: ${s}px ${r};
  }
  body[${ni}] {
    overflow: hidden ${r};
    overscroll-behavior: contain;
    ${[
		t && `position: relative ${r};`,
		n === "margin" && `
    padding-left: ${i}px;
    padding-top: ${a}px;
    padding-right: ${o}px;
    margin-left:0;
    margin-top:0;
    margin-right: ${s}px ${r};
    `,
		n === "padding" && `padding-right: ${s}px ${r};`
	].filter(Boolean).join("")}
  }
  
  .${Er} {
    right: ${s}px ${r};
  }
  
  .${Dr} {
    margin-right: ${s}px ${r};
  }
  
  .${Er} .${Er} {
    right: 0 ${r};
  }
  
  .${Dr} .${Dr} {
    margin-right: 0 ${r};
  }
  
  body[${ni}] {
    ${kr}: ${s}px;
  }
`;
}, ii = function() {
	var e = parseInt(document.body.getAttribute("data-scroll-locked") || "0", 10);
	return isFinite(e) ? e : 0;
}, ai = function() {
	u.useEffect(function() {
		return document.body.setAttribute(ni, (ii() + 1).toString()), function() {
			var e = ii() - 1;
			e <= 0 ? document.body.removeAttribute(ni) : document.body.setAttribute(ni, e.toString());
		};
	}, []);
}, oi = function(e) {
	var t = e.noRelative, n = e.noImportant, r = e.gapMode, i = r === void 0 ? "margin" : r;
	ai();
	var a = u.useMemo(function() {
		return ei(i);
	}, [i]);
	return u.createElement(ti, { styles: ri(a, !t, i, n ? "" : "!important") });
}, si = !1;
if (typeof window < "u") try {
	var ci = Object.defineProperty({}, "passive", { get: function() {
		return si = !0, !0;
	} });
	window.addEventListener("test", ci, ci), window.removeEventListener("test", ci, ci);
} catch {
	si = !1;
}
var li = si ? { passive: !1 } : !1, ui = function(e) {
	return e.tagName === "TEXTAREA";
}, di = function(e, t) {
	if (!(e instanceof Element)) return !1;
	var n = window.getComputedStyle(e);
	return n[t] !== "hidden" && !(n.overflowY === n.overflowX && !ui(e) && n[t] === "visible");
}, fi = function(e) {
	return di(e, "overflowY");
}, pi = function(e) {
	return di(e, "overflowX");
}, mi = function(e, t) {
	var n = t.ownerDocument, r = t;
	do {
		if (typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host), _i(e, r)) {
			var i = vi(e, r);
			if (i[1] > i[2]) return !0;
		}
		r = r.parentNode;
	} while (r && r !== n.body);
	return !1;
}, hi = function(e) {
	return [
		e.scrollTop,
		e.scrollHeight,
		e.clientHeight
	];
}, gi = function(e) {
	return [
		e.scrollLeft,
		e.scrollWidth,
		e.clientWidth
	];
}, _i = function(e, t) {
	return e === "v" ? fi(t) : pi(t);
}, vi = function(e, t) {
	return e === "v" ? hi(t) : gi(t);
}, yi = function(e, t) {
	return e === "h" && t === "rtl" ? -1 : 1;
}, bi = function(e, t, n, r, i) {
	var a = yi(e, window.getComputedStyle(t).direction), o = a * r, s = n.target, c = t.contains(s), l = !1, u = o > 0, d = 0, f = 0;
	do {
		if (!s) break;
		var p = vi(e, s), m = p[0], h = p[1] - p[2] - a * m;
		(m || h) && _i(e, s) && (d += h, f += m);
		var g = s.parentNode;
		s = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g;
	} while (!c && s !== document.body || c && (t.contains(s) || t === s));
	return (u && (i && Math.abs(d) < 1 || !i && o > d) || !u && (i && Math.abs(f) < 1 || !i && -o > f)) && (l = !0), l;
}, xi = function(e) {
	return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, Si = function(e) {
	return [e.deltaX, e.deltaY];
}, Ci = function(e) {
	return e && "current" in e ? e.current : e;
}, wi = function(e, t) {
	return e[0] === t[0] && e[1] === t[1];
}, Ti = function(e) {
	return `
  .block-interactivity-${e} {pointer-events: none;}
  .allow-interactivity-${e} {pointer-events: all;}
`;
}, Ei = 0, Di = [];
function Oi(e) {
	var t = u.useRef([]), n = u.useRef([0, 0]), r = u.useRef(), i = u.useState(Ei++)[0], a = u.useState(Xr)[0], o = u.useRef(e);
	u.useEffect(function() {
		o.current = e;
	}, [e]), u.useEffect(function() {
		if (e.inert) {
			document.body.classList.add(`block-interactivity-${i}`);
			var t = Tr([e.lockRef.current], (e.shards || []).map(Ci), !0).filter(Boolean);
			return t.forEach(function(e) {
				return e.classList.add(`allow-interactivity-${i}`);
			}), function() {
				document.body.classList.remove(`block-interactivity-${i}`), t.forEach(function(e) {
					return e.classList.remove(`allow-interactivity-${i}`);
				});
			};
		}
	}, [
		e.inert,
		e.lockRef.current,
		e.shards
	]);
	var s = u.useCallback(function(e, t) {
		if ("touches" in e && e.touches.length === 2 || e.type === "wheel" && e.ctrlKey) return !o.current.allowPinchZoom;
		var i = xi(e), a = n.current, s = "deltaX" in e ? e.deltaX : a[0] - i[0], c = "deltaY" in e ? e.deltaY : a[1] - i[1], l, u = e.target, d = Math.abs(s) > Math.abs(c) ? "h" : "v";
		if ("touches" in e && d === "h" && u.type === "range") return !1;
		var f = window.getSelection(), p = f && f.anchorNode;
		if (p && (p === u || p.contains(u))) return !1;
		var m = mi(d, u);
		if (!m) return !0;
		if (m ? l = d : (l = d === "v" ? "h" : "v", m = mi(d, u)), !m) return !1;
		if (!r.current && "changedTouches" in e && (s || c) && (r.current = l), !l) return !0;
		var h = r.current || l;
		return bi(h, t, e, h === "h" ? s : c, !0);
	}, []), c = u.useCallback(function(e) {
		var n = e;
		if (!(!Di.length || Di[Di.length - 1] !== a)) {
			var r = "deltaY" in n ? Si(n) : xi(n), i = t.current.filter(function(e) {
				return e.name === n.type && (e.target === n.target || n.target === e.shadowParent) && wi(e.delta, r);
			})[0];
			if (i && i.should) {
				n.cancelable && n.preventDefault();
				return;
			}
			if (!i) {
				var c = (o.current.shards || []).map(Ci).filter(Boolean).filter(function(e) {
					return e.contains(n.target);
				});
				(c.length > 0 ? s(n, c[0]) : !o.current.noIsolation) && n.cancelable && n.preventDefault();
			}
		}
	}, []), l = u.useCallback(function(e, n, r, i) {
		var a = {
			name: e,
			delta: n,
			target: r,
			should: i,
			shadowParent: ki(r)
		};
		t.current.push(a), setTimeout(function() {
			t.current = t.current.filter(function(e) {
				return e !== a;
			});
		}, 1);
	}, []), d = u.useCallback(function(e) {
		n.current = xi(e), r.current = void 0;
	}, []), f = u.useCallback(function(t) {
		l(t.type, Si(t), t.target, s(t, e.lockRef.current));
	}, []), p = u.useCallback(function(t) {
		l(t.type, xi(t), t.target, s(t, e.lockRef.current));
	}, []);
	u.useEffect(function() {
		return Di.push(a), e.setCallbacks({
			onScrollCapture: f,
			onWheelCapture: f,
			onTouchMoveCapture: p
		}), document.addEventListener("wheel", c, li), document.addEventListener("touchmove", c, li), document.addEventListener("touchstart", d, li), function() {
			Di = Di.filter(function(e) {
				return e !== a;
			}), document.removeEventListener("wheel", c, li), document.removeEventListener("touchmove", c, li), document.removeEventListener("touchstart", d, li);
		};
	}, []);
	var m = e.removeScrollBar, h = e.inert;
	return u.createElement(u.Fragment, null, h ? u.createElement(a, { styles: Ti(i) }) : null, m ? u.createElement(oi, {
		noRelative: e.noRelative,
		gapMode: e.gapMode
	}) : null);
}
function ki(e) {
	for (var t = null; e !== null;) e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
	return t;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-remove-scroll@2.7.2_@types+react@19.2.14_react@19.2.4/node_modules/react-remove-scroll/dist/es2015/sidecar.js
var Ai = zr(Br, Oi), ji = u.forwardRef(function(e, t) {
	return u.createElement(Hr, $({}, e, {
		ref: t,
		sideCar: Ai
	}));
});
ji.classNames = Hr.classNames;
//#endregion
export { C as _, tr as a, _ as b, Gn as c, En as d, Cn as f, j as g, re as h, pr as i, Wn as l, ce as m, Cr as n, qn as o, xe as p, mr as r, Un as s, ji as t, Hn as u, b as v, v as y };

//# sourceMappingURL=Combination-DHpOS5dI.js.map