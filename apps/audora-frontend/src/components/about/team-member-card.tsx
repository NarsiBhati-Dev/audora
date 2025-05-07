import { TeamMemberSchema } from "@/data/TeamMember";
import { LinkedInIcon, XIcon } from "@/data/icons";
import Image from "next/image";
import React from "react";

const TeamMemberCard = (member: TeamMemberSchema) => {
  return (
    <div className="group bg-gradient-to-b from-[#0a0a0a] via-[#121212] to-[#1f1f1f] rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 text-center border border-white/10 hover:border-[#6965db]/30 flex flex-col h-full">
      <div className="relative w-32 h-32 mx-auto mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6965db]/20 to-[#a18fff]/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="rounded-full object-cover border-4 border-white/10 shadow-lg group-hover:border-[#6965db]/50 transition-colors duration-300"
        />
      </div>
      <h3 className="text-2xl font-semibold text-white mb-2 transition-colors duration-300">
        {member.name}
      </h3>
      <p className="text-[#a18fff] font-medium mb-4 tracking-wide">
        {member.role}
      </p>
      <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
        {member.bio}
      </p>
      <div className="flex justify-center space-x-5 mt-auto">
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0A66C2] hover:text-[#4a8bd9] rounded-md bg-white transition-all duration-300 transform hover:scale-110"
            aria-label={`${member.name}'s LinkedIn`}
          >
            <LinkedInIcon />
          </a>
        )}
        {member.twitter && (
          <a
            href={member.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400 transition-all duration-300 transform hover:scale-110"
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
