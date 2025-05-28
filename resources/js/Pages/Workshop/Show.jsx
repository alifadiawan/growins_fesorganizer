import Footer from '@/Components/Footer';
import { Navbar } from '@/Components/Navbar';
import React from 'react';
import { motion } from 'framer-motion'; // Add this import for animations
import { Link } from '@inertiajs/react';
import RegisterForm from '@/Components/RegisterForm';

export default function Show({ bootcamp }) {
    // Default empty object for landingPageData if not provided, to prevent errors
    const data = bootcamp || {};
    console.log("Bootcamp data:", data);

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

    // finalAttributes will be what's passed to the RegisterForm
    // You could add more static/default fields here if needed
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

    // Default values for data to prevent rendering errors if some fields are missing
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
        location = 'Default Location',
        normal_price = 0,
        discounted_price = null,
        currency = 'USD',
        early_bird_deadline = null,
        meta_description = null,
        cta_button_text = 'Register Now',
        features = [],
        custom_attributes = [],
        sponsors = [],
    } = data;

    const heroBgStyle = {
        backgroundImage: `url('${cover}')`,
    };

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
                        <h1 className="text-4xl md:text-6xl lg:text-7xl text-white leading-tight">
                            {title}
                        </h1>
                        <div
                            className="text-lg md:text-xl text-zinc-200 leading-relaxed line-clamp-6"
                            dangerouslySetInnerHTML={{ __html: description }}
                        />
                        <div className="flex lg:flex-row flex-col gap-5">
                            <Link
                                href={route('user.workshops')}
                                className="inline-block bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 hover:from-green-300 hover:via-emerald-400 hover:to-teal-400 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-300 hover:translate-y-[-2px] shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                DAFTAR BERBAYAR
                            </Link>
                            <Link
                                href={route('user.workshops')}
                                className="inline-block border border-green-200 hover:border-green-300 bg-transparent hover:bg-green-50 text-white hover:text-green-700 font-normal py-4 px-8 rounded-lg transition-all duration-300 opacity-70 hover:opacity-90"
                            >
                                DAFTAR GRATIS
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
                                    className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
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

                {/* Smooth transition curve */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                        className="w-full h-12 md:h-16 lg:h-20"
                    >
                        <path
                            d="M0,120 C300,60 600,60 900,80 C1050,90 1150,100 1200,100 L1200,120 L0,120 Z"
                            fill="white"
                            className="drop-shadow-sm"
                        />
                    </svg>
                </div>

            </header>

            {/* Event Details Cards with enhanced styling */}
            <section className="relative bg-white -mt-1 pt-16 pb-20 px-4">
                {/* Background pattern for visual interest */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, #10b981 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #059669 2px, transparent 2px)`,
                        backgroundSize: '50px 50px'
                    }} />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Section title for better flow */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            Event Details
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto rounded-full" />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 hover:-translate-y-2"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-green-600 transition-colors duration-300">Date</h3>
                                    <p className="text-gray-600 font-medium">
                                        {formatDate(date_start)}
                                        {date_end && date_start !== date_end && <br />}
                                        {date_end && date_start !== date_end && formatDate(date_end)}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 hover:-translate-y-2"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-green-600 transition-colors duration-300">Time</h3>
                                    <p className="text-gray-600 font-medium">{time_start} - {time_end}</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 hover:-translate-y-2"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-green-600 transition-colors duration-300">Location</h3>
                                    <p className="text-gray-600 font-medium">{location}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section with Modern Cards */}
            {features && features.length > 0 && (
                <section className="py-24 px-4">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                                What to Expect
                            </h2>
                        </motion.div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                                >
                                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-3xl">{feature.icon || '⭐'}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Pricing Section */}
            <section id="pricing" className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            Ticket Informations
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto rounded-full" />
                    </div>
                    <div className="flex justify-center">
                        <div className="bg-gray-100 p-8 rounded-lg shadow-xl max-w-md w-full">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Standard Access</h3>
                            {discounted_price !== null && discounted_price < normal_price ? (
                                <div>
                                    <p className="text-4xl font-bold text-green-600">
                                        {currency} {discounted_price}
                                        <span className="text-xl text-gray-500 line-through ml-2">{currency} {normal_price}</span>
                                    </p>
                                    {early_bird_deadline && <p className="mt-1 text-sm text-green-700">Early Bird Discount until {formatDate(early_bird_deadline)}!</p>}
                                </div>
                            ) : (
                                <p className="text-4xl font-bold text-green-600">{currency} {normal_price}</p>
                            )}
                            <p className="mt-4 text-gray-600">Full access to all sessions, networking events, and materials.</p>
                            {url && (
                                <a
                                    href={url.startsWith('#') ? url : url}
                                    target={url.startsWith('#') ? '_self' : '_blank'}
                                    rel={url.startsWith('#') ? '' : 'noopener noreferrer'}
                                    className="mt-6 block w-full text-center bg-green-500 border border-transparent rounded-md py-3 px-8 text-base font-medium text-white hover:bg-green-600 transition-colors"
                                >
                                    {cta_button_text}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Registration Form Section (if form_fields are provided) */}
            {finalAttributes && finalAttributes.length > 0 ? (
                <RegisterForm custom_attributes={finalAttributes} />
            ) : (
                <section id="register-placeholder" className="py-16 bg-gray-50">
                    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-2xl font-bold text-gray-700">Registration Form Not Available</h2>
                        <p className="mt-2 text-lg text-gray-500">Custom form fields are not configured for this event.</p>
                    </div>
                </section>
            )}
            {/* {custom_attributes && custom_attributes.length > 0 && (
                <section id="register" className="py-16 bg-gray-50">
                    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900">Register Your Interest</h2>
                            <p className="mt-2 text-lg text-gray-600">Fill out the form below to secure your spot or get more information.</p>
                        </div>
                        <form className="bg-white p-8 rounded-lg shadow-lg space-y-6">
                            {custom_attributes.map((field) => (
                                <div key={field.name}>
                                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                                        {field.label}
                                        {field.required && <span className="text-red-500">*</span>}
                                    </label>
                                    {field.type === 'select' ? (
                                        <select
                                            id={field.name}
                                            name={field.name}
                                            required={field.required}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                        >
                                            {field.placeholder && <option value="">{field.placeholder}</option>}
                                            {field.options && field.options.map((option, idx) => (
                                                <option key={idx} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    ) : field.type === 'textarea' ? (
                                        <textarea
                                            id={field.name}
                                            name={field.name}
                                            rows={3}
                                            placeholder={field.placeholder}
                                            required={field.required}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                        />
                                    ) : (
                                        <input
                                            type={field.type || 'text'}
                                            id={field.name}
                                            name={field.name}
                                            placeholder={field.placeholder}
                                            required={field.required}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                        />
                                    )}
                                </div>
                            ))}
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                                >
                                    Submit Registration
                                </button>
                            </div>
                        </form>
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
                <div
                    className="text-black mb-8 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: description }}
                ></div>
            </section>


        </div>
    );
}
