import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import Modal from "@/Components/Modal";

export default function Index({ vehicles = [] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    const openDetail = (vehicle) => {
        setSelectedVehicle(vehicle);
        setShowDetailModal(true);
    };

    const closeDetail = () => {
        setShowDetailModal(false);
        setTimeout(() => setSelectedVehicle(null), 300);
    };

    const filteredVehicles = vehicles.filter(
        (vehicle) =>
            vehicle.employee_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            vehicle.marbete_number
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            vehicle.vehicle_plates
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            (vehicle.vehicle_plates_2 &&
                vehicle.vehicle_plates_2
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())),
    );

    const getValidityBadge = (validity) => {
        const v = validity || "Vigente";
        const color = v === "Expirado"
            ? "bg-red-50 text-red-600 border-red-100"
            : "bg-emerald-50 text-emerald-600 border-emerald-100";
        return <span className={`px-2.5 py-1 rounded-lg border text-[9px] font-black tracking-widest ${color}`}>{v.toUpperCase()}</span>;
    };

    const getStatusBadge = (status) => {
        const colors = {
            'Completa': "bg-emerald-50 text-emerald-600 border-emerald-100",
            'Pendiente': "bg-amber-50 text-amber-600 border-amber-100",
            'Vencida': "bg-red-50 text-red-600 border-red-100",
            'En Revisión': "bg-blue-50 text-blue-600 border-blue-100",
            'No Entregada': "bg-rose-50 text-rose-600 border-rose-100",
        };
        const color = colors[status] || "bg-gray-100 text-gray-400 border-gray-200";
        return <span className={`px-2.5 py-1 rounded-lg border text-[9px] font-black tracking-widest ${color}`}>{(status || "SIN DATOS").toUpperCase()}</span>;
    };

    return (
        <AuthenticatedLayout>
            <Head title="Padrón Vehicular" />

            <div className="py-12 bg-[#fdfcf9] min-h-[calc(100vh-64px)] overflow-x-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center space-x-2 mb-2">
                                <Link
                                    href={route("dashboard")}
                                    className="text-[10px] font-black text-gray-400 hover:text-primary uppercase tracking-widest transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <span className="text-[10px] text-gray-300">/</span>
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                                    Padrón Vehicular
                                </span>
                            </div>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">
                                Padrón Vehicular
                            </h1>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">
                                Consulta de vehículos registrados por planta
                            </p>
                        </div>

                        <div className="flex items-center space-x-3">
                            <Link
                                href={route("employee-vehicles.create")}
                                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 text-white text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                                </svg>
                                Nuevo Registro
                            </Link>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-8 relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-300 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="block w-full bg-white border-2 border-gray-50 focus:border-blue-500 focus:ring-0 rounded-2xl py-4 pl-12 pr-4 transition-all text-sm font-bold text-gray-900 shadow-sm placeholder:text-gray-300 uppercase tracking-widest"
                            placeholder="Buscar por nombre, marbete o placas..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Table Style List */}
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-50 bg-gray-50/50">
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Marbete</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Colaborador / Área</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Vehículo</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Placas</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Vigencia</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Estatus</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Registró</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredVehicles.length > 0 ? (
                                        filteredVehicles.map((vehicle) => (
                                            <tr
                                                key={vehicle.id}
                                                className="hover:bg-blue-50/30 transition-colors group cursor-pointer"
                                                onClick={() => openDetail(vehicle)}
                                            >
                                                <td className="px-8 py-6">
                                                    <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest border border-blue-100">
                                                        {vehicle.marbete_number}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-6">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-black text-gray-900 uppercase tracking-tighter leading-none mb-1">
                                                            {vehicle.employee_name}
                                                        </span>
                                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                            {vehicle.area}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6 font-bold text-gray-600 text-sm uppercase">
                                                    <div className="flex flex-col">
                                                        <span>{vehicle.vehicle_brand} - {vehicle.vehicle_model}</span>
                                                        {vehicle.vehicle_brand_2 && (
                                                            <span className="text-[10px] text-amber-600 mt-1">
                                                                {vehicle.vehicle_brand_2} - {vehicle.vehicle_model_2}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6">
                                                    <div className="flex flex-col space-y-1">
                                                        <span className="font-mono font-black text-gray-900 bg-gray-100 px-3 py-1 rounded-md border border-gray-200 shadow-sm w-fit">
                                                            {vehicle.vehicle_plates}
                                                        </span>
                                                        {vehicle.vehicle_plates_2 && (
                                                            <span className="font-mono font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-md border border-amber-100 shadow-sm w-fit text-[10px]">
                                                                {vehicle.vehicle_plates_2}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6">
                                                    {getValidityBadge(vehicle.validity_status)}
                                                </td>
                                                <td className="px-6 py-6">
                                                    {getStatusBadge(vehicle.documentation_status)}
                                                </td>
                                                <td className="px-6 py-6">
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] font-black text-gray-900 uppercase tracking-tight">
                                                            {vehicle.user?.name}
                                                        </span>
                                                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                                                            {new Date(vehicle.created_at).toLocaleDateString("es-MX", { day: "2-digit", month: "short" })}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex items-center justify-end space-x-2">
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); openDetail(vehicle); }}
                                                            className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                                                            title="Ver detalle"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="px-8 py-20 text-center">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                                        <svg className="w-8 h-8 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                        </svg>
                                                    </div>
                                                    <p className="text-sm font-black text-gray-300 uppercase tracking-[0.2em]">
                                                        No se encontraron vehículos
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detail Modal */}
            <Modal show={showDetailModal} onClose={closeDetail} maxWidth="2xl">
                {selectedVehicle && (
                    <div className="relative">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-8 py-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-8 -translate-x-8" />
                            <div className="relative">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-blue-200 text-[10px] font-black uppercase tracking-[0.3em] mb-1">
                                            Detalle del Registro
                                        </p>
                                        <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                                            {selectedVehicle.employee_name}
                                        </h2>
                                        <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mt-1">
                                            {selectedVehicle.area}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="inline-flex items-center px-4 py-2 rounded-xl bg-white/20 text-white text-sm font-black uppercase tracking-widest border border-white/20 backdrop-blur-sm">
                                            #{selectedVehicle.marbete_number}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="px-8 py-6 space-y-6">
                            {/* Vehículo 1 */}
                            <div>
                                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-3 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7h8m-8 5h8M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
                                    </svg>
                                    Vehículo Principal
                                </h3>
                                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Marca</p>
                                            <p className="text-sm font-black text-gray-900 uppercase">{selectedVehicle.vehicle_brand}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Submarca</p>
                                            <p className="text-sm font-black text-gray-900 uppercase">{selectedVehicle.vehicle_model}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Placas</p>
                                            <span className="inline-block font-mono font-black text-gray-900 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm text-sm">
                                                {selectedVehicle.vehicle_plates}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Vehículo 2 */}
                            {selectedVehicle.vehicle_brand_2 && (
                                <div>
                                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-3 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7h8m-8 5h8M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
                                        </svg>
                                        Vehículo Alternativo
                                    </h3>
                                    <div className="bg-amber-50/50 rounded-2xl p-5 border border-amber-100">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <p className="text-[9px] font-bold text-amber-500 uppercase tracking-widest mb-1">Marca</p>
                                                <p className="text-sm font-black text-gray-900 uppercase">{selectedVehicle.vehicle_brand_2}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-bold text-amber-500 uppercase tracking-widest mb-1">Submarca</p>
                                                <p className="text-sm font-black text-gray-900 uppercase">{selectedVehicle.vehicle_model_2}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-bold text-amber-500 uppercase tracking-widest mb-1">Placas</p>
                                                <span className="inline-block font-mono font-black text-amber-700 bg-white px-3 py-1.5 rounded-lg border border-amber-200 shadow-sm text-sm">
                                                    {selectedVehicle.vehicle_plates_2}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Status Row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Vigencia del Marbete</p>
                                    {getValidityBadge(selectedVehicle.validity_status)}
                                </div>
                                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Estatus de Documentación</p>
                                    {getStatusBadge(selectedVehicle.documentation_status)}
                                </div>
                            </div>

                            {/* Footer Info */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-900 uppercase tracking-tight">
                                            {selectedVehicle.user?.name || "Sin datos"}
                                        </p>
                                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                                            Registrado el {new Date(selectedVehicle.created_at).toLocaleDateString("es-MX", { day: "2-digit", month: "long", year: "numeric" })}
                                        </p>
                                    </div>
                                </div>
                                <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">
                                    {selectedVehicle.plant}
                                </span>
                            </div>
                        </div>

                        {/* Close Button */}
                        <div className="px-8 pb-6">
                            <button
                                onClick={closeDetail}
                                className="w-full py-3.5 rounded-xl border-2 border-gray-100 text-gray-400 font-black uppercase text-[10px] tracking-widest hover:bg-gray-50 hover:text-gray-600 transition-all"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </AuthenticatedLayout>
    );
}
