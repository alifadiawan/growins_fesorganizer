import { router } from '@inertiajs/react';
import React from 'react'

const Pagination = ({ meta, links }) => {

    const goTo = (url) => {
        if (url) router.visit(url);
    };

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            {/* Mobile View */}
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                    onClick={() => goTo(links[0].url)}
                    disabled={!links[0].url}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={() => goTo(links[links.length - 1].url)}
                    disabled={!links[links.length - 1].url}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {/* Desktop View */}
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing
                        <span className="font-medium mx-1">{meta.from}</span>
                        to
                        <span className="font-medium mx-1">{meta.to}</span>
                        of
                        <span className="font-medium mx-1">{meta.total}</span>
                        results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow" aria-label="Pagination">
                        {links.map((link, index) => {
                            const isActive = link.active;
                            const isDots = link.label.includes('...');
                            const label = link.label.replace('&laquo;', '«').replace('&raquo;', '»');

                            if (isDots) {
                                return (
                                    <span key={index} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset">
                                        ...
                                    </span>
                                );
                            }

                            return (
                                <button
                                    key={index}
                                    onClick={() => goTo(link.url)}
                                    disabled={!link.url}
                                    className={`
                                    relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset 
                                    ${isActive ? 'z-10 bg-indigo-600 text-white ring-indigo-600' : 'text-gray-900 hover:bg-gray-50'}
                                    ${!link.url ? 'cursor-not-allowed opacity-50' : ''}
                                `}
                                    dangerouslySetInnerHTML={{ __html: label }}
                                />
                            );
                        })}
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Pagination