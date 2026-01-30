import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const getPasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;
        if (/[^A-Za-z0-9]/.test(password)) strength += 25;
        return strength;
    };

    const strength = getPasswordStrength(data.password);

    const checkRequirements = {
        length: data.password.length >= 8,
        uppercase: /[A-Z]/.test(data.password),
        number: /[0-9]/.test(data.password),
        special: /[^A-Za-z0-9]/.test(data.password),
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen flex bg-cream font-sans selection:bg-primary selection:text-white">
            <Head title="Registrarse" />

            {/* Left Side: Visual/Banner (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary">
                <img 
                    src="/assets/login-banner.png" 
                    alt="Security Banner" 
                    className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105 animate-fade-in"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-transparent"></div>
                
                <div className="relative z-10 flex flex-col justify-center px-16 text-white space-y-6">
                    <div className="space-y-2 animate-fade-in-up">
                        <h2 className="text-sm uppercase tracking-[0.3em] font-semibold opacity-70">Únete a nosotros</h2>
                        <h1 className="text-6xl font-bold leading-tight">Crea tu cuenta ahora.</h1>
                        <p className="text-xl font-light opacity-80 max-w-md">Forma parte de la red de seguridad más confiable de la región.</p>
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
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12 overflow-y-auto">
                <div className="w-full max-w-md space-y-8 animate-fade-in-up">
                    <div className="space-y-4">
                        <Link href="/" className="inline-block">
                            <h2 className="text-2xl font-bold text-primary tracking-tight">Wasion Security</h2>
                        </Link>
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold text-gray-900">Crear Cuenta</h1>
                            <p className="text-gray-500">Completa tus datos para registrarte en el sistema.</p>
                        </div>
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                        <div className="space-y-1">
                            <InputLabel htmlFor="name" value="Nombre Completo" className="text-gray-700 font-medium ms-1" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="block w-full bg-white border-gray-200 focus:ring-primary/20 focus:border-primary rounded-2xl py-3 px-4 shadow-sm transition-all"
                                autoComplete="name"
                                isFocused={true}
                                placeholder="Nombre Completo"
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="space-y-1">
                            <InputLabel htmlFor="email" value="Correo electrónico" className="text-gray-700 font-medium ms-1" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="block w-full bg-white border-gray-200 focus:ring-primary/20 focus:border-primary rounded-2xl py-3 px-4 shadow-sm transition-all"
                                autoComplete="username"
                                placeholder="nombre@ejemplo.com"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <InputLabel htmlFor="password" value="Contraseña" className="text-gray-700 font-medium ms-1" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="block w-full bg-white border-gray-200 focus:ring-primary/20 focus:border-primary rounded-2xl py-3 px-4 shadow-sm transition-all"
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <div className="mt-2 space-y-2">
                                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden shadow-inner">
                                        <div 
                                            className={`h-full transition-all duration-500 ${
                                                strength <= 25 ? 'bg-red-500' :
                                                strength <= 50 ? 'bg-orange-500' :
                                                strength <= 75 ? 'bg-yellow-500' : 'bg-green-500'
                                            }`}
                                            style={{ width: `${strength}%` }}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] uppercase tracking-wider font-bold">
                                        <div className={`flex items-center space-x-1 ${checkRequirements.length ? 'text-green-600' : 'text-gray-400'}`}>
                                            <span>{checkRequirements.length ? '✓' : '○'}</span> <span>8+ Caracteres</span>
                                        </div>
                                        <div className={`flex items-center space-x-1 ${checkRequirements.uppercase ? 'text-green-600' : 'text-gray-400'}`}>
                                            <span>{checkRequirements.uppercase ? '✓' : '○'}</span> <span>Mayúscula</span>
                                        </div>
                                        <div className={`flex items-center space-x-1 ${checkRequirements.number ? 'text-green-600' : 'text-gray-400'}`}>
                                            <span>{checkRequirements.number ? '✓' : '○'}</span> <span>Número</span>
                                        </div>
                                        <div className={`flex items-center space-x-1 ${checkRequirements.special ? 'text-green-600' : 'text-gray-400'}`}>
                                            <span>{checkRequirements.special ? '✓' : '○'}</span> <span>Símbolo</span>
                                        </div>
                                    </div>
                                </div>
                                <InputError message={errors.password} />
                            </div>

                            <div className="space-y-1">
                                <InputLabel htmlFor="password_confirmation" value="Confirmar" className="text-gray-700 font-medium ms-1" />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="block w-full bg-white border-gray-200 focus:ring-primary/20 focus:border-primary rounded-2xl py-3 px-4 shadow-sm transition-all"
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>
                        </div>

                        <div className="pt-4">
                            <PrimaryButton 
                                className="w-full justify-center py-4 rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all bg-primary text-lg font-bold" 
                                disabled={processing}
                            >
                                Registrarse
                            </PrimaryButton>
                        </div>
                    </form>

                    <div className="pt-0 text-center">
                        <p className="text-gray-500">
                            ¿Ya tienes una cuenta?{' '}
                            <Link 
                                href={route('login')} 
                                className="font-bold text-primary hover:text-primary-light transition-colors"
                            >
                                Inicia sesión aquí
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Mobile Footer */}
                <div className="lg:hidden mt-12 text-center">
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">
                        &copy; 2026 Wasion Security System
                    </p>
                </div>
            </div>
        </div>
    );
}
