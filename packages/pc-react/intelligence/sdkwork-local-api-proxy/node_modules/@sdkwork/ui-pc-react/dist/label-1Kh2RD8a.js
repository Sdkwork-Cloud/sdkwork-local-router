import { t as e } from "./utils-Bgb-Nm-x.js";
import { t } from "./createLucideIcon-DYUOEYxe.js";
import { t as n } from "./dist-z6084cel.js";
import * as r from "react";
import { jsx as i } from "react/jsx-runtime";
var a = t("rotate-ccw", [["path", {
	d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
	key: "1357e3"
}], ["path", {
	d: "M3 3v5h5",
	key: "1xhq8a"
}]]), o = "Label", s = r.forwardRef((e, t) => /* @__PURE__ */ i(n.label, {
	...e,
	ref: t,
	onMouseDown: (t) => {
		t.target.closest("button, input, select, textarea") || (e.onMouseDown?.(t), !t.defaultPrevented && t.detail > 1 && t.preventDefault());
	}
}));
s.displayName = o;
var c = s, l = r.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ i(c, {
	ref: r,
	className: e("text-sm font-medium text-[var(--sdk-color-text-primary)]", t),
	"data-sdk-ui": "label",
	"data-slot": "label",
	...n
}));
l.displayName = "Label";
//#endregion
export { a as n, l as t };

//# sourceMappingURL=label-1Kh2RD8a.js.map