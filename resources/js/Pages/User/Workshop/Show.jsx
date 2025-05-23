import React from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { CheckCircle } from 'lucide-react';

const Show = ({ bootcamp, bootcampRegistration }) => {
    const { data, setData, post, processing, errors } = useForm({
        bootcamp_id: bootcamp.id,
        full_name: '',
        email: '',
        whatsapp_number: '',
        city: '',
        province: '',
        jurusan: '',
        asal_kampus: '',
        username_ig: '',
        cv: null
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.bootcamp_registrations.store', bootcamp.id), {
            onSuccess: (success) => {
                console.log(success);// Handle success, e.g., show a success message or redirect
            },
            onError: (error) => {
                console.log(error);// Handle error, e.g., show an error message
            }
        });
    };

    // If user has already registered, show registration status
    if (bootcampRegistration) {
        return (
            <AuthenticatedLayout>
                <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow sm:rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center justify-center">
                                <CheckCircle className="h-12 w-12 text-green-500" />
                            </div>
                            <div className="mt-3 text-center sm:mt-5">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    You're registered for {bootcamp.title}
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
                                        We'll send you updates about the workshop through WhatsApp and email.
                                        Please make sure to check your messages regularly.
                                    </p>
                                </div>
                            </div>
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

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="full_name"
                                    value={data.full_name}
                                    onChange={e => setData('full_name', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                />
                                {errors.full_name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>
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