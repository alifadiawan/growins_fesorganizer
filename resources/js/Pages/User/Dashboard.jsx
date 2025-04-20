import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Users } from 'lucide-react'
import React from 'react'

const Dashboard = () => {
  return (
    <AuthenticatedLayout pageTitle="Dashboard" >


      <h1>Hello, User</h1>


    </AuthenticatedLayout>
  )
}

export default Dashboard