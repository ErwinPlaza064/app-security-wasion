import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-cream">
            <Head title="Acceso de Seguridad" />
            
            <div className="hidden md:flex md:w-1/2 lg:w-3/5 bg-[#0C1869] relative items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-[#1a2b8a] rounded-full blur-[120px] opacity-60 animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#08124d] rounded-full blur-[100px] opacity-80"></div>
                </div>
                
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }}></div>
                
                <div className="relative z-10 p-12 lg:p-16 max-w-2xl">
                    <h1 className="text-4xl lg:text-6xl font-black text-white mb-4 tracking-tighter leading-none">
                        WASION<br />
                        <span className="text-white/60">SECURITY</span>
                    </h1>
                    <p className="text-lg text-white/70 font-medium max-w-md">
                        Plataforma centralizada de seguridad patrimonial y control operativo.
                    </p>
                    
                    <div className="mt-10 flex flex-wrap gap-4">
                        <div className="flex items-center space-x-3 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                            <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span className="text-[10px] uppercase font-black tracking-widest text-white/80">Acceso Seguro</span>
                        </div>
                        <div className="flex items-center space-x-3 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                            <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-[10px] uppercase font-black tracking-widest text-white/80">Tiempo Real</span>
                        </div>
                        <div className="flex items-center space-x-3 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                            <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span className="text-[10px] uppercase font-black tracking-widest text-white/80">Optimizado</span>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-8 left-12 lg:left-16">
                    <p className="text-white/30 text-[9px] font-black uppercase tracking-[0.4em]">Wasion MX © 2026</p>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-16 bg-cream overflow-y-auto">
                <div className="w-full max-w-[380px]">
                    <div className="mb-8 md:hidden text-center">
                        <h2 className="text-2xl font-black text-[#0C1869] tracking-tight">Wasion MX</h2>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-2xl font-black text-[#0C1869] tracking-tight mb-1 uppercase">Bienvenido</h2>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Ingrese sus credenciales</p>
                    </div>

                    {status && (
                        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs font-bold text-emerald-600">
                            {status}
                        </div>
                    )}

                    {usePage().props.flash?.error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-xs font-bold text-red-600">
                            {usePage().props.flash.error}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-4">
                        <div className="space-y-1.5">
                            <InputLabel htmlFor="email" value="Correo electrónico" className="text-[9px] font-black text-gray-400 uppercase tracking-widest px-1" />
                            <div className="relative group transition-all duration-300 focus-within:scale-[1.01]">
                                {/* Efecto de Rayo Rotatorio (Faro) */}
                                <div className="absolute -inset-[2px] rounded-xl overflow-hidden opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
                                    <div className="absolute inset-[-500%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_170deg,#0C1869_180deg,transparent_190deg,transparent_360deg)] animate-beam"></div>
                                </div>
                                
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#0C1869] group-focus-within:scale-110 transition-all duration-300 z-10">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="block w-full bg-white border-2 border-gray-100 focus:border-transparent rounded-xl py-4 pl-14 pr-6 text-sm font-bold focus:ring-0 shadow-sm transition-all duration-300 outline-none relative z-0"
                                    autoComplete="username"
                                    isFocused={true}
                                    placeholder="nombre@empresa.com"
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                            </div>
                            <InputError message={errors.email} />
                        </div>

                        <div className="space-y-1.5">
                            <InputLabel htmlFor="password" value="Contraseña" className="text-[9px] font-black text-gray-400 uppercase tracking-widest px-1" />
                            <div className="relative group transition-all duration-300 focus-within:scale-[1.01]">
                                {/* Efecto de Rayo Rotatorio (Faro) */}
                                <div className="absolute -inset-[2px] rounded-xl overflow-hidden opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
                                    <div className="absolute inset-[-500%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_170deg,#0C1869_180deg,transparent_190deg,transparent_360deg)] animate-beam"></div>
                                </div>

                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#0C1869] group-focus-within:scale-110 transition-all duration-300 z-10">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <TextInput
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={data.password}
                                    className="block w-full bg-white border-2 border-gray-100 focus:border-transparent rounded-xl py-4 pl-14 pr-14 text-sm font-bold focus:ring-0 shadow-sm transition-all duration-300 outline-none relative z-0"
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#0C1869] hover:scale-110 active:scale-90 transition-all z-10"
                                >
                                    {showPassword ? (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268-2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268-2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <InputError message={errors.password} />
                        </div>

                        <div className="flex items-center pt-1">
                            <label className="flex items-center cursor-pointer group">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded border-gray-200 text-[#0C1869] focus:ring-[#0C1869]/20"
                                />
                                <span className="ml-3 text-[9px] font-black text-gray-400 uppercase tracking-widest group-hover:text-gray-600 transition-colors">
                                    Recordar en este equipo
                                </span>
                            </label>
                        </div>

                        <div className="pt-4">
                            <PrimaryButton 
                                className="w-full justify-center py-5 rounded-xl bg-[#0C1869] text-xs font-black uppercase tracking-[0.3em] shadow-2xl shadow-[#0C1869]/20 hover:bg-[#0C1869]/90 active:scale-95 transition-all" 
                                disabled={processing}
                            >
                                Ingresar al Sistema
                            </PrimaryButton>
                        </div>
                    </form>

                    <div className="mt-12 text-center">
                        <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.4em]">
                            Sistema de Gestión Patrimonial
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}