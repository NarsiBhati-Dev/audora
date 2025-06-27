'use client';

import { useEffect, useState } from 'react';

interface HeaderLoaderProps {
    isLoading?: boolean;
}

const HeaderLoader = ({ isLoading = false }: HeaderLoaderProps) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (isLoading) {
            setProgress(0);
            const timer = setTimeout(() => setProgress(100), 100);

            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 90) return prev;
                    return prev + Math.random() * 15;
                });
            }, 200);

            return () => {
                clearTimeout(timer);
                clearInterval(interval);
            };
        } else {
            setProgress(100);
            const timer = setTimeout(() => setProgress(0), 300);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    if (!isLoading && progress === 0) return null;

    return (
        <div className='fixed top-0 left-0 z-50 w-full'>
            <div
                className='h-1 bg-gradient-to-r from-primary-500 to-purple-500 transition-all duration-300 ease-out'
                style={{
                    width: `${progress}%`,
                    opacity: progress > 0 ? 1 : 0
                }}
            />
        </div>
    );
};

export default HeaderLoader; 