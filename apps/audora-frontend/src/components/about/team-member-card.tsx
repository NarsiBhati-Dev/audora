import { TeamMemberSchema } from '@/data/TeamMember';
import { LinkedInIcon, XIcon } from '@/data/icons';
import Image from 'next/image';
import React from 'react';

const TeamMemberCard = (member: TeamMemberSchema) => {
  return (
    <div className='group flex h-full flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-[#0a0a0a] via-[#121212] to-[#1f1f1f] p-8 text-center shadow-xl transition-all duration-300 hover:border-[#6965db]/30 hover:shadow-2xl'>
      <div className='relative mx-auto mb-6 h-32 w-32'>
        <div className='absolute inset-0 rounded-full bg-gradient-to-br from-[#6965db]/20 to-[#a18fff]/20 blur-xl transition-all duration-300 group-hover:blur-2xl' />
        <Image
          src={member.image}
          alt={member.name}
          fill
          className='rounded-full border-4 border-white/10 object-cover shadow-lg transition-colors duration-300 group-hover:border-[#6965db]/50'
        />
      </div>
      <h3 className='mb-2 text-2xl font-semibold text-white transition-colors duration-300'>
        {member.name}
      </h3>
      <p className='mb-4 font-medium tracking-wide text-[#a18fff]'>
        {member.role}
      </p>
      <p className='mb-6 line-clamp-3 flex-grow text-sm leading-relaxed text-gray-300'>
        {member.bio}
      </p>
      <div className='mt-auto flex justify-center space-x-5'>
        {member.linkedin && (
          <a
            href={member.linkedin}
            target='_blank'
            rel='noopener noreferrer'
            className='transform rounded-md bg-white text-[#0A66C2] transition-all duration-300 hover:scale-110 hover:text-[#4a8bd9]'
            aria-label={`${member.name}'s LinkedIn`}
          >
            <LinkedInIcon />
          </a>
        )}
        {member.twitter && (
          <a
            href={member.twitter}
            target='_blank'
            rel='noopener noreferrer'
            className='transform text-white transition-all duration-300 hover:scale-110 hover:text-gray-400'
            aria-label={`${member.name}'s X (Twitter)`}
          >
            <XIcon />
          </a>
        )}
      </div>
    </div>
  );
};

export default TeamMemberCard;
