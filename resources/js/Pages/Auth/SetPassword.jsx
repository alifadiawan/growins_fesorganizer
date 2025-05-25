import SetPasswordField from '@/Components/SetPasswordField';
import { router, useForm } from '@inertiajs/react';
import React, { useState } from 'react'

const SetPassword = () => {

    const [data, setDataState] = useState({
        password: '',
        password_confirmation: '',
    });

    // State for form errors (example)
    const [errors, setErrors] = useState({
        password: '',
        password_confirmation: '',
    });

    // State for processing status (example)
    const [processing, setProcessing] = useState(false);

    // State for password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const setData = (key, value) => {
        setDataState(prevData => ({ ...prevData, [key]: value }));
        // Basic validation example (you can expand this)
        if (key === 'password' && value.length < 8 && value.length > 0) {
            setErrors(prevErrors => ({ ...prevErrors, password: 'Password must be at least 8 characters.' }));
        } else if (key === 'password') {
            setErrors(prevErrors => ({ ...prevErrors, password: '' }));
        }

        if (key === 'password_confirmation' && data.password !== value && value.length > 0) {
            setErrors(prevErrors => ({ ...prevErrors, password_confirmation: 'Passwords do not match.' }));
        } else if (key === 'password_confirmation') {
            setErrors(prevErrors => ({ ...prevErrors, password_confirmation: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation check before submission
        let hasErrors = false;
        if (data.password.length < 8) {
            setErrors(prev => ({ ...prev, password: 'Password must be at least 8 characters.' }));
            hasErrors = true;
        } else {
            setErrors(prev => ({ ...prev, password: '' })); // Clear password error if valid
        }

        if (data.password !== data.password_confirmation) {
            setErrors(prev => ({ ...prev, password_confirmation: 'Passwords do not match.' }));
            hasErrors = true;
        } else {
            setErrors(prev => ({ ...prev, password_confirmation: '' })); // Clear confirmation error if valid
        }

        if (hasErrors) {
            setProcessing(false); // Ensure processing is false if validation fails
            return;
        }

        setProcessing(true);

        router.post(route('oauth.store'), data, {
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
            onSuccess: () => {
                setDataState({ password: '', password_confirmation: '' });
                const messageBox = document.getElementById('messageBox');
                const messageText = document.getElementById('messageText');
                if (messageBox && messageText) {
                    messageText.innerText = 'Password saved successfully!';
                    messageBox.classList.remove('hidden');
                    setTimeout(() => {
                        messageBox.classList.add('hidden');
                    }, 3000);
                }
            },
            onError: (errors) => {
                setErrors(errors); // Laravel validation errors
            }
        });
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <div className="min-h-screen bg-gradient-to-r from-teal-900 to-teal-600 flex flex-col justify-center items-center p-4 font-sans">
            {/* Custom Message Box */}
            <div id="messageBox" className="hidden fixed top-5 right-5 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 transition-opacity duration-300">
                <p id="messageText"></p>
            </div>

            <div className="bg-white backdrop-filter backdrop-blur-lg shadow-2xl rounded-xl p-8 md:p-12 w-full max-w-md transform transition-all duration-500">
                <h1 className="text-3xl font-bold text-black text-center mb-8 tracking-wide">
                    Set Your Secure Password
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Password Field */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-zinc-700 mb-1"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                className="w-full px-4 py-3 bg-white bg-opacity-30 text-zinc-700 rounded-lg border-2 border-zinc-500 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500 focus:outline-none placeholder-black transition duration-300 ease-in-out"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Enter your new password"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 px-4 flex items-center text-black hover:text-black transition-colors"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-2 text-xs text-white bg-red-500 px-2 py-1 rounded">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label
                            htmlFor="password_confirmation"
                            className="block text-sm font-medium text-zinc-700 mb-1"
                        >
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                id="password_confirmation"
                                type={showConfirmPassword ? 'text' : 'password'}
                                className="w-full px-4 py-3 bg-white bg-opacity-30 text-zinc-700 rounded-lg border-2 border-zinc-500 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500 focus:outline-none placeholder-black transition duration-300 ease-in-out"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                placeholder="Confirm your new password"
                                required
                            />
                            <button
                                type="button"
                                onClick={toggleConfirmPasswordVisibility}
                                className="absolute inset-y-0 right-0 px-4 flex items-center text-black hover:text-black transition-colors"
                                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                            >
                                {showConfirmPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
                                )}
                            </button>
                        </div>
                        {errors.password_confirmation && (
                            <p className="mt-2 text-xs text-white bg-red-500 px-2 py-1 rounded">
                                {errors.password_confirmation}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full py-3 px-4 font-semibold text-gray-800 rounded-lg transition-all duration-300 ease-in-out
                        ${processing
                                ? 'bg-[#cca300] cursor-not-allowed' // Darker yellow for processing
                                : 'bg-[#ffcc00] hover:bg-[#e6b800] focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'}
                        disabled:opacity-70 disabled:cursor-not-allowed`}
                        disabled={processing}
                    >
                        {processing ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </div>
                        ) : (
                            'Save Password'
                        )}
                    </button>
                </form>
                {/* Footer text (optional) */}
                <p className="text-center text-black text-xs mt-8">
                    Choose a strong and unique password.
                </p>
            </div>
        </div>
    )
}

export default SetPassword