import GuestLayout from '@/Layouts/GuestLayout';
import { Link, usePage } from '@inertiajs/react';
import React, { useState } from 'react'

const Impact = () => {
    const auth = usePage().props.auth;

    const [formData, setFormData] = useState({
        full_name: "",
        jurusan: "",
        asal_kampus: "",
        whatsapp_number: "",
        username_ig: "",
        city: "",
        province: "",
        email: "",
        bootcamp_id: "",
        cv: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, cv: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();

        for (const key in formData) {
            if (formData[key]) {
                form.append(key, formData[key]);
            }
        }

        try {
            const response = await axios.post(route('bootcamp_registrations.store'), form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('Registration successful!');
            // Optionally reset the form or redirect
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                const errors = error.response.data.errors;
                console.error('Validation errors:', errors);
                alert('Validation error occurred. Please check your input.');
            } else {
                console.error('Submission failed:', error);
                alert('An error occurred during submission.');
            }
        }
    };



    return (
        <GuestLayout
            navbarProps={{
                isTransparent: false, // Disable transparency
                customBgColor: 'bg-gray-900', // Custom background color
            }}
        >
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 font-sans">
                {/* Header - Improved with better spacing and shadow
                <header className="sticky top-0 z-50 bg-black/70 backdrop-blur-md py-4 shadow-lg">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-green-500 rounded-full mr-3 flex items-center justify-center shadow-lg shadow-green-500/30">
                                    <span className="text-black font-bold text-lg">G</span>
                                </div>
                                <span className="text-white text-xl font-bold tracking-tight">Grow Insight</span>
                            </div>
                            <nav className="hidden md:flex space-x-6">
                                <a href="#benefits" className="text-gray-300 hover:text-green-400 transition-colors">
                                    Benefits
                                </a>
                                <a href="#details" className="text-gray-300 hover:text-green-400 transition-colors">
                                    Details
                                </a>
                                <a href="#register" className="text-gray-300 hover:text-green-400 transition-colors">
                                    Register
                                </a>
                            </nav>
                        </div>
                    </div>
                </header> */}

                {/* Hero Section - Improved with better typography and visual hierarchy */}
                <div className="container mx-auto px-4 py-16 md:py-24">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="text-white">
                            <div className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold mb-6 border border-green-500/30">
                                GROWINS IMPACT : Improving Public Speaking And Career Tool
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                <span className="text-green-400">IMPACT</span>
                                <br />
                                <span className="text-white">Improving</span>{" "}
                                <span className="inline-block bg-green-500 px-3 py-1 text-black rounded-md mt-2">Public Speaking</span>
                                <br />
                                <span className="text-white">And Career Tools</span>
                            </h1>
                            <p className="text-xl mb-8 text-gray-300 max-w-xl">Communication & CV Optimization for New Career Track</p>

                            <div className="bg-gray-800/70 p-6 rounded-xl mb-8 border border-gray-700 shadow-xl backdrop-blur-sm">
                                <h2 className="text-2xl font-bold text-green-400 mb-4 flex items-center">
                                    <span className="inline-block w-2 h-8 bg-green-400 mr-3 rounded-full"></span>
                                    Pernah Merasa Seperti Ini?
                                </h2>
                                <ul className="space-y-4 text-gray-300">
                                    {[
                                        "Bingung harus ngomong apa saat wawancara kerja?",
                                        "Malu dan grogi setiap kali presentasi di kelas?",
                                        "CV sudah dibuat, tapi gak pernah dipanggil HRD?",
                                        "Lulus kuliah tapi belum siap bersaing di dunia kerja?",
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-start group">
                                            <span className="text-red-400 mr-3 text-lg group-hover:text-green-400 transition-colors">●</span>
                                            <span className="group-hover:text-white transition-colors">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-xl mb-8 relative overflow-hidden shadow-lg">
                                <div className="absolute -right-10 -top-10 w-40 h-40 bg-green-500/10 rounded-full blur-2xl"></div>
                                <p className="text-green-300 relative z-10">
                                    <strong className="text-green-400 text-lg">Gak usah takut, kamu gak sendiri kok!</strong> Dikutip dari
                                    CNBC News, <strong className="text-white">75% orang dewasa</strong> masih merasakan{" "}
                                    <strong className="text-white">KETAKUTAN DI DEPAN UMUM!</strong> Saatnya kamu{" "}
                                    <strong className="text-white">JADI LEBIH BAIK</strong> bersama CONNECTION SELF DEVELOPMENT PROGRAM!
                                </p>
                            </div>

                            {auth.user ? (
                                <a
                                    href={route('user.workshops')}
                                    className="inline-block bg-green-500 hover:bg-green-600 text-black font-bold py-4 px-8 rounded-lg text-xl transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:translate-y-[-2px]"
                                >
                                    DAFTAR SEKARANG
                                </a>
                            ) : (
                                <a
                                    href={route('login')}
                                    className="inline-block bg-green-500 hover:bg-green-600 text-black font-bold py-4 px-8 rounded-lg text-xl transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:translate-y-[-2px]"
                                >
                                    DAFTAR SEKARANG
                                </a>
                            )}
                        </div>

                        {/* Right Content - Improved microphone visualization */}
                        <div className="flex justify-center">
                            <div className="w-80 h-80 bg-gradient-to-b from-gray-700 to-gray-900 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.3)] relative group">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500/10 to-transparent opacity-60 animate-pulse"></div>
                                <div className="w-24 h-64 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full relative overflow-hidden group-hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-all duration-500">
                                    <div className="absolute top-4 left-2 right-2 space-y-2">
                                        {[...Array(8)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="h-2 bg-gray-300 rounded animate-pulse"
                                                style={{ animationDelay: `${i * 0.1}s` }}
                                            ></div>
                                        ))}
                                    </div>
                                    <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                                        <div className="w-8 h-8 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
                                    </div>
                                </div>
                                {/* Sound waves animation */}
                                {[...Array(3)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="absolute rounded-full border border-green-500/30 animate-ping"
                                        style={{
                                            width: `${(i + 1) * 30}%`,
                                            height: `${(i + 1) * 30}%`,
                                            animationDuration: `${3 + i}s`,
                                            animationDelay: `${i * 0.5}s`,
                                        }}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Benefits Section - Improved with better cards and animations */}
                <div id="benefits" className="bg-black/50 py-20 backdrop-blur-sm">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <span className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold mb-4">
                                BENEFITS
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Bayangkan Kalau Kamu Bisa...</h2>
                            <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                "Tampil percaya diri saat bicara di depan umum",
                                "Lancar menjawab pertanyaan wawancara kerja",
                                "Punya CV yang bikin HRD tertarik dalam hitungan detik",
                                "Siap masuk dunia kerja dengan percaya diri & branding kuat",
                            ].map((benefit, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-800/50 p-8 rounded-xl text-center border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 hover:translate-y-[-5px] group"
                                >
                                    <div className="text-green-400 text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                        ✅
                                    </div>
                                    <p className="text-white text-lg">{benefit}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Program Benefits - Improved with better layout and visual elements */}
                <div className="container mx-auto px-4 py-20">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Benefits List */}
                        <div className="bg-gray-800/70 p-8 rounded-xl border border-gray-700 shadow-xl backdrop-blur-sm relative overflow-hidden">
                            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"></div>
                            <h3 className="text-3xl font-bold text-white mb-8 flex items-center">
                                <span className="inline-block w-2 h-8 bg-green-400 mr-3 rounded-full"></span>
                                Program Benefits
                            </h3>
                            <ul className="space-y-5 text-gray-300 relative z-10">
                                {[
                                    "Personal & Group Skill Coaching",
                                    "CV & LinkedIn Review Online",
                                    "Public Speaking Simulation",
                                    "Project Assignments",
                                    "Career Tools Kit",
                                    "Networking Group",
                                    "Sertifikat Digital + Hadiah Spesial",
                                    "Internship Gateway (Bagi Peserta yang terpilih)",
                                ].map((benefit, index) => (
                                    <li key={index} className="flex items-start group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mr-4 group-hover:bg-green-500 transition-colors">
                                            <span className="text-green-400 group-hover:text-black transition-colors">✓</span>
                                        </span>
                                        <span className="group-hover:text-white transition-colors">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Free Offer - Improved with better visual hierarchy */}
                        <div className="bg-gradient-to-br from-green-600/90 to-green-800/90 p-8 rounded-xl text-white shadow-2xl border border-green-500/30 relative overflow-hidden">
                            <div className="absolute -left-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
                            <div className="absolute right-8 top-8 flex flex-col items-end z-10">
                                <div className="relative">
                                    <span className="text-6xl font-bold">GRATIS</span>
                                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-sm animate-pulse">
                                        NEW
                                    </div>
                                </div>
                                <div className="text-2xl font-bold">LIMITED</div>
                                <div className="text-2xl font-bold">SEAT</div>
                            </div>

                            <h3 className="text-2xl font-bold mb-6 mt-20 relative z-10">Syarat Dan Ketentuan</h3>
                            <ul className="space-y-4 text-sm relative z-10">
                                {[
                                    "Mengisi Formulir di link berikut",
                                    "Melampirkan CV di Formulir",
                                    "Bersedia Mengikuti Program dari awal hingga akhir",
                                    "Khusus Mahasiswa dan Fresh Graduate",
                                    "Wajib Follow akun instagram @growins.id",
                                ].map((requirement, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mr-3">
                                            <span className="text-white text-xs">{index + 1}</span>
                                        </span>
                                        {requirement}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8 pt-6 border-t border-white/20 relative z-10">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-white/70">Pendaftaran ditutup dalam</p>
                                        <p className="text-xl font-bold">3 hari : 12 jam : 45 menit</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Event Details - Improved with better cards and icons */}
                <div id="details" className="bg-black/50 py-20 backdrop-blur-sm">
                    <div className="container mx-auto px-4 text-center">
                        <div className="max-w-4xl mx-auto">
                            <span className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold mb-4">
                                EVENT DETAILS
                            </span>
                            <h2 className="text-4xl font-bold text-white mb-12">Detail Acara</h2>

                            <div className="grid md:grid-cols-3 gap-6 mb-16">
                                <div className="bg-gray-800/70 p-6 rounded-xl border border-gray-700 hover:border-green-500/50 transition-all duration-300 group">
                                    <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition-colors">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-8 w-8 text-green-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Tanggal</h3>
                                    <p className="text-green-400 text-lg">11-12 Juli 2025</p>
                                </div>

                                <div className="bg-gray-800/70 p-6 rounded-xl border border-gray-700 hover:border-green-500/50 transition-all duration-300 group">
                                    <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition-colors">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-8 w-8 text-green-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Waktu</h3>
                                    <p className="text-green-400 text-lg">09.00 - Selesai WIB</p>
                                </div>

                                <div className="bg-gray-800/70 p-6 rounded-xl border border-gray-700 hover:border-green-500/50 transition-all duration-300 group">
                                    <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition-colors">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-8 w-8 text-green-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Lokasi</h3>
                                    <p className="text-green-400 text-lg">Zoom Meeting</p>
                                </div>
                            </div>

                            {/* Instructor - Improved with better layout and visual elements */}
                            <div className="bg-gray-800/70 p-8 rounded-xl border border-gray-700 shadow-xl backdrop-blur-sm">
                                <div className="flex flex-col md:flex-row items-center gap-8">
                                    <img src='https://media.licdn.com/dms/image/v2/D5603AQHKh4FBriuQ-A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1704884229994?e=1753315200&v=beta&t=sxqJh9q4rueuj8XjDvMoPO13ZqEnrAbWNvhy3q0kEyQ' className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-4xl font-bold text-white shadow-lg shadow-green-500/30" />
                                    <div className="text-left">
                                        <div className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold mb-2">
                                            INSTRUCTOR
                                        </div>
                                        <h3 className="text-3xl font-bold text-white mb-2">Helmi Kahaf</h3>
                                        <p className="text-green-300 text-lg mb-2">Public Speaking Trainer & Career Coach</p>
                                        <p className="text-green-300 mb-4">Founder @kahafbrothers</p>
                                        <p className="text-gray-300 max-w-xl">
                                            Seorang pelatih komunikasi publik dan coach pengembangan karier yang telah membantu ratusan
                                            mahasiswa dan fresh graduate tampil lebih percaya diri di dunia profesional. Sudah melatih lebih
                                            dari 50 orang hingga berhasil.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Registration Form */}
                <div id="register" className="container mx-auto px-4 py-20">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <span className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold mb-4">
                                REGISTRATION
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Siap Jadi Mahasiswa yang Lebih Siap Kerja?
                            </h2>
                            <p className="text-green-400 text-xl">Kuota hanya untuk 100 peserta pertama!</p>
                            <div className="w-24 h-1 bg-green-500 mx-auto rounded-full mt-6"></div>
                        </div>

                        <div className="bg-gray-800/70 p-8 md:p-10 rounded-xl border border-gray-700 shadow-2xl backdrop-blur-sm relative overflow-hidden">
                            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"></div>
                            <div className="absolute -right-20 -top-20 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"></div>

                            <h3 className="text-2xl font-bold text-green-400 mb-8 text-center relative z-10">Formulir Pendaftaran</h3>

                            <div className="flex justify-center">
                                {auth.user ? (
                                    <Link
                                        href={route('user.workshops')}
                                        className="inline-flex items-center justify-center w-full md:w-auto px-8 py-4 text-xl font-bold text-black bg-gradient-to-r from-green-400 to-green-500 rounded-lg transform transition-all duration-300 hover:scale-[1.02] hover:from-green-500 hover:to-green-600 active:scale-[0.98] relative group overflow-hidden shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            <span>DAFTAR SEKARANG</span>
                                            <svg
                                                className="w-5 h-5 transform transition-transform group-hover:translate-x-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                                />
                                            </svg>
                                        </span>
                                        <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center justify-center w-full md:w-auto px-8 py-4 text-xl font-bold text-black bg-gradient-to-r from-green-400 to-green-500 rounded-lg transform transition-all duration-300 hover:scale-[1.02] hover:from-green-500 hover:to-green-600 active:scale-[0.98] relative group overflow-hidden shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            <span>DAFTAR SEKARANG</span>
                                            <svg
                                                className="w-5 h-5 transform transition-transform group-hover:translate-x-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                                />
                                            </svg>
                                        </span>
                                        <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                                    </Link>
                                )}
                            </div>

                            <div className="mt-6 text-center text-gray-400 text-sm relative z-10">
                                Dengan mendaftar, kamu setuju dengan syarat dan ketentuan program
                            </div>
                        </div>
                    </div>
                </div>

                {/* Testimonials Section - Added new section */}
                <div className="bg-black/50 py-20 backdrop-blur-sm">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <span className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold mb-4">
                                TESTIMONIALS
                            </span>
                            <h2 className="text-4xl font-bold text-white mb-6">Apa Kata Mereka?</h2>
                            <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {[
                                {
                                    name: "Dina Pratiwi",
                                    role: "UI/UX Designer",
                                    text: "Program ini benar-benar mengubah cara saya berkomunikasi. Sekarang saya lebih percaya diri saat presentasi!",
                                },
                                {
                                    name: "Budi Santoso",
                                    role: "Fresh Graduate",
                                    text: "Berkat program ini, CV saya jadi lebih menarik dan saya berhasil mendapatkan panggilan interview dari perusahaan impian.",
                                },
                                {
                                    name: "Anisa Rahma",
                                    role: "Marketing Intern",
                                    text: "Saya belajar banyak teknik public speaking yang praktis. Sekarang berbicara di depan umum bukan lagi momok menakutkan.",
                                },
                            ].map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-green-500/30 transition-all duration-300 group"
                                >
                                    <div className="flex flex-col h-full">
                                        <div className="mb-4">
                                            <svg className="h-8 w-8 text-green-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                            </svg>
                                            <p className="text-gray-300 italic">{testimonial.text}</p>
                                        </div>
                                        <div className="mt-auto pt-4 border-t border-gray-700">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold mr-3">
                                                    {testimonial.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white">{testimonial.name}</p>
                                                    <p className="text-green-400 text-sm">{testimonial.role}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* FAQ Section - Added new section */}
                <div className="container mx-auto px-4 py-20">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold mb-4">
                            FAQ
                        </span>
                        <h2 className="text-4xl font-bold text-white mb-6">Pertanyaan Umum</h2>
                        <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        {[
                            {
                                question: "Apakah program ini benar-benar gratis?",
                                answer: "Ya, program ini 100% gratis untuk 100 pendaftar pertama yang memenuhi syarat dan ketentuan.",
                            },
                            {
                                question: "Apakah saya akan mendapatkan sertifikat?",
                                answer:
                                    "Ya, peserta yang menyelesaikan program akan mendapatkan sertifikat digital yang bisa digunakan untuk portofolio.",
                            },
                            {
                                question: "Berapa lama durasi program ini?",
                                answer:
                                    "Program berlangsung selama 2 hari penuh dari pagi hingga sore, dengan materi yang padat dan praktis.",
                            },
                            {
                                question: "Apakah ada kesempatan magang setelah program?",
                                answer: "Ya, peserta terbaik akan mendapatkan kesempatan magang melalui Internship Gateway kami.",
                            },
                        ].map((faq, index) => (
                            <div key={index} className="mb-4">
                                <div className="bg-gray-800/70 p-6 rounded-xl border border-gray-700 hover:border-green-500/30 transition-all duration-300 group">
                                    <div className="flex justify-between items-center cursor-pointer">
                                        <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                                            {faq.question}
                                        </h3>
                                        <span className="text-green-400 text-2xl">+</span>
                                    </div>
                                    <div className="mt-4 text-gray-300">{faq.answer}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer - Improved with better layout and social links */}
                <footer className="bg-black py-12">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                            <div className="flex items-center mb-6 md:mb-0">
                                <div className="w-10 h-10 bg-green-500 rounded-full mr-3 flex items-center justify-center shadow-lg shadow-green-500/30">
                                    <span className="text-black font-bold text-lg">G</span>
                                </div>
                                <span className="text-white text-xl font-bold tracking-tight">Grow Insight</span>
                            </div>
                            <div className="flex space-x-6">
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-green-500 hover:text-black transition-colors"
                                >
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.073-1.689-.073-4.948 0-3.204.013-3.583.072-4.948.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-green-500 hover:text-black transition-colors"
                                >
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-green-500 hover:text-black transition-colors"
                                >
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between">
                            <p className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
                                © 2025 Grow Insight. All rights reserved.
                            </p>
                            <div className="flex justify-center md:justify-end space-x-6">
                                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                                    Terms
                                </a>
                                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                                    Privacy
                                </a>
                                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                                    Contact
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </GuestLayout>
    )
}

export default Impact