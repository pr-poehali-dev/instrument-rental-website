import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('orders');

  // Мокданные для демонстрации
  const user = {
    name: 'Иван Петров',
    email: 'ivan.petrov@example.com',
    phone: '+7 (495) 123-45-67',
    company: 'ООО "СтройТех"',
    totalOrders: 15,
    totalSpent: 245000,
    memberSince: '2023-01-15'
  };

  const orders = [
    {
      id: 'ORD-001',
      date: '2024-07-15',
      status: 'active',
      items: ['Перфоратор Bosch', 'Болгарка Makita'],
      total: 15000,
      period: '3 дня',
      returnDate: '2024-07-18'
    },
    {
      id: 'ORD-002',
      date: '2024-07-10',
      status: 'completed',
      items: ['Шуруповерт DeWalt', 'Лобзик Festool'],
      total: 12000,
      period: '5 дней',
      returnDate: '2024-07-15'
    },
    {
      id: 'ORD-003',
      date: '2024-07-05',
      status: 'overdue',
      items: ['Пила циркулярная'],
      total: 8000,
      period: '2 дня',
      returnDate: '2024-07-07'
    }
  ];

  const favorites = [
    {
      id: '1',
      name: 'Перфоратор Bosch GBH 2-28',
      price: 1500,
      image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&h=200&fit=crop',
      category: 'Электроинструмент',
      available: true
    },
    {
      id: '2',
      name: 'Болгарка Makita GA9020',
      price: 1200,
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=200&fit=crop',
      category: 'Электроинструмент',
      available: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'overdue': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Активный';
      case 'completed': return 'Завершен';
      case 'overdue': return 'Просрочен';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          <Link to="/">
            <Button variant="outline">
              <Icon name="ArrowLeft" className="h-4 w-4 mr-2" />
              На главную
            </Button>
          </Link>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Всего заказов</p>
                  <p className="text-3xl font-bold text-gray-900">{user.totalOrders}</p>
                </div>
                <Icon name="Package" className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Потрачено</p>
                  <p className="text-3xl font-bold text-gray-900">{user.totalSpent.toLocaleString()} ₽</p>
                </div>
                <Icon name="CreditCard" className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Клиент с</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {new Date(user.memberSince).getFullYear()}
                  </p>
                </div>
                <Icon name="Calendar" className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Основной контент */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders" className="flex items-center space-x-2">
              <Icon name="Package" className="h-4 w-4" />
              <span>Заказы</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center space-x-2">
              <Icon name="Heart" className="h-4 w-4" />
              <span>Избранное</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <Icon name="User" className="h-4 w-4" />
              <span>Профиль</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center space-x-2">
              <Icon name="MessageCircle" className="h-4 w-4" />
              <span>Поддержка</span>
            </TabsTrigger>
          </TabsList>

          {/* Заказы */}
          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Мои заказы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <span className="font-semibold">#{order.id}</span>
                          <Badge className={getStatusColor(order.status)}>
                            {getStatusText(order.status)}
                          </Badge>
                        </div>
                        <span className="text-sm text-gray-500">{order.date}</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">Инструменты</p>
                          <ul className="text-sm text-gray-900">
                            {order.items.map((item, index) => (
                              <li key={index}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">Период аренды</p>
                          <p className="text-sm text-gray-900">{order.period}</p>
                          <p className="text-sm text-gray-500">до {order.returnDate}</p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Сумма</p>
                            <p className="text-lg font-bold text-green-600">{order.total.toLocaleString()} ₽</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Icon name="Eye" className="h-4 w-4 mr-2" />
                            Детали
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Избранное */}
          <TabsContent value="favorites" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Избранные инструменты</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favorites.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex space-x-4">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                          <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                          <p className="text-lg font-bold text-blue-600">{item.price} ₽/день</p>
                          
                          <div className="flex items-center justify-between mt-2">
                            <Badge variant={item.available ? "default" : "destructive"}>
                              {item.available ? 'Доступен' : 'Занят'}
                            </Badge>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" disabled={!item.available}>
                                <Icon name="ShoppingCart" className="h-4 w-4 mr-2" />
                                В корзину
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Icon name="Heart" className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Профиль */}
          <TabsContent value="profile" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Личная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Имя</label>
                    <p className="text-gray-900">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Телефон</label>
                    <p className="text-gray-900">{user.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Компания</label>
                    <p className="text-gray-900">{user.company}</p>
                  </div>
                  <Button className="w-full">
                    <Icon name="Edit" className="h-4 w-4 mr-2" />
                    Редактировать профиль
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Настройки</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Email уведомления</span>
                    <Button variant="outline" size="sm">Включено</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">SMS уведомления</span>
                    <Button variant="outline" size="sm">Выключено</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Маркетинговые рассылки</span>
                    <Button variant="outline" size="sm">Включено</Button>
                  </div>
                  <Button variant="destructive" className="w-full">
                    <Icon name="Trash2" className="h-4 w-4 mr-2" />
                    Удалить аккаунт
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Поддержка */}
          <TabsContent value="support" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Связаться с нами</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Icon name="Phone" className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Телефон</p>
                      <p className="text-gray-600">+7 (495) 123-45-67</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Mail" className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">support@toolrental.ru</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="MessageCircle" className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Онлайн чат</p>
                      <p className="text-gray-600">Доступен 24/7</p>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Icon name="MessageSquare" className="h-4 w-4 mr-2" />
                    Написать в поддержку
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Часто задаваемые вопросы</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="border-b pb-2">
                    <p className="font-medium text-sm">Как изменить заказ?</p>
                    <p className="text-sm text-gray-600">За 2 часа до доставки...</p>
                  </div>
                  <div className="border-b pb-2">
                    <p className="font-medium text-sm">Что если инструмент сломался?</p>
                    <p className="text-sm text-gray-600">Сразу обратитесь в поддержку...</p>
                  </div>
                  <div className="border-b pb-2">
                    <p className="font-medium text-sm">Как продлить аренду?</p>
                    <p className="text-sm text-gray-600">Через личный кабинет или звонок...</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Icon name="HelpCircle" className="h-4 w-4 mr-2" />
                    Все вопросы
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;