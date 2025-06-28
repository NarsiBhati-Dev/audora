import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import React from 'react';
import getPageMetadata from '@/lib/seo/getPageMetadata';

export const metadata = getPageMetadata({
  title: 'Audora Blog',
  description:
    'Discover insights, tutorials, and the latest trends in podcasting and content creation.',
  imageUrl: '/images/blog/audio-encoding.png',
});

const blogPosts = [
  {
    id: 1,
    title: "Understanding Audora's Audio Encoding Process",
    excerpt:
      'Dive deep into how Audora processes and encodes your audio files, ensuring optimal quality while maintaining efficient file sizes.',
    category: 'Technical',
    image: '/images/blog/audio-encoding.png',
    date: 'May 15, 2024',
    readTime: '8 min read',
  },
  {
    id: 2,
    title: 'How Audora Handles Multi-Track Recording',
    excerpt:
      "Learn about Audora's advanced multi-track recording system that allows you to record multiple audio sources simultaneously with perfect synchronization.",
    category: 'Features',
    image: '/images/blog/multi-track.png',
    date: 'May 12, 2024',
    readTime: '6 min read',
  },
  {
    id: 3,
    title: "Behind the Scenes: Audora's Cloud Storage Architecture",
    excerpt:
      'Explore how Audora securely stores and manages your audio files in the cloud, ensuring fast access and reliable backup.',
    category: 'Technical',
    image: '/images/blog/cloud-storage.png',
    date: 'May 10, 2024',
    readTime: '7 min read',
  },
  {
    id: 4,
    title: 'Real-time Audio Processing in Audora',
    excerpt:
      'Discover how Audora processes audio in real-time, from noise reduction to automatic gain control, ensuring professional-quality output.',
    category: 'Technical',
    image: '/images/blog/audio-processing.png',
    date: 'May 8, 2024',
    readTime: '9 min read',
  },
  {
    id: 5,
    title: "Audora's AI-Powered Audio Enhancement",
    excerpt:
      "Learn about the AI algorithms that power Audora's automatic audio enhancement features, from voice isolation to background noise removal.",
    category: 'AI Features',
    image: '/images/blog/ai-audio.png',
    date: 'May 6, 2024',
    readTime: '7 min read',
  },
  {
    id: 6,
    title: "Optimizing Your Workflow with Audora's API",
    excerpt:
      "A comprehensive guide to using Audora's API for automating your audio production workflow and integrating with other tools.",
    category: 'Development',
    image: '/images/blog/api-integration.png',
    date: 'May 4, 2024',
    readTime: '10 min read',
  },
];

const categories = [
  'All',
  'Technical',
  'Features',
  'AI Features',
  'Development',
];

interface SearchParams {
  category?: string;
}

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const selectedCategory = params.category || 'All';

  const filteredPosts =
    selectedCategory === 'All'
      ? blogPosts
      : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className='min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#121212] to-[#1f1f1f]'>
      {/* Hero Section */}
      <section className='relative py-24'>
        <div className='absolute inset-0 bg-gradient-to-b from-black/60 to-transparent' />
        <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='bg-gradient-to-r from-white to-gray-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl md:text-7xl'>
              Audora Blog
            </h1>
            <p className='mx-auto mt-6 max-w-2xl text-xl text-gray-300'>
              Discover insights, tutorials, and the latest trends in podcasting
              and content creation
            </p>

            {/* Search Bar */}
            <div className='mx-auto mt-10 max-w-xl'>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Search articles...'
                  className='focus:border-primary focus:ring-primary/20 w-full rounded-full border border-gray-700 bg-black/30 px-6 py-4 pl-12 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-200 focus:ring-2 focus:outline-none'
                />
                <Search className='absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400' />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-wrap justify-center gap-3'>
          {categories.map(category => (
            <Link
              key={category}
              href={
                category === 'All' ? '/blogs' : `/blogs?category=${category}`
              }
              className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'border-primary-500 bg-primary-500/10 shadow-primary-500/20 text-white shadow-lg'
                  : 'hover:border-primary-500 hover:bg-primary-500/5 border-gray-700 bg-black/30 text-gray-300 hover:text-white'
              }`}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      <section className='mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8'>
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {filteredPosts.map(post => (
            <article
              key={post.id}
              className='group hover:border-primary-500/50 relative overflow-hidden rounded-2xl border border-gray-800 bg-black/30 backdrop-blur-sm transition-all duration-300 hover:shadow-xl'
            >
              <div className='relative aspect-[16/9] overflow-hidden'>
                <Image
                  src={post.image}
                  alt={post.title}
                  loading='lazy'
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  quality={100}
                  className='object-cover transition-transform duration-500 group-hover:scale-105'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent' />
                <span className='bg-primary-500/90 absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-medium text-white shadow-lg'>
                  {post.category}
                </span>
              </div>
              <div className='p-6'>
                <div className='mb-3 flex items-center gap-4 text-sm text-gray-400'>
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className='group-hover:text-primary-500 mb-3 cursor-pointer text-xl font-semibold text-white transition-colors duration-200'>
                  {post.title}
                </h2>
                <p className='line-clamp-3 text-gray-400'>{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
