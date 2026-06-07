import { t as e } from "./utils-Bgb-Nm-x.js";
import { i as t } from "./dist-CJMju1B6.js";
import { g as n, h as r, m as i, n as a, o, p as s, t as c, v as l } from "./Combination-DHpOS5dI.js";
import { t as u } from "./x-8IarCZxo.js";
import { d, i as f, l as p, o as ee, t as m, u as te } from "./dist-Dedo1J3L.js";
import * as h from "react";
import { Fragment as g, jsx as _, jsxs as v } from "react/jsx-runtime";
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-dialog@1.1._779045218dc2799d336e7197abef9d38/node_modules/@radix-ui/react-dialog/dist/index.mjs
var y = "Dialog", [b, ne] = te(y), [re, x] = b(y), ie = (e) => {
	let { __scopeDialog: t, children: n, open: r, defaultOpen: i, onOpenChange: a, modal: o = !0 } = e, c = h.useRef(null), u = h.useRef(null), [d, f] = l({
		prop: r,
		defaultProp: i ?? !1,
		onChange: a,
		caller: y
	});
	return /* @__PURE__ */ _(re, {
		scope: t,
		triggerRef: c,
		contentRef: u,
		contentId: s(),
		titleId: s(),
		descriptionId: s(),
		open: d,
		onOpenChange: f,
		onOpenToggle: h.useCallback(() => f((e) => !e), [f]),
		modal: o,
		children: n
	});
};
ie.displayName = y;
var S = "DialogTrigger", C = h.forwardRef((e, n) => {
	let { __scopeDialog: r, ...i } = e, a = x(S, r), o = t(n, a.triggerRef);
	return /* @__PURE__ */ _(f.button, {
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": a.open,
		"aria-controls": a.contentId,
		"data-state": L(a.open),
		...i,
		ref: o,
		onClick: d(e.onClick, a.onOpenToggle)
	});
});
C.displayName = S;
var w = "DialogPortal", [ae, T] = b(w, { forceMount: void 0 }), E = (e) => {
	let { __scopeDialog: t, forceMount: n, children: r, container: i } = e, a = x(w, t);
	return /* @__PURE__ */ _(ae, {
		scope: t,
		forceMount: n,
		children: h.Children.map(r, (e) => /* @__PURE__ */ _(m, {
			present: n || a.open,
			children: /* @__PURE__ */ _(o, {
				asChild: !0,
				container: i,
				children: e
			})
		}))
	});
};
E.displayName = w;
var D = "DialogOverlay", O = h.forwardRef((e, t) => {
	let n = T(D, e.__scopeDialog), { forceMount: r = n.forceMount, ...i } = e, a = x(D, e.__scopeDialog);
	return a.modal ? /* @__PURE__ */ _(m, {
		present: r || a.open,
		children: /* @__PURE__ */ _(se, {
			...i,
			ref: t
		})
	}) : null;
});
O.displayName = D;
var oe = ee("DialogOverlay.RemoveScroll"), se = h.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = x(D, n);
	return /* @__PURE__ */ _(c, {
		as: oe,
		allowPinchZoom: !0,
		shards: [i.contentRef],
		children: /* @__PURE__ */ _(f.div, {
			"data-state": L(i.open),
			...r,
			ref: t,
			style: {
				pointerEvents: "auto",
				...r.style
			}
		})
	});
}), k = "DialogContent", A = h.forwardRef((e, t) => {
	let n = T(k, e.__scopeDialog), { forceMount: r = n.forceMount, ...i } = e, a = x(k, e.__scopeDialog);
	return /* @__PURE__ */ _(m, {
		present: r || a.open,
		children: a.modal ? /* @__PURE__ */ _(ce, {
			...i,
			ref: t
		}) : /* @__PURE__ */ _(le, {
			...i,
			ref: t
		})
	});
});
A.displayName = k;
var ce = h.forwardRef((e, n) => {
	let r = x(k, e.__scopeDialog), i = h.useRef(null), o = t(n, r.contentRef, i);
	return h.useEffect(() => {
		let e = i.current;
		if (e) return a(e);
	}, []), /* @__PURE__ */ _(j, {
		...e,
		ref: o,
		trapFocus: r.open,
		disableOutsidePointerEvents: !0,
		onCloseAutoFocus: d(e.onCloseAutoFocus, (e) => {
			e.preventDefault(), r.triggerRef.current?.focus();
		}),
		onPointerDownOutside: d(e.onPointerDownOutside, (e) => {
			let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0;
			(t.button === 2 || n) && e.preventDefault();
		}),
		onFocusOutside: d(e.onFocusOutside, (e) => e.preventDefault())
	});
}), le = h.forwardRef((e, t) => {
	let n = x(k, e.__scopeDialog), r = h.useRef(!1), i = h.useRef(!1);
	return /* @__PURE__ */ _(j, {
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
}), j = h.forwardRef((e, a) => {
	let { __scopeDialog: o, trapFocus: s, onOpenAutoFocus: c, onCloseAutoFocus: l, ...u } = e, d = x(k, o), f = h.useRef(null), p = t(a, f);
	return r(), /* @__PURE__ */ v(g, { children: [/* @__PURE__ */ _(i, {
		asChild: !0,
		loop: !0,
		trapped: s,
		onMountAutoFocus: c,
		onUnmountAutoFocus: l,
		children: /* @__PURE__ */ _(n, {
			role: "dialog",
			id: d.contentId,
			"aria-describedby": d.descriptionId,
			"aria-labelledby": d.titleId,
			"data-state": L(d.open),
			...u,
			ref: p,
			onDismiss: () => d.onOpenChange(!1)
		})
	}), /* @__PURE__ */ v(g, { children: [/* @__PURE__ */ _(fe, { titleId: d.titleId }), /* @__PURE__ */ _(me, {
		contentRef: f,
		descriptionId: d.descriptionId
	})] })] });
}), M = "DialogTitle", N = h.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = x(M, n);
	return /* @__PURE__ */ _(f.h2, {
		id: i.titleId,
		...r,
		ref: t
	});
});
N.displayName = M;
var P = "DialogDescription", F = h.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = x(P, n);
	return /* @__PURE__ */ _(f.p, {
		id: i.descriptionId,
		...r,
		ref: t
	});
});
F.displayName = P;
var I = "DialogClose", ue = h.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = x(I, n);
	return /* @__PURE__ */ _(f.button, {
		type: "button",
		...r,
		ref: t,
		onClick: d(e.onClick, () => i.onOpenChange(!1))
	});
});
ue.displayName = I;
function L(e) {
	return e ? "open" : "closed";
}
var R = "DialogTitleWarning", [de, z] = p(R, {
	contentName: k,
	titleName: M,
	docsSlug: "dialog"
}), fe = ({ titleId: e }) => {
	let t = z(R), n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
	return h.useEffect(() => {
		e && (document.getElementById(e) || console.error(n));
	}, [n, e]), null;
}, pe = "DialogDescriptionWarning", me = ({ contentRef: e, descriptionId: t }) => {
	let n = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${z(pe).contentName}}.`;
	return h.useEffect(() => {
		let r = e.current?.getAttribute("aria-describedby");
		t && r && (document.getElementById(t) || console.warn(n));
	}, [
		n,
		e,
		t
	]), null;
}, B = ie, V = C, H = E, U = O, W = A, G = N, K = F, q = ue, J = B, Y = H, X = h.forwardRef(({ ...e }, t) => /* @__PURE__ */ _(V, {
	ref: t,
	"data-sdk-ui": "dialog-trigger",
	"data-slot": "dialog-trigger",
	...e
}));
X.displayName = "DialogTrigger";
var Z = h.forwardRef(({ ...e }, t) => /* @__PURE__ */ _(q, {
	ref: t,
	"data-sdk-ui": "dialog-close",
	"data-slot": "dialog-close",
	...e
}));
Z.displayName = "DialogClose";
var Q = h.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ _(U, {
	ref: r,
	className: e("fixed inset-0 z-50 bg-[var(--sdk-color-surface-overlay)] backdrop-blur-sm", t),
	"data-sdk-ui": "dialog-overlay",
	"data-slot": "dialog-overlay",
	...n
}));
Q.displayName = "DialogOverlay";
var he = h.forwardRef(({ className: t, children: n, ...r }, i) => /* @__PURE__ */ v(Y, { children: [/* @__PURE__ */ _(Q, {}), /* @__PURE__ */ v(W, {
	ref: i,
	className: e("fixed left-1/2 top-1/2 z-50 grid w-[min(92vw,40rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-[var(--sdk-radius-panel)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] p-6 text-[var(--sdk-color-text-primary)] shadow-[var(--sdk-shadow-lg)]", t),
	"data-sdk-ui": "dialog-content",
	"data-slot": "dialog-content",
	...r,
	children: [n, /* @__PURE__ */ v(Z, {
		className: "absolute right-4 top-4 rounded-full p-1.5 text-[var(--sdk-color-text-muted)] transition-colors hover:bg-[var(--sdk-color-brand-primary-soft)] hover:text-[var(--sdk-color-text-primary)]",
		children: [/* @__PURE__ */ _(u, { className: "h-4 w-4" }), /* @__PURE__ */ _("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
he.displayName = "DialogContent";
var ge = h.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ _("div", {
	ref: r,
	className: e("flex flex-col gap-1.5 pr-10", t),
	"data-sdk-ui": "dialog-header",
	"data-slot": "dialog-header",
	...n
})), $ = h.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ _("div", {
	ref: r,
	className: e("flex justify-end gap-3", t),
	"data-sdk-ui": "dialog-footer",
	"data-slot": "dialog-footer",
	...n
})), _e = h.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ _(G, {
	ref: r,
	className: e("text-lg font-semibold", t),
	"data-sdk-ui": "dialog-title",
	"data-slot": "dialog-title",
	...n
}));
_e.displayName = "DialogTitle";
var ve = h.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ _(K, {
	ref: r,
	className: e("text-sm text-[var(--sdk-color-text-secondary)]", t),
	"data-sdk-ui": "dialog-description",
	"data-slot": "dialog-description",
	...n
}));
ve.displayName = "DialogDescription", J.displayName = "Dialog", $.displayName = "DialogFooter", ge.displayName = "DialogHeader", Y.displayName = "DialogPortal";
//#endregion
export { G as _, $ as a, Y as c, q as d, W as f, B as g, H as h, ve as i, _e as l, U as m, Z as n, ge as o, K as p, he as r, Q as s, J as t, X as u, V as v };

//# sourceMappingURL=dialog-t77bVQJv.js.map