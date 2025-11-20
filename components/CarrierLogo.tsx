import React from 'react';

interface CarrierLogoProps {
  carrier: string;
  className?: string;
}

const CarrierLogo: React.FC<CarrierLogoProps> = ({ carrier, className = "h-8" }) => {
  const lowerCarrier = carrier.toLowerCase();

  // DHL Logo (Mejorado: Texto Heavy Italic sobre fondo amarillo)
  if (lowerCarrier.includes('dhl')) {
    return (
      <svg className={className} viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="DHL Logo">
        <rect width="140" height="40" rx="4" fill="#FFCC00"/>
        <text 
          x="70" 
          y="30" 
          textAnchor="middle" 
          fill="#D40511" 
          fontFamily="Arial, Helvetica, sans-serif" 
          fontWeight="900" 
          fontSize="32" 
          fontStyle="italic"
          transform="skewX(-10)"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        >
          DHL
        </text>
      </svg>
    );
  }

  // UPS Logo (Shield)
  if (lowerCarrier.includes('ups')) {
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M50 5L10 25V45C10 70 50 95 50 95C50 95 90 70 90 45V25L50 5Z" fill="#351C15"/>
         <path d="M50 15L20 30V40C20 40 50 40 50 40C50 40 50 40 50 40V30L50 15Z" fill="#FFB500"/>
         <path d="M50 45V85C50 85 80 65 80 45V35L50 45Z" fill="#FFB500"/>
         <path d="M20 45V45C20 65 50 85 50 85V45L20 35V45Z" fill="#FFB500" fillOpacity="0.5"/>
         <text x="50" y="65" fontSize="20" fontWeight="bold" textAnchor="middle" fill="#351C15" fontFamily="sans-serif">UPS</text>
      </svg>
    );
  }

  // GLS Logo (Blue/Yellow)
  if (lowerCarrier.includes('gls')) {
    return (
      <svg className={className} viewBox="0 0 150 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="150" height="50" rx="4" fill="#13286B"/>
        <text x="35" y="35" fontSize="28" fontWeight="900" fill="#FDB913" fontFamily="Arial, sans-serif">GLS</text>
        <path d="M90 35L110 35L100 15L90 35Z" fill="#FDB913"/>
      </svg>
    );
  }

  // CTT Express (Red)
  if (lowerCarrier.includes('ctt')) {
    return (
      <svg className={className} viewBox="0 0 150 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="150" height="50" rx="4" fill="#D71921"/>
        <text x="75" y="35" fontSize="24" fontWeight="bold" textAnchor="middle" fill="white" fontFamily="sans-serif" letterSpacing="2">CTT</text>
        <path d="M110 15L130 25L110 35" stroke="white" strokeWidth="3" fill="none"/>
      </svg>
    );
  }

  // GlobalTrans or Generic Truck
  return (
    <svg className={className} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="25" cy="25" r="24" fill="#F3F4F6" stroke="#E5E7EB"/>
      <path d="M10 25H40" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
      <path d="M25 10L40 25L25 40" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default CarrierLogo;