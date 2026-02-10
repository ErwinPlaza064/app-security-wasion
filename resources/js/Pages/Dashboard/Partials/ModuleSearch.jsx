export default function ModuleSearch({ value, onChange }) {
    return (
        <div className="mb-12 relative">
            <div className="absolute inset-y-0 left-0 pl-7 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-300 group-focus-within:text-primary transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <input 
                type="text" 
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="BUSCAR REGISTRO A LLENAR..."
                className="block w-full bg-white border-none py-7 pl-16 pr-6 rounded-[2.5rem] text-[11px] font-black tracking-[0.2em] text-gray-900 shadow-2xl shadow-gray-200/60 focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-gray-300 group uppercase"
            />
        </div>
    );
}
