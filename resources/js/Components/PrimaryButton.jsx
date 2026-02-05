export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `relative inline-flex items-center justify-center rounded-xl border border-transparent bg-[#0C1869] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white shadow-lg shadow-[#0C1869]/20 transition duration-150 ease-in-out hover:bg-[#0C1869]/90 hover:shadow-xl hover:shadow-[#0C1869]/30 focus:outline-none focus:ring-2 focus:ring-[#0C1869] focus:ring-offset-2 active:scale-95 ${
                    disabled && 'opacity-80 cursor-not-allowed shadow-none'
                } ` + className
            }
            disabled={disabled}
        >
            <span className={`inline-flex items-center gap-2 transition-all ${disabled ? 'opacity-0' : 'opacity-100'}`}>
                {children}
            </span>
            
            {disabled && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            )}
        </button>
    );
}
