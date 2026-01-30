import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Footer from '@/Components/Footer';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Escritorio" />

            <div className="relative min-h-[calc(100vh-64px)] flex flex-col items-center justify-center overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#0C1869] opacity-[0.03] blur-3xl"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#0C1869] opacity-[0.02] blur-3xl"></div>
                </div>

                <div className="relative w-full max-w-4xl px-6 py-4 flex flex-col items-center animate-fade-in-up">
                    <div className="w-full bg-white/70 backdrop-blur-xl px-8 py-10 shadow-2xl shadow-[#0C1869]/5 rounded-[2rem] border border-white">
                        <div className="flex flex-col items-center space-y-6 text-center">
                            <h2 className="text-3xl font-bold text-[#0C1869]">
                                ¡Has iniciado sesión correctamente!
                            </h2>
                            
                            <div className="h-1 w-20 bg-[#0C1869] rounded-full opacity-20"></div>
                            
                            <p className="text-gray-500 font-light">
                                Bienvenido al sistema de Wasion Security. Desde aquí podrás gestionar tus actividades.
                            </p>
                        </div>
                    </div>

                    <Footer />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
