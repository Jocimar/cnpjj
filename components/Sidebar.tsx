import React from 'react';
import { NAV_ITEMS } from '../constants';
import { X, Building2 } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed top-0 left-0 z-50 h-screen w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:sticky md:top-0
        `}
      >
        <div className="flex h-14 items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white">
            <Building2 className="w-6 h-6 text-emerald-600" />
            <span>OpenCNPJ</span>
          </div>
          <button 
            onClick={onClose}
            className="md:hidden p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-8 overflow-y-auto h-[calc(100vh-3.5rem)]">
          {NAV_ITEMS.map((group) => (
            <div key={group.category}>
              <h3 className="mb-2 px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {group.category}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      if (window.innerWidth < 768) onClose();
                    }}
                    className="flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
          ))}

          <div className="rounded-lg bg-slate-50 dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800">
            <h4 className="text-sm font-medium text-slate-900 dark:text-white">Precisa de mais?</h4>
            <p className="mt-1 text-xs text-slate-500">
              Acesse nossa API Comercial para limites maiores e dados em tempo real.
            </p>
            <button className="mt-3 w-full rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700 transition-colors">
              Ver Planos
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
