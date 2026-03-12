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
            <div className="overflow-hidden bg-white rounded-[2rem] shadow-2xl border border-slate-100">
                {/* ── Header ── */}
                <div className="bg-slate-950 px-8 py-12 relative overflow-hidden">
                    {/* Minimalist decorative accents */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full -mr-48 -mt-48 blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-800/20 rounded-full -ml-32 -mb-32 blur-[80px]" />
                    
                    <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="flex-1 min-w-0">
                            <span className="inline-block px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-[9px] font-bold uppercase tracking-[0.2em] border border-slate-700 mb-4">
                                Expediente Digital
                            </span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-none tracking-tight">
                                {vehicle.employee_name}
                            </h2>
                            <div className="flex flex-wrap items-center gap-4 mt-6">
                                <div className="flex items-center gap-2 group">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:scale-125 transition-transform"></div>
                                    <span className="text-slate-300 text-xs font-semibold tracking-wide uppercase opacity-80">{vehicle.area}</span>
                                </div>
                                <div className="w-px h-3 bg-slate-800 hidden md:block"></div>
                                <div className="flex items-center gap-2 group">
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500 group-hover:scale-125 transition-transform"></div>
                                    <span className="text-slate-300 text-xs font-semibold tracking-wide uppercase opacity-80">{vehicle.plant}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center md:items-end">
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-2 opacity-60">ID Marbete</p>
                            <div className="text-5xl font-black text-white tracking-tighter tabular-nums leading-none">
                                {vehicle.marbete_number}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Body ── */}
                <div className="px-8 py-10 space-y-10">
                    {/* Vehicles Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] pl-1">Vehículo Principal</p>
                            <VehicleInfoCard
                                brand={vehicle.vehicle_brand}
                                model={vehicle.vehicle_model}
                                plates={vehicle.vehicle_plates}
                                isPrimary
                            />
                        </div>

                        <div className="space-y-4">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] pl-1">Vehículo Adicional</p>
                            {vehicle.vehicle_brand_2 ? (
                                <VehicleInfoCard
                                    brand={vehicle.vehicle_brand_2}
                                    model={vehicle.vehicle_model_2}
                                    plates={vehicle.vehicle_plates_2}
                                />
                            ) : (
                                <div className="h-full min-h-[140px] border-2 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center p-6 bg-slate-50/50">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-200 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest text-center">Sin registro<br/>secundario</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Documentation Summary */}
                    <div className="space-y-5">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest">Estado Documental</h3>
                            <ValidityBadge
                                validity={vehicle.validity_status}
                                size="md"
                            />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Card: Licencia */}
                            <DocStatusCard 
                                label="Licencia"
                                status={vehicle.has_driver_license}
                                expiry={vehicle.driver_license_expires_at}
                                icon={<path d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" />}
                            />

                            {/* Card: Seguro */}
                            <DocStatusCard 
                                label="Seguro"
                                status={vehicle.has_insurance}
                                expiry={vehicle.insurance_expires_at}
                                icon={<path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9" />}
                            />

                            {/* Card: Circulación */}
                            <DocStatusCard 
                                label="Circulación"
                                status={vehicle.has_circulation_card}
                                icon={<path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />}
                            />
                        </div>
                    </div>
                </div>

                {/* ── Footer ── */}
                <div className="px-8 pb-10 flex flex-col items-center gap-6">
                    <div className="w-full flex items-center justify-between px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 text-slate-400">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="min-w-0">
                                <p className="text-[10px] font-bold text-slate-600 truncate uppercase tracking-tight">{vehicle.user?.name || "Sistema"}</p>
                                <p className="text-[9px] font-medium opacity-70">Emitido el {new Date(vehicle.created_at).toLocaleDateString("es-MX")}</p>
                            </div>
                        </div>
                        <div className="text-right shrink-0">
                            <p className="text-[8px] font-bold uppercase tracking-widest opacity-50 mb-0.5">Ref. Interna</p>
                            <p className="text-[10px] font-black italic tabular-nums text-slate-500">#{vehicle.id}</p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full py-5 rounded-[1.25rem] bg-slate-900 text-white font-extrabold text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-[0.98]"
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
        <div className={`p-6 rounded-3xl border ${isPrimary ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-50 shadow-inner border-slate-100'}`}>
            <div className="grid grid-cols-2 gap-y-4">
                <div className="col-span-2">
                    <dt className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Marca / Modelo</dt>
                    <dd className="text-sm font-extrabold text-slate-900 uppercase">
                        {brand} <span className="font-medium text-slate-400 mx-1">/</span> {model}
                    </dd>
                </div>
                <div>
                    <dt className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 pl-1">Placas</dt>
                    <dd className="inline-flex font-mono font-black text-slate-800 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs shadow-sm">
                        {plates}
                    </dd>
                </div>
            </div>
        </div>
    );
}

function DocStatusCard({ label, status, expiry, icon }) {
    return (
        <div className="group bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-slate-50 text-slate-400 group-hover:text-blue-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {icon}
                    </svg>
                </div>
                <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-[0.1em]">{label}</p>
            </div>
            
            <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                    <div className={`w-2 h-2 rounded-full ${status ? 'bg-emerald-500' : 'bg-rose-500'} shadow-[0_0_8px_rgba(16,185,129,0.3)]`}></div>
                    <span className="text-xs font-black text-slate-900 uppercase tracking-tight">
                        {status ? 'Activo' : 'Pendiente'}
                    </span>
                </div>
                
                {status && expiry && (
                    <div className={`px-2.5 py-1.5 rounded-xl border text-[9px] font-bold tracking-tight flex items-center gap-2 ${getExpirationStyle(expiry)}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0" />
                        </svg>
                        <span className="uppercase opacity-90">Expira:</span>
                        <span className="font-black tabular-nums">{new Date(expiry).toLocaleDateString("es-MX")}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
