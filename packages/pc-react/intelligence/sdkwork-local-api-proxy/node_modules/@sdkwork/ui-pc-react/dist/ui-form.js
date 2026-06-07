import { t as e } from "./utils-Bgb-Nm-x.js";
import { t } from "./dist-CJMju1B6.js";
import { t as n } from "./circle-alert-DLMwBG2c.js";
import { n as r, t as i } from "./label-1Kh2RD8a.js";
import * as a from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
import { Controller as c, FormProvider as l, useFormContext as u } from "react-hook-form";
//#region src/components/ui/form/filter-bar.tsx
var d = {
	start: "justify-start",
	end: "justify-start sm:ml-auto sm:justify-end"
}, f = a.forwardRef(({ children: t, className: n, description: r, summary: i, title: c, ...l }, u) => {
	let d = a.useId(), f = a.useId(), p = c ? d : l["aria-labelledby"], m = r ? f : l["aria-describedby"];
	return /* @__PURE__ */ s("section", {
		ref: u,
		"aria-describedby": m,
		"aria-labelledby": p,
		className: e("space-y-4 rounded-[var(--sdk-radius-control)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] p-4 shadow-[var(--sdk-shadow-sm)]", n),
		"data-sdk-ui": "filter-bar",
		"data-slot": "filter-bar",
		...l,
		children: [c || r || i ? /* @__PURE__ */ s("div", {
			className: "flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between",
			"data-slot": "filter-bar-header",
			children: [/* @__PURE__ */ s("div", {
				className: "space-y-1",
				children: [c ? /* @__PURE__ */ o("h3", {
					className: "text-sm font-semibold text-[var(--sdk-color-text-primary)]",
					"data-slot": "filter-bar-title",
					id: d,
					children: c
				}) : null, r ? /* @__PURE__ */ o("p", {
					className: "text-sm text-[var(--sdk-color-text-secondary)]",
					"data-slot": "filter-bar-description",
					id: f,
					children: r
				}) : null]
			}), i ? /* @__PURE__ */ o("div", {
				className: "text-sm font-medium text-[var(--sdk-color-text-secondary)]",
				"data-slot": "filter-bar-summary",
				children: i
			}) : null]
		}) : null, /* @__PURE__ */ o("div", {
			className: "flex flex-wrap items-end gap-3",
			"data-slot": "filter-bar-content",
			children: t
		})]
	});
});
f.displayName = "FilterBar";
var p = a.forwardRef(({ className: t, grow: n = !0, wrap: r = !0, ...i }, a) => /* @__PURE__ */ o("div", {
	ref: a,
	className: e("flex min-w-[12rem] items-end gap-3", n ? "flex-1" : void 0, r ? "flex-wrap" : "flex-nowrap", t),
	"data-sdk-ui": "filter-bar-section",
	"data-slot": "filter-bar-section",
	...i
}));
p.displayName = "FilterBarSection";
var m = a.forwardRef(({ className: t, justify: n = "end", ...r }, i) => /* @__PURE__ */ o("div", {
	ref: i,
	className: e("flex w-full flex-wrap items-center gap-2 sm:w-auto", d[n], t),
	"data-sdk-ui": "filter-bar-actions",
	"data-slot": "filter-bar-actions",
	...r
}));
m.displayName = "FilterBarActions";
//#endregion
//#region src/components/ui/field.tsx
var h = a.createContext({
	disabled: !1,
	invalid: !1,
	required: !1
}), g = a.forwardRef(({ className: t, disabled: n = !1, invalid: r = !1, orientation: i = "vertical", required: a = !1, ...s }, c) => /* @__PURE__ */ o(h.Provider, {
	value: {
		disabled: n,
		invalid: r,
		required: a
	},
	children: /* @__PURE__ */ o("div", {
		ref: c,
		className: e(i === "horizontal" ? "flex items-start gap-4" : "grid gap-2", t),
		"data-disabled": n ? "true" : "false",
		"data-invalid": r ? "true" : "false",
		"data-orientation": i,
		"data-required": a ? "true" : "false",
		"data-sdk-ui": "field",
		"data-slot": "field",
		...s
	})
})), _ = a.forwardRef(({ children: t, className: n, ...r }, c) => {
	let { disabled: l, invalid: u, required: d } = a.useContext(h);
	return /* @__PURE__ */ o(i, {
		ref: c,
		className: e(u ? "text-[var(--sdk-color-state-danger)]" : void 0, l ? "opacity-60" : void 0, n),
		"data-disabled": l ? "true" : "false",
		"data-invalid": u ? "true" : "false",
		"data-required": d ? "true" : "false",
		"data-sdk-ui": "field-label",
		"data-slot": "field-label",
		...r,
		children: /* @__PURE__ */ s("span", {
			className: "inline-flex items-center gap-1.5",
			children: [/* @__PURE__ */ o("span", { children: t }), d ? /* @__PURE__ */ o("span", {
				"aria-hidden": "true",
				className: "text-[var(--sdk-color-state-danger)]",
				children: "*"
			}) : null]
		})
	});
}), v = a.forwardRef(({ className: t, ...n }, r) => {
	let { disabled: i } = a.useContext(h);
	return /* @__PURE__ */ o("p", {
		ref: r,
		className: e("text-sm text-[var(--sdk-color-text-secondary)]", i ? "opacity-60" : void 0, t),
		"data-disabled": i ? "true" : "false",
		"data-sdk-ui": "field-description",
		"data-slot": "field-description",
		...n
	});
}), y = a.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ o("p", {
	ref: r,
	className: e("text-sm font-medium text-[var(--sdk-color-state-danger)]", t),
	"data-sdk-ui": "field-error",
	"data-slot": "field-error",
	...n
})), b = a.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ o("div", {
	ref: r,
	className: e("grid gap-2", t),
	"data-sdk-ui": "field-group",
	"data-slot": "field-group",
	...n
}));
g.displayName = "Field", v.displayName = "FieldDescription", y.displayName = "FieldError", b.displayName = "FieldGroup", _.displayName = "FieldLabel";
//#endregion
//#region src/components/ui/form/form.tsx
var x = l, S = a.createContext(void 0), C = a.createContext(void 0), w = (e) => /* @__PURE__ */ o(S.Provider, {
	value: { name: e.name },
	children: /* @__PURE__ */ o(c, { ...e })
});
function T() {
	let e = a.useContext(S), t = a.useContext(C), { getFieldState: n, formState: r } = u();
	if (!e) throw Error("useFormField must be used within <FormField>.");
	if (!t) throw Error("useFormField must be used within <FormItem>.");
	let i = n(e.name, r), { id: o } = t;
	return {
		id: o,
		name: e.name,
		formDescriptionId: `${o}-description`,
		formItemId: `${o}-item`,
		formMessageId: `${o}-message`,
		...i
	};
}
var E = a.forwardRef(({ children: t, className: n, ...r }, i) => {
	let s = a.useId(), c = a.useContext(S), { getFieldState: l, formState: d } = u(), f = c ? l(c.name, d).error : void 0;
	return /* @__PURE__ */ o(C.Provider, {
		value: { id: s },
		children: /* @__PURE__ */ o("div", {
			ref: i,
			className: e(n),
			"data-sdk-ui": "form-item",
			...r,
			children: /* @__PURE__ */ o(g, {
				invalid: !!f,
				children: t
			})
		})
	});
});
E.displayName = "FormItem";
var D = a.forwardRef(({ className: t, ...n }, r) => {
	let { error: i, formItemId: a } = T();
	return /* @__PURE__ */ o(_, {
		ref: r,
		className: e(i ? "text-[var(--sdk-color-state-danger)]" : void 0, t),
		"data-sdk-ui": "form-label",
		htmlFor: a,
		...n
	});
});
D.displayName = "FormLabel";
var O = a.forwardRef(({ ...e }, n) => {
	let { error: r, formDescriptionId: i, formItemId: a, formMessageId: s } = T();
	return /* @__PURE__ */ o(t, {
		ref: n,
		"aria-describedby": r ? `${i} ${s}` : i,
		"aria-invalid": r ? "true" : "false",
		"data-sdk-ui": "form-control",
		"data-slot": "form-control",
		id: a,
		...e
	});
});
O.displayName = "FormControl";
var k = a.forwardRef(({ className: e, ...t }, n) => {
	let { formDescriptionId: r } = T();
	return /* @__PURE__ */ o(v, {
		ref: n,
		className: e,
		"data-sdk-ui": "form-description",
		id: r,
		...t
	});
});
k.displayName = "FormDescription";
var A = a.forwardRef(({ children: e, className: t, ...n }, r) => {
	let { error: i, formMessageId: a } = T(), s = i?.message ? String(i.message) : e;
	return s ? /* @__PURE__ */ o(y, {
		ref: r,
		className: t,
		"data-sdk-ui": "form-message",
		id: a,
		...n,
		children: s
	}) : null;
});
A.displayName = "FormMessage", x.displayName = "Form", w.displayName = "FormField";
//#endregion
//#region src/components/ui/form/form-layout.tsx
var j = {
	1: "grid-cols-1",
	2: "grid-cols-1 xl:grid-cols-2",
	3: "grid-cols-1 xl:grid-cols-3"
}, M = a.forwardRef(({ actions: t, children: n, className: r, description: i, title: c, ...l }, u) => {
	let d = a.useId(), f = a.useId(), p = c ? d : l["aria-labelledby"], m = i ? f : l["aria-describedby"];
	return /* @__PURE__ */ s("section", {
		ref: u,
		"aria-describedby": m,
		"aria-labelledby": p,
		className: e("space-y-6 rounded-[var(--sdk-radius-control)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] p-6 shadow-[var(--sdk-shadow-sm)]", r),
		"data-sdk-ui": "form-section",
		"data-slot": "form-section",
		...l,
		children: [c || i || t ? /* @__PURE__ */ s("div", {
			className: "flex flex-col gap-4 border-b border-[var(--sdk-color-border-subtle)] pb-5 xl:flex-row xl:items-start xl:justify-between",
			"data-slot": "form-section-header",
			children: [/* @__PURE__ */ s("div", {
				className: "space-y-1.5",
				children: [c ? /* @__PURE__ */ o("h3", {
					className: "text-base font-semibold text-[var(--sdk-color-text-primary)]",
					"data-slot": "form-section-title",
					id: d,
					children: c
				}) : null, i ? /* @__PURE__ */ o("p", {
					className: "max-w-3xl text-sm text-[var(--sdk-color-text-secondary)]",
					"data-slot": "form-section-description",
					id: f,
					children: i
				}) : null]
			}), t ? /* @__PURE__ */ o("div", {
				className: "flex items-center gap-3",
				"data-slot": "form-section-actions",
				children: t
			}) : null]
		}) : null, /* @__PURE__ */ o("div", {
			className: "space-y-6",
			"data-slot": "form-section-content",
			children: n
		})]
	});
});
M.displayName = "FormSection";
var N = a.forwardRef(({ children: t, className: n, columns: r = 2, ...i }, a) => /* @__PURE__ */ o("div", {
	ref: a,
	className: e("grid gap-4 xl:gap-6", j[r], n),
	"data-sdk-ui": "form-grid",
	"data-slot": "form-grid",
	...i,
	children: t
}));
N.displayName = "FormGrid";
var P = a.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ o("div", {
	ref: r,
	className: e("flex flex-col-reverse gap-3 border-t border-[var(--sdk-color-border-subtle)] pt-5 sm:flex-row sm:items-center sm:justify-end", t),
	"data-sdk-ui": "form-actions",
	"data-slot": "form-actions",
	...n
}));
P.displayName = "FormActions";
//#endregion
//#region src/components/ui/form/settings-field.tsx
var F = a.forwardRef(({ actions: t, children: i, className: c, controlId: l, description: u, error: d, isModified: f = !1, label: p, layout: m = "horizontal", onReset: h, resetLabel: g = "Reset setting", ..._ }, v) => {
	let y = a.useId(), b = a.useId(), x = m === "vertical";
	return /* @__PURE__ */ s("div", {
		ref: v,
		className: e("group relative rounded-[var(--sdk-radius-control)] p-1.5 transition-colors", x ? "flex flex-col gap-3" : "flex items-start gap-6", c),
		"data-layout": m,
		"data-modified": f ? "true" : "false",
		"data-sdk-ui": "settings-field",
		"data-slot": "settings-field",
		..._,
		children: [
			/* @__PURE__ */ o("span", {
				"aria-hidden": "true",
				className: e("absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full transition-opacity", f ? "bg-[var(--sdk-color-brand-primary)] opacity-100" : "bg-transparent opacity-0")
			}),
			p || u || d ? /* @__PURE__ */ s("div", {
				className: e("min-w-0", x ? "w-full" : "max-w-[40%] flex-1 pt-2"),
				children: [
					p ? l ? /* @__PURE__ */ o("label", {
						className: e("block text-sm font-medium leading-none", d ? "text-[var(--sdk-color-state-danger)]" : "text-[var(--sdk-color-text-primary)]"),
						"data-slot": "settings-field-label",
						htmlFor: l,
						children: p
					}) : /* @__PURE__ */ o("div", {
						className: e("text-sm font-medium leading-none", d ? "text-[var(--sdk-color-state-danger)]" : "text-[var(--sdk-color-text-primary)]"),
						"data-slot": "settings-field-label",
						children: p
					}) : null,
					u ? /* @__PURE__ */ o("div", {
						className: "mt-1.5 text-xs leading-relaxed text-[var(--sdk-color-text-secondary)]",
						"data-slot": "settings-field-description",
						id: y,
						children: u
					}) : null,
					d ? /* @__PURE__ */ s("div", {
						className: "mt-2 flex items-center gap-1.5 text-xs font-medium text-[var(--sdk-color-state-danger)]",
						"data-slot": "settings-field-error",
						id: b,
						role: "alert",
						children: [/* @__PURE__ */ o(n, { className: "h-3.5 w-3.5 shrink-0" }), /* @__PURE__ */ o("span", { children: d })]
					}) : null
				]
			}) : null,
			/* @__PURE__ */ s("div", {
				className: e("flex min-w-0 items-start gap-2", x ? "w-full" : "flex-1 justify-end"),
				"data-slot": "settings-field-control-row",
				children: [
					/* @__PURE__ */ o("div", {
						"aria-describedby": u ? y : void 0,
						"aria-errormessage": d ? b : void 0,
						className: e("min-w-0", x ? "w-full" : "w-full max-w-[32rem]"),
						"data-slot": "settings-field-control",
						children: i
					}),
					t ? /* @__PURE__ */ o("div", {
						className: "flex shrink-0 items-center gap-1 pt-1",
						"data-slot": "settings-field-actions",
						children: t
					}) : null,
					h ? /* @__PURE__ */ o("button", {
						"aria-label": g,
						className: e("shrink-0 rounded-full p-1 text-[var(--sdk-color-text-muted)] transition-colors", f ? "opacity-100 hover:bg-[var(--sdk-color-brand-primary-soft)] hover:text-[var(--sdk-color-brand-primary)]" : "pointer-events-none opacity-0"),
						"data-slot": "settings-field-reset-button",
						onClick: h,
						type: "button",
						children: /* @__PURE__ */ o(r, { className: "h-3.5 w-3.5" })
					}) : null
				]
			})
		]
	});
});
F.displayName = "SettingsField";
//#endregion
//#region src/components/ui/form/settings-section.tsx
var I = a.forwardRef(({ actions: t, children: n, className: r, description: i, title: c, ...l }, u) => {
	let d = a.useId(), f = a.useId();
	return /* @__PURE__ */ s("section", {
		ref: u,
		"aria-describedby": i ? f : void 0,
		"aria-labelledby": c ? d : void 0,
		className: e("space-y-4", r),
		"data-sdk-ui": "settings-section",
		"data-slot": "settings-section",
		...l,
		children: [c || i || t ? /* @__PURE__ */ s("div", {
			className: "flex flex-col gap-3 border-b border-[var(--sdk-color-border-subtle)] pb-3 sm:flex-row sm:items-start sm:justify-between",
			"data-slot": "settings-section-header",
			children: [/* @__PURE__ */ s("div", {
				className: "min-w-0",
				children: [c ? /* @__PURE__ */ o("h3", {
					className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--sdk-color-text-muted)]",
					"data-slot": "settings-section-title",
					id: d,
					children: c
				}) : null, i ? /* @__PURE__ */ o("p", {
					className: "mt-2 max-w-3xl text-sm text-[var(--sdk-color-text-secondary)]",
					"data-slot": "settings-section-description",
					id: f,
					children: i
				}) : null]
			}), t ? /* @__PURE__ */ o("div", {
				className: "flex shrink-0 items-center gap-2",
				"data-slot": "settings-section-actions",
				children: t
			}) : null]
		}) : null, /* @__PURE__ */ o("div", {
			className: "space-y-3",
			"data-slot": "settings-section-content",
			children: n
		})]
	});
});
I.displayName = "SettingsSection";
//#endregion
export { g as Field, v as FieldDescription, y as FieldError, b as FieldGroup, _ as FieldLabel, f as FilterBar, m as FilterBarActions, p as FilterBarSection, x as Form, P as FormActions, O as FormControl, k as FormDescription, w as FormField, N as FormGrid, E as FormItem, D as FormLabel, A as FormMessage, M as FormSection, F as SettingsField, I as SettingsSection, T as useFormField };

//# sourceMappingURL=ui-form.js.map