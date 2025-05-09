import { MetadataRoute } from 'next';
import siteMetadata from '@/lib/siteMetadata';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl;

  const routes = [
    '',

    // Studio
    'video-editor',
    'recording-studio',
    'live-streaming',

    // Use Cases
    'use-cases/webinars',

    'pricing',

    // About
    'about',
    'contact',

    // Legal
    'privacy-policy',
    'terms-conditions',
    'cookies',

    // Auth
    'register',
    'login',
    'start',

    // Blogs
    'blogs',
  ].map(route => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes];
}
