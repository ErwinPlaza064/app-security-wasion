import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import { useState } from 'react';

const EMPTY_AREAS = [];

export default function Edit({ vehicle, areas = EMPTY_AREAS }) {
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);

    const { data, setData, put, delete: destroy, processing, errors, setError, clearErrors } = useForm({
        marbete_number: vehicle.marbete_number || '',
        employee_name: vehicle.employee_name || '',
        area: vehicle.area || '',
        vehicle_brand: vehicle.vehicle_brand || '',
        vehicle_model: vehicle.vehicle_model || '',
        vehicle_plates: vehicle.vehicle_plates || '',
        vehicle_brand_2: vehicle.vehicle_brand_2 || '',
        vehicle_model_2: vehicle.vehicle_model_2 || '',
        vehicle_plates_2: vehicle.vehicle_plates_2 || '',
        documentation_status: vehicle.documentation_status || 'Completa',
        validity_status: vehicle.validity_status || 'Vigente',
        has_driver_license: vehicle.has_driver_license || false,
        driver_license_expires_at: vehicle.driver_license_expires_at ? vehicle.driver_license_expires_at.split('T')[0] : '',
        has_circulation_card: vehicle.has_circulation_card || false,
        has_insurance: vehicle.has_insurance || false,
        insurance_expires_at: vehicle.insurance_expires_at ? vehicle.insurance_expires_at.split('T')[0] : '',
    });

    const submit = (e) => {
        e.preventDefault();
        clearErrors();
        let hasErrors = false;

        if (!data.marbete_number) {
            setError('marbete_number', 'El número de marbete es obligatorio');
            hasErrors = true;
        }
        if (!data.employee_name) {
            setError('employee_name', 'El nombre del colaborador es obligatorio');
            hasErrors = true;
        }
        if (!data.area) {
            setError('area', 'Debe seleccionar un área');
            hasErrors = true;
        }
        if (!data.vehicle_brand) {
            setError('vehicle_brand', 'La marca es obligatoria');
            hasErrors = true;
        }
        if (!data.vehicle_model) {
            setError('vehicle_model', 'La submarca/modelo es obligatoria');
            hasErrors = true;
        }
        if (!data.vehicle_plates) {
            setError('vehicle_plates', 'Las placas son obligatorias');
            hasErrors = true;
        }

        if (!data.validity_status) {
            setError('validity_status', 'La vigencia es obligatoria');
            hasErrors = true;
        }
        if (data.has_driver_license && !data.driver_license_expires_at) {
            setError('driver_license_expires_at', 'La fecha de vencimiento es obligatoria si cuenta con licencia');
            hasErrors = true;
        }
        if (data.has_insurance && !data.insurance_expires_at) {
            setError('insurance_expires_at', 'La fecha de vencimiento es obligatoria si cuenta con seguro');
            hasErrors = true;
        }

        if (hasErrors) return;

        put(route('employee-vehicles.update', vehicle.id));
    };

    const deleteVehicle = () => {
        destroy(route('employee-vehicles.destroy', vehicle.id), {
            onSuccess: () => setConfirmingDeletion(false),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Editar Padrón - ${vehicle.marbete_number}`} />

            <div className="py-12 bg-[#fdfcf9] min-h-[calc(100vh-64px)]">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <div className="flex items-center space-x-2 mb-2">
                                <Link href={route('dashboard')} className="text-[10px] font-black text-gray-400 hover:text-primary uppercase tracking-widest transition-colors">Dashboard</Link>
                                <span className="text-[10px] text-gray-300">/</span>
                                <Link href={route('employee-vehicles.index')} className="text-[10px] font-black text-gray-400 hover:text-primary uppercase tracking-widest transition-colors">Padrón Vehicular</Link>
                                <span className="text-[10px] text-gray-300">/</span>
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Editar Registro</span>
                            </div>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">Editar Registro</h1>
                        </div>
                        <div className="flex space-x-2 text-blue-600">
                             <button 
                                onClick={() => setConfirmingDeletion(true)}
                                className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Sección: Datos del Colaborador */}
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
                            <div className="flex items-center space-x-2 border-b border-gray-50 pb-4 mb-2">
                                <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                                <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest">Información del Colaborador</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <InputLabel htmlFor="marbete_number" value="No. Marbete" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                    <TextInput
                                        id="marbete_number"
                                        className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-blue-500/10 rounded-xl py-3 px-4 transition-all font-black text-blue-600"
                                        value={data.marbete_number}
                                        onChange={(e) => setData('marbete_number', e.target.value)}
                                        placeholder="Ingrese número de identificación..."
                                    />
                                    <InputError message={errors.marbete_number} />
                                </div>

                                <div className="space-y-1.5">
                                    <InputLabel htmlFor="employee_name" value="Nombre del Colaborador" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                    <TextInput
                                        id="employee_name"
                                        className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-blue-500/10 rounded-xl py-3 px-4 transition-all"
                                        value={data.employee_name}
                                        onChange={(e) => setData('employee_name', e.target.value.replace(/\b\w/g, l => l.toUpperCase()))}
                                        placeholder="Nombre completo..."
                                    />
                                    <InputError message={errors.employee_name} />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <InputLabel htmlFor="area" value="Área" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                <select
                                    id="area"
                                    value={data.area}
                                    onChange={(e) => setData('area', e.target.value)}
                                    className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-blue-500/10 rounded-xl py-3 px-4 transition-all text-sm font-bold appearance-none"
                                >
                                    <option value="">Seleccione área...</option>
                                    {areas.map(area => (
                                        <option key={area.id} value={area.name}>{area.name}</option>
                                    ))}
                                </select>
                                <InputError message={errors.area} />
                            </div>
                        </div>

                        {/* Sección: Detalles del Vehículo 1 */}
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
                            <div className="flex items-center space-x-2 border-b border-gray-50 pb-4 mb-2">
                                <div className="w-1.5 h-6 bg-gray-900 rounded-full"></div>
                                <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest">Detalles del Vehículo 1</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <InputLabel htmlFor="vehicle_brand" value="Marca" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                    <TextInput
                                        id="vehicle_brand"
                                        className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-blue-500/10 rounded-xl py-3 px-4 transition-all"
                                        value={data.vehicle_brand}
                                        onChange={(e) => setData('vehicle_brand', e.target.value)}
                                        placeholder="Ej. Nissan, VW..."
                                    />
                                    <InputError message={errors.vehicle_brand} />
                                </div>

                                <div className="space-y-1.5">
                                    <InputLabel htmlFor="vehicle_model" value="Submarca" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                    <TextInput
                                        id="vehicle_model"
                                        className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-blue-500/10 rounded-xl py-3 px-4 transition-all"
                                        value={data.vehicle_model}
                                        onChange={(e) => setData('vehicle_model', e.target.value)}
                                        placeholder="Ej. Sentra, Jetta..."
                                    />
                                    <InputError message={errors.vehicle_model} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <InputLabel htmlFor="vehicle_plates" value="Placas" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                    <TextInput
                                        id="vehicle_plates"
                                        className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-blue-500/10 rounded-xl py-3 px-4 transition-all font-mono"
                                        value={data.vehicle_plates}
                                        onChange={(e) => setData('vehicle_plates', e.target.value)}
                                        placeholder="AAA-00-00"
                                    />
                                    <InputError message={errors.vehicle_plates} />
                                </div>
                            </div>
                        </div>

                        {/* Sección: Detalles del Vehículo 2 (Opcional) */}
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
                            <div className="flex items-center space-x-2 border-b border-gray-50 pb-4 mb-2">
                                <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div>
                                <h2 className="text-xs font-black uppercase tracking-widest text-amber-500">Detalles del Vehículo 2 (Opcional)</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <InputLabel htmlFor="vehicle_brand_2" value="Marca 2" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                    <TextInput
                                        id="vehicle_brand_2"
                                        className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-blue-500/10 rounded-xl py-3 px-4 transition-all"
                                        value={data.vehicle_brand_2}
                                        onChange={(e) => setData('vehicle_brand_2', e.target.value)}
                                        placeholder="Ej. Nissan, VW..."
                                    />
                                    <InputError message={errors.vehicle_brand_2} />
                                </div>

                                <div className="space-y-1.5">
                                    <InputLabel htmlFor="vehicle_model_2" value="Submarca 2" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                    <TextInput
                                        id="vehicle_model_2"
                                        className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-blue-500/10 rounded-xl py-3 px-4 transition-all"
                                        value={data.vehicle_model_2}
                                        onChange={(e) => setData('vehicle_model_2', e.target.value)}
                                        placeholder="Ej. Sentra, Jetta..."
                                    />
                                    <InputError message={errors.vehicle_model_2} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <InputLabel htmlFor="vehicle_plates_2" value="Placas 2" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                    <TextInput
                                        id="vehicle_plates_2"
                                        className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-blue-500/10 rounded-xl py-3 px-4 transition-all font-mono"
                                        value={data.vehicle_plates_2}
                                        onChange={(e) => setData('vehicle_plates_2', e.target.value)}
                                        placeholder="AAA-00-00"
                                    />
                                    <InputError message={errors.vehicle_plates_2} />
                                </div>
                            </div>
                        </div>

                        {/* Sección: Documentación */}
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_8px_30_rgb(0,0,0,0.02)] space-y-6">
                            <div className="flex items-center space-x-2 border-b border-gray-50 pb-4 mb-2">
                                <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                                <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest">Documentación</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                <div className="space-y-4 border border-gray-100 rounded-xl p-6 transition-all hover:border-blue-100 hover:shadow-md hover:shadow-blue-500/5">
                                    <label className="flex items-center space-x-3 cursor-pointer">
                                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500 w-5 h-5 transition-all" 
                                            checked={data.has_driver_license} onChange={(e) => setData('has_driver_license', e.target.checked)} />
                                        <span className="text-[11px] font-black text-gray-700 uppercase tracking-widest">Licencia de Conducir</span>
                                    </label>
                                    {data.has_driver_license && (
                                        <div className="space-y-1.5 mt-4 pt-4 border-t border-gray-50">
                                            <InputLabel htmlFor="driver_license_expires_at" value="Vencimiento de Licencia" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                            <input type="date" id="driver_license_expires_at" 
                                                className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-blue-500/10 rounded-xl py-3 px-4 transition-all text-sm font-bold text-gray-700"
                                                value={data.driver_license_expires_at} onChange={(e) => setData('driver_license_expires_at', e.target.value)} />
                                            <InputError message={errors.driver_license_expires_at} />
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4 border border-gray-100 rounded-xl p-6 transition-all hover:border-blue-100 hover:shadow-md hover:shadow-blue-500/5">
                                    <label className="flex items-center space-x-3 cursor-pointer">
                                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500 w-5 h-5 transition-all" 
                                            checked={data.has_circulation_card} onChange={(e) => setData('has_circulation_card', e.target.checked)} />
                                        <span className="text-[11px] font-black text-gray-700 uppercase tracking-widest">Tarjeta de Circulación</span>
                                    </label>
                                </div>

                                <div className="space-y-4 border border-gray-100 rounded-xl p-6 transition-all hover:border-blue-100 hover:shadow-md hover:shadow-blue-500/5">
                                    <label className="flex items-center space-x-3 cursor-pointer">
                                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500 w-5 h-5 transition-all" 
                                            checked={data.has_insurance} onChange={(e) => setData('has_insurance', e.target.checked)} />
                                        <span className="text-[11px] font-black text-gray-700 uppercase tracking-widest">Póliza de Seguro</span>
                                    </label>
                                    {data.has_insurance && (
                                        <div className="space-y-1.5 mt-4 pt-4 border-t border-gray-50">
                                            <InputLabel htmlFor="insurance_expires_at" value="Vencimiento de Póliza" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                            <input type="date" id="insurance_expires_at" 
                                                className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-blue-500/10 rounded-xl py-3 px-4 transition-all text-sm font-bold text-gray-700"
                                                value={data.insurance_expires_at} onChange={(e) => setData('insurance_expires_at', e.target.value)} />
                                            <InputError message={errors.insurance_expires_at} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sección: Estatus del Marbete */}
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_8px_30_rgb(0,0,0,0.02)] space-y-6">
                            <div className="flex items-center space-x-2 border-b border-gray-50 pb-4 mb-2">
                                <div className="w-1.5 h-6 bg-gray-400 rounded-full"></div>
                                <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest">Estatus de Documentación</h2>
                            </div>
                            
                            <div className="space-y-1.5">
                                <InputLabel htmlFor="validity_status" value="Estatus del Marbete" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                <select
                                    id="validity_status"
                                    value={data.validity_status}
                                    onChange={(e) => setData('validity_status', e.target.value)}
                                    className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-blue-500/10 rounded-xl py-3 px-4 transition-all text-sm font-bold appearance-none"
                                >
                                    <option value="Vigente">Vigente</option>
                                    <option value="Expirado">Expirado</option>
                                    <option value="Pendiente">Pendiente</option>
                                </select>
                                <InputError message={errors.validity_status} />
                            </div>
                        </div>

                        <div className="pt-4 flex space-x-4">
                            <Link 
                                href={route('employee-vehicles.index')}
                                className="flex-1 flex justify-center py-4 rounded-xl border border-gray-100 text-gray-400 font-black uppercase text-xs tracking-widest hover:bg-gray-50 transition-all"
                            >
                                Cancelar
                            </Link>
                            <PrimaryButton 
                                className="flex-[2] justify-center py-4 rounded-xl shadow-xl shadow-blue-500/20 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-[0.2em] transition-all"
                                disabled={processing}
                            >
                                Guardar Cambios
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>

            <Modal show={confirmingDeletion} onClose={() => setConfirmingDeletion(false)}>
                <div className="p-8">
                    <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter mb-2">
                        ¿Eliminar registro?
                    </h2>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-8">
                        Esta acción no se puede deshacer. Se eliminará el vehículo <strong>{vehicle.marbete_number}</strong> del padrón permanentemente.
                    </p>

                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={() => setConfirmingDeletion(false)}
                            className="px-6 py-3 rounded-xl border border-gray-100 text-gray-400 font-black uppercase text-[10px] tracking-widest hover:bg-gray-50 transition-all"
                        >
                            Cancelar
                        </button>
                        <DangerButton
                            onClick={deleteVehicle}
                            className="px-6 py-3 rounded-xl shadow-xl shadow-red-500/20 bg-red-600 hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-widest transition-all"
                            disabled={processing}
                        >
                            Eliminar Permanentemente
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
