import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { User, Settings, Crown, Award, Phone, Mail, FileText, Home } from 'lucide-react';

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

export default function Member() {
  const { user, signOut, loading } = useAuth();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profileForm, setProfileForm] = useState({
    display_name: '',
    phone: '',
    bio: '',
    avatar_url: ''
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
      return;
    }

    if (user) {
      fetchProfile();
    }
  }, [user, loading, navigate]);

  const fetchProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      toast.error('無法獲取個人資料');
      return;
    }

    if (data) {
      setProfile(data);
      setProfileForm({
        display_name: data.display_name || '',
        phone: data.phone || '',
        bio: data.bio || '',
        avatar_url: data.avatar_url || ''
      });
    }
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);

    const { error } = await supabase
      .from('profiles')
      .update({
        display_name: profileForm.display_name,
        phone: profileForm.phone,
        bio: profileForm.bio,
        avatar_url: profileForm.avatar_url
      })
      .eq('user_id', user.id);

    if (error) {
      toast.error('更新失敗：' + error.message);
    } else {
      toast.success('個人資料已更新！');
      fetchProfile();
    }

    setIsLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getMemberLevelInfo = (level: string) => {
    switch (level) {
      case 'vip':
        return { label: 'VIP會員', color: 'bg-gradient-to-r from-yellow-400 to-yellow-600', icon: Crown };
      case 'premium':
        return { label: '高級會員', color: 'bg-gradient-to-r from-purple-400 to-purple-600', icon: Award };
      default:
        return { label: '基本會員', color: 'bg-gradient-to-r from-blue-400 to-blue-600', icon: User };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p>載入中...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const memberInfo = getMemberLevelInfo(profile?.member_level || 'basic');
  const MemberIcon = memberInfo.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">會員專區</h1>
            <p className="text-muted-foreground">管理您的個人資料和帳戶設定</p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => navigate('/')} className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              回到首頁
            </Button>
            {isAdmin && (
              <div className="flex gap-2">
                <Button variant="default" onClick={() => navigate('/blog-admin')}>
                  部落格管理
                </Button>
                <Button variant="outline" onClick={() => navigate('/admin')}>
                  系統管理
                </Button>
              </div>
            )}
            <Button variant="outline" onClick={handleSignOut}>
              登出
            </Button>
          </div>
        </div>

        {/* Profile Overview */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile?.avatar_url || ''} />
                <AvatarFallback className="text-lg">
                  {profile?.display_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold">
                  {profile?.display_name || '未設定姓名'}
                </h2>
                <p className="text-muted-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={`${memberInfo.color} text-white`}>
                    <MemberIcon className="h-4 w-4 mr-1" />
                    {memberInfo.label}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">個人資料</TabsTrigger>
            <TabsTrigger value="settings">帳戶設定</TabsTrigger>
            <TabsTrigger value="membership">會員福利</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  個人資料
                </CardTitle>
                <CardDescription>
                  更新您的個人資料和聯絡資訊
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={updateProfile} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="display_name">顯示名稱</Label>
                      <Input
                        id="display_name"
                        value={profileForm.display_name}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, display_name: e.target.value }))}
                        placeholder="請輸入您的姓名"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">電話號碼</Label>
                      <Input
                        id="phone"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="請輸入您的電話號碼"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="avatar_url">頭像網址</Label>
                    <Input
                      id="avatar_url"
                      value={profileForm.avatar_url}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, avatar_url: e.target.value }))}
                      placeholder="請輸入頭像圖片網址"
                      type="url"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">個人簡介</Label>
                    <Textarea
                      id="bio"
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="請輸入個人簡介"
                      rows={4}
                    />
                  </div>
                  
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? '更新中...' : '更新資料'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  帳戶設定
                </CardTitle>
                <CardDescription>
                  管理您的帳戶安全性和偏好設定
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>電子郵件</Label>
                    <Input value={user.email || ''} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>註冊時間</Label>
                    <Input 
                      value={profile?.created_at ? new Date(profile.created_at).toLocaleDateString('zh-TW') : ''}
                      disabled 
                    />
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <Button variant="destructive" onClick={handleSignOut}>
                    登出帳戶
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="membership">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5" />
                  會員福利
                </CardTitle>
                <CardDescription>
                  了解您的會員等級和專屬福利
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
                  <MemberIcon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">{memberInfo.label}</h3>
                  <p className="text-muted-foreground">您目前的會員等級</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="text-center">
                    <CardContent className="p-4">
                      <User className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                      <h4 className="font-semibold">基本會員</h4>
                      <p className="text-sm text-muted-foreground">基礎服務</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="text-center">
                    <CardContent className="p-4">
                      <Award className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                      <h4 className="font-semibold">高級會員</h4>
                      <p className="text-sm text-muted-foreground">進階功能</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="text-center">
                    <CardContent className="p-4">
                      <Crown className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                      <h4 className="font-semibold">VIP會員</h4>
                      <p className="text-sm text-muted-foreground">專屬服務</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}