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
        <footer className="tracking-wide bg-gray-50 px-10 pt-12 pb-6">
            <div className="flex flex-wrap justify-between gap-10">
                <div className="max-w-md">
                    <Link href="/">
                        <img src="/LOGOGROWINS.png" alt="Growins Logo" className="w-36" />
                    </Link>
                    <ul className="mt-10 flex space-x-5">
                        <li>
                            <Link href="https://www.instagram.com/growins.id/" target="_blank" className="hover:opacity-80">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 152 152">
                                    <linearGradient id="a" x1="22.26" x2="129.74" y1="22.26" y2="129.74" gradientUnits="userSpaceOnUse">
                                        <stop offset={0} stopColor="#fae100" />
                                        <stop offset=".15" stopColor="#fcb720" />
                                        <stop offset=".3" stopColor="#ff7950" />
                                        <stop offset=".5" stopColor="#ff1c74" />
                                        <stop offset={1} stopColor="#6c1cd1" />
                                    </linearGradient>
                                    <g data-name="Layer 2">
                                        <g data-name="03.Instagram">
                                            <rect width={152} height={152} fill="url(#a)" rx={76} />
                                            <g fill="#fff">
                                                <path d="M94 36H58a22 22 0 0 0-22 22v36a22 22 0 0 0 22 22h36a22 22 0 0 0 22-22V58a22 22 0 0 0-22-22zm15 54.84A18.16 18.16 0 0 1 90.84 109H61.16A18.16 18.16 0 0 1 43 90.84V61.16A18.16 18.16 0 0 1 61.16 43h29.68A18.16 18.16 0 0 1 109 61.16z" />
                                                <path d="m90.59 61.56-.19-.19-.16-.16A20.16 20.16 0 0 0 76 55.33 20.52 20.52 0 0 0 55.62 76a20.75 20.75 0 0 0 6 14.61 20.19 20.19 0 0 0 14.42 6 20.73 20.73 0 0 0 14.55-35.05zM76 89.56A13.56 13.56 0 1 1 89.37 76 13.46 13.46 0 0 1 76 89.56zm26.43-35.18a4.88 4.88 0 0 1-4.85 4.92 4.81 4.81 0 0 1-3.42-1.43 4.93 4.93 0 0 1 3.43-8.39 4.82 4.82 0 0 1 3.09 1.12l.1.1a3.05 3.05 0 0 1 .44.44l.11.12a4.92 4.92 0 0 1 1.1 3.12z" />
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="max-lg:min-w-[140px]">
                    <h4 className="text-slate-900 font-semibold text-sm">Quick Links</h4>
                    <ul className="mt-6 space-y-4">
                        {quickLinks.map((link) => {
                            const isActive = url === link.href
                            return (
                                <li key={link.href}>
                                    <Link 
                                        href={link.href}
                                        className={`transition-colors ${
                                            isActive ? 'text-slate-900 font-medium' : 'text-slate-600 hover:text-slate-900'
                                        } text-sm`}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <hr className="mt-10 mb-6 border-gray-300" />
            <div className="flex flex-wrap justify-between gap-4">
                <ul className="flex space-x-6 max-md:space-y-2 max-md:flex-col max-md:space-x-0">
                    <li>
                        <Link href="/terms" className="hover:text-slate-900 text-slate-600 text-sm">Terms of Service</Link>
                    </li>
                    <li>
                        <Link href="/privacy" className="hover:text-slate-900 text-slate-600 text-sm">Privacy Policy</Link>
                    </li>
                </ul>
                <p className="text-slate-600 text-sm">© {new Date().getFullYear()} Growins. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer