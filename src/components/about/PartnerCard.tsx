import React from 'react';
import Image from 'next/image';
import { Partner } from '@/types';
import { Linkedin, Twitter, Github } from 'lucide-react';

interface PartnerCardProps {
  partner: Partner;
}

const PartnerCard: React.FC<PartnerCardProps> = ({ partner }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 m-4 w-full max-w-sm transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 relative mb-4 rounded-full overflow-hidden border-4 border-blue-500 dark:border-blue-400 shadow-md">
          <Image
            src={partner.image}
            alt={partner.name}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{partner.name}</h3>
        <p className="text-blue-600 dark:text-blue-400 mb-2">{partner.designation}</p>
        <p className="text-gray-700 dark:text-gray-300 text-sm text-center mb-4 h-20 overflow-y-auto">
          {partner.description}
        </p>
        <div className="flex space-x-3">
          {partner.socialLinks.linkedin && (
            <a
              href={partner.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-500 transition-colors"
              aria-label={`${partner.name} LinkedIn Profile`}
            >
              <Linkedin size={24} />
            </a>
          )}
          {partner.socialLinks.twitter && (
            <a
              href={partner.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
              aria-label={`${partner.name} Twitter Profile`}
            >
              <Twitter size={24} />
            </a>
          )}
          {partner.socialLinks.github && (
            <a
              href={partner.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label={`${partner.name} GitHub Profile`}
            >
              <Github size={24} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnerCard;
