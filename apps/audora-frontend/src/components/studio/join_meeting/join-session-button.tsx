'use client';

import { useSearchParams } from 'next/navigation';

export function JoinSessionButton({ studioSlug }: { studioSlug: string }) {
  const searchParams = useSearchParams();
  const t = searchParams.get('t');
  const query = new URLSearchParams();

  if (t) query.set('t', t);
  query.set('gw', 'on');

  const url = `/studio/${studioSlug}?${query.toString()}`;

  return (
    <a
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      className='bg-primary-500 hover:bg-primary-600 mt-8 rounded-lg px-4 py-3 text-white'
    >
      Join Session
    </a>
  );
}
