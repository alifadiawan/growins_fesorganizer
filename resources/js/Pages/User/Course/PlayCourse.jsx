import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import React, { useState } from 'react'


const PlayCourse = ({ course, lesson, lesson_id }) => {

  const courseDetail = course
  const userId = usePage().props.auth.user.id;
  const isActive = lesson.id === lesson_id;

  function extractYoutubeId(url) {
    const regex = /(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  function markAsComplete() {
    axios.post(route('api.update.progress', {
      user_id: userId,
      course_id: course.id,
      lesson_id: lesson.id
    }))
      .then(response => {
        console.log('Progress updated:', response.data);
      })
      .catch(error => {
        console.error('Failed to update progress:', error);
      });

  }

  // console.log(courseDetail.modules[0].lessons);
  return (
    <AuthenticatedLayout>
      <div className="min-h-screen bg-white text-gray-900">
        <div className="grid grid-cols-12 gap-6 p-6">

          {/* Left Content: Video and Lecture Info */}
          <div className="col-span-9 space-y-6">

            {/* Video Player */}
            <div className="w-full aspect-video bg-gray-300 rounded-lg overflow-hidden">
              {lesson && (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${extractYoutubeId(lesson.video_url)}`}
                  title={lesson.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>

            {/* Lecture Title */}
            <h1 className="text-2xl font-bold">{courseDetail.title}</h1>

            {/* Lecture Description / Notes */}
            <div dangerouslySetInnerHTML={{ __html: courseDetail.description }} className="space-y-4 text-sm text-gray-700 leading-relaxed">
            </div>

            {/* Additional Buttons (optional) */}
            <div className="flex gap-4">
              <button
                onClick={() => markAsComplete()}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 text-sm">
                Mark as Complete
              </button>
            </div>

          </div>

          {/* Right Sidebar: Lecture List */}
          <div className="col-span-3 space-y-4">
            <div className="text-lg font-semibold">Course Content</div>

            {/* List of Lectures */}
            <div className="space-y-2">

              {courseDetail.modules.map((module) => (
                <div key={module.id} className="space-y-2">

                  {/* Module Title */}
                  <div className="font-bold text-sm text-gray-700">{module.title}</div>

                  {/* Lessons inside the module */}
                  <div className="pl-4 space-y-2">
                    {module.lessons.map((lesson) => (
                      <Link
                        key={lesson.id}
                        href={route('user.coursePlay', { course_id: course.id, lesson_id: lesson.id })}
                        className={`block p-3 rounded-md cursor-pointer border transition-all duration-200
                        ${lesson.completed ? 'bg-green-50 border-green-300' : 'border-gray-200'}
                        ${isActive ? 'bg-blue-100 border-blue-400 font-semibold' : 'hover:bg-gray-100'}
                      `}
                      >
                        <div className="font-medium text-sm truncate">{lesson.title}</div>
                        <div className="text-xs text-gray-500">5:30 min</div>

                        {lesson.completed && (
                          <span className="text-green-600 text-xs font-semibold">
                            ✔ Done
                          </span>
                        )}
                      </Link>
                    ))}

                  </div>

                </div>
              ))}


            </div>
          </div>

        </div>
      </div>
    </AuthenticatedLayout>



  )
}

export default PlayCourse