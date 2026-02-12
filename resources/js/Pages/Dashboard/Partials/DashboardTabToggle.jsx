export default function DashboardTabToggle({ activeTab, onTabChange, personsCount, vehiclesCount }) {
    return (
        <div className="flex bg-gray-100/50 p-1.5 rounded-[1.25rem] border border-gray-100/50 shadow-inner">
            <button 
                onClick={() => onTabChange('persons')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                    activeTab === 'persons' 
                        ? 'bg-white text-gray-900 shadow-sm shadow-gray-200/50 scale-[1.02]' 
                        : 'text-gray-400 hover:text-gray-600'
                }`}
            >
                <span>Personas</span>
                <span className={`px-1.5 py-0.5 rounded-md text-[8px] ${
                    activeTab === 'persons' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                    {personsCount}
                </span>
            </button>
            <button 
                onClick={() => onTabChange('vehicles')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                    activeTab === 'vehicles' 
                        ? 'bg-white text-gray-900 shadow-sm shadow-gray-200/50 scale-[1.02]' 
                        : 'text-gray-400 hover:text-gray-600'
                }`}
            >
                <span>Vehículos</span>
                <span className={`px-1.5 py-0.5 rounded-md text-[8px] ${
                    activeTab === 'vehicles' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                    {vehiclesCount}
                </span>
            </button>
        </div>
    );
}
