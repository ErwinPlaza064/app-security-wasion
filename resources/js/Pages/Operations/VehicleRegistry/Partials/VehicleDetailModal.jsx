import Modal from "@/Components/Modal";
import { ValidityBadge } from "./VehicleBadges";

export default function VehicleDetailModal({ show, vehicle, onClose }) {
    if (!vehicle) return null;

    return (
        <Modal show={show} onClose={onClose} maxWidth="lg">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                    <h2 className="text-xl font-bold text-gray-800 tracking-tight">
                        Detalle de Registro de Vehículo
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Section: Driver Information */}
                    <section className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Información del Conductor</h3>
                        <div className="flex items-center gap-4 p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="grid grid-cols-2 gap-x-8 flex-1">
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Nombre Completo</p>
                                    <p className="text-sm font-bold text-gray-900 truncate">{vehicle.employee_name}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">No. Marbete</p>
                                    <p className="text-sm font-bold text-gray-900">{vehicle.marbete_number}</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 px-1">
                            <div>
                                <p className="text-xs text-gray-500 font-medium">Área</p>
                                <p className="text-sm font-semibold text-gray-700">{vehicle.area}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium">Planta</p>
                                <p className="text-sm font-semibold text-gray-700">{vehicle.plant}</p>
                            </div>
                        </div>
                    </section>

                    {/* Section: Vehicle Details */}
                    <section className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Detalles del Vehículo</h3>
                        
                        {/* Primario */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-xs text-gray-500 font-medium ml-1">Marca</p>
                                <div className="p-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 font-medium shadow-sm italic capitalize">
                                    {vehicle.vehicle_brand}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-gray-500 font-medium ml-1">Modelo</p>
                                <div className="p-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 font-medium shadow-sm italic capitalize">
                                    {vehicle.vehicle_model}
                                </div>
                            </div>
                            <div className="col-span-2 space-y-1">
                                <p className="text-xs text-gray-500 font-medium ml-1">Número de Placas</p>
                                <div className="p-2.5 bg-gray-900 text-emerald-400 rounded-lg text-sm font-mono font-bold tracking-widest shadow-inner text-center">
                                    {vehicle.vehicle_plates}
                                </div>
                            </div>
                        </div>

                        {/* Secundario (If exists) */}
                        {vehicle.vehicle_brand_2 && (
                            <div className="pt-4 border-t border-gray-100 space-y-4">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Vehículo Secundario</p>
                                <div className="grid grid-cols-2 gap-4 opacity-80">
                                    <div className="space-y-1">
                                        <div className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600">
                                            {vehicle.vehicle_brand_2}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600">
                                            {vehicle.vehicle_model_2}
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="p-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 font-mono text-center">
                                            {vehicle.vehicle_plates_2}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Section: Documentation Status */}
                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Estatus de Documentación</h3>
                            <ValidityBadge validity={vehicle.validity_status} size="sm" />
                        </div>
                        
                        <div className="space-y-3">
                            <DocRow 
                                label="Licencia de Conducir"
                                status={vehicle.has_driver_license}
                                expiry={vehicle.driver_license_expires_at}
                                icon={<path d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" />}
                            />
                            <DocRow 
                                label="Póliza de Seguro"
                                status={vehicle.has_insurance}
                                expiry={vehicle.insurance_expires_at}
                                icon={<path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9" />}
                            />
                            <DocRow 
                                label="Tarjeta de Circulación"
                                status={vehicle.has_circulation_card}
                                icon={<path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />}
                            />
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end items-center gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-lg border border-gray-300 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-all"
                    >
                        Cerrar
                    </button>
                    <button
                        onClick={onClose}
                        className="px-8 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-[0.98]"
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </Modal>
    );
}

function DocRow({ label, status, expiry, icon }) {
    return (
        <div className="flex items-center justify-between p-3.5 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors group">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 text-gray-400 flex items-center justify-center shrink-0 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {icon}
                    </svg>
                </div>
                <span className="text-sm font-semibold text-gray-700">{label}</span>
            </div>
            
            <div className="flex items-center gap-6">
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${status ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                    {status ? (
                        <>
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                            Válido
                        </>
                    ) : (
                        <>
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                            Falta
                        </>
                    )}
                </div>
                {expiry && (
                    <span className="text-[11px] font-medium text-gray-400 min-w-[100px] text-right">
                        Vence: {new Date(expiry).toLocaleDateString("es-MX", { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </span>
                )}
            </div>
        </div>
    );
}
