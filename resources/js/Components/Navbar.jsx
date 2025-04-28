import { Link, usePage } from "@inertiajs/react"
import { User } from "lucide-react"
import React, { useEffect, useState } from "react"

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/courses/all", label: "Courses" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
]

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    const user = usePage().props.auth;
    const { url } = usePage()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY
            if (offset > 50) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        // Add scroll event listener
        window.addEventListener("scroll", handleScroll)

        // Clean up event listener
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <header
            className={`fixed top-0 z-50 w-full py-2 transition-all duration-300 ease-in-out ${scrolled ? "bg-[#128884]/80 backdrop-blur-md shadow-lg" : "bg-gradient-to-r from-teal-900 to-teal-600"
                }`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
                            <img
                                src="/LOGOGROWINS.png"
                                alt="Logo Growins"
                                width={140}
                                height={40}
                                className="transition-opacity hover:opacity-90"
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex md:items-center md:gap-8">
                        {navLinks.map((link) => {
                            const isActive = url === link.href

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative text-md font-medium transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full ${isActive
                                            ? 'text-yellow-400 after:w-full'
                                            : 'text-white hover:text-white/80'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Register Button */}
                    {user.user ? (
                        user.user.role == 'student' ? (
                            <Link
                                href={route('user.dashboard', user.user.id)}
                                className="flex flex-row items-center gap-2 rounded-md px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-yellow-500 hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0"
                            >
                                <User /> {user.user.name}
                            </Link>
                        ) : (
                            <Link
                                href={route('admin.dashboard')}
                                className="flex flex-row items-center gap-2 rounded-md px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-yellow-500 hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0"
                            >
                                <User /> {user.user.name}
                            </Link>
                        )
                    ) : (
                        <Link
                            href="/login"
                            className="hidden md:block rounded-md bg-yellow-400 px-5 py-2 text-sm font-medium text-black transition-all duration-300 hover:bg-yellow-500 hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0"
                        >
                            Daftar Sekarang
                        </Link>
                    )}

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md p-2 text-white transition-colors duration-200 hover:bg-[#029b91] focus:outline-none"
                            onClick={toggleMenu}
                            aria-expanded={isMenuOpen}
                        >
                            <span className="sr-only">Toggle menu</span>
                            {isMenuOpen ? (
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu with animation */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="space-y-1 px-4 pb-4 pt-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="block py-2.5 text-base font-medium text-white transition-colors hover:text-white/80 border-b border-white/10"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="pt-2">
                        <button className="w-full rounded-md bg-yellow-400 px-4 py-2.5 text-sm font-medium text-black transition-all duration-300 hover:bg-yellow-500">
                            Daftar Sekarang
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

