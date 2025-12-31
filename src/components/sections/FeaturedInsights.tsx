import { useQuery } from "@tanstack/react-query";
import { getLatestPosts, GhostPost } from "@/lib/ghost";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const FeaturedInsights = () => {
    const { data: posts, isLoading, error } = useQuery({
        queryKey: ['latest-posts'],
        queryFn: () => getLatestPosts(6),
    });

    if (isLoading) {
        return (
            <section className="py-20 bg-muted/20 min-h-[400px] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </section>
        );
    }

    if (error || !posts || posts.length === 0) {
        console.log("No posts found or error:", error);
        return null;
    }

    return (
        <section id="featured-insights" className="py-20 bg-muted/20">
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

                {/* Posts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {posts.map((post: GhostPost, index: number) => (
                        <motion.a
                            key={post.id}
                            href={post.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -12 }}
                            transition={{ delay: index * 0.01, duration: 0.1 }}
                            className="group relative h-full shadow-card hover:shadow-luxury transition-all duration-300 border-0 bg-card/60 backdrop-blur-sm hover:bg-primary/5 rounded-2xl overflow-hidden flex flex-col cursor-pointer block"
                        >
                            {/* Image */}
                            {post.feature_image && (
                                <div className="aspect-video w-full overflow-hidden">
                                    <img
                                        src={post.feature_image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            )}

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow">
                                {post.tags && post.tags.length > 0 && (
                                    <div className="mb-4">
                                        <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                                            {post.tags[0].name}
                                        </span>
                                    </div>
                                )}

                                <h3 className="text-xl font-bold font-playfair mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                    {post.title}
                                </h3>

                                <p className="text-muted-foreground text-sm mb-6 line-clamp-3 flex-grow">
                                    {post.custom_excerpt || post.excerpt}
                                </p>

                                <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                                    <span className="text-xs text-muted-foreground">
                                        {new Date(post.published_at).toLocaleDateString('zh-TW')}
                                    </span>
                                    <span
                                        className="inline-flex items-center text-sm font-medium text-primary group-hover:text-primary/80 transition-colors"
                                    >
                                        閱讀更多
                                        <ArrowRight className="ml-1 w-4 h-4" />
                                    </span>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-20 animate-scale-in">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-xl"></div>
                        <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 shadow-luxury rounded-2xl p-8 max-w-md mx-auto">
                            <h4 className="text-xl font-bold font-playfair mb-4 text-primary">
                                探索更多洞察
                            </h4>
                            <p className="text-muted-foreground text-sm mb-6">
                                深入了解投資策略與傳承智慧
                            </p>
                            <Button
                                asChild
                                size="lg"
                                className="bg-primary text-white hover:bg-primary/90 border-0 shadow-elegant group"
                            >
                                <a href="https://insights.wsgfo.com/" target="_blank">
                                    查看所有文章
                                    <ArrowRight className="lucide lucide-arrow-right ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedInsights;
