import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="w-12 h-12 border-4 border-t-red-600 border-gray-200 rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;