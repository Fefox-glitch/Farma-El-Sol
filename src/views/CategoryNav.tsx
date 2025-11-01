import { Category } from '../lib/supabase';
import * as Icons from 'lucide-react';

interface CategoryNavProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
}

export const CategoryNav = ({ categories, selectedCategory, onCategorySelect }: CategoryNavProps) => {
  const getIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<{ size?: number; className?: string }>;
    return IconComponent ? <IconComponent size={20} /> : <Icons.Tag size={20} />;
  };

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
          <button
            onClick={() => onCategorySelect(null)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === null
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Icons.Home size={20} />
            <span>Todos</span>
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {getIcon(category.icon)}
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
