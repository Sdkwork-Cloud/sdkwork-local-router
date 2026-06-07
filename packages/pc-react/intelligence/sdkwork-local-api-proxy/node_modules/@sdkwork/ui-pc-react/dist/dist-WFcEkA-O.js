import { i as e, r as t } from "./dist-CJMju1B6.js";
import { _ as n, a as r, c as i, d as a, g as o, h as s, i as c, l, m as u, n as d, o as f, p, r as ee, s as m, t as te, u as h } from "./Combination-DHpOS5dI.js";
import { a as ne, d as g, i as _, n as v, o as y, r as b, t as x, u as S } from "./dist-Dedo1J3L.js";
import * as C from "react";
import { jsx as w } from "react/jsx-runtime";
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-menu@2.1.16_73ff7391b7be14d4dbff03af4dbac090/node_modules/@radix-ui/react-menu/dist/index.mjs
var T = ["Enter", " "], re = [
	"ArrowDown",
	"PageUp",
	"Home"
], ie = [
	"ArrowUp",
	"PageDown",
	"End"
], ae = [...re, ...ie], E = {
	ltr: [...T, "ArrowRight"],
	rtl: [...T, "ArrowLeft"]
}, oe = {
	ltr: ["ArrowLeft"],
	rtl: ["ArrowRight"]
}, D = "Menu", [O, se, ce] = n(D), [k, A] = S(D, [
	ce,
	a,
	r
]), j = a(), le = r(), [M, N] = k(D), [P, F] = k(D), I = (e) => {
	let { __scopeMenu: t, open: n = !1, children: r, dir: i, onOpenChange: a, modal: o = !0 } = e, s = j(t), [c, l] = C.useState(null), u = C.useRef(!1), d = v(a), f = b(i);
	return C.useEffect(() => {
		let e = () => {
			u.current = !0, document.addEventListener("pointerdown", t, {
				capture: !0,
				once: !0
			}), document.addEventListener("pointermove", t, {
				capture: !0,
				once: !0
			});
		}, t = () => u.current = !1;
		return document.addEventListener("keydown", e, { capture: !0 }), () => {
			document.removeEventListener("keydown", e, { capture: !0 }), document.removeEventListener("pointerdown", t, { capture: !0 }), document.removeEventListener("pointermove", t, { capture: !0 });
		};
	}, []), /* @__PURE__ */ w(h, {
		...s,
		children: /* @__PURE__ */ w(M, {
			scope: t,
			open: n,
			onOpenChange: d,
			content: c,
			onContentChange: l,
			children: /* @__PURE__ */ w(P, {
				scope: t,
				onClose: C.useCallback(() => d(!1), [d]),
				isUsingKeyboardRef: u,
				dir: f,
				modal: o,
				children: r
			})
		})
	});
};
I.displayName = D;
var L = "MenuAnchor", R = C.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ w(m, {
		...j(n),
		...r,
		ref: t
	});
});
R.displayName = L;
var z = "MenuPortal", [ue, B] = k(z, { forceMount: void 0 }), de = (e) => {
	let { __scopeMenu: t, forceMount: n, children: r, container: i } = e, a = N(z, t);
	return /* @__PURE__ */ w(ue, {
		scope: t,
		forceMount: n,
		children: /* @__PURE__ */ w(x, {
			present: n || a.open,
			children: /* @__PURE__ */ w(f, {
				asChild: !0,
				container: i,
				children: r
			})
		})
	});
};
de.displayName = z;
var V = "MenuContent", [fe, H] = k(V), U = C.forwardRef((e, t) => {
	let n = B(V, e.__scopeMenu), { forceMount: r = n.forceMount, ...i } = e, a = N(V, e.__scopeMenu), o = F(V, e.__scopeMenu);
	return /* @__PURE__ */ w(O.Provider, {
		scope: e.__scopeMenu,
		children: /* @__PURE__ */ w(x, {
			present: r || a.open,
			children: /* @__PURE__ */ w(O.Slot, {
				scope: e.__scopeMenu,
				children: o.modal ? /* @__PURE__ */ w(pe, {
					...i,
					ref: t
				}) : /* @__PURE__ */ w(me, {
					...i,
					ref: t
				})
			})
		})
	});
}), pe = C.forwardRef((t, n) => {
	let r = N(V, t.__scopeMenu), i = C.useRef(null), a = e(n, i);
	return C.useEffect(() => {
		let e = i.current;
		if (e) return d(e);
	}, []), /* @__PURE__ */ w(W, {
		...t,
		ref: a,
		trapFocus: r.open,
		disableOutsidePointerEvents: r.open,
		disableOutsideScroll: !0,
		onFocusOutside: g(t.onFocusOutside, (e) => e.preventDefault(), { checkForDefaultPrevented: !1 }),
		onDismiss: () => r.onOpenChange(!1)
	});
}), me = C.forwardRef((e, t) => {
	let n = N(V, e.__scopeMenu);
	return /* @__PURE__ */ w(W, {
		...e,
		ref: t,
		trapFocus: !1,
		disableOutsidePointerEvents: !1,
		disableOutsideScroll: !1,
		onDismiss: () => n.onOpenChange(!1)
	});
}), he = y("MenuContent.ScrollLock"), W = C.forwardRef((t, n) => {
	let { __scopeMenu: r, loop: i = !1, trapFocus: a, onOpenAutoFocus: d, onCloseAutoFocus: f, disableOutsidePointerEvents: p, onEntryFocus: ee, onEscapeKeyDown: m, onPointerDownOutside: h, onFocusOutside: ne, onInteractOutside: _, onDismiss: v, disableOutsideScroll: y, ...b } = t, x = N(V, r), S = F(V, r), T = j(r), re = le(r), E = se(r), [oe, D] = C.useState(null), O = C.useRef(null), ce = e(n, O, x.onContentChange), k = C.useRef(0), A = C.useRef(""), M = C.useRef(0), P = C.useRef(null), I = C.useRef("right"), L = C.useRef(0), R = y ? te : C.Fragment, z = y ? {
		as: he,
		allowPinchZoom: !0
	} : void 0, ue = (e) => {
		let t = A.current + e, n = E().filter((e) => !e.disabled), r = document.activeElement, i = n.find((e) => e.ref.current === r)?.textValue, a = Ge(n.map((e) => e.textValue), t, i), o = n.find((e) => e.textValue === a)?.ref.current;
		(function e(t) {
			A.current = t, window.clearTimeout(k.current), t !== "" && (k.current = window.setTimeout(() => e(""), 1e3));
		})(t), o && setTimeout(() => o.focus());
	};
	C.useEffect(() => () => window.clearTimeout(k.current), []), s();
	let B = C.useCallback((e) => I.current === P.current?.side && qe(e, P.current?.area), []);
	return /* @__PURE__ */ w(fe, {
		scope: r,
		searchRef: A,
		onItemEnter: C.useCallback((e) => {
			B(e) && e.preventDefault();
		}, [B]),
		onItemLeave: C.useCallback((e) => {
			B(e) || (O.current?.focus(), D(null));
		}, [B]),
		onTriggerLeave: C.useCallback((e) => {
			B(e) && e.preventDefault();
		}, [B]),
		pointerGraceTimerRef: M,
		onPointerGraceIntentChange: C.useCallback((e) => {
			P.current = e;
		}, []),
		children: /* @__PURE__ */ w(R, {
			...z,
			children: /* @__PURE__ */ w(u, {
				asChild: !0,
				trapped: a,
				onMountAutoFocus: g(d, (e) => {
					e.preventDefault(), O.current?.focus({ preventScroll: !0 });
				}),
				onUnmountAutoFocus: f,
				children: /* @__PURE__ */ w(o, {
					asChild: !0,
					disableOutsidePointerEvents: p,
					onEscapeKeyDown: m,
					onPointerDownOutside: h,
					onFocusOutside: ne,
					onInteractOutside: _,
					onDismiss: v,
					children: /* @__PURE__ */ w(c, {
						asChild: !0,
						...re,
						dir: S.dir,
						orientation: "vertical",
						loop: i,
						currentTabStopId: oe,
						onCurrentTabStopIdChange: D,
						onEntryFocus: g(ee, (e) => {
							S.isUsingKeyboardRef.current || e.preventDefault();
						}),
						preventScrollOnEntryFocus: !0,
						children: /* @__PURE__ */ w(l, {
							role: "menu",
							"aria-orientation": "vertical",
							"data-state": He(x.open),
							"data-radix-menu-content": "",
							dir: S.dir,
							...T,
							...b,
							ref: ce,
							style: {
								outline: "none",
								...b.style
							},
							onKeyDown: g(b.onKeyDown, (e) => {
								let t = e.target.closest("[data-radix-menu-content]") === e.currentTarget, n = e.ctrlKey || e.altKey || e.metaKey, r = e.key.length === 1;
								t && (e.key === "Tab" && e.preventDefault(), !n && r && ue(e.key));
								let i = O.current;
								if (e.target !== i || !ae.includes(e.key)) return;
								e.preventDefault();
								let a = E().filter((e) => !e.disabled).map((e) => e.ref.current);
								ie.includes(e.key) && a.reverse(), Ue(a);
							}),
							onBlur: g(t.onBlur, (e) => {
								e.currentTarget.contains(e.target) || (window.clearTimeout(k.current), A.current = "");
							}),
							onPointerMove: g(t.onPointerMove, $((e) => {
								let t = e.target, n = L.current !== e.clientX;
								e.currentTarget.contains(t) && n && (I.current = e.clientX > L.current ? "right" : "left", L.current = e.clientX);
							}))
						})
					})
				})
			})
		})
	});
});
U.displayName = V;
var ge = "MenuGroup", G = C.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ w(_.div, {
		role: "group",
		...r,
		ref: t
	});
});
G.displayName = ge;
var _e = "MenuLabel", ve = C.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ w(_.div, {
		...r,
		ref: t
	});
});
ve.displayName = _e;
var K = "MenuItem", ye = "menu.itemSelect", q = C.forwardRef((t, n) => {
	let { disabled: r = !1, onSelect: i, ...a } = t, o = C.useRef(null), s = F(K, t.__scopeMenu), c = H(K, t.__scopeMenu), l = e(n, o), u = C.useRef(!1), d = () => {
		let e = o.current;
		if (!r && e) {
			let t = new CustomEvent(ye, {
				bubbles: !0,
				cancelable: !0
			});
			e.addEventListener(ye, (e) => i?.(e), { once: !0 }), ne(e, t), t.defaultPrevented ? u.current = !1 : s.onClose();
		}
	};
	return /* @__PURE__ */ w(be, {
		...a,
		ref: l,
		disabled: r,
		onClick: g(t.onClick, d),
		onPointerDown: (e) => {
			t.onPointerDown?.(e), u.current = !0;
		},
		onPointerUp: g(t.onPointerUp, (e) => {
			u.current || e.currentTarget?.click();
		}),
		onKeyDown: g(t.onKeyDown, (e) => {
			let t = c.searchRef.current !== "";
			r || t && e.key === " " || T.includes(e.key) && (e.currentTarget.click(), e.preventDefault());
		})
	});
});
q.displayName = K;
var be = C.forwardRef((t, n) => {
	let { __scopeMenu: r, disabled: i = !1, textValue: a, ...o } = t, s = H(K, r), c = le(r), l = C.useRef(null), u = e(n, l), [d, f] = C.useState(!1), [p, m] = C.useState("");
	return C.useEffect(() => {
		let e = l.current;
		e && m((e.textContent ?? "").trim());
	}, [o.children]), /* @__PURE__ */ w(O.ItemSlot, {
		scope: r,
		disabled: i,
		textValue: a ?? p,
		children: /* @__PURE__ */ w(ee, {
			asChild: !0,
			...c,
			focusable: !i,
			children: /* @__PURE__ */ w(_.div, {
				role: "menuitem",
				"data-highlighted": d ? "" : void 0,
				"aria-disabled": i || void 0,
				"data-disabled": i ? "" : void 0,
				...o,
				ref: u,
				onPointerMove: g(t.onPointerMove, $((e) => {
					i ? s.onItemLeave(e) : (s.onItemEnter(e), e.defaultPrevented || e.currentTarget.focus({ preventScroll: !0 }));
				})),
				onPointerLeave: g(t.onPointerLeave, $((e) => s.onItemLeave(e))),
				onFocus: g(t.onFocus, () => f(!0)),
				onBlur: g(t.onBlur, () => f(!1))
			})
		})
	});
}), xe = "MenuCheckboxItem", Se = C.forwardRef((e, t) => {
	let { checked: n = !1, onCheckedChange: r, ...i } = e;
	return /* @__PURE__ */ w(ke, {
		scope: e.__scopeMenu,
		checked: n,
		children: /* @__PURE__ */ w(q, {
			role: "menuitemcheckbox",
			"aria-checked": Z(n) ? "mixed" : n,
			...i,
			ref: t,
			"data-state": Q(n),
			onSelect: g(i.onSelect, () => r?.(Z(n) ? !0 : !n), { checkForDefaultPrevented: !1 })
		})
	});
});
Se.displayName = xe;
var Ce = "MenuRadioGroup", [we, Te] = k(Ce, {
	value: void 0,
	onValueChange: () => {}
}), Ee = C.forwardRef((e, t) => {
	let { value: n, onValueChange: r, ...i } = e, a = v(r);
	return /* @__PURE__ */ w(we, {
		scope: e.__scopeMenu,
		value: n,
		onValueChange: a,
		children: /* @__PURE__ */ w(G, {
			...i,
			ref: t
		})
	});
});
Ee.displayName = Ce;
var De = "MenuRadioItem", Oe = C.forwardRef((e, t) => {
	let { value: n, ...r } = e, i = Te(De, e.__scopeMenu), a = n === i.value;
	return /* @__PURE__ */ w(ke, {
		scope: e.__scopeMenu,
		checked: a,
		children: /* @__PURE__ */ w(q, {
			role: "menuitemradio",
			"aria-checked": a,
			...r,
			ref: t,
			"data-state": Q(a),
			onSelect: g(r.onSelect, () => i.onValueChange?.(n), { checkForDefaultPrevented: !1 })
		})
	});
});
Oe.displayName = De;
var J = "MenuItemIndicator", [ke, Ae] = k(J, { checked: !1 }), je = C.forwardRef((e, t) => {
	let { __scopeMenu: n, forceMount: r, ...i } = e, a = Ae(J, n);
	return /* @__PURE__ */ w(x, {
		present: r || Z(a.checked) || a.checked === !0,
		children: /* @__PURE__ */ w(_.span, {
			...i,
			ref: t,
			"data-state": Q(a.checked)
		})
	});
});
je.displayName = J;
var Me = "MenuSeparator", Ne = C.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ w(_.div, {
		role: "separator",
		"aria-orientation": "horizontal",
		...r,
		ref: t
	});
});
Ne.displayName = Me;
var Pe = "MenuArrow", Fe = C.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ w(i, {
		...j(n),
		...r,
		ref: t
	});
});
Fe.displayName = Pe;
var Y = "MenuSub", [Ie, Le] = k(Y), Re = (e) => {
	let { __scopeMenu: t, children: n, open: r = !1, onOpenChange: i } = e, a = N(Y, t), o = j(t), [s, c] = C.useState(null), [l, u] = C.useState(null), d = v(i);
	return C.useEffect(() => (a.open === !1 && d(!1), () => d(!1)), [a.open, d]), /* @__PURE__ */ w(h, {
		...o,
		children: /* @__PURE__ */ w(M, {
			scope: t,
			open: r,
			onOpenChange: d,
			content: l,
			onContentChange: u,
			children: /* @__PURE__ */ w(Ie, {
				scope: t,
				contentId: p(),
				triggerId: p(),
				trigger: s,
				onTriggerChange: c,
				children: n
			})
		})
	});
};
Re.displayName = Y;
var X = "MenuSubTrigger", ze = C.forwardRef((e, n) => {
	let r = N(X, e.__scopeMenu), i = F(X, e.__scopeMenu), a = Le(X, e.__scopeMenu), o = H(X, e.__scopeMenu), s = C.useRef(null), { pointerGraceTimerRef: c, onPointerGraceIntentChange: l } = o, u = { __scopeMenu: e.__scopeMenu }, d = C.useCallback(() => {
		s.current && window.clearTimeout(s.current), s.current = null;
	}, []);
	return C.useEffect(() => d, [d]), C.useEffect(() => {
		let e = c.current;
		return () => {
			window.clearTimeout(e), l(null);
		};
	}, [c, l]), /* @__PURE__ */ w(R, {
		asChild: !0,
		...u,
		children: /* @__PURE__ */ w(be, {
			id: a.triggerId,
			"aria-haspopup": "menu",
			"aria-expanded": r.open,
			"aria-controls": a.contentId,
			"data-state": He(r.open),
			...e,
			ref: t(n, a.onTriggerChange),
			onClick: (t) => {
				e.onClick?.(t), !(e.disabled || t.defaultPrevented) && (t.currentTarget.focus(), r.open || r.onOpenChange(!0));
			},
			onPointerMove: g(e.onPointerMove, $((t) => {
				o.onItemEnter(t), !t.defaultPrevented && !e.disabled && !r.open && !s.current && (o.onPointerGraceIntentChange(null), s.current = window.setTimeout(() => {
					r.onOpenChange(!0), d();
				}, 100));
			})),
			onPointerLeave: g(e.onPointerLeave, $((e) => {
				d();
				let t = r.content?.getBoundingClientRect();
				if (t) {
					let n = r.content?.dataset.side, i = n === "right", a = i ? -5 : 5, s = t[i ? "left" : "right"], l = t[i ? "right" : "left"];
					o.onPointerGraceIntentChange({
						area: [
							{
								x: e.clientX + a,
								y: e.clientY
							},
							{
								x: s,
								y: t.top
							},
							{
								x: l,
								y: t.top
							},
							{
								x: l,
								y: t.bottom
							},
							{
								x: s,
								y: t.bottom
							}
						],
						side: n
					}), window.clearTimeout(c.current), c.current = window.setTimeout(() => o.onPointerGraceIntentChange(null), 300);
				} else {
					if (o.onTriggerLeave(e), e.defaultPrevented) return;
					o.onPointerGraceIntentChange(null);
				}
			})),
			onKeyDown: g(e.onKeyDown, (t) => {
				let n = o.searchRef.current !== "";
				e.disabled || n && t.key === " " || E[i.dir].includes(t.key) && (r.onOpenChange(!0), r.content?.focus(), t.preventDefault());
			})
		})
	});
});
ze.displayName = X;
var Be = "MenuSubContent", Ve = C.forwardRef((t, n) => {
	let r = B(V, t.__scopeMenu), { forceMount: i = r.forceMount, ...a } = t, o = N(V, t.__scopeMenu), s = F(V, t.__scopeMenu), c = Le(Be, t.__scopeMenu), l = C.useRef(null), u = e(n, l);
	return /* @__PURE__ */ w(O.Provider, {
		scope: t.__scopeMenu,
		children: /* @__PURE__ */ w(x, {
			present: i || o.open,
			children: /* @__PURE__ */ w(O.Slot, {
				scope: t.__scopeMenu,
				children: /* @__PURE__ */ w(W, {
					id: c.contentId,
					"aria-labelledby": c.triggerId,
					...a,
					ref: u,
					align: "start",
					side: s.dir === "rtl" ? "left" : "right",
					disableOutsidePointerEvents: !1,
					disableOutsideScroll: !1,
					trapFocus: !1,
					onOpenAutoFocus: (e) => {
						s.isUsingKeyboardRef.current && l.current?.focus(), e.preventDefault();
					},
					onCloseAutoFocus: (e) => e.preventDefault(),
					onFocusOutside: g(t.onFocusOutside, (e) => {
						e.target !== c.trigger && o.onOpenChange(!1);
					}),
					onEscapeKeyDown: g(t.onEscapeKeyDown, (e) => {
						s.onClose(), e.preventDefault();
					}),
					onKeyDown: g(t.onKeyDown, (e) => {
						let t = e.currentTarget.contains(e.target), n = oe[s.dir].includes(e.key);
						t && n && (o.onOpenChange(!1), c.trigger?.focus(), e.preventDefault());
					})
				})
			})
		})
	});
});
Ve.displayName = Be;
function He(e) {
	return e ? "open" : "closed";
}
function Z(e) {
	return e === "indeterminate";
}
function Q(e) {
	return Z(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function Ue(e) {
	let t = document.activeElement;
	for (let n of e) if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function We(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
function Ge(e, t, n) {
	let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1, a = We(e, Math.max(i, 0));
	r.length === 1 && (a = a.filter((e) => e !== n));
	let o = a.find((e) => e.toLowerCase().startsWith(r.toLowerCase()));
	return o === n ? void 0 : o;
}
function Ke(e, t) {
	let { x: n, y: r } = e, i = !1;
	for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
		let o = t[e], s = t[a], c = o.x, l = o.y, u = s.x, d = s.y;
		l > r != d > r && n < (u - c) * (r - l) / (d - l) + c && (i = !i);
	}
	return i;
}
function qe(e, t) {
	return t ? Ke({
		x: e.clientX,
		y: e.clientY
	}, t) : !1;
}
function $(e) {
	return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var Je = I, Ye = R, Xe = de, Ze = U, Qe = G, $e = ve, et = q, tt = Se, nt = Ee, rt = Oe, it = je, at = Ne, ot = Fe, st = Re, ct = ze, lt = Ve;
//#endregion
export { A as _, Qe as a, $e as c, rt as d, Je as f, ct as g, lt as h, Ze as i, Xe as l, st as m, ot as n, et as o, at as p, tt as r, it as s, Ye as t, nt as u };

//# sourceMappingURL=dist-WFcEkA-O.js.map