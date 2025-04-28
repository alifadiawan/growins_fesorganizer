import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { VideoIcon } from 'lucide-react'
import React from 'react'

const Dashboard = ({course}) => {

  return (
    <AuthenticatedLayout pageTitle="Dashboard" >


      {/* alerts */}
      <div className="flex flex-col gap-3 mb-5">
        <div role="alert" class="border-s-4 border-yellow-700 bg-yellow-50 p-4">
          <div class="flex items-center gap-2 text-yellow-700">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
              <path
                fill-rule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clip-rule="evenodd"
              />
            </svg>

            <strong class="font-medium"> Almost there! Finish setting up your profile </strong>
          </div>

          <p class="mt-2 text-sm text-yellow-700">
            Please complete your profile to access all features.
          </p>
        </div>
      </div>


      <div className="flex flex-row gap-3">


        <div className="flex items-center shadow justify-between p-4 bg-white rounded-md min-w-72">
          <div>
            <h6 className="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase">
              My Courses
            </h6>
            <span className="text-xl font-semibold">{course}</span>
          </div>
          <div>
            <span>
              <VideoIcon />
            </span>
          </div>
        </div>


      </div>


    </AuthenticatedLayout>
  )
}

export default Dashboard