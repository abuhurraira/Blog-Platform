import React from 'react';

const LoadingSpinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className="flex justify-center items-center">
      <div className="relative">
        <div
          className={`animate-spin rounded-full border-2 border-gray-200 ${sizeClasses[size]}`}
        ></div>
        <div
          className={`absolute top-0 left-0 animate-spin rounded-full border-2 border-transparent border-t-primary-500 ${sizeClasses[size]}`}
        ></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
