import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { newsData } from "@/data/newsData";

const NewsPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SEO
        title="相關報導 | 沃勝家族辦公室"
        description="追蹤沃勝聯合家族辦公室的最新相關報導與活動紀實。"
      />
      <Header />

      <main className="flex-grow pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="mb-12 text-center flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl font-playfair font-bold text-black mb-4">相關報導</h1>
          <p className="text-muted-foreground text-lg text-center max-w-2xl mx-auto">探索沃勝家族辦公室的最新動態與深度報導</p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {newsData.map((news) => (
            <Link
              key={news.id}
              to={`/news/${news.id}`}
              className="w-full max-w-[400px] group block rounded-xl overflow-hidden bg-white/5 border border-black/10 hover:border-primary/50 hover:bg-black/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={news.thumbnail}
                  alt={news.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-4 text-xs text-muted-foreground">
                  <span className="bg-primary/20 text-primary px-3 py-1 rounded-full font-medium">{news.source || "News"}</span>
                  <span>{news.date}</span>
                </div>
                <h2 className="text-xl font-bold text-black mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {news.title}
                </h2>
                <p className="text-sm text-foreground/80 line-clamp-3">
                  {news.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewsPage;
