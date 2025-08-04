import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from '@/components/ui/icon';

const Favorites = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('dateAdded');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const favorites = [
    {
      id: 'bosch-gbh-2-28',
      name: 'Bosch GBH 2-28 Перфоратор',
      category: 'Электроинструмент',
      price: 350,
      originalPrice: 400,
      rating: 4.8,
      reviews: 124,
      image: '/api/placeholder/200/200',
      availability: 'В наличии',
      dateAdded: '2024-07-25',
      discount: 12,
      isNew: false,
      isPopular: true,
      deposit: 17500,
      minRental: '1 день',
      features: ['SDS-plus', 'Защита от пыли', '3 режима'],
      lastViewed: '2024-08-01'
    },
    {
      id: 'makita-concrete-mixer',
      name: 'Makita Бетономешалка 180л',
      category: 'Строительное оборудование', 
      price: 1200,
      originalPrice: 1200,
      rating: 4.6,
      reviews: 89,
      image: '/api/placeholder/200/200',
      availability: 'В наличии',
      dateAdded: '2024-07-22',
      discount: 0,
      isNew: true,
      isPopular: false,
      deposit: 60000,
      minRental: '1 день',
      features: ['180л объем', 'Электропривод', 'Колеса'],
      lastViewed: '2024-07-30'
    },
    {
      id: 'dewalt-generator',
      name: 'DeWalt Генератор 3кВт',
      category: 'Строительное оборудование',
      price: 2000,
      originalPrice: 2200,
      rating: 4.7,
      reviews: 67,
      image: '/api/placeholder/200/200',
      availability: 'Ограниченно',
      dateAdded: '2024-07-20',
      discount: 9,
      isNew: false,
      isPopular: true,
      deposit: 100000,
      minRental: '1 день',
      features: ['3кВт мощность', 'Электростарт', 'Автономная работа'],
      lastViewed: '2024-07-28'
    },
    {
      id: 'bosch-gws-750',
      name: 'Bosch GWS 750 Болгарка',
      category: 'Электроинструмент',
      price: 250,
      originalPrice: 280,
      rating: 4.5,
      reviews: 156,
      image: '/api/placeholder/200/200',
      availability: 'В наличии',
      dateAdded: '2024-07-18',
      discount: 11,
      isNew: false,
      isPopular: false,
      deposit: 12500,
      minRental: '4 часа',
      features: ['750Вт', '125мм диск', 'Защитный кожух'],
      lastViewed: '2024-07-29'
    },
    {
      id: 'metabo-compressor',
      name: 'Metabo Компрессор 50л',
      category: 'Строительное оборудование',
      price: 1800,
      originalPrice: 1800,
      rating: 4.4,
      reviews: 43,
      image: '/api/placeholder/200/200',
      availability: 'В наличии',
      dateAdded: '2024-07-15',
      discount: 0,
      isNew: false,
      isPopular: false,
      deposit: 90000,
      minRental: '1 день',
      features: ['50л ресивер', '8 бар', 'Масляный'],
      lastViewed: '2024-07-26'
    },
    {
      id: 'hilti-te-7c',
      name: 'Hilti TE 7-C Перфоратор',
      category: 'Электроинструмент',
      price: 420,
      originalPrice: 450,
      rating: 4.9,
      reviews: 98,
      image: '/api/placeholder/200/200',
      availability: 'Под заказ',
      dateAdded: '2024-07-12',
      discount: 7,
      isNew: false,
      isPopular: true,
      deposit: 21000,
      minRental: '1 день',
      features: ['Профессиональный', 'SDS-plus', 'Высокая мощность'],
      lastViewed: '2024-07-31'
    }
  ];

  const categories = [
    { id: 'all', name: 'Все категории', count: favorites.length },
    { id: 'Электроинструмент', name: 'Электроинструмент', count: 3 },
    { id: 'Строительное оборудование', name: 'Строительное оборудование', count: 3 }
  ];

  const sortOptions = [
    { value: 'dateAdded', label: 'По дате добавления' },
    { value: 'price', label: 'По цене' },
    { value: 'name', label: 'По названию' },
    { value: 'rating', label: 'По рейтингу' },
    { value: 'popularity', label: 'По популярности' }
  ];

  const handleSelectAll = () => {
    if (selectedItems.length === filteredFavorites.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredFavorites.map(item => item.id));
    }
  };

  const handleItemSelect = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const removeFromFavorites = (itemIds: string[]) => {
    console.log('Removing from favorites:', itemIds);
    // Here you would typically update the favorites in your global state
  };

  const addToCart = (itemIds: string[]) => {
    console.log('Adding to cart:', itemIds);
    // Here you would typically add items to cart
  };

  const filteredFavorites = favorites.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rating':
        return b.rating - a.rating;
      case 'popularity':
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      case 'dateAdded':
      default:
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    }
  });

  const selectedFavorites = sortedFavorites.filter(item => selectedItems.includes(item.id));
  const totalSelectedPrice = selectedFavorites.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Избранное</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Сохраненное оборудование для быстрого доступа. Сравнивайте, планируйте 
            и добавляйте в корзину в удобное время
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <Icon name="Heart" className="w-8 h-8 mx-auto mb-2 text-red-500" />
              <div className="text-2xl font-bold">{favorites.length}</div>
              <div className="text-sm text-muted-foreground">В избранном</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Icon name="TrendingUp" className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">{favorites.filter(f => f.isPopular).length}</div>
              <div className="text-sm text-muted-foreground">Популярные</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Icon name="Sparkles" className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">{favorites.filter(f => f.isNew).length}</div>
              <div className="text-sm text-muted-foreground">Новинки</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Icon name="Percent" className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold">{favorites.filter(f => f.discount > 0).length}</div>
              <div className="text-sm text-muted-foreground">Со скидкой</div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Поиск в избранном..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Icon name="Grid" className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <Icon name="List" className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {sortedFavorites.length > 0 && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedItems.length === sortedFavorites.length}
                      onCheckedChange={handleSelectAll}
                    />
                    <span className="text-sm">
                      Выбрано: {selectedItems.length} из {sortedFavorites.length}
                    </span>
                  </div>
                  {selectedItems.length > 0 && (
                    <Badge variant="secondary">
                      Общая стоимость: {totalSelectedPrice} ₽/день
                    </Badge>
                  )}
                </div>
                
                {selectedItems.length > 0 && (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => addToCart(selectedItems)}>
                      <Icon name="ShoppingCart" className="w-4 h-4 mr-2" />
                      В корзину ({selectedItems.length})
                    </Button>
                    <Button variant="outline" onClick={() => removeFromFavorites(selectedItems)}>
                      <Icon name="Heart" className="w-4 h-4 mr-2" />
                      Удалить
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Favorites Grid/List */}
        {sortedFavorites.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Icon name="Heart" className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Избранное пусто</h3>
              <p className="text-muted-foreground mb-6">
                Добавляйте понравившееся оборудование в избранное для быстрого доступа
              </p>
              <Button>
                <Icon name="Search" className="w-4 h-4 mr-2" />
                Перейти к каталогу
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
            : "space-y-4"
          }>
            {sortedFavorites.map((item) => {
              const isSelected = selectedItems.includes(item.id);
              
              return viewMode === 'grid' ? (
                <Card key={item.id} className={`hover:shadow-lg transition-shadow ${isSelected ? 'ring-2 ring-primary' : ''}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleItemSelect(item.id)}
                        />
                        {item.isNew && <Badge variant="default">Новое</Badge>}
                        {item.isPopular && <Badge variant="secondary">Хит</Badge>}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromFavorites([item.id])}
                        >
                          <Icon name="Heart" className="w-4 h-4 text-red-500 fill-current" />
                        </Button>
                        <div className="flex items-center gap-1">
                          <Icon name="Star" className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm">{item.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                      <Icon name="Wrench" className="w-12 h-12 text-muted-foreground" />
                    </div>
                    
                    <div>
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <CardDescription>{item.category}</CardDescription>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="text-2xl font-bold text-primary">{item.price} ₽</div>
                          {item.discount > 0 && (
                            <div className="text-sm text-muted-foreground line-through">
                              {item.originalPrice} ₽
                            </div>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">за день</div>
                      </div>
                      {item.discount > 0 && (
                        <Badge variant="destructive">-{item.discount}%</Badge>
                      )}
                    </div>
                    
                    <Badge variant={
                      item.availability === 'В наличии' ? 'default' : 
                      item.availability === 'Ограниченно' ? 'secondary' : 'outline'
                    }>
                      {item.availability}
                    </Badge>
                    
                    <div className="space-y-1">
                      {item.features.slice(0, 2).map((feature, index) => (
                        <div key={index} className="text-xs text-muted-foreground flex items-center gap-1">
                          <Icon name="Check" className="w-3 h-3 text-green-500" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Подробнее
                      </Button>
                      <Button size="sm" className="flex-1" onClick={() => addToCart([item.id])}>
                        <Icon name="ShoppingCart" className="w-4 h-4 mr-1" />
                        В корзину
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card key={item.id} className={`hover:shadow-lg transition-shadow ${isSelected ? 'ring-2 ring-primary' : ''}`}>
                  <div className="md:flex">
                    <div className="md:w-48">
                      <div className="aspect-square md:aspect-video bg-muted flex items-center justify-center">
                        <Icon name="Wrench" className="w-12 h-12 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="md:flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => handleItemSelect(item.id)}
                          />
                          {item.isNew && <Badge variant="default">Новое</Badge>}
                          {item.isPopular && <Badge variant="secondary">Хит</Badge>}
                          {item.discount > 0 && <Badge variant="destructive">-{item.discount}%</Badge>}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromFavorites([item.id])}
                        >
                          <Icon name="Heart" className="w-4 h-4 text-red-500 fill-current" />
                        </Button>
                      </div>
                      
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-1">{item.name}</h3>
                          <p className="text-muted-foreground mb-2">{item.category}</p>
                          
                          <div className="flex items-center gap-4 mb-3">
                            <div className="flex items-center gap-1">
                              <Icon name="Star" className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm">{item.rating}</span>
                              <span className="text-xs text-muted-foreground">({item.reviews})</span>
                            </div>
                            <Badge variant={
                              item.availability === 'В наличии' ? 'default' : 
                              item.availability === 'Ограниченно' ? 'secondary' : 'outline'
                            }>
                              {item.availability}
                            </Badge>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {item.features.map((feature, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="text-xs text-muted-foreground">
                            Добавлено: {item.dateAdded} • Просмотрено: {item.lastViewed}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center gap-2 justify-end mb-2">
                            <div className="text-2xl font-bold text-primary">{item.price} ₽</div>
                            {item.discount > 0 && (
                              <div className="text-sm text-muted-foreground line-through">
                                {item.originalPrice} ₽
                              </div>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground mb-4">за день</div>
                          
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Подробнее
                            </Button>
                            <Button size="sm" onClick={() => addToCart([item.id])}>
                              <Icon name="ShoppingCart" className="w-4 h-4 mr-1" />
                              В корзину
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Recommendations */}
        {sortedFavorites.length > 0 && (
          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Lightbulb" className="w-6 h-6" />
                Рекомендации на основе избранного
              </CardTitle>
              <CardDescription>
                Похожее оборудование, которое может вас заинтересовать
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg hover:bg-muted cursor-pointer">
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-3">
                    <Icon name="Wrench" className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h4 className="font-medium mb-1">Аксессуары к перфораторам</h4>
                  <p className="text-sm text-muted-foreground mb-2">Буры, коронки, зубила</p>
                  <Badge variant="outline">от 50 ₽/день</Badge>
                </div>
                
                <div className="p-4 border rounded-lg hover:bg-muted cursor-pointer">
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-3">
                    <Icon name="Shield" className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h4 className="font-medium mb-1">Средства защиты</h4>
                  <p className="text-sm text-muted-foreground mb-2">Очки, перчатки, респираторы</p>
                  <Badge variant="outline">от 30 ₽/день</Badge>
                </div>
                
                <div className="p-4 border rounded-lg hover:bg-muted cursor-pointer">
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-3">
                    <Icon name="Zap" className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h4 className="font-medium mb-1">Удлинители и кабели</h4>
                  <p className="text-sm text-muted-foreground mb-2">Силовые кабели, катушки</p>
                  <Badge variant="outline">от 100 ₽/день</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Favorites;