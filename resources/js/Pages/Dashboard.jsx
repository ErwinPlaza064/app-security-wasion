import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export default function Dashboard({ activeVisitors = [] }) {
    const { auth } = usePage().props;
    const { patch, processing } = useForm();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredVisitors = activeVisitors.filter(v => 
        v.external_person?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.external_person?.company?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Configuración de los módulos con todos los campos/vistas faltantes
    const modules = [
        { 
            name: "Visitantes", 
            icon: <><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M17 11l2 2 4-4"/></>, 
            route: "access-logs.create", 
            params: { type: 'visitor' }, 
            color: 'text-blue-600',
            bg: 'bg-blue-50'
        },
        { 
            name: "Contratistas", 
            icon: <><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.77 3.77z"/></>, 
            route: "access-logs.create", 
            params: { type: 'contractor' }, 
            color: 'text-purple-600',
            bg: 'bg-purple-50'
        },
        { 
            name: "Proveedores", 
            icon: <><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>, 
            route: "access-logs.create", 
            params: { type: 'supplier' }, 
            color: 'text-emerald-600',
            bg: 'bg-emerald-50'
        },
        { 
            name: "Vehículos Carga", 
            icon: <><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/><path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/></>, 
            route: "vehicle-logs.create", 
            params: { operation: 'load' }, 
            color: 'text-amber-600',
            bg: 'bg-amber-50'
        },
        { 
            name: "Vehículos Visita", 
            icon: <><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></>, 
            route: "vehicle-logs.create", 
            params: { operation: 'visit' }, 
            color: 'text-orange-600',
            bg: 'bg-orange-50'
        },
        { 
            name: "Incidencias Conducta", 
            icon: <><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="18" y1="8" x2="23" y2="13"/><line x1="23" y1="8" x2="18" y2="13"/></>, 
            route: "incidents.create", 
            params: { category: 'conduct' }, 
            color: 'text-red-600',
            bg: 'bg-red-50'
        },
        { 
            name: "Sin Gafete", 
            icon: <><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></>, 
            route: "special-logs.create", 
            params: { type: 'no_badge' }, 
            color: 'text-indigo-600',
            bg: 'bg-indigo-50'
        },
        { 
            name: "Pase de Salida", 
            icon: <><path d="M10 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2v-4"/><polyline points="14 3 20 3 20 9"/><line x1="9" y1="14" x2="20" y2="3"/></>, 
            route: "special-logs.create", 
            params: { type: 'clearance' }, 
            color: 'text-cyan-600',
            bg: 'bg-cyan-50'
        },
        { 
            name: "Rondines", 
            icon: <><path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></>, 
            route: "patrols.create", 
            color: 'text-rose-600',
            bg: 'bg-rose-50'
        }
    ];

    // Filtrado de MÓDULOS DE REGISTRO
    const filteredModules = modules.filter(m => 
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        loop: filteredModules.length > 1, // Solo loop si hay más de uno
        mode: "snap",
        defaultAnimation: {
            duration: 200, // Aún más rápido (de 350 a 200)
        },
        drag: true,
        rubberband: false, // Evita el rebote para que sea más seco y rápido
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        created() {
            setLoaded(true);
        },
        slides: {
            perView: 1.2, // 1.2 para que se vea el "cachito" de la siguiente tarjeta en móvil
            spacing: 12,
        },
        breakpoints: {
            "(min-width: 640px)": {
                slides: { perView: 2.5, spacing: 20 },
            },
            "(min-width: 1024px)": {
                slides: { perView: Math.min(filteredModules.length, 4.5), spacing: 24 },
            },
        },
    }); // Re-inicializar cuando cambie el término de búsqueda (necesario para KeenSlider)

    const handleExit = (id) => {
        if (confirm('¿Confirmar salida para esta persona?')) {
            patch(route('access-logs.exit', id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Escritorio Operativo" />

            <div className="py-10 bg-[#fdfcf9] min-h-[calc(100vh-64px)] overflow-x-hidden">
                <style>{`
                    .dots { display: flex; padding: 10px 0; justify-content: center; gap: 8px; }
                    .dot { border: none; width: 6px; height: 6px; background: #e2e8f0; border-radius: 50%; cursor: pointer; transition: all 0.3s ease; }
                    .dot:focus { outline: none; }
                    .dot.active { width: 18px; background: #0c1869; border-radius: 3px; }
                    .arrow { width: 30px; height: 30px; position: absolute; top: 50%; transform: translateY(-50%); fill: #0c1869; cursor: pointer; transition: all 0.3s; z-index: 20; background: white; border-radius: 50%; padding: 8px; shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); display: none; }
                    @media (min-width: 768px) {
                        .arrow { display: block; }
                    }
                    .arrow--left { left: -15px; }
                    .arrow--right { right: -15px; }
                    .arrow--disabled { fill: #cbd5e1; cursor: default; }
                    .navigation-wrapper { position: relative; }
                `}</style>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-8 uppercase">
                        <div>
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="w-8 h-1 bg-primary rounded-full"></div>
                                <span className="text-[10px] font-black text-primary tracking-[0.4em]">COMANDO SEGURIDAD</span>
                            </div>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tighter mb-1">
                                Panel de <span className="text-primary italic">Control</span>
                            </h1>
                            <p className="text-gray-400 text-[10px] font-bold tracking-widest">Operador: {auth.user.name}</p>
                        </div>
                        <div className="bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4">
                            <span className="text-[10px] font-black text-gray-400 tracking-widest">Activos</span>
                            <span className="text-2xl font-black text-primary">{activeVisitors.length}</span>
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        </div>
                    </div>

                    {/* Buscador Inteligente */}
                    <div className="mb-12 relative">
                        <div className="absolute inset-y-0 left-0 pl-7 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-gray-300 group-focus-within:text-primary transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input 
                            type="text" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="BUSCAR REGISTRO A LLENAR..."
                            className="block w-full bg-white border-none py-7 pl-16 pr-6 rounded-[2.5rem] text-[11px] font-black tracking-[0.2em] text-gray-900 shadow-2xl shadow-gray-200/60 focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-gray-300 group uppercase"
                        />
                        <div className="absolute inset-y-0 right-0 pr-6 flex items-center space-x-2">
                             <div className="hidden sm:flex bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100 text-[9px] font-black text-gray-400 tracking-widest uppercase">
                                Comando Rápido
                            </div>
                        </div>
                    </div>

                    {/* Módulos de Registro con Slider */}
                    <div className="space-y-6 mb-16">
                        <div className="flex items-center justify-between px-1">
                            <h2 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em]">Nuevos Registros</h2>
                        </div>

                        <div className="navigation-wrapper" key={searchTerm}>
                            <div ref={sliderRef} className="keen-slider">
                                {filteredModules.length > 0 ? (
                                    filteredModules.map((item, idx) => (
                                        <Link
                                            key={idx}
                                            href={route(item.route, item.params || {})}
                                            className="keen-slider__slide group bg-white p-6 rounded-[2rem] border border-gray-100/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgb(12,24,105,0.06)] transition-all duration-500 flex flex-col items-start min-h-[160px] justify-between overflow-hidden relative"
                                        >
                                            <div className={`absolute -right-10 -bottom-10 w-32 h-32 ${item.bg} rounded-full opacity-20 group-hover:scale-150 transition-all duration-700`}></div>
                                            <div className={`w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 shadow-sm`}>
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                    {item.icon}
                                                </svg>
                                            </div>
                                            <div className="relative z-10 w-full text-left">
                                                <h3 className="font-black text-gray-900 text-[11px] uppercase tracking-[0.15em] mb-1 group-hover:text-primary transition-colors">
                                                    {item.name}
                                                </h3>
                                                <div className="flex items-center space-x-1 opacity-40 group-hover:opacity-100 transition-all duration-500">
                                                    <span className="text-[9px] text-primary font-black uppercase tracking-widest">Entrar</span>
                                                    <svg className="w-2.5 h-2.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="keen-slider__slide flex flex-col items-center justify-center py-12 bg-white/50 rounded-[2rem] border-2 border-dashed border-gray-100">
                                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">No hay módulos que coincidan</p>
                                    </div>
                                )}
                            </div>
                            
                            {loaded && instanceRef.current && (
                                <>
                                    <Arrow 
                                        left 
                                        onClick={(e) => e.stopPropagation() || instanceRef.current?.prev()} 
                                        disabled={false} // En loop siempre están activas
                                    />
                                    <Arrow 
                                        onClick={(e) => e.stopPropagation() || instanceRef.current?.next()} 
                                        disabled={false} // En loop siempre están activas
                                    />
                                </>
                            )}
                        </div>

                        {loaded && instanceRef.current && filteredModules.length > 1 && (
                            <div className="dots">
                                {filteredModules.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => instanceRef.current?.moveToIdx(idx)}
                                        className={"dot" + (currentSlide === idx ? " active" : "")}
                                    ></button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Tabla de Personal en Planta */}
                    <div className="space-y-6">
                        <h2 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em] px-1">Personal en Planta</h2>
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                            {filteredVisitors.length === 0 ? (
                                <div className="py-20 flex flex-col items-center justify-center space-y-4">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                    </div>
                                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">
                                        {searchTerm ? 'No se encontraron resultados' : 'Sin personal activo'}
                                    </p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-50/50 uppercase">
                                                <th className="px-8 py-5 text-[9px] font-black text-gray-400 tracking-widest">Nombre</th>
                                                <th className="px-8 py-5 text-[9px] font-black text-gray-400 tracking-widest">Empresa</th>
                                                <th className="px-8 py-5 text-[9px] font-black text-gray-400 tracking-widest text-center">Entrada</th>
                                                <th className="px-8 py-5 text-[9px] font-black text-gray-400 tracking-widest text-right">Salida</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {filteredVisitors.map((v) => (
                                                <tr key={v.id} className="hover:bg-gray-50/30 transition-colors uppercase">
                                                    <td className="px-8 py-5 font-black text-[10px] text-gray-900">{v.external_person?.full_name}</td>
                                                    <td className="px-8 py-5 font-black text-[10px] text-primary">{v.external_person?.company?.name || '---'}</td>
                                                    <td className="px-8 py-5 text-center text-[10px] font-black text-gray-400">
                                                        {new Date(v.entry_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </td>
                                                    <td className="px-8 py-5 text-right">
                                                        <button 
                                                            onClick={() => handleExit(v.id)}
                                                            className="px-4 py-2 bg-gray-900 text-white rounded-xl text-[8px] font-black tracking-widest hover:bg-red-600 transition-all active:scale-95"
                                                        >
                                                            SALIDA
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function Arrow(props) {
    const disabled = props.disabled ? " arrow--disabled" : "";
    return (
        <svg
            onClick={props.onClick}
            className={`arrow ${props.left ? "arrow--left" : "arrow--right"} ${disabled}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            {props.left && <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />}
            {!props.left && <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />}
        </svg>
    );
}
