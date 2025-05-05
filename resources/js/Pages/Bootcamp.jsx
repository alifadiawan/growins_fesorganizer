import GuestLayout from '@/Layouts/GuestLayout'
import React from 'react'
import { ClockIcon, CalendarIcon, AwardIcon, CheckCircleIcon, UserIcon, BriefcaseIcon, StarIcon } from 'lucide-react';

const Bootcamp = () => {

    const benefits = [
        { icon: <UserIcon className="w-6 h-6" />, title: "Komunikasi Efektif", description: "Kembangkan kemampuan komunikasi verbal dan non-verbal untuk membangun hubungan profesional yang kuat" },
        { icon: <BriefcaseIcon className="w-6 h-6" />, title: "Kepemimpinan", description: "Tingkatkan kemampuan memimpin dan memotivasi tim untuk mencapai tujuan bersama" },
        { icon: <StarIcon className="w-6 h-6" />, title: "Kolaborasi", description: "Pelajari teknik kerjasama tim yang efektif dalam lingkungan kerja yang beragam" },
        { icon: <CheckCircleIcon className="w-6 h-6" />, title: "Pemecahan Masalah", description: "Kembangkan pendekatan struktural untuk mengidentifikasi dan menyelesaikan masalah kompleks" },
    ];

    const modules = [
        { title: "Modul 1: Dasar-Dasar Soft Skill", duration: "1 minggu", topics: ["Pengenalan soft skill", "Pentingnya soft skill di tempat kerja", "Penilaian diri"] },
        { title: "Modul 2: Komunikasi Profesional", duration: "1 minggu", topics: ["Komunikasi verbal dan non-verbal", "Presentasi yang efektif", "Penulisan profesional"] },
        { title: "Modul 3: Kepemimpinan & Kolaborasi", duration: "1 minggu", topics: ["Gaya kepemimpinan", "Manajemen tim", "Resolusi konflik"] },
        { title: "Modul 4: Proyek SDGs", duration: "2 minggu", topics: ["Pengenalan SDGs", "Perancangan proyek", "Implementasi dan evaluasi"] },
    ];

    const faqs = [
        { question: "Apakah saya memerlukan pengalaman sebelumnya?", answer: "Tidak, bootcamp ini dirancang untuk semua level pengalaman, dari pemula hingga profesional." },
        { question: "Berapa jam belajar setiap harinya?", answer: "Kelas berlangsung dari 09.00 - 15.00 WIB dengan waktu istirahat. Total sekitar 5-6 jam pembelajaran efektif per hari." },
        { question: "Apakah ada sertifikat setelah menyelesaikan program?", answer: "Ya, Anda akan mendapatkan sertifikat resmi setelah menyelesaikan bootcamp." },
        { question: "Bagaimana format pembelajaran?", answer: "Format pembelajaran mencakup diskusi interaktif, simulasi, role-play, studi kasus, dan proyek kolaboratif." },
    ];

    return (
        <GuestLayout>

            <div className="bg-gradient-to-r from-teal-900 to-teal-600 opacity-90 text-white">
                <div className="container mx-auto px-4 py-16">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <div className="text-yellow-300 mb-2">#ProgramPeningkatanSkill</div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Bootcamp Softskill</h1>
                            <div className="w-20 h-1 bg-yellow-300 mb-6"></div>
                            <p className="text-lg mb-6">
                                Program pelatihan intensif yang dirancang untuk mengembangkan keterampilan lunak yang vital di tempat kerja.
                                Soft skill adalah keterampilan non-teknis yang melibatkan aspek interpersonal, komunikasi, kepemimpinan, kerjasama, dan kreativitas.
                            </p>
                            <a href="#daftar" className="text-black bg-yellow-400 hover:bg-yellow-500 text-brown-800 font-bold py-3 px-6 rounded-md inline-block transition-colors">
                                Daftar Sekarang
                            </a>
                        </div>
                        <div className="relative">
                            <div className="absolute -top-12 -left-12 w-24 h-24 bg-yellow-300 rounded-full opacity-50"></div>
                            <div className="bg-teal-700 p-6 rounded-lg shadow-lg">
                                <div className="flex items-center mb-4">
                                    <ClockIcon className="w-6 h-6 mr-2 text-yellow-300" />
                                    <div>
                                        <div className="font-bold">09.00 - 15.00 WIB</div>
                                        <div className="text-sm text-teal-200">Alokasi Waktu Pembelajaran</div>
                                    </div>
                                </div>
                                <div className="flex items-center mb-4">
                                    <CalendarIcon className="w-6 h-6 mr-2 text-yellow-300" />
                                    <div>
                                        <div className="font-bold">Maret 2025</div>
                                        <div className="text-sm text-teal-200">Waktu Pelaksanaan Kelas</div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <AwardIcon className="w-6 h-6 mr-2 text-yellow-300" />
                                    <div>
                                        <div className="font-bold">Real Project SDGs</div>
                                        <div className="text-sm text-teal-200">Sustainable Development Goals</div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-teal-800 rounded-full opacity-50"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Manfaat Bootcamp Softskill</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-4">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                                <p className="text-gray-600">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Kurikulum Program</h2>
                    <div className="space-y-8">
                        {modules.map((module, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                                <div className="flex flex-wrap justify-between items-center mb-4">
                                    <h3 className="text-xl font-bold text-teal-700">{module.title}</h3>
                                    <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">Durasi: {module.duration}</span>
                                </div>
                                <ul className="list-disc pl-5 text-gray-700">
                                    {module.topics.map((topic, i) => (
                                        <li key={i} className="mb-1">{topic}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pricing Section */}
            <div id="daftar" className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Pilihan Pendaftaran</h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Special Price Card */}
                        <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg overflow-hidden relative">
                            <div className="bg-yellow-400 text-brown-800 text-center py-2 font-bold">
                                Special Price
                            </div>
                            <div className="p-6">
                                <div className="text-center mb-6">
                                    <div className="text-gray-500 line-through">Rp. 2.500.000</div>
                                    <div className="text-3xl font-bold">Rp. 1.800.000</div>
                                    <div className="text-sm mt-1">Limited Time Offer</div>
                                </div>
                                <ul className="space-y-3 mb-6">
                                    <li className="flex items-center">
                                        <CheckCircleIcon className="w-5 h-5 text-teal-600 mr-2" />
                                        <span>Akses penuh ke seluruh modul</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircleIcon className="w-5 h-5 text-teal-600 mr-2" />
                                        <span>Sertifikat resmi</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircleIcon className="w-5 h-5 text-teal-600 mr-2" />
                                        <span>Konsultasi dengan mentor</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircleIcon className="w-5 h-5 text-teal-600 mr-2" />
                                        <span>Jaringan alumni</span>
                                    </li>
                                </ul>
                                <button className="w-full bg-amber-300 hover:bg-amber-500 text-black font-bold py-3 px-6 rounded-md transition-colors">
                                    Daftar Sekarang
                                </button>
                            </div>
                        </div>

                        {/* Regular Price Card */}
                        <div className="bg-teal-50 border border-teal-200 rounded-lg overflow-hidden">
                            <div className="bg-teal-600 text-white text-center py-2 font-bold">
                                Normal Price
                            </div>
                            <div className="p-6">
                                <div className="text-center mb-6">
                                    <div className="text-3xl font-bold">Rp. 2.500.000</div>
                                    <div className="text-sm mt-1">Regular Registration</div>
                                </div>
                                <ul className="space-y-3 mb-6">
                                    <li className="flex items-center">
                                        <CheckCircleIcon className="w-5 h-5 text-teal-600 mr-2" />
                                        <span>Akses penuh ke seluruh modul</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircleIcon className="w-5 h-5 text-teal-600 mr-2" />
                                        <span>Sertifikat resmi</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircleIcon className="w-5 h-5 text-teal-600 mr-2" />
                                        <span>Konsultasi dengan mentor</span>
                                    </li>
                                </ul>
                                <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-md transition-colors">
                                    Lihat Detail
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </GuestLayout>
    )
}

export default Bootcamp