import { t as e } from "./utils-Bgb-Nm-x.js";
import { t } from "./button-DW2aECbt.js";
import { t as n } from "./inline-alert-BVD8XoaS.js";
import "react";
import { Fragment as r, jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/components/patterns/system/RestartRequiredNotice.tsx
function o({ actions: o, className: s, description: c = "Some changes will only take effect after the application restarts.", dismissLabel: l = "Later", onDismiss: u, onRestart: d, restartLabel: f = "Restart now", sticky: p = !1, title: m = "Restart required", ...h }) {
	return /* @__PURE__ */ i(n, {
		actions: o ?? (u || d ? /* @__PURE__ */ a(r, { children: [u ? /* @__PURE__ */ i(t, {
			onClick: u,
			size: "sm",
			type: "button",
			variant: "ghost",
			children: l
		}) : null, d ? /* @__PURE__ */ i(t, {
			onClick: d,
			size: "sm",
			type: "button",
			children: f
		}) : null] }) : null),
		className: e(p ? "sticky bottom-0 z-10" : null, s),
		"data-sdk-pattern": "restart-required-notice",
		"data-slot": "restart-required-notice",
		description: c,
		showIcon: !0,
		title: m,
		tone: "warning",
		...h
	});
}
o.displayName = "RestartRequiredNotice";
//#endregion
export { o as RestartRequiredNotice };

//# sourceMappingURL=patterns-system.js.map