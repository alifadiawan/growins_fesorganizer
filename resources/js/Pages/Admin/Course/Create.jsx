import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router, usePage } from '@inertiajs/react';
import axios from 'axios';
import React, { useForm, useState } from 'react'

const Create = () => {
    const errors = usePage().errors;
    const [processing, setProcessing] = useState(false);
    const user_id = usePage().props.auth.user.id;

    const handleSubmit = (e) => {
        e.preventDefault();

        setProcessing(true);

        const data = new FormData();
        data.append('user_id', user_id);
        data.append('title', e.target.title.value);
        data.append('description', e.target.description.value);
        data.append('price', e.target.price.value);
        data.append('status', e.target.status.value);

        axios.post(route('api.courses.store'), data)
            .then(function (response) {
                setProcessing(false);
                router.visit(route('admin.course.index'));
            })
            .catch(function (error) {
                setProcessing(false);
                console.error(error);
            });
    };

    return (
        <AuthenticatedLayout>
            <h1 className="text-2xl font-bold mb-4">New Course</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        className="w-full border rounded p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                        name="description"
                        className="w-full border rounded p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Price</label>
                    <input
                        type="number"
                        name="price"
                        className="w-full border rounded p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Status</label>
                    <select
                        name="status"
                        className="w-full border rounded p-2"
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-300"
                >
                    {processing ? 'Saving...' : 'Add Course'}
                </button>
            </form>
        </AuthenticatedLayout>
    )
}

export default Create