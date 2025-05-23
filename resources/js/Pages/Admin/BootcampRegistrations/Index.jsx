import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';

export default function Index({ registrations }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this registration?')) {
            router.delete(route('admin.bootcamp_registrations.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h1 className="text-2xl font-bold mb-6">Bootcamp Registrations</h1>
                            
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">WhatsApp</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {registrations.data.map((registration) => (
                                        <tr key={registration.id}>
                                            <td className="px-6 py-4">{registration.full_name}</td>
                                            <td className="px-6 py-4">{registration.email}</td>
                                            <td className="px-6 py-4">{registration.whatsapp_number}</td>
                                            <td className="px-6 py-4">{registration.city}, {registration.province}</td>
                                            <td className="px-6 py-4">
                                                <Link 
                                                    href={route('admin.bootcamp_registrations.show', registration.id)}
                                                    className="text-teal-600 hover:text-teal-800 mr-3"
                                                >
                                                    View
                                                </Link>
                                                <Link 
                                                    href={route('admin.bootcamp_registrations.edit', registration.id)}
                                                    className="text-blue-600 hover:text-blue-800 mr-3"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(registration.id)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}