import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React from 'react'
import { router, Link } from '@inertiajs/react'
import { PlusCircle, Pencil, Trash2, Eye, PenTool, NotebookTabs } from 'lucide-react'

const Index = ({ bootcamps }) => {
  const data = bootcamps.data;

  const handleDelete = id => {
    if (confirm('Are you sure you want to delete this bootcamp?')) {
      router.delete(`/admin/bootcamp/${id}`)
    }
  }

  console.log(data);

  return (
    <AuthenticatedLayout pageTitle="Bootcamp Softskill Settings">
      <div className="">
        {/* Header */}
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <Link
            href={route('bootcamp.create')}
            className="inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 
                     text-white rounded-md shadow-sm transition-colors mt-4 sm:mt-0"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Create Bootcamp
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
          <div className="w-full">
            <table className="w-full table-fixed">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/6">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-2/6">
                    Cover
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/6">
                    Poster
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/12">
                    Normal Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/12">
                    Discounted Price
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/6">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {data.map(b => (
                  <tr key={b.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white break-words">
                      {b.title}
                    </td>
                    <td className="px-2 py-2 text-sm text-gray-500 dark:text-gray-300 max-w-[80px] w-[80px]">
                      {b.cover ? (
                        <img
                          src={`/storage/${b.cover}`}
                          alt="Cover"
                          className="w-24 h-auto rounded object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <span className="italic text-gray-400">No cover</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 break-words">
                      {b.poster ? (
                        <img
                          src={`/storage/${b.poster}`}
                          alt="poster"
                          className="w-24 h-auto rounded object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <span className="italic text-gray-400">No poster</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      Rp {b.normal_price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      {b.discounted_price ? `Rp ${b.discounted_price.toLocaleString()}` : '-'}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex flex-col gap-2">
                        <Link
                          href={`/admin/bootcamp/${b.id}`}
                          className="inline-flex items-center px-3 py-1.5 bg-green-500 text-white rounded-md 
                                   hover:bg-green-600 transition-colors"
                        >
                          <NotebookTabs className="h-4 w-4 mr-1" />
                          Submissions
                        </Link>
                        <Link
                          href={route('bootcamp.show.public', b.slug)}
                          target='_blank'
                          className="inline-flex items-center px-3 py-1.5 bg-blue-500 text-white rounded-md 
                                   hover:bg-blue-600 transition-colors"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Link>
                        <Link
                          href={`/admin/bootcamp/${b.id}/edit`}
                          className="inline-flex items-center px-3 py-1.5 bg-amber-500 text-white rounded-md 
                                   hover:bg-amber-600 transition-colors"
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(b.id)}
                          className="inline-flex items-center px-3 py-1.5 bg-red-500 text-white rounded-md 
                                   hover:bg-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </button>
                      </div>
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