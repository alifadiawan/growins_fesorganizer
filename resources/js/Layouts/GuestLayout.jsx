import ApplicationLogo from '@/Components/ApplicationLogo';
import Footer from '@/Components/Footer';
import { Navbar } from '@/Components/Navbar';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <>
            <Navbar />
            <div className="content mt-20">
                {children}
            </div>
            <Footer />
        </>
    );
}
