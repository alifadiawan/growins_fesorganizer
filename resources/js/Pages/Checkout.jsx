import { Link, router, usePage } from '@inertiajs/react';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const Checkout = ({ course, midtransClientKey }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const user = usePage().props.auth.user;

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  console.log(course)

  async function handleTransaction(course_id, user_id) {
    setLoading(true);

    // check logged in or not
    if (!user) {
      return router.visit(route('login'));
    }

    axios.post(route('api.transaction.createTransaction', { course_id: course_id, user_id: user_id }))
      .then(function (response) {

        window.snap.pay(response.data.snap_token, {
          onSuccess(result) {
            router.visit(route('user.process.order', result.order_id));
          },
          onPending(result) {
            console.log('Payment Pending:', result);
          },
          onError(result) {
            console.log('Payment Error:', result);
          },
          onClose() {
            console.log('Payment popup closed by customer.');
          },
        });

      })
      .catch(function (error) {
        console.log('error', error);
      })
      .finally(function () {
        setLoading(false);
      });

  }

  useEffect(() => {
    // You can also change below url value to any script url you wish to load, 
    // for example this is snap.js for Sandbox Env (Note: remove `.sandbox` from url if you want to use production version)
    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';

    let scriptTag = document.createElement('script');
    scriptTag.src = midtransScriptUrl;

    // Optional: set script attribute, for example snap.js have data-client-key attribute 
    // (change the value according to your client-key)
    scriptTag.setAttribute('data-client-key', midtransClientKey);

    document.body.appendChild(scriptTag);


    return () => {
      document.body.removeChild(scriptTag);
    }
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">

        <div className="flex flex-row items-center mb-5 gap-5">
          <Link onClick={() => history.back()} className="p-4 hover:bg-zinc-400 rounded-md">
            <ArrowLeft />
          </Link>
          <h1 className="font-bold text-3xl text-center ">Checkout Page</h1>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
          {/* Course Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                  <path d="M3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </span>
              Course Details
            </h2>
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <span className="font-bold text-blue-600 text-xl">Rp. {course.price}</span>
            </div>
          </div>

          {/* Course Image and Info */}
          <div className="grid md:grid-cols-1 gap-8">
            {/* Left Column - Image */}
            {course.thumbnail && (
              <div className="overflow-hidden rounded-lg shadow-md">
                <img
                  src={`/storage/${course.thumbnail}`}
                  alt={course.title}
                  className="w-full h-64 object-cover transform hover:scale-105 transition duration-300"
                />
              </div>
            )}

            {/* Right Column - Course Information */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{course.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: course.description }} className="text-gray-600 mb-6 leading-relaxed"></div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600 ml-3">Instructor:</span>
                    <span className="ml-2 text-gray-800 font-semibold">{course.instructor || '-'}</span>
                  </div>

                  <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600 ml-3">Duration:</span>
                    <span className="ml-2 text-gray-800 font-semibold">{course.duration || '-'}</span>
                  </div>

                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => handleTransaction(course.id, user.id)}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50 shadow-md flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <span>Pilih Pembayaran - Rp. {course.price}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Mobile View - Checkout Button (Only visible on small screens) */}
          <div className="mt-8 md:hidden">
            <button
              onClick={() => handleTransaction(course.id)}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50 shadow-md flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <span>Pilih Pembayaran - Rp. {course.price}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout