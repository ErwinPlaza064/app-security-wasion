import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState, useRef, useEffect } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

export default function Create({ type, companies, areas }) {
    const { data, setData, post, processing, errors, setError, clearErrors } =
        useForm({
            type: type || "visitor",
            company_id: "",
            new_company: "",
            visiting_person: "",
            visit_reason: "",
            work_area: "",
            vehicle_brand: "",
            vehicle_plate: "",
            isNewCompany: false,
            people_count: 1,
            visitors: [
                {
                    full_name: "",
                    id_number: "",
                    item_brand: "",
                    item_color: "",
                    item_serial: "",
                    signature: "",
                },
            ],
            notes: "",
        });

    const [currentStep, setCurrentStep] = useState(0);
    const canvasRefs = useRef([]);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
    }, [currentStep]);

    const handlePeopleCountChange = (count) => {
        const newCount = Math.max(1, parseInt(count) || 1);
        const newVisitors = [...data.visitors];

        if (newCount > newVisitors.length) {
            for (let i = newVisitors.length; i < newCount; i++) {
                newVisitors.push({
                    full_name: "",
                    id_number: "",
                    item_brand: "",
                    item_color: "",
                    item_serial: "",
                    signature: "",
                });
            }
        } else {
            newVisitors.splice(newCount);
            if (currentStep > newCount) {
                setCurrentStep(newCount);
            }
        }

        setData((prev) => ({
            ...prev,
            people_count: newCount,
            visitors: newVisitors,
        }));
    };

    const handleVisitorChange = (index, field, value) => {
        const newVisitors = [...data.visitors];
        const processedValue = field === 'full_name' 
            ? value.replace(/\b\w/g, l => l.toUpperCase()) 
            : value;

        newVisitors[index][field] = processedValue;
        setData("visitors", newVisitors);
        if (errors[`visitors.${index}.${field}`]) {
            clearErrors(`visitors.${index}.${field}`);
        }
    };

    const nextStep = () => {
        clearErrors();
        let hasErrors = false;

        if (currentStep === 0) {
            if (!data.isNewCompany && !data.company_id) {
                setError("company_id", "Seleccione una empresa existente");
                hasErrors = true;
            }
            if (data.isNewCompany && !data.new_company) {
                setError("new_company", "Escriba el nombre de la empresa");
                hasErrors = true;
            }
            if (!data.visiting_person) {
                setError("visiting_person", "Indique quién recibe la visita");
                hasErrors = true;
            }
            if (!data.visit_reason) {
                setError("visit_reason", "Indique el motivo de la visita");
                hasErrors = true;
            }
            if (!data.work_area) {
                setError("work_area", "Seleccione el área de destino");
                hasErrors = true;
            }
        } else {
            const index = currentStep - 1;
            const visitor = data.visitors[index];
            if (!visitor.full_name) {
                setError(`visitors.${index}.full_name`, "El nombre es obligatorio");
                hasErrors = true;
            }
            if (!visitor.id_number) {
                setError(`visitors.${index}.id_number`, "La identificación es obligatoria");
                hasErrors = true;
            }
            if (!visitor.signature) {
                setError(`visitors.${index}.signature`, "La firma es obligatoria");
                hasErrors = true;
            }
        }

        if (hasErrors) return;

        if (currentStep <= data.people_count) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        clearErrors();
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const titles = {
        visitor: "Visitas",
        supplier: "Proveedores",
        contractor: "Contratación/Servicios",
    };

    const submit = (e) => {
        e.preventDefault();
        clearErrors();

        const index = currentStep - 1;
        const visitor = data.visitors[index];
        let hasErrors = false;

        if (!visitor.full_name) {
            setError(`visitors.${index}.full_name`, "El nombre es obligatorio");
            hasErrors = true;
        }
        if (!visitor.id_number) {
            setError(`visitors.${index}.id_number`, "La identificación es obligatoria");
            hasErrors = true;
        }
        if (!visitor.signature) {
            setError(`visitors.${index}.signature`, "La firma es obligatoria");
            hasErrors = true;
        }

        if (hasErrors) return;

        post(route("access-logs.store"));
    };

    const startDrawing = (e, index) => {
        const canvas = canvasRefs.current[index];
        const rect = canvas.getBoundingClientRect();
        const ctx = canvas.getContext("2d");
        
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        ctx.lineWidth = 3;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.strokeStyle = "#0c1869";
        ctx.beginPath();
        
        const clientX = e.clientX || e.touches?.[0]?.clientX;
        const clientY = e.clientY || e.touches?.[0]?.clientY;
        
        ctx.moveTo(
            (clientX - rect.left) * scaleX,
            (clientY - rect.top) * scaleY
        );
        setIsDrawing(true);
    };

    const draw = (e, index) => {
        if (!isDrawing) return;
        const canvas = canvasRefs.current[index];
        const rect = canvas.getBoundingClientRect();
        const ctx = canvas.getContext("2d");
        
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const clientX = e.clientX || e.touches?.[0]?.clientX;
        const clientY = e.clientY || e.touches?.[0]?.clientY;
        
        ctx.lineTo(
            (clientX - rect.left) * scaleX,
            (clientY - rect.top) * scaleY
        );
        ctx.stroke();
    };

    const stopDrawing = (index) => {
        if (!isDrawing) return;
        setIsDrawing(false);
        const canvas = canvasRefs.current[index];
        if (!canvas) return;
        const signatureData = canvas.toDataURL();
        handleVisitorChange(index, "signature", signatureData);
    };

    const clearSignature = (index) => {
        const canvas = canvasRefs.current[index];
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleVisitorChange(index, "signature", "");
    };

    return (
        <AuthenticatedLayout>
            <Head title={titles[type] || "Acceso"} />

            <div className="py-8 bg-[#fdfcf9] min-h-[calc(100vh-64px)] overflow-x-hidden">
                <div className="max-w-2xl mx-auto px-4 sm:px-6">
                    <div className="mb-10 flex items-center justify-between px-2">
                        <div className="flex items-center space-x-1">
                            <span
                                className={`w-8 h-1.5 rounded-full transition-all duration-500 ${currentStep === 0 ? "bg-primary w-12" : "bg-gray-200"}`}
                            ></span>
                            {[...Array(data.people_count)].map((_, i) => (
                                <span
                                    key={i}
                                    className={`h-1.5 rounded-full transition-all duration-500 ${currentStep === i + 1 ? "bg-primary w-12" : currentStep > i + 1 ? "bg-emerald-400 w-4" : "bg-gray-200 w-4"}`}
                                ></span>
                            ))}
                        </div>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                            {currentStep === 0
                                ? "DATOS DESTINO"
                                : `INTEGRANTE ${currentStep} / ${data.people_count}`}
                        </span>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        {currentStep === 0 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50 space-y-8">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                                                <svg
                                                    className="w-6 h-6"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                                        strokeWidth="2.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
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
                                                <InputLabel
                                                    value="Empresa"
                                                    className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setData(
                                                            "isNewCompany",
                                                            !data.isNewCompany,
                                                        )
                                                    }
                                                    className="text-[9px] font-black text-primary uppercase underline"
                                                >
                                                    {data.isNewCompany
                                                        ? "Lista"
                                                        : "+ Nueva"}
                                                </button>
                                            </div>
                                            {!data.isNewCompany ? (
                                                <select
                                                    className="block w-full bg-gray-50 border-none rounded-2xl py-5 px-6 text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all"
                                                    value={data.company_id}
                                                    onChange={(e) =>
                                                        setData(
                                                            "company_id",
                                                            e.target.value,
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        Seleccione empresa...
                                                    </option>
                                                    {companies.map((c) => (
                                                        <option
                                                            key={c.id}
                                                            value={c.id}
                                                        >
                                                            {c.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <TextInput
                                                    className="block w-full bg-gray-50 border-none rounded-2xl py-5 px-6 text-sm font-bold focus:ring-4 focus:ring-primary/10"
                                                    value={data.new_company}
                                                    onChange={(e) =>
                                                        setData(
                                                            "new_company",
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Nombre comercial..."
                                                />
                                            )}
                                            <InputError message={errors.company_id || errors.new_company} />
                                        </div>

                                        <div className="space-y-3">
                                            <InputLabel
                                                value="Persona que recibe"
                                                className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1"
                                            />
                                            <TextInput
                                                className="block w-full bg-gray-50 border-none rounded-2xl py-5 px-6 text-sm font-bold focus:ring-4 focus:ring-primary/10"
                                                value={data.visiting_person}
                                                onChange={(e) =>
                                                    setData(
                                                        "visiting_person",
                                                        e.target.value.replace(/\b\w/g, l => l.toUpperCase()),
                                                    )
                                                }
                                                placeholder="Nombre del anfitrión..."
                                            />
                                            <InputError message={errors.visiting_person} />
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-3">
                                                <InputLabel
                                                    value="Motivo de la Visita"
                                                    className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1"
                                                />
                                                <TextInput
                                                    className="block w-full bg-gray-50 border-none rounded-2xl py-5 px-6 text-sm font-bold focus:ring-4 focus:ring-primary/10"
                                                    value={data.visit_reason}
                                                    onChange={(e) =>
                                                        setData(
                                                            "visit_reason",
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Escriba el motivo..."
                                                />
                                                <InputError message={errors.visit_reason} />
                                            </div>

                                            <div className="space-y-3">
                                                <InputLabel
                                                    value="Área de Destino"
                                                    className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1"
                                                />
                                                <select
                                                    className="block w-full bg-gray-50 border-none rounded-2xl py-5 px-6 text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all font-bold"
                                                    value={data.work_area}
                                                    onChange={(e) =>
                                                        setData(
                                                            "work_area",
                                                            e.target.value,
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        Seleccione área...
                                                    </option>
                                                    {areas.map((area) => (
                                                        <option
                                                            key={area.id}
                                                            value={area.name}
                                                        >
                                                            {area.name} ({area.plant})
                                                        </option>
                                                    ))}
                                                </select>
                                                <InputError message={errors.work_area} />
                                            </div>
                                        </div>

                                        <div className="pt-4 space-y-4">
                                            <InputLabel
                                                value="¿Cuántas personas ingresan?"
                                                className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1"
                                            />
                                            <div className="flex flex-wrap gap-2">
                                                {[1, 2, 3, 5, 10, 20].map(
                                                    (num) => (
                                                        <button
                                                            key={num}
                                                            type="button"
                                                            onClick={() =>
                                                                handlePeopleCountChange(
                                                                    num,
                                                                )
                                                            }
                                                            className={`px-5 py-3 rounded-xl text-xs font-black transition-all ${data.people_count === num ? "bg-primary text-white scale-105 shadow-lg" : "bg-gray-50 text-gray-400 hover:bg-gray-100"}`}
                                                        >
                                                            {num}
                                                        </button>
                                                    ),
                                                )}
                                                <TextInput
                                                    type="number"
                                                    value={data.people_count}
                                                    onChange={(e) =>
                                                        handlePeopleCountChange(
                                                            e.target.value,
                                                        )
                                                    }
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
                                    <svg
                                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        )}

                        {currentStep > 0 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                {data.visitors.map(
                                    (visitor, index) =>
                                        index + 1 === currentStep && (
                                            <div
                                                key={index}
                                                className="space-y-6"
                                            >
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
                                                                Integrante de
                                                                grupo
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-6">
                                                        <div className="space-y-3">
                                                            <InputLabel
                                                                value="Nombre Completo"
                                                                className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1"
                                                            />
                                                            <TextInput
                                                                className="block w-full bg-gray-50 border-none rounded-2xl py-6 px-8 text-base font-bold focus:ring-4 focus:ring-primary/10 transition-all"
                                                                value={
                                                                    visitor.full_name
                                                                }
                                                                onChange={(e) =>
                                                                    handleVisitorChange(
                                                                        index,
                                                                        "full_name",
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                placeholder="Nombre como aparece en identificación oficial..."
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors[
                                                                        `visitors.${index}.full_name`
                                                                    ]
                                                                }
                                                            />
                                                        </div>
                                                        <div className="space-y-3">
                                                            <InputLabel
                                                                value="Identificación"
                                                                className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1"
                                                            />
                                                            <select
                                                                className="block w-full bg-gray-50 border-none rounded-2xl py-6 px-8 text-base font-bold focus:ring-4 focus:ring-primary/10 transition-all appearance-none cursor-pointer"
                                                                value={
                                                                    visitor.id_number
                                                                }
                                                                onChange={(e) =>
                                                                    handleVisitorChange(
                                                                        index,
                                                                        "id_number",
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                            >
                                                                <option value="">
                                                                    Seleccione
                                                                    tipo de
                                                                    ID...
                                                                </option>
                                                                <option value="INE">
                                                                    INE
                                                                </option>
                                                                <option value="LICENCIA DE CONDUCIR">
                                                                    LICENCIA DE
                                                                    CONDUCIR
                                                                </option>
                                                                <option value="CARTILLA MILITAR">
                                                                    CARTILLA
                                                                    MILITAR
                                                                </option>
                                                                <option value="PASAPORTE">
                                                                    PASAPORTE
                                                                </option>
                                                                <option value="CÉDULA PROFESIONAL">
                                                                    CÉDULA
                                                                    PROFESIONAL
                                                                </option>
                                                                <option value="GAFETE">
                                                                    GAFETE
                                                                </option>
                                                            </select>
                                                            <InputError
                                                                message={
                                                                    errors[
                                                                        `visitors.${index}.id_number`
                                                                    ]
                                                                }
                                                            />
                                                        </div>

                                                        <div className="pt-4 space-y-4">
                                                            <div className="flex items-center justify-between px-1">
                                                                <div className="flex items-center space-x-2">
                                                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                                                    <InputLabel
                                                                        value="Firma Digital Requerida"
                                                                        className="text-[10px] font-black text-gray-900 uppercase tracking-widest"
                                                                    />
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        clearSignature(
                                                                            index,
                                                                        )
                                                                    }
                                                                    className="text-[9px] font-black text-red-500 uppercase underline"
                                                                >
                                                                    Borrar
                                                                </button>
                                                            </div>
                                                            <div className="border-2 border-dashed border-gray-100 rounded-[2.5rem] bg-gray-50/50 h-[200px] relative overflow-hidden">
                                                                <canvas
                                                                    ref={(el) =>
                                                                        (canvasRefs.current[
                                                                            index
                                                                        ] = el)
                                                                    }
                                                                    width={1200}
                                                                    height={200}
                                                                    className="w-full h-full cursor-crosshair touch-none relative z-10"
                                                                    onMouseDown={(
                                                                        e,
                                                                    ) =>
                                                                        startDrawing(
                                                                            e,
                                                                            index,
                                                                        )
                                                                    }
                                                                    onMouseMove={(
                                                                        e,
                                                                    ) =>
                                                                        draw(
                                                                            e,
                                                                            index,
                                                                        )
                                                                    }
                                                                    onMouseUp={() =>
                                                                        stopDrawing(
                                                                            index,
                                                                        )
                                                                    }
                                                                    onMouseOut={() =>
                                                                        stopDrawing(
                                                                            index,
                                                                        )
                                                                    }
                                                                    onTouchStart={(
                                                                        e,
                                                                    ) =>
                                                                        startDrawing(
                                                                            e,
                                                                            index,
                                                                        )
                                                                    }
                                                                    onTouchMove={(
                                                                        e,
                                                                    ) =>
                                                                        draw(
                                                                            e,
                                                                            index,
                                                                        )
                                                                    }
                                                                    onTouchEnd={() =>
                                                                        stopDrawing(
                                                                            index,
                                                                        )
                                                                    }
                                                                />
                                                                {!visitor.signature && (
                                                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                                                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em]">
                                                                            Firme
                                                                            aquí
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <InputError
                                                                message={
                                                                    errors[
                                                                        `visitors.${index}.signature`
                                                                    ]
                                                                }
                                                            />
                                                        </div>
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

                                                    {currentStep <
                                                    data.people_count ? (
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
                                                            disabled={
                                                                processing
                                                            }
                                                        >
                                                            Finalizar Registro
                                                        </PrimaryButton>
                                                    )}
                                                </div>
                                            </div>
                                        ),
                                )}
                            </div>
                        )}

                        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-center space-x-6 opacity-60">
                            <div className="text-center">
                                <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest mb-1">
                                    Empresa
                                </p>
                                <p className="text-[10px] font-black text-primary truncate max-w-[100px]">
                                    {data.company_id ||
                                        data.new_company ||
                                        "---"}
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
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
