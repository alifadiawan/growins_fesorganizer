import Card from '@/Components/Card';
import { Categories } from '@/Components/Categories';
import { Navbar } from '@/Components/Navbar';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import { Award, Calendar, Clock, Star } from "lucide-react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
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
            <section className="card mx-5 lg:mx-28 lg:h-[30rem] bg-gradient-to-b from-[#128884] to-[#03B5AA] flex lg:flex-row flex-col gap-8 lg:gap-0 items-center justify-between rounded-lg text-white lg:px-16 px-8 py-8 mb-8">
                <div className="title-section flex flex-col gap-5">
                    <h1 className="text-4xl font-black">Empower Your Future
                        <br></br>with GROW</h1>
                    <p className="font-light text-md max-w-96">Tingkatkan keterampilan komunikasi, kepemimpinan, dan pengelolaan diri  melalui workshop kami yang interaktif dan aplikatif. </p>
                </div>
                <div className="maskot-image">
                    <img src="/robot.png" alt="maskot" width={400} height={400} />
                </div>
            </section>

            {/* categories section */}
            <div className="mx-5 lg:mx-24">
                <Categories />
            </div>

            <div className="px-6 py-8 border-b border-gray-100 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                    Program <span className="text-teal-600">Terbaru</span> Kami
                </h2>
            </div>

            {/* Newest Bootcamp */}
            <Card justify="center">
                <div className="flex flex-col lg:mx-24 justify-center">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">Bootcamp Softskill</h1>
                        <p className="text-teal-100 text-sm">#ProgramPeningkatanSkill</p>
                    </div>

                    <p className="text-teal-50 leading-relaxed text-center mb-8">
                        Bootcamp soft skill adalah program pelatihan intensif yang dirancang untuk mengembangkan keterampilan
                        lunak yang vital di tempat kerja. Soft skill adalah keterampilan non-teknis yang melibatkan aspek
                        interpersonal, komunikasi, kepemimpinan, kerjasama, dan kreativitas. Bootcamp soft skill biasanya meliputi
                        pembelajaran praktis dan interaktif yang membantu peserta mengasah keterampilan ini dalam waktu singkat.
                    </p>

                    {/* Info Boxes */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 flex flex-col items-center text-center hover:bg-white/15 transition-colors">
                            <div className="bg-teal-500/20 p-3 rounded-full mb-3">
                                <Clock className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold mb-1">09.00 - 15.00 WIB</h3>
                            <p className="text-xs text-teal-100">Alokasi Waktu Pembelajaran</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 flex flex-col items-center text-center hover:bg-white/15 transition-colors">
                            <div className="bg-teal-500/20 p-3 rounded-full mb-3">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold mb-1">Maret 2025</h3>
                            <p className="text-xs text-teal-100">Waktu Pelaksanaan Kelas</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 flex flex-col items-center text-center hover:bg-white/15 transition-colors">
                            <div className="bg-teal-500/20 p-3 rounded-full mb-3">
                                <Award className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold mb-1">Real Project SDGs</h3>
                            <p className="text-xs text-teal-100">Sustainable Development Goals</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 max-w-2xl mx-auto">
                        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl p-6 text-center shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
                            <span className="inline-block px-3 py-1 bg-yellow-300/30 rounded-full text-xs font-medium mb-3">
                                Special Price
                            </span>
                            <h3 className="text-2xl font-bold mb-1">Rp. 300.000</h3>
                            <div className="w-16 h-1 bg-white/30 mx-auto my-2"></div>
                            <p className="text-xs opacity-80">Limited Time Offer</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 transform hover:-translate-y-1 transition-transform duration-300">
                            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-medium mb-3">
                                Normal Price
                            </span>
                            <h3 className="text-2xl font-bold mb-1">Rp. 1.000.000</h3>
                            <div className="w-16 h-1 bg-white/30 mx-auto my-2"></div>
                            <p className="text-xs opacity-80">Regular Registration</p>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="text-center">
                        <h3 className="text-xl font-semibold mb-4">Informasi Lebih Lanjut</h3>
                        <p className="inline-flex items-center bg-white/10 backdrop-blur-sm px-5 py-3 rounded-full text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                            </svg>
                            +62 851-4386-9576 | Whatsapp Only
                        </p>
                    </div>
                </div>
            </Card >


            <div className="px-6 py-8 border-b border-gray-100 text-center gap-5">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                    Kursus <span className="text-teal-600">Terbaru</span> Kami
                </h2>
            </div>

            <Card>
                <div className="flex flex-row gap-5 overflow-x-auto whitespace-nowrap">
                    <div className="w-96 mx-auto rounded-lg shadow-lg bg-white border border-gray-200">
                        {/* Card Header with Image */}
                        <div className="relative w-full h-64">
                            <img
                                src="/image-15.png"
                                alt="Digital Marketing Bootcamp"

                                className="object-cover"
                            />
                        </div>

                        {/* Card Title */}
                        <div className="p-4 pb-2">
                            <h1 className="text-xl font-bold text-gray-900 leading-tight truncate">
                                DIGITAL MARKETING: FULLSTACK INTENSIVE BOOTCAMP
                            </h1>
                        </div>

                        {/* Card Body with Price and CTA */}
                        <div className="p-4 flex flex-row justify-between items-center">
                            <div className="price-container">
                                <p className="text-gray-500 text-sm line-through">Rp. 1,000,000</p>
                                <p className="text-teal-500 text-2xl font-bold">Rp. 299,000</p>
                            </div>
                            <Link
                                href="/"
                                className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 rounded-md font-semibold text-gray-900 transition-colors duration-200"
                            >
                                Beli Sekarang
                            </Link>
                        </div>
                    </div>
                    <div className="w-96 mx-auto rounded-lg shadow-lg bg-white border border-gray-200">
                        {/* Card Header with Image */}
                        <div className="relative w-full h-64">
                            <img
                                src="/image-15.png"
                                alt="Digital Marketing Bootcamp"

                                className="object-cover"
                            />
                        </div>

                        {/* Card Title */}
                        <div className="p-4 pb-2">
                            <h1 className="text-xl font-bold text-gray-900 leading-tight truncate">
                                DIGITAL MARKETING: FULLSTACK INTENSIVE BOOTCAMP
                            </h1>
                        </div>

                        {/* Card Body with Price and CTA */}
                        <div className="p-4 flex flex-row justify-between items-center">
                            <div className="price-container">
                                <p className="text-gray-500 text-sm line-through">Rp. 1,000,000</p>
                                <p className="text-teal-500 text-2xl font-bold">Rp. 299,000</p>
                            </div>
                            <Link
                                href="/"
                                className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 rounded-md font-semibold text-gray-900 transition-colors duration-200"
                            >
                                Beli Sekarang
                            </Link>
                        </div>
                    </div>
                    <div className="w-96 mx-auto rounded-lg shadow-lg bg-white border border-gray-200">
                        {/* Card Header with Image */}
                        <div className="relative w-full h-64">
                            <img
                                src="/image-15.png"
                                alt="Digital Marketing Bootcamp"

                                className="object-cover"
                            />
                        </div>

                        {/* Card Title */}
                        <div className="p-4 pb-2">
                            <h1 className="text-xl font-bold text-gray-900 leading-tight truncate">
                                DIGITAL MARKETING: FULLSTACK INTENSIVE BOOTCAMP
                            </h1>
                        </div>

                        {/* Card Body with Price and CTA */}
                        <div className="p-4 flex flex-row justify-between items-center">
                            <div className="price-container">
                                <p className="text-gray-500 text-sm line-through">Rp. 1,000,000</p>
                                <p className="text-teal-500 text-2xl font-bold">Rp. 299,000</p>
                            </div>
                            <Link
                                href="/"
                                className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 rounded-md font-semibold text-gray-900 transition-colors duration-200"
                            >
                                Beli Sekarang
                            </Link>
                        </div>
                    </div>
                    <div className="w-96 mx-auto rounded-lg shadow-lg bg-white border border-gray-200">
                        {/* Card Header with Image */}
                        <div className="relative w-full h-64">
                            <img
                                src="/image-15.png"
                                alt="Digital Marketing Bootcamp"

                                className="object-cover"
                            />
                        </div>

                        {/* Card Title */}
                        <div className="p-4 pb-2">
                            <h1 className="text-xl font-bold text-gray-900 leading-tight truncate">
                                DIGITAL MARKETING: FULLSTACK INTENSIVE BOOTCAMP
                            </h1>
                        </div>

                        {/* Card Body with Price and CTA */}
                        <div className="p-4 flex flex-row justify-between items-center">
                            <div className="price-container">
                                <p className="text-gray-500 text-sm line-through">Rp. 1,000,000</p>
                                <p className="text-teal-500 text-2xl font-bold">Rp. 299,000</p>
                            </div>
                            <Link
                                href="/"
                                className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 rounded-md font-semibold text-gray-900 transition-colors duration-200"
                            >
                                Beli Sekarang
                            </Link>
                        </div>
                    </div>
                </div>
            </Card>

        </GuestLayout>
    );
}
