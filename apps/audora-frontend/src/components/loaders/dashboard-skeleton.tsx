import React from 'react';

const DashboardSkeleton = () => {
    return (
        <div className='space-y-8 p-6 sm:p-8'>
            {/* Welcome Section Skeleton */}
            <div className='flex flex-col items-center space-y-6 text-center lg:flex-row lg:items-start lg:space-y-0 lg:space-x-8 lg:text-left'>
                {/* Studio Image Skeleton */}
                <div className='relative h-48 w-48 flex-shrink-0 animate-pulse rounded-2xl bg-zinc-700 lg:h-64 lg:w-64' />

                {/* Welcome Content Skeleton */}
                <div className='flex flex-1 flex-col space-y-4'>
                    <div className='space-y-2'>
                        <div className='h-8 w-64 animate-pulse rounded bg-zinc-700 lg:h-10' />
                        <div className='h-4 w-80 animate-pulse rounded bg-zinc-700' />
                    </div>

                    {/* Quick Actions Skeleton */}
                    <div className='flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4'>
                        <div className='h-12 w-32 animate-pulse rounded-xl bg-zinc-700' />
                        <div className='h-12 w-32 animate-pulse rounded-xl bg-zinc-700' />
                    </div>
                </div>
            </div>

            {/* Quick Access Cards Skeleton */}
            <div className='space-y-6'>
                <div className='h-6 w-32 animate-pulse rounded bg-zinc-700' />
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                    {/* Card 1 */}
                    <div className='bg-dashboard-bg-light rounded-2xl p-6 shadow-md'>
                        <div className='flex items-center gap-4'>
                            <div className='h-16 w-16 animate-pulse rounded-xl bg-zinc-600' />
                            <div className='flex-1 space-y-2'>
                                <div className='h-6 w-32 animate-pulse rounded bg-zinc-600' />
                                <div className='h-4 w-48 animate-pulse rounded bg-zinc-600' />
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className='bg-dashboard-bg-light rounded-2xl p-6 shadow-md'>
                        <div className='flex items-center gap-4'>
                            <div className='h-16 w-16 animate-pulse rounded-xl bg-zinc-600' />
                            <div className='flex-1 space-y-2'>
                                <div className='h-6 w-32 animate-pulse rounded bg-zinc-600' />
                                <div className='h-4 w-48 animate-pulse rounded bg-zinc-600' />
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className='bg-dashboard-bg-light rounded-2xl p-6 shadow-md'>
                        <div className='flex items-center gap-4'>
                            <div className='h-16 w-16 animate-pulse rounded-xl bg-zinc-600' />
                            <div className='flex-1 space-y-2'>
                                <div className='h-6 w-32 animate-pulse rounded bg-zinc-600' />
                                <div className='h-4 w-48 animate-pulse rounded bg-zinc-600' />
                            </div>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className='bg-gradient-to-br from-primary-500/10 to-purple-500/10 rounded-2xl p-6 shadow-md border border-primary-500/20'>
                        <div className='flex items-center gap-4'>
                            <div className='h-16 w-16 animate-pulse rounded-xl bg-zinc-600' />
                            <div className='flex-1 space-y-2'>
                                <div className='h-6 w-32 animate-pulse rounded bg-zinc-600' />
                                <div className='h-4 w-48 animate-pulse rounded bg-zinc-600' />
                                <div className='flex gap-2'>
                                    <div className='h-6 w-20 animate-pulse rounded-full bg-zinc-600' />
                                    <div className='h-6 w-16 animate-pulse rounded-full bg-zinc-600' />
                                    <div className='h-6 w-24 animate-pulse rounded-full bg-zinc-600' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardSkeleton; 