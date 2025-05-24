import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React from 'react'
import { Link } from '@inertiajs/react'
import { ArrowLeft, Download } from 'lucide-react'

const Show = ({ bootcamp, registrations }) => {

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <AuthenticatedLayout pageTitle={`${bootcamp.title} - Registrations`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/bootcamp"
              className="inline-flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back to Bootcamps
            </Link>
          </div>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 
                     text-white rounded-md shadow-sm transition-colors"
          >
            <Download className="h-5 w-5 mr-2" />
            Export Data
          </button>
        </div>

        {/* Bootcamp Info Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Bootcamp Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 dark:text-gray-400">Title</p>
              <p className="font-medium">{bootcamp.title}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Main Theme</p>
              <p className="font-medium">{bootcamp.main_theme}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Start Date - End Date</p>
              <p className="font-medium">{formatDate(bootcamp.date_start)} - {formatDate(bootcamp.date_end)}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Time</p>
              <p className="font-medium">{bootcamp.time_start} - {bootcamp.time_end}</p>
            </div>
          </div>
        </div>

        {/* Registrations Table */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Full Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    WhatsApp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    City
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Province
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Registration Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {registrations.data.map((registration) => (
                  <tr key={registration.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {registration.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {registration.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {registration.whatsapp_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {registration.city}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {registration.province}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {new Date(registration.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* No Data Message */}
          {registrations.data.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No registrations found for this bootcamp.
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default Show