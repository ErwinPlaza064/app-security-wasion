import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="min-h-screen flex bg-cream font-sans selection:bg-primary selection:text-white">
            <Head title="¿Olvidaste tu contraseña?" />

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
                        <h2 className="text-sm uppercase tracking-[0.3em] font-semibold opacity-70">Recuperación de Acceso</h2>
                        <h1 className="text-6xl font-bold leading-tight">No te preocupes.</h1>
                        <p className="text-xl font-light opacity-80 max-w-md">Te ayudaremos a recuperar el acceso a tu cuenta de forma segura y rápida.</p>
                    </div>
                </div>

                {/* Decorative circles */}
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-white/5 blur-3xl"></div>
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
                            <p className="text-gray-500 leading-relaxed">
                                Dinos tu dirección de correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                            </p>
                        </div>
                    </div>

                    {status && (
                        <div className="p-4 bg-green-50 border border-green-100 rounded-xl text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-1">
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="block w-full bg-white border-gray-200 focus:ring-primary/20 focus:border-primary rounded-2xl py-3 px-4 shadow-sm transition-all"
                                isFocused={true}
                                placeholder="tu-email@servidor.com"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="pt-2">
                            <PrimaryButton 
                                className="w-full justify-center py-4 rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all bg-primary text-lg font-bold" 
                                disabled={processing}
                            >
                                Enviar Enlace de Recuperación
                            </PrimaryButton>
                        </div>
                    </form>

                    <div className="pt-4 text-center">
                        <Link 
                            href={route('login')} 
                            className="font-bold text-primary hover:text-primary-light transition-colors"
                        >
                            Volver al inicio de sesión
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
