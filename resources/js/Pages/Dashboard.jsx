import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import Modal from '@/Components/Modal';

export default function Dashboard({ activeVisitors = [], openIncidents = [] }) {
    const { auth } = usePage().props;
    const { patch, processing } = useForm();
    const [searchTerm, setSearchTerm] = useState('');
    const [tableSearch, setTableSearch] = useState('');
    const [companyFilter, setCompanyFilter] = useState('');
    const [confirmExitModal, setConfirmExitModal] = useState(false);
    const [selectedVisitor, setSelectedVisitor] = useState(null);
    const tableRef = useRef(null);
    const actionsRef = useRef(null);

    // Posicionar automáticamente en la sección de acciones al cargar
    useEffect(() => {
        actionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);

    const scrollToTable = () => {
        tableRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Obtener lista única de empresas presentes para el filtro
    const activeCompanies = [...new Set(activeVisitors
        .map(v => v.external_person?.company?.name)
        .filter(Boolean)
    )].sort();

    const filteredVisitors = activeVisitors.filter(v => {
        const matchesSearch = 
            v.external_person?.full_name?.toLowerCase().includes(tableSearch.toLowerCase()) ||
            v.external_person?.company?.name?.toLowerCase().includes(tableSearch.toLowerCase());
        
        const matchesCompany = !companyFilter || v.external_person?.company?.name === companyFilter;
        
        return matchesSearch && matchesCompany;
    });

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
            name: "Proveedores", 
            icon: <><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>, 
            route: "access-logs.create", 
            params: { type: 'supplier' }, 
            color: 'text-emerald-600',
            bg: 'bg-emerald-50'
        },
        { 
            name: "Carga y Descarga", 
            icon: <><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/><path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/></>, 
            route: "vehicle-logs.create", 
            params: { operation: 'load' }, 
            color: 'text-amber-600',
            bg: 'bg-amber-50'
        },
        { 
            name: "Padrón Vehicular", 
            icon: <><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></>, 
            route: "employee-vehicles.create", 
            color: 'text-blue-600',
            bg: 'bg-blue-50'
        },
        { 
            name: "Renuncias y Finiquitos", 
            icon: <><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="18" y1="8" x2="23" y2="13"/><line x1="23" y1="8" x2="18" y2="13"/></>, 
            route: "special-logs.create", 
            params: { type: 'resignation' }, 
            color: 'text-yellow-600',
            bg: 'bg-yellow-50'
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

    const handleExit = (visitor) => {
        setSelectedVisitor(visitor);
        setConfirmExitModal(true);
    };

    const confirmExit = () => {
        if (selectedVisitor) {
            patch(route('access-logs.exit', selectedVisitor.id), {
                onSuccess: () => {
                    setConfirmExitModal(false);
                    setSelectedVisitor(null);
                }
            });
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Escritorio Operativo" />

            <div className="py-10 bg-[#fdfcf9] min-h-[calc(100vh-64px)] overflow-x-hidden">
                <style>{`
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
                        <div className="flex gap-4">
                            <button 
                                onClick={scrollToTable}
                                className="bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4 hover:shadow-md hover:border-primary/20 transition-all group active:scale-95"
                            >
                                <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase group-hover:text-primary transition-colors">Activos</span>
                                <span className="text-2xl font-black text-primary leading-none">{activeVisitors.length}</span>
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            </button>
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
                    </div>


                    {/* Módulos de Registro con Grid */}
                    <div className="space-y-6 mb-16" ref={actionsRef}>
                        <div className="flex items-center justify-between px-1">
                            <h2 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em]">Acciones de Registro</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {filteredModules.length > 0 ? (
                                filteredModules.map((item, idx) => (
                                    <Link
                                        key={idx}
                                        href={route(item.route, item.params || {})}
                                        className="group bg-white p-7 rounded-[2.5rem] border border-gray-100/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgb(12,24,105,0.06)] transition-all duration-500 flex flex-col items-start min-h-[180px] justify-between overflow-hidden relative"
                                    >
                                        <div className={`absolute -right-10 -bottom-10 w-32 h-32 ${item.bg} rounded-full opacity-20 group-hover:scale-150 transition-all duration-700`}></div>
                                        <div className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 shadow-sm`}>
                                            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                {item.icon}
                                            </svg>
                                        </div>
                                        <div className="relative z-10 w-full text-left">
                                            <h3 className="font-black text-gray-900 text-[11px] uppercase tracking-[0.15em] mb-2 group-hover:text-primary transition-colors">
                                                {item.name}
                                            </h3>
                                            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                                                <span className="text-[9px] text-primary font-black uppercase tracking-widest">Abrir Registro</span>
                                                <svg className="w-2.5 h-2.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white/50 rounded-[3rem] border-2 border-dashed border-gray-100">
                                    <p className="text-[11px] font-black text-gray-300 uppercase tracking-[0.3em]">No se encontraron módulos operativos</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Tabla de Personal en Planta */}
                    <div className="space-y-6" ref={tableRef}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
                            <h2 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em]">Personal en Planta</h2>
                            
                            <div className="flex flex-col sm:flex-row gap-2">
                                {/* Filtro por Empresa */}
                                <select 
                                    value={companyFilter}
                                    onChange={(e) => setCompanyFilter(e.target.value)}
                                    className="bg-white border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest px-6 py-3 focus:ring-primary/10 transition-all cursor-pointer shadow-sm"
                                >
                                    <option value="">Todas las Empresas</option>
                                    {activeCompanies.map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>

                                {/* Búsqueda en Tabla */}
                                <div className="relative">
                                    <input 
                                        type="text"
                                        value={tableSearch}
                                        onChange={(e) => setTableSearch(e.target.value)}
                                        placeholder="BUSCAR EN TABLA..."
                                        className="bg-white border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest pl-10 pr-6 py-3 focus:ring-primary/10 transition-all shadow-sm w-full sm:w-[250px]"
                                    />
                                    <svg className="w-3.5 h-3.5 text-gray-300 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                                </div>
                            </div>
                        </div>
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
                                                <th className="px-8 py-5 text-[9px] font-black text-gray-400 tracking-widest">Tipo / Área</th>
                                                <th className="px-8 py-5 text-[9px] font-black text-gray-400 tracking-widest text-center">Entrada</th>
                                                <th className="px-8 py-5 text-[9px] font-black text-gray-400 tracking-widest text-right">Salida</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {filteredVisitors.map((v) => (
                                                <tr key={v.id} className="hover:bg-gray-50/30 transition-colors uppercase">
                                                    <td className="px-8 py-5 font-black text-[10px] text-gray-900">{v.external_person?.full_name}</td>
                                                    <td className="px-8 py-5 font-black text-[10px] text-primary">{v.external_person?.company?.name || '---'}</td>
                                                    <td className="px-8 py-5">
                                                        <div className="flex flex-col">
                                                            <span className="text-[9px] font-black text-gray-400">{v.type === 'contractor' ? 'CONTRATISTA' : v.type === 'supplier' ? 'PROVEEDOR' : 'VISITANTE'}</span>
                                                            <span className="text-[10px] font-black text-gray-900">{v.work_area || '---'}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5 text-center text-[10px] font-black text-gray-400">
                                                        {new Date(v.entry_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </td>
                                                    <td className="px-8 py-5 text-right">
                                                        <button 
                                                            onClick={() => handleExit(v)}
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

            <Modal show={confirmExitModal} onClose={() => setConfirmExitModal(false)} maxWidth="md">
                <div className="p-10">
                    <div className="flex items-center justify-center mb-8">
                        <div className="w-20 h-20 bg-red-50 text-red-600 rounded-[2.5rem] flex items-center justify-center shadow-inner">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </div>
                    </div>
                    
                    <div className="text-center space-y-4 mb-10">
                        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Confirmar Salida</h2>
                        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-2">Se registrará la salida para:</p>
                            <p className="text-sm font-black text-primary uppercase">{selectedVisitor?.external_person?.full_name}</p>
                            <p className="text-[11px] font-bold text-gray-500 mt-1">{selectedVisitor?.external_person?.company?.name}</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button 
                            type="button"
                            onClick={() => setConfirmExitModal(false)}
                            className="flex-1 px-8 py-5 rounded-[1.5rem] bg-white border-2 border-gray-100 text-gray-400 text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 hover:border-gray-200 transition-all"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="button"
                            onClick={confirmExit}
                            disabled={processing}
                            className="flex-1 px-8 py-5 rounded-[1.5rem] bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-gray-200 hover:bg-red-600 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {processing ? (
                                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            ) : (
                                "Confirmar Salida"
                            )}
                        </button>
                    </div>
                </div>
            </Modal>
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
