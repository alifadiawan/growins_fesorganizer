import GuestLayout from '@/Layouts/GuestLayout'
import React, { useEffect, useState } from 'react'
import { ClockIcon, CalendarIcon, AwardIcon, CheckCircleIcon, UserIcon, BriefcaseIcon, StarIcon } from 'lucide-react';
import axios from 'axios';
import { Link, usePage } from '@inertiajs/react';

const Bootcamp = () => {
    const [bootcamps, setBootcamps] = useState({ data: [] });
    const { auth } = usePage().props;

    useEffect(() => {
        const fetchBootcamps = async () => {
            try {
                const response = await axios.get(route('bootcamp.fetch'));
                setBootcamps(response.data);
            } catch (error) {
                console.error('Error fetching bootcamps:', error);
            }
        };
        fetchBootcamps();
    }, []);

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
        <GuestLayout
            navbarProps={{
                isTransparent: false,
                customBgColor: 'bg-gradient-to-r from-teal-900 to-teal-600 opacity-95',
            }}
        >
            <div className="bg-gradient-to-r from-teal-900 to-teal-600 opacity-90 text-white">
                <div className="container mx-auto px-4 py-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Our Bootcamps</h1>

                    {/* Bootcamp Cards */}
                    <div className="w-full overflow-x-auto">
                        <div className="flex gap-6 px-2 py-4 min-w-full" style={{ scrollSnapType: 'x mandatory' }}>
                            {bootcamps.data?.map((bootcamp) => (
                                <div
                                    key={bootcamp.id}
                                    className="flex-shrink-0 w-full snap-start bg-white rounded-lg shadow-lg overflow-hidden text-gray-800"
                                >
                                    <div className="p-6">
                                        <div className="text-yellow-600 mb-2">#Bootcamp</div>
                                        <h2 className="text-xl font-bold mb-2 line-clamp-2 h-14">{bootcamp.title}</h2>

                                        <div
                                            className="text-gray-600 mb-4 line-clamp-3 h-[4.5rem] overflow-hidden"
                                            dangerouslySetInnerHTML={{ __html: bootcamp.description }}
                                        ></div>

                                        <div className="space-y-3 text-sm">
                                            <div className="flex items-center">
                                                <ClockIcon className="w-5 h-5 mr-2 text-teal-600" />
                                                <span>{bootcamp.time}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <CalendarIcon className="w-5 h-5 mr-2 text-teal-600" />
                                                <span>{bootcamp.date}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <AwardIcon className="w-5 h-5 mr-2 text-teal-600" />
                                                <span>{bootcamp.main_theme}</span>
                                            </div>
                                        </div>

                                        <div className="mt-4 space-y-2">
                                            <div className="text-xl font-bold text-teal-600">
                                                {bootcamp.discounted_price ? (
                                                    <>
                                                        <span className="line-through text-gray-400 text-base mr-2">
                                                            Rp {bootcamp.normal_price.toLocaleString()}
                                                        </span>
                                                        Rp {bootcamp.discounted_price.toLocaleString()}
                                                    </>
                                                ) : (
                                                    `Rp ${bootcamp.normal_price.toLocaleString()}`
                                                )}
                                            </div>
                                        </div>

                                        {auth.user ? (
                                            // Logged in: Show the Link
                                            <Link
                                                href={route('user.workshop.show', bootcamp.id)}
                                                className="mt-4 w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors"
                                            >
                                                Daftar Sekarang
                                            </Link>
                                        ) : (
                                            // Not logged in: Show a login redirect or message
                                            <Link
                                                href={route('login')}
                                                className="mt-4 w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                                            >
                                                Login untuk Mendaftar
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Manfaat Bootcamp</h2>
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

            {/* <div className="py-16 bg-gray-50">
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
            </div> */}

            {/* Pricing Section */}


        </GuestLayout>
    )
}

export default Bootcamp