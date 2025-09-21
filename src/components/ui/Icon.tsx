import React from 'react';
import { useTheme } from '../../context/ThemeContext/ThemeContext';
interface IconProps {
  IconComponent: React.FC<{ className?: string }>;
  className?: string;
  secondary?: boolean; // Optional prop to use secondary color
}

const Icon: React.FC<IconProps> = ({ IconComponent, className = 'h-5 w-5', secondary = false }) => {
  const { theme } = useTheme();
  const textColor = secondary
    ? theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
    : theme === 'dark' ? 'text-white' : 'text-gray-900';

  return <IconComponent className={`${className} ${textColor}`} />;
};

export default Icon;