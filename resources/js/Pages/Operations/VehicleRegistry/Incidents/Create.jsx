import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

const Icons = {
    Car: () => (
        <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
        </svg>
    ),
    Alert: () => (
        <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
        </svg>
    ),
    Clock: () => (
        <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
    ),
};

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
        happened_at: new Date().toISOString().slice(0, 16),
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("vehicle-incidents.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Incidencia de Padrón Vehicular" />

            <div className="py-12 bg-[#fdfcf9] min-h-[calc(100vh-64px)]">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex items-center space-x-4 mb-10">
                        <div className="w-16 h-16 bg-rose-500 rounded-[2rem] flex items-center justify-center text-white shadow-lg shadow-rose-200">
                            <Icons.Alert />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
                                Incidencia Vehicular
                            </h1>
                            <p className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em]">
                                Padrón Vehicular
                            </p>
                        </div>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col space-y-8">
                            {/* Titulo / Vehículo */}
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2 ms-1">
                                    <div className="w-1 h-3 bg-rose-500 rounded-full"></div>
                                    <InputLabel
                                        value="Título / Vehículo"
                                        className="text-[10px] font-black text-gray-400 uppercase tracking-widest"
                                    />
                                </div>
                                <TextInput
                                    className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-rose-500/10 rounded-2xl py-5 px-6"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    placeholder="Ej: Carro Ford Con placas GAY-123"
                                    required
                                />
                                <InputError
                                    message={errors.title}
                                    className="mt-2"
                                />
                            </div>

                            {/* Descripción */}
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2 ms-1">
                                    <div className="w-1 h-3 bg-rose-500 rounded-full"></div>
                                    <InputLabel
                                        value="Descripción de la incidencia"
                                        className="text-[10px] font-black text-gray-400 uppercase tracking-widest"
                                    />
                                </div>
                                <textarea
                                    className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-rose-500/10 rounded-3xl py-4 px-6 min-h-[150px] text-sm leading-relaxed"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    required
                                    placeholder="Describe lo sucedido detalladamente..."
                                />
                                <InputError
                                    message={errors.description}
                                    className="mt-2"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="pt-4 flex gap-4">
                                <Link
                                    href={route("dashboard")}
                                    className="flex-1 py-4 px-6 rounded-2xl border border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-all text-center"
                                >
                                    Cancelar
                                </Link>

                                <PrimaryButton
                                    className="flex-[2] py-5 px-6 rounded-2xl bg-rose-600 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-rose-200 hover:bg-rose-700 transition-all justify-center"
                                    disabled={processing}
                                >
                                    {processing
                                        ? "Registrando..."
                                        : "Registrar Incidencia"}
                                </PrimaryButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
