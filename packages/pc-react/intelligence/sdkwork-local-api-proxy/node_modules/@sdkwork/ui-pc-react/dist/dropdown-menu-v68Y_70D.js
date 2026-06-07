import { t as e } from "./utils-Bgb-Nm-x.js";
import { r as t } from "./dist-CJMju1B6.js";
import { b as n, p as r, v as i, y as a } from "./Combination-DHpOS5dI.js";
import { t as o } from "./chevron-right-C2amLX5H.js";
import { d as s, i as c, u as l } from "./dist-Dedo1J3L.js";
import { _ as u, a as d, c as f, d as p, f as ee, g as te, h as ne, i as re, l as ie, m as ae, n as oe, o as se, p as ce, r as le, s as ue, t as de, u as fe } from "./dist-WFcEkA-O.js";
import * as m from "react";
import { jsx as h, jsxs as g } from "react/jsx-runtime";
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-dropdown-me_73af8346b6b2e99f5d79f55f5dac0b34/node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs
var _ = "DropdownMenu", [pe, me] = l(_, [u]), v = u(), [he, y] = pe(_), b = (e) => {
	let { __scopeDropdownMenu: t, children: n, dir: a, open: o, defaultOpen: s, onOpenChange: c, modal: l = !0 } = e, u = v(t), d = m.useRef(null), [f, p] = i({
		prop: o,
		defaultProp: s ?? !1,
		onChange: c,
		caller: _
	});
	return /* @__PURE__ */ h(he, {
		scope: t,
		triggerId: r(),
		triggerRef: d,
		contentId: r(),
		open: f,
		onOpenChange: p,
		onOpenToggle: m.useCallback(() => p((e) => !e), [p]),
		modal: l,
		children: /* @__PURE__ */ h(ee, {
			...u,
			open: f,
			onOpenChange: p,
			dir: a,
			modal: l,
			children: n
		})
	});
};
b.displayName = _;
var x = "DropdownMenuTrigger", S = m.forwardRef((e, n) => {
	let { __scopeDropdownMenu: r, disabled: i = !1, ...a } = e, o = y(x, r);
	return /* @__PURE__ */ h(de, {
		asChild: !0,
		...v(r),
		children: /* @__PURE__ */ h(c.button, {
			type: "button",
			id: o.triggerId,
			"aria-haspopup": "menu",
			"aria-expanded": o.open,
			"aria-controls": o.open ? o.contentId : void 0,
			"data-state": o.open ? "open" : "closed",
			"data-disabled": i ? "" : void 0,
			disabled: i,
			...a,
			ref: t(n, o.triggerRef),
			onPointerDown: s(e.onPointerDown, (e) => {
				!i && e.button === 0 && e.ctrlKey === !1 && (o.onOpenToggle(), o.open || e.preventDefault());
			}),
			onKeyDown: s(e.onKeyDown, (e) => {
				i || (["Enter", " "].includes(e.key) && o.onOpenToggle(), e.key === "ArrowDown" && o.onOpenChange(!0), [
					"Enter",
					" ",
					"ArrowDown"
				].includes(e.key) && e.preventDefault());
			})
		})
	});
});
S.displayName = x;
var ge = "DropdownMenuPortal", C = (e) => {
	let { __scopeDropdownMenu: t, ...n } = e;
	return /* @__PURE__ */ h(ie, {
		...v(t),
		...n
	});
};
C.displayName = ge;
var w = "DropdownMenuContent", T = m.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e, i = y(w, n), a = v(n), o = m.useRef(!1);
	return /* @__PURE__ */ h(re, {
		id: i.contentId,
		"aria-labelledby": i.triggerId,
		...a,
		...r,
		ref: t,
		onCloseAutoFocus: s(e.onCloseAutoFocus, (e) => {
			o.current || i.triggerRef.current?.focus(), o.current = !1, e.preventDefault();
		}),
		onInteractOutside: s(e.onInteractOutside, (e) => {
			let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0, r = t.button === 2 || n;
			(!i.modal || r) && (o.current = !0);
		}),
		style: {
			...e.style,
			"--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
			"--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
			"--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
});
T.displayName = w;
var _e = "DropdownMenuGroup", E = m.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ h(d, {
		...v(n),
		...r,
		ref: t
	});
});
E.displayName = _e;
var ve = "DropdownMenuLabel", D = m.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ h(f, {
		...v(n),
		...r,
		ref: t
	});
});
D.displayName = ve;
var ye = "DropdownMenuItem", O = m.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ h(se, {
		...v(n),
		...r,
		ref: t
	});
});
O.displayName = ye;
var be = "DropdownMenuCheckboxItem", k = m.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ h(le, {
		...v(n),
		...r,
		ref: t
	});
});
k.displayName = be;
var xe = "DropdownMenuRadioGroup", A = m.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ h(fe, {
		...v(n),
		...r,
		ref: t
	});
});
A.displayName = xe;
var Se = "DropdownMenuRadioItem", j = m.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ h(p, {
		...v(n),
		...r,
		ref: t
	});
});
j.displayName = Se;
var Ce = "DropdownMenuItemIndicator", M = m.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ h(ue, {
		...v(n),
		...r,
		ref: t
	});
});
M.displayName = Ce;
var we = "DropdownMenuSeparator", N = m.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ h(ce, {
		...v(n),
		...r,
		ref: t
	});
});
N.displayName = we;
var P = "DropdownMenuArrow", Te = m.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ h(oe, {
		...v(n),
		...r,
		ref: t
	});
});
Te.displayName = P;
var Ee = (e) => {
	let { __scopeDropdownMenu: t, children: n, open: r, onOpenChange: a, defaultOpen: o } = e, s = v(t), [c, l] = i({
		prop: r,
		defaultProp: o ?? !1,
		onChange: a,
		caller: "DropdownMenuSub"
	});
	return /* @__PURE__ */ h(ae, {
		...s,
		open: c,
		onOpenChange: l,
		children: n
	});
}, De = "DropdownMenuSubTrigger", F = m.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ h(te, {
		...v(n),
		...r,
		ref: t
	});
});
F.displayName = De;
var Oe = "DropdownMenuSubContent", I = m.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ h(ne, {
		...v(n),
		...r,
		ref: t,
		style: {
			...e.style,
			"--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
			"--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
			"--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
});
I.displayName = Oe;
var ke = b, Ae = S, L = C, je = T, Me = E, Ne = D, Pe = O, Fe = k, Ie = A, Le = j, R = M, Re = N, ze = Ee, Be = F, Ve = I, z = ke, B = L, V = ze, H = m.forwardRef(({ ...e }, t) => /* @__PURE__ */ h(Ae, {
	ref: t,
	"data-sdk-ui": "dropdown-menu-trigger",
	"data-slot": "dropdown-menu-trigger",
	...e
}));
H.displayName = "DropdownMenuTrigger";
var U = m.forwardRef(({ ...e }, t) => /* @__PURE__ */ h(Me, {
	ref: t,
	"data-sdk-ui": "dropdown-menu-group",
	"data-slot": "dropdown-menu-group",
	...e
}));
U.displayName = "DropdownMenuGroup";
var W = m.forwardRef(({ ...e }, t) => /* @__PURE__ */ h(Ie, {
	ref: t,
	"data-sdk-ui": "dropdown-menu-radio-group",
	"data-slot": "dropdown-menu-radio-group",
	...e
}));
W.displayName = "DropdownMenuRadioGroup";
var G = m.forwardRef(({ className: t, inset: n, children: r, ...i }, a) => /* @__PURE__ */ g(Be, {
	ref: a,
	className: e("flex cursor-default select-none items-center gap-2 rounded-[var(--sdk-radius-field)] px-2 py-1.5 text-sm outline-none transition-colors focus:bg-[var(--sdk-color-brand-primary-soft)] data-[state=open]:bg-[var(--sdk-color-brand-primary-soft)]", n && "pl-8", t),
	"data-sdk-ui": "dropdown-menu-sub-trigger",
	"data-slot": "dropdown-menu-sub-trigger",
	...i,
	children: [r, /* @__PURE__ */ h(o, { className: "ml-auto h-4 w-4" })]
}));
G.displayName = "DropdownMenuSubTrigger";
var K = m.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ h(Ve, {
	ref: r,
	className: e("z-50 min-w-[10rem] overflow-hidden rounded-[var(--sdk-radius-panel)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] p-1 text-[var(--sdk-color-text-primary)] shadow-[var(--sdk-shadow-md)]", t),
	"data-sdk-ui": "dropdown-menu-sub-content",
	"data-slot": "dropdown-menu-sub-content",
	...n
}));
K.displayName = "DropdownMenuSubContent";
var q = m.forwardRef(({ className: t, sideOffset: n = 6, ...r }, i) => /* @__PURE__ */ h(L, { children: /* @__PURE__ */ h(je, {
	ref: i,
	sideOffset: n,
	className: e("z-50 min-w-[10rem] overflow-hidden rounded-[var(--sdk-radius-panel)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] p-1 text-[var(--sdk-color-text-primary)] shadow-[var(--sdk-shadow-md)]", t),
	"data-sdk-ui": "dropdown-menu-content",
	"data-slot": "dropdown-menu-content",
	...r
}) }));
q.displayName = "DropdownMenuContent";
var J = m.forwardRef(({ className: t, inset: n, ...r }, i) => /* @__PURE__ */ h(Pe, {
	ref: i,
	className: e("relative flex cursor-default select-none items-center gap-2 rounded-[var(--sdk-radius-field)] px-2 py-1.5 text-sm outline-none transition-colors focus:bg-[var(--sdk-color-brand-primary-soft)] focus:text-[var(--sdk-color-text-primary)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50", n && "pl-8", t),
	"data-sdk-ui": "dropdown-menu-item",
	"data-slot": "dropdown-menu-item",
	...r
}));
J.displayName = "DropdownMenuItem";
var Y = m.forwardRef(({ className: t, children: r, checked: i, ...a }, o) => /* @__PURE__ */ g(Fe, {
	ref: o,
	checked: i,
	className: e("relative flex cursor-default select-none items-center gap-2 rounded-[var(--sdk-radius-field)] py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-[var(--sdk-color-brand-primary-soft)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50", t),
	"data-sdk-ui": "dropdown-menu-checkbox-item",
	"data-slot": "dropdown-menu-checkbox-item",
	...a,
	children: [/* @__PURE__ */ h("span", {
		className: "absolute left-2 flex h-4 w-4 items-center justify-center",
		children: /* @__PURE__ */ h(R, { children: /* @__PURE__ */ h(n, { className: "h-4 w-4" }) })
	}), r]
}));
Y.displayName = "DropdownMenuCheckboxItem";
var X = m.forwardRef(({ className: t, children: n, ...r }, i) => /* @__PURE__ */ g(Le, {
	ref: i,
	className: e("relative flex cursor-default select-none items-center gap-2 rounded-[var(--sdk-radius-field)] py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-[var(--sdk-color-brand-primary-soft)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50", t),
	"data-sdk-ui": "dropdown-menu-radio-item",
	"data-slot": "dropdown-menu-radio-item",
	...r,
	children: [/* @__PURE__ */ h("span", {
		className: "absolute left-2 flex h-4 w-4 items-center justify-center",
		children: /* @__PURE__ */ h(R, { children: /* @__PURE__ */ h(a, { className: "h-2.5 w-2.5 fill-current" }) })
	}), n]
}));
X.displayName = "DropdownMenuRadioItem";
var Z = m.forwardRef(({ className: t, inset: n, ...r }, i) => /* @__PURE__ */ h(Ne, {
	ref: i,
	className: e("px-2 py-1.5 text-sm font-semibold text-[var(--sdk-color-text-secondary)]", n && "pl-8", t),
	"data-sdk-ui": "dropdown-menu-label",
	"data-slot": "dropdown-menu-label",
	...r
}));
Z.displayName = "DropdownMenuLabel";
var Q = m.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ h(Re, {
	ref: r,
	className: e("-mx-1 my-1 h-px bg-[var(--sdk-color-border-subtle)]", t),
	"data-sdk-ui": "dropdown-menu-separator",
	"data-slot": "dropdown-menu-separator",
	...n
}));
Q.displayName = "DropdownMenuSeparator";
var $ = m.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ h("span", {
	ref: r,
	className: e("ml-auto text-xs tracking-[0.14em] text-[var(--sdk-color-text-muted)]", t),
	"data-sdk-ui": "dropdown-menu-shortcut",
	"data-slot": "dropdown-menu-shortcut",
	...n
}));
$.displayName = "DropdownMenuShortcut", z.displayName = "DropdownMenu", B.displayName = "DropdownMenuPortal", V.displayName = "DropdownMenuSub";
//#endregion
export { J as a, W as c, $ as d, V as f, H as h, U as i, X as l, G as m, Y as n, Z as o, K as p, q as r, B as s, z as t, Q as u };

//# sourceMappingURL=dropdown-menu-v68Y_70D.js.map