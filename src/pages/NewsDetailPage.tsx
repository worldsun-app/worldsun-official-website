import { useParams, Navigate, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { newsData } from "@/data/newsData";
import { ArrowLeft, Facebook } from "lucide-react";

const NewsDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const article = newsData.find((a) => a.id === id);

  if (!article) {
    return <Navigate to="/news" replace />;
  }

  // Helper to format text with paragraphs
  const formatContent = (text: string) => {
    return text.split('\n').map((paragraph, idx) => (
      paragraph.trim() ? <p key={idx} className="mb-6 leading-relaxed text-foreground/80 text-lg">{paragraph}</p> : null
    ));
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SEO
        title={`${article.title} | 沃勝家族辦公室`}
        description={article.summary}
      />
      <Header />

      <main className="flex-grow pt-24 pb-16 px-4 md:px-8 max-w-4xl mx-auto w-full">
        {/* Back Button */}
        <Link
          to="/news"
          className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回列表
        </Link>

        {/* Article Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground">
            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full">{article.source || "News"}</span>
            <span>{article.date}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-playfair font-bold text-black leading-tight mb-6">
            {article.title}
          </h1>
        </header>

        {/* Article Thumbnail */}
        <div className="aspect-video relative rounded-2xl overflow-hidden mb-12 shadow-2xl">
          <img
            src={article.thumbnail}
            alt={article.title}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Article Content */}
        <article className="prose max-w-none mb-16">
          <div className="text-xl text-primary/90 font-medium mb-8 leading-relaxed border-l-4 border-primary pl-4">
            {article.summary}
          </div>

          <div className="text-black/90">
            {article.isHtml ? (
              <div
                dangerouslySetInnerHTML={{ __html: article.content }}
                className="space-y-6 text-lg [&>p]:leading-relaxed [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:mt-10 [&>h3]:mb-4 [&>h3]:text-black [&>p>img]:w-full [&>p>img]:rounded-xl [&>p>img]:my-8 [&>img]:w-full [&>img]:rounded-xl [&>img]:my-8"
              />
            ) : (
              formatContent(article.content)
            )}
          </div>
        </article>

        {/* Media Embeds */}
        <div className="space-y-12 border-t border-black/10 pt-12">
          <h2 className="text-2xl font-bold text-black mb-6">相關影音與社群</h2>

          {/* YouTube Embed */}
          <div className="w-full bg-black/20 rounded-xl p-4 md:p-8 flex justify-center">
            <div className="w-full max-w-3xl aspect-video relative overflow-hidden rounded-lg shadow-lg">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/5EtIAkRKLcs"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Instagram Embed */}
            <div className="relative w-full h-[600px] flex justify-center items-center bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-black/5 overflow-hidden">
              {/* Top Gradient Bar for Branding */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] z-20" />
              <iframe
                src="https://www.instagram.com/p/DTxZ-p7DTX1/embed"
                className="w-full max-w-[450px] h-full relative z-10"
                frameBorder="0"
                scrolling="no"
                allowTransparency={true}
              ></iframe>
            </div>

            {/* Facebook Embed */}
            <div className="relative w-full h-[600px] flex justify-center items-center bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-black/5 overflow-hidden">
              {/* Top Blue Bar for Branding */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[#1877F2] z-20" />
              
              {/* Subtle Watermarks to decorate whitespace */}
              <Facebook strokeWidth={1.5} className="absolute -top-8 -right-8 w-40 h-40 text-black/[0.02] pointer-events-none z-0" />
              <Facebook strokeWidth={1.5} className="absolute -bottom-8 -left-8 w-40 h-40 text-black/[0.02] pointer-events-none z-0" />

              <iframe
                src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fverse.com.tw%2Fposts%2Fpfbid0pkWQrw8MnEUJNpQZTaAim1szuUap15D7Aa6EDVaLSNU2wx6WcdbH3mV6cMwmhUh1l&show_text=false&width=450"
                className="w-full max-w-[450px] h-[490px] relative z-10"
                style={{ border: 'none', overflow: 'hidden', backgroundColor: 'transparent' }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                allowTransparency={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewsDetailPage;
