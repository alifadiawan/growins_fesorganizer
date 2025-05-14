import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { usePage } from '@inertiajs/react'
import { ChartBar, Users, UserSquare2Icon, Video, VideoIcon, VideoOffIcon } from 'lucide-react';
import React from 'react'

const Dashboard = () => {

    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout pageTitle={`Dashboard - ${user.name}`}>

            <div className="flex flex-row gap-3">
                <div className="w-full flex flex-row gap-3 items-center bg-white px-6 py-4 rounded-md shadow mb-5">
                    <Video size={35} />
                    <div className="content flex flex-col">
                        <h3 className='font-bold text-xl'>Published Courses</h3>
                        <p>0</p>
                    </div>
                </div>
                <div className="w-full flex flex-row gap-3 items-center bg-white px-6 py-4 rounded-md shadow mb-5">
                    <VideoOffIcon size={35} />
                    <div className="content flex flex-col">
                        <h3 className='font-bold text-xl'>Pending Courses</h3>
                        <p>0</p>
                    </div>
                </div>
                <div className="w-full flex flex-row gap-3 items-center bg-white px-6 py-4 rounded-md shadow mb-5">
                    <ChartBar size={35} />
                    <div className="content flex flex-col">
                        <h3 className='font-bold text-xl'>Total Income</h3>
                        <p>0</p>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}

export default Dashboard