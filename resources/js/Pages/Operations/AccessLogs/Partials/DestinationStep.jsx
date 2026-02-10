import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

export default function DestinationStep({ 
    data, 
    setData, 
    errors, 
    type, 
    titles, 
    companies, 
    areas, 
    handlePeopleCountChange, 
    nextStep 
}) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50 space-y-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-gray-900 tracking-tight leading-none uppercase">
                                {titles[type]}
                            </h2>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                                Configuración del grupo
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <InputLabel value="Empresa" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                            <button
                                type="button"
                                onClick={() => setData("isNewCompany", !data.isNewCompany)}
                                className={`text-[9px] font-black px-3 py-1 rounded-full uppercase transition-all duration-300 ${
                                    data.isNewCompany ? "bg-gray-100 text-gray-400" : "bg-primary/20 text-primary animate-pulse hover:animate-none hover:bg-primary hover:text-white"
                                }`}
                            >
                                {data.isNewCompany ? "Volver a Lista" : "+ Registrar Nueva"}
                            </button>
                        </div>
                        {!data.isNewCompany ? (
                            <select
                                className="block w-full bg-gray-50 border-none rounded-2xl py-5 px-6 text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all"
                                value={data.company_id}
                                onChange={(e) => {
                                    if (e.target.value === "new") {
                                        setData("isNewCompany", true);
                                    } else {
                                        setData("company_id", e.target.value);
                                    }
                                }}
                            >
                                <option value="">Seleccione empresa...</option>
                                {companies.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                                <option value="new" className="text-primary font-black">
                                    ¿No aparece en la lista? ➕ REGISTRAR NUEVA
                                </option>
                            </select>
                        ) : (
                            <TextInput
                                className="block w-full bg-gray-50 border-none rounded-2xl py-5 px-6 text-sm font-bold focus:ring-4 focus:ring-primary/10"
                                value={data.new_company}
                                onChange={(e) => setData("new_company", e.target.value)}
                                placeholder="Nombre comercial..."
                            />
                        )}
                        <InputError message={errors.company_id || errors.new_company} />
                    </div>

                    <div className="space-y-3">
                        <InputLabel value="Persona que recibe" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                        <TextInput
                            className="block w-full bg-gray-50 border-none rounded-2xl py-5 px-6 text-sm font-bold focus:ring-4 focus:ring-primary/10"
                            value={data.visiting_person}
                            onChange={(e) => setData("visiting_person", e.target.value.replace(/\b\w/g, l => l.toUpperCase()))}
                            placeholder="Nombre del anfitrión..."
                        />
                        <InputError message={errors.visiting_person} />
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-3">
                            <InputLabel value="Motivo de la Visita" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                            <TextInput
                                className="block w-full bg-gray-50 border-none rounded-2xl py-5 px-6 text-sm font-bold focus:ring-4 focus:ring-primary/10"
                                value={data.visit_reason}
                                onChange={(e) => setData("visit_reason", e.target.value)}
                                placeholder="Escriba el motivo..."
                            />
                            <InputError message={errors.visit_reason} />
                        </div>

                        <div className="space-y-3">
                            <InputLabel value="Área de Destino" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                            <select
                                className="block w-full bg-gray-50 border-none rounded-2xl py-5 px-6 text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all font-bold"
                                value={data.work_area}
                                onChange={(e) => setData("work_area", e.target.value)}
                            >
                                <option value="">Seleccione área...</option>
                                {areas.map((area) => (
                                    <option key={area.id} value={area.name}>
                                        {area.name} ({area.plant})
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.work_area} />
                        </div>
                    </div>

                    <div className="pt-4 space-y-4">
                        <InputLabel value="¿Cuántas personas ingresan?" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                        <div className="flex flex-wrap gap-2">
                            {[1, 2, 3, 5, 10, 20].map((num) => (
                                <button
                                    key={num}
                                    type="button"
                                    onClick={() => handlePeopleCountChange(num)}
                                    className={`px-5 py-3 rounded-xl text-xs font-black transition-all ${data.people_count === num ? "bg-primary text-white scale-105 shadow-lg" : "bg-gray-50 text-gray-400 hover:bg-gray-100"}`}
                                >
                                    {num}
                                </button>
                            ))}
                            <TextInput
                                type="number"
                                value={data.people_count}
                                onChange={(e) => handlePeopleCountChange(e.target.value)}
                                className="w-20 px-3 py-3 bg-gray-50 border-none rounded-xl text-xs font-black text-center"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <button
                type="button"
                onClick={nextStep}
                className="w-full flex items-center justify-center space-x-3 py-6 rounded-[2rem] bg-gray-900 shadow-2xl shadow-gray-200 text-white group hover:bg-primary transition-all active:scale-95"
            >
                <span className="text-xs font-black uppercase tracking-[0.3em]">
                    Comenzar Llenado de Integrantes
                </span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    );
}
