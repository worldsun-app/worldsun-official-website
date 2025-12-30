import { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Progress } from "@/components/ui/progress";
import { fetchStream } from "@/lib/stream";
import SEO from "@/components/SEO";
import { getApiUrl } from "@/lib/config";

import PeRatioBar from "@/components/PeRatioBar";

interface EtfRoi {
  '1D': number | null;
  '5D': number | null;
  '1M': number | null;
  '3M': number | null;
  '6M': number | null;
  '1Y': number | null;
  'pe_today': number | null;
}

interface IndustryData {
  industry_name: string;
  preview_summary: string;
  etf_roi: EtfRoi | null;
  pe_high_1y: number | null;
  pe_low_1y: number | null;
  market_breadth_200d: number | null;
}

type SortKey = 'industry_name' | '1D' | '5D' | '1M' | '3M' | '6M' | '1Y' | 'pe_today' | 'market_breadth_200d';

interface SortConfig {
  key: SortKey;
  direction: 'ascending' | 'descending';
}



const RoiCell: React.FC<{ value: number | null | undefined, isPercentage?: boolean, hasColor?: boolean, decimalPlaces?: number }> = ({ value, isPercentage = true, hasColor = true, decimalPlaces = 2 }) => {
  if (value === null || value === undefined) {
    return <span className="text-gray-500">N/A</span>;
  }
  const className = hasColor && isPercentage ? (value >= 0 ? 'text-green-600' : 'text-red-600') : '';
  const displayValue = isPercentage ? `${value.toFixed(decimalPlaces)}%` : value.toFixed(decimalPlaces);
  return <span className={className}>{displayValue}</span>;
};



