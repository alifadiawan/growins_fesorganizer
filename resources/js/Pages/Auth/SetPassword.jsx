import SetPasswordField from '@/Components/SetPasswordField';
import { useForm } from '@inertiajs/react';
import React, { useState } from 'react'

const SetPassword = () => {

    const { data, setData, post, processing, errors } = useForm({
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('oauth.store'));
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-xl font-bold mb-4">Set Your Password</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        className="input"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    {errors.password && <div className="text-red-500">{errors.password}</div>}
                </div>
                <div className="mt-4">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        className="input"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-4" disabled={processing}>
                    Save Password
                </button>
            </form>
        </div>
    )
}

export default SetPassword