import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const contactInfo = [
    {
      icon: MapPin,
      title: "辦公地址",
      content: "台北市大安區敦化南路二段76號5樓之2",
      subContent: ""
    },
    {
      icon: Phone,
      title: "聯絡電話",
      content: "+886 2 7705-3298",
      subContent: "服務專線（週一至週五）"
    },
    {
      icon: Mail,
      title: "電子信箱",
      content: "service@wsgfo.com",
      subContent: "將於24小時內回覆"
    },
    {
      icon: Clock,
      title: "服務時間",
      content: "週一至週五 09:00-18:00",
      subContent: "週六預約制諮詢"
    }
  ];

  const services = [
    "資產配置管理",
    "家族傳承規劃",
    "投資諮詢服務",
    "家族治理建議",
    "風險管理策略",
    "其他服務"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 模擬表單提交
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "諮詢申請已送出",
      description: "我們將於24小時內與您聯繫，感謝您的信任！",
    });

    // 重置表單
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: ""
    });

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 bg-muted/20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold font-playfair mb-4">
            聯絡我們
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8 animate-fade-in-up">
            <div>
              <h3 className="text-2xl font-bold font-playfair mb-6">聯絡資訊</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <Card 
                      key={index}
                      className="shadow-card hover:shadow-luxury transition-smooth hover:-translate-y-1"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">{info.title}</h4>
                            <p className="text-foreground font-medium">{info.content}</p>
                            <p className="text-sm text-muted-foreground">{info.subContent}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <Card className="shadow-luxury animate-slide-in-right bg-white rounded-2xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-secondary font-playfair mb-4">預約免費諮詢</CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-secondary font-medium">姓名</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="請輸入您的姓名"
                    className="h-12 border-border focus:border-secondary focus:ring-secondary/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-secondary font-medium">電話</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="請輸入您的聯絡電話"
                    className="h-12 border-border focus:border-secondary focus:ring-secondary/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-secondary font-medium">電子信箱</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="請輸入您的電子信箱"
                    className="h-12 border-border focus:border-secondary focus:ring-secondary/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-secondary font-medium">諮詢需求</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="請簡述您的財富管理需求"
                    rows={5}
                    className="border-border focus:border-secondary focus:ring-secondary/20"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white rounded-md font-medium text-base shadow-lg disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      送出中...
                    </>
                  ) : (
                    "提交諮詢申請"
                  )}
                </Button>

                <p className="text-sm text-muted-foreground text-center mt-4">
                  * 我們將在24小時內與您聯繫
                </p>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* CTA Banner */}
      </div>
    </section>
  );
};

export default ContactSection;