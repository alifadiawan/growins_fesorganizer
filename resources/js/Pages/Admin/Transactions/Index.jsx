import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Link } from '@inertiajs/react';
import React from 'react'

const Index = ({ transactions }) => {
    const Alltransactions = transactions.data;

    const formatDateIndo = (datetime, withTime = true) => {
        const date = new Date(datetime);

        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            ...(withTime && {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            }),
        };

        return date.toLocaleString('id-ID', options);
    };
    return (
        <AuthenticatedLayout pageTitle="Transactions">
            <div class="overflow-x-auto bg-white">
                <table class="min-w-full divide-y-2 divide-gray-200">
                    <thead class="sticky top-0 bg-white">
                        <tr class="*:font-medium *:text-gray-900">
                            <th class="px-3 py-2 whitespace-nowrap text-start">No</th>
                            <th class="px-3 py-2 whitespace-nowrap text-start">Transaction ID</th>
                            <th class="px-3 py-2 whitespace-nowrap text-start">Transaction Date</th>
                            <th class="px-3 py-2 whitespace-nowrap text-start">Status</th>
                            <th class="px-3 py-2 whitespace-nowrap text-start">Detail</th>
                        </tr>
                    </thead>

                    <tbody class="divide-y divide-gray-200">

                        {Alltransactions.map((item, index) =>
                            <tr class="*:text-gray-900 *:first:font-medium">
                                <td class="px-3 py-2 whitespace-nowrap">{index + 1}</td>
                                <td class="px-3 py-2 whitespace-nowrap">{item.order_id}</td>
                                <td class="px-3 py-2 whitespace-nowrap">{formatDateIndo(item.created_at)}</td>
                                <td class="px-3 py-2 whitespace-nowrap">{item.status}</td>
                                <td class="px-3 py-2 whitespace-nowrap">
                                    <Link href={route('admin.transactions.detail', item.order_id)} className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded-md text-white">Detail</Link>
                                </td>   
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    )
}

export default Index