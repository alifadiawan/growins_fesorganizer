import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
// GuestLayout is not directly used in the form structure below, but keep if it's part of your page layout
// import GuestLayout from '@/Layouts/GuestLayout'; 
import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react'; // Import React hooks

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const [cooldownSeconds, setCooldownSeconds] = useState(0); // State for the cooldown timer
    const intervalRef = useRef(null); // Ref to store the interval ID

    // Effect to clear the interval when the component unmounts
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prevent submission if the form is already processing or if in cooldown
        if (processing || cooldownSeconds > 0) {
            return;
        }

        post(route('password.email'), {
            onFinish: () => {
                if (!processing) {
                    if (response?.status === 429) {
                        alert('Too many attempts. Please wait a moment before trying again.');
                    }
                }
            },
        });

        // Start the 30-second cooldown
        setCooldownSeconds(60);

        // Clear any existing interval before starting a new one (robustness for edge cases)
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        // Start a new interval to count down
        intervalRef.current = setInterval(() => {
            setCooldownSeconds((prevSeconds) => {
                if (prevSeconds <= 1) { // When countdown is about to hit 0
                    clearInterval(intervalRef.current);
                    intervalRef.current = null; // Clear the ref
                    return 0; // Ensure cooldown is exactly 0
                }
                return prevSeconds - 1; // Decrement cooldown
            });
        }, 1000);
    };

    // Determine if the button should be disabled
    const isButtonDisabled = processing || cooldownSeconds > 0;

    // Determine the button text based on state
    let buttonText = "Email Password Reset Link";
    if (processing) {
        buttonText = "Sending..."; // Loading state text
    } else if (cooldownSeconds > 0) {
        buttonText = `Email Password Reset Link (${cooldownSeconds}s)`; // Cooldown state text
    }

    return (
        <>
            <Head title="Forgot Password" />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-900 to-teal-600 ">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                        Forgot Your Password?
                    </h2>

                    <p className="mb-4 text-sm text-gray-600 text-center">
                        No problem. Just let us know your email address and we'll send you a link to reset your password.
                    </p>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600 text-center">
                            {status}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            isFocused
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={isButtonDisabled} // Optionally disable input during processing/cooldown
                        />

                        <InputError message={errors.email} className="mt-2" />

                        <div className="mt-6 flex justify-center">
                            <button
                                type="submit" // Good practice to specify button type
                                className={`px-6 py-2 rounded-md text-black font-bold transition-colors duration-150 ease-in-out
                                            ${isButtonDisabled
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' // Styles for disabled button
                                        : 'bg-[#ffcc00] hover:bg-[#e6b800]'}`} // Styles for enabled button
                                disabled={isButtonDisabled}
                            >
                                {buttonText}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}