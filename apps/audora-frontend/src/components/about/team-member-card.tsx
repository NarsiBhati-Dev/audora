import { TeamMemberSchema } from "@/data/TeamMember";
import { LinkedInIcon, XIcon } from "@/data/icons";
import React from "react";
import Image from "next/image";

const TeamMemberCard = (member: TeamMemberSchema) => {
  return (
    <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-100 hover:border-[#6965db]/20 hover:-translate-y-1 flex flex-col h-full">
      <div className="relative w-32 h-32 mx-auto mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6965db]/20 to-[#4a47b1]/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="rounded-full object-cover border-4 border-white shadow-lg group-hover:border-[#6965db]/30 transition-colors duration-300"
        />
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 transition-colors duration-300 mb-2">
        {member.name}
      </h3>
      <p className="text-[#6965db] font-medium mb-4 tracking-wide">
        {member.role}
      </p>
      <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
        {member.bio}
      </p>
      <div className="flex justify-center space-x-5 mt-auto">
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0A66C2] hover:text-[#004182] transition-all duration-300 transform hover:scale-110"
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
            className="text-black hover:text-gray-800 transition-all duration-300 transform hover:scale-110"
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
