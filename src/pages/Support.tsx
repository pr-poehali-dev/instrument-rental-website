import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Icon from '@/components/ui/icon';

const Support = () => {
  const [ticketData, setTicketData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    equipment: '',
    priority: '',
    subject: '',
    description: '',
    orderNumber: ''
  });

  const [searchQuery, setSearchQuery] = useState('');

  const supportCategories = [
    {
      id: 'technical',
      title: 'Техническая поддержка',
      description: 'Помощь с использованием оборудования',
      icon: 'Wrench',
      responseTime: '15 минут',
      availability: '24/7'
    },
    {
      id: 'equipment',
      title: 'Неисправности оборудования',
      description: 'Проблемы с работой техники',
      icon: 'AlertTriangle',
      responseTime: '5 минут',
      availability: '24/7'
    },
    {
      id: 'delivery',
      title: 'Вопросы доставки',
      description: 'Проблемы с доставкой и возвратом',
      icon: 'Truck',
      responseTime: '30 минут',
      availability: '8:00-20:00'
    },
    {
      id: 'billing',
      title: 'Вопросы оплаты',
      description: 'Счета, платежи, возврат залога',
      icon: 'CreditCard',
      responseTime: '1 час',
      availability: '9:00-18:00'
    },
    {
      id: 'rental',
      title: 'Условия аренды',
      description: 'Продление, изменение заказа',
      icon: 'FileText',
      responseTime: '30 минут',
      availability: '8:00-20:00'
    },
    {
      id: 'other',
      title: 'Другие вопросы',
      description: 'Общие вопросы и предложения',
      icon: 'MessageCircle',
      responseTime: '2 часа',
      availability: '9:00-18:00'
    }
  ];

  const commonIssues = [
    {
      category: 'technical',
      question: 'Оборудование не включается',
      answer: 'Проверьте подключение к сети, состояние кабеля питания и предохранителей. Убедитесь, что выключатель находится в положении "ВКЛ".',
      steps: [
        'Проверьте подключение к электросети',
        'Осмотрите кабель питания на предмет повреждений',
        'Проверьте автоматические выключатели',
        'Убедитесь в правильности подключения'
      ],
      tags: ['питание', 'включение', 'электричество']
    },
    {
      category: 'technical',
      question: 'Падает мощность инструмента',
      answer: 'Возможные причины: засорение воздушного фильтра, износ щеток, перегрев. Остановите работу и дайте инструменту остыть.',
      steps: [
        'Остановите работу с инструментом',
        'Дайте остыть 10-15 минут',
        'Проверьте воздушные фильтры',
        'Свяжитесь с технической поддержкой'
      ],
      tags: ['мощность', 'перегрев', 'фильтр']
    },
    {
      category: 'equipment',
      question: 'Сильная вибрация при работе',
      answer: 'Проверьте крепление рабочих насадок, балансировку и отсутствие повреждений. Немедленно прекратите работу.',
      steps: [
        'Немедленно выключите оборудование',
        'Проверьте крепление насадок',
        'Осмотрите на предмет видимых повреждений',
        'Обратитесь в техническую поддержку'
      ],
      tags: ['вибрация', 'насадки', 'безопасность']
    },
    {
      category: 'delivery',
      question: 'Задержка доставки',
      answer: 'Свяжитесь с логистической службой по телефону для уточнения статуса доставки и возможности ускорения.',
      steps: [
        'Проверьте SMS с трек-номером',
        'Позвоните в службу доставки',
        'Уточните причину задержки',
        'Согласуйте новое время доставки'
      ],
      tags: ['доставка', 'задержка', 'логистика']
    },
    {
      category: 'billing',
      question: 'Не вернули залог',
      answer: 'Залог возвращается в течение 1-3 рабочих дней после проверки оборудования. Проверьте статус в личном кабинете.',
      steps: [
        'Войдите в личный кабинет',
        'Проверьте статус возврата залога',
        'Убедитесь в правильности реквизитов',
        'Обратитесь в бухгалтерию при задержке'
      ],
      tags: ['залог', 'возврат', 'платеж']
    },
    {
      category: 'rental',
      question: 'Как продлить аренду',
      answer: 'Продление возможно за 24 часа до окончания срока через личный кабинет или по телефону поддержки.',
      steps: [
        'Войдите в личный кабинет',
        'Найдите активный заказ',
        'Нажмите "Продлить аренду"',
        'Выберите новые даты и оплатите'
      ],
      tags: ['продление', 'аренда', 'срок']
    }
  ];

  const quickActions = [
    {
      title: 'Экстренная поддержка',
      description: 'При поломке оборудования',
      phone: '8 (800) 555-01-24',
      icon: 'Phone',
      color: 'destructive'
    },
    {
      title: 'Техническая консультация',
      description: 'Помощь с использованием',
      phone: '8 (800) 555-01-25',
      icon: 'Headphones',
      color: 'default'
    },
    {
      title: 'Служба доставки',
      description: 'Вопросы по доставке',
      phone: '8 (800) 555-01-26',
      icon: 'Truck',
      color: 'secondary'
    },
    {
      title: 'Онлайн-чат',
      description: 'Быстрые ответы 24/7',
      phone: 'Открыть чат',
      icon: 'MessageCircle',
      color: 'outline'
    }
  ];

  const technicalGuides = [
    {
      title: 'Безопасная работа с перфораторами',
      description: 'Правила использования и техника безопасности',
      duration: '5 мин',
      difficulty: 'Базовый',
      tags: ['перфораторы', 'безопасность']
    },
    {
      title: 'Настройка и калибровка генераторов',
      description: 'Подключение и первоначальная настройка',
      duration: '10 мин',
      difficulty: 'Средний',
      tags: ['генераторы', 'настройка']
    },
    {
      title: 'Обслуживание компрессоров',
      description: 'Базовое техническое обслуживание',
      duration: '7 мин',
      difficulty: 'Базовый',
      tags: ['компрессоры', 'обслуживание']
    },
    {
      title: 'Работа с измерительными приборами',
      description: 'Точные измерения и калибровка',
      duration: '12 мин',
      difficulty: 'Продвинутый',
      tags: ['измерения', 'точность']
    }
  ];

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Support ticket:', ticketData);
    // Here you would typically send the data to your backend
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTicketData({
      ...ticketData,
      [e.target.name]: e.target.value
    });
  };

  const filteredIssues = commonIssues.filter(issue =>
    issue.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    issue.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    issue.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Техническая поддержка</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Круглосуточная поддержка для решения любых вопросов с оборудованием. 
            Наши эксперты готовы помочь в любое время
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {quickActions.map((action, index) => (
            <Card key={index} className={`hover:shadow-lg transition-shadow cursor-pointer`}>
              <CardContent className="pt-6 text-center">
                <Icon name={action.icon as any} className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-1">{action.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{action.description}</p>
                <Button variant={action.color as any} size="sm" className="w-full">
                  {action.phone}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="search" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="search">Поиск решений</TabsTrigger>
            <TabsTrigger value="categories">Категории</TabsTrigger>
            <TabsTrigger value="guides">Инструкции</TabsTrigger>
            <TabsTrigger value="ticket">Создать заявку</TabsTrigger>
            <TabsTrigger value="status">Статус заявки</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-8">
            {/* Search */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Search" className="w-6 h-6" />
                  Поиск решений
                </CardTitle>
                <CardDescription>
                  Найдите ответы на популярные вопросы
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-6">
                  <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Опишите проблему или введите ключевые слова..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {searchQuery && (
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground">
                      Найдено: {filteredIssues.length} результатов
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  {(searchQuery ? filteredIssues : commonIssues.slice(0, 4)).map((issue, index) => (
                    <Card key={index} className="border-l-4 border-l-primary">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{issue.question}</CardTitle>
                        <div className="flex gap-1">
                          {issue.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{issue.answer}</p>
                        
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Пошаговое решение:</h4>
                          <ol className="space-y-1">
                            {issue.steps.map((step, stepIndex) => (
                              <li key={stepIndex} className="flex items-start gap-2 text-sm">
                                <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs mt-0.5">
                                  {stepIndex + 1}
                                </span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                        
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm">
                            <Icon name="ThumbsUp" className="w-4 h-4 mr-1" />
                            Помогло
                          </Button>
                          <Button variant="outline" size="sm">
                            <Icon name="MessageCircle" className="w-4 h-4 mr-1" />
                            Нужна помощь
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-8">
            {/* Support Categories */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportCategories.map((category) => (
                <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <Icon name={category.icon as any} className="w-8 h-8 text-primary" />
                      <div>
                        <CardTitle className="text-lg">{category.title}</CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Время ответа:</span>
                        <Badge variant="outline">{category.responseTime}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Доступность:</span>
                        <Badge variant="secondary">{category.availability}</Badge>
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      <Icon name="MessageCircle" className="w-4 h-4 mr-2" />
                      Связаться
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* FAQ by Category */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="HelpCircle" className="w-6 h-6" />
                  Частые вопросы по категориям
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {commonIssues.map((issue, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {supportCategories.find(cat => cat.id === issue.category)?.title}
                          </Badge>
                          {issue.question}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>{issue.answer}</p>
                          <div>
                            <h4 className="font-semibold text-sm mb-2">Пошаговое решение:</h4>
                            <ol className="space-y-1">
                              {issue.steps.map((step, stepIndex) => (
                                <li key={stepIndex} className="flex items-start gap-2 text-sm">
                                  <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs mt-0.5">
                                    {stepIndex + 1}
                                  </span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guides" className="space-y-8">
            {/* Technical Guides */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="BookOpen" className="w-6 h-6" />
                  Технические инструкции
                </CardTitle>
                <CardDescription>
                  Подробные руководства по работе с оборудованием
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {technicalGuides.map((guide, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:bg-muted transition-colors">
                      <h3 className="font-semibold mb-2">{guide.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{guide.description}</p>
                      
                      <div className="flex items-center gap-4 mb-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Icon name="Clock" className="w-4 h-4 text-muted-foreground" />
                          <span>{guide.duration}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {guide.difficulty}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {guide.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button variant="outline" size="sm" className="w-full">
                        <Icon name="Play" className="w-4 h-4 mr-2" />
                        Смотреть инструкцию
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Video Tutorials */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Video" className="w-6 h-6" />
                  Видеоуроки
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {['Первый запуск оборудования', 'Правила безопасности', 'Устранение неисправностей'].map((title, index) => (
                    <div key={index} className="aspect-video bg-muted rounded-lg flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
                      <div className="text-center">
                        <Icon name="Play" className="w-12 h-12 mx-auto mb-2 text-primary" />
                        <p className="text-sm font-medium">{title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ticket" className="space-y-8">
            {/* Create Support Ticket */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Ticket" className="w-6 h-6" />
                  Создать заявку в поддержку
                </CardTitle>
                <CardDescription>
                  Опишите проблему подробно, и наши специалисты помогут её решить
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTicketSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Имя *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={ticketData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Ваше имя"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={ticketData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Телефон</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={ticketData.phone}
                        onChange={handleInputChange}
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>
                    <div>
                      <Label htmlFor="orderNumber">Номер заказа</Label>
                      <Input
                        id="orderNumber"
                        name="orderNumber"
                        value={ticketData.orderNumber}
                        onChange={handleInputChange}
                        placeholder="ORD-2024-001"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="category">Категория *</Label>
                      <Select value={ticketData.category} onValueChange={(value) => setTicketData({...ticketData, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          {supportCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="equipment">Оборудование</Label>
                      <Input
                        id="equipment"
                        name="equipment"
                        value={ticketData.equipment}
                        onChange={handleInputChange}
                        placeholder="Название модели"
                      />
                    </div>
                    <div>
                      <Label htmlFor="priority">Приоритет</Label>
                      <Select value={ticketData.priority} onValueChange={(value) => setTicketData({...ticketData, priority: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите приоритет" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Низкий</SelectItem>
                          <SelectItem value="medium">Средний</SelectItem>
                          <SelectItem value="high">Высокий</SelectItem>
                          <SelectItem value="urgent">Критический</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Тема *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={ticketData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="Кратко опишите проблему"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Подробное описание *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={ticketData.description}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      placeholder="Опишите проблему максимально подробно: что произошло, какие действия предпринимались, какие сообщения об ошибках появлялись..."
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Icon name="Send" className="w-4 h-4 mr-2" />
                    Создать заявку
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="status" className="space-y-8">
            {/* Check Ticket Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Search" className="w-6 h-6" />
                  Проверить статус заявки
                </CardTitle>
                <CardDescription>
                  Введите номер заявки или email для отслеживания статуса
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label htmlFor="ticketNumber">Номер заявки</Label>
                    <Input
                      id="ticketNumber"
                      placeholder="TKT-2024-001"
                    />
                  </div>
                  <div>
                    <Label htmlFor="statusEmail">Email</Label>
                    <Input
                      id="statusEmail"
                      type="email"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                
                <Button className="w-full mb-8">
                  <Icon name="Search" className="w-4 h-4 mr-2" />
                  Найти заявку
                </Button>

                {/* Sample Ticket Status */}
                <div className="border rounded-lg p-6 bg-muted/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Заявка #TKT-2024-001</h3>
                    <Badge variant="secondary">В работе</Badge>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Создана:</span>
                      <span>28.07.2024 14:30</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Категория:</span>
                      <span>Техническая поддержка</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Приоритет:</span>
                      <Badge variant="outline">Средний</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Ответственный:</span>
                      <span>Петров А.В.</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div>
                    <h4 className="font-semibold mb-3">История обращения</h4>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <div>
                          <div className="font-medium text-sm">Заявка принята в работу</div>
                          <div className="text-xs text-muted-foreground">28.07.2024 14:45</div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <div>
                          <div className="font-medium text-sm">Запрошена дополнительная информация</div>
                          <div className="text-xs text-muted-foreground">28.07.2024 15:20</div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                        <div>
                          <div className="font-medium text-sm text-muted-foreground">Ожидается решение</div>
                          <div className="text-xs text-muted-foreground">Сейчас</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Emergency Contact */}
        <Card className="mt-12 bg-red-50 border-red-200">
          <CardContent className="pt-6 text-center">
            <Icon name="AlertTriangle" className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <h3 className="text-xl font-bold mb-2 text-red-800">Экстренная ситуация?</h3>
            <p className="text-red-700 mb-6">
              При критических неисправностях оборудования звоните в службу экстренной поддержки
            </p>
            <Button variant="destructive" size="lg">
              <Icon name="Phone" className="w-5 h-5 mr-2" />
              8 (800) 555-01-24
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Support;