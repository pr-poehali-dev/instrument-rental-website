import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, updateDuration, getTotalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <Icon name="ShoppingCart" className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Корзина пуста</h1>
            <p className="text-gray-600 mb-8">Добавьте инструменты в корзину, чтобы оформить заказ</p>
            <Link to="/">
              <Button size="lg">
                <Icon name="ArrowLeft" className="h-4 w-4 mr-2" />
                Вернуться к каталогу
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Корзина</h1>
          <Link to="/">
            <Button variant="outline">
              <Icon name="ArrowLeft" className="h-4 w-4 mr-2" />
              Продолжить покупки
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Товары в корзине */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full md:w-32 h-32 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <p className="text-lg font-bold text-blue-600">{item.price} ₽/день</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Количество */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Количество</label>
                        <div className="flex items-center space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Icon name="Minus" className="h-4 w-4" />
                          </Button>
                          <Input 
                            type="number" 
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                            className="w-20 text-center"
                            min="1"
                          />
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Icon name="Plus" className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Период аренды */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Дней аренды</label>
                        <Input 
                          type="number" 
                          value={item.duration}
                          onChange={(e) => updateDuration(item.id, parseInt(e.target.value) || 1)}
                          min="1"
                          max="30"
                        />
                      </div>

                      {/* Стоимость */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Итого</label>
                        <p className="text-xl font-bold text-green-600">
                          {(item.price * item.quantity * item.duration).toLocaleString()} ₽
                        </p>
                      </div>
                    </div>

                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="w-fit"
                    >
                      <Icon name="Trash2" className="h-4 w-4 mr-2" />
                      Удалить
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Итого */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Итого к оплате</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} × {item.quantity} × {item.duration}д</span>
                      <span>{(item.price * item.quantity * item.duration).toLocaleString()} ₽</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Общая сумма:</span>
                    <span className="text-green-600">{getTotalPrice().toLocaleString()} ₽</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <Link to="/checkout" className="block">
                    <Button size="lg" className="w-full">
                      <Icon name="CreditCard" className="h-4 w-4 mr-2" />
                      Оформить заказ
                    </Button>
                  </Link>
                  
                  <Button 
                    variant="outline" 
                    onClick={clearCart}
                    className="w-full"
                  >
                    <Icon name="Trash2" className="h-4 w-4 mr-2" />
                    Очистить корзину
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Информация о доставке */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Truck" className="h-5 w-5 mr-2" />
                  Доставка
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Бесплатная доставка по Москве</p>
                  <p>• Доставка в день заказа</p>
                  <p>• Установка и демонтаж включены</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;