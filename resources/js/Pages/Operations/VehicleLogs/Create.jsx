import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useState } from 'react';

export default function Create({ operation, companies }) {
    const { data, setData, post, processing, errors } = useForm({
        plates: '',
        brand: '',
        model: '',
        driver_name: '',
        company_id: '',
        new_company: '',
        operation: operation || 'transport',
        notes: '',
    });

    const [isNewCompany, setIsNewCompany] = useState(false);

    const titles = {
        load: 'Registro de Carga',
        unload: 'Registro de Descarga',
        transport: 'Control de Transporte',
        visit: 'Visita Vehicular',
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('vehicle-logs.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title={titles[data.operation] || 'Vehículos'} />

            <div className="py-12 bg-[#fdfcf9] min-h-[calc(100vh-64px)]">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <div className="flex items-center space-x-2 mb-2">
                                <Link href={route('dashboard')} className="text-[10px] font-black text-gray-400 hover:text-primary uppercase tracking-widest transition-colors">Dashboard</Link>
                                <span className="text-[10px] text-gray-300">/</span>
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Vehículos</span>
                            </div>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">{titles[data.operation]}</h1>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-emerald-500">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                            </svg>
                        </div>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Sección: Información del Vehículo */}
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
                            <div className="flex items-center space-x-2 border-b border-gray-50 pb-4 mb-2">
                                <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
                                <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest">Datos del Vehículo</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-1.5">
                                    <InputLabel htmlFor="plates" value="Placas" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                    <TextInput
                                        id="plates"
                                        className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-emerald-500/10 rounded-xl py-3 px-4 transition-all font-mono uppercase"
                                        value={data.plates}
                                        onChange={(e) => setData('plates', e.target.value.toUpperCase())}
                                        required
                                        placeholder="ABC-1234"
                                    />
                                    <InputError message={errors.plates} />
                                </div>

                                <div className="space-y-1.5">
                                    <InputLabel htmlFor="brand" value="Marca (Opcional)" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                    <TextInput
                                        id="brand"
                                        className="block w-full bg-gray-50 border-none rounded-xl py-3 px-4 transition-all text-sm"
                                        value={data.brand}
                                        onChange={(e) => setData('brand', e.target.value)}
                                        placeholder="Ej. Freightliner"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <InputLabel htmlFor="model" value="Modelo (Opcional)" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                    <TextInput
                                        id="model"
                                        className="block w-full bg-gray-50 border-none rounded-xl py-3 px-4 transition-all text-sm"
                                        value={data.model}
                                        onChange={(e) => setData('model', e.target.value)}
                                        placeholder="Ej. Cascadia"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Sección: Conductor y Empresa */}
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
                            <div className="flex items-center space-x-2 border-b border-gray-50 pb-4 mb-2">
                                <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
                                <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest">Logística y Operador</h2>
                            </div>

                            <div className="space-y-1.5">
                                <InputLabel htmlFor="driver_name" value="Nombre del Chofer" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                <TextInput
                                    id="driver_name"
                                    className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-emerald-500/10 rounded-xl py-3 px-4 transition-all"
                                    value={data.driver_name}
                                    onChange={(e) => setData('driver_name', e.target.value)}
                                    required
                                    placeholder="Nombre completo del conductor"
                                />
                                <InputError message={errors.driver_name} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <InputLabel htmlFor="operation" value="Tipo de Operación" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                    <select
                                        id="operation"
                                        className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-emerald-500/10 rounded-xl py-3 px-4 transition-all text-sm"
                                        value={data.operation}
                                        onChange={(e) => setData('operation', e.target.value)}
                                        required
                                    >
                                        <option value="transport">Transporte / Logística</option>
                                        <option value="load">Carga</option>
                                        <option value="unload">Descarga</option>
                                        <option value="visit">Visita</option>
                                    </select>
                                    <InputError message={errors.operation} />
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex justify-between items-center px-1">
                                        <InputLabel value="Empresa" className="text-[10px] font-black text-gray-400 uppercase tracking-widest" />
                                        <button 
                                            type="button" 
                                            onClick={() => setIsNewCompany(!isNewCompany)}
                                            className="text-[10px] font-black text-primary uppercase tracking-tighter hover:underline"
                                        >
                                            {isNewCompany ? 'Existente' : '+ Nueva'}
                                        </button>
                                    </div>
                                    
                                    {!isNewCompany ? (
                                        <select
                                            className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-emerald-500/10 rounded-xl py-3 px-4 transition-all text-sm"
                                            value={data.company_id}
                                            onChange={(e) => setData('company_id', e.target.value)}
                                            required={!isNewCompany}
                                        >
                                            <option value="">Seleccione empresa...</option>
                                            {companies.map(c => (
                                                <option key={c.id} value={c.id}>{c.name}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <TextInput
                                            className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-emerald-500/10 rounded-xl py-3 px-4 transition-all"
                                            value={data.new_company}
                                            onChange={(e) => setData('new_company', e.target.value)}
                                            placeholder="Nombre de empresa"
                                            required={isNewCompany}
                                        />
                                    )}
                                    <InputError message={errors.company_id || errors.new_company} />
                                </div>
                            </div>
                        </div>

                        {/* Sección: Observaciones */}
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-4">
                             <div className="flex items-center space-x-2 border-b border-gray-50 pb-4 mb-2">
                                <div className="w-1.5 h-6 bg-gray-400 rounded-full"></div>
                                <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest">Observaciones</h2>
                            </div>
                            <textarea
                                className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-emerald-500/10 rounded-xl py-3 px-4 transition-all text-sm min-h-[120px]"
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                placeholder="Notas sobre la carga, sellos de seguridad, condiciones del vehículo..."
                            />
                        </div>

                        <div className="pt-4 flex space-x-4">
                            <Link 
                                href={route('dashboard')}
                                className="flex-1 flex justify-center py-4 rounded-xl border border-gray-100 text-gray-400 font-black uppercase text-xs tracking-widest hover:bg-gray-50 transition-all"
                            >
                                Cancelar
                            </Link>
                            <PrimaryButton 
                                className="flex-[2] justify-center py-4 rounded-xl shadow-xl shadow-emerald-500/20 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-[0.2em] transition-all"
                                disabled={processing}
                            >
                                Registrar Bitácora
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
