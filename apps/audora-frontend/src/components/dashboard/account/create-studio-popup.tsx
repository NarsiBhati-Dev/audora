import { useCreateStudioMutation } from '@/mutations/create-room-mutete';
import React from 'react';

const CreateStudioPopup = ({ onClose }: { onClose: () => void }) => {
  const createStudioMutation = useCreateStudioMutation();
  const handleCreateStudio = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    createStudioMutation.mutate(name);
  };

  return (
    <form onSubmit={handleCreateStudio} className='flex flex-col gap-4'>
      <div className='flex flex-col items-start gap-4'>
        <h1 className='text-2xl font-bold'>Create Studio</h1>
        <label className='flex flex-col items-start gap-2 text-start text-base font-semibold text-white'>
          Name
          <span className='text-xs text-zinc-400'>
            This appears in the studio’s unique URL, invite emails and the
            lobby.
          </span>
        </label>
        <input
          type='text'
          name='name'
          required
          placeholder='Studio Name'
          className='focus:ring-primary-400 w-full rounded-md border border-zinc-700 bg-transparent p-2 text-base font-medium outline-none focus:ring-1'
        />
      </div>
      <div className='mt-4 flex items-end justify-end gap-4'>
        <button
          onClick={() => onClose()}
          className='rounded-md bg-zinc-800 px-4 py-2 font-medium text-white'
        >
          Cancel
        </button>
        <button
          type='submit'
          className='bg-primary-400 rounded-md px-4 py-2 font-medium text-white'
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default CreateStudioPopup;
