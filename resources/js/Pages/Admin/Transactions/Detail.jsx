import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React from 'react'

const Detail = ({ transaction }) => {
  console.log(transaction)

  return (
    <AuthenticatedLayout>
      <div className="mx-auto py-6 px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Transaction Details</h1>
          <div
            className={`px-3 py-1.5 rounded-full text-sm font-medium ${transaction.status === "completed"
                ? "bg-green-100 text-green-700"
                : transaction.status === "processing"
                  ? "bg-yellow-100 text-yellow-700"
                  : transaction.status === "cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-600"
              }`}
          >
            {transaction.status}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {/* Transaction Section */}
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Transaction Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-medium text-gray-800">{transaction.order_id}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="flex items-center mt-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${transaction.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : transaction.status === "processing"
                            ? "bg-yellow-100 text-yellow-700"
                            : transaction.status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-600"
                        }`}
                    >
                      {transaction.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Payment Status</p>
                  <div className="flex items-center mt-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${transaction.payment_status === "paid"
                          ? "bg-green-100 text-green-700"
                          : transaction.payment_status === "failed"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                    >
                      {transaction.payment_status}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium text-gray-800">{new Date(transaction.created_at).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Course Section */}
          <div className="p-6 border-b border-gray-100 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Course Information</h2>

            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div className="mb-2 sm:mb-0">
                  <p className="text-sm text-gray-500">Course ID</p>
                  <p className="font-medium text-gray-800">{transaction.course_id}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Course Title</p>
                  <p className="font-medium text-gray-800">{transaction.course.title}</p>
                </div>
              </div>
            </div>
          </div>

          {/* User Section */}
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">User Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">User ID</p>
                <p className="font-medium text-gray-800">{transaction.user.id}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-800">{transaction.user.email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium text-gray-800">{transaction.user.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-6 text-sm text-gray-500">
          <p>Last updated: {new Date(transaction.updated_at).toLocaleString()}</p>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default Detail