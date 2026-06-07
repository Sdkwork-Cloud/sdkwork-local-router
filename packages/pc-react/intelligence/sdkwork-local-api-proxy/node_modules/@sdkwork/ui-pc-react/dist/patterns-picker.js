import { t as e } from "./utils-Bgb-Nm-x.js";
import { n as t } from "./slot-props-Cskv9Ttd.js";
import { t as n } from "./button-DW2aECbt.js";
import { n as r, t as i } from "./states-BNaQCp-9.js";
import { s as a } from "./feedback-B1nca0uN.js";
import { b as o } from "./Combination-DHpOS5dI.js";
import { t as s } from "./inline-alert-BVD8XoaS.js";
import { i as c, r as l, t as u } from "./popover-CJHbP2uA.js";
import { a as d, c as f, d as p, n as m, o as h, s as g } from "./overlays-Bdc2fkCy.js";
import * as _ from "react";
import { Fragment as v, jsx as y, jsxs as b } from "react/jsx-runtime";
//#region src/components/patterns/picker/AnchoredPickerSurface.tsx
var x = {
	sm: "w-[min(92vw,20rem)]",
	md: "w-[min(92vw,28rem)]",
	lg: "w-[min(92vw,36rem)]",
	xl: "w-[min(92vw,44rem)]"
}, S = _.forwardRef(({ actions: n, align: i = "start", alignOffset: o, avoidCollisions: d, badge: f, bodyScrollable: p = !0, children: m, className: h, collisionPadding: g = 12, defaultOpen: _ = !1, description: v, empty: S = !1, emptyAction: C, emptyDescription: w, emptyKeyword: T, emptyTitle: E, error: D, errorTitle: O = "Unable to load options", filters: k, footer: A, loading: j = !1, loadingLabel: M = "Loading options...", maxHeight: N = "min(30rem, var(--radix-popover-content-available-height, 30rem))", modal: P, onOpenChange: F, open: I, resultsSummary: L, side: R = "bottom", sideOffset: z = 8, size: B = "lg", slotProps: V, title: H, trigger: U }, W) => {
	let G = j ? /* @__PURE__ */ y(r, { label: M }) : D ? /* @__PURE__ */ y(s, {
		description: D,
		title: O,
		tone: "danger"
	}) : S ? /* @__PURE__ */ y(a, {
		actions: C,
		description: w,
		keyword: T,
		title: E
	}) : m, K = H !== void 0 || v !== void 0 || f !== void 0 || L !== void 0 || n !== void 0 || k !== void 0;
	return /* @__PURE__ */ b(u, {
		defaultOpen: _,
		modal: P,
		onOpenChange: F,
		open: I,
		children: [/* @__PURE__ */ y(c, {
			asChild: !0,
			children: U
		}), /* @__PURE__ */ y(l, {
			align: i,
			alignOffset: o,
			avoidCollisions: d,
			...t({
				className: e("overflow-hidden border-[color-mix(in_srgb,var(--sdk-color-border-default)_88%,transparent)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--sdk-color-surface-panel)_98%,white_2%)_0%,color-mix(in_srgb,var(--sdk-color-surface-panel-muted)_90%,transparent)_100%)] p-0 shadow-[var(--sdk-shadow-md)]", x[B]),
				"data-sdk-region": "anchored-picker-content",
				"data-slot": "anchored-picker-content"
			}, V?.content),
			collisionPadding: g,
			side: R,
			sideOffset: z,
			children: /* @__PURE__ */ b("div", {
				ref: W,
				...t({
					className: e("flex min-h-0 min-w-0 flex-col overflow-hidden", h),
					"data-sdk-pattern": "anchored-picker-surface",
					"data-sdk-region": "anchored-picker-surface",
					"data-slot": "anchored-picker-surface",
					style: { maxHeight: N }
				}, V?.surface),
				children: [
					K ? /* @__PURE__ */ b("div", {
						...t({
							className: "flex shrink-0 flex-col gap-3 border-b border-[color-mix(in_srgb,var(--sdk-color-border-default)_72%,transparent)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--sdk-color-surface-panel)_96%,white_4%)_0%,color-mix(in_srgb,var(--sdk-color-surface-panel-muted)_88%,transparent)_100%)] px-4 py-3",
							"data-sdk-region": "anchored-picker-header",
							"data-slot": "anchored-picker-header"
						}, V?.header),
						children: [H !== void 0 || v !== void 0 || f !== void 0 || L !== void 0 || n !== void 0 ? /* @__PURE__ */ b("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ b("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ b("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										H ? /* @__PURE__ */ y("div", {
											className: "text-sm font-semibold tracking-tight text-[var(--sdk-color-text-primary)]",
											"data-slot": "anchored-picker-title",
											children: H
										}) : null,
										f ? /* @__PURE__ */ y("div", {
											className: "shrink-0",
											children: f
										}) : null,
										L ? /* @__PURE__ */ y("div", {
											className: "text-xs font-medium text-[var(--sdk-color-text-secondary)]",
											"data-slot": "anchored-picker-results-summary",
											children: L
										}) : null
									]
								}), v ? /* @__PURE__ */ y("div", {
									className: "mt-1.5 text-xs leading-5 text-[var(--sdk-color-text-secondary)]",
									"data-slot": "anchored-picker-description",
									children: v
								}) : null]
							}), n ? /* @__PURE__ */ y("div", {
								className: "flex shrink-0 items-center gap-2",
								"data-slot": "anchored-picker-actions",
								children: n
							}) : null]
						}) : null, k ? /* @__PURE__ */ y("div", {
							...t({
								className: "flex flex-wrap items-center gap-2 rounded-[var(--sdk-radius-panel)] border border-[color-mix(in_srgb,var(--sdk-color-border-default)_72%,transparent)] bg-[color-mix(in_srgb,var(--sdk-color-surface-panel-muted)_88%,transparent)] px-3 py-2.5",
								"data-sdk-region": "anchored-picker-filters",
								"data-slot": "anchored-picker-filters"
							}, V?.filters),
							children: k
						}) : null]
					}) : null,
					/* @__PURE__ */ y("div", {
						...t({
							className: e("min-h-0 min-w-0 flex-1 px-3 py-3", p ? "overflow-y-auto" : "overflow-hidden"),
							"data-sdk-region": "anchored-picker-body",
							"data-slot": "anchored-picker-body"
						}, V?.body),
						children: G
					}),
					A ? /* @__PURE__ */ y("div", {
						...t({
							className: "shrink-0 border-t border-[color-mix(in_srgb,var(--sdk-color-border-default)_72%,transparent)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--sdk-color-surface-panel)_94%,white_4%)_0%,color-mix(in_srgb,var(--sdk-color-surface-panel-muted)_88%,transparent)_100%)] px-4 py-3",
							"data-sdk-region": "anchored-picker-footer",
							"data-slot": "anchored-picker-footer"
						}, V?.footer),
						children: A
					}) : null
				]
			})
		})]
	});
});
S.displayName = "AnchoredPickerSurface";
//#endregion
//#region src/components/patterns/picker/PickerDialog.tsx
var C = _.forwardRef(({ actions: n, badge: i, children: o, className: c, description: l, empty: u = !1, emptyAction: _, emptyDescription: v, emptyKeyword: x, emptyTitle: S, error: C, errorTitle: w = "Unable to load picker data", filters: T, footer: E, loading: D = !1, loadingLabel: O = "Loading options...", resultsSummary: k, sidebar: A, size: j = "xl", slotProps: M, title: N, ...P }, F) => {
	let I = D ? /* @__PURE__ */ y(r, { label: O }) : C ? /* @__PURE__ */ y(s, {
		description: C,
		title: w,
		tone: "danger"
	}) : u ? /* @__PURE__ */ y(a, {
		actions: _,
		description: v,
		keyword: x,
		title: S
	}) : o;
	return /* @__PURE__ */ y(m, {
		...P,
		children: /* @__PURE__ */ y(d, {
			...l ? {} : { "aria-describedby": void 0 },
			...t({
				className: "gap-0 overflow-hidden border-[color-mix(in_srgb,var(--sdk-color-border-default)_88%,transparent)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--sdk-color-surface-panel)_98%,white_2%)_0%,color-mix(in_srgb,var(--sdk-color-surface-panel-muted)_90%,transparent)_100%)]",
				"data-sdk-region": "picker-dialog-content",
				"data-slot": "picker-dialog-content"
			}, M?.content),
			size: j,
			children: /* @__PURE__ */ b("div", {
				ref: F,
				...t({
					className: e("flex h-full min-h-0 min-w-0 flex-col overflow-hidden", c),
					"data-sdk-pattern": "picker-dialog",
					"data-sdk-region": "picker-dialog-surface",
					"data-slot": "picker-dialog"
				}, M?.surface),
				children: [
					/* @__PURE__ */ b(f, {
						...t({
							className: "gap-3 border-b-[color-mix(in_srgb,var(--sdk-color-border-default)_78%,transparent)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--sdk-color-surface-panel)_96%,white_4%)_0%,color-mix(in_srgb,var(--sdk-color-surface-panel-muted)_88%,transparent)_100%)] px-5 py-4 xl:px-6",
							"data-sdk-region": "picker-dialog-header",
							"data-slot": "picker-dialog-header"
						}, M?.header),
						children: [/* @__PURE__ */ b("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ b("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ b("div", {
									className: "flex flex-wrap items-center gap-3",
									children: [
										/* @__PURE__ */ y(p, {
											className: "text-[1.35rem] tracking-tight",
											"data-slot": "picker-dialog-title",
											children: N
										}),
										i ? /* @__PURE__ */ y("div", {
											className: "shrink-0",
											children: i
										}) : null,
										k ? /* @__PURE__ */ y("div", {
											className: "text-sm font-medium text-[var(--sdk-color-text-secondary)]",
											"data-slot": "picker-dialog-results-summary",
											children: k
										}) : null
									]
								}), l ? /* @__PURE__ */ y(h, {
									className: "mt-2 max-w-4xl text-sm leading-6",
									"data-slot": "picker-dialog-description",
									children: l
								}) : null]
							}), n ? /* @__PURE__ */ y("div", {
								className: "flex shrink-0 items-center gap-2 pr-8",
								"data-slot": "picker-dialog-actions",
								children: n
							}) : null]
						}), T ? /* @__PURE__ */ y("div", {
							...t({
								className: "flex flex-wrap items-center gap-3 rounded-[var(--sdk-radius-panel)] border border-[color-mix(in_srgb,var(--sdk-color-border-default)_72%,transparent)] bg-[color-mix(in_srgb,var(--sdk-color-surface-panel-muted)_88%,transparent)] px-3 py-3",
								"data-sdk-region": "picker-dialog-filters",
								"data-slot": "picker-dialog-filters"
							}, M?.filters),
							children: T
						}) : null]
					}),
					/* @__PURE__ */ b("div", {
						className: "flex min-h-0 flex-1 overflow-hidden",
						children: [A ? /* @__PURE__ */ y("aside", {
							...t({
								className: "hidden w-[18rem] shrink-0 border-r border-[color-mix(in_srgb,var(--sdk-color-border-default)_72%,transparent)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--sdk-color-surface-panel-muted)_92%,transparent)_0%,color-mix(in_srgb,var(--sdk-color-surface-canvas)_86%,transparent)_100%)] lg:flex lg:min-h-0 lg:flex-col",
								"data-sdk-region": "picker-dialog-sidebar",
								"data-slot": "picker-dialog-sidebar"
							}, M?.sidebar),
							children: /* @__PURE__ */ y("div", {
								className: "min-h-0 flex-1 overflow-y-auto p-5",
								children: A
							})
						}) : null, /* @__PURE__ */ y("div", {
							className: "min-h-0 min-w-0 flex-1 overflow-y-auto",
							children: /* @__PURE__ */ y("div", {
								...t({
									className: "min-h-full px-5 py-5 xl:px-6",
									"data-sdk-region": "picker-dialog-body",
									"data-slot": "picker-dialog-body"
								}, M?.body),
								children: I
							})
						})]
					}),
					E ? /* @__PURE__ */ y(g, {
						...t({
							className: "border-t-[color-mix(in_srgb,var(--sdk-color-border-default)_78%,transparent)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--sdk-color-surface-panel)_94%,white_4%)_0%,color-mix(in_srgb,var(--sdk-color-surface-panel-muted)_88%,transparent)_100%)] px-5 py-3.5 xl:px-6",
							"data-sdk-region": "picker-dialog-footer",
							"data-slot": "picker-dialog-footer"
						}, M?.footer),
						children: E
					}) : null
				]
			})
		})
	});
});
C.displayName = "PickerDialog";
//#endregion
//#region src/components/patterns/picker/PickerSelectionFooter.tsx
var w = _.forwardRef(({ cancelLabel: t = "Cancel", className: r, clearLabel: i = "Clear selection", confirmDisabled: a = !1, confirmLabel: o = "Confirm selection", confirmLoading: s = !1, confirmVariant: c = "primary", onCancel: l, onClear: u, onConfirm: d, showClear: f = !1, summary: p = null, ...m }, h) => /* @__PURE__ */ b("div", {
	ref: h,
	className: e("flex w-full flex-wrap items-center justify-between gap-3", r),
	"data-sdk-pattern": "picker-selection-footer",
	"data-slot": "picker-selection-footer",
	...m,
	children: [/* @__PURE__ */ b("div", {
		className: "flex min-w-0 flex-wrap items-center gap-2 text-sm text-[var(--sdk-color-text-secondary)]",
		"data-slot": "picker-selection-footer-summary-row",
		children: [/* @__PURE__ */ y("div", {
			className: "font-medium text-[var(--sdk-color-text-primary)]",
			"data-slot": "picker-selection-footer-summary",
			children: p
		}), f ? /* @__PURE__ */ y(n, {
			onClick: u,
			size: "sm",
			type: "button",
			"data-slot": "picker-selection-footer-clear",
			variant: "ghost",
			children: i
		}) : null]
	}), /* @__PURE__ */ b("div", {
		className: "flex items-center gap-3",
		"data-slot": "picker-selection-footer-actions",
		children: [/* @__PURE__ */ y(n, {
			onClick: l,
			type: "button",
			"data-slot": "picker-selection-footer-cancel",
			variant: "secondary",
			children: t
		}), /* @__PURE__ */ y(n, {
			disabled: a,
			loading: s,
			onClick: d,
			type: "button",
			"data-slot": "picker-selection-footer-confirm",
			variant: c,
			children: o
		})]
	})]
}));
w.displayName = "PickerSelectionFooter";
//#endregion
//#region src/components/patterns/picker/EntityPickerDialog.tsx
function T(e, t) {
	return e.id ?? t;
}
function E({ cancelLabel: e = "Cancel", clearLabel: n = "Clear selection", confirmLabel: r, confirmLoading: i = !1, confirmVariant: a = "primary", defaultSelectedIds: o = [], getItemId: s, getItemLabel: c, items: l, layout: u = "grid", onConfirm: d, onOpenChange: f, onSelectedIdsChange: p, pagination: m, renderItem: h, selectedIds: g, selectionMode: x = "single", selectionSummary: S, slotProps: E, ...D }, O) {
	let [k, A] = _.useState(o), j = _.useCallback((e, t) => s?.(e, t) ?? T(e, t), [s]), M = _.useMemo(() => l.map((e, t) => ({
		id: j(e, t),
		item: e
	})), [l, j]), N = g ?? k, P = _.useMemo(() => new Set(N), [N]), F = _.useMemo(() => {
		let e = /* @__PURE__ */ new Map();
		return M.forEach(({ id: t, item: n }) => {
			e.set(t, n);
		}), e;
	}, [M]), I = _.useMemo(() => N.flatMap((e) => {
		let t = F.get(e);
		return t === void 0 ? [] : [t];
	}), [F, N]), L = _.useCallback((e) => {
		g === void 0 && A(e);
		let t = e.flatMap((e) => {
			let t = F.get(e);
			return t === void 0 ? [] : [t];
		});
		p?.(e, t);
	}, [
		g,
		F,
		p
	]), R = _.useCallback(() => {
		L([]);
	}, [L]), z = _.useMemo(() => ({
		clearSelection: R,
		selectedCount: N.length,
		selectedIds: N,
		selectedItems: I,
		selectionMode: x
	}), [
		R,
		N,
		I,
		x
	]), B = _.useCallback((e) => P.has(e), [P]), V = _.useCallback((e) => {
		if (x === "single") {
			L([e]);
			return;
		}
		P.has(e) || L([...N, e]);
	}, [
		L,
		P,
		N,
		x
	]), H = _.useCallback((e) => {
		L(N.filter((t) => !Object.is(t, e)));
	}, [L, N]), U = _.useCallback((e) => {
		if (P.has(e)) {
			H(e);
			return;
		}
		if (x === "single") {
			L([e]);
			return;
		}
		L([...N, e]);
	}, [
		L,
		H,
		P,
		N,
		x
	]), W = typeof S == "function" ? S(z) : S ?? (N.length === 0 ? "No items selected" : N.length === 1 && I.length === 1 && c ? /* @__PURE__ */ b(v, { children: ["Selected: ", c(I[0], 0)] }) : `${N.length} item${N.length === 1 ? "" : "s"} selected`), G = typeof r == "function" ? r(z) : r ?? (x === "multiple" && N.length > 0 ? `Confirm selection (${N.length})` : "Confirm selection"), K = u === "list" ? "flex flex-col gap-3" : "grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3";
	return /* @__PURE__ */ y(C, {
		...D,
		empty: !D.loading && !D.error && l.length === 0,
		footer: /* @__PURE__ */ y(w, {
			cancelLabel: e,
			clearLabel: n,
			confirmDisabled: N.length === 0,
			confirmLabel: G,
			confirmLoading: i,
			confirmVariant: a,
			onCancel: () => f?.(!1),
			onClear: R,
			onConfirm: () => {
				N.length !== 0 && d?.(I, N);
			},
			showClear: N.length > 0,
			summary: W
		}),
		slotProps: E,
		children: /* @__PURE__ */ b("div", {
			ref: O,
			className: "flex flex-col gap-5",
			"data-sdk-pattern": "entity-picker-dialog",
			"data-slot": "entity-picker-dialog",
			children: [/* @__PURE__ */ y("div", {
				...t({
					className: K,
					"data-sdk-region": "entity-picker-items",
					"data-slot": "entity-picker-dialog-items"
				}, E?.items),
				children: M.map((e, t) => /* @__PURE__ */ y(_.Fragment, { children: h({
					...z,
					deselect: () => H(e.id),
					index: t,
					item: e.item,
					itemId: e.id,
					select: () => V(e.id),
					selected: B(e.id),
					toggleSelection: () => U(e.id)
				}) }, e.id))
			}), m ? /* @__PURE__ */ y("div", {
				...t({
					"data-sdk-region": "entity-picker-pagination",
					"data-slot": "entity-picker-dialog-pagination"
				}, E?.pagination),
				children: m
			}) : null]
		})
	});
}
var D = _.forwardRef(E);
D.displayName = "EntityPickerDialog";
//#endregion
//#region src/components/patterns/picker/TwoPaneSelectorPopover.tsx
function O(e, t) {
	if (e && typeof e == "object") {
		let t = e.label ?? e.name;
		if (t != null) return t;
	}
	return String(t);
}
function k(e, t) {
	return e.section.id ?? t;
}
function A(e, t) {
	return e.id ?? t;
}
function j({ activeSectionId: n, defaultActiveSectionId: r = null, defaultOpen: a = !1, defaultValue: s = null, emptyDescription: c = "Choose a different section or add more options to continue.", emptyTitle: l = "No options available", getItemBadge: u, getItemDescription: d, getItemId: f, getItemLabel: p, getSectionDescription: m, getSectionId: h, getSectionLabel: g, itemTitle: v = "Options", modal: x, onActiveSectionIdChange: C, onOpenChange: w, onValueChange: T, open: E, renderItem: D, renderSection: j, sectionTitle: M = "Categories", sections: N, slotProps: P, trigger: F, value: I }, L) {
	let [R, z] = _.useState(a), [B, V] = _.useState(s), [H, U] = _.useState(r), W = E ?? R, G = I ?? B, K = _.useMemo(() => N.map((e, t) => ({
		items: e.items,
		index: t,
		section: e.section,
		sectionId: h?.(e.section, t) ?? k(e, t)
	})), [h, N]), q = _.useMemo(() => K.find((e) => e.items.some((t, n) => Object.is(f?.(t, n, e.section, e.index) ?? A(t, n), G))), [
		f,
		G,
		K
	]), J = q?.sectionId ?? K[0]?.sectionId ?? null, Y = n ?? H ?? J, X = _.useMemo(() => K.find((e) => Object.is(e.sectionId, Y)) ?? q ?? K[0], [
		Y,
		K,
		q
	]), Z = _.useCallback((e) => {
		E === void 0 && z(e), w?.(e);
	}, [E, w]), Q = _.useCallback((e) => {
		n === void 0 && U(e);
		let t = K.find((t) => Object.is(t.sectionId, e))?.section;
		C?.(e, t);
	}, [
		n,
		C,
		K
	]);
	_.useEffect(() => {
		!W || n !== void 0 || !(H !== null && K.some((e) => Object.is(e.sectionId, H))) && J !== null && U(J);
	}, [
		n,
		J,
		W,
		K,
		H
	]);
	let $ = _.useCallback((e, t, n) => {
		I === void 0 && V(e), T?.(e, t, n), Z(!1);
	}, [
		I,
		T,
		Z
	]);
	return /* @__PURE__ */ y(S, {
		bodyScrollable: !1,
		modal: x,
		onOpenChange: Z,
		open: W,
		size: "lg",
		slotProps: {
			body: t({ className: "p-0" }, P?.body),
			content: P?.content,
			filters: P?.filters,
			footer: P?.footer,
			header: P?.header,
			surface: P?.pickerSurface
		},
		trigger: F,
		children: /* @__PURE__ */ b("div", {
			ref: L,
			...t({
				className: "flex h-[20rem] min-h-0",
				"data-sdk-pattern": "two-pane-selector-popover",
				"data-sdk-region": "two-pane-selector-surface"
			}, P?.surface),
			children: [/* @__PURE__ */ b("div", {
				...t({
					className: "flex w-[11rem] shrink-0 flex-col border-r border-[var(--sdk-color-border-default)] bg-[color-mix(in_srgb,var(--sdk-color-surface-panel-muted)_88%,transparent)]",
					"data-sdk-region": "two-pane-selector-sections"
				}, P?.sections),
				children: [/* @__PURE__ */ y("div", {
					className: "border-b border-[var(--sdk-color-border-default)] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--sdk-color-text-muted)]",
					children: M
				}), /* @__PURE__ */ y("div", {
					className: "flex-1 overflow-y-auto p-2",
					children: /* @__PURE__ */ y("div", {
						className: "flex flex-col gap-1",
						children: K.map((t) => {
							let n = Object.is(t.sectionId, X?.sectionId), r = {
								active: n,
								index: t.index,
								section: t.section,
								sectionId: t.sectionId,
								setActiveSection: () => Q(t.sectionId)
							};
							return j ? /* @__PURE__ */ y(_.Fragment, { children: j(r) }, t.sectionId) : /* @__PURE__ */ b("button", {
								className: e("flex w-full flex-col items-start rounded-[var(--sdk-radius-field)] border px-3 py-2 text-left text-sm transition-colors", n ? "border-[color-mix(in_srgb,var(--sdk-color-brand-primary)_26%,transparent)] bg-[var(--sdk-color-brand-primary-soft)] text-[var(--sdk-color-text-primary)]" : "border-transparent text-[var(--sdk-color-text-secondary)] hover:bg-[var(--sdk-color-surface-panel)] hover:text-[var(--sdk-color-text-primary)]"),
								"data-slot": "two-pane-selector-section-trigger",
								onClick: r.setActiveSection,
								type: "button",
								children: [/* @__PURE__ */ y("span", {
									className: "truncate font-medium",
									children: g?.(t.section, t.index) ?? O(t.section, t.sectionId)
								}), m?.(t.section, t.index) ? /* @__PURE__ */ y("span", {
									className: "mt-1 line-clamp-2 text-xs text-[var(--sdk-color-text-muted)]",
									children: m(t.section, t.index)
								}) : null]
							}, t.sectionId);
						})
					})
				})]
			}), /* @__PURE__ */ b("div", {
				...t({
					className: "flex min-w-0 flex-1 flex-col",
					"data-sdk-region": "two-pane-selector-items"
				}, P?.items),
				children: [/* @__PURE__ */ y("div", {
					className: "border-b border-[var(--sdk-color-border-default)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--sdk-color-text-muted)]",
					children: v
				}), /* @__PURE__ */ y("div", {
					className: "min-h-0 flex-1 overflow-y-auto p-2",
					children: X && X.items.length > 0 ? /* @__PURE__ */ y("div", {
						className: "flex flex-col gap-1.5",
						children: X.items.map((t, n) => {
							let r = f?.(t, n, X.section, X.index) ?? A(t, n), i = Object.is(r, G), a = {
								activeSection: X.section,
								close: () => Z(!1),
								index: n,
								item: t,
								itemId: r,
								section: X.section,
								sectionIndex: X.index,
								select: () => $(r, t, X.section),
								selected: i
							};
							return D ? /* @__PURE__ */ y(_.Fragment, { children: D(a) }, r) : /* @__PURE__ */ b("button", {
								className: e("flex w-full items-start gap-3 rounded-[var(--sdk-radius-field)] border px-3 py-3 text-left transition-colors", i ? "border-[color-mix(in_srgb,var(--sdk-color-brand-primary)_30%,transparent)] bg-[var(--sdk-color-brand-primary-soft)] text-[var(--sdk-color-text-primary)]" : "border-transparent text-[var(--sdk-color-text-primary)] hover:border-[var(--sdk-color-border-default)] hover:bg-[var(--sdk-color-surface-panel-muted)]"),
								"data-slot": "two-pane-selector-item-trigger",
								onClick: a.select,
								type: "button",
								children: [/* @__PURE__ */ b("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ b("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [/* @__PURE__ */ y("span", {
											className: "truncate text-sm font-semibold",
											children: p?.(t, n, X.section, X.index) ?? O(t, r)
										}), u?.(t, n, X.section, X.index) ? /* @__PURE__ */ y("span", {
											className: "shrink-0 rounded-full border border-[var(--sdk-color-border-default)] px-2 py-0.5 text-[10px] font-medium text-[var(--sdk-color-text-secondary)]",
											children: u(t, n, X.section, X.index)
										}) : null]
									}), d?.(t, n, X.section, X.index) ? /* @__PURE__ */ y("div", {
										className: "mt-1 text-xs leading-5 text-[var(--sdk-color-text-muted)]",
										children: d(t, n, X.section, X.index)
									}) : null]
								}), i ? /* @__PURE__ */ y(o, { className: "mt-0.5 h-4 w-4 shrink-0 text-[var(--sdk-color-brand-primary)]" }) : null]
							}, r);
						})
					}) : /* @__PURE__ */ y(i, {
						className: "h-full justify-center",
						description: c,
						title: l
					})
				})]
			})]
		})
	});
}
var M = _.forwardRef(j);
M.displayName = "TwoPaneSelectorPopover";
//#endregion
export { S as AnchoredPickerSurface, D as EntityPickerDialog, C as PickerDialog, w as PickerSelectionFooter, M as TwoPaneSelectorPopover };

//# sourceMappingURL=patterns-picker.js.map