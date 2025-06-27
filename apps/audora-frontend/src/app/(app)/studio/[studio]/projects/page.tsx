import getPageMetadata from '@/lib/seo/getPageMetadata';
import React from 'react';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ studio: string }>;
}) => {
  const { studio } = await params;
  return getPageMetadata({
    title: `Projects - ${studio}`,
    description: `Projects for the ${studio} studio`,
  });
};

const ProjectsPage = async ({
  params,
}: {
  params: Promise<{ studio: string }>;
}) => {
  const { studio } = await params;

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl font-bold'>Projects</h1>
      <p className='text-sm text-gray-500'>Projects for the {studio} studio</p>
    </div>
  );
};

export default ProjectsPage;
