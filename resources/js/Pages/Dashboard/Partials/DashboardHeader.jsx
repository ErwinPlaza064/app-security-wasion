export default function DashboardHeader({ operatorName, activeCount, onScrollToTable }) {
    return (
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-8 uppercase">
            <div>
                <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-1 bg-primary rounded-full"></div>
                    <span className="text-[10px] font-black text-primary tracking-[0.4em]">COMANDO SEGURIDAD</span>
                </div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tighter mb-1">
                    Panel de <span className="text-primary italic">Control</span>
                </h1>
                <p className="text-gray-400 text-[10px] font-bold tracking-widest">Operador: {operatorName}</p>
            </div>
            <div className="flex gap-4">
                <button 
                    onClick={onScrollToTable}
                    className="bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4 hover:shadow-md hover:border-primary/20 transition-all group active:scale-95"
                >
                    <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase group-hover:text-primary transition-colors">Activos</span>
                    <span className="text-2xl font-black text-primary leading-none">{activeCount}</span>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                </button>
            </div>
        </div>
    );
}
