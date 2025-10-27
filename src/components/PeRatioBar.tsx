import { useState } from 'react';

interface PeRatioBarProps {
  pe_today: number | null | undefined;
  pe_low_1y: number | null | undefined;
  pe_high_1y: number | null | undefined;
}

const PeRatioBar: React.FC<PeRatioBarProps> = ({ pe_today, pe_low_1y, pe_high_1y }) => {
  const [showDetails, setShowDetails] = useState(false);

  if (pe_today == null || pe_low_1y == null || pe_high_1y == null || pe_high_1y === pe_low_1y) {
    return <div className="text-gray-500">N/A</div>;
  }

  const percentage = ((pe_today - pe_low_1y) / (pe_high_1y - pe_low_1y)) * 100;
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  return (
    <div 
      className="flex items-center w-full"
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      <div className="w-full relative">
        {/* PE Today Value Tooltip */}
        <div 
          className="absolute bottom-[-25px] font-semibold text-xs bg-gray-800 text-white py-0.5 px-1.5 rounded whitespace-nowrap z-10 transition-all duration-300 ease-in-out"
          style={{ left: `${clampedPercentage}%`, transform: 'translateX(-50%)' }}
        >
          {pe_today.toFixed(2)}
        </div>

        {/* Bar */}
        <div className="w-full h-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full relative">
          {/* Dot */}
          <div 
            className="absolute top-1/2 w-4 h-4 bg-white border-2 border-gray-700 rounded-full z-10 transition-all duration-300 ease-in-out"
            style={{ left: `${clampedPercentage}%`, transform: 'translate(-50%, -50%)' }}
          />
        </div>

        {/* Min/Max Labels */}
        <div className={`flex justify-between text-xs text-gray-500 mt-1 transition-opacity duration-200 ease-in-out ${showDetails ? 'opacity-100' : 'opacity-0'}`}>
          <span>{pe_low_1y.toFixed(2)}</span>
          <span>{pe_high_1y.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default PeRatioBar;
