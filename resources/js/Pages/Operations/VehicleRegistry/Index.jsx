import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { ValidityBadge } from "./Partials/VehicleBadges";
import VehicleDetailModal from "./Partials/VehicleDetailModal";

const isExpiringSoonLocal = (dateString) => {
    if (!dateString) return false;
    const expirationDate = new Date(dateString);
    const today = new Date();
    const diffTime = expirationDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
};

const isExpiredLocal = (dateString) => {
    if (!dateString) return false;
    const expirationDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return expirationDate < today;
};

const EMPTY_VEHICLES = [];

export default function Index({ vehicles = EMPTY_VEHICLES }) {
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
                                <span className="text-[10px] text-gray-300">
                                    /
                                </span>
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
                                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary-800 transition-all active:scale-95"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                                Nuevo Registro
                            </Link>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-8 relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg
                                className="h-5 w-5 text-gray-300 group-focus-within:text-primary transition-colors"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.5"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="block w-full bg-white border-2 border-gray-50 focus:border-primary focus:ring-0 rounded-2xl py-4 pl-12 pr-4 transition-all text-sm font-bold text-gray-900 shadow-sm placeholder:text-gray-300 uppercase tracking-widest"
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
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                            Marbete
                                        </th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                            Colaborador / Área
                                        </th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                            Vehículo
                                        </th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                            Placas
                                        </th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                            Estatus
                                        </th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                            Venc. Licencia
                                        </th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                            Venc. Seguro
                                        </th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                            Registró
                                        </th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredVehicles.length > 0 ? (
                                        filteredVehicles.map((vehicle) => (
                                            <tr
                                                key={vehicle.id}
                                                className={`transition-all group cursor-pointer border-b border-gray-50 last:border-0 ${
                                                    isExpiringSoonLocal(vehicle.driver_license_expires_at) || isExpiringSoonLocal(vehicle.insurance_expires_at)
                                                    ? 'bg-rose-50/70 hover:bg-rose-100/70 border-rose-100 shadow-[inset_0_0_0_1px_rgba(244,63,94,0.1)]'
                                                    : 'hover:bg-cream/60'
                                                }`}
                                                onClick={() =>
                                                    openDetail(vehicle)
                                                }
                                            >
                                                <td className="px-8 py-6">
                                                    <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-primary-50 text-primary text-[10px] font-black uppercase tracking-widest border border-primary-100">
                                                        {vehicle.marbete_number}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-6">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-black text-gray-900 uppercase tracking-tighter leading-none mb-1">
                                                            {
                                                                vehicle.employee_name
                                                            }
                                                        </span>
                                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                            {vehicle.area}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6 font-bold text-gray-600 text-sm uppercase">
                                                    <div className="flex flex-col">
                                                        <span>
                                                            {
                                                                vehicle.vehicle_brand
                                                            }{" "}
                                                            -{" "}
                                                            {
                                                                vehicle.vehicle_model
                                                            }
                                                        </span>
                                                        {vehicle.vehicle_brand_2 && (
                                                            <span className="text-[10px] text-amber-600 mt-1">
                                                                {
                                                                    vehicle.vehicle_brand_2
                                                                }{" "}
                                                                -{" "}
                                                                {
                                                                    vehicle.vehicle_model_2
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6">
                                                    <div className="flex flex-col space-y-1">
                                                        <div className="font-mono font-black text-primary bg-white px-3 py-1 rounded-md border-2 border-primary/10 shadow-sm w-fit relative overflow-hidden group">
                                                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #0C1869, #0C1869 1px, transparent 1px, transparent 10px)' }}></div>
                                                            <span className="relative z-10">{vehicle.vehicle_plates}</span>
                                                        </div>
                                                        {vehicle.vehicle_plates_2 && (
                                                            <span className="font-mono font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-md border border-amber-100 shadow-sm w-fit text-[10px]">
                                                                {
                                                                    vehicle.vehicle_plates_2
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6 text-center">
                                                    <ValidityBadge
                                                        validity={vehicle.validity_status}
                                                    />
                                                </td>
                                                <td className="px-6 py-6">
                                                    <div className={`text-[11px] font-black uppercase tracking-widest ${
                                                        !vehicle.driver_license_expires_at ? 'text-gray-300' :
                                                        isExpiredLocal(vehicle.driver_license_expires_at) ? 'text-rose-600' : 
                                                        isExpiringSoonLocal(vehicle.driver_license_expires_at) ? 'text-amber-500' : 
                                                        'text-green-600'
                                                    }`}>
                                                        {vehicle.driver_license_expires_at ? new Date(vehicle.driver_license_expires_at).toLocaleDateString("es-MX", { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'N/A'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6">
                                                    <div className={`text-[11px] font-black uppercase tracking-widest ${
                                                        !vehicle.insurance_expires_at ? 'text-gray-300' :
                                                        isExpiredLocal(vehicle.insurance_expires_at) ? 'text-rose-600' : 
                                                        isExpiringSoonLocal(vehicle.insurance_expires_at) ? 'text-amber-500' : 
                                                        'text-green-600'
                                                    }`}>
                                                        {vehicle.insurance_expires_at ? new Date(vehicle.insurance_expires_at).toLocaleDateString("es-MX", { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'N/A'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6">
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] font-black text-gray-900 uppercase tracking-tight">
                                                            {vehicle.user?.name}
                                                        </span>
                                                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                                                            {new Date(
                                                                vehicle.created_at,
                                                            ).toLocaleDateString(
                                                                "es-MX",
                                                                {
                                                                    day: "2-digit",
                                                                    month: "short",
                                                                },
                                                            )}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex items-center justify-end space-x-1.5 min-w-[120px]">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                openDetail(
                                                                    vehicle,
                                                                );
                                                            }}
                                                            className="p-2.5 rounded-xl bg-primary-50 text-primary hover:bg-primary hover:text-white transition-all duration-200"
                                                            title="Ver detalle"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-4 w-4"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2.5
                                                                    }
                                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                />
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2.5
                                                                    }
                                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                                />
                                                            </svg>
                                                        </button>
                                                        <Link
                                                            href={route(
                                                                "employee-vehicles.edit",
                                                                vehicle.id,
                                                            )}
                                                            onClick={(e) =>
                                                                e.stopPropagation()
                                                            }
                                                            className="p-2.5 rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white transition-all duration-200"
                                                            title="Editar registro"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-4 w-4"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2.5
                                                                    }
                                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                                />
                                                            </svg>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="9"
                                                className="px-8 py-20 text-center"
                                            >
                                                <div className="flex flex-col items-center">
                                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                                        <svg
                                                            className="w-8 h-8 text-gray-200"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <p className="text-sm font-black text-gray-300 uppercase tracking-[0.2em]">
                                                        No se encontraron
                                                        vehículos
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

            <VehicleDetailModal
                show={showDetailModal}
                vehicle={selectedVehicle}
                onClose={closeDetail}
            />
        </AuthenticatedLayout>
    );
}
