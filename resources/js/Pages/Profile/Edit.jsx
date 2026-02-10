import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';

export default function Edit() {
    return (
        <AuthenticatedLayout>
            <Head title="Configuración de Perfil" />

            <div className="min-h-[calc(100vh-64px)] bg-cream py-12 px-4 selection:bg-primary selection:text-white">
                <div className="mx-auto max-w-4xl space-y-8 animate-fade-in-up">
                    <div className="flex flex-col space-y-2 text-center md:text-left md:px-4">
                        <h1 className="text-4xl font-black text-primary tracking-tight">Seguridad</h1>
                        <p className="text-gray-500 font-medium">Administra la seguridad de tu cuenta actualizando tu contraseña</p>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-transparent rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <div className="relative bg-white p-6 md:p-10 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-white">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-primary/5 rounded-2xl">
                                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Cambiar Contraseña</h2>
                                </div>
                                <UpdatePasswordForm className="w-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
