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
    'blogs',
    'video-editor',
    'recording',
    'live-streaming',
    'use-cases/webinars',

    // Auth
    'login',
    'register',
    'password-recovery',
    'verify-email',

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
