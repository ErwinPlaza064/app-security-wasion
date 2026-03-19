import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useEffect } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

const EMPTY_AREAS = [];

export default function Create({ areas = EMPTY_AREAS }) {
    const { data, setData, post, processing, errors, setError, clearErrors } = useForm({
        marbete_number: '',
        employee_name: '',
        area: '',
        vehicle_brand: '',
        vehicle_model: '',
        vehicle_plates: '',
        vehicle_brand_2: '',
        vehicle_model_2: '',
        vehicle_plates_2: '',
        documentation_status: 'Completa',
        validity_status: 'Vigente',
        has_driver_license: false,
        driver_license_expires_at: '',
        has_circulation_card: false,
        has_insurance: false,
        insurance_expires_at: '',
    });

    useEffect(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const isLicenseExpired = data.has_driver_license && data.driver_license_expires_at && new Date(data.driver_license_expires_at) < today;
        const isInsuranceExpired = data.has_insurance && data.insurance_expires_at && new Date(data.insurance_expires_at) < today;

        if (!data.driver_license_expires_at && !data.insurance_expires_at) {
            if (data.validity_status !== 'Pendiente') setData('validity_status', 'Pendiente');
        } else if (isLicenseExpired || isInsuranceExpired) {
            if (data.validity_status !== 'Expirado') {
                setData('validity_status', 'Expirado');
            }
        } else if (data.validity_status === 'Expirado' || data.validity_status === 'Pendiente') {
            // Solo revertimos a Vigente si realmente estaba en Expirado o Pendiente
            // y ahora ya no hay fechas vencidas pero hay al menos una ingresada.
            setData('validity_status', 'Vigente');
        }
    }, [data.driver_license_expires_at, data.insurance_expires_at, data.has_driver_license, data.has_insurance]);

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
        const platesRegex = /^[A-Z]{3}-[0-9]{2,3}-[0-9A-Z]{1,2}$/;

        if (!data.vehicle_plates) {
            setError('vehicle_plates', 'Las placas son obligatorias');
            hasErrors = true;
        } else if (!platesRegex.test(data.vehicle_plates)) {
            setError('vehicle_plates', 'El formato de placas no es válido (Ej. AAA-00-00)');
            hasErrors = true;
        }
        
        if (data.vehicle_plates_2 && !platesRegex.test(data.vehicle_plates_2)) {
            setError('vehicle_plates_2', 'El formato de placas no es válido (Ej. AAA-00-00)');
            hasErrors = true;
        }
        if (!data.documentation_status) {
            setError('documentation_status', 'El estatus de papeles es obligatorio');
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

        post(route('employee-vehicles.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Padrón Vehicular - Registro" />

            <div className="py-12 bg-[#fdfcf9] min-h-[calc(100vh-64px)]">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <div className="flex items-center space-x-2 mb-2">
                                <Link href={route('dashboard')} className="text-[10px] font-black text-gray-400 hover:text-primary uppercase tracking-widest transition-colors">Dashboard</Link>
                                <span className="text-[10px] text-gray-300">/</span>
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Padrón Vehicular</span>
                            </div>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">Registro al Padrón</h1>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-blue-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
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
                                        onChange={(e) => setData('vehicle_plates', e.target.value.toUpperCase())}
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
                                        onChange={(e) => setData('vehicle_plates_2', e.target.value.toUpperCase())}
                                        placeholder="AAA-00-00"
                                    />
                                    <InputError message={errors.vehicle_plates_2} />
                                </div>
                            </div>
                        </div>

                        {/* Sección: Documentación */}
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
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

                        {/* Sección: Administración del Marbete */}
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
                            <div className="flex items-center space-x-2 border-b border-gray-50 pb-4 mb-2">
                                <div className="w-1.5 h-6 bg-gray-400 rounded-full"></div>
                                <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest">Estatus de Documentación</h2>
                            </div>
                            
                            <div className="space-y-1.5">

                                <select
                                    id="validity_status"
                                    value={data.validity_status}
                                    onChange={(e) => setData('validity_status', e.target.value)}
                                    className={`block w-full border-none focus:ring-2 rounded-xl py-3 px-4 transition-all text-sm font-black appearance-none ${
                                        data.validity_status === 'Expirado' 
                                            ? 'bg-rose-50 text-rose-600 focus:ring-rose-500/10' 
                                            : data.validity_status === 'Vigente'
                                            ? 'bg-emerald-50 text-emerald-600 focus:ring-emerald-500/10'
                                            : 'bg-gray-50 text-gray-900 focus:ring-blue-500/10'
                                    }`}
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
                                href={route('dashboard')}
                                className="flex-1 flex justify-center py-4 rounded-xl border border-gray-100 text-gray-400 font-black uppercase text-xs tracking-widest hover:bg-gray-50 transition-all"
                            >
                                Cancelar
                            </Link>
                            <PrimaryButton 
                                className="flex-[2] justify-center py-4 rounded-xl shadow-xl shadow-blue-500/20 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-[0.2em] transition-all"
                                disabled={processing}
                            >
                                Registrar en Padrón
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
