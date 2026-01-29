import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="¿Olvidaste tu contraseña?" />

            <div className="mb-6 text-sm text-gray-500 leading-relaxed">
                ¿Olvidaste tu contraseña? No hay problema. Solo dinos tu dirección de correo electrónico 
                y te enviaremos un enlace para restablecerla que te permitirá elegir una nueva.
            </div>

            {status && (
                <div className="mb-6 p-4 rounded-xl bg-green-50 text-sm font-medium text-green-600 border border-green-100">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div className="space-y-6">
                    <div>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full bg-white/50"
                            isFocused={true}
                            placeholder="nombre@ejemplo.com"
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="pt-2">
                        <PrimaryButton className="w-full justify-center" disabled={processing}>
                            Enviar enlace
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
