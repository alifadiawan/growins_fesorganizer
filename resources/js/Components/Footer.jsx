import { Link, usePage } from '@inertiajs/react'
import React from 'react'

const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/courses/all", label: "Courses" },
    { href: "/bootcamp-softskill", label: "Bootcamp & Workshop" },
    { href: "/about-us", label: "About" },
]

const Footer = () => {
    const { url } = usePage()

    return (
        <footer className="bg-white border-t border-gray-200 px-6 py-10">
            <div className="mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 justify-between gap-8 mb-8">
                    {/* Logo and Social Section */}
                    <div className="space-y-6">
                        <Link href="/">
                            <img src="/LOGOGROWINS_2.png" alt="Growins Logo" className="h-30" />
                        </Link>
                        <div className="flex space-x-4">
                            <Link href="https://www.instagram.com/growins.id/" target="_blank" className="text-gray-400 hover:text-gray-600 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    <div></div>

                    {/* Quick Links Section */}
                    <div>
                        <h4 className="text-gray-900 font-medium text-sm mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => {
                                const isActive = url === link.href
                                return (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className={`text-sm transition-colors ${isActive ? 'text-gray-900 font-medium' : 'text-gray-600 hover:text-gray-900'
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                </div>

                {/* Bottom Section */}
                <div className="pt-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6">
                            <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                Terms of Service
                            </Link>
                            <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                Privacy Policy
                            </Link>
                        </div>
                        <p className="text-sm text-gray-600">
                            © {new Date().getFullYear()} Growins. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer