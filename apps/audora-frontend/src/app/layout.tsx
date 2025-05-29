import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import '@audora/tailwind-css';
import siteMetadata from '@/lib/seo/siteMetadata';
import BackToTopButton from '@/components/back-to-top-button';
import { Toaster } from 'react-hot-toast';
import ReactQueryProvider from '@/lib/react-query';

const open_sans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: siteMetadata.title,
    template: 'Audora.xyz | %s',
  },
  description: siteMetadata.description,

  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  twitter: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      {/* favicons */}
      <link
        rel='icon'
        type='image/png'
        href='/favicons/favicon-96x96.png'
        sizes='96x96'
      />
      <link rel='icon' type='image/svg+xml' href='/favicons/favicon.svg' />
      <link rel='shortcut icon' href='/favicons/favicon.ico' />
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/favicons/apple-touch-icon.png'
      />
      <meta name='apple-mobile-web-app-title' content='Audora' />
      <link rel='manifest' href='/favicons/site.webmanifest' />
      <body
        className={`${open_sans.className} scroll-pt-17 scroll-smooth bg-black antialiased`}
      >
        <ReactQueryProvider>
          {children}
          <BackToTopButton />
          <Toaster
            position='top-right'
            reverseOrder={false}
            toastOptions={{
              style: {
                background: '#1a1a1a',
                color: '#fff',
                border: '1px solid #222',
                borderRadius: '10px',
                padding: '10px',
                fontSize: '14px',
                fontWeight: 'bold',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                zIndex: 1000,
              },
            }}
          />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
