import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props;
    
    // Categorías de formularios para el usuario normal
    const categories = [
        {
            title: "Control de Accesos",
            description: "Registro de personas y visitas",
            color: "bg-blue-600",
            items: [
                { name: "Visitantes", icon: <><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M17 11l2 2 4-4"/></>, route: "access-logs.create", params: { type: 'visitor' } },
                { name: "Contratistas", icon: <><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.77 3.77z"/></>, route: "access-logs.create", params: { type: 'contractor' } },
                { name: "Proveedores", icon: <><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>, route: "access-logs.create", params: { type: 'supplier' } },
                { name: "Personal Externo", icon: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>, route: "access-logs.create", params: { type: 'visitor' } },
            ]
        },
        {
            title: "Bitácora Vehicular",
            description: "Control de transporte y logística",
            color: "bg-emerald-600",
            items: [
                { name: "Entrada/Salida", icon: <><rect x="1" y="3" width="15" height="13"/><polyline points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>, route: "vehicle-logs.create", params: { operation: 'transport' } },
                { name: "Carga y Descarga", icon: <><path d="M7 11V7a5 5 0 0 1 10 0v4"/><rect x="3" y="11" width="18" height="11" rx="2"/><circle cx="12" cy="16" r="1"/></>, route: "carga-descarga.create", params: { operation: 'load' } },
                { name: "Padrón Vehicular", icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>, route: "padron-vehicular.create" },
            ]
        },
        {
            title: "Reporte de Incidencias",
            description: "Seguridad y mantenimiento",
            color: "bg-rose-600",
            items: [
                { name: "Incidencia General", icon: <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>, route: "incidents.create", params: { category: 'general' } },
                { name: "Daño Instalación", icon: <><path d="M3 3h18v18H3z"/><path d="M3 9h18"/><path d="M9 21V9"/><path d="M17 13l-4 4-2-2"/></>, route: "dano-instalacion.create", params: { category: 'damage' } },
                { name: "Conductual", icon: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>, route: "incidencia-conductual.create", params: { category: 'conduct' } },
            ]
        },
        {
            title: "Controles Especiales",
            description: "Gestión de activos y bajas",
            color: "bg-amber-600",
            items: [
                { name: "Salida Laptop", icon: <><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="2" y1="20" x2="22" y2="20"/></>, route: "laptops.create", params: { type: 'laptop_only' } },
                { name: "Sin Gafete", icon: <><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="18" y1="8" x2="23" y2="13"/><line x1="23" y1="8" x2="18" y2="13"/></>, route: "colaborador-gafete.create", params: { type: 'no_badge' } },
                { name: "Renuncia/Finiquito", icon: <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>, route: "renuncia-finiquito.create", params: { type: 'resignation' } },
            ]
        }
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Escritorio Operativo" />

            <div className="py-10 bg-[#fdfcf9] min-h-[calc(100vh-64px)] overflow-x-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header del Dashboard */}
                    <div className="mb-10 animate-fade-in">
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="w-8 h-1 bg-primary rounded-full"></div>
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">COMANDO SEGURIDAD</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter mb-2">
                            Panel de <span className="text-primary italic">Control</span>
                        </h1>
                        <p className="text-gray-400 text-sm font-medium">
                            Bienvenido, <span className="text-gray-900 font-bold">{auth.user.name}</span>. Selecciona un módulo para iniciar.
                        </p>
                    </div>

                    {/* Grid de módulos en formato Bento */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {categories.map((category, idx) => (
                            <div key={idx} className="space-y-4">
                                <div className="flex items-center space-x-3 px-1">
                                    <div className={`w-2 h-2 rounded-full ${category.color} animate-pulse`}></div>
                                    <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">{category.title}</h2>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {category.items.map((item, itemIdx) => (
                                        <Link
                                            key={itemIdx}
                                            href={route(item.route, item.params || {})}
                                            className="group relative overflow-hidden bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(12,24,105,0.06)] hover:border-primary/20 hover:-translate-y-1 transition-all duration-300"
                                        >
                                            {/* Decoración de fondo */}
                                            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-gray-50 rounded-full group-hover:scale-[2] group-hover:bg-primary/5 transition-all duration-500"></div>
                                            
                                            <div className="relative z-10">
                                                <div className="w-11 h-11 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-primary/20 group-hover:rotate-6">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                        {item.icon}
                                                    </svg>
                                                </div>
                                                <h3 className="font-black text-gray-900 text-xs uppercase tracking-tight mb-1 group-hover:text-primary">
                                                    {item.name}
                                                </h3>
                                                <p className="text-[10px] text-gray-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                                    Iniciar nuevo registro →
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