const IndustryAnalysis = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'industry_name', direction: 'ascending' });
  const [hoveredIndustrySummary, setHoveredIndustrySummary] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number; direction: 'up' | 'down' } | null>(null);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const isLongPress = useRef(false);
  const isScrolling = useRef(false);

  const backendUrl = getApiUrl();

  const { data: allData, isLoading, error } = useQuery<IndustryData[]>({
    queryKey: ['industryData'],
    queryFn: async () => {
      const response = await fetchStream<{ data: IndustryData[] }>(
        `${backendUrl}/api/industry-data`,
        {},
        setProgress
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });

  const sp500Data = useMemo(() => allData?.find(d => d.industry_name === 'S&P 500') || null, [allData]);
  const industryData = useMemo(() => allData?.filter(d => d.industry_name !== 'S&P 500') || [], [allData]);

  const sortedIndustryData = useMemo(() => {
    let sortableData = [...(industryData || [])];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        let valA: number | string | null = null;
        let valB: number | string | null = null;
        if (sortConfig.key === 'industry_name') {
          valA = a.industry_name;
          valB = b.industry_name;
        } else if (sortConfig.key === 'pe_today') {
          valA = a.etf_roi?.pe_today ?? null;
          valB = b.etf_roi?.pe_today ?? null;
        } else if (sortConfig.key === 'market_breadth_200d') {
          valA = a.market_breadth_200d ?? null;
          valB = b.market_breadth_200d ?? null;
        } else {
          valA = a.etf_roi ? a.etf_roi[sortConfig.key as keyof EtfRoi] : null;
          valB = b.etf_roi ? b.etf_roi[sortConfig.key as keyof EtfRoi] : null;
        }
        if (valA === null) return 1;
        if (valB === null) return -1;
        if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableData;
  }, [industryData, sortConfig]);

  const requestSort = (key: SortKey) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: SortKey) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
  };

  const handleRowClick = (industry: IndustryData) => {
    navigate(`/industry-reports/${industry.industry_name}`);
  };

  const handleMouseEnter = (industry: IndustryData, event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    const direction = clientY > window.innerHeight / 2 ? 'up' : 'down';
    setHoveredIndustrySummary(industry.preview_summary);
    setTooltipPosition({ x: clientX, y: clientY, direction });
  };

  const handleMouseLeave = () => {
    setHoveredIndustrySummary(null);
    setTooltipPosition(null);
  };

  const tooltipStyle: React.CSSProperties = useMemo(() => {
    if (!tooltipPosition) return {};
    const { x, y, direction } = tooltipPosition;
    const top = direction === 'up' ? y - 15 : y + 15;
    const transform = direction === 'up' ? 'translateY(-100%)' : 'translateY(0)';
    return { left: x + 15, top: top, transform: transform, position: 'fixed' };
  }, [tooltipPosition]);

  const handleTouchStart = (industry: IndustryData, e: React.TouchEvent) => {
    isLongPress.current = false;
    isScrolling.current = false;
    const touch = e.touches[0];
    const { clientX, clientY } = touch;

    longPressTimer.current = setTimeout(() => {
      // Only trigger long press if we haven't started scrolling
      if (!isScrolling.current) {
        isLongPress.current = true;
        const direction = clientY > window.innerHeight / 2 ? 'up' : 'down';
        setHoveredIndustrySummary(industry.preview_summary);
        setTooltipPosition({ x: clientX, y: clientY, direction });
      }
    }, 500);
  };

  const handleTouchEnd = (industry: IndustryData) => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }

    // Only handle interactions if we weren't scrolling
    if (!isScrolling.current) {
      if (isLongPress.current) {
        // Was a long press, just hide tooltip
        setHoveredIndustrySummary(null);
        setTooltipPosition(null);
      } else {
        // Was a tap (and not scrolling), navigate
        handleRowClick(industry);
      }
    } else {
      // If we were scrolling, just ensure tooltip is hidden just in case
      setHoveredIndustrySummary(null);
      setTooltipPosition(null);
    }
    isLongPress.current = false;
    isScrolling.current = false;
  };

  const handleTouchMove = () => {
    // If user moves finger significantly, it's a scroll or swipe
    isScrolling.current = true;
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-[#F2F2F2] text-[#1C1D1D] min-h-screen pt-20">
        <Header />
        <div className="max-w-[1400px] mx-auto px-6 text-center py-20 flex flex-col items-center">
          <h1 className="text-2xl font-semibold mb-4">資料載入中...</h1>
          <div className="w-1/2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-gray-600 mt-2">{progress}%</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#F2F2F2] text-[#1C1D1D] min-h-screen pt-20">
        <Header />
        <div className="max-w-[1400px] mx-auto px-6 text-center py-20">
          <h1 className="text-2xl font-semibold text-red-600">資料載入失敗</h1>
          <p className="text-gray-600">{(error as Error).message}</p>
        </div>
        <Footer />
      </div>
    );
  }

  const roiOrder = ['1D', '5D', '1M', '3M', '6M', '1Y'];

  return (
    <div className="bg-[#F2F2F2] text-[#1C1D1D] min-h-screen pt-20">
      <SEO
        title="產業週報"
        description="瀏覽最新的產業數據分析，涵蓋各大板塊的 ETF 投資報酬率、本益比區間與市場寬度分析。"
      />
      <Header />
      <div className="max-w-[1400px] mx-auto px-6">
        <h1 className="font-['Noto_Sans'] text-3xl md:text-[2.5rem] font-semibold text-left mb-2">產業週報</h1>
        <hr className="border-0 h-px bg-[#E0E0E0] mt-2 mb-4" />

        {sp500Data && sp500Data.etf_roi && (
          <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 border border-[#E0E0E0] mb-8">
            <h4 className="text-2xl font-semibold mb-4">S&P 500 (SPY)</h4>
            <div className="grid [grid-template-columns:repeat(auto-fit,minmax(100px,1fr))] gap-4">
              {roiOrder.map((key) => {
                const value = sp500Data.etf_roi[key as keyof EtfRoi];
                return (
                  <div key={key} className="flex flex-col items-center justify-center bg-[#F2F2F2] p-4 rounded-lg">
                    <span className="text-sm text-gray-500 mb-1">{key}</span>
                    <span className={`text-xl font-bold ${value! >= 0 ? 'text-green-600' : 'text-red-600'}`}>{value?.toFixed(2)}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 border border-[#E0E0E0]">
          <div className="mb-6 cursor-pointer" onClick={() => setIsCollapsed(!isCollapsed)}>
            <h2 className="text-2xl md:text-[1.8rem] font-semibold">產業列表 {isCollapsed ? '▶' : '▼'}</h2>
          </div>
          {!isCollapsed && (
            <>
              <div className="hidden md:block overflow-x-auto">
                <table className="[border-collapse:separate] border-spacing-0 w-full table-auto min-w-max">
                  <thead>
                    <tr>
                      <th className="bg-[#F2F2F2] border-b-2 border-[#E0E0E0] font-semibold text-left p-4 align-middle hover:bg-[#E0E0E0] cursor-pointer" onClick={(e) => { e.stopPropagation(); requestSort('industry_name'); }}>Industry{getSortIndicator('industry_name')}</th>
                      <th className="bg-[#F2F2F2] border-b-2 border-[#E0E0E0] font-semibold text-left p-4 align-middle hover:bg-[#E0E0E0] cursor-pointer" onClick={(e) => { e.stopPropagation(); requestSort('1D'); }}>1D{getSortIndicator('1D')}</th>
                      <th className="bg-[#F2F2F2] border-b-2 border-[#E0E0E0] font-semibold text-left p-4 align-middle hover:bg-[#E0E0E0] cursor-pointer" onClick={(e) => { e.stopPropagation(); requestSort('5D'); }}>5D{getSortIndicator('5D')}</th>
                      <th className="bg-[#F2F2F2] border-b-2 border-[#E0E0E0] font-semibold text-left p-4 align-middle hover:bg-[#E0E0E0] cursor-pointer" onClick={(e) => { e.stopPropagation(); requestSort('1M'); }}>1M{getSortIndicator('1M')}</th>
                      <th className="bg-[#F2F2F2] border-b-2 border-[#E0E0E0] font-semibold text-left p-4 align-middle hover:bg-[#E0E0E0] cursor-pointer" onClick={(e) => { e.stopPropagation(); requestSort('3M'); }}>3M{getSortIndicator('3M')}</th>
                      <th className="bg-[#F2F2F2] border-b-2 border-[#E0E0E0] font-semibold text-left p-4 align-middle hover:bg-[#E0E0E0] cursor-pointer" onClick={(e) => { e.stopPropagation(); requestSort('6M'); }}>6M{getSortIndicator('6M')}</th>
                      <th className="bg-[#F2F2F2] border-b-2 border-[#E0E0E0] font-semibold text-left p-4 align-middle hover:bg-[#E0E0E0] cursor-pointer" onClick={(e) => { e.stopPropagation(); requestSort('1Y'); }}>1Y{getSortIndicator('1Y')}</th>
                      <th className="bg-[#F2F2F2] border-b-2 border-[#E0E0E0] font-semibold text-left p-4 align-middle hover:bg-[#E0E0E0] cursor-pointer" onClick={(e) => { e.stopPropagation(); requestSort('pe_today'); }}>PE Range (1Y){getSortIndicator('pe_today')}</th>
                      <th className="bg-[#F2F2F2] border-b-2 border-[#E0E0E0] font-semibold text-left p-4 align-middle hover:bg-[#E0E0E0] cursor-pointer" onClick={(e) => { e.stopPropagation(); requestSort('market_breadth_200d'); }}>Market<br />Breadth (200d){getSortIndicator('market_breadth_200d')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedIndustryData.map(industry => (
                      <tr key={industry.industry_name} className="transition-all duration-200 ease-in-out even:bg-[rgba(0,0,0,0.02)] hover:bg-[#F8F8F8] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] cursor-pointer" onClick={() => handleRowClick(industry)}>
                        <td className="p-6 align-middle" onMouseEnter={(e) => handleMouseEnter(industry, e)} onMouseLeave={handleMouseLeave}>{industry.industry_name}</td>
                        <td className="p-6 align-middle" onMouseEnter={(e) => handleMouseEnter(industry, e)} onMouseLeave={handleMouseLeave}><RoiCell value={industry.etf_roi?.['1D']} /></td>
                        <td className="p-6 align-middle" onMouseEnter={(e) => handleMouseEnter(industry, e)} onMouseLeave={handleMouseLeave}><RoiCell value={industry.etf_roi?.['5D']} /></td>
                        <td className="p-6 align-middle" onMouseEnter={(e) => handleMouseEnter(industry, e)} onMouseLeave={handleMouseLeave}><RoiCell value={industry.etf_roi?.['1M']} /></td>
                        <td className="p-6 align-middle" onMouseEnter={(e) => handleMouseEnter(industry, e)} onMouseLeave={handleMouseLeave}><RoiCell value={industry.etf_roi?.['3M']} /></td>
                        <td className="p-6 align-middle" onMouseEnter={(e) => handleMouseEnter(industry, e)} onMouseLeave={handleMouseLeave}><RoiCell value={industry.etf_roi?.['6M']} /></td>
                        <td className="p-6 align-middle" onMouseEnter={(e) => handleMouseEnter(industry, e)} onMouseLeave={handleMouseLeave}><RoiCell value={industry.etf_roi?.['1Y']} /></td>
                        <td className="p-6 align-middle text-left"><PeRatioBar pe_today={industry.etf_roi?.pe_today} pe_low_1y={industry.pe_low_1y} pe_high_1y={industry.pe_high_1y} /></td>
                        <td className="p-6 align-middle" onMouseEnter={(e) => handleMouseEnter(industry, e)} onMouseLeave={handleMouseLeave}><RoiCell value={industry.market_breadth_200d} hasColor={false} isPercentage={false} decimalPlaces={1} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {sortedIndustryData.map(industry => (
                  <div
                    key={industry.industry_name}
                    className="bg-white rounded-lg border border-[#E0E0E0] p-4 shadow-sm active:scale-[0.98] transition-all select-none"
                    onTouchStart={(e) => handleTouchStart(industry, e)}
                    onTouchEnd={() => handleTouchEnd(industry)}
                    onTouchMove={handleTouchMove}
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-bold text-[#1C1D1D]">{industry.industry_name}</h3>
                      <span className="text-sm text-gray-500">▶</span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-sm mb-3">
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-xs">1D</span>
                        <RoiCell value={industry.etf_roi?.['1D']} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-xs">1W</span>
                        <RoiCell value={industry.etf_roi?.['5D']} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-xs">1M</span>
                        <RoiCell value={industry.etf_roi?.['1M']} />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-sm border-t border-gray-100 pt-3">
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-xs">3M</span>
                        <RoiCell value={industry.etf_roi?.['3M']} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-xs">6M</span>
                        <RoiCell value={industry.etf_roi?.['6M']} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-xs">1Y</span>
                        <RoiCell value={industry.etf_roi?.['1Y']} />
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-xs text-gray-500">Market Breadth:</span>
                      <RoiCell value={industry.market_breadth_200d} hasColor={false} isPercentage={false} decimalPlaces={1} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {hoveredIndustrySummary && (
        <div className="fixed bg-[#1C1D1D] text-white py-2.5 px-4 rounded z-[1000] pointer-events-none whitespace-pre-wrap max-w-[300px] text-sm transition-all duration-200 ease-in-out" style={tooltipStyle}>
          {hoveredIndustrySummary}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default IndustryAnalysis;
