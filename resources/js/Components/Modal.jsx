import React, { useEffect, useState } from 'react'

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // Trigger the animation after the modal is mounted
            setTimeout(() => setShow(true), 10);
        } else {
            setShow(false);
        }
    }, [isOpen]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div
                className={`bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative transform transition-all duration-300 ease-out ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        &times;
                    </button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    )
}

export default Modal