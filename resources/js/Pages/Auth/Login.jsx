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
    const [emailLightPos, setEmailLightPos] = useState(50);
    const [passwordLightPos, setPasswordLightPos] = useState(50);
    const [emailHovered, setEmailHovered] = useState(false);
    const [passwordHovered, setPasswordHovered] = useState(false);

    const handleMouseMove = (e, field) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        
        if (field === 'email') {
            setEmailLightPos(percentage);
        } else {
            setPasswordLightPos(percentage);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Acceso de Seguridad" />
            
            <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#FFF7F2]">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFF7F2] via-[#f5ede8] to-[#FFF7F2]"></div>
                
                {/* Animated mesh gradient */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 -left-4 w-[500px] h-[500px] bg-gradient-to-br from-[#0C1869]/30 to-[#FFF7F2]/30 rounded-full blur-[120px] animate-float"></div>
                    <div className="absolute bottom-0 -right-4 w-[500px] h-[500px] bg-gradient-to-tl from-[#0C1869]/20 to-[#FFF7F2]/20 rounded-full blur-[120px] animate-float-delayed"></div>
                </div>

                {/* Subtle grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `
                        linear-gradient(rgba(12,24,105,0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(12,24,105,0.05) 1px, transparent 1px)
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
                                <div className="absolute inset-0 bg-gradient-to-br from-[#0C1869] to-[#FFF7F2] blur-xl opacity-50 rounded-2xl"></div>
                                <div className="relative bg-gradient-to-br from-[#0C1869] to-[#FFF7F2] p-3 rounded-2xl shadow-2xl shadow-[#0C1869]/30">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-[#0C1869] mb-1 tracking-tight">Wasion MX</h1>
                        <p className="text-sm text-[#0C1869]/70 font-medium">Sistema de Seguridad Patrimonial</p>
                    </div>

                    {/* Login Card */}
                    <div className="relative animate-fade-in-up">
                        {/* Card glow */}
                        <div className="absolute -inset-[1px] bg-gradient-to-b from-[#0C1869]/50 to-[#FFF7F2]/50 rounded-3xl blur-sm"></div>
                        
                        <div className="relative bg-gradient-to-b from-[#f5ede8] to-[#FFF7F2] rounded-3xl shadow-2xl overflow-hidden">
                            {/* Top accent line */}
                            <div className="h-1 bg-gradient-to-r from-transparent via-[#0C1869] to-transparent"></div>

                            <div className="p-8">
                                {/* Status messages */}
                                {status && (
                                    <div className="mb-6 p-4 bg-[#0C1869]/10 border border-[#0C1869]/30 rounded-2xl text-sm text-[#0C1869] backdrop-blur-sm animate-slide-down">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-[#0C1869] rounded-full animate-pulse"></div>
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
                                            className="text-[#0C1869]/90 font-semibold text-sm mb-2 block transition-colors group-focus-within:text-[#0C1869]"
                                        />
                                        <div 
                                            className="relative"
                                            onMouseEnter={() => setEmailHovered(true)}
                                            onMouseLeave={() => setEmailHovered(false)}
                                        >
                                            {/* Rotating light beam like a clock hand */}
                                            <div 
                                                className="pointer-events-none absolute z-[3]"
                                                style={{
                                                    left: 0,
                                                    right: 0,
                                                    top: 0,
                                                    bottom: '-150px',
                                                    opacity: emailHovered ? 1 : 0,
                                                    transition: 'opacity 0.3s ease'
                                                }}
                                            >
                                                {/* Rotating light beam */}
                                                <div 
                                                    className="light-beam-rotate"
                                                    style={{
                                                        position: 'absolute',
                                                        left: '50%',
                                                        top: '50%',
                                                        transformOrigin: '0 0'
                                                    }}
                                                >
                                                    <div 
                                                        className="absolute w-[1px]"
                                                        style={{
                                                            left: 0,
                                                            top: 0,
                                                            height: '200px',
                                                            background: 'transparent',
                                                            boxShadow: `
                                                                0 0 40px 10px rgba(12, 24, 105, 0.9),
                                                                0 0 80px 20px rgba(12, 24, 105, 0.7),
                                                                0 0 120px 30px rgba(12, 24, 105, 0.5),
                                                                0 0 160px 40px rgba(12, 24, 105, 0.3)
                                                            `
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            
                                            {/* Icon */}
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0C1869]/50 transition-all duration-300 group-focus-within:text-[#0C1869] group-focus-within:scale-110 z-10">
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
                                                className="relative z-10 w-full bg-[#FFF7F2]/60 backdrop-blur-sm border-2 border-[#0C1869]/20 focus:border-[#0C1869]/70 focus:bg-[#FFF7F2]/80 rounded-xl py-3.5 pl-12 pr-4 text-[#0C1869] placeholder:text-[#0C1869]/40 transition-all duration-300 shadow-lg focus:shadow-[#0C1869]/20 outline-none hover:border-[#0C1869]/30"
                                                autoComplete="username"
                                                isFocused={true}
                                                placeholder="ejemplo@wasion.com"
                                                onChange={(e) => setData('email', e.target.value)}
                                            />
                                            
                                            {/* Animated border glow on focus */}
                                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#0C1869]/0 via-[#0C1869]/20 to-[#0C1869]/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none blur-sm z-0"></div>
                                        </div>
                                        <InputError message={errors.email} className="text-xs text-red-400 mt-1.5" />
                                    </div>

                                    {/* Password field */}
                                    <div className="group">
                                        <div className="flex justify-between items-center mb-2">
                                            <InputLabel 
                                                htmlFor="password" 
                                                value="Contraseña" 
                                                className="text-[#0C1869]/90 font-semibold text-sm transition-colors group-focus-within:text-[#0C1869]"
                                            />
                                        </div>
                                        <div 
                                            className="relative"
                                            onMouseEnter={() => setPasswordHovered(true)}
                                            onMouseLeave={() => setPasswordHovered(false)}
                                        >
                                            {/* Rotating light beam like a clock hand */}
                                            <div 
                                                className="pointer-events-none absolute z-[3]"
                                                style={{
                                                    left: 0,
                                                    right: 0,
                                                    top: 0,
                                                    bottom: '-150px',
                                                    opacity: passwordHovered ? 1 : 0,
                                                    transition: 'opacity 0.3s ease'
                                                }}
                                            >
                                                {/* Rotating light beam - delayed */}
                                                <div 
                                                    className="light-beam-rotate light-beam-delayed"
                                                    style={{
                                                        position: 'absolute',
                                                        left: '50%',
                                                        top: '50%',
                                                        transformOrigin: '0 0'
                                                    }}
                                                >
                                                    <div 
                                                        className="absolute w-[1px]"
                                                        style={{
                                                            left: 0,
                                                            top: 0,
                                                            height: '200px',
                                                            background: 'transparent',
                                                            boxShadow: `
                                                                0 0 40px 10px rgba(12, 24, 105, 0.9),
                                                                0 0 80px 20px rgba(12, 24, 105, 0.7),
                                                                0 0 120px 30px rgba(12, 24, 105, 0.5),
                                                                0 0 160px 40px rgba(12, 24, 105, 0.3)
                                                            `
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            
                                            {/* Lock icon */}
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0C1869]/50 transition-all duration-300 group-focus-within:text-[#0C1869] group-focus-within:scale-110 z-10">
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
                                                className="relative z-10 w-full bg-[#FFF7F2]/60 backdrop-blur-sm border-2 border-[#0C1869]/20 focus:border-[#0C1869]/70 focus:bg-[#FFF7F2]/80 rounded-xl py-3.5 pl-12 pr-12 text-[#0C1869] placeholder:text-[#0C1869]/40 transition-all duration-300 shadow-lg focus:shadow-[#0C1869]/20 outline-none hover:border-[#0C1869]/30"
                                                autoComplete="current-password"
                                                placeholder="••••••••"
                                                onChange={(e) => setData('password', e.target.value)}
                                            />
                                            
                                            {/* Eye icon toggle */}
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0C1869]/50 hover:text-[#0C1869] transition-all duration-300 hover:scale-110 focus:outline-none z-10"
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
                                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#0C1869]/0 via-[#0C1869]/20 to-[#0C1869]/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none blur-sm z-0"></div>
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
                                                className="rounded border-[#0C1869]/30 text-[#0C1869] focus:ring-[#0C1869]/30"
                                            />
                                            <span className="ml-2 text-sm text-[#0C1869]/70 group-hover/check:text-[#0C1869]/90 transition-colors">
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
                                            <div className="absolute inset-0 bg-gradient-to-r from-[#0C1869] to-[#FFF7F2] transition-all duration-300 group-hover/btn:scale-105"></div>
                                            
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
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-8 animate-fade-in-up-delayed">
                        <p className="text-[#0C1869]/50 text-xs uppercase tracking-widest">
                            Sistema de Seguridad Patrimonial
                        </p>
                    </div>
                </div>
            </div>

            {/* Custom styles */}
            <style>{`
                /* Light sweep animation - bottom part moves left to right */
                .light-sweep-bottom {
                    position: absolute;
                    top: 50%;
                    bottom: 0;
                    width: 1px;
                    background: transparent;
                    box-shadow: 
                        0 0 40px 10px rgba(12, 24, 105, 0.9),
                        0 0 80px 20px rgba(12, 24, 105, 0.7),
                        0 0 120px 30px rgba(12, 24, 105, 0.5),
                        0 0 160px 40px rgba(12, 24, 105, 0.3);
                    animation: sweep-horizontal 3s ease-in-out infinite;
                }

                .light-sweep-delayed {
                    animation-delay: 1.5s;
                }

                @keyframes sweep-horizontal {
                    0% {
                        left: 0%;
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    50% {
                        left: 100%;
                        opacity: 1;
                    }
                    50.1% {
                        left: 100%;
                        opacity: 0;
                    }
                    50.2% {
                        left: 100%;
                        opacity: 0;
                    }
                    60% {
                        left: 100%;
                        opacity: 1;
                    }
                    100% {
                        left: 0%;
                        opacity: 1;
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
                    background: radial-gradient(circle, rgba(12, 24, 105, 0.8), transparent);
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