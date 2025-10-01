import WorkInProgress from '@/components/work-in progress';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Link
                href="/"
                className="fixed top-2 left-4 text-sm text-zinc-200 hover:text-white flex items-center gap-2 z-70 transition-all duration-200"
                aria-label="Back to home"
            >
                <FaArrowLeft className="text-sm" /> Home
            </Link>

            <WorkInProgress title="The backend is in development mode right now as we’re adding new features. The production-ready backend will go live soon." />
            {children}
        </>
    );
};

export default AuthLayout;