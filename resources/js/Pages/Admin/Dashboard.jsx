import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { ChartBar, Users } from 'lucide-react'
import React from 'react'

const Dashboard = () => {
  return (
    <AuthenticatedLayout pageTitle="Dashboard" >


      <div className="flex flex-row gap-3 w-full">

        {/* cards */}
        <div className="min-w-72 flex flex-row gap-3 items-center bg-white px-6 py-4 rounded-md shadow">
          <Users size={35} />
          <div className="content flex flex-col">
            <h3 className='font-thin text-gray-500 text-xl'>Users Registered</h3>
            <p>2320</p>
          </div>
        </div>
        <div className="flex flex-row gap-3 items-center bg-white px-6 py-4 rounded-md shadow">
          <ChartBar size={35} />
          <div className="content flex flex-col">
            <h3 className='font-thin text-gray-500 text-xl'>All Transactions</h3>
            <p>2320</p>
          </div>
        </div>
        <div className="flex flex-row gap-3 items-center bg-white px-6 py-4 rounded-md shadow">
          <Users size={35} />
          <div className="content flex flex-col">
            <h3 className='font-thin text-gray-500 text-xl'>Courses</h3>
            <p>2320</p>
          </div>
        </div>
        <div className="flex flex-row gap-3 items-center bg-white px-6 py-4 rounded-md shadow">
          <Users size={35} />
          <div className="content flex flex-col">
            <h3 className='font-thin text-gray-500 text-xl'>Users Registered</h3>
            <p>2320</p>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-3 mt-5">
        <div className="bg-white p-5 rounded shadow flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Visitors</p>
            <h3 className="text-xl font-bold text-gray-800">12,456</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded shadow flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-full">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h2" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500">Page Views</p>
            <h3 className="text-xl font-bold text-gray-800">34,890</h3>
          </div>
        </div>

      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Logins */}
        <div className="bg-white shadow rounded-md p-5">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">🔐 Recent Admin Logins</h4>
          <ul className="divide-y divide-gray-200">
            <li className="py-2 flex justify-between text-sm">
              <span>admin@site.com</span>
              <span className="text-gray-400">2 hours ago</span>
            </li>
            <li className="py-2 flex justify-between text-sm">
              <span>superadmin@site.com</span>
              <span className="text-gray-400">1 day ago</span>
            </li>
          </ul>
        </div>

        {/* New Users */}
        <div className="bg-white shadow rounded-md p-5">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">🧑‍💻 Latest Registered Users</h4>
          <ul className="divide-y divide-gray-200">
            <li className="py-2 flex justify-between text-sm">
              <span>johndoe@example.com</span>
              <span className="text-gray-400">Joined 3h ago</span>
            </li>
            <li className="py-2 flex justify-between text-sm">
              <span>janesmith@example.com</span>
              <span className="text-gray-400">Joined yesterday</span>
            </li>
          </ul>
        </div>
      </div>


    </AuthenticatedLayout>
  )
}

export default Dashboard