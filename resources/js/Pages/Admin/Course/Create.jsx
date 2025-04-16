import { router } from '@inertiajs/react';
import axios from 'axios';
import React, { useForm } from 'react'

const Create = ({ course }) => {

    const { data, setData, put, processing, errors } = useForm({
        title: course.title || '',
        description: course.description || '',
        price: course.price || 0,
        status: course.status || 'draft',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.visit(route('courses.update', course.id), { method: 'put' });
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Edit Course</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="w-full border rounded p-2"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="w-full border rounded p-2"
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">Price</label>
                    <input
                        type="number"
                        value={data.price}
                        onChange={(e) => setData('price', e.target.value)}
                        className="w-full border rounded p-2"
                    />
                    {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">Status</label>
                    <select
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                        className="w-full border rounded p-2"
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                    {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {processing ? 'Saving...' : 'Update Course'}
                </button>
            </form>
        </div>
    )
}

export default Create