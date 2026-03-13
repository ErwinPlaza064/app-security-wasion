export function ValidityBadge({ validity, size = "sm" }) {
    const v = validity || "Vigente";
    
    // Configuración de colores basada en el estado
    const config = {
        'Vigente': {
            bg: "bg-emerald-50/50",
            text: "text-emerald-700",
            border: "border-emerald-100",
            dot: "bg-emerald-500"
        },
        'Vencido': {
            bg: "bg-rose-50/50",
            text: "text-rose-700",
            border: "border-rose-100",
            dot: "bg-rose-500"
        },
        'Expirado': {
            bg: "bg-rose-50/50",
            text: "text-rose-700",
            border: "border-rose-100",
            dot: "bg-rose-500"
        },
        'Pendiente': {
            bg: "bg-amber-50/50",
            text: "text-amber-700",
            border: "border-amber-100",
            dot: "bg-amber-600"
        }
    };

    const c = config[v] || config['Vigente'];
    const baseClass = size === "lg" ? "px-3 py-1 text-xs" : "px-2.5 py-0.5 text-[10px]";

    return (
        <span
            className={`${baseClass} rounded-full font-semibold inline-flex items-center gap-1.5 ${c.bg} ${c.text} border ${c.border}`}
        >
            <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
            {v}
        </span>
    );
}

const STATUS_COLORS = {
    Completa: {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-100",
        dot: "bg-emerald-600",
    },
    Pendiente: {
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-100",
        dot: "bg-amber-600",
    },
    Vencida: {
        bg: "bg-red-50",
        text: "text-red-600",
        border: "border-red-100",
        dot: "bg-red-500",
    },
    "En Revisión": {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-100",
        dot: "bg-blue-600",
    },
    "No Entregada": {
        bg: "bg-rose-50",
        text: "text-rose-600",
        border: "border-rose-100",
        dot: "bg-rose-500",
    },
};

const DEFAULT_STATUS_COLOR = {
    bg: "bg-slate-50",
    text: "text-slate-600",
    border: "border-slate-100",
    dot: "bg-slate-500",
};

export function StatusBadge({ status, size = "sm" }) {
    const c = STATUS_COLORS[status] || DEFAULT_STATUS_COLOR;
    const baseClass =
        size === "lg" ? "px-3 py-1 text-xs" : "px-2.5 py-0.5 text-[10px]";
    return (
        <span
            className={`${baseClass} rounded-full font-semibold inline-flex items-center gap-1.5 ${c.bg} ${c.text} border ${c.border}`}
        >
            <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
            {status || "SIN DATOS"}
        </span>
    );
}
