import { FiEdit, FiWifi, FiCalendar, FiUpload } from 'react-icons/fi';

const actions = [
  {
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='20'
        height='20'
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
        ></path>
        <path
          d='M9 13C11.2091 13 13 11.2091 13 9C13 6.79086 11.2091 5 9 5C6.79086 5 5 6.79086 5 9C5 11.2091 6.79086 13 9 13Z'
          fill='currentColor'
        ></path>
      </svg>
    ),
    label: 'Record',
  },
  { icon: <FiEdit size={28} />, label: 'Edit' },
  { icon: <FiWifi size={28} />, label: 'Go live' },
  { icon: <FiCalendar size={28} />, label: 'Plan' },
  { icon: <FiUpload size={28} />, label: 'Import' },
];

export default function DashboardActions() {
  return (
    <div className='flex items-center justify-center gap-8 py-8'>
      {actions.map((action, idx) => (
        <div key={action.label} className='flex flex-col items-center'>
          <button
            className={`group flex h-18 w-18 items-center justify-center rounded-full text-white shadow transition focus:outline-none ${
              idx === 0
                ? 'bg-[#e74d3cb4]/10 transition-all duration-300 ease-in-out hover:scale-110 hover:bg-[#e74c3c]'
                : 'bg-[#18181b] transition-all duration-300 ease-in-out hover:scale-110 hover:bg-[#232323]'
            }`}
            aria-label={action.label}
          >
            {action.icon}
          </button>
          <span className='mt-2 text-sm text-white'>{action.label}</span>
        </div>
      ))}
    </div>
  );
}
