import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Icon from '@/components/ui/icon';

const Calculator = () => {
  const [calculatorData, setCalculatorData] = useState({
    category: '',
    equipment: '',
    duration: 1,
    quantity: 1,
    delivery: false,
    insurance: false,
    urgentDelivery: false,
    weekend: false
  });

  const [result, setResult] = useState<any>(null);

  const equipmentCategories = [
    {
      id: 'hand-tools',
      name: 'Ручной инструмент',
      basePrice: 200,
      items: [
        { id: 'hammer-drill', name: 'Перфоратор', price: 300 },
        { id: 'angle-grinder', name: 'Болгарка', price: 250 },
        { id: 'jigsaw', name: 'Электролобзик', price: 200 },
        { id: 'circular-saw', name: 'Циркулярная пила', price: 350 }
      ]
    },
    {
      id: 'power-tools',
      name: 'Электроинструмент',
      basePrice: 500,
      items: [
        { id: 'rotary-hammer', name: 'Отбойный молоток', price: 800 },
        { id: 'mixer', name: 'Строительный миксер', price: 400 },
        { id: 'planer', name: 'Электрорубанок', price: 300 },
        { id: 'sanders', name: 'Шлифмашина', price: 350 }
      ]
    },
    {
      id: 'construction',
      name: 'Строительное оборудование',
      basePrice: 1500,
      items: [
        { id: 'concrete-mixer', name: 'Бетономешалка', price: 1200 },
        { id: 'compressor', name: 'Компрессор', price: 1800 },
        { id: 'generator', name: 'Генератор', price: 2000 },
        { id: 'welding', name: 'Сварочный аппарат', price: 900 }
      ]
    },
    {
      id: 'heavy-equipment',
      name: 'Спецтехника',
      basePrice: 8000,
      items: [
        { id: 'excavator', name: 'Мини-экскаватор', price: 12000 },
        { id: 'loader', name: 'Погрузчик', price: 10000 },
        { id: 'crane', name: 'Автокран', price: 15000 },
        { id: 'bulldozer', name: 'Бульдозер', price: 18000 }
      ]
    }
  ];

  const discountTiers = [
    { min: 1, max: 3, discount: 0, label: '1-3 дня' },
    { min: 4, max: 7, discount: 5, label: '4-7 дней' },
    { min: 8, max: 30, discount: 10, label: '8-30 дней' },
    { min: 31, max: 365, discount: 15, label: '31+ дней' }
  ];

  const popularCalculations = [
    {
      name: 'Ремонт квартиры',
      items: ['Перфоратор', 'Болгарка', 'Миксер'],
      duration: 7,
      estimated: '2,100 ₽'
    },
    {
      name: 'Строительство дома',
      items: ['Бетономешалка', 'Компрессор', 'Генератор'],
      duration: 30,
      estimated: '13,500 ₽'
    },
    {
      name: 'Дачные работы',
      items: ['Циркулярная пила', 'Электролобзик'],
      duration: 3,
      estimated: '1,650 ₽'
    }
  ];

  const calculatePrice = () => {
    const category = equipmentCategories.find(cat => cat.id === calculatorData.category);
    if (!category) return;

    const equipment = category.items.find(item => item.id === calculatorData.equipment);
    if (!equipment) return;

    let basePrice = equipment.price * calculatorData.quantity;
    
    // Apply duration discount
    const discount = discountTiers.find(tier => 
      calculatorData.duration >= tier.min && calculatorData.duration <= tier.max
    )?.discount || 0;
    
    const discountAmount = (basePrice * calculatorData.duration * discount) / 100;
    const rentalCost = (basePrice * calculatorData.duration) - discountAmount;
    
    // Additional services
    let deliveryCost = 0;
    if (calculatorData.delivery) {
      deliveryCost = calculatorData.urgentDelivery ? 1000 : 500;
    }
    
    const insuranceCost = calculatorData.insurance ? (rentalCost * 0.05) : 0;
    const weekendSurcharge = calculatorData.weekend ? (rentalCost * 0.1) : 0;
    
    const totalCost = rentalCost + deliveryCost + insuranceCost + weekendSurcharge;
    const deposit = equipment.price * calculatorData.quantity * (category.id === 'heavy-equipment' ? 2 : 1);
    
    setResult({
      equipment: equipment.name,
      category: category.name,
      duration: calculatorData.duration,
      quantity: calculatorData.quantity,
      basePrice,
      rentalCost,
      discount,
      discountAmount,
      deliveryCost,
      insuranceCost,
      weekendSurcharge,
      totalCost,
      deposit,
      dailyRate: equipment.price
    });
  };

  const resetCalculator = () => {
    setCalculatorData({
      category: '',
      equipment: '',
      duration: 1,
      quantity: 1,
      delivery: false,
      insurance: false,
      urgentDelivery: false,
      weekend: false
    });
    setResult(null);
  };

  const selectedCategory = equipmentCategories.find(cat => cat.id === calculatorData.category);
  const selectedEquipment = selectedCategory?.items.find(item => item.id === calculatorData.equipment);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Калькулятор стоимости аренды</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Рассчитайте точную стоимость аренды оборудования с учетом всех скидок, 
            дополнительных услуг и залога
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Calculator" className="w-6 h-6" />
                  Параметры расчета
                </CardTitle>
                <CardDescription>
                  Выберите оборудование и условия аренды
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Категория оборудования</Label>
                    <Select 
                      value={calculatorData.category} 
                      onValueChange={(value) => setCalculatorData({...calculatorData, category: value, equipment: ''})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                      <SelectContent>
                        {equipmentCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="equipment">Тип оборудования</Label>
                    <Select 
                      value={calculatorData.equipment}
                      onValueChange={(value) => setCalculatorData({...calculatorData, equipment: value})}
                      disabled={!calculatorData.category}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите оборудование" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedCategory?.items.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            <div className="flex items-center justify-between w-full">
                              <span>{item.name}</span>
                              <Badge variant="outline" className="ml-2">
                                {item.price} ₽/день
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Срок аrenды: {calculatorData.duration} {calculatorData.duration === 1 ? 'день' : calculatorData.duration < 5 ? 'дня' : 'дней'}</Label>
                    <div className="mt-2">
                      <Slider
                        value={[calculatorData.duration]}
                        onValueChange={(value) => setCalculatorData({...calculatorData, duration: value[0]})}
                        max={60}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>1 день</span>
                        <span>60 дней</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="quantity">Количество единиц</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      max="10"
                      value={calculatorData.quantity}
                      onChange={(e) => setCalculatorData({...calculatorData, quantity: parseInt(e.target.value) || 1})}
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="text-base font-semibold">Дополнительные услуги</Label>
                  <div className="grid md:grid-cols-2 gap-4 mt-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="delivery"
                        checked={calculatorData.delivery}
                        onCheckedChange={(checked) => setCalculatorData({...calculatorData, delivery: !!checked})}
                      />
                      <Label htmlFor="delivery" className="text-sm">
                        Доставка (+500 ₽)
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="urgentDelivery"
                        checked={calculatorData.urgentDelivery}
                        onCheckedChange={(checked) => setCalculatorData({...calculatorData, urgentDelivery: !!checked})}
                        disabled={!calculatorData.delivery}
                      />
                      <Label htmlFor="urgentDelivery" className="text-sm">
                        Экспресс-доставка (+500 ₽)
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="insurance"
                        checked={calculatorData.insurance}
                        onCheckedChange={(checked) => setCalculatorData({...calculatorData, insurance: !!checked})}
                      />
                      <Label htmlFor="insurance" className="text-sm">
                        Расширенное страхование (+5%)
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="weekend"
                        checked={calculatorData.weekend}
                        onCheckedChange={(checked) => setCalculatorData({...calculatorData, weekend: !!checked})}
                      />
                      <Label htmlFor="weekend" className="text-sm">
                        Работа в выходные (+10%)
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button onClick={calculatePrice} disabled={!calculatorData.equipment}>
                    <Icon name="Calculator" className="w-4 h-4 mr-2" />
                    Рассчитать стоимость
                  </Button>
                  <Button variant="outline" onClick={resetCalculator}>
                    <Icon name="RotateCcw" className="w-4 h-4 mr-2" />
                    Сбросить
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Discount Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Percent" className="w-6 h-6" />
                  Система скидок
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {discountTiers.map((tier, index) => (
                    <div key={index} className="text-center p-3 border rounded-lg">
                      <div className="font-semibold text-sm">{tier.label}</div>
                      <div className="text-2xl font-bold text-primary">{tier.discount}%</div>
                      <div className="text-xs text-muted-foreground">скидка</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results and Additional Info */}
          <div className="space-y-6">
            {/* Calculation Result */}
            {result && (
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Receipt" className="w-6 h-6" />
                    Расчет стоимости
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="font-medium">{result.equipment}</div>
                    <div className="text-sm text-muted-foreground">{result.category}</div>
                  </div>

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Количество:</span>
                      <span>{result.quantity} шт.</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Срок аренды:</span>
                      <span>{result.duration} дн.</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Цена за день:</span>
                      <span>{result.dailyRate} ₽</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Стоимость аренды:</span>
                      <span>{result.basePrice * result.duration} ₽</span>
                    </div>
                    {result.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Скидка ({result.discount}%):</span>
                        <span>-{result.discountAmount} ₽</span>
                      </div>
                    )}
                    {result.deliveryCost > 0 && (
                      <div className="flex justify-between">
                        <span>Доставка:</span>
                        <span>+{result.deliveryCost} ₽</span>
                      </div>
                    )}
                    {result.insuranceCost > 0 && (
                      <div className="flex justify-between">
                        <span>Страхование:</span>
                        <span>+{Math.round(result.insuranceCost)} ₽</span>
                      </div>
                    )}
                    {result.weekendSurcharge > 0 && (
                      <div className="flex justify-between">
                        <span>Доплата выходные:</span>
                        <span>+{Math.round(result.weekendSurcharge)} ₽</span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="font-semibold text-lg flex justify-between">
                    <span>Итого к оплате:</span>
                    <span className="text-primary">{Math.round(result.totalCost)} ₽</span>
                  </div>

                  <div className="font-medium flex justify-between text-orange-600">
                    <span>Залог:</span>
                    <span>{result.deposit} ₽</span>
                  </div>

                  <Button className="w-full mt-4">
                    <Icon name="ShoppingCart" className="w-4 h-4 mr-2" />
                    Добавить в корзину
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Popular Calculations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="TrendingUp" className="w-6 h-6" />
                  Популярные расчеты
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {popularCalculations.map((calc, index) => (
                    <div key={index} className="p-3 border rounded-lg hover:bg-muted cursor-pointer">
                      <div className="font-medium text-sm">{calc.name}</div>
                      <div className="text-xs text-muted-foreground mb-2">
                        {calc.items.join(', ')}
                      </div>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{calc.duration} дней</Badge>
                        <span className="font-semibold text-primary">{calc.estimated}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Quote */}
            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Phone" className="w-6 h-6" />
                  Нужна консультация?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Наши специалисты помогут подобрать оптимальное оборудование и рассчитают точную стоимость
                </p>
                <Button variant="secondary" className="w-full">
                  <Icon name="Phone" className="w-4 h-4 mr-2" />
                  Позвонить специалисту
                </Button>
              </CardContent>
            </Card>

            {/* Calculator Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Lightbulb" className="w-6 h-6" />
                  Полезные советы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Icon name="Check" className="w-4 h-4 mt-0.5 text-green-500" />
                    <span>Аренда от 8 дней дает скидку 10%</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" className="w-4 h-4 mt-0.5 text-green-500" />
                    <span>Самовывоз дает дополнительную скидку 3%</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" className="w-4 h-4 mt-0.5 text-green-500" />
                    <span>Комплект из 3+ инструментов со скидкой 5%</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Info" className="w-4 h-4 mt-0.5 text-blue-500" />
                    <span>Залог возвращается полностью при своевременном возврате</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;