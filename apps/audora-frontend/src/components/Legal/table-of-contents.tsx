import Link from 'next/link';

interface TableOfContentsProps {
  sections: { id: string; title: string }[];
}

const TableOfContents = ({ sections }: TableOfContentsProps) => {
  return (
    <section className='rounded-2xl border border-gray-100 p-8 shadow-sm'>
      <h2 className='mb-8 text-2xl font-bold text-gray-900'>
        Table of Contents
      </h2>
      <nav>
        <ul className='space-y-2'>
          {sections.map((section, index) => (
            <li key={section.id}>
              <Link
                href={`#${section.id}`}
                className='group hover:text-primary flex items-center rounded-md px-3 py-2 text-gray-600 transition-all'
              >
                <span className='group-hover:text-primary mr-3 text-sm font-medium text-gray-400'>
                  {index + 1}
                </span>
                <span className='font-medium'>{section.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
};

export default TableOfContents;
