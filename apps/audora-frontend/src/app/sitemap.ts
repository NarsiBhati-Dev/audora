import { MetadataRoute } from 'next';
import siteMetadata from '@/lib/seo/siteMetadata';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl;

  const staticRoutes = [
    '',
    'about',
    'contact',
    'pricing',
    'privacy-policy',
    'terms-conditions',
    'cookies',
    'register',
    'login',
    'start',
    'password-recovery',
    'blogs',

    // Studio
    'video-editor',
    'recording',
    'live-streaming',

    // Use Cases
    'use-cases/webinars',

    // Dashboard
    'dashboard',
    'dashboard/home',

    // Optional extras
    'sitemap.xml',
    'robots.txt',
  ];

  const routes = staticRoutes.map(route => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes];
}
