import { useState } from 'react';
import DashboardTabToggle from './DashboardTabToggle';

export default function ActiveVisitorsTable({ visitors, onExit, tabToggle }) {
    const [tableSearch, setTableSearch] = useState('');
    const [companyFilter, setCompanyFilter] = useState('');

    const activeCompanies = [...new Set(visitors
        .map(v => v.external_person?.company?.name)
        .filter(Boolean)
    )].sort();

    const filteredVisitors = visitors.filter(v => {
        const matchesSearch = 
            v.external_person?.full_name?.toLowerCase().includes(tableSearch.toLowerCase()) ||
            v.external_person?.company?.name?.toLowerCase().includes(tableSearch.toLowerCase());
        
        const matchesCompany = !companyFilter || v.external_person?.company?.name === companyFilter;
        
        return matchesSearch && matchesCompany;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
                <h2 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em]">Personal en Planta</h2>
                
                <div className="flex flex-col items-end gap-3">
                    <div className="flex flex-col sm:flex-row gap-2">
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
                    {tabToggle}
                </div>
            </div>
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                {filteredVisitors.length === 0 ? (
                    <div className="py-20 flex flex-col items-center justify-center space-y-4">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        </div>
                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">
                            {tableSearch ? 'No se encontraron resultados' : 'Sin personal activo'}
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
                                                onClick={() => onExit(v)}
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
    );
}
