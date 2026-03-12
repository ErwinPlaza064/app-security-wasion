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
        <Modal show={show} onClose={onClose} maxWidth="lg">
            <div className="overflow-hidden bg-white rounded-2xl">
                {/* ── Header ── */}
                <div className="bg-primary px-6 py-8 sm:px-8 relative overflow-hidden">
                    {/* Decorative subtle pulse */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-400/20 rounded-full -ml-12 -mb-12 blur-2xl" />

                    <div className="relative flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <p className="text-primary-100 text-[10px] font-bold uppercase tracking-widest mb-1 opacity-80">
                                Ficha del Colaborador
                            </p>
                            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight truncate">
                                {vehicle.employee_name}
                            </h2>
                            <div className="flex flex-wrap items-center gap-2 mt-3">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-white/10 text-white text-[10px] font-medium border border-white/10 backdrop-blur-sm">
                                    {vehicle.area}
                                </span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-white/10 text-white text-[10px] font-medium border border-white/10 backdrop-blur-sm">
                                    {vehicle.plant}
                                </span>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 border border-white/20 flex flex-col items-center justify-center shadow-2xl backdrop-blur-md">
                                <span className="text-white/60 text-[9px] font-bold uppercase leading-none">
                                    No.
                                </span>
                                <span className="text-white text-lg sm:text-xl font-bold mt-1">
                                    {vehicle.marbete_number}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Body ── */}
                <div className="px-6 py-6 sm:px-8 space-y-6 bg-gray-50/50">
                    {/* Vehicles Section */}
                    <div className="space-y-4">
                        <VehicleInfoCard
                            label="Vehículo Principal"
                            brand={vehicle.vehicle_brand}
                            model={vehicle.vehicle_model}
                            plates={vehicle.vehicle_plates}
                            primary
                        />

                        {vehicle.vehicle_brand_2 && (
                            <VehicleInfoCard
                                label="Vehículo Alternativo"
                                brand={vehicle.vehicle_brand_2}
                                model={vehicle.vehicle_model_2}
                                plates={vehicle.vehicle_plates_2}
                            />
                        )}
                    </div>

                    {/* Documentation Section */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-4 py-2 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                                Documentación
                            </h3>
                        </div>
                        <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {/* Licencia */}
                            <div className="relative group">
                                <dt className="text-[9px] font-black text-gray-400 uppercase mb-2 tracking-widest flex items-center gap-1.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.333 0 4 1 4 3" />
                                    </svg>
                                    Licencia
                                </dt>
                                <dd className="flex items-center gap-2">
                                    <span className={`inline-flex w-2.5 h-2.5 rounded-full ring-4 ring-offset-2 ${vehicle.has_driver_license ? 'bg-emerald-500 ring-emerald-50' : 'bg-rose-500 ring-rose-50'}`}></span>
                                    <span className="text-sm font-black text-gray-900 uppercase">
                                        {vehicle.has_driver_license ? 'Activada' : 'Faltante'}
                                    </span>
                                </dd>
                                {vehicle.has_driver_license && vehicle.driver_license_expires_at && (
                                    <div className={`mt-2.5 px-2.5 py-1.5 rounded-lg border flex items-center gap-2 ${getExpirationStyle(vehicle.driver_license_expires_at)}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 00-2 2z" />
                                        </svg>
                                        <p className="text-[10px] font-black uppercase">
                                            Vence: {new Date(vehicle.driver_license_expires_at).toLocaleDateString("es-MX")}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Seguro */}
                            <div className="relative group">
                                <dt className="text-[9px] font-black text-gray-400 uppercase mb-2 tracking-widest flex items-center gap-1.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    Seguro
                                </dt>
                                <dd className="flex items-center gap-2">
                                    <span className={`inline-flex w-2.5 h-2.5 rounded-full ring-4 ring-offset-2 ${vehicle.has_insurance ? 'bg-emerald-500 ring-emerald-50' : 'bg-rose-500 ring-rose-50'}`}></span>
                                    <span className="text-sm font-black text-gray-900 uppercase">
                                        {vehicle.has_insurance ? 'Vigente' : 'Inactivo'}
                                    </span>
                                </dd>
                                {vehicle.has_insurance && vehicle.insurance_expires_at && (
                                    <div className={`mt-2.5 px-2.5 py-1.5 rounded-lg border flex items-center gap-2 ${getExpirationStyle(vehicle.insurance_expires_at)}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 00-2 2z" />
                                        </svg>
                                        <p className="text-[10px] font-black uppercase">
                                            Vence: {new Date(vehicle.insurance_expires_at).toLocaleDateString("es-MX")}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Tarjeta de Circulación */}
                            <div className="relative group">
                                <dt className="text-[9px] font-black text-gray-400 uppercase mb-2 tracking-widest flex items-center gap-1.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                    Tarjeta Circ.
                                </dt>
                                <dd className="flex items-center gap-2">
                                    <span className={`inline-flex w-2.5 h-2.5 rounded-full ring-4 ring-offset-2 ${vehicle.has_circulation_card ? 'bg-emerald-500 ring-emerald-50' : 'bg-rose-500 ring-rose-50'}`}></span>
                                    <span className="text-sm font-black text-gray-900 uppercase">
                                        {vehicle.has_circulation_card ? 'Sí' : 'No'}
                                    </span>
                                </dd>
                            </div>
                        </div>
                    </div>

                    {/* Status Row */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 text-center">
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
                            Estatus del Marbete
                        </p>
                        <ValidityBadge
                            validity={vehicle.validity_status}
                            size="lg"
                        />
                    </div>

                    {/* Footer Info */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-900 leading-none mb-1">
                                        {vehicle.user?.name || "Sistema"}
                                    </p>
                                    <p className="text-[10px] text-gray-500 font-medium">
                                        Registrado el {new Date(vehicle.created_at).toLocaleDateString("es-MX", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[9px] font-bold text-gray-300 uppercase tracking-wider mb-0.5">
                                    Registro ID
                                </p>
                                <p className="text-xs font-bold text-gray-400">
                                    #{vehicle.id}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Actions ── */}
                <div className="px-6 pb-6 pt-2 sm:px-8 bg-gray-50/50">
                    <button
                        onClick={onClose}
                        className="w-full py-3 rounded-xl bg-primary text-white font-bold text-xs uppercase tracking-widest hover:bg-primary-800 transition-colors shadow-lg active:scale-[0.98]"
                    >
                        Cerrar Panel
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
