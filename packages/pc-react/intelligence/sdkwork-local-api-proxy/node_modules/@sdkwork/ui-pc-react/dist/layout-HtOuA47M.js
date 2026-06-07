import { t as e } from "./utils-Bgb-Nm-x.js";
import { i as t } from "./dist-CJMju1B6.js";
import { t as n } from "./chevron-down-COFRXzK7.js";
import { t as r } from "./chevron-right-C2amLX5H.js";
import { c as i, d as a, i as o, n as s, r as c, t as l, u } from "./dist-Dedo1J3L.js";
import { t as d } from "./dist-z6084cel.js";
import { t as f } from "./dist-Cqg1besQ.js";
import * as p from "react";
import { createContext as m, useCallback as h, useContext as g, useEffect as _, useId as v, useImperativeHandle as y, useLayoutEffect as b, useMemo as x, useRef as S, useState as C, useSyncExternalStore as w } from "react";
import { Fragment as T, jsx as E, jsxs as D } from "react/jsx-runtime";
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-scroll-area_155614c2fe5222bb9b221068b09efefc/node_modules/@radix-ui/react-scroll-area/dist/index.mjs
function O(e, t) {
	return p.useReducer((e, n) => t[e][n] ?? e, e);
}
var k = "ScrollArea", [A, ee] = u(k), [te, j] = A(k), ne = p.forwardRef((e, n) => {
	let { __scopeScrollArea: r, type: i = "hover", dir: a, scrollHideDelay: s = 600, ...l } = e, [u, d] = p.useState(null), [f, m] = p.useState(null), [h, g] = p.useState(null), [_, v] = p.useState(null), [y, b] = p.useState(null), [x, S] = p.useState(0), [C, w] = p.useState(0), [T, D] = p.useState(!1), [O, k] = p.useState(!1), A = t(n, (e) => d(e)), ee = c(a);
	return /* @__PURE__ */ E(te, {
		scope: r,
		type: i,
		dir: ee,
		scrollHideDelay: s,
		scrollArea: u,
		viewport: f,
		onViewportChange: m,
		content: h,
		onContentChange: g,
		scrollbarX: _,
		onScrollbarXChange: v,
		scrollbarXEnabled: T,
		onScrollbarXEnabledChange: D,
		scrollbarY: y,
		onScrollbarYChange: b,
		scrollbarYEnabled: O,
		onScrollbarYEnabledChange: k,
		onCornerWidthChange: S,
		onCornerHeightChange: w,
		children: /* @__PURE__ */ E(o.div, {
			dir: ee,
			...l,
			ref: A,
			style: {
				position: "relative",
				"--radix-scroll-area-corner-width": x + "px",
				"--radix-scroll-area-corner-height": C + "px",
				...e.style
			}
		})
	});
});
ne.displayName = k;
var re = "ScrollAreaViewport", ie = p.forwardRef((e, n) => {
	let { __scopeScrollArea: r, children: i, nonce: a, ...s } = e, c = j(re, r), l = t(n, p.useRef(null), c.onViewportChange);
	return /* @__PURE__ */ D(T, { children: [/* @__PURE__ */ E("style", {
		dangerouslySetInnerHTML: { __html: "[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}" },
		nonce: a
	}), /* @__PURE__ */ E(o.div, {
		"data-radix-scroll-area-viewport": "",
		...s,
		ref: l,
		style: {
			overflowX: c.scrollbarXEnabled ? "scroll" : "hidden",
			overflowY: c.scrollbarYEnabled ? "scroll" : "hidden",
			...e.style
		},
		children: /* @__PURE__ */ E("div", {
			ref: c.onContentChange,
			style: {
				minWidth: "100%",
				display: "table"
			},
			children: i
		})
	})] });
});
ie.displayName = re;
var M = "ScrollAreaScrollbar", ae = p.forwardRef((e, t) => {
	let { forceMount: n, ...r } = e, i = j(M, e.__scopeScrollArea), { onScrollbarXEnabledChange: a, onScrollbarYEnabledChange: o } = i, s = e.orientation === "horizontal";
	return p.useEffect(() => (s ? a(!0) : o(!0), () => {
		s ? a(!1) : o(!1);
	}), [
		s,
		a,
		o
	]), i.type === "hover" ? /* @__PURE__ */ E(oe, {
		...r,
		ref: t,
		forceMount: n
	}) : i.type === "scroll" ? /* @__PURE__ */ E(se, {
		...r,
		ref: t,
		forceMount: n
	}) : i.type === "auto" ? /* @__PURE__ */ E(ce, {
		...r,
		ref: t,
		forceMount: n
	}) : i.type === "always" ? /* @__PURE__ */ E(le, {
		...r,
		ref: t
	}) : null;
});
ae.displayName = M;
var oe = p.forwardRef((e, t) => {
	let { forceMount: n, ...r } = e, i = j(M, e.__scopeScrollArea), [a, o] = p.useState(!1);
	return p.useEffect(() => {
		let e = i.scrollArea, t = 0;
		if (e) {
			let n = () => {
				window.clearTimeout(t), o(!0);
			}, r = () => {
				t = window.setTimeout(() => o(!1), i.scrollHideDelay);
			};
			return e.addEventListener("pointerenter", n), e.addEventListener("pointerleave", r), () => {
				window.clearTimeout(t), e.removeEventListener("pointerenter", n), e.removeEventListener("pointerleave", r);
			};
		}
	}, [i.scrollArea, i.scrollHideDelay]), /* @__PURE__ */ E(l, {
		present: n || a,
		children: /* @__PURE__ */ E(ce, {
			"data-state": a ? "visible" : "hidden",
			...r,
			ref: t
		})
	});
}), se = p.forwardRef((e, t) => {
	let { forceMount: n, ...r } = e, i = j(M, e.__scopeScrollArea), o = e.orientation === "horizontal", s = ke(() => u("SCROLL_END"), 100), [c, u] = O("hidden", {
		hidden: { SCROLL: "scrolling" },
		scrolling: {
			SCROLL_END: "idle",
			POINTER_ENTER: "interacting"
		},
		interacting: {
			SCROLL: "interacting",
			POINTER_LEAVE: "idle"
		},
		idle: {
			HIDE: "hidden",
			SCROLL: "scrolling",
			POINTER_ENTER: "interacting"
		}
	});
	return p.useEffect(() => {
		if (c === "idle") {
			let e = window.setTimeout(() => u("HIDE"), i.scrollHideDelay);
			return () => window.clearTimeout(e);
		}
	}, [
		c,
		i.scrollHideDelay,
		u
	]), p.useEffect(() => {
		let e = i.viewport, t = o ? "scrollLeft" : "scrollTop";
		if (e) {
			let n = e[t], r = () => {
				let r = e[t];
				n !== r && (u("SCROLL"), s()), n = r;
			};
			return e.addEventListener("scroll", r), () => e.removeEventListener("scroll", r);
		}
	}, [
		i.viewport,
		o,
		u,
		s
	]), /* @__PURE__ */ E(l, {
		present: n || c !== "hidden",
		children: /* @__PURE__ */ E(le, {
			"data-state": c === "hidden" ? "hidden" : "visible",
			...r,
			ref: t,
			onPointerEnter: a(e.onPointerEnter, () => u("POINTER_ENTER")),
			onPointerLeave: a(e.onPointerLeave, () => u("POINTER_LEAVE"))
		})
	});
}), ce = p.forwardRef((e, t) => {
	let n = j(M, e.__scopeScrollArea), { forceMount: r, ...i } = e, [a, o] = p.useState(!1), s = e.orientation === "horizontal", c = ke(() => {
		if (n.viewport) {
			let e = n.viewport.offsetWidth < n.viewport.scrollWidth, t = n.viewport.offsetHeight < n.viewport.scrollHeight;
			o(s ? e : t);
		}
	}, 10);
	return N(n.viewport, c), N(n.content, c), /* @__PURE__ */ E(l, {
		present: r || a,
		children: /* @__PURE__ */ E(le, {
			"data-state": a ? "visible" : "hidden",
			...i,
			ref: t
		})
	});
}), le = p.forwardRef((e, t) => {
	let { orientation: n = "vertical", ...r } = e, i = j(M, e.__scopeScrollArea), a = p.useRef(null), o = p.useRef(0), [s, c] = p.useState({
		content: 0,
		viewport: 0,
		scrollbar: {
			size: 0,
			paddingStart: 0,
			paddingEnd: 0
		}
	}), l = Se(s.viewport, s.content), u = {
		...r,
		sizes: s,
		onSizesChange: c,
		hasThumb: l > 0 && l < 1,
		onThumbChange: (e) => a.current = e,
		onThumbPointerUp: () => o.current = 0,
		onThumbPointerDown: (e) => o.current = e
	};
	function d(e, t) {
		return we(e, o.current, s, t);
	}
	return n === "horizontal" ? /* @__PURE__ */ E(ue, {
		...u,
		ref: t,
		onThumbPositionChange: () => {
			if (i.viewport && a.current) {
				let e = i.viewport.scrollLeft, t = Te(e, s, i.dir);
				a.current.style.transform = `translate3d(${t}px, 0, 0)`;
			}
		},
		onWheelScroll: (e) => {
			i.viewport && (i.viewport.scrollLeft = e);
		},
		onDragScroll: (e) => {
			i.viewport && (i.viewport.scrollLeft = d(e, i.dir));
		}
	}) : n === "vertical" ? /* @__PURE__ */ E(de, {
		...u,
		ref: t,
		onThumbPositionChange: () => {
			if (i.viewport && a.current) {
				let e = i.viewport.scrollTop, t = Te(e, s);
				a.current.style.transform = `translate3d(0, ${t}px, 0)`;
			}
		},
		onWheelScroll: (e) => {
			i.viewport && (i.viewport.scrollTop = e);
		},
		onDragScroll: (e) => {
			i.viewport && (i.viewport.scrollTop = d(e));
		}
	}) : null;
}), ue = p.forwardRef((e, n) => {
	let { sizes: r, onSizesChange: i, ...a } = e, o = j(M, e.__scopeScrollArea), [s, c] = p.useState(), l = p.useRef(null), u = t(n, l, o.onScrollbarXChange);
	return p.useEffect(() => {
		l.current && c(getComputedStyle(l.current));
	}, [l]), /* @__PURE__ */ E(me, {
		"data-orientation": "horizontal",
		...a,
		ref: u,
		sizes: r,
		style: {
			bottom: 0,
			left: o.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
			right: o.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
			"--radix-scroll-area-thumb-width": Ce(r) + "px",
			...e.style
		},
		onThumbPointerDown: (t) => e.onThumbPointerDown(t.x),
		onDragScroll: (t) => e.onDragScroll(t.x),
		onWheelScroll: (t, n) => {
			if (o.viewport) {
				let r = o.viewport.scrollLeft + t.deltaX;
				e.onWheelScroll(r), De(r, n) && t.preventDefault();
			}
		},
		onResize: () => {
			l.current && o.viewport && s && i({
				content: o.viewport.scrollWidth,
				viewport: o.viewport.offsetWidth,
				scrollbar: {
					size: l.current.clientWidth,
					paddingStart: xe(s.paddingLeft),
					paddingEnd: xe(s.paddingRight)
				}
			});
		}
	});
}), de = p.forwardRef((e, n) => {
	let { sizes: r, onSizesChange: i, ...a } = e, o = j(M, e.__scopeScrollArea), [s, c] = p.useState(), l = p.useRef(null), u = t(n, l, o.onScrollbarYChange);
	return p.useEffect(() => {
		l.current && c(getComputedStyle(l.current));
	}, [l]), /* @__PURE__ */ E(me, {
		"data-orientation": "vertical",
		...a,
		ref: u,
		sizes: r,
		style: {
			top: 0,
			right: o.dir === "ltr" ? 0 : void 0,
			left: o.dir === "rtl" ? 0 : void 0,
			bottom: "var(--radix-scroll-area-corner-height)",
			"--radix-scroll-area-thumb-height": Ce(r) + "px",
			...e.style
		},
		onThumbPointerDown: (t) => e.onThumbPointerDown(t.y),
		onDragScroll: (t) => e.onDragScroll(t.y),
		onWheelScroll: (t, n) => {
			if (o.viewport) {
				let r = o.viewport.scrollTop + t.deltaY;
				e.onWheelScroll(r), De(r, n) && t.preventDefault();
			}
		},
		onResize: () => {
			l.current && o.viewport && s && i({
				content: o.viewport.scrollHeight,
				viewport: o.viewport.offsetHeight,
				scrollbar: {
					size: l.current.clientHeight,
					paddingStart: xe(s.paddingTop),
					paddingEnd: xe(s.paddingBottom)
				}
			});
		}
	});
}), [fe, pe] = A(M), me = p.forwardRef((e, n) => {
	let { __scopeScrollArea: r, sizes: i, hasThumb: c, onThumbChange: l, onThumbPointerUp: u, onThumbPointerDown: d, onThumbPositionChange: f, onDragScroll: m, onWheelScroll: h, onResize: g, ..._ } = e, v = j(M, r), [y, b] = p.useState(null), x = t(n, (e) => b(e)), S = p.useRef(null), C = p.useRef(""), w = v.viewport, T = i.content - i.viewport, D = s(h), O = s(f), k = ke(g, 10);
	function A(e) {
		S.current && m({
			x: e.clientX - S.current.left,
			y: e.clientY - S.current.top
		});
	}
	return p.useEffect(() => {
		let e = (e) => {
			let t = e.target;
			y?.contains(t) && D(e, T);
		};
		return document.addEventListener("wheel", e, { passive: !1 }), () => document.removeEventListener("wheel", e, { passive: !1 });
	}, [
		w,
		y,
		T,
		D
	]), p.useEffect(O, [i, O]), N(y, k), N(v.content, k), /* @__PURE__ */ E(fe, {
		scope: r,
		scrollbar: y,
		hasThumb: c,
		onThumbChange: s(l),
		onThumbPointerUp: s(u),
		onThumbPositionChange: O,
		onThumbPointerDown: s(d),
		children: /* @__PURE__ */ E(o.div, {
			..._,
			ref: x,
			style: {
				position: "absolute",
				..._.style
			},
			onPointerDown: a(e.onPointerDown, (e) => {
				e.button === 0 && (e.target.setPointerCapture(e.pointerId), S.current = y.getBoundingClientRect(), C.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", v.viewport && (v.viewport.style.scrollBehavior = "auto"), A(e));
			}),
			onPointerMove: a(e.onPointerMove, A),
			onPointerUp: a(e.onPointerUp, (e) => {
				let t = e.target;
				t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId), document.body.style.webkitUserSelect = C.current, v.viewport && (v.viewport.style.scrollBehavior = ""), S.current = null;
			})
		})
	});
}), he = "ScrollAreaThumb", ge = p.forwardRef((e, t) => {
	let { forceMount: n, ...r } = e, i = pe(he, e.__scopeScrollArea);
	return /* @__PURE__ */ E(l, {
		present: n || i.hasThumb,
		children: /* @__PURE__ */ E(_e, {
			ref: t,
			...r
		})
	});
}), _e = p.forwardRef((e, n) => {
	let { __scopeScrollArea: r, style: i, ...s } = e, c = j(he, r), l = pe(he, r), { onThumbPositionChange: u } = l, d = t(n, (e) => l.onThumbChange(e)), f = p.useRef(void 0), m = ke(() => {
		f.current &&= (f.current(), void 0);
	}, 100);
	return p.useEffect(() => {
		let e = c.viewport;
		if (e) {
			let t = () => {
				m(), f.current || (f.current = Oe(e, u), u());
			};
			return u(), e.addEventListener("scroll", t), () => e.removeEventListener("scroll", t);
		}
	}, [
		c.viewport,
		m,
		u
	]), /* @__PURE__ */ E(o.div, {
		"data-state": l.hasThumb ? "visible" : "hidden",
		...s,
		ref: d,
		style: {
			width: "var(--radix-scroll-area-thumb-width)",
			height: "var(--radix-scroll-area-thumb-height)",
			...i
		},
		onPointerDownCapture: a(e.onPointerDownCapture, (e) => {
			let t = e.target.getBoundingClientRect(), n = e.clientX - t.left, r = e.clientY - t.top;
			l.onThumbPointerDown({
				x: n,
				y: r
			});
		}),
		onPointerUp: a(e.onPointerUp, l.onThumbPointerUp)
	});
});
ge.displayName = he;
var ve = "ScrollAreaCorner", ye = p.forwardRef((e, t) => {
	let n = j(ve, e.__scopeScrollArea), r = !!(n.scrollbarX && n.scrollbarY);
	return n.type !== "scroll" && r ? /* @__PURE__ */ E(be, {
		...e,
		ref: t
	}) : null;
});
ye.displayName = ve;
var be = p.forwardRef((e, t) => {
	let { __scopeScrollArea: n, ...r } = e, i = j(ve, n), [a, s] = p.useState(0), [c, l] = p.useState(0), u = !!(a && c);
	return N(i.scrollbarX, () => {
		let e = i.scrollbarX?.offsetHeight || 0;
		i.onCornerHeightChange(e), l(e);
	}), N(i.scrollbarY, () => {
		let e = i.scrollbarY?.offsetWidth || 0;
		i.onCornerWidthChange(e), s(e);
	}), u ? /* @__PURE__ */ E(o.div, {
		...r,
		ref: t,
		style: {
			width: a,
			height: c,
			position: "absolute",
			right: i.dir === "ltr" ? 0 : void 0,
			left: i.dir === "rtl" ? 0 : void 0,
			bottom: 0,
			...e.style
		}
	}) : null;
});
function xe(e) {
	return e ? parseInt(e, 10) : 0;
}
function Se(e, t) {
	let n = e / t;
	return isNaN(n) ? 0 : n;
}
function Ce(e) {
	let t = Se(e.viewport, e.content), n = e.scrollbar.paddingStart + e.scrollbar.paddingEnd, r = (e.scrollbar.size - n) * t;
	return Math.max(r, 18);
}
function we(e, t, n, r = "ltr") {
	let i = Ce(n), a = i / 2, o = t || a, s = i - o, c = n.scrollbar.paddingStart + o, l = n.scrollbar.size - n.scrollbar.paddingEnd - s, u = n.content - n.viewport, d = r === "ltr" ? [0, u] : [u * -1, 0];
	return Ee([c, l], d)(e);
}
function Te(e, t, n = "ltr") {
	let r = Ce(t), i = t.scrollbar.paddingStart + t.scrollbar.paddingEnd, a = t.scrollbar.size - i, o = t.content - t.viewport, s = a - r, c = f(e, n === "ltr" ? [0, o] : [o * -1, 0]);
	return Ee([0, o], [0, s])(c);
}
function Ee(e, t) {
	return (n) => {
		if (e[0] === e[1] || t[0] === t[1]) return t[0];
		let r = (t[1] - t[0]) / (e[1] - e[0]);
		return t[0] + r * (n - e[0]);
	};
}
function De(e, t) {
	return e > 0 && e < t;
}
var Oe = (e, t = () => {}) => {
	let n = {
		left: e.scrollLeft,
		top: e.scrollTop
	}, r = 0;
	return (function i() {
		let a = {
			left: e.scrollLeft,
			top: e.scrollTop
		}, o = n.left !== a.left, s = n.top !== a.top;
		(o || s) && t(), n = a, r = window.requestAnimationFrame(i);
	})(), () => window.cancelAnimationFrame(r);
};
function ke(e, t) {
	let n = s(e), r = p.useRef(0);
	return p.useEffect(() => () => window.clearTimeout(r.current), []), p.useCallback(() => {
		window.clearTimeout(r.current), r.current = window.setTimeout(n, t);
	}, [n, t]);
}
function N(e, t) {
	let n = s(t);
	i(() => {
		let t = 0;
		if (e) {
			let r = new ResizeObserver(() => {
				cancelAnimationFrame(t), t = window.requestAnimationFrame(n);
			});
			return r.observe(e), () => {
				window.cancelAnimationFrame(t), r.unobserve(e);
			};
		}
	}, [e, n]);
}
var Ae = ne, je = ie, Me = ye, Ne = p.forwardRef(({ className: t, children: n, ...r }, i) => /* @__PURE__ */ D(Ae, {
	ref: i,
	className: e("relative overflow-hidden", t),
	"data-sdk-ui": "scroll-area",
	"data-slot": "scroll-area",
	...r,
	children: [
		/* @__PURE__ */ E(je, {
			className: "h-full w-full rounded-[inherit]",
			"data-slot": "scroll-area-viewport",
			children: n
		}),
		/* @__PURE__ */ E(Pe, {}),
		/* @__PURE__ */ E(Me, { "data-slot": "scroll-area-corner" })
	]
}));
Ne.displayName = "ScrollArea";
var Pe = p.forwardRef(({ className: t, orientation: n = "vertical", ...r }, i) => /* @__PURE__ */ E(ae, {
	ref: i,
	orientation: n,
	className: e("flex touch-none select-none p-0.5 transition-colors", n === "vertical" ? "h-full w-2.5 border-l border-l-transparent" : "h-2.5 flex-col border-t border-t-transparent", t),
	"data-sdk-ui": "scroll-bar",
	"data-slot": "scroll-bar",
	...r,
	children: /* @__PURE__ */ E(ge, {
		className: "relative flex-1 rounded-full bg-[var(--sdk-color-border-strong)]",
		"data-slot": "scroll-bar-thumb"
	})
}));
Pe.displayName = "ScrollBar";
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-separator@1_aa2d5d85a81bb702303f0548763b9797/node_modules/@radix-ui/react-separator/dist/index.mjs
var Fe = "Separator", Ie = "horizontal", Le = ["horizontal", "vertical"], Re = p.forwardRef((e, t) => {
	let { decorative: n, orientation: r = Ie, ...i } = e, a = ze(r) ? r : Ie, o = a === "vertical" ? a : void 0, s = n ? { role: "none" } : {
		"aria-orientation": o,
		role: "separator"
	};
	return /* @__PURE__ */ E(d.div, {
		"data-orientation": a,
		...s,
		...i,
		ref: t
	});
});
Re.displayName = Fe;
function ze(e) {
	return Le.includes(e);
}
var Be = Re, Ve = p.forwardRef(({ className: t, decorative: n = !0, orientation: r = "horizontal", ...i }, a) => /* @__PURE__ */ E(Be, {
	ref: a,
	decorative: n,
	orientation: r,
	className: e("shrink-0 bg-[var(--sdk-color-border-subtle)]", r === "horizontal" ? "h-px w-full" : "h-full w-px", t),
	"data-sdk-ui": "separator",
	"data-slot": "separator",
	...i
}));
Ve.displayName = "Separator";
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/react-resizable-panels@4.11_b065de2dea8f3577c5c1fe749b1467f4/node_modules/react-resizable-panels/dist/react-resizable-panels.js
function He(e, t) {
	let n = getComputedStyle(e);
	return t * parseFloat(n.fontSize);
}
function Ue(e, t) {
	let n = getComputedStyle(e.ownerDocument.body);
	return t * parseFloat(n.fontSize);
}
function We(e) {
	return e / 100 * window.innerHeight;
}
function Ge(e) {
	return e / 100 * window.innerWidth;
}
function Ke(e) {
	switch (typeof e) {
		case "number": return [e, "px"];
		case "string": {
			let t = parseFloat(e);
			return e.endsWith("%") ? [t, "%"] : e.endsWith("px") ? [t, "px"] : e.endsWith("rem") ? [t, "rem"] : e.endsWith("em") ? [t, "em"] : e.endsWith("vh") ? [t, "vh"] : e.endsWith("vw") ? [t, "vw"] : [t, "%"];
		}
	}
}
function P({ groupSize: e, panelElement: t, styleProp: n }) {
	let r, [i, a] = Ke(n);
	switch (a) {
		case "%":
			r = i / 100 * e;
			break;
		case "px":
			r = i;
			break;
		case "rem":
			r = Ue(t, i);
			break;
		case "em":
			r = He(t, i);
			break;
		case "vh":
			r = We(i);
			break;
		case "vw":
			r = Ge(i);
			break;
	}
	return r;
}
function F(e) {
	return parseFloat(e.toFixed(3));
}
function I({ group: e }) {
	let { orientation: t, panels: n } = e;
	return n.reduce((e, n) => (e += t === "horizontal" ? n.element.offsetWidth : n.element.offsetHeight, e), 0);
}
function qe(e) {
	let { panels: t } = e, n = I({ group: e });
	return n === 0 ? t.map((e) => ({
		groupResizeBehavior: e.panelConstraints.groupResizeBehavior,
		collapsedSize: 0,
		collapsible: e.panelConstraints.collapsible === !0,
		defaultSize: void 0,
		disabled: e.panelConstraints.disabled,
		minSize: 0,
		maxSize: 100,
		panelId: e.id
	})) : t.map((e) => {
		let { element: t, panelConstraints: r } = e, i = 0;
		r.collapsedSize !== void 0 && (i = F(P({
			groupSize: n,
			panelElement: t,
			styleProp: r.collapsedSize
		}) / n * 100));
		let a;
		r.defaultSize !== void 0 && (a = F(P({
			groupSize: n,
			panelElement: t,
			styleProp: r.defaultSize
		}) / n * 100));
		let o = 0;
		r.minSize !== void 0 && (o = F(P({
			groupSize: n,
			panelElement: t,
			styleProp: r.minSize
		}) / n * 100));
		let s = 100;
		return r.maxSize !== void 0 && (s = F(P({
			groupSize: n,
			panelElement: t,
			styleProp: r.maxSize
		}) / n * 100)), {
			groupResizeBehavior: r.groupResizeBehavior,
			collapsedSize: i,
			collapsible: r.collapsible === !0,
			defaultSize: a,
			disabled: r.disabled,
			minSize: o,
			maxSize: s,
			panelId: e.id
		};
	});
}
function L(e, t = "Assertion error") {
	if (!e) throw Error(t);
}
function Je(e, t) {
	return Array.from(t).sort(e === "horizontal" ? Ye : Xe);
}
function Ye(e, t) {
	let n = e.element.offsetLeft - t.element.offsetLeft;
	return n === 0 ? e.element.offsetWidth - t.element.offsetWidth : n;
}
function Xe(e, t) {
	let n = e.element.offsetTop - t.element.offsetTop;
	return n === 0 ? e.element.offsetHeight - t.element.offsetHeight : n;
}
function Ze(e) {
	return typeof e == "object" && !!e && "nodeType" in e && e.nodeType === Node.ELEMENT_NODE;
}
function Qe(e, t) {
	return {
		x: e.x >= t.left && e.x <= t.right ? 0 : Math.min(Math.abs(e.x - t.left), Math.abs(e.x - t.right)),
		y: e.y >= t.top && e.y <= t.bottom ? 0 : Math.min(Math.abs(e.y - t.top), Math.abs(e.y - t.bottom))
	};
}
function $e({ orientation: e, rects: t, targetRect: n }) {
	let r = {
		x: n.x + n.width / 2,
		y: n.y + n.height / 2
	}, i, a = Number.MAX_VALUE;
	for (let n of t) {
		let { x: t, y: o } = Qe(r, n), s = e === "horizontal" ? t : o;
		s < a && (a = s, i = n);
	}
	return L(i, "No rect found"), i;
}
var et;
function tt() {
	return et === void 0 && (et = typeof matchMedia == "function" ? !!matchMedia("(pointer:coarse)").matches : !1), et;
}
function nt(e) {
	let { element: t, orientation: n, panels: r, separators: i } = e, a = Je(n, Array.from(t.children).filter(Ze).map((e) => ({ element: e }))).map(({ element: e }) => e), o = [], s = !1, c = !1, l = -1, u = -1, d = 0, f, p = [];
	{
		let e = -1;
		for (let t of a) t.hasAttribute("data-panel") && (e++, t.hasAttribute("data-disabled") || (d++, l === -1 && (l = e), u = e));
	}
	if (d > 1) {
		let t = -1;
		for (let d of a) if (d.hasAttribute("data-panel")) {
			t++;
			let i = r.find((e) => e.element === d);
			if (i) {
				if (f) {
					let r = f.element.getBoundingClientRect(), a = d.getBoundingClientRect(), m;
					if (c) {
						let e = n === "horizontal" ? new DOMRect(r.right, r.top, 0, r.height) : new DOMRect(r.left, r.bottom, r.width, 0), t = n === "horizontal" ? new DOMRect(a.left, a.top, 0, a.height) : new DOMRect(a.left, a.top, a.width, 0);
						switch (p.length) {
							case 0:
								m = [e, t];
								break;
							case 1: {
								let i = p[0];
								m = [i, $e({
									orientation: n,
									rects: [r, a],
									targetRect: i.element.getBoundingClientRect()
								}) === r ? t : e];
								break;
							}
							default:
								m = p;
								break;
						}
					} else m = p.length ? p : [n === "horizontal" ? new DOMRect(r.right, a.top, a.left - r.right, a.height) : new DOMRect(a.left, r.bottom, a.width, a.top - r.bottom)];
					for (let n of m) {
						let r = "width" in n ? n : n.element.getBoundingClientRect(), a = tt() ? e.resizeTargetMinimumSize.coarse : e.resizeTargetMinimumSize.fine;
						if (r.width < a) {
							let e = a - r.width;
							r = new DOMRect(r.x - e / 2, r.y, r.width + e, r.height);
						}
						if (r.height < a) {
							let e = a - r.height;
							r = new DOMRect(r.x, r.y - e / 2, r.width, r.height + e);
						}
						!s && !(t <= l || t > u) && o.push({
							group: e,
							groupSize: I({ group: e }),
							panels: [f, i],
							separator: "width" in n ? void 0 : n,
							rect: r
						}), s = !1;
					}
				}
				c = !1, f = i, p = [];
			}
		} else if (d.hasAttribute("data-separator")) {
			d.ariaDisabled !== null && (s = !0);
			let e = i.find((e) => e.element === d);
			e ? p.push(e) : (f = void 0, p = []);
		} else c = !0;
	}
	return o;
}
var rt = class {
	#e = {};
	addListener(e, t) {
		let n = this.#e[e];
		return n === void 0 ? this.#e[e] = [t] : n.includes(t) || n.push(t), () => {
			this.removeListener(e, t);
		};
	}
	emit(e, t) {
		let n = this.#e[e];
		if (n !== void 0) if (n.length === 1) n[0].call(null, t);
		else {
			let e = !1, r = null, i = Array.from(n);
			for (let n = 0; n < i.length; n++) {
				let a = i[n];
				try {
					a.call(null, t);
				} catch (t) {
					r === null && (e = !0, r = t);
				}
			}
			if (e) throw r;
		}
	}
	removeAllListeners() {
		this.#e = {};
	}
	removeListener(e, t) {
		let n = this.#e[e];
		if (n !== void 0) {
			let e = n.indexOf(t);
			e >= 0 && n.splice(e, 1);
		}
	}
}, R = /* @__PURE__ */ new Map(), it = new rt();
function at(e) {
	R = new Map(R), R.delete(e);
}
function ot(e, t) {
	for (let [t] of R) if (t.id === e) return t;
}
function z(e, t) {
	for (let [t, n] of R) if (t.id === e) return n;
	if (t) throw Error(`Could not find data for Group with id ${e}`);
}
function B() {
	return R;
}
function st(e, t) {
	return it.addListener("groupChange", (n) => {
		n.group.id === e && t(n);
	});
}
function V(e, t) {
	let n = R.get(e);
	R = new Map(R), R.set(e, t), it.emit("groupChange", {
		group: e,
		prev: n,
		next: t
	});
}
function ct(e, t, n) {
	let r, i = {
		x: Infinity,
		y: Infinity
	};
	for (let a of t) {
		let t = Qe(n, a.rect);
		switch (e) {
			case "horizontal":
				t.x <= i.x && (r = a, i = t);
				break;
			case "vertical":
				t.y <= i.y && (r = a, i = t);
				break;
		}
	}
	return r ? {
		distance: i,
		hitRegion: r
	} : void 0;
}
function lt(e) {
	return typeof e == "object" && !!e && "nodeType" in e && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
}
function ut(e, t) {
	if (e === t) throw Error("Cannot compare node with itself");
	let n = {
		a: gt(e),
		b: gt(t)
	}, r;
	for (; n.a.at(-1) === n.b.at(-1);) r = n.a.pop(), n.b.pop();
	L(r, "Stacking order can only be calculated for elements with a common ancestor");
	let i = {
		a: ht(mt(n.a)),
		b: ht(mt(n.b))
	};
	if (i.a === i.b) {
		let e = r.childNodes, t = {
			a: n.a.at(-1),
			b: n.b.at(-1)
		}, i = e.length;
		for (; i--;) {
			let n = e[i];
			if (n === t.a) return 1;
			if (n === t.b) return -1;
		}
	}
	return Math.sign(i.a - i.b);
}
var dt = /\b(?:position|zIndex|opacity|transform|webkitTransform|mixBlendMode|filter|webkitFilter|isolation)\b/;
function ft(e) {
	let t = getComputedStyle(_t(e) ?? e).display;
	return t === "flex" || t === "inline-flex";
}
function pt(e) {
	let t = getComputedStyle(e);
	return !!(t.position === "fixed" || t.zIndex !== "auto" && (t.position !== "static" || ft(e)) || +t.opacity < 1 || "transform" in t && t.transform !== "none" || "webkitTransform" in t && t.webkitTransform !== "none" || "mixBlendMode" in t && t.mixBlendMode !== "normal" || "filter" in t && t.filter !== "none" || "webkitFilter" in t && t.webkitFilter !== "none" || "isolation" in t && t.isolation === "isolate" || dt.test(t.willChange) || t.webkitOverflowScrolling === "touch");
}
function mt(e) {
	let t = e.length;
	for (; t--;) {
		let n = e[t];
		if (L(n, "Missing node"), pt(n)) return n;
	}
	return null;
}
function ht(e) {
	return e && Number(getComputedStyle(e).zIndex) || 0;
}
function gt(e) {
	let t = [];
	for (; e;) t.push(e), e = _t(e);
	return t;
}
function _t(e) {
	let { parentNode: t } = e;
	return lt(t) ? t.host : t;
}
function vt(e, t) {
	return e.x < t.x + t.width && e.x + e.width > t.x && e.y < t.y + t.height && e.y + e.height > t.y;
}
function yt({ groupElement: e, hitRegion: t, pointerEventTarget: n }) {
	if (!Ze(n) || n.contains(e) || e.contains(n)) return !0;
	if (ut(n, e) > 0) {
		let r = n;
		for (; r;) {
			if (r.contains(e)) return !0;
			if (vt(r.getBoundingClientRect(), t)) return !1;
			r = r.parentElement;
		}
	}
	return !0;
}
function bt(e, t) {
	let n = [];
	return t.forEach((t, r) => {
		if (r.disabled) return;
		let i = nt(r), a = ct(r.orientation, i, {
			x: e.clientX,
			y: e.clientY
		});
		a && a.distance.x <= 0 && a.distance.y <= 0 && yt({
			groupElement: r.element,
			hitRegion: a.hitRegion.rect,
			pointerEventTarget: e.target
		}) && n.push(a.hitRegion);
	}), n;
}
function xt(e, t) {
	if (e.length !== t.length) return !1;
	for (let n = 0; n < e.length; n++) if (e[n] != t[n]) return !1;
	return !0;
}
function H(e, t, n = 0) {
	return Math.abs(F(e) - F(t)) <= n;
}
function U(e, t) {
	return H(e, t) ? 0 : e > t ? 1 : -1;
}
function W({ overrideDisabledPanels: e, panelConstraints: t, prevSize: n, size: r }) {
	let { collapsedSize: i = 0, collapsible: a, disabled: o, maxSize: s = 100, minSize: c = 0 } = t;
	if (o && !e) return n;
	if (U(r, c) < 0) if (a) {
		let e = (i + c) / 2;
		r = U(r, e) < 0 ? i : c;
	} else r = c;
	return r = Math.min(s, r), r = F(r), r;
}
function G({ delta: e, initialLayout: t, panelConstraints: n, pivotIndices: r, prevLayout: i, trigger: a }) {
	if (H(e, 0)) return t;
	let o = a === "imperative-api", s = Object.values(t), c = Object.values(i), l = [...s], [u, d] = r;
	L(u != null, "Invalid first pivot index"), L(d != null, "Invalid second pivot index");
	let f = 0;
	switch (a) {
		case "keyboard":
			{
				let t = e < 0 ? d : u, r = n[t];
				L(r, `Panel constraints not found for index ${t}`);
				let { collapsedSize: i = 0, collapsible: a, minSize: o = 0 } = r;
				if (a) {
					let n = s[t];
					if (L(n != null, `Previous layout not found for panel index ${t}`), H(n, i)) {
						let t = o - n;
						U(t, Math.abs(e)) > 0 && (e = e < 0 ? 0 - t : t);
					}
				}
			}
			{
				let t = e < 0 ? u : d, r = n[t];
				L(r, `No panel constraints found for index ${t}`);
				let { collapsedSize: i = 0, collapsible: a, minSize: o = 0 } = r;
				if (a) {
					let n = s[t];
					if (L(n != null, `Previous layout not found for panel index ${t}`), H(n, o)) {
						let t = n - i;
						U(t, Math.abs(e)) > 0 && (e = e < 0 ? 0 - t : t);
					}
				}
			}
			break;
		default: {
			let t = e < 0 ? d : u, r = n[t];
			L(r, `Panel constraints not found for index ${t}`);
			let i = s[t], { collapsible: a, collapsedSize: o, minSize: c } = r;
			if (a && U(i, c) < 0) if (e > 0) {
				let t = c - o, n = t / 2;
				U(i + e, c) < 0 && (e = U(e, n) <= 0 ? 0 : t);
			} else {
				let t = c - o, n = 100 - t / 2;
				U(i - e, c) < 0 && (e = U(100 + e, n) > 0 ? 0 : -t);
			}
			break;
		}
	}
	{
		let t = e < 0 ? 1 : -1, r = e < 0 ? d : u, i = 0;
		for (;;) {
			let e = s[r];
			L(e != null, `Previous layout not found for panel index ${r}`);
			let a = W({
				overrideDisabledPanels: o,
				panelConstraints: n[r],
				prevSize: e,
				size: 100
			}) - e;
			if (i += a, r += t, r < 0 || r >= n.length) break;
		}
		let a = Math.min(Math.abs(e), Math.abs(i));
		e = e < 0 ? 0 - a : a;
	}
	{
		let t = e < 0 ? u : d;
		for (; t >= 0 && t < n.length;) {
			let r = Math.abs(e) - Math.abs(f), i = s[t];
			L(i != null, `Previous layout not found for panel index ${t}`);
			let a = i - r, c = W({
				overrideDisabledPanels: o,
				panelConstraints: n[t],
				prevSize: i,
				size: a
			});
			if (!H(i, c) && (f += i - c, l[t] = c, f.toFixed(3).localeCompare(Math.abs(e).toFixed(3), void 0, { numeric: !0 }) >= 0)) break;
			e < 0 ? t-- : t++;
		}
	}
	if (xt(c, l)) return i;
	{
		let t = e < 0 ? d : u, r = s[t];
		L(r != null, `Previous layout not found for panel index ${t}`);
		let i = r + f, a = W({
			overrideDisabledPanels: o,
			panelConstraints: n[t],
			prevSize: r,
			size: i
		});
		if (l[t] = a, !H(a, i)) {
			let t = i - a, r = e < 0 ? d : u;
			for (; r >= 0 && r < n.length;) {
				let i = l[r];
				L(i != null, `Previous layout not found for panel index ${r}`);
				let a = i + t, s = W({
					overrideDisabledPanels: o,
					panelConstraints: n[r],
					prevSize: i,
					size: a
				});
				if (H(i, s) || (t -= s - i, l[r] = s), H(t, 0)) break;
				e > 0 ? r-- : r++;
			}
		}
	}
	if (!H(Object.values(l).reduce((e, t) => t + e, 0), 100, .1)) return i;
	let p = Object.keys(i);
	return l.reduce((e, t, n) => (e[p[n]] = t, e), {});
}
function K(e, t) {
	if (Object.keys(e).length !== Object.keys(t).length) return !1;
	for (let n in e) if (t[n] === void 0 || U(e[n], t[n]) !== 0) return !1;
	return !0;
}
function q({ layout: e, panelConstraints: t }) {
	let n = Object.values(e), r = [...n], i = r.reduce((e, t) => e + t, 0);
	if (r.length !== t.length) throw Error(`Invalid ${t.length} panel layout: ${r.map((e) => `${e}%`).join(", ")}`);
	if (!H(i, 100) && r.length > 0) for (let e = 0; e < t.length; e++) {
		let t = r[e];
		L(t != null, `No layout data found for index ${e}`), r[e] = 100 / i * t;
	}
	let a = 0;
	for (let e = 0; e < t.length; e++) {
		let i = n[e];
		L(i != null, `No layout data found for index ${e}`);
		let o = r[e];
		L(o != null, `No layout data found for index ${e}`);
		let s = W({
			overrideDisabledPanels: !0,
			panelConstraints: t[e],
			prevSize: i,
			size: o
		});
		o != s && (a += o - s, r[e] = s);
	}
	if (!H(a, 0)) for (let e = 0; e < t.length; e++) {
		let n = r[e];
		L(n != null, `No layout data found for index ${e}`);
		let i = n + a, o = W({
			overrideDisabledPanels: !0,
			panelConstraints: t[e],
			prevSize: n,
			size: i
		});
		if (n !== o && (a -= o - n, r[e] = o, H(a, 0))) break;
	}
	let o = Object.keys(e);
	return r.reduce((e, t, n) => (e[o[n]] = t, e), {});
}
function St({ groupId: e, panelId: t }) {
	let n = () => {
		let t = B();
		for (let [n, { defaultLayoutDeferred: r, derivedPanelConstraints: i, layout: a, groupSize: o, separatorToPanels: s }] of t) if (n.id === e) return {
			defaultLayoutDeferred: r,
			derivedPanelConstraints: i,
			group: n,
			groupSize: o,
			layout: a,
			separatorToPanels: s
		};
		throw Error(`Group ${e} not found`);
	}, r = () => {
		let e = n().derivedPanelConstraints.find((e) => e.panelId === t);
		if (e !== void 0) return e;
		throw Error(`Panel constraints not found for Panel ${t}`);
	}, i = () => {
		let e = n().group.panels.find((e) => e.id === t);
		if (e !== void 0) return e;
		throw Error(`Layout not found for Panel ${t}`);
	}, a = () => {
		let e = n().layout[t];
		if (e !== void 0) return e;
		throw Error(`Layout not found for Panel ${t}`);
	}, o = ({ nextSize: e, panels: n, prevLayout: r, derivedPanelConstraints: i }) => {
		let o = a(), s = n.findIndex((e) => e.id === t), c = s === 0, l = s === n.length - 1;
		if (l && e < o && (c || n.slice(0, s).every((e, t) => {
			let n = i[t];
			return n?.collapsible && H(n.collapsedSize, r[n.panelId]);
		}))) {
			let e = n.slice(0, s).reduce((e, t) => e + r[t.id], 0);
			return {
				...r,
				[t]: F(100 - e)
			};
		}
		return G({
			delta: l ? o - e : e - o,
			initialLayout: r,
			panelConstraints: i,
			pivotIndices: l ? [s - 1, s] : [s, s + 1],
			prevLayout: r,
			trigger: "imperative-api"
		});
	}, s = (e) => {
		if (e === a()) return;
		let { defaultLayoutDeferred: t, derivedPanelConstraints: r, group: i, groupSize: s, layout: c, separatorToPanels: l } = n(), u = q({
			layout: o({
				nextSize: e,
				panels: i.panels,
				prevLayout: c,
				derivedPanelConstraints: r
			}),
			panelConstraints: r
		});
		K(c, u) || V(i, {
			defaultLayoutDeferred: t,
			derivedPanelConstraints: r,
			groupSize: s,
			layout: u,
			separatorToPanels: l
		});
	};
	return {
		collapse: () => {
			let { collapsible: e, collapsedSize: t } = r(), { mutableValues: n } = i(), o = a();
			e && o !== t && (n.expandToSize = o, s(t));
		},
		expand: () => {
			let { collapsible: e, collapsedSize: t, minSize: n } = r(), { mutableValues: o } = i(), c = a();
			if (e && c === t) {
				let e = o.expandToSize ?? n;
				e === 0 && (e = 1), s(e);
			}
		},
		getSize: () => {
			let { group: e } = n(), t = a(), { element: r } = i();
			return {
				asPercentage: t,
				inPixels: e.orientation === "horizontal" ? r.offsetWidth : r.offsetHeight
			};
		},
		isCollapsed: () => {
			let { collapsible: e, collapsedSize: t } = r(), n = a();
			return e && H(t, n);
		},
		resize: (e) => {
			let { group: t } = n(), { element: r } = i(), a = I({ group: t });
			s(F(P({
				groupSize: a,
				panelElement: r,
				styleProp: e
			}) / a * 100));
		}
	};
}
function Ct(e) {
	e.defaultPrevented || bt(e, B()).forEach((t) => {
		if (t.separator && !t.separator.disableDoubleClick) {
			let n = t.panels.find((e) => e.panelConstraints.defaultSize !== void 0);
			if (n) {
				let r = n.panelConstraints.defaultSize, i = St({
					groupId: t.group.id,
					panelId: n.id
				});
				i && r !== void 0 && (i.resize(r), e.preventDefault());
			}
		}
	});
}
function wt(e) {
	let t = B();
	for (let [n] of t) if (n.separators.some((t) => t.element === e)) return n;
	throw Error("Could not find parent Group for separator element");
}
function Tt({ groupId: e }) {
	let t = () => {
		let t = B();
		for (let [n, r] of t) if (n.id === e) return {
			group: n,
			...r
		};
		throw Error(`Could not find Group with id "${e}"`);
	};
	return {
		getLayout() {
			let { defaultLayoutDeferred: e, layout: n } = t();
			return e ? {} : n;
		},
		setLayout(e) {
			let { defaultLayoutDeferred: n, derivedPanelConstraints: r, group: i, groupSize: a, layout: o, separatorToPanels: s } = t(), c = q({
				layout: e,
				panelConstraints: r
			});
			return n ? o : (K(o, c) || V(i, {
				defaultLayoutDeferred: n,
				derivedPanelConstraints: r,
				groupSize: a,
				layout: c,
				separatorToPanels: s
			}), c);
		}
	};
}
function J(e, t) {
	let n = wt(e), r = z(n.id, !0), i = n.separators.find((t) => t.element === e);
	L(i, "Matching separator not found");
	let a = r.separatorToPanels.get(i);
	L(a, "Matching panels not found");
	let o = a.map((e) => n.panels.indexOf(e)), s = Tt({ groupId: n.id }).getLayout(), c = q({
		layout: G({
			delta: t,
			initialLayout: s,
			panelConstraints: r.derivedPanelConstraints,
			pivotIndices: o,
			prevLayout: s,
			trigger: "keyboard"
		}),
		panelConstraints: r.derivedPanelConstraints
	});
	K(s, c) || V(n, {
		defaultLayoutDeferred: r.defaultLayoutDeferred,
		derivedPanelConstraints: r.derivedPanelConstraints,
		groupSize: r.groupSize,
		layout: c,
		separatorToPanels: r.separatorToPanels
	});
}
function Et(e) {
	if (e.defaultPrevented) return;
	let t = e.currentTarget, n = wt(t);
	if (!n.disabled) switch (e.key) {
		case "ArrowDown":
			e.preventDefault(), n.orientation === "vertical" && J(t, 5);
			break;
		case "ArrowLeft":
			e.preventDefault(), n.orientation === "horizontal" && J(t, -5);
			break;
		case "ArrowRight":
			e.preventDefault(), n.orientation === "horizontal" && J(t, 5);
			break;
		case "ArrowUp":
			e.preventDefault(), n.orientation === "vertical" && J(t, -5);
			break;
		case "End":
			e.preventDefault(), J(t, 100);
			break;
		case "Enter": {
			e.preventDefault();
			let n = wt(t), { derivedPanelConstraints: r, layout: i, separatorToPanels: a } = z(n.id, !0), o = n.separators.find((e) => e.element === t);
			L(o, "Matching separator not found");
			let s = a.get(o);
			L(s, "Matching panels not found");
			let c = s[0], l = r.find((e) => e.panelId === c.id);
			if (L(l, "Panel metadata not found"), l.collapsible) {
				let e = i[c.id];
				J(t, (l.collapsedSize === e ? n.mutableState.expandedPanelSizes[c.id] ?? l.minSize : l.collapsedSize) - e);
			}
			break;
		}
		case "F6": {
			e.preventDefault();
			let n = wt(t).separators.map((e) => e.element), r = Array.from(n).findIndex((t) => t === e.currentTarget);
			L(r !== null, "Index not found"), n[e.shiftKey ? r > 0 ? r - 1 : n.length - 1 : r + 1 < n.length ? r + 1 : 0].focus({ preventScroll: !0 });
			break;
		}
		case "Home":
			e.preventDefault(), J(t, -100);
			break;
	}
}
var Y = {
	cursorFlags: 0,
	state: "inactive"
}, Dt = new rt();
function X() {
	return Y;
}
function Ot(e) {
	return Dt.addListener("change", e);
}
function kt(e) {
	let t = Y, n = { ...Y };
	n.cursorFlags = e, Y = n, Dt.emit("change", {
		prev: t,
		next: n
	});
}
function Z(e) {
	let t = Y;
	Y = e, Dt.emit("change", {
		prev: t,
		next: e
	});
}
function At(e) {
	if (e.defaultPrevented || e.pointerType === "mouse" && e.button > 0) return;
	let t = B(), n = bt(e, t), r = /* @__PURE__ */ new Map(), i = !1;
	n.forEach((e) => {
		e.separator && (i || (i = !0, e.separator.element.focus({
			focusVisible: !1,
			preventScroll: !0
		})));
		let n = t.get(e.group);
		n && r.set(e.group, n.layout);
	}), Z({
		cursorFlags: 0,
		hitRegions: n,
		initialLayoutMap: r,
		pointerDownAtPoint: {
			x: e.clientX,
			y: e.clientY
		},
		state: "active"
	}), n.length && e.preventDefault();
}
var jt = (e) => e, Mt = () => {}, Nt = 1, Pt = 2, Ft = 4, It = 8, Lt = 3, Rt = 12, zt;
function Bt() {
	return zt === void 0 && (zt = !1, typeof window < "u" && (window.navigator.userAgent.includes("Chrome") || window.navigator.userAgent.includes("Firefox")) && (zt = !0)), zt;
}
function Vt({ cursorFlags: e, groups: t, state: n }) {
	let r = 0, i = 0;
	switch (n) {
		case "active":
		case "hover": t.forEach((e) => {
			if (!e.mutableState.disableCursor) switch (e.orientation) {
				case "horizontal":
					r++;
					break;
				case "vertical":
					i++;
					break;
			}
		});
	}
	if (!(r === 0 && i === 0)) {
		switch (n) {
			case "active":
				if (e && Bt()) {
					let t = (e & Nt) !== 0, n = (e & Pt) !== 0, r = (e & Ft) !== 0, i = (e & It) !== 0;
					if (t) return r ? "se-resize" : i ? "ne-resize" : "e-resize";
					if (n) return r ? "sw-resize" : i ? "nw-resize" : "w-resize";
					if (r) return "s-resize";
					if (i) return "n-resize";
				}
				break;
		}
		return Bt() ? r > 0 && i > 0 ? "move" : r > 0 ? "ew-resize" : "ns-resize" : r > 0 && i > 0 ? "grab" : r > 0 ? "col-resize" : "row-resize";
	}
}
var Ht = /* @__PURE__ */ new WeakMap();
function Ut(e) {
	if (e.defaultView === null || e.defaultView === void 0) return;
	let { prevStyle: t, styleSheet: n } = Ht.get(e) ?? {};
	n === void 0 && (n = new e.defaultView.CSSStyleSheet(), e.adoptedStyleSheets && (Object.isExtensible(e.adoptedStyleSheets) ? e.adoptedStyleSheets.push(n) : e.adoptedStyleSheets = [...e.adoptedStyleSheets, n]));
	let r = X();
	switch (r.state) {
		case "active":
		case "hover": {
			let e = Vt({
				cursorFlags: r.cursorFlags,
				groups: r.hitRegions.map((e) => e.group),
				state: r.state
			}), i = `*, *:hover {cursor: ${e} !important; }`;
			if (t === i) return;
			t = i, e ? n.cssRules.length === 0 ? n.insertRule(i) : n.replaceSync(i) : n.cssRules.length === 1 && n.deleteRule(0);
			break;
		}
		case "inactive":
			t = void 0, n.cssRules.length === 1 && n.deleteRule(0);
			break;
	}
	Ht.set(e, {
		prevStyle: t,
		styleSheet: n
	});
}
function Wt({ document: e, event: t, hitRegions: n, initialLayoutMap: r, mountedGroups: i, pointerDownAtPoint: a, prevCursorFlags: o }) {
	let s = 0;
	n.forEach((e) => {
		let { group: n, groupSize: o } = e, { orientation: c, panels: l } = n, { disableCursor: u } = n.mutableState, d = 0;
		d = a ? c === "horizontal" ? (t.clientX - a.x) / o * 100 : (t.clientY - a.y) / o * 100 : c === "horizontal" ? t.clientX < 0 ? -100 : 100 : t.clientY < 0 ? -100 : 100;
		let f = r.get(n), p = i.get(n);
		if (!f || !p) return;
		let { defaultLayoutDeferred: m, derivedPanelConstraints: h, groupSize: g, layout: _, separatorToPanels: v } = p;
		if (h && _ && v) {
			let t = G({
				delta: d,
				initialLayout: f,
				panelConstraints: h,
				pivotIndices: e.panels.map((e) => l.indexOf(e)),
				prevLayout: _,
				trigger: "mouse-or-touch"
			});
			if (K(t, _)) {
				if (d !== 0 && !u) switch (c) {
					case "horizontal":
						s |= d < 0 ? Nt : Pt;
						break;
					case "vertical":
						s |= d < 0 ? Ft : It;
						break;
				}
			} else V(e.group, {
				defaultLayoutDeferred: m,
				derivedPanelConstraints: h,
				groupSize: g,
				layout: t,
				separatorToPanels: v
			});
		}
	});
	let c = 0;
	t.movementX === 0 ? c |= o & Lt : c |= s & Lt, t.movementY === 0 ? c |= o & Rt : c |= s & Rt, kt(c), Ut(e);
}
function Gt(e) {
	let t = B(), n = X();
	switch (n.state) {
		case "active": Wt({
			document: e.currentTarget,
			event: e,
			hitRegions: n.hitRegions,
			initialLayoutMap: n.initialLayoutMap,
			mountedGroups: t,
			prevCursorFlags: n.cursorFlags
		});
	}
}
function Kt(e) {
	if (e.defaultPrevented) return;
	let t = X(), n = B();
	switch (t.state) {
		case "active":
			if (e.buttons === 0) {
				Z({
					cursorFlags: 0,
					state: "inactive"
				}), t.hitRegions.forEach((e) => {
					let t = z(e.group.id, !0);
					V(e.group, t);
				});
				return;
			}
			for (let n of t.hitRegions) if (n.separator) {
				let { element: t } = n.separator;
				t.hasPointerCapture?.(e.pointerId) || t.setPointerCapture?.(e.pointerId);
			}
			Wt({
				document: e.currentTarget,
				event: e,
				hitRegions: t.hitRegions,
				initialLayoutMap: t.initialLayoutMap,
				mountedGroups: n,
				pointerDownAtPoint: t.pointerDownAtPoint,
				prevCursorFlags: t.cursorFlags
			});
			break;
		default: {
			let r = bt(e, n);
			r.length === 0 ? t.state !== "inactive" && Z({
				cursorFlags: 0,
				state: "inactive"
			}) : Z({
				cursorFlags: 0,
				hitRegions: r,
				state: "hover"
			}), Ut(e.currentTarget);
			break;
		}
	}
}
function qt(e) {
	if (e.relatedTarget instanceof HTMLIFrameElement) switch (X().state) {
		case "hover": Z({
			cursorFlags: 0,
			state: "inactive"
		});
	}
}
function Jt(e) {
	if (e.defaultPrevented || e.pointerType === "mouse" && e.button > 0) return;
	let t = X();
	switch (t.state) {
		case "active": Z({
			cursorFlags: 0,
			state: "inactive"
		}), t.hitRegions.length > 0 && (Ut(e.currentTarget), t.hitRegions.forEach((e) => {
			let t = z(e.group.id, !0);
			V(e.group, t);
		}), e.preventDefault());
	}
}
function Yt(e) {
	let t = 0, n = 0, r = {};
	for (let i of e) if (i.defaultSize !== void 0) {
		t++;
		let e = F(i.defaultSize);
		n += e, r[i.panelId] = e;
	} else r[i.panelId] = void 0;
	let i = e.length - t;
	if (i !== 0) {
		let t = F((100 - n) / i);
		for (let n of e) n.defaultSize === void 0 && (r[n.panelId] = t);
	}
	return r;
}
function Xt(e, t, n) {
	if (!n[0]) return;
	let r = e.panels.find((e) => e.element === t);
	if (!r || !r.onResize) return;
	let i = I({ group: e }), a = e.orientation === "horizontal" ? r.element.offsetWidth : r.element.offsetHeight, o = r.mutableValues.prevSize, s = {
		asPercentage: F(a / i * 100),
		inPixels: a
	};
	r.mutableValues.prevSize = s, r.onResize(s, r.id, o);
}
function Zt(e, t) {
	if (Object.keys(e).length !== Object.keys(t).length) return !1;
	for (let n in e) if (e[n] !== t[n]) return !1;
	return !0;
}
function Qt({ group: e, nextGroupSize: t, prevGroupSize: n, prevLayout: r }) {
	if (n <= 0 || t <= 0 || n === t) return r;
	let i = 0, a = 0, o = !1, s = /* @__PURE__ */ new Map(), c = [];
	for (let l of e.panels) {
		let e = r[l.id] ?? 0;
		switch (l.panelConstraints.groupResizeBehavior) {
			case "preserve-pixel-size": {
				o = !0;
				let r = F(e / 100 * n / t * 100);
				s.set(l.id, r), i += r;
				break;
			}
			default:
				c.push(l.id), a += e;
				break;
		}
	}
	if (!o || c.length === 0) return r;
	let l = 100 - i, u = { ...r };
	if (s.forEach((e, t) => {
		u[t] = e;
	}), a > 0) for (let e of c) u[e] = F((r[e] ?? 0) / a * l);
	else {
		let e = F(l / c.length);
		for (let t of c) u[t] = e;
	}
	return u;
}
function $t(e, t) {
	let n = e.map((e) => e.id), r = Object.keys(t);
	if (n.length !== r.length) return !1;
	for (let e of n) if (!r.includes(e)) return !1;
	return !0;
}
var Q = /* @__PURE__ */ new Map();
function en(e) {
	let t = !0;
	L(e.element.ownerDocument.defaultView, "Cannot register an unmounted Group");
	let n = e.element.ownerDocument.defaultView.ResizeObserver, r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), a = new n((n) => {
		for (let r of n) {
			let { borderBoxSize: n, target: i } = r;
			if (i === e.element) {
				if (t) {
					let t = I({ group: e });
					if (t === 0) return;
					let n = z(e.id);
					if (!n) return;
					let r = qe(e), i = n.defaultLayoutDeferred ? Yt(r) : n.layout, a = q({
						layout: Qt({
							group: e,
							nextGroupSize: t,
							prevGroupSize: n.groupSize,
							prevLayout: i
						}),
						panelConstraints: r
					});
					if (!n.defaultLayoutDeferred && K(n.layout, a) && Zt(n.derivedPanelConstraints, r) && n.groupSize === t) return;
					V(e, {
						defaultLayoutDeferred: !1,
						derivedPanelConstraints: r,
						groupSize: t,
						layout: a,
						separatorToPanels: n.separatorToPanels
					});
				}
			} else Xt(e, i, n);
		}
	});
	a.observe(e.element), e.panels.forEach((e) => {
		L(!r.has(e.id), `Panel ids must be unique; id "${e.id}" was used more than once`), r.add(e.id), e.onResize && a.observe(e.element);
	});
	let o = I({ group: e }), s = qe(e), c = e.panels.map(({ id: e }) => e).join(","), l = e.mutableState.defaultLayout;
	l && ($t(e.panels, l) || (l = void 0));
	let u = q({
		layout: e.mutableState.layouts[c] ?? l ?? Yt(s),
		panelConstraints: s
	}), d = e.element.ownerDocument;
	Q.set(d, (Q.get(d) ?? 0) + 1);
	let f = /* @__PURE__ */ new Map();
	return nt(e).forEach((e) => {
		e.separator && f.set(e.separator, e.panels);
	}), V(e, {
		defaultLayoutDeferred: o === 0,
		derivedPanelConstraints: s,
		groupSize: o,
		layout: u,
		separatorToPanels: f
	}), e.separators.forEach((e) => {
		L(!i.has(e.id), `Separator ids must be unique; id "${e.id}" was used more than once`), i.add(e.id), e.element.addEventListener("keydown", Et);
	}), Q.get(d) === 1 && (d.addEventListener("dblclick", Ct, !0), d.addEventListener("pointerdown", At, !0), d.addEventListener("pointerleave", Gt), d.addEventListener("pointermove", Kt), d.addEventListener("pointerout", qt), d.addEventListener("pointerup", Jt, !0)), function() {
		t = !1, Q.set(d, Math.max(0, (Q.get(d) ?? 0) - 1)), at(e), e.separators.forEach((e) => {
			e.element.removeEventListener("keydown", Et);
		}), Q.get(d) || (d.removeEventListener("dblclick", Ct, !0), d.removeEventListener("pointerdown", At, !0), d.removeEventListener("pointerleave", Gt), d.removeEventListener("pointermove", Kt), d.removeEventListener("pointerout", qt), d.removeEventListener("pointerup", Jt, !0)), a.disconnect();
	};
}
function tn() {
	let [e, t] = C({});
	return [e, h(() => t({}), [])];
}
function nn(e) {
	let t = v();
	return `${e ?? t}`;
}
var $ = typeof window < "u" ? b : _;
function rn(e) {
	let t = S(e);
	return $(() => {
		t.current = e;
	}, [e]), h((...e) => t.current?.(...e), [t]);
}
function an(...e) {
	return rn((t) => {
		e.forEach((e) => {
			if (e) switch (typeof e) {
				case "function":
					e(t);
					break;
				case "object":
					e.current = t;
					break;
			}
		});
	});
}
function on(e) {
	let t = S({ ...e });
	return $(() => {
		for (let n in e) t.current[n] = e[n];
	}, [e]), t.current;
}
var sn = m(null);
function cn(e, t) {
	let n = S({
		getLayout: () => ({}),
		setLayout: jt
	});
	y(t, () => n.current, []), $(() => {
		Object.assign(n.current, Tt({ groupId: e }));
	});
}
function ln({ children: e, className: t, defaultLayout: n, disableCursor: r, disabled: i, elementRef: a, groupRef: o, id: s, onLayoutChange: c, onLayoutChanged: l, orientation: u = "horizontal", resizeTargetMinimumSize: d = {
	coarse: 20,
	fine: 10
}, style: f, ...p }) {
	let m = S({
		onLayoutChange: {},
		onLayoutChanged: {}
	}), h = rn((e) => {
		K(m.current.onLayoutChange, e) || (m.current.onLayoutChange = e, c?.(e));
	}), g = rn((e) => {
		K(m.current.onLayoutChanged, e) || (m.current.onLayoutChanged = e, l?.(e));
	}), v = nn(s), y = S(null), [b, C] = tn(), w = S({
		lastExpandedPanelSizes: {},
		layouts: {},
		panels: [],
		resizeTargetMinimumSize: d,
		separators: []
	}), T = an(y, a);
	cn(v, o);
	let D = rn((e, t) => {
		let r = X(), i = ot(e), a = z(e);
		if (a) {
			let e = !1;
			switch (r.state) {
				case "active":
					e = r.hitRegions.some((e) => e.group === i);
					break;
			}
			return {
				flexGrow: a.layout[t] ?? 1,
				pointerEvents: e ? "none" : void 0
			};
		}
		if (n?.[t]) return { flexGrow: n?.[t] };
	}), O = on({
		defaultLayout: n,
		disableCursor: r
	}), k = x(() => ({
		get disableCursor() {
			return !!O.disableCursor;
		},
		getPanelStyles: D,
		id: v,
		orientation: u,
		registerPanel: (e) => {
			let t = w.current;
			return t.panels = Je(u, [...t.panels, e]), C(), () => {
				t.panels = t.panels.filter((t) => t !== e), C();
			};
		},
		registerSeparator: (e) => {
			let t = w.current;
			return t.separators = Je(u, [...t.separators, e]), C(), () => {
				t.separators = t.separators.filter((t) => t !== e), C();
			};
		},
		updatePanelProps: (e, { disabled: t }) => {
			let n = w.current.panels.find((t) => t.id === e);
			n && (n.panelConstraints.disabled = t);
			let r = ot(v), i = z(v);
			r && i && V(r, {
				...i,
				derivedPanelConstraints: qe(r)
			});
		},
		updateSeparatorProps: (e, { disabled: t, disableDoubleClick: n }) => {
			let r = w.current.separators.find((t) => t.id === e);
			r && (r.disabled = t, r.disableDoubleClick = n);
		}
	}), [
		D,
		v,
		C,
		u,
		O
	]), A = S(null);
	return $(() => {
		let e = y.current;
		if (e === null) return;
		let t = w.current, n;
		if (O.defaultLayout !== void 0 && Object.keys(O.defaultLayout).length === t.panels.length) {
			n = {};
			for (let e of t.panels) {
				let t = O.defaultLayout[e.id];
				t !== void 0 && (n[e.id] = t);
			}
		}
		let r = {
			disabled: !!i,
			element: e,
			id: v,
			mutableState: {
				defaultLayout: n,
				disableCursor: !!O.disableCursor,
				expandedPanelSizes: w.current.lastExpandedPanelSizes,
				layouts: w.current.layouts
			},
			orientation: u,
			panels: t.panels,
			resizeTargetMinimumSize: t.resizeTargetMinimumSize,
			separators: t.separators
		};
		A.current = r;
		let a = en(r), { defaultLayoutDeferred: o, derivedPanelConstraints: s, layout: c } = z(r.id, !0);
		!o && s.length > 0 && (h(c), g(c));
		let l = st(v, (e) => {
			let { defaultLayoutDeferred: t, derivedPanelConstraints: n, layout: i } = e.next;
			if (t || n.length === 0) return;
			let a = r.panels.map(({ id: e }) => e).join(",");
			r.mutableState.layouts[a] = i, n.forEach((t) => {
				if (t.collapsible) {
					let { layout: n } = e.prev ?? {};
					if (n) {
						let e = H(t.collapsedSize, i[t.panelId]), a = H(t.collapsedSize, n[t.panelId]);
						e && !a && (r.mutableState.expandedPanelSizes[t.panelId] = n[t.panelId]);
					}
				}
			});
			let o = X().state !== "active";
			h(i), o && g(i);
		});
		return () => {
			A.current = null, a(), l();
		};
	}, [
		i,
		v,
		g,
		h,
		u,
		b,
		O
	]), _(() => {
		let e = A.current;
		e && (e.mutableState.defaultLayout = n, e.mutableState.disableCursor = !!r);
	}), /* @__PURE__ */ E(sn.Provider, {
		value: k,
		children: /* @__PURE__ */ E("div", {
			...p,
			className: t,
			"data-group": !0,
			"data-testid": v,
			id: v,
			ref: T,
			style: {
				height: "100%",
				width: "100%",
				overflow: "hidden",
				...f,
				display: "flex",
				flexDirection: u === "horizontal" ? "row" : "column",
				flexWrap: "nowrap",
				touchAction: u === "horizontal" ? "pan-y" : "pan-x"
			},
			children: e
		})
	});
}
ln.displayName = "Group";
function un() {
	let e = g(sn);
	return L(e, "Group Context not found; did you render a Panel or Separator outside of a Group?"), e;
}
function dn(e, t) {
	let { id: n } = un(), r = S({
		collapse: Mt,
		expand: Mt,
		getSize: () => ({
			asPercentage: 0,
			inPixels: 0
		}),
		isCollapsed: () => !1,
		resize: Mt
	});
	y(t, () => r.current, []), $(() => {
		Object.assign(r.current, St({
			groupId: n,
			panelId: e
		}));
	});
}
function fn({ children: e, className: t, collapsedSize: n = "0%", collapsible: r = !1, defaultSize: i, disabled: a, elementRef: o, groupResizeBehavior: s = "preserve-relative-size", id: c, maxSize: l = "100%", minSize: u = "0%", onResize: d, panelRef: f, style: p, ...m }) {
	let h = !!c, g = nn(c), v = on({ disabled: a }), y = S(null), b = an(y, o), { getPanelStyles: x, id: C, orientation: T, registerPanel: D, updatePanelProps: O } = un(), k = d !== null, A = rn((e, t, n) => {
		d?.(e, c, n);
	});
	$(() => {
		let e = y.current;
		if (e !== null) return D({
			element: e,
			id: g,
			idIsStable: h,
			mutableValues: {
				expandToSize: void 0,
				prevSize: void 0
			},
			onResize: k ? A : void 0,
			panelConstraints: {
				groupResizeBehavior: s,
				collapsedSize: n,
				collapsible: r,
				defaultSize: i,
				disabled: v.disabled,
				maxSize: l,
				minSize: u
			}
		});
	}, [
		s,
		n,
		r,
		i,
		k,
		g,
		h,
		l,
		u,
		A,
		D,
		v
	]), _(() => {
		O(g, { disabled: a });
	}, [
		a,
		g,
		O
	]), dn(g, f);
	let ee = () => {
		let e = x(C, g);
		if (e) return JSON.stringify(e);
	}, te = w((e) => st(C, e), ee, ee), j;
	return j = te ? JSON.parse(te) : i ? {
		flexGrow: void 0,
		flexShrink: void 0,
		flexBasis: i
	} : { flexGrow: 1 }, /* @__PURE__ */ E("div", {
		...m,
		"data-disabled": a || void 0,
		"data-panel": !0,
		"data-testid": g,
		id: g,
		ref: b,
		style: {
			...pn,
			display: "flex",
			flexBasis: 0,
			flexShrink: 1,
			overflow: "visible",
			...j
		},
		children: /* @__PURE__ */ E("div", {
			className: t,
			style: {
				maxHeight: "100%",
				maxWidth: "100%",
				flexGrow: 1,
				overflow: "auto",
				...p,
				touchAction: T === "horizontal" ? "pan-y" : "pan-x"
			},
			children: e
		})
	});
}
fn.displayName = "Panel";
var pn = {
	minHeight: 0,
	maxHeight: "100%",
	height: "auto",
	minWidth: 0,
	maxWidth: "100%",
	width: "auto",
	border: "none",
	borderWidth: 0,
	padding: 0,
	margin: 0
};
function mn({ layout: e, panelConstraints: t, panelId: n, panelIndex: r }) {
	let i, a, o = e[n], s = t.find((e) => e.panelId === n);
	if (s) {
		let c = s.maxSize, l = s.collapsible ? s.collapsedSize : s.minSize, u = [r, r + 1];
		a = q({
			layout: G({
				delta: l - o,
				initialLayout: e,
				panelConstraints: t,
				pivotIndices: u,
				prevLayout: e
			}),
			panelConstraints: t
		})[n], i = q({
			layout: G({
				delta: c - o,
				initialLayout: e,
				panelConstraints: t,
				pivotIndices: u,
				prevLayout: e
			}),
			panelConstraints: t
		})[n];
	}
	return {
		valueControls: n,
		valueMax: i,
		valueMin: a,
		valueNow: o
	};
}
function hn({ children: e, className: t, disabled: n, disableDoubleClick: r, elementRef: i, id: a, style: o, ...s }) {
	let c = nn(a), l = on({
		disabled: n,
		disableDoubleClick: r
	}), [u, d] = C({}), [f, p] = C("inactive"), [m, h] = C(!1), g = S(null), v = an(g, i), { disableCursor: y, id: b, orientation: x, registerSeparator: w, updateSeparatorProps: T } = un(), D = x === "horizontal" ? "vertical" : "horizontal";
	$(() => {
		let e = g.current;
		if (e !== null) {
			let t = {
				disabled: l.disabled,
				disableDoubleClick: l.disableDoubleClick,
				element: e,
				id: c
			}, n = w(t), r = Ot((e) => {
				p(e.next.state !== "inactive" && e.next.hitRegions.some((e) => e.separator === t) ? e.next.state : "inactive");
			}), i = st(b, (e) => {
				let { derivedPanelConstraints: n, layout: r, separatorToPanels: i } = e.next, a = i.get(t);
				if (a) {
					let e = a[0], t = a.indexOf(e);
					d(mn({
						layout: r,
						panelConstraints: n,
						panelId: e.id,
						panelIndex: t
					}));
				}
			});
			return () => {
				r(), i(), n();
			};
		}
	}, [
		b,
		c,
		w,
		l
	]), _(() => {
		T(c, {
			disabled: n,
			disableDoubleClick: r
		});
	}, [
		n,
		r,
		c,
		T
	]);
	let O;
	n && !y && (O = "not-allowed");
	let k;
	if (n) k = "disabled";
	else switch (f) {
		case "active":
			k = "active";
			break;
		default: k = m ? "focus" : f;
	}
	return /* @__PURE__ */ E("div", {
		...s,
		"aria-controls": u.valueControls,
		"aria-disabled": n || void 0,
		"aria-orientation": D,
		"aria-valuemax": u.valueMax,
		"aria-valuemin": u.valueMin,
		"aria-valuenow": u.valueNow,
		children: e,
		className: t,
		"data-separator": k,
		"data-testid": c,
		id: c,
		onBlur: () => h(!1),
		onFocus: () => h(!0),
		ref: v,
		role: "separator",
		style: {
			flexBasis: "auto",
			cursor: O,
			...o,
			flexGrow: 0,
			flexShrink: 0,
			touchAction: "none"
		},
		tabIndex: n ? void 0 : 0
	});
}
hn.displayName = "Separator";
//#endregion
//#region src/components/ui/layout/panel-group.tsx
var gn = p.createContext("horizontal"), _n = p.forwardRef(({ className: t, direction: n = "horizontal", ...r }, i) => /* @__PURE__ */ E(gn.Provider, {
	value: n,
	children: /* @__PURE__ */ E(ln, {
		className: e("flex h-full min-h-0 w-full min-w-0 overflow-hidden rounded-[var(--sdk-radius-panel)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] shadow-[var(--sdk-shadow-sm)] data-[panel-group-direction=vertical]:flex-col", t),
		"data-panel-group-direction": n,
		"data-sdk-ui": "panel-group",
		"data-slot": "panel-group",
		elementRef: i,
		orientation: n,
		...r
	})
}));
_n.displayName = "PanelGroup";
var vn = p.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ E(fn, {
	className: e("min-h-0 min-w-0 overflow-hidden", t),
	"data-sdk-ui": "panel",
	"data-sdk-panel": "",
	"data-slot": "panel",
	elementRef: r,
	...n
}));
vn.displayName = "Panel";
var yn = p.forwardRef(({ className: t, children: n, withHandle: r = !1, ...i }, a) => {
	let o = p.useContext(gn);
	return /* @__PURE__ */ D(hn, {
		className: e("group relative flex shrink-0 touch-none select-none items-center justify-center bg-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sdk-color-border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sdk-color-surface-canvas)] hover:bg-[var(--sdk-color-border-strong)]", o === "horizontal" ? "h-full w-2 cursor-col-resize" : "h-2 w-full cursor-row-resize", t),
		"data-panel-group-direction": o,
		"data-sdk-ui": "panel-resize-handle",
		"data-sdk-panel-resize-handle": "",
		"data-slot": "panel-resize-handle",
		elementRef: a,
		...i,
		children: [r ? /* @__PURE__ */ E("span", {
			className: e("pointer-events-none flex items-center justify-center rounded-full border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] shadow-[var(--sdk-shadow-sm)]", o === "horizontal" ? "h-10 w-5" : "h-5 w-10"),
			"data-slot": "panel-resize-handle-grip",
			"data-testid": "sdk-panel-resize-handle-grip",
			children: /* @__PURE__ */ D("span", {
				className: e("grid gap-0.5 text-[var(--sdk-color-text-muted)]", o === "horizontal" ? "grid-flow-col" : "grid-flow-row"),
				children: [
					/* @__PURE__ */ E("span", { className: "h-1 w-1 rounded-full bg-current" }),
					/* @__PURE__ */ E("span", { className: "h-1 w-1 rounded-full bg-current" }),
					/* @__PURE__ */ E("span", { className: "h-1 w-1 rounded-full bg-current" })
				]
			})
		}) : /* @__PURE__ */ E("span", {
			"aria-hidden": "true",
			className: e("pointer-events-none absolute rounded-full bg-[var(--sdk-color-border-default)]", o === "horizontal" ? "left-1/2 top-0 h-full w-px -translate-x-1/2" : "left-0 top-1/2 h-px w-full -translate-y-1/2")
		}), n]
	});
});
yn.displayName = "PanelResizeHandle";
//#endregion
//#region src/components/ui/layout/sidebar-section.tsx
var bn = p.forwardRef(({ actions: t, children: i, className: a, defaultExpanded: o = !0, description: s, expanded: c, meta: l, onExpandedChange: u, title: d, ...f }, m) => {
	let h = c !== void 0, [g, _] = p.useState(o), v = h ? c : g, y = p.useId(), b = () => {
		let e = !v;
		h || _(e), u?.(e);
	};
	return /* @__PURE__ */ D("div", {
		ref: m,
		className: e("rounded-[var(--sdk-radius-control)] border border-[var(--sdk-color-border-subtle)] bg-[var(--sdk-color-surface-panel)]", a),
		"data-sdk-ui": "sidebar-section",
		"data-slot": "sidebar-section",
		"data-state": v ? "open" : "closed",
		...f,
		children: [/* @__PURE__ */ D("div", {
			className: "flex items-start gap-2 p-2",
			"data-slot": "sidebar-section-header",
			children: [/* @__PURE__ */ D("button", {
				"aria-controls": y,
				"aria-expanded": v,
				className: "flex min-w-0 flex-1 items-center justify-between gap-3 rounded-[var(--sdk-radius-control)] px-1 py-1.5 text-left transition-colors hover:bg-[var(--sdk-color-brand-primary-soft)]",
				"data-slot": "sidebar-section-trigger",
				onClick: b,
				type: "button",
				children: [/* @__PURE__ */ D("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ D("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ E("span", {
							className: "text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--sdk-color-text-muted)]",
							children: d
						}), l ? /* @__PURE__ */ E("span", {
							className: "shrink-0",
							children: l
						}) : null]
					}), s ? /* @__PURE__ */ E("div", {
						className: "mt-1 text-xs text-[var(--sdk-color-text-secondary)]",
						children: s
					}) : null]
				}), /* @__PURE__ */ E("span", {
					className: "shrink-0 text-[var(--sdk-color-text-muted)]",
					children: E(v ? n : r, { className: "h-3.5 w-3.5" })
				})]
			}), t ? /* @__PURE__ */ E("div", {
				className: "flex shrink-0 items-center gap-1",
				"data-slot": "sidebar-section-actions",
				children: t
			}) : null]
		}), v ? /* @__PURE__ */ E("div", {
			className: "border-t border-[var(--sdk-color-border-subtle)] px-3 pb-3 pt-2",
			"data-slot": "sidebar-section-content",
			id: y,
			children: i
		}) : null]
	});
});
bn.displayName = "SidebarSection";
//#endregion
//#region src/components/ui/layout/status-bar.tsx
var xn = {
	start: "justify-start",
	center: "justify-center",
	end: "justify-end"
}, Sn = p.forwardRef(({ className: t, role: n = "status", ...r }, i) => /* @__PURE__ */ E("div", {
	ref: i,
	className: e("flex min-h-9 w-full items-center gap-3 border-t border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] px-3 py-1.5 text-xs text-[var(--sdk-color-text-secondary)]", t),
	"data-sdk-ui": "status-bar",
	"data-slot": "status-bar",
	role: n,
	...r
}));
Sn.displayName = "StatusBar";
var Cn = p.forwardRef(({ align: t = "start", className: n, ...r }, i) => /* @__PURE__ */ E("div", {
	ref: i,
	className: e("flex min-w-0 flex-1 items-center gap-3", xn[t], n),
	"data-sdk-ui": "status-bar-section",
	"data-slot": "status-bar-section",
	...r
}));
Cn.displayName = "StatusBarSection";
var wn = p.forwardRef(({ children: t, className: n, icon: r, label: i, value: a, ...o }, s) => /* @__PURE__ */ D("div", {
	ref: s,
	className: e("inline-flex min-w-0 items-center gap-2", n),
	"data-sdk-ui": "status-bar-item",
	"data-slot": "status-bar-item",
	...o,
	children: [r ? /* @__PURE__ */ E("span", {
		className: "shrink-0 text-[var(--sdk-color-text-muted)]",
		children: r
	}) : null, i || a ? /* @__PURE__ */ D(T, { children: [i ? /* @__PURE__ */ E("span", {
		className: "truncate text-[var(--sdk-color-text-muted)]",
		children: i
	}) : null, a ? /* @__PURE__ */ E("span", {
		className: "truncate font-medium text-[var(--sdk-color-text-primary)]",
		children: a
	}) : null] }) : /* @__PURE__ */ E("span", {
		className: "truncate",
		children: t
	})]
}));
wn.displayName = "StatusBarItem";
//#endregion
//#region src/components/ui/layout/toolbar.tsx
var Tn = {
	start: "justify-start",
	center: "justify-center",
	end: "justify-end"
}, En = p.forwardRef(({ align: t = "start", "aria-orientation": n, className: r, orientation: i = "horizontal", role: a = "toolbar", wrap: o = !0, ...s }, c) => /* @__PURE__ */ E("div", {
	ref: c,
	"aria-orientation": n ?? i,
	className: e("flex min-h-11 w-full rounded-[var(--sdk-radius-control)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] px-3 py-2 shadow-[var(--sdk-shadow-sm)]", i === "horizontal" ? [
		"items-center",
		o ? "flex-wrap" : "flex-nowrap",
		Tn[t]
	] : "flex-col items-stretch", r),
	"data-sdk-ui": "toolbar",
	"data-slot": "toolbar",
	role: a,
	...s
}));
En.displayName = "Toolbar";
var Dn = p.forwardRef(({ className: t, orientation: n = "horizontal", wrap: r = !0, ...i }, a) => /* @__PURE__ */ E("div", {
	ref: a,
	className: e("flex gap-1.5", n === "horizontal" ? ["items-center", r ? "flex-wrap" : "flex-nowrap"] : "flex-col", t),
	"data-sdk-ui": "toolbar-group",
	"data-slot": "toolbar-group",
	...i
}));
Dn.displayName = "ToolbarGroup";
var On = p.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ E("div", {
	ref: r,
	className: e("min-w-4 flex-1", t),
	"data-sdk-ui": "toolbar-spacer",
	"data-slot": "toolbar-spacer",
	...n
}));
On.displayName = "ToolbarSpacer";
var kn = p.forwardRef(({ className: t, decorative: n = !1, orientation: r = "vertical", ...i }, a) => /* @__PURE__ */ E(Ve, {
	ref: a,
	className: e(r === "vertical" ? "mx-1 h-6" : "my-1 w-full", t),
	"data-sdk-ui": "toolbar-separator",
	"data-slot": "toolbar-separator",
	decorative: n,
	orientation: r,
	...i
}));
kn.displayName = "ToolbarSeparator";
//#endregion
export { Sn as a, bn as c, yn as d, Ve as f, On as i, vn as l, Pe as m, Dn as n, wn as o, Ne as p, kn as r, Cn as s, En as t, _n as u };

//# sourceMappingURL=layout-HtOuA47M.js.map