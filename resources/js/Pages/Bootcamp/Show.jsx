import { Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { useState } from 'react';

export default function Show({ bootcamp }) {
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Handle form submission
    };

    return (
        <GuestLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Bootcamp Details */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-8">
                        <div className="p-6">
                            <h1 className="text-3xl font-bold mb-4">{bootcamp.title}</h1>
                            <p className="text-gray-600 mb-4">{bootcamp.description}</p>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <h3 className="font-semibold">Main Theme</h3>
                                    <p>{bootcamp.main_theme}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Schedule</h3>
                                    <p>{bootcamp.date} at {bootcamp.time}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="text-3xl font-bold">
                                        Rp {bootcamp.discounted_price || bootcamp.normal_price}
                                    </span>
                                    {bootcamp.discounted_price && (
                                        <span className="text-gray-500 line-through ml-2">
                                            Rp {bootcamp.normal_price}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Registration Form */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-6">Registration Form</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input type="hidden" name="bootcamp_id" value={bootcamp.id} />
                                
                                <div>
                                    <label className="block mb-2">Full Name</label>
                                    <input type="text" name="full_name" required 
                                        className="w-full rounded-md border-gray-300" />
                                </div>

                                <div>
                                    <label className="block mb-2">Email</label>
                                    <input type="email" name="email" required 
                                        className="w-full rounded-md border-gray-300" />
                                </div>

                                <div>
                                    <label className="block mb-2">WhatsApp Number</label>
                                    <input type="text" name="whatsapp_number" required 
                                        className="w-full rounded-md border-gray-300" />
                                </div>

                                <div>
                                    <label className="block mb-2">City</label>
                                    <input type="text" name="city" required 
                                        className="w-full rounded-md border-gray-300" />
                                </div>

                                <div>
                                    <label className="block mb-2">Province</label>
                                    <input type="text" name="province" required 
                                        className="w-full rounded-md border-gray-300" />
                                </div>

                                <button type="submit" 
                                    disabled={loading}
                                    className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition">
                                    {loading ? 'Processing...' : 'Register Now'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}