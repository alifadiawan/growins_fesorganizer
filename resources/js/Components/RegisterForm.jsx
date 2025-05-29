import React from 'react';

export default function RegisterForm({ custom_attributes }) {
  if (!custom_attributes || custom_attributes.length === 0) {
    // This check can be in the parent (Show.jsx) as well, as shown above.
    // If handled in parent, this component can assume custom_attributes is always a non-empty array.
    return (
      <section id="register" className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg text-gray-600">No registration fields defined for this event.</p>
          </div>
        </div>
      </section>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log("Form Data Submitted:", data);
    alert('Form submitted! Check the console for data. (This is a demo submit)');
    // In a real application, you would send 'data' to your backend API here.
    // For example, using Inertia: Inertia.post('/your-submit-url', data);
  };

  return (
    <section id="register" className="py-16 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Register Your Interest</h2>
          <p className="mt-2 text-lg text-gray-600">Fill out the form below to secure your spot or get more information.</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
          {custom_attributes.map((field) => (
            <div key={field.name}> {/* Ensure field.name is unique */}
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              {field.type === 'select' ? (
                <select
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  // Ensure a default value is selected, especially if there's a placeholder
                  defaultValue={field.placeholder ? "" : (field.options && field.options.length > 0 ? (typeof field.options[0] === 'object' ? field.options[0].value : field.options[0]) : "")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                >
                  {field.placeholder && <option value="">{field.placeholder}</option>}
                  {field.options && field.options.map((option, idx) => {
                    // Handle if options are strings or objects {value: 'val', label: 'Option Label'}
                    const value = typeof option === 'object' ? option.value : option;
                    const displayLabel = typeof option === 'object' ? option.label : option;
                    return <option key={idx} value={value}>{displayLabel}</option>;
                  })}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  rows={field.rows || 3} // Use rows from field data or default
                  placeholder={field.placeholder}
                  required={field.required}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              ) : (
                // Default to input for text, email, tel, number, date, etc.
                <input
                  type={field.type || 'text'} // Default to 'text' if type is missing
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              )}
            </div>
          ))}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            >
              Submit Registration
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}