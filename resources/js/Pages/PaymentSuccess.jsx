import { router } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect } from 'react'

const PaymentSuccess = ({ orderId }) => {
  console.log(orderId)
  useEffect(() => {
    const timeout = setTimeout(() => {
      axios.post(route('api.processing.transactions', orderId))
        .then((res) => {
          router.visit('/thank-you')
        })
        .catch((error) => {
          console.error('Error processing transaction:', error);
        });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [orderId]);



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Spinner */}
      <div className="w-20 h-20 border-8 border-green-500 border-t-transparent rounded-full animate-spin mb-6"></div>

      {/* Main Processing Text */}
      <h2 className="text-2xl font-semibold text-gray-800">Processing Your Order</h2>

      {/* Subtext */}
      <p className="text-gray-600 mt-2">Please wait while we complete your transaction...</p>

      {/* Warning Text */}
      <p className="text-sm text-red-500 mt-4 font-medium">Please don't close this page</p>
    </div>
  )
}

export default PaymentSuccess