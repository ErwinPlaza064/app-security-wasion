import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import FormProgress from "./Partials/FormProgress";
import DestinationStep from "./Partials/DestinationStep";
import VisitorStep from "./Partials/VisitorStep";
import FormSummary from "./Partials/FormSummary";

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

    const validateDestination = () => {
        let hasErrors = false;

        // La empresa es opcional si el motivo de visita es entrevista
        const isInterview = data.visit_reason?.toLowerCase().includes('entrevista');

        if (!isInterview) {
            if (!data.isNewCompany && !data.company_id) {
                setError("company_id", "Seleccione una empresa existente");
                hasErrors = true;
            }
            if (data.isNewCompany && !data.new_company) {
                setError("new_company", "Escriba el nombre de la empresa");
                hasErrors = true;
            }
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
        return !hasErrors;
    };

    const validateVisitor = (index) => {
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

        // Check for duplicates in previous visitors
        if (!hasErrors) {
            for (let i = 0; i < index; i++) {
                const prev = data.visitors[i];
                if (prev.full_name.trim().toLowerCase() === visitor.full_name.trim().toLowerCase()) {
                    setError(`visitors.${index}.full_name`, "Este nombre ya fue registrado en este grupo");
                    hasErrors = true;
                    break;
                }
            }
        }

        return !hasErrors;
    };

    const nextStep = () => {
        clearErrors();
        if (currentStep === 0) {
            if (!validateDestination()) return;
        } else {
            if (!validateVisitor(currentStep - 1)) return;
        }

        if (currentStep <= data.people_count) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const prevStep = () => {
        clearErrors();
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
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

        if (!validateVisitor(currentStep - 1)) return;

        post(route("access-logs.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title={titles[type] || "Acceso"} />

            <div className="py-8 bg-[#fdfcf9] min-h-[calc(100vh-64px)] overflow-x-hidden">
                <div className="max-w-2xl mx-auto px-4 sm:px-6">
                    
                    <FormProgress 
                        currentStep={currentStep} 
                        peopleCount={data.people_count} 
                    />

                    <form onSubmit={submit} className="space-y-6">
                        {currentStep === 0 ? (
                            <DestinationStep 
                                data={data}
                                setData={setData}
                                errors={errors}
                                type={type}
                                titles={titles}
                                companies={companies}
                                areas={areas}
                                handlePeopleCountChange={handlePeopleCountChange}
                                nextStep={nextStep}
                            />
                        ) : (
                            data.visitors.map((visitor, index) => (
                                index + 1 === currentStep && (
                                    <VisitorStep 
                                        key={`visitor-${index}`}
                                        visitor={visitor}
                                        index={index}
                                        currentStep={currentStep}
                                        peopleCount={data.people_count}
                                        handleVisitorChange={handleVisitorChange}
                                        errors={errors}
                                        prevStep={prevStep}
                                        nextStep={nextStep}
                                        processing={processing}
                                    />
                                )
                            ))
                        )}

                        <FormSummary data={data} />
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
