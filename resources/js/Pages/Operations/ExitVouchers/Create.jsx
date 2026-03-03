import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useState } from "react";

export default function Create({ suggestedFolio, suggestedReference }) {
    const { data, setData, post, processing, errors, setError, clearErrors } = useForm({
        folio: suggestedFolio,
        recipient_name: "",
        reference_number: suggestedReference,
        is_fixed_asset: false,
        voucher_date: new Date().toISOString().split('T')[0],
        concept: "loan",
        other_concept_details: "",
        exit_date: new Date().toISOString().split('T')[0],
        return_date: "",
    });

    const validateForm = () => {
        let hasErrors = false;
        if (!data.folio) {
            setError("folio", "El folio es obligatorio");
            hasErrors = true;
        }
        if (!data.recipient_name) {
            setError("recipient_name", "El nombre del solicitante es obligatorio");
            hasErrors = true;
        }
        if (data.concept === 'others' && !data.other_concept_details) {
            setError("other_concept_details", "Especifique el motivo 'Otros'");
            hasErrors = true;
        }
        if (!data.exit_date) {
            setError("exit_date", "La fecha de salida es obligatoria");
            hasErrors = true;
        }
        return !hasErrors;
    };

    const submit = (e) => {
        e.preventDefault();
        clearErrors();
        if (!validateForm()) return;
        post(route("exit-vouchers.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Crear Vale de Salida" />

            <div className="py-6 md:py-10 bg-[#fdfcf9] min-h-[calc(100vh-64px)] overflow-x-hidden">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Indicador de progreso estilo Visitas */}
                    <div className="flex space-x-2 mb-6 md:mb-8 px-2">
                        <div className="h-1.5 w-12 bg-[#0A192F] rounded-full"></div>
                        <div className="h-1.5 w-8 bg-gray-200 rounded-full"></div>
                    </div>

                    <div className="bg-white p-6 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50 relative overflow-hidden">
                        
                        {/* Header con Icono y Título estilo Visitas */}
                        <div className="flex items-center space-x-4 md:space-x-6 mb-8 md:mb-12">
                            <div className="w-14 h-14 md:w-20 md:h-20 bg-gray-50 rounded-2xl md:rounded-[2rem] flex items-center justify-center shadow-inner shrink-0">
                                <svg className="w-6 h-6 md:w-10 md:h-10 text-[#0A192F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-xl md:text-3xl font-black text-[#0A192F] tracking-tighter uppercase leading-none">
                                    Vales de Salida
                                </h1>
                                <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-[0.1em] md:tracking-[0.2em] mt-1">
                                    Configuración del Vale de Materiales
                                </p>
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-8 md:y-12">
                            
                            {/* Folio y Referencia */}
                            <div className="flex flex-col md:flex-row gap-6 md:gap-8 pb-8 md:pb-10 border-b border-gray-50">
                                <div className="space-y-3 flex-1">
                                    <InputLabel htmlFor="folio" value="Folio de Control" className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest ms-1" />
                                    <div className="relative group">
                                        <span className="absolute left-6 md:left-8 top-1/2 -translate-y-1/2 text-lg text-gray-300 font-serif italic z-10">№</span>
                                        <TextInput
                                            id="folio"
                                            value={data.folio}
                                            className={`block w-full bg-gray-50 border-none rounded-2xl md:rounded-[2rem] py-5 md:py-6 pl-12 md:pl-16 pr-6 md:px-8 text-2xl md:text-3xl font-black text-[#0A192F] tracking-tighter focus:ring-4 transition-all ${errors.folio ? 'ring-4 ring-red-100' : 'focus:ring-gray-100'}`}
                                            onChange={(e) => setData("folio", e.target.value)}
                                        />
                                    </div>
                                    <InputError message={errors.folio} />
                                </div>
                                <div className="space-y-3 flex-[2]">
                                    <InputLabel htmlFor="reference_number" value="Referencia Automática" className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest ms-1" />
                                    <TextInput
                                        id="reference_number"
                                        value={data.reference_number}
                                        className="block w-full bg-gray-50 border-none rounded-2xl md:rounded-[2rem] py-5 md:py-6 px-6 md:px-8 text-base md:text-lg font-bold text-[#0A192F] focus:ring-4 focus:ring-gray-100 transition-all"
                                        onChange={(e) => setData("reference_number", e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Solicitante */}
                            <div className="space-y-3 md:space-y-4">
                                <InputLabel htmlFor="recipient_name" value="Nombre del Solicitante" className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest ms-2" />
                                <TextInput
                                    id="recipient_name"
                                    value={data.recipient_name}
                                    placeholder="Nombre del solicitante..."
                                    className={`block w-full bg-gray-50 border-none rounded-[1.5rem] md:rounded-[2.5rem] py-5 md:py-7 px-6 md:px-10 text-base md:text-lg font-bold text-[#0A192F] focus:ring-4 transition-all placeholder:text-gray-300 placeholder:italic ${errors.recipient_name ? 'ring-4 ring-red-100' : 'focus:ring-gray-100'}`}
                                    onChange={(e) => setData("recipient_name", e.target.value)}
                                />
                                <InputError message={errors.recipient_name} />
                            </div>

                            {/* Concepto estilo Botones Visitas */}
                            <div className="space-y-4 md:space-y-6 pt-2">
                                <InputLabel value="Motivo de la Salida" className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest ms-2" id="concept-label" />
                                <div className="flex flex-wrap gap-2 md:gap-3">
                                    {[
                                        { id: 'loan', label: 'Préstamo' },
                                        { id: 'sample', label: 'Muestra' },
                                        { id: 'repair', label: 'Reparación' },
                                        { id: 'others', label: 'Otros' }
                                    ].map((opt) => (
                                        <button
                                            key={opt.id}
                                            type="button"
                                            onClick={() => setData("concept", opt.id)}
                                            className={`flex-1 md:flex-none px-4 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${
                                                data.concept === opt.id 
                                                ? 'bg-[#0A192F] text-white shadow-xl shadow-[#0A192F]/20 scale-105' 
                                                : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                                            }`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                    {data.concept === 'others' && (
                                        <div className="w-full">
                                            <TextInput
                                                value={data.other_concept_details}
                                                placeholder="Especifique..."
                                                className={`w-full md:min-w-[200px] bg-gray-50 border-none rounded-xl md:rounded-2xl py-3 md:py-4 px-6 text-xs md:text-sm font-bold text-[#0A192F] focus:ring-4 transition-all ${errors.other_concept_details ? 'ring-4 ring-red-100' : 'focus:ring-gray-100'}`}
                                                onChange={(e) => setData("other_concept_details", e.target.value)}
                                            />
                                            <InputError message={errors.other_concept_details} />
                                        </div>
                                    )}
                                </div>
                                <InputError message={errors.concept} />
                            </div>

                            {/* Activo Fijo Checkbox Premium */}
                            <div 
                                role="checkbox"
                                aria-checked={data.is_fixed_asset}
                                tabIndex={0}
                                onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setData("is_fixed_asset", !data.is_fixed_asset); } }}
                                className="flex items-center space-x-3 md:space-x-4 p-5 md:p-6 bg-gray-50/50 rounded-2xl md:rounded-[2.5rem] cursor-pointer hover:bg-gray-50 transition-all border border-gray-100"
                                onClick={() => setData("is_fixed_asset", !data.is_fixed_asset)}
                            >
                                <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${data.is_fixed_asset ? 'bg-[#0A192F] border-[#0A192F]' : 'bg-white border-gray-200'}`}>
                                    {data.is_fixed_asset && (
                                        <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-[10px] md:text-xs font-black text-[#0A192F] uppercase tracking-widest">¿Se trata de un Activo Fijo?</span>
                            </div>

                            {/* Fechas de Registro */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                <div className="space-y-3">
                                    <InputLabel htmlFor="exit_date" value="Fecha de Salida" className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest ms-2" />
                                    <input
                                        id="exit_date"
                                        type="date"
                                        value={data.exit_date}
                                        onChange={(e) => setData("exit_date", e.target.value)}
                                        className={`w-full bg-gray-50 border-none rounded-2xl md:rounded-[2rem] py-5 md:py-6 px-8 text-base font-bold text-[#0A192F] focus:ring-4 transition-all ${errors.exit_date ? 'ring-4 ring-red-100' : 'focus:ring-gray-100'}`}
                                    />
                                    <InputError message={errors.exit_date} />
                                </div>
                                <div className="space-y-3">
                                    <InputLabel htmlFor="return_date" value="Fecha de Entrega (Retorno)" className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest ms-2" />
                                    <input
                                        id="return_date"
                                        type="date"
                                        value={data.return_date}
                                        onChange={(e) => setData("return_date", e.target.value)}
                                        className={`w-full bg-gray-50 border-none rounded-2xl md:rounded-[2rem] py-5 md:py-6 px-8 text-base font-bold text-[#0A192F] focus:ring-4 transition-all ${errors.return_date ? 'ring-4 ring-red-100' : 'focus:ring-gray-100'}`}
                                    />
                                    <InputError message={errors.return_date} />
                                </div>
                            </div>

                            {/* Botón Final Estilo "Comenzar Llenado" */}
                            <div className="pt-6 md:pt-10">
                                <button 
                                    type="submit"
                                    className="w-full flex items-center justify-center space-x-3 md:space-x-4 py-6 md:py-8 rounded-full bg-[#0A192F] shadow-2xl shadow-[#0A192F]/30 text-white group hover:bg-[#152a4a] transition-all active:scale-[0.98] disabled:opacity-50"
                                    disabled={processing}
                                >
                                    <span className="text-[10px] md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.4em]">
                                        {processing ? "Generando..." : "Confirmar y Generar Registro"}
                                    </span>
                                    <svg
                                        className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
