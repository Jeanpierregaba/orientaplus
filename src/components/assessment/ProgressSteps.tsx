
import React from "react";

interface ProgressStepsProps {
  step: number;
}

const ProgressSteps = ({ step }: ProgressStepsProps) => {
  return (
    <div className="flex justify-between mb-8 relative">
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
      
      {[1, 2, 3].map((i) => (
        <div key={i} className="relative z-10 flex flex-col items-center">
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= i ? "bg-aaf-blue text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            {i}
          </div>
          <div className="text-sm mt-2 font-medium">
            {i === 1 && "Informations personnelles"}
            {i === 2 && "Tests de personnalité"}
            {i === 3 && "Préférences professionnelles"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressSteps;
