import { t as e } from "./utils-Bgb-Nm-x.js";
//#region src/lib/slot-props.ts
function t(t, n) {
	let r = t, i = n;
	if (!n) return t;
	let a = r.style || i?.style ? {
		...r.style,
		...i?.style
	} : void 0;
	return {
		...t,
		...n,
		className: e(r.className, i?.className),
		style: a
	};
}
function n(e, n) {
	return e && n ? t(e, n) : n ? { ...n } : e;
}
//#endregion
export { t as n, n as t };

//# sourceMappingURL=slot-props-Cskv9Ttd.js.map