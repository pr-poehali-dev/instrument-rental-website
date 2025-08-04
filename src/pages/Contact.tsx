import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Icon from '@/components/ui/icon';
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const offices = [
    {
      city: 'Москва',
      address: 'ул. Строительная, 15к2',
      phone: '+7 (495) 123-45-67',
      email: 'moscow@technorent.ru',
      hours: 'Пн-Пт: 8:00-20:00, Сб: 9:00-18:00',
      isMain: true
    },
    {
      city: 'Санкт-Петербург',
      address: 'пр. Индустриальный, 42',
      phone: '+7 (812) 987-65-43',
      email: 'spb@technorent.ru',
      hours: 'Пн-Пт: 8:00-19:00, Сб: 9:00-17:00',
      isMain: false
    },
    {
      city: 'Екатеринбург',
      address: 'ул. Машинная, 78',
      phone: '+7 (343) 456-78-90',
      email: 'ekb@technorent.ru',
      hours: 'Пн-Пт: 8:00-19:00, Сб: 9:00-16:00',
      isMain: false
    }
  ];

  const contactMethods = [
    {
      icon: 'Phone',
      title: 'Телефон',
      value: '8 (800) 555-01-23',
      description: 'Бесплатный звонок по России',
      action: 'Позвонить'
    },
    {
      icon: 'Mail',
      title: 'Email',
      value: 'info@technorent.ru',
      description: 'Ответим в течение часа',
      action: 'Написать'
    },
    {
      icon: 'MessageCircle',
      title: 'Telegram',
      value: '@technorent_bot',
      description: 'Онлайн-консультант 24/7',
      action: 'Открыть чат'
    },
    {
      icon: 'Clock',
      title: 'Режим работы',
      value: 'Круглосуточно',
      description: 'Прием заказов и консультации',
      action: 'Узнать больше'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Симуляция отправки формы
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Сообщение отправлено!",
      description: "Мы свяжемся с вами в ближайшее время.",
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Контакты</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Свяжитесь с нами любым удобным способом. Наши специалисты готовы помочь 
            с выбором оборудования и ответить на все вопросы
          </p>
        </div>

        {/* Quick Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Icon name={method.icon as any} className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-1">{method.title}</h3>
                <p className="font-mono text-sm mb-1">{method.value}</p>
                <p className="text-xs text-muted-foreground mb-4">{method.description}</p>
                <Button variant="outline" size="sm" className="w-full">
                  {method.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Send" className="w-5 h-5" />
                Написать нам
              </CardTitle>
              <CardDescription>
                Заполните форму, и мы свяжемся с вами в ближайшее время
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Имя *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Тема обращения</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="О чем хотите рассказать?"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Сообщение *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    placeholder="Опишите ваш вопрос или запрос..."
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Icon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                      Отправляем...
                    </>
                  ) : (
                    <>
                      <Icon name="Send" className="w-4 h-4 mr-2" />
                      Отправить сообщение
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Offices */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="MapPin" className="w-5 h-5" />
                  Наши офисы
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {offices.map((office, index) => (
                  <div key={index}>
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-lg">{office.city}</h3>
                      {office.isMain && <Badge variant="secondary">Главный офис</Badge>}
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <Icon name="MapPin" className="w-4 h-4 mt-0.5 text-muted-foreground" />
                        <span>{office.address}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Icon name="Phone" className="w-4 h-4 text-muted-foreground" />
                        <span className="font-mono">{office.phone}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Icon name="Mail" className="w-4 h-4 text-muted-foreground" />
                        <span className="font-mono">{office.email}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Icon name="Clock" className="w-4 h-4 text-muted-foreground" />
                        <span>{office.hours}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Icon name="Navigation" className="w-4 h-4 mr-1" />
                        Маршрут
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="Phone" className="w-4 h-4 mr-1" />
                        Позвонить
                      </Button>
                    </div>

                    {index < offices.length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Map" className="w-5 h-5" />
                  Карта
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Icon name="Map" className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Интерактивная карта с расположением офисов
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="HelpCircle" className="w-5 h-5" />
              Часто задаваемые вопросы
            </CardTitle>
            <CardDescription>
              Возможно, ответ на ваш вопрос уже есть в нашем FAQ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Button variant="outline" className="justify-start h-auto p-4">
                <div className="text-left">
                  <div className="font-medium">Как оформить аренду?</div>
                  <div className="text-sm text-muted-foreground">Процедура и документы</div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4">
                <div className="text-left">
                  <div className="font-medium">Условия доставки</div>
                  <div className="text-sm text-muted-foreground">Стоимость и сроки</div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4">
                <div className="text-left">
                  <div className="font-medium">Техническая поддержка</div>
                  <div className="text-sm text-muted-foreground">Помощь с оборудованием</div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4">
                <div className="text-left">
                  <div className="font-medium">Возврат и замена</div>
                  <div className="text-sm text-muted-foreground">Политика возврата</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;