import React from 'react'

const SummaryCard = ({ icon, title, value, color }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
            <div className={`${color} text-white p-3 rounded-lg`}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <h3 className="text-xl font-bold text-gray-800">{value}</h3>
            </div>
        </div>

    )
}

export default SummaryCard