import React from 'react';

const CarIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      className={className}
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.5 5.5L17.5 9.5H6.5L4.5 5.5" />
      <path d="M19.4998 5.5L20.9998 3H3L4.49983 5.5H19.4998Z" />
      <path d="M4.5 9.5L3 16" />
      <path d="M19.5 9.5L21 16" />
      <path d="M3 16H2V19H5" />
      <path d="M21 16H22V19H19" />
      <path d="M5 19C5 17.8954 5.89543 17 7 17H17C18.1046 17 19 17.8954 19 19" />
    </svg>
  );
};

export default CarIcon;
