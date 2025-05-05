import SidebarFilters from '@/Components/SidebarFilters';
import GuestLayout from '@/Layouts/GuestLayout'
import { Link } from '@inertiajs/react';
import { Search, Filter, Clock, Star, ChevronDown, Grid, List, BookOpen } from 'lucide-react';
import React, { useState } from 'react'

const AllCourses = ({ categories, courses }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLevel, setActiveLevel] = useState('all');

  function formatRupiah(amount) {
    // Ensure the amount is a number and fix it to two decimal places
    let formattedAmount = Number(amount).toFixed(2);

    // Split the amount into integer and decimal parts
    let [integer, decimal] = formattedAmount.split(".");

    // Format the integer part with commas
    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Return the formatted string with "Rp" and the formatted integer and decimal parts
    return `Rp ${integer}.${decimal}`;
  }

  function formatDate(dateString) {
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const date = new Date(dateString);

    const day = date.getDate();
    const month = months[date.getMonth()]; // getMonth() is 0-indexed
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }


  return (
    <GuestLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Page Title */}
        <div className="bg-gradient-to-r from-teal-900 to-teal-600 opacity-90 py-8">
          <div className="container mx-auto px-6">
            <h1 className="text-white text-3xl font-bold">Katalog Kursus</h1>
            <p className="text-teal-100 mt-2">Temukan kursus terbaik untuk meningkatkan keterampilan Anda</p>
          </div>
        </div>

        {/* Course Filter and List */}
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row gap-6">

            {/* Sidebar Filters */}
            {/* <SidebarFilters /> */}

            {/* Course Listing */}
            <div className="lg:w-full md:w-3/4">
              {/* Listing Header */}
              <div className="flex flex-wrap items-center justify-between bg-white p-4 rounded-lg shadow-sm mb-6">
                <div className="flex items-center gap-2 mb-2 md:mb-0">
                  <button
                    className="md:hidden flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-teal-600"
                    onClick={() => setFilterOpen(!filterOpen)}
                  >
                    <Filter className="w-4 h-4" />
                    Filter
                  </button>

                </div>

                <div className="flex items-center gap-4">
                  <div className="relative">
                    <select className="appearance-none bg-gray-100 border border-gray-200 text-gray-700 py-2 pl-3 pr-8 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-teal-500">
                      <option>Terbaru</option>
                      <option>Terpopuler</option>
                      <option>Harga: Rendah ke Tinggi</option>
                      <option>Harga: Tinggi ke Rendah</option>
                      <option>Rating</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-500" />
                  </div>

                  <div className="flex items-center gap-1 border border-gray-200 rounded-md">
                    <button
                      className={`p-2 ${viewMode === 'grid' ? 'bg-teal-100 text-teal-600' : 'text-gray-500'}`}
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      className={`p-2 ${viewMode === 'list' ? 'bg-teal-100 text-teal-600' : 'text-gray-500'}`}
                      onClick={() => setViewMode('list')}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Course Cards */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.data.map(course => (
                    <div key={course.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <img src={course.thumbnail ? `/storage/${course.thumbnail}` : 'https://placehold.co/200'} alt={course.title} className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-xs font-semibold text-teal-600">{course.category}</span>
                          <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded">{course.level}</span>
                        </div>
                        <h3 className="font-medium text-gray-800 mb-2 line-clamp-2">{course.title}</h3>
                        <p className="text-sm text-gray-500 mb-3">{formatDate(course.created_at)}</p>

                        <div className="flex items-center text-sm mb-3">
                          {/* <div className="flex items-center text-yellow-500 mr-3">
                            <Star className="w-4 h-4 fill-yellow-400" />
                            <span className="ml-1 text-gray-700">{course.rating}</span>
                          </div>
                          <div className="flex items-center text-gray-500">
                            <BookOpen className="w-4 h-4" />
                            <span className="ml-1">0 siswa</span>
                          </div> */}
                        </div>

                        <div className="flex items-center justify-between mb-5">
                          {course.hours ? (
                            <div className="flex items-center text-gray-500 text-sm">
                              <Clock className="w-4 h-4" />
                              <span className="ml-1">{course.hours} jam</span>
                            </div>
                          ) : ('')}
                          <p className="font-bold text-gray-800">{formatRupiah(course.price)}</p>
                        </div>

                        <Link href={route('user.allCourse.detail', { slug: course.slug, id: course.id })} className="w-full mt-4 bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-md text-sm font-medium">Daftar Sekarang</Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">

                </div>
              )}

              {/* Pagination */}
              <div className="mt-8 flex justify-center">

              </div>
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  )
}

export default AllCourses