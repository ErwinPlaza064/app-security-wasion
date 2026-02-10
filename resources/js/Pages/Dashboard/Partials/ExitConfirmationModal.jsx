import Modal from '@/Components/Modal';

export default function ExitConfirmationModal({ show, onClose, visitor, onConfirm, processing }) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="md">
            <div className="p-10">
                <div className="flex items-center justify-center mb-8">
                    <div className="w-20 h-20 bg-red-50 text-red-600 rounded-[2.5rem] flex items-center justify-center shadow-inner">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </div>
                </div>
                
                <div className="text-center space-y-4 mb-10">
                    <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Confirmar Salida</h2>
                    <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-2">Se registrará la salida para:</p>
                        <p className="text-sm font-black text-primary uppercase">{visitor?.external_person?.full_name}</p>
                        <p className="text-[11px] font-bold text-gray-500 mt-1">{visitor?.external_person?.company?.name}</p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button 
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-8 py-5 rounded-[1.5rem] bg-white border-2 border-gray-100 text-gray-400 text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 hover:border-gray-200 transition-all"
                    >
                        Cancelar
                    </button>
                    <button 
                        type="button"
                        onClick={onConfirm}
                        disabled={processing}
                        className="flex-1 px-8 py-5 rounded-[1.5rem] bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-gray-200 hover:bg-red-600 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {processing ? (
                            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        ) : (
                            "Confirmar Salida"
                        )}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
