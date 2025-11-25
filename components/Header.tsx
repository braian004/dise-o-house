import React from 'react';
import { Ruler, Menu } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Ruler className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">ArchiVision</span>
        </div>
        <button className="p-2 hover:bg-slate-800 rounded-full transition-colors">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;