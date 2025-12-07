import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Documentation } from './components/Documentation';
import { CnpjSearch } from './components/CnpjSearch';
import { About } from './components/About';
import { Privacy } from './components/Privacy';
import { Terms } from './components/Terms';
import { Status } from './components/Status';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
        <Header />
        
        {/* Structure updated to match Footer.tsx: 
            Wrapper gets padding (px-4 md:px-8), 
            Inner container gets max-width (max-w-6xl) and centers (mx-auto).
            This ensures content aligns vertically with footer content. */}
        <main className="flex-1 w-full px-4 md:px-8 py-4 md:py-8">
          <div className="w-full max-w-6xl mx-auto">
            <Routes>
              <Route path="/" element={<CnpjSearch />} />
              <Route path="/:cnpj" element={<CnpjSearch />} />
              <Route path="/docs" element={<Documentation />} />
              
              {/* New Pages */}
              <Route path="/sobre" element={<About />} />
              <Route path="/privacidade" element={<Privacy />} />
              <Route path="/termos" element={<Terms />} />

              <Route path="/status" element={<Status />} />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>

        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;