import { t as e } from "./utils-Bgb-Nm-x.js";
import * as t from "react";
import { jsx as n } from "react/jsx-runtime";
//#region src/components/ui/card.tsx
var r = t.forwardRef(({ className: t, ...r }, i) => /* @__PURE__ */ n("div", {
	ref: i,
	className: e("rounded-[var(--sdk-radius-panel)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] text-[var(--sdk-color-text-primary)] shadow-[var(--sdk-shadow-sm)]", t),
	"data-sdk-ui": "card",
	"data-slot": "card",
	...r
}));
r.displayName = "Card";
var i = t.forwardRef(({ className: t, ...r }, i) => /* @__PURE__ */ n("div", {
	ref: i,
	className: e("flex flex-col gap-1.5 p-6", t),
	"data-sdk-ui": "card-header",
	"data-slot": "card-header",
	...r
}));
i.displayName = "CardHeader";
var a = t.forwardRef(({ className: t, ...r }, i) => /* @__PURE__ */ n("h3", {
	ref: i,
	className: e("text-base font-semibold tracking-tight", t),
	"data-sdk-ui": "card-title",
	"data-slot": "card-title",
	...r
}));
a.displayName = "CardTitle";
var o = t.forwardRef(({ className: t, ...r }, i) => /* @__PURE__ */ n("p", {
	ref: i,
	className: e("text-sm text-[var(--sdk-color-text-secondary)]", t),
	"data-sdk-ui": "card-description",
	"data-slot": "card-description",
	...r
}));
o.displayName = "CardDescription";
var s = t.forwardRef(({ className: t, ...r }, i) => /* @__PURE__ */ n("div", {
	ref: i,
	className: e("p-6 pt-0", t),
	"data-sdk-ui": "card-content",
	"data-slot": "card-content",
	...r
}));
s.displayName = "CardContent";
var c = t.forwardRef(({ className: t, ...r }, i) => /* @__PURE__ */ n("div", {
	ref: i,
	className: e("flex items-center gap-3 p-6 pt-0", t),
	"data-sdk-ui": "card-footer",
	"data-slot": "card-footer",
	...r
}));
c.displayName = "CardFooter";
//#endregion
export { i as a, c as i, s as n, a as o, o as r, r as t };

//# sourceMappingURL=card-Ba2Qymui.js.map