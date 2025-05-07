import Modal from '@/Components/Modal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Link } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';


const Edit = ({ course }) => {
    // modals
    const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
    const [openModuleId, setOpenModuleId] = useState(null);

    const [isEditLessonModalOpen, setIsEditLessonModalOpen] = useState(false);
    const [selectedLessonId, setSelectedLessonId] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);

    const [processing, setProcessing] = useState(false);
    const user = usePage().props.auth;
    const errors = usePage().props.errors;


    // props
    const modules = course.modules;
    const lessons = course.modules.lessons;

    // Course Form 
    const [title, setTitle] = useState(course.title || '')
    const [description, setDescription] = useState(course.description || '')
    const [price, setPrice] = useState(course.price || 0)
    const [status, setStatus] = useState(course.status || 'draft')


    const handleDeleteLesson = (lessonId) => {
        if (confirm('Delete this lesson?')) {
            // router.delete(route('lessons.destroy', lessonId));
        }
    };

    const handleDeleteModule = async (moduleId) => {

        try {
            axios.delete(route('api.modules.delete', { id: moduleId }));

            router.visit(`/admin/course/edit/${course.id}`);
        } catch (error) {
            console.log(error);
        }


    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnail(file);
            setThumbnailPreview(URL.createObjectURL(file));
        }
    };

    const handleCourseUpdate = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const formData = new FormData(e.target);
        formData.append('title', e.target.title.value);
        formData.append('description', description);
        formData.append('price', e.target.price.value);
        formData.append('status', e.target.status.value);

        const fileInput = e.target.thumbnail;
        if (fileInput && fileInput.files[0]) {
            formData.append('thumbnail', fileInput.files[0]);
        }

        try {
            const response = await axios.post(route('api.courses.update', course.id), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    _method: 'PUT', // simulate PUT since form can't actually send PUT
                }
            });
            window.location.href = route('admin.course.index');
        } catch (error) {
            console.error('Update failed:', error.response?.data || error);
        } finally {
            setProcessing(false);
        }
    };

    const handleNewModule = async (e) => {
        e.preventDefault();
        const form = e.target


        const data = {
            title: form.title.value,
            course_id: course.id,
            is_free: form.is_free.checked,
        }

        console.log(data)
        axios.post(route('api.modules.store'), data)
            .then(response => {
                console.log('Success:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });


    };

    const handleAddLesson = async (e, module_id) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const isFreeChecked = e.target.querySelector('input[name="is_free"]').checked;
        const newLesson = {
            module_id: module_id,
            title: formData.get('lesson_title'),
            content: formData.get('lesson_content'),
            video_url: formData.get('lesson_video_url'),
            is_free: isFreeChecked,
        }

        try {
            axios.post(route('api.lessons.store', module_id), newLesson)
            console.log("success");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        axios.get('/sanctum/csrf-cookie');
    }, []);

    return (
        <AuthenticatedLayout>

            <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Edit Course</h1>

            {errors.length != 0 ? (
                <p>no error</p>
            ) : (
                <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                    <p class="font-bold">Be Warned</p>
                    <p>Something not ideal might be happening.</p>
                </div>
            )}

            {/* === Course Form === */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-10">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Course Details</h2>
                <form onSubmit={handleCourseUpdate} className="space-y-5">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail</label>

                        {/* Current Image Preview */}
                        {course.thumbnail && (
                            <div className="w-full h-48 bg-gray-200 relative mb-2">
                                <img
                                    src={`/storage/${course.thumbnail}`}
                                    alt={course.title}
                                    className="w-full h-full object-cover rounded"
                                />
                            </div>
                        )}

                        {/* Image Upload Field */}
                        <input
                            type="file"
                            id="thumbnail"
                            name="thumbnail"
                            accept="image/*"
                            className="w-full border border-gray-300 p-2 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            defaultValue={course.title}
                            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="Enter course title"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <ReactQuill
                            theme="snow"
                            name="description"
                            value={description}
                            onChange={setDescription} 
                            style={{ height: '400px', marginBottom: '2rem' }}
                            className="bg-white"
                        />

                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-12">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-gray-500">Rp.</span>
                                <input
                                    type="text"
                                    name="price"
                                    defaultValue={course.price}
                                    className="w-full border border-gray-300 p-3 pl-8 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="Rp0,00"
                                />
                            </div>
                            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                name="status"
                                defaultValue={status}
                                className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-sm font-medium"
                            disabled={processing}
                        >
                            {processing ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving...
                                </span>
                            ) : (
                                'Save Changes'
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* === Modules & Lessons === */}
            <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Course Content</h2>
                    <button
                        onClick={() => setIsModuleModalOpen(true)}
                        className="bg-green-600 text-white px-5 py-2.5 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all shadow-sm flex items-center font-medium"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Add Module
                    </button>
                </div>

                {modules.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <p className="text-gray-500">No modules yet. Add a module to get started.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {modules.map((module, index) => (
                            <div key={module.id} className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-all">
                                <div className="flex justify-between items-center mb-4 pb-2 border-b">
                                    <div className="flex items-center">
                                        <span className="bg-blue-100 text-blue-800 text-xs font-medium rounded-full h-6 w-6 flex items-center justify-center mr-3">
                                            {index + 1}
                                        </span>
                                        <h3 className="font-bold text-lg text-gray-800 flex items-center space-x-2">
                                            <span>{module.title}</span>
                                            <span className={`text-xs font-semibold px-2 py-1 rounded ${module.is_free == 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {module.is_free == 1 ? "Free for public" : "Paid"}
                                            </span>
                                        </h3>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => setSelectedLessonId(module.lessons.id)}
                                            className="text-gray-600 hover:text-blue-600 p-1.5 rounded-full hover:bg-blue-50 transition-all"
                                            title="Edit module"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                            </svg>
                                        </button>
                                        <button
                                            // onClick={() => handleDeleteModule(module.id)}
                                            className="text-gray-600 hover:text-red-600 p-1.5 rounded-full hover:bg-red-50 transition-all"
                                            title="Delete module"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="ml-6">
                                    <h4 className="font-medium text-sm text-gray-600 mb-3 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                        </svg>
                                        Lessons ({module.lessons.length})
                                    </h4>

                                    {module.lessons.length === 0 ? (
                                        <div className="text-center py-6 bg-gray-50 rounded-md">
                                            <p className="text-sm text-gray-500 italic">No lessons added yet.</p>
                                        </div>
                                    ) : (
                                        <ul className="space-y-3 mb-4">
                                            {module.lessons.map((lesson, lessonIndex) => (
                                                <li key={lesson.id} className="bg-gray-50 p-4 rounded-md hover:bg-gray-100 transition-all border border-gray-100">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div className="flex items-center">
                                                            <span className="text-sm font-medium bg-gray-200 text-gray-700 rounded-full h-6 w-6 flex items-center justify-center mr-3">
                                                                {lessonIndex + 1}
                                                            </span>
                                                            <h3 className="font-medium text-gray-800 flex items-center space-x-2">
                                                                <span>{lesson.title}</span>
                                                                <span className={`text-xs font-semibold px-2 py-1 rounded ${lesson.is_free ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                                    }`}>
                                                                    {lesson.is_free ? "Free" : "Paid"}
                                                                </span>
                                                            </h3>
                                                        </div>
                                                        <div className="flex space-x-2">
                                                            <Link
                                                                // href=
                                                                className="text-gray-500 hover:text-blue-600 p-2 rounded hover:bg-blue-50 transition-all"
                                                                title="Edit lesson"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                                </svg>
                                                            </Link>
                                                            <Link
                                                                className="text-gray-500 hover:text-red-600 p-2 rounded hover:bg-red-50 transition-all"
                                                                title="Delete lesson"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                                </svg>
                                                            </Link>
                                                        </div>
                                                    </div>

                                                    <div className="pl-9">
                                                        <p className="text-gray-700 text-sm mb-2">{lesson.content}</p>

                                                        {lesson.video_url && (
                                                            <div className="flex items-center mt-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                                                    <path fillRule="evenodd" d="M10 18a1 1 0 001-1v-6.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 10.414V17a1 1 0 001 1z" clipRule="evenodd" />
                                                                </svg>
                                                                <a href={lesson.video_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 text-sm truncate max-w-md">
                                                                    {lesson.video_url}
                                                                </a>
                                                            </div>
                                                        )}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    <button
                                        onClick={() => setOpenModuleId(module.id)}
                                        className="mt-2 text-sm flex items-center text-blue-600 hover:text-blue-800 transition-all font-medium"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                        </svg>
                                        Add Lesson
                                    </button>

                                    {openModuleId === module.id && (
                                        <Modal key={module.id} title="Add New Lesson" isOpen={true} onClose={() => setOpenModuleId(null)}>
                                            <form onSubmit={(e) => handleAddLesson(e, module.id)} method="post" className="space-y-4">
                                                <p>{module.id}</p>
                                                <div className="space-y-1">
                                                    <label htmlFor="new-title" className="block text-sm font-medium text-gray-700">Lesson Title</label>
                                                    <input
                                                        id="new-title"
                                                        type="text"
                                                        name="lesson_title"
                                                        className="bg-white px-3 py-2 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label htmlFor="new-content" className="block text-sm font-medium text-gray-700">Content</label>
                                                    <textarea
                                                        id="new-content"
                                                        name="lesson_content"
                                                        rows="4"
                                                        className="bg-white px-3 py-2 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label htmlFor="new-video" className="block text-sm font-medium text-gray-700">Video URL</label>
                                                    <input
                                                        id="lesson_video_url"
                                                        type="text"
                                                        name="lesson_video_url"
                                                        className="bg-white px-3 py-2 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                    />
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        id="is_free"
                                                        name="is_free"
                                                        className="rounded border-gray-300 text-green-600 shadow-sm focus:ring-green-500"
                                                    />
                                                    <label htmlFor="public" className="text-sm text-gray-700">
                                                        Free for Public
                                                    </label>
                                                </div>
                                                <div className="flex justify-end space-x-3 pt-2">
                                                    <button
                                                        type="button"
                                                        // onClick={() => setIsLessonModalOpen(false)}
                                                        className='border border-gray-300 bg-white px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50'
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className='bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-white'
                                                    >
                                                        Add Lesson
                                                    </button>
                                                </div>
                                            </form>
                                        </Modal>
                                    )}

                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* New module */}
            <Modal title="New Module" isOpen={isModuleModalOpen} onClose={() => setIsModuleModalOpen(false)}>
                <form onSubmit={handleNewModule} method="post" className="rounded-lg space-y-5 w-full max-w-md">
                    {/* Module Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Module Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Enter module title"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* Checkbox */}
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="is_free"
                            name="is_free"
                            className="rounded border-gray-300 text-green-600 shadow-sm focus:ring-green-500"
                        />
                        <label htmlFor="public" className="text-sm text-gray-700">
                            Free for Public
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                    >
                        Add Module
                    </button>
                </form>
            </Modal>

        </AuthenticatedLayout>
    )
}

export default Edit 