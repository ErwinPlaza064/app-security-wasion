import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SignaturePad from "./SignaturePad";

export default function VisitorStep({ 
    visitor, 
    index, 
    currentStep, 
    peopleCount, 
    handleVisitorChange, 
    errors, 
    prevStep, 
    nextStep, 
    processing 
}) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-2xl shadow-gray-200/50 space-y-8 relative overflow-hidden">
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-primary text-white rounded-[1.5rem] flex items-center justify-center text-xl font-black shadow-xl shadow-primary/20 rotate-3">
                        {currentStep}
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter">
                            Datos personales
                        </h2>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                            Integrante de grupo
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-3">
                        <InputLabel value="Nombre Completo" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                        <TextInput
                            className="block w-full bg-gray-50 border-none rounded-2xl py-6 px-8 text-base font-bold focus:ring-4 focus:ring-primary/10 transition-all font-bold"
                            value={visitor.full_name}
                            onChange={(e) => handleVisitorChange(index, "full_name", e.target.value)}
                            placeholder="Nombre como aparece en identificación oficial..."
                        />
                        <InputError message={errors[`visitors.${index}.full_name`]} />
                    </div>
                    <div className="space-y-3">
                        <InputLabel value="Identificación" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                        <select
                            className="block w-full bg-gray-50 border-none rounded-2xl py-6 px-8 text-base font-bold focus:ring-4 focus:ring-primary/10 transition-all appearance-none cursor-pointer font-bold"
                            value={visitor.id_number}
                            onChange={(e) => handleVisitorChange(index, "id_number", e.target.value)}
                        >
                            <option value="">Seleccione tipo de ID...</option>
                            <option value="INE">INE</option>
                            <option value="LICENCIA DE CONDUCIR">LICENCIA DE CONDUCIR</option>
                            <option value="CARTILLA MILITAR">CARTILLA MILITAR</option>
                            <option value="PASAPORTE">PASAPORTE</option>
                            <option value="CÉDULA PROFESIONAL">CÉDULA PROFESIONAL</option>
                            <option value="GAFETE">GAFETE</option>
                        </select>
                        <InputError message={errors[`visitors.${index}.id_number`]} />
                    </div>

                    <SignaturePad
                        index={index}
                        value={visitor.signature}
                        onChange={(val) => handleVisitorChange(index, "signature", val)}
                        error={errors[`visitors.${index}.signature`]}
                    />
                </div>
            </div>

            <div className="flex gap-4">
                <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 py-6 rounded-[2rem] bg-white border border-gray-100 text-gray-400 text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-all"
                >
                    Anterior
                </button>

                {currentStep < peopleCount ? (
                    <button
                        type="button"
                        onClick={nextStep}
                        className="flex-[2] py-6 rounded-[2rem] bg-gray-900 text-white text-xs font-black uppercase tracking-widest shadow-2xl shadow-gray-200 active:scale-95 transition-all"
                    >
                        Siguiente Integrante
                    </button>
                ) : (
                    <PrimaryButton
                        className="flex-[2] justify-center py-6 rounded-[2rem] bg-primary text-white text-xs font-black uppercase tracking-widest shadow-2xl shadow-primary/20 active:scale-95 transition-all"
                        disabled={processing}
                    >
                        Finalizar Registro
                    </PrimaryButton>
                )}
            </div>
        </div>
    );
}
