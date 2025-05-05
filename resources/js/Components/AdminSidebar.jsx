import { Link, router, usePage } from "@inertiajs/react"
import { ChevronDown, ChevronRight, Home, Settings, Users, FileText, Mail, Menu, X, Video, BookOpen, Layers, CreditCard } from "lucide-react"
import React, { useState } from 'react'

const AdminSidebar = () => {
    const user = usePage().props.auth.user;
    const { url } = usePage()

    const isActive = (pattern) => {
        return url.startsWith(route(pattern, undefined, false))
    }

    const [isOpen, setIsOpen] = useState(true)
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const [expandedSections, setExpandedSections] = useState({
        dashboard: true,
        management: false,
        settings: false,
    })

    const submit = (e) => {
        e.preventDefault();

        router.post(route('logout'), {}, {
            onSuccess: () => {
                router.visit('/');
            },
        });
    };

    const toggleSection = (section) => {
        setExpandedSections({
            ...expandedSections,
            [section]: !expandedSections[section],
        })
    }

    const toggleAdminSidebar = () => {
        setIsOpen(!isOpen)
    }

    const toggleMobileAdminSidebar = () => {
        setIsMobileOpen(!isMobileOpen)
    }

    const toggleDarkMode = () => {
        const html = document.documentElement;
        html.classList.toggle('dark');
    };

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={toggleMobileAdminSidebar}
                className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md md:hidden dark:bg-zinc-900 dark:text-white dark:shadow-lg"
                aria-label="Toggle Adminsidebar"
            >
                {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* AdminSidebar Backdrop for Mobile */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-40 md:hidden"
                    onClick={toggleMobileAdminSidebar}
                />
            )}

            {/* AdminSidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
    dark:bg-black dark:border-zinc-800
    ${isOpen ? "w-64" : "w-16"} 
    ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
  `}
            >
                {/* AdminSidebar Header */}
                <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-zinc-800">
                    <div className="flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-blue-600 text-white">S</div>
                        {isOpen && <span className="ml-2 font-semibold text-gray-800 dark:text-white">AdminSidebar</span>}
                    </div>
                    <button
                        onClick={toggleDarkMode}
                        className="p-1 ml-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800"
                        aria-label="Toggle dark mode"
                    >
                        🌓
                    </button>
                </div>

                {/* AdminSidebar Content */}
                <div className="py-4 overflow-y-auto">
                    <nav className="space-y-1 px-2">

                        {/* Dashboard */}
                        <Link
                            href={route('admin.dashboard')}
                            className={`flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 
                                ${isActive('admin.dashboard') ? 'bg-gray-200 text-blue-600 dark:bg-zinc-800 dark:text-white' : 'text-gray-700 dark:text-gray-200'} 
                                ${isOpen ? "" : "justify-center"}`}
                        >
                            <Home className="h-5 w-5" />
                            {isOpen && <span className="ml-3 text-sm font-medium">Dashboard</span>}
                        </Link>

                        {/* Courses & Bootcamp Section */}
                        <div className="flex flex-col">
                            <span className="block text-sm text-zinc-400 ms-2 mt-3">Courses & Bootcamp</span>

                            {/* Courses */}
                            <Link
                                href={route('admin.course.index')}
                                className={`flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 
                                    ${isActive('admin.course.index') ? 'bg-gray-200 text-blue-600 dark:bg-zinc-800 dark:text-white' : 'text-gray-700 dark:text-gray-200'} 
                                    ${isOpen ? '' : 'justify-center'}`}
                            >
                                <Layers className="h-5 w-5" />
                                {isOpen && <span className="ml-3 text-sm font-medium">Courses</span>}
                            </Link>
                        </div>

                        {/* Bootcamp Softskill */}
                        <Link
                            href={route('bootcamp.index')}
                            className={`flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 
                            ${isActive('bootcamp.index') ? 'bg-gray-200 text-blue-600 dark:bg-zinc-800 dark:text-white' : 'text-gray-700 dark:text-gray-200'} 
                            ${isOpen ? '' : 'justify-center'}`}
                        >
                            <BookOpen className="h-5 w-5" />
                            {isOpen && <span className="ml-3 text-sm font-medium">Bootcamp Softskill</span>}
                        </Link>

                        {/* Transactions */}
                        <div className="flex flex-col">
                            <span className="block text-sm text-zinc-400 ms-2 mt-3">Transactions</span>

                            <Link
                                href={route('admin.transactions.index')}
                                className={`flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 
                                ${isActive('admin.transactions.index') ? 'bg-gray-200 text-blue-600 dark:bg-zinc-800 dark:text-white' : 'text-gray-700 dark:text-gray-200'} 
                                ${isOpen ? '' : 'justify-center'}`}
                            >
                                <CreditCard className="h-5 w-5" />
                                {isOpen && <span className="ml-3 text-sm font-medium">All Transactions</span>}
                            </Link>
                        </div>

                        {/* Misc */}
                        <div className="flex flex-col">
                            <span className="block text-sm text-zinc-400 ms-2 mt-3 mb-3">Misc</span>

                            {/* Users */}
                            <Link
                                href="#"
                                className={`flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 
                                 text-gray-700 dark:text-gray-200 ${isOpen ? '' : 'justify-center'}`}
                            >
                                <Users className="h-5 w-5" />
                                {isOpen && <span className="ml-3 text-sm font-medium">Users</span>}
                            </Link>

                            {/* Settings with Collapsible */}
                            <div>
                                <button
                                    onClick={() => toggleSection("settings")}
                                    className={`flex items-center w-full p-2 text-left rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 ${isOpen ? "justify-between" : "justify-center"}`}
                                >
                                    <div className="flex items-center">
                                        <Settings className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                                        {isOpen && <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-200">Settings</span>}
                                    </div>
                                    {isOpen && (
                                        <ChevronDown
                                            className={`h-4 w-4 text-gray-500 dark:text-gray-300 transition-transform ${expandedSections.settings ? "rotate-180" : ""}`}
                                        />
                                    )}
                                </button>

                                {isOpen && expandedSections.settings && (
                                    <div className="mt-1 pl-6 space-y-1">
                                        <a href="#" className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-zinc-800">Profile</a>
                                        <a href="#" className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-zinc-800">Account</a>
                                        <a href="#" className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-zinc-800">Preferences</a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </nav>
                </div>

                {/* AdminSidebar Footer */}
                {isOpen && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-zinc-800">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-zinc-700"></div>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{user.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                                <form onSubmit={submit}>
                                    <button type="submit" className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md text-xs">Logout</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </aside>
        </>
    )
}

export default AdminSidebar