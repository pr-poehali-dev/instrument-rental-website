import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    {
      title: 'Общая выручка',
      value: '₽2,847,500',
      change: '+12.5%',
      icon: 'TrendingUp',
      color: 'text-green-600'
    },
    {
      title: 'Активные заказы',
      value: '47',
      change: '+8.2%',
      icon: 'ShoppingCart',
      color: 'text-blue-600'
    },
    {
      title: 'Инструменты в аренде',
      value: '234',
      change: '+15.3%',
      icon: 'Wrench',
      color: 'text-orange-600'
    },
    {
      title: 'Новые клиенты',
      value: '89',
      change: '+22.1%',
      icon: 'Users',
      color: 'text-purple-600'
    }
  ];

  const recentOrders = [
    {
      id: '#7842',
      customer: 'Алексей Петров',
      tools: 'Перфоратор Bosch + Болгарка DeWalt',
      amount: '₽2,800',
      status: 'active',
      date: '2 дня назад'
    },
    {
      id: '#7841',
      customer: 'Мария Иванова',
      tools: 'Дрель аккумуляторная Bosch',
      amount: '₽900',
      status: 'completed',
      date: '3 дня назад'
    },
    {
      id: '#7840',
      customer: 'Сергей Сидоров',
      tools: 'Отбойный молоток Makita',
      amount: '₽5,000',
      status: 'pending',
      date: '5 дней назад'
    }
  ];

  const lowStockTools = [
    { name: 'Миксер строительный Metabo', stock: 1, critical: true },
    { name: 'Болгарка DeWalt 180мм', stock: 2, critical: false },
    { name: 'Перфоратор Milwaukee M18', stock: 1, critical: true },
    { name: 'Дрель ударная Makita', stock: 3, critical: false }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Активный</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">Завершён</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Ожидает</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Icon name="Settings" size={32} className="text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Админ-панель</h1>
                <p className="text-gray-600">Управление инструментами RentTools</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Icon name="Bell" size={16} className="mr-2" />
                Уведомления
              </Button>
              <Avatar>
                <AvatarImage src="/img/admin-avatar.jpg" />
                <AvatarFallback>АП</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-none lg:inline-flex">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <Icon name="BarChart3" size={16} />
              <span>Дашборд</span>
            </TabsTrigger>
            <TabsTrigger value="tools" className="flex items-center space-x-2">
              <Icon name="Wrench" size={16} />
              <span>Инструменты</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center space-x-2">
              <Icon name="ShoppingCart" size={16} />
              <span>Заказы</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <Icon name="TrendingUp" size={16} />
              <span>Аналитика</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="mt-6">
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </CardTitle>
                      <Icon name={stat.icon as any} size={20} className={stat.color} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-green-600 mt-1">
                        {stat.change} с прошлого месяца
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <Card>
                  <CardHeader>
                    <CardTitle>Недавние заказы</CardTitle>
                    <CardDescription>
                      Последние заказы в системе
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <div>
                                <p className="font-medium">{order.customer}</p>
                                <p className="text-sm text-gray-600">{order.tools}</p>
                                <p className="text-xs text-gray-500">{order.date}</p>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{order.amount}</p>
                            <div className="mt-1">
                              {getStatusBadge(order.status)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-4" />
                    <Button variant="outline" className="w-full">
                      <Icon name="ArrowRight" size={16} className="mr-2" />
                      Посмотреть все заказы
                    </Button>
                  </CardContent>
                </Card>

                {/* Low Stock Alert */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Icon name="AlertTriangle" size={20} className="mr-2 text-orange-600" />
                      Низкие запасы
                    </CardTitle>
                    <CardDescription>
                      Инструменты с низким количеством на складе
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {lowStockTools.map((tool, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{tool.name}</p>
                            <p className="text-xs text-gray-600">На складе: {tool.stock} шт.</p>
                          </div>
                          <Badge 
                            variant={tool.critical ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {tool.critical ? 'Критично' : 'Низкий'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-4" />
                    <Button variant="outline" className="w-full">
                      <Icon name="Package" size={16} className="mr-2" />
                      Управление складом
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Быстрые действия</CardTitle>
                  <CardDescription>
                    Часто используемые функции администратора
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col space-y-2"
                      onClick={() => setActiveTab('tools')}
                    >
                      <Icon name="Plus" size={24} />
                      <span className="text-sm">Добавить инструмент</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col space-y-2"
                      onClick={() => setActiveTab('orders')}
                    >
                      <Icon name="FileText" size={24} />
                      <span className="text-sm">Новый заказ</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col space-y-2">
                      <Icon name="Users" size={24} />
                      <span className="text-sm">Клиенты</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col space-y-2">
                      <Icon name="Settings" size={24} />
                      <span className="text-sm">Настройки</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tools Management Tab */}
          <TabsContent value="tools" className="mt-6">
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Переходим к полнофункциональному управлению инструментами</p>
              <button 
                onClick={() => window.location.href = '/admin/tools'}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
              >
                Открыть управление инструментами
              </button>
            </div>
          </TabsContent>

          {/* Orders Management Tab */}
          <TabsContent value="orders" className="mt-6">
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Переходим к управлению заказами</p>
              <button 
                onClick={() => window.location.href = '/admin/orders'}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
              >
                Открыть управление заказами
              </button>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-6">
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Переходим к детальной аналитике</p>
              <button 
                onClick={() => window.location.href = '/admin/analytics'}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
              >
                Открыть аналитику
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;