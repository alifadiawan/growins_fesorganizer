import Pagination from '@/Components/Pagination'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Link } from '@inertiajs/react';
import React from 'react'

const AllCourseIndex = ({ myCourse }) => {
  const segments = window.location.pathname.split('/');
  const lastSegment = segments.pop() || segments.pop();

  return (
    <AuthenticatedLayout pageTitle="My Course">

      <Link href={route('admin.course.create')}>Add Course</Link>

      <div className="overflow-x-auto bg-white">
        <table className="min-w-full divide-y-2 divide-gray-200">
          <thead className="sticky top-0 bg-white">
            <tr className="*:font-medium *:text-gray-900">
              <th className="px-3 py-2 whitespace-nowrap text-start">No</th>
              <th className="px-3 py-2 whitespace-nowrap text-start">Title</th>
              <th className="px-3 py-2 whitespace-nowrap text-start">Role</th>
              <th className="px-3 py-2 whitespace-nowrap text-start">Email</th>
              <th className="px-3 py-2 whitespace-nowrap text-start">Kota</th>
              <th className="px-3 py-2 whitespace-nowrap text-start">Nomor HP</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">

            {myCourse?.data?.length > 0 ? (
              myCourse.data.map((item, index) => (
                <tr key={item.id} className="*:text-gray-900 *:first:font-medium">
                  <td className="px-3 py-2 whitespace-nowrap">{index + 1}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{item.title}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{item.slug}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{item.price}</td>
                  <td className="px-3 py-2 whitespace-nowrap capitalize">{item.status}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{new Date(item.created_at).toLocaleDateString()}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <Link href={route('dosen.detailCourse', { user_id: lastSegment, course_id: item.id })} className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded-md text-white">
                      Detail
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <td colSpan={6} className="py-4 text-gray-500">No Courses Created</td>
              </tr>
            )}


          </tbody>
        </table>
      </div>

      <Pagination meta={myCourse} links={myCourse.links} />

    </AuthenticatedLayout>
  )
}

export default AllCourseIndex