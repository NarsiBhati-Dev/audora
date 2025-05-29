import React from 'react';

interface PopupCardProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  triggerClassName?: string;
  cardClassName?: string;
  title?: string | React.ReactNode;
  children?: React.ReactNode;
  closeButtonClassName?: string;
  onConfirm?: () => void;
}

const PopupCard: React.FC<PopupCardProps> = ({
  triggerClassName = 'rounded-lg bg-red-400 px-3 w-full py-2 text-sm font-semibold text-white transition hover:bg-red-500 focus:outline-none',
  cardClassName = 'w-full max-w-md rounded-2xl bg-zinc-900 p-5 shadow-xl',
  title = 'Studio Info',
  children,
  isOpen,
  setIsOpen,
  // onConfirm,
}) => {
  const togglePopup = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Trigger Button */}
      <button onClick={togglePopup} className={triggerClassName}>
        {title}
      </button>

      {/* Popup Overlay */}
      {isOpen && (
        <div
          className='fixed inset-0 z-[99] flex items-center justify-center bg-black/50'
          onClick={togglePopup}
        >
          {/* Prevent closing when clicking inside the card */}
          <div
            className={`${cardClassName} rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-xl`}
            onClick={e => e.stopPropagation()}
          >
            {children}
            <div className='flex items-center justify-end gap-2'>
              <button className='mt-4 rounded-2xl border border-zinc-800 bg-zinc-800 px-3 py-1 text-sm text-white hover:bg-zinc-700'>
                Confirm
              </button>
              <button
                onClick={togglePopup}
                className={`mt-4 rounded-2xl border border-zinc-800 bg-red-400 px-3 py-1 text-sm text-white hover:bg-red-500`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupCard;
