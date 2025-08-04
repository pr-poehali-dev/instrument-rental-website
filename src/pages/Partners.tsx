import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from '@/components/ui/icon';

const Partners = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    description: '',
    partnerType: ''
  });

  const mainPartners = [
    {
      name: 'Bosch Professional',
      logo: '/api/placeholder/120/60',
      category: 'Производитель',
      description: 'Ведущий производитель профессионального электроинструмента',
      website: 'bosch-professional.com',
      products: ['Перфораторы', 'Болгарки', 'Дрели', 'Измерительные приборы'],
      partnership: '8 лет',
      isStrategic: true
    },
    {
      name: 'Makita Corporation',
      logo: '/api/placeholder/120/60',
      category: 'Производитель',
      description: 'Японский производитель качественного электроинструмента',
      website: 'makita.com',
      products: ['Аккумуляторный инструмент', 'Садовая техника', 'Строительное оборудование'],
      partnership: '6 лет',
      isStrategic: true
    },
    {
      name: 'DeWalt',
      logo: '/api/placeholder/120/60',
      category: 'Производитель',
      description: 'Американский бренд профессионального инструмента',
      website: 'dewalt.com',
      products: ['Аккумуляторные системы', 'Строительное оборудование', 'Оснастка'],
      partnership: '5 лет',
      isStrategic: true
    },
    {
      name: 'Hilti',
      logo: '/api/placeholder/120/60',
      category: 'Производитель',
      description: 'Премиальный производитель строительного оборудования',
      website: 'hilti.com',
      products: ['Анкерные системы', 'Измерительная техника', 'Алмазная техника'],
      partnership: '4 года',
      isStrategic: true
    },
    {
      name: 'Metabo',
      logo: '/api/placeholder/120/60',
      category: 'Производитель',
      description: 'Немецкое качество электроинструмента',
      website: 'metabo.com',
      products: ['Компрессоры', 'Шлифовальные машины', 'Дрели'],
      partnership: '3 года',
      isStrategic: false
    },
    {
      name: 'Stihl',
      logo: '/api/placeholder/120/60',
      category: 'Производитель',
      description: 'Лидер в производстве садово-парковой техники',
      website: 'stihl.com',
      products: ['Бензопилы', 'Триммеры', 'Воздуходувки'],
      partnership: '7 лет',
      isStrategic: false
    }
  ];

  const servicePartners = [
    {
      name: 'СервисТех',
      category: 'Сервисный центр',
      description: 'Авторизованный сервисный центр по ремонту электроинструмента',
      services: ['Гарантийный ремонт', 'Техническое обслуживание', 'Запчасти'],
      contact: '+7 (495) 123-45-67',
      partnership: '5 лет'
    },
    {
      name: 'ИнструментСервис',
      category: 'Сервисный центр',
      description: 'Специализированный центр по ремонту строительного оборудования',
      services: ['Диагностика', 'Капитальный ремонт', 'Модернизация'],
      contact: '+7 (495) 234-56-78',
      partnership: '3 года'
    },
    {
      name: 'ПроТранс',
      category: 'Логистика',
      description: 'Надежный партнер по доставке оборудования',
      services: ['Курьерская доставка', 'Грузоперевозки', 'Экспресс-доставка'],
      contact: '+7 (495) 345-67-89',
      partnership: '4 года'
    },
    {
      name: 'СтройЛогистик',
      category: 'Логистика',
      description: 'Специализация на доставке строительного оборудования',
      services: ['Доставка спецтехники', 'Подъем на этаж', 'Монтаж'],
      contact: '+7 (495) 456-78-90',
      partnership: '2 года'
    }
  ];

  const partnershipBenefits = [
    {
      title: 'Расширение ассортимента',
      description: 'Доступ к новейшему оборудованию от ведущих производителей',
      icon: 'Package'
    },
    {
      title: 'Специальные условия',
      description: 'Эксклюзивные цены и условия для партнеров',
      icon: 'Percent'
    },
    {
      title: 'Техническая поддержка',
      description: 'Обучение персонала и техническая поддержка 24/7',
      icon: 'Headphones'
    },
    {
      title: 'Маркетинговая поддержка',
      description: 'Совместные маркетинговые программы и акции',
      icon: 'Megaphone'
    },
    {
      title: 'Гарантийное обслуживание',
      description: 'Полная гарантийная поддержка всего оборудования',
      icon: 'Shield'
    },
    {
      title: 'Логистические решения',
      description: 'Оптимизированная система поставок и доставки',
      icon: 'Truck'
    }
  ];

  const partnershipTypes = [
    {
      type: 'manufacturer',
      title: 'Производители',
      description: 'Стать официальным поставщиком оборудования',
      requirements: ['Сертифицированная продукция', 'Гарантийные обязательства', 'Техническая поддержка'],
      benefits: ['Эксклюзивное представительство', 'Маркетинговая поддержка', 'Обучение персонала']
    },
    {
      type: 'service',
      title: 'Сервисные центры',
      description: 'Партнерство в области технического обслуживания',
      requirements: ['Квалифицированные специалисты', 'Необходимое оборудование', 'Сертификация'],
      benefits: ['Постоянный поток заказов', 'Обучение технологиям', 'Поставка запчастей']
    },
    {
      type: 'logistics',
      title: 'Логистические компании',
      description: 'Сотрудничество в сфере доставки и транспортировки',
      requirements: ['Собственный транспорт', 'Страхование грузов', 'Квалифицированные водители'],
      benefits: ['Гарантированные объемы', 'Долгосрочные контракты', 'Специальные тарифы']
    },
    {
      type: 'distributor',
      title: 'Дистрибьюторы',
      description: 'Развитие региональной сети продаж',
      requirements: ['Складские помещения', 'Торговые представители', 'Маркетинговый бюджет'],
      benefits: ['Эксклюзивная территория', 'Маркетинговая поддержка', 'Обучение персонала']
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Partnership application:', formData);
    // Here you would typically send the data to your backend
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Партнеры и поставщики</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Мы сотрудничаем с ведущими производителями и поставщиками оборудования, 
            чтобы предложить вам самую качественную технику
          </p>
        </div>

        <Tabs defaultValue="partners" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="partners">Партнеры</TabsTrigger>
            <TabsTrigger value="services">Сервисы</TabsTrigger>
            <TabsTrigger value="cooperation">Сотрудничество</TabsTrigger>
            <TabsTrigger value="application">Заявка</TabsTrigger>
          </TabsList>

          <TabsContent value="partners" className="space-y-8">
            {/* Main Partners */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Star" className="w-6 h-6" />
                  Стратегические партнеры
                </CardTitle>
                <CardDescription>
                  Ведущие производители оборудования с многолетним опытом сотрудничества
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mainPartners.filter(p => p.isStrategic).map((partner, index) => (
                    <div key={index} className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="h-16 bg-muted rounded-lg flex items-center justify-center px-4">
                          <span className="font-bold text-lg">{partner.name.split(' ')[0]}</span>
                        </div>
                        <Badge variant="default">Стратегический</Badge>
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-2">{partner.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{partner.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="Globe" className="w-4 h-4 text-muted-foreground" />
                          <span>{partner.website}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="Calendar" className="w-4 h-4 text-muted-foreground" />
                          <span>Партнерство: {partner.partnership}</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-sm font-medium mb-2">Категории товаров:</div>
                        <div className="flex flex-wrap gap-1">
                          {partner.products.slice(0, 2).map((product, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {product}
                            </Badge>
                          ))}
                          {partner.products.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{partner.products.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm" className="w-full">
                        <Icon name="ExternalLink" className="w-4 h-4 mr-2" />
                        Подробнее
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Other Partners */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Users" className="w-6 h-6" />
                  Производители оборудования
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mainPartners.filter(p => !p.isStrategic).map((partner, index) => (
                    <div key={index} className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="h-12 bg-muted rounded-lg flex items-center justify-center px-4">
                          <span className="font-bold">{partner.name.split(' ')[0]}</span>
                        </div>
                        <Badge variant="secondary">{partner.category}</Badge>
                      </div>
                      
                      <h3 className="font-semibold mb-2">{partner.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{partner.description}</p>
                      
                      <div className="flex items-center gap-2 text-sm mb-3">
                        <Icon name="Calendar" className="w-4 h-4 text-muted-foreground" />
                        <span>Партнерство: {partner.partnership}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {partner.products.slice(0, 3).map((product, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-8">
            {/* Service Partners */}
            <div className="grid md:grid-cols-2 gap-6">
              {servicePartners.map((partner, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{partner.name}</CardTitle>
                      <Badge variant="outline">{partner.category}</Badge>
                    </div>
                    <CardDescription>{partner.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm font-medium mb-2">Услуги:</div>
                      <div className="space-y-1">
                        {partner.services.map((service, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <Icon name="Check" className="w-4 h-4 text-green-500" />
                            <span>{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Phone" className="w-4 h-4 text-muted-foreground" />
                        <span>{partner.contact}</span>
                      </div>
                      <Badge variant="secondary">{partner.partnership}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cooperation" className="space-y-8">
            {/* Partnership Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Handshake" className="w-6 h-6" />
                  Преимущества партнерства
                </CardTitle>
                <CardDescription>
                  Что вы получаете, сотрудничая с нами
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {partnershipBenefits.map((benefit, index) => (
                    <div key={index} className="text-center p-4 border rounded-lg">
                      <Icon name={benefit.icon as any} className="w-8 h-8 mx-auto mb-3 text-primary" />
                      <h3 className="font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Partnership Types */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Building2" className="w-6 h-6" />
                  Типы партнерства
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {partnershipTypes.map((type, index) => (
                    <div key={index} className="p-6 border rounded-lg">
                      <h3 className="font-semibold text-lg mb-2">{type.title}</h3>
                      <p className="text-muted-foreground mb-4">{type.description}</p>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="font-medium mb-2">Требования:</div>
                          <ul className="space-y-1">
                            {type.requirements.map((req, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm">
                                <Icon name="Dot" className="w-4 h-4 text-muted-foreground" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <div className="font-medium mb-2">Преимущества:</div>
                          <ul className="space-y-1">
                            {type.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm">
                                <Icon name="Check" className="w-4 h-4 text-green-500" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <Button variant="outline" className="w-full">
                          Подать заявку
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="application" className="space-y-8">
            {/* Partnership Application Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="FileText" className="w-6 h-6" />
                  Заявка на партнерство
                </CardTitle>
                <CardDescription>
                  Заполните форму, и мы свяжемся с вами для обсуждения условий сотрудничества
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="companyName">Название компании *</Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required
                        placeholder="ООО Компания"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactName">Контактное лицо *</Label>
                      <Input
                        id="contactName"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleInputChange}
                        required
                        placeholder="Иванов Иван Иванович"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="email@company.com"
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
                    <Label htmlFor="website">Веб-сайт</Label>
                    <Input
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://company.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Описание деятельности *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      placeholder="Расскажите о вашей компании, направлениях деятельности и интересующем типе партнерства..."
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Icon name="Send" className="w-4 h-4 mr-2" />
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Phone" className="w-6 h-6" />
                  Прямые контакты
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Отдел развития партнерств</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Icon name="Phone" className="w-4 h-4 text-muted-foreground" />
                        <span>+7 (495) 123-45-67 доб. 123</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Mail" className="w-4 h-4 text-muted-foreground" />
                        <span>partners@technorent.ru</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Clock" className="w-4 h-4 text-muted-foreground" />
                        <span>Пн-Пт: 9:00-18:00</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Коммерческий отдел</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Icon name="Phone" className="w-4 h-4 text-muted-foreground" />
                        <span>+7 (495) 123-45-67 доб. 456</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Mail" className="w-4 h-4 text-muted-foreground" />
                        <span>commercial@technorent.ru</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Clock" className="w-4 h-4 text-muted-foreground" />
                        <span>Пн-Пт: 9:00-19:00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Partners;