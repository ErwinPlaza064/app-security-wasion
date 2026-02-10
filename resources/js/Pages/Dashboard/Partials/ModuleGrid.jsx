import { Link } from '@inertiajs/react';

export default function ModuleGrid({ modules, searchTerm }) {
    const filteredModules = modules.filter(m => 
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 mb-16">
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
    );
}
