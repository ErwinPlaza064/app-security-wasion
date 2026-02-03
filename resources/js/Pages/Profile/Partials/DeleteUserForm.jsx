import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <div className="bg-red-50 p-6 rounded-[2rem] border border-red-100 mb-6">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-red-100 rounded-xl mt-1">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm text-red-800 font-medium leading-relaxed">
                            Una vez que se elimine tu cuenta, todos sus recursos y datos se eliminarán permanentemente. Por favor, descarga cualquier información que desees conservar antes de proceder.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-50">
                <DangerButton 
                    onClick={confirmUserDeletion}
                    className="px-8 py-3 rounded-2xl shadow-lg shadow-red-500/20 hover:shadow-red-500/30 active:scale-[0.98] transition-all bg-red-600 text-white font-black uppercase tracking-widest text-xs"
                >
                    Eliminar Permanentemente
                </DangerButton>
            </div>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-10 bg-white rounded-[2.5rem]">
                    <div className="flex flex-col items-center text-center space-y-4 mb-8">
                        <div className="p-4 bg-red-50 rounded-full">
                            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                            ¿Confirmar Eliminación?
                        </h2>
                        <p className="text-gray-500 text-sm font-medium">
                            Por favor, introduce tu contraseña para confirmar que deseas eliminar permanentemente tu cuenta. Esta acción no se puede deshacer.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <InputLabel
                                htmlFor="password"
                                value="Contraseña de Confirmación"
                                className="text-gray-700 font-bold text-xs uppercase tracking-wider ms-1"
                            />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                className="block w-full bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-primary/20 focus:border-red-500 rounded-2xl py-3 px-4 shadow-sm transition-all"
                                isFocused
                                placeholder="Escribe tu contraseña"
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col-reverse md:flex-row gap-3">
                        <SecondaryButton 
                            onClick={closeModal}
                            className="flex-1 justify-center py-4 rounded-2xl font-black uppercase tracking-widest text-xs border-2 border-gray-100 hover:bg-gray-50 transition-all"
                        >
                            No, Cancelar
                        </SecondaryButton>

                        <DangerButton 
                            className="flex-1 justify-center py-4 rounded-2xl shadow-xl shadow-red-500/20 hover:shadow-red-500/30 active:scale-[0.98] transition-all bg-red-600 font-black uppercase tracking-widest text-xs" 
                            disabled={processing}
                        >
                            Sí, Eliminar Todo
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
