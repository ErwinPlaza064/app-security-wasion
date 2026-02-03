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
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdfcf9] font-sans selection:bg-primary selection:text-white p-6 relative overflow-hidden">
            {/* Fondo decorativo minimalista */}
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-primary/20 to-transparent"></div>
            <div className="absolute -top-[15%] -left-[5%] w-[35%] h-[35%] bg-primary/[0.03] rounded-full blur-3xl"></div>
            <div className="absolute -bottom-[15%] -right-[5%] w-[35%] h-[35%] bg-primary/[0.03] rounded-full blur-3xl"></div>

            <Head title="Registro de Personal" />

            <div className="w-full max-w-[460px] z-10 lighthouse-wrapper">

                {/* Tarjeta de Registro - Nítida y Profesional */}
                <div className="rounded-2xl lighthouse-card border border-gray-100 overflow-hidden relative">
                    <div className="p-8 md:p-10">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">Crear Cuenta</h1>
                            <p className="text-gray-400 font-medium text-sm">Regístrate para acceder al ecosistema de seguridad</p>
                        </div>

                        {/* Errores Flash */}
                        {usePage().props.flash?.error && (
                            <div className="mb-6 p-4 bg-red-50/50 border border-red-100 rounded-xl text-xs font-bold text-red-600 animate-fade-in flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                {usePage().props.flash.error}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-5">
                            <div className="space-y-2 searchlight-field">
                                <InputLabel htmlFor="name" value="Nombre completo" className="text-gray-500 font-black text-[10px] uppercase tracking-[0.1em] ms-0.5" />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="block w-full bg-gray-50 border-gray-100 focus:bg-white focus:ring-primary/10 focus:border-primary rounded-xl py-3.5 px-4 shadow-sm transition-all text-sm outline-none searchlight-input"
                                    autoComplete="name"
                                    isFocused={true}
                                    placeholder="Nombre y apellido"
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="text-[10px] font-bold" />
                            </div>

                            <div className="space-y-2 searchlight-field">
                                <InputLabel htmlFor="email" value="Correo institucional" className="text-gray-500 font-black text-[10px] uppercase tracking-[0.1em] ms-0.5" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="block w-full bg-gray-50 border-gray-100 focus:bg-white focus:ring-primary/10 focus:border-primary rounded-xl py-3.5 px-4 shadow-sm transition-all text-sm outline-none searchlight-input"
                                    autoComplete="username"
                                    placeholder="email@wasion.com"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="text-[10px] font-bold" />
                            </div>

                            <div className="grid grid-cols-1 gap-5">
                                <div className="space-y-2 searchlight-field">
                                    <InputLabel htmlFor="password" value="Contraseña segura" className="text-gray-500 font-black text-[10px] uppercase tracking-[0.1em] ms-0.5" />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="block w-full bg-gray-50 border-gray-100 focus:bg-white focus:ring-primary/10 focus:border-primary rounded-xl py-3.5 px-4 shadow-sm transition-all text-sm outline-none searchlight-input"
                                        autoComplete="new-password"
                                        placeholder="Mínimo 8 caracteres"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                    
                                    {/* Indicador de Fuerza - Minimalista */}
                                    <div className="mt-3 p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                                        <div className="flex justify-between items-center mb-2 px-0.5">
                                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Complejidad</span>
                                            <span className={`text-[9px] font-black px-2 py-0.5 rounded-lg uppercase transition-all duration-300 ${
                                                strength < 50 ? 'text-red-500' : strength < 100 ? 'text-yellow-600' : 'text-green-600'
                                            }`}>
                                                {strength < 50 ? 'Insegura' : strength < 100 ? 'Regular' : 'Excelente'}
                                            </span>
                                        </div>
                                        <div className="h-1 w-full bg-gray-200/50 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full transition-all duration-700 ease-out ${
                                                    strength < 50 ? 'bg-red-500' : strength < 100 ? 'bg-yellow-500' : 'bg-green-500'
                                                }`}
                                                style={{ width: `${strength}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <InputError message={errors.password} className="text-[10px] font-bold" />
                                </div>

                                <div className="space-y-2 searchlight-field">
                                    <InputLabel htmlFor="password_confirmation" value="Verificar Contraseña" className="text-gray-500 font-black text-[10px] uppercase tracking-[0.1em] ms-0.5" />
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="block w-full bg-gray-50 border-gray-100 focus:bg-white focus:ring-primary/10 focus:border-primary rounded-xl py-3.5 px-4 shadow-sm transition-all text-sm outline-none searchlight-input"
                                        autoComplete="new-password"
                                        placeholder="Repite la contraseña"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.password_confirmation} className="text-[10px] font-bold" />
                                </div>
                            </div>

                            <div className="pt-3">
                                <PrimaryButton 
                                    className="w-full justify-center py-4 rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:bg-[#07104d] active:scale-[0.98] transition-all bg-primary text-white text-xs font-black uppercase tracking-[0.2em]" 
                                    disabled={processing}
                                >
                                    Crear ID de Seguridad
                                </PrimaryButton>
                            </div>

                            <div className="relative py-2 px-10">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-50"></div>
                                </div>
                                <div className="relative flex justify-center text-[8px]">
                                    <span className="px-3 bg-white text-gray-300 font-black uppercase tracking-[0.3em]">o vía corporativa</span>
                                </div>
                            </div>

                            <a
                                href={route('auth.google')}
                                className="w-full inline-flex items-center justify-center gap-3 py-3 px-6 rounded-xl border border-gray-100 bg-white hover:bg-gray-50 active:scale-[0.98] transition-all group"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                </svg>
                                <span className="text-gray-500 font-bold group-hover:text-primary transition-colors text-[10px] uppercase tracking-widest">Google Auth</span>
                            </a>
                        </form>
                    </div>

                    <div className="bg-gray-50/50 p-6 border-t border-gray-100 text-center">
                        <p className="text-gray-500 font-medium text-xs">
                            ¿Ya formas parte?{' '}
                            <Link 
                                href={route('login')} 
                                className="font-black text-primary hover:text-black transition-colors underline decoration-primary/20 decoration-2 underline-offset-4"
                            >
                                Identifícate aquí
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="text-center mt-10">
                    <p className="text-[9px] text-gray-300 uppercase tracking-[0.5em] font-black underline decoration-gray-100 decoration-1 underline-offset-8">
                        Wasion Security System &bull; 2026
                    </p>
                </div>
            </div>
        </div>
    );
}
