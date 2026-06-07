import { t as e } from "./utils-Bgb-Nm-x.js";
import { n as t } from "./slot-props-Cskv9Ttd.js";
import { a as n, i as r, l as i, n as a, o, r as s, s as c } from "./command-D6lVPN-3.js";
import { l } from "./dialog-t77bVQJv.js";
import * as u from "react";
import { jsx as d, jsxs as f } from "react/jsx-runtime";
//#region src/components/patterns/command/SearchCommandPalette.tsx
function p(e) {
	return e == null || typeof e == "boolean" ? "" : typeof e == "string" || typeof e == "number" ? String(e) : Array.isArray(e) ? e.map(p).join(" ") : u.isValidElement(e) ? p(e.props.children) : "";
}
var m = /* @__PURE__ */ f("div", {
	className: "flex flex-wrap items-center gap-3 border-t border-[var(--sdk-color-border-default)] px-4 py-3 text-xs text-[var(--sdk-color-text-secondary)]",
	children: [
		/* @__PURE__ */ f("span", {
			className: "inline-flex items-center gap-1",
			children: [
				/* @__PURE__ */ d("kbd", {
					className: "rounded border border-[var(--sdk-color-border-default)] px-1.5 py-0.5 text-[10px]",
					children: "↑"
				}),
				/* @__PURE__ */ d("kbd", {
					className: "rounded border border-[var(--sdk-color-border-default)] px-1.5 py-0.5 text-[10px]",
					children: "↓"
				}),
				"Navigate"
			]
		}),
		/* @__PURE__ */ f("span", {
			className: "inline-flex items-center gap-1",
			children: [/* @__PURE__ */ d("kbd", {
				className: "rounded border border-[var(--sdk-color-border-default)] px-1.5 py-0.5 text-[10px]",
				children: "Enter"
			}), "Run"]
		}),
		/* @__PURE__ */ f("span", {
			className: "inline-flex items-center gap-1",
			children: [/* @__PURE__ */ d("kbd", {
				className: "rounded border border-[var(--sdk-color-border-default)] px-1.5 py-0.5 text-[10px]",
				children: "Esc"
			}), "Close"]
		})
	]
});
function h({ closeOnSelect: u = !0, emptyState: h, footer: g = m, groups: _, onItemSelect: v, onOpenChange: y, onSearchValueChange: b, placeholder: x = "Search commands", searchValue: S, slotProps: C, title: w = "Search command palette", ...T }) {
	return /* @__PURE__ */ f(a, {
		onOpenChange: y,
		slotProps: { content: t({
			"data-sdk-pattern": "search-command-palette",
			"data-slot": "search-command-palette"
		}, C?.content) },
		...T,
		children: [
			/* @__PURE__ */ d(l, {
				className: "sr-only",
				children: w
			}),
			/* @__PURE__ */ d(n, {
				onValueChange: b,
				placeholder: x,
				value: S
			}),
			/* @__PURE__ */ f(c, { children: [h ?? /* @__PURE__ */ d(s, { children: "No matching commands." }), _.map((e) => /* @__PURE__ */ d(r, {
				heading: e.heading,
				children: e.items.map((e) => /* @__PURE__ */ f(o, {
					disabled: e.disabled,
					keywords: e.keywords,
					onSelect: () => {
						v?.(e), u && y?.(!1);
					},
					value: e.value ?? (p(e.label) || e.id),
					children: [
						e.icon ? /* @__PURE__ */ d("span", {
							className: "shrink-0 text-[var(--sdk-color-text-muted)]",
							children: e.icon
						}) : null,
						/* @__PURE__ */ f("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ d("span", {
								className: "block truncate text-sm font-medium text-[var(--sdk-color-text-primary)]",
								children: e.label
							}), e.description ? /* @__PURE__ */ d("span", {
								className: "mt-0.5 block truncate text-xs text-[var(--sdk-color-text-secondary)]",
								children: e.description
							}) : null]
						}),
						e.shortcut ? /* @__PURE__ */ d(i, { children: e.shortcut }) : null
					]
				}, e.id))
			}, e.id ?? p(e.heading) ?? e.items[0]?.id))] }),
			g ? /* @__PURE__ */ d("div", {
				...t({
					className: e("shrink-0"),
					"data-sdk-region": "search-command-palette-footer",
					"data-slot": "search-command-palette-footer"
				}, C?.footer),
				children: g
			}) : null
		]
	});
}
h.displayName = "SearchCommandPalette";
//#endregion
export { h as SearchCommandPalette };

//# sourceMappingURL=patterns-command.js.map