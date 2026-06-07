import { t as e } from "./utils-Bgb-Nm-x.js";
import { i as t } from "./dist-CJMju1B6.js";
import { t as n } from "./createLucideIcon-DYUOEYxe.js";
import { _ as r, b as i, c as a, d as o, f as s, g as c, h as l, l as u, m as d, n as f, o as p, p as m, s as h, t as g, u as _, v } from "./Combination-DHpOS5dI.js";
import { t as y } from "./chevron-down-COFRXzK7.js";
import { c as b, d as x, i as S, n as C, o as w, r as T, t as E, u as D } from "./dist-Dedo1J3L.js";
import { n as O } from "./dist-KnaVSaQi.js";
import { t as k } from "./dist-Cqg1besQ.js";
import * as A from "react";
import { Fragment as j, jsx as M, jsxs as N } from "react/jsx-runtime";
import * as ee from "react-dom";
//#region \0rolldown/runtime.js
var te = Object.defineProperty, P = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), F = (e, t) => {
	let n = {};
	for (var r in e) te(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || te(n, Symbol.toStringTag, { value: "Module" }), n;
}, I = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (e, t) => (typeof require < "u" ? require : e)[t] }) : e)(function(e) {
	if (typeof require < "u") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + e + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
}), ne = n("chevron-up", [["path", {
	d: "m18 15-6-6-6 6",
	key: "153udz"
}]]), L = n("file-text", [
	["path", {
		d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
		key: "1oefj6"
	}],
	["path", {
		d: "M14 2v5a1 1 0 0 0 1 1h5",
		key: "wfsgrz"
	}],
	["path", {
		d: "M10 9H8",
		key: "b1mrlr"
	}],
	["path", {
		d: "M16 13H8",
		key: "t4e002"
	}],
	["path", {
		d: "M16 17H8",
		key: "z1uh3a"
	}]
]);
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-use-previou_e9b847be3e14bd4a50395d2a7763d0b4/node_modules/@radix-ui/react-use-previous/dist/index.mjs
function R(e) {
	let t = A.useRef({
		value: e,
		previous: e
	});
	return A.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-checkbox@1._a9bfe74df417688e01ae6068318bf0dd/node_modules/@radix-ui/react-checkbox/dist/index.mjs
var z = "Checkbox", [B, V] = D(z), [re, H] = B(z);
function ie(e) {
	let { __scopeCheckbox: t, checked: n, children: r, defaultChecked: i, disabled: a, form: o, name: s, onCheckedChange: c, required: l, value: u = "on", internal_do_not_use_render: d } = e, [f, p] = v({
		prop: n,
		defaultProp: i ?? !1,
		onChange: c,
		caller: z
	}), [m, h] = A.useState(null), [g, _] = A.useState(null), y = A.useRef(!1), b = m ? !!o || !!m.closest("form") : !0, x = {
		checked: f,
		disabled: a,
		setChecked: p,
		control: m,
		setControl: h,
		name: s,
		form: o,
		value: u,
		hasConsumerStoppedPropagationRef: y,
		required: l,
		defaultChecked: U(i) ? !1 : i,
		isFormControl: b,
		bubbleInput: g,
		setBubbleInput: _
	};
	return /* @__PURE__ */ M(re, {
		scope: t,
		...x,
		children: fe(d) ? d(x) : r
	});
}
var ae = "CheckboxTrigger", oe = A.forwardRef(({ __scopeCheckbox: e, onKeyDown: n, onClick: r, ...i }, a) => {
	let { control: o, value: s, disabled: c, checked: l, required: u, setControl: d, setChecked: f, hasConsumerStoppedPropagationRef: p, isFormControl: m, bubbleInput: h } = H(ae, e), g = t(a, d), _ = A.useRef(l);
	return A.useEffect(() => {
		let e = o?.form;
		if (e) {
			let t = () => f(_.current);
			return e.addEventListener("reset", t), () => e.removeEventListener("reset", t);
		}
	}, [o, f]), /* @__PURE__ */ M(S.button, {
		type: "button",
		role: "checkbox",
		"aria-checked": U(l) ? "mixed" : l,
		"aria-required": u,
		"data-state": pe(l),
		"data-disabled": c ? "" : void 0,
		disabled: c,
		value: s,
		...i,
		ref: g,
		onKeyDown: x(n, (e) => {
			e.key === "Enter" && e.preventDefault();
		}),
		onClick: x(r, (e) => {
			f((e) => U(e) ? !0 : !e), h && m && (p.current = e.isPropagationStopped(), p.current || e.stopPropagation());
		})
	});
});
oe.displayName = ae;
var se = A.forwardRef((e, t) => {
	let { __scopeCheckbox: n, name: r, checked: i, defaultChecked: a, required: o, disabled: s, value: c, onCheckedChange: l, form: u, ...d } = e;
	return /* @__PURE__ */ M(ie, {
		__scopeCheckbox: n,
		checked: i,
		defaultChecked: a,
		disabled: s,
		required: o,
		onCheckedChange: l,
		name: r,
		form: u,
		value: c,
		internal_do_not_use_render: ({ isFormControl: e }) => /* @__PURE__ */ N(j, { children: [/* @__PURE__ */ M(oe, {
			...d,
			ref: t,
			__scopeCheckbox: n
		}), e && /* @__PURE__ */ M(de, { __scopeCheckbox: n })] })
	});
});
se.displayName = z;
var ce = "CheckboxIndicator", le = A.forwardRef((e, t) => {
	let { __scopeCheckbox: n, forceMount: r, ...i } = e, a = H(ce, n);
	return /* @__PURE__ */ M(E, {
		present: r || U(a.checked) || a.checked === !0,
		children: /* @__PURE__ */ M(S.span, {
			"data-state": pe(a.checked),
			"data-disabled": a.disabled ? "" : void 0,
			...i,
			ref: t,
			style: {
				pointerEvents: "none",
				...e.style
			}
		})
	});
});
le.displayName = ce;
var ue = "CheckboxBubbleInput", de = A.forwardRef(({ __scopeCheckbox: e, ...n }, r) => {
	let { control: i, hasConsumerStoppedPropagationRef: a, checked: o, defaultChecked: c, required: l, disabled: u, name: d, value: f, form: p, bubbleInput: m, setBubbleInput: h } = H(ue, e), g = t(r, h), _ = R(o), v = s(i);
	A.useEffect(() => {
		let e = m;
		if (!e) return;
		let t = window.HTMLInputElement.prototype, n = Object.getOwnPropertyDescriptor(t, "checked").set, r = !a.current;
		if (_ !== o && n) {
			let t = new Event("click", { bubbles: r });
			e.indeterminate = U(o), n.call(e, U(o) ? !1 : o), e.dispatchEvent(t);
		}
	}, [
		m,
		_,
		o,
		a
	]);
	let y = A.useRef(U(o) ? !1 : o);
	return /* @__PURE__ */ M(S.input, {
		type: "checkbox",
		"aria-hidden": !0,
		defaultChecked: c ?? y.current,
		required: l,
		disabled: u,
		name: d,
		value: f,
		form: p,
		...n,
		tabIndex: -1,
		ref: g,
		style: {
			...n.style,
			...v,
			position: "absolute",
			pointerEvents: "none",
			opacity: 0,
			margin: 0,
			transform: "translateX(-100%)"
		}
	});
});
de.displayName = ue;
function fe(e) {
	return typeof e == "function";
}
function U(e) {
	return e === "indeterminate";
}
function pe(e) {
	return U(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
//#endregion
//#region src/components/ui/checkbox.tsx
var me = A.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ M(se, {
	ref: r,
	className: e("peer h-4 w-4 shrink-0 rounded border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] text-[var(--sdk-color-text-inverse)] shadow-[var(--sdk-shadow-sm)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sdk-color-border-focus)] data-[state=checked]:border-[var(--sdk-color-brand-primary)] data-[state=checked]:bg-[var(--sdk-color-brand-primary)] disabled:cursor-not-allowed disabled:opacity-60", t),
	"data-sdk-ui": "checkbox",
	"data-slot": "checkbox",
	...n,
	children: /* @__PURE__ */ M(le, {
		className: "flex items-center justify-center text-current",
		"data-slot": "checkbox-indicator",
		children: /* @__PURE__ */ M(i, { className: "h-3.5 w-3.5" })
	})
}));
me.displayName = "Checkbox";
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-select@2.2._53894a32562cb9eeb6aef8b357a4f4e3/node_modules/@radix-ui/react-select/dist/index.mjs
var he = [
	" ",
	"Enter",
	"ArrowUp",
	"ArrowDown"
], ge = [" ", "Enter"], W = "Select", [G, K, _e] = r(W), [q, ve] = D(W, [_e, o]), J = o(), [ye, Y] = q(W), [be, xe] = q(W), Se = (e) => {
	let { __scopeSelect: t, children: n, open: r, defaultOpen: i, onOpenChange: a, value: o, defaultValue: s, onValueChange: c, dir: l, name: u, autoComplete: d, disabled: f, required: p, form: h } = e, g = J(t), [y, b] = A.useState(null), [x, S] = A.useState(null), [C, w] = A.useState(!1), E = T(l), [D, O] = v({
		prop: r,
		defaultProp: i ?? !1,
		onChange: a,
		caller: W
	}), [k, j] = v({
		prop: o,
		defaultProp: s,
		onChange: c,
		caller: W
	}), ee = A.useRef(null), te = y ? h || !!y.closest("form") : !0, [P, F] = A.useState(/* @__PURE__ */ new Set()), I = Array.from(P).map((e) => e.props.value).join(";");
	return /* @__PURE__ */ M(_, {
		...g,
		children: /* @__PURE__ */ N(ye, {
			required: p,
			scope: t,
			trigger: y,
			onTriggerChange: b,
			valueNode: x,
			onValueNodeChange: S,
			valueNodeHasChildren: C,
			onValueNodeHasChildrenChange: w,
			contentId: m(),
			value: k,
			onValueChange: j,
			open: D,
			onOpenChange: O,
			dir: E,
			triggerPointerDownPosRef: ee,
			disabled: f,
			children: [/* @__PURE__ */ M(G.Provider, {
				scope: t,
				children: /* @__PURE__ */ M(be, {
					scope: e.__scopeSelect,
					onNativeOptionAdd: A.useCallback((e) => {
						F((t) => new Set(t).add(e));
					}, []),
					onNativeOptionRemove: A.useCallback((e) => {
						F((t) => {
							let n = new Set(t);
							return n.delete(e), n;
						});
					}, []),
					children: n
				})
			}), te ? /* @__PURE__ */ N(pt, {
				"aria-hidden": !0,
				required: p,
				tabIndex: -1,
				name: u,
				autoComplete: d,
				value: k,
				onChange: (e) => j(e.target.value),
				disabled: f,
				form: h,
				children: [k === void 0 ? /* @__PURE__ */ M("option", { value: "" }) : null, Array.from(P)]
			}, I) : null]
		})
	});
};
Se.displayName = W;
var Ce = "SelectTrigger", we = A.forwardRef((e, n) => {
	let { __scopeSelect: r, disabled: i = !1, ...a } = e, o = J(r), s = Y(Ce, r), c = s.disabled || i, l = t(n, s.onTriggerChange), u = K(r), d = A.useRef("touch"), [f, p, m] = ht((e) => {
		let t = u().filter((e) => !e.disabled), n = gt(t, e, t.find((e) => e.value === s.value));
		n !== void 0 && s.onValueChange(n.value);
	}), g = (e) => {
		c || (s.onOpenChange(!0), m()), e && (s.triggerPointerDownPosRef.current = {
			x: Math.round(e.pageX),
			y: Math.round(e.pageY)
		});
	};
	return /* @__PURE__ */ M(h, {
		asChild: !0,
		...o,
		children: /* @__PURE__ */ M(S.button, {
			type: "button",
			role: "combobox",
			"aria-controls": s.contentId,
			"aria-expanded": s.open,
			"aria-required": s.required,
			"aria-autocomplete": "none",
			dir: s.dir,
			"data-state": s.open ? "open" : "closed",
			disabled: c,
			"data-disabled": c ? "" : void 0,
			"data-placeholder": mt(s.value) ? "" : void 0,
			...a,
			ref: l,
			onClick: x(a.onClick, (e) => {
				e.currentTarget.focus(), d.current !== "mouse" && g(e);
			}),
			onPointerDown: x(a.onPointerDown, (e) => {
				d.current = e.pointerType;
				let t = e.target;
				t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId), e.button === 0 && e.ctrlKey === !1 && e.pointerType === "mouse" && (g(e), e.preventDefault());
			}),
			onKeyDown: x(a.onKeyDown, (e) => {
				let t = f.current !== "";
				!(e.ctrlKey || e.altKey || e.metaKey) && e.key.length === 1 && p(e.key), !(t && e.key === " ") && he.includes(e.key) && (g(), e.preventDefault());
			})
		})
	});
});
we.displayName = Ce;
var Te = "SelectValue", Ee = A.forwardRef((e, n) => {
	let { __scopeSelect: r, className: i, style: a, children: o, placeholder: s = "", ...c } = e, l = Y(Te, r), { onValueNodeHasChildrenChange: u } = l, d = o !== void 0, f = t(n, l.onValueNodeChange);
	return b(() => {
		u(d);
	}, [u, d]), /* @__PURE__ */ M(S.span, {
		...c,
		ref: f,
		style: { pointerEvents: "none" },
		children: mt(l.value) ? /* @__PURE__ */ M(j, { children: s }) : o
	});
});
Ee.displayName = Te;
var De = "SelectIcon", Oe = A.forwardRef((e, t) => {
	let { __scopeSelect: n, children: r, ...i } = e;
	return /* @__PURE__ */ M(S.span, {
		"aria-hidden": !0,
		...i,
		ref: t,
		children: r || "▼"
	});
});
Oe.displayName = De;
var ke = "SelectPortal", Ae = (e) => /* @__PURE__ */ M(p, {
	asChild: !0,
	...e
});
Ae.displayName = ke;
var X = "SelectContent", je = A.forwardRef((e, t) => {
	let n = Y(X, e.__scopeSelect), [r, i] = A.useState();
	if (b(() => {
		i(new DocumentFragment());
	}, []), !n.open) {
		let t = r;
		return t ? ee.createPortal(/* @__PURE__ */ M(Me, {
			scope: e.__scopeSelect,
			children: /* @__PURE__ */ M(G.Slot, {
				scope: e.__scopeSelect,
				children: /* @__PURE__ */ M("div", { children: e.children })
			})
		}), t) : null;
	}
	return /* @__PURE__ */ M(Fe, {
		...e,
		ref: t
	});
});
je.displayName = X;
var Z = 10, [Me, Q] = q(X), Ne = "SelectContentImpl", Pe = w("SelectContent.RemoveScroll"), Fe = A.forwardRef((e, n) => {
	let { __scopeSelect: r, position: i = "item-aligned", onCloseAutoFocus: a, onEscapeKeyDown: o, onPointerDownOutside: s, side: u, sideOffset: p, align: m, alignOffset: h, arrowPadding: _, collisionBoundary: v, collisionPadding: y, sticky: b, hideWhenDetached: S, avoidCollisions: C, ...w } = e, T = Y(X, r), [E, D] = A.useState(null), [O, k] = A.useState(null), j = t(n, (e) => D(e)), [N, ee] = A.useState(null), [te, P] = A.useState(null), F = K(r), [I, ne] = A.useState(!1), L = A.useRef(!1);
	A.useEffect(() => {
		if (E) return f(E);
	}, [E]), l();
	let R = A.useCallback((e) => {
		let [t, ...n] = F().map((e) => e.ref.current), [r] = n.slice(-1), i = document.activeElement;
		for (let n of e) if (n === i || (n?.scrollIntoView({ block: "nearest" }), n === t && O && (O.scrollTop = 0), n === r && O && (O.scrollTop = O.scrollHeight), n?.focus(), document.activeElement !== i)) return;
	}, [F, O]), z = A.useCallback(() => R([N, E]), [
		R,
		N,
		E
	]);
	A.useEffect(() => {
		I && z();
	}, [I, z]);
	let { onOpenChange: B, triggerPointerDownPosRef: V } = T;
	A.useEffect(() => {
		if (E) {
			let e = {
				x: 0,
				y: 0
			}, t = (t) => {
				e = {
					x: Math.abs(Math.round(t.pageX) - (V.current?.x ?? 0)),
					y: Math.abs(Math.round(t.pageY) - (V.current?.y ?? 0))
				};
			}, n = (n) => {
				e.x <= 10 && e.y <= 10 ? n.preventDefault() : E.contains(n.target) || B(!1), document.removeEventListener("pointermove", t), V.current = null;
			};
			return V.current !== null && (document.addEventListener("pointermove", t), document.addEventListener("pointerup", n, {
				capture: !0,
				once: !0
			})), () => {
				document.removeEventListener("pointermove", t), document.removeEventListener("pointerup", n, { capture: !0 });
			};
		}
	}, [
		E,
		B,
		V
	]), A.useEffect(() => {
		let e = () => B(!1);
		return window.addEventListener("blur", e), window.addEventListener("resize", e), () => {
			window.removeEventListener("blur", e), window.removeEventListener("resize", e);
		};
	}, [B]);
	let [re, H] = ht((e) => {
		let t = F().filter((e) => !e.disabled), n = gt(t, e, t.find((e) => e.ref.current === document.activeElement));
		n && setTimeout(() => n.ref.current.focus());
	}), ie = A.useCallback((e, t, n) => {
		let r = !L.current && !n;
		(T.value !== void 0 && T.value === t || r) && (ee(e), r && (L.current = !0));
	}, [T.value]), ae = A.useCallback(() => E?.focus(), [E]), oe = A.useCallback((e, t, n) => {
		let r = !L.current && !n;
		(T.value !== void 0 && T.value === t || r) && P(e);
	}, [T.value]), se = i === "popper" ? ze : Le, ce = se === ze ? {
		side: u,
		sideOffset: p,
		align: m,
		alignOffset: h,
		arrowPadding: _,
		collisionBoundary: v,
		collisionPadding: y,
		sticky: b,
		hideWhenDetached: S,
		avoidCollisions: C
	} : {};
	return /* @__PURE__ */ M(Me, {
		scope: r,
		content: E,
		viewport: O,
		onViewportChange: k,
		itemRefCallback: ie,
		selectedItem: N,
		onItemLeave: ae,
		itemTextRefCallback: oe,
		focusSelectedItem: z,
		selectedItemText: te,
		position: i,
		isPositioned: I,
		searchRef: re,
		children: /* @__PURE__ */ M(g, {
			as: Pe,
			allowPinchZoom: !0,
			children: /* @__PURE__ */ M(d, {
				asChild: !0,
				trapped: T.open,
				onMountAutoFocus: (e) => {
					e.preventDefault();
				},
				onUnmountAutoFocus: x(a, (e) => {
					T.trigger?.focus({ preventScroll: !0 }), e.preventDefault();
				}),
				children: /* @__PURE__ */ M(c, {
					asChild: !0,
					disableOutsidePointerEvents: !0,
					onEscapeKeyDown: o,
					onPointerDownOutside: s,
					onFocusOutside: (e) => e.preventDefault(),
					onDismiss: () => T.onOpenChange(!1),
					children: /* @__PURE__ */ M(se, {
						role: "listbox",
						id: T.contentId,
						"data-state": T.open ? "open" : "closed",
						dir: T.dir,
						onContextMenu: (e) => e.preventDefault(),
						...w,
						...ce,
						onPlaced: () => ne(!0),
						ref: j,
						style: {
							display: "flex",
							flexDirection: "column",
							outline: "none",
							...w.style
						},
						onKeyDown: x(w.onKeyDown, (e) => {
							let t = e.ctrlKey || e.altKey || e.metaKey;
							if (e.key === "Tab" && e.preventDefault(), !t && e.key.length === 1 && H(e.key), [
								"ArrowUp",
								"ArrowDown",
								"Home",
								"End"
							].includes(e.key)) {
								let t = F().filter((e) => !e.disabled).map((e) => e.ref.current);
								if (["ArrowUp", "End"].includes(e.key) && (t = t.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(e.key)) {
									let n = e.target, r = t.indexOf(n);
									t = t.slice(r + 1);
								}
								setTimeout(() => R(t)), e.preventDefault();
							}
						})
					})
				})
			})
		})
	});
});
Fe.displayName = Ne;
var Ie = "SelectItemAlignedPosition", Le = A.forwardRef((e, n) => {
	let { __scopeSelect: r, onPlaced: i, ...a } = e, o = Y(X, r), s = Q(X, r), [c, l] = A.useState(null), [u, d] = A.useState(null), f = t(n, (e) => d(e)), p = K(r), m = A.useRef(!1), h = A.useRef(!0), { viewport: g, selectedItem: _, selectedItemText: v, focusSelectedItem: y } = s, x = A.useCallback(() => {
		if (o.trigger && o.valueNode && c && u && g && _ && v) {
			let e = o.trigger.getBoundingClientRect(), t = u.getBoundingClientRect(), n = o.valueNode.getBoundingClientRect(), r = v.getBoundingClientRect();
			if (o.dir !== "rtl") {
				let i = r.left - t.left, a = n.left - i, o = e.left - a, s = e.width + o, l = Math.max(s, t.width), u = window.innerWidth - Z, d = k(a, [Z, Math.max(Z, u - l)]);
				c.style.minWidth = s + "px", c.style.left = d + "px";
			} else {
				let i = t.right - r.right, a = window.innerWidth - n.right - i, o = window.innerWidth - e.right - a, s = e.width + o, l = Math.max(s, t.width), u = window.innerWidth - Z, d = k(a, [Z, Math.max(Z, u - l)]);
				c.style.minWidth = s + "px", c.style.right = d + "px";
			}
			let a = p(), s = window.innerHeight - Z * 2, l = g.scrollHeight, d = window.getComputedStyle(u), f = parseInt(d.borderTopWidth, 10), h = parseInt(d.paddingTop, 10), y = parseInt(d.borderBottomWidth, 10), b = parseInt(d.paddingBottom, 10), x = f + h + l + b + y, S = Math.min(_.offsetHeight * 5, x), C = window.getComputedStyle(g), w = parseInt(C.paddingTop, 10), T = parseInt(C.paddingBottom, 10), E = e.top + e.height / 2 - Z, D = s - E, O = _.offsetHeight / 2, A = _.offsetTop + O, j = f + h + A, M = x - j;
			if (j <= E) {
				let e = a.length > 0 && _ === a[a.length - 1].ref.current;
				c.style.bottom = "0px";
				let t = u.clientHeight - g.offsetTop - g.offsetHeight, n = j + Math.max(D, O + (e ? T : 0) + t + y);
				c.style.height = n + "px";
			} else {
				let e = a.length > 0 && _ === a[0].ref.current;
				c.style.top = "0px";
				let t = Math.max(E, f + g.offsetTop + (e ? w : 0) + O) + M;
				c.style.height = t + "px", g.scrollTop = j - E + g.offsetTop;
			}
			c.style.margin = `${Z}px 0`, c.style.minHeight = S + "px", c.style.maxHeight = s + "px", i?.(), requestAnimationFrame(() => m.current = !0);
		}
	}, [
		p,
		o.trigger,
		o.valueNode,
		c,
		u,
		g,
		_,
		v,
		o.dir,
		i
	]);
	b(() => x(), [x]);
	let [C, w] = A.useState();
	return b(() => {
		u && w(window.getComputedStyle(u).zIndex);
	}, [u]), /* @__PURE__ */ M(Be, {
		scope: r,
		contentWrapper: c,
		shouldExpandOnScrollRef: m,
		onScrollButtonChange: A.useCallback((e) => {
			e && h.current === !0 && (x(), y?.(), h.current = !1);
		}, [x, y]),
		children: /* @__PURE__ */ M("div", {
			ref: l,
			style: {
				display: "flex",
				flexDirection: "column",
				position: "fixed",
				zIndex: C
			},
			children: /* @__PURE__ */ M(S.div, {
				...a,
				ref: f,
				style: {
					boxSizing: "border-box",
					maxHeight: "100%",
					...a.style
				}
			})
		})
	});
});
Le.displayName = Ie;
var Re = "SelectPopperPosition", ze = A.forwardRef((e, t) => {
	let { __scopeSelect: n, align: r = "start", collisionPadding: i = Z, ...a } = e;
	return /* @__PURE__ */ M(u, {
		...J(n),
		...a,
		ref: t,
		align: r,
		collisionPadding: i,
		style: {
			boxSizing: "border-box",
			...a.style,
			"--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-select-content-available-width": "var(--radix-popper-available-width)",
			"--radix-select-content-available-height": "var(--radix-popper-available-height)",
			"--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
});
ze.displayName = Re;
var [Be, Ve] = q(X, {}), He = "SelectViewport", Ue = A.forwardRef((e, n) => {
	let { __scopeSelect: r, nonce: i, ...a } = e, o = Q(He, r), s = Ve(He, r), c = t(n, o.onViewportChange), l = A.useRef(0);
	return /* @__PURE__ */ N(j, { children: [/* @__PURE__ */ M("style", {
		dangerouslySetInnerHTML: { __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}" },
		nonce: i
	}), /* @__PURE__ */ M(G.Slot, {
		scope: r,
		children: /* @__PURE__ */ M(S.div, {
			"data-radix-select-viewport": "",
			role: "presentation",
			...a,
			ref: c,
			style: {
				position: "relative",
				flex: 1,
				overflow: "hidden auto",
				...a.style
			},
			onScroll: x(a.onScroll, (e) => {
				let t = e.currentTarget, { contentWrapper: n, shouldExpandOnScrollRef: r } = s;
				if (r?.current && n) {
					let e = Math.abs(l.current - t.scrollTop);
					if (e > 0) {
						let r = window.innerHeight - Z * 2, i = parseFloat(n.style.minHeight), a = parseFloat(n.style.height), o = Math.max(i, a);
						if (o < r) {
							let i = o + e, a = Math.min(r, i), s = i - a;
							n.style.height = a + "px", n.style.bottom === "0px" && (t.scrollTop = s > 0 ? s : 0, n.style.justifyContent = "flex-end");
						}
					}
				}
				l.current = t.scrollTop;
			})
		})
	})] });
});
Ue.displayName = He;
var We = "SelectGroup", [Ge, Ke] = q(We), qe = A.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e, i = m();
	return /* @__PURE__ */ M(Ge, {
		scope: n,
		id: i,
		children: /* @__PURE__ */ M(S.div, {
			role: "group",
			"aria-labelledby": i,
			...r,
			ref: t
		})
	});
});
qe.displayName = We;
var Je = "SelectLabel", Ye = A.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e, i = Ke(Je, n);
	return /* @__PURE__ */ M(S.div, {
		id: i.id,
		...r,
		ref: t
	});
});
Ye.displayName = Je;
var Xe = "SelectItem", [Ze, Qe] = q(Xe), $e = A.forwardRef((e, n) => {
	let { __scopeSelect: r, value: i, disabled: a = !1, textValue: o, ...s } = e, c = Y(Xe, r), l = Q(Xe, r), u = c.value === i, [d, f] = A.useState(o ?? ""), [p, h] = A.useState(!1), g = t(n, (e) => l.itemRefCallback?.(e, i, a)), _ = m(), v = A.useRef("touch"), y = () => {
		a || (c.onValueChange(i), c.onOpenChange(!1));
	};
	if (i === "") throw Error("A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
	return /* @__PURE__ */ M(Ze, {
		scope: r,
		value: i,
		disabled: a,
		textId: _,
		isSelected: u,
		onItemTextChange: A.useCallback((e) => {
			f((t) => t || (e?.textContent ?? "").trim());
		}, []),
		children: /* @__PURE__ */ M(G.ItemSlot, {
			scope: r,
			value: i,
			disabled: a,
			textValue: d,
			children: /* @__PURE__ */ M(S.div, {
				role: "option",
				"aria-labelledby": _,
				"data-highlighted": p ? "" : void 0,
				"aria-selected": u && p,
				"data-state": u ? "checked" : "unchecked",
				"aria-disabled": a || void 0,
				"data-disabled": a ? "" : void 0,
				tabIndex: a ? void 0 : -1,
				...s,
				ref: g,
				onFocus: x(s.onFocus, () => h(!0)),
				onBlur: x(s.onBlur, () => h(!1)),
				onClick: x(s.onClick, () => {
					v.current !== "mouse" && y();
				}),
				onPointerUp: x(s.onPointerUp, () => {
					v.current === "mouse" && y();
				}),
				onPointerDown: x(s.onPointerDown, (e) => {
					v.current = e.pointerType;
				}),
				onPointerMove: x(s.onPointerMove, (e) => {
					v.current = e.pointerType, a ? l.onItemLeave?.() : v.current === "mouse" && e.currentTarget.focus({ preventScroll: !0 });
				}),
				onPointerLeave: x(s.onPointerLeave, (e) => {
					e.currentTarget === document.activeElement && l.onItemLeave?.();
				}),
				onKeyDown: x(s.onKeyDown, (e) => {
					l.searchRef?.current !== "" && e.key === " " || (ge.includes(e.key) && y(), e.key === " " && e.preventDefault());
				})
			})
		})
	});
});
$e.displayName = Xe;
var $ = "SelectItemText", et = A.forwardRef((e, n) => {
	let { __scopeSelect: r, className: i, style: a, ...o } = e, s = Y($, r), c = Q($, r), l = Qe($, r), u = xe($, r), [d, f] = A.useState(null), p = t(n, (e) => f(e), l.onItemTextChange, (e) => c.itemTextRefCallback?.(e, l.value, l.disabled)), m = d?.textContent, h = A.useMemo(() => /* @__PURE__ */ M("option", {
		value: l.value,
		disabled: l.disabled,
		children: m
	}, l.value), [
		l.disabled,
		l.value,
		m
	]), { onNativeOptionAdd: g, onNativeOptionRemove: _ } = u;
	return b(() => (g(h), () => _(h)), [
		g,
		_,
		h
	]), /* @__PURE__ */ N(j, { children: [/* @__PURE__ */ M(S.span, {
		id: l.textId,
		...o,
		ref: p
	}), l.isSelected && s.valueNode && !s.valueNodeHasChildren ? ee.createPortal(o.children, s.valueNode) : null] });
});
et.displayName = $;
var tt = "SelectItemIndicator", nt = A.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e;
	return Qe(tt, n).isSelected ? /* @__PURE__ */ M(S.span, {
		"aria-hidden": !0,
		...r,
		ref: t
	}) : null;
});
nt.displayName = tt;
var rt = "SelectScrollUpButton", it = A.forwardRef((e, n) => {
	let r = Q(rt, e.__scopeSelect), i = Ve(rt, e.__scopeSelect), [a, o] = A.useState(!1), s = t(n, i.onScrollButtonChange);
	return b(() => {
		if (r.viewport && r.isPositioned) {
			let e = function() {
				o(t.scrollTop > 0);
			}, t = r.viewport;
			return e(), t.addEventListener("scroll", e), () => t.removeEventListener("scroll", e);
		}
	}, [r.viewport, r.isPositioned]), a ? /* @__PURE__ */ M(st, {
		...e,
		ref: s,
		onAutoScroll: () => {
			let { viewport: e, selectedItem: t } = r;
			e && t && (e.scrollTop -= t.offsetHeight);
		}
	}) : null;
});
it.displayName = rt;
var at = "SelectScrollDownButton", ot = A.forwardRef((e, n) => {
	let r = Q(at, e.__scopeSelect), i = Ve(at, e.__scopeSelect), [a, o] = A.useState(!1), s = t(n, i.onScrollButtonChange);
	return b(() => {
		if (r.viewport && r.isPositioned) {
			let e = function() {
				let e = t.scrollHeight - t.clientHeight;
				o(Math.ceil(t.scrollTop) < e);
			}, t = r.viewport;
			return e(), t.addEventListener("scroll", e), () => t.removeEventListener("scroll", e);
		}
	}, [r.viewport, r.isPositioned]), a ? /* @__PURE__ */ M(st, {
		...e,
		ref: s,
		onAutoScroll: () => {
			let { viewport: e, selectedItem: t } = r;
			e && t && (e.scrollTop += t.offsetHeight);
		}
	}) : null;
});
ot.displayName = at;
var st = A.forwardRef((e, t) => {
	let { __scopeSelect: n, onAutoScroll: r, ...i } = e, a = Q("SelectScrollButton", n), o = A.useRef(null), s = K(n), c = A.useCallback(() => {
		o.current !== null && (window.clearInterval(o.current), o.current = null);
	}, []);
	return A.useEffect(() => () => c(), [c]), b(() => {
		s().find((e) => e.ref.current === document.activeElement)?.ref.current?.scrollIntoView({ block: "nearest" });
	}, [s]), /* @__PURE__ */ M(S.div, {
		"aria-hidden": !0,
		...i,
		ref: t,
		style: {
			flexShrink: 0,
			...i.style
		},
		onPointerDown: x(i.onPointerDown, () => {
			o.current === null && (o.current = window.setInterval(r, 50));
		}),
		onPointerMove: x(i.onPointerMove, () => {
			a.onItemLeave?.(), o.current === null && (o.current = window.setInterval(r, 50));
		}),
		onPointerLeave: x(i.onPointerLeave, () => {
			c();
		})
	});
}), ct = "SelectSeparator", lt = A.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e;
	return /* @__PURE__ */ M(S.div, {
		"aria-hidden": !0,
		...r,
		ref: t
	});
});
lt.displayName = ct;
var ut = "SelectArrow", dt = A.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e, i = J(n), o = Y(ut, n), s = Q(ut, n);
	return o.open && s.position === "popper" ? /* @__PURE__ */ M(a, {
		...i,
		...r,
		ref: t
	}) : null;
});
dt.displayName = ut;
var ft = "SelectBubbleInput", pt = A.forwardRef(({ __scopeSelect: e, value: n, ...r }, i) => {
	let a = A.useRef(null), o = t(i, a), s = R(n);
	return A.useEffect(() => {
		let e = a.current;
		if (!e) return;
		let t = window.HTMLSelectElement.prototype, r = Object.getOwnPropertyDescriptor(t, "value").set;
		if (s !== n && r) {
			let t = new Event("change", { bubbles: !0 });
			r.call(e, n), e.dispatchEvent(t);
		}
	}, [s, n]), /* @__PURE__ */ M(S.select, {
		...r,
		style: {
			...O,
			...r.style
		},
		ref: o,
		defaultValue: n
	});
});
pt.displayName = ft;
function mt(e) {
	return e === "" || e === void 0;
}
function ht(e) {
	let t = C(e), n = A.useRef(""), r = A.useRef(0), i = A.useCallback((e) => {
		let i = n.current + e;
		t(i), (function e(t) {
			n.current = t, window.clearTimeout(r.current), t !== "" && (r.current = window.setTimeout(() => e(""), 1e3));
		})(i);
	}, [t]), a = A.useCallback(() => {
		n.current = "", window.clearTimeout(r.current);
	}, []);
	return A.useEffect(() => () => window.clearTimeout(r.current), []), [
		n,
		i,
		a
	];
}
function gt(e, t, n) {
	let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1, a = _t(e, Math.max(i, 0));
	r.length === 1 && (a = a.filter((e) => e !== n));
	let o = a.find((e) => e.textValue.toLowerCase().startsWith(r.toLowerCase()));
	return o === n ? void 0 : o;
}
function _t(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
var vt = Se, yt = we, bt = Ee, xt = Oe, St = Ae, Ct = je, wt = Ue, Tt = qe, Et = Ye, Dt = $e, Ot = et, kt = nt, At = it, jt = ot, Mt = lt, Nt = vt, Pt = A.forwardRef(({ ...e }, t) => /* @__PURE__ */ M(Tt, {
	ref: t,
	"data-sdk-ui": "select-group",
	"data-slot": "select-group",
	...e
}));
Pt.displayName = "SelectGroup";
var Ft = A.forwardRef(({ ...e }, t) => /* @__PURE__ */ M(bt, {
	ref: t,
	"data-sdk-ui": "select-value",
	"data-slot": "select-value",
	...e
}));
Ft.displayName = "SelectValue";
var It = A.forwardRef(({ className: t, children: n, ...r }, i) => /* @__PURE__ */ N(yt, {
	ref: i,
	className: e("flex h-10 w-full items-center justify-between gap-2 rounded-[var(--sdk-radius-field)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] px-3 py-2 text-sm text-[var(--sdk-color-text-primary)] shadow-[var(--sdk-shadow-sm)] outline-none ring-offset-[var(--sdk-color-surface-canvas)] placeholder:text-[var(--sdk-color-text-muted)] focus:ring-2 focus:ring-[var(--sdk-color-border-focus)] disabled:cursor-not-allowed disabled:opacity-60", t),
	"data-sdk-ui": "select-trigger",
	"data-slot": "select-trigger",
	...r,
	children: [n, /* @__PURE__ */ M(xt, {
		asChild: !0,
		children: /* @__PURE__ */ M(y, { className: "h-4 w-4 text-[var(--sdk-color-text-muted)]" })
	})]
}));
It.displayName = "SelectTrigger";
var Lt = A.forwardRef(({ className: t, children: n, position: r = "popper", ...i }, a) => /* @__PURE__ */ M(St, { children: /* @__PURE__ */ N(Ct, {
	ref: a,
	position: r,
	className: e("relative z-50 min-w-[10rem] overflow-hidden rounded-[var(--sdk-radius-panel)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] text-[var(--sdk-color-text-primary)] shadow-[var(--sdk-shadow-lg)]", t),
	"data-sdk-ui": "select-content",
	"data-slot": "select-content",
	...i,
	children: [
		/* @__PURE__ */ M(At, {
			className: "flex cursor-default items-center justify-center py-1",
			children: /* @__PURE__ */ M(ne, { className: "h-4 w-4" })
		}),
		/* @__PURE__ */ M(wt, {
			className: "p-1",
			children: n
		}),
		/* @__PURE__ */ M(jt, {
			className: "flex cursor-default items-center justify-center py-1",
			children: /* @__PURE__ */ M(y, { className: "h-4 w-4" })
		})
	]
}) }));
Lt.displayName = "SelectContent";
var Rt = A.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ M(Et, {
	ref: r,
	className: e("px-2 py-1.5 text-xs font-semibold text-[var(--sdk-color-text-secondary)]", t),
	"data-sdk-ui": "select-label",
	"data-slot": "select-label",
	...n
}));
Rt.displayName = "SelectLabel";
var zt = A.forwardRef(({ className: t, children: n, ...r }, a) => /* @__PURE__ */ N(Dt, {
	ref: a,
	className: e("relative flex w-full cursor-default select-none items-center rounded-[var(--sdk-radius-field)] py-2 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-[var(--sdk-color-brand-primary-soft)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50", t),
	"data-sdk-ui": "select-item",
	"data-slot": "select-item",
	...r,
	children: [/* @__PURE__ */ M("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ M(kt, { children: /* @__PURE__ */ M(i, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ M(Ot, { children: n })]
}));
zt.displayName = "SelectItem";
var Bt = A.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ M(Mt, {
	ref: r,
	className: e("mx-1 my-1 h-px bg-[var(--sdk-color-border-subtle)]", t),
	"data-sdk-ui": "select-separator",
	"data-slot": "select-separator",
	...n
}));
Bt.displayName = "SelectSeparator", Nt.displayName = "Select";
//#endregion
//#region src/lib/core/use-controllable-state.ts
function Vt({ defaultValue: e, onChange: t, value: n }) {
	let [r, i] = A.useState(e), a = n !== void 0, o = a ? n : r;
	return [o, A.useCallback((e) => {
		let n = typeof e == "function" ? e(o) : e;
		Object.is(n, o) || (a || i(n), t?.(n));
	}, [
		o,
		a,
		t
	])];
}
//#endregion
export { zt as a, It as c, R as d, L as f, I as g, F as h, Pt as i, Ft as l, P as m, Nt as n, Rt as o, ne as p, Lt as r, Bt as s, Vt as t, me as u };

//# sourceMappingURL=use-controllable-state-C-6H1OII.js.map