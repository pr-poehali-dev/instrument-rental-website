import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from '@/components/ui/icon';

const About = () => {
  const [activeTab, setActiveTab] = useState('story');

  const stats = [
    { label: 'Лет на рынке', value: '15+', icon: 'Calendar' },
    { label: 'Довольных клиентов', value: '50,000+', icon: 'Users' },
    { label: 'Единиц техники', value: '2,500+', icon: 'Wrench' },
    { label: 'Городов присутствия', value: '25', icon: 'MapPin' }
  ];

  const team = [
    {
      name: 'Алексей Иванов',
      position: 'Генеральный директор',
      experience: '20 лет в строительной отрасли',
      photo: '/api/placeholder/150/150'
    },
    {
      name: 'Мария Петрова',
      position: 'Технический директор',
      experience: '15 лет опыта с промышленным оборудованием',
      photo: '/api/placeholder/150/150'
    },
    {
      name: 'Дмитрий Сидоров',
      position: 'Руководитель отдела продаж',
      experience: '12 лет в сфере аренды техники',
      photo: '/api/placeholder/150/150'
    }
  ];

  const values = [
    {
      icon: 'Shield',
      title: 'Надежность',
      description: 'Вся техника проходит регулярное техническое обслуживание и проверку'
    },
    {
      icon: 'Clock',
      title: 'Оперативность',
      description: 'Быстрая доставка и круглосуточная техническая поддержка'
    },
    {
      icon: 'Award',
      title: 'Качество',
      description: 'Работаем только с проверенными брендами и поставщиками'
    },
    {
      icon: 'Heart',
      title: 'Забота о клиентах',
      description: 'Индивидуальный подход к каждому заказу и клиенту'
    }
  ];

  const milestones = [
    { year: '2009', event: 'Основание компании с 10 единицами техники' },
    { year: '2012', event: 'Расширение до 5 городов, запуск онлайн-каталога' },
    { year: '2015', event: 'Открытие собственного сервисного центра' },
    { year: '2018', event: 'Достижение отметки в 1000 единиц техники' },
    { year: '2021', event: 'Запуск мобильного приложения и цифровизация' },
    { year: '2024', event: 'Расширение до 25 городов, экологические инициативы' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">О компании ТехноРент</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Мы — ведущая компания по аренде строительного и промышленного оборудования, 
            помогающая воплощать проекты любой сложности уже более 15 лет
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <Icon name={stat.icon as any} className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { id: 'story', label: 'Наша история' },
            { id: 'values', label: 'Ценности' },
            { id: 'team', label: 'Команда' },
            { id: 'timeline', label: 'Достижения' }
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Content Sections */}
        {activeTab === 'story' && (
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="BookOpen" className="w-6 h-6" />
                  История компании
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg">
                  ТехноРент была основана в 2009 году группой энтузиастов строительной отрасли, 
                  которые видели растущую потребность в качественной аренде профессионального оборудования.
                </p>
                <p>
                  Начав с небольшого склада и 10 единиц техники, мы постепенно расширялись, 
                  всегда придерживаясь принципов качества и надежности. Сегодня мы обслуживаем 
                  клиентов в 25 городах России и располагаем одним из крупнейших парков 
                  строительного оборудования в стране.
                </p>
                <p>
                  Наша миссия — делать строительство и ремонт доступнее, предоставляя качественную 
                  технику без необходимости крупных капитальных вложений. Мы гордимся тем, что 
                  помогли реализовать тысячи проектов — от небольших домашних ремонтов до 
                  масштабных промышленных строек.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'values' && (
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Icon name={value.icon as any} className="w-6 h-6 text-primary" />
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'team' && (
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-4 overflow-hidden">
                    <img 
                      src={member.photo} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <Badge variant="secondary" className="mb-3">{member.position}</Badge>
                  <p className="text-sm text-muted-foreground">{member.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Timeline" fallback="Calendar" className="w-6 h-6" />
                  Ключевые вехи развития
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <Badge variant="outline" className="text-primary font-bold">
                          {milestone.year}
                        </Badge>
                      </div>
                      <div className="flex-1">
                        <p className="text-muted-foreground">{milestone.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto bg-primary text-primary-foreground">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-4">Готовы начать сотрудничество?</h3>
              <p className="mb-6">
                Свяжитесь с нами для консультации по выбору оборудования и условиям аренды
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg">
                  <Icon name="Phone" className="w-4 h-4 mr-2" />
                  Позвонить
                </Button>
                <Button variant="secondary" size="lg">
                  <Icon name="Mail" className="w-4 h-4 mr-2" />
                  Написать
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;