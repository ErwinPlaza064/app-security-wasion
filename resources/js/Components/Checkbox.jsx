export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded-lg border-gray-300 text-[#0C1869] shadow-sm focus:ring-[#0C1869] ' +
                className
            }
        />
    );
}
