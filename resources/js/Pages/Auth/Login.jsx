import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

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
        <div className="min-h-screen flex flex-col items-center justify-center bg-cream font-sans selection:bg-primary selection:text-white p-4">
            <Head title="Iniciar sesión" />

            <div className="w-full max-w-[440px] animate-fade-in-up">
               

                {/* Tarjeta de Login */}
                <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-white">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Bienvenido</h1>
                        <p className="text-gray-500 font-medium text-sm">Ingresa tus credenciales para continuar</p>
                    </div>

                    {/* Mensajes de Estado y Errores Flash */}
                    <div className="space-y-4 mb-6">
                        {status && (
                            <div className="p-4 bg-green-50 border border-green-100 rounded-2xl text-sm font-medium text-green-600 animate-fade-in text-center">
                                {status}
                            </div>
                        )}
                        
                        {usePage().props.flash?.error && (
                            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-sm font-medium text-red-600 animate-fade-in text-center">
                                {usePage().props.flash.error}
                            </div>
                        )}
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        <div className="space-y-1.5">
                            <InputLabel htmlFor="email" value="Correo electrónico" className="text-gray-700 font-bold text-xs uppercase tracking-wider ms-1" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="block w-full bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-primary/20 focus:border-primary rounded-2xl py-3 px-4 shadow-sm transition-all"
                                autoComplete="username"
                                isFocused={true}
                                placeholder="nombre@ejemplo.com"
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center ms-1">
                                <InputLabel htmlFor="password" value="Contraseña" className="text-gray-700 font-bold text-xs uppercase tracking-wider" />
                                {canResetPassword && (
                                    <Link href={route('password.request')} className="text-xs text-primary hover:underline font-bold">
                                        ¿La olvidaste?
                                    </Link>
                                )}
                            </div>
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="block w-full bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-primary/20 focus:border-primary rounded-2xl py-3 px-4 shadow-sm transition-all"
                                autoComplete="current-password"
                                placeholder="••••••••"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="flex items-center ms-1 pt-1">
                            <label className="flex items-center cursor-pointer group">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ms-3 text-xs text-gray-500 group-hover:text-primary transition-colors font-bold uppercase tracking-tight">
                                    Mantenerme conectado
                                </span>
                            </label>
                        </div>

                        <div className="pt-2">
                            <PrimaryButton 
                                className="w-full justify-center py-4 rounded-2xl shadow-xl shadow-primary/25 hover:shadow-primary/40 active:scale-[0.98] transition-all bg-primary text-white text-base font-black uppercase tracking-widest" 
                                disabled={processing}
                            >
                                Iniciar Sesión
                            </PrimaryButton>
                        </div>

                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-100"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-4 bg-white text-gray-400 font-bold uppercase tracking-widest">o</span>
                            </div>
                        </div>

                        <a
                            href={route('auth.google')}
                            className="w-full inline-flex items-center justify-center gap-3 py-3.5 px-6 rounded-2xl border border-gray-100 bg-white hover:bg-gray-50 hover:border-gray-200 active:scale-[0.98] transition-all shadow-sm group"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            <span className="text-gray-700 font-bold group-hover:text-gray-900 transition-colors text-sm uppercase tracking-tight">
                                Google
                            </span>
                        </a>
                    </form>
                      <div className="mt-8 text-center">
                    <p className="text-gray-500 font-medium text-sm">
                        ¿No tienes una cuenta?{' '}
                        <Link 
                            href={route('register')} 
                            className="font-extrabold text-primary hover:text-black transition-colors underline decoration-2 underline-offset-4"
                        >
                            Regístrate gratis
                        </Link>
                    </p>
                </div>
                </div>

              

                {/* Footer simple */}
                <div className="text-center py-2">
                    <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] font-black">
                        &copy; 2026 Wasion Security
                    </p>
                </div>
            </div>
        </div>
    );
}
