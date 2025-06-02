import PageNotFound from '@/components/page-not-found';
import getPageMetadata from '@/lib/seo/getPageMetadata';

export const metadata = getPageMetadata({
  title: 'Page Not Found',
});

const NotFoundPage = () => {
  return <PageNotFound />;
};

export default NotFoundPage;
