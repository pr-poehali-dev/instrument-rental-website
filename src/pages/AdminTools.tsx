import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Tool {
  id: number;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  image: string;
  available: boolean;
  rating: number;
  reviews: number;
  description: string;
  power: string;
  weight: string;
  features: string[];
  inStock: number;
  totalRented: number;
  revenue: number;
  lastRented: string;
}

const AdminToolsManagement = () => {
  const [tools, setTools] = useState<Tool[]>([
    {
      id: 1,
      name: 'Перфоратор Bosch GSH 16-28',
      brand: 'Bosch',
      category: 'Электроинструмент',
      subcategory: 'Перфораторы',
      price: 1200,
      image: '/img/5e130715-b755-4ab5-82af-c9e448995766.jpg',
      available: true,
      rating: 4.8,
      reviews: 124,
      description: 'Профессиональный перфоратор для сверления и долбления бетона',
      power: '1500W',
      weight: '5.8кг',
      features: ['SDS-Max', 'Антивибрация', 'Регулировка оборотов'],
      inStock: 5,
      totalRented: 89,
      revenue: 156800,
      lastRented: '2024-07-15'
    },
    {
      id: 2,
      name: 'Болгарка DeWalt DWE402',
      brand: 'DeWalt',
      category: 'Электроинструмент',
      subcategory: 'Болгарки',
      price: 800,
      image: '/img/5e130715-b755-4ab5-82af-c9e448995766.jpg',
      available: true,
      rating: 4.9,
      reviews: 89,
      description: 'Угловая шлифовальная машина 125мм с защитным кожухом',
      power: '1010W',
      weight: '2.2кг',
      features: ['Плавный пуск', 'Защита от перегрузки', 'Быстрая замена диска'],
      inStock: 8,
      totalRented: 156,
      revenue: 234400,
      lastRented: '2024-07-18'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [newTool, setNewTool] = useState({
    name: '',
    brand: '',
    category: '',
    subcategory: '',
    price: '',
    description: '',
    power: '',
    weight: '',
    features: '',
    inStock: ''
  });

  const categories = ['Электроинструмент', 'Измерительные приборы', 'Садовая техника', 'Строительное оборудование'];
  const brands = ['Bosch', 'DeWalt', 'Makita', 'Metabo', 'Milwaukee', 'Ryobi'];

  const filteredTools = useMemo(() => {
    let filtered = tools;

    if (searchQuery) {
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }

    return filtered;
  }, [tools, searchQuery, selectedCategory]);

  const handleAddTool = () => {
    const id = Math.max(...tools.map(t => t.id)) + 1;
    const tool: Tool = {
      id,
      name: newTool.name,
      brand: newTool.brand,
      category: newTool.category,
      subcategory: newTool.subcategory,
      price: Number(newTool.price),
      image: '/img/5e130715-b755-4ab5-82af-c9e448995766.jpg',
      available: true,
      rating: 0,
      reviews: 0,
      description: newTool.description,
      power: newTool.power,
      weight: newTool.weight,
      features: newTool.features.split(',').map(f => f.trim()),
      inStock: Number(newTool.inStock),
      totalRented: 0,
      revenue: 0,
      lastRented: ''
    };

    setTools([...tools, tool]);
    setIsAddDialogOpen(false);
    setNewTool({
      name: '',
      brand: '',
      category: '',
      subcategory: '',
      price: '',
      description: '',
      power: '',
      weight: '',
      features: '',
      inStock: ''
    });
  };

  const handleEditTool = (tool: Tool) => {
    setEditingTool(tool);
    setIsEditDialogOpen(true);
  };

  const handleUpdateTool = () => {
    if (!editingTool) return;

    setTools(tools.map(tool => 
      tool.id === editingTool.id ? editingTool : tool
    ));
    setIsEditDialogOpen(false);
    setEditingTool(null);
  };

  const handleDeleteTool = (id: number) => {
    setTools(tools.filter(tool => tool.id !== id));
  };

  const toggleAvailability = (id: number) => {
    setTools(tools.map(tool =>
      tool.id === id ? { ...tool, available: !tool.available } : tool
    ));
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: 'Нет в наличии', color: 'bg-red-100 text-red-800' };
    if (stock <= 2) return { text: 'Мало', color: 'bg-yellow-100 text-yellow-800' };
    return { text: 'В наличии', color: 'bg-green-100 text-green-800' };
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Управление инструментами</h1>
          <p className="text-gray-600">Полный контроль над каталогом инструментов</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить инструмент
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Добавить новый инструмент</DialogTitle>
              <DialogDescription>
                Заполните информацию о новом инструменте для каталога
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Название инструмента</Label>
                <Input
                  id="name"
                  value={newTool.name}
                  onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
                  placeholder="Перфоратор Bosch..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Бренд</Label>
                <Select value={newTool.brand} onValueChange={(value) => setNewTool({ ...newTool, brand: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите бренд" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map(brand => (
                      <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Категория</Label>
                <Select value={newTool.category} onValueChange={(value) => setNewTool({ ...newTool, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subcategory">Подкатегория</Label>
                <Input
                  id="subcategory"
                  value={newTool.subcategory}
                  onChange={(e) => setNewTool({ ...newTool, subcategory: e.target.value })}
                  placeholder="Перфораторы, Дрели..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Цена за день (₽)</Label>
                <Input
                  id="price"
                  type="number"
                  value={newTool.price}
                  onChange={(e) => setNewTool({ ...newTool, price: e.target.value })}
                  placeholder="1200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inStock">Количество на складе</Label>
                <Input
                  id="inStock"
                  type="number"
                  value={newTool.inStock}
                  onChange={(e) => setNewTool({ ...newTool, inStock: e.target.value })}
                  placeholder="5"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="power">Мощность</Label>
                <Input
                  id="power"
                  value={newTool.power}
                  onChange={(e) => setNewTool({ ...newTool, power: e.target.value })}
                  placeholder="1500W"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Вес</Label>
                <Input
                  id="weight"
                  value={newTool.weight}
                  onChange={(e) => setNewTool({ ...newTool, weight: e.target.value })}
                  placeholder="5.8кг"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  value={newTool.description}
                  onChange={(e) => setNewTool({ ...newTool, description: e.target.value })}
                  placeholder="Подробное описание инструмента..."
                  rows={3}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="features">Особенности (через запятую)</Label>
                <Input
                  id="features"
                  value={newTool.features}
                  onChange={(e) => setNewTool({ ...newTool, features: e.target.value })}
                  placeholder="SDS-Max, Антивибрация, Регулировка оборотов"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Отмена
              </Button>
              <Button onClick={handleAddTool} className="bg-blue-600 hover:bg-blue-700">
                Добавить инструмент
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Фильтры и поиск</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Поиск по названию, бренду или категории..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Все категории" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все категории</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tools Table */}
      <Card>
        <CardHeader>
          <CardTitle>Каталог инструментов ({filteredTools.length})</CardTitle>
          <CardDescription>
            Управление всеми инструментами в системе
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Инструмент</TableHead>
                  <TableHead>Категория</TableHead>
                  <TableHead>Цена/день</TableHead>
                  <TableHead>Склад</TableHead>
                  <TableHead>Статистика</TableHead>
                  <TableHead>Доступность</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTools.map((tool) => {
                  const stockStatus = getStockStatus(tool.inStock);
                  return (
                    <TableRow key={tool.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img 
                            src={tool.image} 
                            alt={tool.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium">{tool.name}</p>
                            <p className="text-sm text-gray-600">{tool.brand}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{tool.category}</p>
                          <p className="text-sm text-gray-600">{tool.subcategory}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-bold">₽{tool.price.toLocaleString()}</span>
                      </TableCell>
                      <TableCell>
                        <div>
                          <Badge className={stockStatus.color}>
                            {stockStatus.text}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">{tool.inStock} шт.</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>Аренд: {tool.totalRented}</p>
                          <p>Доход: ₽{tool.revenue.toLocaleString()}</p>
                          <p className="text-gray-600">
                            {tool.rating > 0 ? `★ ${tool.rating} (${tool.reviews})` : 'Нет отзывов'}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={tool.available}
                          onCheckedChange={() => toggleAvailability(tool.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditTool(tool)}
                          >
                            <Icon name="Edit" size={14} />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Icon name="Trash2" size={14} className="text-red-600" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Удалить инструмент?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Это действие нельзя отменить. Инструмент "{tool.name}" будет удален из каталога.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Отмена</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteTool(tool.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Удалить
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Редактировать инструмент</DialogTitle>
            <DialogDescription>
              Изменение информации об инструменте
            </DialogDescription>
          </DialogHeader>
          {editingTool && (
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Название инструмента</Label>
                <Input
                  id="edit-name"
                  value={editingTool.name}
                  onChange={(e) => setEditingTool({ ...editingTool, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-price">Цена за день (₽)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={editingTool.price}
                  onChange={(e) => setEditingTool({ ...editingTool, price: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-stock">Количество на складе</Label>
                <Input
                  id="edit-stock"
                  type="number"
                  value={editingTool.inStock}
                  onChange={(e) => setEditingTool({ ...editingTool, inStock: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-power">Мощность</Label>
                <Input
                  id="edit-power"
                  value={editingTool.power}
                  onChange={(e) => setEditingTool({ ...editingTool, power: e.target.value })}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="edit-description">Описание</Label>
                <Textarea
                  id="edit-description"
                  value={editingTool.description}
                  onChange={(e) => setEditingTool({ ...editingTool, description: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleUpdateTool} className="bg-blue-600 hover:bg-blue-700">
              Сохранить изменения
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminToolsManagement;