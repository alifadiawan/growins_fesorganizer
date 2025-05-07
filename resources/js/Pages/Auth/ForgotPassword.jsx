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
        <>
            <Head title="Forgot Password" />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-900 to-teal-600 ">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                        Forgot Your Password?
                    </h2>

                    <p className="mb-4 text-sm text-gray-600 text-center">
                        No problem. Just let us know your email address and we'll send you a link to reset your password.
                    </p>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600 text-center">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            isFocused
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />

                        <div className="mt-6 flex justify-center">
                            <button className="px-6 py-2 rounded-md text-black font-bold bg-[#ffcc00] hover:bg-[#e6b800]" disabled={processing}>
                                Email Password Reset Link
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>

    );
}
