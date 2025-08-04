import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from '@/components/ui/icon';

const Delivery = () => {
  const [selectedZone, setSelectedZone] = useState('');
  const [calculatorData, setCalculatorData] = useState({
    weight: '',
    dimensions: '',
    address: ''
  });

  const deliveryZones = [
    {
      name: 'В пределах МКАД',
      price: 'Бесплатно',
      time: '2-4 часа',
      description: 'Стандартная доставка по Москве',
      color: 'default'
    },
    {
      name: 'До 10 км от МКАД',
      price: '500 ₽',
      time: '3-5 часов',
      description: 'Ближайшее Подмосковье',
      color: 'secondary'
    },
    {
      name: '10-50 км от МКАД',
      price: '50 ₽/км',
      time: '4-6 часов',
      description: 'Московская область',
      color: 'outline'
    },
    {
      name: 'Свыше 50 км',
      price: 'По договоренности',
      time: 'От 1 дня',
      description: 'Дальнее Подмосковье',
      color: 'destructive'
    }
  ];

  const deliveryOptions = [
    {
      type: 'standard',
      name: 'Стандартная доставка',
      time: '2-4 часа',
      price: 'Бесплатно в пределах МКАД',
      icon: 'Truck',
      features: ['Погрузка/разгрузка', 'Подъем до 3 этажа', 'Инструктаж']
    },
    {
      type: 'express',
      name: 'Экспресс доставка',
      time: 'В течение часа',
      price: '+500 ₽',
      icon: 'Zap',
      features: ['Приоритетная доставка', 'Погрузка/разгрузка', 'Инструктаж']
    },
    {
      type: 'scheduled',
      name: 'Доставка к определенному времени',
      time: 'К указанному времени',
      price: '+300 ₽',
      icon: 'Clock',
      features: ['Точное время', 'Погрузка/разгрузка', 'Инструктаж']
    },
    {
      type: 'pickup',
      name: 'Самовывоз',
      time: 'Круглосуточно',
      price: 'Бесплатно',
      icon: 'Store',
      features: ['Упаковка', 'Проверка комплектности', 'Инструктаж']
    }
  ];

  const equipmentTypes = [
    { category: 'Ручной инструмент', minOrder: '0 ₽', delivery: 'От 500 ₽' },
    { category: 'Электроинструмент', minOrder: '1000 ₽', delivery: 'Бесплатно' },
    { category: 'Строительное оборудование', minOrder: '2000 ₽', delivery: 'Бесплатно' },
    { category: 'Спецтехника', minOrder: '5000 ₽', delivery: 'Включена' }
  ];

  const returnOptions = [
    {
      name: 'Обратный вызов курьера',
      price: '+500 ₽',
      time: 'В удобное время',
      description: 'Курьер заберет оборудование по окончании аренды'
    },
    {
      name: 'Возврат в офис',
      price: 'Бесплатно',
      time: 'Рабочие часы',
      description: 'Верните технику в любой наш офис'
    },
    {
      name: 'Продление на месте',
      price: 'По тарифу',
      time: 'Звонок за 24 часа',
      description: 'Продлите аренду без возврата техники'
    }
  ];

  const workingHours = [
    { day: 'Понедельник - Пятница', hours: '8:00 - 20:00' },
    { day: 'Суббота', hours: '9:00 - 18:00' },
    { day: 'Воскресенье', hours: '10:00 - 16:00' },
    { day: 'Экспресс доставка', hours: '24/7' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Доставка и возврат</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Быстрая доставка оборудования по Москве и области. Гибкие условия возврата 
            и удобные варианты получения техники
          </p>
        </div>

        <Tabs defaultValue="delivery" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="delivery">Доставка</TabsTrigger>
            <TabsTrigger value="zones">Зоны и тарифы</TabsTrigger>
            <TabsTrigger value="return">Возврат</TabsTrigger>
            <TabsTrigger value="pickup">Самовывоз</TabsTrigger>
          </TabsList>

          <TabsContent value="delivery" className="space-y-8">
            {/* Delivery Options */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {deliveryOptions.map((option, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name={option.icon as any} className="w-6 h-6 text-primary" />
                      {option.name}
                    </CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge variant="outline">{option.time}</Badge>
                        <Badge variant="secondary">{option.price}</Badge>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {option.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Icon name="Check" className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-4" variant="outline">
                      Выбрать этот вариант
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Working Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Clock" className="w-6 h-6" />
                  Режим работы доставки
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {workingHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="font-medium">{schedule.day}</span>
                      <Badge variant="outline">{schedule.hours}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="zones" className="space-y-8">
            {/* Delivery Zones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {deliveryZones.map((zone, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {zone.name}
                      <Badge variant={zone.color as any}>{zone.price}</Badge>
                    </CardTitle>
                    <CardDescription>{zone.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Время доставки: {zone.time}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Equipment Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Package" className="w-6 h-6" />
                  Минимальный заказ для бесплатной доставки
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {equipmentTypes.map((type, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{type.category}</div>
                        <div className="text-sm text-muted-foreground">От {type.minOrder}</div>
                      </div>
                      <Badge variant="outline">{type.delivery}</Badge>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Info" className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">Важная информация</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• При заказе на сумму менее минимальной стоимость доставки составляет 500 ₽</li>
                    <li>• Для крупногабаритной техники доставка включена в стоимость аренды</li>
                    <li>• Ночная доставка (22:00-6:00) оплачивается дополнительно +1000 ₽</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Calculator */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Calculator" className="w-6 h-6" />
                  Калькулятор стоимости доставки
                </CardTitle>
                <CardDescription>
                  Рассчитайте точную стоимость доставки до вашего адреса
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="address">Адрес доставки</Label>
                    <Input
                      id="address"
                      value={calculatorData.address}
                      onChange={(e) => setCalculatorData({...calculatorData, address: e.target.value})}
                      placeholder="Введите адрес"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zone">Зона доставки</Label>
                    <Select value={selectedZone} onValueChange={setSelectedZone}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите зону" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mkad">В пределах МКАД</SelectItem>
                        <SelectItem value="10km">До 10 км от МКАД</SelectItem>
                        <SelectItem value="50km">10-50 км от МКАД</SelectItem>
                        <SelectItem value="far">Свыше 50 км</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="mt-4">
                  <Icon name="Calculator" className="w-4 h-4 mr-2" />
                  Рассчитать стоимость
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="return" className="space-y-8">
            {/* Return Options */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {returnOptions.map((option, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{option.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Badge variant="outline">{option.price}</Badge>
                      <Badge variant="secondary">{option.time}</Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
                    <Button variant="outline" className="w-full">
                      Выбрать
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Return Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="CheckCircle" className="w-6 h-6" />
                  Требования к возврату
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 text-green-600">Что должно быть в порядке</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Icon name="Check" className="w-4 h-4 mt-1 text-green-500" />
                        <span className="text-sm">Оборудование в рабочем состоянии</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" className="w-4 h-4 mt-1 text-green-500" />
                        <span className="text-sm">Полная комплектность (все аксессуары)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" className="w-4 h-4 mt-1 text-green-500" />
                        <span className="text-sm">Очистка от загрязнений</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" className="w-4 h-4 mt-1 text-green-500" />
                        <span className="text-sm">Возврат в оригинальной упаковке</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-red-600">Что может повлечь доплату</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Icon name="X" className="w-4 h-4 mt-1 text-red-500" />
                        <span className="text-sm">Повреждения от неправильного использования</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="X" className="w-4 h-4 mt-1 text-red-500" />
                        <span className="text-sm">Утеря комплектующих или аксессуаров</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="X" className="w-4 h-4 mt-1 text-red-500" />
                        <span className="text-sm">Просрочка возврата</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="X" className="w-4 h-4 mt-1 text-red-500" />
                        <span className="text-sm">Необходимость дополнительной очистки</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Return Process */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="RotateCcw" className="w-6 h-6" />
                  Процесс возврата
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Icon name="Phone" className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <h4 className="font-medium mb-1">1. Уведомление</h4>
                    <p className="text-xs text-muted-foreground">Позвоните за 2 часа до возврата</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Icon name="Package" className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <h4 className="font-medium mb-1">2. Подготовка</h4>
                    <p className="text-xs text-muted-foreground">Упакуйте и проверьте комплектность</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Icon name="Truck" className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <h4 className="font-medium mb-1">3. Передача</h4>
                    <p className="text-xs text-muted-foreground">Курьер или доставка в офис</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Icon name="CheckCircle" className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <h4 className="font-medium mb-1">4. Проверка</h4>
                    <p className="text-xs text-muted-foreground">Возврат залога после проверки</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pickup" className="space-y-8">
            {/* Pickup Locations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="MapPin" className="w-6 h-6" />
                  Пункты самовывоза
                </CardTitle>
                <CardDescription>
                  Заберите оборудование в удобном для вас офисе
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Офис на Строительной</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Icon name="MapPin" className="w-4 h-4 text-muted-foreground" />
                        <span>ул. Строительная, 15к2</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Clock" className="w-4 h-4 text-muted-foreground" />
                        <span>Пн-Пт: 8:00-20:00</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Car" className="w-4 h-4 text-muted-foreground" />
                        <span>Парковка есть</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="mt-3 w-full">
                      <Icon name="Navigation" className="w-4 h-4 mr-1" />
                      Маршрут
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Склад в Люберцах</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Icon name="MapPin" className="w-4 h-4 text-muted-foreground" />
                        <span>г. Люберцы, пр. Гагарина, 45</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Clock" className="w-4 h-4 text-muted-foreground" />
                        <span>Ежедневно: 9:00-19:00</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Car" className="w-4 h-4 text-muted-foreground" />
                        <span>Большая парковка</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="mt-3 w-full">
                      <Icon name="Navigation" className="w-4 h-4 mr-1" />
                      Маршрут
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Пункт выдачи ЗИЛ</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Icon name="MapPin" className="w-4 h-4 text-muted-foreground" />
                        <span>2-й Автозаводский пр., 5</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Clock" className="w-4 h-4 text-muted-foreground" />
                        <span>Пн-Сб: 10:00-18:00</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Train" className="w-4 h-4 text-muted-foreground" />
                        <span>Рядом с метро ЗИЛ</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="mt-3 w-full">
                      <Icon name="Navigation" className="w-4 h-4 mr-1" />
                      Маршрут
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pickup Process */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Package2" className="w-6 h-6" />
                  Как получить заказ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 border rounded-lg">
                    <Icon name="ShoppingCart" className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <h4 className="font-medium mb-1">1. Оформите заказ</h4>
                    <p className="text-xs text-muted-foreground">
                      На сайте или по телефону, выберите "Самовывоз"
                    </p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Icon name="Bell" className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <h4 className="font-medium mb-1">2. Дождитесь уведомления</h4>
                    <p className="text-xs text-muted-foreground">
                      Мы сообщим, когда заказ будет готов к выдаче
                    </p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Icon name="Key" className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <h4 className="font-medium mb-1">3. Получите оборудование</h4>
                    <p className="text-xs text-muted-foreground">
                      Предъявите документы и получите технику
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pickup Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Star" className="w-6 h-6" />
                  Преимущества самовывоза
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Экономия</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Icon name="Check" className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Бесплатная услуга</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Дополнительная скидка 3%</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Возможность торга на месте</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Удобство</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Icon name="Check" className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Личный осмотр техники</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Подробная консультация</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Выбор из наличия на складе</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Contact CTA */}
        <Card className="mt-12 bg-primary text-primary-foreground">
          <CardContent className="pt-6 text-center">
            <h3 className="text-2xl font-bold mb-4">Нужна помощь с доставкой?</h3>
            <p className="mb-6">
              Наши специалисты помогут выбрать оптимальный способ доставки
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                <Icon name="Phone" className="w-4 h-4 mr-2" />
                8 (800) 555-01-23
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
  );
};

export default Delivery;