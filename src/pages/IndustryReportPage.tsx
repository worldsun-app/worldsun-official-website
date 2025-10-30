import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
// import axios from 'axios'; // Removed axios
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// --- 介面定義 ---
interface Stock {
  symbol: string;
  price: number;
  marketCap: number;
  changePercentage: number;
}

interface FullIndustryData {
  industry_name: string;
  preview_summary: string;
  etf_roi: any;
  top_stocks?: Stock[];
}

interface ReportData {
  title: string;
  generated_at: string;
  report_part_1: string;
  report_part_2: string;
  preview_summary: string;
}

// --- Helper 函式 ---
const formatMarketCap = (cap: number) => {
  if (cap >= 1_000_000_000_000) return `${(cap / 1_000_000_000_000).toFixed(2)}T`;
  if (cap >= 1_000_000_000) return `${(cap / 1_000_000_000).toFixed(2)}B`;
  if (cap >= 1_000_000) return `${(cap / 1_000_000).toFixed(2)}M`;
  return cap.toString();
};

const IndustryReportPage = () => {
  const { industryName } = useParams<{ industryName: string }>();
  const navigate = useNavigate();

  // Refactored state management with useQuery
  const [readingTime, setReadingTime] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Use useQuery for report data
  const backendUrl = import.meta.env.VITE_API_BASE_URL;

  const { 
    data: report, 
    isLoading: loadingReport, 
    error: errorReport 
  } = useQuery<ReportData>({
    queryKey: ['industryReport', industryName], // Unique key for this report
    queryFn: async () => {
      const response = await fetch(`${backendUrl}/api/industry-reports/${industryName}/latest`);
      if (!response.ok) throw new Error('Failed to fetch industry report');
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30,  // 30 minutes
    enabled: !!industryName, // Only fetch if industryName exists
  });

  // Use useQuery for all industries data (shared cache with IndustryAnalysis)
  const { 
    data: allIndustriesData, 
    isLoading: loadingAllIndustries, 
    error: errorAllIndustries 
  } = useQuery<FullIndustryData[]>({
    queryKey: ['industryData'], // Same key as in IndustryAnalysis.tsx for shared cache
    queryFn: async () => {
      const response = await fetch(`${backendUrl}/api/industry-data`);
      if (!response.ok) throw new Error('Failed to fetch all industries data');
      const apiResponse: { data: FullIndustryData[] } = await response.json();
      return apiResponse.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30,  // 30 minutes
  });

  // Derived states from useQuery results
  const allIndustries = useMemo(() => allIndustriesData?.filter((ind: FullIndustryData) => ind.industry_name !== 'S&P 500') || [], [allIndustriesData]);
  const currentIndustry = useMemo(() => allIndustriesData?.find((ind: FullIndustryData) => ind.industry_name === industryName) || null, [allIndustriesData, industryName]);

  // Combine loading and error states
  const loading = loadingReport || loadingAllIndustries;
  const error = errorReport || errorAllIndustries;

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    setScrollProgress(scrolled);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (report) {
      const wordsPerMinute = 225;
      const text = (report.report_part_1 || "") + " " + (report.report_part_2 || "");
      const wordCount = text.split(/\s+/).length;
      const time = Math.ceil(wordCount / wordsPerMinute);
      setReadingTime(time);
      window.scrollTo(0, 0); // Scroll to top after report data is available
    }
  }, [report]);

  const getFormattedDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
      return '';
    }
  };

  if (loading) {
    return (
      <div className="bg-[#F2F2F2] text-[#1C1D1D] min-h-screen pt-20">
        <Header />
        <div className="max-w-[1400px] mx-auto px-6 text-center py-20">
          <h1 className="text-2xl font-semibold">報告載入中...</h1>
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
          <h1 className="text-2xl font-semibold text-red-600">報告載入失敗</h1>
          <p className="text-gray-600">{(error as Error).message}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#F2F2F2] pt-20">
      <Header />
      {/* 頂部進度條 */}
      <div style={{ width: `${scrollProgress}%` }} className="fixed top-[80px] left-0 h-1 bg-gradient-to-r from-[#185897] to-[#2287BC] z-[1000] transition-width duration-100 ease-out"/>
      
      {/* 主容器，三欄式佈局 */}
      <div className="max-w-[1500px] mx-auto px-[50px] py-[40px] grid grid-cols-[240px_1fr_300px] gap-[40px] items-start">
        
        {/* 左邊欄 */}
        <aside className="sticky top-[100px] self-start h-[calc(100vh-120px)] overflow-y-auto">
          <h4 className="text-[1.1rem] font-semibold mb-5 text-[#1C1D1D] border-b border-[#E0E0E0] pb-2.5">所有產業</h4>
          <ul className="list-none p-0 m-0">
            {allIndustries.map((industry) => (
              <li key={industry.industry_name} className={industry.industry_name === industryName ? 'bg-[#E9ECEF] rounded-[5px]' : ''}>
                <Link to={`/industry-reports/${industry.industry_name}`} className="block py-2 px-2.5 no-underline text-[#555] rounded-[5px] transition-colors duration-200 ease-in-out text-[0.95rem] font-['Helvetica_Neue',sans-serif] hover:bg-[#F0F0F0] hover:text-[#1C1D1D]">
                  {industry.industry_name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* 中間主內容 */}
        <main className="min-w-0">
          <Link to="/industry-analysis" className="inline-block no-underline text-[#555] font-['Helvetica_Neue',sans-serif] mb-5 transition-colors duration-200 ease-out hover:text-[#1C1D1D]">← 返回產業總覽</Link>
          
          {report ? (
            <article className="w-full font-['Georgia',serif] text-[#1C1D1D]">
              <header className="mb-10 border-b border-[#E0E0E0] pb-5">
                <h1 className="text-[2.5rem] font-bold leading-tight mb-2.5">{industryName} 產業週報</h1>
                <div className="flex items-center text-[#888] text-[0.9rem] mt-5 font-['Helvetica_Neue',sans-serif]">
                  <span className="mr-[15px] after:content-['•'] after:ml-[15px] after:text-[#ccc]">By WSGFO Analyst</span>
                  <span className="mr-[15px] after:content-['•'] after:ml-[15px] after:text-[#ccc]">{getFormattedDate(report?.generated_at)}</span>
                </div>
                <p className="text-[1.25rem] text-[#666] italic mt-2.5">{report.preview_summary}</p>
              </header>
              <section className="prose prose-lg max-w-none text-[1.125rem] leading-loose whitespace-pre-wrap">
                <p>{report.report_part_1}</p>
                <p>{report.report_part_2}</p>
              </section>
            </article>
          ) : (
            <div>找不到報告。</div>
          )}
        </main>

        {/* 右邊欄 */}
        <aside className="sticky top-[100px] self-start h-[calc(100vh-120px)] overflow-y-auto">
          <h4 className="text-[1.1rem] font-semibold mb-5 text-[#1C1D1D] border-b border-[#E0E0E0] pb-2.5">產業重點個股</h4>
          {currentIndustry && currentIndustry.top_stocks && currentIndustry.top_stocks.length > 0 ? (
            <table className="w-full border-collapse text-[0.95rem] font-['Helvetica_Neue',sans-serif]">
              <thead>
                <tr>
                  <th className="w-[25%] p-2 text-left border-b-2 border-[#f0f0f0] font-bold bg-[#F2F2F2]">公司</th>
                  <th className="w-[30%] p-2 text-left border-b-2 border-[#f0f0f0] font-bold bg-[#F2F2F2]">市值</th>
                  <th className="w-[45%] p-2 text-left border-b-2 border-[#f0f0f0] font-bold bg-[#F2F2F2]">股價</th>
                </tr>
              </thead>
              <tbody>
                {currentIndustry.top_stocks.map(stock => (
                  <tr key={stock.symbol}>
                    <td className="p-2 border-b border-[#f0f0f0]">{stock.symbol}</td>
                    <td className="p-2 border-b border-[#f0f0f0]">{formatMarketCap(stock.marketCap)}</td>
                    <td className={`p-2 border-b border-[#f0f0f0] ${stock.changePercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${stock.price?.toFixed(2) ?? 'N/A'}
                      <span className="ml-1.5">
                        ({stock.changePercentage >= 0 ? '▲' : '▼'}{stock.changePercentage?.toFixed(2) ?? 'N/A'}%)
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-sm text-gray-500">暫無個股資料</p>
          )}
        </aside>
      </div>
      <Footer />
    </div>
  );
};

export default IndustryReportPage;
