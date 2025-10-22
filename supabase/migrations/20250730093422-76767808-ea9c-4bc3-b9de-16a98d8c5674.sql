-- 創建文章分類枚舉
CREATE TYPE public.article_category AS ENUM ('investment', 'heritage', 'market', 'education', 'news');

-- 創建文章狀態枚舉
CREATE TYPE public.article_status AS ENUM ('draft', 'published', 'archived');

-- 創建文章表
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category public.article_category NOT NULL,
  tags TEXT[],
  featured BOOLEAN DEFAULT false,
  status public.article_status DEFAULT 'draft',
  member_only BOOLEAN DEFAULT false,
  author_id UUID NOT NULL REFERENCES auth.users(id),
  read_time INTEGER DEFAULT 5,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 啟用 RLS
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- 創建 RLS 政策
-- 所有人都可以查看已發布的文章
CREATE POLICY "Anyone can view published articles" 
ON public.articles 
FOR SELECT 
USING (status = 'published');

-- 管理員可以查看所有文章
CREATE POLICY "Admins can view all articles" 
ON public.articles 
FOR SELECT 
USING (public.is_admin());

-- 管理員可以管理所有文章
CREATE POLICY "Admins can manage articles" 
ON public.articles 
FOR ALL 
USING (public.is_admin());

-- 創建觸發器來自動更新時間戳
CREATE TRIGGER update_articles_updated_at
BEFORE UPDATE ON public.articles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- 創建函數來生成 slug
CREATE OR REPLACE FUNCTION public.generate_slug(title TEXT)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  slug TEXT;
  counter INTEGER := 0;
  final_slug TEXT;
BEGIN
  -- 基本 slug 生成（簡化版，實際應用中可能需要更複雜的邏輯）
  slug := lower(trim(title));
  slug := regexp_replace(slug, '[^a-z0-9\u4e00-\u9fff]+', '-', 'g');
  slug := trim(slug, '-');
  
  final_slug := slug;
  
  -- 檢查 slug 是否已存在，如果存在則添加數字後綴
  WHILE EXISTS (SELECT 1 FROM public.articles WHERE slug = final_slug) LOOP
    counter := counter + 1;
    final_slug := slug || '-' || counter;
  END LOOP;
  
  RETURN final_slug;
END;
$$;

-- 插入一些範例文章
INSERT INTO public.articles (title, slug, excerpt, content, category, tags, featured, status, member_only, author_id, published_at) VALUES
('財富傳承的智慧策略', 'wealth-inheritance-strategy', '探討跨世代財富傳承的核心策略與實務經驗', '# 財富傳承的智慧策略

財富傳承不僅僅是資產的轉移，更是智慧與價值觀的傳遞。

## 核心原則

1. **及早規劃**：財富傳承需要長期規劃
2. **家族治理**：建立良好的家族治理結構
3. **教育傳承**：培養下一代的財務素養

## 實務建議

- 制定家族憲章
- 設立家族信託
- 定期家族會議

*此為會員專屬內容預覽，完整內容需要會員權限。*', 'heritage', ARRAY['財富傳承', '家族治理'], true, 'published', true, (SELECT id FROM auth.users LIMIT 1), now()),

('2024 投資市場展望', '2024-investment-outlook', '分析2024年全球投資市場趨勢與機會', '# 2024 投資市場展望

回顧2023年，展望2024年的投資機會。

## 市場趨勢

1. **科技股復甦**
2. **新興市場機會**
3. **ESG投資興起**

完整的市場分析與投資建議...', 'investment', ARRAY['投資', '市場分析'], true, 'published', false, (SELECT id FROM auth.users LIMIT 1), now()),

('家族辦公室服務指南', 'family-office-guide', '了解家族辦公室的核心服務與價值', '# 家族辦公室服務指南

家族辦公室為高淨值家族提供全方位的財富管理服務。

## 服務範疇

- 投資管理
- 財富規劃
- 家族治理
- 慈善規劃

詳細的服務介紹...', 'heritage', ARRAY['家族辦公室', '財富管理'], false, 'published', false, (SELECT id FROM auth.users LIMIT 1), now());