import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-center py-4">
      <h1 
        className="text-3xl md:text-5xl font-black text-black tracking-wider" 
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        R_PROJEKT
      </h1>
    </header>
  );
};

export default Header;