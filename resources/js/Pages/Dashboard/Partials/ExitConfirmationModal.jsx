import Modal from "@/Components/Modal";
import SignaturePad from "@/Pages/Operations/AccessLogs/Partials/SignaturePad";
import { useState } from "react";

export default function ExitConfirmationModal({
    show,
    onClose,
    item,
    type = "person",
    onConfirm,
    processing,
}) {
    const [signature, setSignature] = useState("");

    const name =
        type === "person"
            ? item?.external_person?.full_name || item?.visiting_person
            : item?.driver_name;
    const company =
        type === "person"
            ? item?.external_person?.company?.name ||
              (["resignation", "clearance"].includes(item?.type)
                  ? "INTERNO"
                  : "---")
            : item?.company?.name;

    const handleConfirm = () => {
        onConfirm(signature);
    };

    return (
        <Modal
            show={show}
            onClose={() => {
                setSignature("");
                onClose();
            }}
            maxWidth="md"
        >
            <div className="p-6 md:p-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 bg-red-50 text-red-600 rounded-[2rem] flex items-center justify-center shadow-inner">
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="2.5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                    </div>
                </div>

                <div className="text-center space-y-3 mb-6">
                    <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter">
                        Confirmar Salida
                    </h2>
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <p className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1">
                            Se registrará la salida para:
                        </p>
                        <p className="text-sm font-black text-primary uppercase leading-tight">
                            {name}
                        </p>
                        <p className="text-[10px] font-bold text-gray-500 mt-0.5">
                            {company}
                        </p>
                    </div>
                </div>

                {type === "person" && (
                    <div className="mb-6">
                        <SignaturePad
                            value={signature}
                            onChange={setSignature}
                            label={['resignation', 'clearance'].includes(item?.type) ? "Firma Digital (Opcional)" : "Firma Digital Requerida"}
                        />
                    </div>
                )}

                <div className="flex gap-3 mt-2">
                    <button
                        type="button"
                        onClick={() => {
                            setSignature("");
                            onClose();
                        }}
                        className="flex-1 px-6 py-4 rounded-2xl bg-white border-2 border-gray-100 text-gray-400 text-[9px] font-black uppercase tracking-widest hover:bg-gray-50 hover:border-gray-200 transition-all"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm}
                        disabled={
                            processing ||
                            (type === "person" &&
                                !["resignation", "clearance"].includes(
                                    item?.type,
                                ) &&
                                !signature)
                        }
                        className="flex-1 px-6 py-4 rounded-2xl bg-gray-900 text-white text-[9px] font-black uppercase tracking-widest shadow-xl shadow-gray-200 hover:bg-red-600 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {processing ? (
                            <svg
                                className="animate-spin h-3.5 w-3.5 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        ) : (
                            "Confirmar"
                        )}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
