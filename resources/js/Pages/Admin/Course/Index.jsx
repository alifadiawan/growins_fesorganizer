import Modal from '@/Components/Modal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'

const Index = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios.get('/api/courses')
      .then(res => {
        setCourses(res.data.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) {
    return <div className="p-4 text-gray-600">Loading courses...</div>;
  }

  return (
    <AuthenticatedLayout pageTitle="Courses">

      {/* <Modal
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
        title="Example Modal"
        maxWidth="lg"
      >
        <h1>Hello World</h1>
      </Modal> */}

      <div className="flex flex-row gap-3 mb-5">
        <button onClick={() => setIsOpen(true)} className='px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md'>New Course </button>
      </div>

      {courses.length === 0 ? (
        <p className="text-gray-500">No courses found.</p>
      ) : (
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
              {courses.map(course => (
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
              ))}
            </tbody>
          </table>
        </div>
      )}

    </AuthenticatedLayout>
  )
}

export default Index