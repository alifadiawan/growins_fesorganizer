import React, { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Monitor, Feather, Headphones, Package, PenTool, Music, BookOpen, Code, Camera, Briefcase } from "lucide-react"


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
    <div className="w-full bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">Jelajahi Kursus Terpopuler</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Temukan Berbagai Kursus Terpopuler
          </p>
        </div>

        <div className="relative mt-12">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg
              hover:bg-gray-100 transition-all duration-200 ease-in-out border border-gray-200
              ${currentIndex === 0 ? "opacity-30 cursor-not-allowed" : ""}`}
            aria-label="Previous categories"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="overflow-hidden" ref={containerRef}>
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
            >
              {defaultCategories.map((category) => (
                <div key={category.id} className="flex-shrink-0 px-3" style={{ width: `${100 / visibleItems}%` }}>
                  <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center h-44 transition-all hover:shadow-lg hover:border-teal-300 group cursor-pointer hover:-translate-y-1">
                    <div className={`p-4 rounded-full mb-4 ${category.color} group-hover:scale-110 transition-transform`}>
                      {category.icon}
                    </div>
                    <h3 className="font-semibold text-center text-gray-800">{category.name}</h3>
                    <p className="text-sm text-gray-500 text-center mt-1">{category.courses} Courses</p>
                    <div className="w-10 h-0.5 bg-teal-500 mt-3 group-hover:w-16 transition-all"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg
              hover:bg-gray-100 transition-all duration-200 ease-in-out border border-gray-200
              ${currentIndex >= maxIndex ? "opacity-30 cursor-not-allowed" : ""}`}
            aria-label="Next categories"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex justify-center mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 mx-1 rounded-full transition-all ${
                currentIndex === idx ? "w-6 bg-teal-600" : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-8 py-3 rounded-lg shadow-md uppercase text-sm tracking-wide transition-colors duration-200 flex items-center group">
            Browse All Courses
            <ChevronRight className="h-4 w-4 ml-1 group-hover:ml-2 transition-all" />
          </button>
        </div>
      </div>
    </div>
  )
}

