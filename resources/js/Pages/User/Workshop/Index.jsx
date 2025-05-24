import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import LogoGrowins from '../../../../../public/LOGOGROWINS.png';

const WorkshopsIndex = ({ workshops }) => {

  return (
    <AuthenticatedLayout>
      <div className="py-8 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Workshops & Bootcamps</h1>
          <p className="mt-2 text-gray-600">
            Enhance your skills with our intensive workshops and bootcamps
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workshops.data.map((workshop) => (
            <div
              key={workshop.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <img
                src={workshop.cover && LogoGrowins}
                alt={workshop.title}
                className="w-full h-48 object-contain"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {workshop.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {workshop.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {workshop.date}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {workshop.main_theme}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    {workshop.time}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    {workshop.seats_available}100 seats available
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">
                    {workshop.normal_price === 0 ? 'Free' : `Rp ${workshop.discounted_price}`}
                  </span>
                  <Link
                    href={route('user.workshop.show', workshop.id)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default WorkshopsIndex;