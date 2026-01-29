import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Wasion Security - Bienvenida" />
            
            <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#FFF7F2] overflow-hidden selection:bg-[#0C1869] selection:text-white">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#0C1869] opacity-[0.03] blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#0C1869] opacity-[0.02] blur-3xl"></div>
                </div>

                <div className="relative w-full max-w-4xl px-6 py-12 flex flex-col items-center">
                    {/* Header with Navigation */}
                    <header className="w-full flex justify-end mb-24 animate-fade-in">
                        <nav className="flex items-center space-x-6">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="text-[#0C1869] font-semibold hover:opacity-70 transition-all duration-300 transform hover:translate-y-[-2px]"
                                >
                                    Ir al Escritorio
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-[#0C1869] font-semibold hover:opacity-70 transition-all duration-300 transform hover:translate-y-[-2px]"
                                    >
                                        Iniciar Sesión
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="bg-[#0C1869] text-white px-6 py-2 rounded-xl font-semibold shadow-lg shadow-[#0C1869]/20 hover:shadow-xl hover:shadow-[#0C1869]/30 transition-all duration-300 transform hover:scale-105 active:scale-95"
                                    >
                                        Registrarse
                                    </Link>
                                </>
                            )}
                        </nav>
                    </header>

                    {/* Main Content */}
                    <main className="text-center space-y-8 animate-fade-in-up">
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
                    <footer className="mt-32 w-full text-center">
                        <p className="text-xs text-gray-400 uppercase tracking-[0.2em] font-medium">
                            &copy; {new Date().getFullYear()} Wasion Security System
                        </p>
                    </footer>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 1s ease-out forwards;
                }
                .animate-fade-in-up {
                    animation: fade-in-up 1s ease-out forwards;
                }
                @font-face {
                    font-family: 'Outfit';
                    src: url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap');
                }
            ` }} />
        </>
    );
}
