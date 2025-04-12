import React, { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Monitor, Feather, Headphones, Package, PenTool, Music } from "lucide-react"


export function Categories() {
  const categories = [
    {
      id: 1,
      name: "Development",
      courses: 74,
      icon: <Monitor className="h-8 w-8 text-blue-500" />,
      color: "bg-blue-50",
    },
    {
      id: 2,
      name: "Design",
      courses: 25,
      icon: <Feather className="h-8 w-8 text-yellow-500" />,
      color: "bg-yellow-50",
    },
    {
      id: 3,
      name: "Music",
      courses: 20,
      icon: <Headphones className="h-8 w-8 text-emerald-500" />,
      color: "bg-emerald-50",
    },
    {
      id: 4,
      name: "Marketing",
      courses: 30,
      icon: <Package className="h-8 w-8 text-orange-500" />,
      color: "bg-orange-50",
    },
    {
      id: 5,
      name: "Design",
      courses: 25,
      icon: <PenTool className="h-8 w-8 text-yellow-500" />,
      color: "bg-yellow-50",
    },
    {
      id: 6,
      name: "Music",
      courses: 20,
      icon: <Music className="h-8 w-8 text-emerald-500" />,
      color: "bg-emerald-50",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleItems, setVisibleItems] = useState(5)
  const containerRef = useRef(null)

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

  const maxIndex = Math.max(0, categories.length - visibleItems)

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  return (
    <div className="w-full max-w-7xl min-h-5xl mx-auto px-4 py-8 mb-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">Jelajahi Kursus Terpopuler</h1>

      <div className="relative">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-md
            hover:bg-gray-100 transition-all duration-200 ease-in-out
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
            {categories.map((category) => (
              <div key={category.id} className="flex-shrink-0 px-2" style={{ width: `${100 / visibleItems}%` }}>
                <div className="border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center h-36 transition-all hover:shadow-md">
                  <div className={`p-3 rounded-full mb-2 ${category.color}`}>{category.icon}</div>
                  <h3 className="font-medium text-center">{category.name}</h3>
                  <p className="text-sm text-gray-500 text-center">{category.courses} Courses</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
          className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-md
            hover:bg-gray-100 transition-all duration-200 ease-in-out
            ${currentIndex >= maxIndex ? "opacity-30 cursor-not-allowed" : ""}`}
          aria-label="Next categories"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="flex justify-center mt-8">
        <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-2 rounded-md uppercase text-sm tracking-wide transition-colors duration-200">
          Browse All Courses
        </button>
      </div>
    </div>
  )
}

