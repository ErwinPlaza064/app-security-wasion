import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Footer from '@/Components/Footer';

export default function Welcome({ auth }) {
    return (
        <AuthenticatedLayout>
            <Head title="Wasion Security - Bienvenida" />
            
            <div className="relative min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-[#FFF7F2] overflow-hidden selection:bg-[#0C1869] selection:text-white pb-12">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#0C1869] opacity-[0.03] blur-3xl"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#0C1869] opacity-[0.02] blur-3xl"></div>
                </div>

                <div className="relative w-full max-w-4xl px-6 py-4 flex flex-col items-center">
                    {/* Main Content */}
                    <main className="text-center space-y-8 animate-fade-in-up mt-12">
                        <div className="flex flex-col items-center space-y-4">
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#0C1869]">
                                Wasion Security
                            </h1>
                            
                            <div className="h-1 w-24 bg-[#0C1869] rounded-full mx-auto opacity-20"></div>
                            
                            <p className="text-xl md:text-2xl text-gray-500 font-light max-w-lg mx-auto">
                                Aplicación en proceso
                            </p>
                        </div>
                    </main>

                    {/* Footer */}
                    <Footer />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
