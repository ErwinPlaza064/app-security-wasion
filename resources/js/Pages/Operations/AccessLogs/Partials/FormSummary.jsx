export default function FormSummary({ data }) {
    return (
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-center space-x-6 opacity-60">
            <div className="text-center">
                <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest mb-1">
                    Empresa
                </p>
                <p className="text-[10px] font-black text-primary truncate max-w-[100px]">
                    {data.company_id || data.new_company || "---"}
                </p>
            </div>
            <div className="w-px h-4 bg-gray-100"></div>
            <div className="text-center">
                <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest mb-1">
                    Destino
                </p>
                <p className="text-[10px] font-black text-primary truncate max-w-[100px]">
                    {data.visiting_person || "---"}
                </p>
            </div>
            <div className="w-px h-4 bg-gray-100"></div>
            <div className="text-center">
                <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest mb-1">
                    Motivo
                </p>
                <p className="text-[10px] font-black text-primary truncate max-w-[100px]">
                    {data.visit_reason || "---"}
                </p>
            </div>
        </div>
    );
}
