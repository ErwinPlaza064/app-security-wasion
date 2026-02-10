import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import GlobalLoading from '@/Components/GlobalLoading';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    useEffect(() => {
        if (showingNavigationDropdown) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [showingNavigationDropdown]);

    return (
        <div className="min-h-screen bg-cream">
            <GlobalLoading />
            <nav className="border-b border-primary/5 bg-cream/80 backdrop-blur-xl sticky top-0 z-40 w-full">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        <div className="flex-shrink-0">
                            <Link href={route('dashboard')} className="text-primary font-black text-xl tracking-tighter uppercase flex items-center">
                                Wasion Security
                            </Link>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            {user ? (
                                <div className="relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-bold rounded-2xl text-gray-700 bg-white shadow-sm hover:shadow-md transition-all duration-200">
                                                {user.name}
                                                <svg className="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>

                                            <Dropdown.Link href={route('profile.edit')}>Perfil</Dropdown.Link>
                                            <Dropdown.Link href={route('logout')} method="post" as="button">Cerrar sesión</Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            ) : (
                                <Link 
                                    href={route('login')} 
                                    className="text-sm font-bold text-gray-600 hover:text-primary transition-colors px-2"
                                >
                                    Iniciar
                                </Link>
                            )}
                        </div>

                        <div className="flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(true)}
                                className="inline-flex items-center justify-center p-2 rounded-xl text-primary bg-white shadow-sm hover:shadow-md transition-all border border-primary/5 focus:outline-none"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="sm:hidden">
                <div 
                    className={`fixed inset-0 bg-primary/20 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
                        showingNavigationDropdown ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                    onClick={() => setShowingNavigationDropdown(false)}
                />

                <div 
                    className={`fixed inset-y-0 right-0 w-[280px] bg-white z-[70] shadow-2xl transition-transform duration-500 ease-in-out ${
                        showingNavigationDropdown ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    <div className="flex flex-col h-full">
                        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                            <span className="text-primary font-black text-xs uppercase tracking-[0.2em]">Navegación</span>
                            <button 
                                onClick={() => setShowingNavigationDropdown(false)}
                                className="p-2 rounded-xl bg-gray-50 text-gray-400 hover:text-primary transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {user && (
                            <div className="p-6 bg-gradient-to-b from-primary/5 to-transparent border-b border-gray-50">
                                <div className="flex items-center space-x-4 mb-3">
                                    <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20 overflow-hidden">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-900 font-bold text-sm leading-none mb-1">{user.name}</span>
                                        <span className="text-gray-500 text-[10px] truncate max-w-[140px]">{user.email}</span>
                                    </div>
                                </div>
                                <div className="inline-flex px-2 py-0.5 rounded-lg bg-primary/10 text-primary text-[9px] font-black uppercase tracking-wider">
                                    {user.role || 'Usuario'}
                                </div>
                            </div>
                        )}

                        <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                            <Link 
                                href={route('dashboard')}
                                className={`flex items-center space-x-3 p-4 rounded-2xl font-bold text-sm transition-all ${
                                    route().current('dashboard') ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                                }`}
                                onClick={() => setShowingNavigationDropdown(false)}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <span>Escritorio</span>
                            </Link>

                            {user ? (
                                <>

                                    <Link 
                                        href={route('profile.edit')}
                                        className={`flex items-center space-x-3 p-4 rounded-2xl font-bold text-sm transition-all ${
                                            route().current('profile.edit') ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                                        }`}
                                        onClick={() => setShowingNavigationDropdown(false)}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span>Mi Perfil</span>
                                    </Link>
                                    <Link 
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="w-full flex items-center space-x-3 p-4 rounded-2xl font-bold text-sm text-red-500 hover:bg-red-50 transition-all text-left"
                                        onClick={() => setShowingNavigationDropdown(false)}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <span>Cerrar sesión</span>
                                    </Link>
                                </>
                            ) : (
                                <div className="pt-4 flex justify-center">
                                    <Link 
                                        href={route('login')} 
                                        className="text-sm font-bold text-gray-600 hover:text-primary transition-all py-2"
                                        onClick={() => setShowingNavigationDropdown(false)}
                                    >
                                        Iniciar
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div className="p-8 border-t border-gray-50 flex flex-col items-center">
                            <span className="text-[9px] text-gray-400 font-black uppercase tracking-[0.3em]">&copy; 2026 Wasion Security</span>
                        </div>
                    </div>
                </div>
            </div>

            {header && (
                <header className="bg-white/50 border-b border-primary/5">
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="relative z-0">
                {children}
            </main>
        </div>
    );
}
