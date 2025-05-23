import React, { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Monitor, Feather, Headphones, Package, PenTool, Music, BookOpen, Code, Camera, Briefcase } from "lucide-react"
import { Link } from "@inertiajs/react"


export function Categories({ categories = [] }) {

  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleItems, setVisibleItems] = useState(5)
  const containerRef = useRef(null)

  // Default categories with icons if none are provided
  const defaultCategories = categories.length > 0 ? categories : [
    { id: 1, name: "Design", courses: 42, color: "bg-blue-100", icon: <PenTool className="h-6 w-6 text-blue-600" /> },
    { id: 2, name: "Development", courses: 58, color: "bg-green-100", icon: <Code className="h-6 w-6 text-green-600" /> },
    { id: 3, name: "Marketing", courses: 32, color: "bg-yellow-100", icon: <Briefcase className="h-6 w-6 text-yellow-600" /> },
    { id: 4, name: "Photography", courses: 24, color: "bg-purple-100", icon: <Camera className="h-6 w-6 text-purple-600" /> },
    { id: 5, name: "Audio", courses: 19, color: "bg-red-100", icon: <Headphones className="h-6 w-6 text-red-600" /> },
    { id: 6, name: "Education", courses: 37, color: "bg-teal-100", icon: <BookOpen className="h-6 w-6 text-teal-600" /> },
    { id: 7, name: "Technology", courses: 45, color: "bg-indigo-100", icon: <Monitor className="h-6 w-6 text-indigo-600" /> },
    { id: 8, name: "Writing", courses: 28, color: "bg-pink-100", icon: <Feather className="h-6 w-6 text-pink-600" /> },
  ]

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1)
      } else if (window.innerWidth < 768) {
        setVisibleItems(2)
      } else if (window.innerWidth < 1024) {
        setVisibleItems(3)
      } else if (window.innerWidth < 1280) {
        setVisibleItems(4)
      } else {
        setVisibleItems(5)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const maxIndex = Math.max(0, defaultCategories.length - visibleItems)

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Our Categories</span>
          <h1 className="mt-3 text-4xl font-bold text-gray-900 sm:text-5xl">
            Jelajahi Kursus Terpopuler
          </h1>
          <div className="mt-4 flex justify-center">
            <p className="max-w-2xl text-lg text-gray-600">
              Temukan Berbagai Kursus Terpopuler untuk Mengembangkan Skillmu
            </p>
          </div>
        </div>

        <div className="relative mt-16">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 bg-white rounded-full p-4 shadow-xl
              hover:bg-gray-50 hover:shadow-2xl transition-all duration-300 ease-out border border-gray-200
              ${currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:scale-110"}`}
            aria-label="Previous categories"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>

          <div className="overflow-hidden" ref={containerRef}>
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
            >
              {defaultCategories.map((category) => (
                <div key={category.id} className="flex-shrink-0 px-4" style={{ width: `${100 / visibleItems}%` }}>
                  <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center h-48 transition-all duration-300 hover:shadow-2xl hover:border-teal-300 group cursor-pointer hover:-translate-y-2">
                    <div className={`p-5 rounded-xl mb-5 ${category.color} group-hover:scale-110 transition-transform duration-300`}>
                      {category.icon}
                    </div>
                    <h3 className="font-bold text-lg text-center text-gray-800 group-hover:text-teal-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 text-center mt-2">
                      {category.courses} Courses Available
                    </p>
                    <div className="w-12 h-0.5 bg-teal-500 mt-4 group-hover:w-20 transition-all duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 bg-white rounded-full p-4 shadow-xl
              hover:bg-gray-50 hover:shadow-2xl transition-all duration-300 ease-out border border-gray-200
              ${currentIndex >= maxIndex ? "opacity-30 cursor-not-allowed" : "hover:scale-110"}`}
            aria-label="Next categories"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
        
        <div className="flex justify-center mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 mx-1.5 rounded-full transition-all duration-300 ${
                currentIndex === idx ? "w-8 bg-teal-600" : "w-2 bg-gray-300 hover:bg-gray-400 hover:w-4"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href={route('user.allCourse.index')}
            className="group bg-teal-600 hover:bg-teal-700 text-white font-semibold px-10 py-4 rounded-xl shadow-lg hover:shadow-xl uppercase text-sm tracking-wider transition-all duration-300 flex items-center space-x-2"
          >
            <span>Browse All Courses</span>
            <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}

