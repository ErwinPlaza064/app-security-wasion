import Modal from "@/Components/Modal";
import { ValidityBadge, StatusBadge } from "./VehicleBadges";

export default function VehicleDetailModal({ show, vehicle, onClose }) {
    if (!vehicle) return null;

    return (
        <Modal show={show} onClose={onClose} maxWidth="lg">
            <div className="overflow-hidden">
                {/* ── Header ── */}
                <div className="bg-primary relative overflow-hidden">
                    {/* Decorative circles */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
                    <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-white/5" />
                    <div className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full bg-white/[0.03]" />

                    <div className="relative px-8 py-7">
                        <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                                <p className="text-primary-200 text-[9px] font-black uppercase tracking-[0.35em] mb-2">
                                    Ficha del Colaborador
                                </p>
                                <h2 className="text-[22px] font-black text-white uppercase tracking-tight leading-tight truncate">
                                    {vehicle.employee_name}
                                </h2>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white/80 text-[9px] font-bold uppercase tracking-widest border border-white/10">
                                        {vehicle.area}
                                    </span>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white/80 text-[9px] font-bold uppercase tracking-widest border border-white/10">
                                        {vehicle.plant}
                                    </span>
                                </div>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm flex flex-col items-center justify-center">
                                    <span className="text-white/50 text-[8px] font-black tracking-widest uppercase leading-none">
                                        No.
                                    </span>
                                    <span className="text-white text-lg font-black leading-none mt-0.5">
                                        {vehicle.marbete_number}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Body ── */}
                <div className="bg-cream px-8 py-6 space-y-5">
                    {/* Vehículo 1 */}
                    <VehicleInfoCard
                        label="Vehículo Principal"
                        brand={vehicle.vehicle_brand}
                        model={vehicle.vehicle_model}
                        plates={vehicle.vehicle_plates}
                        variant="primary"
                    />

                    {/* Vehículo 2 */}
                    {vehicle.vehicle_brand_2 && (
                        <VehicleInfoCard
                            label="Vehículo Alternativo"
                            brand={vehicle.vehicle_brand_2}
                            model={vehicle.vehicle_model_2}
                            plates={vehicle.vehicle_plates_2}
                            variant="amber"
                        />
                    )}

                    {/* Status Row */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
                            <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-2.5">
                                Vigencia del Marbete
                            </p>
                            <ValidityBadge
                                validity={vehicle.validity_status}
                                size="lg"
                            />
                        </div>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
                            <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-2.5">
                                Estatus de Documentación
                            </p>
                            <StatusBadge
                                status={vehicle.documentation_status}
                                size="lg"
                            />
                        </div>
                    </div>

                    {/* Footer - Quien Registró */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-primary"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[11px] font-black text-gray-900 uppercase tracking-tight leading-tight">
                                        {vehicle.user?.name || "Sin datos"}
                                    </p>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                                        {new Date(
                                            vehicle.created_at,
                                        ).toLocaleDateString("es-MX", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[8px] font-bold text-gray-300 uppercase tracking-[0.3em]">
                                    ID
                                </p>
                                <p className="text-xs font-black text-gray-400">
                                    #{vehicle.id}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Close Button ── */}
                <div className="bg-cream px-8 pb-7 pt-1">
                    <button
                        onClick={onClose}
                        className="w-full py-3.5 rounded-2xl bg-primary text-white font-black uppercase text-[10px] tracking-[0.2em] hover:bg-primary-800 transition-all shadow-lg shadow-primary/20 active:scale-[0.98]"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </Modal>
    );
}

function VehicleInfoCard({ label, brand, model, plates, variant = "primary" }) {
    const isPrimary = variant === "primary";
    const iconBg = isPrimary ? "bg-primary/10" : "bg-amber-100";
    const iconColor = isPrimary ? "text-primary" : "text-amber-600";
    const cardBorder = isPrimary ? "border-gray-100" : "border-amber-100";
    const dividerColor = isPrimary ? "divide-gray-50" : "divide-amber-50";
    const labelColor = isPrimary ? "text-gray-400" : "text-amber-500";
    const platesBg = isPrimary
        ? "text-primary bg-primary-50 border-primary-100"
        : "text-amber-700 bg-amber-50 border-amber-200";

    return (
        <div>
            <div className="flex items-center gap-2 mb-3">
                <div className={`w-6 h-6 rounded-lg ${iconBg} flex items-center justify-center`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-3.5 w-3.5 ${iconColor}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10m10 0h4m-4 0H9m4 0a1 1 0 011 1v.01M14 16h2l3-6h-4" />
                    </svg>
                </div>
                <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                    {label}
                </h3>
            </div>
            <div className={`bg-white rounded-2xl border ${cardBorder} shadow-sm`}>
                <div className={`grid grid-cols-3 divide-x ${dividerColor}`}>
                    <div className="px-5 py-4">
                        <p className={`text-[8px] font-bold ${labelColor} uppercase tracking-[0.3em] mb-1.5`}>
                            Marca
                        </p>
                        <p className="text-[13px] font-black text-gray-900 uppercase tracking-tight">
                            {brand}
                        </p>
                    </div>
                    <div className="px-5 py-4">
                        <p className={`text-[8px] font-bold ${labelColor} uppercase tracking-[0.3em] mb-1.5`}>
                            Submarca
                        </p>
                        <p className="text-[13px] font-black text-gray-900 uppercase tracking-tight">
                            {model}
                        </p>
                    </div>
                    <div className="px-5 py-4">
                        <p className={`text-[8px] font-bold ${labelColor} uppercase tracking-[0.3em] mb-1.5`}>
                            Placas
                        </p>
                        <span className={`inline-block font-mono font-black ${platesBg} px-3 py-1 rounded-lg border text-[13px]`}>
                            {plates}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
