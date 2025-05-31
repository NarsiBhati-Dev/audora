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
  triggerClassName = 'rounded-lg bg-red-500 px-3 w-full py-2 text-sm font-semibold text-white transition hover:bg-red-400 focus:outline-none',
  cardClassName = 'w-full max-w-md rounded-2xl bg-zinc-900 p-5 shadow-xl',
  title = 'Studio Info',
  children,
  isOpen,
  setIsOpen,
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
          className='fixed inset-0 z-[99] flex items-center justify-center bg-black/50 px-4'
          onClick={togglePopup}
        >
          {/* Card Container */}
          <div
            className={`${cardClassName} w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-xl sm:max-w-lg`}
            onClick={e => e.stopPropagation()}
          >
            <div className='max-h-[80vh] overflow-y-auto'>
              {children}
              <div className='mt-4 flex flex-wrap items-center justify-end gap-2'>
                <button className='rounded-2xl border border-zinc-800 bg-zinc-800 px-3 py-1 text-sm text-white hover:bg-zinc-700'>
                  Confirm
                </button>
                <button
                  onClick={togglePopup}
                  className={`rounded-2xl border border-zinc-800 bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupCard;
