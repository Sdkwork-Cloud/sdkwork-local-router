import { t as e } from "./utils-Bgb-Nm-x.js";
import { i as t } from "./dist-CJMju1B6.js";
import { i as n, t as r } from "./button-DW2aECbt.js";
import { b as i, c as a, d as o, g as s, l as c, o as l, p as u, s as d, u as f, v as p, y as m } from "./Combination-DHpOS5dI.js";
import { t as h } from "./chevron-right-C2amLX5H.js";
import { t as g } from "./triangle-alert-BO2W8DLJ.js";
import { t as _ } from "./x-8IarCZxo.js";
import { d as v, i as y, n as b, s as x, t as S, u as C } from "./dist-Dedo1J3L.js";
import { _ as w, a as T, c as ee, d as te, f as ne, g as re, h as ie, i as ae, l as oe, m as se, n as ce, o as le, p as ue, r as de, s as fe, t as pe, u as me } from "./dist-WFcEkA-O.js";
import { _ as he, d as ge, f as _e, g as ve, h as ye, m as be, p as xe, v as Se } from "./dialog-t77bVQJv.js";
import { t as Ce } from "./dist-KnaVSaQi.js";
import * as E from "react";
import { Fragment as we, jsx as D, jsxs as O } from "react/jsx-runtime";
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-tooltip@1.2_9074d9fb06315b089b2bee17c4c65951/node_modules/@radix-ui/react-tooltip/dist/index.mjs
var [k, Te] = C("Tooltip", [o]), A = o(), Ee = "TooltipProvider", De = 700, j = "tooltip.open", [Oe, M] = k(Ee), ke = (e) => {
	let { __scopeTooltip: t, delayDuration: n = De, skipDelayDuration: r = 300, disableHoverableContent: i = !1, children: a } = e, o = E.useRef(!0), s = E.useRef(!1), c = E.useRef(0);
	return E.useEffect(() => {
		let e = c.current;
		return () => window.clearTimeout(e);
	}, []), /* @__PURE__ */ D(Oe, {
		scope: t,
		isOpenDelayedRef: o,
		delayDuration: n,
		onOpen: E.useCallback(() => {
			window.clearTimeout(c.current), o.current = !1;
		}, []),
		onClose: E.useCallback(() => {
			window.clearTimeout(c.current), c.current = window.setTimeout(() => o.current = !0, r);
		}, [r]),
		isPointerInTransitRef: s,
		onPointerInTransitChange: E.useCallback((e) => {
			s.current = e;
		}, []),
		disableHoverableContent: i,
		children: a
	});
};
ke.displayName = Ee;
var N = "Tooltip", [Ae, P] = k(N), je = (e) => {
	let { __scopeTooltip: t, children: n, open: r, defaultOpen: i, onOpenChange: a, disableHoverableContent: o, delayDuration: s } = e, c = M(N, e.__scopeTooltip), l = A(t), [d, m] = E.useState(null), h = u(), g = E.useRef(0), _ = o ?? c.disableHoverableContent, v = s ?? c.delayDuration, y = E.useRef(!1), [b, x] = p({
		prop: r,
		defaultProp: i ?? !1,
		onChange: (e) => {
			e ? (c.onOpen(), document.dispatchEvent(new CustomEvent(j))) : c.onClose(), a?.(e);
		},
		caller: N
	}), S = E.useMemo(() => b ? y.current ? "delayed-open" : "instant-open" : "closed", [b]), C = E.useCallback(() => {
		window.clearTimeout(g.current), g.current = 0, y.current = !1, x(!0);
	}, [x]), w = E.useCallback(() => {
		window.clearTimeout(g.current), g.current = 0, x(!1);
	}, [x]), T = E.useCallback(() => {
		window.clearTimeout(g.current), g.current = window.setTimeout(() => {
			y.current = !0, x(!0), g.current = 0;
		}, v);
	}, [v, x]);
	return E.useEffect(() => () => {
		g.current &&= (window.clearTimeout(g.current), 0);
	}, []), /* @__PURE__ */ D(f, {
		...l,
		children: /* @__PURE__ */ D(Ae, {
			scope: t,
			contentId: h,
			open: b,
			stateAttribute: S,
			trigger: d,
			onTriggerChange: m,
			onTriggerEnter: E.useCallback(() => {
				c.isOpenDelayedRef.current ? T() : C();
			}, [
				c.isOpenDelayedRef,
				T,
				C
			]),
			onTriggerLeave: E.useCallback(() => {
				_ ? w() : (window.clearTimeout(g.current), g.current = 0);
			}, [w, _]),
			onOpen: C,
			onClose: w,
			disableHoverableContent: _,
			children: n
		})
	});
};
je.displayName = N;
var F = "TooltipTrigger", Me = E.forwardRef((e, n) => {
	let { __scopeTooltip: r, ...i } = e, a = P(F, r), o = M(F, r), s = A(r), c = t(n, E.useRef(null), a.onTriggerChange), l = E.useRef(!1), u = E.useRef(!1), f = E.useCallback(() => l.current = !1, []);
	return E.useEffect(() => () => document.removeEventListener("pointerup", f), [f]), /* @__PURE__ */ D(d, {
		asChild: !0,
		...s,
		children: /* @__PURE__ */ D(y.button, {
			"aria-describedby": a.open ? a.contentId : void 0,
			"data-state": a.stateAttribute,
			...i,
			ref: c,
			onPointerMove: v(e.onPointerMove, (e) => {
				e.pointerType !== "touch" && !u.current && !o.isPointerInTransitRef.current && (a.onTriggerEnter(), u.current = !0);
			}),
			onPointerLeave: v(e.onPointerLeave, () => {
				a.onTriggerLeave(), u.current = !1;
			}),
			onPointerDown: v(e.onPointerDown, () => {
				a.open && a.onClose(), l.current = !0, document.addEventListener("pointerup", f, { once: !0 });
			}),
			onFocus: v(e.onFocus, () => {
				l.current || a.onOpen();
			}),
			onBlur: v(e.onBlur, a.onClose),
			onClick: v(e.onClick, a.onClose)
		})
	});
});
Me.displayName = F;
var I = "TooltipPortal", [Ne, Pe] = k(I, { forceMount: void 0 }), Fe = (e) => {
	let { __scopeTooltip: t, forceMount: n, children: r, container: i } = e, a = P(I, t);
	return /* @__PURE__ */ D(Ne, {
		scope: t,
		forceMount: n,
		children: /* @__PURE__ */ D(S, {
			present: n || a.open,
			children: /* @__PURE__ */ D(l, {
				asChild: !0,
				container: i,
				children: r
			})
		})
	});
};
Fe.displayName = I;
var L = "TooltipContent", Ie = E.forwardRef((e, t) => {
	let n = Pe(L, e.__scopeTooltip), { forceMount: r = n.forceMount, side: i = "top", ...a } = e, o = P(L, e.__scopeTooltip);
	return /* @__PURE__ */ D(S, {
		present: r || o.open,
		children: o.disableHoverableContent ? /* @__PURE__ */ D(Ve, {
			side: i,
			...a,
			ref: t
		}) : /* @__PURE__ */ D(Le, {
			side: i,
			...a,
			ref: t
		})
	});
}), Le = E.forwardRef((e, n) => {
	let r = P(L, e.__scopeTooltip), i = M(L, e.__scopeTooltip), a = E.useRef(null), o = t(n, a), [s, c] = E.useState(null), { trigger: l, onClose: u } = r, d = a.current, { onPointerInTransitChange: f } = i, p = E.useCallback(() => {
		c(null), f(!1);
	}, [f]), m = E.useCallback((e, t) => {
		let n = e.currentTarget, r = {
			x: e.clientX,
			y: e.clientY
		}, i = Ge(r, We(r, n.getBoundingClientRect())), a = Ke(t.getBoundingClientRect());
		c(Je([...i, ...a])), f(!0);
	}, [f]);
	return E.useEffect(() => () => p(), [p]), E.useEffect(() => {
		if (l && d) {
			let e = (e) => m(e, d), t = (e) => m(e, l);
			return l.addEventListener("pointerleave", e), d.addEventListener("pointerleave", t), () => {
				l.removeEventListener("pointerleave", e), d.removeEventListener("pointerleave", t);
			};
		}
	}, [
		l,
		d,
		m,
		p
	]), E.useEffect(() => {
		if (s) {
			let e = (e) => {
				let t = e.target, n = {
					x: e.clientX,
					y: e.clientY
				}, r = l?.contains(t) || d?.contains(t), i = !qe(n, s);
				r ? p() : i && (p(), u());
			};
			return document.addEventListener("pointermove", e), () => document.removeEventListener("pointermove", e);
		}
	}, [
		l,
		d,
		s,
		u,
		p
	]), /* @__PURE__ */ D(Ve, {
		...e,
		ref: o
	});
}), [Re, ze] = k(N, { isInside: !1 }), Be = x("TooltipContent"), Ve = E.forwardRef((e, t) => {
	let { __scopeTooltip: n, children: r, "aria-label": i, onEscapeKeyDown: a, onPointerDownOutside: o, ...l } = e, u = P(L, n), d = A(n), { onClose: f } = u;
	return E.useEffect(() => (document.addEventListener(j, f), () => document.removeEventListener(j, f)), [f]), E.useEffect(() => {
		if (u.trigger) {
			let e = (e) => {
				e.target?.contains(u.trigger) && f();
			};
			return window.addEventListener("scroll", e, { capture: !0 }), () => window.removeEventListener("scroll", e, { capture: !0 });
		}
	}, [u.trigger, f]), /* @__PURE__ */ D(s, {
		asChild: !0,
		disableOutsidePointerEvents: !1,
		onEscapeKeyDown: a,
		onPointerDownOutside: o,
		onFocusOutside: (e) => e.preventDefault(),
		onDismiss: f,
		children: /* @__PURE__ */ O(c, {
			"data-state": u.stateAttribute,
			...d,
			...l,
			ref: t,
			style: {
				...l.style,
				"--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
				"--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
				"--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
				"--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
				"--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
			},
			children: [/* @__PURE__ */ D(Be, { children: r }), /* @__PURE__ */ D(Re, {
				scope: n,
				isInside: !0,
				children: /* @__PURE__ */ D(Ce, {
					id: u.contentId,
					role: "tooltip",
					children: i || r
				})
			})]
		})
	});
});
Ie.displayName = L;
var He = "TooltipArrow", Ue = E.forwardRef((e, t) => {
	let { __scopeTooltip: n, ...r } = e, i = A(n);
	return ze(He, n).isInside ? null : /* @__PURE__ */ D(a, {
		...i,
		...r,
		ref: t
	});
});
Ue.displayName = He;
function We(e, t) {
	let n = Math.abs(t.top - e.y), r = Math.abs(t.bottom - e.y), i = Math.abs(t.right - e.x), a = Math.abs(t.left - e.x);
	switch (Math.min(n, r, i, a)) {
		case a: return "left";
		case i: return "right";
		case n: return "top";
		case r: return "bottom";
		default: throw Error("unreachable");
	}
}
function Ge(e, t, n = 5) {
	let r = [];
	switch (t) {
		case "top":
			r.push({
				x: e.x - n,
				y: e.y + n
			}, {
				x: e.x + n,
				y: e.y + n
			});
			break;
		case "bottom":
			r.push({
				x: e.x - n,
				y: e.y - n
			}, {
				x: e.x + n,
				y: e.y - n
			});
			break;
		case "left":
			r.push({
				x: e.x + n,
				y: e.y - n
			}, {
				x: e.x + n,
				y: e.y + n
			});
			break;
		case "right":
			r.push({
				x: e.x - n,
				y: e.y - n
			}, {
				x: e.x - n,
				y: e.y + n
			});
			break;
	}
	return r;
}
function Ke(e) {
	let { top: t, right: n, bottom: r, left: i } = e;
	return [
		{
			x: i,
			y: t
		},
		{
			x: n,
			y: t
		},
		{
			x: n,
			y: r
		},
		{
			x: i,
			y: r
		}
	];
}
function qe(e, t) {
	let { x: n, y: r } = e, i = !1;
	for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
		let o = t[e], s = t[a], c = o.x, l = o.y, u = s.x, d = s.y;
		l > r != d > r && n < (u - c) * (r - l) / (d - l) + c && (i = !i);
	}
	return i;
}
function Je(e) {
	let t = e.slice();
	return t.sort((e, t) => e.x < t.x ? -1 : e.x > t.x ? 1 : e.y < t.y ? -1 : e.y > t.y ? 1 : 0), Ye(t);
}
function Ye(e) {
	if (e.length <= 1) return e.slice();
	let t = [];
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (; t.length >= 2;) {
			let e = t[t.length - 1], n = t[t.length - 2];
			if ((e.x - n.x) * (r.y - n.y) >= (e.y - n.y) * (r.x - n.x)) t.pop();
			else break;
		}
		t.push(r);
	}
	t.pop();
	let n = [];
	for (let t = e.length - 1; t >= 0; t--) {
		let r = e[t];
		for (; n.length >= 2;) {
			let e = n[n.length - 1], t = n[n.length - 2];
			if ((e.x - t.x) * (r.y - t.y) >= (e.y - t.y) * (r.x - t.x)) n.pop();
			else break;
		}
		n.push(r);
	}
	return n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n);
}
var Xe = ke, Ze = je, Qe = Me, $e = Fe, et = Ie, tt = Xe, nt = Ze, rt = E.forwardRef(({ ...e }, t) => /* @__PURE__ */ D(Qe, {
	ref: t,
	"data-sdk-ui": "tooltip-trigger",
	"data-slot": "tooltip-trigger",
	...e
}));
rt.displayName = "TooltipTrigger";
var it = E.forwardRef(({ className: t, sideOffset: n = 6, ...r }, i) => /* @__PURE__ */ D($e, { children: /* @__PURE__ */ D(et, {
	ref: i,
	sideOffset: n,
	className: e("z-50 overflow-hidden rounded-[var(--sdk-radius-control)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] px-3 py-1.5 text-xs text-[var(--sdk-color-text-primary)] shadow-[var(--sdk-shadow-md)]", t),
	"data-sdk-ui": "tooltip-content",
	"data-slot": "tooltip-content",
	...r
}) }));
it.displayName = "TooltipContent", nt.displayName = "Tooltip", tt.displayName = "TooltipProvider";
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-context-men_7ddebea395c65d3c4d3683b445765102/node_modules/@radix-ui/react-context-menu/dist/index.mjs
var R = "ContextMenu", [at, ot] = C(R, [w]), z = w(), [st, ct] = at(R), lt = (e) => {
	let { __scopeContextMenu: t, children: n, onOpenChange: r, dir: i, modal: a = !0 } = e, [o, s] = E.useState(!1), c = z(t), l = b(r), u = E.useCallback((e) => {
		s(e), l(e);
	}, [l]);
	return /* @__PURE__ */ D(st, {
		scope: t,
		open: o,
		onOpenChange: u,
		modal: a,
		children: /* @__PURE__ */ D(ne, {
			...c,
			dir: i,
			open: o,
			onOpenChange: u,
			modal: a,
			children: n
		})
	});
};
lt.displayName = R;
var ut = "ContextMenuTrigger", dt = E.forwardRef((e, t) => {
	let { __scopeContextMenu: n, disabled: r = !1, ...i } = e, a = ct(ut, n), o = z(n), s = E.useRef({
		x: 0,
		y: 0
	}), c = E.useRef({ getBoundingClientRect: () => DOMRect.fromRect({
		width: 0,
		height: 0,
		...s.current
	}) }), l = E.useRef(0), u = E.useCallback(() => window.clearTimeout(l.current), []), d = (e) => {
		s.current = {
			x: e.clientX,
			y: e.clientY
		}, a.onOpenChange(!0);
	};
	return E.useEffect(() => u, [u]), E.useEffect(() => void (r && u()), [r, u]), /* @__PURE__ */ O(we, { children: [/* @__PURE__ */ D(pe, {
		...o,
		virtualRef: c
	}), /* @__PURE__ */ D(y.span, {
		"data-state": a.open ? "open" : "closed",
		"data-disabled": r ? "" : void 0,
		...i,
		ref: t,
		style: {
			WebkitTouchCallout: "none",
			...e.style
		},
		onContextMenu: r ? e.onContextMenu : v(e.onContextMenu, (e) => {
			u(), d(e), e.preventDefault();
		}),
		onPointerDown: r ? e.onPointerDown : v(e.onPointerDown, B((e) => {
			u(), l.current = window.setTimeout(() => d(e), 700);
		})),
		onPointerMove: r ? e.onPointerMove : v(e.onPointerMove, B(u)),
		onPointerCancel: r ? e.onPointerCancel : v(e.onPointerCancel, B(u)),
		onPointerUp: r ? e.onPointerUp : v(e.onPointerUp, B(u))
	})] });
});
dt.displayName = ut;
var ft = "ContextMenuPortal", pt = (e) => {
	let { __scopeContextMenu: t, ...n } = e;
	return /* @__PURE__ */ D(oe, {
		...z(t),
		...n
	});
};
pt.displayName = ft;
var mt = "ContextMenuContent", ht = E.forwardRef((e, t) => {
	let { __scopeContextMenu: n, ...r } = e, i = ct(mt, n), a = z(n), o = E.useRef(!1);
	return /* @__PURE__ */ D(ae, {
		...a,
		...r,
		ref: t,
		side: "right",
		sideOffset: 2,
		align: "start",
		onCloseAutoFocus: (t) => {
			e.onCloseAutoFocus?.(t), !t.defaultPrevented && o.current && t.preventDefault(), o.current = !1;
		},
		onInteractOutside: (t) => {
			e.onInteractOutside?.(t), !t.defaultPrevented && !i.modal && (o.current = !0);
		},
		style: {
			...e.style,
			"--radix-context-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-context-menu-content-available-width": "var(--radix-popper-available-width)",
			"--radix-context-menu-content-available-height": "var(--radix-popper-available-height)",
			"--radix-context-menu-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-context-menu-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
});
ht.displayName = mt;
var gt = "ContextMenuGroup", _t = E.forwardRef((e, t) => {
	let { __scopeContextMenu: n, ...r } = e;
	return /* @__PURE__ */ D(T, {
		...z(n),
		...r,
		ref: t
	});
});
_t.displayName = gt;
var vt = "ContextMenuLabel", yt = E.forwardRef((e, t) => {
	let { __scopeContextMenu: n, ...r } = e;
	return /* @__PURE__ */ D(ee, {
		...z(n),
		...r,
		ref: t
	});
});
yt.displayName = vt;
var bt = "ContextMenuItem", xt = E.forwardRef((e, t) => {
	let { __scopeContextMenu: n, ...r } = e;
	return /* @__PURE__ */ D(le, {
		...z(n),
		...r,
		ref: t
	});
});
xt.displayName = bt;
var St = "ContextMenuCheckboxItem", Ct = E.forwardRef((e, t) => {
	let { __scopeContextMenu: n, ...r } = e;
	return /* @__PURE__ */ D(de, {
		...z(n),
		...r,
		ref: t
	});
});
Ct.displayName = St;
var wt = "ContextMenuRadioGroup", Tt = E.forwardRef((e, t) => {
	let { __scopeContextMenu: n, ...r } = e;
	return /* @__PURE__ */ D(me, {
		...z(n),
		...r,
		ref: t
	});
});
Tt.displayName = wt;
var Et = "ContextMenuRadioItem", Dt = E.forwardRef((e, t) => {
	let { __scopeContextMenu: n, ...r } = e;
	return /* @__PURE__ */ D(te, {
		...z(n),
		...r,
		ref: t
	});
});
Dt.displayName = Et;
var Ot = "ContextMenuItemIndicator", kt = E.forwardRef((e, t) => {
	let { __scopeContextMenu: n, ...r } = e;
	return /* @__PURE__ */ D(fe, {
		...z(n),
		...r,
		ref: t
	});
});
kt.displayName = Ot;
var At = "ContextMenuSeparator", jt = E.forwardRef((e, t) => {
	let { __scopeContextMenu: n, ...r } = e;
	return /* @__PURE__ */ D(ue, {
		...z(n),
		...r,
		ref: t
	});
});
jt.displayName = At;
var Mt = "ContextMenuArrow", Nt = E.forwardRef((e, t) => {
	let { __scopeContextMenu: n, ...r } = e;
	return /* @__PURE__ */ D(ce, {
		...z(n),
		...r,
		ref: t
	});
});
Nt.displayName = Mt;
var Pt = "ContextMenuSub", Ft = (e) => {
	let { __scopeContextMenu: t, children: n, onOpenChange: r, open: i, defaultOpen: a } = e, o = z(t), [s, c] = p({
		prop: i,
		defaultProp: a ?? !1,
		onChange: r,
		caller: Pt
	});
	return /* @__PURE__ */ D(se, {
		...o,
		open: s,
		onOpenChange: c,
		children: n
	});
};
Ft.displayName = Pt;
var It = "ContextMenuSubTrigger", Lt = E.forwardRef((e, t) => {
	let { __scopeContextMenu: n, ...r } = e;
	return /* @__PURE__ */ D(re, {
		...z(n),
		...r,
		ref: t
	});
});
Lt.displayName = It;
var Rt = "ContextMenuSubContent", zt = E.forwardRef((e, t) => {
	let { __scopeContextMenu: n, ...r } = e;
	return /* @__PURE__ */ D(ie, {
		...z(n),
		...r,
		ref: t,
		style: {
			...e.style,
			"--radix-context-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-context-menu-content-available-width": "var(--radix-popper-available-width)",
			"--radix-context-menu-content-available-height": "var(--radix-popper-available-height)",
			"--radix-context-menu-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-context-menu-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
});
zt.displayName = Rt;
function B(e) {
	return (t) => t.pointerType === "mouse" ? void 0 : e(t);
}
var Bt = lt, Vt = dt, Ht = pt, Ut = ht, Wt = _t, Gt = yt, Kt = xt, qt = Ct, Jt = Tt, Yt = Dt, Xt = kt, Zt = jt, Qt = Ft, $t = Lt, en = zt, tn = Bt, nn = Ht, rn = Qt, an = E.forwardRef(({ ...e }, t) => /* @__PURE__ */ D(Vt, {
	ref: t,
	"data-sdk-ui": "context-menu-trigger",
	"data-slot": "context-menu-trigger",
	...e
}));
an.displayName = "ContextMenuTrigger";
var on = E.forwardRef(({ ...e }, t) => /* @__PURE__ */ D(Wt, {
	ref: t,
	"data-sdk-ui": "context-menu-group",
	"data-slot": "context-menu-group",
	...e
}));
on.displayName = "ContextMenuGroup";
var sn = E.forwardRef(({ ...e }, t) => /* @__PURE__ */ D(Jt, {
	ref: t,
	"data-sdk-ui": "context-menu-radio-group",
	"data-slot": "context-menu-radio-group",
	...e
}));
sn.displayName = "ContextMenuRadioGroup";
var cn = E.forwardRef(({ className: t, inset: n, children: r, ...i }, a) => /* @__PURE__ */ O($t, {
	className: e("flex cursor-default select-none items-center rounded-[var(--sdk-radius-field)] px-2 py-2 text-sm outline-none transition-colors focus:bg-[var(--sdk-color-brand-primary-soft)] data-[state=open]:bg-[var(--sdk-color-brand-primary-soft)]", n && "pl-8", t),
	"data-sdk-ui": "context-menu-sub-trigger",
	"data-slot": "context-menu-sub-trigger",
	ref: a,
	...i,
	children: [r, /* @__PURE__ */ D(h, { className: "ml-auto h-4 w-4" })]
}));
cn.displayName = "ContextMenuSubTrigger";
var ln = E.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ D(en, {
	className: e("z-50 min-w-[12rem] overflow-hidden rounded-[var(--sdk-radius-panel)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] p-1 text-[var(--sdk-color-text-primary)] shadow-[var(--sdk-shadow-lg)]", t),
	"data-sdk-ui": "context-menu-sub-content",
	"data-slot": "context-menu-sub-content",
	ref: r,
	...n
}));
ln.displayName = "ContextMenuSubContent";
var un = E.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ D(Ht, { children: /* @__PURE__ */ D(Ut, {
	className: e("z-50 min-w-[12rem] overflow-hidden rounded-[var(--sdk-radius-panel)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] p-1 text-[var(--sdk-color-text-primary)] shadow-[var(--sdk-shadow-lg)]", t),
	"data-sdk-ui": "context-menu-content",
	"data-slot": "context-menu-content",
	ref: r,
	...n
}) }));
un.displayName = "ContextMenuContent";
var dn = E.forwardRef(({ className: t, inset: n, ...r }, i) => /* @__PURE__ */ D(Kt, {
	className: e("relative flex cursor-default select-none items-center rounded-[var(--sdk-radius-field)] px-2 py-2 text-sm outline-none transition-colors focus:bg-[var(--sdk-color-brand-primary-soft)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50", n && "pl-8", t),
	"data-sdk-ui": "context-menu-item",
	"data-slot": "context-menu-item",
	ref: i,
	...r
}));
dn.displayName = "ContextMenuItem";
var fn = E.forwardRef(({ className: t, children: n, checked: r, ...a }, o) => /* @__PURE__ */ O(qt, {
	checked: r,
	className: e("relative flex cursor-default select-none items-center rounded-[var(--sdk-radius-field)] py-2 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-[var(--sdk-color-brand-primary-soft)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50", t),
	"data-sdk-ui": "context-menu-checkbox-item",
	"data-slot": "context-menu-checkbox-item",
	ref: o,
	...a,
	children: [/* @__PURE__ */ D("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ D(Xt, { children: /* @__PURE__ */ D(i, { className: "h-4 w-4" }) })
	}), n]
}));
fn.displayName = "ContextMenuCheckboxItem";
var pn = E.forwardRef(({ className: t, children: n, ...r }, i) => /* @__PURE__ */ O(Yt, {
	className: e("relative flex cursor-default select-none items-center rounded-[var(--sdk-radius-field)] py-2 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-[var(--sdk-color-brand-primary-soft)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50", t),
	"data-sdk-ui": "context-menu-radio-item",
	"data-slot": "context-menu-radio-item",
	ref: i,
	...r,
	children: [/* @__PURE__ */ D("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ D(Xt, { children: /* @__PURE__ */ D(m, { className: "h-2 w-2 fill-current" }) })
	}), n]
}));
pn.displayName = "ContextMenuRadioItem";
var mn = E.forwardRef(({ className: t, inset: n, ...r }, i) => /* @__PURE__ */ D(Gt, {
	className: e("px-2 py-1.5 text-xs font-semibold text-[var(--sdk-color-text-secondary)]", n && "pl-8", t),
	"data-sdk-ui": "context-menu-label",
	"data-slot": "context-menu-label",
	ref: i,
	...r
}));
mn.displayName = "ContextMenuLabel";
var hn = E.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ D(Zt, {
	className: e("mx-1 my-1 h-px bg-[var(--sdk-color-border-subtle)]", t),
	"data-sdk-ui": "context-menu-separator",
	"data-slot": "context-menu-separator",
	ref: r,
	...n
}));
hn.displayName = "ContextMenuSeparator";
var gn = E.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ D("span", {
	ref: r,
	className: e("ml-auto text-xs tracking-[0.08em] text-[var(--sdk-color-text-muted)]", t),
	"data-sdk-ui": "context-menu-shortcut",
	"data-slot": "context-menu-shortcut",
	...n
}));
gn.displayName = "ContextMenuShortcut", tn.displayName = "ContextMenu", nn.displayName = "ContextMenuPortal", rn.displayName = "ContextMenuSub";
//#endregion
//#region src/components/ui/overlays/drawer.tsx
var _n = ve, V = ye, vn = E.forwardRef(({ ...e }, t) => /* @__PURE__ */ D(Se, {
	ref: t,
	"data-sdk-ui": "drawer-trigger",
	"data-slot": "drawer-trigger",
	...e
}));
vn.displayName = "DrawerTrigger";
var H = E.forwardRef(({ ...e }, t) => /* @__PURE__ */ D(ge, {
	ref: t,
	"data-sdk-ui": "drawer-close",
	"data-slot": "drawer-close",
	...e
}));
H.displayName = "DrawerClose";
var U = E.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ D(be, {
	className: e("fixed inset-0 z-50 bg-[var(--sdk-color-surface-overlay)] backdrop-blur-sm", t),
	"data-sdk-ui": "drawer-overlay",
	"data-slot": "drawer-overlay",
	ref: r,
	...n
}));
U.displayName = "DrawerOverlay";
var yn = n("fixed z-50 flex h-full flex-col border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] text-[var(--sdk-color-text-primary)] shadow-[var(--sdk-shadow-lg)] outline-none", {
	defaultVariants: {
		side: "right",
		size: "md"
	},
	variants: {
		side: {
			left: "inset-y-0 left-0 rounded-r-[var(--sdk-radius-panel)] border-r data-[state=closed]:-translate-x-full data-[state=open]:translate-x-0",
			right: "inset-y-0 right-0 rounded-l-[var(--sdk-radius-panel)] border-l data-[state=closed]:translate-x-full data-[state=open]:translate-x-0"
		},
		size: {
			sm: "w-[min(92vw,24rem)]",
			md: "w-[min(92vw,32rem)]",
			lg: "w-[min(92vw,40rem)]",
			xl: "w-[min(92vw,48rem)]",
			full: "w-screen rounded-none"
		}
	}
}), bn = E.forwardRef(({ children: t, className: n, side: r, size: i, ...a }, o) => /* @__PURE__ */ O(V, { children: [/* @__PURE__ */ D(U, {}), /* @__PURE__ */ O(_e, {
	className: e(yn({
		side: r,
		size: i
	}), "transition-transform duration-200 ease-out", n),
	"data-sdk-ui": "drawer-content",
	"data-slot": "drawer-content",
	ref: o,
	...a,
	children: [t, /* @__PURE__ */ O(H, {
		className: "absolute right-4 top-4 rounded-full p-2 text-[var(--sdk-color-text-muted)] transition-colors hover:bg-[var(--sdk-color-brand-primary-soft)] hover:text-[var(--sdk-color-text-primary)]",
		children: [/* @__PURE__ */ D(_, { className: "h-4 w-4" }), /* @__PURE__ */ D("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
bn.displayName = "DrawerContent";
var xn = E.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ D("div", {
	ref: r,
	className: e("flex shrink-0 flex-col gap-1.5 border-b border-[var(--sdk-color-border-default)] px-6 py-5 pr-14", t),
	"data-sdk-ui": "drawer-header",
	"data-slot": "drawer-header",
	...n
})), Sn = E.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ D("div", {
	ref: r,
	className: e("flex-1 overflow-y-auto px-6 py-5", t),
	"data-sdk-ui": "drawer-body",
	"data-slot": "drawer-body",
	...n
})), Cn = E.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ D("div", {
	ref: r,
	className: e("flex shrink-0 items-center justify-end gap-3 border-t border-[var(--sdk-color-border-default)] px-6 py-4", t),
	"data-sdk-ui": "drawer-footer",
	"data-slot": "drawer-footer",
	...n
})), wn = E.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ D(he, {
	className: e("text-lg font-semibold", t),
	"data-sdk-ui": "drawer-title",
	"data-slot": "drawer-title",
	ref: r,
	...n
}));
wn.displayName = "DrawerTitle";
var Tn = E.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ D(xe, {
	className: e("text-sm text-[var(--sdk-color-text-secondary)]", t),
	"data-sdk-ui": "drawer-description",
	"data-slot": "drawer-description",
	ref: r,
	...n
}));
Tn.displayName = "DrawerDescription", _n.displayName = "Drawer", Sn.displayName = "DrawerBody", Cn.displayName = "DrawerFooter", xn.displayName = "DrawerHeader", V.displayName = "DrawerPortal";
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-hover-card@_7ad81962fbdf173de4beb0078b2863c0/node_modules/@radix-ui/react-hover-card/dist/index.mjs
var W, G = "HoverCard", [En, Dn] = C(G, [o]), K = o(), [On, q] = En(G), kn = (e) => {
	let { __scopeHoverCard: t, children: n, open: r, defaultOpen: i, onOpenChange: a, openDelay: o = 700, closeDelay: s = 300 } = e, c = K(t), l = E.useRef(0), u = E.useRef(0), d = E.useRef(!1), m = E.useRef(!1), [h, g] = p({
		prop: r,
		defaultProp: i ?? !1,
		onChange: a,
		caller: G
	}), _ = E.useCallback(() => {
		clearTimeout(u.current), l.current = window.setTimeout(() => g(!0), o);
	}, [o, g]), v = E.useCallback(() => {
		clearTimeout(l.current), !d.current && !m.current && (u.current = window.setTimeout(() => g(!1), s));
	}, [s, g]), y = E.useCallback(() => g(!1), [g]);
	return E.useEffect(() => () => {
		clearTimeout(l.current), clearTimeout(u.current);
	}, []), /* @__PURE__ */ D(On, {
		scope: t,
		open: h,
		onOpenChange: g,
		onOpen: _,
		onClose: v,
		onDismiss: y,
		hasSelectionRef: d,
		isPointerDownOnContentRef: m,
		children: /* @__PURE__ */ D(f, {
			...c,
			children: n
		})
	});
};
kn.displayName = G;
var An = "HoverCardTrigger", jn = E.forwardRef((e, t) => {
	let { __scopeHoverCard: n, ...r } = e, i = q(An, n);
	return /* @__PURE__ */ D(d, {
		asChild: !0,
		...K(n),
		children: /* @__PURE__ */ D(y.a, {
			"data-state": i.open ? "open" : "closed",
			...r,
			ref: t,
			onPointerEnter: v(e.onPointerEnter, X(i.onOpen)),
			onPointerLeave: v(e.onPointerLeave, X(i.onClose)),
			onFocus: v(e.onFocus, i.onOpen),
			onBlur: v(e.onBlur, i.onClose),
			onTouchStart: v(e.onTouchStart, (e) => e.preventDefault())
		})
	});
});
jn.displayName = An;
var J = "HoverCardPortal", [Mn, Nn] = En(J, { forceMount: void 0 }), Pn = (e) => {
	let { __scopeHoverCard: t, forceMount: n, children: r, container: i } = e, a = q(J, t);
	return /* @__PURE__ */ D(Mn, {
		scope: t,
		forceMount: n,
		children: /* @__PURE__ */ D(S, {
			present: n || a.open,
			children: /* @__PURE__ */ D(l, {
				asChild: !0,
				container: i,
				children: r
			})
		})
	});
};
Pn.displayName = J;
var Y = "HoverCardContent", Fn = E.forwardRef((e, t) => {
	let n = Nn(Y, e.__scopeHoverCard), { forceMount: r = n.forceMount, ...i } = e, a = q(Y, e.__scopeHoverCard);
	return /* @__PURE__ */ D(S, {
		present: r || a.open,
		children: /* @__PURE__ */ D(In, {
			"data-state": a.open ? "open" : "closed",
			...i,
			onPointerEnter: v(e.onPointerEnter, X(a.onOpen)),
			onPointerLeave: v(e.onPointerLeave, X(a.onClose)),
			ref: t
		})
	});
});
Fn.displayName = Y;
var In = E.forwardRef((e, n) => {
	let { __scopeHoverCard: r, onEscapeKeyDown: i, onPointerDownOutside: a, onFocusOutside: o, onInteractOutside: l, ...u } = e, d = q(Y, r), f = K(r), p = E.useRef(null), m = t(n, p), [h, g] = E.useState(!1);
	return E.useEffect(() => {
		if (h) {
			let e = document.body;
			return W = e.style.userSelect || e.style.webkitUserSelect, e.style.userSelect = "none", e.style.webkitUserSelect = "none", () => {
				e.style.userSelect = W, e.style.webkitUserSelect = W;
			};
		}
	}, [h]), E.useEffect(() => {
		if (p.current) {
			let e = () => {
				g(!1), d.isPointerDownOnContentRef.current = !1, setTimeout(() => {
					document.getSelection()?.toString() !== "" && (d.hasSelectionRef.current = !0);
				});
			};
			return document.addEventListener("pointerup", e), () => {
				document.removeEventListener("pointerup", e), d.hasSelectionRef.current = !1, d.isPointerDownOnContentRef.current = !1;
			};
		}
	}, [d.isPointerDownOnContentRef, d.hasSelectionRef]), E.useEffect(() => {
		p.current && zn(p.current).forEach((e) => e.setAttribute("tabindex", "-1"));
	}), /* @__PURE__ */ D(s, {
		asChild: !0,
		disableOutsidePointerEvents: !1,
		onInteractOutside: l,
		onEscapeKeyDown: i,
		onPointerDownOutside: a,
		onFocusOutside: v(o, (e) => {
			e.preventDefault();
		}),
		onDismiss: d.onDismiss,
		children: /* @__PURE__ */ D(c, {
			...f,
			...u,
			onPointerDown: v(u.onPointerDown, (e) => {
				e.currentTarget.contains(e.target) && g(!0), d.hasSelectionRef.current = !1, d.isPointerDownOnContentRef.current = !0;
			}),
			ref: m,
			style: {
				...u.style,
				userSelect: h ? "text" : void 0,
				WebkitUserSelect: h ? "text" : void 0,
				"--radix-hover-card-content-transform-origin": "var(--radix-popper-transform-origin)",
				"--radix-hover-card-content-available-width": "var(--radix-popper-available-width)",
				"--radix-hover-card-content-available-height": "var(--radix-popper-available-height)",
				"--radix-hover-card-trigger-width": "var(--radix-popper-anchor-width)",
				"--radix-hover-card-trigger-height": "var(--radix-popper-anchor-height)"
			}
		})
	});
}), Ln = "HoverCardArrow", Rn = E.forwardRef((e, t) => {
	let { __scopeHoverCard: n, ...r } = e;
	return /* @__PURE__ */ D(a, {
		...K(n),
		...r,
		ref: t
	});
});
Rn.displayName = Ln;
function X(e) {
	return (t) => t.pointerType === "touch" ? void 0 : e();
}
function zn(e) {
	let t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: (e) => e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP });
	for (; n.nextNode();) t.push(n.currentNode);
	return t;
}
var Bn = kn, Vn = jn, Hn = Pn, Un = Fn, Wn = Bn, Gn = E.forwardRef(({ ...e }, t) => /* @__PURE__ */ D(Vn, {
	ref: t,
	"data-sdk-ui": "hover-card-trigger",
	"data-slot": "hover-card-trigger",
	...e
}));
Gn.displayName = "HoverCardTrigger";
var Kn = E.forwardRef(({ align: t = "center", className: n, sideOffset: r = 8, ...i }, a) => /* @__PURE__ */ D(Hn, { children: /* @__PURE__ */ D(Un, {
	align: t,
	className: e("z-50 w-80 rounded-[var(--sdk-radius-panel)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] p-4 text-[var(--sdk-color-text-primary)] shadow-[var(--sdk-shadow-md)] outline-none", n),
	"data-sdk-ui": "hover-card-content",
	"data-slot": "hover-card-content",
	ref: a,
	sideOffset: r,
	...i
}) }));
Kn.displayName = "HoverCardContent", Wn.displayName = "HoverCard";
//#endregion
//#region src/components/ui/overlays/modal.tsx
var Z = ve, Q = ye, qn = E.forwardRef(({ ...e }, t) => /* @__PURE__ */ D(Se, {
	ref: t,
	"data-sdk-ui": "modal-trigger",
	"data-slot": "modal-trigger",
	...e
}));
qn.displayName = "ModalTrigger";
var $ = E.forwardRef(({ ...e }, t) => /* @__PURE__ */ D(ge, {
	ref: t,
	"data-sdk-ui": "modal-close",
	"data-slot": "modal-close",
	...e
}));
$.displayName = "ModalClose";
var Jn = E.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ D(be, {
	ref: r,
	className: e("fixed inset-0 z-50 bg-[var(--sdk-color-surface-overlay)] backdrop-blur-sm", t),
	"data-sdk-ui": "modal-overlay",
	"data-slot": "modal-overlay",
	...n
}));
Jn.displayName = "ModalOverlay";
var Yn = n("fixed left-1/2 z-50 grid max-h-[min(88vh,56rem)] w-[min(92vw,40rem)] -translate-x-1/2 overflow-hidden rounded-[var(--sdk-radius-panel)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] text-[var(--sdk-color-text-primary)] shadow-[var(--sdk-shadow-lg)] outline-none", {
	defaultVariants: {
		align: "center",
		size: "md"
	},
	variants: {
		align: {
			center: "top-1/2 -translate-y-1/2",
			top: "top-[max(2rem,8vh)]"
		},
		size: {
			sm: "w-[min(92vw,28rem)]",
			md: "w-[min(92vw,40rem)]",
			lg: "w-[min(92vw,56rem)]",
			xl: "w-[min(94vw,72rem)]",
			full: "h-[min(96vh,64rem)] w-[min(96vw,96rem)]"
		}
	}
}), Xn = E.forwardRef(({ align: t, children: n, className: r, showCloseButton: i = !0, size: a, ...o }, s) => /* @__PURE__ */ O(Q, { children: [/* @__PURE__ */ D(Jn, {}), /* @__PURE__ */ O(_e, {
	ref: s,
	className: e(Yn({
		align: t,
		size: a
	}), r),
	"data-sdk-ui": "modal-content",
	"data-slot": "modal-content",
	...o,
	children: [n, i ? /* @__PURE__ */ O($, {
		className: "absolute right-4 top-4 rounded-full p-1.5 text-[var(--sdk-color-text-muted)] transition-colors hover:bg-[var(--sdk-color-brand-primary-soft)] hover:text-[var(--sdk-color-text-primary)]",
		children: [/* @__PURE__ */ D(_, { className: "h-4 w-4" }), /* @__PURE__ */ D("span", {
			className: "sr-only",
			children: "Close"
		})]
	}) : null]
})] }));
Xn.displayName = "ModalContent";
var Zn = E.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ D("div", {
	ref: r,
	className: e("flex shrink-0 flex-col gap-1.5 border-b border-[var(--sdk-color-border-default)] px-6 py-5 pr-14", t),
	"data-sdk-ui": "modal-header",
	"data-slot": "modal-header",
	...n
})), Qn = E.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ D("div", {
	ref: r,
	className: e("min-h-0 flex-1 overflow-y-auto px-6 py-5", t),
	"data-sdk-ui": "modal-body",
	"data-slot": "modal-body",
	...n
})), $n = E.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ D("div", {
	ref: r,
	className: e("flex shrink-0 items-center justify-end gap-3 border-t border-[var(--sdk-color-border-default)] px-6 py-4", t),
	"data-sdk-ui": "modal-footer",
	"data-slot": "modal-footer",
	...n
})), er = E.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ D(he, {
	ref: r,
	className: e("text-lg font-semibold", t),
	"data-sdk-ui": "modal-title",
	"data-slot": "modal-title",
	...n
}));
er.displayName = "ModalTitle";
var tr = E.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ D(xe, {
	ref: r,
	className: e("text-sm text-[var(--sdk-color-text-secondary)]", t),
	"data-sdk-ui": "modal-description",
	"data-slot": "modal-description",
	...n
}));
tr.displayName = "ModalDescription";
var nr = {
	danger: "border-[color-mix(in_srgb,var(--sdk-color-state-danger)_24%,transparent)] bg-[color-mix(in_srgb,var(--sdk-color-state-danger)_16%,transparent)] text-[var(--sdk-color-state-danger)]",
	default: "border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel-muted)] text-[var(--sdk-color-text-secondary)]",
	warning: "border-[color-mix(in_srgb,var(--sdk-color-state-warning)_24%,transparent)] bg-[color-mix(in_srgb,var(--sdk-color-state-warning)_16%,transparent)] text-[var(--sdk-color-state-warning)]"
};
function rr({ cancelLabel: t = "Cancel", closeOnConfirm: n = !0, confirmLabel: i = "Confirm", confirmLoading: a = !1, description: o, onConfirm: s, onOpenChange: c, open: l, title: u, tone: d = "default" }) {
	let f = d === "danger" ? "danger" : "primary";
	return /* @__PURE__ */ D(Z, {
		open: l,
		onOpenChange: c,
		children: /* @__PURE__ */ O(Xn, {
			"data-sdk-ui": "confirm-dialog",
			size: "sm",
			children: [/* @__PURE__ */ D(Zn, { children: /* @__PURE__ */ O("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ D("div", {
					className: e("flex h-10 w-10 items-center justify-center rounded-full border", nr[d]),
					children: /* @__PURE__ */ D(g, { className: "h-5 w-5" })
				}), /* @__PURE__ */ O("div", {
					className: "flex min-w-0 flex-1 flex-col gap-1",
					children: [/* @__PURE__ */ D(er, { children: u }), o ? /* @__PURE__ */ D(tr, { children: o }) : null]
				})]
			}) }), /* @__PURE__ */ O($n, { children: [/* @__PURE__ */ D(r, {
				type: "button",
				variant: "secondary",
				onClick: () => c?.(!1),
				children: t
			}), /* @__PURE__ */ D(r, {
				type: "button",
				variant: f,
				loading: a,
				onClick: () => {
					s(), n && c?.(!1);
				},
				children: i
			})] })]
		})
	});
}
rr.displayName = "ConfirmDialog", Z.displayName = "Modal", Qn.displayName = "ModalBody", $n.displayName = "ModalFooter", Zn.displayName = "ModalHeader", Q.displayName = "ModalPortal";
//#endregion
export { on as A, cn as B, U as C, tn as D, vn as E, pn as F, rt as G, nt as H, hn as I, gn as L, mn as M, nn as N, fn as O, sn as P, rn as R, xn as S, wn as T, it as U, an as V, tt as W, Sn as _, Xn as a, Tn as b, Zn as c, er as d, qn as f, _n as g, Gn as h, $ as i, dn as j, un as k, Jn as l, Kn as m, Z as n, tr as o, Wn as p, Qn as r, $n as s, rr as t, Q as u, H as v, V as w, Cn as x, bn as y, ln as z };

//# sourceMappingURL=overlays-Bdc2fkCy.js.map