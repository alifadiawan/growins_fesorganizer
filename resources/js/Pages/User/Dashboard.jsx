import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Users } from 'lucide-react'
import React from 'react'

const Dashboard = () => {
  return (
    <AuthenticatedLayout pageTitle="Dashboard" >


      <div className="flex flex-row gap-3 w-full">

        {/* cards */}
        <div className="min-w-72 flex flex-row gap-3 items-center bg-white px-6 py-4 rounded-md shadow">
          <Users size={35}/>
          <div className="content flex flex-col">
            <h3 className='font-bold text-xl'>Users Registered</h3>
            <p>2320</p>
          </div>
        </div>
        <div className="flex flex-row gap-3 items-center bg-white px-6 py-4 rounded-md shadow">
          <Users size={35}/>
          <div className="content flex flex-col">
            <h3 className='font-bold text-xl'>Users Registered</h3>
            <p>2320</p>
          </div>
        </div>
        <div className="flex flex-row gap-3 items-center bg-white px-6 py-4 rounded-md shadow">
          <Users size={35}/>
          <div className="content flex flex-col">
            <h3 className='font-bold text-xl'>Courses</h3>
            <p>2320</p>
          </div>
        </div>
        <div className="flex flex-row gap-3 items-center bg-white px-6 py-4 rounded-md shadow">
          <Users size={35}/>
          <div className="content flex flex-col">
            <h3 className='font-bold text-xl'>Users Registered</h3>
            <p>2320</p>
          </div>
        </div>
      </div>


    </AuthenticatedLayout>
  )
}

export default Dashboard