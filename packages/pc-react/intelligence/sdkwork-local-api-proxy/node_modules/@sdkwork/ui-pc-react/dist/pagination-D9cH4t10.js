import { t as e } from "./utils-Bgb-Nm-x.js";
import { n as t } from "./button-DW2aECbt.js";
import { t as n } from "./createLucideIcon-DYUOEYxe.js";
import { t as r } from "./chevron-right-C2amLX5H.js";
import * as i from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
var s = n("chevron-left", [["path", {
	d: "m15 18-6-6 6-6",
	key: "1wnfg3"
}]]), c = n("ellipsis", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "1",
		key: "41hilf"
	}],
	["circle", {
		cx: "19",
		cy: "12",
		r: "1",
		key: "1wjl8i"
	}],
	["circle", {
		cx: "5",
		cy: "12",
		r: "1",
		key: "1pcz8c"
	}]
]), l = i.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ a("nav", {
	ref: r,
	"aria-label": "pagination",
	className: e("mx-auto flex w-full justify-center", t),
	"data-sdk-ui": "pagination",
	"data-slot": "pagination",
	role: "navigation",
	...n
}));
l.displayName = "Pagination";
var u = i.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ a("ul", {
	ref: r,
	className: e("flex flex-row items-center gap-1", t),
	"data-sdk-ui": "pagination-content",
	"data-slot": "pagination-content",
	...n
}));
u.displayName = "PaginationContent";
var d = i.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ a("li", {
	ref: r,
	className: e("", t),
	"data-sdk-ui": "pagination-item",
	"data-slot": "pagination-item",
	...n
}));
d.displayName = "PaginationItem";
var f = i.forwardRef(({ className: n, isActive: r, size: i = "sm", ...o }, s) => /* @__PURE__ */ a("a", {
	ref: s,
	"aria-current": r ? "page" : void 0,
	className: e(t({
		size: i,
		variant: r ? "outline" : "ghost"
	}), "h-9 min-w-9 rounded-[var(--sdk-radius-field)] px-3", n),
	"data-sdk-ui": "pagination-link",
	"data-slot": "pagination-link",
	...o
}));
f.displayName = "PaginationLink";
var p = ({ className: t, ...n }) => /* @__PURE__ */ o(f, {
	"aria-label": "Previous page",
	className: e("gap-1.5 rounded-[var(--sdk-radius-field)] px-3", t),
	"data-sdk-ui": "pagination-previous",
	"data-slot": "pagination-previous",
	size: "sm",
	...n,
	children: [/* @__PURE__ */ a(s, { className: "h-4 w-4" }), /* @__PURE__ */ a("span", { children: "Previous" })]
});
p.displayName = "PaginationPrevious";
var m = ({ className: t, ...n }) => /* @__PURE__ */ o(f, {
	"aria-label": "Next page",
	className: e("gap-1.5 rounded-[var(--sdk-radius-field)] px-3", t),
	"data-sdk-ui": "pagination-next",
	"data-slot": "pagination-next",
	size: "sm",
	...n,
	children: [/* @__PURE__ */ a("span", { children: "Next" }), /* @__PURE__ */ a(r, { className: "h-4 w-4" })]
});
m.displayName = "PaginationNext";
var h = i.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ o("span", {
	ref: r,
	"aria-hidden": "true",
	className: e("flex h-9 w-9 items-center justify-center rounded-[var(--sdk-radius-field)] text-[var(--sdk-color-text-muted)]", t),
	"data-sdk-ui": "pagination-ellipsis",
	"data-slot": "pagination-ellipsis",
	...n,
	children: [/* @__PURE__ */ a(c, { className: "h-4 w-4" }), /* @__PURE__ */ a("span", {
		className: "sr-only",
		children: "More pages"
	})]
}));
h.displayName = "PaginationEllipsis";
//#endregion
export { f as a, c, d as i, u as n, m as o, h as r, p as s, l as t };

//# sourceMappingURL=pagination-D9cH4t10.js.map