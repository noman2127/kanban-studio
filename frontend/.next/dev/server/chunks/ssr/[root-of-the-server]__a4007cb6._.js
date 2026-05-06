module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/components/KanbanCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "KanbanCard",
    ()=>KanbanCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/sortable/dist/sortable.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/utilities/dist/utilities.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
;
;
;
;
const KanbanCard = ({ card, onDelete })=>{
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSortable"])({
        id: card.id
    });
    const style = {
        transform: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CSS"].Transform.toString(transform),
        transition
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        ref: setNodeRef,
        style: style,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("rounded-2xl border border-transparent bg-white px-4 py-4 shadow-[0_12px_24px_rgba(3,33,71,0.08)]", "transition-all duration-150", isDragging && "opacity-60 shadow-[0_18px_32px_rgba(3,33,71,0.16)]"),
        ...attributes,
        ...listeners,
        "data-testid": `card-${card.id}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-start justify-between gap-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                            className: "font-display text-base font-semibold text-[var(--navy-dark)]",
                            children: card.title
                        }, void 0, false, {
                            fileName: "[project]/src/components/KanbanCard.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-sm leading-6 text-[var(--gray-text)]",
                            children: card.details
                        }, void 0, false, {
                            fileName: "[project]/src/components/KanbanCard.tsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/KanbanCard.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>onDelete(card.id),
                    className: "rounded-full border border-transparent px-2 py-1 text-xs font-semibold text-[var(--gray-text)] transition hover:border-[var(--stroke)] hover:text-[var(--navy-dark)]",
                    "aria-label": `Delete ${card.title}`,
                    children: "Remove"
                }, void 0, false, {
                    fileName: "[project]/src/components/KanbanCard.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/KanbanCard.tsx",
            lineNumber: 33,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/KanbanCard.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/components/NewCardForm.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NewCardForm",
    ()=>NewCardForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
const initialFormState = {
    title: "",
    details: ""
};
const NewCardForm = ({ onAdd })=>{
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [formState, setFormState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialFormState);
    const handleSubmit = (event)=>{
        event.preventDefault();
        if (!formState.title.trim()) {
            return;
        }
        onAdd(formState.title.trim(), formState.details.trim());
        setFormState(initialFormState);
        setIsOpen(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-4",
        children: isOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            onSubmit: handleSubmit,
            className: "space-y-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    value: formState.title,
                    onChange: (event)=>setFormState((prev)=>({
                                ...prev,
                                title: event.target.value
                            })),
                    placeholder: "Card title",
                    className: "w-full rounded-xl border border-[var(--stroke)] bg-white px-3 py-2 text-sm font-medium text-[var(--navy-dark)] outline-none transition focus:border-[var(--primary-blue)]",
                    required: true
                }, void 0, false, {
                    fileName: "[project]/src/components/NewCardForm.tsx",
                    lineNumber: 27,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                    value: formState.details,
                    onChange: (event)=>setFormState((prev)=>({
                                ...prev,
                                details: event.target.value
                            })),
                    placeholder: "Details",
                    rows: 3,
                    className: "w-full resize-none rounded-xl border border-[var(--stroke)] bg-white px-3 py-2 text-sm text-[var(--gray-text)] outline-none transition focus:border-[var(--primary-blue)]"
                }, void 0, false, {
                    fileName: "[project]/src/components/NewCardForm.tsx",
                    lineNumber: 36,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            className: "rounded-full bg-[var(--secondary-purple)] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:brightness-110",
                            children: "Add card"
                        }, void 0, false, {
                            fileName: "[project]/src/components/NewCardForm.tsx",
                            lineNumber: 46,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>{
                                setIsOpen(false);
                                setFormState(initialFormState);
                            },
                            className: "rounded-full border border-[var(--stroke)] px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--gray-text)] transition hover:text-[var(--navy-dark)]",
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/src/components/NewCardForm.tsx",
                            lineNumber: 52,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/NewCardForm.tsx",
                    lineNumber: 45,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/NewCardForm.tsx",
            lineNumber: 26,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: ()=>setIsOpen(true),
            className: "w-full rounded-full border border-dashed border-[var(--stroke)] px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--primary-blue)] transition hover:border-[var(--primary-blue)]",
            children: "Add a card"
        }, void 0, false, {
            fileName: "[project]/src/components/NewCardForm.tsx",
            lineNumber: 65,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/NewCardForm.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/components/KanbanColumn.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "KanbanColumn",
    ()=>KanbanColumn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/core/dist/core.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/sortable/dist/sortable.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$KanbanCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/KanbanCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NewCardForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/NewCardForm.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
const KanbanColumn = ({ column, cards, onRename, onAddCard, onDeleteCard })=>{
    const { setNodeRef, isOver } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDroppable"])({
        id: column.id
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: setNodeRef,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("flex min-h-[520px] flex-col rounded-3xl border border-[var(--stroke)] bg-[var(--surface-strong)] p-4 shadow-[var(--shadow)] transition", isOver && "ring-2 ring-[var(--accent-yellow)]"),
        "data-testid": `column-${column.id}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between gap-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-2 w-10 rounded-full bg-[var(--accent-yellow)]"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/KanbanColumn.tsx",
                                    lineNumber: 37,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gray-text)]",
                                    children: [
                                        cards.length,
                                        " cards"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/KanbanColumn.tsx",
                                    lineNumber: 38,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/KanbanColumn.tsx",
                            lineNumber: 36,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: column.title,
                            onChange: (event)=>onRename(column.id, event.target.value),
                            className: "mt-3 w-full bg-transparent font-display text-lg font-semibold text-[var(--navy-dark)] outline-none",
                            "aria-label": "Column title"
                        }, void 0, false, {
                            fileName: "[project]/src/components/KanbanColumn.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/KanbanColumn.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/KanbanColumn.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex flex-1 flex-col gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SortableContext"], {
                        items: column.cardIds,
                        strategy: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalListSortingStrategy"],
                        children: cards.map((card)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$KanbanCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KanbanCard"], {
                                card: card,
                                onDelete: (cardId)=>onDeleteCard(column.id, cardId)
                            }, card.id, false, {
                                fileName: "[project]/src/components/KanbanColumn.tsx",
                                lineNumber: 53,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/components/KanbanColumn.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    cards.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-1 items-center justify-center rounded-2xl border border-dashed border-[var(--stroke)] px-3 py-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gray-text)]",
                        children: "Drop a card here"
                    }, void 0, false, {
                        fileName: "[project]/src/components/KanbanColumn.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/KanbanColumn.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NewCardForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NewCardForm"], {
                onAdd: (title, details)=>onAddCard(column.id, title, details)
            }, void 0, false, {
                fileName: "[project]/src/components/KanbanColumn.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/KanbanColumn.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/components/KanbanCardPreview.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "KanbanCardPreview",
    ()=>KanbanCardPreview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const KanbanCardPreview = ({ card })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "rounded-2xl border border-transparent bg-white px-4 py-4 shadow-[0_18px_32px_rgba(3,33,71,0.16)]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-start justify-between gap-3",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "font-display text-base font-semibold text-[var(--navy-dark)]",
                        children: card.title
                    }, void 0, false, {
                        fileName: "[project]/src/components/KanbanCardPreview.tsx",
                        lineNumber: 11,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm leading-6 text-[var(--gray-text)]",
                        children: card.details
                    }, void 0, false, {
                        fileName: "[project]/src/components/KanbanCardPreview.tsx",
                        lineNumber: 14,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/KanbanCardPreview.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/components/KanbanCardPreview.tsx",
            lineNumber: 9,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/KanbanCardPreview.tsx",
        lineNumber: 8,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
}),
"[project]/src/lib/kanban.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createId",
    ()=>createId,
    "initialData",
    ()=>initialData,
    "moveCard",
    ()=>moveCard
]);
const initialData = {
    columns: [
        {
            id: "col-backlog",
            title: "Backlog",
            cardIds: [
                "card-1",
                "card-2"
            ]
        },
        {
            id: "col-discovery",
            title: "Discovery",
            cardIds: [
                "card-3"
            ]
        },
        {
            id: "col-progress",
            title: "In Progress",
            cardIds: [
                "card-4",
                "card-5"
            ]
        },
        {
            id: "col-review",
            title: "Review",
            cardIds: [
                "card-6"
            ]
        },
        {
            id: "col-done",
            title: "Done",
            cardIds: [
                "card-7",
                "card-8"
            ]
        }
    ],
    cards: {
        "card-1": {
            id: "card-1",
            title: "Align roadmap themes",
            details: "Draft quarterly themes with impact statements and metrics."
        },
        "card-2": {
            id: "card-2",
            title: "Gather customer signals",
            details: "Review support tags, sales notes, and churn feedback."
        },
        "card-3": {
            id: "card-3",
            title: "Prototype analytics view",
            details: "Sketch initial dashboard layout and key drill-downs."
        },
        "card-4": {
            id: "card-4",
            title: "Refine status language",
            details: "Standardize column labels and tone across the board."
        },
        "card-5": {
            id: "card-5",
            title: "Design card layout",
            details: "Add hierarchy and spacing for scanning dense lists."
        },
        "card-6": {
            id: "card-6",
            title: "QA micro-interactions",
            details: "Verify hover, focus, and loading states."
        },
        "card-7": {
            id: "card-7",
            title: "Ship marketing page",
            details: "Final copy approved and asset pack delivered."
        },
        "card-8": {
            id: "card-8",
            title: "Close onboarding sprint",
            details: "Document release notes and share internally."
        }
    }
};
const isColumnId = (columns, id)=>columns.some((column)=>column.id === id);
const findColumnId = (columns, id)=>{
    if (isColumnId(columns, id)) {
        return id;
    }
    return columns.find((column)=>column.cardIds.includes(id))?.id;
};
const moveCard = (columns, activeId, overId)=>{
    const activeColumnId = findColumnId(columns, activeId);
    const overColumnId = findColumnId(columns, overId);
    if (!activeColumnId || !overColumnId) {
        return columns;
    }
    const activeColumn = columns.find((column)=>column.id === activeColumnId);
    const overColumn = columns.find((column)=>column.id === overColumnId);
    if (!activeColumn || !overColumn) {
        return columns;
    }
    const isOverColumn = isColumnId(columns, overId);
    if (activeColumnId === overColumnId) {
        if (isOverColumn) {
            const nextCardIds = activeColumn.cardIds.filter((cardId)=>cardId !== activeId);
            nextCardIds.push(activeId);
            return columns.map((column)=>column.id === activeColumnId ? {
                    ...column,
                    cardIds: nextCardIds
                } : column);
        }
        const oldIndex = activeColumn.cardIds.indexOf(activeId);
        const newIndex = activeColumn.cardIds.indexOf(overId);
        if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
            return columns;
        }
        const nextCardIds = [
            ...activeColumn.cardIds
        ];
        nextCardIds.splice(oldIndex, 1);
        nextCardIds.splice(newIndex, 0, activeId);
        return columns.map((column)=>column.id === activeColumnId ? {
                ...column,
                cardIds: nextCardIds
            } : column);
    }
    const activeIndex = activeColumn.cardIds.indexOf(activeId);
    if (activeIndex === -1) {
        return columns;
    }
    const nextActiveCardIds = [
        ...activeColumn.cardIds
    ];
    nextActiveCardIds.splice(activeIndex, 1);
    const nextOverCardIds = [
        ...overColumn.cardIds
    ];
    if (isOverColumn) {
        nextOverCardIds.push(activeId);
    } else {
        const overIndex = overColumn.cardIds.indexOf(overId);
        const insertIndex = overIndex === -1 ? nextOverCardIds.length : overIndex;
        nextOverCardIds.splice(insertIndex, 0, activeId);
    }
    return columns.map((column)=>{
        if (column.id === activeColumnId) {
            return {
                ...column,
                cardIds: nextActiveCardIds
            };
        }
        if (column.id === overColumnId) {
            return {
                ...column,
                cardIds: nextOverCardIds
            };
        }
        return column;
    });
};
const createId = (prefix)=>{
    const randomPart = Math.random().toString(36).slice(2, 8);
    const timePart = Date.now().toString(36);
    return `${prefix}-${randomPart}${timePart}`;
};
}),
"[project]/src/components/KanbanBoard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "KanbanBoard",
    ()=>KanbanBoard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/core/dist/core.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$KanbanColumn$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/KanbanColumn.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$KanbanCardPreview$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/KanbanCardPreview.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$kanban$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/kanban.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const KanbanBoard = ()=>{
    const [board, setBoard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$kanban$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialData"]);
    const [activeCardId, setActiveCardId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const sensors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSensors"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointerSensor"], {
        activationConstraint: {
            distance: 6
        }
    }));
    const cardsById = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>board.cards, [
        board.cards
    ]);
    const handleDragStart = (event)=>{
        setActiveCardId(event.active.id);
    };
    const handleDragEnd = (event)=>{
        const { active, over } = event;
        setActiveCardId(null);
        if (!over || active.id === over.id) {
            return;
        }
        setBoard((prev)=>({
                ...prev,
                columns: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$kanban$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["moveCard"])(prev.columns, active.id, over.id)
            }));
    };
    const handleRenameColumn = (columnId, title)=>{
        setBoard((prev)=>({
                ...prev,
                columns: prev.columns.map((column)=>column.id === columnId ? {
                        ...column,
                        title
                    } : column)
            }));
    };
    const handleAddCard = (columnId, title, details)=>{
        const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$kanban$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createId"])("card");
        setBoard((prev)=>({
                ...prev,
                cards: {
                    ...prev.cards,
                    [id]: {
                        id,
                        title,
                        details: details || "No details yet."
                    }
                },
                columns: prev.columns.map((column)=>column.id === columnId ? {
                        ...column,
                        cardIds: [
                            ...column.cardIds,
                            id
                        ]
                    } : column)
            }));
    };
    const handleDeleteCard = (columnId, cardId)=>{
        setBoard((prev)=>{
            return {
                ...prev,
                cards: Object.fromEntries(Object.entries(prev.cards).filter(([id])=>id !== cardId)),
                columns: prev.columns.map((column)=>column.id === columnId ? {
                        ...column,
                        cardIds: column.cardIds.filter((id)=>id !== cardId)
                    } : column)
            };
        });
    };
    const activeCard = activeCardId ? cardsById[activeCardId] : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute left-0 top-0 h-[420px] w-[420px] -translate-x-1/3 -translate-y-1/3 rounded-full bg-[radial-gradient(circle,_rgba(32,157,215,0.25)_0%,_rgba(32,157,215,0.05)_55%,_transparent_70%)]"
            }, void 0, false, {
                fileName: "[project]/src/components/KanbanBoard.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute bottom-0 right-0 h-[520px] w-[520px] translate-x-1/4 translate-y-1/4 rounded-full bg-[radial-gradient(circle,_rgba(117,57,145,0.18)_0%,_rgba(117,57,145,0.05)_55%,_transparent_75%)]"
            }, void 0, false, {
                fileName: "[project]/src/components/KanbanBoard.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "relative mx-auto flex min-h-screen max-w-[1500px] flex-col gap-10 px-6 pb-16 pt-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "flex flex-col gap-6 rounded-[32px] border border-[var(--stroke)] bg-white/80 p-8 shadow-[var(--shadow)] backdrop-blur",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-start justify-between gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs font-semibold uppercase tracking-[0.35em] text-[var(--gray-text)]",
                                                children: "Single Board Kanban"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/KanbanBoard.tsx",
                                                lineNumber: 103,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "mt-3 font-display text-4xl font-semibold text-[var(--navy-dark)]",
                                                children: "Kanban Studio"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/KanbanBoard.tsx",
                                                lineNumber: 106,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-3 max-w-xl text-sm leading-6 text-[var(--gray-text)]",
                                                children: "Keep momentum visible. Rename columns, drag cards between stages, and capture quick notes without getting buried in settings."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/KanbanBoard.tsx",
                                                lineNumber: 109,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/KanbanBoard.tsx",
                                        lineNumber: 102,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-2xl border border-[var(--stroke)] bg-[var(--surface)] px-5 py-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs font-semibold uppercase tracking-[0.25em] text-[var(--gray-text)]",
                                                children: "Focus"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/KanbanBoard.tsx",
                                                lineNumber: 115,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-lg font-semibold text-[var(--primary-blue)]",
                                                children: "One board. Five columns. Zero clutter."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/KanbanBoard.tsx",
                                                lineNumber: 118,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/KanbanBoard.tsx",
                                        lineNumber: 114,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/KanbanBoard.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-4",
                                children: board.columns.map((column)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 rounded-full border border-[var(--stroke)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--navy-dark)]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "h-2 w-2 rounded-full bg-[var(--accent-yellow)]"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/KanbanBoard.tsx",
                                                lineNumber: 129,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            column.title
                                        ]
                                    }, column.id, true, {
                                        fileName: "[project]/src/components/KanbanBoard.tsx",
                                        lineNumber: 125,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/src/components/KanbanBoard.tsx",
                                lineNumber: 123,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/KanbanBoard.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DndContext"], {
                        sensors: sensors,
                        collisionDetection: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["closestCorners"],
                        onDragStart: handleDragStart,
                        onDragEnd: handleDragEnd,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "grid gap-6 lg:grid-cols-5",
                                children: board.columns.map((column)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$KanbanColumn$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KanbanColumn"], {
                                        column: column,
                                        cards: column.cardIds.map((cardId)=>board.cards[cardId]),
                                        onRename: handleRenameColumn,
                                        onAddCard: handleAddCard,
                                        onDeleteCard: handleDeleteCard
                                    }, column.id, false, {
                                        fileName: "[project]/src/components/KanbanBoard.tsx",
                                        lineNumber: 144,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/src/components/KanbanBoard.tsx",
                                lineNumber: 142,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DragOverlay"], {
                                children: activeCard ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-[260px]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$KanbanCardPreview$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KanbanCardPreview"], {
                                        card: activeCard
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/KanbanBoard.tsx",
                                        lineNumber: 157,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/KanbanBoard.tsx",
                                    lineNumber: 156,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)) : null
                            }, void 0, false, {
                                fileName: "[project]/src/components/KanbanBoard.tsx",
                                lineNumber: 154,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/KanbanBoard.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/KanbanBoard.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/KanbanBoard.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a4007cb6._.js.map