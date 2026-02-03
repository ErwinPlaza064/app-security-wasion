import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useState, useRef, useEffect } from 'react';

export default function Create({ type, companies }) {
    const { data, setData, post, processing, errors } = useForm({
        type: type || 'visitor',
        full_name: '',
        company_id: '',
        new_company: '',
        id_number: '',
        phone: '',
        item_brand: '',
        item_color: '',
        item_serial: '',
        notes: '',
        signature: '',
    });

    const [isNewCompany, setIsNewCompany] = useState(false);
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    // Mapeo de títulos según el tipo
    const titles = {
        visitor: 'Registro de Visitante',
        supplier: 'Registro de Proveedor',
        contractor: 'Registro de Contratista',
    };

    const submit = (e) => {
        e.preventDefault();
        
        // Capturar firma si existe
        if (canvasRef.current) {
            const signatureData = canvasRef.current.toDataURL();
            setData('signature', signatureData);
        }

        post(route('access-logs.store'));
    };

    // Lógica básica para el Canvas de firma
    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const ctx = canvas.getContext('2d');
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        const signatureData = canvasRef.current.toDataURL();
        setData('signature', signatureData);
    };

    const clearSignature = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setData('signature', '');
    };

    return (
        <AuthenticatedLayout>
            <Head title={titles[type] || 'Acceso'} />

            <div className="py-12 bg-[#fdfcf9] min-h-[calc(100vh-64px)]">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <div className="flex items-center space-x-2 mb-2">
                                <Link href={route('dashboard')} className="text-[10px] font-black text-gray-400 hover:text-primary uppercase tracking-widest transition-colors">Dashboard</Link>
                                <span className="text-[10px] text-gray-300">/</span>
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest">{type}</span>
                            </div>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">{titles[type]}</h1>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-primary">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Sección: Información Personal */}
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
                            <div className="flex items-center space-x-2 border-b border-gray-50 pb-4 mb-2">
                                <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                                <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest">Información del Visitante</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <InputLabel htmlFor="full_name" value="Nombre Completo" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                    <TextInput
                                        id="full_name"
                                        className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-primary/10 rounded-xl py-3 px-4 transition-all"
                                        value={data.full_name}
                                        onChange={(e) => setData('full_name', e.target.value)}
                                        required
                                        placeholder="Ej. Juan Pérez"
                                    />
                                    <InputError message={errors.full_name} />
                                </div>

                                <div className="space-y-1.5">
                                    <InputLabel htmlFor="id_number" value="Identificación / Gafete" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                    <TextInput
                                        id="id_number"
                                        className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-primary/10 rounded-xl py-3 px-4 transition-all"
                                        value={data.id_number}
                                        onChange={(e) => setData('id_number', e.target.value)}
                                        placeholder="Nº INE, Licencia, etc."
                                    />
                                    <InputError message={errors.id_number} />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex justify-between items-center px-1">
                                    <InputLabel value="Empresa" className="text-[10px] font-black text-gray-400 uppercase tracking-widest" />
                                    <button 
                                        type="button" 
                                        onClick={() => setIsNewCompany(!isNewCompany)}
                                        className="text-[10px] font-black text-primary uppercase tracking-tighter hover:underline"
                                    >
                                        {isNewCompany ? 'Seleccionar existente' : '+ Registrar nueva empresa'}
                                    </button>
                                </div>
                                
                                {!isNewCompany ? (
                                    <select
                                        className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-primary/10 rounded-xl py-3 px-4 transition-all text-sm"
                                        value={data.company_id}
                                        onChange={(e) => setData('company_id', e.target.value)}
                                        required={!isNewCompany}
                                    >
                                        <option value="">Seleccione una empresa...</option>
                                        {companies.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <TextInput
                                        className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-primary/10 rounded-xl py-3 px-4 transition-all"
                                        value={data.new_company}
                                        onChange={(e) => setData('new_company', e.target.value)}
                                        placeholder="Nombre de la nueva empresa"
                                        required={isNewCompany}
                                    />
                                )}
                                <InputError message={errors.company_id || errors.new_company} />
                            </div>
                        </div>

                        {/* Sección: Equipos / Laptops (Opcional) */}
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
                            <div className="flex items-center space-x-2 border-b border-gray-50 pb-4 mb-2">
                                <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div>
                                <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest">Registro de Equipos (Opcional)</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-1.5">
                                    <InputLabel value="Marca" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                    <TextInput
                                        className="block w-full bg-gray-50 border-none rounded-xl py-3 px-4 transition-all text-sm"
                                        value={data.item_brand}
                                        onChange={(e) => setData('item_brand', e.target.value)}
                                        placeholder="Ej. Dell, HP"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <InputLabel value="Color/Modelo" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                    <TextInput
                                        className="block w-full bg-gray-50 border-none rounded-xl py-3 px-4 transition-all text-sm"
                                        value={data.item_color}
                                        onChange={(e) => setData('item_color', e.target.value)}
                                        placeholder="Ej. Gris"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <InputLabel value="Nº Serial" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                    <TextInput
                                        className="block w-full bg-gray-50 border-none rounded-xl py-3 px-4 transition-all text-sm"
                                        value={data.item_serial}
                                        onChange={(e) => setData('item_serial', e.target.value)}
                                        placeholder="S/N"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Sección: Firma y Notas */}
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
                            <div className="flex items-center space-x-2 border-b border-gray-50 pb-4 mb-2">
                                <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
                                <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest">Validación y Notas</h2>
                            </div>

                            <div className="space-y-1.5">
                                <InputLabel value="Observaciones" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                <textarea
                                    className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-primary/10 rounded-xl py-3 px-4 transition-all text-sm min-h-[100px]"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    placeholder="Detalles adicionales del acceso..."
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <InputLabel value="Firma Digital" className="text-[10px] font-black text-gray-400 uppercase tracking-widest" />
                                    <button type="button" onClick={clearSignature} className="text-[9px] font-black text-red-500 uppercase tracking-tighter hover:underline">Borrar firma</button>
                                </div>
                                <div className="border-2 border-dashed border-gray-100 rounded-2xl overflow-hidden bg-gray-50/30">
                                    <canvas
                                        ref={canvasRef}
                                        width={600}
                                        height={200}
                                        className="w-full cursor-crosshair"
                                        onMouseDown={startDrawing}
                                        onMouseMove={draw}
                                        onMouseUp={stopDrawing}
                                        onMouseOut={stopDrawing}
                                    />
                                </div>
                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest text-center">Firme dentro del recuadro punteado</p>
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
                                className="flex-[2] justify-center py-4 rounded-xl shadow-xl shadow-primary/20 bg-primary hover:bg-[#07104d] text-white text-xs font-black uppercase tracking-[0.2em] transition-all"
                                disabled={processing}
                            >
                                Registrar Entrada
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
