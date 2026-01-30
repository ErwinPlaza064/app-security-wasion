import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen flex bg-cream font-sans selection:bg-primary selection:text-white">
            <Head title="Restablecer contraseña" />

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
                        <h2 className="text-sm uppercase tracking-[0.3em] font-semibold opacity-70">Seguridad de Cuenta</h2>
                        <h1 className="text-6xl font-bold leading-tight">Nueva Contraseña.</h1>
                        <p className="text-xl font-light opacity-80 max-w-md">Establece una clave fuerte y segura para proteger tu acceso al sistema.</p>
                    </div>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12">
                <div className="w-full max-w-md space-y-12 animate-fade-in-up">
                    <div className="space-y-4">
                        <Link href="/" className="inline-block">
                            <h2 className="text-2xl font-bold text-primary tracking-tight">Wasion Security</h2>
                        </Link>
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold text-gray-900">Restablecer</h1>
                            <p className="text-gray-500">Por favor, establece tu nueva contraseña a continuación.</p>
                        </div>
                    </div>

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
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="space-y-1">
                            <InputLabel htmlFor="password" value="Nueva Contraseña" className="text-gray-700 font-medium ms-1" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="block w-full bg-white border-gray-200 focus:ring-primary/20 focus:border-primary rounded-2xl py-3 px-4 shadow-sm transition-all"
                                autoComplete="new-password"
                                isFocused={true}
                                placeholder="••••••••"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="space-y-1">
                            <InputLabel htmlFor="password_confirmation" value="Confirmar Nueva Contraseña" className="text-gray-700 font-medium ms-1" />
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

                        <div className="pt-2">
                            <PrimaryButton 
                                className="w-full justify-center py-4 rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all bg-primary text-lg font-bold" 
                                disabled={processing}
                            >
                                Cambiar Contraseña
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
