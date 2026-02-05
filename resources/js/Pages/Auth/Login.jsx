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
        <>
            <Head title="Acceso de Seguridad" />
            
            <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#0B0F1E]">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F1E] via-[#141B2E] to-[#0B0F1E]"></div>
                
                {/* Animated mesh gradient */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 -left-4 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/30 to-blue-600/30 rounded-full blur-[120px] animate-float"></div>
                    <div className="absolute bottom-0 -right-4 w-[500px] h-[500px] bg-gradient-to-tl from-blue-500/20 to-indigo-600/20 rounded-full blur-[120px] animate-float-delayed"></div>
                </div>

                {/* Subtle grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                }}></div>

                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="particle particle-1"></div>
                    <div className="particle particle-2"></div>
                    <div className="particle particle-3"></div>
                    <div className="particle particle-4"></div>
                    <div className="particle particle-5"></div>
                </div>

                {/* Main container */}
                <div className="relative z-10 w-full max-w-[440px]">
                    {/* Logo & Brand */}
                    <div className="text-center mb-8 animate-fade-in-down">
                        <div className="inline-flex items-center justify-center mb-4">
                            <div className="relative">
                                {/* Logo glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 blur-xl opacity-50 rounded-2xl"></div>
                                <div className="relative bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-2xl shadow-2xl shadow-cyan-500/30">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">Wasion MX</h1>
                        <p className="text-sm text-gray-400 font-medium">Sistema de Seguridad Patrimonial</p>
                    </div>

                    {/* Login Card */}
                    <div className="relative animate-fade-in-up">
                        {/* Card glow */}
                        <div className="absolute -inset-[1px] bg-gradient-to-b from-cyan-500/50 to-blue-600/50 rounded-3xl blur-sm"></div>
                        
                        <div className="relative bg-gradient-to-b from-[#1A2032] to-[#141B2E] rounded-3xl shadow-2xl overflow-hidden">
                            {/* Top accent line */}
                            <div className="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>

                            <div className="p-8">
                                {/* Status messages */}
                                {status && (
                                    <div className="mb-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl text-sm text-cyan-300 backdrop-blur-sm animate-slide-down">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                                            {status}
                                        </div>
                                    </div>
                                )}
                                
                                {usePage().props.flash?.error && (
                                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-sm text-red-300 backdrop-blur-sm animate-slide-down">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                                            {usePage().props.flash.error}
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={submit} className="space-y-5">
                                    {/* Email field */}
                                    <div className="group">
                                        <InputLabel 
                                            htmlFor="email" 
                                            value="Correo electrónico" 
                                            className="text-gray-300 font-semibold text-sm mb-2 block transition-colors group-focus-within:text-cyan-400"
                                        />
                                        <div className="relative">
                                            {/* Spotlight effect emanating from input */}
                                            <div className="spotlight-wrapper">
                                                <div className="spotlight spotlight-1"></div>
                                                <div className="spotlight spotlight-2"></div>
                                                <div className="spotlight spotlight-3"></div>
                                            </div>
                                            
                                            {/* Icon */}
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-300 group-focus-within:text-cyan-400 group-focus-within:scale-110 z-10">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            
                                            {/* Input field */}
                                            <TextInput
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                className="relative z-10 w-full bg-[#0D1220]/60 backdrop-blur-sm border-2 border-gray-700/50 focus:border-cyan-400/70 focus:bg-[#0D1220]/80 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-500 transition-all duration-300 shadow-lg focus:shadow-cyan-500/20 outline-none hover:border-gray-600/70"
                                                autoComplete="username"
                                                isFocused={true}
                                                placeholder="ejemplo@wasion.com"
                                                onChange={(e) => setData('email', e.target.value)}
                                            />
                                            
                                            {/* Animated border glow on focus */}
                                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-cyan-400/20 to-blue-500/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none blur-sm z-0"></div>
                                        </div>
                                        <InputError message={errors.email} className="text-xs text-red-400 mt-1.5" />
                                    </div>

                                    {/* Password field */}
                                    <div className="group">
                                        <div className="flex justify-between items-center mb-2">
                                            <InputLabel 
                                                htmlFor="password" 
                                                value="Contraseña" 
                                                className="text-gray-300 font-semibold text-sm transition-colors group-focus-within:text-cyan-400"
                                            />
                                            {canResetPassword && (
                                                <Link 
                                                    href={route('password.request')} 
                                                    className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                                                >
                                                    Recuperar
                                                </Link>
                                            )}
                                        </div>
                                        <div className="relative">
                                            {/* Spotlight effect emanating from input - delayed animation */}
                                            <div className="spotlight-wrapper">
                                                <div className="spotlight spotlight-1 spotlight-delayed-1"></div>
                                                <div className="spotlight spotlight-2 spotlight-delayed-2"></div>
                                                <div className="spotlight spotlight-3 spotlight-delayed-3"></div>
                                            </div>
                                            
                                            {/* Lock icon */}
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-300 group-focus-within:text-cyan-400 group-focus-within:scale-110 z-10">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </div>
                                            
                                            {/* Input field */}
                                            <TextInput
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={data.password}
                                                className="relative z-10 w-full bg-[#0D1220]/60 backdrop-blur-sm border-2 border-gray-700/50 focus:border-cyan-400/70 focus:bg-[#0D1220]/80 rounded-xl py-3.5 pl-12 pr-12 text-white placeholder:text-gray-500 transition-all duration-300 shadow-lg focus:shadow-cyan-500/20 outline-none hover:border-gray-600/70"
                                                autoComplete="current-password"
                                                placeholder="••••••••"
                                                onChange={(e) => setData('password', e.target.value)}
                                            />
                                            
                                            {/* Eye icon toggle */}
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-400 transition-all duration-300 hover:scale-110 focus:outline-none z-10"
                                            >
                                                {showPassword ? (
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                )}
                                            </button>
                                            
                                            {/* Animated border glow on focus */}
                                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-cyan-400/20 to-blue-500/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none blur-sm z-0"></div>
                                        </div>
                                        <InputError message={errors.password} className="text-xs text-red-400 mt-1.5" />
                                    </div>

                                    {/* Remember checkbox */}
                                    <div className="flex items-center pt-1">
                                        <label className="flex items-center cursor-pointer group/check">
                                            <Checkbox
                                                name="remember"
                                                checked={data.remember}
                                                onChange={(e) => setData('remember', e.target.checked)}
                                                className="rounded border-gray-600 text-cyan-500 focus:ring-cyan-500/30"
                                            />
                                            <span className="ml-2 text-sm text-gray-400 group-hover/check:text-gray-300 transition-colors">
                                                Recordar equipo
                                            </span>
                                        </label>
                                    </div>

                                    {/* Login button */}
                                    <div className="pt-2">
                                        <PrimaryButton 
                                            className="w-full relative group/btn overflow-hidden rounded-xl py-4 font-semibold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed justify-center" 
                                            disabled={processing}
                                        >
                                            {/* Gradient background */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300 group-hover/btn:scale-105"></div>
                                            
                                            {/* Shine effect on hover */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                                            
                                            {/* Button content */}
                                            <div className="relative flex items-center justify-center gap-2">
                                                <svg className="w-5 h-5 transition-transform group-hover/btn:scale-110 group-hover/btn:rotate-12" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-sm font-bold uppercase tracking-wider">
                                                    Acceder al Sistema
                                                </span>
                                            </div>
                                        </PrimaryButton>
                                    </div>

                                    {/* Divider */}
                                    <div className="relative py-2 px-10">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-700/50"></div>
                                        </div>
                                        <div className="relative flex justify-center text-xs">
                                            <span className="px-4 bg-[#1A2032] text-gray-500 font-medium uppercase tracking-wider">
                                                o acceso rápido
                                            </span>
                                        </div>
                                    </div>

                                    {/* Google Auth button */}
                                    <a
                                        href={route('auth.google')}
                                        className="w-full inline-flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl border border-gray-700/50 bg-[#0D1220]/40 hover:bg-[#0D1220]/60 hover:border-gray-600/70 active:scale-[0.98] transition-all group/google backdrop-blur-sm"
                                    >
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                        </svg>
                                        <span className="text-gray-400 font-bold group-hover/google:text-gray-300 transition-colors text-xs uppercase tracking-widest">
                                            Google Auth
                                        </span>
                                    </a>
                                </form>
                            </div>

                            {/* Footer section */}
                            <div className="bg-[#0D1220]/40 backdrop-blur-sm p-6 border-t border-gray-700/30 text-center">
                                <p className="text-gray-400 text-sm">
                                    ¿Nuevo en la plataforma?{' '}
                                    <Link 
                                        href={route('register')} 
                                        className="font-bold text-cyan-400 hover:text-cyan-300 transition-colors underline decoration-cyan-400/30 decoration-2 underline-offset-4"
                                    >
                                        Crea una cuenta
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-8 animate-fade-in-up-delayed">
                        <p className="text-gray-500 text-xs uppercase tracking-widest">
                            Sistema de Seguridad Patrimonial
                        </p>
                    </div>
                </div>
            </div>

            {/* Custom styles */}
            <style>{`
                /* Spotlight effect - luz que sale desde abajo */
                .spotlight-wrapper {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 200%;
                    overflow: visible;
                    pointer-events: none;
                    z-index: 1;
                }

                .spotlight {
                    position: absolute;
                    bottom: 0;
                    width: 2px;
                    height: 100%;
                    transform-origin: bottom center;
                    opacity: 0;
                    animation: spotlight-sweep 6s ease-in-out infinite;
                }

                /* Tres rayos de luz con diferentes ángulos */
                .spotlight-1 {
                    left: 20%;
                    background: linear-gradient(
                        to top,
                        rgba(255, 255, 255, 0.4) 0%,
                        rgba(255, 255, 255, 0.3) 20%,
                        rgba(255, 255, 255, 0.15) 50%,
                        rgba(255, 255, 255, 0.05) 80%,
                        transparent 100%
                    );
                    filter: blur(12px);
                    animation-delay: 0s;
                }

                .spotlight-2 {
                    left: 50%;
                    background: linear-gradient(
                        to top,
                        rgba(255, 255, 255, 0.5) 0%,
                        rgba(255, 255, 255, 0.35) 20%,
                        rgba(255, 255, 255, 0.2) 50%,
                        rgba(255, 255, 255, 0.08) 80%,
                        transparent 100%
                    );
                    filter: blur(15px);
                    animation-delay: 0.5s;
                }

                .spotlight-3 {
                    left: 80%;
                    background: linear-gradient(
                        to top,
                        rgba(255, 255, 255, 0.35) 0%,
                        rgba(255, 255, 255, 0.25) 20%,
                        rgba(255, 255, 255, 0.12) 50%,
                        rgba(255, 255, 255, 0.04) 80%,
                        transparent 100%
                    );
                    filter: blur(10px);
                    animation-delay: 1s;
                }

                /* Delays para el segundo input */
                .spotlight-delayed-1 {
                    animation-delay: 2s;
                }

                .spotlight-delayed-2 {
                    animation-delay: 2.5s;
                }

                .spotlight-delayed-3 {
                    animation-delay: 3s;
                }

                @keyframes spotlight-sweep {
                    0% {
                        opacity: 0;
                        transform: rotate(-45deg) scaleY(0.5);
                    }
                    15% {
                        opacity: 0.8;
                        transform: rotate(-20deg) scaleY(1);
                    }
                    35% {
                        opacity: 1;
                        transform: rotate(0deg) scaleY(1.2);
                    }
                    55% {
                        opacity: 0.8;
                        transform: rotate(20deg) scaleY(1);
                    }
                    70% {
                        opacity: 0.4;
                        transform: rotate(45deg) scaleY(0.5);
                    }
                    100% {
                        opacity: 0;
                        transform: rotate(45deg) scaleY(0.5);
                    }
                }

                /* Floating animations */
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-20px) rotate(5deg);
                    }
                }

                @keyframes float-delayed {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-30px) rotate(-5deg);
                    }
                }

                .animate-float {
                    animation: float 20s ease-in-out infinite;
                }

                .animate-float-delayed {
                    animation: float-delayed 25s ease-in-out infinite;
                }

                /* Fade in animations */
                @keyframes fadeInDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in-down {
                    animation: fadeInDown 0.6s ease-out;
                }

                .animate-fade-in-up {
                    animation: fadeInUp 0.6s ease-out 0.2s both;
                }

                .animate-fade-in-up-delayed {
                    animation: fadeInUp 0.6s ease-out 0.4s both;
                }

                .animate-slide-down {
                    animation: slideDown 0.4s ease-out;
                }

                /* Particle animations */
                @keyframes particle-float {
                    0%, 100% {
                        transform: translate(0, 0);
                        opacity: 0.3;
                    }
                    50% {
                        opacity: 0.8;
                    }
                }

                .particle {
                    position: absolute;
                    width: 3px;
                    height: 3px;
                    background: radial-gradient(circle, rgba(34, 211, 238, 0.8), transparent);
                    border-radius: 50%;
                    animation: particle-float 15s infinite;
                }

                .particle-1 {
                    top: 20%;
                    left: 10%;
                    animation-delay: 0s;
                    animation-duration: 12s;
                }

                .particle-2 {
                    top: 60%;
                    right: 15%;
                    animation-delay: 2s;
                    animation-duration: 15s;
                }

                .particle-3 {
                    bottom: 30%;
                    left: 25%;
                    animation-delay: 4s;
                    animation-duration: 18s;
                }

                .particle-4 {
                    top: 40%;
                    right: 30%;
                    animation-delay: 6s;
                    animation-duration: 14s;
                }

                .particle-5 {
                    bottom: 20%;
                    right: 20%;
                    animation-delay: 8s;
                    animation-duration: 16s;
                }
            `}</style>
        </>
    );
}