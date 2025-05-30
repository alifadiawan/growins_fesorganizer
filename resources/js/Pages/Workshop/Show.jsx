
import { Navbar } from '@/Components/Navbar';
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import RegisterForm from '@/Components/RegisterForm';


export default function Show({ bootcamp }) {
    const data = bootcamp || {};

    let parsedAttributesFromJSON = [];
    try {
        // Use data.custom_attributes which is the prop for the JSON string
        // Provide a default of '[]' if it's null or undefined
        parsedAttributesFromJSON = JSON.parse(data.custom_attributes || '[]');
    } catch (error) {
        console.error("Failed to parse custom_attributes JSON:", error);
        // Consider setting a state here to show an error message in the UI
    }

    const transformedAttributes = parsedAttributesFromJSON.map(attr => ({
        label: attr.title,
        // Use attr.name if your JSON provides it, otherwise generate from title.
        // Ensure the generated name is a valid and unique HTML attribute.
        name: attr.name || attr.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        type: attr.dataType, // Assumes 'dataType' from JSON maps to input 'type'
        required: typeof attr.required === 'boolean' ? attr.required : false, // Use from JSON if valid, else default
        placeholder: attr.placeholder || `Masukkan ${attr.title}`, // Use from JSON if provided, else default
        options: Array.isArray(attr.options) ? attr.options : [], // For select type, use from JSON if array
        rows: attr.rows || 3 // Default rows for textarea
    }));

    const finalAttributes = [
        ...transformedAttributes,
        // Example: if you always want a specific field in addition to dynamic ones
        // { label: "Comments", name: "comments", type: "textarea", required: false, placeholder: "Any additional comments?" }
    ];

    // Helper function to format dates (basic example)
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        } catch (e) {
            return dateString; // Return original if parsing fails
        }
    };

    // Default values for data 
    const {
        title = 'Default Event Title',
        description = 'Default event description goes here. This event is about something amazing.',
        quota = null,
        cover = 'https://placehold.co/1600x800/16a34a/ffffff?text=Event+Cover&font=inter',
        poster = 'https://placehold.co/600x900/16a34a/ffffff?text=Event+Poster&font=inter',
        url = '#',
        time_start = '00:00',
        time_end = '00:00',
        date_start = null,
        date_end = null,
        location = 'Default Location' && 'Zoom Meeting',
        normal_price = 0,
        discounted_price = null,
        currency = 'Rp.',
        meta_description = null,
        cta_button_text = 'Register Now',
        short_description = 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        features = [],
        custom_attributes = [],
        sponsors = [],
    } = data;

    const heroBgStyle = {
        backgroundImage: `url('${cover}')`,
    };

    const CheckIcon = () => (
        <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
        </svg>
    );

    // SVG Info/Requirement Icon (optional, for free tier requirements)
    const InfoIcon = () => (
        <svg className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
        </svg>
    );

    const cards = [
        {
            id: 1,
            title: "Free Plan",
            description: "Perfect for getting started with basic features and exploring our platform without any cost",
            price: 0,
            features: [
                "Basic access to courses",
                "Community support",
                "Limited resources",
                "Standard templates"
            ],
            type: "free",
            popular: false
        },
        {
            id: 2,
            title: "Premium Plan",
            description: "Unlock full potential with advanced features, priority support, and exclusive content",
            price: 500000,
            features: [
                "Full access to all courses",
                "Priority support",
                "Unlimited resources",
                "Premium templates",
                "1-on-1 mentoring",
                "Certificate of completion"
            ],
            type: "paid",
            popular: true
        }
    ];

    return (
        <div className="bg-gradient-to-r from-teal-900 to-teal-600 font-inter">
            <Navbar />

            {/* Hero Section with Poster Layout */}
            <header className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden">
                {/* Background gradient overlay for smooth transition */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-50/20 pointer-events-none" />

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="order-2 lg:order-1 space-y-8"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
                            {title}
                        </h1>
                        <div
                            className="text-lg md:text-xl text-zinc-200 leading-relaxed line-clamp-6"
                            dangerouslySetInnerHTML={{ __html: short_description }}
                        />
                        <div className="flex lg:flex-row flex-col gap-5">
                            <Link
                                href="#ticket_information"
                                className="inline-block bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 hover:from-green-300 hover:via-emerald-400 hover:to-teal-400 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-300 hover:translate-y-[-2px] shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                DAFTAR GRATIS
                            </Link>
                            <Link
                                href={route('user.workshops')}
                                className="inline-block border border-green-200 hover:border-green-300 bg-transparent hover:bg-green-50 text-white hover:text-green-700 font-normal py-4 px-8 rounded-lg transition-all duration-300 opacity-70 hover:opacity-90"
                            >
                                DAFTAR BERBAYAR
                            </Link>
                        </div>
                        {url && (
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href={url}
                                target={url.startsWith('#') ? '_self' : '_blank'}
                                rel={url.startsWith('#') ? '' : 'noopener noreferrer'}
                                className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white text-lg font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-green-500/50 transition-all duration-300"
                            >
                                {cta_button_text}
                            </motion.a>
                        )}
                    </motion.div>

                    {/* Poster Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="order-1 lg:order-2 flex justify-center"
                    >
                        <div className="relative group">
                            {/* Main poster image */}
                            <div className="relative overflow-hidden rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                                <img
                                    src={`/storage/${poster}`}
                                    alt={title}
                                    className="w-full h-[300px] md:h-[400px] lg:h-[550px] object-cover"
                                />
                                {/* Subtle overlay for better text contrast if needed */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            {/* Enhanced decorative elements */}
                            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full opacity-20 blur-xl animate-pulse" />
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-blue-400 to-purple-600 rounded-full opacity-15 blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* Event Information */}
            <section id="event_info" className="py-20 md:py-28 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16 md:mb-20">
                        <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-black mb-6">
                            Apa itu {title} ?
                        </h2>
                        <div className="w-32 h-2 bg-gradient-to-r from-green-500 to-green-600 mx-auto rounded-full shadow-lg"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 xl:gap-10 items-stretch mb-12">

                        {/* Main Event Description Card */}
                        <div className="relative group">
                            {/* Animated gradient border */}
                            <div className="relative bg-white p-8 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-500 flex flex-col transform hover:-translate-y-2 hover:scale-105 border border-green-100">

                                <div className="flex-grow">
                                    <div className="prose max-w-none prose-h1:m-0 prose-h2:m-0 prose-h3:m-0 prose-p:m-0 max-w-none">
                                        <div dangerouslySetInnerHTML={{ __html: short_description }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>


            {/* Registration Form Section (if form_fields are provided) */}
            {/* {finalAttributes && finalAttributes.length > 0 ? (
                <RegisterForm custom_attributes={finalAttributes} />
            ) : (
                <section id="register-placeholder" className="py-16 bg-gray-50">
                    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-2xl font-bold text-gray-700">Registration Form Not Available</h2>
                        <p className="mt-2 text-lg text-gray-500">Custom form fields are not configured for this event.</p>
                    </div>
                </section>
            )} */}


            {/* Poster Section (Optional) */}
            {poster && (
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            Event Poster
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto rounded-full" />
                        <img
                            src={`/storage/${poster}`}
                            alt={`${title} Poster`}
                            className="lg:max-w-md mx-auto rounded-lg shadow-xl mt-8"
                            onError={(e) => { e.target.style.display = 'none'; /* Hide if image fails */ }}
                        />
                    </div>
                </section>
            )}

            <section className="lg:px-56 px-6 py-16 bg-gray-50">
                <div className="prose max-w-none prose-h1:m-0 prose-h2:m-0 prose-h3:m-0 prose-p:m-0 text-black mb-8 leading-relaxed max-w-none"
                    dangerouslySetInnerHTML={{ __html: description }}>
                </div>
            </section>

            <section id="ticket_information" className="py-20 md:py-28 bg-gradient-to-r from-teal-900 to-teal-600 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16 md:mb-20">
                        <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-white mb-6">
                            Infomasi Harga Pendaftaran
                        </h2>
                        <div className="w-32 h-2 bg-gradient-to-r from-green-500 to-green-600 mx-auto rounded-full shadow-lg"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10 items-stretch">
                        <div className="relative group md:col-span-2 lg:col-span-1">
                            {/* Animated gradient border */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

                            <div className="relative bg-white p-8 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-500 flex flex-col transform hover:-translate-y-2 hover:scale-105 border border-green-100">
                                {/* Premium badge */}
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                                        🌟 MOST POPULAR
                                    </div>
                                </div>

                                <div className="flex-grow pt-4">
                                    <div className="flex items-center mb-4">
                                        <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">Selection</h3>
                                        <span className="ml-3 bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">Limited Spots</span>
                                    </div>

                                    <p className="text-5xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-6">Free</p>

                                    {/* Benefits Section */}
                                    <div className="mb-6">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-3">What You Get:</h4>
                                        <ul className="space-y-3 text-gray-700 mb-6">
                                            {[
                                                "Personal & Group Skill Coaching",
                                                "CV & LinkedIn Review Online",
                                                "Public Speaking Simulation",
                                                "Project Assignments",
                                                "Career Tools Kit",
                                                "Networking Group",
                                                "Sertifikat Digital + Hadiah Spesial",
                                                "Internship Gateway (Bagi Peserta yang terpilih)"
                                            ].map((feature, index) => (
                                                <li key={index} className="flex items-start group/item">
                                                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mr-3 mt-0.5 flex items-center justify-center">
                                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <span className="group-hover/item:text-green-700 transition-colors duration-200">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Requirements Section */}
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-600 font-medium mb-2">Requirements:</p>
                                        <ol className="space-y-3 text-gray-700">
                                            {[
                                                "Mengisi Formulir di link berikut",
                                                "Melampirkan CV di Formulir",
                                                "Bersedia Mengikuti Program dari awal hingga akhir",
                                                "Khusus Mahasiswa dan Fresh Graduate",
                                                "Wajib Follow akun instagram @growins.id"
                                            ].map((requirement, index) => (
                                                <li key={index} className="flex items-start text-sm">
                                                    <span className="flex-shrink-0 w-5 h-5 bg-gray-300 text-white rounded-full text-xs font-bold flex items-center justify-center mr-3 mt-0.5">
                                                        {index + 1}
                                                    </span>
                                                    <span>{requirement}</span>
                                                </li>
                                            ))}
                                        </ol>
                                    </div>
                                </div>

                                <a
                                    href=""
                                    target="_blank"
                                    className="mt-10 block w-full text-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 px-8 rounded-xl text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden group/btn"
                                >
                                    <span className="relative z-10">DAFTAR SEKARANG ✨</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                                </a>
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute -inset-1 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative bg-white p-8 rounded-xl shadow-2xl h-full hover:shadow-3xl transition-all duration-500 flex flex-col transform hover:-translate-y-2 hover:scale-105 border border-green-100">

                                <div className="flex-grow">
                                    <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-4">
                                        Member FEST
                                    </h3>

                                    {discounted_price !== null && discounted_price < normal_price ? (
                                        <div className="mb-6">
                                            <div className="flex items-baseline">
                                                <p className="text-4xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                                                   Rp. {discounted_price}
                                                </p>
                                                <span className="text-2xl text-gray-400 line-through ml-3 decoration-2">{currency} {normal_price}</span>
                                            </div>
                                            <div className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold mt-2">
                                                Save {currency} {parseInt(normal_price) - parseInt(discounted_price)} 🔥
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-5xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-6">
                                            {currency} {normal_price}
                                        </p>
                                    )}

                                    <ul className="space-y-4 text-gray-700">
                                        {[
                                            "Personal & Group Skill Coaching",
                                            "CV & LinkedIn Review Online",
                                            "Public Speaking Simulation",
                                            "Project Assignments",
                                            "Career Tools Kit",
                                            "Networking Group",
                                            "Sertifikat Digital + Hadiah Spesial",
                                            "Internship Gateway (Bagi Peserta yang terpilih)"
                                        ].map((feature, index) => (
                                            <li key={index} className="flex items-start group/item">
                                                <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mr-3 mt-0.5 flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <span className="group-hover/item:text-green-700 transition-colors duration-200">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <a
                                    href=""
                                    target="_blank"
                                    className="mt-10 block w-full text-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 px-8 rounded-xl text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden group/btn"
                                >
                                    <span className="relative z-10">DAFTAR SEKARANG ✨</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                                </a>
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute -inset-1 rounded-2xl blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative bg-white p-8 min-h-full rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col transform hover:-translate-y-1 hover:scale-102 border border-green-100">
                                <div className="flex-grow">
                                    <h3 className="text-3xl font-bold text-gray-700 mb-4">
                                        Non Member
                                    </h3>

                                    <p className="text-5xl font-extrabold text-gray-700 mb-6">
                                        {currency} {normal_price}
                                    </p>

                                    <ul className="space-y-4 text-gray-700">
                                        {[
                                            "Personal & Group Skill Coaching",
                                            "CV & LinkedIn Review Online",
                                            "Public Speaking Simulation",
                                            "Project Assignments",
                                            "Career Tools Kit",
                                            "Networking Group",
                                            "Sertifikat Digital + Hadiah Spesial",
                                            "Internship Gateway (Bagi Peserta yang terpilih)"
                                        ].map((feature, index) => (
                                            <li key={index} className="flex items-start group/item">
                                                <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mr-3 mt-0.5 flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <span className="group-hover/item:text-green-700 transition-colors duration-200">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <a
                                    href=""
                                    target="_blank"
                                    className="mt-10 block w-full text-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 px-8 rounded-xl text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden group/btn"
                                >
                                    <span className="relative z-10">DAFTAR SEKARANG 🚀</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


        </div>
    );
}
