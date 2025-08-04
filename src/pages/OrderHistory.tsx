import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from '@/components/ui/icon';

const OrderHistory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const orders = [
    {
      id: 'ORD-2024-001',
      date: '2024-07-28',
      status: 'active',
      items: [
        { name: 'Bosch GBH 2-28 Перфоратор', quantity: 1, price: 350, days: 5 },
        { name: 'Makita Болгарка 125мм', quantity: 1, price: 250, days: 5 }
      ],
      totalAmount: 3000,
      deposit: 30000,
      depositReturned: 0,
      rentalPeriod: { start: '2024-07-28', end: '2024-08-02' },
      deliveryAddress: 'г. Москва, ул. Строительная, 25',
      deliveryType: 'Доставка курьером',
      paymentMethod: 'Банковская карта',
      rating: null,
      canExtend: true,
      canReorder: false
    },
    {
      id: 'ORD-2024-002',
      date: '2024-07-15',
      status: 'completed',
      items: [
        { name: 'DeWalt Генератор 3кВт', quantity: 1, price: 2000, days: 3 },
        { name: 'Удлинительный кабель 25м', quantity: 1, price: 100, days: 3 }
      ],
      totalAmount: 6300,
      deposit: 100000,
      depositReturned: 100000,
      rentalPeriod: { start: '2024-07-15', end: '2024-07-18' },
      deliveryAddress: 'г. Москва, пр. Мира, 45',
      deliveryType: 'Самовывоз',
      paymentMethod: 'Наличные',
      rating: 5,
      canExtend: false,
      canReorder: true,
      feedback: 'Отличное оборудование, все работало без нареканий'
    },
    {
      id: 'ORD-2024-003',
      date: '2024-07-01',
      status: 'completed',
      items: [
        { name: 'Makita Бетономешалка 180л', quantity: 1, price: 1200, days: 7 }
      ],
      totalAmount: 8400,
      deposit: 60000,
      depositReturned: 60000,
      rentalPeriod: { start: '2024-07-01', end: '2024-07-08' },
      deliveryAddress: 'МО, г. Королев, ул. Ленина, 12',
      deliveryType: 'Доставка курьером',
      paymentMethod: 'Безналичный расчет',
      rating: 4,
      canExtend: false,
      canReorder: true,
      feedback: 'Хорошая техника, но была небольшая задержка с доставкой'
    },
    {
      id: 'ORD-2024-004',
      date: '2024-06-20',
      status: 'cancelled',
      items: [
        { name: 'Compressor 50L', quantity: 1, price: 1800, days: 2 }
      ],
      totalAmount: 3600,
      deposit: 0,
      depositReturned: 0,
      rentalPeriod: { start: '2024-06-22', end: '2024-06-24' },
      deliveryAddress: 'г. Москва, ул. Тверская, 10',
      deliveryType: 'Доставка курьером',
      paymentMethod: 'Банковская карта',
      rating: null,
      canExtend: false,
      canReorder: true,
      cancelReason: 'Отменено клиентом за день до аренды'
    },
    {
      id: 'ORD-2024-005',
      date: '2024-06-15',
      status: 'overdue',
      items: [
        { name: 'Hilti TE 7-C Перфоратор', quantity: 1, price: 420, days: 3 }
      ],
      totalAmount: 1260,
      deposit: 21000,
      depositReturned: 0,
      rentalPeriod: { start: '2024-06-15', end: '2024-06-18' },
      deliveryAddress: 'г. Москва, Садовое кольцо, 5',
      deliveryType: 'Экспресс доставка',
      paymentMethod: 'Наличные',
      rating: null,
      canExtend: true,
      canReorder: false,
      overdueDay: 45,
      penalty: 18900
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'completed': return 'secondary';
      case 'cancelled': return 'outline';
      case 'overdue': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Активный';
      case 'completed': return 'Завершен';
      case 'cancelled': return 'Отменен';
      case 'overdue': return 'Просрочен';
      default: return status;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case 'amount':
        return b.totalAmount - a.totalAmount;
      case 'id':
        return a.id.localeCompare(b.id);
      case 'date':
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const stats = {
    total: orders.length,
    active: orders.filter(o => o.status === 'active').length,
    completed: orders.filter(o => o.status === 'completed').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    overdue: orders.filter(o => o.status === 'overdue').length,
    totalSpent: orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.totalAmount, 0),
    avgRating: orders.filter(o => o.rating).reduce((sum, o, _, arr) => sum + (o.rating || 0) / arr.length, 0)
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">История заказов</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Все ваши заказы в одном месте. Отслеживайте статус, повторяйте заказы 
            и оставляйте отзывы о работе с оборудованием
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <Icon name="ShoppingBag" className="w-6 h-6 mx-auto mb-2 text-blue-500" />
              <div className="text-xl font-bold">{stats.total}</div>
              <div className="text-xs text-muted-foreground">Всего заказов</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Icon name="Clock" className="w-6 h-6 mx-auto mb-2 text-green-500" />
              <div className="text-xl font-bold">{stats.active}</div>
              <div className="text-xs text-muted-foreground">Активных</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Icon name="CheckCircle" className="w-6 h-6 mx-auto mb-2 text-blue-500" />
              <div className="text-xl font-bold">{stats.completed}</div>
              <div className="text-xs text-muted-foreground">Завершено</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Icon name="XCircle" className="w-6 h-6 mx-auto mb-2 text-gray-500" />
              <div className="text-xl font-bold">{stats.cancelled}</div>
              <div className="text-xs text-muted-foreground">Отменено</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Icon name="AlertTriangle" className="w-6 h-6 mx-auto mb-2 text-red-500" />
              <div className="text-xl font-bold">{stats.overdue}</div>
              <div className="text-xs text-muted-foreground">Просрочено</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Icon name="CreditCard" className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <div className="text-lg font-bold">{stats.totalSpent.toLocaleString()} ₽</div>
              <div className="text-xs text-muted-foreground">Потрачено</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Поиск по номеру заказа или оборудованию..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Статус" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="active">Активные</SelectItem>
              <SelectItem value="completed">Завершенные</SelectItem>
              <SelectItem value="cancelled">Отмененные</SelectItem>
              <SelectItem value="overdue">Просроченные</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">По дате</SelectItem>
              <SelectItem value="amount">По сумме</SelectItem>
              <SelectItem value="id">По номеру</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {sortedOrders.map((order) => (
            <Card key={order.id} className={`${order.status === 'overdue' ? 'border-red-200' : ''}`}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <span>Заказ {order.id}</span>
                      <Badge variant={getStatusColor(order.status)}>
                        {getStatusText(order.status)}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {order.date} • {order.items.length} позиций • {order.totalAmount.toLocaleString()} ₽
                    </CardDescription>
                  </div>
                  
                  <div className="flex gap-2">
                    {order.canExtend && (
                      <Button variant="outline" size="sm">
                        <Icon name="Plus" className="w-4 h-4 mr-1" />
                        Продлить
                      </Button>
                    )}
                    {order.canReorder && (
                      <Button variant="outline" size="sm">
                        <Icon name="RotateCcw" className="w-4 h-4 mr-1" />
                        Повторить
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Icon name="Download" className="w-4 h-4 mr-1" />
                      Скачать
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Детали</TabsTrigger>
                    <TabsTrigger value="items">Оборудование</TabsTrigger>
                    <TabsTrigger value="payment">Оплата</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Период аренды</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Icon name="Calendar" className="w-4 h-4 text-muted-foreground" />
                            <span>Начало: {order.rentalPeriod.start}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="Calendar" className="w-4 h-4 text-muted-foreground" />
                            <span>Окончание: {order.rentalPeriod.end}</span>
                          </div>
                          {order.status === 'overdue' && (
                            <div className="flex items-center gap-2 text-red-600">
                              <Icon name="AlertTriangle" className="w-4 h-4" />
                              <span>Просрочка: {order.overdueDay} дней</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3">Доставка</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Icon name="Truck" className="w-4 h-4 text-muted-foreground" />
                            <span>{order.deliveryType}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Icon name="MapPin" className="w-4 h-4 text-muted-foreground mt-0.5" />
                            <span>{order.deliveryAddress}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {order.status === 'completed' && order.rating && (
                      <div>
                        <h4 className="font-semibold mb-2">Ваша оценка</h4>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Icon 
                                key={star}
                                name="Star" 
                                className={`w-4 h-4 ${star <= order.rating! ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">({order.rating}/5)</span>
                        </div>
                        {order.feedback && (
                          <p className="text-sm text-muted-foreground">{order.feedback}</p>
                        )}
                      </div>
                    )}
                    
                    {order.status === 'cancelled' && order.cancelReason && (
                      <div>
                        <h4 className="font-semibold mb-2">Причина отмены</h4>
                        <p className="text-sm text-muted-foreground">{order.cancelReason}</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="items" className="space-y-4">
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                              <Icon name="Wrench" className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {item.quantity} шт. × {item.days} дн.
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{(item.price * item.days * item.quantity).toLocaleString()} ₽</div>
                            <div className="text-sm text-muted-foreground">{item.price} ₽/день</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="payment" className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Способ оплаты</h4>
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="CreditCard" className="w-4 h-4 text-muted-foreground" />
                          <span>{order.paymentMethod}</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3">Детали платежа</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Стоимость аренды:</span>
                            <span>{order.totalAmount.toLocaleString()} ₽</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Залог:</span>
                            <span>{order.deposit.toLocaleString()} ₽</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Возвращено залога:</span>
                            <span className={order.depositReturned > 0 ? 'text-green-600' : 'text-orange-600'}>
                              {order.depositReturned.toLocaleString()} ₽ 
                            </span>
                          </div>
                          {order.penalty && (
                            <div className="flex justify-between text-red-600">
                              <span>Штраф за просрочку:</span>
                              <span>{order.penalty.toLocaleString()} ₽</span>
                            </div>
                          )}
                          <Separator />
                          <div className="flex justify-between font-semibold">
                            <span>Итого к доплате:</span>
                            <span className="text-primary">
                              {(order.penalty || 0).toLocaleString()} ₽
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedOrders.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Icon name="ShoppingBag" className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Заказы не найдены</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery || statusFilter !== 'all' 
                  ? 'Попробуйте изменить параметры поиска'
                  : 'У вас пока нет заказов. Начните с выбора оборудования в каталоге'
                }
              </p>
              <Button>
                <Icon name="Search" className="w-4 h-4 mr-2" />
                Перейти к каталогу
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="mt-12 text-center">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-4">Нужна помощь с заказом?</h3>
              <p className="mb-6">
                Наши специалисты готовы помочь с любыми вопросами по истории заказов
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg">
                  <Icon name="Phone" className="w-4 h-4 mr-2" />
                  Позвонить в поддержку
                </Button>
                <Button variant="secondary" size="lg">
                  <Icon name="MessageCircle" className="w-4 h-4 mr-2" />
                  Онлайн-чат
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;