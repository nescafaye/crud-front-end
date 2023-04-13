import React from "react";

const Skeleton = () => {
  return (
    <div className="animate-pulse flex flex-row items-center just gap-7">
      <div className="flex-1">
        <div className="animate-pulse bg-gray-600 h-4 w-full mb-2 rounded-sm"></div>
        <div className="bg-gray-600 h-4 mb-2 rounded-sm"></div>
        <div className="bg-gray-700 h-4 w-3/4 mb-2 rounded-sm"></div>
      </div>
      <div className="inline-flex gap-2">
        <div className="bg-gray-700 h-6 w-6 rounded-full"></div>
        <div className="bg-gray-700 h-6 w-6 rounded-full"></div>
        <div className="bg-gray-700 h-6 w-6 rounded-full"></div>
      </div>
    </div>
  );
};

export default Skeleton;
