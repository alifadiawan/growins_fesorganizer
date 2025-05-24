import GuestLayout from '@/Layouts/GuestLayout'
import React, { useEffect, useState } from 'react'
import { ClockIcon, CalendarIcon, AwardIcon, CheckCircleIcon, UserIcon, BriefcaseIcon, StarIcon } from 'lucide-react';
import axios from 'axios';
import { Link, usePage } from '@inertiajs/react';

const Bootcamp = ({ bootcamp }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading delay
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
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

    // Add Skeleton Loader Component
    const SkeletonCard = () => (
        <div className="flex-shrink-0 w-full md:w-[400px] bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="h-48 bg-gray-200 animate-pulse"></div>
            <div className="p-8">
                <div className="h-6 w-24 bg-gray-200 rounded-full mb-4 animate-pulse"></div>
                <div className="h-14 bg-gray-200 rounded-lg mb-3 animate-pulse"></div>
                <div className="h-[4.5rem] bg-gray-200 rounded-lg mb-6 animate-pulse"></div>

                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                    ))}
                </div>

                <div className="mt-6 border-t pt-6">
                    <div className="h-8 w-32 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
                    <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
            </div>
        </div>
    );

    // Modify the bootcamp cards section to include loading state
    const renderBootcamps = () => {
        if (isLoading) {
            return (
                <div className="flex gap-8 overflow-x-auto pb-6 px-4">
                    {[1, 2, 3].map((index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>
            );
        }

        if (!bootcamp.data || bootcamp.data.length === 0) {
            return (
                <div className="text-center py-12">
                    <p className="text-xl text-gray-600">No bootcamps available at the moment.</p>
                </div>
            );
        }

        return (
            <div className="flex justify-center gap-8 overflow-x-auto pb-6 px-4">
                {bootcamp.data.map((item) => (
                    <div key={item.id} className="flex-shrink-0 w-full md:w-[400px] bg-white rounded-xl shadow-2xl overflow-hidden transition-transform hover:scale-105">
                        {/* Bootcamp card content */}
                        <div className="h-48 bg-gray-200 overflow-hidden">
                            <img
                                src={`/storage/${item.cover}`}
                                alt={item.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = '/images/default-cover.jpg';
                                }}
                            />
                        </div>
                        <div className="p-8">
                            <span className="inline-block px-4 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold mb-4">
                                #Bootcamp
                            </span>
                            <h3 className="text-2xl font-bold mb-3 line-clamp-2 text-black">{item.title}</h3>
                            <div className="text-gray-600 mb-6 line-clamp-3" dangerouslySetInnerHTML={{ __html: item.description }}></div>

                            <div className="space-y-4 text-sm">
                                <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                                    <ClockIcon className="w-5 h-5 mr-3 text-teal-600" />
                                    <span className="font-medium flex flex-row text-gray-600">{item.time_start} - {item.time_end}</span>
                                </div>
                                <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                                    <CalendarIcon className="w-5 h-5 mr-3 text-teal-600" />
                                    <span className="font-medium flex flex-row text-gray-600">{item.date_start} - {item.date_end}</span>
                                </div>
                                <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                                    <AwardIcon className="w-5 h-5 mr-3 text-teal-600" />
                                    <span className="font-medium text-gray-600">{item.main_theme}</span>
                                </div>
                            </div>

                            <div className="mt-6 border-t pt-6">
                                <div className="text-2xl font-bold text-teal-600 mb-4">
                                    {item.discounted_price ? (
                                        <>
                                            <span className="line-through text-gray-400 text-lg mr-2">
                                                Rp {item.normal_price.toLocaleString()}
                                            </span>
                                            <br />
                                            Rp {item.discounted_price.toLocaleString()}
                                        </>
                                    ) : (
                                        item.normal_price == 0 ? (
                                            <span className="text-teal-600">Gratis</span>
                                        ) : (
                                            <span>Rp {item.normal_price.toLocaleString()}</span>
                                        )
                                    )}
                                </div>


                                <Link
                                    href={'workshop/connect'}
                                    className="block w-full bg-teal-600 text-white py-3 px-6 rounded-lg text-center font-semibold hover:bg-teal-700 transition-colors duration-300"
                                >
                                    Daftar Sekarang
                                </Link>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <GuestLayout
            navbarProps={{
                isTransparent: false,
                customBgColor: 'bg-gradient-to-r from-teal-900 to-teal-600 opacity-90',
            }}
        >
            {/* Hero Section with improved styling */}
            <div className="bg-gradient-to-r from-teal-900 to-teal-600 opacity-90 text-white">
                <div className="container mx-auto px-4 py-20">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center leading-tight">
                        Siap Naik Level dalam <span className="text-yellow-400">Karier</span> ?
                    </h1>
                    <p className="text-xl text-center max-w-2xl mx-auto mb-12 text-teal-100">
                        Ikuti program bootcamp kami yang dirancang khusus untuk pengembangan profesional Anda.
                    </p>

                    {/* Bootcamp Cards with loading state */}
                    <div className="w-full max-w-7xl mx-auto">
                        {renderBootcamps()}
                    </div>
                </div>
            </div>

            {/* Benefits Section with improved design */}
            <div className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-4">Manfaat Bootcamp</h2>
                    <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                        Dapatkan berbagai keuntungan yang akan membantu mengembangkan karir profesional Anda
                    </p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="w-14 h-14 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mb-6">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                        Temukan jawaban untuk pertanyaan yang sering diajukan
                    </p>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {faqs.map((faq, index) => (
                            <div key={index} className="p-6 bg-gray-50 rounded-xl">
                                <h3 className="text-lg font-bold mb-3 text-teal-700">{faq.question}</h3>
                                <p className="text-gray-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </GuestLayout>
    )
}

export default Bootcamp