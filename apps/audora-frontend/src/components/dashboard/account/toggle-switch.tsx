import React from 'react';

type ToggleSwitchProps = {
  checked: boolean;
  onChange: () => void;
  id: string;
  className?: string;
  label?: string;
};

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  id,
  className = '',
  label,
}) => (
  <label
    htmlFor={id}
    className={`relative inline-flex cursor-pointer items-center ${className}`}
  >
    {label && <span className='mr-2 text-xs'>{label}</span>}
    <input
      id={id}
      type='checkbox'
      checked={checked}
      onChange={onChange}
      className='peer sr-only'
    />
    <div className="peer peer-checked:bg-primary-300 h-4 w-8 rounded-full bg-zinc-800 after:absolute after:top-[2px] after:left-[2px] after:h-3 after:w-3 after:rounded-full after:bg-white after:transition-all after:duration-200 after:content-[''] peer-checked:after:translate-x-4 peer-checked:after:bg-white peer-checked:after:shadow-md"></div>
  </label>
);
