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
import Icon from '@/components/ui/icon';

const Careers = () => {
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    coverLetter: ''
  });

  const openPositions = [
    {
      id: 'manager-rental',
      title: 'Менеджер по аренде оборудования',
      department: 'Продажи',
      location: 'Москва',
      type: 'Полная занятость',
      experience: 'От 2 лет',
      salary: '80 000 - 120 000 ₽',
      description: 'Консультации клиентов, оформление договоров аренды, контроль возврата оборудования',
      requirements: [
        'Опыт работы в сфере продаж от 2 лет',
        'Знание строительного оборудования',
        'Навыки работы с CRM системами',
        'Коммуникабельность и клиентоориентированность'
      ],
      responsibilities: [
        'Консультирование клиентов по выбору оборудования',
        'Оформление договоров аренды',
        'Контроль своевременного возврата техники',
        'Ведение базы клиентов в CRM'
      ],
      benefits: [
        'Официальное трудоустройство',
        'Премии от продаж',
        'Медицинская страховка',
        'Обучение за счет компании'
      ],
      isHot: true,
      isRemote: false
    },
    {
      id: 'technician',
      title: 'Техник по обслуживанию оборудования',
      department: 'Техническая служба',
      location: 'Москва',
      type: 'Полная занятость',
      experience: 'От 3 лет',
      salary: '70 000 - 100 000 ₽',
      description: 'Техническое обслуживание и ремонт строительного оборудования',
      requirements: [
        'Техническое или инженерное образование',
        'Опыт ремонта электроинструмента от 3 лет',
        'Знание устройства строительного оборудования',
        'Ответственность и внимательность'
      ],
      responsibilities: [
        'Диагностика и ремонт оборудования',
        'Профилактическое обслуживание техники',
        'Ведение технической документации',
        'Консультации по техническим вопросам'
      ],
      benefits: [
        'Стабильная заработная плата',
        'Социальный пакет',
        'Обучение на курсах производителей',
        'Современное оборудование'
      ],
      isHot: false,
      isRemote: false
    },
    {
      id: 'logistics-coordinator',
      title: 'Координатор логистики',
      department: 'Логистика',
      location: 'Москва',
      type: 'Полная занятость',
      experience: 'От 1 года',
      salary: '60 000 - 80 000 ₽',
      description: 'Организация доставки и возврата оборудования, работа с курьерами',
      requirements: [
        'Опыт работы в логистике от 1 года',
        'Знание Москвы и области',
        'Навыки планирования и организации',
        'Стрессоустойчивость'
      ],
      responsibilities: [
        'Планирование маршрутов доставки',
        'Координация работы курьеров',
        'Отслеживание статуса заказов',
        'Взаимодействие с клиентами'
      ],
      benefits: [
        'Молодая команда',
        'Гибкий график',
        'Возможность карьерного роста',
        'Корпоративные мероприятия'
      ],
      isHot: false,
      isRemote: true
    },
    {
      id: 'accountant',
      title: 'Бухгалтер',
      department: 'Финансы',
      location: 'Москва / Удаленно',
      type: 'Полная занятость',
      experience: 'От 2 лет',
      salary: '70 000 - 90 000 ₽',
      description: 'Ведение учета операций по аренде оборудования, работа с первичными документами',
      requirements: [
        'Высшее экономическое образование',
        'Опыт работы бухгалтером от 2 лет',
        'Знание 1С:Бухгалтерия',
        'Знание налогового законодательства'
      ],
      responsibilities: [
        'Ведение первичной документации',
        'Расчет налогов и взносов',
        'Подготовка отчетности',
        'Работа с банками и контрагентами'
      ],
      benefits: [
        'Стабильная работа',
        'Возможность удаленной работы',
        'Профессиональное развитие',
        'Дружный коллектив'
      ],
      isHot: false,
      isRemote: true
    },
    {
      id: 'marketing-specialist',
      title: 'Специалист по маркетингу',
      department: 'Маркетинг',
      location: 'Москва',
      type: 'Полная занятость',
      experience: 'От 1 года',
      salary: '65 000 - 85 000 ₽',
      description: 'Продвижение услуг компании, ведение социальных сетей, организация рекламных кампаний',
      requirements: [
        'Опыт в digital-маркетинге от 1 года',
        'Знание SMM и контекстной рекламы',
        'Навыки работы с аналитикой',
        'Творческий подход'
      ],
      responsibilities: [
        'Ведение социальных сетей',
        'Настройка рекламных кампаний',
        'Создание контента',
        'Анализ эффективности'
      ],
      benefits: [
        'Творческая атмосфера',
        'Современные инструменты',
        'Обучение и конференции',
        'Бонусы за результат'
      ],
      isHot: true,
      isRemote: false
    }
  ];

  const companyBenefits = [
    {
      title: 'Конкурентная зарплата',
      description: 'Достойная оплата труда + премии по результатам',
      icon: 'CreditCard'
    },
    {
      title: 'Профессиональный рост',
      description: 'Обучение, тренинги, карьерные возможности',
      icon: 'TrendingUp'
    },
    {
      title: 'Социальный пакет',
      description: 'ДМС, отпуск 28 дней, корпоративные льготы',
      icon: 'Shield'
    },
    {
      title: 'Современный офис',
      description: 'Удобное расположение, комфортные рабочие места',
      icon: 'Building2'
    },
    {
      title: 'Дружная команда',
      description: 'Открытая корпоративная культура и поддержка коллег',
      icon: 'Users'
    },
    {
      title: 'Work-life balance',
      description: 'Гибкий график, удаленная работа для некоторых позиций',
      icon: 'Clock'
    }
  ];

  const departments = [
    { name: 'Продажи', positions: 8, description: 'Работа с клиентами, консультации, продажи' },
    { name: 'Техническая служба', positions: 5, description: 'Обслуживание и ремонт оборудования' },
    { name: 'Логистика', positions: 6, description: 'Доставка и возврат техники' },
    { name: 'Финансы', positions: 3, description: 'Бухгалтерия, финансовое планирование' },
    { name: 'Маркетинг', positions: 4, description: 'Продвижение и реклама услуг' },
    { name: 'IT', positions: 2, description: 'Разработка и поддержка систем' }
  ];

  const workProcess = [
    {
      step: '1',
      title: 'Подача заявки',
      description: 'Заполните форму или отправьте резюме на email'
    },
    {
      step: '2',
      title: 'Собеседование',
      description: 'Встреча с HR и руководителем отдела'
    },
    {
      step: '3',
      title: 'Тестовое задание',
      description: 'Практическое задание по профилю (при необходимости)'
    },
    {
      step: '4',
      title: 'Принятие решения',
      description: 'Обратная связь в течение 3 рабочих дней'
    },
    {
      step: '5',
      title: 'Оформление',
      description: 'Подписание договора и выход на работу'
    }
  ];

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Job application:', applicationData);
    // Here you would typically send the data to your backend
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setApplicationData({
      ...applicationData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Карьера в ТехноРент</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Присоединяйтесь к команде профессионалов в сфере аренды строительного оборудования. 
            Мы предлагаем интересную работу, достойную оплату и возможности для роста
          </p>
        </div>

        <Tabs defaultValue="vacancies" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="vacancies">Вакансии</TabsTrigger>
            <TabsTrigger value="about">О компании</TabsTrigger>
            <TabsTrigger value="benefits">Льготы</TabsTrigger>
            <TabsTrigger value="apply">Отклик</TabsTrigger>
          </TabsList>

          <TabsContent value="vacancies" className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Icon name="Briefcase" className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{openPositions.length}</div>
                  <div className="text-sm text-muted-foreground">Открытых вакансий</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Icon name="Users" className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <div className="text-2xl font-bold">45</div>
                  <div className="text-sm text-muted-foreground">Сотрудников</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Icon name="Building2" className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-2xl font-bold">6</div>
                  <div className="text-sm text-muted-foreground">Отделов</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Icon name="TrendingUp" className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                  <div className="text-2xl font-bold">8</div>
                  <div className="text-sm text-muted-foreground">Лет на рынке</div>
                </CardContent>
              </Card>
            </div>

            {/* Open Positions */}
            <div className="space-y-6">
              {openPositions.map((position) => (
                <Card key={position.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {position.title}
                          {position.isHot && <Badge variant="destructive">Горячая вакансия</Badge>}
                          {position.isRemote && <Badge variant="secondary">Удаленно</Badge>}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {position.department} • {position.location} • {position.type}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-primary">{position.salary}</div>
                        <div className="text-sm text-muted-foreground">Опыт: {position.experience}</div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{position.description}</p>
                    
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold mb-2">Требования:</h4>
                        <ul className="space-y-1">
                          {position.requirements.slice(0, 3).map((req, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <Icon name="Dot" className="w-4 h-4 text-muted-foreground mt-1" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Обязанности:</h4>
                        <ul className="space-y-1">
                          {position.responsibilities.slice(0, 3).map((resp, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <Icon name="Check" className="w-4 h-4 text-green-500 mt-1" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Мы предлагаем:</h4>
                        <ul className="space-y-1">
                          {position.benefits.slice(0, 3).map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <Icon name="Star" className="w-4 h-4 text-yellow-500 mt-1" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button onClick={() => setSelectedPosition(position.id)}>
                        <Icon name="Send" className="w-4 h-4 mr-2" />
                        Откликнуться
                      </Button>
                      <Button variant="outline">
                        <Icon name="Eye" className="w-4 h-4 mr-2" />
                        Подробнее
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Departments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Building2" className="w-6 h-6" />
                  Наши отделы
                </CardTitle>
                <CardDescription>
                  Узнайте больше о структуре компании и возможностях в каждом отделе
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {departments.map((dept, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:bg-muted transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{dept.name}</h3>
                        <Badge variant="outline">{dept.positions} поз.</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{dept.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="space-y-8">
            {/* Company Story */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Building2" className="w-6 h-6" />
                  О компании ТехноРент
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Наша история</h3>
                    <p className="text-muted-foreground mb-4">
                      ТехноРент была основана в 2016 году с целью предоставления качественного 
                      строительного оборудования в аренду. За 8 лет работы мы стали одной из 
                      ведущих компаний в своей сфере.
                    </p>
                    <p className="text-muted-foreground">
                      Мы гордимся нашей командой профессионалов, которые каждый день помогают 
                      клиентам решать их задачи с помощью надежного оборудования.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Наши ценности</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Icon name="Target" className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <div className="font-medium">Качество</div>
                          <div className="text-sm text-muted-foreground">
                            Только исправное и проверенное оборудование
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Users" className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <div className="font-medium">Клиентоориентированность</div>
                          <div className="text-sm text-muted-foreground">
                            Индивидуальный подход к каждому клиенту
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Handshake" className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <div className="font-medium">Надежность</div>
                          <div className="text-sm text-muted-foreground">
                            Выполняем обязательства в срок
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Lightbulb" className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <div className="font-medium">Инновации</div>
                          <div className="text-sm text-muted-foreground">
                            Постоянно развиваемся и внедряем новое
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Work Process */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="GitBranch" className="w-6 h-6" />
                  Процесс трудоустройства
                </CardTitle>
                <CardDescription>
                  Простой и прозрачный процесс найма
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-5 gap-4">
                  {workProcess.map((step, index) => (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                        {step.step}
                      </div>
                      <h4 className="font-semibold mb-2">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Office */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="MapPin" className="w-6 h-6" />
                  Наш офис
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Расположение</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Icon name="MapPin" className="w-4 h-4 text-muted-foreground" />
                        <span>г. Москва, ул. Строительная, 15к2</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Train" className="w-4 h-4 text-muted-foreground" />
                        <span>м. Сокольники (10 мин пешком)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Car" className="w-4 h-4 text-muted-foreground" />
                        <span>Парковка для сотрудников</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Условия работы</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Icon name="Coffee" className="w-4 h-4 text-muted-foreground" />
                        <span>Кофе-пойнт и зона отдыха</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Wifi" className="w-4 h-4 text-muted-foreground" />
                        <span>Современное IT-оборудование</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Users" className="w-4 h-4 text-muted-foreground" />
                        <span>Открытое пространство</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="benefits" className="space-y-8">
            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companyBenefits.map((benefit, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Icon name={benefit.icon as any} className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Detailed Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Gift" className="w-6 h-6" />
                  Подробно о льготах
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Финансовые льготы</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Icon name="Check" className="w-4 h-4 text-green-500 mt-1" />
                        <span className="text-sm">13-я зарплата по итогам года</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Check" className="w-4 h-4 text-green-500 mt-1" />
                        <span className="text-sm">Премии за перевыполнение плана</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Check" className="w-4 h-4 text-green-500 mt-1" />
                        <span className="text-sm">Компенсация обедов</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Check" className="w-4 h-4 text-green-500 mt-1" />
                        <span className="text-sm">Оплата мобильной связи</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Развитие и обучение</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Icon name="Check" className="w-4 h-4 text-green-500 mt-1" />
                        <span className="text-sm">Обучение на курсах производителей</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Check" className="w-4 h-4 text-green-500 mt-1" />
                        <span className="text-sm">Участие в профильных выставках</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Check" className="w-4 h-4 text-green-500 mt-1" />
                        <span className="text-sm">Внутренние тренинги</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Check" className="w-4 h-4 text-green-500 mt-1" />
                        <span className="text-sm">Программа наставничества</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="apply" className="space-y-8">
            {/* Application Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="FileText" className="w-6 h-6" />
                  Отклик на вакансию
                </CardTitle>
                <CardDescription>
                  Заполните форму, и мы свяжемся с вами в ближайшее время
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleApplicationSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Полное имя *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={applicationData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Иванов Иван Иванович"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={applicationData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="ivan@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Телефон *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={applicationData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>
                    <div>
                      <Label htmlFor="position">Интересующая позиция</Label>
                      <Select value={applicationData.position} onValueChange={(value) => setApplicationData({...applicationData, position: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите позицию" />
                        </SelectTrigger>
                        <SelectContent>
                          {openPositions.map((pos) => (
                            <SelectItem key={pos.id} value={pos.id}>
                              {pos.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="experience">Опыт работы</Label>
                    <Textarea
                      id="experience"
                      name="experience"
                      value={applicationData.experience}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Кратко опишите ваш релевантный опыт работы..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="coverLetter">Сопроводительное письмо</Label>
                    <Textarea
                      id="coverLetter"
                      name="coverLetter"
                      value={applicationData.coverLetter}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Расскажите, почему вы хотите работать в нашей компании..."
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Icon name="Send" className="w-4 h-4 mr-2" />
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact HR */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Phone" className="w-6 h-6" />
                  Связаться с HR
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">HR-менеджер</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Icon name="User" className="w-4 h-4 text-muted-foreground" />
                        <span>Анна Петрова</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Phone" className="w-4 h-4 text-muted-foreground" />
                        <span>+7 (495) 123-45-67 доб. 101</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Mail" className="w-4 h-4 text-muted-foreground" />
                        <span>hr@technorent.ru</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Clock" className="w-4 h-4 text-muted-foreground" />
                        <span>Пн-Пт: 9:00-18:00</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Альтернативные способы</h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Icon name="Mail" className="w-4 h-4 mr-2" />
                        Отправить резюме на email
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Icon name="MessageCircle" className="w-4 h-4 mr-2" />
                        Написать в Telegram
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Icon name="Calendar" className="w-4 h-4 mr-2" />
                        Записаться на встречу
                      </Button>
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

export default Careers;