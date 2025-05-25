import { Link, router, usePage } from "@inertiajs/react"
import { ChevronDown, Home, Settings, Users, FileText, Mail, Menu, X, Video, ArrowLeft, Briefcase, LogOut, Sun, Moon, ChevronRight, User } from "lucide-react"
import React, { useState, useEffect } from 'react'

const UserSidebar = () => {
  const { url } = usePage()
  const user = usePage().props.auth.user

  const [isOpen, setIsOpen] = useState(true) // Sidebar open on desktop
  const [isMobileOpen, setIsMobileOpen] = useState(false) // Sidebar open on mobile
  const [expandedSections, setExpandedSections] = useState({
    dashboard: true, // Example: keep dashboard expanded by default if needed
    management: false,
    settings: false,
  })
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved dark mode preference and system preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      const mode = savedMode === 'true';
      setIsDarkMode(mode);
      document.documentElement.classList.toggle('dark', mode);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    // Listener for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setIsDarkMode(e.matches);
      document.documentElement.classList.toggle('dark', e.matches);
      localStorage.setItem('darkMode', e.matches);
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
    }))
  }

  const toggleUserSidebar = () => {
    setIsOpen(!isOpen)
  }

  const toggleMobileUserSidebar = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  const toggleSystemDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  const isActive = (path) => {
    // Ensure user ID is correctly interpolated if needed for specific paths
    if (path.includes(':userId')) {
      return url.startsWith(path.replace(':userId', user.id));
    }
    return url.startsWith(path);
  }

  const linkClasses = (path) => `
    flex items-center p-3 rounded-lg transition-colors duration-150
    ${isOpen ? "px-4" : "justify-center px-2"}
    ${isActive(path)
      ? 'bg-sky-100 text-sky-600 dark:bg-sky-900/50 dark:text-sky-400 font-medium'
      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
    }
  `;

  const iconClasses = (path) => `
    h-5 w-5 shrink-0
    ${isActive(path)
      ? 'text-sky-500 dark:text-sky-400'
      : 'text-slate-500 dark:text-slate-400'
    }
  `;

  const textClasses = (path) => `
    ml-3 text-sm 
    ${isOpen ? "opacity-100" : "opacity-0 sr-only"} // Hide text when closed, but keep for ARIA
    transition-opacity duration-150
    ${isActive(path)
      ? 'font-medium text-sky-600 dark:text-sky-300'
      : 'font-normal text-slate-700 dark:text-slate-200'
    }
  `;


  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleMobileUserSidebar}
        className="fixed top-4 left-4 z-[60] p-2.5 rounded-full bg-white shadow-lg md:hidden dark:bg-slate-800 dark:text-white dark:shadow-slate-900/50"
        aria-label="Toggle UserSidebar"
      >
        {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* UserSidebar Backdrop for Mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleMobileUserSidebar}
        />
      )}

      {/* UserSidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-white border-r border-slate-200 transition-all duration-300 ease-in-out
        dark:bg-black dark:border-slate-700 shadow-xl
        ${isOpen ? "w-64" : "w-[72px]"} 
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        {/* UserSidebar Header */}
        <div className={`flex items-center justify-between h-16 px-4 border-b border-slate-200 dark:border-slate-700 ${isOpen ? "px-5" : "px-[22px]"}`}>
          <div className="flex items-center">
            {isOpen && <Link href="/" className="ml-1 font-bold text-lg text-slate-800 dark:text-white">GROWINS</Link>}
            {/* Optional: Show a small logo when closed */}
            {!isOpen && (
              <Link href="/" aria-label="Go to homepage">
                <svg className="w-8 h-8 text-sky-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
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

        {/* Desktop Sidebar Toggle - subtle button at the edge when sidebar is open */}
        {isOpen && (
          <button
            onClick={toggleUserSidebar}
            className="hidden md:flex absolute top-1/2 -right-3 z-10 justify-center items-center w-6 h-6 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-full shadow-md hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            aria-label="Toggle sidebar"
          >
            <ArrowLeft size={16} className="text-slate-600 dark:text-slate-300" />
          </button>
        )}
        {/* Desktop Sidebar Expand - subtle button at the edge when sidebar is closed */}
        {!isOpen && (
          <button
            onClick={toggleUserSidebar}
            className="hidden md:flex absolute top-1/2 -right-3 z-10 justify-center items-center w-6 h-6 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-full shadow-md hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            title="Expand sidebar" // Tooltip
          >
            <ChevronRight size={16} className="text-slate-600 dark:text-slate-300" />
          </button>
        )}


        {/* UserSidebar Content */}
        <div className="py-4 overflow-y-auto h-[calc(100vh-4rem-4rem)]"> {/* Adjust height based on header and footer height */}
          <nav className="space-y-1.5 px-3">

            <Link href={route('user.dashboard')} className={linkClasses(`/user/dashboard`)}>
              <Home className={iconClasses(`/user/${user.id}/dashboard`)} />
              <span className={textClasses(`/user/${user.id}/dashboard`)}>Dashboard</span>
            </Link>

            <Link href={route('user.myCourse')} className={linkClasses('/user/my-course')}>
              <Video className={iconClasses('/my-courses')} />
              <span className={textClasses('/my-courses')}>My Courses</span>
            </Link>

            <Link href={route('user.workshops')} className={linkClasses('/user/workshops')}>
              <Briefcase className={iconClasses('/workshops')} />
              <span className={textClasses('/workshops')}>Workshop & Bootcamp</span>
            </Link>

            {/* Settings Section */}
            <div>
              <button
                onClick={() => toggleSection("settings")}
                className={`flex items-center w-full p-3 text-left rounded-lg transition-colors duration-150
                  ${isOpen ? "justify-between px-4" : "justify-center px-2"}
                  hover:bg-slate-100 dark:hover:bg-slate-800
                `}
              >
                <div className="flex items-center">
                  <Settings className="h-5 w-5 shrink-0 text-slate-500 dark:text-slate-400" />
                  {isOpen && <span className="ml-3 text-sm font-normal text-slate-700 dark:text-slate-200">Settings</span>}
                </div>
                {isOpen && (
                  <ChevronDown
                    className={`h-4 w-4 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${expandedSections.settings ? "rotate-180" : ""}`}
                  />
                )}
              </button>
              {isOpen && expandedSections.settings && (
                <div className="mt-1 pl-7 space-y-1"> {/* Indent further than icon + margin */}
                  <Link
                    href={route('profile.edit')} // Replace with actual route e.g. route('user.settings.profile')
                    className={`flex gap-2 px-3 py-2 rounded-md text-sm
                    ${isActive('/user//profile') // Adjust if path is different
                        ? 'text-sky-600 dark:text-sky-400 font-medium bg-sky-50 dark:bg-sky-900/30'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                      }`}
                  >
                    <User size={20} /> Profile
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* UserSidebar Footer */}
        <div className={`absolute bottom-0 left-0 right-0 p-3 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-black transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 sr-only"}`}>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {/* Replace with actual user image if available */}
              {user.avatar_url ? (
                <img className="w-9 h-9 rounded-full object-cover" src={user.avatar_url} alt="User avatar" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 font-semibold">
                  {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                </div>
              )}
            </div>
            {isOpen && (
              <div className="ml-3 min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{user.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
              </div>
            )}
          </div>
          <form onSubmit={submitLogout} className="mt-2">
            <button
              type="submit"
              className={`w-full flex items-center p-2.5 rounded-md text-sm font-medium transition-colors duration-150
                    ${isOpen ? "px-3" : "justify-center"}
                    text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 dark:hover:text-red-300
                  `}
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

export default UserSidebar