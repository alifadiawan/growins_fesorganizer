import Card from '@/Components/Card';
import { Categories } from '@/Components/Categories';
import Toast from '@/Components/Toast';
import GuestLayout from '@/Layouts/GuestLayout';
import { Link, usePage } from '@inertiajs/react';
import { Award, Calendar, Clock, ChevronLeft, ChevronRight, ArrowRight, Star, MapPin, Users } from "lucide-react";
import { motion } from 'framer-motion';

import { useEffect, useRef, useState } from 'react';

export default function Welcome({ courseList, categories, bootcamps }) {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [toastMessage, setToastMessage] = useState({ success: '', error: '' });
    const scrollContainerRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const course = courseList?.data || [];
    const { success, error } = usePage().props;


    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
            setScrollPosition(scrollContainerRef.current.scrollLeft - 320);
        }
    };
    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
            setScrollPosition(scrollContainerRef.current.scrollLeft + 320);
        }
    };

    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(number);
    }

    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    useEffect(() => {
        if (success || error) {
            setToastMessage({ success: success || '', error: error || '' });

            const timer = setTimeout(() => {
                setToastMessage({ success: '', error: '' });
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [success, error]);

    return (
        <GuestLayout
            navbarProps={{
                isTransparent: false,
                customBgColor: 'bg-gradient-to-r from-teal-900 to-teal-600 opacity-95',
            }}
        >
            {/* Hero Section - Updated with more modern design */}
            <section className="relative overflow-hidden">
                <Toast success={toastMessage.success} error={toastMessage.error} />

                <div className="absolute inset-0 bg-gradient-to-r from-teal-900 to-teal-600 opacity-95"></div>
                <div className="absolute inset-0 bg-[url('/bg-pattern.png')] opacity-10 bg-repeat mix-blend-overlay"></div>

                <div className="relative container mx-auto px-6 py-24 lg:py-32 flex flex-col lg:flex-row items-center">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="text-white max-w-xl mb-12 lg:mb-0 z-10"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="inline-block px-4 py-1.5 bg-teal-400/20 rounded-full text-sm font-medium mb-8 backdrop-blur-sm border border-teal-400/30"
                        >
                            ✨ Platform Pembelajaran Terbaik
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="text-4xl lg:text-6xl font-black mb-8 leading-tight"
                        >
                            Empower Your Future <br />
                            <span className="text-yellow-400 relative">
                                with GROW
                                <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400/30"></span>
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="text-lg text-teal-50 mb-10 leading-relaxed opacity-90"
                        >
                            Tingkatkan keterampilan komunikasi, kepemimpinan, dan pengelolaan diri melalui workshop kami yang interaktif dan aplikatif.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="flex flex-col sm:flex-row gap-5"
                        >
                            <Link href="/register" className="group px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl inline-flex items-center justify-center">
                                Mulai Belajar
                                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link href="/courses/all" className="px-8 py-4 border-2 border-white/30 hover:border-white hover:bg-white/10 text-white font-medium rounded-xl transition-all duration-300 inline-flex items-center justify-center backdrop-blur-sm">
                                Lihat Semua Kursus
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="relative lg:absolute lg:right-0 lg:top-1/5 lg:-translate-y-1/2 lg:w-1/2 z-10"
                    >
                        <div className="relative">
                            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-teal-400/30 to-yellow-400/30 blur-3xl opacity-30"></div>
                            <img
                                src="/robot.png"
                                alt="Maskot GROW"
                                className="relative rounded-2xl lg:max-w-md max-w-64 mx-auto transform hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Categories section */}
            <div className="pt-10">
                <Categories />
            </div>

            {/* Testimonials Section - New */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="px-4 py-1.5 bg-teal-500/10 text-teal-600 rounded-full text-sm font-medium mb-4 inline-block">
                            Testimonials
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Apa Kata <span className="text-teal-600">Mereka</span></h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">Dengarkan pengalaman dari peserta yang telah mengikuti program pelatihan GROW.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                name: "Anisa Putri",
                                role: "Product Manager",
                                image: "https://smb.telkomuniversity.ac.id/wp-content/uploads/2024/08/5-Tipe-Mahasiswa-di-Kampus-Kupu-kupu-hingga-Kunang-kunang.jpg",
                                quote: "Workshop komunikasi dari GROW membantu saya meningkatkan kepercayaan diri dalam memimpin tim. Sangat direkomendasikan!"
                            },
                            {
                                name: "Budi Santoso",
                                role: "Marketing Specialist",
                                image: "https://instiki.ac.id/wp-content/uploads/2023/07/Bangga-Mahasiswa-INSTIKI-Jadi-Lulusan-Terbaik-20-Tim-Terbaik-dalam-Bangkit-2023-se-Indonesia.jpg",
                                quote: "Pengalaman belajar yang menyenangkan dengan mentor yang profesional. Materi pelatihan relevan dengan tantangan dunia kerja saat ini."
                            },
                            {
                                name: "Citra Dewi",
                                role: "Freelance Designer",
                                image: "https://soc.uir.ac.id/wp-content/uploads/2024/01/REY06830-scaled.jpg",
                                quote: "Bootcamp soft skills dari GROW memberi saya perspektif baru tentang pentingnya keterampilan interpersonal dalam karir saya sebagai freelancer."
                            }
                        ].map((testimonial, index) => (
                            <div key={index}
                                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-20 h-20 bg-teal-500/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                                <div className="flex items-center mb-6">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-teal-400 p-0.5"
                                    />
                                    <div className="ml-4">
                                        <h4 className="font-bold text-lg text-gray-900">{testimonial.name}</h4>
                                        <p className="text-teal-600 text-sm">{testimonial.role}</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-6 relative">
                                    <span className="text-5xl text-teal-200 absolute -top-4 -left-2">"</span>
                                    {testimonial.quote}
                                    <span className="text-5xl text-teal-200 absolute -bottom-8 right-0">"</span>
                                </p>
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Newest Bootcamp - Enhanced */}
            <section className="py-12 md:py-20 bg-gradient-to-r from-teal-900 to-teal-600">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="px-6 py-12 text-center">
                        <h2 className="text-3xl text-white md:text-4xl font-bold text-center mb-4">
                            Program <span className="text-yellow-300">Terbaru</span> Kami
                        </h2>
                        <p className="text-gray-200 max-w-2xl mx-auto">Tingkatkan kemampuan soft skill Anda dengan program bootcamp terbaru kami.</p>
                    </div>
                    <div className="flex lg:flex-row justify-center gap-8 w-full"> {/* Consider adding flex-wrap if you want cards to wrap on smaller screens or if there are many */}
                        {bootcamps.map((bootcamp) => (
                            <div
                                key={bootcamp.id}
                                className="bg-white/10 w-96 backdrop-blur-sm border border-white/20 rounded-xl shadow-2xl overflow-hidden flex flex-col"
                            >
                                {!bootcamp.poster && (
                                    <div className="aspect-[3/4] w-full bg-white/5 flex items-center justify-center">
                                        <span className="text-teal-300 text-sm">No Image Available</span>
                                    </div>
                                )}

                                {bootcamp.poster && (
                                    <div className="aspect-[6/2] w-full">
                                        <img
                                            src={`/storage/${bootcamp.poster}`}
                                            alt={`${bootcamp.title} Poster`}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                )}

                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-semibold text-white mb-2">
                                        {bootcamp.title}
                                    </h3>
                                    <p className="text-teal-100 text-sm mb-1">
                                        Starts: {bootcamp.date_start}
                                    </p>
                                    <p className="text-teal-200 text-sm leading-relaxed mb-4 flex-grow">
                                        {bootcamp.description.substring(0, 100)}... {/* Short description */}
                                    </p>
                                    <div className="mb-4">
                                        {bootcamp.discounted_price ? (
                                            <div>
                                                <span className="text-2xl font-bold text-white">
                                                    Rp. {bootcamp.discounted_price}
                                                </span>
                                                <span className="text-sm text-teal-300 line-through ml-2">
                                                    Rp. {bootcamp.normal_price}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-2xl font-bold text-white">
                                                Rp. {bootcamp.normal_price}
                                            </span>
                                        )}
                                    </div>
                                    <div className="mt-auto flex flex-row gap-3">
                                        <a
                                            href={route('bootcamp.show.public', bootcamp.slug)} // Replace with your actual route or Inertia Link
                                            className="w-full text-center bg-teal-500 hover:bg-teal-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-opacity-50"
                                        >
                                            Learn More
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            href="/bootcamps" // Replace with your route to all bootcamps page
                            className="inline-block bg-white/90 hover:bg-white text-teal-700 font-semibold py-3 px-8 rounded-lg shadow-md transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-opacity-50"
                        >
                            View All Bootcamps
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section - New */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Kenapa <span className="text-teal-600">Memilih Kami</span>?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Platform pembelajaran profesional yang dirancang khusus untuk membantu Anda meningkatkan soft skill.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Materi Terstruktur",
                                description: "Kurikulum yang dirancang oleh profesional berpengalaman di bidangnya",
                                icon: <svg className="w-10 h-10 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                            },
                            {
                                title: "Mentoring Profesional",
                                description: "Didampingi mentor berpengalaman yang siap membantu proses belajar Anda",
                                icon: <svg className="w-10 h-10 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            },
                            {
                                title: "Pengalaman Praktis",
                                description: "Belajar dengan metode praktik langsung dan studi kasus nyata",
                                icon: <svg className="w-10 h-10 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                            }
                        ].map((feature, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all hover:transform hover:-translate-y-1 duration-300 text-center">
                                <div className="inline-flex bg-teal-50 p-4 rounded-full mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="px-6 py-12 border-b border-gray-100 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                    Kursus <span className="text-teal-600">Terbaru</span> Kami
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Tingkatkan kemampuan dan ketrampilan Anda dengan kursus-kursus terbaru kami.</p>
            </div>

            {/* Enhanced Courses Section */}
            <div className="relative w-full max-w-6xl mx-auto px-4 py-12">
                {/* Navigation Buttons */}
                <div className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -ml-4">
                    <button
                        onClick={scrollLeft}
                        className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 focus:outline-none transition-all duration-300 hover:scale-110"
                        aria-label="Previous courses"
                    >
                        <ChevronLeft size={24} className="text-gray-700" />
                    </button>
                </div>

                <div className="absolute right-0 top-1/2 z-10 -translate-y-1/2 -mr-4">
                    <button
                        onClick={scrollRight}
                        className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 focus:outline-none transition-all duration-300 hover:scale-110"
                        aria-label="Next courses"
                    >
                        <ChevronRight size={24} className="text-gray-700" />
                    </button>
                </div>

                {/* Cards Container - Enhanced */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-hide snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >

                    {
                        isLoading ? (
                            <div className="text-center py-12" > Loading courses...</div>
                        ) : (
                            course.map((course) => (
                                <div
                                    key={course.id}
                                    className="flex-shrink-0 w-[22rem] snap-start rounded-xl shadow-lg bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                                >
                                    {/* Card Image with discount badge */}
                                    <div className="relative w-full h-48 overflow-hidden group">
                                        <img
                                            src={`/storage/${course.thumbnail}`}
                                            alt={course.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                            <div className="p-4 w-full">
                                                <button className="w-full bg-yellow-400 hover:bg-yellow-500 py-2 rounded-lg font-medium text-gray-900 transition-colors duration-200">
                                                    Lihat Detail
                                                </button>
                                            </div>
                                        </div>
                                        <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                                            70% OFF
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-5">
                                        <div className="flexjustify-between items-center mb-3">
                                            <span className="text-xs font-medium bg-teal-100 text-teal-800 px-2 py-1 rounded-full">Populer</span>
                                            <div className="flex items-center">
                                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                <span className="text-sm text-gray-700 ml-1">4.8</span>
                                            </div>
                                        </div>

                                        <h2 className="text-lg font-bold text-gray-900 line-clamp-2 h-14 mb-3">
                                            {course.title}
                                        </h2>

                                        <div className="flex items-center mb-4 text-sm text-gray-600">
                                            <Clock className="w-4 h-4 mr-1" />
                                            {/* <span>10 jam belajar</span>
                                    <span className="mx-2">•</span> */}
                                            <span>15 modul</span>
                                        </div>

                                        <div className="mt-4 flex justify-between items-end">
                                            <div>
                                                <p className="text-teal-600 text-xl font-bold">{formatRupiah(course.price)}</p>
                                            </div>
                                            <button
                                                className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg font-semibold text-gray-900 transition-all duration-200 text-sm transform hover:-translate-y-1"
                                            >
                                                Beli Sekarang
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                            ))}

                </div>

                {/* View All Button */}
                <div className="flex justify-center mt-10">
                    <Link href="/courses/all" className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-all duration-300 inline-flex items-center">
                        Lihat Semua Kursus
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </div>

            {/* FAQ Section - New */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Pertanyaan <span className="text-teal-600">Umum</span></h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Jawaban untuk pertanyaan yang sering ditanyakan tentang program kami.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {[
                            {
                                question: "Bagaimana metode belajar di GROW?",
                                answer: "Metode belajar di GROW menggabungkan teori dan praktik langsung. Setiap sesi pembelajaran dilengkapi dengan diskusi, studi kasus, dan proyek nyata untuk memastikan peserta dapat menerapkan ilmu yang didapat."
                            },
                            {
                                question: "Apakah saya akan mendapatkan sertifikat?",
                                answer: "Ya, setiap peserta yang telah menyelesaikan program pelatihan akan mendapatkan sertifikat digital yang dapat diunduh dan dibagikan di platform profesional seperti LinkedIn."
                            },
                            {
                                question: "Berapa lama durasi setiap kursus?",
                                answer: "Durasi kursus bervariasi tergantung pada topik dan levelnya. Rata-rata kursus berlangsung selama 4-8 minggu dengan pertemuan 2 kali dalam seminggu."
                            },
                            {
                                question: "Apakah ada program beasiswa yang tersedia?",
                                answer: "Ya, kami menyediakan program beasiswa untuk kandidat yang memenuhi syarat. Informasi lebih lanjut dapat dilihat di halaman Beasiswa pada website kami."
                            }
                        ].map((faq, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
                                <h3 className="text-xl font-bold mb-3 text-gray-900">{faq.question}</h3>
                                <p className="text-gray-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action - New */}
            <section className="py-20 bg-gradient-to-r from-teal-900 to-teal-600 text-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Siap Meningkatkan Keterampilan Anda?</h2>
                        <p className="text-xl text-teal-100 mb-8">Bergabunglah dengan ribuan siswa yang telah mengembangkan soft skill mereka bersama GROW</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/register" className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg transition-all duration-300 transform hover:-translate-y-1 text-lg">
                                Mulai Perjalanan Anda
                            </Link>
                            <Link href="/about" className="px-8 py-4 border-2 border-white hover:bg-white/10 text-white font-medium rounded-lg transition-all duration-300 text-lg">
                                Pelajari Lebih Lanjut
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter Section - New */}
            {/* <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="p-10 flex flex-col justify-center">
                                <h3 className="text-2xl font-bold mb-4">Dapatkan Update Terbaru</h3>
                                <p className="text-gray-600 mb-6">Berlangganan newsletter kami untuk mendapatkan informasi tentang kursus terbaru, promo, dan tips pengembangan diri.</p>
                                <form className="flex flex-col sm:flex-row gap-3">
                                    <input 
                                        type="email" 
                                        placeholder="Masukkan email Anda" 
                                        className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                    <button 
                                        type="submit" 
                                        className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-300"
                                    >
                                        Berlangganan
                                    </button>
                                </form>
                            </div>
                            <img src="/robot.png" className="bg-cover bg-center max-w-44 hidden md:block"></img>
                        </div>
                    </div>
                </div>
            </section> */}
        </GuestLayout >
    );
}


