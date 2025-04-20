import Card from '@/Components/Card';
import { Categories } from '@/Components/Categories';
import { Navbar } from '@/Components/Navbar';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import { Award, Calendar, Clock, ChevronLeft, ChevronRight, ArrowRight, Star, Users, CheckCircle, Play } from "lucide-react";
import { useRef, useState } from 'react';

export default function Welcome({ auth, laravelVersion, phpVersion, courseList, categories }) {
    const [scrollPosition, setScrollPosition] = useState(0);
    const scrollContainerRef = useRef(null);
    const course = courseList.data;

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

    return (
        <GuestLayout>
            {/* Hero Section - Updated with more modern design */}
            <section className="relative overflow-hidden">
                {/* Background with overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal-900 to-teal-600 opacity-90"></div>
                <div className="absolute inset-0 bg-[url('/bg-pattern.png')] opacity-20 bg-repeat"></div>
                
                <div className="relative container mx-auto px-6 py-20 lg:py-28 flex flex-col lg:flex-row items-center">
                    <div className="text-white max-w-xl mb-12 lg:mb-0 z-10">
                        <div className="inline-block px-3 py-1 bg-teal-400 bg-opacity-30 rounded-full text-sm font-medium mb-6">
                            Platform Pembelajaran Terbaik
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">
                            Empower Your Future <span className="text-yellow-400">with GROW</span>
                        </h1>
                        <p className="text-lg text-teal-50 mb-8 leading-relaxed">
                            Tingkatkan keterampilan komunikasi, kepemimpinan, dan pengelolaan diri melalui workshop kami yang interaktif dan aplikatif.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/register" className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center justify-center">
                                Mulai Belajar <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link href="/courses/all" className="px-8 py-3 border-2 border-white hover:bg-white/10 text-white font-medium rounded-lg transition-all duration-300 inline-flex items-center justify-center">
                                Lihat Semua Kursus
                            </Link>
                        </div>
                        
                        {/* <div className="mt-10 flex items-center gap-6">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-teal-600 bg-teal-${300 + i*100} flex items-center justify-center text-xs font-bold`}>
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="flex items-center">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-sm text-teal-50">Dari 2,000+ siswa</p>
                            </div>
                        </div> */}
                    </div>
                    
                    <div className="relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-1/2 z-10">
                        <div className="relative">
                            <div className="absolute -inset-0.5 rounded-lg blur opacity-30"></div>
                            <img 
                                src="/robot.png" 
                                alt="Maskot GROW" 
                                className="relative rounded-lg max-w-md mx-auto"
                            />
                        </div>
                    </div>
                </div>
                
                {/* Stats section at the bottom */}
                <div className="relative container mx-auto px-6 z-10 -mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-xl shadow-xl p-6">
                        <div className="flex items-center justify-center p-4">
                            <div className="rounded-full bg-teal-100 p-3 mr-4">
                                <Users className="h-6 w-6 text-teal-600" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">10,000+</h3>
                                <p className="text-gray-500">Siswa Aktif</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center p-4 border-y md:border-y-0 md:border-x border-gray-100">
                            <div className="rounded-full bg-yellow-100 p-3 mr-4">
                                <CheckCircle className="h-6 w-6 text-yellow-600" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">150+</h3>
                                <p className="text-gray-500">Kursus Tersedia</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center p-4">
                            <div className="rounded-full bg-teal-100 p-3 mr-4">
                                <Award className="h-6 w-6 text-teal-600" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">97%</h3>
                                <p className="text-gray-500">Tingkat Kepuasan</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Spacer for stats overlap */}
            <div className="h-16"></div>
            
            {/* Categories section */}
            <div className="pt-10">
                <Categories categories={categories} />
            </div>
            
            {/* Testimonials Section - New */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Apa Kata <span className="text-teal-600">Mereka</span></h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Dengarkan pengalaman dari peserta yang telah mengikuti program pelatihan GROW.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Anisa Putri",
                                role: "Product Manager",
                                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                                quote: "Workshop komunikasi dari GROW membantu saya meningkatkan kepercayaan diri dalam memimpin tim. Sangat direkomendasikan!"
                            },
                            {
                                name: "Budi Santoso",
                                role: "Marketing Specialist",
                                image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                                quote: "Pengalaman belajar yang menyenangkan dengan mentor yang profesional. Materi pelatihan relevan dengan tantangan dunia kerja saat ini."
                            },
                            {
                                name: "Citra Dewi",
                                role: "Freelance Designer",
                                image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                                quote: "Bootcamp soft skills dari GROW memberi saya perspektif baru tentang pentingnya keterampilan interpersonal dalam karir saya sebagai freelancer."
                            }
                        ].map((testimonial, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                                <div className="flex items-center mb-6">
                                    <img 
                                        src={testimonial.image} 
                                        alt={testimonial.name} 
                                        className="w-14 h-14 rounded-full object-cover border-2 border-teal-400"
                                    />
                                    <div className="ml-4">
                                        <h4 className="font-bold text-lg">{testimonial.name}</h4>
                                        <p className="text-gray-500 text-sm">{testimonial.role}</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-4">"{testimonial.quote}"</p>
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="px-6 py-12 border-b border-gray-100 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                    Program <span className="text-teal-600">Terbaru</span> Kami
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Tingkatkan kemampuan soft skill Anda dengan program bootcamp terbaru kami.</p>
            </div>

            {/* Newest Bootcamp - Enhanced */}
            <Card justify="center">
                <div className="flex flex-col lg:mx-auto max-w-5xl w-full justify-center">
                    <div className="text-center mb-12">
                        <div className="inline-block px-4 py-1 bg-teal-500/20 rounded-full text-sm font-medium text-white mb-4">
                            #ProgramPeningkatanSkill
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Bootcamp Softskill</h1>
                        <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
                    </div>

                    <p className="text-teal-50 leading-relaxed text-center mb-12 text-lg max-w-3xl mx-auto">
                        Bootcamp soft skill adalah program pelatihan intensif yang dirancang untuk mengembangkan keterampilan
                        lunak yang vital di tempat kerja. Soft skill adalah keterampilan non-teknis yang melibatkan aspek
                        interpersonal, komunikasi, kepemimpinan, kerjasama, dan kreativitas.
                    </p>

                    {/* Info Boxes - Improved */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 flex flex-col items-center text-center hover:bg-white/15 transition-all hover:transform hover:-translate-y-1 duration-300">
                            <div className="bg-teal-500/20 p-4 rounded-full mb-4">
                                <Clock className="w-8 h-8" />
                            </div>
                            <h3 className="font-semibold text-xl mb-2">09.00 - 15.00 WIB</h3>
                            <p className="text-sm text-teal-100">Alokasi Waktu Pembelajaran</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 flex flex-col items-center text-center hover:bg-white/15 transition-all hover:transform hover:-translate-y-1 duration-300">
                            <div className="bg-teal-500/20 p-4 rounded-full mb-4">
                                <Calendar className="w-8 h-8" />
                            </div>
                            <h3 className="font-semibold text-xl mb-2">Maret 2025</h3>
                            <p className="text-sm text-teal-100">Waktu Pelaksanaan Kelas</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 flex flex-col items-center text-center hover:bg-white/15 transition-all hover:transform hover:-translate-y-1 duration-300">
                            <div className="bg-teal-500/20 p-4 rounded-full mb-4">
                                <Award className="w-8 h-8" />
                            </div>
                            <h3 className="font-semibold text-xl mb-2">Real Project SDGs</h3>
                            <p className="text-sm text-teal-100">Sustainable Development Goals</p>
                        </div>
                    </div>

                    {/* Pricing Boxes - Improved */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-2xl mx-auto">
                        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl p-8 text-center shadow-lg transform hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
                            <div className="absolute -right-10 -top-10 bg-yellow-300 w-28 h-28 rounded-full opacity-20"></div>
                            <span className="inline-block px-4 py-1 bg-yellow-300/30 rounded-full text-sm font-medium mb-4 text-yellow-900">
                                Special Price
                            </span>
                            <h3 className="text-3xl font-bold mb-2 text-yellow-900">Rp. 300.000</h3>
                            <div className="w-16 h-1 bg-yellow-900/30 mx-auto my-3"></div>
                            <p className="text-sm text-yellow-900 font-medium">Limited Time Offer</p>
                            <button className="mt-6 bg-yellow-900 text-white py-3 px-6 rounded-lg font-bold hover:bg-yellow-800 transition-colors">
                                Daftar Sekarang
                            </button>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center border border-white/20 transform hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
                            <div className="absolute -right-10 -top-10 bg-white w-28 h-28 rounded-full opacity-10"></div>
                            <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                                Normal Price
                            </span>
                            <h3 className="text-3xl font-bold mb-2">Rp. 1.000.000</h3>
                            <div className="w-16 h-1 bg-white/30 mx-auto my-3"></div>
                            <p className="text-sm opacity-80">Regular Registration</p>
                            <button className="mt-6 bg-white/20 hover:bg-white/30 text-white py-3 px-6 rounded-lg font-bold transition-colors">
                                Lihat Detail
                            </button>
                        </div>
                    </div>

                    {/* Contact - Improved */}
                    <div className="text-center bg-white/10 backdrop-blur-sm p-8 rounded-xl max-w-xl mx-auto">
                        <h3 className="text-xl font-semibold mb-4">Informasi Lebih Lanjut</h3>
                        <a href="https://wa.me/6285143869576" className="inline-flex items-center bg-white/10 hover:bg-white/15 backdrop-blur-sm px-6 py-4 rounded-full text-sm font-medium transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                            </svg>
                            +62 851-4386-9576 | Whatsapp Only
                        </a>
                    </div>
                </div>
            </Card>
            
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
                    {course.map((course) => (
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
            <section className="py-16 bg-gray-100">
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
            </section>
        </GuestLayout>
    );
}


