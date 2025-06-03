import { useCreateStudioMutation } from '@/mutations/create-room-mutete';
import React from 'react'

const CreateStudioPopup = ({ onClose }: { onClose: () => void }) => {
    const createStudioMutation = useCreateStudioMutation();
    const handleCreateStudio = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get('name') as string;
        createStudioMutation.mutate(name);
    }

    return (
        <form onSubmit={handleCreateStudio} className='flex flex-col gap-4'>
            <div className='flex flex-col items-start gap-4'>
                <h1 className='text-2xl font-bold'>Create Studio</h1>
                <label className='text-base font-semibold flex text-start items-start  flex-col gap-2 text-white'>
                    Name
                    <span className='text-xs text-zinc-400'>
                        This appears in the studio’s unique URL, invite emails and the lobby.
                    </span>
                </label>
                <input
                    type='text'
                    name='name'
                    required
                    placeholder='Studio Name'
                    className='w-full text-base outline-none focus:ring-1 focus:ring-primary-400 font-medium bg-transparent border border-zinc-700 rounded-md p-2'
                />
            </div>
            <div className='flex mt-4 items-end gap-4 justify-end'>
                <button onClick={() => onClose()} className=' bg-zinc-800 text-white font-medium rounded-md px-4 py-2'>
                    Cancel
                </button>
                <button type='submit' className=' bg-primary-400 text-white font-medium rounded-md px-4 py-2'>
                    Create
                </button>
            </div>
        </form>
    )
}

export default CreateStudioPopup