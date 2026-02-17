import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState, useEffect } from "react";

export default function Create() {
    const [patrolState, setPatrolState] = useState(() => localStorage.getItem('patrol_state') || 'idle');
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(() => localStorage.getItem('patrol_running') === 'true');

    const { data, setData, post, processing, errors, transform } = useForm({
        area_name: localStorage.getItem('patrol_area') || 'RECORRIDO GENERAL',
        status: localStorage.getItem('patrol_status') || 'ok',
        notes: localStorage.getItem('patrol_notes') || '',
        started_at: localStorage.getItem('patrol_started_at') || '',
        happened_at: '',
    });

    // Handle data persistence
    useEffect(() => {
        if (patrolState !== 'idle') {
            localStorage.setItem('patrol_state', patrolState);
            localStorage.setItem('patrol_running', isRunning);
            localStorage.setItem('patrol_area', data.area_name);
            localStorage.setItem('patrol_status', data.status);
            localStorage.setItem('patrol_notes', data.notes);
            localStorage.setItem('patrol_started_at', data.started_at);
        } else {
            localStorage.removeItem('patrol_state');
            localStorage.removeItem('patrol_running');
            localStorage.removeItem('patrol_area');
            localStorage.removeItem('patrol_status');
            localStorage.removeItem('patrol_notes');
            localStorage.removeItem('patrol_started_at');
            localStorage.removeItem('patrol_start_timestamp');
            localStorage.removeItem('patrol_end_timestamp');
        }
    }, [patrolState, isRunning, data]);

    useEffect(() => {
        let interval = null;
        if (isRunning) {
            const startTime = parseInt(localStorage.getItem('patrol_start_timestamp'));
            
            const updateTimer = () => {
                const now = Date.now();
                const elapsed = Math.floor((now - startTime) / 1000);
                setSeconds(elapsed >= 0 ? elapsed : 0);
            };

            updateTimer();
            interval = setInterval(updateTimer, 1000);
        } else if (patrolState === 'finished') {
            const startTime = parseInt(localStorage.getItem('patrol_start_timestamp'));
            const endTime = parseInt(localStorage.getItem('patrol_end_timestamp'));
            if (startTime && endTime) {
                setSeconds(Math.floor((endTime - startTime) / 1000));
            }
        }
        return () => clearInterval(interval);
    }, [isRunning, patrolState]);

    const formatTime = (totalSeconds) => {
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const startPatrol = () => {
        const now = new Date();
        const timestamp = Date.now();
        const offset = now.getTimezoneOffset() * 60000;
        const localISOTime = new Date(now - offset).toISOString().slice(0, 19);
        
        localStorage.setItem('patrol_start_timestamp', timestamp.toString());
        setPatrolState('running');
        setIsRunning(true);
        setSeconds(0);
        setData('started_at', localISOTime);
    };

    const endPatrol = () => {
        const timestamp = Date.now();
        localStorage.setItem('patrol_end_timestamp', timestamp.toString());
        
        setIsRunning(false);
        setPatrolState('finished');
        
        const now = new Date(timestamp);
        const offset = now.getTimezoneOffset() * 60000;
        const localISOTime = new Date(now - offset).toISOString().slice(0, 19);
        setData('happened_at', localISOTime);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("patrols.store"), {
            onSuccess: () => {
                localStorage.removeItem('patrol_state');
                localStorage.removeItem('patrol_running');
                localStorage.removeItem('patrol_area');
                localStorage.removeItem('patrol_status');
                localStorage.removeItem('patrol_notes');
                localStorage.removeItem('patrol_started_at');
                localStorage.removeItem('patrol_start_timestamp');
                localStorage.removeItem('patrol_end_timestamp');
                
                setPatrolState("idle");
                setSeconds(0);
                setIsRunning(false);
            },
        });
    };
    return (
        <AuthenticatedLayout>
            <Head title="Rondín de Planta" />

            <div className="py-12 bg-[#fdfcf9] min-h-[calc(100vh-64px)]">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 flex items-center justify-between">
                        <div>
                            <div className="flex items-center space-x-2 mb-2">
                                <Link
                                    href={route("dashboard")}
                                    className="text-[10px] font-black text-gray-400 hover:text-primary uppercase tracking-widest transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <span className="text-[10px] text-gray-300">
                                    /
                                </span>
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                                    Rondines
                                </span>
                            </div>
                            <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">
                                Recorrido de Planta
                            </h1>
                        </div>
                        <div
                            className={`w-16 h-16 rounded-[2rem] bg-white shadow-xl flex items-center justify-center transition-all duration-500 ${isRunning ? "text-primary scale-110" : "text-gray-300"}`}
                        >
                            <svg
                                className={`w-8 h-8 ${isRunning ? "animate-spin-slow" : ""}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.5"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {patrolState === "idle" && (
                            <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-[0_20px_50px_rgb(0,0,0,0.03)] text-center space-y-8">
                                <div className="space-y-4">
                                    <div className="w-24 h-24 bg-primary/5 rounded-[2.5rem] flex items-center justify-center mx-auto text-primary">
                                        <svg
                                            className="w-12 h-12"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.8"
                                                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                                            />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">
                                        Listo para comenzar
                                    </h2>
                                    <p className="text-sm text-gray-400 font-medium max-w-xs mx-auto">
                                        Presione el botón para iniciar el
                                        cronómetro y comenzar su recorrido de
                                        seguridad.
                                    </p>
                                </div>
                                <button
                                    onClick={startPatrol}
                                    className="w-full py-8 rounded-[2.5rem] bg-primary text-white text-sm font-black uppercase tracking-[0.4em] shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95 flex items-center justify-center space-x-4"
                                >
                                    <span>Iniciar Recorrido</span>
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M13 5l7 7-7 7M5 5l7 7-7 7"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        )}

                        {patrolState === "running" && (
                            <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-[0_20px_50px_rgb(0,0,0,0.03)] text-center space-y-10">
                                <div className="space-y-2">
                                    <span className="text-[10px] font-black text-primary tracking-[0.5em] uppercase">
                                        Recorrido en Progreso
                                    </span>
                                    <div className="text-7xl font-black text-gray-900 tracking-tighter tabular-nums py-4">
                                        {formatTime(seconds)}
                                    </div>
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                                            Cronómetro Activo
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={endPatrol}
                                    className="w-full py-8 rounded-[2.5rem] bg-gray-900 text-white text-sm font-black uppercase tracking-[0.4em] shadow-2xl shadow-gray-200 hover:bg-red-600 transition-all active:scale-95 flex items-center justify-center space-x-4 group"
                                >
                                    <div className="w-4 h-4 bg-white rounded-sm group-hover:scale-90 transition-all"></div>
                                    <span>Terminar Recorrido</span>
                                </button>
                            </div>
                        )}

                        {patrolState === "finished" && (
                            <form
                                onSubmit={submit}
                                className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700"
                            >
                                <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-[0_20px_50px_rgb(0,0,0,0.03)] space-y-8">
                                    <div className="flex items-center justify-between border-b border-gray-50 pb-6">
                                        <div>
                                            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter">
                                                Resumen del Recorrido
                                            </h2>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                Capture hallazgos antes de
                                                guardar
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">
                                                Tiempo Total
                                            </p>
                                            <p className="text-2xl font-black text-gray-900">
                                                {formatTime(seconds)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <InputLabel
                                            value="Notas y Hallazgos"
                                            className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1"
                                        />
                                        <textarea
                                            className="block w-full bg-gray-50 border-none rounded-[2rem] py-6 px-8 text-sm font-bold min-h-[160px] focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                            value={data.notes}
                                            onChange={(e) =>
                                                setData("notes", e.target.value)
                                            }
                                            placeholder="Describa cualquier situación relevante observada..."
                                        />
                                        <InputError message={errors.notes} />
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setPatrolState("idle")}
                                        className="flex-1 py-6 rounded-[2rem] bg-white border border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:bg-gray-50 transition-all"
                                    >
                                        Descartar
                                    </button>
                                    <PrimaryButton
                                        className="flex-[2] justify-center py-6 rounded-[2.5rem] bg-primary text-sm font-black uppercase tracking-[0.3em] shadow-2xl shadow-primary/30 group transition-all"
                                        disabled={processing}
                                    >
                                        Guardar Registro
                                    </PrimaryButton>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }
            `}</style>
        </AuthenticatedLayout>
    );
}
