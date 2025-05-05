import React from 'react'

const SidebarFilters = () => {
    return (
        <div className={`md:w-1/4 bg-white p-6 rounded-lg shadow-sm ${filterOpen ? 'block' : 'hidden md:block'}`}>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Filter Kursus</h3>

            {/* Category Filter */}
            <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Kategori</h4>
                <div className="space-y-2">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            className={`block w-full text-left px-2 py-1.5 rounded-md text-sm ${activeCategory === category.id
                                ? 'bg-teal-100 text-teal-700 font-medium'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            onClick={() => setActiveCategory(category.id)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Rentang Harga</h4>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Rp. 0</span>
                        <span className="text-sm text-gray-600">Rp. 1.000.000</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="500000"
                        defaultValue="500000"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
                    />
                </div>
            </div>

            {/* Rating Filter */}
            <div>
                <h4 className="font-medium text-gray-700 mb-3">Rating</h4>
                <div className="space-y-2">
                    {[4, 3, 2, 1].map(rating => (
                        <button key={rating} className="flex items-center text-sm text-gray-600 hover:text-teal-700">
                            {Array(rating).fill(null).map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                            {Array(5 - rating).fill(null).map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-gray-300" />
                            ))}
                            <span className="ml-2">& Up</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SidebarFilters