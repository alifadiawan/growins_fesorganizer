import SummaryCard from '@/Components/SummaryCard'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Users, BarChart3, BookOpen, CreditCard, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import React from 'react'

const Dashboard = () => {

  // Sample data for traffic chart
  const trafficData = [
    { name: "Jan", value: 1000 },
    { name: "Feb", value: 1500 },
    { name: "Mar", value: 1200 },
    { name: "Apr", value: 1800 },
    { name: "May", value: 2200 },
    { name: "Jun", value: 1900 },
    { name: "Jul", value: 2400 },
  ];

  // Sample data for recent transactions
  const recentTransactions = [
    { id: 1, user: "John Doe", amount: "$120.00", course: "Web Development", date: "May 16, 2025", status: "completed" },
    { id: 2, user: "Sarah Smith", amount: "$85.50", course: "UI/UX Design", date: "May 15, 2025", status: "pending" },
    { id: 3, user: "Mike Johnson", amount: "$199.99", course: "Data Science", date: "May 15, 2025", status: "completed" },
    { id: 4, user: "Emily Brown", amount: "$49.99", course: "Digital Marketing", date: "May 14, 2025", status: "completed" },
  ];


  return (
    <AuthenticatedLayout pageTitle="Dashboard" >

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SummaryCard icon={<Users size={24} />} title="Users" value="2,320" color="bg-blue-500" />
        <SummaryCard icon={<BarChart3 size={24} />} title="Transactions" value="1,845" color="bg-green-500" />
        <SummaryCard icon={<BookOpen size={24} />} title="Courses" value="126" color="bg-purple-500" />
        <SummaryCard icon={<CreditCard size={24} />} title="Revenue" value="$12,450" color="bg-yellow-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Chart */}
        <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Traffic Overview</h2>
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-green-500" />
              <span className="text-sm text-green-500">+12.5%</span>
            </div>
          </div>
          <div className="h-64">
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
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-gray-100">
                    <td className="py-3">{tx.user}</td>
                    <td className="py-3">{tx.amount}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${tx.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>



    </AuthenticatedLayout>
  )
}

export default Dashboard