import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import DangerButton from '@/Components/DangerButton';
import { router } from '@inertiajs/react';

export default function Index({ vehicles = [] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const deleteVehicle = () => {
        if (!selectedItem) return;
        
        router.delete(route('employee-vehicles.destroy', selectedItem.id), {
            onSuccess: () => {
                setConfirmDeleteModal(false);
                setSelectedItem(null);
            },
        });
    };

    const filteredVehicles = vehicles.filter(vehicle => 
        vehicle.employee_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.marbete_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.vehicle_plates.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (vehicle.vehicle_plates_2 && vehicle.vehicle_plates_2.toLowerCase().includes(searchTerm.toLowerCase()))
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
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Vigencia</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Estatus</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Registró</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Acciones</th>
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
                                                    {(() => {
                                                        const validity = vehicle.validity_status || 'Vigente';
                                                        let colorClass = "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-500/5";
                                                        
                                                        if (validity === 'Expirado') colorClass = "bg-red-50 text-red-600 border-red-100 shadow-red-500/5";

                                                        return (
                                                            <span className={`px-2.5 py-1 rounded-lg border text-[9px] font-black tracking-widest ${colorClass}`}>
                                                                {validity.toUpperCase()}
                                                            </span>
                                                        );
                                                    })()}
                                                </td>
                                                <td className="px-6 py-6">
                                                    {(() => {
                                                        const status = vehicle.documentation_status;
                                                        let colorClass = "bg-gray-100 text-gray-400 border-gray-200";
                                                        
                                                        if (status === 'Completa') colorClass = "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-500/5";
                                                        if (status === 'Pendiente') colorClass = "bg-amber-50 text-amber-600 border-amber-100 shadow-amber-500/5";
                                                        if (status === 'Vencida') colorClass = "bg-red-50 text-red-600 border-red-100 shadow-red-500/5";
                                                        if (status === 'En Revisión') colorClass = "bg-blue-50 text-blue-600 border-blue-100 shadow-blue-500/5";
                                                        if (status === 'No Entregada') colorClass = "bg-rose-50 text-rose-600 border-rose-100 shadow-rose-500/5";

                                                        return (
                                                            <span className={`px-2.5 py-1 rounded-lg border text-[9px] font-black tracking-widest ${colorClass}`}>
                                                                {status || 'SIN DATOS'}
                                                            </span>
                                                        );
                                                    })()}
                                                </td>
                                                <td className="px-6 py-6">
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] font-black text-gray-900 uppercase tracking-tight">
                                                            {vehicle.user?.name}
                                                        </span>
                                                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                                                            {new Date(vehicle.created_at).toLocaleDateString('es-MX', { day: '2-digit', month: 'short' })}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex items-center justify-end space-x-2">
                                                        <Link 
                                                            href={route('employee-vehicles.edit', vehicle.id)}
                                                            className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                                                            title="Editar Registro"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                        </Link>
                                                        <button 
                                                            onClick={() => {
                                                                setSelectedItem(vehicle);
                                                                setConfirmDeleteModal(true);
                                                            }}
                                                            className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
                                                            title="Eliminar Registro"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1v3M4 7h16" />
                                                            </svg>
                                                        </button>
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

            <Modal show={confirmDeleteModal} onClose={() => setConfirmDeleteModal(false)}>
                <div className="p-8">
                    <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter mb-2">
                        ¿Eliminar registro?
                    </h2>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-8">
                        ¿Estás seguro de que deseas eliminar el vehículo <strong>{selectedItem?.marbete_number}</strong> del padrón? Esta acción no se puede deshacer.
                    </p>

                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={() => setConfirmDeleteModal(false)}
                            className="px-6 py-3 rounded-xl border border-gray-100 text-gray-400 font-black uppercase text-[10px] tracking-widest hover:bg-gray-50 transition-all"
                        >
                            Cancelar
                        </button>
                        <DangerButton
                            onClick={deleteVehicle}
                            className="px-6 py-3 rounded-xl shadow-xl shadow-red-500/20 bg-red-600 hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-widest transition-all"
                        >
                            Eliminar Permanentemente
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
