import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        // <GuestLayout>
        //     <Head title="Register" />

        //     <form onSubmit={submit}>
        //         <div>
        //             <InputLabel htmlFor="name" value="Name" />

        //             <TextInput
        //                 id="name"
        //                 name="name"
        //                 value={data.name}
        //                 className="mt-1 block w-full"
        //                 autoComplete="name"
        //                 isFocused={true}
        //                 onChange={(e) => setData('name', e.target.value)}
        //                 required
        //             />

        //             <InputError message={errors.name} className="mt-2" />
        //         </div>

        //         <div className="mt-4">
        //             <InputLabel htmlFor="email" value="Email" />

        //             <TextInput
        //                 id="email"
        //                 type="email"
        //                 name="email"
        //                 value={data.email}
        //                 className="mt-1 block w-full"
        //                 autoComplete="username"
        //                 onChange={(e) => setData('email', e.target.value)}
        //                 required
        //             />

        //             <InputError message={errors.email} className="mt-2" />
        //         </div>

        //         <div className="mt-4">
        //             <InputLabel htmlFor="password" value="Password" />

        //             <TextInput
        //                 id="password"
        //                 type="password"
        //                 name="password"
        //                 value={data.password}
        //                 className="mt-1 block w-full"
        //                 autoComplete="new-password"
        //                 onChange={(e) => setData('password', e.target.value)}
        //                 required
        //             />

        //             <InputError message={errors.password} className="mt-2" />
        //         </div>

        //         <div className="mt-4">
        //             <InputLabel
        //                 htmlFor="password_confirmation"
        //                 value="Confirm Password"
        //             />

        //             <TextInput
        //                 id="password_confirmation"
        //                 type="password"
        //                 name="password_confirmation"
        //                 value={data.password_confirmation}
        //                 className="mt-1 block w-full"
        //                 autoComplete="new-password"
        //                 onChange={(e) =>
        //                     setData('password_confirmation', e.target.value)
        //                 }
        //                 required
        //             />

        //             <InputError
        //                 message={errors.password_confirmation}
        //                 className="mt-2"
        //             />
        //         </div>

        //         <div className="mt-4 flex items-center justify-end">
        //             <Link
        //                 href={route('login')}
        //                 className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        //             >
        //                 Already registered?
        //             </Link>

        //             <PrimaryButton className="ms-4" disabled={processing}>
        //                 Register
        //             </PrimaryButton>
        //         </div>
        //     </form>
        // </GuestLayout>
        <div className="min-h-screen bg-[#0e9b8a] flex flex-col md:flex-row">
            {/* Left side - Branding */}
            <div className="hidden md:flex md:w-1/2 bg-[#0e9b8a] items-center justify-center p-8">
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

            {/* Right side - Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-6 bg-[#1a1a2e] p-8 rounded-xl shadow-lg">
                    <div className="text-center">
                        <Link href="/" className="inline-block">
                            <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YLUST8C58r5MDsqRPuLQYc4uzH7ahp.png"
                                alt="Growins Logo"
                                width={180}
                                height={60}
                                className="mx-auto"
                            />
                        </Link>
                        <h2 className="mt-6 text-3xl font-bold text-white">Daftar Sekarang</h2>
                        <p className="mt-2 text-gray-300">Buat akun baru untuk memulai perjalanan Anda</p>
                    </div>

                    <form onSubmit={submit} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-200">
                                    Nama Lengkap
                                </label>
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                                    Email
                                </label>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                                    Password
                                </label>
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200">
                                    Konfirmasi Password
                                </label>
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData('password_confirmation', e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    className="h-4 w-4 text-[#0e9b8a] focus:ring-[#0e9b8a] border-gray-600 rounded bg-[#252538]"
                                />
                                <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                                    Saya setuju dengan{" "}
                                    <Link href="/terms" className="text-[#ffcc00] hover:underline">
                                        Syarat dan Ketentuan
                                    </Link>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-black font-bold bg-[#ffcc00] hover:bg-[#e6b800] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffcc00] transition-colors"
                        >
                            Daftar Sekarang
                        </button>

                        <div className="text-center mt-4">
                            <p className="text-sm text-gray-300">
                                Sudah punya akun?{" "}
                                <Link href="/login" className="text-[#ffcc00] hover:underline font-medium">
                                    Masuk
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
