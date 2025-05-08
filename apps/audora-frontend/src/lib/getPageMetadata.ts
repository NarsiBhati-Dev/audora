import { Metadata } from 'next';
import siteMetadata from '@/lib/siteMetadata';

interface GetPageMetadataProps {
  title: string;
  description?: string;
  image?: string;
  path?: string;
}

const getPageMetadata = ({
  title,
  description,
  image,
  path = '',
}: GetPageMetadataProps): Metadata => {
  const metaTitle = `${title} | ${siteMetadata.title}`;
  const metaDescription = description ?? siteMetadata.description;
  const metaImage = image ? image : siteMetadata.socialBanner;
  const sitePath = path
    ? `${siteMetadata.siteUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
    : siteMetadata.siteUrl;

  return {
    metadataBase: new URL(siteMetadata.siteUrl),
    title,
    description: metaDescription,
    alternates: {
      canonical: sitePath,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: './',
      siteName: siteMetadata.title,
      images: [metaImage],
      locale: 'en_US',
      type: 'website',
    },

    twitter: {
      title: metaTitle,
      card: 'summary_large_image',
      images: [metaImage],
    },
  };
};

export default getPageMetadata;
