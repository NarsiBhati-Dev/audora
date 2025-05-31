import { ZapIcon } from '@/data/icons';

type QualityOption = {
  label: string;
  value: string;
  isBoosted?: boolean;
};

type QualitySelectorProps = {
  options: QualityOption[];
  selected: string;
  onSelect: (value: string) => void;
};

const QualitySelector = ({
  options,
  selected,
  onSelect,
}: QualitySelectorProps) => (
  <div
    className='flex w-44 flex-row justify-center gap-1 rounded-lg bg-zinc-800 p-1.5'
    role='radiogroup'
    aria-label='Select quality level'
  >
    {options.map(({ label, value, isBoosted }) => (
      <button
        key={value}
        role='radio'
        aria-checked={selected === value}
        onClick={() => onSelect(value)}
        className={`flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-white transition ${
          selected === value
            ? 'scale-[1.03] bg-zinc-700 font-semibold shadow-inner hover:bg-zinc-600'
            : 'hover:bg-zinc-600'
        }`}
      >
        {label}
        {isBoosted && (
          <span
            className={`rounded-md p-0.5 text-xs transition ${
              selected === value ? 'bg-zinc-800' : 'bg-zinc-700'
            }`}
          >
            <ZapIcon className='h-4 w-4 text-yellow-500' />
          </span>
        )}
      </button>
    ))}
  </div>
);

export default QualitySelector;
