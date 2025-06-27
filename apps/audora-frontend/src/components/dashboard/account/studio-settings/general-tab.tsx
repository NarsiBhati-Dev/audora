import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import {
  PiPaintBrushDuotone,
  PiTrashDuotone,
  PiChatsCircleDuotone,
} from 'react-icons/pi';
// import { useUserProfileStore } from '@/store/user-profile';
import { useStudioSettingsStore } from '@/modules/studio/store/studio-settings-store';
import RemoveStudio from './remove-studio';
import { ToggleSwitch } from '../toggle-switch';
import { HiOutlineChevronDown } from 'react-icons/hi';

const GeneralTab = () => {
  // const { userProfile, setUserProfile } = useUserProfileStore();
  const { studioSetting, setStudioSetting } = useStudioSettingsStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { value: 'English', label: 'English' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'French', label: 'French' },
    { value: 'German', label: 'German' },
    { value: 'Italian', label: 'Italian' },
    { value: 'Portuguese', label: 'Portuguese' },
    { value: 'Russian', label: 'Russian' },
    { value: 'Turkish', label: 'Turkish' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Japanese', label: 'Japanese' },
    { value: 'Korean', label: 'Korean' },
    { value: 'Arabic', label: 'Arabic' },
    { value: 'Dutch', label: 'Dutch' },
    { value: 'Polish', label: 'Polish' },
    { value: 'Romanian', label: 'Romanian' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (language: string) => {
    setStudioSetting({
      ...studioSetting,
      language,
    });
    setIsDropdownOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const inputValue = isCheckbox
      ? (e.target as HTMLInputElement).checked
      : value;

    setStudioSetting({
      ...studioSetting,
      [name]: inputValue,
    });
  };

  return (
    <div className='flex w-full flex-col gap-4 overflow-x-hidden md:gap-6'>
      {/* Description */}
      <div className='text-xs text-zinc-400'>
        Manage general settings related to the recording studio.{' '}
        <Link href='/blogs' className='text-primary-300 underline'>
          Learn more
        </Link>
      </div>
      {/* Studio Info */}
      <section className='flex flex-col gap-4 rounded-2xl bg-zinc-900 p-5'>
        <h3 className='text-xl font-bold text-white'>Studio info</h3>
        <div className='flex flex-col justify-between gap-2 md:flex-row md:items-center'>
          <div>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-white'
            >
              Name
            </label>
            <p className='mb-2 text-xs text-zinc-400'>
              The name for your studio.
            </p>
          </div>
          <input
            id='name'
            name='name'
            type='text'
            value={studioSetting.studioName}
            onChange={handleInputChange}
            className='focus:outline-primary-500 focus:ring-primary-500 rounded-lg border-none bg-zinc-800 px-4 py-2 text-white outline-none placeholder:text-zinc-500 focus:ring-1'
            placeholder='Enter studio name'
            required
          />
        </div>
        <div className='flex items-center justify-between'>
          <div>
            <label
              htmlFor='lobby'
              className='block text-xs font-medium text-white'
            >
              Enable lobby waiting room
            </label>
            <p className='text-xs text-zinc-400'>
              People will have to be let into the studio by a host or producer.
            </p>
          </div>
          {/* Minimal Toggle Switch */}

          <ToggleSwitch
            checked={studioSetting.enableLobby}
            onChange={() =>
              setStudioSetting({
                ...studioSetting,
                enableLobby: !studioSetting.enableLobby,
              })
            }
            id='lobby'
          />
        </div>
      </section>

      {/* Design */}
      <section className='flex flex-col justify-between gap-4 rounded-2xl bg-zinc-900 p-5 md:flex-row md:items-center md:gap-2'>
        <div>
          <h3 className='flex items-center gap-2 text-2xl font-bold text-white'>
            Design
            <span className='bg-primary-400 rounded-lg px-2 py-0.5 text-xs text-white'>
              NEW
            </span>
          </h3>
          <p className='mt-1 text-xs text-zinc-400'>
            Customize the studio background, colors and more.
          </p>
        </div>
        <Link
          href='/studio'
          className='bg-primary-400 hover:bg-primary-500 flex items-center gap-2 rounded-lg px-5 py-2 text-base font-semibold text-white transition focus:outline-none'
        >
          <PiPaintBrushDuotone size={20} />
          Customize
        </Link>
      </section>

      {/* Language */}
      <section className='flex flex-col gap-2 rounded-2xl bg-zinc-900 p-5'>
        <h3 className='flex items-center gap-2 text-2xl font-bold text-white'>
          <PiChatsCircleDuotone className='text-zinc-400' size={24} />
          Language
        </h3>
        <p className='text-xs text-zinc-400'>
          Choose a language for your transcript and captions.
        </p>
        <div className='mt-2 flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-1'>
          <label className='mb-1 block text-sm font-medium text-white'>
            Transcript & captions language
          </label>
          <div className='relative w-full md:w-64' ref={dropdownRef}>
            <button
              type='button'
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className='focus:ring-primary-500 flex w-full cursor-pointer items-center justify-between rounded-lg border-none bg-zinc-800 px-4 py-2 text-white focus:ring-2 focus:outline-none'
            >
              <span>{studioSetting.language}</span>
              <HiOutlineChevronDown
                className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                size={20}
              />
            </button>

            {isDropdownOpen && (
              <div
                className='absolute bottom-full z-40 mb-2 max-h-48 overflow-x-hidden overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-800 p-0.5 px-2 shadow-lg'
                style={{ scrollbarWidth: 'none' }}
              >
                {languages.map(language => (
                  <button
                    key={language.value}
                    type='button'
                    onClick={() => handleLanguageSelect(language.value)}
                    className={`m-1 w-full rounded-lg px-4 py-1.5 text-left text-white first:rounded-t-lg last:rounded-b-lg hover:bg-zinc-700 ${
                      studioSetting.language === language.value
                        ? 'bg-zinc-700'
                        : ''
                    }`}
                  >
                    {language.value}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Remove Studio */}
      <section className='flex flex-col justify-between gap-4 rounded-2xl bg-zinc-900 p-5 lg:flex-row lg:items-center lg:gap-2'>
        <div className='flex flex-col gap-2'>
          <h3 className='flex items-center gap-1 text-2xl font-bold text-white'>
            <PiTrashDuotone size={24} />
            Remove Studio
          </h3>
          <p className='text-xs text-zinc-400'>
            This will remove your studio and all recordings. This action cannot
            be undone.
          </p>
        </div>

        <RemoveStudio />
      </section>
    </div>
  );
};

export default GeneralTab;
