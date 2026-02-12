import { useState } from 'react';
import DashboardTabToggle from './DashboardTabToggle';

export default function ActiveVehiclesTable({ vehicles, onExit, tabToggle }) {
    const [tableSearch, setTableSearch] = useState('');
    const [operationFilter, setOperationFilter] = useState('');

    const filteredVehicles = vehicles.filter(v => {
        const matchesSearch = 
            v.plates?.toLowerCase().includes(tableSearch.toLowerCase()) ||
            v.driver_name?.toLowerCase().includes(tableSearch.toLowerCase()) ||
            v.company?.name?.toLowerCase().includes(tableSearch.toLowerCase());
        
        const matchesOperation = !operationFilter || v.operation === operationFilter;
        
        return matchesSearch && matchesOperation;
    });

    const getOperationBadge = (operation) => {
        const styles = {
            load: 'bg-emerald-50 text-emerald-600',
            unload: 'bg-blue-50 text-blue-600',
            transport: 'bg-purple-50 text-purple-600',
            visit: 'bg-gray-50 text-gray-600',
        };
        const labels = {
            load: 'CARGA',
            unload: 'DESCARGA',
            transport: 'TRANSPORTE',
            visit: 'VISITA',
        };
        return (
            <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest ${styles[operation] || styles.transport}`}>
                {labels[operation] || operation}
            </span>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
                <h2 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em]">Carga y Vehículos en Planta</h2>
                
                <div className="flex flex-col items-end gap-3">
                    <div className="flex flex-col sm:flex-row gap-2">
                        <select 
                            value={operationFilter}
                            onChange={(e) => setOperationFilter(e.target.value)}
                            className="bg-white border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest px-6 py-3 focus:ring-primary/10 transition-all cursor-pointer shadow-sm"
                        >
                            <option value="">Todas las Operaciones</option>
                            <option value="load">Solo Carga</option>
                            <option value="unload">Solo Descarga</option>
                            <option value="transport">Solo Transporte</option>
                            <option value="visit">Solo Visita</option>
                        </select>

                        <div className="relative">
                            <input 
                                type="text"
                                value={tableSearch}
                                onChange={(e) => setTableSearch(e.target.value)}
                                placeholder="BUSCAR VEHÍCULO..."
                                className="bg-white border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest pl-10 pr-6 py-3 focus:ring-primary/10 transition-all shadow-sm w-full sm:w-[250px]"
                            />
                            <svg className="w-3.5 h-3.5 text-gray-300 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                        </div>
                    </div>
                    {tabToggle}
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                {filteredVehicles.length === 0 ? (
                    <div className="py-20 flex flex-col items-center justify-center space-y-4">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1" /></svg>
                        </div>
                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">
                            {tableSearch ? 'No se encontraron resultados' : 'Sin vehículos activos'}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 uppercase">
                                    <th className="px-8 py-5 text-[9px] font-black text-gray-400 tracking-widest">Placas</th>
                                    <th className="px-8 py-5 text-[9px] font-black text-gray-400 tracking-widest">Marca / Modelo</th>
                                    <th className="px-8 py-5 text-[9px] font-black text-gray-400 tracking-widest">Chofer</th>
                                    <th className="px-8 py-5 text-[9px] font-black text-gray-400 tracking-widest">Empresa / Operación</th>
                                    <th className="px-8 py-5 text-[9px] font-black text-gray-400 tracking-widest text-center">Entrada</th>
                                    <th className="px-8 py-5 text-[9px] font-black text-gray-400 tracking-widest text-right">Salida</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredVehicles.map((v) => (
                                    <tr key={v.id} className="hover:bg-gray-50/30 transition-colors uppercase">
                                        <td className="px-8 py-5">
                                            <span className="font-mono font-black text-[12px] text-gray-900">{v.plates}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-[10px] font-black text-gray-900">{v.brand || '---'}</span>
                                            {v.model && <span className="text-[9px] font-bold text-gray-400 ml-2">({v.model})</span>}
                                        </td>
                                        <td className="px-8 py-5 font-black text-[10px] text-gray-900">{v.driver_name}</td>
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col space-y-1">
                                                <span className="font-black text-[10px] text-primary">{v.company?.name || '---'}</span>
                                                <div>{getOperationBadge(v.operation)}</div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-center text-[10px] font-black text-gray-400">
                                            {new Date(v.entry_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <button 
                                                onClick={() => onExit(v)}
                                                className="px-4 py-2 bg-gray-900 text-white rounded-xl text-[8px] font-black tracking-widest hover:bg-blue-600 transition-all active:scale-95"
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
