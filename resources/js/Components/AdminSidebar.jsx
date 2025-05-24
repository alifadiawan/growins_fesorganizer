import { Link, router, usePage } from "@inertiajs/react"
import { ChevronDown, ChevronRight, Home, Settings, Users, FileText, Menu, X, Video, BookOpen, Layers, CreditCard, LogOut, Sun, Moon, ArrowLeft } from "lucide-react"
import React, { useState, useEffect } from 'react'

const AdminSidebar = () => {
    const { props } = usePage();
    const user = props.auth.user;
    const { url } = usePage()

    // isActive function for Admin - uses route name string directly
    const isActive = (routeName) => {
        // Ensure route() helper is robust enough for this check.
        // It might need to handle cases where routeName doesn't exist gracefully.
        try {
            const targetUrl = route(routeName, undefined, false); // Get base path without params
            return url.startsWith(targetUrl);
        } catch (error) {
            console.warn(`Route name "${routeName}" not found or error generating URL.`, error);
            return false;
        }
    }

    const [isOpen, setIsOpen] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [expandedSections, setExpandedSections] = useState({
        settings: false, // Defaulting sections to closed
    });
    const [isDarkMode, setIsDarkMode] = useState(false); // Default to light mode

    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode) {
            const mode = savedMode === 'true';
            setIsDarkMode(mode);
            document.documentElement.classList.toggle('dark', mode);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // If no saved mode, check system preference
            // setIsDarkMode(true); // Only set if you want to override default light for system dark users
            // document.documentElement.classList.add('dark'); // Same as above
        } else {
            // Default to light mode
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            // Only update if no user override exists or if you want system changes to always reflect
            // For this setup, we let user toggle override system.
            // const newMode = e.matches;
            // setIsDarkMode(newMode);
            // document.documentElement.classList.toggle('dark', newMode);
            // localStorage.setItem('darkMode', newMode.toString());
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);


    const submitLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'), {}, {
            onSuccess: () => {
                router.visit('/');
            },
        });
    };

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section],
        }));
    }

    const toggleAdminSidebar = () => {
        setIsOpen(!isOpen);
    }

    const toggleMobileAdminSidebar = () => {
        setIsMobileOpen(!isMobileOpen);
    }

    const toggleSystemDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        document.documentElement.classList.toggle('dark', newMode);
        localStorage.setItem('darkMode', newMode.toString());
    };

    const linkClasses = (routeName) => `
        flex items-center p-3 rounded-lg transition-colors duration-150
        ${isOpen ? "px-4" : "justify-center px-2"}
        ${isActive(routeName)
            ? 'bg-sky-100 text-sky-600 dark:bg-sky-900/50 dark:text-sky-400 font-medium'
            : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
        }
    `;

    const iconClasses = (routeName) => `
        h-5 w-5 shrink-0
        ${isActive(routeName)
            ? 'text-sky-500 dark:text-sky-400'
            : 'text-slate-500 dark:text-slate-400'
        }
    `;

    const textClasses = () => `
        ml-3 text-sm 
        ${isOpen ? "opacity-100" : "opacity-0 sr-only"}
        transition-opacity duration-150 font-normal text-slate-700 dark:text-slate-200
    `;

    // Specific text class for active links to override general textClass
    const activeTextClasses = (routeName) => `
        ml-3 text-sm 
        ${isOpen ? "opacity-100" : "opacity-0 sr-only"}
        transition-opacity duration-150
        ${isActive(routeName)
            ? 'font-medium text-sky-600 dark:text-sky-300'
            : 'font-normal text-slate-700 dark:text-slate-200'
        }
    `;

    const sectionTitleClasses = `
        px-4 pt-4 pb-1 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider
        ${isOpen ? "block" : "hidden"}
    `;

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={toggleMobileAdminSidebar}
                className="fixed top-4 left-4 z-[60] p-2.5 rounded-full bg-white shadow-lg md:hidden dark:bg-slate-800 dark:text-white dark:shadow-slate-900/50"
                aria-label="Toggle Admin sidebar"
            >
                {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* AdminSidebar Backdrop for Mobile */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
                    onClick={toggleMobileAdminSidebar}
                />
            )}

            {/* AdminSidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 h-screen bg-white border-r border-slate-200 transition-all duration-300 ease-in-out
                dark:bg-slate-900 dark:border-slate-700 shadow-xl
                ${isOpen ? "w-64" : "w-[72px]"} 
                ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            `}
            >
                {/* AdminSidebar Header */}
                <div className={`flex items-center justify-between h-16 border-b border-slate-200 dark:border-slate-700 ${isOpen ? "px-5" : "px-[22px]"}`}>
                    <div className="flex items-center">
                        {isOpen && <Link href={route('admin.dashboard')} className="ml-1 font-bold text-lg text-slate-800 dark:text-white">Admin Panel</Link>}
                        {!isOpen && (
                            <Link href={route('admin.dashboard')} aria-label="Go to admin dashboard">
                                <svg className="w-8 h-8 text-sky-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                                </svg>
                            </Link>
                        )}
                    </div>
                    <button
                        onClick={toggleSystemDarkMode}
                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
                        aria-label="Toggle dark mode"
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                {/* Desktop Sidebar Toggle/Expand Buttons */}
                <button
                    onClick={toggleAdminSidebar}
                    className={`hidden md:flex absolute top-16 -right-3 z-10 justify-center items-center w-6 h-6 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-full shadow-md hover:bg-slate-50 dark:hover:bg-slate-800 transition`}
                    aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
                    title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
                >
                    {isOpen ? <ArrowLeft size={16} className="text-slate-600 dark:text-slate-300" /> : <ChevronRight size={16} className="text-slate-600 dark:text-slate-300" />}
                </button>

                {/* AdminSidebar Content */}
                <div className="py-2 overflow-y-auto h-[calc(100vh-4rem-4.5rem)]"> {/* Adjust height for header & footer */}
                    <nav className="space-y-1 px-3">
                        <Link href={route('admin.dashboard')} className={linkClasses('admin.dashboard')}>
                            <Home className={iconClasses('admin.dashboard')} />
                            <span className={activeTextClasses('admin.dashboard')}>Dashboard</span>
                        </Link>

                        {/* Courses & Bootcamp Section */}
                        <div>
                            <h2 className={sectionTitleClasses}>Content</h2>
                            <Link href={route('admin.course.index')} className={linkClasses('admin.course.index')}>
                                <Layers className={iconClasses('admin.course.index')} />
                                <span className={activeTextClasses('admin.course.index')}>Courses</span>
                            </Link>
                            <Link href={route('bootcamp.index')} className={linkClasses('bootcamp.index')}> {/* Assuming 'bootcamp.index' is correct */}
                                <BookOpen className={iconClasses('bootcamp.index')} />
                                <span className={activeTextClasses('bootcamp.index')}>Bootcamps</span>
                            </Link>
                        </div>

                        {/* Transactions Section */}
                        <div>
                            <h2 className={sectionTitleClasses}>Sales</h2>
                            <Link href={route('admin.transactions.index')} className={linkClasses('admin.transactions.index')}>
                                <CreditCard className={iconClasses('admin.transactions.index')} />
                                <span className={activeTextClasses('admin.transactions.index')}>Transactions</span>
                            </Link>
                        </div>


                        {/* Management Section */}
                        <div>
                            <h2 className={sectionTitleClasses}>Management</h2>
                            <Link href={route('admin.user.index')} className={linkClasses('admin.user.index')}>
                                <Users className={iconClasses('admin.user.index')} />
                                <span className={activeTextClasses('admin.user.index')}>Users</span>
                            </Link>

                            {/* Settings with Collapsible */}
                            <div>
                                <button
                                    onClick={() => toggleSection("settings")}
                                    className={`flex items-center w-full p-3 text-left rounded-lg transition-colors duration-150
                                        ${isOpen ? "justify-between px-4" : "justify-center px-2"}
                                        hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300
                                    `}
                                >
                                    <div className="flex items-center">
                                        <Settings className="h-5 w-5 shrink-0 text-slate-500 dark:text-slate-400" />
                                        {isOpen && <span className="ml-3 text-sm font-normal">Settings</span>}
                                    </div>
                                    {isOpen && (
                                        <ChevronDown
                                            className={`h-4 w-4 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${expandedSections.settings ? "rotate-180" : ""}`}
                                        />
                                    )}
                                </button>
                                {isOpen && expandedSections.settings && (
                                    <div className="mt-1 pl-7 space-y-1"> {/* Indent past icon + margin */}
                                        {/* Example sub-links - replace with Link components and actual routes */}
                                        <Link href="#" className="block px-3 py-2 rounded-md text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-100">Site Settings</Link>
                                        <Link href="#" className="block px-3 py-2 rounded-md text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-100">My Profile</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </nav>
                </div>

                {/* AdminSidebar Footer */}
                <div className={`absolute bottom-0 left-0 right-0 p-3 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 sr-only pointer-events-none"}`}>
                    <div className="flex items-center mb-2">
                        <div className="flex-shrink-0">
                            {user.avatar_url ? (
                                <img className="w-9 h-9 rounded-full object-cover" src={user.avatar_url} alt="User avatar" />
                            ) : (
                                <div className="w-9 h-9 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 font-semibold">
                                    {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                                </div>
                            )}
                        </div>
                        <div className="ml-3 min-w-0 flex-1">
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{user.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                        </div>
                    </div>
                    <form onSubmit={submitLogout}>
                        <button
                            type="submit"
                            className={`w-full flex items-center p-2 rounded-md text-sm font-medium transition-colors duration-150
                            text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 dark:hover:text-red-300
                            ${isOpen ? "px-3" : "justify-center"}`}
                        >
                            <LogOut className={`h-5 w-5 shrink-0 ${isOpen ? "" : "text-red-500 dark:text-red-400"}`} />
                            {isOpen && <span className="ml-2.5">Logout</span>}
                            {!isOpen && <span className="sr-only">Logout</span>}
                        </button>
                    </form>
                </div>
            </aside>
        </>
    )
}

export default AdminSidebar