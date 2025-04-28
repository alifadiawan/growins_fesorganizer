import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Link } from '@inertiajs/react';
import React from 'react'

const MyCourse = ({myCourse}) => {
    console.log(myCourse);
    return (
        <AuthenticatedLayout>
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-semibold text-gray-900">My Courses</h1>
                    </div>

                    {myCourse.length === 0 ? (
                        <div className="bg-white rounded-lg p-8 text-center shadow-sm border border-gray-100">
                            <p className="text-gray-500">You haven't enrolled in any courses yet.</p>
                            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                Browse Courses
                            </button>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {myCourse.map(course => (
                                <div key={course.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow duration-200">
                                    {course.course.thumbnail && (
                                        <div className="aspect-video w-full mb-3 bg-gray-100 rounded overflow-hidden">
                                            <img
                                                src={`/storage/${course.course.thumbnail}`}
                                                alt={`${course.course.title}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <h3 className="font-medium text-gray-900 mb-1">{course.course.title}</h3>
                                    <p className="text-sm text-gray-500 mb-3">{course.course.instructor}</p>
                                    <div className="flex items-center justify-between">
                                        <Link href={route('user.coursePlay', course.course.id)} className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                                            Start Learning
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-12">
                        <h2 className="text-xl font-medium text-gray-900 mb-4">Recommended For You</h2>
                        <div className="flex flex-row gap-6 w-full">
                            <div className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-center w-full">
                                <p className="text-gray-500">Discover more courses that match your interests</p>
                                <button className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                                    Explore Catalog
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default MyCourse