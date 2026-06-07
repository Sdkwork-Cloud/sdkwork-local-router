import { i as e, r as t } from "./dist-CJMju1B6.js";
import * as n from "react";
import { Fragment as r, jsx as i } from "react/jsx-runtime";
import * as a from "react-dom";
typeof window < "u" && window.document && window.document.createElement;
function o(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
	return function(r) {
		if (e?.(r), n === !1 || !r.defaultPrevented) return t?.(r);
	};
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-context@1.1_9d20477d12b5887e0da6102ab9f6f0ba/node_modules/@radix-ui/react-context/dist/index.mjs
function s(e, t) {
	let r = n.createContext(t), a = (e) => {
		let { children: t, ...a } = e, o = n.useMemo(() => a, Object.values(a));
		return /* @__PURE__ */ i(r.Provider, {
			value: o,
			children: t
		});
	};
	a.displayName = e + "Provider";
	function o(i) {
		let a = n.useContext(r);
		if (a) return a;
		if (t !== void 0) return t;
		throw Error(`\`${i}\` must be used within \`${e}\``);
	}
	return [a, o];
}
function c(e, t = []) {
	let r = [];
	function a(t, a) {
		let o = n.createContext(a), s = r.length;
		r = [...r, a];
		let c = (t) => {
			let { scope: r, children: a, ...c } = t, l = r?.[e]?.[s] || o, u = n.useMemo(() => c, Object.values(c));
			return /* @__PURE__ */ i(l.Provider, {
				value: u,
				children: a
			});
		};
		c.displayName = t + "Provider";
		function l(r, i) {
			let c = i?.[e]?.[s] || o, l = n.useContext(c);
			if (l) return l;
			if (a !== void 0) return a;
			throw Error(`\`${r}\` must be used within \`${t}\``);
		}
		return [c, l];
	}
	let o = () => {
		let t = r.map((e) => n.createContext(e));
		return function(r) {
			let i = r?.[e] || t;
			return n.useMemo(() => ({ [`__scope${e}`]: {
				...r,
				[e]: i
			} }), [r, i]);
		};
	};
	return o.scopeName = e, [a, l(o, ...t)];
}
function l(...e) {
	let t = e[0];
	if (e.length === 1) return t;
	let r = () => {
		let r = e.map((e) => ({
			useScope: e(),
			scopeName: e.scopeName
		}));
		return function(e) {
			let i = r.reduce((t, { useScope: n, scopeName: r }) => {
				let i = n(e)[`__scope${r}`];
				return {
					...t,
					...i
				};
			}, {});
			return n.useMemo(() => ({ [`__scope${t.scopeName}`]: i }), [i]);
		};
	};
	return r.scopeName = t.scopeName, r;
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-use-layout-_708d085e5341e7e972968c18e6fd438e/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var u = globalThis?.document ? n.useLayoutEffect : () => {};
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-slot@1.2.3_@types+react@19.2.14_react@19.2.4/node_modules/@radix-ui/react-slot/dist/index.mjs
/* @__NO_SIDE_EFFECTS__ */
function d(e) {
	let t = /* @__PURE__ */ f(e), r = n.forwardRef((e, r) => {
		let { children: a, ...o } = e, s = n.Children.toArray(a), c = s.find(h);
		if (c) {
			let e = c.props.children, a = s.map((t) => t === c ? n.Children.count(e) > 1 ? n.Children.only(null) : n.isValidElement(e) ? e.props.children : null : t);
			return /* @__PURE__ */ i(t, {
				...o,
				ref: r,
				children: n.isValidElement(e) ? n.cloneElement(e, void 0, a) : null
			});
		}
		return /* @__PURE__ */ i(t, {
			...o,
			ref: r,
			children: a
		});
	});
	return r.displayName = `${e}.Slot`, r;
}
/* @__NO_SIDE_EFFECTS__ */
function f(e) {
	let r = n.forwardRef((e, r) => {
		let { children: i, ...a } = e;
		if (n.isValidElement(i)) {
			let e = _(i), o = g(a, i.props);
			return i.type !== n.Fragment && (o.ref = r ? t(r, e) : e), n.cloneElement(i, o);
		}
		return n.Children.count(i) > 1 ? n.Children.only(null) : null;
	});
	return r.displayName = `${e}.SlotClone`, r;
}
var p = Symbol("radix.slottable");
/* @__NO_SIDE_EFFECTS__ */
function m(e) {
	let t = ({ children: e }) => /* @__PURE__ */ i(r, { children: e });
	return t.displayName = `${e}.Slottable`, t.__radixId = p, t;
}
function h(e) {
	return n.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === p;
}
function g(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			let t = a(...e);
			return i(...e), t;
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" && (n[r] = [i, a].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
function _(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-primitive@2_1181ea5061ec9212248424669240e4ec/node_modules/@radix-ui/react-primitive/dist/index.mjs
var v = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"select",
	"span",
	"svg",
	"ul"
].reduce((e, t) => {
	let r = /* @__PURE__ */ d(`Primitive.${t}`), a = n.forwardRef((e, n) => {
		let { asChild: a, ...o } = e, s = a ? r : t;
		return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ i(s, {
			...o,
			ref: n
		});
	});
	return a.displayName = `Primitive.${t}`, {
		...e,
		[t]: a
	};
}, {});
function y(e, t) {
	e && a.flushSync(() => e.dispatchEvent(t));
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-direction@1_8c3c0b1d6382129e0851ee064b4f082d/node_modules/@radix-ui/react-direction/dist/index.mjs
var b = n.createContext(void 0);
function x(e) {
	let t = n.useContext(b);
	return e || t || "ltr";
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-use-callbac_e56a1071fabc108dc60d6f8e586ff493/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
function S(e) {
	let t = n.useRef(e);
	return n.useEffect(() => {
		t.current = e;
	}), n.useMemo(() => (...e) => t.current?.(...e), []);
}
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-presence@1._c01c26c80b5ab5e3ecefbda6eca51ad1/node_modules/@radix-ui/react-presence/dist/index.mjs
function C(e, t) {
	return n.useReducer((e, n) => t[e][n] ?? e, e);
}
var w = (t) => {
	let { present: r, children: i } = t, a = T(r), o = typeof i == "function" ? i({ present: a.isPresent }) : n.Children.only(i), s = e(a.ref, D(o));
	return typeof i == "function" || a.isPresent ? n.cloneElement(o, { ref: s }) : null;
};
w.displayName = "Presence";
function T(e) {
	let [t, r] = n.useState(), i = n.useRef(null), a = n.useRef(e), o = n.useRef("none"), [s, c] = C(e ? "mounted" : "unmounted", {
		mounted: {
			UNMOUNT: "unmounted",
			ANIMATION_OUT: "unmountSuspended"
		},
		unmountSuspended: {
			MOUNT: "mounted",
			ANIMATION_END: "unmounted"
		},
		unmounted: { MOUNT: "mounted" }
	});
	return n.useEffect(() => {
		let e = E(i.current);
		o.current = s === "mounted" ? e : "none";
	}, [s]), u(() => {
		let t = i.current, n = a.current;
		if (n !== e) {
			let r = o.current, i = E(t);
			e ? c("MOUNT") : i === "none" || t?.display === "none" ? c("UNMOUNT") : c(n && r !== i ? "ANIMATION_OUT" : "UNMOUNT"), a.current = e;
		}
	}, [e, c]), u(() => {
		if (t) {
			let e, n = t.ownerDocument.defaultView ?? window, r = (r) => {
				let o = E(i.current).includes(CSS.escape(r.animationName));
				if (r.target === t && o && (c("ANIMATION_END"), !a.current)) {
					let r = t.style.animationFillMode;
					t.style.animationFillMode = "forwards", e = n.setTimeout(() => {
						t.style.animationFillMode === "forwards" && (t.style.animationFillMode = r);
					});
				}
			}, s = (e) => {
				e.target === t && (o.current = E(i.current));
			};
			return t.addEventListener("animationstart", s), t.addEventListener("animationcancel", r), t.addEventListener("animationend", r), () => {
				n.clearTimeout(e), t.removeEventListener("animationstart", s), t.removeEventListener("animationcancel", r), t.removeEventListener("animationend", r);
			};
		} else c("ANIMATION_END");
	}, [t, c]), {
		isPresent: ["mounted", "unmountSuspended"].includes(s),
		ref: n.useCallback((e) => {
			i.current = e ? getComputedStyle(e) : null, r(e);
		}, [])
	};
}
function E(e) {
	return e?.animationName || "none";
}
function D(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
export { y as a, u as c, o as d, v as i, s as l, S as n, d as o, x as r, m as s, w as t, c as u };

//# sourceMappingURL=dist-Dedo1J3L.js.map