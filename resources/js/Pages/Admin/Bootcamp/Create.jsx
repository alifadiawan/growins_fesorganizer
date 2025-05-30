import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React, { useState } from 'react'
import { router, Link, usePage, useForm } from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import DynamicJsonInput from '@/Components/DynamicJsonInput'

const Create = () => {
  const [processing, setProcessing] = useState(false);

  const { data, setData, post, errors } = useForm({
    title: '',
    slug: '',
    short_description: '',
    description: '',
    main_theme: '',
    quota: '',
    normal_price: '',
    discounted_price: '',
    time_start: '',
    time_end: '',
    date_start: '',
    date_end: '',
    layout_style: '',
    meta_title: '',
    meta_description: '',
    is_published: false,
    sections: [],
    cover: null,
    hero_image: null,
    poster: null,
    meta_image: null,
  });

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image',
  ];

  const generateSlug = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // remove non-word characters
      .replace(/\s+/g, '-')     // replace spaces with dashes
      .replace(/--+/g, '-');    // remove multiple dashes



  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setData(prev => {
      const newData = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      };

      if (
        name === 'title' &&
        (!prev.slug || prev.slug === generateSlug(prev.title))
      ) {
        newData.slug = generateSlug(value);
      }

      return newData;
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setData(prev => ({
      ...prev,
      [name]: files[0] || null
    }));
  };

  const handleSubmit = () => {
    setProcessing(true);

    post(route('bootcamp.store'), {
      onSuccess: () => {
        console.log('Bootcamp created successfully');
        setProcessing(false);
      },
      onError: () => {
        console.error('Error creating bootcamp:', errors);
        setProcessing(false);
      }
    });
  };

  return (
    <AuthenticatedLayout pageTitle="Create Bootcamp">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6">
              <div className="flex items-center space-x-4">
                <Link href={route('bootcamp.index')} className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200 hover:bg-gray-100 px-3 py-2 rounded-md">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Bootcamps
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}

        <div className="bg-white rounded-lg shadow-md p-6">

          {Object.entries(errors).map(([field, message]) => (
            <div key={field} className="mb-5" style={{ color: 'red' }}>
              {message}
            </div>
          ))}

          <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Form</h1>

          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-xs text-red-500">**</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={data.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug <span className="text-xs text-gray-400">leave it empty for automatic</span>
                </label>
                <input
                  disabled={true}
                  type="text"
                  name="slug"
                  value={data.slug}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 bg-gray-300 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Short Description */}
            <div className="pb-12">
              <label className="block text-sm font-medium text-gray-700 mb-5">
                Short Description <span className="text-xs text-red-500">** </span>
                (Untuk SEO dan tampilan di halaman utama)
              </label>
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={data.short_description}
                onChange={(value) => setData('short_description', value)}
                className="bg-white"
                style={{ height: '100px' }}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-5">
                Description <span className="text-xs text-red-500">** </span>
                (Untuk tampilan bagian di Event Poster / Detail)
              </label>
              <ReactQuill
                theme="snow"
                modules={modules}    // Add this line
                formats={formats}    // Add this line
                value={data.description}
                onChange={(value) => setData('description', value)}  // Changed this line
                className="bg-white"
                style={{ height: '400px' }}
              />
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quota <span className="text-xs text-red-500">**</span>
                </label>
                <input
                  type="number"
                  name="quota"
                  value={data.quota}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Normal Price <span className="text-xs text-red-500">**</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="normal_price"
                  value={data.normal_price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discounted Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="discounted_price"
                  value={data.discounted_price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Time and Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  name="time_start"
                  value={data.time_start}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  name="time_end"
                  value={data.time_end}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date <span className="text-xs text-red-500">**</span>
                </label>
                <input
                  type="date"
                  name="date_start"
                  value={data.date_start}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  name="date_end"
                  value={data.date_end}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Meta Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Title <span className="text-xs text-gray-400">opsional</span>
                </label>
                <input
                  type="text"
                  name="meta_title"
                  value={data.meta_title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description <span className="text-xs text-gray-400">opsional</span>
                </label>
                <textarea
                  name="meta_description"
                  value={data.meta_description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* File Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Image <span className="text-xs text-red-500">**</span>
                </label>
                <input
                  type="file"
                  name="cover"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Poster <span className="text-xs text-red-500">**</span>
                </label>
                <input
                  type="file"
                  name="poster"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-200 p-4 rounded-md text-gray-500">
              <p>Custom Field</p>
            </div>

            <DynamicJsonInput
              value={data.custom_attributes} // Pass the array from useForm's data
              onChange={(newAttributes) => setData('custom_attributes', newAttributes)} // Update the array in useForm's data
              fieldTitleLabel="Attribute Name" // Custom label for this context
              dataTypeLabel="Attribute Type"   // Custom label for this context
              addRecordButtonText="Add Attribute"
              idPrefix="prod-attr" // Unique prefix if using multiple DynamicJsonInputs on one page
            />

            {/* Published Status */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="is_published"
                checked={data.is_published}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Published
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <button
                onClick={handleSubmit}
                disabled={processing}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>


    </AuthenticatedLayout>
  )
}

export default Create