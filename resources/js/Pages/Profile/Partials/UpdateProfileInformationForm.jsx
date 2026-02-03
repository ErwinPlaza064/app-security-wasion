import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <form onSubmit={submit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                            <InputLabel htmlFor="name" value="Nombre completo" className="text-gray-700 font-bold text-xs uppercase tracking-wider ms-1" />
                            {user.role !== 'superadmin' && (
                                <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">Solo Lectura</span>
                            )}
                        </div>
                        <TextInput
                            id="name"
                            className={`block w-full rounded-2xl py-3 px-4 shadow-sm transition-all ${
                                user.role === 'superadmin' 
                                ? 'bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-primary/20 focus:border-primary' 
                                : 'bg-gray-100/50 border-gray-100 text-gray-500 cursor-not-allowed'
                            }`}
                            value={data.name}
                            onChange={(e) => user.role === 'superadmin' && setData('name', e.target.value)}
                            required
                            isFocused={user.role === 'superadmin'}
                            autoComplete="name"
                            readOnly={user.role !== 'superadmin'}
                        />
                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                            <InputLabel htmlFor="email" value="Correo electrónico" className="text-gray-700 font-bold text-xs uppercase tracking-wider ms-1" />
                            {user.role !== 'superadmin' && (
                                <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">Solo Lectura</span>
                            )}
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            className={`block w-full rounded-2xl py-3 px-4 shadow-sm transition-all ${
                                user.role === 'superadmin' 
                                ? 'bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-primary/20 focus:border-primary' 
                                : 'bg-gray-100/50 border-gray-100 text-gray-500 cursor-not-allowed'
                            }`}
                            value={data.email}
                            onChange={(e) => user.role === 'superadmin' && setData('email', e.target.value)}
                            required
                            autoComplete="username"
                            readOnly={user.role !== 'superadmin'}
                        />
                        <InputError className="mt-2" message={errors.email} />
                    </div>
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-100">
                        <p className="text-sm text-yellow-800 font-medium">
                            Tu dirección de correo no ha sido verificada.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="ms-2 font-bold text-yellow-900 underline hover:text-yellow-700 transition-colors"
                            >
                                Haz clic aquí para reenviar el correo.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-xs font-bold text-green-600 uppercase tracking-tight">
                                ✓ Se ha enviado un nuevo enlace de verificación.
                            </div>
                        )}
                    </div>
                )}

                {user.role === 'superadmin' && (
                    <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-50">
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm font-bold text-green-600 uppercase tracking-tighter">✓ Cambios guardados</p>
                        </Transition>

                        <PrimaryButton 
                            disabled={processing}
                            className="px-8 py-3 rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all bg-primary text-white font-black uppercase tracking-widest text-xs"
                        >
                            Guardar Cambios
                        </PrimaryButton>
                    </div>
                )}
            </form>
        </section>
    );
}
