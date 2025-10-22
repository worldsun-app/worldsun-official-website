import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { 
  Shield, 
  Users, 
  Crown, 
  Award, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  Settings,
  AlertTriangle 
} from 'lucide-react';

interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  member_level: 'basic' | 'premium' | 'vip';
  phone: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

interface UserWithProfile {
  id: string;
  email: string;
  created_at: string;
  profiles: Profile;
  user_roles: Array<{ role: string }>;
}

export default function AdminPanel() {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserWithProfile | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
      return;
    }

    if (isAdmin) {
      fetchUsers();
    }
  }, [user, isAdmin, authLoading, adminLoading, navigate]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // 先獲取所有 profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) {
        toast.error('獲取用戶列表失敗：' + profilesError.message);
        return;
      }

      // 再獲取用戶角色
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) {
        console.error('Error fetching roles:', rolesError);
      }

      // 組合數據
      const usersData: UserWithProfile[] = profilesData?.map(profile => ({
        id: profile.user_id,
        email: '', // 無法從 auth.users 獲取，因為 RLS 限制
        created_at: profile.created_at,
        profiles: profile,
        user_roles: rolesData?.filter(role => role.user_id === profile.user_id)
          .map(role => ({ role: role.role })) || []
      })) || [];

      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('獲取用戶列表失敗');
    }
    setLoading(false);
  };

  const updateMemberLevel = async (userId: string, newLevel: 'basic' | 'premium' | 'vip') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ member_level: newLevel })
        .eq('user_id', userId);

      if (error) {
        toast.error('更新會員等級失敗：' + error.message);
        return;
      }

      toast.success('會員等級已更新');
      fetchUsers();
    } catch (error) {
      console.error('Error updating member level:', error);
      toast.error('更新會員等級失敗');
    }
  };

  const toggleAdminRole = async (userId: string, isCurrentlyAdmin: boolean) => {
    try {
      if (isCurrentlyAdmin) {
        const { error } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', userId)
          .eq('role', 'admin');

        if (error) {
          toast.error('移除管理員權限失敗：' + error.message);
          return;
        }
        toast.success('已移除管理員權限');
      } else {
        const { error } = await supabase
          .from('user_roles')
          .insert([{ user_id: userId, role: 'admin' }]);

        if (error) {
          toast.error('授予管理員權限失敗：' + error.message);
          return;
        }
        toast.success('已授予管理員權限');
      }

      fetchUsers();
    } catch (error) {
      console.error('Error toggling admin role:', error);
      toast.error('操作失敗');
    }
  };

  const getMemberLevelInfo = (level: string) => {
    switch (level) {
      case 'vip':
        return { label: 'VIP', color: 'bg-yellow-500', icon: Crown };
      case 'premium':
        return { label: '高級', color: 'bg-purple-500', icon: Award };
      default:
        return { label: '基本', color: 'bg-blue-500', icon: User };
    }
  };

  const setupFirstAdmin = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('user_roles')
        .insert([{ user_id: user.id, role: 'admin' }]);

      if (error) {
        toast.error('設置管理員失敗：' + error.message);
        return;
      }

      toast.success('您已成為管理員！請重新整理頁面。');
      window.location.reload();
    } catch (error) {
      console.error('Error setting up admin:', error);
      toast.error('設置管理員失敗');
    }
  };

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p>載入中...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <CardTitle>需要管理員權限</CardTitle>
            <CardDescription>
              如果您是第一位用戶，可以點擊下方按鈕設置為管理員
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={setupFirstAdmin} variant="outline">
              設置為管理員
            </Button>
            <Button onClick={() => navigate('/member')} variant="ghost">
              返回會員專區
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              管理員面板
            </h1>
            <p className="text-muted-foreground">管理所有會員和系統設定</p>
          </div>
          <div className="flex gap-2">
            <Button variant="default" onClick={() => navigate('/blog-admin')}>
              部落格管理
            </Button>
            <Button variant="outline" onClick={() => navigate('/member')}>
              返回會員專區
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">總會員數</p>
                  <p className="text-2xl font-bold">{users.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">VIP會員</p>
                  <p className="text-2xl font-bold">
                    {users.filter(u => u.profiles?.member_level === 'vip').length}
                  </p>
                </div>
                <Crown className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">高級會員</p>
                  <p className="text-2xl font-bold">
                    {users.filter(u => u.profiles?.member_level === 'premium').length}
                  </p>
                </div>
                <Award className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">管理員</p>
                  <p className="text-2xl font-bold">
                    {users.filter(u => u.user_roles?.some(r => r.role === 'admin')).length}
                  </p>
                </div>
                <Shield className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Members Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              會員管理
            </CardTitle>
            <CardDescription>
              查看和管理所有會員資料
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                <p>載入中...</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>會員</TableHead>
                    <TableHead>會員等級</TableHead>
                    <TableHead>電話</TableHead>
                    <TableHead>註冊日期</TableHead>
                    <TableHead>權限</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => {
                    const memberInfo = getMemberLevelInfo(user.profiles?.member_level || 'basic');
                    const MemberIcon = memberInfo.icon;
                    const isCurrentlyAdmin = user.user_roles?.some(r => r.role === 'admin');
                    
                    return (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={user.profiles?.avatar_url || ''} />
                              <AvatarFallback>
                                {user.profiles?.display_name?.charAt(0) || 'U'}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {user.profiles?.display_name || '未設定姓名'}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                ID: {user.id.substring(0, 8)}...
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <Select
                            value={user.profiles?.member_level || 'basic'}
                            onValueChange={(value: 'basic' | 'premium' | 'vip') => 
                              updateMemberLevel(user.id, value)
                            }
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="basic">基本</SelectItem>
                              <SelectItem value="premium">高級</SelectItem>
                              <SelectItem value="vip">VIP</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        
                        <TableCell>
                          {user.profiles?.phone || '未提供'}
                        </TableCell>
                        
                        <TableCell>
                          {new Date(user.created_at).toLocaleDateString('zh-TW')}
                        </TableCell>
                        
                        <TableCell>
                          {isCurrentlyAdmin ? (
                            <Badge variant="destructive">管理員</Badge>
                          ) : (
                            <Badge variant="secondary">一般用戶</Badge>
                          )}
                        </TableCell>
                        
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleAdminRole(user.id, isCurrentlyAdmin)}
                          >
                            {isCurrentlyAdmin ? '移除管理員' : '設為管理員'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}