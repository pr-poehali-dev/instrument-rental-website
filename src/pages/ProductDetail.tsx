import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarContent, AvatarFallback } from '@/components/ui/avatar';
import { useCart } from '@/lib/cartContext';
import { Link, useParams } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';
import { format, addDays } from 'date-fns';
import { ru } from 'date-fns/locale';

// Данные инструмента (обычно получаются из API)
const toolData = {
  id: 1,
  name: 'Перфоратор Bosch GSH 16-28',
  brand: 'Bosch',
  model: 'GSH 16-28',
  category: 'Электроинструмент',
  subcategory: 'Перфораторы',
  price: 1200,
  images: [
    '/img/5e130715-b755-4ab5-82af-c9e448995766.jpg',
    '/img/cc0687bd-1892-4c49-8820-2d326de6668b.jpg',
    '/img/a1f08a16-886e-4eb0-836e-611ef0c78857.jpg'
  ],
  available: true,
  rating: 4.8,
  reviews: 124,
  description: 'Профессиональный перфоратор Bosch GSH 16-28 предназначен для интенсивных работ по сверлению и долблению в бетоне, кирпиче и природном камне. Оснащен системой SDS-Max для быстрой смены оснастки.',
  fullDescription: `Перфоратор Bosch GSH 16-28 - это мощный профессиональный инструмент, созданный для самых сложных задач в строительстве и ремонте. Благодаря высокой мощности 1750 Вт и энергии удара 41 Дж, он легко справляется с бетоном, кирпичом и другими твёрдыми материалами.

Особенности:
- Система SDS-Max для быстрой смены оснастки без дополнительных инструментов
- Антивибрационная система (AVT) снижает вибрацию до 50%
- Электронная регулировка частоты ударов
- Автоматическое отключение при заклинивании оснастки
- Светодиодная подсветка рабочей зоны
- Эргономичная конструкция с дополнительной рукояткой

Технические характеристики:
- Мощность: 1750 Вт
- Энергия удара: 41 Дж
- Частота ударов: 1400-2840 уд/мин
- Патрон: SDS-Max
- Максимальный диаметр сверления в бетоне: 50 мм
- Вес: 11,1 кг
- Уровень шума: 107 дБ(A)
- Уровень вибрации: 12 м/с²`,
  specifications: {
    power: '1750W',
    weight: '11.1кг',
    voltage: '230V',
    chuckType: 'SDS-Max',
    maxDrillDiameter: '50мм',
    impactEnergy: '41J',
    impactRate: '1400-2840 уд/мин',
    noiseLevel: '107 дБ(A)',
    vibrationLevel: '12 м/с²'
  },
  features: [
    'SDS-Max патрон',
    'Антивибрационная система AVT',
    'Регулировка оборотов',
    'Светодиодная подсветка',
    'Автоотключение при заклинивании',
    'Эргономичная рукоятка',
    'Кейс для хранения'
  ],
  included: [
    'Перфоратор Bosch GSH 16-28',
    'Дополнительная рукоятка',
    'Ограничитель глубины',
    'Смазка для патрона',
    'Пластиковый кейс',
    'Инструкция по эксплуатации'
  ],
  inStock: 5,
  rentalPeriods: [
    { days: 1, price: 1200, discount: 0 },
    { days: 3, price: 3200, discount: 11 },
    { days: 7, price: 7000, discount: 17 },
    { days: 14, price: 12600, discount: 25 },
    { days: 30, price: 24000, discount: 33 }
  ]
};

const reviews = [
  {
    id: 1,
    user: 'Алексей Петров',
    rating: 5,
    date: '2024-01-15',
    text: 'Отличный перфоратор! Мощный, надёжный. Пробивает бетон как масло. Антивибрационная система действительно работает - руки не устают даже после долгой работы.',
    helpful: 12
  },
  {
    id: 2,
    user: 'Марина Сидорова',
    rating: 5,
    date: '2024-01-10',
    text: 'Арендовала для ремонта квартиры. Очень довольна качеством и сервисом. Инструмент в отличном состоянии, работает тихо для своей мощности.',
    helpful: 8
  },
  {
    id: 3,
    user: 'Дмитрий Иванов',
    rating: 4,
    date: '2024-01-05',
    text: 'Хороший инструмент для профессиональных задач. Единственный минус - тяжеловат, но это компенсируется мощностью и качеством работы.',
    helpful: 5
  }
];

// Похожие товары
const relatedTools = [
  {
    id: 2,
    name: 'Отбойный молоток Makita HM1317C',
    brand: 'Makita',
    price: 2500,
    rating: 4.7,
    image: '/img/cc0687bd-1892-4c49-8820-2d326de6668b.jpg',
    available: true
  },
  {
    id: 3,
    name: 'Перфоратор DeWalt D25263K',
    brand: 'DeWalt',
    price: 900,
    rating: 4.6,
    image: '/img/a1f08a16-886e-4eb0-836e-611ef0c78857.jpg',
    available: true
  },
  {
    id: 4,
    name: 'Перфоратор Hilti TE 7-C',
    brand: 'Hilti',
    price: 1800,
    rating: 4.9,
    image: '/img/5e130715-b755-4ab5-82af-c9e448995766.jpg',
    available: false
  }
];

