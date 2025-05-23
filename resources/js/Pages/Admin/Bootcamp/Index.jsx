import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React from 'react'
import { router, Link } from '@inertiajs/react'
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'

const Index = ({ bootcamps }) => {
  const data = bootcamps.data;

  const handleDelete = id => {
    if (confirm('Are you sure you want to delete this bootcamp?')) {
      router.delete(`/admin/bootcamp/${id}`)
    }
  }

  return (
    <AuthenticatedLayout pageTitle="Bootcamp Softskill Settings">
      <div className="">
        {/* Header */}
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <Link 
            href="/admin/bootcamp/create" 
            className="inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 
                     text-white rounded-md shadow-sm transition-colors mt-4 sm:mt-0"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Create Bootcamp
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Main Theme
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Normal Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Discounted Price
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {data.map(b => (
                  <tr key={b.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {b.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 max-w-xs truncate">
                      {b.description}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      {b.main_theme}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      Rp {b.normal_price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      {b.discounted_price ? `Rp ${b.discounted_price.toLocaleString()}` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        href={`/admin/bootcamp/${b.id}/edit`}
                        className="inline-flex items-center px-3 py-1.5 bg-amber-500 text-white rounded-md 
                                 hover:bg-amber-600 transition-colors mr-2"
                      >
                        <Pencil className="h-4 w-4 mr-1" />
                        Edit
                      </Link>
                      <Link 
                        href={`/admin/bootcamp/${b.id}`}
                        className="inline-flex items-center px-3 py-1.5 bg-blue-500 text-white rounded-md 
                                 hover:bg-blue-600 transition-colors mr-2"
                      >
                        View Registrations
                      </Link>
                      <button 
                        onClick={() => handleDelete(b.id)}
                        className="inline-flex items-center px-3 py-1.5 bg-red-500 text-white rounded-md 
                                 hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
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
    </AuthenticatedLayout>
  )
}

export default Index