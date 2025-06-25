import { FiEdit, FiWifi, FiCalendar, FiUpload } from 'react-icons/fi';

const actions = [
  {
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 18 18'
        fill='none'
        className='text-red-500 transition-colors duration-300 group-hover:text-white'
      >
        <path
          d='M9 16.9999C13.4183 16.9999 17 13.4182 17 8.99994C17 4.58166 13.4183 0.999939 9 0.999939C4.58173 0.999939 1 4.58166 1 8.99994C1 13.4182 4.58173 16.9999 9 16.9999Z'
          stroke='currentColor'
          strokeWidth='1.35'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M9 13C11.2091 13 13 11.2091 13 9C13 6.79086 11.2091 5 9 5C6.79086 5 5 6.79086 5 9C5 11.2091 6.79086 13 9 13Z'
          fill='currentColor'
        />
      </svg>
    ),
    label: 'Record',
  },
  { icon: <FiEdit size={24} />, label: 'Edit' },
  { icon: <FiWifi size={24} />, label: 'Go live' },
  { icon: <FiCalendar size={24} />, label: 'Plan' },
  { icon: <FiUpload size={24} />, label: 'Import' },
];

// Utility function to render action buttons
const ActionButton = ({
  icon,
  label,
  isPrimary,
}: {
  icon: React.ReactNode;
  label: string;
  isPrimary?: boolean;
}) => (
  <div className='flex flex-col items-center'>
    <button
      className={`group flex h-14 w-14 items-center justify-center rounded-full text-white shadow transition focus:outline-none sm:h-18 sm:w-18 ${
        isPrimary
          ? 'bg-[#e74d3cb4]/10 hover:bg-[#e74c3c]'
          : 'bg-[#18181b] hover:bg-[#232323]'
      } duration-300 ease-in-out hover:scale-105`}
      aria-label={label}
    >
      {icon}
    </button>
    <span className='mt-2 text-xs text-white sm:text-sm'>{label}</span>
  </div>
);

export default function DashboardActions() {
  return (
    <>
      {/* Desktop: show all */}
      <div className='hidden flex-wrap items-center justify-center gap-6 py-6 sm:flex sm:gap-8 sm:py-8'>
        {actions.map((action, idx) => (
          <ActionButton
            key={action.label}
            icon={action.icon}
            label={action.label}
            isPrimary={idx === 0}
          />
        ))}
      </div>

      {/* Mobile: show only Record and Plan */}
      <div className='flex items-center justify-center gap-6 py-6 sm:hidden'>
        {actions
          .filter(a => a.label === 'Record' || a.label === 'Plan')
          .map(action => (
            <button
              key={action.label}
              className='flex w-1/2 flex-row items-center justify-center gap-4 rounded-xl bg-[#18181b] px-4 py-3 hover:bg-[#232323]'
            >
              {action.icon} {action.label}{' '}
            </button>
          ))}
      </div>
    </>
  );
}
