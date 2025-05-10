import Card from '@/Components/Card'
import Modal from '@/Components/Modal'
import Pagination from '@/Components/Pagination'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Link } from '@inertiajs/react'
import axios from 'axios'
import { AlertTriangle, Pen, School, Trash2, Users, UserSquare2 } from 'lucide-react'
import React, { useState } from 'react'

const Index = ({ users, total_admin, total_student, total_dosen, total_user }) => {
  const [activeModal, setActiveModal] = useState(null);

  const formatDateIndo = (datetime, withTime = true) => {
    const date = new Date(datetime);

    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      ...(withTime && {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
    };

    return date.toLocaleString('id-ID', options);
  };

  const changeRoleToDosen = (userId) => {
    axios.post(route('api.update.dosen', userId))
      .then(response => {
        alert(response.data.success); // or use a toast
        window.location.reload(); // redirect or refresh manually
      })

      .catch(function (error) {
        console.log(error);
      })
  }

  return (
    <AuthenticatedLayout pageTitle="Users">

      <div className="flex flex-row gap-3">
        <div className="w-full flex flex-row gap-3 items-center bg-white px-6 py-4 rounded-md shadow mb-5">
          <Users size={35} />
          <div className="content flex flex-col">
            <h3 className='font-bold text-xl'>All Users</h3>
            <p>{total_user}</p>
          </div>
        </div>
        <div className="w-full flex flex-row gap-3 items-center bg-white px-6 py-4 rounded-md shadow mb-5">
          <School size={35} />
          <div className="content flex flex-col">
            <h3 className='font-bold text-xl'>Students</h3>
            <p>{total_student}</p>
          </div>
        </div>
        <div className="w-full flex flex-row gap-3 items-center bg-white px-6 py-4 rounded-md shadow mb-5">
          <UserSquare2 size={35} />
          <div className="content flex flex-col">
            <h3 className='font-bold text-xl'>Dosen</h3>
            <p>{total_dosen}</p>
          </div>
        </div>
      </div>


      <div className="overflow-x-auto bg-white">
        <table className="min-w-full divide-y-2 divide-gray-200">
          <thead className="sticky top-0 bg-white">
            <tr className="*:font-medium *:text-gray-900">
              <th className="px-3 py-2 whitespace-nowrap text-start">No</th>
              <th className="px-3 py-2 whitespace-nowrap text-start">Name</th>
              <th className="px-3 py-2 whitespace-nowrap text-start">Role</th>
              <th className="px-3 py-2 whitespace-nowrap text-start">Email</th>
              <th className="px-3 py-2 whitespace-nowrap text-start">Kota</th>
              <th className="px-3 py-2 whitespace-nowrap text-start">Nomor HP</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">

            {users.data.map((item, index) =>
              <tr key={item.id} className="*:text-gray-900 *:first:font-medium">
                <td className="px-3 py-2 whitespace-nowrap">{index + 1}</td>
                <td className="px-3 py-2 whitespace-nowrap">{item.name}</td>
                <td className={`px-3 py-2 whitespace-nowrap font-medium
                    ${item.role === 'student' ? 'text-blue-600' :
                    item.role === 'instructor' ? 'text-green-600' :
                      item.role === 'admin' ? 'text-red-600' : 'text-gray-600'}`}>
                  {item.role}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">{item.email}</td>
                <td className="px-3 py-2 whitespace-nowrap">{item.kota}</td>
                <td className="px-3 py-2 whitespace-nowrap">{item.phone}</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <button onClick={() => setActiveModal(index)} className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded-md text-white">Detail</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination meta={users} links={users.links} />

      {/* modal */}
      {users.data.map((item, index) => (
        <Modal
          key={item.id}
          isOpen={activeModal === index}
          onClose={() => setActiveModal(null)}
          title={`${item.name}`}
        >
          <>
            <div className="flow-root">
              <dl className="-my-3 divide-y divide-gray-200 text-sm">
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Nama</dt>

                  <dd className="text-gray-700 sm:col-span-2">{item.name}</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Email</dt>

                  <dd className="text-gray-700 sm:col-span-2">{item.email}</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Nomor HP</dt>

                  <dd className="text-gray-700 sm:col-span-2">{item.phone}</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Role</dt>

                  <dd className="text-gray-700 sm:col-span-2 capitalize">{item.role}</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Dibuat pada tanggal</dt>

                  <dd className="text-gray-700 sm:col-span-2">{formatDateIndo(item.created_at)}</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">HIstory Transaksi</dt>

                  <dd className="text-gray-700 sm:col-span-2">
                    {item.transactions.map((transaction) => (
                      <ul key={transaction.id}>
                        <div className="">
                          {formatDateIndo(transaction.created_at)} --
                          <Link href={route('admin.transactions.detail', transaction.order_id)} className='text-blue-600 hover:underline'>{transaction.order_id}</Link>
                        </div>
                      </ul>
                    ))}
                  </dd>
                </div>

              </dl>


              {/* tampilkan hanya untuk role siswa dna dosen */}
              {item.role != 'admin' && (
                <div className="pt-5 border-t">
                  <div className="text-sm font-medium text-gray-700 mb-2">Ubah Role User: </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => changeRoleToDosen(item.id)}
                      disabled={item.role === 'instructor'}
                      className={`flex-1 px-3 py-2 rounded-md transition-colors ${item.role === 2
                        ? 'disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed'
                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                        }`}
                    >
                      Dosen
                    </button>

                    <button
                      disabled={item.role === 'admin'} // admin
                      className={`flex-1 px-3 py-2 rounded-md transition-colors ${item.role === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                        }`}
                    >
                      Admin
                    </button>

                    <button
                      disabled={item.role === 'student'} // siswa
                      className="flex-1 px-3 py-2 rounded-md transition-colors
                    bg-green-50 text-green-700 hover:bg-green-100
                    disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                      Siswa
                    </button>

                  </div>
                </div>
              )}


            </div>
          </>
        </Modal>
      ))}

    </AuthenticatedLayout>
  )
}

export default Index