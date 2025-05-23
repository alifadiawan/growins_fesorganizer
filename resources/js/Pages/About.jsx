// About.jsx
import React from 'react';
import { Users, BookOpen, Target, Award, MessageCircle, Star, Briefcase, Coffee } from 'lucide-react';
import GuestLayout from '@/Layouts/GuestLayout';

const About = () => {
    const values = [
        {
            icon: <Target className="w-8 h-8" />,
            title: "Inovasi",
            description: "Kami terus mencari pendekatan baru dan kreatif dalam mengembangkan soft skill yang relevan dengan kebutuhan masa kini."
        },
        {
            icon: <MessageCircle className="w-8 h-8" />,
            title: "Kolaborasi",
            description: "Kami percaya bahwa pembelajaran terbaik terjadi melalui interaksi dan berbagi pengalaman antar individu."
        },
        {
            icon: <Star className="w-8 h-8" />,
            title: "Kualitas",
            description: "Kami berkomitmen untuk menyediakan pelatihan berkualitas tinggi dengan fasilitator terbaik di bidangnya."
        },
        {
            icon: <Briefcase className="w-8 h-8" />,
            title: "Relevansi",
            description: "Program kami dikembangkan berdasarkan kebutuhan nyata dunia kerja dan kehidupan profesional."
        },
    ];

    const team = [
        // {
        //     name: "Niko",
        //     position: "Founder & CEO",
        //     image: "/images/team/budi.jpg",
        //     bio: "Berpengalaman lebih dari 15 tahun di bidang pengembangan SDM dan kepemimpinan.",
        // },
        // {
        //     name: "Dian Permata",
        //     position: "Head of Training",
        //     image: "/images/team/dian.jpg",
        //     bio: "Ahli dalam merancang kurikulum pelatihan yang efektif dan berdampak.",
        // },
        // {
        //     name: "Rudi Hartono",
        //     position: "Senior Trainer",
        //     image: "/images/team/rudi.jpg",
        //     bio: "Spesialis di bidang komunikasi efektif dan kepemimpinan transformasional.",
        // },
    ];

    return (
        <GuestLayout
            navbarProps={{
                isTransparent: false,
                customBgColor: 'bg-gradient-to-r from-teal-900 to-teal-600 opacity-95',
            }}
        >
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-teal-900 to-teal-600 opacity-90 text-white">
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Tentang Kami</h1>
                        <div className="w-20 h-1 bg-yellow-300 mx-auto mb-8"></div>
                        <p className="text-lg">
                            Membangun individu yang tangguh dan berdaya melalui pelatihan softskill yang inovatif dan inspiratif
                        </p>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-teal-900 to-teal-600 opacity-90 py-12">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
                                <div className="flex justify-center mb-4">
                                    <div className="w-16 h-16 bg-yellow-300 text-teal-800 rounded-full flex items-center justify-center">
                                        <Users className="w-8 h-8" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-center mb-2">500+</h3>
                                <p className="text-center text-teal-200">Alumni Tersertifikasi</p>
                            </div>
                            <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
                                <div className="flex justify-center mb-4">
                                    <div className="w-16 h-16 bg-yellow-300 text-teal-800 rounded-full flex items-center justify-center">
                                        <BookOpen className="w-8 h-8" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-center mb-2">25+</h3>
                                <p className="text-center text-teal-200">Program Pelatihan</p>
                            </div>
                            <div className="w-full md:w-1/3 px-4">
                                <div className="flex justify-center mb-4">
                                    <div className="w-16 h-16 bg-yellow-300 text-teal-800 rounded-full flex items-center justify-center">
                                        <Award className="w-8 h-8" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-center mb-2">10+</h3>
                                <p className="text-center text-teal-200">Tahun Pengalaman</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Story Section */}
            <div className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">Cerita Kami</h2>
                        <div className="prose prose-lg max-w-none">
                            <p className="mb-6 text-gray-700">
                                <span className="font-bold text-teal-600">GROW</span> merupakan penyelenggara workshop pelatihan softskill yang berdedikasi untuk menciptakan peluang nyata bagi individu dari berbagai latar belakang. Kami percaya bahwa keterampilan softskill seperti kepemimpinan, komunikasi efektif, dan pengelolaan diri adalah kunci keberhasilan dalam dunia yang terus berkembang ini.
                            </p>
                            <p className="mb-12 text-gray-700">
                                Dengan pendekatan yang interaktif dan praktis, GROW menawarkan berbagai workshop yang dirancang untuk memenuhi kebutuhan pasar kerja dan kehidupan modern. Program kami dirancang oleh para ahli dan praktisi yang berpengalaman, memastikan bahwa setiap peserta mendapatkan pengetahuan dan keterampilan yang dapat langsung diterapkan.
                            </p>

                            <div className="grid md:grid-cols-2 gap-12 mb-12">
                                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-teal-600">
                                    <h3 className="text-2xl font-bold text-teal-700 mb-4">Visi</h3>
                                    <p className="text-gray-700">
                                        Membangun individu yang tangguh dan berdaya melalui pelatihan softskill yang inovatif dan inspiratif, guna menciptakan peluang nyata di dunia profesional dan dunia usaha.
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-yellow-400">
                                    <h3 className="text-2xl font-bold text-teal-700 mb-4">Misi</h3>
                                    <p className="text-gray-700 mb-4">
                                        Menyediakan pelatihan softskill yang relevan dan berkualitas tinggi, dirancang untuk meningkatkan keterampilan kepemimpinan, komunikasi, dan manajemen diri.
                                    </p>
                                    <ol className="list-decimal pl-5 text-gray-700 space-y-2">
                                        <li>Membantu peserta mengidentifikasi dan memanfaatkan peluang yang ada dalam karier dan kehidupan pribadi mereka.</li>
                                        <li>Menginspirasi peserta untuk terus berkembang dan mencapai potensi penuh mereka melalui pembelajaran berkelanjutan dan pengalaman praktis.</li>
                                    </ol>
                                </div>
                            </div>

                            <div className="bg-teal-50 p-8 rounded-lg border border-teal-200 mb-12">
                                <h3 className="text-2xl font-bold text-center text-teal-700 mb-6">BOOTCAMP SOFTSKILL</h3>
                                <p className="text-gray-700">
                                    Bootcamp soft skill adalah program pelatihan intensif yang dirancang untuk mengembangkan keterampilan lunak atau soft skill seseorang. Soft skill merujuk pada keterampilan non-teknis yang melibatkan aspek interpersonal, komunikasi, kepemimpinan, kerjasama, dan kreativitas. Bootcamp soft skill biasanya memiliki pendekatan praktis dan interaktif untuk membantu peserta mengasah keterampilan ini dalam waktu singkat.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Values Section */}
            <div className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">Nilai-Nilai Kami</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {values.map((value, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg shadow-sm flex">
                                    <div className="mr-4 text-teal-600">
                                        {value.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                                        <p className="text-gray-600">{value.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">Tim Kami</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {team.map((member, index) => (
                                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                                    <div className="bg-gray-200 h-48 flex items-center justify-center">
                                        <Coffee className="w-12 h-12 text-gray-400" />
                                        {/* In a real implementation, you would use an actual image:
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" /> */}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                        <p className="text-teal-600 text-sm mb-3">{member.position}</p>
                                        <p className="text-gray-600 text-sm">{member.bio}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-16 bg-teal-600 text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6">Siap Meningkatkan Soft Skill Anda?</h2>
                        <p className="text-lg mb-8">
                            Bergabunglah dengan ribuan alumni kami yang telah berhasil meningkatkan karir dan kehidupan mereka melalui program pelatihan Growins.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="/bootcamp-softskill"
                                className="bg-white text-teal-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-md transition-colors"
                            >
                                Lihat Program
                            </a>
                            <a
                                href="/contact"
                                className="bg-yellow-400 hover:bg-yellow-500 text-brown-800 font-bold py-3 px-6 rounded-md transition-colors"
                            >
                                Hubungi Kami
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};

export default About;