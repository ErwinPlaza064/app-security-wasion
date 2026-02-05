import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Create({ areas = [] }) {
    const { data, setData, post, processing, errors, setError, clearErrors } = useForm({
        marbete_number: '',
        employee_name: '',
        area: '',
        vehicle_brand: '',
        vehicle_model: '',
        vehicle_plates: '',
        documentation_status: '',
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
                                        required
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
                                        required
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
                                    required
                                >
                                    <option value="">Seleccione área...</option>
                                    {areas.map(area => (
                                        <option key={area.id} value={area.name}>{area.name}</option>
                                    ))}
                                </select>
                                <InputError message={errors.area} />
                            </div>
                        </div>

                        {/* Sección: Datos del Vehículo */}
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
                            <div className="flex items-center space-x-2 border-b border-gray-50 pb-4 mb-2">
                                <div className="w-1.5 h-6 bg-gray-900 rounded-full"></div>
                                <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest">Detalles del Vehículo</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <InputLabel htmlFor="vehicle_brand" value="Marca" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                    <TextInput
                                        id="vehicle_brand"
                                        className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-blue-500/10 rounded-xl py-3 px-4 transition-all"
                                        value={data.vehicle_brand}
                                        onChange={(e) => setData('vehicle_brand', e.target.value)}
                                        required
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
                                        required
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
                                        required
                                        placeholder="AAA-00-00"
                                    />
                                    <InputError message={errors.vehicle_plates} />
                                </div>

                                <div className="space-y-1.5">
                                    <InputLabel htmlFor="documentation_status" value="Documentación" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                    <TextInput
                                        id="documentation_status"
                                        className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-blue-500/10 rounded-xl py-3 px-4 transition-all"
                                        value={data.documentation_status}
                                        onChange={(e) => setData('documentation_status', e.target.value)}
                                        placeholder="Estatus de papeles..."
                                    />
                                    <InputError message={errors.documentation_status} />
                                </div>
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
