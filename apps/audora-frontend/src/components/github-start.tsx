'use client';

import { useState, useEffect } from 'react';
import { fetchGitHubStars } from '../lib/github';
import { Star, Github } from 'lucide-react';
import siteMetadata from '@/lib/seo/siteMetadata';

interface GithubStarProps {
    owner?: string;
    repo?: string;
    className?: string;
}

export default function GithubStar({
    owner = 'NarsiBhati-Dev',
    repo = 'audora',
    className = '',
}: GithubStarProps) {
    const [stars, setStars] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const repoUrl = siteMetadata.github;

    useEffect(() => {
        const loadStars = async () => {
            try {
                setLoading(true);
                setError(null);
                const starCount = await fetchGitHubStars(owner, repo);
                setStars(starCount);
            } catch (err) {
                console.error('Failed to fetch GitHub stars:', err);
                setError('Failed to load stars');
            } finally {
                setLoading(false);
            }
        };

        loadStars();
    }, [owner, repo]);

    return (
        <a
            href={repoUrl}
            target='_blank'
            rel='noopener noreferrer'
            className={`group inline-flex items-center gap-2 rounded-lg border border-gray-600/50 bg-gray-800/90 px-3 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-200 ease-out hover:border-gray-500/70 hover:bg-gray-700/90 hover:shadow-md hover:shadow-gray-900/20 ${className} `}
        >
            <Github className='h-4 w-4 transition-transform duration-200 group-hover:scale-110' />
            <span>Star</span>

            {loading ? (
                <div className='h-3 w-3 animate-spin rounded-full border border-gray-400 border-t-white' />
            ) : error ? (
                <span className='text-xs font-medium text-red-400'>Error</span>
            ) : stars !== null ? (
                <div className='flex items-center gap-1 rounded-md bg-yellow-500/20 px-1.5 py-0.5'>
                    <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
                    <span className='text-xs font-semibold text-yellow-100'>
                        {stars.toLocaleString()}
                    </span>
                </div>
            ) : null}
        </a>
    );
}
