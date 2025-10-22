import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  ArrowRight, 
  TrendingUp, 
  Building, 
  Globe, 
  Heart,
  BookOpen,
  Eye,
  Clock,
  ExternalLink
} from "lucide-react";

interface GhostPost {
  id: string;
  title: string;
  excerpt: string;
  published_at: string;
  reading_time: number;
  url: string;
  feature_image?: string;
  tags?: Array<{ name: string }>;
}

// 預覽內容 - 當 Ghost API 不可用時顯示
const placeholderPosts: GhostPost[] = [
  {
    id: "1",
    title: "2024年家族辦公室投資策略深度分析",
    excerpt: "深入探討全球經濟不確定性下，高淨值家族如何調整投資組合配置，平衡風險與收益，實現長期財富保值增值。",
    published_at: "2024-01-15T00:00:00Z",
    reading_time: 8,
    url: "https://worldsun-family-office.ghost.io",
    feature_image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
    tags: [{ name: "投資策略" }, { name: "風險管理" }]
  },
  {
    id: "2",
    title: "家族治理與企業傳承的最佳實踐",
    excerpt: "分享成功家族企業的治理經驗，從家族憲章制定到下一代培養，構建可持續發展的家族企業生態系統。",
    published_at: "2024-01-12T00:00:00Z",
    reading_time: 6,
    url: "https://worldsun-family-office.ghost.io",
    feature_image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
    tags: [{ name: "家族治理" }, { name: "企業傳承" }]
  },
  {
    id: "3",
    title: "ESG投資趨勢與可持續價值創造",
    excerpt: "解析環境、社會和治理因素在投資決策中的重要性，探討如何通過ESG投資實現財務回報與社會影響的雙重目標。",
    published_at: "2024-01-10T00:00:00Z",
    reading_time: 10,
    url: "https://worldsun-family-office.ghost.io",
    feature_image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop",
    tags: [{ name: "ESG投資" }, { name: "可持續發展" }]
  },
  {
    id: "4",
    title: "全球宏觀經濟視角下的資產配置優化",
    excerpt: "分析當前國際經濟形勢對資產配置的影響，探討在通膨與利率變化環境下的最佳投資組合策略。",
    published_at: "2024-01-08T00:00:00Z",
    reading_time: 7,
    url: "https://worldsun-family-office.ghost.io",
    feature_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    tags: [{ name: "宏觀經濟" }, { name: "資產配置" }]
  },
  {
    id: "5",
    title: "新世代家族傳承：數位化轉型的機遇與挑戰",
    excerpt: "探討數位科技如何重塑家族財富管理模式，從區塊鏈到人工智慧，新興技術為家族傳承帶來的創新解決方案。",
    published_at: "2024-01-05T00:00:00Z",
    reading_time: 9,
    url: "https://worldsun-family-office.ghost.io",
    feature_image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=600&fit=crop",
    tags: [{ name: "數位轉型" }, { name: "科技創新" }]
  },
  {
    id: "6",
    title: "私募股權投資在家族資產組合中的戰略價值",
    excerpt: "深度剖析私募股權投資的特點與優勢，解析如何透過專業盡調與風險控制，在家族投資組合中發揮長期價值創造功能。",
    published_at: "2024-01-03T00:00:00Z",
    reading_time: 12,
    url: "https://worldsun-family-office.ghost.io",
    feature_image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
    tags: [{ name: "私募股權" }, { name: "另類投資" }]
  }
];

