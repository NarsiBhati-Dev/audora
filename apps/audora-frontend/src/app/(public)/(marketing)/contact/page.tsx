import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import Image from 'next/image';
import getPageMetadata from '@/lib/seo/getPageMetadata';

export const metadata = getPageMetadata({
  title: 'Audora Contact',
  description: 'Contact Audora',
});

const ContactPage = () => {
  const contactMethods = [
    {
      icon: <FaEnvelope className='text-xl' />,
      title: 'Email',
      value: 'support@audora.xyz',
      link: 'mailto:support@audora.xyz',
      description: 'Get in touch with our support team',
    },
    {
      icon: <FaPhone className='text-xl' />,
      title: 'Phone',
      value: '+1 (234) 567-890',
      link: 'tel:+1234567890',
      description: 'Call us during business hours',
    },
    {
      icon: <FaMapMarkerAlt className='text-xl' />,
      title: 'Location',
      value: 'San Francisco, CA',
      description: 'Visit our office',
    },
    {
      icon: <FaClock className='text-xl' />,
      title: 'Hours',
      value: 'Mon - Fri, 9AM - 6PM PST',
      description: "We're here to help",
    },
  ];

  return (
    <main className='relative flex w-screen items-center justify-center overflow-hidden bg-[#18181b] md:min-h-screen'>
      {/* Map image background */}
      <div className='pointer-events-none absolute inset-0 z-0 h-full w-full'>
        <Image
          src='/map-2.png'
          width={1440}
          height={900}
          alt='San Francisco Map'
          className='h-full w-full object-cover'
          aria-hidden='true'
        />
      </div>
      {/* Centered overlay card */}
      <div className='relative z-10 flex min-h-[80vh] w-full items-center justify-center md:min-h-screen'>
        <div className='mx-2 w-full max-w-full rounded-2xl bg-white/90 p-4 shadow-2xl backdrop-blur sm:mx-0 sm:max-w-md sm:rounded-xl sm:p-8 md:p-10'>
          <h1 className='mb-6 text-center text-2xl font-bold text-gray-900 sm:text-3xl'>
            Contact Us
          </h1>
          <div className='space-y-6'>
            {contactMethods.map(method => (
              <div key={method.title} className='flex items-start gap-4'>
                <div className='bg-primary-500/10 text-primary-500 mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full'>
                  {method.icon}
                </div>
                <div>
                  <h3 className='font-semibold text-gray-900'>
                    {method.title}
                  </h3>
                  {method.link ? (
                    <a
                      href={method.link}
                      className='text-primary-500 hover:text-primary-600 block font-medium break-all'
                    >
                      {method.value}
                    </a>
                  ) : (
                    <p className='font-medium break-all text-gray-900'>
                      {method.value}
                    </p>
                  )}
                  <p className='text-sm text-gray-500'>{method.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className='mt-8 rounded-lg bg-gray-50/80 p-4 text-center text-sm text-gray-600'>
            Need immediate assistance? Our support team is available 24/7 to
            help you with any questions or concerns.
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
