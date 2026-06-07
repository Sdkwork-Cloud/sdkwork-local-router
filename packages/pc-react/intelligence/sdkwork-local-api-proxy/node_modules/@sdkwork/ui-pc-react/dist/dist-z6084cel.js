import { n as e } from "./dist-CJMju1B6.js";
import * as t from "react";
import { jsx as n } from "react/jsx-runtime";
import "react-dom";
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/@radix-ui+react-primitive@2_0243fb2db8a1fb85ca77b8d9e5c2d650/node_modules/@radix-ui/react-primitive/dist/index.mjs
var r = [
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
].reduce((r, i) => {
	let a = e(`Primitive.${i}`), o = t.forwardRef((e, t) => {
		let { asChild: r, ...o } = e, s = r ? a : i;
		return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ n(s, {
			...o,
			ref: t
		});
	});
	return o.displayName = `Primitive.${i}`, {
		...r,
		[i]: o
	};
}, {});
//#endregion
export { r as t };

//# sourceMappingURL=dist-z6084cel.js.map