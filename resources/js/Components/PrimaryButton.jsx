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
                `inline-flex items-center rounded-xl border border-transparent bg-[#0C1869] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white shadow-lg shadow-[#0C1869]/20 transition duration-150 ease-in-out hover:bg-[#0C1869]/90 hover:shadow-xl hover:shadow-[#0C1869]/30 focus:outline-none focus:ring-2 focus:ring-[#0C1869] focus:ring-offset-2 active:scale-95 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
