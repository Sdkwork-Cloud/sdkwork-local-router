import { t as e } from "./utils-Bgb-Nm-x.js";
import { i as t } from "./dist-CJMju1B6.js";
import { c as n, d as r, g as i, h as a, l as o, m as s, n as c, o as l, p as u, s as d, t as f, u as p, v as m } from "./Combination-DHpOS5dI.js";
import { d as h, i as g, o as _, t as v, u as y } from "./dist-Dedo1J3L.js";
import * as b from "react";
import { jsx as x } from "react/jsx-runtime";
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-popover@1.1_8b5332f8e883134e9d9ab2856fc4395d/node_modules/@radix-ui/react-popover/dist/index.mjs
var S = "Popover", [C, ee] = y(S, [r]), w = r(), [T, E] = C(S), D = (e) => {
	let { __scopePopover: t, children: n, open: r, defaultOpen: i, onOpenChange: a, modal: o = !1 } = e, s = w(t), c = b.useRef(null), [l, d] = b.useState(!1), [f, h] = m({
		prop: r,
		defaultProp: i ?? !1,
		onChange: a,
		caller: S
	});
	return /* @__PURE__ */ x(p, {
		...s,
		children: /* @__PURE__ */ x(T, {
			scope: t,
			contentId: u(),
			triggerRef: c,
			open: f,
			onOpenChange: h,
			onOpenToggle: b.useCallback(() => h((e) => !e), [h]),
			hasCustomAnchor: l,
			onCustomAnchorAdd: b.useCallback(() => d(!0), []),
			onCustomAnchorRemove: b.useCallback(() => d(!1), []),
			modal: o,
			children: n
		})
	});
};
D.displayName = S;
var O = "PopoverAnchor", k = b.forwardRef((e, t) => {
	let { __scopePopover: n, ...r } = e, i = E(O, n), a = w(n), { onCustomAnchorAdd: o, onCustomAnchorRemove: s } = i;
	return b.useEffect(() => (o(), () => s()), [o, s]), /* @__PURE__ */ x(d, {
		...a,
		...r,
		ref: t
	});
});
k.displayName = O;
var A = "PopoverTrigger", j = b.forwardRef((e, n) => {
	let { __scopePopover: r, ...i } = e, a = E(A, r), o = w(r), s = t(n, a.triggerRef), c = /* @__PURE__ */ x(g.button, {
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": a.open,
		"aria-controls": a.contentId,
		"data-state": W(a.open),
		...i,
		ref: s,
		onClick: h(e.onClick, a.onOpenToggle)
	});
	return a.hasCustomAnchor ? c : /* @__PURE__ */ x(d, {
		asChild: !0,
		...o,
		children: c
	});
});
j.displayName = A;
var M = "PopoverPortal", [N, P] = C(M, { forceMount: void 0 }), F = (e) => {
	let { __scopePopover: t, forceMount: n, children: r, container: i } = e, a = E(M, t);
	return /* @__PURE__ */ x(N, {
		scope: t,
		forceMount: n,
		children: /* @__PURE__ */ x(v, {
			present: n || a.open,
			children: /* @__PURE__ */ x(l, {
				asChild: !0,
				container: i,
				children: r
			})
		})
	});
};
F.displayName = M;
var I = "PopoverContent", L = b.forwardRef((e, t) => {
	let n = P(I, e.__scopePopover), { forceMount: r = n.forceMount, ...i } = e, a = E(I, e.__scopePopover);
	return /* @__PURE__ */ x(v, {
		present: r || a.open,
		children: a.modal ? /* @__PURE__ */ x(ne, {
			...i,
			ref: t
		}) : /* @__PURE__ */ x(R, {
			...i,
			ref: t
		})
	});
});
L.displayName = I;
var te = _("PopoverContent.RemoveScroll"), ne = b.forwardRef((e, n) => {
	let r = E(I, e.__scopePopover), i = b.useRef(null), a = t(n, i), o = b.useRef(!1);
	return b.useEffect(() => {
		let e = i.current;
		if (e) return c(e);
	}, []), /* @__PURE__ */ x(f, {
		as: te,
		allowPinchZoom: !0,
		children: /* @__PURE__ */ x(z, {
			...e,
			ref: a,
			trapFocus: r.open,
			disableOutsidePointerEvents: !0,
			onCloseAutoFocus: h(e.onCloseAutoFocus, (e) => {
				e.preventDefault(), o.current || r.triggerRef.current?.focus();
			}),
			onPointerDownOutside: h(e.onPointerDownOutside, (e) => {
				let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0;
				o.current = t.button === 2 || n;
			}, { checkForDefaultPrevented: !1 }),
			onFocusOutside: h(e.onFocusOutside, (e) => e.preventDefault(), { checkForDefaultPrevented: !1 })
		})
	});
}), R = b.forwardRef((e, t) => {
	let n = E(I, e.__scopePopover), r = b.useRef(!1), i = b.useRef(!1);
	return /* @__PURE__ */ x(z, {
		...e,
		ref: t,
		trapFocus: !1,
		disableOutsidePointerEvents: !1,
		onCloseAutoFocus: (t) => {
			e.onCloseAutoFocus?.(t), t.defaultPrevented || (r.current || n.triggerRef.current?.focus(), t.preventDefault()), r.current = !1, i.current = !1;
		},
		onInteractOutside: (t) => {
			e.onInteractOutside?.(t), t.defaultPrevented || (r.current = !0, t.detail.originalEvent.type === "pointerdown" && (i.current = !0));
			let a = t.target;
			n.triggerRef.current?.contains(a) && t.preventDefault(), t.detail.originalEvent.type === "focusin" && i.current && t.preventDefault();
		}
	});
}), z = b.forwardRef((e, t) => {
	let { __scopePopover: n, trapFocus: r, onOpenAutoFocus: c, onCloseAutoFocus: l, disableOutsidePointerEvents: u, onEscapeKeyDown: d, onPointerDownOutside: f, onFocusOutside: p, onInteractOutside: m, ...h } = e, g = E(I, n), _ = w(n);
	return a(), /* @__PURE__ */ x(s, {
		asChild: !0,
		loop: !0,
		trapped: r,
		onMountAutoFocus: c,
		onUnmountAutoFocus: l,
		children: /* @__PURE__ */ x(i, {
			asChild: !0,
			disableOutsidePointerEvents: u,
			onInteractOutside: m,
			onEscapeKeyDown: d,
			onPointerDownOutside: f,
			onFocusOutside: p,
			onDismiss: () => g.onOpenChange(!1),
			children: /* @__PURE__ */ x(o, {
				"data-state": W(g.open),
				role: "dialog",
				id: g.contentId,
				..._,
				...h,
				ref: t,
				style: {
					...h.style,
					"--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
					"--radix-popover-content-available-width": "var(--radix-popper-available-width)",
					"--radix-popover-content-available-height": "var(--radix-popper-available-height)",
					"--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
					"--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
				}
			})
		})
	});
}), B = "PopoverClose", V = b.forwardRef((e, t) => {
	let { __scopePopover: n, ...r } = e, i = E(B, n);
	return /* @__PURE__ */ x(g.button, {
		type: "button",
		...r,
		ref: t,
		onClick: h(e.onClick, () => i.onOpenChange(!1))
	});
});
V.displayName = B;
var H = "PopoverArrow", U = b.forwardRef((e, t) => {
	let { __scopePopover: r, ...i } = e;
	return /* @__PURE__ */ x(n, {
		...w(r),
		...i,
		ref: t
	});
});
U.displayName = H;
function W(e) {
	return e ? "open" : "closed";
}
var G = D, K = k, q = j, J = F, Y = L, X = G, Z = b.forwardRef(({ ...e }, t) => /* @__PURE__ */ x(q, {
	ref: t,
	"data-sdk-ui": "popover-trigger",
	"data-slot": "popover-trigger",
	...e
}));
Z.displayName = "PopoverTrigger";
var Q = b.forwardRef(({ ...e }, t) => /* @__PURE__ */ x(K, {
	ref: t,
	"data-sdk-ui": "popover-anchor",
	"data-slot": "popover-anchor",
	...e
}));
Q.displayName = "PopoverAnchor";
var $ = b.forwardRef(({ align: t = "center", className: n, sideOffset: r = 8, ...i }, a) => /* @__PURE__ */ x(J, { children: /* @__PURE__ */ x(Y, {
	ref: a,
	align: t,
	className: e("z-50 w-72 rounded-[var(--sdk-radius-panel)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] p-4 text-[var(--sdk-color-text-primary)] shadow-[var(--sdk-shadow-md)] outline-none", n),
	"data-sdk-ui": "popover-content",
	"data-slot": "popover-content",
	sideOffset: r,
	...i
}) }));
$.displayName = "PopoverContent", X.displayName = "Popover";
//#endregion
export { Z as i, Q as n, $ as r, X as t };

//# sourceMappingURL=popover-CJHbP2uA.js.map