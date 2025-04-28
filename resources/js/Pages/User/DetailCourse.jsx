import GuestLayout from '@/Layouts/GuestLayout'
import React, { useEffect, useState } from 'react'
import { Clock, Star, Users, Calendar, CheckCircle, ChevronDown, ChevronRight, Play, BookOpen, Award, PenTool, Video, VideoIcon, Lock } from 'lucide-react';
import { Link, router, usePage } from '@inertiajs/react';

const DetailCourse = ({ course }) => {
  const user = usePage().props.auth.user;
  const modules = course.modules;

  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState([1]);
  const [loading, setLoading] = useState(false);


  const toggleSection = (sectionId) => {
    if (expandedSections.includes(sectionId)) {
      setExpandedSections(expandedSections.filter(id => id !== sectionId));
    } else {
      setExpandedSections([...expandedSections, sectionId]);
    }
  };

  async function handleTransaction(course_id){
    setLoading(true);
    
    // check logged in or not
    if(!user){
      return router.visit(route('login'));
    }

    router.visit(route('user.checkout', [course_id, user.id]))

  }

  return (
    <GuestLayout>

      <div className="min-h-screen bg-gray-50">
        {/* Course Header */}
        <div className="bg-white py-8 border-b border-gray-200">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Course Info */}
              <div className="md:w-2/3">
                <span className="text-sm font-semibold text-teal-600">{course.category}</span>
                <h1 className="text-3xl font-bold text-gray-800 mt-2 mb-3">{course.title}</h1>
                <p className="text-lg text-gray-600 mb-4">{course.subtitle}</p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 font-medium">{course.rating}</span>
                    <span className="ml-1 text-gray-600">6 ulasan</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5" />
                    <span className="ml-1">...siswa</span>
                  </div>
                </div>

                <div className="flex items-center mb-6">
                  <div className="ml-2">
                    <p className="font-medium">Dibuat oleh</p>
                    <p className="text-teal-600 hover:text-teal-700">{course.instructor.name}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Terakhir diperbarui {course.updated_at}
                  </div>
                </div>
              </div>

              {/* Course Card */}
              <div className="md:w-1/3 w-full px-2">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 w-full">
                  <img
                    src={`/storage/${course.thumbnail}`}
                    alt={course.title}
                    className="w-full object-cover aspect-video"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-2xl font-bold text-gray-800">
                          Rp {course.price}
                        </p>
                      </div>
                    </div>
                    <button
                        onClick={() => handleTransaction(course.id)}
                        disabled={loading}
                        className={`w-full block text-center py-3 rounded-md font-medium transition duration-300
                          ${loading ? 'bg-teal-300 cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-600 text-white'}`}
                      >
                        {loading ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Loading...</span>
                          </div>
                        ) : (
                          'Beli Sekarang'
                        )}
                      </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              {/* Tabs */}
              <div className="bg-white rounded-lg shadow-sm mb-6">
                <div className="border-b border-gray-200">
                  <div className="flex overflow-x-auto">
                    <button
                      className={`px-6 py-3 text-sm font-medium ${activeTab === 'overview' ? 'text-teal-600 border-b-2 border-teal-500' : 'text-gray-600 hover:text-teal-600'}`}
                      onClick={() => setActiveTab('overview')}
                    >
                      Overview
                    </button>
                    <button
                      className={`px-6 py-3 text-sm font-medium ${activeTab === 'reviews' ? 'text-teal-600 border-b-2 border-teal-500' : 'text-gray-600 hover:text-teal-600'}`}
                      onClick={() => setActiveTab('reviews')}
                    >
                      Ulasan
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 mb-4">Tentang Kursus Ini</h2>
                      <div
                        className="text-gray-700 mb-6"
                        dangerouslySetInnerHTML={{ __html: course.description }}
                      />

                      {/* <h3 className="text-lg font-bold text-gray-800 mb-3">Persyaratan</h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-6">
                        <li>Pengetahuan dasar HTML, CSS, dan JavaScript</li>
                        <li>Pemahaman dasar tentang PHP</li>
                        <li>Pengalaman dengan framework frontend atau backend (direkomendasikan)</li>
                        <li>Node.js dan Composer terinstal di komputer Anda</li>
                      </ul>

                      <h3 className="text-lg font-bold text-gray-800 mb-3">Untuk Siapa Kursus Ini</h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>Developer frontend yang ingin mempelajari backend</li>
                        <li>Developer backend yang ingin mempelajari frontend modern</li>
                        <li>Full-stack developer yang ingin meningkatkan keterampilan</li>
                        <li>Profesional TI yang ingin belajar teknologi web terbaru</li>
                        <li>Mahasiswa atau lulusan jurusan komputer yang ingin memasuki industri web development</li>
                      </ul> */}
                    </div>
                  )}

                  {/* Curriculum Tab */}
                  {activeTab === 'curriculum' && (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-800">Konten Kursus</h2>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">22</span> pelajaran •
                          <span className="font-medium"> 20</span> jam total
                        </div>
                      </div>

                      {curriculum.map(section => (
                        <div key={section.id} className="border border-gray-200 rounded-lg mb-3">
                          <div
                            className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100"
                            onClick={() => toggleSection(section.id)}
                          >
                            <div className="flex items-center">
                              {expandedSections.includes(section.id) ? (
                                <ChevronDown className="w-5 h-5 text-gray-600 mr-2" />
                              ) : (
                                <ChevronRight className="w-5 h-5 text-gray-600 mr-2" />
                              )}
                              <h3 className="font-medium text-gray-800">{section.title}</h3>
                            </div>
                            <div className="text-sm text-gray-600">
                              {section.lectures?.length ?? 0} pelajaran • {section.duration}
                            </div>
                          </div>

                          {expandedSections.includes(section.id) && (
                            <div className="p-4 pt-0 border-t border-gray-200">
                              <ul className="divide-y divide-gray-100">
                                {(section.lectures || []).map(lecture => (
                                  <li key={lecture.id} className="py-3 flex justify-between items-center">
                                    <div className="flex items-center">
                                      <Play className="w-4 h-4 text-gray-500 mr-3" />
                                      <span className="text-gray-800">{lecture.title}</span>
                                      {lecture.isFree && (
                                        <span className="ml-2 text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded">Gratis</span>
                                      )}
                                    </div>
                                    <span className="text-sm text-gray-500">{lecture.duration}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}

                    </div>
                  )}

                  {/* Instructor Tab */}
                  {activeTab === 'instructor' && (
                    <div id="instructor">
                      <h2 className="text-xl font-bold text-gray-800 mb-4">Instruktur</h2>

                      <div className="flex items-start mb-6">
                        <img
                          // src={course.instructor.image}
                          // alt={course.instructor.name}
                          className="w-24 h-24 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">awdawda</h3>
                          <p className="text-gray-600 mb-2">awdad</p>

                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              <span className="ml-1 text-gray-700">5 Rating</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="w-4 h-4 text-gray-500" />
                              <span className="ml-1 text-gray-700">5 Siswa</span>
                            </div>
                            <div className="flex items-center">
                              <BookOpen className="w-4 h-4 text-gray-500" />
                              <span className="ml-1 text-gray-700">5 Kursus</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti consequuntur quas id voluptatum ad sed veniam, assumenda iure quam voluptate molestiae, qui, perspiciatis nobis repellendus culpa molestias dolores perferendis amet?
                      </p>
                    </div>
                  )}

                  {/* Reviews Tab */}
                  {activeTab === 'reviews' && (
                    <div>
                      <div className="flex flex-col md:flex-row gap-6 mb-8">
                        <div className="md:w-1/3 flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-5xl font-bold text-gray-800 mb-2">{course.rating}</div>
                          <div className="flex items-center mb-2">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star key={star} className={`w-5 h-5 ${star <= Math.floor(course.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <p className="text-gray-600">{course.reviews} ulasan</p>
                        </div>

                        <div className="md:w-2/3 flex flex-col justify-center gap-2">
                          {[5, 4, 3, 2, 1].map(rating => {
                            // Calculate percentage (mock data)
                            const percentage = rating === 5 ? 75 :
                              rating === 4 ? 20 :
                                rating === 3 ? 4 :
                                  rating === 2 ? 1 : 0;

                            return (
                              <div key={rating} className="flex items-center">
                                <div className="flex items-center w-24">
                                  <span className="text-gray-700">{rating}</span>
                                  <Star className="w-4 h-4 ml-1 text-yellow-400 fill-yellow-400" />
                                </div>
                                <div className="flex-1 h-2 mx-4 bg-gray-200 rounded">
                                  <div
                                    className="h-2 bg-teal-500 rounded"
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                                <span className="w-12 text-right text-gray-600">{percentage}%</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-gray-800 mb-4">Ulasan Siswa</h3>

                      <div className="space-y-6">
                        {reviews.map(review => (
                          <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center">
                                <div className="bg-teal-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                                  {review.user.charAt(0)}
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-800">{review.user}</h4>
                                  <div className="flex items-center mt-1">
                                    {[1, 2, 3, 4, 5].map(star => (
                                      <Star key={star} className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            <p className="text-gray-700 mt-2">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:w-1/3">
              {/* Related Courses */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Konten Kursus</h3>

                <div className="space-y-4">
                  <div className="w-full divide-y divide-outline overflow-hidden rounded-radius border border-outline bg-surface-alt/40 text-on-surface dark:divide-outline-dark dark:border-outline-dark dark:bg-surface-dark-alt/50 dark:text-on-surface-dark">
                    
                    {modules.map((module) =>                   
                      <div key={module.id} x-data="{ isExpanded: false }">
                        <button id="controlsAccordionItemOne" type="button" className="flex w-full items-center justify-between gap-4 bg-surface-alt p-4 text-left underline-offset-2 hover:bg-surface-alt/75 focus-visible:bg-surface-alt/75 focus-visible:underline focus-visible:outline-hidden dark:bg-surface-dark-alt dark:hover:bg-surface-dark-alt/75 dark:focus-visible:bg-surface-dark-alt/75" aria-controls="accordionItemOne" x-on:click="isExpanded = ! isExpanded" x-bind:class="isExpanded ? 'text-on-surface-strong dark:text-on-surface-dark-strong font-bold'  : 'text-on-surface dark:text-on-surface-dark font-medium'" x-bind:aria-expanded="isExpanded ? 'true' : 'false'">
                            {module.title}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="size-5 shrink-0 transition" aria-hidden="true" x-bind:class="isExpanded  ?  'rotate-180'  :  ''">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                            </svg>
                        </button>
                            {module.lessons.length > 0 ? (
                              <div 
                                 
                                x-show="isExpanded" 
                                id="lessonsAccordion" 
                                role="region" 
                                aria-labelledby="controlsAccordionLessons" 
                                x-collapse
                              >
                                {module.lessons.map((lesson) => (
                                  <Link 
                                    key={lesson.id} 
                                    className="p-4 text-sm sm:text-base text-pretty flex flex-col gap-1 hover:bg-zinc-200 transition-colors"
                                  >
                                    <div className="flex flex-row gap-2">
                                      <Video /> {lesson.title} <span className={`text-xs font-semibold px-2 py-1 rounded ${lesson.is_free == 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{lesson.is_free == 1 ? "Free Preview" : <Lock size={15}/>}</span>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            ) : (
                              <div 
                                x-cloak 
                                x-show="isExpanded" 
                                id="emptyLessonsAccordion" 
                                role="region" 
                                aria-labelledby="controlsAccordionEmptyLessons" 
                                x-collapse
                              >
                                <div className="p-4 text-sm sm:text-base text-pretty flex flex-col gap-1 hover:bg-zinc-200 text-zinc-600 italic">
                                  Belum ada materi, nantikan yaa
                                </div>
                              </div>
                            )}
                      </div>
                      )}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </GuestLayout >
  )
}

export default DetailCourse