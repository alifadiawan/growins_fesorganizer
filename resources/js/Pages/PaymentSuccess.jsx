import { router } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect } from 'react'

const PaymentSuccess = () => {

    // get order id
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('order_id');
    console.log(orderId);

    useEffect(() => {
        const timeout = setTimeout(() => {
          axios.post(route('api.processing.transactions', orderId))
          .then()
          .catch()
        }, 3000);
    
        return () => clearTimeout(timeout);
      }, []);
   


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* Spinner */}
            <div className="w-20 h-20 border-8 border-green-500 border-t-transparent rounded-full animate-spin mb-6"></div>

            {/* Main Success Text */}
            <h2 className="text-2xl font-semibold text-gray-800">Payment Successful!</h2>

            {/* Subtext */}
            <p className="text-gray-600 mt-2">Redirecting to your dashboard...</p>

            {/* New Text: Don't close this page */}
            <p className="text-sm text-gray-500 mt-4 italic">Don't close this page</p>
        </div>
    )
}

export default PaymentSuccess