import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, router } from '@inertiajs/react';
import axios from 'axios';
import {
  ChevronLeft, Edit, Calendar, Users, DollarSign,
  Award, Trash2, FileText, Clock, Eye
} from 'lucide-react';

import React from 'react'

const Detail = ({ course }) => {

  console.log(course.id)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const handleArchiveCourse = () => {
    if (confirm("Are you sure you want to archive this course?")) {
      axios.delete(route('api.courses.delete', course.id))
        .then(function (response) {
          router.visit(route('admin.course.index'))
        });
    }
  };

  const handlePublishToggle = () => {
    // Inertia.patch(route('admin.courses.toggle-status', course.id));
  };

  if (!course) return <div className="p-6 text-gray-600">Loading...</div>;

  return (
    <AuthenticatedLayout>

      <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb and actions header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center">
            <Link href={route('admin.course.index')} className="flex items-center text-gray-600 hover:text-blue-600">
              <ChevronLeft size={16} className="mr-1" />
              <span>Back to courses</span>
            </Link>
          </div>

          <div className="flex gap-3">
            <Link className="flex items-center px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md">
              <Eye size={16} className="mr-2" />
              Preview
            </Link>
            <Link href={route('admin.course.edit', course.id)} className="flex items-center px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md">
              <Edit size={16} className="mr-2" />
              Edit Course
            </Link>
            <button
              onClick={course.status === 'draft' ? handlePublishToggle : null}
              className={`flex items-center px-4 py-2 text-sm rounded-md ${course.status === 'draft'
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-200 text-gray-600 cursor-not-allowed'
                }`}
              disabled={course.status !== 'draft'}
            >
              {course.status === 'draft' ? 'Publish Course' : 'Published'}
            </button>
            <button
              onClick={handleArchiveCourse}
              className="flex items-center px-4 py-2 text-sm bg-red-50 text-red-600 hover:bg-red-100 rounded-md"
            >
              <Trash2 size={16} className="mr-2" />
              Archive
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Course main info */}
          <div className="lg:col-span-2 bg-white shadow rounded-lg overflow-hidden">
            {course.thumbnail && (
              <div className="w-full h-48 bg-gray-200 relative">
                <img
                  src={`/storage/${course.thumbnail}`}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-6">
              <div className="flex items-start justify-between">
                <h1 className="text-2xl font-bold">{course.title}</h1>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                  {course.status}
                </span>
              </div>

              <div className="mt-4 text-gray-700">
                <p>{course.description || "No description provided."}</p>
              </div>

              <div className="mt-6 border-t pt-4">
                <h2 className="text-lg font-semibold mb-3">Course Author</h2>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-3">
                    {course.user?.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <p className="font-medium">{course.user?.name || 'Unknown'}</p>
                    <p className="text-sm text-gray-500">{course.user?.email || ''}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course stats and meta */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Course Details</h2>

              <div className="space-y-4">
                <div className="flex items-center">
                  <DollarSign size={18} className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="font-semibold">
                      {course.price > 0 ? `$${course.price}` : 'Free'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Users size={18} className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Enrollments</p>
                    <p className="font-semibold">0 students</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Calendar size={18} className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Created On</p>
                    <p className="font-semibold">{formatDate(course.created_at)}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Calendar size={18} className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="font-semibold">{formatDate(course.updated_at)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Link
                  // href={route('admin.courses.enrollments', course.id)} 
                  className="block w-full text-center py-2 px-4 border border-gray-300 rounded hover:bg-gray-50 text-sm"
                >
                  View Enrollments
                </Link>
                <Link
                  // href={route('admin.courses.modules.index', course.id)} 
                  className="block w-full text-center py-2 px-4 border border-gray-300 rounded hover:bg-gray-50 text-sm"
                >
                  Manage Modules
                </Link>
                <Link
                  // href={route('admin.courses.materials', course.id)} 
                  className="block w-full text-center py-2 px-4 border border-gray-300 rounded hover:bg-gray-50 text-sm"
                >
                  Manage Materials
                </Link>
              </div>
            </div>
          </div>
          
          {/* course content */}
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Modules & Lessons</h2>
            </div>
          </div>
        </div>
        {course.modules.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="text-gray-500">No modules yet. Add a module to get started.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {course.modules.map((module, index) => (
              <div key={module.id} className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-center mb-4 pb-2 border-b">
                  <div className="flex items-center">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium rounded-full h-6 w-6 flex items-center justify-center mr-3">
                      {index + 1}
                    </span>
                    <h3 className="font-bold text-lg text-gray-800 flex items-center space-x-2">
                      <span>{module.title}</span>
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${module.is_free == 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                        {module.is_free == 1 ? "Free for public" : "Paid"}
                      </span>
                    </h3>
                  </div>
                </div>

                <div className="ml-6">
                  <h4 className="font-medium text-sm text-gray-600 mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                    </svg>
                    Lessons ({module.lessons.length})
                  </h4>

                  {module.lessons.length === 0 ? (
                    <div className="text-center py-6 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-500 italic">No lessons added yet.</p>
                    </div>
                  ) : (
                    <ul className="space-y-3 mb-4">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <li key={lesson.id} className="bg-gray-50 p-4 rounded-md hover:bg-gray-100 transition-all border border-gray-100">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <span className="text-sm font-medium bg-gray-200 text-gray-700 rounded-full h-6 w-6 flex items-center justify-center mr-3">
                                {lessonIndex + 1}
                              </span>
                              <h3 className="font-medium text-gray-800 flex items-center space-x-2">
                                <span>{lesson.title}</span>
                                <span className={`text-xs font-semibold px-2 py-1 rounded ${lesson.is_free ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                  }`}>
                                  {lesson.is_free ? "Free" : "Paid"}
                                </span>
                              </h3>
                            </div>
                          </div>

                          <div className="pl-9">
                            <p className="text-gray-700 text-sm mb-2">{lesson.content}</p>

                            {lesson.video_url && (
                              <div className="flex items-center mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                  <path fillRule="evenodd" d="M10 18a1 1 0 001-1v-6.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 10.414V17a1 1 0 001 1z" clipRule="evenodd" />
                                </svg>
                                <a href={lesson.video_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 text-sm truncate max-w-md">
                                  {lesson.video_url}
                                </a>
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </AuthenticatedLayout>
  )
}

export default Detail