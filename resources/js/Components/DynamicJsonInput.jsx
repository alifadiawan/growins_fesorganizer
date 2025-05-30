// resources/js/Components/DynamicJsonInput.jsx
import React from 'react'; // Still need React for JSX

// MODIFIED defaultDataTypes array
const defaultDataTypes = [
    { value: 'text', label: 'Text' },
    { value: 'number', label: 'Number' },
    { value: 'date', label: 'Date' },
    { value: 'file', label: 'File' },
];

const DynamicJsonInput = ({
    value = [{ title: '', dataType: 'text' }], // Default to 'text' if first option changes
    onChange,
    availableDataTypes = defaultDataTypes,
    fieldTitleLabel = "Field Title",
    dataTypeLabel = "Data Type",
    addRecordButtonText = "Add New Field",
    idPrefix = "dyn-json",
    columnClasses = { title: "sm:col-span-5", type: "sm:col-span-5", remove: "sm:col-span-2" }
}) => {

    const handleAddField = () => {
        // Ensure the default dataType for a new field is one of the available options
        const defaultNewFieldType = availableDataTypes.length > 0 ? availableDataTypes[0].value : 'text';
        onChange([...value, { title: '', dataType: defaultNewFieldType }]);
    };

    const handleRemoveField = (index) => {
        const newFields = value.filter((_, i) => i !== index);
        onChange(newFields);
    };

    const handleFieldChange = (index, event) => {
        const { name, value: fieldValue } = event.target;
        const newFields = value.map((field, i) => {
            if (i === index) {
                return { ...field, [name]: fieldValue };
            }
            return field;
        });
        onChange(newFields);
    };

    // Ensure value is always an array and default dataType for initial item is valid
    const initialFieldDataType = availableDataTypes.length > 0 ? availableDataTypes[0].value : 'text';
    const fields = Array.isArray(value) && value.length > 0
        ? value
        : [{ title: '', dataType: initialFieldDataType }];


    const labelBaseClass = "block text-sm font-medium text-gray-700 mb-1";
    const inputBaseClass = "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
    const buttonBaseClass = "inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150";


    return (
        <div className="space-y-4">
            {fields.map((field, index) => (
                <div key={`${idPrefix}-field-${index}`} className="p-4 border border-gray-200 rounded-md">
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-12 items-end">
                        {/* Field Title */}
                        <div className={columnClasses.title}>
                            <label
                                htmlFor={`${idPrefix}-title-${index}`}
                                className={labelBaseClass}
                            >
                                {fieldTitleLabel} <span className="text-xs text-red-500">**</span>
                            </label>
                            <input
                                id={`${idPrefix}-title-${index}`}
                                type="text"
                                name="title"
                                value={field.title || ''}
                                onChange={(e) => handleFieldChange(index, e)}
                                className={inputBaseClass}
                                
                            />
                        </div>

                        {/* Data Type */}
                        <div className={columnClasses.type}>
                            <label
                                htmlFor={`${idPrefix}-dataType-${index}`}
                                className={labelBaseClass}
                            >
                                {dataTypeLabel} <span className="text-xs text-red-500">**</span>
                            </label>
                            <select
                                id={`${idPrefix}-dataType-${index}`}
                                name="dataType"
                                value={field.dataType || (availableDataTypes.length > 0 ? availableDataTypes[0].value : 'text')}
                                onChange={(e) => handleFieldChange(index, e)}
                                className={inputBaseClass}
                                
                            >
                                {availableDataTypes.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Remove Button */}
                        <div className={columnClasses.remove}>
                            {fields.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveField(index)}
                                    className={`${buttonBaseClass} w-full flex justify-center whitespace-nowrap`}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            <div className="flex justify-start mt-4">
                <button
                    type="button"
                    onClick={handleAddField}
                    className={buttonBaseClass}
                >
                    {addRecordButtonText}
                </button>
            </div>
        </div>
    );
};

export default DynamicJsonInput;