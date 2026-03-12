import Modal from "@/Components/Modal";
import { ValidityBadge } from "./VehicleBadges";

const getExpirationStyle = (dateString) => {
    if (!dateString) return "bg-gray-50 border-gray-100 text-gray-400";
    const expirationDate = new Date(dateString);
    const today = new Date();
    const diffTime = expirationDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

import Modal from "@/Components/Modal";
import { ValidityBadge } from "./VehicleBadges";

const getExpirationStyle = (dateString) => {
    if (!dateString) return "bg-gray-50 border-gray-100 text-gray-400";
    const expirationDate = new Date(dateString);
    const today = new Date();
    const diffTime = expirationDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return "bg-rose-50 border-rose-200 text-rose-600 animate-pulse";
    if (diffDays <= 7) return "bg-rose-50 border-rose-100 text-rose-500 font-black";
    if (diffDays <= 30) return "bg-amber-50 border-amber-100 text-amber-600";
    return "bg-emerald-50 border-emerald-100 text-emerald-600";
};

export default function VehicleDetailModal({ show, vehicle, onClose }) {
    if (!vehicle) return null;

    return (
        <Modal show={show} onClose={onClose} maxWidth="2xl">
            <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] md:max-h-[85vh] border border-slate-100 mx-auto">
                {/* ── Header ── */}
                <div className="bg-slate-950 shrink-0 px-5 py-8 md:px-10 md:py-12 relative overflow-hidden">
                    {/* Decorative Pattern - Scaled down */}
                    <div className="absolute top-6 right-6 opacity-10 hidden sm:block pointer-events-none">
                        <div className="flex gap-1.5">
                            <div className="w-1 h-8 bg-white skew-x-12"></div>
                            <div className="w-1 h-8 bg-white skew-x-12"></div>
                            <div className="w-1 h-8 bg-white skew-x-12"></div>
                        </div>
                    </div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[8px] font-black uppercase tracking-widest border border-slate-700/50">
                                    Expediente
                                </span>
                            </div>
                            <h2 className="text-2xl md:text-4xl font-black text-white leading-tight tracking-tighter uppercase truncate">
                                {vehicle.employee_name}
                            </h2>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-4">
                                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                                    <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                                    {vehicle.area}
                                </span>
                                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                                    <div className="w-1 h-1 rounded-full bg-slate-600"></div>
                                    {vehicle.plant}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col md:items-end border-t border-slate-800 md:border-0 pt-4 md:pt-0 shrink-0">
                            <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.2em] mb-0.5 opacity-80">Marbete No.</p>
                            <div className="text-4xl md:text-5xl font-black text-white tracking-widest tabular-nums leading-none">
                                {vehicle.marbete_number}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Body (Scrollable Area) ── */}
                <div className="flex-1 overflow-y-auto px-5 py-6 md:px-10 md:py-10 space-y-10 md:space-y-12 bg-white">
                    {/* Vehicles Selection */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                        {/* Primario */}
                        <div className="flex flex-col">
                            <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                                <span>Primario</span>
                                <div className="flex-1 h-px bg-slate-100"></div>
                            </h3>
                            <VehicleInfoCard
                                brand={vehicle.vehicle_brand}
                                model={vehicle.vehicle_model}
                                plates={vehicle.vehicle_plates}
                                isPrimary
                            />
                        </div>

                        {/* Secundario */}
                        <div className="flex flex-col">
                            <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                                <span>Secundario</span>
                                <div className="flex-1 h-px bg-slate-100"></div>
                            </h3>
                            {vehicle.vehicle_brand_2 ? (
                                <VehicleInfoCard
                                    brand={vehicle.vehicle_brand_2}
                                    model={vehicle.vehicle_model_2}
                                    plates={vehicle.vehicle_plates_2}
                                />
                            ) : (
                                <div className="flex-1 min-h-[100px] border-2 border-dashed border-slate-50 rounded-[1.5rem] flex flex-col items-center justify-center p-6 bg-slate-50/30">
                                    <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[.3em]">No Registrado</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Document Status */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[.2em]">Estatus Documental</h3>
                            <ValidityBadge
                                validity={vehicle.validity_status}
                                size="md"
                            />
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <DocStatusCard 
                                label="Licencia"
                                status={vehicle.has_driver_license}
                                expiry={vehicle.driver_license_expires_at}
                                icon={<path d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" />}
                            />
                            <DocStatusCard 
                                label="Seguro"
                                status={vehicle.has_insurance}
                                expiry={vehicle.insurance_expires_at}
                                icon={<path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9" />}
                            />
                            <DocStatusCard 
                                label="Circulación"
                                status={vehicle.has_circulation_card}
                                icon={<path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />}
                            />
                        </div>
                    </div>

                    {/* Metadata */}
                    <div className="pt-8 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-900 uppercase">{vehicle.user?.name || "SISTEMA"}</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Emitido el {new Date(vehicle.created_at).toLocaleDateString("es-MX")}</p>
                            </div>
                        </div>
                        <div className="text-[10px] font-black text-slate-200 tracking-widest italic">
                            REF: #{vehicle.id}
                        </div>
                    </div>
                </div>

                {/* ── Footer Actions ── */}
                <div className="p-5 md:p-8 bg-slate-50 border-t border-slate-100 shrink-0">
                    <button
                        onClick={onClose}
                        className="w-full py-4 rounded-xl md:rounded-2xl bg-slate-950 text-white font-black text-[10px] uppercase tracking-[0.4em] hover:bg-slate-900 transition-all shadow-xl shadow-slate-200 active:scale-[0.98]"
                    >
                        Cerrar Registro
                    </button>
                </div>
            </div>
        </Modal>
    );
}

function VehicleInfoCard({ brand, model, plates, isPrimary = false }) {
    return (
        <div className={`p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border transition-all ${isPrimary ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-50 border-transparent'}`}>
            <div className="space-y-4 md:space-y-6">
                <div>
                    <dt className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 opacity-70">Vehículo</dt>
                    <dd className="text-base md:text-lg font-black text-slate-950 uppercase tracking-tight leading-tight">
                        {brand} <span className="text-slate-200 font-light mx-0.5">/</span> {model}
                    </dd>
                </div>
                <div>
                    <dt className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5 opacity-70">Placas</dt>
                    <dd className="inline-block px-3 py-1.5 bg-slate-900 text-white font-mono text-xs font-black rounded-lg tracking-widest">
                        {plates}
                    </dd>
                </div>
            </div>
        </div>
    );
}

function DocStatusCard({ label, status, expiry, icon }) {
    return (
        <div className="bg-white p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm transition-all">
            <div className="flex items-center justify-between mb-6 md:mb-8">
                <div className="p-2 rounded-lg bg-slate-50 text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {icon}
                    </svg>
                </div>
                <div className={`w-2 h-2 rounded-full ${status ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.3)]'}`}></div>
            </div>
            
            <div className="space-y-3">
                <div>
                    <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-0.5">{label}</p>
                    <p className="text-[11px] font-black text-slate-900 uppercase tracking-tight">
                        {status ? 'Vigente' : 'Faltante'}
                    </p>
                </div>
                
                {status && (
                    <div className={`mt-3 px-2 py-1.5 rounded-lg flex items-center gap-1.5 border ${expiry ? getExpirationStyle(expiry) : 'bg-slate-50 border-transparent text-slate-400'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-[8px] font-black uppercase tracking-tight truncate">
                            {expiry ? new Date(expiry).toLocaleDateString("es-MX", { day: '2-digit', month: 'short', year: 'numeric' }) : 'Indefinido'}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
