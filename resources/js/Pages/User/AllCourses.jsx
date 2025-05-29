import SidebarFilters from '@/Components/SidebarFilters';
import GuestLayout from '@/Layouts/GuestLayout'
import { Link } from '@inertiajs/react';
import { Search, Filter, Clock, Star, ChevronDown, Grid, List, BookOpen, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";

const AllCourses = ({ categories, courses }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [filterOpen, setFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (courses && courses.length > 0) {
      setIsLoading(false);
    }
  }, [courses]);

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
    <GuestLayout
      navbarProps={{
        isTransparent: false,
        customBgColor: 'bg-gradient-to-r from-teal-900 to-teal-600',
      }}
    >
      <div className="min-h-screen bg-gray-50">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative bg-gradient-to-r from-teal-900 to-teal-600"
        >
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>

          <div className="relative container mx-auto px-6 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="max-w-3xl"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
              >
                Katalog Kursus Online
                <span className="block text-yellow-400">untuk Masa Depan Anda</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-teal-100 text-lg md:text-xl leading-relaxed mb-8"
              >
                Temukan kursus terbaik untuk meningkatkan keterampilan dan membuka peluang karir yang lebih baik
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <div className="relative flex-1 min-w-[280px]">
                  <input
                    type="text"
                    placeholder="Cari kursus..."
                    className="w-full px-4 py-3 rounded-lg pl-12 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                  <Search className="absolute left-4 top-3.5 w-5 h-5 text-white/60" />
                </div>
                <button className="px-6 py-3 bg-yellow-400 hover:bg-yellow-400 text-black font-medium rounded-lg transition duration-200 flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Cari Sekarang
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="mt-8 flex flex-wrap gap-4 items-center"
              >
                <span className="text-teal-100">Populer:</span>
                {['Web Development', 'Digital Marketing', 'Design', 'Business'].map((tag, index) => (
                  <motion.span
                    key={tag}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="px-3 py-1 bg-white/10 rounded-full text-sm text-white hover:bg-white/20 cursor-pointer"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

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
              {courses.data.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  <div className="bg-gray-100 p-4 rounded-full mb-4">
                    <BookOpen className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Tidak ada kursus yang tersedia
                  </h3>
                  <p className="text-gray-500 max-w-md">
                    Mohon maaf, saat ini belum ada kursus yang tersedia. Silakan coba lagi nanti atau ubah filter pencarian Anda.
                  </p>
                </div>
              ) : viewMode === 'grid' ? (
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