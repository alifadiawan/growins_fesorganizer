import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Link, usePage } from '@inertiajs/react'
import { PenIcon, VideoIcon } from 'lucide-react'
import React from 'react'

const Dashboard = ({ course }) => {
  const user = usePage().props.auth.user;

  return (
    <AuthenticatedLayout>
      <h2 className="text-2xl font-bold text-gray-800 my-5">
        👋 Welcome back, {user.name}!
      </h2>

      <div className="flex flex-row gap-3 w-full">
        <div className="flex items-center shadow justify-between p-4 bg-white rounded-md min-w-64">
          <div>
            <h6 className="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase">
              My Courses
            </h6>
            <span className="text-xl font-semibold">{course}</span>
          </div>
          <div>
            <span>
              <VideoIcon />
            </span>
          </div>
        </div>

        <div className="flex items-center shadow justify-between p-4 bg-white rounded-md min-w-64">
          <div>
            <h6 className="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase">
              Quiz Taken
            </h6>
            <span className="text-xl font-semibold">4</span>
          </div>
          <div>
            <span>
              <PenIcon />
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 border border-green-500 rounded-md text-center">
        <h4 className="text-lg font-semibold text-gray-800">Looking to Learn Something New?</h4>
        <p className="text-sm text-gray-700 mb-4">Explore our top-rated courses and expand your skills.</p>
        <Link
          href="/courses"
          className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Browse Courses
        </Link>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div className="bg-white shadow rounded-md divide-y">
          <div className="p-4 hover:bg-gray-50">
            <p className="text-sm text-gray-700">✅ You completed <strong>React Basics Quiz</strong>.</p>
            <span className="text-xs text-gray-400">2 hours ago</span>
          </div>
          <div className="p-4 hover:bg-gray-50">
            <p className="text-sm text-gray-700">📚 You enrolled in <strong>Advanced Laravel</strong>.</p>
            <span className="text-xs text-gray-400">1 day ago</span>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Course Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white shadow rounded-md p-4">
            <h5 className="font-medium text-gray-700 mb-1">Laravel Fundamentals</h5>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-green-500 h-3 rounded-full" style={{ width: '70%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">70% completed</p>
          </div>

          <div className="bg-white shadow rounded-md p-4">
            <h5 className="font-medium text-gray-700 mb-1">React Essentials</h5>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-blue-500 h-3 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">45% completed</p>
          </div>
        </div>
      </div>


    </AuthenticatedLayout>
  )
}

export default Dashboard