import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useState, useRef, useEffect } from 'react';

const Icons = {
    MapPin: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    ),
    Users: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    ),
    DocumentText: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    ),
    Camera: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    ),
    Shield: () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
    ),
    UserCircle: () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    Wrench: () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 00-1 1v1a2 2 0 11-4 0v-1a1 1 0 00-1-1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
    ),
    Upload: () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
    ),
    Trash: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
    ),
    Eye: () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
    ),
};

export default function Create({ category: initialCategory, areas }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [preview, setPreview] = useState(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const [stream, setStream] = useState(null);

    const { data, setData, post, processing, errors, setError, clearErrors } = useForm({
        category: initialCategory || 'general',
        description: '',
        location: '',
        happened_at: new Date().toISOString().slice(0, 16),
        involved_person: '',
        payroll_number: '',
        company: 'WASION',
        evidence_image: null,
        no_involved_persons: false,
    });

    const steps = [
        { id: 1, title: 'Lugar', icon: <Icons.MapPin /> },
        { id: 2, title: 'Personas', icon: <Icons.Users /> },
        { id: 3, title: 'Detalles', icon: <Icons.DocumentText /> },
        { id: 4, title: 'Evidencia', icon: <Icons.Camera /> },
    ];

    const incidentCategories = [
        { id: 'conduct', label: 'Conductual', icon: <Icons.UserCircle />, desc: 'Comportamiento personal' },
        { id: 'damage', label: 'Daño / Falla', icon: <Icons.Wrench />, desc: 'Afectación a instalaciones' },
        { id: 'observation', label: 'Observación', icon: <Icons.Eye />, desc: 'Entorno o planta' },
        { id: 'general', label: 'General', icon: <Icons.Shield />, desc: 'Otros sucesos' },
    ];

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) processFile(file);
    };

    const processFile = (file) => {
        setData('evidence_image', file);
        if (errors.evidence_image) clearErrors('evidence_image');
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
    };

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'environment' },
                audio: false 
            });
            setStream(mediaStream);
            if (videoRef.current) videoRef.current.srcObject = mediaStream;
            setIsCameraOpen(true);
        } catch (err) {
            alert("No se pudo acceder a la cámara.");
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        setIsCameraOpen(false);
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => {
                const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
                processFile(file);
                stopCamera();
            }, 'image/jpeg', 0.8);
        }
    };

    useEffect(() => {
        if (data.category === 'damage' || data.category === 'observation') {
             // Sugerir marcar como sin involucrados para estas categorías
             if (!data.involved_person) {
                // No forzar, solo permitir
             }
        }
    }, [data.category]);

    const nextStep = () => {
        clearErrors();
        let hasErrors = false;

        if (currentStep === 1) {
            if (!data.location) {
                setError('location', 'Debe seleccionar una ubicación');
                hasErrors = true;
            }
        } else if (currentStep === 2) {
            const needsInvolved = data.category === 'conduct';
            if (needsInvolved && !data.involved_person && !data.no_involved_persons) {
                setError('involved_person', 'Debe indicar quién está involucrado para una incidencia conductual');
                hasErrors = true;
            } else if (!needsInvolved && !data.involved_person && !data.no_involved_persons) {
            }
        } else if (currentStep === 3) {
            if (!data.description) {
                setError('description', 'Debe describir los hechos o la falla observada');
                hasErrors = true;
            }
        }

        if (hasErrors) return;

        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        clearErrors();
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const submit = (e) => {
        e.preventDefault();
        clearErrors();
        post(route('incidents.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Nuevo Reporte de Incidencia" />

            <div className="py-12 bg-[#fdfcf9] min-h-[calc(100vh-64px)]">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="mb-12">
                        <div className="relative flex justify-between">
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>
                            <div 
                                className="absolute top-1/2 left-0 h-0.5 bg-rose-500 -translate-y-1/2 z-0 transition-all duration-500"
                                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                            ></div>
                            
                            {steps.map((s) => (
                                <div key={s.id} className="relative z-10 flex flex-col items-center">
                                    <div 
                                        onClick={() => s.id < currentStep && setCurrentStep(s.id)}
                                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all transform cursor-pointer ${
                                            currentStep >= s.id 
                                                ? 'bg-rose-500 text-white shadow-lg shadow-rose-200 scale-105' 
                                                : 'bg-white text-gray-300 border border-gray-100'
                                        }`}
                                    >
                                        {s.icon}
                                    </div>
                                    <span className={`mt-3 text-[10px] font-black uppercase tracking-widest ${
                                        currentStep >= s.id ? 'text-gray-900' : 'text-gray-300'
                                    }`}>
                                        {s.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] min-h-[450px] flex flex-col">
                            
                            {currentStep === 1 && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div>
                                        <div className="flex items-center space-x-3 mb-6">
                                            <div className="w-1.5 h-8 bg-rose-500 rounded-full"></div>
                                            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Tipo de Incidencia</h2>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {incidentCategories.map((cat) => (
                                                <div 
                                                    key={cat.id}
                                                    onClick={() => setData('category', cat.id)}
                                                    className={`p-4 rounded-3xl border-2 transition-all flex flex-col items-center text-center cursor-pointer ${
                                                        data.category === cat.id 
                                                            ? 'border-rose-500 bg-rose-50/50 shadow-inner' 
                                                            : 'border-gray-50 bg-gray-50/30 hover:border-gray-200'
                                                    }`}
                                                >
                                                    <div className={`p-2.5 rounded-2xl mb-2 ${
                                                        data.category === cat.id ? 'bg-rose-500 text-white' : 'bg-white text-gray-400 border border-gray-100'
                                                    }`}>
                                                        {cat.icon}
                                                    </div>
                                                    <div className={`font-black text-[10px] uppercase tracking-widest ${
                                                        data.category === cat.id ? 'text-rose-600' : 'text-gray-900'
                                                    }`}>
                                                        {cat.label}
                                                    </div>
                                                    <div className="text-[8px] text-gray-400 mt-1 leading-tight">{cat.desc}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-4 border-t border-gray-50">
                                        <div className="flex items-center space-x-2 ms-1">
                                            <Icons.MapPin />
                                            <InputLabel value="Ubicación / Área" className="text-[10px] font-black text-gray-400 uppercase tracking-widest" />
                                        </div>
                                        <select
                                            value={data.location}
                                            onChange={(e) => setData('location', e.target.value)}
                                            className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-rose-500/10 rounded-2xl py-4 px-6 transition-all text-sm appearance-none cursor-pointer"
                                            required
                                        >
                                            <option value="">Selecciona el área...</option>
                                            {areas?.map((a) => (
                                                <option key={a.id} value={a.name}>{a.name}</option>
                                            ))}
                                            <option value="OTRO">OTRO (Especificar)</option>
                                        </select>
                                        <InputError message={errors.location} className="mt-2" />
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className="w-1.5 h-8 bg-rose-500 rounded-full"></div>
                                        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Involucrados</h2>
                                    </div>
                                    
                                    <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <div className="text-xs font-black text-gray-900 uppercase tracking-widest">¿Sin personas involucradas?</div>
                                                <div className="text-[10px] text-gray-400">Marque esta opción si es un daño a instalaciones o falla de entorno.</div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setData(d => ({
                                                        ...d,
                                                        no_involved_persons: !d.no_involved_persons,
                                                        involved_person: !d.no_involved_persons ? 'N/A (Falla/Instalación)' : '',
                                                        payroll_number: !d.no_involved_persons ? '' : d.payroll_number,
                                                        company: !d.no_involved_persons ? 'N/A' : (d.company === 'N/A' ? 'WASION' : d.company)
                                                    }));
                                                }}
                                                className={`w-12 h-6 rounded-full transition-all relative ${data.no_involved_persons ? 'bg-rose-500' : 'bg-gray-200'}`}
                                            >
                                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${data.no_involved_persons ? 'left-7' : 'left-1'}`}></div>
                                            </button>
                                        </div>
                                    </div>

                                    {!data.no_involved_persons && (
                                        <div className="space-y-6 animate-in fade-in duration-300">
                                            <div className="space-y-2">
                                                <InputLabel value="Nombre de la persona" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                                <div className="relative">
                                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300">
                                                        <Icons.Users />
                                                    </div>
                                                    <TextInput
                                                        className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-rose-500/10 rounded-2xl py-4 pl-14 pr-6"
                                                        value={data.involved_person}
                                                        onChange={(e) => setData('involved_person', e.target.value.replace(/\b\w/g, l => l.toUpperCase()))}
                                                        placeholder="Nombre completo..."
                                                    />
                                                    <InputError message={errors.involved_person} className="mt-2" />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <InputLabel value="Número de Nómina" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                                    <TextInput
                                                        className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-rose-500/10 rounded-2xl py-4 px-6"
                                                        value={data.payroll_number}
                                                        onChange={(e) => setData('payroll_number', e.target.value)}
                                                        placeholder="Ej. 123456"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <InputLabel value="Empresa" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                                    <TextInput
                                                        className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-rose-500/10 rounded-2xl py-4 px-6"
                                                        value={data.company}
                                                        onChange={(e) => setData('company', e.target.value)}
                                                        placeholder="WASION, Contratista..."
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className="w-1.5 h-8 bg-rose-500 rounded-full"></div>
                                        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Detalles del Suceso</h2>
                                    </div>

                                    <div className="space-y-2">
                                        <InputLabel value="Fecha y Hora del Evento" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                        <input
                                            type="datetime-local"
                                            className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-rose-500/10 rounded-2xl py-4 px-6 text-sm"
                                            value={data.happened_at}
                                            onChange={(e) => setData('happened_at', e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <InputLabel value="Descripción de los hechos" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                        <textarea
                                            className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-rose-500/10 rounded-3xl py-4 px-6 min-h-[180px] text-sm leading-relaxed"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            required
                                            placeholder="¿Qué sucedió? Describe los hechos de manera clara y objetiva..."
                                        />
                                        <InputError message={errors.description} className="mt-2" />
                                    </div>
                                </div>
                            )}

                            {currentStep === 4 && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 flex-1 flex flex-col">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className="w-1.5 h-8 bg-rose-500 rounded-full"></div>
                                        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Evidencia Fotográfica</h2>
                                    </div>
                                    
                                    <div className="flex-1 flex flex-col">
                                        {isCameraOpen ? (
                                            <div className="relative flex-1 bg-black rounded-[2rem] overflow-hidden shadow-2xl min-h-[320px]">
                                                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                                                <div className="absolute bottom-8 inset-x-0 flex justify-center items-center gap-10">
                                                    <button type="button" onClick={stopCamera} className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">Cerrar</button>
                                                    <button type="button" onClick={capturePhoto} className="w-20 h-20 bg-white rounded-full border-8 border-white/20 flex items-center justify-center p-1 shadow-2xl active:scale-90 transition-all">
                                                        <div className="w-full h-full rounded-full border-2 border-rose-500/20 bg-rose-500/5"></div>
                                                    </button>
                                                    <div className="w-[84px]"></div>
                                                </div>
                                            </div>
                                        ) : preview ? (
                                            <div className="relative flex-1 bg-gray-50 rounded-[2rem] border border-gray-100 overflow-hidden group min-h-[320px]">
                                                <img src={preview} className="w-full h-full object-contain p-6" alt="Preview" />
                                                <div className="absolute inset-x-0 bottom-8 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-all">
                                                    <button type="button" onClick={startCamera} className="bg-white p-5 rounded-3xl shadow-2xl text-rose-500 scale-110 active:scale-95 transition-all">
                                                        <Icons.Camera />
                                                    </button>
                                                    <button type="button" onClick={() => {setPreview(null); setData('evidence_image', null);}} className="bg-rose-500 p-5 rounded-3xl shadow-2xl text-white scale-110 active:scale-95 transition-all">
                                                        <Icons.Trash />
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 min-h-[320px]">
                                                <button type="button" onClick={startCamera} className="bg-rose-50/50 border-2 border-dashed border-rose-100 rounded-[2rem] flex flex-col items-center justify-center group hover:bg-rose-50 transition-all shadow-sm">
                                                    <div className="p-5 rounded-3xl bg-white text-rose-500 mb-4 group-hover:scale-110 shadow-sm transition-transform">
                                                        <Icons.Camera />
                                                    </div>
                                                    <span className="text-[10px] font-black text-rose-600 uppercase tracking-[0.2em]">Usar Cámara</span>
                                                </button>
                                                <button type="button" onClick={() => fileInputRef.current.click()} className="bg-gray-50/50 border-2 border-dashed border-gray-100 rounded-[2rem] flex flex-col items-center justify-center group hover:bg-gray-50 transition-all shadow-sm">
                                                    <div className="p-5 rounded-3xl bg-white text-gray-400 mb-4 group-hover:scale-110 shadow-sm transition-transform">
                                                        <Icons.Upload />
                                                    </div>
                                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Subir Archivo</span>
                                                </button>
                                            </div>
                                        )}
                                        <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                    </div>
                                    <InputError message={errors.evidence_image} className="mt-2" />
                                </div>
                            )}

                            <div className="mt-auto pt-8 flex gap-4">
                                <button 
                                    type="button" 
                                    onClick={currentStep === 1 ? () => window.history.back() : prevStep}
                                    className="flex-1 py-4 px-6 rounded-2xl border border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-all"
                                >
                                    {currentStep === 1 ? 'Cancelar' : 'Anterior'}
                                </button>

                                {currentStep < 4 ? (
                                    <button 
                                        type="button" 
                                        onClick={nextStep}
                                        disabled={currentStep === 1 && !data.location}
                                        className="flex-[2] py-4 px-6 rounded-2xl bg-gray-900 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-gray-200 hover:bg-black disabled:opacity-50 transition-all"
                                    >
                                        Continuar
                                    </button>
                                ) : (
                                    <PrimaryButton 
                                        onClick={submit}
                                        className="flex-[2] py-4 px-6 rounded-2xl bg-rose-600 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-rose-200 hover:bg-rose-700 transition-all"
                                        disabled={processing}
                                    >
                                        {processing ? 'Enviando...' : 'Finalizar Reporte'}
                                    </PrimaryButton>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
