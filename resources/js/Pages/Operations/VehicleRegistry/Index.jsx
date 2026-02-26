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

    const getValidityBadge = (validity, size = "sm") => {
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
    };

    const getStatusBadge = (status, size = "sm") => {
        const colors = {
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
        const c = colors[status] || {
            bg: "bg-gray-100",
            text: "text-gray-400",
            border: "border-gray-200",
            dot: "bg-gray-400",
        };
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
                                            Vigencia
                                        </th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                            Estatus
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
                                                className="hover:bg-cream/60 transition-colors group cursor-pointer"
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
                                                        <span className="font-mono font-black text-gray-900 bg-gray-100 px-3 py-1 rounded-md border border-gray-200 shadow-sm w-fit">
                                                            {
                                                                vehicle.vehicle_plates
                                                            }
                                                        </span>
                                                        {vehicle.vehicle_plates_2 && (
                                                            <span className="font-mono font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-md border border-amber-100 shadow-sm w-fit text-[10px]">
                                                                {
                                                                    vehicle.vehicle_plates_2
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6">
                                                    {getValidityBadge(
                                                        vehicle.validity_status,
                                                    )}
                                                </td>
                                                <td className="px-6 py-6">
                                                    {getStatusBadge(
                                                        vehicle.documentation_status,
                                                    )}
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
                                                    <div className="flex items-center justify-end space-x-1.5">
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
                                                colSpan="8"
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

            {/* ─── Detail Modal ─── */}
            <Modal show={showDetailModal} onClose={closeDetail} maxWidth="lg">
                {selectedVehicle && (
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
                                            {selectedVehicle.employee_name}
                                        </h2>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white/80 text-[9px] font-bold uppercase tracking-widest border border-white/10">
                                                {selectedVehicle.area}
                                            </span>
                                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white/80 text-[9px] font-bold uppercase tracking-widest border border-white/10">
                                                {selectedVehicle.plant}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                        <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm flex flex-col items-center justify-center">
                                            <span className="text-white/50 text-[8px] font-black tracking-widest uppercase leading-none">
                                                No.
                                            </span>
                                            <span className="text-white text-lg font-black leading-none mt-0.5">
                                                {selectedVehicle.marbete_number}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── Body ── */}
                        <div className="bg-cream px-8 py-6 space-y-5">
                            {/* Vehículo 1 */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3.5 w-3.5 text-primary"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2.5}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10m10 0h4m-4 0H9m4 0a1 1 0 011 1v.01M14 16h2l3-6h-4"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                                        Vehículo Principal
                                    </h3>
                                </div>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                                    <div className="grid grid-cols-3 divide-x divide-gray-50">
                                        <div className="px-5 py-4">
                                            <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-1.5">
                                                Marca
                                            </p>
                                            <p className="text-[13px] font-black text-gray-900 uppercase tracking-tight">
                                                {selectedVehicle.vehicle_brand}
                                            </p>
                                        </div>
                                        <div className="px-5 py-4">
                                            <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-1.5">
                                                Submarca
                                            </p>
                                            <p className="text-[13px] font-black text-gray-900 uppercase tracking-tight">
                                                {selectedVehicle.vehicle_model}
                                            </p>
                                        </div>
                                        <div className="px-5 py-4">
                                            <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-1.5">
                                                Placas
                                            </p>
                                            <span className="inline-block font-mono font-black text-primary bg-primary-50 px-3 py-1 rounded-lg border border-primary-100 text-[13px]">
                                                {selectedVehicle.vehicle_plates}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Vehículo 2 */}
                            {selectedVehicle.vehicle_brand_2 && (
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3.5 w-3.5 text-amber-600"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2.5}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10m10 0h4m-4 0H9m4 0a1 1 0 011 1v.01M14 16h2l3-6h-4"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                                            Vehículo Alternativo
                                        </h3>
                                    </div>
                                    <div className="bg-white rounded-2xl border border-amber-100 shadow-sm">
                                        <div className="grid grid-cols-3 divide-x divide-amber-50">
                                            <div className="px-5 py-4">
                                                <p className="text-[8px] font-bold text-amber-500 uppercase tracking-[0.3em] mb-1.5">
                                                    Marca
                                                </p>
                                                <p className="text-[13px] font-black text-gray-900 uppercase tracking-tight">
                                                    {
                                                        selectedVehicle.vehicle_brand_2
                                                    }
                                                </p>
                                            </div>
                                            <div className="px-5 py-4">
                                                <p className="text-[8px] font-bold text-amber-500 uppercase tracking-[0.3em] mb-1.5">
                                                    Submarca
                                                </p>
                                                <p className="text-[13px] font-black text-gray-900 uppercase tracking-tight">
                                                    {
                                                        selectedVehicle.vehicle_model_2
                                                    }
                                                </p>
                                            </div>
                                            <div className="px-5 py-4">
                                                <p className="text-[8px] font-bold text-amber-500 uppercase tracking-[0.3em] mb-1.5">
                                                    Placas
                                                </p>
                                                <span className="inline-block font-mono font-black text-amber-700 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200 text-[13px]">
                                                    {
                                                        selectedVehicle.vehicle_plates_2
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Status Row */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
                                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-2.5">
                                        Vigencia del Marbete
                                    </p>
                                    {getValidityBadge(
                                        selectedVehicle.validity_status,
                                        "lg",
                                    )}
                                </div>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
                                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-2.5">
                                        Estatus de Documentación
                                    </p>
                                    {getStatusBadge(
                                        selectedVehicle.documentation_status,
                                        "lg",
                                    )}
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
                                                {selectedVehicle.user?.name ||
                                                    "Sin datos"}
                                            </p>
                                            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                                                {new Date(
                                                    selectedVehicle.created_at,
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
                                            #{selectedVehicle.id}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── Close Button ── */}
                        <div className="bg-cream px-8 pb-7 pt-1">
                            <button
                                onClick={closeDetail}
                                className="w-full py-3.5 rounded-2xl bg-primary text-white font-black uppercase text-[10px] tracking-[0.2em] hover:bg-primary-800 transition-all shadow-lg shadow-primary/20 active:scale-[0.98]"
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
