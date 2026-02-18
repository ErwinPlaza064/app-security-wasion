import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ vehicles = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredVehicles = vehicles.filter(vehicle => 
        vehicle.employee_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.marbete_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.vehicle_plates.toLowerCase().includes(searchTerm.toLowerCase())
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
                                <Link href={route('dashboard')} className="text-[10px] font-black text-gray-400 hover:text-primary uppercase tracking-widest transition-colors">Dashboard</Link>
                                <span className="text-[10px] text-gray-300">/</span>
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Padrón Vehicular</span>
                            </div>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">Padrón Vehicular</h1>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Consulta de vehículos registrados por planta</p>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                            <Link 
                                href={route('employee-vehicles.create')}
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
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Registró</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredVehicles.length > 0 ? (
                                        filteredVehicles.map((vehicle) => (
                                            <tr key={vehicle.id} className="hover:bg-gray-50/50 transition-colors group">
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
                                                    {vehicle.vehicle_brand} - {vehicle.vehicle_model}
                                                </td>
                                                <td className="px-6 py-6">
                                                    <span className="font-mono font-black text-gray-900 bg-gray-100 px-3 py-1 rounded-md border border-gray-200 shadow-sm">
                                                        {vehicle.vehicle_plates}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex flex-col items-end">
                                                        <span className="text-[10px] font-black text-gray-900 uppercase tracking-tight">
                                                            {vehicle.user?.name}
                                                        </span>
                                                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                                                            {new Date(vehicle.created_at).toLocaleDateString('es-MX', { day: '2-digit', month: 'short' })}
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-8 py-20 text-center">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                                        <svg className="w-8 h-8 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                        </svg>
                                                    </div>
                                                    <p className="text-sm font-black text-gray-300 uppercase tracking-[0.2em]">No se encontraron vehículos</p>
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
        </AuthenticatedLayout>
    );
}
