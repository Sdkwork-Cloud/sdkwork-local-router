import { t as e } from "./utils-Bgb-Nm-x.js";
import { n as t, t as n } from "./slot-props-Cskv9Ttd.js";
import { i as r, t as i } from "./dist-CJMju1B6.js";
import { _ as a, a as o, b as s, i as c, p as l, r as u, v as d, y as f } from "./Combination-DHpOS5dI.js";
import { c as p } from "./pagination-D9cH4t10.js";
import { t as m } from "./chevron-right-C2amLX5H.js";
import { t as h } from "./x-8IarCZxo.js";
import { d as g, i as _, r as ee, u as te } from "./dist-Dedo1J3L.js";
import { _ as ne, a as re, c as ie, d as ae, f as oe, g as se, h as ce, i as le, l as ue, m as de, n as fe, o as pe, p as me, r as he, s as ge, t as _e, u as ve } from "./dist-WFcEkA-O.js";
import * as v from "react";
import { createElement as ye } from "react";
import { jsx as y, jsxs as b } from "react/jsx-runtime";
//#region src/components/ui/breadcrumb.tsx
var x = v.forwardRef(({ "aria-label": t = "breadcrumb", className: n, ...r }, i) => /* @__PURE__ */ y("nav", {
	ref: i,
	"aria-label": t,
	className: e("w-full", n),
	"data-sdk-ui": "breadcrumb",
	"data-slot": "breadcrumb",
	...r
}));
x.displayName = "Breadcrumb";
var S = v.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ y("ol", {
	ref: r,
	className: e("flex flex-wrap items-center gap-1.5 break-words text-sm text-[var(--sdk-color-text-secondary)]", t),
	"data-sdk-ui": "breadcrumb-list",
	"data-slot": "breadcrumb-list",
	...n
}));
S.displayName = "BreadcrumbList";
var C = v.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ y("li", {
	ref: r,
	className: e("inline-flex items-center gap-1.5", t),
	"data-sdk-ui": "breadcrumb-item",
	"data-slot": "breadcrumb-item",
	...n
}));
C.displayName = "BreadcrumbItem";
var w = v.forwardRef(({ asChild: t = !1, className: n, ...r }, a) => /* @__PURE__ */ y(t ? i : "a", {
	ref: a,
	className: e("transition-colors hover:text-[var(--sdk-color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sdk-color-border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sdk-color-surface-canvas)]", n),
	"data-sdk-ui": "breadcrumb-link",
	"data-slot": "breadcrumb-link",
	...r
}));
w.displayName = "BreadcrumbLink";
var T = v.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ y("span", {
	ref: r,
	"aria-current": "page",
	"aria-disabled": "true",
	className: e("font-medium text-[var(--sdk-color-text-primary)]", t),
	"data-sdk-ui": "breadcrumb-page",
	"data-slot": "breadcrumb-page",
	...n
}));
T.displayName = "BreadcrumbPage";
var E = v.forwardRef(({ children: t, className: n, ...r }, i) => /* @__PURE__ */ y("li", {
	ref: i,
	"aria-hidden": "true",
	className: e("text-[var(--sdk-color-text-muted)]", n),
	"data-sdk-ui": "breadcrumb-separator",
	"data-slot": "breadcrumb-separator",
	role: "presentation",
	...r,
	children: t ?? /* @__PURE__ */ y(m, { className: "h-3.5 w-3.5" })
}));
E.displayName = "BreadcrumbSeparator";
var D = v.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ b("span", {
	ref: r,
	"aria-hidden": "true",
	className: e("inline-flex h-9 w-9 items-center justify-center", t),
	"data-sdk-ui": "breadcrumb-ellipsis",
	"data-slot": "breadcrumb-ellipsis",
	role: "presentation",
	...n,
	children: [/* @__PURE__ */ y(p, { className: "h-4 w-4" }), /* @__PURE__ */ y("span", {
		className: "sr-only",
		children: "More breadcrumb items"
	})]
}));
D.displayName = "BreadcrumbEllipsis";
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-menubar@1.1_2538d85c615acf13b2f2294bd07156f9/node_modules/@radix-ui/react-menubar/dist/index.mjs
var O = "Menubar", [k, be, xe] = a(O), [A, Se] = te(O, [xe, o]), j = ne(), M = o(), [Ce, N] = A(O), P = v.forwardRef((e, t) => {
	let { __scopeMenubar: n, value: r, onValueChange: i, defaultValue: a, loop: o = !0, dir: s, ...l } = e, u = ee(s), f = M(n), [p, m] = d({
		prop: r,
		onChange: i,
		defaultProp: a ?? "",
		caller: O
	}), [h, g] = v.useState(null);
	return /* @__PURE__ */ y(Ce, {
		scope: n,
		value: p,
		onMenuOpen: v.useCallback((e) => {
			m(e), g(e);
		}, [m]),
		onMenuClose: v.useCallback(() => m(""), [m]),
		onMenuToggle: v.useCallback((e) => {
			m((t) => t ? "" : e), g(e);
		}, [m]),
		dir: u,
		loop: o,
		children: /* @__PURE__ */ y(k.Provider, {
			scope: n,
			children: /* @__PURE__ */ y(k.Slot, {
				scope: n,
				children: /* @__PURE__ */ y(c, {
					asChild: !0,
					...f,
					orientation: "horizontal",
					loop: o,
					dir: u,
					currentTabStopId: h,
					onCurrentTabStopIdChange: g,
					children: /* @__PURE__ */ y(_.div, {
						role: "menubar",
						...l,
						ref: t
					})
				})
			})
		})
	});
});
P.displayName = O;
var F = "MenubarMenu", [we, I] = A(F), L = (e) => {
	let { __scopeMenubar: t, value: n, ...r } = e, i = l(), a = n || i || "LEGACY_REACT_AUTO_VALUE", o = N(F, t), s = j(t), c = v.useRef(null), u = v.useRef(!1), d = o.value === a;
	return v.useEffect(() => {
		d || (u.current = !1);
	}, [d]), /* @__PURE__ */ y(we, {
		scope: t,
		value: a,
		triggerId: l(),
		triggerRef: c,
		contentId: l(),
		wasKeyboardTriggerOpenRef: u,
		children: /* @__PURE__ */ y(oe, {
			...s,
			open: d,
			onOpenChange: (e) => {
				e || o.onMenuClose();
			},
			modal: !1,
			dir: o.dir,
			...r
		})
	});
};
L.displayName = F;
var R = "MenubarTrigger", z = v.forwardRef((e, t) => {
	let { __scopeMenubar: n, disabled: i = !1, ...a } = e, o = M(n), s = j(n), c = N(R, n), l = I(R, n), d = v.useRef(null), f = r(t, d, l.triggerRef), [p, m] = v.useState(!1), h = c.value === l.value;
	return /* @__PURE__ */ y(k.ItemSlot, {
		scope: n,
		value: l.value,
		disabled: i,
		children: /* @__PURE__ */ y(u, {
			asChild: !0,
			...o,
			focusable: !i,
			tabStopId: l.value,
			children: /* @__PURE__ */ y(_e, {
				asChild: !0,
				...s,
				children: /* @__PURE__ */ y(_.button, {
					type: "button",
					role: "menuitem",
					id: l.triggerId,
					"aria-haspopup": "menu",
					"aria-expanded": h,
					"aria-controls": h ? l.contentId : void 0,
					"data-highlighted": p ? "" : void 0,
					"data-state": h ? "open" : "closed",
					"data-disabled": i ? "" : void 0,
					disabled: i,
					...a,
					ref: f,
					onPointerDown: g(e.onPointerDown, (e) => {
						!i && e.button === 0 && e.ctrlKey === !1 && (c.onMenuOpen(l.value), h || e.preventDefault());
					}),
					onPointerEnter: g(e.onPointerEnter, () => {
						c.value && !h && (c.onMenuOpen(l.value), d.current?.focus());
					}),
					onKeyDown: g(e.onKeyDown, (e) => {
						i || (["Enter", " "].includes(e.key) && c.onMenuToggle(l.value), e.key === "ArrowDown" && c.onMenuOpen(l.value), [
							"Enter",
							" ",
							"ArrowDown"
						].includes(e.key) && (l.wasKeyboardTriggerOpenRef.current = !0, e.preventDefault()));
					}),
					onFocus: g(e.onFocus, () => m(!0)),
					onBlur: g(e.onBlur, () => m(!1))
				})
			})
		})
	});
});
z.displayName = R;
var Te = "MenubarPortal", B = (e) => {
	let { __scopeMenubar: t, ...n } = e;
	return /* @__PURE__ */ y(ue, {
		...j(t),
		...n
	});
};
B.displayName = Te;
var V = "MenubarContent", H = v.forwardRef((e, t) => {
	let { __scopeMenubar: n, align: r = "start", ...i } = e, a = j(n), o = N(V, n), s = I(V, n), c = be(n), l = v.useRef(!1);
	return /* @__PURE__ */ y(le, {
		id: s.contentId,
		"aria-labelledby": s.triggerId,
		"data-radix-menubar-content": "",
		...a,
		...i,
		ref: t,
		align: r,
		onCloseAutoFocus: g(e.onCloseAutoFocus, (e) => {
			!o.value && !l.current && s.triggerRef.current?.focus(), l.current = !1, e.preventDefault();
		}),
		onFocusOutside: g(e.onFocusOutside, (e) => {
			let t = e.target;
			c().some((e) => e.ref.current?.contains(t)) && e.preventDefault();
		}),
		onInteractOutside: g(e.onInteractOutside, () => {
			l.current = !0;
		}),
		onEntryFocus: (e) => {
			s.wasKeyboardTriggerOpenRef.current || e.preventDefault();
		},
		onKeyDown: g(e.onKeyDown, (e) => {
			if (["ArrowRight", "ArrowLeft"].includes(e.key)) {
				let t = e.target, n = t.hasAttribute("data-radix-menubar-subtrigger"), r = t.closest("[data-radix-menubar-content]") !== e.currentTarget, i = (o.dir === "rtl" ? "ArrowRight" : "ArrowLeft") === e.key;
				if (!i && n || r && i) return;
				let a = c().filter((e) => !e.disabled).map((e) => e.value);
				i && a.reverse();
				let l = a.indexOf(s.value);
				a = o.loop ? Ue(a, l + 1) : a.slice(l + 1);
				let [u] = a;
				u && o.onMenuOpen(u);
			}
		}, { checkForDefaultPrevented: !1 }),
		style: {
			...e.style,
			"--radix-menubar-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-menubar-content-available-width": "var(--radix-popper-available-width)",
			"--radix-menubar-content-available-height": "var(--radix-popper-available-height)",
			"--radix-menubar-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-menubar-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
});
H.displayName = V;
var Ee = "MenubarGroup", U = v.forwardRef((e, t) => {
	let { __scopeMenubar: n, ...r } = e;
	return /* @__PURE__ */ y(re, {
		...j(n),
		...r,
		ref: t
	});
});
U.displayName = Ee;
var De = "MenubarLabel", W = v.forwardRef((e, t) => {
	let { __scopeMenubar: n, ...r } = e;
	return /* @__PURE__ */ y(ie, {
		...j(n),
		...r,
		ref: t
	});
});
W.displayName = De;
var Oe = "MenubarItem", G = v.forwardRef((e, t) => {
	let { __scopeMenubar: n, ...r } = e;
	return /* @__PURE__ */ y(pe, {
		...j(n),
		...r,
		ref: t
	});
});
G.displayName = Oe;
var ke = "MenubarCheckboxItem", K = v.forwardRef((e, t) => {
	let { __scopeMenubar: n, ...r } = e;
	return /* @__PURE__ */ y(he, {
		...j(n),
		...r,
		ref: t
	});
});
K.displayName = ke;
var Ae = "MenubarRadioGroup", q = v.forwardRef((e, t) => {
	let { __scopeMenubar: n, ...r } = e;
	return /* @__PURE__ */ y(ve, {
		...j(n),
		...r,
		ref: t
	});
});
q.displayName = Ae;
var je = "MenubarRadioItem", J = v.forwardRef((e, t) => {
	let { __scopeMenubar: n, ...r } = e;
	return /* @__PURE__ */ y(ae, {
		...j(n),
		...r,
		ref: t
	});
});
J.displayName = je;
var Me = "MenubarItemIndicator", Y = v.forwardRef((e, t) => {
	let { __scopeMenubar: n, ...r } = e;
	return /* @__PURE__ */ y(ge, {
		...j(n),
		...r,
		ref: t
	});
});
Y.displayName = Me;
var Ne = "MenubarSeparator", Pe = v.forwardRef((e, t) => {
	let { __scopeMenubar: n, ...r } = e;
	return /* @__PURE__ */ y(me, {
		...j(n),
		...r,
		ref: t
	});
});
Pe.displayName = Ne;
var Fe = "MenubarArrow", Ie = v.forwardRef((e, t) => {
	let { __scopeMenubar: n, ...r } = e;
	return /* @__PURE__ */ y(fe, {
		...j(n),
		...r,
		ref: t
	});
});
Ie.displayName = Fe;
var Le = "MenubarSub", Re = (e) => {
	let { __scopeMenubar: t, children: n, open: r, onOpenChange: i, defaultOpen: a } = e, o = j(t), [s, c] = d({
		prop: r,
		defaultProp: a ?? !1,
		onChange: i,
		caller: Le
	});
	return /* @__PURE__ */ y(de, {
		...o,
		open: s,
		onOpenChange: c,
		children: n
	});
};
Re.displayName = Le;
var ze = "MenubarSubTrigger", Be = v.forwardRef((e, t) => {
	let { __scopeMenubar: n, ...r } = e, i = j(n);
	return /* @__PURE__ */ y(se, {
		"data-radix-menubar-subtrigger": "",
		...i,
		...r,
		ref: t
	});
});
Be.displayName = ze;
var Ve = "MenubarSubContent", He = v.forwardRef((e, t) => {
	let { __scopeMenubar: n, ...r } = e;
	return /* @__PURE__ */ y(ce, {
		...j(n),
		"data-radix-menubar-content": "",
		...r,
		ref: t,
		style: {
			...e.style,
			"--radix-menubar-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-menubar-content-available-width": "var(--radix-popper-available-width)",
			"--radix-menubar-content-available-height": "var(--radix-popper-available-height)",
			"--radix-menubar-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-menubar-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
});
He.displayName = Ve;
function Ue(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
var We = P, Ge = L, Ke = z, qe = B, Je = H, Ye = U, Xe = W, Ze = G, Qe = K, $e = q, et = J, tt = Y, nt = Pe, rt = Re, it = Be, at = He, ot = v.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ y(We, {
	ref: r,
	className: e("flex min-h-10 items-center gap-1 rounded-[var(--sdk-radius-control)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] p-1 shadow-[var(--sdk-shadow-sm)]", t),
	"data-sdk-ui": "menubar",
	"data-slot": "menubar",
	...n
}));
ot.displayName = "Menubar";
var st = Ge, ct = qe, lt = rt, ut = v.forwardRef(({ ...e }, t) => /* @__PURE__ */ y(Ye, {
	ref: t,
	"data-sdk-ui": "menubar-group",
	"data-slot": "menubar-group",
	...e
}));
ut.displayName = "MenubarGroup";
var dt = v.forwardRef(({ ...e }, t) => /* @__PURE__ */ y($e, {
	ref: t,
	"data-sdk-ui": "menubar-radio-group",
	"data-slot": "menubar-radio-group",
	...e
}));
dt.displayName = "MenubarRadioGroup";
var ft = v.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ y(Ke, {
	ref: r,
	className: e("inline-flex min-h-8 select-none items-center rounded-[var(--sdk-radius-control)] px-3 text-sm font-medium text-[var(--sdk-color-text-secondary)] outline-none transition-colors hover:bg-[var(--sdk-color-brand-primary-soft)] hover:text-[var(--sdk-color-text-primary)] focus:bg-[var(--sdk-color-brand-primary-soft)] data-[state=open]:bg-[var(--sdk-color-brand-primary-soft)] data-[state=open]:text-[var(--sdk-color-text-primary)]", t),
	"data-sdk-ui": "menubar-trigger",
	"data-slot": "menubar-trigger",
	...n
}));
ft.displayName = "MenubarTrigger";
var pt = v.forwardRef(({ className: t, inset: n, children: r, ...i }, a) => /* @__PURE__ */ b(it, {
	ref: a,
	className: e("flex cursor-default select-none items-center gap-2 rounded-[var(--sdk-radius-field)] px-2 py-1.5 text-sm outline-none transition-colors focus:bg-[var(--sdk-color-brand-primary-soft)] data-[state=open]:bg-[var(--sdk-color-brand-primary-soft)]", n && "pl-8", t),
	"data-sdk-ui": "menubar-sub-trigger",
	"data-slot": "menubar-sub-trigger",
	...i,
	children: [r, /* @__PURE__ */ y(m, { className: "ml-auto h-4 w-4" })]
}));
pt.displayName = "MenubarSubTrigger";
var mt = "z-50 min-w-[12rem] overflow-hidden rounded-[var(--sdk-radius-panel)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] p-1 text-[var(--sdk-color-text-primary)] shadow-[var(--sdk-shadow-md)]", X = v.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ y(at, {
	ref: r,
	className: e(mt, t),
	"data-sdk-ui": "menubar-sub-content",
	"data-slot": "menubar-sub-content",
	...n
}));
X.displayName = "MenubarSubContent";
var ht = v.forwardRef(({ align: t = "start", className: n, sideOffset: r = 8, ...i }, a) => /* @__PURE__ */ y(qe, { children: /* @__PURE__ */ y(Je, {
	ref: a,
	align: t,
	sideOffset: r,
	className: e(mt, n),
	"data-sdk-ui": "menubar-content",
	"data-slot": "menubar-content",
	...i
}) }));
ht.displayName = "MenubarContent";
var gt = v.forwardRef(({ className: t, inset: n, ...r }, i) => /* @__PURE__ */ y(Ze, {
	ref: i,
	className: e("relative flex cursor-default select-none items-center gap-2 rounded-[var(--sdk-radius-field)] px-2 py-1.5 text-sm outline-none transition-colors focus:bg-[var(--sdk-color-brand-primary-soft)] focus:text-[var(--sdk-color-text-primary)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50", n && "pl-8", t),
	"data-sdk-ui": "menubar-item",
	"data-slot": "menubar-item",
	...r
}));
gt.displayName = "MenubarItem";
var _t = v.forwardRef(({ checked: t, children: n, className: r, ...i }, a) => /* @__PURE__ */ b(Qe, {
	ref: a,
	checked: t,
	className: e("relative flex cursor-default select-none items-center gap-2 rounded-[var(--sdk-radius-field)] py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-[var(--sdk-color-brand-primary-soft)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50", r),
	"data-sdk-ui": "menubar-checkbox-item",
	"data-slot": "menubar-checkbox-item",
	...i,
	children: [/* @__PURE__ */ y("span", {
		className: "absolute left-2 flex h-4 w-4 items-center justify-center",
		children: /* @__PURE__ */ y(tt, { children: /* @__PURE__ */ y(s, { className: "h-4 w-4" }) })
	}), n]
}));
_t.displayName = "MenubarCheckboxItem";
var vt = v.forwardRef(({ children: t, className: n, ...r }, i) => /* @__PURE__ */ b(et, {
	ref: i,
	className: e("relative flex cursor-default select-none items-center gap-2 rounded-[var(--sdk-radius-field)] py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-[var(--sdk-color-brand-primary-soft)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50", n),
	"data-sdk-ui": "menubar-radio-item",
	"data-slot": "menubar-radio-item",
	...r,
	children: [/* @__PURE__ */ y("span", {
		className: "absolute left-2 flex h-4 w-4 items-center justify-center",
		children: /* @__PURE__ */ y(tt, { children: /* @__PURE__ */ y(f, { className: "h-2.5 w-2.5 fill-current" }) })
	}), t]
}));
vt.displayName = "MenubarRadioItem";
var yt = v.forwardRef(({ className: t, inset: n, ...r }, i) => /* @__PURE__ */ y(Xe, {
	ref: i,
	className: e("px-2 py-1.5 text-sm font-semibold text-[var(--sdk-color-text-secondary)]", n && "pl-8", t),
	"data-sdk-ui": "menubar-label",
	"data-slot": "menubar-label",
	...r
}));
yt.displayName = "MenubarLabel";
var bt = v.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ y(nt, {
	ref: r,
	className: e("-mx-1 my-1 h-px bg-[var(--sdk-color-border-subtle)]", t),
	"data-sdk-ui": "menubar-separator",
	"data-slot": "menubar-separator",
	...n
}));
bt.displayName = "MenubarSeparator";
var xt = v.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ y("span", {
	ref: r,
	className: e("ml-auto text-xs tracking-[0.14em] text-[var(--sdk-color-text-muted)]", t),
	"data-sdk-ui": "menubar-shortcut",
	"data-slot": "menubar-shortcut",
	...n
}));
xt.displayName = "MenubarShortcut", st.displayName = "MenubarMenu", ct.displayName = "MenubarPortal", lt.displayName = "MenubarSub";
//#endregion
//#region src/components/ui/navigation/stepper.tsx
var St = v.createContext("horizontal"), Ct = {
	complete: "border-[var(--sdk-color-state-success)] bg-[color-mix(in_srgb,var(--sdk-color-state-success)_14%,var(--sdk-color-surface-panel))] text-[var(--sdk-color-state-success)]",
	current: "border-[var(--sdk-color-brand-primary)] bg-[var(--sdk-color-brand-primary-soft)] text-[var(--sdk-color-brand-primary)]",
	error: "border-[var(--sdk-color-state-danger)] bg-[color-mix(in_srgb,var(--sdk-color-state-danger)_14%,var(--sdk-color-surface-panel))] text-[var(--sdk-color-state-danger)]",
	upcoming: "border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel-muted)] text-[var(--sdk-color-text-muted)]"
}, Z = {
	complete: "bg-[var(--sdk-color-state-success)]/35",
	current: "bg-[var(--sdk-color-brand-primary)]/25",
	upcoming: "bg-[var(--sdk-color-border-default)]"
};
function wt(e, t) {
	let r = {}, i = n(e?.connector, t?.connector), a = n(e?.content, t?.content), o = n(e?.indicator, t?.indicator);
	return i && (r.connector = i), a && (r.content = a), o && (r.indicator = o), Object.keys(r).length > 0 ? r : void 0;
}
var Tt = v.forwardRef(({ children: t, className: n, getItemProps: r, getItemSlotProps: i, orientation: a = "horizontal", ...o }, s) => {
	let c = v.Children.toArray(t).map((t, n, o) => {
		if (!v.isValidElement(t)) return t;
		let s = t.props, c = {
			index: n,
			last: n === o.length - 1,
			orientation: a,
			status: s.status ?? "upcoming"
		}, l = r?.(c);
		return v.cloneElement(t, {
			...l,
			...s,
			className: e(l?.className, s.className),
			last: c.last,
			slotProps: wt(i?.(c), s.slotProps),
			style: l?.style || s.style ? {
				...l?.style,
				...s.style
			} : void 0,
			stepNumber: n + 1
		});
	});
	return /* @__PURE__ */ y(St.Provider, {
		value: a,
		children: /* @__PURE__ */ y("ol", {
			ref: s,
			className: e(a === "horizontal" ? "flex flex-wrap items-start gap-3" : "space-y-3", n),
			"data-orientation": a,
			"data-sdk-ui": "stepper",
			"data-slot": "stepper",
			...o,
			children: c
		})
	});
});
Tt.displayName = "Stepper";
var Et = v.forwardRef(({ className: n, description: r, icon: i, last: a = !1, meta: o, slotProps: s, status: c = "upcoming", stepNumber: l = 1, title: u, ...d }, f) => {
	let p = v.useContext(St), m = i ?? l;
	return p === "vertical" ? /* @__PURE__ */ b("li", {
		ref: f,
		className: e("grid grid-cols-[auto_minmax(0,1fr)] gap-3", n),
		"data-orientation": p,
		"data-sdk-ui": "stepper-item",
		"data-slot": "stepper-item",
		"data-status": c,
		...d,
		children: [/* @__PURE__ */ b("div", {
			className: "flex flex-col items-center",
			children: [/* @__PURE__ */ y("span", {
				...t({
					className: e("flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold shadow-[var(--sdk-shadow-soft)]", Ct[c]),
					"data-sdk-region": "stepper-item-indicator",
					"data-slot": "stepper-item-indicator"
				}, s?.indicator),
				children: m
			}), a ? null : /* @__PURE__ */ y("span", { ...t({
				"aria-hidden": "true",
				className: e("mt-2 w-px flex-1 rounded-full", c === "error" ? Z.upcoming : Z[c]),
				"data-sdk-region": "stepper-item-connector",
				"data-slot": "stepper-item-connector"
			}, s?.connector) })]
		}), /* @__PURE__ */ b("div", {
			...t({
				className: "min-w-0 rounded-[var(--sdk-radius-panel)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] px-4 py-3 shadow-[var(--sdk-shadow-soft)]",
				"data-sdk-region": "stepper-item-content",
				"data-slot": "stepper-item-content"
			}, s?.content),
			children: [/* @__PURE__ */ b("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ y("div", {
					className: "text-sm font-semibold text-[var(--sdk-color-text-primary)]",
					"data-slot": "stepper-item-title",
					children: u
				}), o ? /* @__PURE__ */ y("div", {
					className: "text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--sdk-color-text-muted)]",
					"data-slot": "stepper-item-meta",
					children: o
				}) : null]
			}), r ? /* @__PURE__ */ y("div", {
				className: "mt-1.5 text-sm text-[var(--sdk-color-text-secondary)]",
				"data-slot": "stepper-item-description",
				children: r
			}) : null]
		})]
	}) : /* @__PURE__ */ b("li", {
		ref: f,
		className: e("flex min-w-[12rem] flex-1 items-start gap-3", n),
		"data-orientation": p,
		"data-sdk-ui": "stepper-item",
		"data-slot": "stepper-item",
		"data-status": c,
		...d,
		children: [/* @__PURE__ */ b("div", {
			className: "flex min-w-0 flex-1 items-start gap-3",
			children: [/* @__PURE__ */ y("span", {
				...t({
					className: e("flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold shadow-[var(--sdk-shadow-soft)]", Ct[c]),
					"data-sdk-region": "stepper-item-indicator",
					"data-slot": "stepper-item-indicator"
				}, s?.indicator),
				children: m
			}), /* @__PURE__ */ b("div", {
				...t({
					className: "min-w-0",
					"data-sdk-region": "stepper-item-content",
					"data-slot": "stepper-item-content"
				}, s?.content),
				children: [/* @__PURE__ */ b("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ y("div", {
						className: "text-sm font-semibold text-[var(--sdk-color-text-primary)]",
						"data-slot": "stepper-item-title",
						children: u
					}), o ? /* @__PURE__ */ y("div", {
						className: "text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--sdk-color-text-muted)]",
						"data-slot": "stepper-item-meta",
						children: o
					}) : null]
				}), r ? /* @__PURE__ */ y("div", {
					className: "mt-1.5 text-sm text-[var(--sdk-color-text-secondary)]",
					"data-slot": "stepper-item-description",
					children: r
				}) : null]
			})]
		}), a ? null : /* @__PURE__ */ y("span", { ...t({
			"aria-hidden": "true",
			className: e("mt-[1.125rem] h-px min-w-6 flex-1 rounded-full", c === "error" ? Z.upcoming : Z[c]),
			"data-sdk-region": "stepper-item-connector",
			"data-slot": "stepper-item-connector"
		}, s?.connector) })]
	});
});
Et.displayName = "StepperItem";
//#endregion
//#region src/components/ui/navigation/workspace-tabs.tsx
function Dt(e, t) {
	let r = {}, i = n(e?.closeButton, t?.closeButton), a = n(e?.icon, t?.icon), o = n(e?.label, t?.label), s = n(e?.meta, t?.meta), c = n(e?.modifiedIndicator, t?.modifiedIndicator), l = n(e?.trigger, t?.trigger);
	return i && (r.closeButton = i), a && (r.icon = a), o && (r.label = o), s && (r.meta = s), c && (r.modifiedIndicator = c), l && (r.trigger = l), Object.keys(r).length > 0 ? r : void 0;
}
function Ot(e) {
	return typeof e.label == "string" ? `Close ${e.label}` : e.closeLabel ?? "Close tab";
}
var Q = v.forwardRef(({ className: n, item: r, onCloseTab: i, onValueChange: a, selected: o = !1, slotProps: s, ...c }, l) => /* @__PURE__ */ b("div", {
	ref: l,
	className: e("group inline-flex items-center gap-1 rounded-[var(--sdk-radius-control)] border transition-colors", i ? "pr-1.5" : "pr-2", o ? "border-[var(--sdk-color-brand-primary)]/25 bg-[var(--sdk-color-brand-primary-soft)] text-[var(--sdk-color-text-primary)]" : "border-[var(--sdk-color-border-subtle)] bg-[var(--sdk-color-surface-panel)] text-[var(--sdk-color-text-secondary)]", n),
	"data-disabled": r.disabled ? "true" : "false",
	"data-sdk-ui": "workspace-tab",
	"data-slot": "workspace-tab",
	"data-state": o ? "active" : "inactive",
	...c,
	children: [/* @__PURE__ */ b("button", {
		...t({
			"aria-selected": o,
			className: e("inline-flex min-w-0 items-center gap-2 rounded-[var(--sdk-radius-control)] px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sdk-color-border-focus)]", o ? "text-[var(--sdk-color-text-primary)]" : "hover:text-[var(--sdk-color-text-primary)]"),
			"data-sdk-region": "workspace-tab-trigger",
			"data-slot": "workspace-tab-trigger",
			disabled: r.disabled,
			onClick: () => a?.(r.id),
			role: "tab",
			tabIndex: o ? 0 : -1,
			type: "button"
		}, s?.trigger),
		children: [
			r.icon ? /* @__PURE__ */ y("span", {
				...t({
					className: "shrink-0",
					"data-sdk-region": "workspace-tab-icon",
					"data-slot": "workspace-tab-icon"
				}, s?.icon),
				children: r.icon
			}) : null,
			/* @__PURE__ */ y("span", {
				...t({
					className: "truncate",
					"data-sdk-region": "workspace-tab-label",
					"data-slot": "workspace-tab-label"
				}, s?.label),
				children: r.label
			}),
			r.modified ? /* @__PURE__ */ y("span", { ...t({
				"aria-hidden": "true",
				className: "inline-flex h-2 w-2 shrink-0 rounded-full bg-[var(--sdk-color-state-warning)]",
				"data-sdk-region": "workspace-tab-modified-indicator",
				"data-slot": "workspace-tab-modified-indicator"
			}, s?.modifiedIndicator) }) : null,
			r.meta ? /* @__PURE__ */ y("span", {
				...t({
					className: "shrink-0 text-xs text-[var(--sdk-color-text-muted)]",
					"data-sdk-region": "workspace-tab-meta",
					"data-slot": "workspace-tab-meta"
				}, s?.meta),
				children: r.meta
			}) : null
		]
	}), i ? /* @__PURE__ */ y("button", {
		...t({
			"aria-label": r.closeLabel ?? Ot(r),
			className: "rounded-full p-1 text-[var(--sdk-color-text-muted)] transition-colors hover:bg-[var(--sdk-color-surface-elevated)] hover:text-[var(--sdk-color-text-primary)]",
			"data-sdk-region": "workspace-tab-close-button",
			"data-slot": "workspace-tab-close-button",
			onClick: (e) => {
				e.stopPropagation(), i(r.id);
			},
			type: "button"
		}, s?.closeButton),
		children: /* @__PURE__ */ y(h, { className: "h-3.5 w-3.5" })
	}) : null]
}));
Q.displayName = "WorkspaceTab";
var $ = v.forwardRef(({ actions: n, className: r, emptyState: i = "Workspace", getItemProps: a, getItemSlotProps: o, items: s, onCloseTab: c, onValueChange: l, slotProps: u, value: d, ...f }, p) => /* @__PURE__ */ b("div", {
	ref: p,
	className: e("flex items-center gap-3", r),
	"data-sdk-ui": "workspace-tabs",
	"data-slot": "workspace-tabs",
	...f,
	children: [/* @__PURE__ */ y("div", {
		...t({
			"aria-label": "Workspace tabs",
			"aria-orientation": "horizontal",
			className: "flex min-w-0 flex-1 items-center gap-2 overflow-x-auto",
			"data-sdk-region": "workspace-tabs-tablist",
			"data-slot": "workspace-tabs-tablist",
			role: "tablist"
		}, u?.tabList),
		children: s.length === 0 ? /* @__PURE__ */ y("span", {
			...t({
				className: "px-1 text-sm text-[var(--sdk-color-text-muted)]",
				"data-sdk-region": "workspace-tabs-empty",
				"data-slot": "workspace-tabs-empty"
			}, u?.empty),
			children: i
		}) : s.map((e, t) => {
			let n = {
				index: t,
				item: e,
				selected: e.id === d
			};
			return /* @__PURE__ */ ye(Q, {
				...a?.(n),
				item: e,
				key: e.id,
				onCloseTab: c,
				onValueChange: l,
				selected: n.selected,
				slotProps: Dt(o?.(n), void 0)
			});
		})
	}), n ? /* @__PURE__ */ y("div", {
		...t({
			className: "flex shrink-0 items-center gap-2",
			"data-sdk-region": "workspace-tabs-actions",
			"data-slot": "workspace-tabs-actions"
		}, u?.actions),
		children: n
	}) : null]
}));
$.displayName = "WorkspaceTabs";
//#endregion
export { C, E as D, T as E, D as S, S as T, lt as _, ot as a, ft as b, ut as c, st as d, ct as f, xt as g, bt as h, Et as i, gt as l, vt as m, $ as n, _t as o, dt as p, Tt as r, ht as s, Q as t, yt as u, X as v, w, x, pt as y };

//# sourceMappingURL=navigation-BqBLZhFa.js.map