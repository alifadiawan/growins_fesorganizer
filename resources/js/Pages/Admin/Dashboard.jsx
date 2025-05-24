import SummaryCard from '@/Components/SummaryCard'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Users, BarChart3, BookOpen, CreditCard, TrendingUp, Hammer } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import React from 'react'

const Dashboard = ({ allUsers, allTransactions, allBootcamps, allCourses, recentTransactions }) => {

  console.log(recentTransactions)

  // Sample data for traffic chart
  const trafficData = [
    // { name: "Jan", value: 1000 },
    // { name: "Feb", value: 1500 },
    // { name: "Mar", value: 1200 },
    // { name: "Apr", value: 1800 },
    // { name: "May", value: 2200 },
    // { name: "Jun", value: 1900 },
    // { name: "Jul", value: 2400 },
  ];


  return (
    <AuthenticatedLayout pageTitle="Dashboard" >

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <SummaryCard icon={<Users size={24} />} title="Users" value={allUsers} color="bg-blue-500" />
        <SummaryCard icon={<BarChart3 size={24} />} title="Transactions" value={allTransactions} color="bg-green-500" />
        <SummaryCard icon={<BookOpen size={24} />} title="Courses" value={allCourses} color="bg-purple-500" />
        <SummaryCard icon={<Hammer size={24} />} title="Bootcamps" value={allBootcamps} color="bg-red-500" />
        <SummaryCard icon={<CreditCard size={24} />} title="Revenue" value="$12,450" color="bg-yellow-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Chart */}
        <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Visitor Website</h2>
          </div>
          <div className="h-64">
            {trafficData.length == 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No traffic data available</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#4F46E5"
                    strokeWidth={2}
                    dot={{ strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}

          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
          <div className="overflow-y-auto h-64">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-2">User</th>
                  <th className="pb-2">Amount</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.length == 0 ? (
                  <tr className="border-b border-gray-100">
                    <td colSpan="3" className="py-3 text-center text-gray-500">No recent transactions</td>
                  </tr>
                ) : (
                  recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 max-w-[50px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {transaction.user.name}
                      </td>
                      <td className="py-3">Rp {transaction.amount}</td>
                      <td className={`py-3 ${transaction.status === 'completed' ? 'text-green-500' : 'text-yellow-500'}`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div >



    </AuthenticatedLayout >
  )
}

export default Dashboard