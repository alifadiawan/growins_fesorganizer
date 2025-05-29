import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React from 'react'

const Index = () => {
  return (
    <AuthenticatedLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Bootcamp Classes</h1>
        <p>Welcome to the Bootcamp Classes page. Here you can manage your classes.</p>

        <div className="mt-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bootcamp ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slug
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Custom Fields
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Active
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Accent Color
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Updated At
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Example Row */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">123abc</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">bootcamp-uuid-456</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Standard Access</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">standard-access</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$49.99</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Basic access plan</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{"{\"level\":\"beginner\"}"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${true ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" style={{ color: '#34D399' }}>
                  #34D399
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-05-01</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-05-28</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
              {/* More rows here */}
            </tbody>
          </table>


          <div className="mt-4 flex justify-between items-center">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Add New Bootcamp Class
            </button>
            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">Previous</button>
              <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">Next</button>
            </div>
          </div>
        </div>

      </div>
    </AuthenticatedLayout>
  )
}

export default Index