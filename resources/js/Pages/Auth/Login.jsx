import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen flex bg-cream font-sans selection:bg-primary selection:text-white">
            <Head title="Iniciar sesión" />

            {/* Left Side: Visual/Banner */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary">
                <img 
                    src="/assets/login-banner.png" 
                    alt="Security Banner" 
                    className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105 animate-fade-in"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-transparent"></div>
                
                <div className="relative z-10 flex flex-col justify-center px-16 text-white space-y-6">
                    <div className="space-y-2 animate-fade-in-up">
                        <h2 className="text-sm uppercase tracking-[0.3em] font-semibold opacity-70">Sistemas de Seguridad</h2>
                        <h1 className="text-6xl font-bold leading-tight">Protegiendo lo que más importa.</h1>
                        <p className="text-xl font-light opacity-80 max-w-md">Accede al ecosistema de control y monitoreo avanzado de Wasion Security.</p>
                    </div>
                    
                    <div className="flex items-center space-x-4 animate-fade-in delay-500">
                        <div className="h-0.5 w-12 bg-white/30"></div>
                        <span className="text-xs uppercase tracking-widest font-medium opacity-50">Wasion Security System © 2026</span>
                    </div>
                </div>

                {/* Decorative circles */}
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-white/5 blur-3xl"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary-light/10 blur-3xl"></div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12">
                <div className="w-full max-w-md space-y-12 animate-fade-in-up">
                    <div className="space-y-4">
                        <Link href="/" className="inline-block">
                            <h2 className="text-2xl font-bold text-primary tracking-tight">Wasion Security</h2>
                        </Link>
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold text-gray-900">Bienvenido</h1>
                            <p className="text-gray-500">Por favor, ingresa tus credenciales para continuar.</p>
                        </div>
                    </div>

                    {status && (
                        <div className="p-4 bg-green-50 border border-green-100 rounded-xl text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-1">
                            <InputLabel htmlFor="email" value="Correo electrónico" className="text-gray-700 font-medium ms-1" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="block w-full bg-white border-gray-200 focus:ring-primary/20 focus:border-primary rounded-2xl py-3 px-4 shadow-sm transition-all"
                                autoComplete="username"
                                isFocused={true}
                                placeholder="nombre@ejemplo.com"
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between items-center ms-1">
                                <InputLabel htmlFor="password" value="Contraseña" className="text-gray-700 font-medium" />
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm text-primary hover:underline font-medium"
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                )}
                            </div>
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="block w-full bg-white border-gray-200 focus:ring-primary/20 focus:border-primary rounded-2xl py-3 px-4 shadow-sm transition-all"
                                autoComplete="current-password"
                                placeholder="••••••••"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="flex items-center ms-1">
                            <label className="flex items-center cursor-pointer group">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ms-3 text-sm text-gray-600 group-hover:text-primary transition-colors">
                                    Mantenerme conectado
                                </span>
                            </label>
                        </div>

                        <div className="pt-2">
                            <PrimaryButton 
                                className="w-full justify-center py-4 rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all bg-primary text-lg font-bold" 
                                disabled={processing}
                            >
                                Iniciar Sesión
                            </PrimaryButton>
                        </div>
                    </form>

                    <div className="pt-0 text-center">
                        <p className="text-gray-500">
                            ¿No tienes una cuenta?{' '}
                            <Link 
                                href={route('register')} 
                                className="font-bold text-primary hover:text-primary-light transition-colors"
                            >
                                Regístrate gratis
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Mobile Footer */}
                <div className="lg:hidden mt-24 text-center">
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">
                        &copy; 2026 Wasion Security System
                    </p>
                </div>
            </div>
        </div>
    );
}
