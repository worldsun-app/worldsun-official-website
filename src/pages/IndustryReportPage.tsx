import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { Menu, X } from 'lucide-react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Progress } from "@/components/ui/progress";
import { fetchStream } from "@/lib/stream";
import SEO from "@/components/SEO";
import { getApiUrl } from "@/lib/config";

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


const formatMarketCap = (cap: number) => {
  if (cap >= 1_000_000_000_000) return `${(cap / 1_000_000_000_000).toFixed(2)}T`;
  if (cap >= 1_000_000_000) return `${(cap / 1_000_000_000).toFixed(2)}B`;
  if (cap >= 1_000_000) return `${(cap / 1_000_000).toFixed(2)}M`;
  return cap.toString();
};

const IndustryReportPage = () => {
  const { industryName } = useParams<{ industryName: string }>();
  const [readingTime, setReadingTime] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [reportProgress, setReportProgress] = useState(0);
  const [industriesProgress, setIndustriesProgress] = useState(0);

  const backendUrl = getApiUrl();

  const {
    data: report,
    isLoading: loadingReport,
    error: errorReport
  } = useQuery<ReportData>({
    queryKey: ['industryReport', industryName],
    queryFn: async () => {
      return fetchStream<ReportData>(
        `${backendUrl}/api/industry-reports/${industryName}/latest`,
        {},
        setReportProgress
      );
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    enabled: !!industryName,
  });

  const {
    data: allIndustriesData,
    isLoading: loadingAllIndustries,
    error: errorAllIndustries
  } = useQuery<FullIndustryData[]>({
    queryKey: ['industryData'],
    queryFn: async () => {
      const response = await fetchStream<{ data: FullIndustryData[] }>(
        `${backendUrl}/api/industry-data`,
        {},
        setIndustriesProgress
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  const allIndustries = useMemo(() => allIndustriesData?.filter((ind: FullIndustryData) => ind.industry_name !== 'S&P 500') || [], [allIndustriesData]);
  const currentIndustry = useMemo(() => allIndustriesData?.find((ind: FullIndustryData) => ind.industry_name === industryName) || null, [allIndustriesData, industryName]);

  const { prevIndustry, nextIndustry } = useMemo(() => {
    if (!allIndustries.length || !industryName) return { prevIndustry: null, nextIndustry: null };
    const currentIndex = allIndustries.findIndex(ind => ind.industry_name === industryName);
    if (currentIndex === -1) return { prevIndustry: null, nextIndustry: null };

    // Circular logic
    const prevIndex = (currentIndex - 1 + allIndustries.length) % allIndustries.length;
    const nextIndex = (currentIndex + 1) % allIndustries.length;

    return {
      prevIndustry: allIndustries[prevIndex],
      nextIndustry: allIndustries[nextIndex]
    };
  }, [allIndustries, industryName]);

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
      window.scrollTo(0, 0);
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

  const renderStockTable = () => (
    <>
      <h4 className="text-[1.1rem] font-semibold mb-5 text-[#1C1D1D] border-b border-[#E0E0E0] pb-2.5">產業重點個股</h4>
      {currentIndustry && currentIndustry.top_stocks && currentIndustry.top_stocks.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[0.95rem] font-['Helvetica_Neue',sans-serif] table-fixed">
            <thead>
              <tr>
                <th className="w-[30%] p-2 text-left border-b-2 border-[#f0f0f0] font-bold bg-[#F2F2F2] whitespace-nowrap">公司</th>
                <th className="w-[30%] p-2 text-left border-b-2 border-[#f0f0f0] font-bold bg-[#F2F2F2]">市值</th>
                <th className="w-[40%] p-2 text-left border-b-2 border-[#f0f0f0] font-bold bg-[#F2F2F2]">股價</th>
              </tr>
            </thead>
            <tbody>
              {currentIndustry.top_stocks.map(stock => (
                <tr key={stock.symbol}>
                  <td className="p-2 border-b border-[#f0f0f0] break-words whitespace-nowrap">{stock.symbol}</td>
                  <td className="p-2 border-b border-[#f0f0f0] break-words">{formatMarketCap(stock.marketCap)}</td>
                  <td className={`p-2 border-b border-[#f0f0f0] break-words ${stock.changePercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${stock.price?.toFixed(2) ?? 'N/A'}
                    <span className="ml-1.5 whitespace-nowrap">
                      ({stock.changePercentage >= 0 ? '▲' : '▼'}{stock.changePercentage?.toFixed(2) ?? 'N/A'}%)
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-sm text-gray-500">暫無個股資料</p>
      )}
    </>
  );

  const renderIndustryList = () => (
    <>
      <h4 className="text-[1.1rem] font-semibold mb-5 text-[#1C1D1D] border-b border-[#E0E0E0] pb-2.5">所有產業</h4>
      <ul className="list-none p-0 m-0">
        {allIndustries.map(industry => (
          <li key={industry.industry_name} className={industry.industry_name === industryName ? 'bg-[#E9ECEF] rounded-[5px]' : ''}>
            <Link to={`/industry-reports/${industry.industry_name}`} className="block py-2 px-2.5 no-underline text-[#555] rounded-[5px] transition-colors duration-200 ease-in-out text-[0.95rem] font-['Helvetica_Neue',sans-serif] hover:bg-[#F0F0F0] hover:text-[#1C1D1D]">
              {industry.industry_name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );

  if (loading) {
    const currentReportProgress = loadingReport ? reportProgress : 100;
    const currentIndustriesProgress = loadingAllIndustries ? industriesProgress : 100;
    const totalProgress = (currentReportProgress + currentIndustriesProgress) / 2;
    return (
      <div className="bg-[#F2F2F2] text-[#1C1D1D] min-h-screen pt-20">
        <Header />
        <div className="max-w-[1400px] mx-auto px-6 text-center py-20 flex flex-col items-center">
          <h1 className="text-2xl font-semibold mb-4">報告載入中...</h1>
          <div className="w-1/2">
            <Progress value={totalProgress} className="w-full" />
            <p className="text-sm text-gray-600 mt-2">{Math.round(totalProgress)}%</p>
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
          <h1 className="text-2xl font-semibold text-red-600">報告載入失敗</h1>
          <p className="text-gray-600">{(error as Error).message}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#F2F2F2] pt-20">
      <SEO
        title={report ? `${industryName} 產業報告` : `${industryName}`}
        description={report ? report.preview_summary : `查看 ${industryName} 的最新產業分析報告與重點個股資訊。`}
      />
      <Header />
      <div style={{ width: `${scrollProgress}%` }} className="fixed top-[80px] left-0 h-1 bg-gradient-to-r from-[#185897] to-[#2287BC] z-[1000] transition-width duration-100 ease-out" />

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr_250px] gap-8">

          {/* Left Sidebar (Desktop) */}
          <aside className="hidden lg:block sticky top-[100px] self-start h-[calc(100vh-120px)] overflow-y-auto">
            {renderIndustryList()}
          </aside>

          {/* Main Content */}
          <main className="min-w-0">
            <div className="fixed top-[80px] left-0 right-0 z-10 flex justify-between items-center lg:hidden px-4 sm:px-6 py-2">
              <button onClick={() => setIsLeftSidebarOpen(true)} className="p-2 border rounded-md text-sm bg-white shadow-sm">所有產業</button>
              <button onClick={() => setIsRightSidebarOpen(true)} className="p-2 border rounded-md text-sm bg-white shadow-sm">產業重點個股</button>
            </div>

            <Link to="/industry-analysis" className="inline-block no-underline text-[#555] font-['Helvetica_Neue',sans-serif] mb-5 transition-colors duration-200 ease-out hover:text-[#1C1D1D] lg:mt-0 mt-[70px]">← 返回產業總覽</Link>

            {report ? (
              <article className="w-full font-['Georgia',serif] text-[#1C1D1D]">
                <header className="mb-10 border-b border-[#E0E0E0] pb-5">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-2.5">{industryName} 產業週報</h1>
                  <div className="flex flex-wrap items-center text-[#888] text-sm mt-4 font-['Helvetica_Neue',sans-serif]">
                    <span className="mr-3 mb-1">By WSGFO Analyst</span>
                    <span className="mr-3 mb-1">{getFormattedDate(report?.generated_at)}</span>
                  </div>
                  <p className="text-lg text-[#666] italic mt-4">{report.preview_summary}</p>
                </header>
                <section className="max-w-none text-base md:text-[1.125rem] leading-loose whitespace-pre-wrap">
                  <p>{report.report_part_1}</p>
                  <p>{report.report_part_2}</p>
                </section>

                {/* Mobile Circular Navigation */}
                <div className="flex justify-between items-center mt-12 pt-6 border-t border-[#E0E0E0] md:hidden">
                  {prevIndustry && (
                    <Link to={`/industry-reports/${prevIndustry.industry_name}`} className="flex flex-col items-start max-w-[45%] text-[#185897] no-underline">
                      <span className="text-xs text-gray-500 mb-1">← 上一篇</span>
                      <span className="text-sm font-semibold line-clamp-2">{prevIndustry.industry_name}</span>
                    </Link>
                  )}
                  {nextIndustry && (
                    <Link to={`/industry-reports/${nextIndustry.industry_name}`} className="flex flex-col items-end max-w-[45%] text-[#185897] no-underline text-right">
                      <span className="text-xs text-gray-500 mb-1">下一篇 →</span>
                      <span className="text-sm font-semibold line-clamp-2">{nextIndustry.industry_name}</span>
                    </Link>
                  )}
                </div>
              </article>
            ) : (
              <div>找不到報告。</div>
            )}
          </main>

          {/* Right Sidebar (Desktop) */}
          <aside className="hidden lg:block sticky top-[100px] self-start h-[calc(100vh-120px)] overflow-y-auto">
            {renderStockTable()}
          </aside>
        </div>
      </div>

      {/* Left Sidebar (Mobile Drawer) */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white z-[1001] shadow-lg transform ${isLeftSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}>
        <div className="p-4">
          <button onClick={() => setIsLeftSidebarOpen(false)} className="absolute top-2 right-2 p-1"><X size={24} /></button>
          {renderIndustryList()}
        </div>
      </aside>

      {/* Right Sidebar (Mobile Drawer) */}
      <aside className={`fixed top-0 right-0 h-full w-80 bg-white z-[1001] shadow-lg transform ${isRightSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}>
        <div className="p-4">
          <button onClick={() => setIsRightSidebarOpen(false)} className="absolute top-2 right-2 p-1"><X size={24} /></button>
          {renderStockTable()}
        </div>
      </aside>

      {/* Overlay */}
      {(isLeftSidebarOpen || isRightSidebarOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[1000] lg:hidden"
          onClick={() => {
            setIsLeftSidebarOpen(false);
            setIsRightSidebarOpen(false);
          }}
        />
      )}

      <Footer />
    </div>
  );
};

export default IndustryReportPage;
