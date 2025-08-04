import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from '@/components/ui/icon';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState<any[]>([]);

  const faqCategories = [
    {
      id: 'rental',
      name: 'Условия аренды',
      icon: 'FileText',
      count: 8,
      faqs: [
        {
          question: 'Какие документы нужны для аренды?',
          answer: 'Для физических лиц необходим паспорт РФ. Для юридических лиц: учредительные документы, доверенность представителя с печатью организации.',
          tags: ['документы', 'паспорт', 'юрлица']
        },
        {
          question: 'Какой минимальный срок аренды?',
          answer: 'Минимальный срок зависит от типа оборудования: ручной инструмент - от 4 часов, электроинструмент и строительное оборудование - от 1 дня, спецтехника - от 1 дня.',
          tags: ['срок', 'минимум', 'время']
        },
        {
          question: 'Можно ли продлить аренду?',
          answer: 'Да, срок аренды можно продлить. Необходимо уведомить нас минимум за 24 часа до окончания текущего периода аренды.',
          tags: ['продление', 'срок', 'уведомление']
        },
        {
          question: 'Что входит в стоимость аренды?',
          answer: 'В стоимость включены: техническое обслуживание, базовое страхование, инструктаж по использованию, техническая поддержка в период аренды.',
          tags: ['стоимость', 'включено', 'обслуживание']
        },
        {
          question: 'Как рассчитывается стоимость аренды?',
          answer: 'Стоимость зависит от типа оборудования, срока аренды и действующих скидок. При аренде от 4 дней - скидка 5%, от 8 дней - 10%, от 31 дня - 15%.',
          tags: ['расчет', 'скидки', 'стоимость']
        },
        {
          question: 'Можно ли арендовать технику на выходные?',
          answer: 'Да, мы работаем в выходные дни. Суббота: 9:00-18:00, воскресенье: 10:00-16:00. Возможна также экспресс-доставка в любое время.',
          tags: ['выходные', 'график', 'доставка']
        },
        {
          question: 'Что делать при поломке оборудования?',
          answer: 'Немедленно прекратите использование и свяжитесь с нами по телефону. Мы организуем замену или ремонт в течение 2 часов.',
          tags: ['поломка', 'замена', 'ремонт']
        },
        {
          question: 'Предоставляете ли вы инструктаж?',
          answer: 'Да, мы проводим бесплатный инструктаж по использованию всего оборудования. Также предоставляем техническую документацию.',
          tags: ['инструктаж', 'обучение', 'документация']
        }
      ]
    },
    {
      id: 'payment',
      name: 'Оплата и залог',
      icon: 'CreditCard',
      count: 6,
      faqs: [
        {
          question: 'Какой размер залога?',
          answer: 'Залог зависит от категории оборудования: ручной инструмент - 50% от стоимости, электроинструмент - 100%, строительное оборудование - 150%, спецтехника - 200%.',
          tags: ['залог', 'размер', 'процент']
        },
        {
          question: 'Какие способы оплаты принимаете?',
          answer: 'Принимаем наличные, банковские карты, безналичный расчет для юридических лиц. Возможна оплата онлайн на сайте.',
          tags: ['оплата', 'наличные', 'карта', 'безналичный']
        },
        {
          question: 'Когда возвращается залог?',
          answer: 'Залог возвращается полностью при возврате оборудования в исправном состоянии в течение 1-3 рабочих дней в зависимости от способа оплаты.',
          tags: ['возврат', 'залог', 'сроки']
        },
        {
          question: 'Можно ли оплатить в рассрочку?',
          answer: 'Для юридических лиц предоставляем отсрочку платежа до 30 дней. Физические лица могут воспользоваться рассрочкой через банки-партнеры.',
          tags: ['рассрочка', 'отсрочка', 'кредит']
        },
        {
          question: 'Возможен ли возврат предоплаты?',
          answer: 'Предоплата возвращается при отказе от аренды не позднее чем за 24 часа до начала аренды. При более позднем отказе удерживается 20%.',
          tags: ['предоплата', 'возврат', 'отказ']
        },
        {
          question: 'Есть ли скидки для постоянных клиентов?',
          answer: 'Да, для постоянных клиентов действует накопительная система скидок: от 5% при обороте от 100,000 ₽ в год, до 15% при обороте свыше 1,000,000 ₽.',
          tags: ['скидки', 'постоянные', 'накопительная']
        }
      ]
    },
    {
      id: 'delivery',
      name: 'Доставка и возврат',
      icon: 'Truck',
      count: 7,
      faqs: [
        {
          question: 'Сколько стоит доставка?',
          answer: 'Доставка в пределах МКАД бесплатная при заказе от 1000 ₽. За МКАД - 50 ₽/км. Экспресс-доставка +500 ₽.',
          tags: ['доставка', 'стоимость', 'МКАД', 'экспресс']
        },
        {
          question: 'Как быстро доставляете?',
          answer: 'Стандартная доставка: 2-4 часа. Экспресс-доставка: в течение часа. Доставка на следующий день: бесплатно.',
          tags: ['время', 'доставка', 'сроки']
        },
        {
          question: 'Работаете ли в выходные?',
          answer: 'Да, доставка работает в выходные: суббота 9:00-18:00, воскресенье 10:00-16:00. Экспресс-доставка работает круглосуточно.',
          tags: ['выходные', 'график', 'круглосуточно']
        },
        {
          question: 'Можно ли забрать самовывозом?',
          answer: 'Да, у нас есть несколько пунктов самовывоза. Это бесплатно и дает дополнительную скидку 3%. Работаем круглосуточно.',
          tags: ['самовывоз', 'бесплатно', 'скидка']
        },
        {
          question: 'Как происходит возврат оборудования?',
          answer: 'Возврат возможен через курьера (+500 ₽) или в наших офисах бесплатно. Необходимо уведомить за 2 часа.',
          tags: ['возврат', 'курьер', 'офис']
        },
        {
          question: 'Что делать если опоздал с возвратом?',
          answer: 'За каждый час просрочки взимается штраф в размере 100% от дневной стоимости аренды. Постарайтесь не опаздывать!',
          tags: ['просрочка', 'штраф', 'опоздание']
        },
        {
          question: 'Подымаете ли на этаж?',
          answer: 'Подъем до 3-го этажа включен в стоимость доставки. Подъем выше 3-го этажа: +200 ₽ за каждый этаж.',
          tags: ['подъем', 'этаж', 'доплата']
        }
      ]
    },
    {
      id: 'equipment',
      name: 'Оборудование',
      icon: 'Wrench',
      count: 5,
      faqs: [
        {
          question: 'Какое оборудование доступно для аренды?',
          answer: 'У нас более 5000 единиц техники: ручной и электроинструмент, строительное оборудование, спецтехника, измерительные приборы.',
          tags: ['каталог', 'виды', 'техника']
        },
        {
          question: 'Вся ли техника исправна?',
          answer: 'Все оборудование проходит обязательную проверку перед выдачей. У нас собственная служба технического обслуживания.',
          tags: ['исправность', 'проверка', 'обслуживание']
        },
        {
          question: 'Есть ли новое оборудование?',
          answer: 'Да, мы регулярно обновляем парк техники. Около 30% оборудования не старше 1 года. Новинки отмечены специальным значком.',
          tags: ['новое', 'обновление', 'парк']
        },
        {
          question: 'Можно ли выбрать конкретную модель?',
          answer: 'Да, при заказе можно указать предпочтения по модели и производителю. Мы постараемся предоставить именно то, что нужно.',
          tags: ['модель', 'выбор', 'производитель']
        },
        {
          question: 'Предоставляете ли сертификаты на технику?',
          answer: 'Да, вся техника имеет необходимые сертификаты соответствия и паспорта. Документы предоставляем по запросу.',
          tags: ['сертификаты', 'документы', 'паспорта']
        }
      ]
    },
    {
      id: 'support',
      name: 'Поддержка',
      icon: 'HelpCircle',
      count: 4,
      faqs: [
        {
          question: 'Как связаться с технической поддержкой?',
          answer: 'Техподдержка работает 24/7: телефон 8 (800) 555-01-23, Telegram @technorent_bot, онлайн-чат на сайте.',
          tags: ['поддержка', 'контакты', 'круглосуточно']
        },
        {
          question: 'Что делать если техника не работает?',
          answer: 'Немедленно прекратите использование и обратитесь в техподдержку. Мы организуем замену в течение 2 часов.',
          tags: ['неисправность', 'замена', 'техподдержка']
        },
        {
          question: 'Можно ли получить консультацию по использованию?',
          answer: 'Да, наши специалисты проконсультируют по любым вопросам использования техники. Консультации бесплатные.',
          tags: ['консультация', 'использование', 'бесплатно']
        },
        {
          question: 'Есть ли обучающие материалы?',
          answer: 'На сайте есть раздел с инструкциями и видеоуроками. Также предоставляем печатные инструкции с каждой единицей техники.',
          tags: ['обучение', 'инструкции', 'видео']
        }
      ]
    }
  ];

  const popularQuestions = [
    'Какие документы нужны для аренды?',
    'Сколько стоит доставка?',
    'Какой размер залога?',
    'Можно ли продлить аренду?',
    'Что делать при поломке оборудования?'
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredFaqs([]);
      return;
    }

    const results: any[] = [];
    faqCategories.forEach(category => {
      category.faqs.forEach(faq => {
        if (
          faq.question.toLowerCase().includes(query.toLowerCase()) ||
          faq.answer.toLowerCase().includes(query.toLowerCase()) ||
          faq.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        ) {
          results.push({ ...faq, category: category.name });
        }
      });
    });
    setFilteredFaqs(results);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Часто задаваемые вопросы</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Найдите ответы на самые популярные вопросы об аренде оборудования. 
            Если не нашли ответ, обратитесь к нашим специалистам
          </p>
        </div>

        {/* Search */}
        <Card className="mb-8 max-w-2xl mx-auto">
          <CardContent className="pt-6">
            <div className="relative">
              <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Поиск по вопросам..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            {searchQuery && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Найдено: {filteredFaqs.length} результатов
                </p>
                {filteredFaqs.length > 0 && (
                  <div className="space-y-2">
                    {filteredFaqs.slice(0, 5).map((faq, index) => (
                      <div key={index} className="p-3 border rounded-lg hover:bg-muted cursor-pointer">
                        <div className="font-medium text-sm">{faq.question}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Категория: {faq.category}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Popular Questions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="TrendingUp" className="w-6 h-6" />
              Популярные вопросы
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {popularQuestions.map((question, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => handleSearch(question)}
                >
                  {question}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ Categories */}
        <Tabs defaultValue="rental" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            {faqCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                <Icon name={category.icon as any} className="w-4 h-4" />
                <span className="hidden sm:inline">{category.name}</span>
                <Badge variant="secondary" className="ml-1">{category.count}</Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          {faqCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name={category.icon as any} className="w-6 h-6" />
                    {category.name}
                  </CardTitle>
                  <CardDescription>
                    {category.count} вопросов в этой категории
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4">
                            <p>{faq.answer}</p>
                            <div className="flex flex-wrap gap-1">
                              {faq.tags.map((tag, tagIndex) => (
                                <Badge key={tagIndex} variant="outline" className="text-xs">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Quick Help */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Icon name="Phone" className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Телефон поддержки</h3>
              <p className="text-muted-foreground mb-4">Круглосуточная поддержка</p>
              <Button variant="outline" className="w-full">
                8 (800) 555-01-23
              </Button>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Icon name="MessageCircle" className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Онлайн-чат</h3>
              <p className="text-muted-foreground mb-4">Быстрые ответы 24/7</p>
              <Button variant="outline" className="w-full">
                Открыть чат
              </Button>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Icon name="Send" className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Telegram</h3>
              <p className="text-muted-foreground mb-4">@technorent_bot</p>
              <Button variant="outline" className="w-full">
                Написать в Telegram
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Feedback */}
        <Card className="mt-12 bg-muted">
          <CardContent className="pt-6 text-center">
            <h3 className="text-xl font-bold mb-4">Не нашли ответ на свой вопрос?</h3>
            <p className="text-muted-foreground mb-6">
              Наши специалисты с радостью помогут вам. Задайте вопрос любым удобным способом
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <Icon name="MessageCircle" className="w-4 h-4 mr-2" />
                Задать вопрос
              </Button>
              <Button variant="outline" size="lg">
                <Icon name="Mail" className="w-4 h-4 mr-2" />
                Написать email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;