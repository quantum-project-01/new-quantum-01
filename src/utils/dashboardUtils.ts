import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isActiveRoute = (currentPath: string, targetPath: string): boolean => {
  if (targetPath === '/admin/dashboard' || targetPath === '/partner/dashboard') {
    return currentPath === targetPath;
  }
  return currentPath.startsWith(targetPath);
};

export const getSidebarClasses = (collapsed: boolean): string => {
  return cn(
    'hidden md:flex flex-col bg-gray-800 border-r border-gray-700 transition-all duration-300 ease-in-out',
    collapsed ? 'w-20' : 'w-64'
  );
};

export const getMenuItemClasses = (isActive: boolean, collapsed: boolean): string => {
  return cn(
    'w-full flex items-center py-3 rounded-lg transition-colors',
    collapsed ? 'justify-center px-3' : 'space-x-3 px-3',
    isActive
      ? 'bg-green-600 text-white'
      : 'text-gray-400 hover:text-white hover:bg-gray-700'
  );
};

export const getUserDisplayName = (userRole: 'admin' | 'partner'): string => {
  return userRole === 'admin' ? 'Admin User' : 'Partner User';
};

export const getUserInitial = (userRole: 'admin' | 'partner'): string => {
  return userRole === 'admin' ? 'A' : 'P';
}; 