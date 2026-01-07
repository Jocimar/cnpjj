
import React from 'react';
import { FOOTER_LINKS } from '../constants';
import { Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12 px-4 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white mb-4">
              <Building2 className="w-6 h-6 text-emerald-600" />
              <span>CNPJJ</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Sua ferramenta confiável para consulta de dados públicos de empresas brasileiras, enriquecida com análise de inteligência artificial.
            </p>
          </div>

          {FOOTER_LINKS.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item.href}>
                    {item.href.startsWith('http') ? (
                      <a 
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors flex items-center gap-2"
                      >
                        {item.title}
                      </a>
                    ) : (
                      <Link 
                        to={item.href}
                        className="text-sm text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors flex items-center gap-2"
                      >
                        {item.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright Row - Centralized */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-900 text-center">
          <p className="text-xs text-slate-400">
            &copy; 2026 CNPJJ. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
