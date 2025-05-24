import React, { useState } from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const Show = ({ bootcamp, bootcampRegistration }) => {
    const [loading, setLoading] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        bootcamp_id: bootcamp.id ?? '',
        nama: '',
        email: '',
        whatsapp_number: '',
        city: '',
        province: '',
        jurusan: '',
        asal_kampus: '',
        username_ig: '',
        cv: null,
        cover: null
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('bootcamp_id', data.bootcamp_id);
        formData.append('nama', data.nama);
        formData.append('email', data.email);
        formData.append('whatsapp_number', data.whatsapp_number);
        formData.append('city', data.city);
        formData.append('province', data.province);
        formData.append('jurusan', data.jurusan);
        formData.append('asal_kampus', data.asal_kampus);
        formData.append('username_ig', data.username_ig);
        if (data.cv) formData.append('cv', data.cv);
        if (data.cover) formData.append('cover', data.cover);

        try {
            const response = await axios.post(
                route('user.bootcamp_registrations.store'),
                formData,
            );

            setLoading(false);

        } catch (error) {
            console.error('Submission error:', error);
            alert('Submission failed.');
        }
    };

    // If user has already registered, show registration status
    if (bootcampRegistration) {
        return (
            <AuthenticatedLayout>
                <div className=" mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <Link
                            href={route('user.workshops')}
                            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4 mr-1" />
                            Back
                        </Link>
                    </div>

                    <div className="bg-white shadow sm:rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="mt-3 text-center sm:mt-5">
                                <div className="py-3 flex justify-center">
                                    <img src={`/storage/${bootcamp.cover}`} alt={bootcamp.title} className="w-52 rounded-md" />
                                </div>
                                <h3 className="text-lg leading-6 font-medium flex flex-row gap-2 justify-center items-center text-gray-900">
                                    <CheckCircle className="h-12 w-12 text-green-500" />
                                    Berhasil Mendaftar untuk : {bootcamp.title}
                                </h3>
                                <div className="mt-4 border-t border-gray-200 pt-4">
                                    <h4 className="text-sm font-medium text-gray-900">Registration Details</h4>
                                    <dl className="mt-2 divide-y divide-gray-200">
                                        <div className="py-3 flex justify-between">
                                            <dt className="text-sm font-medium text-gray-500">Status</dt>
                                            <dd className="text-sm text-gray-900">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    {bootcampRegistration.status || 'Pending'}
                                                </span>
                                            </dd>
                                        </div>
                                        <div className="py-3 flex justify-between">
                                            <dt className="text-sm font-medium text-gray-500">Registration Date</dt>
                                            <dd className="text-sm text-gray-900">
                                                {new Date(bootcampRegistration.created_at).toLocaleDateString()}
                                            </dd>
                                        </div>
                                        <div className="py-3 flex justify-between">
                                            <dt className="text-sm font-medium text-gray-500">Email</dt>
                                            <dd className="text-sm text-gray-900">{bootcampRegistration.email}</dd>
                                        </div>
                                    </dl>
                                </div>
                                <div className="mt-6">
                                    <p className="text-sm text-gray-500">
                                        Tim kami akan menghubungi Anda lewat website, email, atau WhatsApp untuk memberikan detail lebih lanjut.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* detail workshop */}
                    <div className="bg-white shadow sm:rounded-lg">
                        <div className="px-4 py-5 sm:p-6">

                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    // If user hasn't registered yet, show the registration form
    return (
        <AuthenticatedLayout pageTitle={`Register for ${bootcamp.title}`}>
            <div className="">
                <div className="bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h1 className="text-2xl font-bold mb-4">Workshop Registration</h1>
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">{bootcamp.title}</h2>
                            <p
                                className="mt-1 text-sm text-gray-500"
                                dangerouslySetInnerHTML={{ __html: bootcamp.description }}
                            />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                            <div>
                                <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="nama"
                                    value={data.nama} // Match with useForm's "nama"
                                    onChange={e => setData('nama', e.target.value)} // Update "nama"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                />
                                {errors.nama && (
                                    <p className="mt-1 text-sm text-red-600">{errors.nama}</p> // Match with "nama"
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="whatsapp_number" className="block text-sm font-medium text-gray-700">
                                    WhatsApp Number
                                </label>
                                <input
                                    type="text"
                                    id="whatsapp_number"
                                    value={data.whatsapp_number}
                                    onChange={e => setData('whatsapp_number', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                    required
                                />
                                {errors.whatsapp_number && (
                                    <p className="mt-1 text-sm text-red-600">{errors.whatsapp_number}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                    City
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    value={data.city}
                                    onChange={e => setData('city', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                />
                                {errors.city && (
                                    <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="province" className="block text-sm font-medium text-gray-700">
                                    Province
                                </label>
                                <input
                                    type="text"
                                    id="province"
                                    value={data.province}
                                    onChange={e => setData('province', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                />
                                {errors.province && (
                                    <p className="mt-1 text-sm text-red-600">{errors.province}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="jurusan" className="block text-sm font-medium text-gray-700">
                                    Jurusan
                                </label>
                                <input
                                    type="text"
                                    id="jurusan"
                                    value={data.jurusan}
                                    onChange={e => setData('jurusan', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                />
                                {errors.jurusan && (
                                    <p className="mt-1 text-sm text-red-600">{errors.jurusan}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="asal_kampus" className="block text-sm font-medium text-gray-700">
                                    Asal Kampus
                                </label>
                                <input
                                    type="text"
                                    id="asal_kampus"
                                    value={data.asal_kampus}
                                    onChange={e => setData('asal_kampus', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                />
                                {errors.asal_kampus && (
                                    <p className="mt-1 text-sm text-red-600">{errors.asal_kampus}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="username_ig" className="block text-sm font-medium text-gray-700">
                                    Instagram Username
                                </label>
                                <input
                                    type="text"
                                    id="username_ig"
                                    value={data.username_ig}
                                    onChange={e => setData('username_ig', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                    name='username_ig'
                                />
                                {errors.username_ig && (
                                    <p className="mt-1 text-sm text-red-600">{errors.username_ig}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="cv" className="block text-sm font-medium text-gray-700">
                                    CV (PDF, DOC, DOCX)
                                </label>
                                <input
                                    type="file"
                                    id="cv"
                                    onChange={e => setData('cv', e.target.files[0])}
                                    accept=".pdf,.doc,.docx"
                                    className="mt-1 block w-full"
                                    name='cv'
                                />
                                {errors.cv && (
                                    <p className="mt-1 text-sm text-red-600">{errors.cv}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            >
                                {processing ? 'Submitting...' : 'Submit Registration'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;