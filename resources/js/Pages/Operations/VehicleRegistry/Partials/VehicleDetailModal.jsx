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
            <div className="overflow-hidden bg-white rounded-3xl shadow-2xl">
                {/* ── Header ── */}
                <div className="bg-primary px-8 py-10 relative overflow-hidden">
                    {/* Layered Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.03] rounded-full -mr-32 -mt-32 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-400/10 rounded-full -ml-24 -mb-24 blur-2xl" />
                    
                    <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-0.5 rounded bg-white/10 text-white/60 text-[8px] font-black uppercase tracking-[0.2em] border border-white/10">
                                    Expediente Vehicular
                                </span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tighter uppercase italic">
                                {vehicle.employee_name}
                            </h2>
                            <div className="flex flex-wrap items-center gap-3 mt-4">
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                                    <div className="w-1 h-1 rounded-full bg-primary-300"></div>
                                    <span className="text-white text-[10px] font-black uppercase tracking-widest">{vehicle.area}</span>
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                                    <div className="w-1 h-1 rounded-full bg-primary-300"></div>
                                    <span className="text-white text-[10px] font-black uppercase tracking-widest">{vehicle.plant}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-shrink-0 self-start md:self-center">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 to-white/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                                <div className="relative w-24 h-24 rounded-2xl bg-white/10 border border-white/20 flex flex-col items-center justify-center backdrop-blur-xl shadow-2xl">
                                    <span className="text-white/40 text-[10px] font-black uppercase leading-none tracking-tighter">
                                        No. Marbete
                                    </span>
                                    <span className="text-white text-3xl font-black mt-1 tracking-tighter italic">
                                        {vehicle.marbete_number}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Body ── */}
                <div className="px-8 py-8 space-y-8 bg-gray-50/30">
                    {/* Vehicles Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <VehicleInfoCard
                            label="Vehículo Principal"
                            brand={vehicle.vehicle_brand}
                            model={vehicle.vehicle_model}
                            plates={vehicle.vehicle_plates}
                            primary
                        />

                        {vehicle.vehicle_brand_2 ? (
                            <VehicleInfoCard
                                label="Vehículo Alternativo"
                                brand={vehicle.vehicle_brand_2}
                                model={vehicle.vehicle_model_2}
                                plates={vehicle.vehicle_plates_2}
                            />
                        ) : (
                            <div className="bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center p-6 text-center opacity-40">
                                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-relaxed">
                                    Sin segundo vehículo<br/>registrado
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Documentation Section */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-3 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                                Documentación de Seguridad
                            </h3>
                            <div className="w-1.5 h-1.5 rounded-full bg-primary-200"></div>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Licencia */}
                            <div className="space-y-3">
                                <dt className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <div className="p-1.5 rounded bg-gray-50 text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.333 0 4 1 4 3" />
                                        </svg>
                                    </div>
                                    Licencia Conducir
                                </dt>
                                <dd className="flex items-center gap-3">
                                    <span className={`inline-flex w-2.5 h-2.5 rounded-full ring-4 ${vehicle.has_driver_license ? 'bg-emerald-500 ring-emerald-50' : 'bg-rose-500 ring-rose-50'}`}></span>
                                    <span className="text-sm font-black text-gray-900 uppercase italic">
                                        {vehicle.has_driver_license ? 'ACTIVA' : 'INACTIVA'}
                                    </span>
                                </dd>
                                {vehicle.has_driver_license && vehicle.driver_license_expires_at && (
                                    <div className={`px-2.5 py-1 rounded-md border text-[9px] font-black italic tracking-wider flex items-center gap-2 transition-all ${getExpirationStyle(vehicle.driver_license_expires_at)}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        VENCE: {new Date(vehicle.driver_license_expires_at).toLocaleDateString("es-MX")}
                                    </div>
                                )}
                            </div>

                            {/* Seguro */}
                            <div className="space-y-3">
                                <dt className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <div className="p-1.5 rounded bg-gray-50 text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    Seguro Vehicular
                                </dt>
                                <dd className="flex items-center gap-3">
                                    <span className={`inline-flex w-2.5 h-2.5 rounded-full ring-4 ${vehicle.has_insurance ? 'bg-emerald-500 ring-emerald-50' : 'bg-rose-500 ring-rose-50'}`}></span>
                                    <span className="text-sm font-black text-gray-900 uppercase italic">
                                        {vehicle.has_insurance ? 'VIGENTE' : 'VENCIDO'}
                                    </span>
                                </dd>
                                {vehicle.has_insurance && vehicle.insurance_expires_at && (
                                    <div className={`px-2.5 py-1 rounded-md border text-[9px] font-black italic tracking-wider flex items-center gap-2 transition-all ${getExpirationStyle(vehicle.insurance_expires_at)}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        VENCE: {new Date(vehicle.insurance_expires_at).toLocaleDateString("es-MX")}
                                    </div>
                                )}
                            </div>

                            {/* Tarjeta de Circulación */}
                            <div className="space-y-3">
                                <dt className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <div className="p-1.5 rounded bg-gray-50 text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    Tarjeta Circ.
                                </dt>
                                <dd className="flex items-center gap-3">
                                    <span className={`inline-flex w-2.5 h-2.5 rounded-full ring-4 ${vehicle.has_circulation_card ? 'bg-emerald-500 ring-emerald-50' : 'bg-rose-500 ring-rose-50'}`}></span>
                                    <span className="text-sm font-black text-gray-900 uppercase italic">
                                        {vehicle.has_circulation_card ? 'SÍ' : 'NO'}
                                    </span>
                                </dd>
                            </div>
                        </div>
                    </div>

                    {/* Footer System Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-[8px] font-black text-gray-300 uppercase tracking-[0.3em] mb-2">Estatus Global</p>
                                <ValidityBadge
                                    validity={vehicle.validity_status}
                                    size="lg"
                                />
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 ring-1 ring-gray-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-900 leading-none mb-1 uppercase tracking-tight italic">
                                        {vehicle.user?.name || "Sistema"}
                                    </p>
                                    <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">
                                        {new Date(vehicle.created_at).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" })}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[8px] font-black text-gray-200 uppercase tracking-[0.2em] mb-0.5">ID REGISTRO</p>
                                <p className="text-[10px] font-black text-gray-400 tracking-tighter italic">#{vehicle.id}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Actions ── */}
                <div className="px-8 pb-8 pt-4 bg-gray-50/50">
                    <button
                        onClick={onClose}
                        className="w-full py-4 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-primary-800 transition-all shadow-xl shadow-primary/20 active:scale-[0.98] italic"
                    >
                        Cerrar Panel de Control
                    </button>
                </div>
            </div>
        </Modal>
    );
}

function VehicleInfoCard({ label, brand, model, plates, primary = false }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className={`px-4 py-2 border-b border-gray-100 flex items-center justify-between ${primary ? 'bg-gray-50/50' : 'bg-white'}`}>
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    {label}
                </h3>
                {primary && (
                    <span className="text-[9px] font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded uppercase">
                        Principal
                    </span>
                )}
            </div>
            <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                    <dt className="text-[10px] font-medium text-gray-400 uppercase mb-1">Marca</dt>
                    <dd className="text-sm font-bold text-gray-900 uppercase truncate">{brand}</dd>
                </div>
                <div>
                    <dt className="text-[10px] font-medium text-gray-400 uppercase mb-1">Submarca</dt>
                    <dd className="text-sm font-bold text-gray-900 uppercase truncate">{model}</dd>
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <dt className="text-[10px] font-medium text-gray-400 uppercase mb-1">Placas</dt>
                    <dd className="inline-flex font-mono font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-md border border-gray-200 text-sm">
                        {plates}
                    </dd>
                </div>
            </div>
        </div>
    );
}
