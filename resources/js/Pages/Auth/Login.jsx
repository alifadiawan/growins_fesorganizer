import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { router } from '@inertiajs/react'
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const [generalError, setGeneralError] = useState('');
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const loginWithGoogle = () => {
        window.location.href = '/oauth/google';
    }

    const submit = (e) => {
        e.preventDefault();

        post('/login', {
            onError: (error) => {
                // Custom error handling for 401 and other messages
                if (error.message) {
                    setData((data) => ({
                        ...data,
                        errors: { general: error.message } // or put it where you want
                    }));
                }
            }
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

            {generalError && (
                <div role="alert" className="border-s-4 border-red-700 bg-red-50 p-4">
                    <div className="flex items-center gap-2 text-red-700">
                        <strong className="font-medium"> Something went wrong </strong>
                    </div>
                    <p className="mt-2 text-sm text-red-700">
                        {generalError}
                    </p>
                </div>
            )}

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


                        <Link onClick={() => loginWithGoogle()} className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg bg-white hover:bg-gray-50 duration-150 active:bg-gray-100">
                            <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_17_40)">
                                    <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                                    <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                                    <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                                    <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_17_40">
                                        <rect width="48" height="48" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            Continue with Google
                        </Link>

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
