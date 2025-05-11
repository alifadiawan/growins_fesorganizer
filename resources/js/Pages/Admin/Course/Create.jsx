import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router, usePage } from '@inertiajs/react';
import axios from 'axios';
import React, { useForm, useState } from 'react'
import ReactQuill from 'react-quill';


const Create = ({ categories }) => {
    const user_id = usePage().props.auth.user.id;
    const role = usePage().props.auth.user.role;
    const errors = usePage().errors;

    const [processing, setProcessing] = useState(false);
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [value, setValue] = useState('');

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnail(file);
            setThumbnailPreview(URL.createObjectURL(file));
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        setProcessing(true);

        const data = new FormData();
        data.append('user_id', user_id);
        data.append('title', e.target.title.value);
        data.append('description', value);
        data.append('price', e.target.price.value);
        data.append('status', e.target.status.value);
        data.append('category_id', e.target.category_id.value);

        if (thumbnail) {
            data.append('thumbnail', thumbnail);
        }

        axios.post(route('api.courses.store'), data)
            .then(function (response) {
                setProcessing(false);

                if (role == 'admin') {
                    router.visit(route('admin.course.index'));
                }
                
                router.visit(route('dosen.MyCourse', user_id));
            })
            .catch(function (error) {
                setProcessing(false);
                console.error(error);
            });
    };

    return (
        <AuthenticatedLayout>
            <h1 className="text-2xl font-bold mb-4">New Course</h1>

            <div className="mx-auto p-6 bg-white shadow rounded">

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" name="title" required className="mt-1 w-full p-2 border rounded" />
                    </div>

                    {/* Description */}
                    <div className="min-h-36">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        {/* <textarea name="description" className="mt-1 w-full p-2 border rounded" /> */}
                        <ReactQuill
                            style={{ height: '400px' }}
                            name="description"
                            value={value}
                            onChange={setValue} />
                    </div>

                    {/* Price */}
                    <div className='pt-12'>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input type="number" name="price" min="0" step="0.01" className="mt-1 w-full p-2 border rounded" />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <select name="status" className="mt-1 w-full p-2 border rounded">
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>

                    {/* category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select name="category_id" className="mt-1 w-full p-2 border rounded">
                            <option>pilih category</option>
                            {categories.map((category) =>
                                <option key={category.id} value={category.id}>{category.name}</option>
                            )}
                        </select>
                    </div>

                    {/* Thumbnail Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
                        <input
                            type="file"
                            id="thumbnail"
                            name="thumbnail"
                            accept="image/*"
                            onChange={handleThumbnailChange}
                            className="mt-1 block w-full text-sm"
                        />
                        {thumbnailPreview && (
                            <img src={thumbnailPreview} alt="Preview" className="mt-2 h-40 rounded border" />
                        )}
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                        >
                            {processing ? 'Saving...' : 'Create Course'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}

export default Create