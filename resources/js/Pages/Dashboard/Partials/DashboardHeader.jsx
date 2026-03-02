export default function DashboardHeader({
    operatorName,
    activePersonsPercent,
    activeVehiclesPercent,
    activePersons,
    activeVehicles,
    activeResignations,
    activeTab,
    onTabChange,
}) {
    return (
        <div className="mb-10 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12 lg:gap-8 border-b border-gray-100 pb-12 uppercase">
            <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-3 mb-3">
                    <div className="w-8 h-1 bg-primary rounded-full"></div>
                    <span className="text-[10px] font-black text-primary tracking-[0.4em]">
                        COMANDO SEGURIDAD
                    </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter mb-2">
                    Panel de{" "}
                    <span className="text-primary italic">Control</span>
                </h1>
                <p className="text-gray-400 text-[10px] font-bold tracking-widest mb-4 lg:mb-0">Operador: {operatorName}</p>
            </div>

            <div className="flex flex-col items-center space-y-4">
                <div className="flex flex-col items-center mb-2">
                    <span className="text-sm font-black text-gray-400 tracking-[0.4em] lg:tracking-[0.8em] uppercase text-center">
                        Visitantes Dentro
                    </span>
                    <div className="w-20 h-1 bg-primary/20 mt-3 rounded-full"></div>
                </div>

                <div
                    className="flex flex-wrap justify-center gap-6"
                    role="tablist"
                >
                    <button
                        onClick={() => onTabChange("persons")}
                        role="tab"
                        aria-selected={activeTab === "persons"}
                        aria-label={`Ver tabla de personas (${activePersons} activas)`}
                        className={`px-8 py-4 rounded-2xl border transition-all flex items-center space-x-4 active:scale-95 shadow-sm hover:shadow-md ${
                            activeTab === "persons"
                                ? "bg-white border-primary/20 ring-1 ring-primary/5"
                                : "bg-gray-50/50 border-transparent grayscale opacity-70"
                        }`}
                    >
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                            <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase mb-1">
                                Personas
                            </span>
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl font-black text-primary leading-none">
                                    {activePersons}
                                </span>
                            </div>
                        </div>
                    </button>

                    <button
                        onClick={() => onTabChange("vehicles")}
                        role="tab"
                        aria-selected={activeTab === "vehicles"}
                        aria-label={`Ver tabla de vehículos (${activeVehicles} activos)`}
                        className={`px-8 py-4 rounded-2xl border transition-all flex items-center space-x-4 active:scale-95 shadow-sm hover:shadow-md ${
                            activeTab === "vehicles"
                                ? "bg-white border-primary/20 ring-1 ring-primary/5"
                                : "bg-gray-50/50 border-transparent grayscale opacity-70"
                        }`}
                    >
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                            <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase mb-1">
                                Vehículos
                            </span>
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl font-black text-primary leading-none">
                                    {activeVehicles}
                                </span>
                            </div>
                        </div>
                    </button>

                    <button
                        onClick={() => onTabChange("resignations")}
                        role="tab"
                        aria-selected={activeTab === "resignations"}
                        aria-label={`Ver tabla de renuncias (${activeResignations} activas)`}
                        className={`px-8 py-4 rounded-2xl border transition-all flex items-center space-x-4 active:scale-95 shadow-sm hover:shadow-md ${
                            activeTab === "resignations"
                                ? "bg-white border-primary/20 ring-1 ring-primary/5"
                                : "bg-gray-50/50 border-transparent grayscale opacity-70"
                        }`}
                    >
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                            <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase mb-1">
                                Renuncias
                            </span>
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl font-black text-primary leading-none">
                                    {activeResignations}
                                </span>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
