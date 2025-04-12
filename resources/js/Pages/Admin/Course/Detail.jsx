import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import {
  ChevronLeft, Edit, Calendar, Users, DollarSign,
  Award, Trash2, FileText, Clock, Eye
} from 'lucide-react';

import React from 'react'

const Detail = ({ course }) => {

  console.log(course)

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
      Inertia.delete(route('admin.courses.destroy', course.id));
    }
  };

  const handlePublishToggle = () => {
    Inertia.patch(route('admin.courses.toggle-status', course.id));
  };

  if (!course) return <div className="p-6 text-gray-600">Loading...</div>;

  return (
    <AuthenticatedLayout>
    
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb and actions header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center">
          <Link  className="flex items-center text-gray-600 hover:text-blue-600">
            <ChevronLeft size={16} className="mr-1" />
            <span>Back to courses</span>
          </Link>
        </div>
        
        <div className="flex gap-3">
          <Link  className="flex items-center px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md">
            <Eye size={16} className="mr-2" />
            Preview
          </Link>
          <Link className="flex items-center px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md">
            <Edit size={16} className="mr-2" />
            Edit Course
          </Link>
          <button 
            onClick={course.status === 'draft' ? handlePublishToggle : null}
            className={`flex items-center px-4 py-2 text-sm rounded-md ${
              course.status === 'draft' 
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
                src={course.thumbnails}  
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
      </div>
    </div>
  </AuthenticatedLayout>
  )
}

export default Detail