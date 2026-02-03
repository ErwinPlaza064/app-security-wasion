import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link, usePage } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useState, useRef, useEffect } from 'react';

export default function Create({ areas }) {
    const { auth } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        area_name: '',
        status: 'ok',
        notes: '',
        evidence_image: null,
        happened_at: '', // Se llenará en el useEffect
    });

    const [selectedPlant, setSelectedPlant] = useState(auth.user.plant || '');

    useEffect(() => {
        const now = new Date();
        const offset = now.getTimezoneOffset() * 60000;
        const localISOTime = new Date(now - offset).toISOString().slice(0, 16);
        setData('happened_at', localISOTime);
    }, []);
    const [preview, setPreview] = useState(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [stream, setStream] = useState(null);

    // Filtrar áreas por planta seleccionada
    const filteredAreas = areas.filter(area => area.plant === selectedPlant);

    const submit = (e) => {
        e.preventDefault();
        post(route('patrols.store'));
    };

    const startCamera = async () => {
        try {
            const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            setStream(s);
            if (videoRef.current) {
                videoRef.current.srcObject = s;
                setIsCameraOpen(true);
            }
        } catch (err) {
            alert('No se pudo acceder a la cámara');
        }
    };

    const takePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (video && canvas) {
            const context = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = canvas.toDataURL('image/png');
            setData('evidence_image', imageData);
            setPreview(imageData);
            stopCamera();
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
            setIsCameraOpen(false);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Registro de Rondín" />

            <div className="py-12 bg-[#fdfcf9] min-h-[calc(100vh-64px)]">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <div className="flex items-center space-x-2 mb-2">
                                <Link href={route('dashboard')} className="text-[10px] font-black text-gray-400 hover:text-primary uppercase tracking-widest transition-colors">Dashboard</Link>
                                <span className="text-[10px] text-gray-300">/</span>
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Rondines</span>
                            </div>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">Recorrido de Planta</h1>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-blue-500">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                        </div>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Información de Ubicación Automática */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                                <div className="space-y-3">
                                    <InputLabel value="Planta asignada" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                    <div className="bg-primary/5 border border-primary/10 rounded-2xl py-4 px-6 flex items-center space-x-3">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                        <span className="text-sm font-black text-primary uppercase tracking-tight">{selectedPlant || 'No asignada'}</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <InputLabel value="Área / Punto de Control" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                    <select 
                                        className="block w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-primary/20 disabled:opacity-50"
                                        value={data.area_name}
                                        onChange={(e) => setData('area_name', e.target.value)}
                                        required
                                        disabled={!selectedPlant}
                                    >
                                        <option value="">{filteredAreas.length > 0 ? 'Seleccione el área...' : 'No hay áreas para esta planta'}</option>
                                        {filteredAreas.map(area => (
                                            <option key={area.id} value={area.name}>{area.name}</option>
                                        ))}
                                    </select>
                                    <InputError message={errors.area_name} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <InputLabel value="Condición del Punto" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                    <div className="flex p-1 bg-gray-50 rounded-2xl">
                                        <button
                                            type="button"
                                            onClick={() => setData('status', 'ok')}
                                            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${data.status === 'ok' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'text-gray-400'}`}
                                        >
                                            Normal (OK)
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setData('status', 'incident')}
                                            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${data.status === 'incident' ? 'bg-red-500 text-white shadow-lg shadow-red-200' : 'text-gray-400'}`}
                                        >
                                            Incidencia
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <InputLabel value="Fecha y Hora de Verificación" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                <input
                                    type="datetime-local"
                                    className="block w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-primary/20"
                                    value={data.happened_at}
                                    onChange={(e) => setData('happened_at', e.target.value)}
                                    required
                                />
                                <InputError message={errors.happened_at} />
                            </div>
                        </div>

                        {/* Evidencia Fotográfica */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
                            <h2 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em] px-1">Evidencia Visual (Opcional)</h2>
                            
                            {!isCameraOpen && !preview && (
                                <button
                                    type="button"
                                    onClick={startCamera}
                                    className="w-full py-12 border-2 border-dashed border-gray-100 rounded-[2.5rem] bg-gray-50/50 flex flex-col items-center justify-center space-y-3 group hover:bg-gray-50 hover:border-primary/20 transition-all"
                                >
                                    <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors">
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    </div>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-gray-600">Abrir Cámara para Capturar</span>
                                </button>
                            )}

                            {isCameraOpen && (
                                <div className="space-y-4">
                                    <div className="relative rounded-[2.5rem] overflow-hidden bg-black aspect-video">
                                        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                                        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-4">
                                            <button type="button" onClick={stopCamera} className="bg-white/20 backdrop-blur-md p-4 rounded-2xl text-white hover:bg-white/30 transition-all">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                                            </button>
                                            <button type="button" onClick={takePhoto} className="bg-white p-5 rounded-3xl text-primary shadow-xl hover:scale-105 transition-all">
                                                <div className="w-4 h-4 rounded-full border-4 border-primary"></div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {preview && (
                                <div className="relative rounded-[2.5rem] overflow-hidden group">
                                    <img src={preview} className="w-full aspect-video object-cover" />
                                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                        <button type="button" onClick={() => { setPreview(null); startCamera(); }} className="bg-white px-6 py-3 rounded-2xl text-[10px] font-black text-primary uppercase tracking-widest shadow-xl">Cambiar Foto</button>
                                    </div>
                                </div>
                            )}

                            <canvas ref={canvasRef} className="hidden" />
                        </div>

                        {/* Observaciones */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-4">
                            <InputLabel value="Notas y Hallazgos" className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1" />
                            <textarea
                                className="block w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold min-h-[120px] focus:ring-primary/20"
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                placeholder="Describa cualquier situación relevante observada durante el recorrido..."
                            />
                            <InputError message={errors.notes} />
                        </div>

                        <PrimaryButton 
                            className="w-full justify-center py-6 rounded-[2.5rem] bg-primary text-sm font-black uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 group transition-all"
                            disabled={processing}
                        >
                            Finalizar Registro de Rondín
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
