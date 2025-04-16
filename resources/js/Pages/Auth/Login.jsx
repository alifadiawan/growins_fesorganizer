import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { router } from '@inertiajs/react'

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
        <div className="min-h-screen bg-gradient-to-b from-[#128884] to-[#03B5AA] flex flex-col md:flex-row">

            <div className="hidden md:flex md:w-1/2 bg-gradient-to-b from-[#128884] to-[#03B5AA] items-center justify-center p-8">
                <div className="max-w-md text-white text-center">
                    <h1 className="text-4xl font-bold mb-6">Empower Your Future with GROW</h1>
                    <p className="text-lg mb-8">
                        Tingkatkan keterampilan komunikasi, kepemimpinan, dan pengelolaan diri melalui workshop kami yang interaktif
                        dan aplikatif.
                    </p>
                    <div className="mt-8">
                        <img src="/robot.png" alt="Growins Mascot" width={300} height={300} className="mx-auto" />
                    </div>
                </div>
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-center p-8">

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <div className="w-full max-w-md space-y-8 bg-white/20 backdrop-blur-sm p-8 rounded-xl shadow-lg">
                    <div className="text-center">
                        <Link href="/" className="inline-block">
                            <img src="/LOGOGROWINS.png" alt="Growins Logo" width={150} height={50} className="mx-auto" />
                        </Link>
                        <h2 className="mt-6 text-3xl font-bold text-white">Selamat Datang Kembali</h2>
                        <p className="mt-2 text-zinc-100">Masuk ke akun Anda untuk melanjutkan</p>
                    </div>

                    <form onSubmit={submit} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-white">
                                    Email
                                </label>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />

                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div>
                                <div className="flex justify-between items-center">
                                    <label htmlFor="password" className="block text-sm font-medium text-white">
                                        Password
                                    </label>
                                    {canResetPassword && (
                                        <Link href={route('password.request')} className="text-sm text-[#ffcc00] hover:text-[#e6b800] hover:underline">
                                            Lupa Password?
                                        </Link>
                                    )}
                                </div>
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />

                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="flex items-center">
                                <div className="flex items-center">
                                    <Checkbox
                                        name="remember-me"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData('remember', e.target.checked)
                                        }
                                        className="h-4 w-4 text-[#0e9b8a] focus:ring-[#0e9b8a] border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                                        Ingat saya
                                    </label>
                                </div>
                            </div>
                        </div>

                        <PrimaryButton
                            disabled={processing}
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-black font-bold bg-[#ffcc00] hover:bg-[#e6b800] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffcc00] transition-colors"
                        >
                            Masuk
                        </PrimaryButton>

                        <div className="text-center mt-4">
                            <p className="text-sm text-gray-600">
                                Belum punya akun?{" "}
                                <Link href="/register" className="text-[#ffcc00] hover:underline font-medium">
                                    Daftar Sekarang
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}
