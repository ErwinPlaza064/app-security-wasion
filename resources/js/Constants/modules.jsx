export const modules = [
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
        name: "Vales de Salida", 
        icon: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></>, 
        route: "exit-vouchers.index", 
        color: 'text-blue-700',
        bg: 'bg-blue-100'
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
