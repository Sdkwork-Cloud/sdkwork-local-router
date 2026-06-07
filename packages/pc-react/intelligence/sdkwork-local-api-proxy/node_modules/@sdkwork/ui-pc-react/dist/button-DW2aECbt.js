import { n as e, t } from "./utils-Bgb-Nm-x.js";
import { t as n } from "./dist-CJMju1B6.js";
import { t as r } from "./createLucideIcon-DYUOEYxe.js";
import * as i from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/class-variance-authority@0.7.1/node_modules/class-variance-authority/dist/index.mjs
var s = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, c = e, l = (e, t) => (n) => {
	if (t?.variants == null) return c(e, n?.class, n?.className);
	let { variants: r, defaultVariants: i } = t, a = Object.keys(r).map((e) => {
		let t = n?.[e], a = i?.[e];
		if (t === null) return null;
		let o = s(t) || s(a);
		return r[e][o];
	}), o = n && Object.entries(n).reduce((e, t) => {
		let [n, r] = t;
		return r === void 0 || (e[n] = r), e;
	}, {});
	return c(e, a, t?.compoundVariants?.reduce((e, t) => {
		let { class: n, className: r, ...a } = t;
		return Object.entries(a).every((e) => {
			let [t, n] = e;
			return Array.isArray(n) ? n.includes({
				...i,
				...o
			}[t]) : {
				...i,
				...o
			}[t] === n;
		}) ? [
			...e,
			n,
			r
		] : e;
	}, []), n?.class, n?.className);
}, u = r("loader-circle", [["path", {
	d: "M21 12a9 9 0 1 1-6.219-8.56",
	key: "13zald"
}]]), d = l("sdk-btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--sdk-radius-control)] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sdk-color-border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sdk-color-surface-canvas)] disabled:pointer-events-none disabled:opacity-60", {
	variants: {
		variant: {
			primary: "sdk-btn--primary bg-[var(--sdk-color-brand-primary)] text-[var(--sdk-color-text-inverse)] hover:bg-[var(--sdk-color-brand-primary-hover)]",
			secondary: "sdk-btn--secondary bg-[var(--sdk-color-surface-panel-muted)] text-[var(--sdk-color-text-primary)] hover:bg-[var(--sdk-color-surface-elevated)]",
			outline: "sdk-btn--outline border border-[var(--sdk-color-border-default)] bg-transparent text-[var(--sdk-color-text-primary)] hover:bg-[var(--sdk-color-brand-primary-soft)]",
			ghost: "sdk-btn--ghost text-[var(--sdk-color-text-secondary)] hover:bg-[var(--sdk-color-brand-primary-soft)] hover:text-[var(--sdk-color-text-primary)]",
			danger: "sdk-btn--danger bg-[var(--sdk-color-state-danger)] text-[var(--sdk-color-text-inverse)] hover:opacity-90"
		},
		size: {
			sm: "h-8 px-3 text-xs",
			default: "h-10 px-4 text-sm",
			lg: "h-11 px-5 text-sm",
			icon: "h-10 w-10"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "default"
	}
}), f = i.forwardRef(({ asChild: e = !1, className: r, children: i, disabled: s, loading: c = !1, size: l, variant: f, ...p }, m) => /* @__PURE__ */ o(e ? n : "button", {
	ref: m,
	className: t(d({
		variant: f,
		size: l
	}), r),
	"data-loading": c ? "true" : void 0,
	"data-sdk-ui": "button",
	"data-slot": "button",
	disabled: s || c,
	...p,
	children: [c ? /* @__PURE__ */ a(u, { className: "h-4 w-4 animate-spin" }) : null, i]
}));
f.displayName = "Button";
//#endregion
export { l as i, d as n, u as r, f as t };

//# sourceMappingURL=button-DW2aECbt.js.map