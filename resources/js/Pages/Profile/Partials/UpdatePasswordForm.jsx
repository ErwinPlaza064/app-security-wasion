import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <form onSubmit={updatePassword} className="space-y-6">
                <div className="space-y-1.5">
                    <InputLabel
                        htmlFor="current_password"
                        value="Contraseña Actual"
                        className="text-gray-700 font-bold text-xs uppercase tracking-wider ms-1"
                    />

                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) =>
                            setData('current_password', e.target.value)
                        }
                        type="password"
                        className="block w-full bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-primary/20 focus:border-primary rounded-2xl py-3 px-4 shadow-sm transition-all text-sm"
                        autoComplete="current-password"
                        placeholder="••••••••"
                    />

                    <InputError
                        message={errors.current_password}
                        className="mt-2"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                        <InputLabel htmlFor="password" value="Nueva Contraseña" className="text-gray-700 font-bold text-xs uppercase tracking-wider ms-1" />

                        <TextInput
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            type="password"
                            className="block w-full bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-primary/20 focus:border-primary rounded-2xl py-3 px-4 shadow-sm transition-all text-sm"
                            autoComplete="new-password"
                            placeholder="Mínimo 8 caracteres"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="space-y-1.5">
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirmar Contraseña"
                            className="text-gray-700 font-bold text-xs uppercase tracking-wider ms-1"
                        />

                        <TextInput
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            type="password"
                            className="block w-full bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-primary/20 focus:border-primary rounded-2xl py-3 px-4 shadow-sm transition-all text-sm"
                            autoComplete="new-password"
                            placeholder="Repite la nueva contraseña"
                        />

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-50">
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm font-bold text-green-600 uppercase tracking-tighter">✓ Contraseña actualizada</p>
                    </Transition>

                    <PrimaryButton 
                        disabled={processing}
                        className="px-8 py-3 rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all bg-primary text-white font-black uppercase tracking-widest text-xs"
                    >
                        Cambiar Contraseña
                    </PrimaryButton>
                </div>
            </form>
        </section>
    );
}
