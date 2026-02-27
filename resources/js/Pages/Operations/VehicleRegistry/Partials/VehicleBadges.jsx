export function ValidityBadge({ validity, size = "sm" }) {
    const v = validity || "Vigente";
    const isActive = v === "Vigente";
    const baseClass =
        size === "lg"
            ? "px-4 py-1.5 text-[10px]"
            : "px-2.5 py-1 text-[9px]";
    return (
        <span
            className={`${baseClass} rounded-full font-black tracking-widest inline-flex items-center gap-1.5 ${
                isActive
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                    : "bg-red-50 text-red-500 border border-red-200"
            }`}
        >
            <span
                className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-red-400"}`}
            />
            {v.toUpperCase()}
        </span>
    );
}

const STATUS_COLORS = {
    Completa: {
        bg: "bg-emerald-50",
        text: "text-emerald-600",
        border: "border-emerald-200",
        dot: "bg-emerald-500",
    },
    Pendiente: {
        bg: "bg-amber-50",
        text: "text-amber-600",
        border: "border-amber-200",
        dot: "bg-amber-500",
    },
    Vencida: {
        bg: "bg-red-50",
        text: "text-red-500",
        border: "border-red-200",
        dot: "bg-red-400",
    },
    "En Revisión": {
        bg: "bg-primary-50",
        text: "text-primary-700",
        border: "border-primary-200",
        dot: "bg-primary-500",
    },
    "No Entregada": {
        bg: "bg-rose-50",
        text: "text-rose-500",
        border: "border-rose-200",
        dot: "bg-rose-400",
    },
};

const DEFAULT_STATUS_COLOR = {
    bg: "bg-gray-100",
    text: "text-gray-400",
    border: "border-gray-200",
    dot: "bg-gray-400",
};

export function StatusBadge({ status, size = "sm" }) {
    const c = STATUS_COLORS[status] || DEFAULT_STATUS_COLOR;
    const baseClass =
        size === "lg"
            ? "px-4 py-1.5 text-[10px]"
            : "px-2.5 py-1 text-[9px]";
    return (
        <span
            className={`${baseClass} rounded-full font-black tracking-widest inline-flex items-center gap-1.5 ${c.bg} ${c.text} border ${c.border}`}
        >
            <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
            {(status || "SIN DATOS").toUpperCase()}
        </span>
    );
}
