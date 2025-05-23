import Modal from '@/Components/Modal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { Check, Clock, VideoIcon } from 'lucide-react'

const Index = ({ myCourse, pendingCourse, publishedCourse }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  console.log(courses)

  useEffect(() => {
    axios.get('/api/courses')
      .then(res => {
        setCourses(res.data.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);


  return (
    <AuthenticatedLayout pageTitle="Courses">

      {/* cards */}
      <div className="flex flex-row gap-3 w-full">

        <div className="w-full flex flex-row gap-3 items-center bg-white px-6 py-4 rounded-md shadow">
          <VideoIcon size={35} />
          <div className="content flex flex-col">
            <h3 className='font-thin text-gray-500 text-xl'>My Course</h3>
            <p>{myCourse}</p>
          </div>
        </div>
        <div className="w-full flex flex-row gap-3 items-center bg-white px-6 py-4 rounded-md shadow">
          <Check size={35} />
          <div className="content flex flex-col">
            <h3 className='font-thin text-gray-500 text-xl'>Published</h3>
            <p>{publishedCourse}</p>
          </div>
        </div>
        <div className="w-full flex flex-row gap-3 items-center bg-white px-6 py-4 rounded-md shadow">
          <Clock size={35} />
          <div className="content flex flex-col">
            <h3 className='font-thin text-gray-500 text-xl'>Pending</h3>
            <p>{pendingCourse}</p>
          </div>
        </div>

      </div>

      <div className="flex flex-row gap-3 my-5">
        <Link href={route('admin.course.create')} className='px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md'>New Course </Link>
      </div>



      <div className="bg-white shadow-md rounded overflow-hidden">
        <table className="w-full table-auto">
          <thead className="bg-gray-100 text-left text-sm text-gray-600">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-5">Loading...</td>
              </tr>
            ) : (
              courses.length != 0 ? (
                courses.map(course => (
                  <tr key={course.id} className="border-t">
                    <td className="px-4 py-2">{course.title}</td>
                    <td className="px-4 py-2">Rp. {course.price}</td>
                    <td className="px-4 py-2 capitalize">{course.status}</td>
                    <td className="px-4 py-2 space-x-2">
                      <Link href={route('admin.course.show', { id: course.id, slug: course.slug })} className="text-blue-600 hover:underline">View</Link>
                      <a href={`/courses/${course.id}/edit`} className="text-yellow-600 hover:underline">Edit</a>
                      {/* <button onClick={() => handleDelete(course.id)} className="text-red-600 hover:underline">
                        Delete
                      </button> */}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-5 text-zinc-500">Belum Ada Kursus</td>
                </tr>
              )
            )}

          </tbody>
        </table>
      </div>

    </AuthenticatedLayout>
  )
}

export default Index