import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from '@/components/ui/icon';

const Compare = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Все категории' },
    { id: 'drills', name: 'Перфораторы' },
    { id: 'grinders', name: 'Болгарки' },
    { id: 'mixers', name: 'Бетономешалки' },
    { id: 'generators', name: 'Генераторы' }
  ];

  const equipmentData = [
    {
      id: 'bosch-gbh-2-28',
      name: 'Bosch GBH 2-28',
      category: 'drills',
      type: 'Перфоратор',
      brand: 'Bosch',
      price: 350,
      rating: 4.8,
      image: '/api/placeholder/200/200',
      availability: 'В наличии',
      specifications: {
        power: '880 Вт',
        energy: '3.2 Дж',
        weight: '2.9 кг',
        chuck: 'SDS-plus',
        drilling: 'до 28 мм',
        concrete: 'до 28 мм',
        steel: 'до 13 мм',
        wood: 'до 30 мм'
      },
      features: [
        'Система SDS-plus',
        'Защита от пыли',
        'Режим долбления',
        'Обратное вращение',
        'Глубиномер'
      ],
      pros: ['Надежность', 'Низкая вибрация', 'Удобная эргономика'],
      cons: ['Высокая цена', 'Тяжелый вес'],
      deposit: 17500,
      minRental: '1 день'
    },
    {
      id: 'makita-hr2470',
      name: 'Makita HR2470',
      category: 'drills',
      type: 'Перфоратор',
      brand: 'Makita',
      price: 320,
      rating: 4.6,
      image: '/api/placeholder/200/200',
      availability: 'В наличии',
      specifications: {
        power: '780 Вт',
        energy: '2.7 Дж',
        weight: '2.8 кг',
        chuck: 'SDS-plus',
        drilling: 'до 24 мм',
        concrete: 'до 24 мм',
        steel: 'до 13 мм',
        wood: 'до 32 мм'
      },
      features: [
        'Система SDS-plus',
        'Антивибрационная ручка',
        '3 режима работы',
        'Предохранительная муфта',
        'Фиксатор кнопки'
      ],
      pros: ['Доступная цена', 'Легкий вес', 'Хорошая мощность'],
      cons: ['Средняя надежность', 'Шумный'],
      deposit: 16000,
      minRental: '1 день'
    },
    {
      id: 'dewalt-d25133k',
      name: 'DeWalt D25133K',
      category: 'drills',
      type: 'Перфоратор',
      brand: 'DeWalt',
      price: 380,
      rating: 4.7,
      image: '/api/placeholder/200/200',
      availability: 'В наличии',
      specifications: {
        power: '800 Вт',
        energy: '3.0 Дж',
        weight: '2.6 кг',
        chuck: 'SDS-plus',
        drilling: 'до 26 мм',
        concrete: 'до 26 мм',
        steel: 'до 13 мм',
        wood: 'до 30 мм'
      },
      features: [
        'Система SDS-plus',
        'Активный контроль вибрации',
        'Электронная муфта',
        'Светодиодная подсветка',
        'Кейс в комплекте'
      ],
      pros: ['Отличное качество', 'Низкая вибрация', 'Подсветка'],
      cons: ['Высокая стоимость', 'Сложность ремонта'],
      deposit: 19000,
      minRental: '1 день'
    },
    {
      id: 'angle-grinder-bosch',
      name: 'Bosch GWS 750',
      category: 'grinders',
      type: 'Болгарка',
      brand: 'Bosch',
      price: 250,
      rating: 4.5,
      image: '/api/placeholder/200/200',
      availability: 'В наличии',
      specifications: {
        power: '750 Вт',
        diameter: '125 мм',
        speed: '11000 об/мин',
        weight: '1.7 кг',
        spindle: 'M14',
        cutting: 'до 30 мм',
        grinding: 'универсальное'
      },
      features: [
        'Защитный кожух',
        'Дополнительная рукоятка',
        'Блокировка шпинделя',
        'Защита от перегрузки',
        'Быстрая замена диска'
      ],
      pros: ['Надежность', 'Удобство', 'Хорошая мощность'],
      cons: ['Шумная работа', 'Нагревается'],
      deposit: 12500,
      minRental: '4 часа'
    }
  ];

  const comparisonFeatures = [
    { key: 'price', label: 'Цена за день', unit: '₽' },
    { key: 'power', label: 'Мощность' },
    { key: 'weight', label: 'Вес' },
    { key: 'energy', label: 'Энергия удара' },
    { key: 'drilling', label: 'Сверление бетона' },
    { key: 'rating', label: 'Рейтинг', unit: '/5' },
    { key: 'deposit', label: 'Залог', unit: '₽' }
  ];

  const handleItemSelect = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else if (selectedItems.length < 4) {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const clearComparison = () => {
    setSelectedItems([]);
  };

  const filteredEquipment = equipmentData.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedEquipment = equipmentData.filter(item => selectedItems.includes(item.id));

  const getFeatureValue = (item: any, featureKey: string) => {
    switch (featureKey) {
      case 'price':
        return item.price;
      case 'rating':
        return item.rating;
      case 'deposit':
        return item.deposit;
      default:
        return item.specifications[featureKey] || '-';
    }
  };

  const getBestValue = (items: any[], featureKey: string) => {
    if (items.length === 0) return null;
    
    switch (featureKey) {
      case 'price':
      case 'deposit':
      case 'weight':
        return Math.min(...items.map(item => getFeatureValue(item, featureKey)));
      case 'rating':
        return Math.max(...items.map(item => getFeatureValue(item, featureKey)));
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Сравнение оборудования</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Сравните характеристики, цены и условия аренды различного оборудования 
            для выбора оптимального варианта
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Поиск оборудования..."
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
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedItems.length > 0 && (
            <Button variant="outline" onClick={clearComparison}>
              <Icon name="X" className="w-4 h-4 mr-2" />
              Очистить ({selectedItems.length})
            </Button>
          )}
        </div>

        {/* Comparison Table */}
        {selectedItems.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="GitCompare" className="w-6 h-6" />
                Сравнение выбранного оборудования
              </CardTitle>
              <CardDescription>
                Детальное сравнение характеристик и условий
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left p-2 border-b"></th>
                      {selectedEquipment.map((item) => (
                        <th key={item.id} className="text-center p-2 border-b min-w-[200px]">
                          <div className="space-y-2">
                            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-2">
                              <Icon name="Wrench" className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <div className="font-semibold text-sm">{item.name}</div>
                            <Badge variant="outline">{item.brand}</Badge>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((feature) => {
                      const bestValue = getBestValue(selectedEquipment, feature.key);
                      return (
                        <tr key={feature.key} className="border-b">
                          <td className="p-3 font-medium">{feature.label}</td>
                          {selectedEquipment.map((item) => {
                            const value = getFeatureValue(item, feature.key);
                            const isBest = bestValue !== null && value === bestValue;
                            return (
                              <td key={item.id} className="p-3 text-center">
                                <span className={isBest ? 'font-bold text-primary' : ''}>
                                  {value}{feature.unit || ''}
                                  {isBest && (
                                    <Icon name="Crown" className="w-4 h-4 ml-1 inline text-yellow-500" />
                                  )}
                                </span>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                    <tr className="border-b">
                      <td className="p-3 font-medium">Доступность</td>
                      {selectedEquipment.map((item) => (
                        <td key={item.id} className="p-3 text-center">
                          <Badge variant={item.availability === 'В наличии' ? 'default' : 'secondary'}>
                            {item.availability}
                          </Badge>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Особенности</td>
                      {selectedEquipment.map((item) => (
                        <td key={item.id} className="p-3">
                          <ul className="text-xs space-y-1">
                            {item.features.slice(0, 3).map((feature, index) => (
                              <li key={index} className="flex items-center gap-1">
                                <Icon name="Check" className="w-3 h-3 text-green-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Действия</td>
                      {selectedEquipment.map((item) => (
                        <td key={item.id} className="p-3 text-center">
                          <div className="space-y-2">
                            <Button size="sm" className="w-full">
                              <Icon name="ShoppingCart" className="w-4 h-4 mr-1" />
                              В корзину
                            </Button>
                            <Button variant="outline" size="sm" className="w-full">
                              Подробнее
                            </Button>
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Equipment Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEquipment.map((item) => {
            const isSelected = selectedItems.includes(item.id);
            const canSelect = selectedItems.length < 4 || isSelected;
            
            return (
              <Card 
                key={item.id} 
                className={`hover:shadow-lg transition-shadow ${isSelected ? 'ring-2 ring-primary' : ''} ${!canSelect ? 'opacity-50' : ''}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => handleItemSelect(item.id)}
                        disabled={!canSelect}
                      />
                      <Badge variant="outline">{item.type}</Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Star" className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm">{item.rating}</span>
                    </div>
                  </div>
                  
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <Icon name="Wrench" className="w-12 h-12 text-muted-foreground" />
                  </div>
                  
                  <div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <CardDescription>{item.brand}</CardDescription>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-primary">{item.price} ₽</div>
                      <div className="text-sm text-muted-foreground">за день</div>
                    </div>
                    <Badge variant={item.availability === 'В наличии' ? 'default' : 'secondary'}>
                      {item.availability}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Мощность:</span> {item.specifications.power}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Вес:</span> {item.specifications.weight}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Залог:</span> {item.deposit} ₽
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="text-sm font-medium mb-2">Преимущества:</div>
                    <div className="flex flex-wrap gap-1">
                      {item.pros.slice(0, 2).map((pro, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {pro}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Подробнее
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Icon name="ShoppingCart" className="w-4 h-4 mr-1" />
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Comparison Guide */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Info" className="w-6 h-6" />
              Как пользоваться сравнением
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Icon name="MousePointer" className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">1. Выберите оборудование</h3>
                <p className="text-sm text-muted-foreground">
                  Отметьте до 4 единиц техники для сравнения
                </p>
              </div>
              <div className="text-center">
                <Icon name="GitCompare" className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">2. Сравните характеристики</h3>
                <p className="text-sm text-muted-foreground">
                  Изучите таблицу сравнения всех параметров
                </p>
              </div>
              <div className="text-center">
                <Icon name="ShoppingCart" className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">3. Выберите лучший вариант</h3>
                <p className="text-sm text-muted-foreground">
                  Добавьте подходящую технику в корзину
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Compare;