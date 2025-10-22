-- 修正 generate_slug 函數的 search_path 安全問題
CREATE OR REPLACE FUNCTION public.generate_slug(title TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  slug TEXT;
  counter INTEGER := 0;
  final_slug TEXT;
BEGIN
  -- 基本 slug 生成
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