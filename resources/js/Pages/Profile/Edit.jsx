import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout>
            <Head title="Configuración de Perfil" />

            <div className="min-h-[calc(100vh-64px)] bg-cream py-12 px-4 selection:bg-primary selection:text-white">
                <div className="mx-auto max-w-4xl space-y-8 animate-fade-in-up">
                    
                    {/* Encabezado de Página */}
                    <div className="flex flex-col space-y-2 text-center md:text-left md:px-4">
                        <h1 className="text-4xl font-black text-primary tracking-tight">Configuración</h1>
                        <p className="text-gray-500 font-medium">Administra tu información personal y seguridad de la cuenta</p>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        
                        {/* Sección: Información Personal */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-transparent rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <div className="relative bg-white p-6 md:p-10 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-white">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-primary/5 rounded-2xl">
                                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Información del Perfil</h2>
                                </div>
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                    className="w-full"
                                />
                            </div>
                        </div>

                        {/* Sección: Contraseña */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-transparent rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <div className="relative bg-white p-6 md:p-10 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-white">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-primary/5 rounded-2xl">
                                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Seguridad</h2>
                                </div>
                                <UpdatePasswordForm className="w-full" />
                            </div>
                        </div>

                        {/* Sección: Eliminar Cuenta (Solo SuperAdmin) */}
                        {user.role === 'superadmin' && (
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-red-500/10 to-transparent rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                                <div className="relative bg-white p-6 md:p-10 rounded-[2.5rem] shadow-2xl shadow-red-500/5 border border-red-50">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="p-3 bg-red-50 rounded-2xl">
                                            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </div>
                                        <h2 className="text-2xl font-bold text-red-600">Eliminar Cuenta</h2>
                                    </div>
                                    <DeleteUserForm className="w-full" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
