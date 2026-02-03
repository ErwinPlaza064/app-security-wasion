import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

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
        <div className="min-h-screen flex flex-col items-center justify-center bg-cream font-sans selection:bg-primary selection:text-white p-4">
            <Head title="Registrarse" />

            <div className="w-full max-w-[480px] animate-fade-in-up">

                {/* Tarjeta de Registro */}
                <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-white">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-1">Crear Cuenta</h1>
                        <p className="text-gray-500 font-medium text-sm">Únete a la plataforma de seguridad líder</p>
                    </div>

                    {/* Mensajes de error flash */}
                    {usePage().props.flash?.error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-sm font-medium text-red-600 animate-fade-in text-center">
                            {usePage().props.flash.error}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-4">
                        <div className="space-y-1.5">
                            <InputLabel htmlFor="name" value="Nombre completo" className="text-gray-700 font-bold text-xs uppercase tracking-wider ms-1" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="block w-full bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-primary/20 focus:border-primary rounded-2xl py-3 px-4 shadow-sm transition-all text-sm"
                                autoComplete="name"
                                isFocused={true}
                                placeholder="Tu nombre completo"
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="space-y-1.5">
                            <InputLabel htmlFor="email" value="Correo electrónico" className="text-gray-700 font-bold text-xs uppercase tracking-wider ms-1" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="block w-full bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-primary/20 focus:border-primary rounded-2xl py-3 px-4 shadow-sm transition-all text-sm"
                                autoComplete="username"
                                placeholder="nombre@ejemplo.com"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-1.5">
                                <InputLabel htmlFor="password" value="Contraseña" className="text-gray-700 font-bold text-xs uppercase tracking-wider ms-1" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="block w-full bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-primary/20 focus:border-primary rounded-2xl py-3 px-4 shadow-sm transition-all text-sm"
                                    autoComplete="new-password"
                                    placeholder="8+ caracteres"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                
                                <div className="mt-2 p-3 bg-gray-50/80 rounded-2xl space-y-2">
                                    <div className="flex justify-between items-center px-1">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Seguridad</span>
                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tight ${
                                            strength < 50 ? 'bg-red-100 text-red-600' : 
                                            strength < 100 ? 'bg-yellow-100 text-yellow-600' : 
                                            'bg-green-100 text-green-600'
                                        }`}>
                                            {strength < 50 ? 'Débil' : strength < 100 ? 'Media' : 'Fuerte'}
                                        </span>
                                    </div>
                                    <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full transition-all duration-500 ${
                                                strength < 50 ? 'bg-red-500' : strength < 100 ? 'bg-yellow-500' : 'bg-green-500'
                                            }`}
                                            style={{ width: `${strength}%` }}
                                        ></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-1 px-1">
                                        <div className={`flex items-center space-x-1 text-[9px] font-bold uppercase ${checkRequirements.length ? 'text-green-600' : 'text-gray-400'}`}>
                                            <span>{checkRequirements.length ? '✓' : '○'}</span> <span>Longevidad</span>
                                        </div>
                                        <div className={`flex items-center space-x-1 text-[9px] font-bold uppercase ${checkRequirements.uppercase ? 'text-green-600' : 'text-gray-400'}`}>
                                            <span>{checkRequirements.uppercase ? '✓' : '○'}</span> <span>Mayúscula</span>
                                        </div>
                                    </div>
                                </div>
                                <InputError message={errors.password} />
                            </div>

                            <div className="space-y-1.5">
                                <InputLabel htmlFor="password_confirmation" value="Confirmar" className="text-gray-700 font-bold text-xs uppercase tracking-wider ms-1" />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="block w-full bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-primary/20 focus:border-primary rounded-2xl py-3 px-4 shadow-sm transition-all text-sm"
                                    autoComplete="new-password"
                                    placeholder="Repite contraseña"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>
                        </div>

                        <div className="pt-2">
                            <PrimaryButton 
                                className="w-full justify-center py-4 rounded-2xl shadow-xl shadow-primary/25 hover:shadow-primary/40 active:scale-[0.98] transition-all bg-primary text-white text-base font-black uppercase tracking-widest" 
                                disabled={processing}
                            >
                                Registrarse
                            </PrimaryButton>
                        </div>

                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-100"></div>
                            </div>
                            <div className="relative flex justify-center text-[10px]">
                                <span className="px-4 bg-white text-gray-400 font-black uppercase tracking-widest">o</span>
                            </div>
                        </div>

                        <a
                            href={route('auth.google')}
                            className="w-full inline-flex items-center justify-center gap-3 py-3 px-6 rounded-2xl border border-gray-100 bg-white hover:bg-gray-50 hover:border-gray-200 active:scale-[0.98] transition-all shadow-sm group"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            <span className="text-gray-700 font-bold group-hover:text-gray-900 transition-colors text-xs uppercase tracking-tight">
                                Google
                            </span>
                        </a>
                    </form>
                     <div className="mt-6 text-center">
                    <p className="text-gray-500 font-medium text-sm">
                        ¿Ya tienes una cuenta?{' '}
                        <Link 
                            href={route('login')} 
                            className="font-extrabold text-primary hover:text-black transition-colors underline decoration-2 underline-offset-4"
                        >
                            Inicia sesión aquí
                        </Link>
                    </p>
                </div>
                </div>

               

                <div className="text-center py-2">
                    <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] font-black">
                        &copy; 2026 Wasion Security
                    </p>
                </div>
            </div>
        </div>
    );
}