const InsightsSection = () => {
  const [posts, setPosts] = useState<GhostPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGhostPosts = async () => {
      try {
        // 請將此處的 API key 替換為你從 Ghost 管理後台獲取的正確 Content API Key
        const GHOST_CONTENT_API_KEY = '5da231137e8c842ad21cd095a1'; // 請更新此 key
        const response = await fetch(
          `https://worldsun-family-office.ghost.io/ghost/api/content/posts/?key=${GHOST_CONTENT_API_KEY}&limit=6&include=tags&formats=html,plaintext`
        );
        
        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts || []);
        } else {
          // 如果 API 失敗，使用預覽內容
          console.log('Ghost API not available, using placeholder content');
          setPosts(placeholderPosts);
        }
      } catch (error) {
        console.error('Error fetching Ghost posts:', error);
        // 如果請求失敗，使用預覽內容
        setPosts(placeholderPosts);
      } finally {
        setLoading(false);
      }
    };

    fetchGhostPosts();
  }, []);

  const getRandomIcon = () => {
    const icons = [TrendingUp, Building, Globe, Heart, BookOpen];
    return icons[Math.floor(Math.random() * icons.length)];
  };

  const getTagStyle = (tagName: string) => {
    // 投資管理標籤使用綠色
    if (tagName === '投資管理') {
      return "px-2 py-1 text-xs rounded-full bg-secondary/10 text-secondary border border-secondary/20";
    } 
    // 家族傳承標籤使用紅色
    else if (tagName === '家族傳承') {
      return "px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20";
    } 
    // 其他標籤使用金色
    else {
      return "px-2 py-1 text-xs rounded-full bg-accent/10 text-accent border border-accent/20";
    }
  };

  return (
    <section id="insights" className="py-20 bg-muted/20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center space-x-4 mb-8">
            <div className="w-8 h-0.5 bg-secondary"></div>
            <span className="text-sm text-muted-foreground tracking-widest uppercase">Featured Insights</span>
            <div className="w-8 h-0.5 bg-primary"></div>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold font-playfair mb-6 text-foreground">
            精選洞察
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            專業投資觀點與家族傳承智慧
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="h-full shadow-card border-0 bg-card/60 backdrop-blur-sm">
                <div className="h-48 bg-secondary/10 animate-pulse" />
                <CardHeader className="pb-3">
                  <div className="h-6 bg-muted animate-pulse rounded" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-muted animate-pulse rounded" />
                    <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Ghost Posts Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.map((post, index) => {
              const RandomIcon = getRandomIcon();
              return (
                <Card 
                  key={post.id}
                  className="group h-full shadow-card hover:shadow-luxury transition-smooth hover:-translate-y-3 border-0 bg-card/60 backdrop-blur-sm animate-fade-in-up cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => window.open(post.url, '_blank', 'noopener,noreferrer')}
                >
                  {/* Post Image */}
                  <div className="relative overflow-hidden h-48">
                    {post.feature_image ? (
                      <img 
                        src={post.feature_image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-secondary/10 flex items-center justify-center">
                        <RandomIcon className="w-16 h-16 text-primary/40" />
                      </div>
                    )}
                    {/* External Link Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="border-accent/20 text-accent bg-accent/10">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Ghost
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <h3 className="text-xl font-bold font-playfair line-clamp-2 group-hover:text-primary transition-smooth">
                      {post.title}
                    </h3>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground line-clamp-3 leading-relaxed text-sm">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                         {post.tags.slice(0, 2).map((tag, tagIndex) => (
                           <span 
                             key={tagIndex}
                             className={getTagStyle(tag.name)}
                           >
                             {tag.name}
                           </span>
                         ))}
                      </div>
                    )}

                    {/* Article Meta */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border/50">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span className="text-xs">
                            {new Date(post.published_at).toLocaleDateString('zh-TW')}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span className="text-xs">{post.reading_time} 分鐘</span>
                        </div>
                      </div>
                    </div>

                    {/* Read More Button */}
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="w-full group-hover:bg-primary group-hover:text-white transition-smooth"
                    >
                      閱讀全文
                      <ArrowRight className="ml-2 w-3 h-3" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center animate-scale-in">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl"></div>
            <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 shadow-luxury rounded-2xl p-8 max-w-md mx-auto">
              <h3 className="text-xl font-bold font-playfair mb-4 text-primary">
                探索更多洞察
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                深入了解投資策略與傳承智慧
              </p>
              <Button 
                size="lg" 
                className="bg-primary text-white hover:bg-primary/90 border-0 shadow-elegant group"
                onClick={() => window.open('https://worldsun-family-office.ghost.io', '_blank', 'noopener,noreferrer')}
              >
                查看所有文章
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;