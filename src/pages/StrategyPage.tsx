import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Plot from "react-plotly.js";
import { ReactNode, useRef, useState, useEffect } from "react";

import { useDebounce } from "@/hooks/useDebounce";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface RiskFrameworkItem {
  icon: string;
  title: string;
  desc: string;
}

interface StrategyIntroData {
  strategy_name: string;
  description: string;
  info_table: [string, string][];
  philosophy: string[];
  asset_allocation_chart: string;
  sector_allocation_chart: string;
  components_bar_chart: string;
  risk_framework: RiskFrameworkItem[];
}

interface StrategyPerformanceData {
  strategy_name: string;
  performance_metrics: Record<string, string>;
  performance_chart: string;
  heatmap_chart: string;
}

// API 基礎 URL
const API_BASE_URL = "https://investment-dashboard.zeabur.app/api";

// --- Custom Hook for Resizing ---
const usePlotlyResize = (ref: React.RefObject<HTMLDivElement>) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const debouncedDimensions = useDebounce(dimensions, 200);

  useEffect(() => {
    const getDimensions = () => ({
      width: ref.current?.offsetWidth || 0,
      height: ref.current?.offsetHeight || 0,
    });

    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (ref.current) {
      setDimensions(getDimensions());
    }

    const resizeObserver = new ResizeObserver(handleResize);
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);

  return debouncedDimensions;
};


// --- 通用元件 ---

const PlotlyChart = ({ chartJson }: { chartJson: string }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const { width, height } = usePlotlyResize(chartRef);

  if (!chartJson) return null;
  try {
    const chartData = JSON.parse(chartJson);
    if (chartData.layout) {
        chartData.layout.paper_bgcolor = 'rgba(0,0,0,0)';
        chartData.layout.plot_bgcolor = 'rgba(0,0,0,0)';
        chartData.layout.width = width;
        chartData.layout.height = height;
    }
    return (
      <div ref={chartRef} style={{ width: "100%", height: "100%" }}>
        <Plot
          data={chartData.data}
          layout={chartData.layout}
          style={{ width: "100%", height: "100%" }}
          config={{ displayModeBar: false }}
        />
      </div>
    );
  } catch (error) {
    console.error("Failed to parse chart JSON:", error);
    return <div className="text-red-500">無法渲染圖表。</div>;
  }
};

