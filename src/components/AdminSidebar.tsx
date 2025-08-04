import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useTheme } from '@/contexts/ThemeContext';
import { Link, useLocation } from 'react-router-dom';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    id: 'dashboard',
    label: 'Панель управления',
    icon: 'BarChart3',
    path: '/admin',
    badge: null
  },
  {
    id: 'tools',
    label: 'Инструменты',
    icon: 'Wrench',
    path: '/admin/tools',
    badge: '127'
  },
  {
    id: 'orders',
    label: 'Заказы',
    icon: 'ShoppingBag',
    path: '/admin/orders',
    badge: '23'
  },
  {
    id: 'analytics',
    label: 'Аналитика',
    icon: 'TrendingUp',
    path: '/admin/analytics',
    badge: null
  },
  {
    id: 'users',
    label: 'Пользователи',
    icon: 'Users',
    path: '/admin/users',
    badge: '1,234'
  },
  {
    id: 'settings',
    label: 'Настройки',
    icon: 'Settings',
    path: '/admin/settings',
    badge: null
  }
];

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Icon name="Wrench" className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">ToolRental</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Админ-панель</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="lg:hidden"
            onClick={onClose}
          >
            <Icon name="X" className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`
                  flex items-center justify-between p-3 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }
                `}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    onClose();
                  }
                }}
              >
                <div className="flex items-center space-x-3">
                  <Icon name={item.icon as any} className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <Badge variant="secondary" className="text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        <Separator className="mx-4" />

        {/* Theme Toggle */}
        <div className="p-4">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={toggleTheme}
          >
            <Icon 
              name={theme === 'light' ? 'Moon' : 'Sun'} 
              className="h-4 w-4 mr-3" 
            />
            {theme === 'light' ? 'Темная тема' : 'Светлая тема'}
          </Button>
        </div>

        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">А</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                Администратор
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                admin@toolrental.ru
              </p>
            </div>
            <Button variant="ghost" size="sm">
              <Icon name="LogOut" className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}