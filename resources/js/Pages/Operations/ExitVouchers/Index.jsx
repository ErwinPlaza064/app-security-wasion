import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({ vouchers }) {

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">
                        Mis Vales de Salida
                    </h2>
                    <Link
                        href={route("exit-vouchers.create")}
                        className="px-6 py-3 bg-[#0A192F] hover:bg-[#0A192F]/90 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-[#0A192F]/20 hover:scale-105 active:scale-95"
                    >
                        + Nuevo Vale
                    </Link>
                </div>
            }
        >
            <Head title="Mis Vales de Salida" />

            <div className="py-10 bg-[#fdfcf9] min-h-[calc(100vh-64px)]">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden relative">
                        {/* Decoración */}
                        <div className="absolute top-0 left-0 w-64 h-64 bg-[#0A192F]/5 rounded-full -ml-32 -mt-32 blur-3xl opacity-50" />
                        
                        <div className="p-8 relative z-10">
                            {vouchers.length === 0 ? (
                                <div className="text-center py-32 space-y-6">
                                    <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner">
                                        <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">No hay registros</h3>
                                        <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Inicia creando tu primer vale de salida de materiales.</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-gray-50">
                                                <th className="py-6 px-6 text-[10px] uppercase font-black tracking-[0.2em] text-gray-400">Folio</th>
                                                <th className="py-6 px-6 text-[10px] uppercase font-black tracking-[0.2em] text-gray-400">Beneficiario</th>
                                                <th className="py-6 px-6 text-[10px] uppercase font-black tracking-[0.2em] text-gray-400">Salida</th>
                                                <th className="py-6 px-6 text-[10px] uppercase font-black tracking-[0.2em] text-gray-400">Regreso</th>
                                                <th className="py-6 px-6 text-[10px] uppercase font-black tracking-[0.2em] text-gray-400">Estado</th>
                                                <th className="py-6 px-6 text-[10px] uppercase font-black tracking-[0.2em] text-gray-400 text-right">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50/50">
                                            {vouchers.map((voucher) => (
                                                <tr key={voucher.id} className="hover:bg-gray-50/50 transition-colors group">
                                                    <td className="py-6 px-6">
                                                        <span className="font-black text-[#0A192F] text-sm tracking-tighter">
                                                            {voucher.folio}
                                                        </span>
                                                    </td>
                                                    <td className="py-6 px-6">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center font-black text-[#0A192F] shadow-sm border border-gray-100 uppercase text-xs">
                                                                {voucher.recipient_name.charAt(0)}
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-gray-900 font-bold text-sm leading-tight">
                                                                    {voucher.recipient_name}
                                                                </span>
                                                                <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest">
                                                                    {voucher.concept === 'loan' ? 'Préstamo' : 
                                                                     voucher.concept === 'sample' ? 'Muestra' :
                                                                     voucher.concept === 'repair' ? 'Reparación' : 'Otros'}
                                                                </span>
                                                                <span className="text-[8px] text-primary/60 font-black uppercase tracking-widest mt-0.5">
                                                                    Vía: {voucher.user?.name || 'Sistema'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-6 px-6 text-sm">
                                                        <span className="text-gray-500 font-bold text-xs uppercase block">
                                                            {new Date(voucher.exit_date).toLocaleDateString('es-MX', {
                                                                day: '2-digit',
                                                                month: 'short',
                                                                year: 'numeric'
                                                            })}
                                                        </span>
                                                        <span className="text-[9px] text-gray-300 font-black uppercase tracking-widest">
                                                            Salida
                                                        </span>
                                                    </td>
                                                    <td className="py-6 px-6 text-sm">
                                                        <span className="text-gray-500 font-bold text-xs uppercase block">
                                                            {voucher.return_date ? new Date(voucher.return_date).toLocaleDateString('es-MX', {
                                                                day: '2-digit',
                                                                month: 'short',
                                                                year: 'numeric'
                                                            }) : 'No Aplica'}
                                                        </span>
                                                        <span className="text-[9px] text-gray-300 font-black uppercase tracking-widest">
                                                            Retorno
                                                        </span>
                                                    </td>
                                                    <td className="py-6 px-6">
                                                        <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${
                                                            voucher.status === 'approved' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
                                                            'bg-red-50 border-red-100 text-red-600'
                                                        }`}>
                                                            {voucher.status === 'approved' ? 'Aprobado' : 'Rechazado'}
                                                        </span>
                                                    </td>
                                                    <td className="py-6 px-6 text-right">
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
