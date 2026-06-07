import { t as e } from "./utils-Bgb-Nm-x.js";
import { n as t, t as n } from "./slot-props-Cskv9Ttd.js";
import { t as r } from "./button-DW2aECbt.js";
import { t as i } from "./createLucideIcon-DYUOEYxe.js";
import { i as a, t as o } from "./states-BNaQCp-9.js";
import { t as s } from "./circle-alert-DLMwBG2c.js";
import { t as c } from "./circle-check-BkTcTpgo.js";
import { r as l } from "./inline-alert-BVD8XoaS.js";
import { t as u } from "./triangle-alert-BO2W8DLJ.js";
import { useSdkworkTheme as d } from "./theme.js";
import * as f from "react";
import p from "react";
import { Fragment as m, jsx as h, jsxs as g } from "react/jsx-runtime";
import _ from "react-dom";
var v = i("bell", [["path", {
	d: "M10.268 21a2 2 0 0 0 3.464 0",
	key: "vwvbt9"
}], ["path", {
	d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
	key: "11g9vi"
}]]), y = i("check-check", [["path", {
	d: "M18 6 7 17l-5-5",
	key: "116fxf"
}], ["path", {
	d: "m22 10-7.5 7.5L13 16",
	key: "ke71qq"
}]]), b = i("external-link", [
	["path", {
		d: "M15 3h6v6",
		key: "1q9fwt"
	}],
	["path", {
		d: "M10 14 21 3",
		key: "gplh6r"
	}],
	["path", {
		d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
		key: "a6xqqp"
	}]
]), x = i("search-x", [
	["path", {
		d: "m13.5 8.5-5 5",
		key: "1cs55j"
	}],
	["path", {
		d: "m8.5 8.5 5 5",
		key: "a8mexj"
	}],
	["circle", {
		cx: "11",
		cy: "11",
		r: "8",
		key: "4ej97u"
	}],
	["path", {
		d: "m21 21-4.3-4.3",
		key: "1qie3q"
	}]
]), ee = i("trash-2", [
	["path", {
		d: "M10 11v6",
		key: "nco0om"
	}],
	["path", {
		d: "M14 11v6",
		key: "outv1u"
	}],
	["path", {
		d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
		key: "miytrc"
	}],
	["path", {
		d: "M3 6h18",
		key: "d0wm0j"
	}],
	["path", {
		d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
		key: "e791ji"
	}]
]), S = f.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ h("div", {
	ref: r,
	className: e("animate-pulse rounded-[var(--sdk-radius-control)] bg-[var(--sdk-color-surface-panel-muted)]", t),
	"data-sdk-ui": "skeleton",
	"data-slot": "skeleton",
	...n
}));
S.displayName = "Skeleton";
//#endregion
//#region src/components/ui/feedback/activity-feed.tsx
var C = {
	default: a,
	info: l,
	success: c,
	warning: u,
	danger: s
}, w = {
	default: "border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel-muted)] text-[var(--sdk-color-text-muted)]",
	info: "border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel-muted)] text-[var(--sdk-color-state-info)]",
	success: "border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel-muted)] text-[var(--sdk-color-state-success)]",
	warning: "border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel-muted)] text-[var(--sdk-color-state-warning)]",
	danger: "border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel-muted)] text-[var(--sdk-color-state-danger)]"
};
function te(e) {
	return typeof e.title == "string" ? e.title : "Open activity item";
}
function T(e, t) {
	let r = {}, i = n(e?.actions, t?.actions), a = n(e?.connector, t?.connector), o = n(e?.indicator, t?.indicator), s = n(e?.panel, t?.panel);
	return i && (r.actions = i), a && (r.connector = a), o && (r.indicator = o), s && (r.panel = s), Object.keys(r).length > 0 ? r : void 0;
}
var E = f.forwardRef(({ className: n, item: r, onItemSelect: i, showConnector: a = !0, slotProps: o, ...s }, c) => {
	let l = r.tone ?? "default", u = C[l];
	return /* @__PURE__ */ g("div", {
		ref: c,
		className: e("grid grid-cols-[auto_minmax(0,1fr)] gap-4", n),
		"data-sdk-ui": "activity-feed-item",
		"data-slot": "activity-feed-item",
		"data-tone": l,
		"data-unread": r.unread ? "true" : "false",
		...s,
		children: [/* @__PURE__ */ g("div", {
			className: "flex flex-col items-center",
			children: [/* @__PURE__ */ g("span", {
				...t({
					className: e("relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--sdk-radius-panel)] border shadow-[var(--sdk-shadow-sm)]", w[l]),
					"data-sdk-region": "activity-feed-item-indicator",
					"data-slot": "activity-feed-item-indicator"
				}, o?.indicator),
				children: [r.icon ? r.icon : /* @__PURE__ */ h(u, { className: "h-4.5 w-4.5" }), r.unread ? /* @__PURE__ */ h("span", {
					"aria-hidden": "true",
					className: "absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border border-[var(--sdk-color-surface-panel)] bg-[var(--sdk-color-brand-primary)]",
					"data-slot": "activity-feed-item-unread-indicator"
				}) : null]
			}), a ? /* @__PURE__ */ h("span", { ...t({
				"aria-hidden": "true",
				className: "mt-2 w-px flex-1 rounded-full bg-[var(--sdk-color-border-default)]",
				"data-sdk-region": "activity-feed-item-connector",
				"data-slot": "activity-feed-item-connector"
			}, o?.connector) }) : null]
		}), /* @__PURE__ */ g("article", {
			...t({
				className: "min-w-0 rounded-[var(--sdk-radius-panel)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] px-4 py-4 shadow-[var(--sdk-shadow-soft)]",
				"data-sdk-region": "activity-feed-item-panel",
				"data-slot": "activity-feed-item-panel"
			}, o?.panel),
			children: [
				/* @__PURE__ */ g("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ g("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ g("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [i ? /* @__PURE__ */ h("button", {
								"aria-label": te(r),
								className: "truncate text-left text-sm font-semibold text-[var(--sdk-color-text-primary)] transition-colors hover:text-[var(--sdk-color-brand-primary-hover)]",
								"data-slot": "activity-feed-item-title",
								onClick: () => i(r.id),
								type: "button",
								children: r.title
							}) : /* @__PURE__ */ h("div", {
								className: "truncate text-sm font-semibold text-[var(--sdk-color-text-primary)]",
								"data-slot": "activity-feed-item-title",
								children: r.title
							}), r.meta ? /* @__PURE__ */ h("div", {
								className: "inline-flex max-w-full items-center rounded-full border border-[var(--sdk-color-border-subtle)] bg-[var(--sdk-color-surface-panel-muted)] px-2.5 py-1 text-[11px] font-medium text-[var(--sdk-color-text-secondary)]",
								"data-slot": "activity-feed-item-meta",
								children: /* @__PURE__ */ h("span", {
									className: "truncate",
									children: r.meta
								})
							}) : null]
						}), r.description ? /* @__PURE__ */ h("div", {
							className: "mt-1.5 text-sm leading-relaxed text-[var(--sdk-color-text-secondary)]",
							"data-slot": "activity-feed-item-description",
							children: r.description
						}) : null]
					}), r.timestamp ? /* @__PURE__ */ h("div", {
						className: "shrink-0 text-xs font-medium text-[var(--sdk-color-text-muted)]",
						"data-slot": "activity-feed-item-timestamp",
						children: r.timestamp
					}) : null]
				}),
				r.content ? /* @__PURE__ */ h("div", {
					className: "mt-3 text-sm text-[var(--sdk-color-text-secondary)]",
					"data-slot": "activity-feed-item-content",
					children: r.content
				}) : null,
				r.actions ? /* @__PURE__ */ h("div", {
					...t({
						className: "mt-3 flex flex-wrap items-center gap-2",
						"data-sdk-region": "activity-feed-item-actions",
						"data-slot": "activity-feed-item-actions"
					}, o?.actions),
					children: r.actions
				}) : null
			]
		})]
	});
});
E.displayName = "ActivityFeedItem";
var D = f.forwardRef(({ className: n, description: r, emptyDescription: i = "Workflow updates, approvals, and automation history will appear here.", emptyTitle: s = "No activity yet", getItemProps: c, getItemSlotProps: l, headerActions: u, items: d, onItemSelect: f, slotProps: p, title: m = "Activity", ..._ }, v) => /* @__PURE__ */ g("section", {
	ref: v,
	className: e("overflow-hidden rounded-[var(--sdk-radius-panel)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] shadow-[var(--sdk-shadow-lg)]", n),
	"data-sdk-ui": "activity-feed",
	"data-slot": "activity-feed",
	..._,
	children: [m || r || u ? /* @__PURE__ */ g("header", {
		...t({
			className: "flex items-start justify-between gap-4 border-b border-[var(--sdk-color-border-subtle)] bg-[var(--sdk-color-surface-panel-muted)] px-4 py-3",
			"data-sdk-region": "activity-feed-header",
			"data-slot": "activity-feed-header"
		}, p?.header),
		children: [/* @__PURE__ */ g("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ g("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ h(a, { className: "h-4 w-4 text-[var(--sdk-color-text-muted)]" }), /* @__PURE__ */ h("div", {
					className: "text-xs font-semibold uppercase tracking-[0.16em] text-[var(--sdk-color-text-secondary)]",
					"data-slot": "activity-feed-title",
					children: m
				})]
			}), r ? /* @__PURE__ */ h("div", {
				className: "mt-1 text-sm text-[var(--sdk-color-text-secondary)]",
				"data-slot": "activity-feed-description",
				children: r
			}) : null]
		}), u ? /* @__PURE__ */ h("div", {
			...t({
				className: "flex shrink-0 items-center gap-2",
				"data-sdk-region": "activity-feed-header-actions",
				"data-slot": "activity-feed-header-actions"
			}, p?.headerActions),
			children: u
		}) : null]
	}) : null, d.length === 0 ? /* @__PURE__ */ h("div", {
		...t({
			className: "p-4",
			"data-sdk-region": "activity-feed-empty",
			"data-slot": "activity-feed-empty"
		}, p?.empty),
		children: /* @__PURE__ */ h(o, {
			description: i,
			title: s
		})
	}) : /* @__PURE__ */ h("div", {
		className: "px-4 py-4",
		children: /* @__PURE__ */ h("ol", {
			...t({
				className: "space-y-4",
				"data-sdk-region": "activity-feed-list",
				"data-slot": "activity-feed-list"
			}, p?.list),
			children: d.map((e, t) => /* @__PURE__ */ h("li", {
				className: "list-none",
				children: /* @__PURE__ */ h(E, {
					...c?.(e, t),
					item: e,
					onItemSelect: f,
					showConnector: t < d.length - 1,
					slotProps: T(l?.(e, t), void 0)
				})
			}, e.id))
		})
	})]
}));
D.displayName = "ActivityFeed";
//#endregion
//#region src/components/ui/feedback/empty-search.tsx
var O = f.forwardRef(({ actions: t, className: n, clearLabel: i = "Clear search", description: a = "Try a different keyword or clear the current search.", keyword: o, onClear: s, title: c, ...l }, u) => {
	let d = c ?? (o ? `No results found for "${o}"` : "No search results"), f = t ?? (s ? /* @__PURE__ */ h(r, {
		onClick: s,
		variant: "secondary",
		children: i
	}) : null);
	return /* @__PURE__ */ g("div", {
		ref: u,
		className: e("flex flex-col items-center justify-center gap-3 rounded-[var(--sdk-radius-panel)] border border-dashed border-[var(--sdk-color-border-strong)] bg-[var(--sdk-color-surface-panel)] px-6 py-12 text-center", n),
		"data-sdk-ui": "empty-search",
		"data-slot": "empty-search",
		role: "status",
		...l,
		children: [
			/* @__PURE__ */ h("div", {
				className: "flex h-14 w-14 items-center justify-center rounded-full border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel-muted)] text-[var(--sdk-color-text-secondary)] shadow-[var(--sdk-shadow-sm)]",
				"data-slot": "empty-search-icon",
				children: /* @__PURE__ */ h(x, { className: "h-6 w-6" })
			}),
			/* @__PURE__ */ h("div", {
				className: "text-lg font-semibold text-[var(--sdk-color-text-primary)]",
				"data-slot": "empty-search-title",
				children: d
			}),
			/* @__PURE__ */ h("div", {
				className: "max-w-xl text-sm text-[var(--sdk-color-text-secondary)]",
				"data-slot": "empty-search-description",
				children: a
			}),
			f ? /* @__PURE__ */ h("div", {
				className: "mt-2 flex items-center gap-3",
				"data-slot": "empty-search-actions",
				children: f
			}) : null
		]
	});
});
O.displayName = "EmptySearch";
//#endregion
//#region src/components/ui/feedback/notification-center.tsx
var k = {
	default: l,
	info: l,
	success: c,
	warning: u,
	danger: s
}, A = {
	default: "text-[var(--sdk-color-state-info)]",
	info: "text-[var(--sdk-color-state-info)]",
	success: "text-[var(--sdk-color-state-success)]",
	warning: "text-[var(--sdk-color-state-warning)]",
	danger: "text-[var(--sdk-color-state-danger)]"
};
function j(e) {
	return typeof e.title == "string" ? e.title : "Open notification item";
}
function M(e, t) {
	let r = {}, i = n(e?.action, t?.action), a = n(e?.body, t?.body), o = n(e?.description, t?.description), s = n(e?.icon, t?.icon), c = n(e?.timeLabel, t?.timeLabel), l = n(e?.title, t?.title), u = n(e?.unreadIndicator, t?.unreadIndicator);
	return i && (r.action = i), a && (r.body = a), o && (r.description = o), s && (r.icon = s), c && (r.timeLabel = c), l && (r.title = l), u && (r.unreadIndicator = u), Object.keys(r).length > 0 ? r : void 0;
}
var N = f.forwardRef(({ className: n, item: r, onItemSelect: i, slotProps: a, ...o }, s) => {
	let c = r.tone ?? "default", l = k[c], u = /* @__PURE__ */ g(m, { children: [/* @__PURE__ */ h(l, { ...t({
		className: e("mt-0.5 h-4 w-4 shrink-0", A[c]),
		"data-sdk-region": "notification-center-item-icon",
		"data-slot": "notification-center-item-icon"
	}, a?.icon) }), /* @__PURE__ */ g("div", {
		...t({
			className: "min-w-0 flex-1",
			"data-sdk-region": "notification-center-item-body",
			"data-slot": "notification-center-item-body"
		}, a?.body),
		children: [/* @__PURE__ */ g("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ h("div", {
				...t({
					className: "min-w-0 text-sm font-medium text-[var(--sdk-color-text-primary)]",
					"data-sdk-region": "notification-center-item-title",
					"data-slot": "notification-center-item-title"
				}, a?.title),
				children: r.title
			}), r.timeLabel ? /* @__PURE__ */ h("div", {
				...t({
					className: "shrink-0 text-[11px] text-[var(--sdk-color-text-muted)]",
					"data-sdk-region": "notification-center-item-time-label",
					"data-slot": "notification-center-item-time-label"
				}, a?.timeLabel),
				children: r.timeLabel
			}) : null]
		}), /* @__PURE__ */ h("div", {
			...t({
				className: "mt-1 text-sm leading-relaxed text-[var(--sdk-color-text-secondary)]",
				"data-sdk-region": "notification-center-item-description",
				"data-slot": "notification-center-item-description"
			}, a?.description),
			children: r.content
		})]
	})] });
	return /* @__PURE__ */ g("article", {
		ref: s,
		className: e("relative px-4 py-4 transition-colors", i ? "hover:bg-[var(--sdk-color-surface-panel-muted)]" : void 0, n),
		"data-sdk-ui": "notification-center-item",
		"data-slot": "notification-center-item",
		"data-tone": c,
		"data-unread": r.unread ? "true" : "false",
		...o,
		children: [
			r.unread ? /* @__PURE__ */ h("span", { ...t({
				"aria-hidden": "true",
				className: "absolute bottom-3 left-0 top-3 w-[3px] rounded-r-full bg-[var(--sdk-color-brand-primary)]",
				"data-sdk-region": "notification-center-item-unread-indicator",
				"data-slot": "notification-center-item-unread-indicator"
			}, a?.unreadIndicator) }) : null,
			i ? /* @__PURE__ */ h("button", {
				"aria-label": j(r),
				className: "flex w-full items-start gap-3 text-left",
				onClick: () => i(r.id),
				type: "button",
				children: u
			}) : /* @__PURE__ */ h("div", {
				className: "flex items-start gap-3",
				children: u
			}),
			r.actionHref ? /* @__PURE__ */ g("a", {
				...t({
					className: "mt-3 inline-flex items-center gap-1 text-xs font-medium text-[var(--sdk-color-brand-primary)] transition-colors hover:text-[var(--sdk-color-brand-primary-hover)]",
					"data-sdk-region": "notification-center-item-action",
					"data-slot": "notification-center-item-action",
					href: r.actionHref,
					rel: "noreferrer",
					target: r.actionTarget ?? "_blank"
				}, a?.action),
				children: [r.actionLabel ?? "View details", /* @__PURE__ */ h(b, { className: "h-3.5 w-3.5" })]
			}) : null
		]
	});
});
N.displayName = "NotificationCenterItem";
var P = f.forwardRef(({ className: n, clearLabel: r = "Clear notifications", emptyDescription: i = "New alerts, updates, and workflow events will appear here.", emptyTitle: a = "No notifications", getItemProps: o, getItemSlotProps: s, items: c, markAllAsReadLabel: l = "Mark all as read", onClear: u, onItemSelect: d, onMarkAllAsRead: f, slotProps: p, title: m = "Notifications", ..._ }, b) => /* @__PURE__ */ g("section", {
	ref: b,
	className: e("overflow-hidden rounded-[var(--sdk-radius-panel)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] shadow-[var(--sdk-shadow-lg)]", n),
	"data-sdk-ui": "notification-center",
	"data-slot": "notification-center",
	..._,
	children: [/* @__PURE__ */ g("header", {
		...t({
			className: "flex items-center justify-between gap-3 border-b border-[var(--sdk-color-border-subtle)] bg-[var(--sdk-color-surface-panel-muted)] px-4 py-3",
			"data-sdk-region": "notification-center-header",
			"data-slot": "notification-center-header"
		}, p?.header),
		children: [/* @__PURE__ */ g("div", {
			className: "flex min-w-0 items-center gap-2",
			children: [/* @__PURE__ */ h(v, { className: "h-4 w-4 text-[var(--sdk-color-text-muted)]" }), /* @__PURE__ */ h("div", {
				className: "truncate text-xs font-semibold uppercase tracking-[0.16em] text-[var(--sdk-color-text-secondary)]",
				"data-slot": "notification-center-title",
				children: m
			})]
		}), c.length > 0 && (f || u) ? /* @__PURE__ */ g("div", {
			...t({
				className: "flex shrink-0 items-center gap-1",
				"data-sdk-region": "notification-center-header-actions",
				"data-slot": "notification-center-header-actions"
			}, p?.headerActions),
			children: [f ? /* @__PURE__ */ h("button", {
				"aria-label": l,
				className: "rounded-[var(--sdk-radius-control)] p-2 text-[var(--sdk-color-text-muted)] transition-colors hover:bg-[var(--sdk-color-surface-elevated)] hover:text-[var(--sdk-color-text-primary)]",
				onClick: f,
				type: "button",
				children: /* @__PURE__ */ h(y, { className: "h-4 w-4" })
			}) : null, u ? /* @__PURE__ */ h("button", {
				"aria-label": r,
				className: "rounded-[var(--sdk-radius-control)] p-2 text-[var(--sdk-color-text-muted)] transition-colors hover:bg-[var(--sdk-color-surface-elevated)] hover:text-[var(--sdk-color-state-danger)]",
				onClick: u,
				type: "button",
				children: /* @__PURE__ */ h(ee, { className: "h-4 w-4" })
			}) : null]
		}) : null]
	}), c.length === 0 ? /* @__PURE__ */ g("div", {
		...t({
			className: "flex flex-col items-center justify-center px-6 py-10 text-center",
			"data-sdk-region": "notification-center-empty",
			"data-slot": "notification-center-empty"
		}, p?.empty),
		children: [
			/* @__PURE__ */ h(v, { className: "h-8 w-8 text-[var(--sdk-color-text-muted)] opacity-40" }),
			/* @__PURE__ */ h("div", {
				className: "mt-3 text-sm font-semibold text-[var(--sdk-color-text-primary)]",
				children: a
			}),
			/* @__PURE__ */ h("div", {
				className: "mt-1 max-w-xs text-sm text-[var(--sdk-color-text-secondary)]",
				children: i
			})
		]
	}) : /* @__PURE__ */ h("div", {
		...t({
			className: "max-h-[26rem] overflow-y-auto",
			"data-sdk-region": "notification-center-viewport",
			"data-slot": "notification-center-viewport"
		}, p?.viewport),
		children: /* @__PURE__ */ h("ol", {
			...t({
				className: "divide-y divide-[var(--sdk-color-border-subtle)]",
				"data-sdk-region": "notification-center-list",
				"data-slot": "notification-center-list"
			}, p?.list),
			children: c.map((e, t) => /* @__PURE__ */ h("li", {
				className: "list-none",
				children: /* @__PURE__ */ h(N, {
					...o?.(e, t),
					item: e,
					onItemSelect: d,
					slotProps: M(s?.(e, t), void 0)
				})
			}, e.id))
		})
	})]
}));
P.displayName = "NotificationCenter";
//#endregion
//#region ../../sdkwork-claw-router/apps/sdkwork-claw-router-portal/node_modules/.pnpm/sonner@2.0.7_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/sonner/dist/index.mjs
function F(e) {
	if (!e || typeof document > "u") return;
	let t = document.head || document.getElementsByTagName("head")[0], n = document.createElement("style");
	n.type = "text/css", t.appendChild(n), n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e));
}
var I = (e) => {
	switch (e) {
		case "success": return ie;
		case "info": return oe;
		case "warning": return ae;
		case "error": return L;
		default: return null;
	}
}, ne = Array(12).fill(0), re = ({ visible: e, className: t }) => /* @__PURE__ */ p.createElement("div", {
	className: ["sonner-loading-wrapper", t].filter(Boolean).join(" "),
	"data-visible": e
}, /* @__PURE__ */ p.createElement("div", { className: "sonner-spinner" }, ne.map((e, t) => /* @__PURE__ */ p.createElement("div", {
	className: "sonner-loading-bar",
	key: `spinner-bar-${t}`
})))), ie = /* @__PURE__ */ p.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20"
}, /* @__PURE__ */ p.createElement("path", {
	fillRule: "evenodd",
	d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
	clipRule: "evenodd"
})), ae = /* @__PURE__ */ p.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 24 24",
	fill: "currentColor",
	height: "20",
	width: "20"
}, /* @__PURE__ */ p.createElement("path", {
	fillRule: "evenodd",
	d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
	clipRule: "evenodd"
})), oe = /* @__PURE__ */ p.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20"
}, /* @__PURE__ */ p.createElement("path", {
	fillRule: "evenodd",
	d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
	clipRule: "evenodd"
})), L = /* @__PURE__ */ p.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20"
}, /* @__PURE__ */ p.createElement("path", {
	fillRule: "evenodd",
	d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
	clipRule: "evenodd"
})), se = /* @__PURE__ */ p.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	width: "12",
	height: "12",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.5",
	strokeLinecap: "round",
	strokeLinejoin: "round"
}, /* @__PURE__ */ p.createElement("line", {
	x1: "18",
	y1: "6",
	x2: "6",
	y2: "18"
}), /* @__PURE__ */ p.createElement("line", {
	x1: "6",
	y1: "6",
	x2: "18",
	y2: "18"
})), ce = () => {
	let [e, t] = p.useState(document.hidden);
	return p.useEffect(() => {
		let e = () => {
			t(document.hidden);
		};
		return document.addEventListener("visibilitychange", e), () => window.removeEventListener("visibilitychange", e);
	}, []), e;
}, R = 1, z = new class {
	constructor() {
		this.subscribe = (e) => (this.subscribers.push(e), () => {
			let t = this.subscribers.indexOf(e);
			this.subscribers.splice(t, 1);
		}), this.publish = (e) => {
			this.subscribers.forEach((t) => t(e));
		}, this.addToast = (e) => {
			this.publish(e), this.toasts = [...this.toasts, e];
		}, this.create = (e) => {
			let { message: t, ...n } = e, r = typeof e?.id == "number" || e.id?.length > 0 ? e.id : R++, i = this.toasts.find((e) => e.id === r), a = e.dismissible === void 0 ? !0 : e.dismissible;
			return this.dismissedToasts.has(r) && this.dismissedToasts.delete(r), i ? this.toasts = this.toasts.map((n) => n.id === r ? (this.publish({
				...n,
				...e,
				id: r,
				title: t
			}), {
				...n,
				...e,
				id: r,
				dismissible: a,
				title: t
			}) : n) : this.addToast({
				title: t,
				...n,
				dismissible: a,
				id: r
			}), r;
		}, this.dismiss = (e) => (e ? (this.dismissedToasts.add(e), requestAnimationFrame(() => this.subscribers.forEach((t) => t({
			id: e,
			dismiss: !0
		})))) : this.toasts.forEach((e) => {
			this.subscribers.forEach((t) => t({
				id: e.id,
				dismiss: !0
			}));
		}), e), this.message = (e, t) => this.create({
			...t,
			message: e
		}), this.error = (e, t) => this.create({
			...t,
			message: e,
			type: "error"
		}), this.success = (e, t) => this.create({
			...t,
			type: "success",
			message: e
		}), this.info = (e, t) => this.create({
			...t,
			type: "info",
			message: e
		}), this.warning = (e, t) => this.create({
			...t,
			type: "warning",
			message: e
		}), this.loading = (e, t) => this.create({
			...t,
			type: "loading",
			message: e
		}), this.promise = (e, t) => {
			if (!t) return;
			let n;
			t.loading !== void 0 && (n = this.create({
				...t,
				promise: e,
				type: "loading",
				message: t.loading,
				description: typeof t.description == "function" ? void 0 : t.description
			}));
			let r = Promise.resolve(e instanceof Function ? e() : e), i = n !== void 0, a, o = r.then(async (e) => {
				if (a = ["resolve", e], p.isValidElement(e)) i = !1, this.create({
					id: n,
					type: "default",
					message: e
				});
				else if (V(e) && !e.ok) {
					i = !1;
					let r = typeof t.error == "function" ? await t.error(`HTTP error! status: ${e.status}`) : t.error, a = typeof t.description == "function" ? await t.description(`HTTP error! status: ${e.status}`) : t.description, o = typeof r == "object" && !p.isValidElement(r) ? r : { message: r };
					this.create({
						id: n,
						type: "error",
						description: a,
						...o
					});
				} else if (e instanceof Error) {
					i = !1;
					let r = typeof t.error == "function" ? await t.error(e) : t.error, a = typeof t.description == "function" ? await t.description(e) : t.description, o = typeof r == "object" && !p.isValidElement(r) ? r : { message: r };
					this.create({
						id: n,
						type: "error",
						description: a,
						...o
					});
				} else if (t.success !== void 0) {
					i = !1;
					let r = typeof t.success == "function" ? await t.success(e) : t.success, a = typeof t.description == "function" ? await t.description(e) : t.description, o = typeof r == "object" && !p.isValidElement(r) ? r : { message: r };
					this.create({
						id: n,
						type: "success",
						description: a,
						...o
					});
				}
			}).catch(async (e) => {
				if (a = ["reject", e], t.error !== void 0) {
					i = !1;
					let r = typeof t.error == "function" ? await t.error(e) : t.error, a = typeof t.description == "function" ? await t.description(e) : t.description, o = typeof r == "object" && !p.isValidElement(r) ? r : { message: r };
					this.create({
						id: n,
						type: "error",
						description: a,
						...o
					});
				}
			}).finally(() => {
				i && (this.dismiss(n), n = void 0), t.finally == null || t.finally.call(t);
			}), s = () => new Promise((e, t) => o.then(() => a[0] === "reject" ? t(a[1]) : e(a[1])).catch(t));
			return typeof n != "string" && typeof n != "number" ? { unwrap: s } : Object.assign(n, { unwrap: s });
		}, this.custom = (e, t) => {
			let n = t?.id || R++;
			return this.create({
				jsx: e(n),
				id: n,
				...t
			}), n;
		}, this.getActiveToasts = () => this.toasts.filter((e) => !this.dismissedToasts.has(e.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
	}
}(), B = (e, t) => {
	let n = t?.id || R++;
	return z.addToast({
		title: e,
		...t,
		id: n
	}), n;
}, V = (e) => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number", H = Object.assign(B, {
	success: z.success,
	info: z.info,
	warning: z.warning,
	error: z.error,
	custom: z.custom,
	message: z.message,
	promise: z.promise,
	dismiss: z.dismiss,
	loading: z.loading
}, {
	getHistory: () => z.toasts,
	getToasts: () => z.getActiveToasts()
});
F("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function U(e) {
	return e.label !== void 0;
}
var le = 3, ue = "24px", W = "16px", de = 4e3, G = 356, fe = 14, pe = 45, me = 200;
function K(...e) {
	return e.filter(Boolean).join(" ");
}
function he(e) {
	let [t, n] = e.split("-"), r = [];
	return t && r.push(t), n && r.push(n), r;
}
var ge = (e) => {
	let { invert: t, toast: n, unstyled: r, interacting: i, setHeights: a, visibleToasts: o, heights: s, index: c, toasts: l, expanded: u, removeToast: d, defaultRichColors: f, closeButton: m, style: h, cancelButtonStyle: g, actionButtonStyle: _, className: v = "", descriptionClassName: y = "", duration: b, position: x, gap: ee, expandByDefault: S, classNames: C, icons: w, closeButtonAriaLabel: te = "Close toast" } = e, [T, E] = p.useState(null), [D, O] = p.useState(null), [k, A] = p.useState(!1), [j, M] = p.useState(!1), [N, P] = p.useState(!1), [F, ne] = p.useState(!1), [ie, ae] = p.useState(!1), [oe, L] = p.useState(0), [R, z] = p.useState(0), B = p.useRef(n.duration || b || de), V = p.useRef(null), H = p.useRef(null), le = c === 0, ue = c + 1 <= o, W = n.type, G = n.dismissible !== !1, fe = n.className || "", ge = n.descriptionClassName || "", q = p.useMemo(() => s.findIndex((e) => e.toastId === n.id) || 0, [s, n.id]), _e = p.useMemo(() => n.closeButton ?? m, [n.closeButton, m]), ve = p.useMemo(() => n.duration || b || de, [n.duration, b]), J = p.useRef(0), Y = p.useRef(0), X = p.useRef(0), Z = p.useRef(null), [Q, ye] = x.split("-"), be = p.useMemo(() => s.reduce((e, t, n) => n >= q ? e : e + t.height, 0), [s, q]), xe = ce(), Se = n.invert || t, Ce = W === "loading";
	Y.current = p.useMemo(() => q * ee + be, [q, be]), p.useEffect(() => {
		B.current = ve;
	}, [ve]), p.useEffect(() => {
		A(!0);
	}, []), p.useEffect(() => {
		let e = H.current;
		if (e) {
			let t = e.getBoundingClientRect().height;
			return z(t), a((e) => [{
				toastId: n.id,
				height: t,
				position: n.position
			}, ...e]), () => a((e) => e.filter((e) => e.toastId !== n.id));
		}
	}, [a, n.id]), p.useLayoutEffect(() => {
		if (!k) return;
		let e = H.current, t = e.style.height;
		e.style.height = "auto";
		let r = e.getBoundingClientRect().height;
		e.style.height = t, z(r), a((e) => e.find((e) => e.toastId === n.id) ? e.map((e) => e.toastId === n.id ? {
			...e,
			height: r
		} : e) : [{
			toastId: n.id,
			height: r,
			position: n.position
		}, ...e]);
	}, [
		k,
		n.title,
		n.description,
		a,
		n.id,
		n.jsx,
		n.action,
		n.cancel
	]);
	let $ = p.useCallback(() => {
		M(!0), L(Y.current), a((e) => e.filter((e) => e.toastId !== n.id)), setTimeout(() => {
			d(n);
		}, me);
	}, [
		n,
		d,
		a,
		Y
	]);
	p.useEffect(() => {
		if (n.promise && W === "loading" || n.duration === Infinity || n.type === "loading") return;
		let e;
		return u || i || xe ? (() => {
			if (X.current < J.current) {
				let e = (/* @__PURE__ */ new Date()).getTime() - J.current;
				B.current -= e;
			}
			X.current = (/* @__PURE__ */ new Date()).getTime();
		})() : B.current !== Infinity && (J.current = (/* @__PURE__ */ new Date()).getTime(), e = setTimeout(() => {
			n.onAutoClose == null || n.onAutoClose.call(n, n), $();
		}, B.current)), () => clearTimeout(e);
	}, [
		u,
		i,
		n,
		W,
		xe,
		$
	]), p.useEffect(() => {
		n.delete && ($(), n.onDismiss == null || n.onDismiss.call(n, n));
	}, [$, n.delete]);
	function we() {
		return w?.loading ? /* @__PURE__ */ p.createElement("div", {
			className: K(C?.loader, n?.classNames?.loader, "sonner-loader"),
			"data-visible": W === "loading"
		}, w.loading) : /* @__PURE__ */ p.createElement(re, {
			className: K(C?.loader, n?.classNames?.loader),
			visible: W === "loading"
		});
	}
	let Te = n.icon || w?.[W] || I(W);
	return /* @__PURE__ */ p.createElement("li", {
		tabIndex: 0,
		ref: H,
		className: K(v, fe, C?.toast, n?.classNames?.toast, C?.default, C?.[W], n?.classNames?.[W]),
		"data-sonner-toast": "",
		"data-rich-colors": n.richColors ?? f,
		"data-styled": !(n.jsx || n.unstyled || r),
		"data-mounted": k,
		"data-promise": !!n.promise,
		"data-swiped": ie,
		"data-removed": j,
		"data-visible": ue,
		"data-y-position": Q,
		"data-x-position": ye,
		"data-index": c,
		"data-front": le,
		"data-swiping": N,
		"data-dismissible": G,
		"data-type": W,
		"data-invert": Se,
		"data-swipe-out": F,
		"data-swipe-direction": D,
		"data-expanded": !!(u || S && k),
		"data-testid": n.testId,
		style: {
			"--index": c,
			"--toasts-before": c,
			"--z-index": l.length - c,
			"--offset": `${j ? oe : Y.current}px`,
			"--initial-height": S ? "auto" : `${R}px`,
			...h,
			...n.style
		},
		onDragEnd: () => {
			P(!1), E(null), Z.current = null;
		},
		onPointerDown: (e) => {
			e.button !== 2 && (Ce || !G || (V.current = /* @__PURE__ */ new Date(), L(Y.current), e.target.setPointerCapture(e.pointerId), e.target.tagName !== "BUTTON" && (P(!0), Z.current = {
				x: e.clientX,
				y: e.clientY
			})));
		},
		onPointerUp: () => {
			if (F || !G) return;
			Z.current = null;
			let e = Number(H.current?.style.getPropertyValue("--swipe-amount-x").replace("px", "") || 0), t = Number(H.current?.style.getPropertyValue("--swipe-amount-y").replace("px", "") || 0), r = (/* @__PURE__ */ new Date()).getTime() - V.current?.getTime(), i = T === "x" ? e : t, a = Math.abs(i) / r;
			if (Math.abs(i) >= pe || a > .11) {
				L(Y.current), n.onDismiss == null || n.onDismiss.call(n, n), O(T === "x" ? e > 0 ? "right" : "left" : t > 0 ? "down" : "up"), $(), ne(!0);
				return;
			} else {
				var o, s;
				(o = H.current) == null || o.style.setProperty("--swipe-amount-x", "0px"), (s = H.current) == null || s.style.setProperty("--swipe-amount-y", "0px");
			}
			ae(!1), P(!1), E(null);
		},
		onPointerMove: (t) => {
			var n, r;
			if (!Z.current || !G || window.getSelection()?.toString().length > 0) return;
			let i = t.clientY - Z.current.y, a = t.clientX - Z.current.x, o = e.swipeDirections ?? he(x);
			!T && (Math.abs(a) > 1 || Math.abs(i) > 1) && E(Math.abs(a) > Math.abs(i) ? "x" : "y");
			let s = {
				x: 0,
				y: 0
			}, c = (e) => 1 / (1.5 + Math.abs(e) / 20);
			if (T === "y") {
				if (o.includes("top") || o.includes("bottom")) if (o.includes("top") && i < 0 || o.includes("bottom") && i > 0) s.y = i;
				else {
					let e = i * c(i);
					s.y = Math.abs(e) < Math.abs(i) ? e : i;
				}
			} else if (T === "x" && (o.includes("left") || o.includes("right"))) if (o.includes("left") && a < 0 || o.includes("right") && a > 0) s.x = a;
			else {
				let e = a * c(a);
				s.x = Math.abs(e) < Math.abs(a) ? e : a;
			}
			(Math.abs(s.x) > 0 || Math.abs(s.y) > 0) && ae(!0), (n = H.current) == null || n.style.setProperty("--swipe-amount-x", `${s.x}px`), (r = H.current) == null || r.style.setProperty("--swipe-amount-y", `${s.y}px`);
		}
	}, _e && !n.jsx && W !== "loading" ? /* @__PURE__ */ p.createElement("button", {
		"aria-label": te,
		"data-disabled": Ce,
		"data-close-button": !0,
		onClick: Ce || !G ? () => {} : () => {
			$(), n.onDismiss == null || n.onDismiss.call(n, n);
		},
		className: K(C?.closeButton, n?.classNames?.closeButton)
	}, w?.close ?? se) : null, (W || n.icon || n.promise) && n.icon !== null && (w?.[W] !== null || n.icon) ? /* @__PURE__ */ p.createElement("div", {
		"data-icon": "",
		className: K(C?.icon, n?.classNames?.icon)
	}, n.promise || n.type === "loading" && !n.icon ? n.icon || we() : null, n.type === "loading" ? null : Te) : null, /* @__PURE__ */ p.createElement("div", {
		"data-content": "",
		className: K(C?.content, n?.classNames?.content)
	}, /* @__PURE__ */ p.createElement("div", {
		"data-title": "",
		className: K(C?.title, n?.classNames?.title)
	}, n.jsx ? n.jsx : typeof n.title == "function" ? n.title() : n.title), n.description ? /* @__PURE__ */ p.createElement("div", {
		"data-description": "",
		className: K(y, ge, C?.description, n?.classNames?.description)
	}, typeof n.description == "function" ? n.description() : n.description) : null), /* @__PURE__ */ p.isValidElement(n.cancel) ? n.cancel : n.cancel && U(n.cancel) ? /* @__PURE__ */ p.createElement("button", {
		"data-button": !0,
		"data-cancel": !0,
		style: n.cancelButtonStyle || g,
		onClick: (e) => {
			U(n.cancel) && G && (n.cancel.onClick == null || n.cancel.onClick.call(n.cancel, e), $());
		},
		className: K(C?.cancelButton, n?.classNames?.cancelButton)
	}, n.cancel.label) : null, /* @__PURE__ */ p.isValidElement(n.action) ? n.action : n.action && U(n.action) ? /* @__PURE__ */ p.createElement("button", {
		"data-button": !0,
		"data-action": !0,
		style: n.actionButtonStyle || _,
		onClick: (e) => {
			U(n.action) && (n.action.onClick == null || n.action.onClick.call(n.action, e), !e.defaultPrevented && $());
		},
		className: K(C?.actionButton, n?.classNames?.actionButton)
	}, n.action.label) : null);
};
function q() {
	if (typeof window > "u" || typeof document > "u") return "ltr";
	let e = document.documentElement.getAttribute("dir");
	return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
function _e(e, t) {
	let n = {};
	return [e, t].forEach((e, t) => {
		let r = t === 1, i = r ? "--mobile-offset" : "--offset", a = r ? W : ue;
		function o(e) {
			[
				"top",
				"right",
				"bottom",
				"left"
			].forEach((t) => {
				n[`${i}-${t}`] = typeof e == "number" ? `${e}px` : e;
			});
		}
		typeof e == "number" || typeof e == "string" ? o(e) : typeof e == "object" ? [
			"top",
			"right",
			"bottom",
			"left"
		].forEach((t) => {
			e[t] === void 0 ? n[`${i}-${t}`] = a : n[`${i}-${t}`] = typeof e[t] == "number" ? `${e[t]}px` : e[t];
		}) : o(a);
	}), n;
}
var ve = /* @__PURE__ */ p.forwardRef(function(e, t) {
	let { id: n, invert: r, position: i = "bottom-right", hotkey: a = ["altKey", "KeyT"], expand: o, closeButton: s, className: c, offset: l, mobileOffset: u, theme: d = "light", richColors: f, duration: m, style: h, visibleToasts: g = le, toastOptions: v, dir: y = q(), gap: b = fe, icons: x, containerAriaLabel: ee = "Notifications" } = e, [S, C] = p.useState([]), w = p.useMemo(() => n ? S.filter((e) => e.toasterId === n) : S.filter((e) => !e.toasterId), [S, n]), te = p.useMemo(() => Array.from(new Set([i].concat(w.filter((e) => e.position).map((e) => e.position)))), [w, i]), [T, E] = p.useState([]), [D, O] = p.useState(!1), [k, A] = p.useState(!1), [j, M] = p.useState(d === "system" ? typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : d), N = p.useRef(null), P = a.join("+").replace(/Key/g, "").replace(/Digit/g, ""), F = p.useRef(null), I = p.useRef(!1), ne = p.useCallback((e) => {
		C((t) => (t.find((t) => t.id === e.id)?.delete || z.dismiss(e.id), t.filter(({ id: t }) => t !== e.id)));
	}, []);
	return p.useEffect(() => z.subscribe((e) => {
		if (e.dismiss) {
			requestAnimationFrame(() => {
				C((t) => t.map((t) => t.id === e.id ? {
					...t,
					delete: !0
				} : t));
			});
			return;
		}
		setTimeout(() => {
			_.flushSync(() => {
				C((t) => {
					let n = t.findIndex((t) => t.id === e.id);
					return n === -1 ? [e, ...t] : [
						...t.slice(0, n),
						{
							...t[n],
							...e
						},
						...t.slice(n + 1)
					];
				});
			});
		});
	}), [S]), p.useEffect(() => {
		if (d !== "system") {
			M(d);
			return;
		}
		if (d === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? M("dark") : M("light")), typeof window > "u") return;
		let e = window.matchMedia("(prefers-color-scheme: dark)");
		try {
			e.addEventListener("change", ({ matches: e }) => {
				M(e ? "dark" : "light");
			});
		} catch {
			e.addListener(({ matches: e }) => {
				try {
					M(e ? "dark" : "light");
				} catch (e) {
					console.error(e);
				}
			});
		}
	}, [d]), p.useEffect(() => {
		S.length <= 1 && O(!1);
	}, [S]), p.useEffect(() => {
		let e = (e) => {
			if (a.every((t) => e[t] || e.code === t)) {
				var t;
				O(!0), (t = N.current) == null || t.focus();
			}
			e.code === "Escape" && (document.activeElement === N.current || N.current?.contains(document.activeElement)) && O(!1);
		};
		return document.addEventListener("keydown", e), () => document.removeEventListener("keydown", e);
	}, [a]), p.useEffect(() => {
		if (N.current) return () => {
			F.current && (F.current.focus({ preventScroll: !0 }), F.current = null, I.current = !1);
		};
	}, [N.current]), /* @__PURE__ */ p.createElement("section", {
		ref: t,
		"aria-label": `${ee} ${P}`,
		tabIndex: -1,
		"aria-live": "polite",
		"aria-relevant": "additions text",
		"aria-atomic": "false",
		suppressHydrationWarning: !0
	}, te.map((t, n) => {
		let [i, a] = t.split("-");
		return w.length ? /* @__PURE__ */ p.createElement("ol", {
			key: t,
			dir: y === "auto" ? q() : y,
			tabIndex: -1,
			ref: N,
			className: c,
			"data-sonner-toaster": !0,
			"data-sonner-theme": j,
			"data-y-position": i,
			"data-x-position": a,
			style: {
				"--front-toast-height": `${T[0]?.height || 0}px`,
				"--width": `${G}px`,
				"--gap": `${b}px`,
				...h,
				..._e(l, u)
			},
			onBlur: (e) => {
				I.current && !e.currentTarget.contains(e.relatedTarget) && (I.current = !1, F.current &&= (F.current.focus({ preventScroll: !0 }), null));
			},
			onFocus: (e) => {
				e.target instanceof HTMLElement && e.target.dataset.dismissible === "false" || I.current || (I.current = !0, F.current = e.relatedTarget);
			},
			onMouseEnter: () => O(!0),
			onMouseMove: () => O(!0),
			onMouseLeave: () => {
				k || O(!1);
			},
			onDragEnd: () => O(!1),
			onPointerDown: (e) => {
				e.target instanceof HTMLElement && e.target.dataset.dismissible === "false" || A(!0);
			},
			onPointerUp: () => A(!1)
		}, w.filter((e) => !e.position && n === 0 || e.position === t).map((n, i) => /* @__PURE__ */ p.createElement(ge, {
			key: n.id,
			icons: x,
			index: i,
			toast: n,
			defaultRichColors: f,
			duration: v?.duration ?? m,
			className: v?.className,
			descriptionClassName: v?.descriptionClassName,
			invert: r,
			visibleToasts: g,
			closeButton: v?.closeButton ?? s,
			interacting: k,
			position: t,
			style: v?.style,
			unstyled: v?.unstyled,
			classNames: v?.classNames,
			cancelButtonStyle: v?.cancelButtonStyle,
			actionButtonStyle: v?.actionButtonStyle,
			closeButtonAriaLabel: v?.closeButtonAriaLabel,
			removeToast: ne,
			toasts: w.filter((e) => e.position == n.position),
			heights: T.filter((e) => e.position == n.position),
			setHeights: E,
			expandByDefault: o,
			gap: b,
			expanded: D,
			swipeDirections: e.swipeDirections
		}))) : null;
	}));
}), J = {
	actionButton: "rounded-[var(--sdk-radius-control)] bg-[var(--sdk-color-brand-primary)] px-3 py-1 text-xs font-medium text-[var(--sdk-color-text-inverse)] transition-colors hover:bg-[var(--sdk-color-brand-primary-hover)]",
	cancelButton: "rounded-[var(--sdk-radius-control)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel-muted)] px-3 py-1 text-xs font-medium text-[var(--sdk-color-text-secondary)] transition-colors hover:bg-[var(--sdk-color-surface-elevated)] hover:text-[var(--sdk-color-text-primary)]",
	closeButton: "rounded-full border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] text-[var(--sdk-color-text-muted)] transition-colors hover:bg-[var(--sdk-color-surface-elevated)] hover:text-[var(--sdk-color-text-primary)]",
	description: "text-sm leading-6 text-[var(--sdk-color-text-secondary)]",
	loader: "text-[var(--sdk-color-brand-primary)]",
	success: "border-[color-mix(in_srgb,var(--sdk-color-state-success)_32%,transparent)]",
	error: "border-[color-mix(in_srgb,var(--sdk-color-state-danger)_32%,transparent)]",
	info: "border-[color-mix(in_srgb,var(--sdk-color-state-info)_32%,transparent)]",
	title: "text-sm font-semibold text-[var(--sdk-color-text-primary)]",
	toast: "group rounded-[var(--sdk-radius-control)] border border-[var(--sdk-color-border-default)] bg-[var(--sdk-color-surface-panel)] text-[var(--sdk-color-text-primary)] shadow-[var(--sdk-shadow-md)]",
	warning: "border-[color-mix(in_srgb,var(--sdk-color-state-warning)_32%,transparent)]"
};
function Y(e) {
	return {
		classNames: {
			...J,
			...e?.classNames ?? {}
		},
		...e
	};
}
function X({ closeButton: e = !0, expand: t = !0, position: n = "bottom-right", richColors: r = !0, theme: i, toastOptions: a, ...o }) {
	let { colorMode: s } = d();
	return /* @__PURE__ */ h(ve, {
		closeButton: e,
		"data-sdk-ui": "toaster",
		"data-slot": "toaster",
		expand: t,
		position: n,
		richColors: r,
		theme: i ?? s,
		toastOptions: Y(a),
		...o
	});
}
function Z(e) {
	return /* @__PURE__ */ h(X, {
		"data-sdk-ui": "sdkwork-toaster",
		"data-slot": "sdkwork-toaster",
		...e
	});
}
var Q = Object.assign((e, t) => H(e, t), {
	custom: (e, t) => H.custom(e, t),
	dismiss: (e) => H.dismiss(e),
	error: (e, t) => H.error(e, t),
	info: (e, t) => H.info(e, t),
	loading: (e, t) => H.loading(e, t),
	message: (e, t) => H.message(e, t),
	promise: (e, t) => H.promise(e, t),
	success: (e, t) => H.success(e, t),
	warning: (e, t) => H.warning(e, t)
}), ye = Q;
X.displayName = "Toaster", Z.displayName = "SdkworkToaster";
//#endregion
export { P as a, D as c, Q as i, E as l, X as n, N as o, ye as r, O as s, Z as t, S as u };

//# sourceMappingURL=feedback-B1nca0uN.js.map