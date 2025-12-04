import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Documentation } from './components/Documentation';
import { CnpjSearch } from './components/CnpjSearch';
import { About } from './components/About';
import { Privacy } from './components/Privacy';
import { Terms } from './components/Terms';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
        <Header />
        
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
          <Routes>
            <Route path="/" element={<CnpjSearch />} />
            <Route path="/docs" element={<Documentation />} />
            
            {/* New Pages */}
            <Route path="/sobre" element={<About />} />
            <Route path="/privacidade" element={<Privacy />} />
            <Route path="/termos" element={<Terms />} />

            {/* Status route placeholder */}
            <Route path="/status" element={
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4">
                  <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse"></div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Todos os sistemas operacionais</h2>
                <p className="text-slate-500">Nenhuma instabilidade detectada nas APIs parceiras.</p>
              </div>
            } />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;