import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Create({ type, companies }) {
    const { data, setData, post, processing, errors } = useForm({
        type: type || 'visitor',
        people_count: 1,
        visitors: [{ full_name: '', id_number: '' }],
        company_id: '',
        new_company: '',
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

    // Actualizar lista de visitantes cuando cambia el conteo
    const handlePeopleCountChange = (count) => {
        const newCount = Math.max(1, parseInt(count) || 1);
        setData(prev => {
            const newVisitors = [...prev.visitors];
            if (newCount > newVisitors.length) {
                for (let i = newVisitors.length; i < newCount; i++) {
                    newVisitors.push({ full_name: '', id_number: '' });
                }
            } else {
                newVisitors.splice(newCount);
            }
            return {
                ...prev,
                people_count: newCount,
                visitors: newVisitors
            };
        });
    };

    const handleVisitorChange = (index, field, value) => {
        const newVisitors = [...data.visitors];
        newVisitors[index][field] = value;
        setData('visitors', newVisitors);
    };

    const titles = {
        visitor: 'Registro de Visitante',
        supplier: 'Registro de Proveedor',
        contractor: 'Registro de Contratista',
    };

    const submit = (e) => {
        e.preventDefault();
        
        if (canvasRef.current) {
            const signatureData = canvasRef.current.toDataURL();
            setData('signature', signatureData);
        }

        post(route('access-logs.store'));
    };

    // Lógica del Canvas
    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        const clientX = (e.clientX || e.touches?.[0]?.clientX);
        const clientY = (e.clientY || e.touches?.[0]?.clientY);
        ctx.moveTo(clientX - rect.left, clientY - rect.top);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const ctx = canvas.getContext('2d');
        const clientX = (e.clientX || e.touches?.[0]?.clientX);
        const clientY = (e.clientY || e.touches?.[0]?.clientY);
        ctx.lineTo(clientX - rect.left, clientY - rect.top);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
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
                        <Link href={route('dashboard')} className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                        </Link>
                    </div>

                    <form onSubmit={submit} className="space-y-8">
                        {/* Selector de Cantidad */}
                        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">Cantidad de personas</h3>
                                    <p className="text-xs text-gray-400 font-medium tracking-tight">Añade integrantes al registro actual</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-2xl">
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <button
                                        key={num}
                                        type="button"
                                        onClick={() => handlePeopleCountChange(num)}
                                        className={`w-12 h-12 rounded-xl text-xs font-black transition-all ${
                                            data.people_count === num 
                                                ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-110' 
                                                : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'
                                        }`}
                                    >
                                        {num}
                                    </button>
                                ))}
                                <TextInput 
                                    type="number" 
                                    min="1" 
                                    max="20"
                                    value={data.people_count}
                                    onChange={(e) => handlePeopleCountChange(e.target.value)}
                                    className="w-16 h-12 bg-white border-none text-xs font-black text-center focus:ring-primary/20 rounded-xl"
                                    placeholder="+"
                                />
                            </div>
                        </div>

                        {/* Listado de Visitantes */}
                        <div className="space-y-6">
                            {data.visitors.map((visitor, index) => (
                                <div key={index} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 space-y-6">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-primary/5 text-primary rounded-xl flex items-center justify-center text-xs font-bold">{index + 1}</div>
                                        <h2 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em]">Datos del Integrante</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <InputLabel value="Nombre Completo" className="text-[10px] font-black text-gray-400 uppercase ms-1" />
                                            <TextInput
                                                className="block w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-primary/20"
                                                value={visitor.full_name}
                                                onChange={(e) => handleVisitorChange(index, 'full_name', e.target.value)}
                                                required
                                                placeholder="Nombre completo..."
                                            />
                                            <InputError message={errors[`visitors.${index}.full_name`]} />
                                        </div>
                                        <div className="space-y-2">
                                            <InputLabel value="Identificación" className="text-[10px] font-black text-gray-400 uppercase ms-1" />
                                            <TextInput
                                                className="block w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-primary/20"
                                                value={visitor.id_number}
                                                onChange={(e) => handleVisitorChange(index, 'id_number', e.target.value)}
                                                placeholder="Nº de Gafete o ID..."
                                            />
                                            <InputError message={errors[`visitors.${index}.id_number`]} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Empresa y Contacto */}
                        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 space-y-6">
                            <h2 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em]">Empresa y Contacto</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center px-1">
                                        <InputLabel value="Empresa" className="text-[10px] font-black text-gray-400 uppercase" />
                                        <button type="button" onClick={() => setIsNewCompany(!isNewCompany)} className="text-[10px] font-black text-primary uppercase underline">{isNewCompany ? 'Seleccionar' : '+ Nueva'}</button>
                                    </div>
                                    {!isNewCompany ? (
                                        <select className="block w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-primary/20" value={data.company_id} onChange={(e) => setData('company_id', e.target.value)} required={!isNewCompany}>
                                            <option value="">Seleccione empresa...</option>
                                            {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                        </select>
                                    ) : (
                                        <TextInput className="block w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold" value={data.new_company} onChange={(e) => setData('new_company', e.target.value)} placeholder="Nombre de la empresa..." required={isNewCompany} />
                                    )}
                                    <InputError message={errors.company_id || errors.new_company} />
                                </div>
                                <div className="space-y-2">
                                    <InputLabel value="Teléfono" className="text-[10px] font-black text-gray-400 uppercase ms-1" />
                                    <TextInput className="block w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-primary/20" value={data.phone} onChange={(e) => setData('phone', e.target.value)} placeholder="10 dígitos..." />
                                    <InputError message={errors.phone} />
                                </div>
                            </div>
                        </div>

                        {/* Equipos y Firma */}
                        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 space-y-8">
                            <h2 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em]">Información Adicional</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <TextInput className="bg-gray-50 border-none rounded-xl py-3 text-xs font-bold" value={data.item_brand} onChange={(e) => setData('item_brand', e.target.value)} placeholder="Marca de equipo" />
                                <TextInput className="bg-gray-50 border-none rounded-xl py-3 text-xs font-bold" value={data.item_color} onChange={(e) => setData('item_color', e.target.value)} placeholder="Color" />
                                <TextInput className="bg-gray-50 border-none rounded-xl py-3 text-xs font-bold" value={data.item_serial} onChange={(e) => setData('item_serial', e.target.value)} placeholder="Nº Serial" />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center px-1">
                                    <InputLabel value="Firma Digital" className="text-[10px] font-black text-gray-400 uppercase" />
                                    <button type="button" onClick={clearSignature} className="text-[10px] font-black text-red-500 uppercase underline">Borrar</button>
                                </div>
                                <div className="border-2 border-dashed border-gray-100 rounded-[2rem] bg-gray-50/30 overflow-hidden h-[200px]">
                                    <canvas
                                        ref={canvasRef}
                                        width={800}
                                        height={200}
                                        className="w-full h-full cursor-crosshair touch-none"
                                        onMouseDown={startDrawing}
                                        onMouseMove={draw}
                                        onMouseUp={stopDrawing}
                                        onMouseOut={stopDrawing}
                                        onTouchStart={startDrawing}
                                        onTouchMove={draw}
                                        onTouchEnd={stopDrawing}
                                    />
                                </div>
                                <InputError message={errors.signature} />
                            </div>

                            <div className="space-y-2">
                                <InputLabel value="Observaciones" className="text-[10px] font-black text-gray-400 uppercase ms-1" />
                                <textarea
                                    className="block w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold min-h-[100px] focus:ring-primary/20"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    placeholder="Notas adicionales sobre el acceso..."
                                />
                                <InputError message={errors.notes} />
                            </div>
                        </div>

                        <PrimaryButton 
                            className="w-full justify-center py-6 rounded-[2rem] bg-primary text-sm font-black uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 group hover:scale-[1.02] transition-all"
                            disabled={processing}
                        >
                            Finalizar Registro de Acceso
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
