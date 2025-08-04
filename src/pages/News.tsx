import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from '@/components/ui/icon';

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'Все новости', count: 12 },
    { id: 'promotions', name: 'Акции', count: 4 },
    { id: 'equipment', name: 'Новое оборудование', count: 3 },
    { id: 'company', name: 'О компании', count: 3 },
    { id: 'tips', name: 'Полезные советы', count: 2 }
  ];

  const featuredNews = {
    title: 'Летняя акция: Скидки до 25% на строительное оборудование',
    excerpt: 'Специальные цены на аренду бетономешалок, компрессоров и генераторов до конца августа',
    image: '/api/placeholder/600/300',
    date: '2024-08-01',
    category: 'promotions',
    isHot: true
  };

  const newsItems = [
    {
      id: 1,
      title: 'Новые перфораторы Bosch в нашем парке',
      excerpt: 'Пополнили ассортимент современными перфораторами Bosch Professional серии GBH',
      date: '2024-07-28',
      category: 'equipment',
      image: '/api/placeholder/300/200',
      author: 'Техническая служба',
      tags: ['Bosch', 'перфораторы', 'новинки'],
      views: 245,
      isNew: true
    },
    {
      id: 2,  
      title: 'Открытие нового пункта выдачи в Люберцах',
      excerpt: 'Теперь вы можете забрать заказ в нашем новом пункте выдачи на проспекте Гагарина',
      date: '2024-07-25',
      category: 'company',
      image: '/api/placeholder/300/200',
      author: 'Администрация',
      tags: ['новый офис', 'Люберцы', 'удобство'],
      views: 189
    },
    {
      id: 3,
      title: 'Акция "Верный клиент": дополнительные скидки',
      excerpt: 'Для постоянных клиентов действуют повышенные скидки при аренде на срок от 2 недель',
      date: '2024-07-22',
      category: 'promotions',
      image: '/api/placeholder/300/200',
      author: 'Отдел продаж',
      tags: ['скидки', 'постоянные клиенты', 'выгода'],
      views: 412,
      isPopular: true
    },
    {
      id: 4,
      title: 'Как правильно выбрать генератор для дачи',
      excerpt: 'Полное руководство по выбору генератора: мощность, тип топлива, особенности эксплуатации',
      date: '2024-07-20',
      category: 'tips',
      image: '/api/placeholder/300/200',
      author: 'Эксперт по оборудованию',
      tags: ['генераторы', 'выбор', 'дача'],
      views: 156
    },
    {
      id: 5,
      title: 'Расширение парка спецтехники',
      excerpt: 'Добавили в парк новые экскаваторы-погрузчики и мини-экскаваторы ведущих производителей',
      date: '2024-07-18',
      category: 'equipment', 
      image: '/api/placeholder/300/200',
      author: 'Техническая служба',
      tags: ['спецтехника', 'экскаваторы', 'расширение'],
      views: 298
    },
    {
      id: 6,
      title: 'Специальные условия для строительных компаний',
      excerpt: 'Индивидуальные тарифы и условия аренды для профессиональных строительных организаций',
      date: '2024-07-15',
      category: 'promotions',
      image: '/api/placeholder/300/200',
      author: 'Отдел корпоративных продаж',
      tags: ['b2b', 'строительство', 'корпоративные клиенты'],
      views: 87
    },
    {
      id: 7,
      title: '10 лет на рынке аренды оборудования',
      excerpt: 'Отмечаем юбилей компании и благодарим всех клиентов за доверие',
      date: '2024-07-12',
      category: 'company',
      image: '/api/placeholder/300/200',
      author: 'Руководство компании',
      tags: ['юбилей', '10 лет', 'благодарность'],
      views: 234
    },
    {
      id: 8,
      title: 'Безопасность при работе с электроинструментом',
      excerpt: 'Основные правила безопасности и рекомендации для работы с электрическим инструментом',
      date: '2024-07-10',
      category: 'tips',
      image: '/api/placeholder/300/200',
      author: 'Эксперт по безопасности',
      tags: ['безопасность', 'электроинструмент', 'правила'],
      views: 178
    }
  ];

  const promotions = [
    {
      title: 'Скидка 15% на аренду от 3 дней',
      description: 'При аренде любого оборудования на срок от 3 дней',
      validUntil: '2024-08-31',
      code: 'SUMMER15',
      type: 'discount'
    },
    {
      title: 'Бесплатная доставка выходного дня',
      description: 'Бесплатная доставка при заказе в пятницу на выходные',
      validUntil: '2024-08-30',
      code: 'WEEKEND',
      type: 'delivery'
    },
    {
      title: 'Комплект инструментов со скидкой 20%',
      description: 'Скидка при аренде комплекта из 3 и более инструментов',
      validUntil: '2024-09-15',
      code: 'TOOLKIT20',
      type: 'combo'
    }
  ];

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Новости';
  };

  const getCategoryIcon = (categoryId: string) => {
    const icons: Record<string, string> = {
      promotions: 'Tag',
      equipment: 'Wrench', 
      company: 'Building2',
      tips: 'Lightbulb',
      all: 'Newspaper'
    };
    return icons[categoryId] || 'Newspaper';
  };

  const filteredNews = newsItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Новости и акции</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Будьте в курсе последних новостей, специальных предложений и полезных советов 
            от экспертов по аренде оборудования
          </p>
        </div>

        {/* Current Promotions */}
        <Card className="mb-12 bg-gradient-to-r from-primary/10 to-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Tag" className="w-6 h-6 text-primary" />
              Актуальные акции
            </CardTitle>
            <CardDescription>
              Специальные предложения этого месяца
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {promotions.map((promo, index) => (
                <div key={index} className="p-4 border rounded-lg bg-background">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-sm">{promo.title}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {promo.type === 'discount' && 'Скидка'}
                      {promo.type === 'delivery' && 'Доставка'}
                      {promo.type === 'combo' && 'Комплект'}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{promo.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs">
                      <span className="text-muted-foreground">до </span>
                      <span className="font-mono">{promo.validUntil}</span>
                    </div>
                    <Badge variant="outline" className="text-xs font-mono">
                      {promo.code}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Featured News */}
        <Card className="mb-8 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="aspect-video bg-muted flex items-center justify-center">
                <Icon name="Image" className="w-12 h-12 text-muted-foreground" />
              </div>
            </div>
            <div className="md:w-1/2 p-6">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="destructive">Горячие новости</Badge>
                <Badge variant="outline">
                  <Icon name="Tag" className="w-3 h-3 mr-1" />
                  {getCategoryName(featuredNews.category)}
                </Badge>
              </div>
              <h2 className="text-2xl font-bold mb-3">{featuredNews.title}</h2>
              <p className="text-muted-foreground mb-4">{featuredNews.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="Calendar" className="w-4 h-4" />
                  {featuredNews.date}
                </div>
                <Button>
                  Подробнее
                  <Icon name="ArrowRight" className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Поиск новостей..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Категория" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  <div className="flex items-center gap-2">
                    <Icon name={getCategoryIcon(category.id) as any} className="w-4 h-4" />
                    {category.name} ({category.count})
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* News Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {filteredNews.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <div className="aspect-video md:aspect-square bg-muted flex items-center justify-center">
                        <Icon name="Image" className="w-8 h-8 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center gap-2 mb-2">
                        {item.isNew && <Badge variant="default">Новое</Badge>}
                        {item.isPopular && <Badge variant="secondary">Популярное</Badge>}
                        <Badge variant="outline">
                          <Icon name={getCategoryIcon(item.category) as any} className="w-3 h-3 mr-1" />
                          {getCategoryName(item.category)}
                        </Badge>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-2 hover:text-primary cursor-pointer">
                        {item.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-3">{item.excerpt}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {item.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Icon name="Calendar" className="w-4 h-4" />
                            {item.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="User" className="w-4 h-4" />
                            {item.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="Eye" className="w-4 h-4" />
                            {item.views}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Читать далее
                          <Icon name="ArrowRight" className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Folder" className="w-5 h-5" />
                  Категории
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "ghost"}
                      className="w-full justify-between"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <div className="flex items-center gap-2">
                        <Icon name={getCategoryIcon(category.id) as any} className="w-4 h-4" />
                        {category.name}
                      </div>
                      <Badge variant="outline">{category.count}</Badge>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Hash" className="w-5 h-5" />
                  Популярные теги
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['скидки', 'новинки', 'безопасность', 'Bosch', 'спецтехника', 'генераторы', 'строительство', 'аренда'].map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => setSearchQuery(tag)}
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Mail" className="w-5 h-5" />
                  Рассылка новостей
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Подпишитесь на нашу рассылку и не пропускайте важные новости и акции
                </p>
                <div className="space-y-2">
                  <Input 
                    placeholder="Ваш email" 
                    className="bg-background text-foreground"
                  />
                  <Button variant="secondary" className="w-full">
                    Подписаться
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Archive */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Archive" className="w-5 h-5" />
                  Архив новостей
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-between">
                    Август 2024
                    <Badge variant="outline">5</Badge>
                  </Button>
                  <Button variant="ghost" className="w-full justify-between">
                    Июль 2024
                    <Badge variant="outline">8</Badge>
                  </Button>
                  <Button variant="ghost" className="w-full justify-between">
                    Июнь 2024
                    <Badge variant="outline">6</Badge>
                  </Button>
                  <Button variant="ghost" className="w-full justify-between">
                    Май 2024
                    <Badge variant="outline">4</Badge>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            <Icon name="MoreHorizontal" className="w-4 h-4 mr-2" />
            Загрузить еще новости
          </Button>
        </div>
      </div>
    </div>
  );
};

export default News;