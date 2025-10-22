-- 刪除舊的 RLS 政策
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;

-- 創建新的 RLS 政策，允許用戶為自己設置角色（如果還沒有管理員）或者管理員管理所有角色
CREATE POLICY "Users can insert admin role or admins can manage all" 
ON public.user_roles 
FOR INSERT 
WITH CHECK (
  -- 如果沒有任何管理員存在，允許任何用戶為自己設置管理員角色
  (NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') AND user_id = auth.uid())
  OR 
  -- 或者當前用戶是管理員
  public.is_admin()
);

-- 創建政策允許管理員更新和刪除角色
CREATE POLICY "Admins can update roles" 
ON public.user_roles 
FOR UPDATE 
USING (public.is_admin());

CREATE POLICY "Admins can delete roles" 
ON public.user_roles 
FOR DELETE 
USING (public.is_admin());