import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Icon from '@/components/ui/icon';

const Terms = () => {
  const [activeSection, setActiveSection] = useState('general');

  const sections = [
    { id: 'general', label: 'Общие условия', icon: 'FileText' },
    { id: 'rental', label: 'Условия аренды', icon: 'Calendar' },
    { id: 'payment', label: 'Оплата', icon: 'CreditCard' },
    { id: 'delivery', label: 'Доставка', icon: 'Truck' },
    { id: 'insurance', label: 'Страхование', icon: 'Shield' },
    { id: 'responsibility', label: 'Ответственность', icon: 'AlertTriangle' }
  ];

  const pricingTiers = [
    {
      duration: '1-3 дня',
      discount: '0%',
      description: 'Базовая стоимость',
      color: 'default'
    },
    {
      duration: '4-7 дней',
      discount: '5%',
      description: 'Небольшая скидка',
      color: 'secondary'
    },
    {
      duration: '8-30 дней',
      discount: '10%',
      description: 'Выгодная скидка',
      color: 'outline'
    },
    {
      duration: '31+ дней',
      discount: '15%',
      description: 'Максимальная скидка',
      color: 'default'
    }
  ];

  const deposits = [
    { category: 'Ручной инструмент', amount: '5,000 - 15,000', percentage: '50%' },
    { category: 'Электроинструмент', amount: '15,000 - 50,000', percentage: '100%' },
    { category: 'Строительное оборудование', amount: '50,000 - 200,000', percentage: '150%' },
    { category: 'Спецтехника', amount: '200,000 - 1,000,000', percentage: '200%' }
  ];

  const faqItems = [
    {
      question: 'Какие документы нужны для аренды?',
      answer: 'Для физических лиц: паспорт. Для юридических лиц: учредительные документы, доверенность представителя, печать организации.'
    },
    {
      question: 'Можно ли продлить срок аренды?',
      answer: 'Да, срок аренды можно продлить. Необходимо уведомить нас минимум за 24 часа до окончания текущего периода.'
    },
    {
      question: 'Что делать при поломке оборудования?',
      answer: 'Немедленно прекратите использование и свяжитесь с нами. Мы организуем замену или ремонт в кратчайшие сроки.'
    },
    {
      question: 'Возвращается ли залог при досрочном возврате?',
      answer: 'Да, залог возвращается полностью при условии сохранности оборудования и отсутствия повреждений.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Условия аренды</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Подробные условия аренды оборудования, правила использования и ответственность сторон
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? 'default' : 'outline'}
              onClick={() => setActiveSection(section.id)}
              className="flex items-center gap-2"
            >
              <Icon name={section.icon as any} className="w-4 h-4" />
              {section.label}
            </Button>
          ))}
        </div>

        {/* Content Sections */}
        <div className="max-w-4xl mx-auto">
          {activeSection === 'general' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="FileText" className="w-6 h-6" />
                  Общие условия
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3 text-lg">Основные принципы</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="w-4 h-4 mt-1 text-green-500" />
                      Все оборудование проходит обязательную проверку перед выдачей
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="w-4 h-4 mt-1 text-green-500" />
                      Предоставляем полный инструктаж по использованию техники
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="w-4 h-4 mt-1 text-green-500" />
                      Круглосуточная техническая поддержка в период аренды
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="w-4 h-4 mt-1 text-green-500" />
                      Гибкие условия аренды от 1 дня до нескольких месяцев
                    </li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3 text-lg">Требования к арендатору</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Физические лица</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Возраст от 18 лет</li>
                        <li>• Паспорт РФ</li>
                        <li>• Опыт работы с техникой</li>
                        <li>• Залог по тарифу</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Юридические лица</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Регистрация в РФ</li>
                        <li>• Учредительные документы</li>
                        <li>• Доверенность представителя</li>
                        <li>• Печать организации</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === 'rental' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Calendar" className="w-6 h-6" />
                    Сроки и условия аренды
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Минимальные сроки</h3>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span>Ручной инструмент:</span>
                          <Badge variant="outline">4 часа</Badge>
                        </li>
                        <li className="flex justify-between">
                          <span>Электроинструмент:</span>
                          <Badge variant="outline">1 день</Badge>
                        </li>
                        <li className="flex justify-between">
                          <span>Строительное оборудование:</span>
                          <Badge variant="outline">1 день</Badge>
                        </li>
                        <li className="flex justify-between">
                          <span>Спецтехника:</span>
                          <Badge variant="outline">1 день</Badge>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Время действия</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Рабочий день: 8:00 - 20:00</li>
                        <li>• Выходные: 9:00 - 18:00</li>
                        <li>• Ночная аренда: +50% к тарифу</li>
                        <li>• Просрочка: +100% за каждый час</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Система скидок</CardTitle>
                  <CardDescription>
                    Чем дольше срок аренды, тем больше скидка
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {pricingTiers.map((tier, index) => (
                      <div key={index} className="text-center p-4 border rounded-lg">
                        <div className="font-semibold mb-1">{tier.duration}</div>
                        <div className="text-2xl font-bold text-primary mb-1">{tier.discount}</div>
                        <div className="text-xs text-muted-foreground">{tier.description}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === 'payment' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="CreditCard" className="w-6 h-6" />
                    Условия оплаты
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <Icon name="Banknote" className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <h3 className="font-semibold mb-1">Наличные</h3>
                      <p className="text-sm text-muted-foreground">При получении или доставке</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Icon name="CreditCard" className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <h3 className="font-semibold mb-1">Банковской картой</h3>
                      <p className="text-sm text-muted-foreground">Онлайн или в офисе</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Icon name="Building2" className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <h3 className="font-semibold mb-1">Безналичный расчет</h3>
                      <p className="text-sm text-muted-foreground">Для юридических лиц</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-4 text-lg">Размер залога по категориям</h3>
                    <div className="space-y-3">
                      {deposits.map((deposit, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{deposit.category}</div>
                            <div className="text-sm text-muted-foreground">{deposit.amount} ₽</div>
                          </div>
                          <Badge variant="secondary">{deposit.percentage} от стоимости</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === 'delivery' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Truck" className="w-6 h-6" />
                  Доставка и самовывоз
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Icon name="MapPin" className="w-5 h-5" />
                      Зоны доставки
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center">
                        <span>В пределах МКАД</span>
                        <Badge variant="outline">Бесплатно</Badge>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>До 50 км от МКАД</span>
                        <Badge variant="outline">50 ₽/км</Badge>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Свыше 50 км</span>
                        <Badge variant="outline">По договоренности</Badge>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Clock" className="w-5 h-5" />
                      Время доставки
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Стандартная доставка: 2-4 часа</li>
                      <li>• Срочная доставка: в течение часа (+500 ₽)</li>
                      <li>• Доставка на следующий день: бесплатно</li>
                      <li>• Самовывоз: круглосуточно</li>
                    </ul>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Условия доставки</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Icon name="CheckCircle" className="w-4 h-4 text-green-500" />
                        Включено в стоимость
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Погрузка и разгрузка</li>
                        <li>• Подъем на этаж (до 3-го)</li>
                        <li>• Инструктаж по использованию</li>
                        <li>• Проверка комплектности</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Icon name="Plus" className="w-4 h-4 text-orange-500" />
                        Дополнительные услуги
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Подъем выше 3-го этажа: +200 ₽/этаж</li>
                        <li>• Сборка/разборка: от 500 ₽</li>
                        <li>• Ожидание свыше 30 мин: +300 ₽/час</li>
                        <li>• Обратный вызов: +500 ₽</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === 'insurance' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Shield" className="w-6 h-6" />
                  Страхование и гарантии
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Страхование включено</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Icon name="Check" className="w-4 h-4 mt-1 text-green-500" />
                        <span className="text-sm">Страхование от поломок при нормальной эксплуатации</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" className="w-4 h-4 mt-1 text-green-500" />
                        <span className="text-sm">Замена неисправного оборудования в течение 2 часов</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" className="w-4 h-4 mt-1 text-green-500" />
                        <span className="text-sm">Техническая поддержка 24/7</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Дополнительное страхование</h3>
                    <div className="p-4 border rounded-lg">
                      <div className="font-medium mb-2">КАСКО для техники</div>
                      <div className="text-sm text-muted-foreground mb-2">
                        Полная защита от любых повреждений, включая кражу
                      </div>
                      <Badge variant="outline">+5% от стоимости аренды</Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Гарантии качества</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <Icon name="Wrench" className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-medium mb-1">Техобслуживание</h4>
                      <p className="text-xs text-muted-foreground">Регулярное ТО всего парка</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Icon name="Award" className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-medium mb-1">Сертификация</h4>
                      <p className="text-xs text-muted-foreground">Все необходимые сертификаты</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Icon name="RefreshCw" className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-medium mb-1">Замена</h4>
                      <p className="text-xs text-muted-foreground">Быстрая замена при неисправности</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === 'responsibility' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="AlertTriangle" className="w-6 h-6" />
                  Ответственность сторон
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 text-red-600">Ответственность арендатора</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Icon name="X" className="w-4 h-4 mt-1 text-red-500" />
                        <span>Повреждения при неправильном использовании</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="X" className="w-4 h-4 mt-1 text-red-500" />
                        <span>Утеря или кража оборудования</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="X" className="w-4 h-4 mt-1 text-red-500" />
                        <span>Нарушение сроков возврата</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="X" className="w-4 h-4 mt-1 text-red-500" />
                        <span>Использование не по назначению</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-green-600">Ответственность арендодателя</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Icon name="Check" className="w-4 h-4 mt-1 text-green-500" />
                        <span>Исправность оборудования при выдаче</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" className="w-4 h-4 mt-1 text-green-500" />
                        <span>Соответствие заявленным характеристикам</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" className="w-4 h-4 mt-1 text-green-500" />
                        <span>Замена при поломке не по вине арендатора</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" className="w-4 h-4 mt-1 text-green-500" />
                        <span>Техническая поддержка</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Штрафные санкции</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span>Просрочка возврата</span>
                      <Badge variant="destructive">+100% за каждый час</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span>Утеря оборудования</span>
                      <Badge variant="destructive">Полная стоимость</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span>Повреждение при нарушении правил</span>
                      <Badge variant="destructive">Стоимость ремонта</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span>Несвоевременная оплата</span>
                      <Badge variant="destructive">0.1% за каждый день</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* FAQ Section */}
        <Card className="mt-12 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="HelpCircle" className="w-6 h-6" />
              Часто задаваемые вопросы
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto bg-primary text-primary-foreground">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-4">Есть вопросы по условиям?</h3>
              <p className="mb-6">
                Наши специалисты готовы проконсультировать по всем условиям аренды
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg">
                  <Icon name="Phone" className="w-4 h-4 mr-2" />
                  Позвонить
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

export default Terms;