// --- 頁籤內容元件 ---

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const StrategyIntro = ({ strategyName }: { strategyName: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["strategyIntro", strategyName],
    queryFn: async (): Promise<StrategyIntroData> => {
      const response = await axios.get<StrategyIntroData>(`${API_BASE_URL}/strategies/${strategyName}/intro`);
      return response.data;
    },
  });

  if (isLoading) return <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><Skeleton className="w-full h-64" /><Skeleton className="w-full h-64" /></div>;
  if (isError) return <div className="text-red-500">無法載入基金介紹資料。</div>;
  if (!data) return null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Card className="lg:col-span-3">
          <CardHeader><CardTitle className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-md">基金理念與投資重點</CardTitle></CardHeader>
          <CardContent>
            <p className="mb-3">{data.description}</p>
            <ul className="list-disc pl-5 space-y-1">
              {data.philosophy.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-md">基本資料</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                {data.info_table.map(([key, value], index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{key}</TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-md">資產與產業配置現況</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="min-h-[200px] aspect-video">
              <PlotlyChart chartJson={data.asset_allocation_chart} />
            </div>
            <div className="min-h-[200px] aspect-video">
              <PlotlyChart chartJson={data.sector_allocation_chart} />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-md">成分股累積報酬</CardTitle></CardHeader>
        <CardContent className="h-96">
          <PlotlyChart chartJson={data.components_bar_chart} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-md">風險管理框架</CardTitle></CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">本基金堅持風險優先，採多層次控管，確保長期穩健收益。重點如下：</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.risk_framework.map((item, index) => (
              <Card key={index} className="h-full shadow-sm">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-primary mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const StrategyPerformance = ({ strategyName }: { strategyName: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["strategyPerformance", strategyName],
    queryFn: async (): Promise<StrategyPerformanceData> => {
      const response = await axios.get<StrategyPerformanceData>(`${API_BASE_URL}/strategies/${strategyName}/performance`);
      return response.data;
    },
  });

  if (isLoading) return <div className="grid grid-cols-1 gap-4"><Skeleton className="w-full h-96" /><Skeleton className="w-full h-64" /></div>;
  if (isError) return <div className="text-red-500">無法載入績效分析資料。</div>;
  if (!data) return null;

  const allMetrics = data.performance_metrics || {};

  // 定義關鍵績效指標和統計摘要的鍵
  const keyPerformanceIndicators = [
    "annualized_return",
    "volatility",
    "sharpe_ratio",
    "max_drawdown",
    "alpha",
    "beta",
  ];

  const statisticalSummaryMetrics = [
    "total_return",
    "best_month",
    "worst_month",
    "pos_month_pct",
    "corr",
  ];

  const kpiMetrics = Object.entries(allMetrics).filter(([key]) =>
    keyPerformanceIndicators.includes(key)
  );

  const summaryMetrics = Object.entries(allMetrics).filter(([key]) =>
    statisticalSummaryMetrics.includes(key)
  );

  // 為了匹配原始 Dash 應用中的標籤，手動映射
  const metricLabels: Record<string, string> = {
    annualized_return: "年化報酬",
    volatility: "波動度",
    sharpe_ratio: "夏普值",
    max_drawdown: "最大回檔",
    alpha: "Monthly Alpha",
    beta: "Beta",
    total_return: "累積總報酬",
    best_month: "最佳單月",
    worst_month: "最差單月",
    pos_month_pct: "正報酬月數比",
    corr: "與大盤相關性",
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-md">關鍵績效指標</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {kpiMetrics.map(([key, value]) => (
              <div key={key} className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <div className="text-2xl font-bold">{value as ReactNode}</div>
                <div className="text-sm text-muted-foreground capitalize">{metricLabels[key] || key.replace(/_/g, ' ')}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-md">基金績效與指標比較</CardTitle></CardHeader>
        <CardContent className="h-96">
          <PlotlyChart chartJson={data.performance_chart} />
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <Card className="lg:col-span-8">
          <CardHeader><CardTitle className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-md">月報酬熱力圖</CardTitle></CardHeader>
          <CardContent className="h-72">
            <PlotlyChart chartJson={data.heatmap_chart} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-4">
          <CardHeader><CardTitle className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-md">統計摘要</CardTitle></CardHeader>
          <CardContent className="h-72">
            <Table>
              <TableBody>
                {summaryMetrics.map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell className="font-medium">{metricLabels[key] || key.replace(/_/g, ' ')}</TableCell>
                    <TableCell className="text-right font-bold">{value as ReactNode}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// --- 主要頁面元件 ---

const StrategyPage = () => {
  const { strategyName } = useParams<{ strategyName: string }>();

  if (!strategyName) {
    return (
      <>
        <Header />
        <main className="flex-grow container mx-auto px-6 pt-20 pb-12">
          <div className="text-center">無效的策略名稱。</div>
        </main>
        <Footer />
      </>
    );
  }

  const formattedTitle = strategyName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <>
      <Header />
      <main className="flex-grow bg-muted/20 pt-20 pb-12">
        <div className="container mx-auto p-4">
          <Tabs defaultValue="intro">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
                <h1 className="text-3xl font-bold">{formattedTitle}</h1>
                <TabsList>
                  <TabsTrigger value="intro">基金介紹</TabsTrigger>
                  <TabsTrigger value="perf">績效分析</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="intro" className="mt-4">
              <StrategyIntro strategyName={strategyName} />
            </TabsContent>
            <TabsContent value="perf" className="mt-4">
              <StrategyPerformance strategyName={strategyName} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default StrategyPage;
