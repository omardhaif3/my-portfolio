import React from 'react';
import { SocialLink } from '../../types';
import { Github, Linkedin, Twitter, Globe, Instagram, Youtube, Facebook } from 'lucide-react';

interface SocialLinksProps {
  links: SocialLink[];
  size?: number;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ links, size = 20 }) => {
  if (!links || links.length === 0) {
    return null;
  }

  // Map platform names to Lucide icons
  const getIconByPlatform = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github size={size} />;
      case 'linkedin':
        return <Linkedin size={size} />;
      case 'twitter':
        return <Twitter size={size} />;
      case 'instagram':
        return <Instagram size={size} />;
      case 'youtube':
        return <Youtube size={size} />;
      case 'facebook':
        return <Facebook size={size} />;
      default:
        return <Globe size={size} />;
    }
  };

  return (
    <div className="flex space-x-4">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          aria-label={`${link.platform} profile`}
        >
          {getIconByPlatform(link.platform)}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;