export default function ProductDetail() {
  const { addToCart } = useCart();
  const { id } = useParams();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [rentalDays, setRentalDays] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');

  const selectedPeriod = toolData.rentalPeriods.find(p => p.days === rentalDays) || toolData.rentalPeriods[0];
  const totalPrice = selectedPeriod.price * quantity;
  const savings = (toolData.price * rentalDays * quantity) - totalPrice;

  const handleAddToCart = () => {
    addToCart({
      id: toolData.id,
      name: toolData.name,
      price: Math.round(totalPrice / rentalDays),
      image: toolData.images[0],
      category: toolData.category,
      duration: rentalDays
    });
  };
  
  const handleSubmitReview = () => {
    if (reviewRating > 0 && reviewName.trim() && reviewText.trim()) {
      console.log('Submitting review:', {
        rating: reviewRating,
        name: reviewName,
        text: reviewText,
        toolId: toolData.id
      });
      // Сброс формы
      setReviewRating(0);
      setReviewName('');
      setReviewText('');
      alert('Спасибо за ваш отзыв!');
    } else {
      alert('Пожалуйста, заполните все поля');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Icon name="Wrench" className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">ToolRental</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Главная</Link>
              <Link to="/catalog" className="text-gray-600 hover:text-blue-600 transition-colors">Каталог</Link>
              <a href="#services" className="text-gray-600 hover:text-blue-600 transition-colors">Услуги</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">О нас</a>
            </nav>
            <Button size="sm">
              <Icon name="User" className="h-4 w-4 mr-2" />
              Войти
            </Button>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-blue-600">Главная</Link>
            <Icon name="ChevronRight" className="h-4 w-4 text-gray-400" />
            <Link to="/catalog" className="text-gray-600 hover:text-blue-600">Каталог</Link>
            <Icon name="ChevronRight" className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900">{toolData.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative">
                <img 
                  src={toolData.images[selectedImage]} 
                  alt={toolData.name}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute top-4 left-4 space-y-2">
                  <Badge variant="outline" className="bg-white">
                    {toolData.subcategory}
                  </Badge>
                  {toolData.available && (
                    <Badge className="bg-green-100 text-green-800">
                      В наличии
                    </Badge>
                  )}
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="flex space-x-2">
                {toolData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${toolData.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Details & Booking */}
          <div className="space-y-6">
            {/* Product Info */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{toolData.name}</h1>
              <p className="text-gray-600 mb-4">{toolData.brand} · {toolData.model}</p>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Icon 
                        key={i} 
                        name="Star" 
                        className={`h-4 w-4 ${
                          i < Math.floor(toolData.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{toolData.rating}</span>
                </div>
                <span className="text-sm text-gray-600">({toolData.reviews} отзывов)</span>
              </div>

              <p className="text-gray-700 mb-6">{toolData.description}</p>

              {/* Key Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                {toolData.features.slice(0, 4).map((feature, index) => (
                  <Badge key={index} variant="secondary">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Booking Card */}
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl">Забронировать</CardTitle>
                <CardDescription>Выберите период аренды</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Rental Period */}
                <div>
                  <label className="text-sm font-medium text-gray-900 mb-2 block">
                    Период аренды
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {toolData.rentalPeriods.map((period) => (
                      <button
                        key={period.days}
                        onClick={() => setRentalDays(period.days)}
                        className={`p-3 rounded-lg border-2 text-center transition-colors ${
                          rentalDays === period.days
                            ? 'border-blue-500 bg-blue-50 text-blue-600'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-sm font-medium">
                          {period.days} {period.days === 1 ? 'день' : 'дней'}
                        </div>
                        {period.discount > 0 && (
                          <div className="text-xs text-green-600">
                            -{period.discount}%
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-900 mb-2 block">
                      Дата начала
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <Icon name="Calendar" className="h-4 w-4 mr-2" />
                          {startDate ? format(startDate, 'dd.MM', { locale: ru }) : 'Выберите'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={(date) => {
                            setStartDate(date);
                            if (date) {
                              setEndDate(addDays(date, rentalDays));
                            }
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-900 mb-2 block">
                      Дата окончания
                    </label>
                    <Button variant="outline" className="w-full justify-start" disabled>
                      <Icon name="Calendar" className="h-4 w-4 mr-2" />
                      {endDate ? format(endDate, 'dd.MM', { locale: ru }) : 'Автоматически'}
                    </Button>
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="text-sm font-medium text-gray-900 mb-2 block">
                    Количество
                  </label>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Icon name="Minus" className="h-4 w-4" />
                    </Button>
                    <span className="font-medium">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.min(toolData.inStock, quantity + 1))}
                      disabled={quantity >= toolData.inStock}
                    >
                      <Icon name="Plus" className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-gray-600 ml-2">
                      Доступно: {toolData.inStock}
                    </span>
                  </div>
                </div>

                <Separator />

                {/* Price Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Базовая цена</span>
                    <span>{toolData.price * rentalDays * quantity}₽</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Скидка</span>
                      <span>-{savings}₽</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Итого</span>
                    <span>{totalPrice}₽</span>
                  </div>
                  <p className="text-sm text-gray-600 text-center">
                    {Math.round(totalPrice / rentalDays)}₽ за день
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={handleAddToCart}
                    disabled={!startDate || !toolData.available}
                  >
                    <Icon name="ShoppingCart" className="h-4 w-4 mr-2" />
                    Добавить в корзину
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Icon name="Heart" className="h-4 w-4 mr-2" />
                    В избранное
                  </Button>
                </div>

                {/* Contact Info */}
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 mb-2">Нужна консультация?</p>
                  <Button variant="outline" size="sm">
                    <Icon name="Phone" className="h-4 w-4 mr-2" />
                    +7 (495) 123-45-67
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Описание</TabsTrigger>
              <TabsTrigger value="specifications">Характеристики</TabsTrigger>
              <TabsTrigger value="included">Комплектация</TabsTrigger>
              <TabsTrigger value="reviews">Отзывы ({toolData.reviews})</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-line text-gray-700">
                      {toolData.fullDescription}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(toolData.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="included" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {toolData.included.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Icon name="Check" className="h-5 w-5 text-green-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {/* Review Summary */}
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-gray-900 mb-2">
                          {toolData.rating}
                        </div>
                        <div className="flex justify-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Icon 
                              key={i} 
                              name="Star" 
                              className={`h-5 w-5 ${
                                i < Math.floor(toolData.rating) 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-600">
                          Основано на {toolData.reviews} отзывах
                        </p>
                      </div>
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center space-x-2">
                            <span className="text-sm w-8">{rating}</span>
                            <Icon name="Star" className="h-4 w-4 text-yellow-400" />
                            <Progress value={rating === 5 ? 80 : rating === 4 ? 15 : 5} className="flex-1" />
                            <span className="text-sm text-gray-600 w-8">
                              {rating === 5 ? '80%' : rating === 4 ? '15%' : '5%'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Individual Reviews */}
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Avatar>
                            <AvatarFallback>
                              {review.user.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-semibold">{review.user}</h4>
                                <div className="flex items-center space-x-2">
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Icon 
                                        key={i} 
                                        name="Star" 
                                        className={`h-4 w-4 ${
                                          i < review.rating 
                                            ? 'text-yellow-400 fill-current' 
                                            : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm text-gray-600">
                                    {format(new Date(review.date), 'dd MMMM yyyy', { locale: ru })}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-700 mb-3">{review.text}</p>
                            <div className="flex items-center space-x-4">
                              <Button variant="ghost" size="sm">
                                <Icon name="ThumbsUp" className="h-4 w-4 mr-1" />
                                Полезно ({review.helpful})
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Icon name="Flag" className="h-4 w-4 mr-1" />
                                Пожаловаться
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Add Review */}
                <Card>
                  <CardHeader>
                    <CardTitle>Оставить отзыв</CardTitle>
                    <CardDescription>
                      Поделитесь своим опытом использования этого инструмента
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-900 mb-2 block">
                          Оценка
                        </label>
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Icon 
                              key={i} 
                              name="Star" 
                              className={`h-6 w-6 cursor-pointer transition-colors ${
                                i < reviewRating ? 'text-yellow-400 fill-current' : 'text-gray-300 hover:text-yellow-400'
                              }`}
                              onClick={() => setReviewRating(i + 1)}
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-900 mb-2 block">
                          Ваше имя
                        </label>
                        <Input 
                          placeholder="Введите ваше имя" 
                          value={reviewName}
                          onChange={(e) => setReviewName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-900 mb-2 block">
                          Отзыв
                        </label>
                        <Textarea 
                          placeholder="Расскажите о своем опыте использования..."
                          rows={4}
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                        />
                      </div>
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={handleSubmitReview}
                      >
                        Отправить отзыв
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Similar Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Похожие товары</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedTools.map((tool) => (
              <Card key={tool.id} className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={tool.image} 
                    alt={tool.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {!tool.available && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary">Занято</Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Link to={`/product/${tool.id}`}>
                      <h3 className="font-semibold text-lg hover:text-blue-600 transition-colors">
                        {tool.name}
                      </h3>
                    </Link>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{tool.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{tool.brand}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">
                      {tool.price}₽<span className="text-sm text-gray-600">/день</span>
                    </span>
                    <div className="flex space-x-2">
                      <Link to={`/product/${tool.id}`}>
                        <Button variant="outline" size="sm">
                          <Icon name="Eye" className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        size="sm" 
                        disabled={!tool.available}
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => {
                          if (tool.available) {
                            addToCart({
                              id: tool.id,
                              name: tool.name,
                              price: tool.price,
                              image: tool.image,
                              category: toolData.category,
                              duration: 1
                            });
                          }
                        }}
                      >
                        {tool.available ? 'В корзину' : 'Занято'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}