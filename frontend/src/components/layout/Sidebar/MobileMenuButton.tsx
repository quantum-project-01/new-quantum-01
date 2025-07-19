import React from 'react';
import { Menu } from 'lucide-react';

interface MobileMenuButtonProps {
  onClick: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ onClick }) => {
  return (
    <div className="md:hidden fixed top-4 left-4 z-50">
      <button
        onClick={onClick}
        className="p-3 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors shadow-lg border border-gray-700"
      >
        <Menu className="h-6 w-6" />
      </button>
    </div>
  );
};

export default MobileMenuButton; 